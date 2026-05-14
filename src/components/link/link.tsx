import { forwardRef } from 'react';
import styles from './link.module.css';

export interface LinkProps extends React.ComponentPropsWithRef<'a'> {
  variant?: 'default' | 'muted' | 'danger';
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({
  variant = 'default',
  className,
  children,
  ...props
}, ref) => {
  return (
    <a
      ref={ref}
      className={[styles.link, styles[variant], className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </a>
  );
});
Link.displayName = 'Link';
