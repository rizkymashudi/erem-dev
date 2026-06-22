import { useRef, useEffect } from 'react';
import styles from './Sticker.module.css';

export default function Sticker({ src, alt, className, style }) {
  const imgRef = useRef(null);

  // Warm the image decode at mount so the bitmap is ready *before* the sticker
  // pops in on scroll. Otherwise the (large) decode runs on the main thread on
  // the exact frame it animates in, causing a first-scroll stutter.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.decode) img.decode().catch(() => {});
  }, [src]);

  return (
    <div className={`${styles.sticker} ${className || ''}`} style={style}>
      <img ref={imgRef} src={src} alt={alt || ''} draggable="false" decoding="async" />
    </div>
  );
}
