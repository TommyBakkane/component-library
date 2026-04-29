import { forwardRef, useId } from 'react';
import styles from './switch.module.css';

export interface SwitchProps extends Omit<React.ComponentPropsWithRef<'input'>, 'type' | 'size'> {
  label?: React.ReactNode;
  hint?: string;
  size?: 'sm' | 'md';
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  label,
  hint,
  size = 'md',
  id: idProp,
  disabled,
  className,
  ...props
}, ref) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <div
      className={[styles.root, styles[size], className].filter(Boolean).join(' ')}
      data-disabled={disabled || undefined}
    >
      <div className={styles.row}>
        <span className={styles.control}>
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={id}
            disabled={disabled}
            aria-describedby={hint ? `${id}-hint` : undefined}
            className={styles.input}
            {...props}
          />
          <span className={styles.track} aria-hidden="true">
            <span className={styles.thumb} />
          </span>
        </span>
        {label !== undefined && (
          <label htmlFor={id} className={styles.label}>{label}</label>
        )}
      </div>
      {hint && (
        <span id={`${id}-hint`} className={styles.hint}>{hint}</span>
      )}
    </div>
  );
});

Switch.displayName = 'Switch';
