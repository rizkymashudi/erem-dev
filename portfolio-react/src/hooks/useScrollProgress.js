import { useEffect, useRef } from 'react';

/**
 * Drives a 0-1 progress value for a pinned section WITHOUT React state.
 *
 * A single requestAnimationFrame loop computes progress and invokes the
 * `onProgress(p)` callback imperatively, so scroll-driven animations mutate the
 * DOM directly. This avoids a per-frame setState — which would re-render the
 * whole section subtree (and all its children) on every frame and cause the
 * scroll/animation stutter.
 *
 * @param {React.RefObject} sectionRef - ref to the pinned container element
 * @param {(progress:number)=>void} onProgress - called with progress 0-1 whenever it changes
 */
export default function useScrollProgress(sectionRef, onProgress) {
  // Keep the latest callback in a ref so the rAF loop never restarts on re-render.
  const cbRef = useRef(onProgress);
  cbRef.current = onProgress;

  useEffect(() => {
    let rafId = null;
    let lastP = -1;

    const compute = () => {
      const node = sectionRef?.current;
      if (!node) return;
      const totalScroll = node.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const p = Math.max(0, Math.min((window.scrollY - node.offsetTop) / totalScroll, 1));
      if (p !== lastP) {
        lastP = p;
        cbRef.current?.(p);
      }
    };

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Settle to the current scroll position once; no continuous loop.
      compute();
      return undefined;
    }

    const loop = () => {
      compute();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [sectionRef]);
}
