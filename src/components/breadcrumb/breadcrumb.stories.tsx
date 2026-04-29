import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './breadcrumb';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item><a href="#">Home</a></Breadcrumb.Item>
      <Breadcrumb.Item><a href="#">Settings</a></Breadcrumb.Item>
      <Breadcrumb.Item current>Profile</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const Short: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item><a href="#">Home</a></Breadcrumb.Item>
      <Breadcrumb.Item current>Dashboard</Breadcrumb.Item>
    </Breadcrumb>
  ),
};

export const Long: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item><a href="#">Home</a></Breadcrumb.Item>
      <Breadcrumb.Item><a href="#">Organisation</a></Breadcrumb.Item>
      <Breadcrumb.Item><a href="#">Projects</a></Breadcrumb.Item>
      <Breadcrumb.Item><a href="#">Component Library</a></Breadcrumb.Item>
      <Breadcrumb.Item current>Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>
  ),
};
