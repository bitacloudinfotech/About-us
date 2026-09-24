/**
 * HeroSection — Premium Tech Industry Hero
 * BITA CLOUD INFO TECH · Data & AI Engineering · 2026
 *
 * Features:
 *  - Branded 1.8s preloader (BITA logo + progress bar, no planets)
 *  - Animated particle mesh / data-node canvas (tech/AI aesthetic)
 *  - Smooth staggered content reveal
 *  - Custom orbit cursor (cyan ring + dot)
 *  - Pointer-aware ambient glow that tracks mouse position
 *  - Typewriter headline cycling through capabilities
 *  - All tokens from existing design system
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { CalendarCheck, ChevronRight, MessageSquare, Database, Cpu, BarChart3, Zap } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   TYPEWRITER
───────────────────────────────────────────────────────────── */
const HEADLINES = [
  'Azure Data Team',
  'Fabric Lakehouse Experts',
  'Power BI Analytics Team',
  'dbt Transformation Team',
  'Enterprise AI Engineers',
];

function TypewriterText({ words, active }: { words: string[]; active: boolean }) {
  const [index, setIndex]         = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting]   = useState(false);
  const [pause, setPause]         = useState(false);

  useEffect(() => {
    if (!active) return;
    if (pause) { const t = setTimeout(() => setPause(false), 1800); return () => clearTimeout(t); }
    const current = words[index];
    if (!deleting && displayed === current) { setPause(true); setDeleting(true); return; }
    if (deleting  && displayed === '')       { setDeleting(false); setIndex(i => (i + 1) % words.length); return; }
    const t = setTimeout(() => {
      setDisplayed(deleting
        ? current.slice(0, displayed.length - 1)
        : current.slice(0, displayed.length + 1));
    }, deleting ? 36 : 58);
    return () => clearTimeout(t);
  }, [displayed, deleting, index, pause, words, active]);

  return (
    <span className="text-grad" aria-live="polite" aria-label={words[index]}>
      {displayed}
      <span aria-hidden="true" style={{
        display: 'inline-block', width: '3px', height: '0.82em',
        background: 'var(--accent-cyan)', marginLeft: '3px',
        verticalAlign: 'middle', borderRadius: '2px',
        animation: 'fadeIn 0.5s ease infinite alternate',
      }} />
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   PARTICLE MESH CANVAS
   Nodes connected by edges — data-engineering aesthetic
───────────────────────────────────────────────────────────── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

function useParticleMesh(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  mouseRef:  React.RefObject<{ x: number; y: number }>,
  active:    boolean,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COLORS = ['rgba(0,229,255,', 'rgba(124,58,237,', 'rgba(217,70,239,'];
    let particles: Particle[] = [];
    let raf: number;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const init = () => {
      const COUNT = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 70);
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current?.x ?? -9999;
      const my = mouseRef.current?.y ?? -9999;
      const LINK_DIST   = 140;
      const MOUSE_DIST  = 180;

      /* Update */
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += p.pulseSpeed;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      /* Edges */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        /* Mouse attraction lines */
        const dmx = particles[i].x - mx;
        const dmy = particles[i].y - my;
        const dm  = Math.sqrt(dmx * dmx + dmy * dmy);
        if (dm < MOUSE_DIST) {
          const alpha = (1 - dm / MOUSE_DIST) * 0.4;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }

      /* Dots */
      particles.forEach(p => {
        const glowAlpha = 0.55 + Math.sin(p.pulse) * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + glowAlpha + ')';
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [canvasRef, mouseRef, active]);
}

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const TECH_BAR = [
  { src: '/About-us/assets/tech/azure.svg',      alt: 'Azure' },
  { src: '/About-us/assets/tech/fabric.svg',     alt: 'Fabric' },
  { src: '/About-us/assets/tech/powerbi.svg',    alt: 'Power BI' },
  { src: '/About-us/assets/tech/databricks.svg', alt: 'Databricks' },
  { src: '/About-us/assets/tech/dbt.png',        alt: 'dbt' },
  { src: '/About-us/assets/tech/openai.svg',     alt: 'OpenAI' },
  { src: '/About-us/assets/tech/sql.svg',        alt: 'SQL Server' },
];

const STATS = [
  { dot: '#22c55e',               label: '6 Active Certifications', icon: <Zap size={11}/> },
  { dot: 'var(--accent-cyan)',    label: '350M+ Records/Day',        icon: <Database size={11}/> },
  { dot: 'var(--accent-magenta)', label: 'Fortune 500 Clients',      icon: <Cpu size={11}/> },
  { dot: '#f59e0b',               label: '99.9% Pipeline Uptime',    icon: <BarChart3 size={11}/> },
];

const CAPABILITY_CHIPS = ['Azure Data Factory', 'Microsoft Fabric', 'Power BI', 'Databricks', 'dbt', 'OpenAI / GPT-4o'];

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function HeroSection() {
  /* Phases: preload → reveal → done */
  const [phase,     setPhase]     = useState<'preload' | 'reveal' | 'done'>('preload');
  const [progress,  setProgress]  = useState(0);   // 0–100 preloader
  const [revealed,  setRevealed]  = useState(false);

  /* Cursor */
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorEnter,   setCursorEnter]   = useState(false);
  const cursorElRef = useRef<HTMLDivElement>(null);
  const cursorRawX  = useRef(0);
  const cursorRawY  = useRef(0);
  const cursorLerpX = useRef(0);
  const cursorLerpY = useRef(0);
  const dotLerpX    = useRef(0);
  const dotLerpY    = useRef(0);

  /* Ambient glow that follows mouse */
  const glowElRef = useRef<HTMLDivElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  /* Canvas */
  const meshCanvasRef = useRef<HTMLCanvasElement>(null);
  useParticleMesh(meshCanvasRef, mouseRef, phase === 'done');

  /* ── PRELOADER SEQUENCE ── */
  useEffect(() => {
    let raf: number;
    const DURATION = 1600; // ms
    const start    = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setProgress(Math.round(p * 100));
      if (p < 1) { raf = requestAnimationFrame(tick); return; }
      /* Done counting — transition out */
      setProgress(100);
      setTimeout(() => {
        setPhase('reveal');
        setTimeout(() => {
          setPhase('done');
          setRevealed(true);
        }, 600); // overlay fades out, then particles start
      }, 320);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── POINTER TRACKING ── */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      cursorRawX.current = e.clientX;
      cursorRawY.current = e.clientY;
      mouseRef.current   = { x: e.clientX, y: e.clientY };
      if (!cursorVisible) setCursorVisible(true);
    };
    const onLeave = () => setCursorVisible(false);
    document.addEventListener('pointermove', onMove);
    document.addEventListener('mouseleave',  onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave',  onLeave);
    };
  }, [cursorVisible]);

  /* ── CURSOR + GLOW RAF ── */
  useEffect(() => {
    let raf: number;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      /* Orbit lags behind pointer */
      cursorLerpX.current += (cursorRawX.current - cursorLerpX.current) * 0.16;
      cursorLerpY.current += (cursorRawY.current - cursorLerpY.current) * 0.16;
      /* Dot is slightly faster */
      dotLerpX.current += (cursorRawX.current - dotLerpX.current) * 0.42;
      dotLerpY.current += (cursorRawY.current - dotLerpY.current) * 0.42;

      if (cursorElRef.current) {
        cursorElRef.current.style.transform =
          `translate3d(${cursorLerpX.current}px,${cursorLerpY.current}px,0)`;
      }
      /* Ambient glow follows mouse */
      if (glowElRef.current) {
        glowElRef.current.style.background =
          `radial-gradient(600px circle at ${cursorRawX.current}px ${cursorRawY.current}px, rgba(0,229,255,0.055) 0%, transparent 60%)`;
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onCtaEnter  = useCallback(() => setCursorEnter(true),  []);
  const onCtaLeave  = useCallback(() => setCursorEnter(false), []);

  const isPreload = phase === 'preload';
  const isReveal  = phase === 'reveal';

  /* Stagger helper */
  const stagger = (delay: number) => ({
    opacity:   revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(22px)',
    filter:    revealed ? 'blur(0)' : 'blur(6px)',
    transition: `opacity 0.8s ease ${delay}s, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}s, filter 0.8s ease ${delay}s`,
  });

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          CUSTOM CURSOR (only on hover devices)
      ═══════════════════════════════════════════════════════ */}
      <div
        ref={cursorElRef}
        aria-hidden="true"
        data-cursor="true"
        style={{
          position: 'fixed', left: 0, top: 0, zIndex: 9999,
          width: 1, height: 1, pointerEvents: 'none',
          opacity: cursorVisible && phase === 'done' ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        {/* Orbit ring */}
        <span style={{
          position: 'absolute',
          width: 38, height: 38,
          borderRadius: '50%',
          border: `1px solid rgba(0,229,255,${cursorEnter ? 0.85 : 0.5})`,
          background: `rgba(0,229,255,${cursorEnter ? 0.08 : 0.03})`,
          transform: `translate(-50%,-50%) scale(${cursorEnter ? 1.22 : 1})`,
          transition: 'transform 0.35s cubic-bezier(.22,1,.36,1), border-color 0.25s, background 0.25s',
          backdropFilter: 'blur(2px)',
        }} />
        {/* Inner dot */}
        <span style={{
          position: 'absolute',
          width: cursorEnter ? 6 : 8,
          height: cursorEnter ? 6 : 8,
          borderRadius: '50%',
          background: 'var(--accent-cyan)',
          boxShadow: '0 0 8px var(--accent-cyan)',
          transform: 'translate(-50%,-50%)',
          transition: 'width 0.25s, height 0.25s',
        }} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          PRELOADER
      ═══════════════════════════════════════════════════════ */}
      <div
        aria-label="Loading BITA CLOUD INFO TECH"
        role="status"
        style={{
          position: 'fixed', inset: 0, zIndex: 90,
          background: 'var(--bg-primary)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          opacity: isPreload || isReveal ? 1 : 0,
          pointerEvents: isPreload ? 'auto' : 'none',
          transition: 'opacity 0.55s cubic-bezier(.22,1,.36,1)',
        }}
      >
        {/* Subtle grid */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        {/* Logo + name */}
        <div style={{
          position: 'relative', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 20,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-medium)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: `0 0 0 1px rgba(0,229,255,0.15), 0 0 48px rgba(0,229,255,0.12)`,
            animation: 'logo-glow 2.5s ease-in-out infinite',
          }}>
            <img
              src="/About-us/Bitacloudinfotechtransparent.png"
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 10 }}
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 700,
              fontSize: 18, letterSpacing: '-0.02em',
              color: 'var(--text-primary)', lineHeight: 1.2,
            }}>
              BITA CLOUD INFO TECH
            </div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              color: 'var(--accent-cyan)', letterSpacing: '0.25em',
              textTransform: 'uppercase', marginTop: 4, opacity: 0.8,
            }}>
              Data &amp; AI Engineering
            </div>
          </div>

          {/* Progress bar */}
          <div style={{
            width: 200, height: 2,
            background: 'var(--border-subtle)', borderRadius: 99, overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', borderRadius: 99,
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
              transition: 'width 0.08s linear',
              boxShadow: '0 0 8px rgba(0,229,255,0.5)',
            }} />
          </div>

          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: 'var(--text-muted)', letterSpacing: '0.1em',
          }}>
            {progress}%
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section
        id="hero"
        aria-labelledby="hero-headline"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ paddingTop: 80, background: 'var(--bg-primary)' }}
        onMouseEnter={onCtaEnter}
        onMouseLeave={onCtaLeave}
      >
        {/* Ambient mouse-tracking glow */}
        <div
          ref={glowElRef}
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            pointerEvents: 'none',
            opacity: phase === 'done' ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />

        {/* Particle mesh canvas */}
        <canvas
          ref={meshCanvasRef}
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            width: '100%', height: '100%',
            opacity: phase === 'done' ? 1 : 0,
            transition: 'opacity 1.2s ease 0.3s',
          }}
        />

        {/* Ambient orbs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="orb" style={{
            width: 650, height: 650, top: -160, left: -200,
            background: 'radial-gradient(circle, rgba(0,229,255,0.13) 0%, transparent 70%)',
            animation: 'orb1 20s ease-in-out infinite',
          }} />
          <div className="orb" style={{
            width: 750, height: 750, top: '8%', right: -240,
            background: 'radial-gradient(circle, rgba(124,58,237,0.11) 0%, transparent 70%)',
            animation: 'orb2 26s ease-in-out infinite',
          }} />
          <div className="orb" style={{
            width: 420, height: 420, bottom: '10%', left: '42%',
            background: 'radial-gradient(circle, rgba(217,70,239,0.08) 0%, transparent 70%)',
            animation: 'orb3 17s ease-in-out infinite',
          }} />
          {/* Grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(var(--border-subtle) 1px, transparent 1px),
                              linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)`,
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 80% 75% at 50% 40%, black 25%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 75% at 50% 40%, black 25%, transparent 100%)',
          }} />
        </div>

        {/* ── Content ── */}
        <div className="container relative z-10 py-24 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT — Main copy */}
            <div className="space-y-8">

              {/* Badge */}
              <div className="section-badge w-fit" style={stagger(0.05)}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" aria-hidden="true" />
                Certified Data &amp; AI Engineering — India · Global
              </div>

              {/* Headline */}
              <div className="space-y-1" style={stagger(0.15)}>
                <h1
                  id="hero-headline"
                  style={{
                    fontSize: 'clamp(2.5rem,5.5vw,4.8rem)',
                    fontWeight: 800, lineHeight: 1.05,
                    letterSpacing: '-0.04em',
                    color: 'var(--text-primary)',
                  }}
                >
                  Your Certified
                </h1>
                <div style={{
                  fontSize: 'clamp(2.5rem,5.5vw,4.8rem)',
                  fontWeight: 800, lineHeight: 1.05,
                  letterSpacing: '-0.04em', minHeight: '1.12em',
                }}>
                  <TypewriterText words={HEADLINES} active={revealed} />
                </div>
                <p style={{
                  fontSize: 'clamp(1.4rem,2.8vw,2.3rem)', fontWeight: 300,
                  letterSpacing: '-0.02em', color: 'var(--text-secondary)',
                  lineHeight: 1.25, marginTop: '0.3rem',
                }}>
                  Production-Proven. Always On.
                </p>
              </div>

              {/* Sub-copy */}
              <p className="section-subtitle" style={{ ...stagger(0.28), fontSize: '1.08rem', maxWidth: 540 }}>
                We build{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>automated pipelines</strong>,{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Fabric lakehouses</strong>, and{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>AI agents</strong>{' '}
                for enterprises — without the bloated agency overhead.
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap items-center gap-3" style={stagger(0.40)}>
                <a
                  href="#contact"
                  className="btn-primary btn-shimmer"
                  aria-label="Book a free enterprise consultation"
                  onMouseEnter={onCtaEnter}
                  onMouseLeave={onCtaLeave}
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
                <a
                  href="https://wa.me/918982296014"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ fontSize: '0.82rem', padding: '0.6rem 1.1rem' }}
                  aria-label="Chat on WhatsApp"
                >
                  <MessageSquare size={14} className="fill-white" aria-hidden="true" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>

              {/* Stats row */}
              <div
                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                style={stagger(0.52)}
              >
                {STATS.map(s => (
                  <div
                    key={s.label}
                    className="master-card flex flex-col items-start gap-1.5"
                    style={{ padding: '0.85rem 1rem' }}
                  >
                    <span style={{ color: s.dot, display: 'flex', alignItems: 'center', gap: 4 }}>
                      {s.icon}
                    </span>
                    <span
                      className="text-xs font-semibold leading-tight"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem' }}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Visual card */}
            <div
              className="hidden lg:flex flex-col gap-5"
              style={{
                ...stagger(0.3),
                opacity: revealed ? 1 : 0,
              }}
            >
              {/* Glass terminal card */}
              <div
                className="grad-border-card"
                style={{ padding: '1.5rem' }}
                aria-label="Sample data pipeline activity"
              >
                {/* Terminal header */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  marginBottom: '1rem', paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-subtle)',
                }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{
                    marginLeft: 8, fontSize: 11,
                    fontFamily: 'JetBrains Mono, monospace',
                    color: 'var(--text-muted)', letterSpacing: '0.05em',
                  }}>
                    bita_pipeline.py — Azure Data Factory
                  </span>
                </div>

                {/* Fake code lines */}
                {[
                  { line: '01', color: '#7c3aed', code: 'from azure.datafactory import Pipeline' },
                  { line: '02', color: 'var(--text-muted)', code: '' },
                  { line: '03', color: '#0284c7', code: '@pipeline(name="BITA_ETL_PROD")' },
                  { line: '04', color: 'var(--text-primary)', code: 'def run_enterprise_pipeline():' },
                  { line: '05', color: '#00e5ff', code: '    ingest(source="OnPrem_SQL")' },
                  { line: '06', color: '#00e5ff', code: '    transform(layer="Gold")' },
                  { line: '07', color: '#22c55e', code: '    load(target="Fabric_OneLake")' },
                  { line: '08', color: '#f59e0b', code: '    notify(sla="<2s", status=OK)' },
                ].map(({ line, color, code }) => (
                  <div key={line} style={{ display: 'flex', gap: 16, marginBottom: 3 }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--text-muted)', minWidth: 20, opacity: 0.5 }}>{line}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color }}>{code}</span>
                  </div>
                ))}

                {/* Running indicator */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  marginTop: '1rem', paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: '0 0 8px #22c55e',
                    animation: 'pulse-ring 1.8s ease-out infinite',
                    display: 'inline-block',
                  }} />
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#22c55e' }}>
                    Pipeline running · 350M records/day · 0 errors
                  </span>
                </div>
              </div>

              {/* Capability chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {CAPABILITY_CHIPS.map(chip => (
                  <span
                    key={chip}
                    className="code-badge"
                    style={{ fontSize: '0.68rem', padding: '0.3rem 0.75rem' }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Trust signals */}
              <div
                className="master-card"
                style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-medium)',
                  overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img
                    src="/About-us/Bitacloudinfotechtransparent.png"
                    alt="BITA CLOUD"
                    style={{ width: '100%', objectFit: 'contain', padding: 4 }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>
                    BITA CLOUD INFO TECH
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}>
                    Microsoft · Databricks · OpenAI Certified Partner
                  </div>
                </div>
                <span
                  className="code-badge"
                  style={{ marginLeft: 'auto', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#22c55e', flexShrink: 0 }}
                >
                  ● LIVE
                </span>
              </div>
            </div>
          </div>

          {/* ── Tech stack bar (full width, below both columns) ── */}
          <div
            style={{
              marginTop: '3.5rem', paddingTop: '2rem',
              borderTop: '1px solid var(--border-subtle)',
              ...stagger(0.65),
            }}
          >
            <p
              className="text-xs mb-4 font-bold uppercase tracking-widest"
              style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.2em' }}
            >
              Our Core Stack
            </p>
            <div className="flex flex-wrap items-center gap-3" role="list" aria-label="Technology stack">
              {TECH_BAR.map(t => (
                <div
                  key={t.alt}
                  role="listitem"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-medium)', cursor: 'default' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-medium)')}
                >
                  <img src={t.src} alt={t.alt} className="w-5 h-5 object-contain" loading="lazy" width={20} height={20} />
                  <span className="text-xs font-semibold hidden sm:block" style={{ color: 'var(--text-secondary)' }}>
                    {t.alt}
                  </span>
                </div>
              ))}
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
    </>
  );
}
