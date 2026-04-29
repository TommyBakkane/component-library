import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './dropdown';
import { Button } from '../button/button';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="6" y="6" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 6V4a1 1 0 00-1-1H3a1 1 0 00-1 1v6a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 4h10M6 4V3h4v1M5 4v8a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button>Options</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>View</Dropdown.Item>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Duplicate</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item disabled>Archive</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button>Actions</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item icon={<EditIcon />}>Edit</Dropdown.Item>
        <Dropdown.Item icon={<CopyIcon />}>Duplicate</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item icon={<TrashIcon />} variant="danger">Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const OnIconButton: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <button
          type="button"
          style={{
            background: 'none',
            border: '1px solid var(--color-border)',
            borderRadius: 6,
            padding: '6px 8px',
            cursor: 'pointer',
            display: 'flex',
          }}
          aria-label="More options"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="8" cy="3" r="1.25" />
            <circle cx="8" cy="8" r="1.25" />
            <circle cx="8" cy="13" r="1.25" />
          </svg>
        </button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Duplicate</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item variant="danger">Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};
