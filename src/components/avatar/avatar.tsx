import { Children, forwardRef } from 'react';
import styles from './avatar.module.css';

export interface AvatarProps extends React.ComponentPropsWithRef<'span'> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const AvatarRoot = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt, name, size = 'md', className, ...props }, ref) => (
    <span
      ref={ref}
      className={[styles.root, styles[size], className].filter(Boolean).join(' ')}
      title={name}
      aria-label={alt ?? name}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt ?? name ?? ''} className={styles.image} />
      ) : name ? (
        <span className={styles.initials} aria-hidden="true">
          {getInitials(name)}
        </span>
      ) : (
        <svg
          className={styles.placeholder}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm0 1.5c-4.5 0-9 2.25-9 4.5V19.5h18V18c0-2.25-4.5-4.5-9-4.5z" />
        </svg>
      )}
    </span>
  ),
);
AvatarRoot.displayName = 'Avatar';

const Group = ({ children, max, size = 'md', className }: AvatarGroupProps) => {
  const items = Children.toArray(children);
  const shown = max != null ? items.slice(0, max) : items;
  const overflow = max != null ? items.length - max : 0;
  return (
    <span className={[styles.group, className].filter(Boolean).join(' ')}>
      {shown}
      {overflow > 0 && (
        <span
          className={[styles.root, styles[size], styles.overflowItem].filter(Boolean).join(' ')}
          aria-label={`${overflow} more`}
        >
          +{overflow}
        </span>
      )}
    </span>
  );
};
Group.displayName = 'Avatar.Group';

export const Avatar = Object.assign(AvatarRoot, { Group });
