import React, { useState } from 'react';
import { Check, ArrowRight, Star } from 'lucide-react';

const engagements = [
  {
    name: 'Fixed-Scope Sprint',
    tagline: 'Defined deliverables. Fixed price.',
    priceFrom: 'From $15,000',
    description: 'Ideal for well-scoped projects: a specific pipeline, Power BI dashboard suite, dbt transformation layer, or a Fabric lakehouse build. No surprises on cost or timeline.',
    features: [
      'Fixed scope of work document (SOW)',
      'Delivery in 2–6 weeks',
      'Dedicated certified engineer',
      'Complete IP transfer on day 1',
      'Post-delivery 30-day support',
    ],
    cta: 'Get Scoped Estimate',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Monthly Engineering Retainer',
    tagline: 'Dedicated capacity. Flexible scope.',
    priceFrom: 'From $8,000/month',
    description: 'A dedicated certified Azure data engineer embedded with your team. Full-time technical capacity — without the hiring risk, bench time, or ramp-up cost.',
    features: [
      'Named senior certified engineer',
      'Full-time monthly capacity (160 hrs)',
      'Direct Slack + WhatsApp access',
      'Weekly delivery reviews',
      'Cancel anytime — no lock-in',
    ],
    cta: 'Start a Retainer',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise Program',
    tagline: 'Multi-quarter data transformation.',
    priceFrom: 'From $120,000',
    description: 'End-to-end enterprise data platform programs: lakehouse architecture, analytics layer, AI/ML deployment, governance, and managed operations at scale.',
    features: [
      'Full delivery team (3–5 engineers)',
      'Multi-quarter roadmap & SLA',
      'Executive stakeholder reporting',
      'Data governance & compliance setup',
      'Dedicated program manager',
    ],
    cta: 'Discuss Program Scope',
    highlighted: false,
    badge: null,
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', position: 'relative' }}
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, right: 0,
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="section-badge w-fit">Engagement Models</div>
          <h2 id="pricing-heading" className="section-title">
            Transparent Pricing.<br /><strong>No Surprises. Ever.</strong>
          </h2>
          <p className="section-subtitle">
            Three engagement models designed for different project shapes. Every engagement includes full IP ownership, certified engineers, and direct team access — from day one.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engagements.map((plan) => (
            <article
              key={plan.name}
              className={`flex flex-col justify-between rounded-2xl p-7 ${plan.highlighted ? 'relative' : ''}`}
              style={{
                background: plan.highlighted ? 'var(--bg-elevated)' : 'var(--bg-card)',
                border: plan.highlighted
                  ? '1.5px solid var(--accent-cyan)'
                  : '1px solid var(--border-subtle)',
                boxShadow: plan.highlighted ? '0 0 40px rgba(0,229,255,0.12)' : 'var(--card-shadow)',
              }}
              aria-label={plan.name}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: 'var(--accent-cyan)', color: 'var(--text-on-dark)' }}
                  >
                    <Star size={11} fill="currentColor" aria-hidden="true" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                    {plan.tagline}
                  </p>
                  <h3 className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
                    {plan.name}
                  </h3>
                  <p
                    className="font-extrabold mt-2"
                    style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: plan.highlighted ? 'var(--accent-cyan)' : 'var(--text-primary)', letterSpacing: '-0.03em' }}
                  >
                    {plan.priceFrom}
                  </p>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {plan.description}
                </p>

                <ul className="space-y-2.5 list-none p-0 m-0">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <Check
                        size={15}
                        style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }}
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                className={`mt-8 ${plan.highlighted ? 'btn-primary btn-shimmer' : 'btn-outline'} justify-center w-full py-3`}
                aria-label={`${plan.cta} — ${plan.name}`}
              >
                <span>{plan.cta}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-8 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
          All engagements include full IP ownership, NDA protection, and a 30-day satisfaction guarantee. Pricing varies by project complexity and geographic location.
        </p>
      </div>
    </section>
  );
}
