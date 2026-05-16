import { forwardRef } from 'react';
import styles from './card.module.css';

export interface CardProps extends React.ComponentPropsWithRef<'div'> {
  shadow?: boolean;
}

export interface CardHeaderProps extends React.ComponentPropsWithRef<'header'> {}
export interface CardBodyProps extends React.ComponentPropsWithRef<'div'> {}
export interface CardFooterProps extends React.ComponentPropsWithRef<'footer'> {}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(({ shadow = true, className, ...props }, ref) => (
  <div
    ref={ref}
    data-shadow={String(shadow)}
    className={[styles.root, className].filter(Boolean).join(' ')}
    {...props}
  />
));
CardRoot.displayName = 'Card';

const Header = forwardRef<HTMLElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <header ref={ref} className={[styles.header, className].filter(Boolean).join(' ')} {...props} />
));
Header.displayName = 'Card.Header';

const Body = forwardRef<HTMLDivElement, CardBodyProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={[styles.body, className].filter(Boolean).join(' ')} {...props} />
));
Body.displayName = 'Card.Body';

const Footer = forwardRef<HTMLElement, CardFooterProps>(({ className, ...props }, ref) => (
  <footer ref={ref} className={[styles.footer, className].filter(Boolean).join(' ')} {...props} />
));
Footer.displayName = 'Card.Footer';

export const Card = Object.assign(CardRoot, { Header, Body, Footer });
