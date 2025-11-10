'use client';

import { useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { JournalEntry } from '@/types';
import { getEmotionById } from '@/utils/emotions';

export default function EmotionTimeline() {
  const [entries] = useLocalStorage<JournalEntry[]>('journal-entries', []);

  // Calculate stats
  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weekEntries = entries.filter(
      entry => new Date(entry.timestamp) > weekAgo
    );

    // Count emotion frequencies
    const emotionCounts = weekEntries.reduce((acc, entry) => {
      acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostFrequent = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0];
    const mostFeltEmotion = mostFrequent ? getEmotionById(mostFrequent[0]) : null;

    return {
      weekStreak: weekEntries.length,
      weekPercentage: Math.min(Math.round((weekEntries.length / 7) * 100), 100),
      mostFeltEmotion,
      totalEntries: entries.length,
    };
  }, [entries]);

  const formatDate = (timestamp: Date | string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-10">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-neutral/15 bg-white/80 p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Week streak</p>
          <div className="mt-4 flex items-center gap-4">
            <div
              className="relative h-16 w-16 rounded-full border border-neutral/10 bg-gradient-to-br from-primary/10 to-primary/20"
              aria-hidden="true"
            >
              <div
                className="absolute inset-1 rounded-full"
                style={{
                  background: `conic-gradient(#B7664F ${stats.weekPercentage}%, rgba(183,102,79,0.18) ${stats.weekPercentage}% 100%)`,
                }}
              />
              <div className="absolute inset-[10px] flex items-center justify-center rounded-full bg-white text-sm font-semibold text-neutral">
                {stats.weekPercentage}%
              </div>
            </div>
            <div>
              <p className="text-2xl font-serif text-neutral">{stats.weekStreak} days</p>
              <p className="text-sm text-neutral/60">You&apos;re showing up 💜</p>
            </div>
          </div>
        </div>

        {stats.mostFeltEmotion && (
          <div className="rounded-2xl border border-neutral/15 bg-white/80 p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Most felt</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/15 text-4xl">
                {stats.mostFeltEmotion.emoji}
              </span>
              <div>
                <p className="text-2xl font-serif text-neutral">{stats.mostFeltEmotion.label}</p>
                <p className="text-sm text-neutral/60">This week&apos;s vibe</p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-neutral/15 bg-white/80 p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Total moments</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-3xl font-serif text-neutral">{stats.totalEntries}</span>
            <p className="text-sm text-neutral/60">Captured so far</p>
          </div>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-info/25 bg-info/10 p-6 text-center text-sm text-neutral/70">
          No entries yet. Check in with how you&apos;re feeling to start building your timeline.
        </div>
      ) : (
        <div className="relative space-y-8">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-neutral/20 via-neutral/30 to-transparent md:left-6" />
          {entries.map((entry, i) => {
            const emotion = getEmotionById(entry.emotion);
            if (!emotion) return null;

            return (
              <div key={entry.id} className="relative pl-12 md:pl-16">
                <div className="absolute left-0 top-1.5 flex h-9 w-9 items-center justify-center rounded-2xl border border-neutral/15 bg-white text-xl shadow-sm md:left-2">
                  {emotion.emoji}
                </div>
                <div className="rounded-2xl border border-neutral/12 bg-white/75 p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <time className="text-xs uppercase tracking-[0.18em] text-neutral/50">
                      {formatDate(entry.timestamp)}
                    </time>
                    <span className="rounded-full border border-neutral/20 px-3 py-1 text-xs font-semibold text-neutral/60">
                      {entry.intensity || 0}/10 intensity
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl text-neutral">{emotion.label}</h3>
                  {entry.promptQuestion && (
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral/40">
                      Prompt · {entry.promptQuestion}
                    </p>
                  )}
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-neutral/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral/55"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {entry.note && (
                    <p className="mt-4 text-sm leading-relaxed text-neutral/70">
                      {entry.note}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

