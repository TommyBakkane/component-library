import { createContext, forwardRef, useCallback, useContext, useEffect, useId, useState } from 'react';
import styles from './textarea.module.css';

type LabelVariant = 'outside' | 'on-line' | 'inside';

interface FieldContextValue {
  id: string;
  error?: string;
  disabled?: boolean;
  variant: LabelVariant;
  hasHint: boolean;
  onHintMount: () => void;
  onHintUnmount: () => void;
}

const FieldContext = createContext<FieldContextValue | null>(null);

const useField = () => {
  const ctx = useContext(FieldContext);
  if (!ctx) throw new Error('Textarea compound components must be used inside <Textarea.Field>');
  return ctx;
};

export interface TextareaFieldProps {
  variant?: LabelVariant;
  error?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface TextareaLabelProps {
  children: React.ReactNode;
  className?: string;
}

export interface TextareaProps extends React.ComponentPropsWithRef<'textarea'> {
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export interface TextareaHintProps {
  children: React.ReactNode;
  className?: string;
}

export interface TextareaErrorProps {
  className?: string;
}

const Field = ({ variant = 'outside', error, disabled, children, className }: TextareaFieldProps) => {
  const id = useId();
  const [hasHint, setHasHint] = useState(false);
  const onHintMount = useCallback(() => setHasHint(true), []);
  const onHintUnmount = useCallback(() => setHasHint(false), []);
  return (
    <FieldContext.Provider value={{ id, error, disabled, variant, hasHint, onHintMount, onHintUnmount }}>
      <div
        className={[styles.field, className].filter(Boolean).join(' ')}
        data-variant={variant}
        data-error={error || undefined}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
};

const Label = ({ children, className }: TextareaLabelProps) => {
  const { id } = useField();
  return (
    <label htmlFor={id} className={[styles.label, className].filter(Boolean).join(' ')}>
      {children}
    </label>
  );
};

const TextareaRoot = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, disabled, resize, style, ...props }, ref) => {
    const { id, error, disabled: fieldDisabled, hasHint } = useField();
    const describedBy = [error && `${id}-error`, hasHint && `${id}-hint`].filter(Boolean).join(' ') || undefined;
    return (
      <textarea
        ref={ref}
        rows={4}
        id={id}
        disabled={fieldDisabled || disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={[styles.textarea, className].filter(Boolean).join(' ')}
        style={resize != null ? { ...style, resize } : style}
        {...props}
      />
    );
  },
);
TextareaRoot.displayName = 'Textarea';

const Hint = ({ children, className }: TextareaHintProps) => {
  const { id, onHintMount, onHintUnmount } = useField();
  useEffect(() => {
    onHintMount();
    return onHintUnmount;
  }, [onHintMount, onHintUnmount]);
  return (
    <span id={`${id}-hint`} className={[styles.hint, className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
};

const FieldError = ({ className }: TextareaErrorProps) => {
  const { id, error } = useField();
  if (!error) return null;
  return (
    <span
      id={`${id}-error`}
      role="alert"
      className={[styles.error, className].filter(Boolean).join(' ')}
    >
      {error}
    </span>
  );
};

export const Textarea = Object.assign(TextareaRoot, {
  Field,
  Label,
  Hint,
  Error: FieldError,
});
