import {
  cloneElement,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './dropdown.module.css';

interface DropdownContextValue {
  open: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  menuRef: React.RefObject<HTMLDivElement | null>;
  menuPos: { top: number; left: number; minWidth: number };
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('Dropdown sub-components must be used inside <Dropdown>');
  return ctx;
};

export interface DropdownProps {
  children: React.ReactNode;
}

export interface DropdownTriggerProps {
  children: React.ReactElement;
}

export interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
}

export interface DropdownItemProps extends React.ComponentPropsWithRef<'button'> {
  variant?: 'default' | 'danger';
  icon?: React.ReactNode;
}

export interface DropdownSeparatorProps {
  className?: string;
}

const DropdownRoot = ({ children }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, minWidth: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const toggle = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 4, left: rect.left, minWidth: rect.width });
    }
    setOpen(prev => !prev);
  };

  useEffect(() => {
    if (!open) return;
    const handleMouse = (e: MouseEvent) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        close();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', handleMouse);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleMouse);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, close]);

  return (
    <DropdownContext.Provider value={{ open, toggle, close, triggerRef, menuRef, menuPos }}>
      {children}
    </DropdownContext.Provider>
  );
};
DropdownRoot.displayName = 'Dropdown';

const Trigger = ({ children }: DropdownTriggerProps) => {
  const { toggle, triggerRef, open } = useDropdown();
  const childProps = (children as React.ReactElement<any>).props;
  return cloneElement(children as React.ReactElement<any>, {
    onClick: (e: React.MouseEvent) => {
      childProps.onClick?.(e);
      toggle();
    },
    ref: triggerRef,
    'aria-expanded': open,
    'aria-haspopup': 'menu' as const,
  });
};
Trigger.displayName = 'Dropdown.Trigger';

const Menu = ({ children, className }: DropdownMenuProps) => {
  const { open, menuPos, menuRef } = useDropdown();

  useEffect(() => {
    if (!open) return;
    const firstItem = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]:not([disabled])');
    firstItem?.focus();
  }, [open, menuRef]);

  if (!open) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])') ?? []
    );
    const idx = items.indexOf(document.activeElement as HTMLElement);
    let next = idx;

    if (e.key === 'ArrowDown')      { e.preventDefault(); next = (idx + 1) % items.length; }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); next = (idx - 1 + items.length) % items.length; }
    else if (e.key === 'Home')      { e.preventDefault(); next = 0; }
    else if (e.key === 'End')       { e.preventDefault(); next = items.length - 1; }
    else return;

    items[next]?.focus();
  };

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      onKeyDown={handleKeyDown}
      className={[styles.menu, className].filter(Boolean).join(' ')}
      style={{ top: menuPos.top, left: menuPos.left, minWidth: menuPos.minWidth }}
    >
      {children}
    </div>,
    document.body,
  );
};
Menu.displayName = 'Dropdown.Menu';

const Item = forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ variant = 'default', icon, children, onClick, className, ...props }, ref) => {
    const { close } = useDropdown();
    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        className={[styles.item, variant !== 'default' && styles[variant], className]
          .filter(Boolean)
          .join(' ')}
        onClick={e => {
          onClick?.(e);
          close();
        }}
        {...props}
      >
        {icon && <span className={styles.itemIcon} aria-hidden="true">{icon}</span>}
        {children}
      </button>
    );
  },
);
Item.displayName = 'Dropdown.Item';

const Separator = ({ className }: DropdownSeparatorProps) => (
  <div role="separator" className={[styles.separator, className].filter(Boolean).join(' ')} />
);
Separator.displayName = 'Dropdown.Separator';

export const Dropdown = Object.assign(DropdownRoot, { Trigger, Menu, Item, Separator });
