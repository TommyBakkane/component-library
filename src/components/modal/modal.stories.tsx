import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './modal';
import { Button } from '../button/button';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Modal.Header>
            <span style={{ flex: 1 }}>Dialog title</span>
            <Button variant="ghost" onClick={() => setOpen(false)} aria-label="Close" style={{ padding: '4px' }}>
              <CloseIcon />
            </Button>
          </Modal.Header>
          <Modal.Body>
            <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
              This is the modal body. You can put any content here — forms, images, lists, or other components.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open small modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} size="sm">
          <Modal.Header>
            <span style={{ flex: 1 }}>Confirm deletion</span>
            <Button variant="ghost" onClick={() => setOpen(false)} aria-label="Close" style={{ padding: '4px' }}>
              <CloseIcon />
            </Button>
          </Modal.Header>
          <Modal.Body>
            <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open large modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} size="lg">
          <Modal.Header>
            <span style={{ flex: 1 }}>Terms of service</span>
            <Button variant="ghost" onClick={() => setOpen(false)} aria-label="Close" style={{ padding: '4px' }}>
              <CloseIcon />
            </Button>
          </Modal.Header>
          <Modal.Body>
            {Array.from({ length: 8 }, (_, i) => (
              <p key={i} style={{ marginTop: 0, marginBottom: 12, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setOpen(false)}>Decline</Button>
            <Button onClick={() => setOpen(false)}>Accept</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};
