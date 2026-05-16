import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Combobox } from './combobox';

const countries = [
  { value: 'no', label: 'Norway' },
  { value: 'se', label: 'Sweden' },
  { value: 'dk', label: 'Denmark' },
  { value: 'fi', label: 'Finland' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
];

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Combobox.Field style={{ maxWidth: 320 }}>
        <Combobox.Label>Country</Combobox.Label>
        <Combobox options={countries} value={value} onChange={setValue} placeholder="Search…" />
      </Combobox.Field>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Combobox.Field error="Please select a country" style={{ maxWidth: 320 }}>
        <Combobox.Label>Country</Combobox.Label>
        <Combobox options={countries} value={value} onChange={setValue} placeholder="Search…" />
        <Combobox.Error />
      </Combobox.Field>
    );
  },
};

export const WithHint: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Combobox.Field style={{ maxWidth: 320 }}>
        <Combobox.Label>Country</Combobox.Label>
        <Combobox options={countries} value={value} onChange={setValue} placeholder="Search…" />
        <Combobox.Hint>Start typing to filter countries.</Combobox.Hint>
      </Combobox.Field>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Combobox.Field style={{ maxWidth: 320 }}>
      <Combobox.Label>Country</Combobox.Label>
      <Combobox options={countries} value="no" placeholder="Search…" disabled />
    </Combobox.Field>
  ),
};
