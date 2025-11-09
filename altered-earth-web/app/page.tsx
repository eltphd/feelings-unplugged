'use client';

import { useState } from 'react';
import Link from 'next/link';
import EmotionCheckIn from '@/components/emotions/EmotionCheckIn';
import dynamic from 'next/dynamic';
import Layout from './components/Layout';
import Toast from './components/Toast';
import { JournalEntry } from '@/types';
import EmotionTimelineSkeleton from '@/components/journal/EmotionTimelineSkeleton';
import PromptCarouselSkeleton from '@/components/prompts/PromptCarouselSkeleton';

const EmotionTimeline = dynamic(() => import('@/components/journal/EmotionTimeline'), {
  ssr: false,
  loading: () => <EmotionTimelineSkeleton />,
});

const PromptCarousel = dynamic(() => import('@/components/prompts/PromptCarousel'), {
  ssr: false,
  loading: () => <PromptCarouselSkeleton />,
});

export default function Home() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleCheckInComplete = (entry: JournalEntry) => {
    setToast({
      message: 'You listened to yourself and it stays right here 💜',
      type: 'success',
    });
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

      <div className="space-y-12">
        <section className="glass-card px-8 py-10 text-center md:text-left">
          <div className="max-w-3xl mx-auto md:mx-0 space-y-4">
            <span className="badge badge-secondary badge-lg px-4 py-3 shadow-glow-secondary">Gen Z · Mental Health · Journaling</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              How are you really feeling right now?
            </h1>
            <p className="text-base-content/80 text-lg">
              Feelings Unplugged is your private space to understand your emotions, notice your patterns, and show up for yourself—no pressure, no judgment.
            </p>
            <div className="flex flex-col md:flex-row gap-3 md:items-center md:gap-4 pt-2">
              <Link href="/prompts-feelings" className="btn btn-secondary btn-wide md:btn-md shadow-glow-secondary">
                Explore Soul Compass Prompts
              </Link>
              <Link href="/settings" className="btn btn-outline btn-accent btn-wide md:btn-md">
                Your privacy, your rules →
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto">
          <EmotionCheckIn onComplete={handleCheckInComplete} />
        </section>

        <section className="glass-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold">Your emotional timeline</h2>
              <p className="text-base-content/70">Notice how your feelings ebb and flow across the week. Patterns make things make sense.</p>
            </div>
            <Link href="/timeline" className="btn btn-outline btn-primary">Open full timeline</Link>
          </div>
          <EmotionTimeline />
        </section>

        <section className="glass-card p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold">Soul Compass prompts</h2>
              <p className="text-base-content/70">Pick a prompt that feels like a real conversation, not homework.</p>
            </div>
            <Link href="/prompts-feelings" className="btn btn-outline">See all prompts</Link>
          </div>
          <PromptCarousel />
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Link href="/settings" className="glass-card p-6 hover:shadow-glow transition-transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🔐</span>
              <div>
                <h3 className="text-xl font-semibold">Privacy settings</h3>
                <p className="text-base-content/70">Control what stays on your device, export entries, or wipe everything. You decide.</p>
              </div>
            </div>
          </Link>
          <Link href="/resources" className="glass-card p-6 hover:shadow-glow transition-transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🆘</span>
              <div>
                <h3 className="text-xl font-semibold">Need support?</h3>
                <p className="text-base-content/70">Immediate help, crisis hotlines, and grounding tools—available whenever you need them.</p>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </Layout>
  );
}
