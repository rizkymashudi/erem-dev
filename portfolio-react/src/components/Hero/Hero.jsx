import { useRef, useEffect, useCallback } from 'react';
import styles from './Hero.module.css';
import Sticker from '../Sticker/Sticker';

const SPEEDS = [0.15, 0.3, 0.5, 0.7];
const SCATTER_DIRECTIONS = [
  { x: -20, y: -60 },
  { x: 0, y: -30 },
  { x: 15, y: 40 },
  { x: -10, y: 70 },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const tiltRef = useRef(null);
  const layerRefs = useRef([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const tiltState = useRef({ x: 0, y: 0 });

  const setLayerRef = useCallback((el, i) => {
    layerRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const hero = sectionRef.current;
    const tiltContainer = tiltRef.current;
    const layers = layerRefs.current;
    if (!hero || !tiltContainer) return;

    // Mouse tracking
    const onMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
    };
    const onMouseLeave = () => {
      mouseRef.current.x = 0.5;
      mouseRef.current.y = 0.5;
    };
    const onTouchMove = (e) => {
      const touch = e.touches[0];
      const rect = hero.getBoundingClientRect();
      mouseRef.current.x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
      mouseRef.current.y = Math.max(0, Math.min(1, (touch.clientY - rect.top) / rect.height));
    };
    const onTouchEnd = () => {
      mouseRef.current.x = 0.5;
      mouseRef.current.y = 0.5;
    };
    const onDeviceOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        mouseRef.current.x = Math.max(0, Math.min(1, 0.5 + (e.gamma / 90) * 0.5));
        mouseRef.current.y = Math.max(0, Math.min(1, 0.5 + ((e.beta - 45) / 90) * 0.5));
      }
    };

    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseleave', onMouseLeave);
    hero.addEventListener('touchmove', onTouchMove, { passive: true });
    hero.addEventListener('touchend', onTouchEnd);
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
    }

    let rafId;

    function loop() {
      const scrollY = window.scrollY;
      const heroH = hero.offsetHeight;
      const progress = Math.min(scrollY / heroH, 1);

      // Tilt
      const isMobile = window.innerWidth <= 768;
      const tiltAmount = isMobile ? 1.5 : 2.5;
      const targetTiltX = (mouseRef.current.y - 0.5) * -tiltAmount;
      const targetTiltY = (mouseRef.current.x - 0.5) * tiltAmount;
      tiltState.current.x += (targetTiltX - tiltState.current.x) * 0.08;
      tiltState.current.y += (targetTiltY - tiltState.current.y) * 0.08;

      const tiltFade = 1 - progress;
      tiltContainer.style.transform = `rotateX(${tiltState.current.x * tiltFade}deg) rotateY(${tiltState.current.y * tiltFade}deg)`;

      // Per-layer parallax + scatter
      const parallaxScale = isMobile ? 0.2 : 0.4;
      const scatterScale = isMobile ? 0.5 : 1;

      layers.forEach((layer, i) => {
        if (!layer) return;
        const speed = SPEEDS[i] || 0.3;

        if (progress < 0.6) {
          const parallaxY = scrollY * speed * -parallaxScale;
          const layerOpacity = 1 - progress * (0.5 + speed * 0.8);
          layer.style.transform = `translateY(${parallaxY}px)`;
          layer.style.opacity = Math.max(layerOpacity, 0);
          layer.style.filter = '';
        } else {
          const scatterP = (progress - 0.6) / 0.4;
          const eased = scatterP * scatterP;
          const dir = SCATTER_DIRECTIONS[i] || { x: 0, y: 40 };
          const scatterX = dir.x * scatterScale * eased;
          const scatterY = dir.y * scatterScale * eased;
          const parallaxY = scrollY * speed * -parallaxScale;
          const layerOpacity = Math.max(1 - progress * 1.2, 0);
          const blur = eased * (isMobile ? 2 : 4);

          layer.style.transform = `translateY(${parallaxY + scatterY}px) translateX(${scatterX}px)`;
          layer.style.opacity = Math.max(layerOpacity, 0);
          layer.style.filter = blur > 0.5 ? `blur(${blur}px)` : '';
        }
      });

      // Overall hero opacity
      hero.style.opacity = Math.max(1 - progress * 0.9, 0);

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      hero.removeEventListener('mousemove', onMouseMove);
      hero.removeEventListener('mouseleave', onMouseLeave);
      hero.removeEventListener('touchmove', onTouchMove);
      hero.removeEventListener('touchend', onTouchEnd);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', onDeviceOrientation);
      }
    };
  }, []);

  return (
    <section className={styles.hero} id="heroSection" ref={sectionRef}>
      <div className={styles.heroTilt} ref={tiltRef}>
        <div className={styles.heroLayer} ref={(el) => setLayerRef(el, 0)}>
          <div className={styles.heroLabel}>(00) — intro</div>
        </div>
        <div className={styles.heroLayer} ref={(el) => setLayerRef(el, 1)}>
          <h1 className={styles.heroTitle} id="heroTitle">
            <span className={styles.cursorBlink} id="typingCursor" />
          </h1>
        </div>
        <div className={styles.heroLayer} ref={(el) => setLayerRef(el, 2)}>
          <p className={styles.heroSub}>
            4+ years building production iOS apps at scale. Apple Developer Academy graduate. Currently leveling up at Essential Developer Academy, London.
          </p>
        </div>
        <div className={styles.heroLayer} ref={(el) => setLayerRef(el, 3)}>
          <div className={styles.heroCta}>
            <a href="#work" className={`${styles.btn} ${styles.btnPrimary}`}>
              view work &darr;
            </a>
            <a href="#contact" className={styles.btn}>
              get in touch
            </a>
          </div>
        </div>
      </div>
      <Sticker
        src="/assets/stickers/hello.png"
        className={`${styles.stickerHeroHello} ${styles.stickerFloat}`}
      />
      <div className={styles.heroFadeOverlay} />
    </section>
  );
}
