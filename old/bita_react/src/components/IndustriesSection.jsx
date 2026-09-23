import React, { useRef } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import { HeartPulse, Landmark, ShoppingBag, Factory, Car, Zap, ArrowRight } from 'lucide-react';

const industries = [
  {
    icon: HeartPulse,
    title: 'Healthcare & Life Sciences',
    desc: 'HIPAA-compliant data pipelines, clinical analytics, real-time patient dashboards, and automated regulatory reporting.',
    color: '#ef4444',
    tag: 'HIPAA Aligned',
    useCase: 'Clinical trial data lakehouse for a 200-hospital network',
  },
  {
    icon: Landmark,
    title: 'Banking & Financial Services',
    desc: 'Low-latency transaction indexing, fraud detection models, automated regulatory compliance, and FRTB reporting pipelines.',
    color: '#f59e0b',
    tag: 'SOC 2 Ready',
    useCase: 'Real-time fraud detection processing 350M+ transactions/day',
  },
  {
    icon: ShoppingBag,
    title: 'Retail & Consumer Goods',
    desc: 'Omnichannel inventory forecasting, CLV modeling, promotional uplift analytics, and supply chain ETL automation.',
    color: '#8b5cf6',
    tag: 'Omnichannel BI',
    useCase: 'Inventory forecasting across 450+ retail locations',
  },
  {
    icon: Factory,
    title: 'Industrial & Manufacturing',
    desc: 'IoT telemetry ingestion, OEE dashboards, predictive maintenance ML models, and factory floor BI visibility.',
    color: '#06b6d4',
    tag: 'IoT / OT',
    useCase: 'Predictive maintenance reducing unplanned downtime by 38%',
  },
  {
    icon: Car,
    title: 'Automotive & Mobility',
    desc: 'Connected vehicle telemetry lakehouse, fleet management pipelines, and automated diagnostics analytics at scale.',
    color: '#10b981',
    tag: 'Connected Fleet',
    useCase: 'Fleet telemetry lakehouse — 2M+ daily vehicle events',
  },
  {
    icon: Zap,
    title: 'Energy & Smart Utilities',
    desc: 'Smart grid load balancing, renewable energy forecasting, power usage analytics, and demand response models.',
    color: '#f97316',
    tag: 'Smart Grid',
    useCase: 'Renewable energy forecasting with 94% accuracy',
  },
];

export default function IndustriesSection() {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <section
      id="industries"
      ref={ref}
      aria-labelledby="industries-heading"
      className="section-padding"
      style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)' }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-4">
            <div className="section-badge w-fit reveal">Industry Verticals</div>
            <h2 id="industries-heading" className="section-title reveal reveal-delay-1">
              Deep Expertise Across <strong>Every Industry</strong>
            </h2>
          </div>
          <p className="section-subtitle reveal reveal-delay-2" style={{ maxWidth: '380px', fontSize: '0.95rem' }}>
            We bring domain-specific data patterns, compliance frameworks, and industry benchmarks — not generic consulting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind, i) => (
            <article
              key={ind.title}
              className={`master-card p-6 flex flex-col justify-between group reveal reveal-delay-${(i % 3) + 1}`}
              aria-label={ind.title}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${ind.color}14`, border: `1px solid ${ind.color}28` }}
                  >
                    <ind.icon size={20} style={{ color: ind.color }} aria-hidden="true" />
                  </div>
                  <span
                    className="text-[0.68rem] font-bold px-2 py-1 rounded-md whitespace-nowrap"
                    style={{
                      background: `${ind.color}12`,
                      color: ind.color,
                      border: `1px solid ${ind.color}20`,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {ind.tag}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                    {ind.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {ind.desc}
                  </p>
                </div>

                {/* Example use case */}
                <div
                  className="text-xs p-3 rounded-lg italic"
                  style={{
                    background: `${ind.color}08`,
                    border: `1px solid ${ind.color}18`,
                    color: 'var(--text-muted)',
                  }}
                >
                  e.g. {ind.useCase}
                </div>
              </div>

              <a
                href="#contact"
                className="flex items-center justify-between mt-5 pt-4 text-xs font-semibold"
                style={{ borderTop: '1px solid var(--border-subtle)', color: ind.color, textDecoration: 'none' }}
                aria-label={`Explore data solutions for ${ind.title}`}
              >
                <span className="group-hover:underline transition-all">
                  Discuss Your Requirements
                </span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
