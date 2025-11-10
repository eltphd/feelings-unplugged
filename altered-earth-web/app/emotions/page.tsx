'use client';

import { CSSProperties, useState } from 'react';
import EmotionCheckIn from '@/components/emotions/EmotionCheckIn';
import Layout from '../components/Layout';
import Toast from '../components/Toast';
import { JournalEntry } from '@/types';

type TexturePanelStyle = CSSProperties & {
  '--texture-panel-gradient'?: string;
  '--texture-panel-pattern'?: string;
  '--texture-panel-opacity'?: string;
};

const heroPanelStyle: TexturePanelStyle = {
  '--texture-panel-gradient': 'linear-gradient(135deg, #F7F1E4 0%, #E9DCCA 52%, #D3C3AE 100%)',
  '--texture-panel-pattern':
    'repeating-linear-gradient(125deg, rgba(183,102,79,0.08) 0px, rgba(183,102,79,0.08) 18px, rgba(109,139,138,0.08) 18px, rgba(109,139,138,0.08) 36px)',
};

export default function EmotionsPage() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleCheckInComplete = (entry: JournalEntry) => {
    setToast({ message: 'Moment saved! 💜', type: 'success' });
  };

  return (
    <Layout>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <section className="texture-panel p-10 text-center md:text-left" style={heroPanelStyle}>
          <div className="space-y-5">
            <span className="inline-flex items-center justify-center rounded-full bg-secondary/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Daily check-in
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-neutral leading-tight">
              Name what your nervous system is whispering.
            </h1>
            <p className="text-base md:text-lg text-neutral/75">
              Pause in your scholar studio nook. Feel the chair, breathe in the paper and ink, and let the words arrive without judgment.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral/50 md:justify-start">
              <span>Somatic cues</span>
              <span>Tactile prompts</span>
              <span>Private reflections</span>
            </div>
          </div>
        </section>

        <section className="glass-card p-8 md:p-10">
          <div className="mb-8 flex flex-col gap-3 text-center md:text-left">
            <h2 className="font-serif text-3xl text-neutral">Check in with care</h2>
            <p className="text-neutral/70">
              Borrow the calm of the book stack illustration. Touch in, type what lands, and remember this space stays yours.
            </p>
          </div>
          <EmotionCheckIn onComplete={handleCheckInComplete} />
        </section>
      </div>
    </Layout>
  );
}

