import styles from './spinner.module.css';

export const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
    </div>
  );
};
