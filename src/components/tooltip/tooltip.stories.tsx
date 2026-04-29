import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './tooltip';
import { Button } from '../button/button';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    content: { control: 'text' },
  },
  args: {
    content: 'Tooltip text',
    placement: 'top',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: 48, display: 'flex', justifyContent: 'center' }}>
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 32, padding: 80, justifyContent: 'center', alignItems: 'center' }}>
      <div />
      <Tooltip content="Top" placement="top"><Button>Top</Button></Tooltip>
      <div />
      <Tooltip content="Left" placement="left"><Button>Left</Button></Tooltip>
      <div />
      <Tooltip content="Right" placement="right"><Button>Right</Button></Tooltip>
      <div />
      <Tooltip content="Bottom" placement="bottom"><Button>Bottom</Button></Tooltip>
      <div />
    </div>
  ),
};

export const OnIconButtons: Story = {
  render: () => (
    <div style={{ padding: 48, display: 'flex', gap: 12, justifyContent: 'center' }}>
      <Tooltip content="Delete">
        <button type="button" style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: 6, padding: '6px 8px', cursor: 'pointer', display: 'flex' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 4h10M6 4V3h4v1M5 4v8a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Edit">
        <button type="button" style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: 6, padding: '6px 8px', cursor: 'pointer', display: 'flex' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Duplicate">
        <button type="button" style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: 6, padding: '6px 8px', cursor: 'pointer', display: 'flex' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="6" y="6" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 6V4a1 1 0 00-1-1H3a1 1 0 00-1 1v6a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
};
