import { useRef } from 'react';
import styles from './AboutSection.module.css';
import Sticker from '../Sticker/Sticker';

const BIO_PHRASES = [
  {
    delay: 0,
    content: (
      <>
        <span className={styles.highlight}>Rizky Mashudi</span> is an iOS developer based in Jakarta, Indonesia, with over 4 years of experience crafting scalable and maintainable mobile applications.
      </>
    ),
  },
  {
    delay: 1,
    content: (
      <>
        A graduate of the <span className={styles.highlight}>Apple Developer Academy</span> in Batam and currently studying at the <span className={styles.highlight}>Essential Developer Academy</span> in London, he continuously invests in engineering excellence.
      </>
    ),
  },
  {
    delay: 2,
    content: (
      <>
        He specializes in delivering exceptional user experiences through clean code, thoughtful architecture, and a deep understanding of the iOS ecosystem. He shares his learnings and insights on <span className={styles.highlight}>Medium @ikyrm</span>.
      </>
    ),
  },
];

const LINK_CARDS = [
  { href: 'https://www.linkedin.com/in/rizky-mashudi', label: 'LinkedIn', color: 'cyan', delay: 0, external: true },
  { href: 'https://github.com/rizkymashudi', label: 'GitHub', color: 'primary', delay: 1, external: true },
  { href: 'https://medium.com/@ikyrm', label: 'Medium blog', color: 'yellow', delay: 2, external: true },
  { href: 'mailto:rizkymashudi7@gmail.com', label: 'Email', color: 'orange', delay: 3, external: false },
];

const colorClass = {
  cyan: 'aboutLinkCyan',
  primary: 'aboutLinkPrimary',
  yellow: 'aboutLinkYellow',
  orange: 'aboutLinkOrange',
};

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const splitRef = useRef(null);
  const bioRef = useRef(null);
  const linksRef = useRef(null);

  return (
    <section className={styles.aboutPinned} id="about" ref={sectionRef}>
      <div className={styles.aboutSticky}>
        {/* Headline */}
        <div className={styles.aboutHeadline} ref={headlineRef} id="aboutHeadline">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNum}>(04)</span>
            <span className={styles.sectionTitle}>About</span>
            <span className={styles.sectionAst}>*</span>
          </div>
          <Sticker
            src="/assets/stickers/memoji-laptop.png"
            className={`${styles.stickerAboutMemoji} ${styles.stickerScrollPop}`}
          />
        </div>

        {/* Split content */}
        <div className={styles.aboutSplit} ref={splitRef} id="aboutSplit">
          {/* Bio phrases */}
          <div className={styles.aboutBio} ref={bioRef} id="aboutBio">
            {BIO_PHRASES.map((phrase, i) => (
              <div key={i} className={styles.aboutPhrase} data-delay={phrase.delay}>
                {phrase.content}
              </div>
            ))}
          </div>

          {/* Link cards */}
          <div className={styles.aboutLinksWrap} ref={linksRef} id="aboutLinksWrap">
            {LINK_CARDS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`${styles.aboutLink} ${styles[colorClass[link.color]]}`}
                data-link-delay={link.delay}
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
