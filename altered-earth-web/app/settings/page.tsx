import PrivacySettings from '@/components/settings/PrivacySettings';
import Layout from '../components/Layout';

export default function SettingsPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <PrivacySettings />
      </div>
    </Layout>
  );
}

