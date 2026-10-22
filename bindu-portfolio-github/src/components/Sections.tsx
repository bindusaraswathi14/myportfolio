"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, Compass, Film, Play, ZoomIn, Lightbulb, BookOpen, Layers,
  Clapperboard, Scissors, Wrench, PenTool, Video, Tv, Share2, Terminal, MessageSquare,
  Mail, Copy, Check, ArrowUpRight, Image as ImageIcon,
} from "lucide-react";
import { Monogram, YoutubeIcon, InstagramIcon, FacebookIcon } from "./Brand";
import { LightboxModal, VideoPlayer } from "./UI";
import { PERSONAL_INFO } from "@/data/personal-info";
import { MediaItem } from "@/types/media";

// --- ABOUT PREVIEW SECTION ---
export function AboutPreviewSection({ profileImage }: { profileImage?: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-blackberry-dark border border-white/10 shadow-2xl group">
            {profileImage && !imgError ? (
              <Image src={profileImage} alt={PERSONAL_INFO.name} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover transition-transform duration-700 group-hover:scale-105" onError={() => setImgError(true)} unoptimized />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blackberry to-jet text-center">
                <Monogram size={100} variant="gradient" withOrbit={true} />
                <h3 className="font-heading font-black text-2xl text-white tracking-widest uppercase mt-6">{PERSONAL_INFO.brandName}</h3>
                <p className="font-mono text-xs text-royal uppercase tracking-widest mt-1">Creative Filmmaker</p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-jet via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-jet/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <div className="font-heading font-bold text-white text-base">{PERSONAL_INFO.name}</div>
                <div className="font-mono text-[11px] text-royal">{PERSONAL_INFO.channelName}</div>
              </div>
              <Compass size={20} className="text-hyacinth animate-spin-slow" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal/10 border border-royal/20 text-royal text-xs font-mono uppercase tracking-widest">
            <Sparkles size={12} />
            <span>Creative Identity</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">{PERSONAL_INFO.about.heroHeadline}</h2>
          <div className="h-1 w-24 bg-brand-gradient rounded-full" />
          <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed">{PERSONAL_INFO.about.shortBio}</p>
          <p className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed">
            Through my channel, <strong>{PERSONAL_INFO.channelName}</strong>, I explore imaginative narratives, fascinating historical subjects, ancient Indian knowledge, mythology-inspired storytelling, and thought-provoking concepts.
          </p>
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white font-heading font-semibold text-xs tracking-wider uppercase shadow-glow-royal hover:opacity-90 transition-opacity">
              <span>Read Full Biography</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SHOWREEL SECTION ---
export function ShowreelSection({ videos }: { videos: MediaItem[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeVideo = videos[selectedIndex];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hyacinth/10 border border-hyacinth/20 text-hyacinth text-xs font-mono uppercase tracking-widest mb-3">
          <Film size={12} />
          <span>Cinematic Showcase</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">Motion in Every Frame</h2>
        <p className="font-sans text-slate-400 text-sm sm:text-base mt-3">Experience visual pacing, dynamic camera sweeps, and evocative sound design crafted across generative video pipelines.</p>
      </div>

      <div className="relative rounded-3xl bg-blackberry-dark border border-white/10 p-4 sm:p-8 shadow-2xl overflow-hidden">
        {videos.length > 0 && activeVideo ? (
          <div>
            <VideoPlayer src={activeVideo.url} title={activeVideo.title} className="w-full shadow-2xl" />
            {videos.length > 1 && (
              <div className="mt-6 flex items-center gap-4 overflow-x-auto pb-2 scrollbar-thin">
                {videos.map((vid, idx) => (
                  <button key={vid.id} onClick={() => setSelectedIndex(idx)} className={`relative flex-shrink-0 w-52 rounded-xl overflow-hidden border-2 transition-all p-3 bg-jet text-left ${selectedIndex === idx ? "border-royal shadow-glow-royal bg-blackberry" : "border-white/10 opacity-70 hover:opacity-100"}`}>
                    <div className="flex items-center gap-2 text-xs font-heading font-semibold text-white truncate">
                      <Play size={14} className="text-royal flex-shrink-0 fill-royal" />
                      <span className="truncate">{vid.title}</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 block mt-1.5 uppercase tracking-wider">{vid.folderCategory || "Video"}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="relative aspect-video w-full rounded-2xl bg-gradient-to-br from-jet-deep via-blackberry-dark to-jet border border-white/5 flex flex-col items-center justify-center p-8 text-center">
            <Film size={40} className="text-royal mb-4 animate-pulse" />
            <h3 className="font-heading text-xl font-bold text-white">Studio Video Player</h3>
            <p className="font-sans text-sm text-slate-300 max-w-lg mt-2">Explore full episodes on historical epics and ancient sciences.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// --- GALLERY PREVIEW SECTION ---
export function GalleryPreviewSection({ images }: { images: MediaItem[] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const displayImages = images.slice(0, 6);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/5 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hyacinth/10 border border-hyacinth/20 text-hyacinth text-xs font-mono uppercase tracking-widest mb-3">
            <ImageIcon size={12} />
            <span>Visual Stills</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">Frames of Imagination</h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base mt-2 max-w-xl">Selected keyframes, environment concepts, and visual studies discovered automatically.</p>
        </div>
        <Link href="/gallery" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors self-start md:self-auto group">
          <span>Explore Full Gallery</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayImages.map((img, idx) => (
          <div key={img.id} onClick={() => { setSelectedIndex(idx); setLightboxOpen(true); }} className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-blackberry-dark border border-white/10 cursor-pointer shadow-lg hover:border-hyacinth/50 transition-all duration-300 hover:-translate-y-1">
            <Image src={img.url} alt={img.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-jet via-jet/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-white text-base">{img.title}</h4>
                  <span className="font-mono text-xs text-hyacinth uppercase tracking-wider">{img.folderCategory || "Gallery Still"}</span>
                </div>
                <div className="p-2 rounded-full bg-royal/80 text-white shadow-glow-royal"><ZoomIn size={16} /></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <LightboxModal items={displayImages} currentIndex={selectedIndex} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} onNavigate={(newIdx) => setSelectedIndex(newIdx)} />
    </section>
  );
}

// --- GALLERY CLIENT (FULL PAGE) ---
export function GalleryClient({ initialImages, initialVideos }: { initialImages: MediaItem[]; initialVideos: MediaItem[] }) {
  const [filterType, setFilterType] = useState<"all" | "images" | "videos">("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allItems = useMemo(() => [...initialImages, ...initialVideos], [initialImages, initialVideos]);
  const displayedItems = useMemo(() => {
    if (filterType === "images") return initialImages;
    if (filterType === "videos") return initialVideos;
    return allItems;
  }, [filterType, initialImages, initialVideos, allItems]);

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-12">
        <button onClick={() => setFilterType("all")} className={`px-5 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all ${filterType === "all" ? "bg-brand-gradient text-white shadow-glow-royal" : "bg-blackberry/60 text-slate-400 hover:text-white"}`}>
          All Media ({allItems.length})
        </button>
        <button onClick={() => setFilterType("images")} className={`px-5 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${filterType === "images" ? "bg-brand-gradient text-white shadow-glow-royal" : "bg-blackberry/60 text-slate-400 hover:text-white"}`}>
          <ImageIcon size={14} /> Stills ({initialImages.length})
        </button>
        <button onClick={() => setFilterType("videos")} className={`px-5 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${filterType === "videos" ? "bg-brand-gradient text-white shadow-glow-royal" : "bg-blackberry/60 text-slate-400 hover:text-white"}`}>
          <Film size={14} /> Videos ({initialVideos.length})
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedItems.map((item, idx) => (
          <div key={item.id} onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }} className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-blackberry-dark border border-white/10 cursor-pointer shadow-lg hover:border-royal/50 transition-all duration-300 hover:-translate-y-1">
            {item.type === "image" ? (
              <Image src={item.url} alt={item.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" unoptimized />
            ) : (
              <div className="relative w-full h-full bg-jet-deep flex items-center justify-center">
                <div className="p-4 rounded-full bg-royal/80 text-white shadow-glow-royal"><Play size={24} className="ml-1" /></div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-jet via-jet/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-white text-sm">{item.title}</h3>
                  <span className="font-mono text-[10px] text-royal uppercase tracking-wider">{item.type === "video" ? "Video Asset" : "Visual Still"}</span>
                </div>
                <div className="p-2 rounded-full bg-royal text-white shadow-glow-royal">{item.type === "video" ? <Play size={14} /> : <ZoomIn size={14} />}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <LightboxModal items={displayedItems} currentIndex={lightboxIndex} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} onNavigate={(newIdx) => setLightboxIndex(newIdx)} />
    </div>
  );
}

// --- PROCESS SECTION ---
const STEP_ICONS = [Lightbulb, BookOpen, Layers, Clapperboard, Scissors];
export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal/10 border border-royal/20 text-royal text-xs font-mono uppercase tracking-widest mb-3">
          <Sparkles size={12} /> Methodology
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">From an Idea to an Experience</h2>
        <p className="font-sans text-slate-400 text-sm sm:text-base mt-3">How raw sparks of imagination and timeless mythologies are meticulously shaped into immersive digital films.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {PERSONAL_INFO.creativeProcess.map((step, idx) => {
          const Icon = STEP_ICONS[idx] || Sparkles;
          const isSelected = activeStep === idx;
          return (
            <motion.div key={step.step} whileHover={{ y: -6 }} onClick={() => setActiveStep(idx)} className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${isSelected ? "bg-blackberry border-royal shadow-glow-royal" : "bg-blackberry/40 border-white/10"}`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-gradient-accent">{step.step}</span>
                  <div className={`p-2 rounded-xl ${isSelected ? "bg-royal text-white" : "bg-white/5 text-slate-400"}`}><Icon size={18} /></div>
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">{step.summary}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[10px] text-royal uppercase tracking-wider">Phase {idx + 1}</div>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-blackberry-dark border border-white/10">
        <h4 className="font-heading text-xl font-bold text-white">{PERSONAL_INFO.creativeProcess[activeStep].title}</h4>
        <p className="font-sans text-sm text-slate-300 leading-relaxed max-w-3xl pt-2">{PERSONAL_INFO.creativeProcess[activeStep].details}</p>
      </div>
    </section>
  );
}

// --- SKILLS BENTO SECTION ---
const ICON_MAP: Record<string, React.ElementType> = { Sparkles, Film, PenTool, Layers, Clapperboard, Video, Compass, Scissors, BookOpen, Tv, Share2, Terminal };
export function SkillsBentoSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal/10 border border-royal/20 text-royal text-xs font-mono uppercase tracking-widest mb-3">
          <Wrench size={12} /> Capabilities & Ecosystem
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">The Tools Behind the Vision</h2>
        <p className="font-sans text-slate-400 text-sm sm:text-base mt-3">Specialized disciplines and modern creative software integrated into end-to-end cinematic production.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {PERSONAL_INFO.tools.map((tool) => (
          <div key={tool.name} className="p-5 rounded-2xl bg-blackberry/50 border border-white/10 hover:border-royal/50 hover:bg-blackberry transition-all group flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] text-hyacinth uppercase tracking-wider block mb-1">{tool.category}</span>
              <h4 className="font-heading text-lg font-bold text-white group-hover:text-royal transition-colors">{tool.name}</h4>
            </div>
            <p className="font-sans text-xs text-slate-400 mt-3 leading-relaxed">{tool.role}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PERSONAL_INFO.specialties.map((spec) => {
          const Icon = ICON_MAP[spec.iconName] || Sparkles;
          return (
            <motion.div key={spec.id} whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-blackberry-dark/70 border border-white/10 hover:border-hyacinth/40 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:border-royal/40 group-hover:bg-royal/10 text-royal flex items-center justify-center mb-4 transition-colors">
                  <Icon size={20} />
                </div>
                <h3 className="font-heading text-lg font-bold text-white group-hover:text-royal transition-colors">{spec.title}</h3>
                <p className="font-sans text-xs text-slate-400 mt-2 leading-relaxed">{spec.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// --- CONTACT CTA SECTION ---
export function ContactCtaSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="relative rounded-3xl bg-gradient-to-b from-blackberry to-jet-deep border border-white/10 p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal/10 border border-royal/20 text-royal text-xs font-mono uppercase tracking-widest mb-4">
          <MessageSquare size={12} /> Collaboration & Inquiries
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">Have a Story Worth Telling?</h2>
        <p className="font-sans text-slate-300 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">Whether it&apos;s a creative collaboration, a visual storytelling idea, or an exciting project, I&apos;d love to hear about it.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <a href={`mailto:${PERSONAL_INFO.email}`} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-gradient text-white font-heading font-bold text-sm tracking-wider uppercase shadow-glow-royal hover:scale-[1.02] transition-transform">
            <Mail size={18} />
            <span>Let&apos;s Create Something Extraordinary</span>
            <ArrowUpRight size={16} />
          </a>
          <button onClick={copyEmail} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-sm font-mono transition-colors">
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            <span>{copied ? "Email Copied!" : PERSONAL_INFO.email}</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10 text-left">
          <a href={PERSONAL_INFO.socials.youtube} target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-red-600/20 text-red-400 group-hover:scale-110 transition-transform"><YoutubeIcon size={20} /></div>
            <div className="truncate"><div className="text-xs font-heading font-bold text-white group-hover:text-royal transition-colors">Kadha Cheppana Meeku</div><div className="font-mono text-[11px] text-slate-400">YouTube Channel</div></div>
          </a>
          <a href={PERSONAL_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-pink-600/20 text-pink-400 group-hover:scale-110 transition-transform"><InstagramIcon size={20} /></div>
            <div className="truncate"><div className="text-xs font-heading font-bold text-white group-hover:text-hyacinth transition-colors">@kadhacheppana14</div><div className="font-mono text-[11px] text-slate-400">Instagram Stories</div></div>
          </a>
          <a href={PERSONAL_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-600/20 text-blue-400 group-hover:scale-110 transition-transform"><FacebookIcon size={20} /></div>
            <div className="truncate"><div className="text-xs font-heading font-bold text-white group-hover:text-royal transition-colors">Bindu Creative</div><div className="font-mono text-[11px] text-slate-400">Facebook Community</div></div>
          </a>
        </div>
      </div>
    </section>
  );
}
