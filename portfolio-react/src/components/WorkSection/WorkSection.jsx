import { useRef } from 'react';
import styles from './WorkSection.module.css';
import Sticker from '../Sticker/Sticker';

const PROJECTS = [
  {
    id: 1,
    name: 'nbs.co.id — iOS platform',
    desc: 'Enterprise iOS application developed over 3+ years as lead iOS engineer. Scalable architecture, continuous delivery.',
    tags: ['Swift', 'Clean Architecture', 'CI/CD', '3+ years'],
    gradient: 'linear-gradient(135deg, rgba(62,193,201,0.14), rgba(62,193,201,0.04) 50%, rgba(230,90,79,0.08))',
    rotate: -3,
  },
  {
    id: 2,
    name: 'PerLu — fact verification',
    desc: 'Verify social media text against MAFINDO\'s database. Copy, paste, get the truth.',
    tags: ['UIKit', 'API Integration', 'MAFINDO'],
    gradient: 'linear-gradient(135deg, rgba(230,90,79,0.14), rgba(230,90,79,0.04))',
    rotate: 2,
  },
  {
    id: 3,
    name: 'Sleeplance — watchOS companion',
    desc: 'Sleep tracking wearable app, evolved through 3 challenge iterations from MVP to TestFlight release.',
    tags: ['WatchKit', 'HealthKit', 'TestFlight'],
    gradient: 'linear-gradient(135deg, rgba(242,201,76,0.14), rgba(242,201,76,0.04))',
    rotate: -1.5,
  },
  {
    id: 4,
    name: 'Say it! — sentence generator',
    desc: 'Structured sentence builder from keyword input. Designed for quick, natural expression.',
    tags: ['Native iOS', 'NLP'],
    gradient: 'linear-gradient(135deg, rgba(62,193,201,0.14), rgba(62,193,201,0.04))',
    rotate: 3.5,
  },
  {
    id: 5,
    name: 'Pocket Money — expense tracker',
    desc: 'Personal finance tracking with CoreData persistence and visual spending breakdowns.',
    tags: ['CoreData', 'Charts'],
    gradient: 'linear-gradient(135deg, rgba(230,90,79,0.1), rgba(242,201,76,0.08))',
    rotate: -2.5,
    isLast: true,
  },
];

function ProjectCard({ project }) {
  return (
    <div className={styles.projectCard} data-card-rotate={project.rotate}>
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
  const stickyRef = useRef(null);
  const headlineRef = useRef(null);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const exitHeadlineRef = useRef(null);

  const regularCards = PROJECTS.filter((p) => !p.isLast);
  const lastProject = PROJECTS.find((p) => p.isLast);

  return (
    <section className={styles.workPinned} id="work" ref={sectionRef}>
      <div className={styles.workSticky} ref={stickyRef}>
        {/* Headline entrance */}
        <div className={styles.workHeadline} ref={headlineRef} id="workHeadline">
          <div className={styles.workHeadlineInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNum}>(01)</span>
              <span className={styles.sectionTitle}>Featured work</span>
              <span className={styles.sectionAst}>*</span>
            </div>
            <p className={styles.workSubtitle} id="workSubtitle" />
          </div>
        </div>

        {/* Stickers */}
        <Sticker
          src="/assets/stickers/swift.png"
          className={`${styles.stickerWorkSwift} ${styles.stickerScrollPop}`}
        />
        <Sticker
          src="/assets/stickers/xcode.png"
          className={`${styles.stickerWorkXcode} ${styles.stickerScrollPop}`}
        />

        {/* Card carousel */}
        <div className={styles.workCarousel} ref={carouselRef} id="workCarousel">
          <div className={styles.workTrack} ref={trackRef} id="workTrack">
            {regularCards.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {lastProject && (
              <div className={styles.projectCardWrap}>
                <Sticker
                  src="/assets/stickers/unicorn.png"
                  className={`${styles.stickerCardUnicorn} ${styles.stickerFloat}`}
                />
                <ProjectCard project={lastProject} />
              </div>
            )}
          </div>
        </div>

        {/* Exit headline */}
        <div className={styles.workExitHeadline} ref={exitHeadlineRef} id="workExitHeadline">
          <div className={styles.workHeadlineInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNum}>(02)</span>
              <span className={styles.sectionTitle}>What I do</span>
              <span className={styles.sectionAst}>*</span>
            </div>
          </div>
          <Sticker
            src="/assets/stickers/arkit.png"
            className={`${styles.stickerSkillsArkit} ${styles.stickerScrollPop}`}
          />
        </div>
      </div>
    </section>
  );
}
