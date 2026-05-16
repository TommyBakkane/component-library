import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './container';

const meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
  args: { size: 'lg' },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ label, maxWidth }: { label: string; maxWidth: string }) => (
  <div style={{ background: 'var(--color-primary-soft)', borderRadius: 'var(--radius-sm)', padding: 'var(--spacing-lg)', color: 'var(--color-primary)', fontSize: 'var(--font-size-sm)' }}>
    {label} — max-width: {maxWidth}
  </div>
);

export const Small: Story = {
  render: () => (
    <Container size="sm">
      <Box label="Small container" maxWidth="640px" />
    </Container>
  ),
};

export const Medium: Story = {
  render: () => (
    <Container size="md">
      <Box label="Medium container" maxWidth="960px" />
    </Container>
  ),
};

export const Large: Story = {
  render: () => (
    <Container size="lg">
      <Box label="Large container" maxWidth="1200px" />
    </Container>
  ),
};
