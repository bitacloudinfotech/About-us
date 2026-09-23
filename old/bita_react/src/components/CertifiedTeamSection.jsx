import React from 'react';
import { Award, CheckCircle2, ExternalLink, ShieldCheck, Star } from 'lucide-react';

const certificationBadges = [
  {
    id: 1, title: 'Databricks Data Engineer Professional',
    subtitle: 'Databricks Certified Professional',
    badge: '/badges/1.svg', code: 'DB-PRO',
    desc: 'Advanced PySpark distributed processing, Delta Lake ACID optimizations, performance tuning, and enterprise ETL pipelines.',
  },
  {
    id: 2, title: 'Databricks GenAI Engineer Associate',
    subtitle: 'Databricks Certified Specialist',
    badge: '/badges/2.svg', code: 'DB-GENAI',
    desc: 'Generative AI model fine-tuning, RAG architecture, LLM agent orchestration, and MLflow experiment tracking.',
  },
  {
    id: 3, title: 'Power BI Data Analyst Associate',
    subtitle: 'Microsoft Certified',
    badge: '/badges/3.svg', code: 'PL-300',
    desc: 'Advanced DAX modeling, interactive report design, Row-Level Security (RLS), and enterprise Power BI governance.',
  },
  {
    id: 4, title: 'Microsoft Fabric Data Engineer Associate',
    subtitle: 'Microsoft Certified',
    badge: '/badges/4.svg', code: 'DP-700',
    desc: 'Unified SaaS OneLake lakehouse architecture, Direct Lake mode execution, Data Factory pipelines, and PySpark engineering.',
  },
  {
    id: 5, title: 'Azure Fundamentals',
    subtitle: 'Microsoft Certified',
    badge: '/badges/5.svg', code: 'AZ-900',
    desc: 'Core Azure cloud services, security governance, virtual networks, identity management, and SLA compliance.',
  },
  {
    id: 6, title: 'Palantir Foundry Aware Specialist',
    subtitle: 'Palantir Certified Engineer',
    badge: '/badges/6.svg', code: 'FOUNDRY',
    desc: 'Palantir Foundry ontology building, data pipeline transformations, contour analytics, and enterprise data integration.',
  },
];

export default function CertifiedTeamSection() {
  return (
    <section
      id="certified-teams"
      aria-labelledby="certs-heading"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}
    >
      <div className="container">

        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="section-badge w-fit">
            <Award size={13} aria-hidden="true" />
            Certified Developer Teams
          </div>
          <h2 id="certs-heading" className="section-title">
            100%{' '}
            <strong>Certified</strong> Enterprise Engineering
          </h2>
          <p className="section-subtitle">
            Every engineer on our team holds active, verified certifications from Microsoft, Databricks, and Palantir. No junior generalists — only production-proven specialists.
          </p>
        </div>

        {/* Badges Grid */}
        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 list-none p-0 m-0"
          role="list"
          aria-label="Professional certifications"
        >
          {certificationBadges.map((cert) => (
            <li key={cert.id} role="listitem">
              <article
                className="master-card p-6 flex flex-col justify-between group h-full"
                aria-label={`${cert.title} — ${cert.subtitle}`}
              >
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center p-2 shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-medium)' }}
                    >
                      <img
                        src={cert.badge}
                        alt={`${cert.title} certification badge`}
                        className="w-full h-full object-contain drop-shadow"
                        loading="lazy"
                        width="64"
                        height="64"
                      />
                    </div>
                    <span
                      className="code-badge shrink-0 mt-1"
                      aria-label={`Certification code: ${cert.code}`}
                    >
                      {cert.code}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <p
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.15em' }}
                    >
                      {cert.subtitle}
                    </p>
                    <h3 className="font-semibold text-base leading-snug" style={{ color: 'var(--text-primary)' }}>
                      {cert.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {cert.desc}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center justify-between mt-5 pt-4 text-xs font-semibold"
                  style={{ borderTop: '1px solid var(--border-subtle)' }}
                >
                  <span className="flex items-center gap-1.5" style={{ color: 'var(--accent-cyan)' }}>
                    <CheckCircle2 size={14} aria-hidden="true" />
                    Official Credential
                  </span>
                  <span
                    className="uppercase tracking-widest"
                    style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem' }}
                    aria-label="Verified certification"
                  >
                    Verified
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Trust Banner */}
        <div
          className="mt-12 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-medium)' }}
          role="complementary"
          aria-label="Certification guarantee"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3
              className="font-semibold text-xl flex items-center justify-center md:justify-start gap-2"
              style={{ color: 'var(--text-primary)' }}
            >
              <ShieldCheck size={22} style={{ color: 'var(--accent-cyan)' }} aria-hidden="true" />
              Every deployment architected by certified professionals
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Verified credentials from Microsoft, Databricks, and Palantir — across all practice areas. No subcontracting.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-primary shrink-0"
            aria-label="Request engagement with our certified team"
          >
            <span>Engage Certified Team</span>
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
