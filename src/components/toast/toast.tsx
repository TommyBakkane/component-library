import { createContext, useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './toast.module.css';

interface ToastItem {
  id: string;
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContextValue {
  add: (item: Omit<ToastItem, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const icons: Record<string, React.ReactNode> = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 8l2 2 3-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 6l4 4M10 6l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2.5L1.5 13.5h13L8 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 7v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 6v1M8 8.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const ToastEntry = ({
  message,
  variant,
  onDismiss,
}: ToastItem & { onDismiss: () => void }) => (
  <div
    className={[styles.toast, variant && styles[variant]].filter(Boolean).join(' ')}
    role="status"
    aria-live="polite"
  >
    {variant && <span className={styles.icon}>{icons[variant]}</span>}
    <span className={styles.message}>{message}</span>
    <button type="button" className={styles.dismiss} onClick={onDismiss} aria-label="Dismiss">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  </div>
);

export const ToastProvider = ({ children, position = 'bottom-right' }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const add = useCallback(
    (item: Omit<ToastItem, 'id'>) => {
      const id = crypto.randomUUID();
      setToasts(prev => [...prev, { ...item, id }]);
      const duration = item.duration ?? 4000;
      if (duration > 0) setTimeout(() => remove(id), duration);
    },
    [remove],
  );

  return (
    <ToastContext.Provider value={{ add }}>
      {children}
      {createPortal(
        <div className={styles.container} data-position={position}>
          {toasts.map(t => (
            <ToastEntry key={t.id} {...t} onDismiss={() => remove(t.id)} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return {
    toast: (message: string, options?: Omit<ToastItem, 'id' | 'message'>) =>
      ctx.add({ message, ...options }),
    success: (message: string) => ctx.add({ message, variant: 'success' }),
    error: (message: string) => ctx.add({ message, variant: 'error' }),
    warning: (message: string) => ctx.add({ message, variant: 'warning' }),
    info: (message: string) => ctx.add({ message, variant: 'info' }),
  };
};
