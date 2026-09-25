import React from 'react';
import { Search, PenTool, Cog, Rocket, LifeBuoy, CheckCircle2, ArrowRight } from 'lucide-react';

export const AppleProcess: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Discovery & Scoping',
      duration: '48 hrs',
      desc: 'We audit your existing data stack, map business objectives, and define an exact technical scope with measurable outcomes.',
      deliverables: ['Current stack audit', 'Data maturity score', 'Fixed ROI estimate'],
      color: 'text-cyan-400',
    },
    {
      number: '02',
      icon: PenTool,
      title: 'Architecture Design',
      duration: '3–5 days',
      desc: 'Certified Azure architects design the optimal lakehouse, pipeline, and BI layer tailored to your scale and security requirements.',
      deliverables: ['Solution architecture doc', 'Tech stack blueprint', 'Zero-downtime plan'],
      color: 'text-purple-400',
    },
    {
      number: '03',
      icon: Cog,
      title: 'Build & Automate',
      duration: '1–3 weeks',
      desc: 'Engineers build production-grade ADF pipelines, dbt models, Fabric workspaces, and Power BI datasets with full CI/CD.',
      deliverables: ['Automated ETL pipelines', 'dbt transformation layer', 'Sub-second dashboards'],
      color: 'text-sky-400',
    },
    {
      number: '04',
      icon: Rocket,
      title: 'Deploy & Validate',
      duration: '2–5 days',
      desc: 'End-to-end deployment with rigorous data quality testing, performance benchmarking, and executive sign-off before go-live.',
      deliverables: ['Production deployment', 'Data test suite', 'Performance benchmark'],
      color: 'text-emerald-400',
    },
    {
      number: '05',
      icon: LifeBuoy,
      title: 'Support & Evolve',
      duration: 'Ongoing',
      desc: 'Managed support, pipeline monitoring, model updates, and continuous feature expansion — your dedicated cloud data team.',
      deliverables: ['24/7 pipeline monitoring', 'Monthly model updates', 'Quarterly roadmap reviews'],
      color: 'text-amber-400',
    },
  ];

  return (
    <section id="process" className="relative py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 inline-flex items-center gap-2">
          <Cog className="w-4 h-4" />
          5-Phase Delivery Methodology
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Predictable. Proven. Transparent.
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          A battle-tested 5-phase delivery process refined across 500+ enterprise data implementations.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="apple-glass rounded-3xl p-6 border border-white/10 flex flex-col justify-between space-y-6 hover:border-cyan-500/40 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl apple-glass flex items-center justify-center ${step.color}`}>
                  <step.icon size={18} />
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-black text-white/20 block leading-none">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                    {step.duration}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <p className="text-xs text-[#86868b] leading-relaxed">{step.desc}</p>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
              <span className="text-[10px] font-semibold text-white/50 uppercase tracking-wider block">
                Deliverables
              </span>
              <ul className="space-y-1.5 text-xs text-white/80">
                {step.deliverables.map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Discovery CTA Banner */}
      <div className="apple-glass rounded-3xl p-8 md:p-10 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white">Ready to begin Phase 1?</h3>
          <p className="text-xs sm:text-sm text-[#86868b] max-w-xl">
            Book a free 30-minute discovery call with a certified Azure architect — no salespeople, no script.
          </p>
        </div>

        <a
          href="#contact"
          className="px-6 py-3 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Book Discovery Call</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
};
