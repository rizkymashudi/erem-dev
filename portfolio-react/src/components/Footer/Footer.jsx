import styles from './Footer.module.css';
import Sticker from '../Sticker/Sticker';

export default function Footer() {
  return (
    <section className={styles.footerSection} id="contact">
      <Sticker
        src="/assets/stickers/apple.png"
        className={`${styles.stickerFooterApple} ${styles.stickerFloatSlow}`}
      />
      <div className={styles.reveal}>
        <div className={styles.footerCta}>got a project in mind?</div>
        <a href="mailto:rizkymashudi7@gmail.com" className={styles.footerEmail}>
          rizkymashudi7@gmail.com
        </a>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerSig}>
          RM<span className={styles.accent}>_</span> /26
        </div>
        <div className={styles.footerSocials}>
          <a href="https://www.linkedin.com/in/rizky-mashudi" target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a href="https://github.com/rizkymashudi" target="_blank" rel="noopener">
            GitHub
          </a>
          <a href="https://medium.com/@ikyrm" target="_blank" rel="noopener">
            Medium
          </a>
        </div>
      </div>
    </section>
  );
}
