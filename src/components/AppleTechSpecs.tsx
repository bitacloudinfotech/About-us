import React, { useState } from 'react';
import { Layers, Check, Calculator, Cpu, Database, Shield, Star, ArrowUpRight } from 'lucide-react';

interface AppleTechSpecsProps {
  onSelectTier?: (tierName: string) => void;
}

export const AppleTechSpecs: React.FC<AppleTechSpecsProps> = ({ onSelectTier }) => {
  const [selectedEngagement, setSelectedEngagement] = useState<string>('retainer');

  const specCategories = [
    {
      id: 'data',
      category: 'Data Platform & Distributed Compute',
      icon: Database,
      items: [
        { label: 'Cloud Lakehouse', spec: 'Azure Databricks Medallion (Bronze / Silver / Gold)' },
        { label: 'Distributed Engine', spec: 'Apache PySpark 3.x with Adaptive Query Execution (AQE)' },
        { label: 'Storage & ACID Format', spec: 'Delta Lake ACID Transactions & Z-Order Indexing' },
        { label: 'Unified Governance', spec: 'Unity Catalog Unified Access Control & Lineage' },
        { label: 'Capacity & Scale', spec: '350M+ Daily Records Batch & Real-Time Streaming' },
      ],
    },
    {
      id: 'ai',
      category: 'AI & GenAI Orchestration',
      icon: Cpu,
      items: [
        { label: 'Microservices Framework', spec: 'FastAPI High-Concurrency Async Endpoints' },
        { label: 'LLM Orchestration', spec: 'Azure OpenAI GPT-4o, Claude 3.5 Sonnet, LangChain' },
        { label: 'Retrieval Paradigm', spec: 'Enterprise RAG with Hybrid Vector Search' },
        { label: 'Prompt Architecture', spec: 'Multi-Persona Dynamic Prompt Systems & Verification' },
        { label: 'Agentic Workflows', spec: 'Autonomous Gap Analysis & Real-Time Citations' },
      ],
    },
    {
      id: 'bi',
      category: 'BI & Analytics Engineering',
      icon: Layers,
      items: [
        { label: 'Primary BI Tool', spec: 'Microsoft Power BI Desktop & Service' },
        { label: 'Query & Modeling', spec: 'Advanced DAX, Direct Lake Mode, Star & Snowflake Schemas' },
        { label: 'SaaS Fabric OneLake', spec: 'Direct Lake sub-second queries on petabyte datasets' },
        { label: 'Transformation Layer', spec: 'dbt Labs (modular SQL models, lineage, automated tests)' },
        { label: 'Security Standard', spec: 'Dynamic Row-Level Security (RLS) & Workspace Scopes' },
      ],
    },
    {
      id: 'devops',
      category: 'DevOps & Enterprise Governance',
      icon: Shield,
      items: [
        { label: 'Deployment CI/CD', spec: 'GitHub Actions Automated Testing & Deployments' },
        { label: 'Infrastructure as Code', spec: 'Azure Bicep & Terraform Enterprise Templates' },
        { label: 'Security & Compliance', spec: 'SOC 2, HIPAA, GDPR & ISO 27001 Aligned Default' },
        { label: 'IP Ownership Transfer', spec: 'Full IP transfer to client on day one' },
      ],
    },
  ];

  const engagementTiers = [
    {
      id: 'sprint',
      name: 'Fixed-Scope Sprint',
      price: 'From $15,000',
      duration: '2 – 6 Weeks',
      deliverables:
        'Well-scoped projects: specific ADF pipeline, Power BI suite, dbt transformation layer, or Fabric lakehouse build. Fixed SOW, no cost surprises.',
      highlight: false,
    },
    {
      id: 'retainer',
      name: 'Monthly Dedicated Retainer',
      price: 'From $8,000 / mo',
      duration: 'Full-Time Capacity',
      deliverables:
        'Named senior certified Azure data engineer embedded with your team (160 hrs/mo). Direct Slack & WhatsApp access. Cancel anytime — no lock-in.',
      highlight: true,
      badge: 'Most Popular',
    },
    {
      id: 'program',
      name: 'Enterprise Transformation',
      price: 'From $120,000',
      duration: 'Multi-Quarter Roadmap',
      deliverables:
        'Full delivery team (3–5 certified engineers) with dedicated program manager, lakehouse architecture, governance, and executive C-suite reporting.',
      highlight: false,
    },
  ];

  const handleSelect = (id: string, name: string) => {
    setSelectedEngagement(id);
    if (onSelectTier) onSelectTier(name);
  };

  return (
    <section id="specs" className="relative py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 inline-flex items-center gap-2">
          <Layers className="w-4 h-4" />
          Technical Stack &amp; Capabilities
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Technical Specifications
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          Comprehensive breakdown of data platform architecture, AI frameworks, governance standards,
          and transparent engagement models.
        </p>
      </div>

      {/* Tech Specs Matrix Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {specCategories.map((cat) => (
          <div key={cat.id} className="apple-glass rounded-3xl p-8 border border-white/10 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl apple-glass flex items-center justify-center text-cyan-400">
                <cat.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{cat.category}</h3>
            </div>

            <div className="space-y-4">
              {cat.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-sm border-b border-white/5 pb-3"
                >
                  <span className="text-[#86868b] font-medium">{item.label}</span>
                  <span className="text-white font-semibold text-right sm:max-w-xs">{item.spec}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Options Selector */}
      <div id="pricing" className="apple-glass rounded-3xl p-8 md:p-12 border border-white/10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Calculator className="w-5 h-5 text-cyan-400" />
              <span>Transparent Engagement Models</span>
            </div>
            <p className="text-xs text-[#86868b]">
              Select an engagement model to explore deliverables, team capacity, and scope.
            </p>
          </div>

          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all shadow-lg flex items-center gap-1.5 w-fit"
          >
            <span>Book Discovery Call</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {engagementTiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => handleSelect(tier.id, tier.name)}
              className={`text-left p-7 rounded-2xl apple-glass border transition-all cursor-pointer relative ${
                selectedEngagement === tier.id
                  ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(0,229,255,0.2)]'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-6">
                  <span className="flex items-center gap-1 text-[10px] font-bold px-3 py-0.5 rounded-full bg-cyan-400 text-black shadow-md uppercase tracking-wider">
                    <Star size={10} fill="currentColor" />
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-3 pt-1">
                <span className="px-2.5 py-0.5 rounded-full apple-glass text-[10px] font-semibold text-cyan-300 uppercase tracking-wider">
                  {tier.duration}
                </span>
                {selectedEngagement === tier.id && <Check className="w-4 h-4 text-cyan-400" />}
              </div>

              <h4 className="text-lg font-bold text-white mb-1">{tier.name}</h4>
              <div className="text-2xl font-black text-white tracking-tight mb-3">
                {tier.price}
              </div>
              <p className="text-xs text-[#86868b] leading-relaxed">{tier.deliverables}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
