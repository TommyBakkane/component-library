import styles from './grid.module.css';

export interface GridProps {
  children: React.ReactNode;
  cols?: number;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  minColWidth?: string;
  className?: string;
}

export function Grid({ children, cols, gap = 'sm', minColWidth, className }: GridProps) {
  let colStyle: React.CSSProperties | undefined;
  if (cols) {
    colStyle = { gridTemplateColumns: `repeat(${cols}, 1fr)` };
  } else if (minColWidth) {
    colStyle = { gridTemplateColumns: `repeat(auto-fill, minmax(${minColWidth}, 1fr))` };
  }

  return (
    <div
      className={[styles.grid, styles[`gap-${gap}`], className]
        .filter(Boolean)
        .join(' ')}
      style={colStyle}
    >
      {children}
    </div>
  );
}
