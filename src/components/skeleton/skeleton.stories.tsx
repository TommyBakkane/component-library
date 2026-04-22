import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Skeleton,
  SkeletonLine,
  SkeletonAvatar,
  SkeletonText,
  SkeletonCard,
} from './skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 200, height: 16 }}>
      <Skeleton />
    </div>
  ),
};

export const Text: Story = {
  render: () => <SkeletonText lines={3} />,
};

export const Card: Story = {
  render: () => <SkeletonCard />,
};

export const Avatar: Story = {
  render: () => <SkeletonAvatar />,
};

export const Line: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SkeletonLine width="80%" />
      <SkeletonLine width="95%" />
      <SkeletonLine width="60%" />
    </div>
  ),
};

export const LayoutExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center',
      }}
    >
      <SkeletonAvatar />

      <div
        style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}
      >
        <SkeletonLine width="70%" />
        <SkeletonLine width="90%" />
      </div>
    </div>
  ),
};
