import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from './flex';

const meta = {
  title: 'Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['row', 'column'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between', 'around'] },
    gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] },
  },
  args: { direction: 'row', align: 'center', justify: 'start', gap: 'md' },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ label }: { label: string }) => (
  <div style={{
    background: 'var(--color-primary-soft)',
    border: '1px solid var(--color-primary)',
    borderRadius: 'var(--radius-sm)',
    padding: '8px 16px',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-primary)',
  }}>
    {label}
  </div>
);

export const Row: Story = {
  render: (args) => (
    <Flex {...args}>
      <Box label="One" />
      <Box label="Two" />
      <Box label="Three" />
    </Flex>
  ),
};

export const Column: Story = {
  args: { direction: 'column', align: 'start' },
  render: (args) => (
    <Flex {...args}>
      <Box label="One" />
      <Box label="Two" />
      <Box label="Three" />
    </Flex>
  ),
};

export const AllGaps: Story = {
  render: () => (
    <Flex direction="column" gap="lg" align="start">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map(gap => (
        <Flex key={gap} gap={gap} align="center">
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', minWidth: 28 }}>
            {gap}
          </span>
          <Box label="A" />
          <Box label="B" />
          <Box label="C" />
        </Flex>
      ))}
    </Flex>
  ),
};

export const JustifyVariants: Story = {
  render: () => (
    <Flex direction="column" gap="md" align="stretch">
      {(['start', 'center', 'end', 'between', 'around'] as const).map(justify => (
        <div key={justify}>
          <p style={{ margin: '0 0 4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            justify="{justify}"
          </p>
          <Flex justify={justify} gap="sm" style={{ border: '1px dashed var(--color-border)', padding: 8, borderRadius: 'var(--radius-sm)' }}>
            <Box label="A" />
            <Box label="B" />
            <Box label="C" />
          </Flex>
        </div>
      ))}
    </Flex>
  ),
};
