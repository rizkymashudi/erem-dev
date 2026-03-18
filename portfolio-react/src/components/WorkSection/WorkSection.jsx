import { useRef, useEffect, useCallback } from 'react';
import styles from './WorkSection.module.css';
import Sticker from '../Sticker/Sticker';
import useScrollProgress from '../../hooks/useScrollProgress';

const PROJECTS = [
  { id: 1, name: 'nbs.co.id — iOS platform', desc: 'Enterprise iOS application developed over 3+ years as lead iOS engineer. Scalable architecture, continuous delivery.', tags: ['Swift', 'Clean Architecture', 'CI/CD', '3+ years'], gradient: 'linear-gradient(135deg, rgba(62,193,201,0.14), rgba(62,193,201,0.04) 50%, rgba(230,90,79,0.08))', rotate: -3 },
  { id: 2, name: 'PerLu — fact verification', desc: "Verify social media text against MAFINDO's database. Copy, paste, get the truth.", tags: ['UIKit', 'API Integration', 'MAFINDO'], gradient: 'linear-gradient(135deg, rgba(230,90,79,0.14), rgba(230,90,79,0.04))', rotate: 2 },
  { id: 3, name: 'Sleeplance — watchOS companion', desc: 'Sleep tracking wearable app, evolved through 3 challenge iterations from MVP to TestFlight release.', tags: ['WatchKit', 'HealthKit', 'TestFlight'], gradient: 'linear-gradient(135deg, rgba(242,201,76,0.14), rgba(242,201,76,0.04))', rotate: -1.5 },
  { id: 4, name: 'Say it! — sentence generator', desc: 'Structured sentence builder from keyword input. Designed for quick, natural expression.', tags: ['Native iOS', 'NLP'], gradient: 'linear-gradient(135deg, rgba(62,193,201,0.14), rgba(62,193,201,0.04))', rotate: 3.5 },
  { id: 5, name: 'Pocket Money — expense tracker', desc: 'Personal finance tracking with CoreData persistence and visual spending breakdowns.', tags: ['CoreData', 'Charts'], gradient: 'linear-gradient(135deg, rgba(230,90,79,0.1), rgba(242,201,76,0.08))', rotate: -2.5, isLast: true },
];

const SUBTITLE_TEXT = 'Projects that made it from concept to production. Real apps, real users.';

