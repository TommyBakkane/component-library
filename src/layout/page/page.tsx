import { forwardRef } from 'react';
import styles from './page.module.css';

export interface PageProps extends React.ComponentPropsWithRef<'main'> {
  align?: 'start' | 'center';
}

export const Page = forwardRef<HTMLElement, PageProps>(
  ({ align = 'start', className, ...props }, ref) => (
    <main
      ref={ref}
      data-align={align}
      className={[styles.root, className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
Page.displayName = 'Page';
