import React from "react";
import { getAssetsManifest } from "@/lib/asset-discovery";
import { HeroSection } from "@/components/Hero";
import { SelectedWorksSection } from "@/components/Projects";
import {
  AboutPreviewSection,
  ShowreelSection,
  GalleryPreviewSection,
  ProcessSection,
  SkillsBentoSection,
  ContactCtaSection,
} from "@/components/Sections";

export const revalidate = 0; // Dynamic on dev & on-demand

export default async function HomePage() {
  const manifest = getAssetsManifest();

  // Collect all available video items across projects and gallery deduplicated by URL
  const projectVideos = manifest.projects.flatMap((p) =>
    p.media.filter((m) => m.type === "video")
  );
  const seenVideoUrls = new Set<string>();
  const allVideos = [];
  for (const v of [...manifest.gallery.videos, ...projectVideos]) {
    if (!seenVideoUrls.has(v.url)) {
      seenVideoUrls.add(v.url);
      allVideos.push(v);
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* 1. Cinematic Hero with 3D Canvas */}
      <HeroSection />

      {/* 2. Selected Works (Dynamic Projects Grid) */}
      <SelectedWorksSection projects={manifest.projects} />

      {/* 3. About Me Section Preview */}
      <AboutPreviewSection profileImage={manifest.profileImage} />

      {/* 4. Video Showreel Theater */}
      <ShowreelSection videos={allVideos} />

      {/* 5. Frames of Imagination (Visual Gallery Highlights) */}
      <GalleryPreviewSection images={manifest.gallery.images} />

      {/* 6. Creative Process Timeline */}
      <ProcessSection />

      {/* 7. Skills & Creative Tools Bento Grid */}
      <SkillsBentoSection />

      {/* 8. Contact & Collaboration CTA */}
      <ContactCtaSection />
    </div>
  );
}
