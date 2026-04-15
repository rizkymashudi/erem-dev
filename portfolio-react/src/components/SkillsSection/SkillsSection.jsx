import { useRef, useEffect, useCallback } from 'react';
import styles from './SkillsSection.module.css';
import Sticker from '../Sticker/Sticker';
import useScrollProgress from '../../hooks/useScrollProgress';
import { SKILLS } from '../../data/skills';

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const stickerSwiftUIRef = useRef(null);
  const stickerPhotosRef = useRef(null);
  const isMobileRef = useRef(window.innerWidth <= 768);

  const setCardRef = useCallback((el, i) => {
    cardRefs.current[i] = el;
  }, []);

  const onProgress = useCallback((progress) => {
    const cards = cardRefs.current;
    const totalCards = cards.length;
    const isMobile = isMobileRef.current;

    // Sticker pops
    const swiftUIParent = stickerSwiftUIRef.current;
    const photosParent = stickerPhotosRef.current;

    if (swiftUIParent) {
      if (progress > 0.15) {
        swiftUIParent.classList.add('popped-in');
      } else {
        swiftUIParent.classList.remove('popped-in');
      }
    }
    if (photosParent) {
      if (progress > 0.35) {
        photosParent.classList.add('popped-in');
      } else {
        photosParent.classList.remove('popped-in');
      }
    }

    // Cards stack 0-85%
    const cardStart = 0.0;
    const cardEnd = 0.85;
    const cardRange = cardEnd - cardStart;
    const slicePerCard = cardRange / totalCards;

    cards.forEach((card, i) => {
      if (!card) return;
      const myStart = cardStart + i * slicePerCard;
      const myEnd = myStart + slicePerCard;
      const cardP = Math.max(0, Math.min((progress - myStart) / (myEnd - myStart), 1));
      const eased = 1 - Math.pow(1 - cardP, 3);

      const fromLeft = SKILLS[i].from === 'left';
      const tilt = SKILLS[i].tilt;
      const slideDistance = isMobile ? 150 : 300;
      const tiltScale = isMobile ? 0.6 : 1;
      const startX = fromLeft ? -slideDistance : slideDistance;
      const currentX = startX * (1 - eased);
      const currentRotate = tilt * tiltScale * eased;
      const stackOffset = i * (isMobile ? 3 : 4);

      card.style.zIndex = i + 1;
      card.style.transform = `translateX(${currentX}px) translateY(${stackOffset}px) rotate(${currentRotate}deg)`;
      card.style.opacity = eased;

      if (cardP >= 1) {
        const shadowDepth = 4 + i * 3;
        card.style.boxShadow = `0 ${shadowDepth}px ${shadowDepth * 2}px var(--glass-shadow), 0 0 0 0.5px var(--glass-border-inner) inset, 0 1px 0 var(--glass-highlight) inset`;
      }
    });
  }, []);

  // Listen for resize to update mobile flag
  useEffect(() => {
    const onResize = () => { isMobileRef.current = window.innerWidth <= 768; };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useScrollProgress(sectionRef, onProgress);

  return (
    <section className={styles.skillsPinned} id="skills" ref={sectionRef}>
      <div className={styles.skillsSticky}>
        <div ref={stickerSwiftUIRef}>
          <Sticker src="/assets/stickers/swiftui.webp" alt="" className={`${styles.stickerSwiftui} ${styles.stickerScrollPop}`} />
        </div>
        <div ref={stickerPhotosRef}>
          <Sticker src="/assets/stickers/photos.webp" alt="" className={`${styles.stickerPhotos} ${styles.stickerScrollPop}`} />
        </div>
        <div className={styles.skillsStack}>
          {SKILLS.map((skill, i) => (
            <div
              key={i}
              className={styles.skillCard}
              ref={(el) => setCardRef(el, i)}
              data-from={skill.from}
              data-tilt={skill.tilt}
            >
              <div className={styles.skillNum}>{skill.num}</div>
              <div className={styles.skillName}>{skill.name}</div>
              <div className={styles.skillDesc}>{skill.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
