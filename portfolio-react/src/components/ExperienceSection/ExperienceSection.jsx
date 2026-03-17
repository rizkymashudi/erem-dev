import { useRef } from 'react';
import styles from './ExperienceSection.module.css';

const CHAPTERS = [
  { year: 2025, date: 'Nov 2025 — Present', role: 'Student', company: 'Essential Developer Academy by Caio & Mike', location: 'London, UK', desc: 'Advanced iOS engineering: TDD, clean architecture, design patterns, and professional development practices.' },
  { year: 2022, date: 'Jun 2022 — Present', role: 'iOS Engineer', company: 'nbs.co.id', location: 'Jakarta, Indonesia', desc: 'Lead iOS development on enterprise applications. Scalable architecture, continuous integration, and delivering production-grade mobile experiences.' },
  { year: 2022, date: 'Mar 2022 — May 2022', role: 'iOS Developer', company: 'nbs.co.id', location: 'Jakarta, Indonesia', desc: 'Initial role building iOS features and establishing development workflows.' },
  { year: 2021, date: 'Feb 2021 — Dec 2021', role: 'iOS Developer', company: 'Apple Developer Academy', location: 'Batam, Indonesia', desc: 'Built 6 native iOS apps across multiple challenges. From MVP prototyping to TestFlight releases, including wearable and fact-verification apps.' },
  { year: 2019, date: 'Sep 2019 — Feb 2021', role: 'Junior Web Developer', company: 'PT Asta Satria Investama', location: 'Batam, Indonesia', desc: 'Built APIs and CMS features for mobile gaming platforms using Laravel. Optimization and maintenance at scale.' },
];

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const yearRef = useRef(null);
  const chaptersRef = useRef(null);
  const progressFillRef = useRef(null);
  const progressNodesRef = useRef(null);

  return (
    <section className={styles.expPinned} id="experience" ref={sectionRef}>
      <div className={styles.expSticky}>
        {/* Progress bar */}
        <div className={styles.expProgress}>
          <div className={styles.expProgressFill} ref={progressFillRef} id="expProgressFill" />
          <div className={styles.expProgressNodes} ref={progressNodesRef} id="expProgressNodes" />
        </div>

        {/* Headline */}
        <div className={styles.expHeadline} ref={headlineRef} id="expHeadline">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>(03)</span>
            <span className={styles.sectionTitle}>Experience</span>
            <span className={styles.sectionAst}>*</span>
          </div>
        </div>

        {/* Year counter */}
        <div className={styles.expYear} ref={yearRef} id="expYear">2019</div>

        {/* Chapters */}
        <div className={styles.expChapters} ref={chaptersRef} id="expChapters">
          {CHAPTERS.map((chapter, i) => (
            <div key={i} className={styles.expChapter} data-year={chapter.year}>
              <div className={styles.expChapterDate}>{chapter.date}</div>
              <div className={styles.expChapterRole}>{chapter.role}</div>
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