function ProjectCard({ project, cardRef }) {
  return (
    <div className={styles.projectCard} data-card-rotate={project.rotate} ref={cardRef}>
      <div className={styles.projectThumb}>
        <div className={styles.projectThumbBg} style={{ background: project.gradient }} />
        <div className={styles.projectPlay} />
      </div>
      <div className={styles.projectInfo}>
        <div className={styles.projectName}>{project.name}</div>
        <div className={styles.projectDesc}>{project.desc}</div>
        <div className={styles.projectTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.projectTag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WorkSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const exitHeadlineRef = useRef(null);
  const stickerSwiftRef = useRef(null);
  const stickerXcodeRef = useRef(null);
  const stickerArkitRef = useRef(null);
  const cardRefs = useRef([]);
  const subtitleState = useRef({ typed: false, done: false });

  const progress = useScrollProgress(sectionRef);

  const setCardRef = useCallback((el, i) => {
    cardRefs.current[i] = el;
  }, []);

  // Subtitle typing effect
  useEffect(() => {
    if (progress > 0.10 && !subtitleState.current.typed) {
      subtitleState.current.typed = true;
      const el = subtitleRef.current;
      if (!el) return;
      el.textContent = '';
      const cursor = document.createElement('span');
      cursor.className = styles.cursorBlink || 'cursor-blink';
      cursor.style.cssText = 'display:inline-block;width:2px;height:0.9em;background:var(--accent-cyan);vertical-align:middle;margin-left:4px;animation:blink 1s step-end infinite;';
      el.appendChild(cursor);

      let i = 0;
      function typeChar() {
        if (i < SUBTITLE_TEXT.length) {
          cursor.before(SUBTITLE_TEXT[i]);
          i++;
          const delay = SUBTITLE_TEXT[i - 1] === ' ' ? 20 : 30 + Math.random() * 15;
          setTimeout(typeChar, delay);
        } else {
          subtitleState.current.done = true;
        }
      }
      typeChar();
    }
  }, [progress]);

  // Scroll-driven animations via rAF (progress drives everything)
  useEffect(() => {
    const headline = headlineRef.current;
    const carousel = carouselRef.current;
    const track = trackRef.current;
    const exitHL = exitHeadlineRef.current;
    const cards = cardRefs.current;
    const swiftEl = stickerSwiftRef.current;
    const xcodeEl = stickerXcodeRef.current;
    const arkitEl = stickerArkitRef.current;

    if (!headline || !track || !carousel) return;

    // Phase 1-2: Headline
    if (progress < 0.25) {
      const headP = Math.min(progress / 0.15, 1);
      const fadeOut = progress > 0.15 ? (progress - 0.15) / 0.1 : 0;
      const opacity = Math.min(headP, 1) * (1 - fadeOut);
      const scale = 0.85 + headP * 0.15;
      headline.style.opacity = Math.max(opacity, 0);
      headline.style.transform = `scale(${Math.min(scale, 1)})`;
    } else {
      headline.style.opacity = 0;
    }

    // Sticker pops
    if (swiftEl) {
      if (progress > 0.05 && progress < 0.18) {
        swiftEl.classList.add('popped-in');
        swiftEl.classList.remove('popped-out');
      } else if (progress >= 0.18) {
        swiftEl.classList.remove('popped-in');
        swiftEl.classList.add('popped-out');
      } else {
        swiftEl.classList.remove('popped-in', 'popped-out');
      }
    }
    if (xcodeEl) {
      if (progress > 0.08 && progress < 0.20) {
        xcodeEl.classList.add('popped-in');
        xcodeEl.classList.remove('popped-out');
      } else if (progress >= 0.20) {
        xcodeEl.classList.remove('popped-in');
        xcodeEl.classList.add('popped-out');
      } else {
        xcodeEl.classList.remove('popped-in', 'popped-out');
      }
    }

    // Phase 3-6: Card Carousel
    if (progress > 0.18) {
      const carouselStart = 0.18;
      const carouselEnd = 0.95;
      const carP = Math.max(0, Math.min((progress - carouselStart) / (carouselEnd - carouselStart), 1));
      const carouselOpacity = Math.min((progress - 0.18) / 0.03, 1);
      carousel.style.opacity = carouselOpacity;

      const viewWidth = window.innerWidth;
      const trackWidth = track.scrollWidth;
      const startOffset = viewWidth - 60;
      const endOffset = -(trackWidth + 400);
      const fullRange = endOffset - startOffset;
      const translateX = startOffset + fullRange * carP;
      track.style.transform = `translateX(${translateX}px)`;

      // Per-card fade
      const fadeZone = Math.min(viewWidth * 0.4, 400);
      cards.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        if (rect.right < 0) {
          card.style.opacity = 0;
        } else if (rect.right < 300) {
          card.style.opacity = Math.max(0, rect.right / 300);
        } else if (rect.left > viewWidth) {
          card.style.opacity = 0;
        } else if (rect.left > viewWidth - fadeZone) {
          card.style.opacity = Math.max(0, Math.min(1 - (rect.left - (viewWidth - fadeZone)) / fadeZone, 1));
        } else {
          card.style.opacity = 1;
        }
      });
    } else {
      carousel.style.opacity = 0;
      cards.forEach((card) => { if (card) card.style.opacity = 0; });
    }

    // Phase 7: Exit headline
    if (exitHL) {
      if (progress > 0.85) {
        const headStart = 0.85;
        const headEnd = 0.97;
        const headP = Math.min((progress - headStart) / (headEnd - headStart), 1);
        const eased = 1 - Math.pow(1 - headP, 3);
        exitHL.style.opacity = eased;
        exitHL.style.transform = `scale(${0.85 + eased * 0.15})`;

        if (arkitEl && progress > 0.90) {
          arkitEl.classList.add('popped-in');
          arkitEl.classList.remove('popped-out');
        }
      } else {
        exitHL.style.opacity = 0;
        exitHL.style.transform = 'scale(0.85)';
        if (arkitEl) {
          arkitEl.classList.remove('popped-in');
        }
      }
    }

    if (progress > 0.18) {
      carousel.style.transform = 'translateY(-50%)';
    }
  }, [progress]);

  const regularCards = PROJECTS.filter((p) => !p.isLast);
  const lastProject = PROJECTS.find((p) => p.isLast);
  let cardIndex = 0;

  return (
    <section className={styles.workPinned} id="work" ref={sectionRef}>
      <div className={styles.workSticky}>
        <div className={styles.workHeadline} ref={headlineRef}>
          <div className={styles.workHeadlineInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNum}>(01)</span>
              <span className={styles.sectionTitle}>Featured work</span>
              <span className={styles.sectionAst}>*</span>
            </div>
            <p className={styles.workSubtitle} ref={subtitleRef} />
          </div>
        </div>

        <div ref={stickerSwiftRef}>
          <Sticker src="/assets/stickers/swift.png" className={`${styles.stickerWorkSwift} ${styles.stickerScrollPop}`} />
        </div>
        <div ref={stickerXcodeRef}>
          <Sticker src="/assets/stickers/xcode.png" className={`${styles.stickerWorkXcode} ${styles.stickerScrollPop}`} />
        </div>

        <div className={styles.workCarousel} ref={carouselRef}>
          <div className={styles.workTrack} ref={trackRef}>
            {regularCards.map((project) => {
              const i = cardIndex++;
              return <ProjectCard key={project.id} project={project} cardRef={(el) => setCardRef(el, i)} />;
            })}
            {lastProject && (
              <div className={styles.projectCardWrap}>
                <Sticker src="/assets/stickers/unicorn.png" className={`${styles.stickerCardUnicorn} ${styles.stickerFloat}`} />
                <ProjectCard project={lastProject} cardRef={(el) => setCardRef(el, cardIndex++)} />
              </div>
            )}
          </div>
        </div>

        <div className={styles.workExitHeadline} ref={exitHeadlineRef}>
          <div className={styles.workHeadlineInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNum}>(02)</span>
              <span className={styles.sectionTitle}>What I do</span>
              <span className={styles.sectionAst}>*</span>
            </div>
          </div>
          <div ref={stickerArkitRef}>
            <Sticker src="/assets/stickers/arkit.png" className={`${styles.stickerSkillsArkit} ${styles.stickerScrollPop}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
