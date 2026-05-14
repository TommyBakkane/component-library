import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer } from './drawer';
import { Button } from '../button/button';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Drawer.Header>Account settings</Drawer.Header>
          <Drawer.Body>
            <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
              Drawer content goes here. This panel slides in from the right and traps focus
              while open.
            </p>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save changes</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

export const LeftSide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open left drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} side="left">
          <Drawer.Header>Navigation</Drawer.Header>
          <Drawer.Body>
            <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
              Side navigation or filter panel.
            </p>
          </Drawer.Body>
        </Drawer>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | null>(null);
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        {(['sm', 'md', 'lg'] as const).map(s => (
          <Button key={s} variant="outline" onClick={() => setSize(s)}>
            {s.toUpperCase()}
          </Button>
        ))}
        {size && (
          <Drawer open onClose={() => setSize(null)} size={size}>
            <Drawer.Header>Size: {size}</Drawer.Header>
            <Drawer.Body>
              <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
                This is a <strong>{size}</strong> drawer.
              </p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button onClick={() => setSize(null)}>Close</Button>
            </Drawer.Footer>
          </Drawer>
        )}
      </div>
    );
  },
};
