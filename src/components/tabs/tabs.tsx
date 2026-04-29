import { createContext, forwardRef, useContext, useId, useState } from 'react';
import styles from './tabs.module.css';

interface TabsContextValue {
  active: string;
  setActive: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabs = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs sub-components must be used inside <Tabs>');
  return ctx;
};

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export interface TabProps extends React.ComponentPropsWithRef<'button'> {
  value: string;
}

export interface TabsPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsRoot = ({ defaultValue = '', value, onChange, children, className }: TabsProps) => {
  const baseId = useId();
  const [internal, setInternal] = useState(defaultValue);
  const active = value !== undefined ? value : internal;
  const setActive = (val: string) => {
    setInternal(val);
    onChange?.(val);
  };
  return (
    <TabsContext.Provider value={{ active, setActive, baseId }}>
      <div className={[styles.root, className].filter(Boolean).join(' ')}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};
TabsRoot.displayName = 'Tabs';

const List = ({ children, className }: TabsListProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])')
    );
    const idx = tabs.indexOf(document.activeElement as HTMLElement);
    if (idx === -1) return;

    let next = idx;
    if (e.key === 'ArrowRight')     { e.preventDefault(); next = (idx + 1) % tabs.length; }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); next = (idx - 1 + tabs.length) % tabs.length; }
    else if (e.key === 'Home')      { e.preventDefault(); next = 0; }
    else if (e.key === 'End')       { e.preventDefault(); next = tabs.length - 1; }
    else return;

    tabs[next].focus();
    tabs[next].click();
  };

  return (
    <div
      role="tablist"
      onKeyDown={handleKeyDown}
      className={[styles.list, className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
};
List.displayName = 'Tabs.List';

const Tab = forwardRef<HTMLButtonElement, TabProps>(({ value, className, children, ...props }, ref) => {
  const { active, setActive, baseId } = useTabs();
  const isActive = active === value;
  return (
    <button
      ref={ref}
      id={`${baseId}-tab-${value}`}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActive(value)}
      className={[styles.tab, isActive && styles.active, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  );
});
Tab.displayName = 'Tabs.Tab';

const Panel = ({ value, children, className }: TabsPanelProps) => {
  const { active, baseId } = useTabs();
  if (active !== value) return null;
  return (
    <div
      id={`${baseId}-panel-${value}`}
      role="tabpanel"
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={[styles.panel, className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
};
Panel.displayName = 'Tabs.Panel';

export const Tabs = Object.assign(TabsRoot, { List, Tab, Panel });
