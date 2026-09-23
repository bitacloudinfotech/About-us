import React, { useRef } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import { CheckCircle2, ArrowRight, Search, PenTool, Cog, Rocket, LifeBuoy } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery & Scoping',
    desc: 'We audit your existing data stack, map business goals, and define a precise technical scope with measurable outcomes.',
    deliverables: ['Current stack audit', 'Data maturity assessment', 'ROI estimate document'],
    color: 'var(--accent-cyan)',
    duration: '48 hrs',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Architecture Design',
    desc: 'Certified Azure architects design the optimal lakehouse, pipeline, and BI layer — tailored to your scale and compliance requirements.',
    deliverables: ['Solution architecture doc', 'Tech stack blueprint', 'Migration plan'],
    color: 'var(--accent-purple)',
    duration: '3–5 days',
  },
  {
    number: '03',
    icon: Cog,
    title: 'Build & Automate',
    desc: 'Engineers build production-grade ADF pipelines, dbt models, Fabric workspaces, and Power BI datasets with full CI/CD.',
    deliverables: ['Automated ETL pipelines', 'dbt transformation layer', 'Live dashboards'],
    color: 'var(--accent-magenta)',
    duration: '1–3 weeks',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Deploy & Validate',
    desc: 'End-to-end deployment with data quality testing, performance benchmarking, and stakeholder sign-off before go-live.',
    deliverables: ['Production deployment', 'Data quality test suite', 'Performance report'],
    color: 'var(--accent-green)',
    duration: '2–5 days',
  },
  {
    number: '05',
    icon: LifeBuoy,
    title: 'Support & Evolve',
    desc: 'Ongoing managed support, pipeline monitoring, model updates, and feature expansions — your always-on data team.',
    deliverables: ['24/7 pipeline monitoring', 'Monthly model updates', 'Quarterly exec reviews'],
    color: 'var(--accent-amber)',
    duration: 'Ongoing',
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <section
      id="process"
      ref={ref}
      aria-labelledby="process-heading"
      className="section-padding"
      style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)', overflow: 'hidden', position: 'relative' }}
    >
      {/* Background gradient orb */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', right: '-200px', top: '50%',
          transform: 'translateY(-50%)',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="section-badge w-fit reveal">Engagement Process</div>
          <h2 id="process-heading" className="section-title reveal reveal-delay-1">
            How We <strong>Deliver Results</strong>
          </h2>
          <p className="section-subtitle reveal reveal-delay-2">
            A battle-tested 5-phase methodology refined across 500+ enterprise data projects. Predictable. Transparent. No surprises.
          </p>
        </div>

        {/* Step Cards — horizontal scroll on mobile, grid on desktop */}
        <div
          className="flex gap-5 overflow-x-auto pb-4 lg:pb-0 lg:grid lg:grid-cols-5 lg:overflow-visible snap-x snap-mandatory"
          style={{ scrollbarWidth: 'thin' }}
          role="list"
          aria-label="5-phase delivery process"
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              role="listitem"
              className={`grad-border-card p-6 space-y-5 reveal reveal-delay-${i + 1} shrink-0 snap-start`}
              style={{
                background: 'var(--bg-card)',
                minWidth: '260px',
                width: '260px',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                >
                  <step.icon size={18} style={{ color: step.color }} aria-hidden="true" />
                </div>
                <div className="text-right">
                  <span
                    className="font-black leading-none block"
                    style={{
                      fontSize: '2.2rem',
                      color: step.color,
                      opacity: 0.13,
                      fontFamily: 'JetBrains Mono, monospace',
                      letterSpacing: '-0.06em',
                    }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <span
                    className="text-[0.65rem] font-bold uppercase tracking-wider"
                    style={{ color: step.color }}
                    aria-label={`Duration: ${step.duration}`}
                  >
                    {step.duration}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3
                  className="font-bold text-sm leading-snug"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.desc}
                </p>
              </div>

              {/* Deliverables */}
              <ul className="space-y-1.5 list-none p-0 m-0">
                {step.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <CheckCircle2 size={11} style={{ color: step.color, flexShrink: 0 }} aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile scroll hint */}
        <p className="lg:hidden text-center text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
          ← Swipe to see all 5 phases →
        </p>

        {/* Bottom CTA strip */}
        <div
          className="mt-12 p-6 lg:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5 reveal"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-medium)' }}
        >
          <div>
            <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
              Ready to start Phase 1?
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Book a free 30-min discovery call — no obligation, no sales pitch. We'll assess your current stack and outline a data maturity roadmap.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-primary shrink-0"
            aria-label="Start your engagement — book a free discovery call"
          >
            <span>Book Discovery Call</span>
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
