import { forwardRef } from 'react';
import styles from './breadcrumb.module.css';

export interface BreadcrumbProps extends React.ComponentPropsWithRef<'nav'> {
  children: React.ReactNode;
  label?: string;
}

export interface BreadcrumbItemProps extends React.ComponentPropsWithRef<'li'> {
  children: React.ReactNode;
  current?: boolean;
}

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ children, label = 'Breadcrumb', className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label={label}
      className={[styles.root, className].filter(Boolean).join(' ')}
      {...props}
    >
      <ol className={styles.list}>{children}</ol>
    </nav>
  )
);
BreadcrumbRoot.displayName = 'Breadcrumb';

const Item = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ children, current, className, ...props }, ref) => (
    <li
      ref={ref}
      className={[styles.item, className].filter(Boolean).join(' ')}
      aria-current={current ? 'page' : undefined}
      {...props}
    >
      {children}
    </li>
  )
);
Item.displayName = 'Breadcrumb.Item';

export const Breadcrumb = Object.assign(BreadcrumbRoot, { Item });
