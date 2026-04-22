import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './empty';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
  args: {
    title: 'Nothing here yet',
    description: '',
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your filters or search query.',
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'Empty state',
  },
};

export const LongText: Story = {
  args: {
    title: 'No data available in this section',
    description:
      'We couldn’t find any matching records. This might be because nothing has been added yet or your filters are too strict.',
  },
};

export const InContext: Story = {
  render: (args) => (
    <div
      style={{
        width: 400,
        height: 300,
        border: '1px solid #eee',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <EmptyState {...args} />
    </div>
  ),
};

export const WithActionContext: Story = {
  render: (args) => (
    <div
      style={{
        width: 400,
        height: 300,
        border: '1px solid #eee',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      }}
    >
      <EmptyState
        {...args}
        title="No projects yet"
        description="Create your first project to get started."
      />
    </div>
  ),
};
