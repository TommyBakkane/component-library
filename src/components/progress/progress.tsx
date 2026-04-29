import { forwardRef } from 'react';
import styles from './progress.module.css';

export interface ProgressProps extends React.ComponentPropsWithRef<'div'> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, size = 'md', label, className, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || 'Loading'}
        data-size={size}
        className={[styles.root, className].filter(Boolean).join(' ')}
        {...props}
      >
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${pct}%` }} />
        </div>
      </div>
    );
  }
);
Progress.displayName = 'Progress';
