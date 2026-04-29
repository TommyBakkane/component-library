import { createContext, forwardRef, useContext, useId } from 'react';
import styles from './input.module.css';

type LabelVariant = 'outside' | 'on-line' | 'inside';

interface FieldContextValue {
  id: string;
  error?: string;
  disabled?: boolean;
  variant: LabelVariant;
}

const FieldContext = createContext<FieldContextValue | null>(null);

const useField = () => {
  const ctx = useContext(FieldContext);
  if (!ctx) throw new Error('Input compound components must be used inside <Input.Field>');
  return ctx;
};

export interface FieldProps {
  variant?: LabelVariant;
  error?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

export interface InputProps extends React.ComponentPropsWithRef<'input'> {}

export interface HintProps {
  children: React.ReactNode;
  className?: string;
}

export interface FieldErrorProps {
  className?: string;
}

const Field = ({ variant = 'outside', error, disabled, children, className }: FieldProps) => {
  const id = useId();
  return (
    <FieldContext.Provider value={{ id, error, disabled, variant }}>
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

const Label = ({ children, className }: LabelProps) => {
  const { id } = useField();
  return (
    <label htmlFor={id} className={[styles.label, className].filter(Boolean).join(' ')}>
      {children}
    </label>
  );
};

const InputRoot = forwardRef<HTMLInputElement, InputProps>(({ className, disabled, ...props }, ref) => {
  const { id, error, disabled: fieldDisabled } = useField();
  const describedBy = [error && `${id}-error`, `${id}-hint`].filter(Boolean).join(' ');
  return (
    <input
      ref={ref}
      id={id}
      disabled={fieldDisabled || disabled}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
      className={[styles.input, className].filter(Boolean).join(' ')}
      {...props}
    />
  );
});
InputRoot.displayName = 'Input';

const Hint = ({ children, className }: HintProps) => {
  const { id } = useField();
  return (
    <span id={`${id}-hint`} className={[styles.hint, className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
};

const FieldError = ({ className }: FieldErrorProps) => {
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

export const Input = Object.assign(InputRoot, {
  Field,
  Label,
  Hint,
  Error: FieldError,
});
