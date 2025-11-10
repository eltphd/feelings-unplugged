import { CSSProperties } from 'react';
import PrivacySettings from '@/components/settings/PrivacySettings';
import Layout from '../components/Layout';

type TexturePanelStyle = CSSProperties & {
  '--texture-panel-gradient'?: string;
  '--texture-panel-pattern'?: string;
  '--texture-panel-opacity'?: string;
};

const heroPanelStyle: TexturePanelStyle = {
  '--texture-panel-gradient': 'linear-gradient(135deg, #F5EEE2 0%, #E8DCC8 52%, #D4BFA8 100%)',
  '--texture-panel-pattern':
    'repeating-linear-gradient(118deg, rgba(109,139,138,0.08) 0px, rgba(109,139,138,0.08) 18px, rgba(183,102,79,0.08) 18px, rgba(183,102,79,0.08) 36px)',
};

export default function SettingsPage() {
  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <section className="texture-panel p-8 md:p-10" style={heroPanelStyle}>
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-secondary/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Stewardship
            </span>
            <h1 className="font-serif text-4xl text-neutral leading-tight">Your privacy, your publication rights.</h1>
            <p className="text-neutral/75">
              Everything lives in your scholar studio until you say otherwise. Adjust exports, backups, and safeguards here.
            </p>
          </div>
        </section>

        <section className="glass-card p-8 md:p-10">
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="font-serif text-3xl text-neutral">Control your archive</h2>
            <p className="text-neutral/70">
              Decide what stays on-device, what gets saved elsewhere, and how to reset if you need to clear the slate.
            </p>
          </div>
          <PrivacySettings />
        </section>
      </div>
    </Layout>
  );
}

