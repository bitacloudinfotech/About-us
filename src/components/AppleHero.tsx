import React from 'react';
import { ChevronRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { BackgroundVideo } from './BackgroundVideo';

interface AppleHeroProps {
  onExplore: () => void;
  onSpecs: () => void;
}

export const AppleHero: React.FC<AppleHeroProps> = ({ onExplore, onSpecs }) => {
  return (
    <section
      id="top"
      className="relative min-h-[94vh] flex flex-col items-center justify-between px-6 pt-16 pb-16 text-center overflow-hidden"
    >
      {/* Background Looping High-Tech Video */}
      <BackgroundVideo />

      {/* Dark Gradient Vignette for Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black pointer-events-none z-[1]" />

      {/* Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center space-y-7 pt-4">
        {/* Pill Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full apple-glass text-xs font-semibold uppercase tracking-widest text-white/90 border border-white/10 shadow-2xl animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>100% Certified Enterprise Azure Data &amp; AI Firm</span>
        </div>

        {/* Massive Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none max-w-5xl drop-shadow-2xl">
          Scaling Enterprise Azure Data <br />
          <span className="apple-text-accent">&amp; Agentic AI Systems.</span>
        </h1>

        {/* Subhead Description */}
        <p className="text-base sm:text-lg md:text-xl text-[#86868b] max-w-2xl font-medium leading-relaxed">
          Specialist engineering firm architecting high-throughput Medallion lakehouses, Microsoft
          Fabric pipelines, PySpark distributed compute, and production LLM RAG agents processing
          350M+ daily records.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-2xl group cursor-pointer"
          >
            <span>Explore Architecture</span>
            <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onSpecs}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full apple-glass text-white text-sm font-semibold hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
          >
            <span>View Technical Stack</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
          {[
            '6 Active Certifications',
            '350M+ Records / Day',
            '99.99% Pipeline SLA',
            '16x Faster Delivery',
          ].map((kpi, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs text-white/80 apple-glass border border-white/10 font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              {kpi}
            </span>
          ))}
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-xs text-[#86868b] tracking-wider uppercase pt-6">
        <span className="text-[11px] opacity-70">Scroll to discover</span>
        <div className="w-7 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
