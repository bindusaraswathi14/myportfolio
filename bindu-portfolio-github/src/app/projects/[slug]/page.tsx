import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Folder, Calendar, Tag } from "lucide-react";
import { getAssetsManifest } from "@/lib/asset-discovery";
import { ProjectMediaGalleryClient } from "@/components/Projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const manifest = getAssetsManifest();
  return manifest.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const manifest = getAssetsManifest();
  const project = manifest.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Bindu Portfolio",
    };
  }

  return {
    title: `${project.title} | Bindu Portfolio`,
    description:
      project.shortDescription ||
      project.description ||
      `Cinematic storytelling and visual exploration for ${project.title}.`,
  };
}

export const revalidate = 0;

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const manifest = getAssetsManifest();
  const projectIndex = manifest.projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = manifest.projects[projectIndex];
  const prevProject =
    projectIndex > 0 ? manifest.projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < manifest.projects.length - 1
      ? manifest.projects[projectIndex + 1]
      : null;

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Top Back Navigation Bar */}
      <div className="mb-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-royal" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Project Hero Header */}
      <div className="rounded-3xl bg-blackberry-dark border border-white/10 p-8 sm:p-12 mb-16 relative overflow-hidden shadow-2xl">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-gradient-to-bl from-royal/20 to-transparent blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal/10 border border-royal/30 text-royal font-mono text-xs uppercase tracking-wider">
              <Folder size={12} />
              <span>{project.category}</span>
            </span>

            {project.year && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono text-xs">
                <Calendar size={12} />
                <span>{project.year}</span>
              </span>
            )}

            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 font-mono text-xs">
              {project.media.length} Media {project.media.length === 1 ? "File" : "Files"}
            </span>
          </div>

          {/* Project Title */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          {/* Description */}
          {(project.description || project.shortDescription) && (
            <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              {project.description || project.shortDescription}
            </p>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blackberry border border-white/5 text-xs font-mono text-slate-400"
                >
                  <Tag size={10} className="text-royal" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Discovered Media Gallery */}
      <ProjectMediaGalleryClient
        media={project.media}
        projectTitle={project.title}
      />

      {/* Bottom Previous / Next Project Navigation Strip */}
      <div className="mt-24 pt-12 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="p-6 rounded-2xl bg-blackberry/40 border border-white/10 hover:border-royal/50 transition-all group flex flex-col items-start"
          >
            <span className="font-mono text-xs uppercase text-slate-500 mb-1 flex items-center gap-1">
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
              Previous Project
            </span>
            <span className="font-heading text-lg font-bold text-white group-hover:text-royal transition-colors">
              {prevProject.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject && (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="p-6 rounded-2xl bg-blackberry/40 border border-white/10 hover:border-royal/50 transition-all group flex flex-col items-end text-right"
          >
            <span className="font-mono text-xs uppercase text-slate-500 mb-1 flex items-center gap-1">
              Next Project
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="font-heading text-lg font-bold text-white group-hover:text-royal transition-colors">
              {nextProject.title}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
