import { forwardRef, useId } from 'react';
import styles from './radio.module.css';

export interface RadioProps extends Omit<React.ComponentPropsWithRef<'input'>, 'type' | 'size'> {
  label?: React.ReactNode;
  hint?: string;
  size?: 'sm' | 'md';
}

export interface RadioGroupProps {
  label?: string;
  children: React.ReactNode;
  error?: string;
  hint?: string;
  className?: string;
}

const RadioItem = forwardRef<HTMLInputElement, RadioProps>(({
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
            type="radio"
            id={id}
            disabled={disabled}
            aria-describedby={hint ? `${id}-hint` : undefined}
            className={styles.input}
            {...props}
          />
          <span className={styles.indicator} aria-hidden="true" />
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
RadioItem.displayName = 'Radio';

const Group = ({ label, children, error, hint, className }: RadioGroupProps) => (
  <fieldset className={[styles.group, className].filter(Boolean).join(' ')}>
    {label && <legend className={styles.groupLabel}>{label}</legend>}
    <div className={styles.options}>{children}</div>
    {hint && !error && <span className={styles.groupHint}>{hint}</span>}
    {error && <span role="alert" className={styles.groupError}>{error}</span>}
  </fieldset>
);
Group.displayName = 'Radio.Group';

export const Radio = Object.assign(RadioItem, { Group });
