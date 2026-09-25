import React, { useState, useMemo } from 'react';
import { CheckCircle2, X, ChevronRight, Copy, Check, Layers } from 'lucide-react';
import { toast } from 'sonner';
import { getAssetUrl } from '../utils/assets';

interface TechPlatform {
  id: string;
  title: string;
  category: string;
  filterCategory: string;
  icon: string;
  badge: string;
  shortDesc: string;
  specs: string[];
}

const techPlatforms: TechPlatform[] = [
  {
    id: 'fabric',
    title: 'Microsoft Fabric & OneLake',
    category: 'SaaS Lakehouse Architecture',
    filterCategory: 'Lakehouse',
    icon: getAssetUrl('assets/tech/fabric.svg'),
    badge: 'Lakehouse',
    shortDesc:
      'Unified SaaS OneLake lakehouse architecture with Direct Lake mode for zero-copy, sub-second analytical queries on multi-petabyte datasets.',
    specs: [
      'OneLake single data copy shared across Fabric workloads with zero unnecessary data duplication.',
      'Direct Lake mode execution for sub-second Power BI queries directly on Delta tables.',
      'Lakehouse Medallion architecture (Bronze → Silver → Gold) with automated streaming and batch delta refresh.',
    ],
  },
  {
    id: 'adf',
    title: 'Azure Data Factory (ADF)',
    category: 'Pipeline Automation & ETL/ELT',
    filterCategory: 'Pipelines',
    icon: getAssetUrl('assets/tech/azure.svg'),
    badge: 'ETL / ELT',
    shortDesc:
      'Orchestrating enterprise-grade Azure Data Factory pipelines for high-volume data movement, hybrid cloud ingestion, and event-based triggers.',
    specs: [
      'Self-hosted Integration Runtimes for hybrid on-premises-to-cloud data ingestion with private endpoints.',
      'Dynamic Parameterized Pipelines utilizing Copy, Data Flow, Lookup & ForEach activities.',
      'Automated trigger scheduling (tumbling window & event-based) with end-to-end Azure Monitor telemetry.',
    ],
  },
  {
    id: 'databricks',
    title: 'Databricks & PySpark',
    category: 'Distributed Big Data Processing',
    filterCategory: 'Lakehouse',
    icon: getAssetUrl('assets/tech/databricks.svg'),
    badge: 'Data & AI',
    shortDesc:
      'Scalable PySpark distributed processing, Delta Lake ACID storage, and ML model deployment on Databricks auto-scaling compute clusters.',
    specs: [
      'Delta Lake ACID transactions with time-travel query auditing for regulatory compliance.',
      'PySpark distributed processing with Adaptive Query Execution (AQE) reducing runtimes by 75%.',
      'MLflow experiment tracking, model registry, and automated Databricks Model Serving inference.',
    ],
  },
  {
    id: 'powerbi',
    title: 'Power BI & DAX Analytics',
    category: 'Executive Business Intelligence',
    filterCategory: 'Analytics',
    icon: getAssetUrl('assets/tech/powerbi.svg'),
    badge: 'BI Visuals',
    shortDesc:
      'Transforming raw lakehouse tables into executive-ready real-time Power BI dashboards with advanced DAX semantic models and dynamic RLS.',
    specs: [
      'Advanced DAX measures, calculation groups, and dynamic Row-Level Security (RLS) for multi-tenant reporting.',
      'Direct Lake & DirectQuery composite models optimized for instant query responsiveness.',
      'Seamless integration with Fabric OneLake datasets and Azure Analysis Services tabular models.',
    ],
  },
  {
    id: 'dbt',
    title: 'dbt Transformation Layer',
    category: 'Modern Data Stack Governance',
    filterCategory: 'Pipelines',
    icon: getAssetUrl('assets/tech/dbt.png'),
    badge: 'Transform',
    shortDesc:
      'Modular, version-controlled SQL data transformations with automated testing, auto-generated lineage graphs, and documentation.',
    specs: [
      'Modular SQL model building with Jinja templating, custom macros, and cross-database ref() resolution.',
      'Automated schema validation, uniqueness assertions, and referential integrity checks on every commit.',
      'Auto-generated DAG lineage graphs and data catalog documentation published to CI/CD portals.',
    ],
  },
  {
    id: 'ai',
    title: 'Enterprise AI & RAG Agents',
    category: 'Generative AI & LLM Systems',
    filterCategory: 'AI / LLM',
    icon: getAssetUrl('assets/tech/openai.svg'),
    badge: 'AI / LLM',
    shortDesc:
      'Building production LLM agents, RAG pipelines with vector stores, and autonomous insight generation using Azure OpenAI GPT-4o.',
    specs: [
      'Azure OpenAI GPT-4o integration for enterprise knowledge bases and multi-format document intelligence.',
      'RAG (Retrieval-Augmented Generation) pipelines with hybrid vector search on structured + unstructured data.',
      'PySpark feature stores and automated inference endpoints with LangChain agent orchestration.',
    ],
  },
];

