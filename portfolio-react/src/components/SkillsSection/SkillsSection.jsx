import { useRef, useEffect, useCallback } from 'react';
import styles from './SkillsSection.module.css';
import Sticker from '../Sticker/Sticker';
import useScrollProgress from '../../hooks/useScrollProgress';

const SKILLS = [
  { num: '(02.01)', name: 'iOS development', desc: 'Swift, SwiftUI, UIKit. Building production apps with clean architecture, SOLID principles, and test-driven development.', from: 'left', tilt: -3 },
  { num: '(02.02)', name: 'Systems design', desc: 'Domain-driven development, scalable mobile patterns, use case analysis. Architecture that grows with the product.', from: 'right', tilt: 2.5 },
  { num: '(02.03)', name: 'Wearable & companion', desc: 'watchOS, HealthKit, cross-device experiences. Extending the iOS ecosystem to the wrist.', from: 'left', tilt: -1.5 },
  { num: '(02.04)', name: 'Engineering culture', desc: 'Code review, CI/CD pipelines, pair programming. Building software the right way, together.', from: 'right', tilt: 3 },
  { num: '(02.05)', name: 'API & backend', desc: 'RESTful API integration, Laravel background. Understanding both sides of the request.', from: 'left', tilt: -2 },
  { num: '(02.06)', name: 'Writing & sharing', desc: 'Technical writing on Medium @ikyrm. Breaking down complex concepts for the community.', from: 'right', tilt: 1.5 },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const stickerSwiftUIRef = useRef(null);
  const stickerPhotosRef = useRef(null);

  const progress = useScrollProgress(sectionRef);

  const setCardRef = useCallback((el, i) => {
    cardRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const cards = cardRefs.current;
    const totalCards = cards.length;
    const isMobile = window.innerWidth <= 768;

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
  }, [progress]);

  return (
    <section className={styles.skillsPinned} id="skills" ref={sectionRef}>
      <div className={styles.skillsSticky}>
        <div ref={stickerSwiftUIRef}>
          <Sticker src="/assets/stickers/swiftui.png" className={`${styles.stickerSwiftui} ${styles.stickerScrollPop}`} />
        </div>
        <div ref={stickerPhotosRef}>
          <Sticker src="/assets/stickers/photos.png" className={`${styles.stickerPhotos} ${styles.stickerScrollPop}`} />
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
