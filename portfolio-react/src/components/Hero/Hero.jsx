import { useRef } from 'react';
import styles from './Hero.module.css';
import Sticker from '../Sticker/Sticker';

export default function Hero() {
  const sectionRef = useRef(null);
  const tiltRef = useRef(null);

  return (
    <section className={styles.hero} id="heroSection" ref={sectionRef}>
      <div className={styles.heroTilt} ref={tiltRef}>
        <div className={styles.heroLayer} data-speed="0.15">
          <div className={styles.heroLabel}>(00) — intro</div>
        </div>
        <div className={styles.heroLayer} data-speed="0.3">
          <h1 className={styles.heroTitle} id="heroTitle">
            <span className={styles.cursorBlink} id="typingCursor" />
          </h1>
        </div>
        <div className={styles.heroLayer} data-speed="0.5">
          <p className={styles.heroSub}>
            4+ years building production iOS apps at scale. Apple Developer Academy graduate. Currently leveling up at Essential Developer Academy, London.
          </p>
        </div>
        <div className={styles.heroLayer} data-speed="0.7">
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
