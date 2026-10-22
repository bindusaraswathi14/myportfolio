"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Search, Film, Filter, X, ZoomIn, Image as ImageIcon, Sparkles } from "lucide-react";
import { ProjectMetadata, MediaItem } from "@/types/media";
import { Monogram } from "./Brand";
import { LightboxModal, VideoPlayer } from "./UI";

// --- PROJECT CARD ---
export function ProjectCard({ project, priority = false }: { project: ProjectMetadata; priority?: boolean }) {
  const [imageError, setImageError] = useState(false);
  const coverUrl = project.coverImage?.url;

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="group relative rounded-2xl bg-blackberry/40 border border-white/10 hover:border-royal/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-glow-royal">
      <Link href={`/projects/${project.slug}`} className="block flex-1 flex flex-col">
        <div className="relative aspect-video w-full overflow-hidden bg-jet-surface">
          {coverUrl && !imageError ? (
            <Image src={coverUrl} alt={project.title} fill priority={priority} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" onError={() => setImageError(true)} className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" unoptimized />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blackberry to-jet p-6 text-center">
              <Monogram size={56} variant="gradient" />
              <span className="font-heading font-bold text-white text-base mt-3">{project.title}</span>
              <span className="font-mono text-xs text-royal mt-1 uppercase tracking-wider">{project.category}</span>
            </div>
          )}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-jet/80 backdrop-blur-md text-white font-mono text-[11px] uppercase tracking-wider border border-white/10">{project.category}</span>
            {project.year && <span className="px-2.5 py-1 rounded-full bg-jet/80 backdrop-blur-md text-slate-300 font-mono text-[11px] border border-white/10">{project.year}</span>}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-blackberry-dark via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading text-xl font-bold text-white group-hover:text-royal transition-colors">{project.title}</h3>
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-royal group-hover:text-white text-slate-400 transition-colors flex-shrink-0">
                <ArrowUpRight size={16} />
              </div>
            </div>
            {project.shortDescription && <p className="font-sans text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">{project.shortDescription}</p>}
          </div>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/5">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

// --- SELECTED WORKS SECTION ---
export function SelectedWorksSection({ projects }: { projects: ProjectMetadata[] }) {
  const featured = projects.filter((p) => p.featured);
  const displayProjects = featured.length >= 3 ? featured.slice(0, 4) : projects.slice(0, 4);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/5 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal/10 border border-royal/20 text-royal text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles size={12} />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">Selected Works</h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base mt-2 max-w-xl">A collection of stories, cinematic experiments, and creative visions crafted with AI and timeless narrative technique.</p>
        </div>
        <Link href="/projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors self-start md:self-auto group">
          <span>View All Projects</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayProjects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} priority={idx < 2} />
        ))}
      </div>
    </section>
  );
}

// --- PROJECTS LIBRARY CLIENT ---
const CATEGORIES = ["All Projects", "AI Films", "Historical Stories", "Science Fiction", "Cinematic Advertisements", "Visual Experiments"];

export function ProjectsLibraryClient({ initialProjects }: { initialProjects: ProjectMetadata[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "title" | "mediaCount">("default");

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesCategory = selectedCategory === "All Projects" || project.category.toLowerCase() === selectedCategory.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || project.title.toLowerCase().includes(q) || (project.description && project.description.toLowerCase().includes(q)) || (project.tags && project.tags.some((t) => t.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "mediaCount") return b.media.length - a.media.length;
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return (a.order ?? 99) - (b.order ?? 99);
    });
  }, [initialProjects, selectedCategory, searchQuery, sortBy]);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, mythology, or theme..."
            className="w-full pl-11 pr-10 py-3 rounded-full bg-blackberry-dark border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-royal/60"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 self-end md:self-auto">
          <span className="font-mono text-xs text-slate-400 flex items-center gap-1"><Filter size={12} /> Sort:</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "default" | "title" | "mediaCount")} className="bg-blackberry border border-white/10 text-white text-xs font-mono rounded-lg px-3 py-2">
            <option value="default">Featured First</option>
            <option value="title">Alphabetical (A-Z)</option>
            <option value="mediaCount">Most Media Assets</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
        {CATEGORIES.map((category) => (
          <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full font-sans text-xs font-medium whitespace-nowrap transition-all border ${selectedCategory === category ? "bg-brand-gradient text-white border-royal shadow-glow-royal" : "bg-blackberry/40 border-white/10 text-slate-300 hover:text-white"}`}>
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} priority={idx < 3} />
        ))}
      </div>
    </div>
  );
}

// --- PROJECT MEDIA GALLERY CLIENT ---
export function ProjectMediaGalleryClient({ media, projectTitle }: { media: MediaItem[]; projectTitle: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = media.filter((m) => m.type === "image");
  const videos = media.filter((m) => m.type === "video");

  const openLightboxAtImage = (imageItem: MediaItem) => {
    const idx = images.findIndex((img) => img.id === imageItem.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
      setLightboxOpen(true);
    }
  };

  return (
    <div className="space-y-16">
      {videos.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-royal">
            <Film size={14} />
            <span>Cinematic Sequences & Video Media ({videos.length})</span>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {videos.map((vid) => (
              <div key={vid.id} className="space-y-2">
                <VideoPlayer src={vid.url} title={vid.title} className="w-full shadow-2xl" />
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
                  <span className="font-medium text-white">{vid.title}</span>
                  <span className="uppercase">{vid.format} Video</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-hyacinth">
            <ImageIcon size={14} />
            <span>Visual Concept Stills & Keyframes ({images.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <div key={img.id} onClick={() => openLightboxAtImage(img)} className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-blackberry-dark border border-white/10 cursor-pointer shadow-lg hover:border-royal/50 transition-all duration-300 hover:-translate-y-1">
                <Image src={img.url} alt={img.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-jet via-jet/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-white text-sm">{img.title}</h4>
                      <span className="font-mono text-[10px] text-royal uppercase tracking-wider">{img.isCover ? "Project Cover" : "Visual Frame"}</span>
                    </div>
                    <div className="p-2 rounded-full bg-royal text-white shadow-glow-royal"><ZoomIn size={14} /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {media.length === 0 && (
        <div className="p-12 rounded-3xl bg-blackberry-dark border border-white/5 text-center">
          <Sparkles size={36} className="text-royal mx-auto mb-3" />
          <h3 className="font-heading text-lg font-bold text-white">Folder Initialized for {projectTitle}</h3>
          <p className="font-sans text-xs text-slate-400 mt-2 max-w-sm mx-auto">Drop your media files into this project&apos;s folder to automatically display them here.</p>
        </div>
      )}

      {images.length > 0 && (
        <LightboxModal items={images} currentIndex={lightboxIndex} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} onNavigate={(newIdx) => setLightboxIndex(newIdx)} />
      )}
    </div>
  );
}
