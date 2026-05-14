import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page } from './page';
import { Card } from '../../components/card/card';
import { Button } from '../../components/button/button';

const meta = {
  title: 'Layout/Page',
  component: Page,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'radio',
      options: ['start', 'center'],
    },
  },
  args: {
    align: 'start',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Page>
      <Card style={{ maxWidth: 480 }}>
        <Card.Header>Page — start</Card.Header>
        <Card.Body>Content sits at the top.</Card.Body>
      </Card>
    </Page>
  ),
};

export const Centered: Story = {
  render: () => (
    <Page align="center">
      <Card style={{ width: '100%', maxWidth: 400 }}>
        <Card.Header>Sign in</Card.Header>
        <Card.Body style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--color-text-muted)' }}>
            Centered layout for auth pages.
          </p>
          <Button variant="primary">Continue</Button>
        </Card.Body>
      </Card>
    </Page>
  ),
};
