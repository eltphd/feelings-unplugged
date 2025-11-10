'use client';

import { CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import EmotionTimelineSkeleton from '@/components/journal/EmotionTimelineSkeleton';
import Layout from '../components/Layout';

const EmotionTimeline = dynamic(() => import('@/components/journal/EmotionTimeline'), {
  ssr: false,
  loading: () => <EmotionTimelineSkeleton />,
});

type TexturePanelStyle = CSSProperties & {
  '--texture-panel-gradient'?: string;
  '--texture-panel-pattern'?: string;
  '--texture-panel-opacity'?: string;
};

const heroPanelStyle: TexturePanelStyle = {
  '--texture-panel-gradient': 'linear-gradient(135deg, #F4EEE2 0%, #E6D9C7 52%, #D1BFA8 100%)',
  '--texture-panel-pattern':
    'repeating-linear-gradient(118deg, rgba(109,139,138,0.08) 0px, rgba(109,139,138,0.08) 20px, rgba(183,102,79,0.08) 20px, rgba(183,102,79,0.08) 40px)',
};

export default function TimelinePage() {
  return (
    <Layout>
      <div className="space-y-10">
        <section className="texture-panel p-10" style={heroPanelStyle}>
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full bg-secondary/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Emotional timeline
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-neutral leading-tight">
              Trace the narrative your feelings are writing.
            </h1>
            <p className="max-w-2xl text-base md:text-lg text-neutral/75">
              Each entry layers like pages in a well-loved notebook. Notice swell points, gentle dips, and the textures that keep you grounded.
            </p>
          </div>
        </section>

        <section className="glass-card p-8 md:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Weekly rhythm</p>
              <h2 className="font-serif text-3xl text-neutral">Your emotional temperature map</h2>
              <p className="text-neutral/70">
                Hover, tap, reflect. Pair patterns with the rituals in your calm kit to keep the narrative balanced.
              </p>
            </div>
            <div className="rounded-full border border-neutral/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral/60">
              Updated live from your check-ins
            </div>
          </div>
          <div className="rounded-[26px] border border-base-200 bg-base-100/95 p-6 shadow-inner">
            <EmotionTimeline />
          </div>
        </section>
      </div>
    </Layout>
  );
}

