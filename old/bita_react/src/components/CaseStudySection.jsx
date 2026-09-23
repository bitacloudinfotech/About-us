import React from 'react';
import { ArrowRight } from 'lucide-react';

const studies = [
  {
    category: 'Case Study',
    tags: 'Azure Data & AI · Microsoft Fabric · LLM Agents · Power BI',
    title: 'Enterprise GenAI & Cloud Lakehouse Transformation',
    description:
      'Transforming fragmented legacy transactional databases into a unified Microsoft Fabric lakehouse. By deploying automated dbt transformations and Azure OpenAI agents, engineering teams achieved 16x faster analytical query execution and complete real-time operational visibility across 12 business units.',
    image: '/assets/casestudy_fluid_art.png',
    href: '#contact',
  },
];

export default function CaseStudySection() {
  return (
    <section
      id="case-studies"
      className="section-padding"
      style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'var(--grad-cyan-glow)',
          filter: 'blur(60px)',
          position: 'relative',
        }}
      />

      <div className="container relative z-10">
        {studies.map((study, i) => (
          <div
            key={i}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Image */}
            <div className="relative group order-2 lg:order-1">
              <div
                className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-magenta))',
                  filter: 'blur(20px)',
                  zIndex: 0,
                }}
              />
              <div
                className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto lg:max-w-none"
                style={{
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-elevated)',
                  zIndex: 1,
                }}
              >
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="space-y-2">
                <span
                  className="font-mono-custom text-xs font-bold uppercase tracking-widest block"
                  style={{ color: 'var(--accent-cyan)', letterSpacing: '0.22em' }}
                >
                  {study.category}
                </span>
                <span
                  className="font-mono-custom text-xs uppercase tracking-wider block leading-relaxed"
                  style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}
                >
                  {study.tags}
                </span>
              </div>

              <h2
                className="section-title"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400, textDecoration: 'underline', textDecorationColor: 'var(--accent-cyan)', textUnderlineOffset: '10px', textDecorationThickness: '2px' }}
              >
                {study.title}
              </h2>

              <p className="section-subtitle" style={{ fontSize: '1rem' }}>
                {study.description}
              </p>

              <div className="pt-2">
                <a href={study.href} className="link-readmore">
                  <span
                    style={{
                      color: 'var(--accent-cyan)',
                      borderBottom: '1px solid var(--accent-cyan)',
                      paddingBottom: '2px',
                      fontWeight: 600,
                    }}
                  >
                    Read More
                  </span>
                  <ArrowRight size={18} style={{ color: 'var(--accent-cyan)' }} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
