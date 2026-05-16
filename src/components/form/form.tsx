import { forwardRef } from 'react';
import styles from './form.module.css';

export interface FormProps extends React.ComponentPropsWithRef<'form'> {
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Form = forwardRef<HTMLFormElement, FormProps>(({ gap = 'lg', className, ...props }, ref) => (
  <form
    ref={ref}
    data-gap={gap}
    className={[styles.root, className].filter(Boolean).join(' ')}
    {...props}
  />
));
Form.displayName = 'Form';
