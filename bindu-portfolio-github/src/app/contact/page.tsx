import React from "react";
import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { ContactCtaSection } from "@/components/Sections";
import { PERSONAL_INFO } from "@/data/personal-info";

export const metadata: Metadata = {
  title: "Contact Bindu | Creative Inquiries & Collaborations",
  description:
    "Get in touch with Bindu for creative filmmaking, AI visual storytelling, cinematic advertisements, or brand narrative collaborations.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal/10 border border-royal/20 text-royal text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles size={12} />
          <span>Direct Studio Communication</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
          Connect & Collaborate
        </h1>
        <p className="font-sans text-slate-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
          Open to ambitious storytelling projects, historical docuseries, AI video production, and commercial concepts. Direct email communication with no middlemen.
        </p>
      </div>

      {/* Main Contact Section */}
      <ContactCtaSection />

      {/* Studio Working Principles FAQ */}
      <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-blackberry-dark border border-white/5">
          <h3 className="font-heading font-bold text-white text-base">
            What types of projects do you accept?
          </h3>
          <p className="font-sans text-xs text-slate-400 mt-2 leading-relaxed">
            I specialize in historical narratives, mythology-inspired scripts, science-fiction worldbuilding, AI-assisted video production, and high-impact cinematic advertisements.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-blackberry-dark border border-white/5">
          <h3 className="font-heading font-bold text-white text-base">
            How fast can I expect a response?
          </h3>
          <p className="font-sans text-xs text-slate-400 mt-2 leading-relaxed">
            I review all creative inquiries sent to <strong className="text-white">{PERSONAL_INFO.email}</strong> and typically reply within 24–48 business hours.
          </p>
        </div>
      </div>
    </div>
  );
}
