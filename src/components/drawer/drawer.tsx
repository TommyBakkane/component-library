import { createContext, forwardRef, useContext, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './drawer.module.css';

interface DrawerContextValue {
  titleId: string;
  onClose: () => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export interface DrawerHeaderProps extends React.ComponentPropsWithRef<'div'> {}
export interface DrawerBodyProps extends React.ComponentPropsWithRef<'div'> {}
export interface DrawerFooterProps extends React.ComponentPropsWithRef<'div'> {}

const DrawerRoot = ({ open, onClose, side = 'right', size = 'md', children, className }: DrawerProps) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    return () => { prevFocus?.focus(); };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusable = Array.from(
      panel?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) ?? []
    );
    focusable[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <DrawerContext.Provider value={{ titleId, onClose }}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          data-side={side}
          className={[styles.panel, styles[size], className].filter(Boolean).join(' ')}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </DrawerContext.Provider>,
    document.body
  );
};
DrawerRoot.displayName = 'Drawer';

const Header = forwardRef<HTMLDivElement, DrawerHeaderProps>(({ className, id, ...props }, ref) => {
  const ctx = useContext(DrawerContext);
  return (
    <div
      ref={ref}
      id={ctx?.titleId ?? id}
      className={[styles.header, className].filter(Boolean).join(' ')}
      {...props}
    />
  );
});
Header.displayName = 'Drawer.Header';

const Body = forwardRef<HTMLDivElement, DrawerBodyProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={[styles.body, className].filter(Boolean).join(' ')} {...props} />
));
Body.displayName = 'Drawer.Body';

const Footer = forwardRef<HTMLDivElement, DrawerFooterProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={[styles.footer, className].filter(Boolean).join(' ')} {...props} />
));
Footer.displayName = 'Drawer.Footer';

export const Drawer = Object.assign(DrawerRoot, { Header, Body, Footer });
