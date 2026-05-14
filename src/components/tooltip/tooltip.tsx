import { cloneElement, useId } from 'react';
import styles from './tooltip.module.css';

export interface TooltipProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  className?: string;
}

export const Tooltip = ({ content, placement = 'top', children, className }: TooltipProps) => {
  const id = useId();
  return (
    <span
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
      data-placement={placement}
    >
      {cloneElement(children, { 'aria-describedby': id })}
      <span id={id} role="tooltip" className={styles.tooltip}>{content}</span>
    </span>
  );
};
