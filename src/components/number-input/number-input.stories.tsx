import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberInput } from './number-input';

const meta = {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NumberInput.Field>
      <NumberInput.Label>Quantity</NumberInput.Label>
      <NumberInput defaultValue={1} min={0} max={99} />
    </NumberInput.Field>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(5);
    return (
      <NumberInput.Field>
        <NumberInput.Label>Count</NumberInput.Label>
        <NumberInput value={value} onChange={setValue} min={0} max={10} />
        <NumberInput.Hint>Value: {value}</NumberInput.Hint>
      </NumberInput.Field>
    );
  },
};

export const WithStep: Story = {
  render: () => (
    <NumberInput.Field>
      <NumberInput.Label>Price (step 0.5)</NumberInput.Label>
      <NumberInput defaultValue={10} step={0.5} min={0} />
      <NumberInput.Hint>Increments by 0.5</NumberInput.Hint>
    </NumberInput.Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <NumberInput.Field error="Value must be between 1 and 100">
      <NumberInput.Label>Percentage</NumberInput.Label>
      <NumberInput defaultValue={0} min={1} max={100} />
      <NumberInput.Error />
    </NumberInput.Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <NumberInput.Field disabled>
      <NumberInput.Label>Locked value</NumberInput.Label>
      <NumberInput defaultValue={42} />
    </NumberInput.Field>
  ),
};
