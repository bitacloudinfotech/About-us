import React, { useRef } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import { Zap, Shield, Clock, Users, Trophy, ArrowRight } from 'lucide-react';

const differentiators = [
  {
    icon: Trophy,
    title: '100% Certified — No Juniors Ever',
    desc: 'Every engineer holds active Microsoft, Databricks, or Palantir certification. No subcontracting, no junior resources on client projects.',
    color: 'var(--accent-amber)',
    proof: 'DB-PRO · PL-300 · DP-700 · AZ-900 verified',
  },
  {
    icon: Zap,
    title: '16x Faster Than Internal Teams',
    desc: 'Pre-built data patterns, dbt macro libraries, and Azure Bicep templates accelerate delivery from months to weeks.',
    color: 'var(--accent-cyan)',
    proof: 'avg. 16x delivery speed — verified across 50+ engagements',
  },
  {
    icon: Shield,
    title: 'Security & Compliance by Default',
    desc: 'Row-Level Security, private endpoints, Azure AD integration, and data governance are built into every architecture — not bolted on.',
    color: 'var(--accent-green)',
    proof: 'SOC 2 · HIPAA · GDPR · ISO 27001 aligned',
  },
  {
    icon: Clock,
    title: 'Engagement Starts in 48 Hours',
    desc: 'No 6-week onboarding cycles. Discovery in 48 hours. First production pipeline live in under 2 weeks.',
    color: 'var(--accent-purple)',
    proof: 'avg. 11 days to first live pipeline',
  },
  {
    icon: Users,
    title: 'Dedicated Team — Not a Shared Queue',
    desc: 'You get a named certified engineer committed to your project. Direct Slack and WhatsApp access, Monday to Friday.',
    color: 'var(--accent-magenta)',
    proof: 'Direct engineer access — 5 days/week',
  },
];

/* Reframed from self-graded table to outcome-focused switching reasons */
const switchReasons = [
  { from: 'Generic IT agency', problem: 'No deep data engineering specialization — projects handed to juniors', switched: '12 clients' },
  { from: 'In-house hiring', problem: 'Months to hire, ramp-up cost $80–150K before first delivery', switched: '8 clients' },
  { from: 'Big-4 consulting', problem: 'Premium pricing, slow delivery, senior partners replaced by graduates', switched: '7 clients' },
  { from: 'Offshore bodyshop', problem: 'Communication gaps, architecture debt, frequent rework cycles', switched: '9 clients' },
];

export default function WhyBITASection() {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <section
      id="why-bita"
      ref={ref}
      aria-labelledby="why-heading"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background orb */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', left: '-150px', bottom: '-100px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — Differentiator Cards */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="section-badge w-fit reveal">Why BITA CLOUD</div>
              <h2 id="why-heading" className="section-title reveal reveal-delay-1">
                Specialist data engineering.<br /><strong>Not a generic agency.</strong>
              </h2>
              <p className="section-subtitle reveal reveal-delay-2">
                We build production data infrastructure for enterprise teams who need it done right the first time — on time, on budget.
              </p>
            </div>

            <div className="space-y-4">
              {differentiators.map((d, i) => (
                <div
                  key={d.title}
                  className={`grad-border-card p-5 flex items-start gap-4 reveal reveal-delay-${i + 1}`}
                  style={{ background: 'var(--bg-card)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${d.color}14`, border: `1px solid ${d.color}28` }}
                  >
                    <d.icon size={18} style={{ color: d.color }} aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {d.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>
                      {d.desc}
                    </p>
                    <span
                      className="inline-block text-xs font-semibold mt-1"
                      style={{ color: d.color, fontSize: '0.7rem', letterSpacing: '0.04em' }}
                    >
                      ↳ {d.proof}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Why Clients Switch to BITA */}
          <div className="lg:sticky lg:top-28 space-y-6 reveal reveal-delay-2">
            <div
              className="grad-border-card p-7"
              style={{ background: 'var(--bg-elevated)' }}
            >
              <div className="space-y-1 mb-6">
                <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  Why Clients Switch to BITA
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  What engineering leaders told us when they switched
                </p>
              </div>

              <div className="space-y-4">
                {switchReasons.map((r, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl space-y-1.5"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                        Previously: {r.from}
                      </span>
                      <span
                        className="text-[0.65rem] font-bold px-2 py-0.5 rounded"
                        style={{ background: 'var(--accent-cyan-dim)', color: 'var(--accent-cyan)', border: '1px solid rgba(0,229,255,0.2)' }}
                      >
                        {r.switched}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>
                      "{r.problem}"
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <a
                  href="#contact"
                  className="btn-primary w-full justify-center"
                  aria-label="Start your BITA engagement"
                >
                  <span>Start Your Engagement</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <p className="text-center text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                  No obligation. First discovery call is always free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
