import { useRef, useEffect, useCallback } from 'react';
import styles from './AboutSection.module.css';
import Sticker from '../Sticker/Sticker';
import useScrollProgress from '../../hooks/useScrollProgress';
import { BIO_PHRASES, LINK_CARDS } from '../../data/about';

const COLOR_CLASS = {
  cyan: 'aboutLinkCyan',
  primary: 'aboutLinkPrimary',
  yellow: 'aboutLinkYellow',
  orange: 'aboutLinkOrange',
};

function renderPhrase(segments) {
  return segments.map((seg, i) =>
    seg.highlight ? (
      <span key={i} className={styles.highlight}>{seg.text}</span>
    ) : (
      <span key={i}>{seg.text}</span>
    )
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const splitRef = useRef(null);
  const stickerMemojiRef = useRef(null);
  const phraseRefs = useRef([]);
  const linkRefs = useRef([]);
  const glowTriggeredRef = useRef(new Set());

  const progress = useScrollProgress(sectionRef);

  const setPhraseRef = useCallback((el, i) => {
    phraseRefs.current[i] = el;
  }, []);

  const setLinkRef = useCallback((el, i) => {
    linkRefs.current[i] = el;
  }, []);

  // Scroll-driven animations
  useEffect(() => {
    const headline = headlineRef.current;
    const split = splitRef.current;
    const phrases = phraseRefs.current;
    const links = linkRefs.current;
    const totalPhrases = BIO_PHRASES.length;
    const totalLinks = LINK_CARDS.length;

    if (!headline || !split) return;

    // ── Memoji sticker pop-in / pop-out ──
    const memojiParent = stickerMemojiRef.current;
    if (memojiParent) {
      if (progress > 0.07 && progress < 0.20) {
        memojiParent.classList.add('popped-in');
        memojiParent.classList.remove('popped-out');
      } else if (progress >= 0.20) {
        memojiParent.classList.remove('popped-in');
        memojiParent.classList.add('popped-out');
      } else {
        memojiParent.classList.remove('popped-in', 'popped-out');
      }
    }

    // ── Headline ──
    if (progress < 0.20) {
      const headIn = Math.min(progress / 0.12, 1);
      const headOut = progress > 0.10 ? (progress - 0.10) / 0.10 : 0;
      const opacity = headIn * (1 - headOut);
      const scale = 0.85 + headIn * 0.15;
      headline.style.opacity = Math.max(opacity, 0);
      headline.style.transform = `scale(${Math.min(scale, 1)})`;
    } else {
      headline.style.opacity = 0;
    }

    // ── Split layout container ──
    const isMobile = window.innerWidth <= 768;

    if (progress > 0.18) {
      const splitIn = Math.min((progress - 0.18) / 0.04, 1);
      split.style.opacity = splitIn;

      if (isMobile && progress > 0.25) {
        const contentScrollP = Math.max(0, (progress - 0.25) / 0.65);
        const splitHeight = split.scrollHeight;
        const vh = window.innerHeight;
        const maxScroll = Math.max(splitHeight - vh + 140, 0);
        split.style.transform = `translateY(${-contentScrollP * maxScroll}px)`;
      } else {
        split.style.transform = '';
      }
    } else {
      split.style.opacity = 0;
      split.style.transform = '';
    }

    // ── Bio phrases — sequential fade up ──
    const phraseStart = 0.20;
    const phraseEnd = 0.60;
    const phraseRange = phraseEnd - phraseStart;
    const slicePerPhrase = phraseRange / totalPhrases;

    phrases.forEach((phrase, i) => {
      if (!phrase) return;
      const myStart = phraseStart + i * slicePerPhrase;
      const phraseP = Math.max(0, Math.min((progress - myStart) / (slicePerPhrase * 0.6), 1));

      if (phraseP > 0) {
        phrase.classList.add(styles.visible);
      } else {
        phrase.classList.remove(styles.visible);
      }
    });

    // ── Highlight glow pulse ──
    phrases.forEach((phrase, i) => {
      if (!phrase) return;
      if (phrase.classList.contains(styles.visible)) {
        const highlights = phrase.querySelectorAll(`.${styles.highlight}`);
        highlights.forEach((hl) => {
          const key = `${i}-${hl.textContent}`;
          if (!glowTriggeredRef.current.has(key)) {
            glowTriggeredRef.current.add(key);
            setTimeout(() => {
              hl.classList.add(styles.glow);
              setTimeout(() => hl.classList.remove(styles.glow), 1200);
            }, 300);
          }
        });
      }
    });

    // ── Link cards cascade from right ──
    const linkStart = 0.55;
    const linkEnd = 0.80;
    const linkRange = linkEnd - linkStart;
    const slicePerLink = linkRange / totalLinks;

    links.forEach((link, i) => {
      if (!link) return;
      const myStart = linkStart + i * slicePerLink;
      const linkP = Math.max(0, Math.min((progress - myStart) / (slicePerLink * 0.7), 1));

      if (linkP > 0.1) {
        link.classList.add(styles.visible);
      } else {
        link.classList.remove(styles.visible);
      }
    });
  }, [progress]);

  return (
    <section className={styles.aboutPinned} id="about" ref={sectionRef}>
      <div className={styles.aboutSticky}>
        {/* Headline */}
        <div className={styles.aboutHeadline} ref={headlineRef}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>(04)</span>
            <span className={styles.sectionTitle}>About</span>
            <span className={styles.sectionAst}>*</span>
          </div>
          <div ref={stickerMemojiRef}>
            <Sticker
              src="/assets/stickers/memoji-laptop.png"
              className={`${styles.stickerAboutMemoji} ${styles.stickerScrollPop}`}
            />
          </div>
        </div>

        {/* Split content */}
        <div className={styles.aboutSplit} ref={splitRef}>
          {/* Bio phrases */}
          <div className={styles.aboutBio}>
            {BIO_PHRASES.map((phrase, i) => (
              <div key={i} className={styles.aboutPhrase} ref={(el) => setPhraseRef(el, i)}>
                {renderPhrase(phrase.segments)}
              </div>
            ))}
          </div>

          {/* Link cards */}
          <div className={styles.aboutLinksWrap}>
            {LINK_CARDS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={`${styles.aboutLink} ${styles[COLOR_CLASS[link.color]]}`}
                ref={(el) => setLinkRef(el, i)}
                {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
              >
                {link.label}
                <span className={styles.aboutLinkArrow}>&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
