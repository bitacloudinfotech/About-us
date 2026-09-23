import { useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const stats = [
  { value: '16x', rawTarget: 16, suffix: 'x', label: 'Faster Pipeline Delivery', sub: 'vs. in-house teams — avg. client result' },
  { value: '350M+', rawTarget: 350, suffix: 'M+', label: 'Records Processed Daily', sub: 'Across Fabric, Databricks & OneLake' },
  { value: '97%', rawTarget: 97, suffix: '%', label: 'Reporting Lag Reduction', sub: 'Via DirectQuery Power BI optimization' },
  { value: '99.99%', rawTarget: 99.99, suffix: '%', label: 'Uptime SLA Guaranteed', sub: 'Managed Azure cloud architecture' },
];

function StatCounter({ rawTarget, suffix, label, sub }: { rawTarget: number; suffix: string; label: string; sub: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 1800;
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * rawTarget;
        el.textContent = (rawTarget % 1 !== 0 ? current.toFixed(2) : Math.floor(current).toString()) + suffix;
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [rawTarget, suffix]);

  return (
    <div className="group reveal" style={{ paddingTop: '1.5rem', borderTop: '2px solid var(--border-medium)' }}>
      <span ref={ref} className="block text-grad-stats font-black leading-none mb-3 transition-transform duration-300 group-hover:scale-105 origin-left ticker"
        style={{ fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', letterSpacing: '-0.05em', lineHeight: 1 }} aria-label={rawTarget + suffix + ' ' + label}>
        0
      </span>
      <p className="font-bold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>{label}</p>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{sub}</p>
    </div>
  );
}

export default function StatsBanner() {
  return (
    <section id="stats" aria-label="Performance metrics and client results" className="section-padding"
      style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '200px', background: 'var(--grad-glow)', pointerEvents: 'none' }} />
      <div className="container relative z-10">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div className="space-y-3 reveal">
            <div className="section-badge w-fit">Measured Client Results</div>
            <h2 className="section-title" style={{ maxWidth: '520px' }}>Real results from<br /><strong>real engagements</strong></h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)', maxWidth: '420px' }}>
              Every metric below is averaged across verified client engagements. No estimates. No projections.
            </p>
          </div>
          <a href="#process" className="link-readmore reveal reveal-delay-2" aria-label="View our delivery process">
            <span style={{ borderBottom: '1px solid var(--border-medium)', paddingBottom: '2px' }}>View Delivery Process</span>
            <ArrowUpRight size={16} style={{ color: 'var(--accent-cyan)' }} aria-hidden="true" />
          </a>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((s, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd><StatCounter {...s} /></dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-xs reveal" style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          * Based on average results across client engagements. Individual results vary by project scope and complexity.
        </p>
      </div>
    </section>
  );
}
