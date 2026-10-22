import React from "react";
import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { getAssetsManifest } from "@/lib/asset-discovery";
import { GalleryClient } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Visual Gallery | Bindu Portfolio",
  description:
    "Explore cinematic still frames, character concepts, environment renders, and video showcases by Bindu.",
};

export const revalidate = 0;

export default function GalleryPage() {
  const manifest = getAssetsManifest();

  // Combine gallery images with project stills deduplicated
  const projectImages = manifest.projects.flatMap((p) =>
    p.media.filter((m) => m.type === "image")
  );
  const seenImageUrls = new Set<string>();
  const allImages = [];
  for (const img of [...manifest.gallery.images, ...projectImages]) {
    if (!seenImageUrls.has(img.url)) {
      seenImageUrls.add(img.url);
      allImages.push(img);
    }
  }

  // Combine gallery videos with project videos deduplicated
  const projectVideos = manifest.projects.flatMap((p) =>
    p.media.filter((m) => m.type === "video")
  );
  const seenVideoUrls = new Set<string>();
  const allVideos = [];
  for (const vid of [...manifest.gallery.videos, ...projectVideos]) {
    if (!seenVideoUrls.has(vid.url)) {
      seenVideoUrls.add(vid.url);
      allVideos.push(vid);
    }
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hyacinth/10 border border-hyacinth/20 text-hyacinth text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles size={12} />
          <span>Visual Archive</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
          Frames of Imagination
        </h1>
        <p className="font-sans text-slate-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
          A high-resolution collection of cinematic stills, atmospheric concept art, and dynamic motion sequences discovered directly from the studio library.
        </p>
      </div>

      {/* Interactive Gallery */}
      <GalleryClient initialImages={allImages} initialVideos={allVideos} />
    </div>
  );
}
