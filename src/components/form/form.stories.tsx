import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from './form';
import { Input } from '../input/input';
import { Button } from '../button/button';

const meta = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    gap: 'lg',
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Form {...args} onSubmit={(e) => e.preventDefault()} style={{ maxWidth: 400 }}>
      <Input.Field>
        <Input.Label>Email</Input.Label>
        <Input type="email" placeholder="you@example.com" />
      </Input.Field>
      <Input.Field>
        <Input.Label>Password</Input.Label>
        <Input type="password" placeholder="••••••••" />
      </Input.Field>
      <Button type="submit" variant="primary">Sign in</Button>
    </Form>
  ),
};
