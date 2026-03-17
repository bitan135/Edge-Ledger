import SettingsClient from './SettingsClient';

export const metadata = {
  title: 'Settings — SMC Journal',
  description: 'Configure your SMC Journal account, trading profile, and preferences.',
};

export default function SettingsPage() {
  return <SettingsClient />;
}
