import React from 'react';
import { Database, Zap, Bot, ShieldCheck, Activity } from 'lucide-react';

export const AppleHighlights: React.FC = () => {
  const highlights = [
    {
      icon: Database,
      badge: 'Scale',
      stat: '350M+',
      label: 'Records Processed Daily',
      description:
        'Engineered high-throughput batch and streaming ETL pipelines across Microsoft Fabric, Databricks, and OneLake with Delta Lake ACID reliability.',
      accent: 'from-sky-500/20 to-blue-600/5',
      border: 'border-sky-500/30',
      iconColor: 'text-sky-400',
    },
    {
      icon: Zap,
      badge: 'Velocity',
      stat: '16x',
      label: 'Faster Pipeline Delivery',
      description:
        'Pre-built data patterns, dbt macro libraries, and Azure Bicep templates reduce months of manual architecture to weeks.',
      accent: 'from-purple-500/20 to-indigo-600/5',
      border: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      icon: Bot,
      badge: 'Analytics',
      stat: '97%',
      label: 'Reporting Lag Reduction',
      description:
        'Sub-second Direct Lake mode queries, DAX semantic model optimization, and real-time Power BI reporting replacing 24-hour batch delays.',
      accent: 'from-emerald-500/20 to-teal-600/5',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
    {
      icon: ShieldCheck,
      badge: 'Enterprise SLA',
      stat: '99.99%',
      label: 'Uptime SLA Guaranteed',
      description:
        'Managed Azure cloud lakehouses with Row-Level Security, automated failover, private endpoints, and 24/7 telemetry monitoring.',
      accent: 'from-amber-500/20 to-orange-600/5',
      border: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
  ];

  return (
    <section id="overview" className="relative py-24 px-6 max-w-7xl mx-auto space-y-12">
      {/* Apple Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Core Highlights
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Get the highlights.
          </h2>
        </div>
        <p className="text-[#86868b] text-base max-w-md font-medium">
          Built for scale, speed, and governance across enterprise Azure lakehouses and AI workflows.
        </p>
      </div>

      {/* Bento Grid Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((card, idx) => (
          <div
            key={idx}
            className={`relative rounded-3xl p-8 apple-glass-card border ${card.border} overflow-hidden group hover:scale-[1.01] transition-all duration-300`}
          >
            {/* Ambient Accent Glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`}
            />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div
                  className={`w-12 h-12 rounded-2xl apple-glass flex items-center justify-center ${card.iconColor}`}
                >
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
                <h3 className="text-xl font-semibold text-white/95">{card.label}</h3>
              </div>

              <p className="text-[#86868b] text-sm leading-relaxed font-medium">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
