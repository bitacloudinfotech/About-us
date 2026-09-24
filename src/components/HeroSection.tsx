/**
 * HeroSection — Cinematic Preloader + Canvas Portal Experience
 * BITA CLOUD INFO TECH · 2026
 *
 * Phase 1 (0–3 s):  Full-screen black preloader with animated data-stream
 *                   background, 0→100% counter, centred logo.
 * Phase 2 (3–5 s):  Counter blurs away; logo glides to navbar slot;
 *                   header & sidebar animate in.
 * Phase 3 (5 s+):   Rounded-rectangle portal "window" grows open from centre,
 *                   revealing the hero content with a pointer-tilt parallax.
 *                   Staggered headline / stat / CTA entrance animations follow.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { CalendarCheck, ChevronRight, ArrowUpRight } from 'lucide-react';

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
  const [index, setIndex]       = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting]   = useState(false);
  const [pause, setPause]         = useState(false);

  useEffect(() => {
    if (!active) return;
    if (pause) {
      const t = setTimeout(() => setPause(false), 1600);
      return () => clearTimeout(t);
    }
    const current = words[index];
    if (!deleting && displayed === current) { setPause(true); setDeleting(true); return; }
    if (deleting  && displayed === '')       { setDeleting(false); setIndex(i => (i + 1) % words.length); return; }
    const speed = deleting ? 38 : 62;
    const t = setTimeout(() => {
      setDisplayed(deleting
        ? current.slice(0, displayed.length - 1)
        : current.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, index, pause, words, active]);

  return (
    <span className="text-grad" aria-live="polite" aria-label={words[index]}>
      {displayed}
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block', width: '3px', height: '0.82em',
          background: 'var(--accent-cyan)', marginLeft: '3px',
          verticalAlign: 'middle', borderRadius: '2px',
          animation: 'fadeIn 0.5s ease infinite alternate',
        }}
      />
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   EASING
───────────────────────────────────────────────────────────── */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function animateValue(
  setter: (v: number) => void,
  duration: number,
  ease: (t: number) => number = easeInOutCubic,
): Promise<void> {
  return new Promise(resolve => {
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setter(ease(p));
      if (p < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}

/* ─────────────────────────────────────────────────────────────
   TECH STACK BAR
───────────────────────────────────────────────────────────── */
const TECH_BAR = [
  { src: '/About-us/assets/tech/azure.svg',        alt: 'Azure' },
  { src: '/About-us/assets/tech/fabric.svg',       alt: 'Fabric' },
  { src: '/About-us/assets/tech/powerbi.svg',      alt: 'Power BI' },
  { src: '/About-us/assets/tech/databricks.svg',   alt: 'Databricks' },
  { src: '/About-us/assets/tech/dbt.png',          alt: 'dbt' },
  { src: '/About-us/assets/tech/openai.svg',       alt: 'OpenAI' },
  { src: '/About-us/assets/tech/sql.svg',          alt: 'SQL Server' },
];

const STATS = [
  { dot: '#22c55e',              label: '6 Active Certifications' },
  { dot: 'var(--accent-cyan)',   label: '350M+ Records/Day' },
  { dot: 'var(--accent-magenta)',label: 'Fortune 500 Clients' },
];

/* ─────────────────────────────────────────────────────────────
   CANVAS HELPERS
───────────────────────────────────────────────────────────── */
function buildRoundedRectPoints(w: number, h: number, r: number) {
  r = Math.min(r, w / 2, h / 2);
  const pts: [number, number][] = [];
  const corners: [number, number, number, number][] = [
    [ w/2-r, -h/2+r, -Math.PI/2,    0           ],
    [ w/2-r,  h/2-r,  0,             Math.PI/2   ],
    [-w/2+r,  h/2-r,  Math.PI/2,     Math.PI     ],
    [-w/2+r, -h/2+r,  Math.PI,       Math.PI*1.5 ],
  ];
  for (const [cx, cy, a0, a1] of corners) {
    for (let i = 0; i <= 10; i++) {
      const a = a0 + (a1 - a0) * i / 10;
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
  }
  return pts;
}

function projectPoint(
  x: number, y: number,
  cx: number, cy: number,
  rx: number, ry: number,
): [number, number] {
  const ax = rx * Math.PI / 180;
  const ay = ry * Math.PI / 180;
  const xx = x * Math.cos(ay);
  const yy = y * Math.cos(ax);
  const z  = x * Math.sin(ay) - y * Math.sin(ax);
  const p  = 850 / (850 + z);
  return [cx + xx * p, cy + yy * p];
}

/* ─────────────────────────────────────────────────────────────
   DATA STREAM CANVAS (preloader background)
───────────────────────────────────────────────────────────── */
function useDataStream(canvasRef: React.RefObject<HTMLCanvasElement | null>, active: boolean) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COLS = 40;
    const CHARS = '01ABCDEF∑∏∫√∞≈≠αβγδλσμπΩ▓▒░█';
    const drops: number[] = Array.from({ length: COLS }, () => Math.random() * -50);
    const speeds: number[] = Array.from({ length: COLS }, () => 0.3 + Math.random() * 0.5);
    let raf: number;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      if (!active) return;
      ctx.fillStyle = 'rgba(3,5,7,0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const colW = canvas.width / COLS;
      ctx.font = `${Math.floor(colW * 0.85)}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < COLS; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x    = i * colW + colW / 2;
        const y    = drops[i] * colW;
        const alpha = Math.random() > 0.95 ? 1 : 0.35;
        ctx.fillStyle = `rgba(0,229,255,${alpha})`;
        ctx.textAlign = 'center';
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += speeds[i];
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef, active]);
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function HeroSection() {
  /* ── phase flags ── */
  const [phase, setPhase] = useState<'preload'|'fly'|'open'|'done'>('preload');
  // preload: counter 0→100 + data stream
  // fly    : logo glides, counter leaves
  // open   : portal mask grows, hero content enters
  // done   : all settled

  const [count,      setCount]      = useState(0);
  const [maskScale,  setMaskScale]  = useState(0);   // 0..1
  const [contentIn,  setContentIn]  = useState(false);

  /* ── tilt ── */
  const rotXRef = useRef(0);
  const rotYRef = useRef(0);
  const tgtXRef = useRef(0);
  const tgtYRef = useRef(0);

  /* ── cursor ── */
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorEnter,   setCursorEnter]   = useState(false);
  const cursorXRef  = useRef(0);
  const cursorYRef  = useRef(0);
  const orbitXRef   = useRef(0);
  const orbitYRef   = useRef(0);
  const cursorElRef = useRef<HTMLDivElement>(null);
  const orbitElRef  = useRef<HTMLSpanElement>(null);
  const dotElRef    = useRef<HTMLSpanElement>(null);
  const labelElRef  = useRef<HTMLSpanElement>(null);

  /* ── canvas refs ── */
  const portalCanvasRef  = useRef<HTMLCanvasElement>(null);
  const streamCanvasRef  = useRef<HTMLCanvasElement>(null);

  /* ── misc ── */
  const phaseRef    = useRef(phase);
  phaseRef.current  = phase;
  const scaleRef    = useRef(maskScale);
  scaleRef.current  = maskScale;
  const portalBtnRef = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);
  const lastTimeRef  = useRef(0);

  /* ── data stream ── */
  useDataStream(streamCanvasRef, phase === 'preload' || phase === 'fly');

  /* ─── PORTAL CANVAS DRAW LOOP ─── */
  const drawPortal = useCallback((now: number) => {
    rafRef.current = requestAnimationFrame(drawPortal);
    const dt = Math.min((now - lastTimeRef.current) || 16, 40);
    lastTimeRef.current = now;

    /* tilt lerp */
    rotXRef.current += (tgtXRef.current - rotXRef.current) * Math.min(1, dt * 0.009);
    rotYRef.current += (tgtYRef.current - rotYRef.current) * Math.min(1, dt * 0.009);

    const canvas = portalCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width  / (window.devicePixelRatio || 1);
    const H = canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, W * (window.devicePixelRatio || 1), H * (window.devicePixelRatio || 1));

    if (phaseRef.current !== 'open' && phaseRef.current !== 'done') return;

    const btn = portalBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    if (!rect.width) return;

    const scale = scaleRef.current;
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const w     = rect.width  * scale;
    const h     = rect.height * scale;
    const r     = 80 * scale;
    const rx    = rotXRef.current;
    const ry    = rotYRef.current;

    if (w < 2 || h < 2) return;

    const pts = buildRoundedRectPoints(w, h, r);
    const projected = pts.map(([px, py]) => projectPoint(px, py, cx, cy, rx, ry));

    /* DPR scale */
    const dpr = window.devicePixelRatio || 1;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.beginPath();
    ctx.moveTo(projected[0][0], projected[0][1]);
    for (let i = 1; i < projected.length; i++) ctx.lineTo(projected[i][0], projected[i][1]);
    ctx.closePath();

    /* clip and draw gradient interior */
    ctx.clip();

    /* Cyan-to-purple gradient fill */
    const grad = ctx.createLinearGradient(cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2);
    grad.addColorStop(0,   'rgba(0,229,255,0.06)');
    grad.addColorStop(0.5, 'rgba(124,58,237,0.10)');
    grad.addColorStop(1,   'rgba(217,70,239,0.06)');
    ctx.fillStyle = grad;
    ctx.fillRect(cx - w * 2, cy - h * 2, w * 4, h * 4);

    /* stroke glow border */
    ctx.restore();
    ctx.save();
    ctx.scale(dpr, dpr);

    // Re-draw path for stroke (no clip)
    ctx.beginPath();
    ctx.moveTo(projected[0][0], projected[0][1]);
    for (let i = 1; i < projected.length; i++) ctx.lineTo(projected[i][0], projected[i][1]);
    ctx.closePath();
    ctx.strokeStyle = `rgba(0,229,255,${0.28 * scale})`;
    ctx.lineWidth   = 1.5;
    ctx.stroke();

    /* subtle inner glow */
    ctx.beginPath();
    ctx.moveTo(projected[0][0], projected[0][1]);
    for (let i = 1; i < projected.length; i++) ctx.lineTo(projected[i][0], projected[i][1]);
    ctx.closePath();
    ctx.strokeStyle = `rgba(124,58,237,${0.18 * scale})`;
    ctx.lineWidth   = 6;
    ctx.stroke();

    ctx.restore();
  }, []);

  /* ─── RESIZE PORTAL CANVAS ─── */
  useEffect(() => {
    const resize = () => {
      const canvas = portalCanvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = window.innerWidth  + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  /* ─── POINTER TILT ─── */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      cursorXRef.current = e.clientX;
      cursorYRef.current = e.clientY;
      if (!cursorVisible) setCursorVisible(true);
      if (phaseRef.current === 'open' || phaseRef.current === 'done') {
        tgtYRef.current =  (e.clientX / window.innerWidth  - 0.5) * 28;
        tgtXRef.current =  (e.clientY / window.innerHeight - 0.5) * -22;
      }
    };
    const onLeave = () => {
      tgtXRef.current = 0;
      tgtYRef.current = 0;
      setCursorVisible(false);
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('mouseleave',  onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave',  onLeave);
    };
  }, [cursorVisible]);

  /* ─── CURSOR LOOP ─── */
  useEffect(() => {
    let raf: number;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      orbitXRef.current += (cursorXRef.current - orbitXRef.current) * 0.18;
      orbitYRef.current += (cursorYRef.current - orbitYRef.current) * 0.18;
      if (cursorElRef.current) {
        cursorElRef.current.style.transform =
          `translate3d(${orbitXRef.current}px,${orbitYRef.current}px,0)`;
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ─── PORTAL CANVAS RAF ─── */
  useEffect(() => {
    rafRef.current = requestAnimationFrame(drawPortal);
    return () => cancelAnimationFrame(rafRef.current);
  }, [drawPortal]);

  /* ─── PRELOADER SEQUENCE ─── */
  useEffect(() => {
    let running = true;
    let rafId: number;

    async function sequence() {
      /* Phase 1: count 0→100 over 2.6 s */
      const startT = performance.now();
      const PRELOAD_MS = 2600;
      await new Promise<void>(resolve => {
        const tick = (now: number) => {
          if (!running) return resolve();
          const p = Math.min((now - startT) / PRELOAD_MS, 1);
          setCount(Math.round(p * 100));
          if (p < 1) rafId = requestAnimationFrame(tick);
          else resolve();
        };
        rafId = requestAnimationFrame(tick);
      });

      if (!running) return;
      setCount(100);

      /* Phase 2: fly logo → show header */
      setPhase('fly');
      await new Promise(r => setTimeout(r, 750)); // counter leaves

      if (!running) return;

      /* Phase 3: open portal mask */
      setPhase('open');
      await animateValue(v => setMaskScale(v), 1050, easeOutExpo);

      if (!running) return;

      await new Promise(r => setTimeout(r, 120));
      setContentIn(true);
      setPhase('done');
    }

    sequence();
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
    };
  }, []);

  const isPreload = phase === 'preload';
  const isFly     = phase === 'fly';
  const isOpen    = phase === 'open' || phase === 'done';

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          CUSTOM CURSOR
      ═══════════════════════════════════════════════════════ */}
      <div
        ref={cursorElRef}
        aria-hidden="true"
        style={{
          position: 'fixed', left: 0, top: 0, zIndex: 9999,
          width: 1, height: 1, pointerEvents: 'none',
          opacity: cursorVisible && isOpen ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        <span ref={orbitElRef} style={{
          position: 'absolute', left: 0, top: 0, borderRadius: '50%',
          width: 36, height: 36,
          border: '1px solid rgba(0,229,255,0.7)',
          background: 'rgba(0,229,255,0.08)',
          transform: `translate(-50%,-50%) scale(${cursorEnter ? 1.18 : 1})`,
          transition: 'transform 0.3s cubic-bezier(.22,1,.36,1)',
          backdropFilter: 'blur(2px)',
        }} />
        <span ref={dotElRef} style={{
          position: 'absolute', left: 0, top: 0, borderRadius: '50%',
          width: 8, height: 8,
          background: 'var(--accent-cyan)',
          transform: 'translate(-50%,-50%)',
          boxShadow: '0 0 8px var(--accent-cyan)',
        }} />
        <span ref={labelElRef} style={{
          position: 'absolute', top: 24, left: 0,
          transform: `translateX(-50%) translateY(${cursorEnter ? 0 : -4}px)`,
          fontSize: 11, fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: '0.12em', color: 'var(--accent-cyan)',
          textTransform: 'uppercase', whiteSpace: 'nowrap',
          opacity: cursorEnter ? 1 : 0,
          transition: 'opacity 0.2s ease, transform 0.3s cubic-bezier(.22,1,.36,1)',
        }}>
          Enter Portal
        </span>
      </div>

      {/* ═══════════════════════════════════════════════════════
          PORTAL CANVAS (fixed, full-screen, pointer-events:none)
      ═══════════════════════════════════════════════════════ */}
      <canvas
        ref={portalCanvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 2,
          pointerEvents: 'none',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          PRELOADER OVERLAY
      ═══════════════════════════════════════════════════════ */}
      <div
        aria-label="Loading BITA CLOUD INFO TECH"
        aria-live="polite"
        style={{
          position: 'fixed', inset: 0, zIndex: 80,
          background: '#030507',
          pointerEvents: isPreload || isFly ? 'auto' : 'none',
          opacity: isPreload || isFly ? 1 : 0,
          transition: 'opacity 0.7s ease',
        }}
      >
        {/* Data stream canvas */}
        <canvas
          ref={streamCanvasRef}
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55 }}
        />

        {/* Radial vignette */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, #030507 100%)',
        }} />

        {/* Centred BITA logo */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: isFly ? 'calc(clamp(18px,1.95vw,28px) + 20px)' : '50%',
            top:  isFly ? 'calc(clamp(18px,3.1vh,28px) + 20px)'  : '50%',
            transform: isFly ? 'none' : 'translate(-50%,-50%)',
            transition: 'left 2s cubic-bezier(.16,1,.3,1), top 2s cubic-bezier(.16,1,.3,1), transform 2s cubic-bezier(.16,1,.3,1)',
            zIndex: 2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          }}
        >
          <div style={{
            width: isFly ? 36 : 64, height: isFly ? 36 : 64,
            borderRadius: 14,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-medium)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(0,229,255,0.15)',
            transition: 'width 2s cubic-bezier(.16,1,.3,1), height 2s cubic-bezier(.16,1,.3,1)',
          }}>
            <img
              src="/About-us/Bitacloudinfotechtransparent.png"
              alt="BITA CLOUD INFO TECH"
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }}
            />
          </div>
          {!isFly && (
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
              color: 'var(--accent-cyan)', letterSpacing: '0.3em',
              textTransform: 'uppercase', opacity: 0.8,
            }}>
              BITA CLOUD INFO TECH
            </span>
          )}
        </div>

        {/* Counter */}
        <div
          style={{
            position: 'absolute', left: '50%', bottom: 'clamp(22px,3.1vh,28px)',
            transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'flex-end', gap: 4,
            opacity: isFly ? 0 : 1,
            filter: isFly ? 'blur(8px)' : 'blur(0)',
            transition: 'opacity 0.6s ease, filter 0.6s ease',
            zIndex: 2,
          }}
          aria-live="polite"
        >
          <span style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 100,
            fontSize: 'clamp(52px,8vw,72px)', lineHeight: 1,
            color: '#fff', letterSpacing: '-0.04em',
          }}>
            {count}
          </span>
          <span style={{ fontSize: 22, paddingBottom: 6, color: 'var(--text-secondary)' }}>%</span>
        </div>

        {/* Thin progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: 2, width: `${count}%`,
          background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
          transition: 'width 0.1s linear',
          zIndex: 3,
        }} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section
        id="hero"
        aria-labelledby="hero-headline"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ paddingTop: 80, background: 'var(--bg-primary)' }}
      >
        {/* ── Ambient orbs ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="orb" style={{
            width: 700, height: 700, top: -150, left: -180,
            background: 'radial-gradient(circle, rgba(0,229,255,0.14) 0%, transparent 70%)',
            animation: 'orb1 20s ease-in-out infinite',
          }} />
          <div className="orb" style={{
            width: 800, height: 800, top: '5%', right: -220,
            background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
            animation: 'orb2 26s ease-in-out infinite',
          }} />
          <div className="orb" style={{
            width: 450, height: 450, bottom: '8%', left: '40%',
            background: 'radial-gradient(circle, rgba(217,70,239,0.09) 0%, transparent 70%)',
            animation: 'orb3 17s ease-in-out infinite',
          }} />
          {/* Grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(var(--border-subtle) 1px, transparent 1px),
                              linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)`,
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 75% 75% at 50% 40%, black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 40%, black 30%, transparent 100%)',
          }} />
        </div>

        {/* ── Portal target div (invisible, gives canvas its anchor rect) ── */}
        <div
          ref={portalBtnRef}
          aria-hidden="true"
          onMouseEnter={() => setCursorEnter(true)}
          onMouseLeave={() => setCursorEnter(false)}
          style={{
            position: 'absolute',
            left: '50%', top: '50%',
            width: 'min(420px, 46vw)',
            aspectRatio: '9/10',
            transform: 'translate(-50%, -54%)',
            borderRadius: 80,
            zIndex: 3,
            cursor: 'none',
          }}
        />

        {/* ── Main hero content ── */}
        <div className="container relative z-10 py-24 lg:py-36">
          <div className="max-w-4xl space-y-8">

            {/* Badge */}
            <div
              className="section-badge w-fit"
              style={{
                opacity:   contentIn ? 1 : 0,
                transform: contentIn ? 'translateY(0)' : 'translateY(-16px)',
                filter:    contentIn ? 'blur(0)' : 'blur(6px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.1s, filter 0.7s ease 0.1s',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" aria-hidden="true" />
              Certified Data &amp; AI Engineering — India · Global
            </div>

            {/* Headline */}
            <div
              className="space-y-2"
              style={{
                opacity:   contentIn ? 1 : 0,
                transform: contentIn ? 'translateY(0)' : 'translateY(20px)',
                filter:    contentIn ? 'blur(0)' : 'blur(8px)',
                transition: 'opacity 0.9s ease 0.25s, transform 0.9s cubic-bezier(.16,1,.3,1) 0.25s, filter 0.9s ease 0.25s',
              }}
            >
              <h1
                id="hero-headline"
                style={{
                  fontSize: 'clamp(2.4rem,5.5vw,4.5rem)',
                  fontWeight: 800, lineHeight: 1.06,
                  letterSpacing: '-0.04em',
                  color: 'var(--text-primary)',
                }}
              >
                Your Certified
              </h1>
              <div style={{
                fontSize: 'clamp(2.4rem,5.5vw,4.5rem)',
                fontWeight: 800, lineHeight: 1.06,
                letterSpacing: '-0.04em', minHeight: '1.15em',
              }}>
                <TypewriterText words={HEADLINES} active={contentIn} />
              </div>
              <p style={{
                fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 300,
                letterSpacing: '-0.025em', color: 'var(--text-secondary)',
                lineHeight: 1.2, marginTop: '0.25rem',
              }}>
                Production-Proven. Always On.
              </p>
            </div>

            {/* Sub-copy */}
            <p
              className="section-subtitle"
              style={{
                fontSize: '1.1rem', maxWidth: 580,
                opacity:   contentIn ? 1 : 0,
                transform: contentIn ? 'translateY(0)' : 'translateY(16px)',
                filter:    contentIn ? 'blur(0)' : 'blur(6px)',
                transition: 'opacity 0.8s ease 0.45s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.45s, filter 0.8s ease 0.45s',
              }}
            >
              We build{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>automated pipelines</strong>,{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Fabric lakehouses</strong>, and{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>AI agents</strong>{' '}
              for enterprises — without the bloated agency overhead.
            </p>

            {/* Stats dots */}
            <div
              className="flex flex-wrap items-center gap-5"
              style={{
                opacity:   contentIn ? 1 : 0,
                transform: contentIn ? 'translateY(0)' : 'translateY(14px)',
                filter:    contentIn ? 'blur(0)' : 'blur(5px)',
                transition: 'opacity 0.8s ease 0.58s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.58s, filter 0.8s ease 0.58s',
              }}
            >
              {STATS.map(s => (
                <div key={s.label} className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: s.dot, boxShadow: `0 0 7px ${s.dot}` }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-xs font-semibold"
                    style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div
              className="flex flex-wrap items-center gap-3"
              style={{
                opacity:   contentIn ? 1 : 0,
                transform: contentIn ? 'translateY(0)' : 'translateY(14px)',
                transition: 'opacity 0.8s ease 0.68s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.68s',
              }}
            >
              <a href="#contact" className="btn-primary btn-shimmer" aria-label="Book a free enterprise consultation">
                <CalendarCheck size={17} aria-hidden="true" />
                <span>Book Free Consultation</span>
              </a>
              <a href="#services" className="btn-outline" aria-label="Explore our data and AI capabilities">
                <span>Explore Capabilities</span>
                <ChevronRight size={16} aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/918982296014"
                target="_blank" rel="noopener noreferrer"
                className="btn-ghost"
                aria-label="Chat on WhatsApp"
                style={{ gap: 6 }}
              >
                <ArrowUpRight size={14} aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Tech stack bar */}
            <div
              style={{
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)',
                opacity:   contentIn ? 1 : 0,
                transition: 'opacity 0.9s ease 0.82s',
              }}
            >
              <p className="text-xs mb-4 font-bold uppercase tracking-widest" style={{
                color: 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '0.2em',
              }}>
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
