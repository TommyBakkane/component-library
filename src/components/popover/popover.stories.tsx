import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover } from './popover';
import { Button } from '../button/button';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: 80, display: 'inline-block' }}>
        <Button ref={ref} onClick={() => setOpen(o => !o)}>
          Toggle popover
        </Button>
        <Popover open={open} onClose={() => setOpen(false)} anchorRef={ref}>
          <div style={{ padding: 'var(--spacing-md)' }}>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
              This is a popover. Click outside or press Escape to close.
            </p>
          </div>
        </Popover>
      </div>
    );
  },
};

export const Placements: Story = {
  render: () => {
    const [placement, setPlacement] = useState<
      'top' | 'bottom' | 'left' | 'right' | 'bottom-start' | 'bottom-end' | null
    >(null);
    const refs = {
      top: useRef<HTMLButtonElement>(null),
      bottom: useRef<HTMLButtonElement>(null),
      left: useRef<HTMLButtonElement>(null),
      right: useRef<HTMLButtonElement>(null),
      'bottom-start': useRef<HTMLButtonElement>(null),
      'bottom-end': useRef<HTMLButtonElement>(null),
    };
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 80 }}>
        {(Object.keys(refs) as Array<keyof typeof refs>).map(p => (
          <Button
            key={p}
            ref={refs[p]}
            variant="secondary"
            onClick={() => setPlacement(prev => (prev === p ? null : p))}
          >
            {p}
          </Button>
        ))}
        {placement && (
          <Popover
            open
            onClose={() => setPlacement(null)}
            anchorRef={refs[placement]}
            placement={placement}
          >
            <div style={{ padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)' }}>
              Placed: <strong>{placement}</strong>
            </div>
          </Popover>
        )}
      </div>
    );
  },
};

export const UserCard: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: 80, display: 'inline-block' }}>
        <Button ref={ref} variant="ghost" onClick={() => setOpen(o => !o)}>
          Tommy Bakkane ▾
        </Button>
        <Popover open={open} onClose={() => setOpen(false)} anchorRef={ref} placement="bottom-end">
          <div style={{ padding: 'var(--spacing-lg)', minWidth: 200 }}>
            <p style={{ margin: '0 0 4px', fontWeight: 500 }}>Tommy Bakkane</p>
            <p style={{ margin: '0 0 12px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              tommy.bakkane@apriil.no
            </p>
            <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '0 0 12px' }} />
            <button
              type="button"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 'var(--font-size-sm)', color: 'var(--color-danger)' }}
              onClick={() => setOpen(false)}
            >
              Sign out
            </button>
          </div>
        </Popover>
      </div>
    );
  },
};
