import React, { useState, useEffect } from 'react';
import { ArrowRight, CalendarCheck, ChevronRight } from 'lucide-react';

const HEADLINES = [
  'Azure Data Team',
  'Fabric Lakehouse Experts',
  'Power BI Analytics Team',
  'dbt Transformation Team',
  'Enterprise AI Engineers',
];

function TypewriterText({ words }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => setPause(false), 1600);
      return () => clearTimeout(t);
    }
    const current = words[index];
    if (!deleting && displayed === current) {
      setPause(true);
      setDeleting(true);
      return;
    }
    if (deleting && displayed === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const speed = deleting ? 38 : 62;
    const t = setTimeout(() => {
      setDisplayed(deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, index, pause, words]);

  return (
    <span className="text-grad" aria-live="polite" aria-label={words[index]}>
      {displayed}
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '3px',
          height: '0.85em',
          background: 'var(--accent-cyan)',
          marginLeft: '3px',
          verticalAlign: 'middle',
          borderRadius: '2px',
          animation: 'fadeIn 0.5s ease infinite alternate',
        }}
      />
    </span>
  );
}

export default function HeroSection() {
  const techBar = [
    { src: '/assets/tech/azure.svg', alt: 'Azure' },
    { src: '/assets/tech/fabric.svg', alt: 'Fabric' },
    { src: '/assets/tech/powerbi.svg', alt: 'Power BI' },
    { src: '/assets/tech/databricks.svg', alt: 'Databricks' },
    { src: '/assets/tech/dbt.png', alt: 'dbt' },
    { src: '/assets/tech/openai.svg', alt: 'OpenAI' },
    { src: '/assets/tech/sql.svg', alt: 'SQL Server' },
  ];

  return (
    <section
      id="hero"
      aria-labelledby="hero-headline"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: '80px', background: 'var(--bg-primary)' }}
    >
      {/* ── Animated Orb Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Orb 1 — Cyan */}
        <div
          className="orb"
          style={{
            width: '600px', height: '600px',
            top: '-100px', left: '-150px',
            background: 'radial-gradient(circle, rgba(0,229,255,0.18) 0%, transparent 70%)',
            animation: 'orb1 18s ease-in-out infinite',
          }}
        />
        {/* Orb 2 — Purple */}
        <div
          className="orb"
          style={{
            width: '700px', height: '700px',
            top: '10%', right: '-200px',
            background: 'radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)',
            animation: 'orb2 22s ease-in-out infinite',
          }}
        />
        {/* Orb 3 — Magenta */}
        <div
          className="orb"
          style={{
            width: '400px', height: '400px',
            bottom: '5%', left: '35%',
            background: 'radial-gradient(circle, rgba(217,70,239,0.10) 0%, transparent 70%)',
            animation: 'orb3 15s ease-in-out infinite',
          }}
        />

        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(var(--border-subtle) 1px, transparent 1px),
              linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Hero Content ── */}
      <div className="container relative z-10 py-24 lg:py-36">
        <div className="max-w-4xl space-y-8">

          {/* Eyebrow */}
          <div className="section-badge w-fit animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" aria-hidden="true" />
            Certified Data &amp; AI Engineering — India · Global
          </div>

          {/* Headline with typewriter */}
          <div className="space-y-2" style={{ animationDelay: '0.2s' }}>
            <h1
              id="hero-headline"
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
              }}
            >
              Your Certified
            </h1>
            <div
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: '-0.04em',
                minHeight: '1.15em',
              }}
            >
              <TypewriterText words={HEADLINES} />
            </div>
            <p
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.025em',
                color: 'var(--text-secondary)',
                lineHeight: 1.2,
                marginTop: '0.25rem',
              }}
            >
              Production-Proven. Always On.
            </p>
          </div>

          {/* Sub */}
          <p
            className="section-subtitle animate-fade-up"
            style={{ animationDelay: '0.35s', fontSize: '1.1rem', maxWidth: '580px' }}
          >
            We build <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>automated pipelines</strong>, <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Fabric lakehouses</strong>, and <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>AI agents</strong> for enterprises — without the bloated agency overhead.
          </p>

          {/* Trust micro-signals */}
          <div
            className="flex flex-wrap items-center gap-5 animate-fade-up"
            style={{ animationDelay: '0.45s' }}
          >
            {[
              { dot: '#22c55e', label: '6 Active Certifications' },
              { dot: 'var(--accent-cyan)', label: '350M+ Records/Day' },
              { dot: 'var(--accent-magenta)', label: 'Fortune 500 Clients' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: item.dot, boxShadow: `0 0 7px ${item.dot}` }}
                  aria-hidden="true"
                />
                <span
                  className="text-xs font-semibold"
                  style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: '0.55s' }}
          >
            <a
              href="#contact"
              className="btn-primary btn-shimmer"
              aria-label="Book a free enterprise consultation"
            >
              <CalendarCheck size={17} aria-hidden="true" />
              <span>Book Free Consultation</span>
            </a>
            <a
              href="#services"
              className="btn-outline"
              aria-label="Explore our data and AI capabilities"
            >
              <span>Explore Capabilities</span>
              <ChevronRight size={16} aria-hidden="true" />
            </a>
          </div>

          {/* Tech icon bar */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: '0.65s', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}
          >
            <p
              className="text-xs mb-4 font-bold uppercase tracking-widest"
              style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.2em' }}
            >
              Our Core Stack
            </p>
            <div className="flex flex-wrap items-center gap-3" role="list" aria-label="Technology stack">
              {techBar.map((t) => (
                <div
                  key={t.alt}
                  role="listitem"
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-medium)',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-strong)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                >
                  <img
                    src={t.src}
                    alt={t.alt}
                    className="w-5 h-5 object-contain"
                    loading="lazy"
                    width="20" height="20"
                  />
                  <span className="text-xs font-semibold hidden sm:block" style={{ color: 'var(--text-secondary)' }}>
                    {t.alt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }}
      />
    </section>
  );
}
