import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    label: { control: 'text' },
    hint: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Option',
    size: 'md',
    disabled: false,
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const WithHint: Story = {
  args: {
    label: 'Weekly digest',
    hint: 'One email every Monday morning.',
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Group: Story = {
  render: () => (
    <Radio.Group label="Notification frequency">
      <Radio name="freq" value="realtime" label="Real-time" hint="Notify me as soon as something happens." />
      <Radio name="freq" value="daily" label="Daily digest" hint="One summary email per day." />
      <Radio name="freq" value="weekly" label="Weekly digest" hint="One email every Monday morning." />
      <Radio name="freq" value="never" label="Never" />
    </Radio.Group>
  ),
};

export const GroupWithError: Story = {
  render: () => (
    <Radio.Group label="Plan" error="Please select a plan to continue.">
      <Radio name="plan" value="free" label="Free" hint="Up to 3 projects." />
      <Radio name="plan" value="pro" label="Pro — $12/mo" hint="Unlimited projects and collaborators." />
      <Radio name="plan" value="enterprise" label="Enterprise" hint="Custom pricing and SLA." />
    </Radio.Group>
  ),
};

export const HorizontalGroup: Story = {
  render: () => (
    <Radio.Group label="Size">
      <div style={{ display: 'flex', gap: 24 }}>
        <Radio name="size" value="sm" label="Small" />
        <Radio name="size" value="md" label="Medium" />
        <Radio name="size" value="lg" label="Large" />
      </div>
    </Radio.Group>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Radio name="states" value="unchecked" label="Unchecked" />
      <Radio name="states" value="checked" label="Checked" defaultChecked />
      <Radio name="states" value="hint" label="With hint" hint="Some extra context." />
      <Radio name="states" value="disabled" label="Disabled" disabled />
      <Radio name="states" value="disabled-checked" label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};
