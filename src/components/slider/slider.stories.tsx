import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Slider.Field>
      <Slider.Label>Volume</Slider.Label>
      <Slider defaultValue={50} />
    </Slider.Field>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(30);
    return (
      <Slider.Field>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Slider.Label>Brightness</Slider.Label>
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            {value}%
          </span>
        </div>
        <Slider value={value} onChange={setValue} />
        <Slider.Hint>Adjust display brightness</Slider.Hint>
      </Slider.Field>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Slider.Field>
        <Slider.Label>Small</Slider.Label>
        <Slider defaultValue={40} size="sm" />
      </Slider.Field>
      <Slider.Field>
        <Slider.Label>Medium</Slider.Label>
        <Slider defaultValue={60} size="md" />
      </Slider.Field>
      <Slider.Field>
        <Slider.Label>Large</Slider.Label>
        <Slider defaultValue={80} size="lg" />
      </Slider.Field>
    </div>
  ),
};

export const WithStep: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <Slider.Field>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Slider.Label>Rating</Slider.Label>
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            {value} / 10
          </span>
        </div>
        <Slider value={value} onChange={setValue} min={0} max={10} step={1} />
      </Slider.Field>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Slider.Field disabled>
      <Slider.Label>Locked</Slider.Label>
      <Slider defaultValue={65} />
    </Slider.Field>
  ),
};
