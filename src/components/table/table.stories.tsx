import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    striped: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
  args: {
    striped: false,
    size: 'md',
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

const people = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active' },
  { name: 'Eva Martinez', email: 'eva@example.com', role: 'Viewer', status: 'Active' },
];

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <Table.Head>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Email</Table.Header>
          <Table.Header>Role</Table.Header>
          <Table.Header>Status</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {people.map((person) => (
          <Table.Row key={person.email}>
            <Table.Cell>{person.name}</Table.Cell>
            <Table.Cell>{person.email}</Table.Cell>
            <Table.Cell>{person.role}</Table.Cell>
            <Table.Cell>{person.status}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const Striped: Story = {
  args: { striped: true },
  render: (args) => (
    <Table {...args}>
      <Table.Head>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Email</Table.Header>
          <Table.Header>Role</Table.Header>
          <Table.Header>Status</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {people.map((person) => (
          <Table.Row key={person.email}>
            <Table.Cell>{person.name}</Table.Cell>
            <Table.Cell>{person.email}</Table.Cell>
            <Table.Cell>{person.role}</Table.Cell>
            <Table.Cell>{person.status}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const Small: Story = {
  args: { size: 'sm' },
  render: (args) => (
    <Table {...args}>
      <Table.Head>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Email</Table.Header>
          <Table.Header>Role</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {people.map((person) => (
          <Table.Row key={person.email}>
            <Table.Cell>{person.name}</Table.Cell>
            <Table.Cell>{person.email}</Table.Cell>
            <Table.Cell>{person.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const WithAlignment: Story = {
  render: (args) => (
    <Table {...args}>
      <Table.Head>
        <Table.Row>
          <Table.Header>Item</Table.Header>
          <Table.Header align="center">Quantity</Table.Header>
          <Table.Header align="right">Price</Table.Header>
          <Table.Header align="right">Total</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {[
          { item: 'Widget A', qty: 4, price: 12.5 },
          { item: 'Widget B', qty: 12, price: 3.99 },
          { item: 'Widget C', qty: 1, price: 149.0 },
        ].map((row) => (
          <Table.Row key={row.item}>
            <Table.Cell>{row.item}</Table.Cell>
            <Table.Cell align="center">{row.qty}</Table.Cell>
            <Table.Cell align="right">${row.price.toFixed(2)}</Table.Cell>
            <Table.Cell align="right">${(row.qty * row.price).toFixed(2)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const Empty: Story = {
  render: (args) => (
    <Table {...args}>
      <Table.Head>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Email</Table.Header>
          <Table.Header>Role</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan={3} align="center" style={{ color: 'var(--color-text-muted)', padding: 'var(--spacing-xl)' }}>
            No results found.
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};

export const Overflow: Story = {
  render: (args) => (
    <div style={{ width: 400 }}>
      <Table {...args}>
        <Table.Head>
          <Table.Row>
            {['ID', 'First Name', 'Last Name', 'Email', 'Department', 'Location', 'Start Date', 'Status'].map((h) => (
              <Table.Header key={h}>{h}</Table.Header>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {[
            ['001', 'Alice', 'Johnson', 'alice@example.com', 'Engineering', 'Oslo', '2021-03-01', 'Active'],
            ['002', 'Bob', 'Smith', 'bob@example.com', 'Marketing', 'Bergen', '2022-07-15', 'Active'],
            ['003', 'Carol', 'White', 'carol@example.com', 'Design', 'Trondheim', '2023-01-10', 'Inactive'],
          ].map((row) => (
            <Table.Row key={row[0]}>
              {row.map((cell, i) => <Table.Cell key={i}>{cell}</Table.Cell>)}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ),
};
