import { useState, useEffect, useRef } from 'react';

// Custom useTypewriter hook as specified:
// takes text, speed (default 38ms), startDelay (default 600ms)
// reveals one character at a time after startDelay
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let intervalId: any = null;

    const startTimer = setTimeout(() => {
      intervalId = setInterval(() => {
        index++;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevX = useRef<number | null>(null);
  const isSeeking = useRef(false);
  const pendingSeek = useRef<number | null>(null);

  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Typewriter text
  const typewriterText = "Glad you stopped in. Good taste tends to find us. Now, what are we building?";
  const { displayed, done } = useTypewriter(typewriterText, 38, 600);

  // Buttons become visible 400ms after page load, independent of typewriter
  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Mouse-scrub controlled video logic:
  // (delta / window.innerWidth) * SENSITIVITY * video.duration where SENSITIVITY = 0.8
  useEffect(() => {
    const SENSITIVITY = 0.8;

    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) return;

      if (prevX.current === null) {
        prevX.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevX.current;
      prevX.current = e.clientX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const targetTime = Math.max(0, Math.min(video.duration, video.currentTime + timeOffset));

      if (isSeeking.current) {
        pendingSeek.current = targetTime;
      } else {
        isSeeking.current = true;
        video.currentTime = targetTime;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) return;
      const clientX = e.touches[0]?.clientX;
      if (clientX === undefined) return;

      if (prevX.current === null) {
        prevX.current = clientX;
        return;
      }

      const delta = clientX - prevX.current;
      prevX.current = clientX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const targetTime = Math.max(0, Math.min(video.duration, video.currentTime + timeOffset));

      if (isSeeking.current) {
        pendingSeek.current = targetTime;
      } else {
        isSeeking.current = true;
        video.currentTime = targetTime;
      }
    };

    const resetPointer = () => {
      prevX.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', resetPointer);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', resetPointer);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', resetPointer);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', resetPointer);
    };
  }, []);

  const handleSeeked = () => {
    isSeeking.current = false;
    if (pendingSeek.current !== null) {
      const nextTarget = pendingSeek.current;
      pendingSeek.current = null;
      if (videoRef.current) {
        isSeeking.current = true;
        videoRef.current.currentTime = nextTarget;
      }
    }
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = 'hello@mainframe.co';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Background Video (mouse-scrub controlled) */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4"
        muted
        playsInline
        preload="auto"
        onSeeked={handleSeeked}
        className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none"
        style={{ objectPosition: '70% center' }}
      />

      {/* Hero Section (z-index: 1) */}
      <section
        id="hero"
        aria-label="Mainframe Hero"
        className="relative z-[1] w-full h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {/* Content Container (max-w-xl, relative z-10) */}
        <div className="max-w-xl relative z-10">
          {/* 1. Blurred intro label */}
          <div
            className="pointer-events-none select-none mb-5 sm:mb-6 text-white"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              filter: 'blur(4px)',
            }}
          >
            Hey there, meet A.R.I.A,
            <br />
            Mainframe's Adaptive Response Interface Agent
          </div>

          {/* 2. Typewriter text */}
          <p
            className="text-white mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: '54px',
            }}
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px]"
                style={{ animation: 'blink 1s step-end infinite' }}
                aria-hidden="true"
              />
            )}
          </p>

          {/* 3. Action pill buttons (fade-in + slide-up 400ms after page load) */}
          <div
            className="flex flex-wrap gap-y-1 transition-all duration-400 ease-out"
            style={{
              opacity: buttonsVisible ? 1 : 0,
              transform: buttonsVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {/* 4 white pill buttons */}
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Pitch us an idea
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Come work here
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Send a brief hello
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('process')}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              See how we operate
            </button>

            {/* 1 outline pill button (copies email to clipboard) */}
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="text-white bg-transparent border border-white rounded-full inline-flex items-center justify-center text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] gap-2 sm:gap-3 whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer group"
            >
              <span>
                Reach us:{' '}
                <span className="underline underline-offset-1">
                  {copied ? 'Copied to clipboard!' : 'hello@mainframe.co'}
                </span>
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>

          {/* Website KPIs (added per requirement: "add my website kpi like heading menu or more") */}
          <div
            className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/10 transition-all duration-500"
            style={{
              opacity: buttonsVisible ? 1 : 0,
              transform: buttonsVisible ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
            }}
          >
            {[
              '6 Active Certifications',
              '350M+ Records/Day',
              '99.9% Pipeline SLA',
              'Fortune 500 Trusted',
            ].map((kpi) => (
              <span
                key={kpi}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white/80 bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <span className="text-[10px] text-white">✦</span>
                {kpi}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
