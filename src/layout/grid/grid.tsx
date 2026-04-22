import styles from './grid.module.css';

interface Props {
  children: React.ReactNode;
  cols?: number;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Grid({ children, cols, gap = 'sm', className }: Props) {
  return (
    <div
      className={[styles.grid, styles[`gap-${gap}`], className]
        .filter(Boolean)
        .join(' ')}
      style={cols ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}
    >
      {children}
    </div>
  );
}
