import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
    },
  },
  args: { children: 'React', variant: 'default' },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Tag variant="default">Default</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="danger">Danger</Tag>
      <Tag variant="info">Info</Tag>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'CSS Modules', 'Storybook']);
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {tags.map(tag => (
          <Tag
            key={tag}
            variant="primary"
            onDismiss={() => setTags(prev => prev.filter(t => t !== tag))}
          >
            {tag}
          </Tag>
        ))}
      </div>
    );
  },
};

export const WithDismiss: Story = {
  args: { children: 'Remove me', onDismiss: () => {} },
};
