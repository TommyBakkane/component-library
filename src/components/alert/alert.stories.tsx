import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['success', 'error', 'warning', 'info'] },
    title: { control: 'text' },
  },
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational message.',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Changes saved',
    children: 'Your profile has been updated successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Approaching limit',
    children: "You've used 90% of your storage quota.",
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Something went wrong',
    children: 'Failed to save changes. Please try again.',
  },
};

export const TitleOnly: Story = {
  args: { title: 'Session will expire in 5 minutes.', children: undefined },
};

export const WithDismiss: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    if (!visible) {
      return (
        <button type="button" onClick={() => setVisible(true)}>
          Show alert
        </button>
      );
    }
    return (
      <Alert
        variant="info"
        title="New feature available"
        onDismiss={() => setVisible(false)}
      >
        Check out the redesigned dashboard in settings.
      </Alert>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Alert variant="success" title="Success">Operation completed successfully.</Alert>
      <Alert variant="error" title="Error">Something went wrong. Please try again.</Alert>
      <Alert variant="warning" title="Warning">This action cannot be undone.</Alert>
      <Alert variant="info" title="Info">Your subscription renews in 3 days.</Alert>
    </div>
  ),
};
