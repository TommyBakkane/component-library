import styles from './tooltip.module.css';

export interface TooltipProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactElement;
  className?: string;
}

export const Tooltip = ({ content, placement = 'top', children, className }: TooltipProps) => (
  <span
    className={[styles.wrapper, className].filter(Boolean).join(' ')}
    data-placement={placement}
  >
    {children}
    <span role="tooltip" className={styles.tooltip}>{content}</span>
  </span>
);
