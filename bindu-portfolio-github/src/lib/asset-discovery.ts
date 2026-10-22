import fs from "fs";
import path from "path";
import {
  AssetsManifest,
  MediaItem,
} from "../types/media";
import {
  encodeMediaUrl,
  formatTitleFromFilename,
  getFileExtension,
  inferCategoryFromFolder,
  isImageFile,
  isSupportedMedia,
  slugify,
} from "./media-utils";
import { PROJECT_OVERRIDES, ProjectOverride } from "../data/project-overrides";

/**
 * Scans public/assets directory and returns a fully typed manifest.
 * Safe against path traversal, ignores hidden files and unsupported extensions.
 */
export function discoverAssets(baseDir?: string): AssetsManifest {
  const rootDir = baseDir || process.cwd();
  const publicDir = path.join(rootDir, "public");
  const assetsDir = path.join(publicDir, "assets");

  const manifest: AssetsManifest = {
    generatedAt: new Date().toISOString(),
    projects: [],
    gallery: {
      images: [],
      videos: [],
      all: [],
    },
  };

  if (!fs.existsSync(assetsDir)) {
    return manifest;
  }

  // 1. Check Profile Image
  const profileDir = path.join(assetsDir, "profile");
  if (fs.existsSync(profileDir)) {
    try {
      const profileFiles = fs.readdirSync(profileDir);
      for (const file of profileFiles) {
        if (!file.startsWith(".") && isImageFile(file)) {
          manifest.profileImage = encodeMediaUrl(`/assets/profile/${file}`);
          break;
        }
      }
    } catch (err) {
      console.warn("Could not read profile directory:", err);
    }
  }

  // 2. Discover Projects
  const projectsDir = path.join(assetsDir, "projects");
  if (fs.existsSync(projectsDir)) {
    try {
      const projectFolders = fs.readdirSync(projectsDir, { withFileTypes: true });

      for (const dirent of projectFolders) {
        if (!dirent.isDirectory() || dirent.name.startsWith(".")) {
          continue;
        }

        const folderName = dirent.name;
        const projectPath = path.join(projectsDir, folderName);
        const projectSlug = slugify(folderName);
        const folderTitle = formatTitleFromFilename(folderName);

        // Read optional local project.json or metadata.json
        let localMeta: Partial<ProjectOverride> = {};
        for (const metaName of ["project.json", "metadata.json", "meta.json"]) {
          const metaPath = path.join(projectPath, metaName);
          if (fs.existsSync(metaPath)) {
            try {
              const raw = fs.readFileSync(metaPath, "utf-8");
              localMeta = JSON.parse(raw);
              break;
            } catch (e) {
              console.warn(`Error parsing metadata in ${folderName}:`, e);
            }
          }
        }

        // Combine with static overrides if present
        const override = PROJECT_OVERRIDES[projectSlug] || {};
        const title = localMeta.title || override.title || folderTitle;
        const category = localMeta.category || override.category || inferCategoryFromFolder(folderName);
        const description = localMeta.description || override.description || "";
        const shortDescription = localMeta.shortDescription || override.shortDescription || "";
        const year = localMeta.year || override.year || "";
        const featured = localMeta.featured ?? override.featured ?? false;
        const order = localMeta.order ?? override.order ?? 99;
        const tags = localMeta.tags || override.tags || [category];

        // Discover media inside project folder
        const mediaItems: MediaItem[] = [];
        let coverItem: MediaItem | undefined;

        try {
          const files = fs.readdirSync(projectPath);
          // Sort files deterministically
          files.sort((a, b) => a.localeCompare(b));

          for (const file of files) {
            if (file.startsWith(".") || !isSupportedMedia(file)) {
              continue;
            }

            const ext = getFileExtension(file);
            const isImg = isImageFile(file);
            const type = isImg ? "image" : "video";
            const isCoverNamed = /^cover\.(jpe?g|png|webp|avif|svg)$/i.test(file);
            const publicUrl = encodeMediaUrl(`/assets/projects/${folderName}/${file}`);

            const mediaItem: MediaItem = {
              id: `${projectSlug}-${slugify(file)}`,
              name: file,
              title: formatTitleFromFilename(file),
              url: publicUrl,
              type,
              format: ext,
              folderCategory: category,
              projectId: projectSlug,
              isCover: isCoverNamed,
            };

            mediaItems.push(mediaItem);

            if (isCoverNamed && !coverItem) {
              coverItem = mediaItem;
            }
          }
        } catch (err) {
          console.warn(`Error reading project files in ${folderName}:`, err);
        }

        // If no explicit cover.jpg/png, prefer first image, then first video
        if (!coverItem && mediaItems.length > 0) {
          coverItem = mediaItems.find((m) => m.type === "image") || mediaItems[0];
          if (coverItem) {
            coverItem.isCover = true;
          }
        }

        manifest.projects.push({
          id: projectSlug,
          slug: projectSlug,
          title,
          category,
          description,
          shortDescription,
          year,
          featured,
          order,
          tags,
          coverImage: coverItem,
          media: mediaItems,
        });
      }
    } catch (err) {
      console.warn("Could not read projects directory:", err);
    }
  }

  // Sort projects deterministically: featured first, then by order, then by title
  manifest.projects.sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    const orderA = a.order ?? 99;
    const orderB = b.order ?? 99;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.title.localeCompare(b.title);
  });

  // 3. Discover Gallery (public/assets/gallery/images & public/assets/gallery/videos + root)
  const galleryDir = path.join(assetsDir, "gallery");
  const galleryImages: MediaItem[] = [];
  const galleryVideos: MediaItem[] = [];
  const seenUrls = new Set<string>();

  const scanDir = (dirPath: string, relativePrefix: string) => {
    if (!fs.existsSync(dirPath)) return;

    try {
      const files = fs.readdirSync(dirPath);
      files.sort((a, b) => a.localeCompare(b));

      for (const file of files) {
        if (file.startsWith(".") || !isSupportedMedia(file)) continue;

        const isImg = isImageFile(file);
        const type = isImg ? "image" : "video";
        const ext = getFileExtension(file);
        const publicUrl = encodeMediaUrl(`${relativePrefix}/${file}`);

        if (seenUrls.has(publicUrl)) continue;
        seenUrls.add(publicUrl);

        const item: MediaItem = {
          id: `gallery-${slugify(file)}`,
          name: file,
          title: formatTitleFromFilename(file),
          url: publicUrl,
          type,
          format: ext,
          folderCategory: "Gallery",
        };

        if (type === "image") {
          galleryImages.push(item);
        } else {
          galleryVideos.push(item);
        }
      }
    } catch (e) {
      console.warn(`Error scanning directory ${dirPath}:`, e);
    }
  };

  scanDir(path.join(galleryDir, "images"), "/assets/gallery/images");
  scanDir(path.join(galleryDir, "videos"), "/assets/gallery/videos");
  scanDir(galleryDir, "/assets/gallery");

  // Also include project cover images in gallery if not already present
  for (const proj of manifest.projects) {
    if (proj.coverImage && !seenUrls.has(proj.coverImage.url)) {
      seenUrls.add(proj.coverImage.url);
      galleryImages.push({
        ...proj.coverImage,
        folderCategory: proj.category,
      });
    }
  }

  manifest.gallery = {
    images: galleryImages,
    videos: galleryVideos,
    all: [...galleryImages, ...galleryVideos],
  };

  return manifest;
}

/**
 * Helper to fetch the manifest.
 * In development, dynamically re-scans the filesystem on every call
 * so that any media added/removed is immediately reflected in the browser!
 * In production, safely falls back to pre-generated manifest JSON if filesystem is static.
 */
let cachedManifest: AssetsManifest | null = null;

export function getAssetsManifest(): AssetsManifest {
  if (process.env.NODE_ENV === "development") {
    try {
      return discoverAssets();
    } catch (e) {
      console.error("Error dynamically discovering assets:", e);
    }
  }

  if (cachedManifest) {
    return cachedManifest;
  }

  try {
    const manifestPath = path.join(process.cwd(), "src", "data", "assets-manifest.json");
    if (fs.existsSync(manifestPath)) {
      const content = fs.readFileSync(manifestPath, "utf-8");
      cachedManifest = JSON.parse(content);
      return cachedManifest!;
    }
  } catch (err) {
    console.warn("Could not read assets-manifest.json:", err);
  }

  try {
    cachedManifest = discoverAssets();
    return cachedManifest;
  } catch {
    return {
      generatedAt: new Date().toISOString(),
      projects: [],
      gallery: { images: [], videos: [], all: [] },
    };
  }
}
