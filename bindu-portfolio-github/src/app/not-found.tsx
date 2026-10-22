import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Monogram } from "@/components/Brand";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md space-y-6">
        <div className="relative inline-block">
          <div className="absolute inset-0 rounded-full bg-royal/20 blur-2xl" />
          <Monogram size={80} variant="gradient" />
        </div>

        <h1 className="font-heading text-6xl font-black text-white">404</h1>
        <h2 className="font-heading text-2xl font-bold text-slate-200">
          Scene Lost in the Archives
        </h2>

        <p className="font-sans text-sm text-slate-400 leading-relaxed">
          The sequence or project you are looking for does not exist or has been shifted in the studio timeline.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white font-heading font-semibold text-xs tracking-wider uppercase shadow-glow-royal hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={16} />
            <span>Return to Studio Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
