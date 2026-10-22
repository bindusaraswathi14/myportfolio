export type MediaType = "image" | "video";

export interface MediaItem {
  id: string;
  name: string;
  title: string;
  url: string;
  type: MediaType;
  format: string; // "jpg", "mp4", etc.
  folderCategory?: string;
  projectId?: string;
  isCover?: boolean;
}

export interface ProjectMetadata {
  id: string;
  slug: string;
  title: string;
  category: string;
  description?: string;
  shortDescription?: string;
  year?: number | string;
  featured?: boolean;
  order?: number;
  tags?: string[];
  coverImage?: MediaItem;
  media: MediaItem[];
}

export interface GalleryData {
  images: MediaItem[];
  videos: MediaItem[];
  all: MediaItem[];
}

export interface AssetsManifest {
  generatedAt: string;
  projects: ProjectMetadata[];
  gallery: GalleryData;
  profileImage?: string;
}
