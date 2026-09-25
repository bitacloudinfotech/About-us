import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export const AppleBadgesGallery: React.FC = () => {
  const badges = [
    {
      id: 1,
      title: 'Databricks Data Engineer Professional',
      subtitle: 'Databricks Certified Professional',
      src: getAssetUrl('badges/1.svg'),
      code: 'DB-PRO',
      desc: 'Advanced PySpark distributed processing, Delta Lake ACID optimizations, performance tuning, and enterprise ETL pipelines.',
    },
    {
      id: 2,
      title: 'Databricks GenAI Engineer Associate',
      subtitle: 'Databricks Certified Specialist',
      src: getAssetUrl('badges/2.svg'),
      code: 'DB-GENAI',
      desc: 'Generative AI model fine-tuning, RAG architecture, LLM agent orchestration, and MLflow experiment tracking.',
    },
    {
      id: 3,
      title: 'Power BI Data Analyst Associate',
      subtitle: 'Microsoft Certified',
      src: getAssetUrl('badges/3.svg'),
      code: 'PL-300',
      desc: 'Advanced DAX modeling, interactive report design, Row-Level Security (RLS), and enterprise Power BI governance.',
    },
    {
      id: 4,
      title: 'Microsoft Fabric Data Engineer Associate',
      subtitle: 'Microsoft Certified',
      src: getAssetUrl('badges/4.svg'),
      code: 'DP-700',
      desc: 'Unified SaaS OneLake lakehouse architecture, Direct Lake mode execution, Data Factory pipelines, and PySpark engineering.',
    },
    {
      id: 5,
      title: 'Azure Fundamentals',
      subtitle: 'Microsoft Certified',
      src: getAssetUrl('badges/5.svg'),
      code: 'AZ-900',
      desc: 'Core Azure cloud services, security governance, virtual networks, identity management, and SLA compliance.',
    },
    {
      id: 6,
      title: 'Palantir Foundry Aware Specialist',
      subtitle: 'Palantir Certified Engineer',
      src: getAssetUrl('badges/6.svg'),
      code: 'FOUNDRY',
      desc: 'Palantir Foundry ontology building, data pipeline transformations, contour analytics, and enterprise data integration.',
    },
  ];

  return (
    <section id="badges" className="relative py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 inline-flex items-center gap-2">
          <Award className="w-4 h-4" />
          100% Certified Developer Teams
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Certified Excellence.
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          Every engineer holds active, verified certifications from Microsoft, Databricks, and Palantir.
          Zero subcontracting. No junior resources on client projects.
        </p>
      </div>

      {/* 3D Tilt Badge Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="apple-glass rounded-3xl p-6 border border-white/10 flex flex-col justify-between space-y-5 hover:border-amber-500/40 hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-24 h-24 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/25 transition-all" />
                  <img
                    src={badge.src}
                    alt={badge.title}
                    className="w-20 h-20 object-contain relative z-10 filter group-hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all"
                  />
                </div>
                <span className="px-2.5 py-1 rounded-full apple-glass text-[10px] font-mono font-bold text-amber-400 border border-amber-400/20 uppercase tracking-widest">
                  {badge.code}
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                  {badge.subtitle}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                  {badge.title}
                </h3>
                <p className="text-xs text-[#86868b] leading-relaxed pt-1">
                  {badge.desc}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
              <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <CheckCircle2 size={13} />
                <span>Official Credential</span>
              </span>
              <span className="text-[10px] font-mono text-[#86868b] uppercase tracking-widest">
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Certification Guarantee Banner */}
      <div className="apple-glass rounded-3xl p-8 md:p-10 border border-cyan-500/30 bg-cyan-500/5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(0,229,255,0.12)]">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="w-10 h-10 rounded-xl apple-glass flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Every Deployment Architected by Certified Professionals
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#86868b] max-w-2xl">
            Verified credentials across Microsoft Fabric, Azure Data Factory, Databricks Lakehouse, and Palantir Foundry. Full IP ownership on day one with 30-day post-delivery warranty.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full apple-glass text-xs font-semibold text-white/90 border border-white/10">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>SOC 2 · HIPAA · GDPR Aligned</span>
          </div>
        </div>
      </div>
    </section>
  );
};
