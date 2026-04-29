import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';

const meta = {
  title: 'Components/Input',
  component: Input.Field,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outside', 'on-line', 'inside'],
    },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'outside',
    error: '',
    disabled: false,
  },
} satisfies Meta<typeof Input.Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Input.Field {...args} error={args.error || undefined}>
      <Input.Label>Email</Input.Label>
      <Input type="email" placeholder="you@example.com" />
      <Input.Hint>We'll never share your email.</Input.Hint>
      <Input.Error />
    </Input.Field>
  ),
};

export const OnLine: Story = {
  args: { variant: 'on-line' },
  render: (args) => (
    <Input.Field {...args} error={args.error || undefined}>
      <Input.Label>Email</Input.Label>
      <Input type="email" placeholder="you@example.com" />
      <Input.Error />
    </Input.Field>
  ),
};

export const Inside: Story = {
  args: { variant: 'inside' },
  render: (args) => (
    <Input.Field {...args} error={args.error || undefined}>
      <Input.Label>Email</Input.Label>
      <Input type="email" placeholder="you@example.com" />
      <Input.Error />
    </Input.Field>
  ),
};

export const WithError: Story = {
  args: { error: 'This field is required' },
  render: (args) => (
    <Input.Field {...args}>
      <Input.Label>Email</Input.Label>
      <Input type="email" placeholder="you@example.com" />
      <Input.Error />
    </Input.Field>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Input.Field {...args} error={args.error || undefined}>
      <Input.Label>Email</Input.Label>
      <Input type="email" defaultValue="user@example.com" />
      <Input.Hint>We'll never share your email.</Input.Hint>
      <Input.Error />
    </Input.Field>
  ),
};

export const Required: Story = {
  render: (args) => (
    <Input.Field {...args} error={args.error || undefined}>
      <Input.Label>Email *</Input.Label>
      <Input type="email" placeholder="you@example.com" required />
      <Input.Error />
    </Input.Field>
  ),
};

export const WithHint: Story = {
  render: (args) => (
    <Input.Field {...args} error={args.error || undefined}>
      <Input.Label>Password</Input.Label>
      <Input type="password" placeholder="••••••••" />
      <Input.Hint>At least 8 characters, one number, one symbol.</Input.Hint>
      <Input.Error />
    </Input.Field>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
      <Input.Field variant="outside">
        <Input.Label>Outside label</Input.Label>
        <Input placeholder="Outside variant" />
      </Input.Field>
      <Input.Field variant="on-line">
        <Input.Label>On-line label</Input.Label>
        <Input placeholder="On-line variant" />
      </Input.Field>
      <Input.Field variant="inside">
        <Input.Label>Inside label</Input.Label>
        <Input placeholder="Inside variant" />
      </Input.Field>
    </div>
  ),
};

export const ErrorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
      <Input.Field variant="outside" error="This field is required">
        <Input.Label>Outside error</Input.Label>
        <Input placeholder="Outside variant" />
        <Input.Error />
      </Input.Field>
      <Input.Field variant="on-line" error="This field is required">
        <Input.Label>On-line error</Input.Label>
        <Input placeholder="On-line variant" />
        <Input.Error />
      </Input.Field>
      <Input.Field variant="inside" error="This field is required">
        <Input.Label>Inside error</Input.Label>
        <Input placeholder="Inside variant" />
        <Input.Error />
      </Input.Field>
    </div>
  ),
};
