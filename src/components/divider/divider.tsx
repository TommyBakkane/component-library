import styles from './divider.module.css';

export interface DividerProps {
  label?: string;
}

export const Divider = ({ label }: DividerProps) => {
  if (label) {
    return (
      <div role="separator" aria-label={label} className={styles.withLabel}>
        <span className={styles.line} />
        <span className={styles.label} aria-hidden="true">{label}</span>
        <span className={styles.line} />
      </div>
    );
  }

  return <hr className={styles.divider} />;
};
