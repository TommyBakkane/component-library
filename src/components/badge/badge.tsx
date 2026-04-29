import { forwardRef } from 'react';
import styles from './badge.module.css';

export interface BadgeProps extends React.ComponentPropsWithRef<'span'> {
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  children,
  color = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  className,
  ...props
}, ref) => {
  return (
    <span
      ref={ref}
      className={[styles.badge, styles[color], styles[size], className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {leftIcon && <span className={styles.icon} aria-hidden="true">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className={styles.icon} aria-hidden="true">{rightIcon}</span>}
    </span>
  );
});

Badge.displayName = 'Badge';
