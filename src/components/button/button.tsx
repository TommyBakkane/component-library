import { Spinner } from '../spinner/spinner';
import styles from './button.module.css';

interface Props extends React.ComponentPropsWithRef<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  type = 'button',
  disabled,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      data-loading={loading}
      className={[styles.button, styles[variant], styles[size], className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <span className={styles.content}>
        {leftIcon && (
          <span className={styles.icon} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span className={styles.icon} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </span>

      <span className={styles.spinner}>
        <Spinner />
      </span>
    </button>
  );
};
