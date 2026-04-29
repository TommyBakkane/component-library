import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    shadow: { control: 'select', options: ['none', 'sm', 'md'] },
  },
  args: { shadow: 'sm' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <Card.Body>Simple card with just a body.</Card.Body>
    </Card>
  ),
};

export const WithSections: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <Card.Header>Card title</Card.Header>
      <Card.Body>
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 14, lineHeight: 1.6 }}>
          Card content goes here. You can put any content inside the body — text, forms, lists, or other components.
        </p>
      </Card.Body>
      <Card.Footer>
        <button type="button">Secondary</button>
        <button type="button">Primary</button>
      </Card.Footer>
    </Card>
  ),
};

export const MediumShadow: Story = {
  args: { shadow: 'md' },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <Card.Header>Elevated card</Card.Header>
      <Card.Body>This card has a medium shadow for higher visual elevation.</Card.Body>
    </Card>
  ),
};

export const NoShadow: Story = {
  args: { shadow: 'none' },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <Card.Body>Card with no shadow — border only.</Card.Body>
    </Card>
  ),
};

export const AllShadows: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['none', 'sm', 'md'] as const).map(shadow => (
        <Card key={shadow} shadow={shadow} style={{ width: 200 }}>
          <Card.Body>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-muted)' }}>shadow="{shadow}"</p>
          </Card.Body>
        </Card>
      ))}
    </div>
  ),
};
