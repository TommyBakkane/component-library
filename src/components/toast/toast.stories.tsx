import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider, useToast } from './toast';
import { Button } from '../button/button';

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToastButtons = () => {
  const { success, error, warning, info } = useToast();
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button onClick={() => success('Changes saved successfully.')}>Success</Button>
      <Button onClick={() => error('Something went wrong. Please try again.')}>Error</Button>
      <Button onClick={() => warning('Your session will expire soon.')}>Warning</Button>
      <Button onClick={() => info('A new version is available.')}>Info</Button>
    </div>
  );
};

export const Default: Story = {
  render: () => <ToastButtons />,
};

export const CustomDuration: Story = {
  render: () => {
    const Demo = () => {
      const { toast } = useToast();
      return (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button onClick={() => toast('Disappears in 1.5s', { duration: 1500 })}>
            Short (1.5s)
          </Button>
          <Button onClick={() => toast('Stays until dismissed', { duration: 0 })}>
            Persistent
          </Button>
        </div>
      );
    };
    return <Demo />;
  },
};

export const TopRight: Story = {
  decorators: [
    (Story) => (
      <ToastProvider position="top-right">
        <Story />
      </ToastProvider>
    ),
  ],
  render: () => {
    const Demo = () => {
      const { info } = useToast();
      return <Button onClick={() => info('Top-right toast')}>Show toast</Button>;
    };
    return <Demo />;
  },
};
