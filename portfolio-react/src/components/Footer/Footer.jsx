import { useRef, useEffect } from 'react';
import styles from './Footer.module.css';
import Sticker from '../Sticker/Sticker';

export default function Footer() {
  const revealRef = useRef(null);

  // Footer reveal entrance via IntersectionObserver
  useEffect(() => {
    const reveal = revealRef.current;
    if (!reveal) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      reveal.classList.add(styles.visible);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(reveal);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.footerSection} id="contact">
      <Sticker
        src="/assets/stickers/apple.png"
        className={`${styles.stickerFooterApple} ${styles.stickerFloatSlow}`}
      />
      <div className={styles.reveal} ref={revealRef}>
        <div className={styles.footerCta}>got a project in mind?</div>
        <a href="mailto:rizkymashudi7@gmail.com" className={styles.footerEmail}>
          rizkymashudi7@gmail.com
        </a>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerSig}>
          RM<span className={styles.accent}>_</span> /26
        </div>
        <div className={styles.footerSocials}>
          <a href="https://www.linkedin.com/in/rizky-mashudi" target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a href="https://github.com/rizkymashudi" target="_blank" rel="noopener">
            GitHub
          </a>
          <a href="https://medium.com/@ikyrm" target="_blank" rel="noopener">
            Medium
          </a>
        </div>
      </div>
    </section>
  );
}
