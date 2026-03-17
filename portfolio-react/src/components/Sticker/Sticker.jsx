import styles from './Sticker.module.css';

export default function Sticker({ src, alt, className }) {
  return (
    <div className={`${styles.sticker} ${className || ''}`}>
      <img src={src} alt={alt || ''} />
    </div>
  );
}
