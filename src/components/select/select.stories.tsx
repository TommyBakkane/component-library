import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './select';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select.Field>
      <Select.Label>Country</Select.Label>
      <Select>
        <option value="">Pick a country</option>
        <option value="no">Norway</option>
        <option value="se">Sweden</option>
        <option value="dk">Denmark</option>
        <option value="fi">Finland</option>
      </Select>
    </Select.Field>
  ),
};

export const WithHint: Story = {
  render: () => (
    <Select.Field>
      <Select.Label>Timezone</Select.Label>
      <Select>
        <option value="">Select timezone</option>
        <option value="utc">UTC</option>
        <option value="cet">CET (UTC+1)</option>
        <option value="est">EST (UTC-5)</option>
        <option value="pst">PST (UTC-8)</option>
      </Select>
      <Select.Hint>Used for scheduling notifications.</Select.Hint>
    </Select.Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Select.Field error="Please select a country.">
      <Select.Label>Country</Select.Label>
      <Select>
        <option value="">Pick a country</option>
        <option value="no">Norway</option>
        <option value="se">Sweden</option>
      </Select>
      <Select.Error />
    </Select.Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select.Field disabled>
      <Select.Label>Plan</Select.Label>
      <Select>
        <option value="free">Free</option>
        <option value="pro">Pro</option>
        <option value="enterprise">Enterprise</option>
      </Select>
    </Select.Field>
  ),
};

export const OnLine: Story = {
  render: () => (
    <Select.Field variant="on-line">
      <Select.Label>Country</Select.Label>
      <Select>
        <option value="">Pick a country</option>
        <option value="no">Norway</option>
        <option value="se">Sweden</option>
        <option value="dk">Denmark</option>
      </Select>
    </Select.Field>
  ),
};

export const Inside: Story = {
  render: () => (
    <Select.Field variant="inside">
      <Select.Label>Country</Select.Label>
      <Select>
        <option value="">Pick a country</option>
        <option value="no">Norway</option>
        <option value="se">Sweden</option>
        <option value="dk">Denmark</option>
      </Select>
    </Select.Field>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 360 }}>
      <Select.Field>
        <Select.Label>Default</Select.Label>
        <Select>
          <option value="">Pick one</option>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
        </Select>
      </Select.Field>

      <Select.Field>
        <Select.Label>With hint</Select.Label>
        <Select defaultValue="a">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
        </Select>
        <Select.Hint>Pick the option that best describes you.</Select.Hint>
      </Select.Field>

      <Select.Field error="This field is required.">
        <Select.Label>With error</Select.Label>
        <Select>
          <option value="">Pick one</option>
          <option value="a">Option A</option>
        </Select>
        <Select.Error />
      </Select.Field>

      <Select.Field disabled>
        <Select.Label>Disabled</Select.Label>
        <Select>
          <option value="a">Option A</option>
        </Select>
      </Select.Field>
    </div>
  ),
};
