import React from 'react';
import { Cpu, Database, Server, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export const AppleChipArchitecture: React.FC = () => {
  const techLogos = [
    { name: 'Microsoft Azure', src: getAssetUrl('assets/tech/azure.svg'), category: 'Cloud Infrastructure' },
    { name: 'Databricks', src: getAssetUrl('assets/tech/databricks.svg'), category: 'Lakehouse & PySpark' },
    { name: 'Microsoft Fabric', src: getAssetUrl('assets/tech/fabric.svg'), category: 'OneLake SaaS Platform' },
    { name: 'Power BI', src: getAssetUrl('assets/tech/powerbi.svg'), category: 'Executive Visual Analytics' },
    { name: 'OpenAI GPT-4o', src: getAssetUrl('assets/tech/openai.svg'), category: 'LLM & Agentic AI' },
    { name: 'dbt Labs', src: getAssetUrl('assets/tech/dbt.png'), category: 'Data Modeling & Tests' },
    { name: 'SQL Server', src: getAssetUrl('assets/tech/sql.svg'), category: 'Enterprise Data Warehouse' },
    { name: 'PySpark', icon: Database, category: 'Distributed Big Data Engine' },
    { name: 'FastAPI', icon: Server, category: 'High-Concurrency Microservices' },
    { name: 'Delta Lake', icon: Layers, category: 'ACID Transactions & Time Travel' },
    { name: 'LangChain & RAG', icon: Sparkles, category: 'Multi-Agent Frameworks' },
    { name: 'GitHub Actions', icon: ShieldCheck, category: 'CI/CD & DevOps Automation' },
  ];

  return (
    <section id="architecture" className="relative py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 inline-flex items-center gap-2">
          <Cpu className="w-4 h-4" />
          Enterprise Stack Architecture
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Azure Data &amp; AI Engine
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          Unified Medallion architecture (Bronze, Silver, Gold), Unity Catalog governance, OneLake
          integration, and autonomous agentic AI pipelines.
        </p>
      </div>

      {/* Central Visualizer */}
      <div className="relative rounded-3xl apple-glass p-8 md:p-12 border border-white/10 overflow-hidden bg-gradient-to-b from-black via-[#111113] to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.12)_0,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
          {/* Left Pillar */}
          <div className="space-y-6">
            <div className="apple-glass rounded-2xl p-6 border border-white/10 space-y-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                Bronze Layer
              </span>
              <h3 className="text-lg font-semibold text-white">Raw Ingestion (ADF &amp; Kafka)</h3>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Streaming and batch data ingestion from enterprise APIs, ERPs, and cloud storage into Delta Lake raw landing zones.
              </p>
            </div>

            <div className="apple-glass rounded-2xl p-6 border border-white/10 space-y-3">
              <span className="px-3 py-1 rounded-full bg-slate-400/20 text-slate-200 text-xs font-semibold uppercase tracking-wider">
                Silver Layer
              </span>
              <h3 className="text-lg font-semibold text-white">Curated Cleansing (PySpark &amp; dbt)</h3>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Automated schema validation, deduplication, incremental transformations, and referential integrity checks on every run.
              </p>
            </div>
          </div>

          {/* Center Visualizer */}
          <div className="flex flex-col items-center justify-center text-center p-8 apple-glass rounded-3xl border border-cyan-500/40 bg-cyan-500/5 shadow-[0_0_50px_rgba(0,229,255,0.2)]">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl mb-4 animate-pulse">
              <Cpu className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">AZURE DATA &amp; AI ENGINE</h3>
            <p className="text-xs text-cyan-400 font-semibold tracking-widest uppercase mt-1">
              Fabric OneLake &amp; Databricks
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-white/80 space-y-1.5 text-left w-full max-w-[220px]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>350M+ Record Scalability</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Unity Catalog Access Control</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Agentic Citation RAG Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Sub-Second Direct Lake Mode</span>
              </div>
            </div>
          </div>

          {/* Right Pillar */}
          <div className="space-y-6">
            <div className="apple-glass rounded-2xl p-6 border border-white/10 space-y-3">
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-semibold uppercase tracking-wider">
                Gold Layer
              </span>
              <h3 className="text-lg font-semibold text-white">Business Aggregates (Power BI)</h3>
              <p className="text-xs text-[#86868b] leading-relaxed">
                Optimized DAX semantic models, dynamic Row-Level Security, and executive dashboards with sub-second query responsiveness.
              </p>
            </div>

            <div className="apple-glass rounded-2xl p-6 border border-white/10 space-y-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                GenAI &amp; RAG
              </span>
              <h3 className="text-lg font-semibold text-white">Autonomous Agentic Pipelines</h3>
              <p className="text-xs text-[#86868b] leading-relaxed">
                FastAPI microservices connecting vector stores with Azure OpenAI GPT-4o for citation-backed enterprise insight generation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official Tech Logo Grid */}
      <div className="space-y-6">
        <h3 className="text-center text-xs font-semibold text-[#86868b] uppercase tracking-widest">
          Powered by Industry-Standard Tech Stack
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techLogos.map((logo, idx) => (
            <div
              key={idx}
              className="apple-glass rounded-2xl p-4 flex flex-col items-center justify-center gap-3 border border-white/10 hover:border-cyan-500/40 hover:bg-white/10 transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                {logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="w-8 h-8 object-contain filter group-hover:drop-shadow-[0_0_12px_rgba(0,229,255,0.6)] transition-all"
                  />
                ) : logo.icon ? (
                  <logo.icon className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform" />
                ) : null}
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {logo.name}
                </div>
                <div className="text-[10px] text-[#86868b]">{logo.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
