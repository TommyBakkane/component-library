import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from './theme-provider';
import { Button } from '../components/button/button';
import { Card } from '../components/card/card';
import { Badge } from '../components/badge/badge';

const meta = {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  args: {
    theme: {},
    children: null,
  },
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ThemeProvider theme={{}}>
      <Card style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
        <Card.Header>Default theme</Card.Header>
        <Card.Body>
          <Button variant="primary">Primary</Button>
        </Card.Body>
      </Card>
    </ThemeProvider>
  ),
};

export const CustomBrand: Story = {
  render: () => (
    <ThemeProvider
      theme={{
        color: {
          primary: '#7c3aed',
          onPrimary: '#ffffff',
          primarySoft: '#ede9fe',
        },
        radius: {
          xs: '2px',
          sm: '3px',
          md: '4px',
          lg: '6px',
          xl: '8px',
          full: '9999px',
        },
      }}
    >
      <Card style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
        <Card.Header>Violet brand, sharp radius</Card.Header>
        <Card.Body style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Badge color="primary">Badge</Badge>
        </Card.Body>
      </Card>
    </ThemeProvider>
  ),
};

export const MultipleThemes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <ThemeProvider theme={{ color: { primary: '#16a34a', primarySoft: '#dcfce7' } }}>
        <Card style={{ padding: 24, width: 220 }}>
          <Card.Header>Green theme</Card.Header>
          <Card.Body>
            <Button variant="primary">Action</Button>
          </Card.Body>
        </Card>
      </ThemeProvider>
      <ThemeProvider theme={{ color: { primary: '#dc2626', primarySoft: '#fee2e2' } }}>
        <Card style={{ padding: 24, width: 220 }}>
          <Card.Header>Red theme</Card.Header>
          <Card.Body>
            <Button variant="primary">Action</Button>
          </Card.Body>
        </Card>
      </ThemeProvider>
    </div>
  ),
};
