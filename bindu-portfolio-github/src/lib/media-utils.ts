const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "avif", "gif", "svg"]);
const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "mov"]);

export function getFileExtension(filename: string): string {
  const parts = filename.split(".");
  if (parts.length <= 1) return "";
  return parts.pop()?.toLowerCase() || "";
}

export function isImageFile(filename: string): boolean {
  return IMAGE_EXTENSIONS.has(getFileExtension(filename));
}

export function isVideoFile(filename: string): boolean {
  return VIDEO_EXTENSIONS.has(getFileExtension(filename));
}

export function isSupportedMedia(filename: string): boolean {
  return isImageFile(filename) || isVideoFile(filename);
}

// Special known title overrides for user's specific assets
const KNOWN_FILE_TITLES: Record<string, string> = {
  "Chandrapur Letter Mystery.png": "Chandrapur Letter Mystery",
  "Telugu Palace Mystery in the Rain.png": "Telugu Palace Mystery in the Rain",
  "The Sage Beyond Time_ Mind Connection.png": "The Sage Beyond Time: Mind Connection",
  "thum.png": "Cinematic Production Showcase Poster",
  "logo.png": "BINDU Creative Studio Emblem",
  "part1.mp4": "The Sage Beyond Time — Part 1",
  "part-01.mp4": "The Sage Beyond Time — Part 1",
  "part2.mp4": "Chandrapur Letter Mystery — Part 2",
  "part-02.mp4": "Chandrapur Letter Mystery — Part 2",
  "part3.mp4": "Telugu Palace Mystery in the Rain — Part 3",
  "part-03.mp4": "Telugu Palace Mystery in the Rain — Part 3",
  "Video Project.mp4": "Cinematic Video Showcase (Full Production)",
  "video-project.mp4": "Cinematic Video Showcase (Full Production)",
  "image_20261017122202.webp_20261018120207.jpg": "Ancient Sanctuary Mind Connection Study",
  "scene-mind-connection.jpg": "Ancient Sanctuary Mind Connection Study",
  "image_20261017122449.webp": "Sanctuary Architecture Keyframe",
  "scene-ancient-sanctuary.webp": "Sanctuary Architecture Keyframe",
  "image_20261017125054.jpg_20261018120130.jpg": "Chandrapur Letter Discovery Scene",
  "scene-letter-discovery.jpg": "Chandrapur Letter Discovery Scene",
};

export function formatTitleFromFilename(filename: string): string {
  if (KNOWN_FILE_TITLES[filename]) {
    return KNOWN_FILE_TITLES[filename];
  }

  // Remove file extension
  let withoutExt = filename.replace(/\.[^/.]+$/, "");

  // Strip duplicate extension fragments like .webp_20261018... or dates like _20261017122202
  withoutExt = withoutExt.replace(/\.(webp|jpg|png|jpeg)_[0-9]+/gi, "");
  withoutExt = withoutExt.replace(/_[0-9]{8,14}/g, "");

  // Replace underscores, hyphens, and multiple dots with space
  const spaced = withoutExt.replace(/[-_.]+/g, " ").trim();

  // Capitalize words
  return spaced
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      // Keep roman numerals or specific acronyms uppercase
      if (/^(ai|3d|cg|vfx|ii|iii|iv|v|vi|vii|viii|ix|x)$/i.test(word)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

export function encodeMediaUrl(filePath: string): string {
  // Ensure starts with a single slash
  const normalized = filePath.startsWith("/") ? filePath : `/${filePath}`;
  // Split path into segments and encode each segment, then rejoin with slash
  return normalized
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export function inferCategoryFromFolder(folderName: string): string {
  const lower = folderName.toLowerCase();
  if (lower.includes("ai") || lower.includes("film") || lower.includes("short") || lower.includes("showcase")) {
    return "AI Films";
  }
  if (
    lower.includes("history") ||
    lower.includes("chanakya") ||
    lower.includes("ancient") ||
    lower.includes("myth") ||
    lower.includes("chandrapur") ||
    lower.includes("palace") ||
    lower.includes("sage") ||
    lower.includes("tera")
  ) {
    return "Historical Stories";
  }
  if (lower.includes("sci-fi") || lower.includes("galaxy") || lower.includes("space") || lower.includes("future")) {
    return "Science Fiction";
  }
  if (lower.includes("commercial") || lower.includes("ad") || lower.includes("kitchen") || lower.includes("product")) {
    return "Cinematic Advertisements";
  }
  return "Visual Experiments";
}
