import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — attaches IntersectionObserver to reveal elements with .reveal class.
 * Call inside any component. Pass a containerRef to scope to that section.
 */
export function useScrollReveal(containerRef) {
  useEffect(() => {
    const root = containerRef?.current ?? document;
    const targets = root.querySelectorAll ? root.querySelectorAll('.reveal') : document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef]);
}

/**
 * useCountUp — animates a number from 0 to target when element is visible.
 */
export function useCountUp(target, duration = 1800, suffix = '') {
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          observer.unobserve(el);

          // Parse target: strip non-numeric for animation, keep suffix
          const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
          const prefix = target.match(/^[^0-9]*/)?.[0] ?? '';
          const suf = target.replace(/[0-9.,]/g, '').replace(prefix, '') + suffix;
          const isDecimal = target.includes('.');
          const decimals = isDecimal ? (target.split('.')[1]?.length ?? 0) : 0;

          const startTime = performance.now();

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericTarget * eased;
            el.textContent = prefix + (decimals ? current.toFixed(decimals) : Math.floor(current).toLocaleString()) + suf;
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, suffix]);

  return ref;
}
