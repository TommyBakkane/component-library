import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="activity">Activity</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">
        <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Overview content goes here.</p>
      </Tabs.Panel>
      <Tabs.Panel value="activity">
        <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Recent activity feed.</p>
      </Tabs.Panel>
      <Tabs.Panel value="settings">
        <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Settings panel.</p>
      </Tabs.Panel>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <Tabs.List>
        <Tabs.Tab value="account">Account</Tabs.Tab>
        <Tabs.Tab value="billing">Billing</Tabs.Tab>
        <Tabs.Tab value="team" disabled>Team (Pro)</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="account">
        <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Account settings.</p>
      </Tabs.Panel>
      <Tabs.Panel value="billing">
        <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Billing information.</p>
      </Tabs.Panel>
    </Tabs>
  ),
};

export const ManyTabs: Story = {
  render: () => {
    const tabs = ['General', 'Security', 'Notifications', 'Integrations', 'Advanced'];
    return (
      <Tabs defaultValue="General">
        <Tabs.List>
          {tabs.map(t => <Tabs.Tab key={t} value={t}>{t}</Tabs.Tab>)}
        </Tabs.List>
        {tabs.map(t => (
          <Tabs.Panel key={t} value={t}>
            <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>{t} settings.</p>
          </Tabs.Panel>
        ))}
      </Tabs>
    );
  },
};
