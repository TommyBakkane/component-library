import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { OtpInput } from './otp-input';

const meta = {
  title: 'Components/OtpInput',
  component: OtpInput,
  tags: ['autodocs'],
  argTypes: {
    length: { control: { type: 'number', min: 4, max: 8 } },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: { length: 6 },
} satisfies Meta<typeof OtpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <OtpInput {...args} value={value} onChange={setValue} />;
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        <OtpInput {...args} value={value} onChange={setValue} error />
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-danger)' }}>Invalid code. Please try again.</span>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => <OtpInput {...args} value="123456" disabled />,
};
