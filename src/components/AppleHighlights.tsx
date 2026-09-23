import React from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, Bot, ShieldCheck, Activity } from 'lucide-react';

export const AppleHighlights: React.FC = () => {
  const highlights = [
    {
      icon: Database,
      badge: 'Scale',
      stat: '500M+',
      label: 'Production Records Processed',
      description: 'Engineered high-throughput batch and streaming ETL pipelines on Azure Databricks with PySpark & Delta Lake.',
      accent: 'from-sky-500/20 to-blue-600/5',
      border: 'border-sky-500/30',
      iconColor: 'text-sky-400',
    },
    {
      icon: Zap,
      badge: 'Speed',
      stat: '75%',
      label: 'Pipeline Runtime Reduction',
      description: 'Optimized legacy workflows from 8–9 hours down to 1–2 hours using AQE, custom partitioning, and caching.',
      accent: 'from-purple-500/20 to-indigo-600/5',
      border: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      icon: Bot,
      badge: 'AI & GenAI',
      stat: 'FastAPI',
      label: 'Agentic RAG Workflows',
      description: 'Orchestrated multi-agent LLM systems with citation-backed insight generation and persona prompt engineering.',
      accent: 'from-emerald-500/20 to-teal-600/5',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
    {
      icon: ShieldCheck,
      badge: 'Leadership',
      stat: '40%',
      label: 'Power BI Performance Boost',
      description: 'Product Owner driving cross-functional engineering for CIM Group, FIFA (Stagwell), and MARS Veterinary.',
      accent: 'from-amber-500/20 to-orange-600/5',
      border: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
  ];

  return (
    <section id="overview" className="relative py-24 px-6 max-w-6xl mx-auto space-y-12">
      {/* Apple Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Core Highlights
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Get the highlights.
          </h2>
        </div>
        <p className="text-[#86868b] text-base max-w-md font-medium">
          Built for scale, speed, and intelligence across enterprise data platforms and AI workflows.
        </p>
      </div>

      {/* Bento Grid Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-3xl p-8 apple-glass-card border ${card.border} overflow-hidden group hover:scale-[1.01] transition-transform duration-300`}
          >
            {/* Ambient Accent Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`} />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl apple-glass flex items-center justify-center ${card.iconColor}`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full apple-glass text-xs font-semibold text-white/80 uppercase tracking-wider">
                  {card.badge}
                </span>
              </div>

              <div>
                <div className="text-5xl sm:text-6xl font-bold text-white tracking-tight mb-2">
                  {card.stat}
                </div>
                <h3 className="text-xl font-semibold text-white/95">
                  {card.label}
                </h3>
              </div>

              <p className="text-[#86868b] text-sm leading-relaxed font-medium">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
