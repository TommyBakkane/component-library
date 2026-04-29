import { forwardRef } from 'react';
import styles from './table.module.css';

export interface TableProps extends React.ComponentPropsWithRef<'table'> {
  striped?: boolean;
  size?: 'sm' | 'md';
}

export interface TableHeadProps extends React.ComponentPropsWithRef<'thead'> {}
export interface TableBodyProps extends React.ComponentPropsWithRef<'tbody'> {}
export interface TableRowProps extends React.ComponentPropsWithRef<'tr'> {}

export interface TableHeaderProps extends React.ComponentPropsWithRef<'th'> {
  align?: 'left' | 'center' | 'right';
}

export interface TableCellProps extends React.ComponentPropsWithRef<'td'> {
  align?: 'left' | 'center' | 'right';
}

const TableRoot = forwardRef<HTMLTableElement, TableProps>(({
  children,
  striped = false,
  size = 'md',
  className,
  ...props
}, ref) => (
  <div className={styles.wrapper}>
    <table
      ref={ref}
      data-striped={striped || undefined}
      className={[styles.table, styles[size], className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </table>
  </div>
));
TableRoot.displayName = 'Table';

const Head = forwardRef<HTMLTableSectionElement, TableHeadProps>(({ className, ...props }, ref) => (
  <thead ref={ref} className={[styles.head, className].filter(Boolean).join(' ')} {...props} />
));
Head.displayName = 'Table.Head';

const Body = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={[styles.body, className].filter(Boolean).join(' ')} {...props} />
));
Body.displayName = 'Table.Body';

const Row = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => (
  <tr ref={ref} className={[styles.row, className].filter(Boolean).join(' ')} {...props} />
));
Row.displayName = 'Table.Row';

const Header = forwardRef<HTMLTableCellElement, TableHeaderProps>(({ align = 'left', className, ...props }, ref) => (
  <th
    ref={ref}
    scope="col"
    className={[styles.header, styles[`align-${align}`], className].filter(Boolean).join(' ')}
    {...props}
  />
));
Header.displayName = 'Table.Header';

const Cell = forwardRef<HTMLTableCellElement, TableCellProps>(({ align = 'left', className, ...props }, ref) => (
  <td
    ref={ref}
    className={[styles.cell, styles[`align-${align}`], className].filter(Boolean).join(' ')}
    {...props}
  />
));
Cell.displayName = 'Table.Cell';

export const Table = Object.assign(TableRoot, {
  Head,
  Body,
  Row,
  Header,
  Cell,
});
