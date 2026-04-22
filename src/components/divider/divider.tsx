import styles from './divider.module.css';

interface Props {
  label?: string;
}

export const Divider = ({ label }: Props) => {
  if (label) {
    return (
      <div className={styles.withLabel}>
        <span className={styles.line} />
        <label className={styles.label}>{label}</label>
        <span className={styles.line} />
      </div>
    );
  }

  return <hr className={styles.divider} />;
};
