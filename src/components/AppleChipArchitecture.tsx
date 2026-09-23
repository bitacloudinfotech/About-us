import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

export const AppleChipArchitecture: React.FC = () => {
  const techLogos = [
    { name: 'Databricks', src: 'data/assets/tech/databricks.svg', category: 'Lakehouse' },
    { name: 'Azure', src: 'data/assets/tech/azure.svg', category: 'Cloud Infra' },
    { name: 'OpenAI', src: 'data/assets/tech/openai.svg', category: 'LLM Engine' },
    { name: 'Claude AI', src: 'data/assets/tech/claude.svg', category: 'GenAI Agents' },
    { name: 'PySpark', src: 'data/assets/tech/pyspark.svg', category: 'Distributed Computing' },
    { name: 'FastAPI', src: 'data/assets/tech/fastapi.svg', category: 'API Service' },
    { name: 'Power BI', src: 'data/assets/tech/powerbi.svg', category: 'Analytics BI' },
    { name: 'SQL', src: 'data/assets/tech/sql.svg', category: 'Data Warehouse' },
    { name: 'Docker', src: 'data/assets/tech/docker.svg', category: 'Containers' },
    { name: 'dbt', src: 'data/assets/tech/dbt.svg', category: 'Data Modeling' },
    { name: 'LangChain', src: 'data/assets/tech/langchain.svg', category: 'Agentic RAG' },
    { name: 'GitHub Actions', src: 'data/assets/tech/githubactions.svg', category: 'CI/CD' },
  ];

  return (
    <section id="architecture" className="relative py-24 px-6 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 inline-flex items-center gap-2">
          <Cpu className="w-4 h-4" />
          Enterprise Stack Architecture
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          AI & Data Platform Architecture
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          Unified Medallion architecture (Bronze, Silver, Gold), Unity Catalog governance, and agentic AI pipelines.
        </p>
      </div>

      {/* Central Visualizer */}
      <div className="relative rounded-3xl apple-glass p-8 md:p-12 border border-white/10 overflow-hidden bg-gradient-to-b from-black via-[#161617] to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
          {/* Left Pillar */}
          <div className="space-y-6">
            <div className="apple-glass rounded-2xl p-6 border border-white/10 space-y-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                Bronze Layer
              </span>
              <h3 className="text-lg font-semibold text-white">Raw Ingestion</h3>
              <p className="text-xs text-[#86868b]">Streaming & batch data ingestion from enterprise APIs into Delta Lake storage.</p>
            </div>

            <div className="apple-glass rounded-2xl p-6 border border-white/10 space-y-3">
              <span className="px-3 py-1 rounded-full bg-slate-400/20 text-slate-200 text-xs font-semibold uppercase tracking-wider">
                Silver Layer
              </span>
              <h3 className="text-lg font-semibold text-white">Curated Cleansing</h3>
              <p className="text-xs text-[#86868b]">Deduplication, schema enforcement, and PySpark transformations at scale.</p>
            </div>
          </div>

          {/* Center Visual */}
          <div className="flex flex-col items-center justify-center text-center p-8 apple-glass rounded-3xl border border-sky-500/40 bg-sky-500/5 shadow-[0_0_50px_rgba(56,189,248,0.2)]">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-2xl mb-4 animate-pulse">
              <Cpu className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">AI & DATA ENGINE</h3>
            <p className="text-xs text-sky-400 font-semibold tracking-widest uppercase mt-1">Multi-Agent RAG & PySpark</p>
            <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-white/70 space-y-1">
              <div>• 500M+ Record Scalability</div>
              <div>• Unity Catalog Security</div>
              <div>• Citation RAG Workflows</div>
            </div>
          </div>

          {/* Right Pillar */}
          <div className="space-y-6">
            <div className="apple-glass rounded-2xl p-6 border border-white/10 space-y-3">
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold uppercase tracking-wider">
                Gold Layer
              </span>
              <h3 className="text-lg font-semibold text-white">Business Aggregates</h3>
              <p className="text-xs text-[#86868b]">Optimized DAX semantic models and executive Power BI dashboards.</p>
            </div>

            <div className="apple-glass rounded-2xl p-6 border border-white/10 space-y-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                GenAI & RAG
              </span>
              <h3 className="text-lg font-semibold text-white">Agentic Orchestration</h3>
              <p className="text-xs text-[#86868b]">FastAPI microservices connecting vector stores to OpenAI & Claude models.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Official Tech Logo Grid */}
      <div className="space-y-6">
        <h3 className="text-center text-sm font-semibold text-[#86868b] uppercase tracking-widest">
          Powered by Industry-Standard Tech Stack
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techLogos.map((logo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="apple-glass rounded-2xl p-4 flex flex-col items-center justify-center gap-3 border border-white/10 hover:border-sky-500/40 hover:bg-white/10 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="w-8 h-8 object-contain filter group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.6)] transition-all"
                />
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-white group-hover:text-sky-300 transition-colors">{logo.name}</div>
                <div className="text-[10px] text-[#86868b]">{logo.category}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
