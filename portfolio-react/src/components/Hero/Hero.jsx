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

const SEGMENTS = [
  { text: 'iOS engineer ', icon: 'swift' },
  { text: 'crafting scalable mobile experiences ', icon: 'ui' },
  { text: 'with a focus on clean architecture ', icon: 'code' },
  { text: 'and thoughtful interfaces', icon: null },
];

const ICON_CLASS_MAP = {
  swift: 'iconSwift',
  ui: 'iconUi',
  code: 'iconCode',
};

export default function Hero() {
  const sectionRef = useRef(null);
  const tiltRef = useRef(null);
  const layerRefs = useRef([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const tiltState = useRef({ x: 0, y: 0 });
  const titleRef = useRef(null);
  const cursorRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  const setLayerRef = useCallback((el, i) => {
    layerRefs.current[i] = el;
  }, []);

  // Hero typing animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroTitle = titleRef.current;
    const cursor = cursorRef.current;
    const heroSub = subRef.current;
    const heroCta = ctaRef.current;

    if (!heroTitle || !cursor) return;

    function createIcon(type) {
      const span = document.createElement('span');
      span.className = `${styles.iconSlot} ${styles[ICON_CLASS_MAP[type]] || ''}`;
      span.style.opacity = '0';
      span.style.transform = 'scale(0.5)';
      span.style.transition = 'opacity 0.4s var(--ease-out-expo), transform 0.4s var(--ease-out-expo)';
      return span;
    }

    function popIcon(iconEl) {
      requestAnimationFrame(() => {
        iconEl.style.opacity = '1';
        iconEl.style.transform = 'scale(1)';
      });
    }

    function showAfterTyping() {
      setTimeout(() => {
        if (heroSub) heroSub.classList.add(styles.visible);
      }, 200);
      setTimeout(() => {
        if (heroCta) heroCta.classList.add(styles.visible);
      }, 500);
    }

    // Reduced motion: show everything immediately
    if (prefersReduced) {
      heroTitle.innerHTML = '';
      SEGMENTS.forEach((seg) => {
        heroTitle.appendChild(document.createTextNode(seg.text));
        if (seg.icon) {
          const ic = createIcon(seg.icon);
          ic.style.opacity = '1';
          ic.style.transform = 'scale(1)';
          heroTitle.appendChild(ic);
          heroTitle.appendChild(document.createTextNode(' '));
        }
      });
      heroTitle.appendChild(cursor);
      if (heroSub) heroSub.classList.add(styles.visible);
      if (heroCta) heroCta.classList.add(styles.visible);
      return;
    }

    // Remove cursor from initial position, re-append during typing
    cursor.remove();

    let segIndex = 0;
    let charIndex = 0;
    let currentTextNode = null;
    const baseDelay = 35;

    function typeNext() {
      const seg = SEGMENTS[segIndex];

      if (charIndex < seg.text.length) {
        if (!currentTextNode) {
          currentTextNode = document.createTextNode('');
          heroTitle.appendChild(currentTextNode);
          heroTitle.appendChild(cursor);
        }
        currentTextNode.textContent += seg.text[charIndex];
        charIndex++;

        const ch = seg.text[charIndex - 1];
        const delay = ch === ' ' ? baseDelay * 0.5 : baseDelay + Math.random() * 25;
        setTimeout(typeNext, delay);
      } else {
        if (seg.icon) {
          cursor.remove();
          const iconEl = createIcon(seg.icon);
          heroTitle.appendChild(iconEl);
          heroTitle.appendChild(document.createTextNode(' '));
          heroTitle.appendChild(cursor);

          setTimeout(() => popIcon(iconEl), 80);

          setTimeout(() => {
            segIndex++;
            charIndex = 0;
            currentTextNode = null;
            if (segIndex < SEGMENTS.length) {
              typeNext();
            } else {
              showAfterTyping();
            }
          }, 350);
        } else {
          segIndex++;
          charIndex = 0;
          currentTextNode = null;
          if (segIndex < SEGMENTS.length) {
            typeNext();
          } else {
            showAfterTyping();
          }
        }
      }
    }

    // Start typing after label fadeUp finishes
    const timerId = setTimeout(typeNext, 800);
    return () => clearTimeout(timerId);
  }, []);

  // Parallax + tilt scroll engine
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
          <h1 className={styles.heroTitle} ref={titleRef}>
            <span className={styles.cursorBlink} ref={cursorRef} />
          </h1>
        </div>
        <div className={styles.heroLayer} ref={(el) => setLayerRef(el, 2)}>
          <p className={styles.heroSub} ref={subRef}>
            4+ years building production iOS apps at scale. Apple Developer Academy graduate. Currently leveling up at Essential Developer Academy, London.
          </p>
        </div>
        <div className={styles.heroLayer} ref={(el) => setLayerRef(el, 3)}>
          <div className={styles.heroCta} ref={ctaRef}>
            <a
              href="#work"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              view work &darr;
            </a>
            <a
              href="#contact"
              className={styles.btn}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
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
