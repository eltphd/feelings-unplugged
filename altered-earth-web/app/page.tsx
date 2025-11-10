'use client';

import { CSSProperties, useState } from 'react';
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

type TexturePanelStyle = CSSProperties & {
  '--texture-panel-gradient'?: string;
  '--texture-panel-pattern'?: string;
  '--texture-panel-opacity'?: string;
};

const heroPanelStyle: TexturePanelStyle = {
  '--texture-panel-gradient': 'linear-gradient(135deg, #F5EDE0 0%, #E9DDCA 48%, #D8C4AE 100%)',
  '--texture-panel-pattern':
    'repeating-linear-gradient(120deg, rgba(183,102,79,0.08) 0px, rgba(183,102,79,0.08) 22px, rgba(109,139,138,0.08) 22px, rgba(109,139,138,0.08) 44px)',
};

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

      <div className="space-y-16">
        <section className="texture-panel p-10" style={heroPanelStyle}>
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-secondary/15 px-5 py-2 text-sm font-semibold text-secondary tracking-wide">
                Atlas Academy · Scholar Studio · Nervous System Care
              </span>
              <div className="space-y-4">
                <h1 className="font-serif text-5xl md:text-6xl text-neutral leading-tight">
                  Free tools to move beyond survival thinking.
                </h1>
                <p className="max-w-xl text-lg text-neutral/80">
                  Feelings Unplugged is your open-source studio for adolescent brain health—stacked with prompts, quiet rituals, and research-backed scaffolds so Gen Z and Gen Alpha can envision futures past survival. Everything here stays private, portable, and accessible.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/prompts-feelings"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-content shadow-md shadow-primary/25 transition-transform hover:-translate-y-0.5"
                >
                  Start Soul Compass prompts
                </Link>
                <Link
                  href="/settings"
                  className="rounded-full border border-neutral/20 px-6 py-3 text-sm font-semibold text-neutral/80 hover:text-neutral"
                >
                  Your privacy, your rules →
                </Link>
              </div>
              <ul className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.18em] text-neutral/50">
                <li>Somatic check-ins</li>
                <li>Adolescent-owned data</li>
                <li>Open curriculum access</li>
              </ul>
            </div>
            <div className="hidden md:block">
              <div className="h-full overflow-hidden rounded-[28px] border border-base-200 bg-base-100/90 p-6 shadow-inner">
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-neutral/50">Today&apos;s bookmark</p>
                    <p className="font-serif text-2xl text-neutral">Focus on breath-centering</p>
                    <p className="mt-2 text-sm text-neutral/70">
                      Give your nervous system something gentle to hold—light a candle, play your &quot;library sound&quot;
                      loop, soften your gaze on something textured.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-base-200 bg-base-100/90 p-5 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.18em] text-neutral/50">Sensory anchors</p>
                    <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs font-semibold text-secondary">
                      {['Somatic', 'Creative', 'Grounding'].map((item) => (
                        <span key={item} className="rounded-xl border border-secondary/30 bg-secondary/10 px-3 py-2">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-base-200 bg-base-100/80 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Ritual idea</p>
                    <p className="mt-2 text-sm text-neutral/70">
                      Stack sensory cues: candle, playlist, the book stack illustration pinned above your desk.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto">
          <div className="glass-card p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10 mb-8">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Check in</p>
                <h2 className="font-serif text-3xl text-neutral">Tune into your emotional weather</h2>
                <p className="text-neutral/70">
                  Borrow the softness of your favorite study nook. Close your eyes, name three textures, then let the words land.
                </p>
              </div>
              <div className="rounded-2xl border border-base-200 bg-base-100/90 px-5 py-4 text-sm text-neutral/60">
                Tip: Pair this check-in with analog notes or the book stack image for a visual anchor.
              </div>
            </div>
            <EmotionCheckIn onComplete={handleCheckInComplete} />
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="glass-card p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Timeline</p>
                <h2 className="font-serif text-3xl text-neutral">Your emotional temperature</h2>
                <p className="text-neutral/70">
                  Notice where your week swells or softens. Patterns become invitations—not judgments.
                </p>
              </div>
              <Link
                href="/timeline"
                className="rounded-full border border-neutral/20 px-5 py-2 text-sm font-semibold text-neutral/70 hover:text-neutral"
              >
                Open full timeline
              </Link>
            </div>
            <div className="rounded-[26px] border border-base-200 bg-base-100/90 p-6 shadow-inner">
              <EmotionTimeline />
            </div>
          </div>
          <aside className="space-y-6">
            <div className="glass-card p-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral/50">Bookmark</p>
              <h3 className="font-serif text-2xl text-neutral">Layer your calm kit</h3>
              <p className="text-sm text-neutral/70">
                Keep your Firefly textures, prompts, and sensory cues in one place. When the nervous system wobbles,
                reach for the tactile—and remember every ritual here is free to remix, translate, and share.
              </p>
            </div>
            <div className="glass-card p-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral/50">Support</p>
              <p className="text-sm text-neutral/70">
                Need more grounding? Visit the resources library or share your ritual with a trusted adult. Atlas Academy keeps core curriculum open so every young person can access essentials without a paywall.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/resources"
                  className="rounded-full bg-secondary/15 px-4 py-2 text-xs font-semibold text-secondary"
                >
                  Immediate support
                </Link>
                <Link
                  href="/weekly-review"
                  className="rounded-full border border-neutral/20 px-4 py-2 text-xs font-semibold text-neutral/70 hover:text-neutral"
                >
                  Weekly reflection
                </Link>
              </div>
            </div>
          </aside>
        </section>

        <section className="glass-card p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Soul Compass</p>
              <h2 className="font-serif text-3xl text-neutral">Prompts that feel like real conversation</h2>
              <p className="text-neutral/70">
                Choose a prompt that pairs with your texture of the day—linen, vellum, or the spine of your favorite novel.
              </p>
            </div>
            <Link
              href="/prompts-feelings"
              className="rounded-full border border-neutral/20 px-5 py-2 text-sm font-semibold text-neutral/70 hover:text-neutral"
            >
              See all prompts
            </Link>
          </div>
          <div className="rounded-[26px] border border-base-200 bg-base-100/90 p-6 shadow-inner">
            <PromptCarousel />
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <Link href="/settings" className="group glass-card p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-glow">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🔐</span>
              <div className="space-y-2">
                <h3 className="font-serif text-xl text-neutral">Privacy settings</h3>
                <p className="text-sm text-neutral/70">
                  Decide what stays on-device, export your archive, or wipe it all clean. You author your own container.
                </p>
                <span className="text-xs font-semibold text-secondary">
                  Open settings →
                </span>
              </div>
            </div>
          </Link>

          <Link href="/journal" className="group glass-card p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-glow">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📓</span>
              <div className="space-y-2">
                <h3 className="font-serif text-xl text-neutral">Journal vault</h3>
                <p className="text-sm text-neutral/70">
                  Stack your reflections beside the study still life. Revisit entries, layer photos, add textures.
                </p>
                <span className="text-xs font-semibold text-secondary">
                  Continue writing →
                </span>
              </div>
            </div>
          </Link>

          <Link href="/resources" className="group glass-card p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-glow">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🆘</span>
              <div className="space-y-2">
                <h3 className="font-serif text-xl text-neutral">Need support?</h3>
                <p className="text-sm text-neutral/70">
                  Crisis lines, grounding audios, and adult allies—available the moment your nervous system needs backup.
                </p>
                <span className="text-xs font-semibold text-secondary">
                  View resources →
                </span>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </Layout>
  );
}
