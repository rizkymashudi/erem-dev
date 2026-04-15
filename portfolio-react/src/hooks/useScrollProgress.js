import { useEffect, useRef, useCallback } from 'react';

/**
 * Returns a stable ref whose `.current` is always the latest 0-1 progress,
 * plus calls an optional `onProgress` callback every frame — all without
 * triggering React re-renders.
 *
 * Layout values (offsetTop, offsetHeight) are cached and only recalculated
 * on window resize, eliminating per-frame layout thrashing.
 *
 * @param {React.RefObject} sectionRef - ref to the pinned container element
 * @param {(progress: number) => void} [onProgress] - called every rAF with the latest progress
 * @returns {React.RefObject<number>} progressRef (.current = 0-1)
 */
export default function useScrollProgress(sectionRef, onProgress) {
  const progressRef = useRef(0);
  const rafRef = useRef(null);
  const layoutRef = useRef({ top: 0, totalScroll: 0, valid: false });

  const measureLayout = useCallback(() => {
    const el = sectionRef?.current;
    if (!el) {
      layoutRef.current.valid = false;
      return;
    }
    const vh = window.innerHeight;
    const totalScroll = el.offsetHeight - vh;
    layoutRef.current.top = el.offsetTop;
    layoutRef.current.totalScroll = totalScroll;
    layoutRef.current.valid = totalScroll > 0;
  }, [sectionRef]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Initial measurement
    measureLayout();

    // Re-measure on resize
    const onResize = () => measureLayout();
    window.addEventListener('resize', onResize, { passive: true });

    function update() {
      const layout = layoutRef.current;
      if (!layout.valid) {
        measureLayout();
        rafRef.current = requestAnimationFrame(update);
        return;
      }

      const scrollIntoPin = window.scrollY - layout.top;
      const p = Math.max(0, Math.min(scrollIntoPin / layout.totalScroll, 1));
      progressRef.current = p;

      if (onProgress) onProgress(p);

      rafRef.current = requestAnimationFrame(update);
    }

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [measureLayout, onProgress]);

  return progressRef;
}
