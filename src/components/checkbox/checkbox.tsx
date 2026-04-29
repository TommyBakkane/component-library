import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react';
import styles from './checkbox.module.css';

export interface CheckboxProps extends Omit<React.ComponentPropsWithRef<'input'>, 'type' | 'size'> {
  label?: React.ReactNode;
  hint?: string;
  error?: string;
  indeterminate?: boolean;
  size?: 'sm' | 'md';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  hint,
  error,
  indeterminate = false,
  size = 'md',
  id: idProp,
  disabled,
  className,
  ...props
}, ref) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const innerRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => innerRef.current!);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div
      className={[styles.root, styles[size], className].filter(Boolean).join(' ')}
      data-disabled={disabled || undefined}
      data-error={error || undefined}
    >
      <div className={styles.row}>
        <span className={styles.control}>
          <input
            ref={innerRef}
            type="checkbox"
            id={id}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            className={styles.input}
            {...props}
          />
          <span className={styles.indicator} aria-hidden="true" />
        </span>
        {label !== undefined && (
          <label htmlFor={id} className={styles.label}>{label}</label>
        )}
      </div>
      {hint && !error && (
        <span id={`${id}-hint`} className={styles.hint}>{hint}</span>
      )}
      {error && (
        <span id={`${id}-error`} role="alert" className={styles.error}>{error}</span>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
