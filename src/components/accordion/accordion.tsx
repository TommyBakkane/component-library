import { createContext, useContext, useId, useState } from 'react';
import styles from './accordion.module.css';

interface AccordionContextValue {
  openItem: string | null;
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps {
  defaultValue?: string;
  value?: string | null;
  onChange?: (value: string | null) => void;
  children: React.ReactNode;
  className?: string;
}

export interface AccordionItemProps {
  value: string;
  title: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const AccordionRoot = ({ defaultValue, value, onChange, children, className }: AccordionProps) => {
  const [internal, setInternal] = useState<string | null>(defaultValue ?? null);
  const openItem = value !== undefined ? value : internal;
  const toggle = (val: string) => {
    const next = openItem === val ? null : val;
    setInternal(next);
    onChange?.(next);
  };
  return (
    <AccordionContext.Provider value={{ openItem, toggle }}>
      <div className={[styles.root, className].filter(Boolean).join(' ')}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};
AccordionRoot.displayName = 'Accordion';

const Item = ({ value, title, children, disabled, className }: AccordionItemProps) => {
  const ctx = useContext(AccordionContext)!;
  const id = useId();
  const isOpen = ctx.openItem === value;
  const triggerId = `${id}-trigger`;
  const contentId = `${id}-content`;

  return (
    <div
      className={[styles.item, className].filter(Boolean).join(' ')}
      data-open={isOpen || undefined}
      data-disabled={disabled || undefined}
    >
      <button
        id={triggerId}
        type="button"
        className={styles.trigger}
        onClick={() => !disabled && ctx.toggle(value)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        disabled={disabled}
      >
        <span className={styles.title}>{title}</span>
        <svg
          className={styles.chevron}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          className={styles.content}
        >
          {children}
        </div>
      )}
    </div>
  );
};
Item.displayName = 'Accordion.Item';

export const Accordion = Object.assign(AccordionRoot, { Item });