const filterTabs = ['All', 'Pipelines', 'Lakehouse', 'Analytics', 'AI / LLM'];

export const AppleCapabilities: React.FC = () => {
  const [selected, setSelected] = useState<TechPlatform | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [copied, setCopied] = useState(false);

  const filteredPlatforms = useMemo(() => {
    return activeFilter === 'All'
      ? techPlatforms
      : techPlatforms.filter((p) => p.filterCategory === activeFilter);
  }, [activeFilter]);

  const copySpecs = (tech: TechPlatform) => {
    const text = `${tech.title} (${tech.category})\n\n${tech.shortDesc}\n\nTechnical Specifications:\n${tech.specs
      .map((s) => `• ${s}`)
      .join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${tech.title} specs copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="capabilities" className="relative py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Capabilities &amp; Platforms
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Enterprise Cloud Capabilities
          </h2>
          <p className="text-[#86868b] text-base max-w-xl font-medium">
            Production-proven implementations across Microsoft Fabric, Azure Data Factory, Power BI,
            Databricks, dbt, and autonomous LLM agents.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl apple-glass border border-white/10">
          {filterTabs.map((tab) => {
            const active = activeFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-white text-black shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Capability Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlatforms.map((tech) => (
          <div
            key={tech.id}
            onClick={() => setSelected(tech)}
            className="apple-glass rounded-3xl p-7 flex flex-col justify-between space-y-6 border border-white/10 hover:border-cyan-500/40 hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl apple-glass p-2 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
                  <img
                    src={tech.icon}
                    alt={tech.title}
                    className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                  />
                </div>
                <span className="px-2.5 py-1 rounded-full apple-glass text-[10px] font-semibold text-cyan-300 uppercase tracking-wider">
                  {tech.badge}
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#86868b]">
                  {tech.category}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {tech.title}
                </h3>
                <p className="text-xs text-[#86868b] leading-relaxed pt-1">
                  {tech.shortDesc}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
              <span>View Technical Specifications</span>
              <ChevronRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div className="apple-glass rounded-3xl p-8 max-w-lg w-full border border-white/15 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full apple-glass flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl apple-glass p-2.5 flex items-center justify-center border border-white/10 shrink-0">
                <img src={selected.icon} alt={selected.title} className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-400">
                  {selected.category}
                </span>
                <h3 className="text-xl font-bold text-white">{selected.title}</h3>
              </div>
            </div>

            <p className="text-xs text-[#86868b] leading-relaxed">{selected.shortDesc}</p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-white/60">
                  Technical Specifications
                </span>
                <button
                  onClick={() => copySpecs(selected)}
                  className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy Specs'}</span>
                </button>
              </div>

              <ul className="space-y-2.5">
                {selected.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-white/85 leading-relaxed">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelected(null)}
                className="flex-1 py-2.5 rounded-full apple-glass text-xs font-semibold text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={() => setSelected(null)}
                className="flex-1 py-2.5 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90 transition-all text-center cursor-pointer shadow-lg"
              >
                Consult on {selected.badge}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
