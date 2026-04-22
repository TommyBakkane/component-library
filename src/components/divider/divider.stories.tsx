import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
  },
  args: {
    label: '',
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Divider />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: 'OR',
  },
  render: (args) => (
    <div style={{ width: 300 }}>
      <Divider {...args} />
    </div>
  ),
};

export const WithLongLabel: Story = {
  args: {
    label: 'Continue with email',
  },
  render: (args) => (
    <div style={{ width: 300 }}>
      <Divider {...args} />
    </div>
  ),
};

export const InLayout: Story = {
  render: () => (
    <div
      style={{
        width: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <button>Primary Action</button>

      <Divider label="OR" />

      <button>Secondary Action</button>
    </div>
  ),
};

export const NoLabelWide: Story = {
  render: () => (
    <div style={{ width: '100%' }}>
      <Divider />
    </div>
  ),
};
