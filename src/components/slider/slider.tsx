import { createContext, forwardRef, useCallback, useContext, useEffect, useId, useState } from 'react';
import styles from './slider.module.css';

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
  if (!ctx) throw new Error('Slider compound components must be used inside <Slider.Field>');
  return ctx;
};

export interface SliderFieldProps {
  error?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface SliderLabelProps {
  children: React.ReactNode;
  className?: string;
}

export interface SliderHintProps {
  children: React.ReactNode;
  className?: string;
}

export interface SliderErrorProps {
  className?: string;
}

export interface SliderProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange' | 'size'> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
}

const Field = ({ error, disabled, children, className }: SliderFieldProps) => {
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

const Label = ({ children, className }: SliderLabelProps) => {
  const { id } = useField();
  return (
    <label htmlFor={id} className={[styles.label, className].filter(Boolean).join(' ')}>
      {children}
    </label>
  );
};

const SliderRoot = forwardRef<HTMLInputElement, SliderProps>(
  ({ value, defaultValue, onChange, min = 0, max = 100, step = 1, size = 'md', className, disabled, ...props }, ref) => {
    const { id, error, disabled: fieldDisabled, hasHint } = useField();
    const [internal, setInternal] = useState<number>(defaultValue ?? min);
    const isControlled = value !== undefined;
    const current = isControlled ? value : internal;
    const pct = ((current - min) / (max - min)) * 100;
    const isDisabled = fieldDisabled || disabled;
    const describedBy =
      [error && `${id}-error`, hasHint && `${id}-hint`].filter(Boolean).join(' ') || undefined;

    const update = (next: number) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };

    return (
      <input
        ref={ref}
        id={id}
        type="range"
        value={current}
        onChange={e => update(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        disabled={isDisabled}
        data-size={size}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={[styles.input, className].filter(Boolean).join(' ')}
        style={{ '--pct': `${pct}%` } as React.CSSProperties}
        {...props}
      />
    );
  }
);
SliderRoot.displayName = 'Slider';

const Hint = ({ children, className }: SliderHintProps) => {
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

const FieldError = ({ className }: SliderErrorProps) => {
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

export const Slider = Object.assign(SliderRoot, {
  Field,
  Label,
  Hint,
  Error: FieldError,
});
