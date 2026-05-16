import { forwardRef } from 'react';
import styles from './container.module.css';

export interface ContainerProps extends React.ComponentPropsWithRef<'div'> {
  size?: 'sm' | 'md' | 'lg';
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'lg', className, ...props }, ref) => (
    <div
      ref={ref}
      data-size={size}
      className={[styles.root, className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
Container.displayName = 'Container';
