"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Sparkles, BookOpen, Palette, Type, ShieldCheck } from "lucide-react";
import { PERSONAL_INFO } from "@/data/personal-info";

// --- SOCIAL ICONS ---
export function YoutubeIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

// --- MONOGRAM ---
interface MonogramProps {
  className?: string;
  size?: number;
  variant?: "dark" | "light" | "gradient" | "monochrome";
  withOrbit?: boolean;
}

export function Monogram({
  className = "",
  size = 40,
  variant = "gradient",
  withOrbit = true,
}: MonogramProps) {
  const gradientId = `bindu-mono-grad-${variant}`;
  const orbitGradId = `bindu-orbit-grad-${variant}`;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="BINDU Monogram">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id={orbitGradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {withOrbit && (
        <ellipse cx="50" cy="50" rx="44" ry="20" transform="rotate(-28 50 50)" fill="none" stroke={`url(#${orbitGradId})`} strokeWidth="1.5" strokeDasharray="4 3" />
      )}

      <rect x="18" y="16" width="64" height="68" rx="16" fill={variant === "light" ? "#F8FAFC" : "#0E1120"} stroke={variant === "light" ? "#E2E8F0" : "#22274A"} strokeWidth="1.5" />
      <rect x="28" y="26" width="9" height="48" rx="4.5" fill={variant === "light" ? "#1E293B" : `url(#${gradientId})`} />
      <path d="M34 26H52C58.6274 26 64 30.4772 64 36C64 41.5228 58.6274 46 52 46H34V26Z" fill={variant === "light" ? "#1E293B" : `url(#${gradientId})`} />
      <path d="M34 44H55C62.1797 44 68 49.3726 68 56C68 62.6274 62.1797 68 55 68H34V44Z" fill={variant === "light" ? "#1E293B" : `url(#${gradientId})`} />
      <rect x="37" y="31.5" width="13" height="9" rx="3" fill={variant === "light" ? "#F8FAFC" : "#0E1120"} />
      <polygon points="41,49.5 56,56 41,62.5" fill={variant === "light" ? "#F8FAFC" : "#0E1120"} />
      <circle cx="47" cy="56" r="1.5" fill="#3B82F6" />
    </svg>
  );
}

// --- LOGO ---
interface LogoProps {
  className?: string;
  variant?: "dark" | "light" | "gradient";
  size?: "sm" | "md" | "lg";
  withSubtitle?: boolean;
  asLink?: boolean;
}

export function Logo({
  className = "",
  variant = "gradient",
  size = "md",
  withSubtitle = true,
  asLink = true,
}: LogoProps) {
  const monogramSizes = { sm: 32, md: 40, lg: 52 };
  const titleSizes = { sm: "text-lg", md: "text-xl", lg: "text-2xl" };

  const content = (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      <div className="relative transition-transform duration-300 group-hover:scale-105">
        <Monogram size={monogramSizes[size]} variant={variant} withOrbit={true} />
      </div>
      <div className="flex flex-col">
        <span className={`font-heading font-black tracking-[0.2em] leading-none transition-colors duration-300 ${titleSizes[size]} ${variant === "light" ? "text-slate-900" : "text-white group-hover:text-royal"}`}>
          BINDU
        </span>
        {withSubtitle && (
          <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-slate-400 group-hover:text-hyacinth transition-colors mt-0.5">
            Creative Studio
          </span>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-royal rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}

// --- ANIMATED LOGO ---
export function AnimatedLogo({ size = 80, showWordmark = true }: { size?: number; showWordmark?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-royal/30 to-hyacinth/30 blur-xl pointer-events-none"
        />
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="animLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="animOrbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.ellipse
            cx="50" cy="50" rx="45" ry="20" fill="none" stroke="url(#animOrbitGrad)" strokeWidth="1.75" strokeDasharray="6 4"
            animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} style={{ originX: "50px", originY: "50px" }}
          />
          <rect x="18" y="16" width="64" height="68" rx="16" fill="#0E1120" stroke="#22274A" strokeWidth="1.5" />
          <motion.rect x="28" y="26" width="9" height="48" rx="4.5" fill="url(#animLogoGrad)" initial={{ scaleY: 0, originY: "26px" }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} />
          <motion.path d="M34 26H52C58.6274 26 64 30.4772 64 36C64 41.5228 58.6274 46 52 46H34V26Z" fill="url(#animLogoGrad)" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} />
          <motion.path d="M34 44H55C62.1797 44 68 49.3726 68 56C68 62.6274 62.1797 68 55 68H34V44Z" fill="url(#animLogoGrad)" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} />
          <rect x="37" y="31.5" width="13" height="9" rx="3" fill="#0E1120" />
          <motion.polygon points="41,49.5 56,56 41,62.5" fill="#0E1120" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }} />
          <motion.circle cx="47" cy="56" r="1.75" fill="#3B82F6" animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </svg>
      </div>

      {showWordmark && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }} className="flex flex-col items-center">
          <span className="font-heading font-extrabold text-2xl tracking-[0.25em] text-white">BINDU</span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-royal mt-1">Creative Studio</span>
        </motion.div>
      )}
    </div>
  );
}

