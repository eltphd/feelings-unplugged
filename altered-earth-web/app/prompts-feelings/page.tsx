'use client';

import { CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import PromptCarouselSkeleton from '@/components/prompts/PromptCarouselSkeleton';
import Layout from '../components/Layout';

const PromptCarousel = dynamic(() => import('@/components/prompts/PromptCarousel'), {
  ssr: false,
  loading: () => <PromptCarouselSkeleton />,
});

type TexturePanelStyle = CSSProperties & {
  '--texture-panel-gradient'?: string;
  '--texture-panel-pattern'?: string;
  '--texture-panel-opacity'?: string;
};

const heroPanelStyle: TexturePanelStyle = {
  '--texture-panel-gradient': 'linear-gradient(135deg, #F6F0E4 0%, #E7D9C5 52%, #CEBBA1 100%)',
  '--texture-panel-pattern':
    'repeating-linear-gradient(120deg, rgba(183,102,79,0.08) 0px, rgba(183,102,79,0.08) 18px, rgba(109,139,138,0.08) 18px, rgba(109,139,138,0.08) 36px)',
};

export default function PromptsPage() {
  return (
    <Layout>
      <div className="space-y-10">
        <section className="texture-panel p-10" style={heroPanelStyle}>
          <div className="max-w-3xl space-y-5 text-center md:text-left">
            <span className="inline-flex items-center justify-center rounded-full bg-secondary/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Soul Compass
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-neutral leading-tight">
              Prompts that talk with you, not at you.
            </h1>
            <p className="text-base md:text-lg text-neutral/75">
              Choose the journaling companion that matches today’s texture—linen, vellum, or a library book spine. What you write stays with you unless you decide to share.
            </p>
          </div>
        </section>

        <section className="glass-card p-8 md:p-10 space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Prompt deck</p>
              <h2 className="font-serif text-3xl text-neutral">Spin the carousel, follow what resonates</h2>
              <p className="text-neutral/70">
                Stack prompts with sensory cues from your calm kit—bookmark textures, candle glow, soundscapes.
              </p>
            </div>
            <div className="rounded-full border border-neutral/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral/60">
              Swipe or use arrow keys
            </div>
          </div>
          <div className="rounded-[26px] border border-base-200 bg-base-100/95 p-6 shadow-inner">
            <PromptCarousel />
          </div>
        </section>
      </div>
    </Layout>
  );
}

