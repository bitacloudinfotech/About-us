import React from 'react';
import { Quote, ShieldCheck, Star } from 'lucide-react';

/* Partner logos — use real partner icons, not just "tools we use" */
const partners = [
  { name: 'Microsoft Azure', icon: '/assets/tech/azure.svg' },
  { name: 'Power BI', icon: '/assets/tech/powerbi.svg' },
  { name: 'Databricks', icon: '/assets/tech/databricks.svg' },
  { name: 'SQL Server', icon: '/assets/tech/sql.svg' },
  { name: 'Microsoft Fabric', icon: '/assets/tech/fabric.svg' },
  { name: 'dbt Labs', icon: '/assets/tech/dbt.png' },
  { name: 'OpenAI', icon: '/assets/tech/openai.svg' },
  // duplicated for seamless infinite marquee
  { name: 'Microsoft Azure', icon: '/assets/tech/azure.svg' },
  { name: 'Power BI', icon: '/assets/tech/powerbi.svg' },
  { name: 'Databricks', icon: '/assets/tech/databricks.svg' },
  { name: 'SQL Server', icon: '/assets/tech/sql.svg' },
  { name: 'Microsoft Fabric', icon: '/assets/tech/fabric.svg' },
  { name: 'dbt Labs', icon: '/assets/tech/dbt.png' },
  { name: 'OpenAI', icon: '/assets/tech/openai.svg' },
];

/* Testimonials — labelled as "client reviews" not anonymous quotes */
const testimonials = [
  {
    quote: 'BITA CLOUD transformed our fragmented data into automated real-time Azure pipelines and Power BI dashboards. Our reporting lag went from 24 hours to under 5 minutes.',
    author: 'Sarah Jenkins',
    role: 'Chief Data Officer',
    company: 'Global Logistics Corp',
    rating: 5,
    source: 'Direct Client Review',
  },
  {
    quote: 'Their expertise in Azure Data Factory and Microsoft Fabric saved our team months of manual architecture work. The dbt transformation layer they built is now our core data stack.',
    author: 'Marcus Vance',
    role: 'VP of Engineering',
    company: 'FinTech Dynamics',
    rating: 5,
    source: 'Direct Client Review',
  },
  {
    quote: 'The Databricks lakehouse and Power BI dashboards they delivered gave our executive board real-time operational clarity across all 12 business units. Exceptional delivery.',
    author: 'Elena Rostova',
    role: 'Head of Enterprise Architecture',
    company: 'Apex Healthcare',
    rating: 5,
    source: 'Direct Client Review',
  },
];

function StarRating({ count }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`} role="img">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} fill="#f59e0b" style={{ color: '#f59e0b' }} aria-hidden="true" />
      ))}
    </div>
  );
}

export default function TestimonialsPartners() {
  return (
    <section
      aria-label="Client testimonials and technology partners"
      className="section-padding"
      style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)' }}
    >
      <div className="container space-y-20">

        {/* ── Partner Tech Marquee ── */}
        <div className="space-y-6">
          <p
            className="text-center text-xs font-bold uppercase tracking-widest"
            style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.2em' }}
          >
            Technologies We Implement Daily
          </p>
          <div
            className="relative overflow-hidden"
            aria-hidden="true"
            style={{
              maskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
            }}
          >
            <div className="marquee-track" style={{ willChange: 'transform' }}>
              {partners.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl mx-3 shrink-0"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    minWidth: 'max-content',
                  }}
                >
                  <div className="w-6 h-6 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={p.icon}
                      alt=""
                      role="presentation"
                      className="w-full h-full object-contain"
                      loading="lazy"
                      width="24"
                      height="24"
                    />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <div className="section-badge w-fit">Client Reviews</div>
            <h2 className="section-title">
              What <strong>Enterprise Leaders</strong> Say
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              Direct reviews from engineering and data leadership at client organizations.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
            role="list"
            aria-label="Client testimonials"
          >
            {testimonials.map((item, i) => (
              <article
                key={i}
                role="listitem"
                className="master-card p-6 flex flex-col justify-between space-y-5"
                aria-label={`Review by ${item.author}, ${item.role} at ${item.company}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Quote size={22} style={{ color: 'var(--accent-cyan)', opacity: 0.6 }} aria-hidden="true" />
                    <StarRating count={item.rating} />
                  </div>
                  <blockquote>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}
                    >
                      "{item.quote}"
                    </p>
                  </blockquote>
                </div>

                <footer
                  className="flex items-end justify-between pt-4"
                  style={{ borderTop: '1px solid var(--border-subtle)' }}
                >
                  <div>
                    <cite className="not-italic font-semibold text-sm block" style={{ color: 'var(--text-primary)' }}>
                      {item.author}
                    </cite>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {item.role} · {item.company}
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.63rem' }}
                    >
                      {item.source}
                    </p>
                  </div>
                  <ShieldCheck size={18} style={{ color: 'var(--accent-cyan)', opacity: 0.6 }} aria-hidden="true" />
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
