import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion style={{ maxWidth: 560 }}>
      <Accordion.Item value="what" title="What is this component library?">
        A collection of accessible, reusable React components built with CSS Modules and design tokens.
        Each component follows consistent patterns for styling and behavior.
      </Accordion.Item>
      <Accordion.Item value="how" title="How do I install it?">
        Install from GitHub Packages using npm. Import the CSS once at the root of your app, then
        import components as needed.
      </Accordion.Item>
      <Accordion.Item value="tokens" title="Can I customise the design tokens?">
        Yes — all visual values are CSS custom properties. Override them on :root or on any containing
        element to theme components locally or globally.
      </Accordion.Item>
    </Accordion>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Accordion defaultValue="what" style={{ maxWidth: 560 }}>
      <Accordion.Item value="what" title="What is this component library?">
        A collection of accessible, reusable React components built with CSS Modules and design tokens.
      </Accordion.Item>
      <Accordion.Item value="how" title="How do I install it?">
        Install from GitHub Packages using npm.
      </Accordion.Item>
      <Accordion.Item value="tokens" title="Can I customise the design tokens?">
        Yes — all visual values are CSS custom properties.
      </Accordion.Item>
    </Accordion>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Accordion style={{ maxWidth: 560 }}>
      <Accordion.Item value="a" title="Available">
        This item can be expanded and collapsed.
      </Accordion.Item>
      <Accordion.Item value="b" title="Disabled" disabled>
        This content is not reachable.
      </Accordion.Item>
      <Accordion.Item value="c" title="Also available">
        This item can also be expanded.
      </Accordion.Item>
    </Accordion>
  ),
};
