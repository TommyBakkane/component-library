import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';

const Dot = () => (
  <span
    style={{
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor',
      display: 'inline-block',
    }}
  />
);

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'info', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    children: { control: 'text' },
  },
  args: {
    children: 'Badge',
    color: 'primary',
    size: 'medium',
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: { color: 'primary' },
};

export const Success: Story = {
  args: { color: 'success' },
};

export const Warning: Story = {
  args: { color: 'warning' },
};

export const Info: Story = {
  args: { color: 'info' },
};

export const Danger: Story = {
  args: { color: 'danger' },
};

export const Small: Story = {
  args: { size: 'small' },
};

export const WithLeftIcon: Story = {
  args: { leftIcon: <Dot /> },
};

export const WithRightIcon: Story = {
  args: { rightIcon: <Dot /> },
};

export const AllColors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Badge {...args} color="primary">
        Primary
      </Badge>
      <Badge {...args} color="success">
        Success
      </Badge>
      <Badge {...args} color="warning">
        Warning
      </Badge>
      <Badge {...args} color="info">
        Info
      </Badge>
      <Badge {...args} color="danger">
        Danger
      </Badge>
    </div>
  ),
};
