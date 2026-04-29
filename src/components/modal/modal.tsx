import { createContext, forwardRef, useContext, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

interface ModalContextValue {
  titleId: string;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export interface ModalHeaderProps extends React.ComponentPropsWithRef<'div'> {}
export interface ModalBodyProps extends React.ComponentPropsWithRef<'div'> {}
export interface ModalFooterProps extends React.ComponentPropsWithRef<'div'> {}

const ModalRoot = ({ open, onClose, size = 'md', children, className }: ModalProps) => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

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
    const dialog = dialogRef.current;
    const focusable = Array.from(
      dialog?.querySelectorAll<HTMLElement>(
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
    <ModalContext.Provider value={{ titleId, onClose }}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={[styles.dialog, styles[size], className].filter(Boolean).join(' ')}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
};
ModalRoot.displayName = 'Modal';

const Header = forwardRef<HTMLDivElement, ModalHeaderProps>(({ className, id, ...props }, ref) => {
  const ctx = useContext(ModalContext);
  return (
    <div
      ref={ref}
      id={ctx?.titleId ?? id}
      className={[styles.header, className].filter(Boolean).join(' ')}
      {...props}
    />
  );
});
Header.displayName = 'Modal.Header';

const Body = forwardRef<HTMLDivElement, ModalBodyProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={[styles.body, className].filter(Boolean).join(' ')} {...props} />
));
Body.displayName = 'Modal.Body';

const Footer = forwardRef<HTMLDivElement, ModalFooterProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={[styles.footer, className].filter(Boolean).join(' ')} {...props} />
));
Footer.displayName = 'Modal.Footer';

export const Modal = Object.assign(ModalRoot, { Header, Body, Footer });
