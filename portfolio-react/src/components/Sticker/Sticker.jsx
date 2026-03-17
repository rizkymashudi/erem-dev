import styles from './Sticker.module.css';

export default function Sticker({ src, alt, className, style }) {
  return (
    <div className={`${styles.sticker} ${className || ''}`} style={style}>
      <img src={src} alt={alt || ''} draggable="false" />
    </div>
  );
}
