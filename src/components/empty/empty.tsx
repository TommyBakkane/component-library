import { Alert } from '../../icons/alert';
import styles from './empty.module.css';

interface Props {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <Alert />
      </div>
      <span className={styles.title}>{title}</span>
      {description && (
        <label className={styles.description}>{description}</label>
      )}
    </div>
  );
}
