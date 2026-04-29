import { Alert } from '../../icons/alert';
import styles from './empty.module.css';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, children, className }: EmptyStateProps) {
  return (
    <div className={[styles.container, className].filter(Boolean).join(' ')}>
      <div className={styles.icon} aria-hidden="true">
        {icon ?? <Alert />}
      </div>
      <span className={styles.title}>{title}</span>
      {description && (
        <p className={styles.description}>{description}</p>
      )}
      {children}
    </div>
  );
}
