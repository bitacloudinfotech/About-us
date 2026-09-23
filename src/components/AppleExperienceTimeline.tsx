import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, CheckCircle, Building2 } from 'lucide-react';

export const AppleExperienceTimeline: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(0);

  const experiences = [
    {
      id: 0,
      title: 'Product Owner',
      company: 'CIM Group',
      period: 'Present',
      badge: 'Product Strategy & AI Leadership',
      color: 'border-sky-500/40 text-sky-400',
      highlights: [
        'Driving data & AI product strategy, technical requirements, and multi-quarter roadmaps for enterprise platforms.',
        'Leading cross-functional engineering teams (Data Engineers, AI Specialists, UI/UX) in Agile delivery cycles.',
        'Aligning executive stakeholders with technical delivery milestones across cloud data lakehouse platforms.',
      ],
    },
    {
      id: 1,
      title: 'Sr. AI Data Engineer',
      company: 'GEO (McSquared.ai)',
      period: '2023 - 2024',
      badge: 'Agentic RAG & LLMs',
      color: 'border-emerald-500/40 text-emerald-400',
      highlights: [
        'Built agentic AI workflows for brand visibility and sentiment analytics across LLM ecosystems.',
        'Designed high-concurrency FastAPI orchestration services managing prompts, personas, and topic generation.',
        'Delivered automated insight generation and gap analysis systems with citation-backed output verification.',
      ],
    },
    {
      id: 2,
      title: 'Sr. Data Engineer',
      company: 'FIFA (Stagwell)',
      period: '2022 - 2023',
      badge: '200M+ Records & PySpark',
      color: 'border-purple-500/40 text-purple-400',
      highlights: [
        'Developed real-time social intelligence pipelines processing 200M+ global event records.',
        'Engineered distributed PySpark ETL pipelines on Azure Databricks using Delta Lake & Unity Catalog.',
        'Optimized pipeline execution with AQE, partition pruning, and Z-Order indexing, cutting costs by 35%.',
      ],
    },
    {
      id: 3,
      title: 'Sr. Data Analyst',
      company: 'MARS Veterinary (DataVista BI/AI)',
      period: '2020 - 2022',
      badge: 'Power BI & DAX Optimization',
      color: 'border-amber-500/40 text-amber-400',
      highlights: [
        'Owned end-to-end Power BI lifecycle for executive leadership across international veterinary health operations.',
        'Built complex DAX semantic models and incremental refresh pipelines.',
        'Improved dashboard load speed and query responsiveness by ~40%.',
      ],
    },
  ];

  return (
    <section id="experience" className="relative py-24 px-6 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 inline-flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Enterprise History
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Proven Enterprise Leadership.
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          5+ years of delivering high-impact data platforms, AI workflows, and technical product ownership.
        </p>
      </div>

      {/* Accordion Experience Cards */}
      <div className="space-y-4">
        {experiences.map((exp) => {
          const isExpanded = expandedId === exp.id;
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-3xl apple-glass border ${exp.color.split(' ')[0]} overflow-hidden transition-all duration-300`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl apple-glass flex items-center justify-center text-white flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white/90" />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{exp.title}</h3>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full apple-glass text-white/80">
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-sky-400 mt-1">{exp.company}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden md:inline-block px-3 py-1 rounded-full apple-glass text-xs font-semibold text-white/70">
                    {exp.badge}
                  </span>
                  <div className={`w-8 h-8 rounded-full apple-glass flex items-center justify-center text-white transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-8 md:px-8 border-t border-white/10 pt-6 space-y-4"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">Key Deliverables & Impact</div>
                    <ul className="space-y-3">
                      {exp.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-white/85 leading-relaxed font-medium">
                          <CheckCircle className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
