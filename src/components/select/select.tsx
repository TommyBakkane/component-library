import { createContext, forwardRef, useCallback, useContext, useEffect, useId, useState } from 'react';
import styles from './select.module.css';

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
  if (!ctx) throw new Error('Select compound components must be used inside <Select.Field>');
  return ctx;
};

export interface SelectFieldProps {
  variant?: LabelVariant;
  error?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface SelectLabelProps {
  children: React.ReactNode;
  className?: string;
}

export interface SelectProps extends React.ComponentPropsWithRef<'select'> {}

export interface SelectHintProps {
  children: React.ReactNode;
  className?: string;
}

export interface SelectErrorProps {
  className?: string;
}

const Field = ({ variant = 'outside', error, disabled, children, className }: SelectFieldProps) => {
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

const Label = ({ children, className }: SelectLabelProps) => {
  const { id } = useField();
  return (
    <label htmlFor={id} className={[styles.label, className].filter(Boolean).join(' ')}>
      {children}
    </label>
  );
};

const SelectRoot = forwardRef<HTMLSelectElement, SelectProps>(({ className, disabled, ...props }, ref) => {
  const { id, error, disabled: fieldDisabled, hasHint } = useField();
  const describedBy = [error && `${id}-error`, hasHint && `${id}-hint`].filter(Boolean).join(' ') || undefined;
  return (
    <select
      ref={ref}
      id={id}
      disabled={fieldDisabled || disabled}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
      className={[styles.select, className].filter(Boolean).join(' ')}
      {...props}
    />
  );
});
SelectRoot.displayName = 'Select';

const Hint = ({ children, className }: SelectHintProps) => {
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

const FieldError = ({ className }: SelectErrorProps) => {
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

export const Select = Object.assign(SelectRoot, {
  Field,
  Label,
  Hint,
  Error: FieldError,
});
