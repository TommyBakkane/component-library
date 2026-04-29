import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        <Pagination page={page} totalPages={10} onChange={setPage} />
        <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Page {page} of 10</span>
      </div>
    );
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(7);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        <Pagination page={page} totalPages={50} onChange={setPage} siblings={2} />
        <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Page {page} of 50</span>
      </div>
    );
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={3} onChange={setPage} />;
  },
};

export const FirstPage: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={12} onChange={setPage} />;
  },
};

export const LastPage: Story = {
  render: () => {
    const [page, setPage] = useState(12);
    return <Pagination page={page} totalPages={12} onChange={setPage} />;
  },
};
