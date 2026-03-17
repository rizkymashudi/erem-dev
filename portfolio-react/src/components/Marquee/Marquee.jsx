import styles from './Marquee.module.css';

export default function Marquee({ items, separator = '/', speed = '22s', reverse = false }) {
  const trackStyle = {
    '--marquee-speed': speed,
    animationDirection: reverse ? 'reverse' : 'normal',
  };

  const renderItems = () =>
    items.map((item, i) => (
      <span key={i}>
        <span className={styles.marqueeItem}>{item}</span>
        <span className={styles.marqueeSep}>{separator}</span>
      </span>
    ));

  return (
    <div className={styles.marqueeWrap}>
      <div className={styles.marqueeTrack} style={trackStyle}>
        {renderItems()}
        {/* Duplicate for seamless loop */}
        {renderItems()}
      </div>
    </div>
  );
}
