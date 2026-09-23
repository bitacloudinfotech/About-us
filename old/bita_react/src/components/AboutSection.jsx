import React, { useRef } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import { Award, Globe, Terminal, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

const pillars = [
  { icon: Award, label: 'Certified Architects', sub: 'Azure, Databricks & Palantir' },
  { icon: Globe, label: 'Global Operations', sub: '24/7 Enterprise Support' },
  { icon: Terminal, label: 'Production-Proven', sub: '500+ Enterprise Deliveries' },
  { icon: Users, label: 'Dedicated Teams', sub: 'No shared resource pools' },
];

const values = [
  'Built on radical transparency — no hidden costs, no scope creep surprises',
  'Every architecture reviewed by at least 2 certified engineers before delivery',
  'Source code, pipelines, and data models fully owned by you on day one',
  'English-first communication — CDO-level stakeholder reporting',
];

export default function AboutSection() {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative grid fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          opacity: 0.4,
          maskImage: 'radial-gradient(ellipse 70% 60% at 80% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 80% 50%, black 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="section-badge w-fit reveal">About BITA CLOUD INFO TECH</div>
              <h2 id="about-heading" className="section-title reveal reveal-delay-1">
                Built by engineers,<br /><strong>for engineers.</strong>
              </h2>
              <p className="section-subtitle reveal reveal-delay-2">
                BITA CLOUD INFO TECH is a specialist Azure Data &amp; AI engineering firm. We don't do "digital transformation" — we build real data infrastructure that processes hundreds of millions of records, powers C-suite dashboards, and runs autonomously.
              </p>
            </div>

            {/* Values */}
            <ul className="space-y-3 reveal reveal-delay-3 list-none p-0 m-0">
              {values.map((v, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <CheckCircle2
                    size={15}
                    style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }}
                    aria-hidden="true"
                  />
                  {v}
                </li>
              ))}
            </ul>

            <a href="#contact" className="btn-primary reveal reveal-delay-4 w-fit" aria-label="Partner with BITA CLOUD">
              <span>Partner With Us</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          {/* Right — pillars + careers */}
          <div className="space-y-5">
            {/* Pillar grid */}
            <div className="grid grid-cols-2 gap-4 reveal reveal-delay-2">
              {pillars.map((p, i) => (
                <div
                  key={p.label}
                  className="grad-border-card p-5 space-y-3"
                  style={{ background: 'var(--bg-card)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--accent-cyan-dim)', border: '1px solid var(--border-strong)' }}
                  >
                    <p.icon size={18} style={{ color: 'var(--accent-cyan)' }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{p.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{p.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Careers card */}
            <div
              className="grad-border-card p-7 space-y-4 reveal reveal-delay-3"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="section-badge w-fit">Careers at BITA</div>
              <h3 className="font-bold text-xl" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Join our global engineering team.
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                We're always seeking certified Azure architects, Databricks engineers, and Power BI specialists. Remote-first. High-ownership roles.
              </p>
              <ul className="space-y-2 text-sm list-none p-0 m-0" style={{ color: 'var(--text-secondary)' }}>
                {['Azure &amp; Databricks data engineering', 'Power BI &amp; analytics consulting', 'AI/ML model development &amp; MLOps', 'Remote-first · Flexible hours'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, flexShrink: 0 }}>→</span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn-outline w-full justify-center" aria-label="View career opportunities at BITA CLOUD">
                View Career Opportunities
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
