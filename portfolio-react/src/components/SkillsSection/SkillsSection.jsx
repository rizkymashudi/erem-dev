import { useRef } from 'react';
import styles from './SkillsSection.module.css';
import Sticker from '../Sticker/Sticker';

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
  const stackRef = useRef(null);

  return (
    <section className={styles.skillsPinned} id="skills" ref={sectionRef}>
      <div className={styles.skillsSticky}>
        <Sticker
          src="/assets/stickers/swiftui.png"
          className={`${styles.stickerSwiftui} ${styles.stickerScrollPop}`}
        />
        <Sticker
          src="/assets/stickers/photos.png"
          className={`${styles.stickerPhotos} ${styles.stickerScrollPop}`}
        />
        <div className={styles.skillsStack} ref={stackRef} id="skillsStack">
          {SKILLS.map((skill, i) => (
            <div
              key={i}
              className={styles.skillCard}
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
