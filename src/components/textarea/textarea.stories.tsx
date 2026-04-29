import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Textarea.Field>
      <Textarea.Label>Message</Textarea.Label>
      <Textarea placeholder="Write something..." />
    </Textarea.Field>
  ),
};

export const WithHint: Story = {
  render: () => (
    <Textarea.Field>
      <Textarea.Label>Bio</Textarea.Label>
      <Textarea placeholder="Tell us about yourself..." />
      <Textarea.Hint>Max 500 characters.</Textarea.Hint>
    </Textarea.Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Textarea.Field error="Message cannot be empty.">
      <Textarea.Label>Message</Textarea.Label>
      <Textarea placeholder="Write something..." />
      <Textarea.Error />
    </Textarea.Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Textarea.Field disabled>
      <Textarea.Label>Notes</Textarea.Label>
      <Textarea value="This field is locked." readOnly />
    </Textarea.Field>
  ),
};

export const NoResize: Story = {
  render: () => (
    <Textarea.Field>
      <Textarea.Label>Fixed height</Textarea.Label>
      <Textarea resize="none" placeholder="This textarea cannot be resized." />
    </Textarea.Field>
  ),
};

export const OnLine: Story = {
  render: () => (
    <Textarea.Field variant="on-line">
      <Textarea.Label>Message</Textarea.Label>
      <Textarea placeholder="Write something..." />
    </Textarea.Field>
  ),
};

export const Inside: Story = {
  render: () => (
    <Textarea.Field variant="inside">
      <Textarea.Label>Message</Textarea.Label>
      <Textarea placeholder="Write something..." />
    </Textarea.Field>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 360 }}>
      <Textarea.Field>
        <Textarea.Label>Default</Textarea.Label>
        <Textarea placeholder="Write something..." />
      </Textarea.Field>

      <Textarea.Field>
        <Textarea.Label>With hint</Textarea.Label>
        <Textarea placeholder="Describe your use case..." />
        <Textarea.Hint>Be as specific as possible.</Textarea.Hint>
      </Textarea.Field>

      <Textarea.Field error="This field is required.">
        <Textarea.Label>With error</Textarea.Label>
        <Textarea placeholder="Write something..." />
        <Textarea.Error />
      </Textarea.Field>

      <Textarea.Field disabled>
        <Textarea.Label>Disabled</Textarea.Label>
        <Textarea placeholder="Unavailable..." />
      </Textarea.Field>
    </div>
  ),
};
