import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    name: { control: 'text' },
    src: { control: 'text' },
  },
  args: { size: 'md', name: 'Jane Smith' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=47',
    name: 'Jane Smith',
  },
};

export const Placeholder: Story = {
  args: { name: undefined },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar size="xs" name="Jane Smith" />
      <Avatar size="sm" name="Jane Smith" />
      <Avatar size="md" name="Jane Smith" />
      <Avatar size="lg" name="Jane Smith" />
      <Avatar size="xl" name="Jane Smith" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <Avatar.Group>
      <Avatar name="Alice B" />
      <Avatar name="Charlie D" />
      <Avatar name="Eve F" />
      <Avatar src="https://i.pravatar.cc/150?img=12" name="Grace H" />
    </Avatar.Group>
  ),
};

export const GroupWithOverflow: Story = {
  render: () => (
    <Avatar.Group max={3}>
      <Avatar name="Alice B" />
      <Avatar name="Charlie D" />
      <Avatar name="Eve F" />
      <Avatar name="Grace H" />
      <Avatar name="Ivan J" />
    </Avatar.Group>
  ),
};
