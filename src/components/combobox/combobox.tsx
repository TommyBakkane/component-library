import { createContext, forwardRef, useContext, useId, useRef, useState } from 'react';
import styles from './combobox.module.css';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export interface ComboboxFieldProps {
  error?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface ComboboxLabelProps {
  children: React.ReactNode;
  className?: string;
}

export interface ComboboxHintProps {
  children: React.ReactNode;
  className?: string;
}

export interface ComboboxErrorProps {
  className?: string;
}

interface FieldContextValue {
  id: string;
  error?: string;
  disabled?: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

const useField = () => {
  const ctx = useContext(FieldContext);
  if (!ctx) throw new Error('Combobox compound components must be used inside <Combobox.Field>');
  return ctx;
};

const Field = ({ error, disabled, children, className }: ComboboxFieldProps) => {
  const id = useId();
  return (
    <FieldContext.Provider value={{ id, error, disabled }}>
      <div className={[styles.field, className].filter(Boolean).join(' ')}>
        {children}
      </div>
    </FieldContext.Provider>
  );
};

const Label = ({ children, className }: ComboboxLabelProps) => {
  const { id } = useField();
  return (
    <label htmlFor={id} className={[styles.label, className].filter(Boolean).join(' ')}>
      {children}
    </label>
  );
};

const Hint = ({ children, className }: ComboboxHintProps) => {
  const { id } = useField();
  return (
    <span id={`${id}-hint`} className={[styles.hint, className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
};

const ComboboxError = ({ className }: ComboboxErrorProps) => {
  const { id, error } = useField();
  if (!error) return null;
  return (
    <span id={`${id}-error`} role="alert" className={[styles.error, className].filter(Boolean).join(' ')}>
      {error}
    </span>
  );
};

const ComboboxRoot = ({ options, value, onChange, placeholder, disabled, className }: ComboboxProps) => {
  const fieldCtx = useContext(FieldContext);
  const fallbackId = useId();
  const id = fieldCtx?.id ?? fallbackId;
  const isDisabled = disabled ?? fieldCtx?.disabled;
  const error = fieldCtx?.error;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
  };

  const handleSelect = (option: ComboboxOption) => {
    if (option.disabled) return;
    onChange?.(option.value);
    setQuery('');
    setOpen(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false);
      setQuery('');
    }
  };

  const displayValue = open ? query : (selectedOption?.label ?? '');

  return (
    <div ref={containerRef} className={[styles.root, className].filter(Boolean).join(' ')} onBlur={handleBlur}>
      <div
        className={styles.control}
        data-open={open || undefined}
        data-error={error ? true : undefined}
        data-disabled={isDisabled || undefined}
      >
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          value={displayValue}
          placeholder={placeholder}
          disabled={isDisabled}
          className={styles.input}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
        />
        <span className={styles.chevron} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {open && (
        <ul role="listbox" className={styles.list}>
          {filtered.length === 0 ? (
            <li className={styles.empty}>No results</li>
          ) : (
            filtered.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                aria-disabled={option.disabled}
                data-selected={option.value === value || undefined}
                data-disabled={option.disabled || undefined}
                className={styles.option}
                onMouseDown={(e) => { e.preventDefault(); handleSelect(option); }}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export const Combobox = Object.assign(ComboboxRoot, {
  Field,
  Label,
  Hint,
  Error: ComboboxError,
});
