import React, { useState } from 'react';
import { Briefcase, ChevronDown, CheckCircle, Building2, Quote, Star } from 'lucide-react';

export const AppleExperienceTimeline: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(0);

  const experiences = [
    {
      id: 0,
      title: 'Global Logistics Corp',
      company: 'Enterprise Logistics & Supply Chain',
      period: 'Verified Client Delivery',
      badge: '350M+ Records / Day',
      color: 'border-cyan-500/40 text-cyan-400',
      leader: 'Sarah Jenkins — Chief Data Officer',
      quote:
        'BITA CLOUD transformed our fragmented data into automated real-time Azure pipelines and Power BI dashboards. Our reporting lag went from 24 hours to under 5 minutes.',
      highlights: [
        'Designed high-throughput batch and streaming Azure Data Factory pipelines ingesting 350M+ daily records across global freight networks.',
        'Migrated legacy on-premises SQL Server warehouses to Microsoft Fabric OneLake with automated delta refresh.',
        'Implemented Power BI Direct Lake mode, eliminating overnight batch delays for C-level operations dashboards.',
      ],
    },
    {
      id: 1,
      title: 'FinTech Dynamics',
      company: 'Digital Banking & Payments',
      period: 'Verified Client Delivery',
      badge: 'Modern Data Stack & dbt',
      color: 'border-purple-500/40 text-purple-400',
      leader: 'Marcus Vance — VP of Engineering',
      quote:
        'Their expertise in Azure Data Factory and Microsoft Fabric saved our team months of manual architecture work. The dbt transformation layer they built is now our core data stack.',
      highlights: [
        'Built modular, version-controlled dbt transformation layer with automated schema tests, uniqueness assertions, and auto-generated data lineage.',
        'Architected real-time transaction reconciliation pipelines with zero-copy Direct Lake queries.',
        'Enforced strict banking compliance with dynamic Row-Level Security (RLS) and Azure Active Directory tenant separation.',
      ],
    },
    {
      id: 2,
      title: 'Apex Healthcare Network',
      company: 'Multi-Hospital Health System (200+ Hospitals)',
      period: 'Verified Client Delivery',
      badge: 'HIPAA & Databricks Lakehouse',
      color: 'border-emerald-500/40 text-emerald-400',
      leader: 'Elena Rostova — Head of Enterprise Architecture',
      quote:
        'The Databricks lakehouse and Power BI dashboards they delivered gave our executive board real-time operational clarity across all 12 business units. Exceptional delivery.',
      highlights: [
        'Implemented unified Medallion architecture (Bronze, Silver, Gold) on Azure Databricks with PySpark auto-scaling clusters.',
        'HIPAA-compliant data governance using Databricks Unity Catalog for column-level and row-level access control.',
        'Reduced ETL pipeline execution from 8 hours down to 1.5 hours using Adaptive Query Execution and Delta Lake Z-Ordering.',
      ],
    },
  ];

  const switchReasons = [
    { from: 'Generic IT Agency', issue: 'Projects handed to junior developers with no deep Azure/Databricks specialization.', switched: '12 clients' },
    { from: 'In-House Hiring', issue: 'Months to source and $80–150K ramp-up costs before first pipeline deployment.', switched: '8 clients' },
    { from: 'Big-4 Consulting', issue: 'High-overhead billing, slow delivery cycles, and senior partners substituted by trainees.', switched: '7 clients' },
    { from: 'Offshore Bodyshop', issue: 'Communication gaps, architectural debt, poor code quality, and frequent rework cycles.', switched: '9 clients' },
  ];

  return (
    <section id="experience" className="relative py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 inline-flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Enterprise Milestones &amp; Proof
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Proven Enterprise Impact.
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          Production data platforms, sub-minute reporting pipelines, and certified engineering
          delivered across global enterprises.
        </p>
      </div>

      {/* Accordion Experience Cards */}
      <div className="space-y-4">
        {experiences.map((exp) => {
          const isExpanded = expandedId === exp.id;
          return (
            <div
              key={exp.id}
              className={`rounded-3xl apple-glass border ${exp.color.split(' ')[0]} overflow-hidden transition-all duration-300`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl apple-glass flex items-center justify-center text-white shrink-0">
                    <Building2 className="w-6 h-6 text-cyan-400" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        {exp.title}
                      </h3>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full apple-glass text-white/80">
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-cyan-400 mt-1">{exp.company}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden md:inline-block px-3 py-1 rounded-full apple-glass text-xs font-semibold text-white/70">
                    {exp.badge}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full apple-glass flex items-center justify-center text-white transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-8 md:px-8 border-t border-white/10 pt-6 space-y-6">
                  {/* Quote block */}
                  <div className="apple-glass rounded-2xl p-5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white/90 flex items-center gap-1.5">
                        <Quote size={13} className="text-cyan-400" />
                        {exp.leader}
                      </span>
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-[#86868b] italic leading-relaxed">
                      "{exp.quote}"
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                      Key Deliverables &amp; Enterprise Impact
                    </div>
                    <ul className="space-y-3">
                      {exp.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-white/85 leading-relaxed font-medium"
                        >
                          <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Why Clients Switch Matrix */}
      <div className="apple-glass rounded-3xl p-8 md:p-10 border border-white/10 space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white tracking-tight">Why Engineering Leaders Switch to BITA</h3>
          <p className="text-xs text-[#86868b]">Real feedback from enterprise CDOs and VPs of Engineering</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {switchReasons.map((r, i) => (
            <div key={i} className="apple-glass rounded-2xl p-5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">From: {r.from}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                  {r.switched}
                </span>
              </div>
              <p className="text-xs text-[#86868b] leading-relaxed pt-1">
                "{r.issue}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
