import { createContext, forwardRef, useCallback, useContext, useEffect, useId, useState } from 'react';
import styles from './number-input.module.css';

interface FieldContextValue {
  id: string;
  error?: string;
  disabled?: boolean;
  hasHint: boolean;
  onHintMount: () => void;
  onHintUnmount: () => void;
}

const FieldContext = createContext<FieldContextValue | null>(null);

const useField = () => {
  const ctx = useContext(FieldContext);
  if (!ctx) throw new Error('NumberInput compound components must be used inside <NumberInput.Field>');
  return ctx;
};

export interface NumberInputFieldProps {
  error?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface NumberInputLabelProps {
  children: React.ReactNode;
  className?: string;
}

export interface NumberInputHintProps {
  children: React.ReactNode;
  className?: string;
}

export interface NumberInputErrorProps {
  className?: string;
}

export interface NumberInputProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Field = ({ error, disabled, children, className }: NumberInputFieldProps) => {
  const id = useId();
  const [hasHint, setHasHint] = useState(false);
  const onHintMount = useCallback(() => setHasHint(true), []);
  const onHintUnmount = useCallback(() => setHasHint(false), []);
  return (
    <FieldContext.Provider value={{ id, error, disabled, hasHint, onHintMount, onHintUnmount }}>
      <div
        className={[styles.field, className].filter(Boolean).join(' ')}
        data-error={error || undefined}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
};

const Label = ({ children, className }: NumberInputLabelProps) => {
  const { id } = useField();
  return (
    <label htmlFor={id} className={[styles.label, className].filter(Boolean).join(' ')}>
      {children}
    </label>
  );
};

const NumberInputRoot = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, defaultValue, onChange, min, max, step = 1, className, disabled, ...props }, ref) => {
    const { id, error, disabled: fieldDisabled, hasHint } = useField();
    const [internal, setInternal] = useState<number>(defaultValue ?? 0);
    const isControlled = value !== undefined;
    const current = isControlled ? value : internal;
    const isDisabled = fieldDisabled || disabled;
    const describedBy =
      [error && `${id}-error`, hasHint && `${id}-hint`].filter(Boolean).join(' ') || undefined;

    const update = (next: number) => {
      const clamped = Math.min(max ?? Infinity, Math.max(min ?? -Infinity, next));
      if (!isControlled) setInternal(clamped);
      onChange?.(clamped);
    };

    return (
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.stepper}
          onClick={() => update(current - step)}
          disabled={isDisabled || (min !== undefined && current <= min)}
          aria-label="Decrease"
          tabIndex={-1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <input
          ref={ref}
          id={id}
          type="number"
          value={current}
          onChange={e => update(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          disabled={isDisabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={[styles.input, className].filter(Boolean).join(' ')}
          {...props}
        />
        <button
          type="button"
          className={styles.stepper}
          onClick={() => update(current + step)}
          disabled={isDisabled || (max !== undefined && current >= max)}
          aria-label="Increase"
          tabIndex={-1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 3v10M3 8h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    );
  }
);
NumberInputRoot.displayName = 'NumberInput';

const Hint = ({ children, className }: NumberInputHintProps) => {
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

const FieldError = ({ className }: NumberInputErrorProps) => {
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

export const NumberInput = Object.assign(NumberInputRoot, {
  Field,
  Label,
  Hint,
  Error: FieldError,
});
