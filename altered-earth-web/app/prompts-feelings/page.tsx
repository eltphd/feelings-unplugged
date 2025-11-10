'use client';

import { CSSProperties, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import PromptCarouselSkeleton from '@/components/prompts/PromptCarouselSkeleton';
import Layout from '../components/Layout';
import { PROMPTS } from '@/utils/prompts';
import PromptCard from '@/components/prompts/PromptCard';
import { useRouter } from 'next/navigation';

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
  const [viewMode, setViewMode] = useState<'carousel' | 'list'>('carousel');
  const router = useRouter();

  const promptList = useMemo(
    () =>
      PROMPTS.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          layout="list"
          onStart={(p) => router.push(`/prompts-feelings/${p.id}`)}
        />
      )),
    [router],
  );

  return (
    <Layout>
      <div className="space-y-10 pb-12">
        <section className="texture-panel p-6 sm:p-10" style={heroPanelStyle}>
          <div className="max-w-3xl space-y-5 text-center md:text-left">
            <span className="inline-flex items-center justify-center rounded-full bg-secondary/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Soul Compass
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral leading-tight">
              Prompts built to meet you exactly where you are.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-neutral/75">
              Pick a feeling, open the prompt, and write privately. Everything stays on this device until you choose to export.
            </p>
          </div>
        </section>

        <section className="glass-card p-6 sm:p-8 md:p-10 space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Prompt deck</p>
              <h2 className="font-serif text-2xl sm:text-3xl text-neutral">Follow what resonates right now</h2>
              <p className="text-neutral/70 text-sm sm:text-base">
                Swipe through one at a time or switch to list view to skim every prompt. Tap a card to start writing.
              </p>
            </div>
            <div className="join">
              <button
                className={`btn join-item btn-sm sm:btn-md ${viewMode === 'carousel' ? 'btn-primary' : 'btn-ghost'}`}
                type="button"
                onClick={() => setViewMode('carousel')}
                aria-pressed={viewMode === 'carousel'}
              >
                Carousel
              </button>
              <button
                className={`btn join-item btn-sm sm:btn-md ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                type="button"
                onClick={() => setViewMode('list')}
                aria-pressed={viewMode === 'list'}
              >
                List view
              </button>
            </div>
          </div>
          {viewMode === 'carousel' ? (
            <div className="rounded-[26px] border border-base-200 bg-base-100/95 p-2 sm:p-6 shadow-inner">
              <PromptCarousel />
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6">
              {promptList}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}

