import React from 'react';
import { HeartPulse, Landmark, ShoppingBag, Factory, Car, Zap, ArrowRight } from 'lucide-react';

export const AppleIndustries: React.FC = () => {
  const industries = [
    {
      icon: HeartPulse,
      title: 'Healthcare & Life Sciences',
      desc: 'HIPAA-compliant data pipelines, clinical trial analytics, real-time patient dashboards, and automated regulatory reporting.',
      tag: 'HIPAA Aligned',
      useCase: 'Clinical trial data lakehouse for a 200-hospital network',
      color: 'text-red-400',
      border: 'hover:border-red-500/40',
    },
    {
      icon: Landmark,
      title: 'Banking & Financial Services',
      desc: 'Low-latency transaction indexing, fraud detection models, automated regulatory compliance, and FRTB reporting pipelines.',
      tag: 'SOC 2 Ready',
      useCase: 'Real-time fraud detection processing 350M+ transactions/day',
      color: 'text-amber-400',
      border: 'hover:border-amber-500/40',
    },
    {
      icon: ShoppingBag,
      title: 'Retail & Consumer Goods',
      desc: 'Omnichannel inventory forecasting, customer lifetime value (CLV) modeling, promotional uplift analytics, and supply chain ETL.',
      tag: 'Omnichannel BI',
      useCase: 'Inventory forecasting across 450+ retail locations',
      color: 'text-purple-400',
      border: 'hover:border-purple-500/40',
    },
    {
      icon: Factory,
      title: 'Industrial & Manufacturing',
      desc: 'IoT telemetry ingestion, Overall Equipment Effectiveness (OEE) dashboards, predictive maintenance ML models, and plant BI.',
      tag: 'IoT / OT',
      useCase: 'Predictive maintenance reducing unplanned downtime by 38%',
      color: 'text-cyan-400',
      border: 'hover:border-cyan-500/40',
    },
    {
      icon: Car,
      title: 'Automotive & Mobility',
      desc: 'Connected vehicle telemetry lakehouse, fleet management pipelines, and automated diagnostics analytics at enterprise scale.',
      tag: 'Connected Fleet',
      useCase: 'Fleet telemetry lakehouse processing 2M+ daily vehicle events',
      color: 'text-emerald-400',
      border: 'hover:border-emerald-500/40',
    },
    {
      icon: Zap,
      title: 'Energy & Smart Utilities',
      desc: 'Smart grid load balancing, renewable energy forecasting, power usage analytics, and demand-response predictive models.',
      tag: 'Smart Grid',
      useCase: 'Renewable energy forecasting with 94% predictive accuracy',
      color: 'text-orange-400',
      border: 'hover:border-orange-500/40',
    },
  ];

  return (
    <section id="industries" className="relative py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
            <Factory className="w-4 h-4" />
            Industry Verticals
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Deep Domain Expertise.
          </h2>
        </div>
        <p className="text-[#86868b] text-base max-w-md font-medium">
          We bring battle-tested data patterns, compliance blueprints, and industry benchmarks — not generic IT consulting.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((ind, i) => (
          <div
            key={i}
            className={`apple-glass rounded-3xl p-7 flex flex-col justify-between space-y-6 border border-white/10 ${ind.border} hover:scale-[1.02] transition-all duration-300 group cursor-pointer`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl apple-glass flex items-center justify-center ${ind.color}`}>
                  <ind.icon className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full apple-glass text-[10px] font-semibold text-white/80 uppercase tracking-wider">
                  {ind.tag}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {ind.title}
                </h3>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  {ind.desc}
                </p>
              </div>

              <div className="p-3 rounded-xl apple-glass border border-white/5 text-xs text-white/70 italic">
                e.g. {ind.useCase}
              </div>
            </div>

            <a
              href="#contact"
              className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300"
            >
              <span>Discuss Vertical Requirements</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
