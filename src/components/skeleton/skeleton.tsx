import styles from './skeleton.module.css';

export interface SkeletonProps {
  image?: boolean;
  avatar?: boolean;
  lines?: number | boolean;
  className?: string;
}

const LINE_WIDTHS = ['80%', '95%', '60%', '85%', '70%'];
const AUTO_LINE_COUNT = 20;

export const Skeleton = ({ image = false, avatar = false, lines = 0, className }: SkeletonProps) => {
  const hasMedia = image || avatar;
  const lineCount = lines === true ? AUTO_LINE_COUNT : Number(lines);

  if (!hasMedia && lineCount === 0) {
    return <div role="status" aria-label="Loading" className={[styles.shimmer, className].filter(Boolean).join(' ')} />;
  }

  return (
    <div role="status" aria-label="Loading" className={[styles.root, className].filter(Boolean).join(' ')}>
      {(image || avatar) && (
        <div className={[styles.media, avatar ? styles.avatar : ''].filter(Boolean).join(' ')}>
          <div className={styles.shimmer} />
        </div>
      )}
      {lineCount > 0 && (
        <div className={styles.lines} data-auto={lines === true || undefined}>
          {Array.from({ length: lineCount }, (_, i) => LINE_WIDTHS[i % LINE_WIDTHS.length]).map((width, i) => (
            <div key={i} className={styles.line} style={{ width }}>
              <div className={styles.shimmer} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
