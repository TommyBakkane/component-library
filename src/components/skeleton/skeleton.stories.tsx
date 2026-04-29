import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    image: { control: 'boolean' },
    avatar: { control: 'boolean' },
    lines: { control: { type: 'number', min: 0, max: 10 } },
  },
  args: {
    image: false,
    avatar: false,
    lines: 0,
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 300, height: 60 }}>
      <Skeleton {...args} />
    </div>
  ),
};
