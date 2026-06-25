import { useRef, useEffect } from 'react';
import styles from './BlogSection.module.css';
import {
  ARTICLES,
  MEDIUM_URL,
  BLOG_NUM,
  BLOG_EYEBROW,
  BLOG_HEADING,
} from '../../data/blog';

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BlogSection() {
  const rootRef = useRef(null);

  // Light entrance: fade + staggered translateY per row, once on enter.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll(`[data-reveal]`));

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) {
      items.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const i = Number(el.dataset.reveal) || 0;
            el.style.transitionDelay = `${i * 90}ms`;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.blog} id="blog" ref={rootRef}>
      <div className={styles.inner}>
        <header className={styles.header} data-reveal="0">
          <span className={styles.num}>{BLOG_NUM}</span>
          <span className={styles.eyebrow}>{BLOG_EYEBROW}</span>
          <h2 className={styles.heading}>{BLOG_HEADING}</h2>
        </header>

        <ol className={styles.list}>
          {ARTICLES.map((article, idx) => (
            <li key={article.id} className={styles.item} data-reveal={idx + 1}>
              <a
                className={styles.row}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.meta}>
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                  <span className={styles.dot}>·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className={styles.title}>
                  <span className={styles.titleText}>{article.title}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </h3>

                <p className={styles.excerpt}>{article.excerpt}</p>

                {article.tags?.length > 0 && (
                  <ul className={styles.tags}>
                    {article.tags.map((tag) => (
                      <li key={tag} className={styles.tag}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </a>
            </li>
          ))}
        </ol>

        <a
          className={styles.more}
          href={MEDIUM_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal={ARTICLES.length + 1}
        >
          Read more on Medium
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
