import styles from './link.module.css';

export interface LinkProps extends React.ComponentPropsWithRef<'a'> {
  variant?: 'default' | 'muted' | 'danger';
}

export const Link = ({
  variant = 'default',
  className,
  children,
  ...props
}: LinkProps) => {
  return (
    <a
      className={[styles.link, styles[variant], className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </a>
  );
};
