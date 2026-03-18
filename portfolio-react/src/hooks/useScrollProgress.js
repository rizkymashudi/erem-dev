import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Returns 0-1 progress within a pinned section.
 * Uses requestAnimationFrame loop (not scroll events).
 * @param {React.RefObject} sectionRef - ref to the pinned container element
 * @returns {number} progress 0-1
 */
export default function useScrollProgress(sectionRef) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  const update = useCallback(() => {
    const el = sectionRef?.current;
    if (!el) {
      rafRef.current = requestAnimationFrame(update);
      return;
    }

    const pinnedTop = el.offsetTop;
    const vh = window.innerHeight;
    const totalScroll = el.offsetHeight - vh;

    if (totalScroll <= 0) {
      rafRef.current = requestAnimationFrame(update);
      return;
    }

    const scrollIntoPin = window.scrollY - pinnedTop;
    const p = Math.max(0, Math.min(scrollIntoPin / totalScroll, 1));
    setProgress(p);

    rafRef.current = requestAnimationFrame(update);
  }, [sectionRef]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    rafRef.current = requestAnimationFrame(update);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  return progress;
}
