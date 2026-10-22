"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  Menu, X, Sparkles, ArrowUpRight, ArrowUp, Mail, Play, Pause, Volume2, VolumeX, Maximize,
  AlertCircle, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Film, Image as ImageIcon,
} from "lucide-react";
import { Logo, BrandDnaModal, YoutubeIcon, InstagramIcon, FacebookIcon } from "./Brand";
import { PERSONAL_INFO } from "@/data/personal-info";
import { MediaItem } from "@/types/media";

// --- CUSTOM CURSOR ---
export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.closest("a") || target.closest("button") || target.closest("[role='button']") || target.closest("input"))) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-royal/70 pointer-events-none mix-blend-screen"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHovered ? 48 : 26,
          height: isHovered ? 48 : 26,
          backgroundColor: isHovered ? "rgba(59, 130, 246, 0.15)" : "rgba(139, 92, 246, 0.05)",
          borderColor: isHovered ? "#8B5CF6" : "#3B82F6",
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovered ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}

// --- VIDEO PLAYER ---
export function VideoPlayer({
  src,
  poster,
  title,
  className = "",
  autoPlay = false,
}: {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [durationTime, setDurationTime] = useState("0:00");
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    setProgress((current / total) * 100);
    setCurrentTime(formatTime(current));
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDurationTime(formatTime(videoRef.current.duration));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
    setProgress(pos * 100);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      if (isPlaying) {
        timeout = setTimeout(() => setShowControls(false), 2500);
      }
    };
    const container = containerRef.current;
    if (container) container.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (container) container.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isPlaying]);

  return (
    <div ref={containerRef} className={`relative group bg-jet-deep rounded-2xl overflow-hidden border border-white/10 aspect-video select-none ${className}`}>
      <video
        ref={videoRef} src={src} poster={poster} playsInline muted={isMuted} autoPlay={autoPlay}
        onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}
        onError={() => setHasError(true)} onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-jet/90 p-6 text-center z-20">
          <AlertCircle size={36} className="text-royal mb-2" />
          <p className="font-heading font-semibold text-white text-sm">{title || "Video Stream Preview"}</p>
          <p className="font-mono text-xs text-slate-400 mt-1 max-w-sm">Video format will play once supported MP4 media is placed in this project directory.</p>
        </div>
      )}
      {!isPlaying && !hasError && (
        <button onClick={togglePlay} className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-royal/80 hover:bg-royal text-white flex items-center justify-center shadow-glow-royal transition-transform transform hover:scale-110 z-10" aria-label="Play video">
          <Play size={28} className="ml-1 text-white fill-white" />
        </button>
      )}
      <div className={`absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div onClick={handleSeek} className="w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full cursor-pointer relative mb-3 transition-all">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-royal to-hyacinth rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-between text-white text-xs font-mono">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="p-1.5 rounded-lg hover:bg-white/10" aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button onClick={toggleMute} className="p-1.5 rounded-lg hover:bg-white/10" aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <span className="text-slate-300">{currentTime} / {durationTime}</span>
          </div>
          <div className="flex items-center gap-3">
            {title && <span className="hidden sm:inline-block font-sans text-xs text-slate-300 truncate max-w-xs">{title}</span>}
            <button onClick={toggleFullscreen} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="Fullscreen">
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- LIGHTBOX MODAL ---
export function LightboxModal({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: {
  items: MediaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl select-none">
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-white/10 text-royal">
              {currentItem.type === "video" ? <Film size={18} /> : <ImageIcon size={18} />}
            </span>
            <div>
              <h3 className="font-heading text-sm sm:text-base font-bold text-white tracking-wide">{currentItem.title}</h3>
              <p className="font-mono text-xs text-slate-400">{currentIndex + 1} of {items.length} {currentItem.folderCategory ? `• ${currentItem.folderCategory}` : ""}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {currentItem.type === "image" && (
              <button onClick={() => setIsZoomed(!isZoomed)} className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white" aria-label="Toggle zoom">
                {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
              </button>
            )}
            <button onClick={onClose} className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white" aria-label="Close lightbox">
              <X size={20} />
            </button>
          </div>
        </div>

        {items.length > 1 && (
          <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transform hover:scale-110" aria-label="Previous">
            <ChevronLeft size={24} />
          </button>
        )}
        {items.length > 1 && (
          <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transform hover:scale-110" aria-label="Next">
            <ChevronRight size={24} />
          </button>
        )}

        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12 overflow-hidden">
          {currentItem.type === "image" ? (
            <motion.div
              key={currentItem.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }}
              className={`relative max-w-full max-h-full transition-transform duration-300 ${isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image src={currentItem.url} alt={currentItem.title} width={1920} height={1080} className="max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl" priority unoptimized />
            </motion.div>
          ) : (
            <div className="relative w-full max-w-5xl max-h-[85vh] aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
              <video key={currentItem.id} src={currentItem.url} controls autoPlay playsInline className="w-full h-full object-contain">Your browser does not support HTML5 video.</video>
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}

// --- NAVBAR ---
const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandModalOpen, setBrandModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [pathname]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "py-3 bg-jet/80 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "py-5 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Logo size="md" />
          <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-blackberry/40 border border-white/10 backdrop-blur-md">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link key={link.name} href={link.href} className={`relative px-4 py-1.5 rounded-full font-sans text-sm font-medium transition-all ${isActive ? "text-white font-semibold" : "text-slate-400 hover:text-white"}`}>
                  {isActive && (
                    <motion.div layoutId="activeNavTab" className="absolute inset-0 rounded-full bg-gradient-to-r from-royal/30 to-hyacinth/30 border border-royal/40" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => setBrandModalOpen(true)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors">
              <Sparkles size={12} className="text-hyacinth" />
              <span>Brand DNA</span>
            </button>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-gradient text-white text-xs font-heading font-semibold tracking-wider uppercase shadow-glow-royal hover:opacity-90 transition-opacity">
              <span>Let&apos;s Create</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => setBrandModalOpen(true)} className="p-2 rounded-lg bg-white/5 text-hyacinth text-xs" aria-label="Brand Guide">
              <Sparkles size={16} />
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg bg-blackberry/80 border border-white/10 text-slate-300 hover:text-white focus:outline-none" aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 top-[60px] z-30 bg-jet/95 backdrop-blur-2xl border-b border-white/10 flex flex-col p-6 sm:p-10 md:hidden overflow-y-auto">
            <nav className="flex flex-col gap-4 my-auto">
              {NAV_LINKS.map((link, idx) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <motion.div key={link.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
                    <Link href={link.href} className={`block text-2xl font-heading font-bold py-2 border-b border-white/5 ${isActive ? "text-royal" : "text-slate-300 hover:text-white"}`}>
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <button onClick={() => { setMobileMenuOpen(false); setBrandModalOpen(true); }} className="w-full py-3 rounded-xl bg-blackberry border border-white/10 text-sm font-mono text-slate-300 flex items-center justify-center gap-2">
                <Sparkles size={14} className="text-hyacinth" />
                <span>View Pomelli Brand DNA</span>
              </button>
              <Link href="/contact" className="w-full py-3 rounded-xl bg-brand-gradient text-white text-center font-heading font-bold uppercase tracking-wider text-sm shadow-glow-royal">
                Let&apos;s Create Something Extraordinary
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <BrandDnaModal isOpen={brandModalOpen} onClose={() => setBrandModalOpen(false)} />
    </>
  );
}

// --- FOOTER ---
export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-jet-surface border-t border-white/5 pt-16 pb-12 overflow-hidden text-slate-400">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-royal/5 via-hyacinth/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          <div className="md:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-slate-300 font-sans text-sm max-w-md leading-relaxed mt-3">
              Transforming imagination, mythology, and science fiction into visually compelling cinematic experiences. AI-assisted filmmaking meets timeless narrative craft.
            </p>
            <p className="font-mono text-xs text-royal tracking-wider uppercase">{PERSONAL_INFO.tagline}</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-semibold">Exploration</h4>
            <ul className="space-y-2 text-sm font-sans">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Bindu</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Project Library</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Frames of Imagination</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact & Inquiries</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-semibold">Storytelling Channels</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <a href={PERSONAL_INFO.socials.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <YoutubeIcon size={16} className="text-red-400" />
                <span>Kadha Cheppana Meeku</span>
              </a>
              <a href={PERSONAL_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <InstagramIcon size={16} className="text-pink-400" />
                <span>@kadhacheppana14</span>
              </a>
              <a href={PERSONAL_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <FacebookIcon size={16} className="text-blue-400" />
                <span>Facebook Channel</span>
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="inline-flex items-center gap-2 hover:text-white transition-colors mt-1">
                <Mail size={16} className="text-royal" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>© {new Date().getFullYear()} BINDU Creative Studio. All stories preserved.</div>
          <div className="flex items-center gap-6">
            <span>Powered by Next.js & Three.js</span>
            <button onClick={scrollToTop} className="inline-flex items-center gap-1.5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors" aria-label="Scroll to top">
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
