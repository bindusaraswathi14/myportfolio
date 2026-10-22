import React from "react";
import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { getAssetsManifest } from "@/lib/asset-discovery";
import { ProjectsLibraryClient } from "@/components/Projects";

export const metadata: Metadata = {
  title: "Creative Projects | Bindu Portfolio",
  description:
    "Explore the complete library of cinematic storytelling, AI films, mythology narratives, and commercial concepts by Bindu.",
};

export const revalidate = 0;

export default function ProjectsPage() {
  const manifest = getAssetsManifest();

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal/10 border border-royal/20 text-royal text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles size={12} />
          <span>Cinematic Archive</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
          Creative Projects
        </h1>
        <p className="font-sans text-slate-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
          From ancient Indian lore and philosophical dialogues to speculative science fiction and sensory culinary vignettes. Every project automatically discovered from local assets.
        </p>
      </div>

      {/* Interactive Filterable Client Component */}
      <ProjectsLibraryClient initialProjects={manifest.projects} />
    </div>
  );
}
