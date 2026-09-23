import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Activity, Code } from 'lucide-react';

export const AppleBadgesGallery: React.FC = () => {
  const badges = [
    { title: 'Azure Data Engineer Associate', src: 'data/badges/1.svg', issuer: 'Microsoft Certified' },
    { title: 'Databricks Data Engineer Professional', src: 'data/badges/2.svg', issuer: 'Databricks' },
    { title: 'Power BI Data Analyst Associate', src: 'data/badges/3.svg', issuer: 'Microsoft Certified' },
    { title: 'AI & LLM Architecture Specialist', src: 'data/badges/4.svg', issuer: 'AI Platform' },
    { title: 'Python & PySpark Certified', src: 'data/badges/5.svg', issuer: 'Apache Spark' },
    { title: 'Certified Agile Product Owner', src: 'data/badges/6.svg', issuer: 'Scrum Alliance' },
  ];

  return (
    <section id="badges" className="relative py-24 px-6 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 inline-flex items-center gap-2">
          <Award className="w-4 h-4" />
          Verified Credentials & Heatmap
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Certified Excellence.
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          Industry credentials across Azure, Databricks, Power BI, LLMs, and Agile Product Leadership, backed by daily GitHub activity.
        </p>
      </div>

      {/* 3D Tilt Badge Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {badges.map((badge, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="apple-glass rounded-3xl p-6 border border-white/10 flex flex-col items-center text-center space-y-4 hover:border-amber-500/40 hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
          >
            <div className="w-32 h-32 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/25 transition-all" />
              <img
                src={badge.src}
                alt={badge.title}
                className="w-28 h-28 object-contain relative z-10 filter group-hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                {badge.issuer}
              </span>
              <h3 className="text-base font-semibold text-white group-hover:text-amber-200 transition-colors">
                {badge.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* GitHub Activity & Info Card Display */}
      <div className="space-y-6 pt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-sky-400" />
            <span>GitHub Live Activity & Info Card</span>
          </h3>
          <span className="text-xs text-[#86868b]">Auto-Refreshed Data Assets</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Heatmap Card */}
          <div className="apple-glass rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-white/80">
              <span className="flex items-center gap-1.5"><Activity size={14} className="text-sky-400" /> Contribution Graph</span>
              <span className="text-sky-400 font-mono">tushar@github</span>
            </div>
            <div className="p-2 apple-glass rounded-2xl border border-white/5 overflow-hidden flex justify-center bg-black/40">
              <img
                src="data/contrib-heatmap.svg"
                alt="GitHub Contribution Graph"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Info Card */}
          <div className="apple-glass rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-white/80">
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-400" /> Verified Info Card</span>
              <span className="text-emerald-400 font-mono">whoami</span>
            </div>
            <div className="p-2 apple-glass rounded-2xl border border-white/5 overflow-hidden flex justify-center bg-black/40">
              <img
                src="data/info-card.svg"
                alt="Tushar Kashyap Info Card"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
