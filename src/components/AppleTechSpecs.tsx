import React from 'react';
import { Layers, Cpu, Database, Shield } from 'lucide-react';

export const AppleTechSpecs: React.FC = () => {
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
          and enterprise delivery capabilities.
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
    </section>
  );
};
