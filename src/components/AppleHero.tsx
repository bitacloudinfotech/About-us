import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Layers } from 'lucide-react';
import { BackgroundVideo } from './BackgroundVideo';

interface AppleHeroProps {
  onExplore: () => void;
  onSpecs: () => void;
}

export const AppleHero: React.FC<AppleHeroProps> = ({ onExplore, onSpecs }) => {
  return (
    <section id="top" className="relative min-h-[92vh] flex flex-col items-center justify-between px-6 pt-12 pb-16 text-center overflow-hidden">
      {/* Background Looping Video */}
      <BackgroundVideo />

      {/* Dark Gradient Vignette for Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black pointer-events-none z-[1]" />

      {/* Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center space-y-6 pt-6">
        {/* Sub-Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full apple-glass text-xs font-semibold uppercase tracking-widest text-white/90 border border-white/10 shadow-2xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span>Product Owner & AI Data Engineer</span>
        </motion.div>

        {/* Giant Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none max-w-4xl drop-shadow-2xl"
        >
          Scaling Enterprise Data <br />
          <span className="apple-text-accent">& Agentic AI Systems.</span>
        </motion.h1>

        {/* Subhead Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-[#86868b] max-w-2xl font-medium leading-relaxed"
        >
          Product Owner and AI Data Engineer with 5+ years of experience building scalable Medallion data platforms, PySpark ETL pipelines, RAG agentic workflows, and executive BI systems.
        </motion.p>

        {/* Dual CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-4"
        >
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-2xl group"
          >
            <span>Explore Architecture</span>
            <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onSpecs}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full apple-glass text-white text-sm font-semibold hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-white/20"
          >
            <span>View Technical Stack</span>
            <Layers className="w-4 h-4 text-sky-400" />
          </button>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 flex flex-col items-center gap-2 text-xs text-[#86868b] tracking-wider uppercase"
      >
        <span className="text-[11px] opacity-70">Scroll to discover</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-7 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-2.5 bg-sky-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
