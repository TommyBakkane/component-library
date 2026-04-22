import styles from './badge.module.css';

interface BadgeProps {
  children: React.ReactNode;

  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium';

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  className?: string;
}

export const Badge = ({
  children,
  color = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  className,
}: BadgeProps) => {
  return (
    <span
      className={[styles.badge, styles[color], styles[size], className]
        .filter(Boolean)
        .join(' ')}
    >
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </span>
  );
};
