import styles from './spinner.module.css';

export interface SpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Spinner = ({ label = 'Loading…', size = 'sm' }: SpinnerProps) => {
  return (
    <div className={styles.wrapper} role="status" aria-label={label}>
      <div className={[styles.spinner, styles[`size-${size}`]].join(' ')} />
    </div>
  );
};
