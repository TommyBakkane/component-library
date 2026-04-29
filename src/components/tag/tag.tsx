import { forwardRef } from 'react';
import styles from './tag.module.css';

export interface TagProps extends React.ComponentPropsWithRef<'span'> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  onDismiss?: () => void;
  children: React.ReactNode;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ variant = 'default', onDismiss, children, className, ...props }, ref) => (
    <span
      ref={ref}
      data-variant={variant}
      className={[styles.root, className].filter(Boolean).join(' ')}
      {...props}
    >
      <span className={styles.label}>{children}</span>
      {onDismiss && (
        <button
          type="button"
          className={styles.dismiss}
          onClick={onDismiss}
          aria-label="Remove"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  )
);
Tag.displayName = 'Tag';
