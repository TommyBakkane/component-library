import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './link';

const meta = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    children: 'Click here',
    href: '#',
    variant: 'default',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'danger'],
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Muted: Story = {
  args: { variant: 'muted' },
};

export const Danger: Story = {
  args: { variant: 'danger' },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Link {...args} variant="default">Default</Link>
      <Link {...args} variant="muted">Muted</Link>
      <Link {...args} variant="danger">Danger</Link>
    </div>
  ),
};
