import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './popover.module.css';

export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'right';

export interface PopoverProps {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
  placement?: PopoverPlacement;
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

function getPosition(anchor: DOMRect, placement: PopoverPlacement, gap = 6) {
  const mid = { x: anchor.left + anchor.width / 2, y: anchor.top + anchor.height / 2 };
  switch (placement) {
    case 'bottom':       return { top: anchor.bottom + gap, left: mid.x };
    case 'bottom-start': return { top: anchor.bottom + gap, left: anchor.left };
    case 'bottom-end':   return { top: anchor.bottom + gap, left: anchor.right };
    case 'top':          return { top: anchor.top - gap,    left: mid.x };
    case 'top-start':    return { top: anchor.top - gap,    left: anchor.left };
    case 'top-end':      return { top: anchor.top - gap,    left: anchor.right };
    case 'left':         return { top: mid.y,               left: anchor.left - gap };
    case 'right':        return { top: mid.y,               left: anchor.right + gap };
  }
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ open, onClose, anchorRef, placement = 'bottom-start', children, className, 'aria-label': ariaLabel }, ref) => {
    const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const setRefs = useCallback(
      (el: HTMLDivElement | null) => {
        popoverRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      },
      [ref]
    );

    useEffect(() => {
      if (!open || !anchorRef.current) return;
      setPos(getPosition(anchorRef.current.getBoundingClientRect(), placement));
    }, [open, anchorRef, placement]);

    useEffect(() => {
      if (!open) return;
      const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
      const handleMouse = (e: MouseEvent) => {
        if (
          !popoverRef.current?.contains(e.target as Node) &&
          !anchorRef.current?.contains(e.target as Node)
        ) {
          onClose();
        }
      };
      document.addEventListener('keydown', handleKey);
      document.addEventListener('mousedown', handleMouse);
      return () => {
        document.removeEventListener('keydown', handleKey);
        document.removeEventListener('mousedown', handleMouse);
      };
    }, [open, onClose, anchorRef]);

    if (!open || !pos) return null;

    return createPortal(
      <div
        ref={setRefs}
        role="dialog"
        aria-modal="false"
        aria-label={ariaLabel}
        data-placement={placement}
        className={[styles.popover, className].filter(Boolean).join(' ')}
        style={{ top: pos.top, left: pos.left }}
      >
        {children}
      </div>,
      document.body
    );
  }
);
Popover.displayName = 'Popover';