// --- BRAND DNA MODAL ---
export function BrandDnaModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(text);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-blackberry-dark border border-blackberry-border/60 shadow-2xl p-6 sm:p-10 z-10 text-white scrollbar-thin"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors" aria-label="Close Brand Guide">
              <X size={20} />
            </button>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal/10 border border-royal/20 text-royal text-xs font-mono uppercase tracking-widest mb-2">
                  <Sparkles size={12} /> Pomelli-Style Brand DNA
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">BINDU Creative Studio Brand Book</h2>
                <p className="font-mono text-xs text-slate-400 mt-1">&ldquo;{PERSONAL_INFO.tagline}&rdquo;</p>
              </div>
              <Logo size="md" asLink={false} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="p-6 rounded-2xl bg-blackberry/40 border border-white/5">
                <div className="flex items-center gap-2 text-royal font-mono text-xs uppercase tracking-wider mb-2">
                  <BookOpen size={14} /> Mission & Core Purpose
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">{PERSONAL_INFO.brandDNA.mission}</p>
              </div>
              <div className="p-6 rounded-2xl bg-blackberry/40 border border-white/5">
                <div className="flex items-center gap-2 text-hyacinth font-mono text-xs uppercase tracking-wider mb-2">
                  <ShieldCheck size={14} /> Brand Voice
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">{PERSONAL_INFO.brandDNA.voice}</p>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-royal mb-4">
                <Palette size={14} /> Exact Brand Color System
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {PERSONAL_INFO.brandDNA.colors.map((color) => (
                  <div key={color.hex} className="rounded-xl overflow-hidden border border-white/10 bg-blackberry/30 p-3 group hover:border-royal/50 transition-colors">
                    <div className="h-16 w-full rounded-lg mb-3 shadow-inner flex items-end justify-end p-1.5" style={{ backgroundColor: color.hex }}>
                      <button onClick={() => copyToClipboard(color.hex)} className="p-1 rounded bg-black/60 text-white/80 hover:text-white transition-opacity" title="Copy Hex">
                        {copiedHex === color.hex ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      </button>
                    </div>
                    <div className="text-xs font-semibold text-white">{color.name}</div>
                    <div className="font-mono text-[11px] text-slate-400">{color.hex}</div>
                    <div className="text-[10px] text-slate-400 mt-1 leading-tight">{color.role}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-hyacinth mb-4">
                <Type size={14} /> Typography Architecture
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-blackberry/40 border border-white/5">
                  <div className="text-[10px] font-mono uppercase text-royal">Headings & Hero</div>
                  <div className="font-heading text-lg font-bold text-white mt-1">Space Grotesk</div>
                  <p className="text-xs text-slate-400 mt-2">Geometric precision, high contrast, bold titles that command cinematic gravity.</p>
                </div>
                <div className="p-4 rounded-xl bg-blackberry/40 border border-white/5">
                  <div className="text-[10px] font-mono uppercase text-hyacinth">Body & Interface</div>
                  <div className="font-sans text-lg font-medium text-white mt-1">Inter</div>
                  <p className="text-xs text-slate-400 mt-2">Neutral clarity, optimal readability across small mobile and 4K displays.</p>
                </div>
                <div className="p-4 rounded-xl bg-blackberry/40 border border-white/5">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Labels & Microtext</div>
                  <div className="font-mono text-lg font-medium text-white mt-1">DM Mono</div>
                  <p className="text-xs text-slate-400 mt-2">Technical metadata, timestamps, camera cues, and aspect ratio notations.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
