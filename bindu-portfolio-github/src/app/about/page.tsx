import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Compass, ArrowUpRight, BookOpen } from "lucide-react";
import { getAssetsManifest } from "@/lib/asset-discovery";
import { PERSONAL_INFO } from "@/data/personal-info";
import { Monogram, YoutubeIcon, InstagramIcon, FacebookIcon } from "@/components/Brand";
import { SkillsBentoSection } from "@/components/Sections";

export const metadata: Metadata = {
  title: "About Bindu | Creative Filmmaker & AI Visual Storyteller",
  description:
    "Learn about Bindu's creative journey in AI-assisted filmmaking, historical narratives, mythology-inspired storytelling, and Kadha Cheppana Meeku.",
};

export const revalidate = 0;

export default function AboutPage() {
  const manifest = getAssetsManifest();
  const profileImage = manifest.profileImage;

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal/10 border border-royal/20 text-royal text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles size={12} />
          <span>About The Creator</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Storytelling Is My Language. <br />
          <span className="text-gradient-accent">Creativity Is My Signature.</span>
        </h1>
        <p className="font-mono text-xs sm:text-sm text-slate-400 mt-4 tracking-wider uppercase">
          {PERSONAL_INFO.role}
        </p>
      </div>

      {/* Main Narrative & Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="rounded-3xl bg-blackberry-dark border border-white/10 p-6 shadow-2xl relative overflow-hidden">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-jet mb-6">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt={PERSONAL_INFO.name}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blackberry to-jet text-center">
                  <Monogram size={96} variant="gradient" withOrbit={true} />
                  <h3 className="font-heading font-black text-2xl text-white tracking-widest uppercase mt-6">
                    {PERSONAL_INFO.brandName}
                  </h3>
                  <p className="font-mono text-xs text-royal uppercase tracking-widest mt-1">
                    {PERSONAL_INFO.channelName}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Profile Bio Card Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white">
                    {PERSONAL_INFO.name}
                  </h2>
                  <p className="font-mono text-xs text-slate-400">
                    {PERSONAL_INFO.brandExtended}
                  </p>
                </div>
                <div className="p-2.5 rounded-full bg-royal/10 text-royal">
                  <Compass size={22} />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2 text-xs font-mono text-slate-400">
                <div className="flex justify-between">
                  <span className="text-slate-500">Channel</span>
                  <span className="text-white font-medium">{PERSONAL_INFO.channelName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-royal hover:underline"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/5">
                <a
                  href={PERSONAL_INFO.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-red-400 transition-colors"
                  title="YouTube"
                >
                  <YoutubeIcon size={18} />
                </a>
                <a
                  href={PERSONAL_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-pink-400 transition-colors"
                  title="Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href={PERSONAL_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-blue-400 transition-colors"
                  title="Facebook"
                >
                  <FacebookIcon size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Full Official About Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-blackberry/40 border border-white/10 space-y-6 leading-relaxed">
            <div className="flex items-center gap-2 text-royal font-mono text-xs uppercase tracking-widest">
              <BookOpen size={14} />
              <span>Full Narrative Biography</span>
            </div>

            {PERSONAL_INFO.about.fullBioParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className={`text-slate-300 font-sans text-base sm:text-lg leading-relaxed ${
                  idx === 0 ? "font-medium text-white text-lg sm:text-xl" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="font-mono text-xs text-hyacinth uppercase tracking-widest">
                — {PERSONAL_INFO.name}
              </span>
              <span className="font-mono text-xs text-slate-500">
                {PERSONAL_INFO.brandExtended}
              </span>
            </div>
          </div>

          {/* Brand DNA Card Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-royal/15 via-hyacinth/15 to-transparent border border-royal/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading font-bold text-white text-xl">
                &ldquo;{PERSONAL_INFO.tagline}&rdquo;
              </h3>
              <p className="font-sans text-xs text-slate-300 mt-1">
                Explore the complete Pomelli-style Brand Book and design philosophy.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white text-xs font-heading font-semibold uppercase tracking-wider flex-shrink-0 shadow-glow-royal hover:opacity-90 transition-opacity"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Specialties & Creative Ecosystem Bento */}
      <SkillsBentoSection />
    </div>
  );
}
