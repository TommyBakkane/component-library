import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './grid';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    cols: { control: 'number' },
    gap: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    minColWidth: { control: 'text' },
  },
  args: { cols: 3, gap: 'sm' },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ label }: { label: string }) => (
  <div style={{
    background: 'var(--color-primary-soft)',
    border: '1px solid var(--color-primary)',
    borderRadius: 'var(--radius-sm)',
    padding: 16,
    textAlign: 'center',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-primary)',
  }}>
    {label}
  </div>
);

export const Fixed: Story = {
  args: { cols: 3 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => <Box key={i} label={`Item ${i + 1}`} />)}
    </Grid>
  ),
};

export const AutoFill: Story = {
  args: { cols: undefined, minColWidth: '160px', gap: 'md' },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 8 }, (_, i) => <Box key={i} label={`Item ${i + 1}`} />)}
    </Grid>
  ),
};

export const AllGaps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(gap => (
        <div key={gap}>
          <p style={{ margin: '0 0 4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            gap="{gap}"
          </p>
          <Grid cols={4} gap={gap}>
            {Array.from({ length: 4 }, (_, i) => <Box key={i} label={`${i + 1}`} />)}
          </Grid>
        </div>
      ))}
    </div>
  ),
};
