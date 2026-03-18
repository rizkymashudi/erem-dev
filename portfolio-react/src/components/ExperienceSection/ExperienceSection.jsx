import { useRef, useEffect, useCallback } from 'react';
import styles from './ExperienceSection.module.css';
import useScrollProgress from '../../hooks/useScrollProgress';
import { CHAPTERS } from '../../data/experience';

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const yearRef = useRef(null);
  const progressFillRef = useRef(null);
  const nodesContainerRef = useRef(null);
  const chapterRefs = useRef([]);
  const roleRefs = useRef([]);
  const yearAnimRef = useRef({ current: CHAPTERS[CHAPTERS.length - 1].year, frame: null });
  const roleTypedRef = useRef(new Array(CHAPTERS.length).fill(false));
  const nodesCreatedRef = useRef(false);

  const progress = useScrollProgress(sectionRef);

  const setChapterRef = useCallback((el, i) => {
    chapterRefs.current[i] = el;
  }, []);

  const setRoleRef = useCallback((el, i) => {
    roleRefs.current[i] = el;
  }, []);

  // Create progress nodes once
  useEffect(() => {
    const container = nodesContainerRef.current;
    if (!container || nodesCreatedRef.current) return;
    nodesCreatedRef.current = true;

    CHAPTERS.forEach((_, i) => {
      const node = document.createElement('div');
      node.className = styles.expNode;
      node.style.top = (i / (CHAPTERS.length - 1) * 100) + '%';
      container.appendChild(node);
    });
  }, []);

  // Role typing function
  const typeRole = useCallback((index) => {
    if (roleTypedRef.current[index]) return;
    roleTypedRef.current[index] = true;

    const el = roleRefs.current[index];
    if (!el) return;
    const text = CHAPTERS[index].role;
    el.textContent = '';

    let charIdx = 0;
    const cursor = document.createElement('span');
    cursor.style.cssText = 'display:inline-block;width:2px;height:0.9em;background:var(--accent-orange);vertical-align:middle;margin-left:4px;animation:blink 1s step-end infinite;';
    el.appendChild(cursor);

    function typeChar() {
      if (charIdx < text.length) {
        cursor.before(text[charIdx]);
        charIdx++;
        const delay = text[charIdx - 1] === ' ' ? 25 : 40 + Math.random() * 20;
        setTimeout(typeChar, delay);
      } else {
        setTimeout(() => cursor.remove(), 1500);
      }
    }
    typeChar();
  }, []);

  // Animated year counter
  const animateYear = useCallback((target) => {
    const state = yearAnimRef.current;
    const yearEl = yearRef.current;
    if (!yearEl || state.current === target) return;

    const start = state.current;
    const diff = target - start;
    const duration = 600;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(start + diff * eased);
      yearEl.textContent = current;
      state.current = current;
      if (p < 1) {
        state.frame = requestAnimationFrame(step);
      }
    }

    if (state.frame) cancelAnimationFrame(state.frame);
    state.frame = requestAnimationFrame(step);
  }, []);

  // Scroll-driven animations
  useEffect(() => {
    const headline = headlineRef.current;
    const yearEl = yearRef.current;
    const progressFill = progressFillRef.current;
    const nodesContainer = nodesContainerRef.current;
    const chapters = chapterRefs.current;
    const totalChapters = CHAPTERS.length;

    if (!headline || !yearEl || !progressFill) return;

    // Headline: 0-12% in, 12-20% out
    if (progress < 0.20) {
      const headIn = Math.min(progress / 0.12, 1);
      const headOut = progress > 0.12 ? (progress - 0.12) / 0.08 : 0;
      const opacity = headIn * (1 - headOut);
      const scale = 0.85 + headIn * 0.15;
      headline.style.opacity = Math.max(opacity, 0);
      headline.style.transform = `scale(${Math.min(scale, 1)})`;
    } else {
      headline.style.opacity = 0;
    }

    // Progress bar
    const barStart = 0.15;
    const barEnd = 0.90;
    const barProgress = Math.max(0, Math.min((progress - barStart) / (barEnd - barStart), 1));
    progressFill.style.height = (barProgress * 100) + '%';

    // Chapters: 15-90%
    const chapterStart = 0.15;
    const chapterEnd = 0.90;
    const chapterRange = chapterEnd - chapterStart;
    const slicePerChapter = chapterRange / totalChapters;

    let activeIndex = -1;
    if (progress >= chapterStart) {
      activeIndex = Math.min(
        Math.floor((progress - chapterStart) / slicePerChapter),
        totalChapters - 1
      );
    }

    // Year counter
    if (activeIndex >= 0) {
      animateYear(CHAPTERS[activeIndex].year);
      const chapterLocalP = ((progress - chapterStart) - activeIndex * slicePerChapter) / slicePerChapter;
      const yearParallax = chapterLocalP * -20;
      yearEl.style.transform = `translateY(${yearParallax}px)`;
      yearEl.style.opacity = 0.15;
    } else {
      yearEl.style.opacity = 0;
    }

    // Update chapters
    chapters.forEach((ch, i) => {
      if (!ch) return;
      const myStart = chapterStart + i * slicePerChapter;
      const chP = (progress - myStart) / slicePerChapter;

      if (i === activeIndex) {
        const enterP = Math.min(chP / 0.3, 1);
        const eased = 1 - Math.pow(1 - enterP, 3);
        ch.style.opacity = eased;
        ch.style.transform = `translateY(${(1 - eased) * 40}px)`;
        ch.classList.add(styles.active);
        if (enterP > 0.3) typeRole(i);
      } else if (i < activeIndex) {
        ch.style.opacity = 0;
        ch.style.transform = 'translateY(-30px)';
        ch.classList.remove(styles.active);
      } else {
        ch.style.opacity = 0;
        ch.style.transform = 'translateY(40px)';
        ch.classList.remove(styles.active);
      }
    });

    // Update nodes
    if (nodesContainer) {
      const nodes = nodesContainer.querySelectorAll(`.${styles.expNode}`);
      nodes.forEach((node, i) => {
        if (i < activeIndex) {
          node.className = `${styles.expNode} ${styles.passed}`;
        } else if (i === activeIndex) {
          node.className = `${styles.expNode} ${styles.activeNode}`;
        } else {
          node.className = styles.expNode;
        }
      });
    }
  }, [progress, animateYear, typeRole]);

  return (
    <section className={styles.expPinned} id="experience" ref={sectionRef}>
      <div className={styles.expSticky}>
        <div className={styles.expProgress}>
          <div className={styles.expProgressFill} ref={progressFillRef} />
          <div className={styles.expProgressNodes} ref={nodesContainerRef} />
        </div>

        <div className={styles.expHeadline} ref={headlineRef}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>(03)</span>
            <span className={styles.sectionTitle}>Experience</span>
            <span className={styles.sectionAst}>*</span>
          </div>
        </div>

        <div className={styles.expYear} ref={yearRef}>2019</div>

        <div className={styles.expChapters}>
          {CHAPTERS.map((chapter, i) => (
            <div key={i} className={styles.expChapter} ref={(el) => setChapterRef(el, i)} data-year={chapter.year}>
              <div className={styles.expChapterDate}>{chapter.date}</div>
              <div className={styles.expChapterRole} ref={(el) => setRoleRef(el, i)}>{chapter.role}</div>
              <div className={styles.expChapterCompany}>{chapter.company}</div>
              <div className={styles.expChapterLocation}>{chapter.location}</div>
              <div className={styles.expChapterDesc}>{chapter.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
