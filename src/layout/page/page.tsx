import { forwardRef } from 'react';
import styles from './page.module.css';

export interface PageProps extends React.ComponentPropsWithRef<'div'> {
  align?: 'start' | 'center';
}

export const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ align = 'start', className, ...props }, ref) => (
    <div
      ref={ref}
      data-align={align}
      className={[styles.root, className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
Page.displayName = 'Page';
