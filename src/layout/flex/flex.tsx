import styles from './flex.module.css';

interface Props {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
  self?: 'start' | 'center' | 'end' | 'stretch';
  grow?: boolean;
  className?: string;
}

export function Flex({
  children,
  direction = 'row',
  align = 'center',
  justify = 'start',
  gap = 'md',
  wrap = false,
  self,
  grow = false,
  className,
}: Props) {
  const classes = [
    styles.flex,
    styles[direction],
    styles[`align-${align}`],
    styles[`justify-${justify}`],
    styles[`gap-${gap}`],
    wrap ? styles.wrap : '',
    self ? styles[`self-${self}`] : '',
    grow ? styles.grow : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
}
