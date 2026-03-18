import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, cardRef }) {
  return (
    <div
      className={styles.card}
      data-card-rotate={project.rotate}
      ref={cardRef}
      style={{ '--brand-gradient': project.gradient }}
    >
      <div className={styles.cardBg} />
      <div className={styles.cardContent}>
        <div className={styles.cardName}>{project.name}</div>
        <div className={styles.cardDesc}>{project.desc}</div>
        <div className={styles.cardTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.cardTag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
