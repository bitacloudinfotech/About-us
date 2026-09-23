import React, { useState } from 'react';
import { Layers, Check, Calculator, Cpu, Database, Shield } from 'lucide-react';

export const AppleTechSpecs: React.FC = () => {
  const [selectedEngagement, setSelectedEngagement] = useState<string>('rag');

  const specCategories = [
    {
      id: 'data',
      category: 'Data Platform & Distributed Compute',
      icon: Database,
      items: [
        { label: 'Cloud Architecture', spec: 'Azure Databricks Medallion (Bronze / Silver / Gold)' },
        { label: 'Distributed Engine', spec: 'Apache PySpark 3.x with Adaptive Query Execution (AQE)' },
        { label: 'Storage Format', spec: 'Delta Lake ACID Transactions & Z-Order Indexing' },
        { label: 'Data Governance', spec: 'Unity Catalog Unified Access Control & Lineage' },
        { label: 'Volume Capacity', spec: '500M+ Records Batch & Real-Time Streaming' },
      ],
    },
    {
      id: 'ai',
      category: 'AI & GenAI Orchestration',
      icon: Cpu,
      items: [
        { label: 'Microservices Framework', spec: 'FastAPI High-Concurrency Async Endpoints' },
        { label: 'LLM Orchestration', spec: 'OpenAI GPT-4o, Claude 3.5 Sonnet, LangChain Agents' },
        { label: 'Retrieval Paradigm', spec: 'RAG (Retrieval-Augmented Generation) with Vector Stores' },
        { label: 'Prompt Architecture', spec: 'Multi-Persona Dynamic Prompt Systems & Citation Tracking' },
        { label: 'Agentic Workflows', spec: 'Brand Visibility & Automated Insight Gap Analysis' },
      ],
    },
    {
      id: 'bi',
      category: 'BI & Analytics Engineering',
      icon: Layers,
      items: [
        { label: 'Primary BI Tool', spec: 'Microsoft Power BI Desktop & Service' },
        { label: 'Query Language', spec: 'Advanced DAX & T-SQL Data Warehouse Optimization' },
        { label: 'Modeling Standard', spec: 'Star Schema, Snowflake Schema, Tabular Semantic Models' },
        { label: 'Performance Boost', spec: '40% Load Time Gain via DirectQuery Tuning & Aggregations' },
        { label: 'Transformation Layer', spec: 'dbt (data build tool) & Dataverse Dataflow Automation' },
      ],
    },
    {
      id: 'devops',
      category: 'DevOps & Product Ownership',
      icon: Shield,
      items: [
        { label: 'Product Leadership', spec: 'Agile Product Owner (Roadmaps, Backlog Grooming, Sprints)' },
        { label: 'Containerization', spec: 'Docker & Kubernetes Pod Orchestration' },
        { label: 'CI/CD Pipelines', spec: 'GitHub Actions Automated Testing & Deployment' },
        { label: 'Version Control', spec: 'Git, GitHub Enterprise Workflows & PR Reviews' },
      ],
    },
  ];

  const engagementTiers = [
    {
      id: 'rag',
      name: 'Agentic AI & RAG Orchestration',
      duration: '4 – 8 Weeks',
      deliverables: 'FastAPI microservices, vector DB setup, prompt engineering, citation verification.',
    },
    {
      id: 'medallion',
      name: 'Medallion Data Lakehouse Architecture',
      duration: '6 – 12 Weeks',
      deliverables: 'Bronze/Silver/Gold Delta Lake, PySpark pipeline optimization (75% speedup), Unity Catalog governance.',
    },
    {
      id: 'bi-adv',
      name: 'Power BI Performance Tuning & Advisory',
      duration: '2 – 4 Weeks',
      deliverables: 'DAX refactoring, semantic modeling, 40% dashboard load speed acceleration, executive reporting.',
    },
  ];

  return (
    <section id="specs" className="relative py-24 px-6 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 inline-flex items-center gap-2">
          <Layers className="w-4 h-4" />
          Technical Stack & Expertise
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Technical Specifications
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          Comprehensive breakdown of data platform architecture, AI frameworks, governance standards, and delivery capabilities.
        </p>
      </div>

      {/* Tech Specs Matrix Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {specCategories.map((cat) => (
          <div key={cat.id} className="apple-glass rounded-3xl p-8 border border-white/10 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl apple-glass flex items-center justify-center text-sky-400">
                <cat.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{cat.category}</h3>
            </div>

            <div className="space-y-4">
              {cat.items.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-sm border-b border-white/5 pb-3">
                  <span className="text-[#86868b] font-medium">{item.label}</span>
                  <span className="text-white font-semibold text-right sm:max-w-xs">{item.spec}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Options Selector */}
      <div className="apple-glass rounded-3xl p-8 md:p-12 border border-white/10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-400" />
              <span>Project Collaboration & Advisory</span>
            </div>
            <p className="text-xs text-[#86868b]">Select a focus area to view deliverables and engagement scope.</p>
          </div>

          <a
            href="mailto:tushar_kashyap@outlook.com"
            className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all shadow-lg w-fit"
          >
            Contact for Collaboration
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {engagementTiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedEngagement(tier.id)}
              className={`text-left p-6 rounded-2xl apple-glass border transition-all cursor-pointer ${
                selectedEngagement === tier.id
                  ? 'border-sky-400 bg-sky-500/10 shadow-[0_0_25px_rgba(56,189,248,0.2)]'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full apple-glass text-[10px] font-semibold text-sky-300 uppercase tracking-wider">
                  {tier.duration}
                </span>
                {selectedEngagement === tier.id && <Check className="w-4 h-4 text-sky-400" />}
              </div>
              <h4 className="text-base font-bold text-white mb-2">{tier.name}</h4>
              <p className="text-xs text-[#86868b] leading-relaxed">{tier.deliverables}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
