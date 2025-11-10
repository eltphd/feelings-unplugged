'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { EMOTIONS } from '@/utils/emotions';
import { JournalEntry, EmotionType } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface EmotionCheckInProps {
  onComplete?: (entry: JournalEntry) => void;
}

export default function EmotionCheckIn({ onComplete }: EmotionCheckInProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [intensity, setIntensity] = useState<number>(5);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('journal-entries', []);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasSeen = typeof window !== 'undefined' ? window.localStorage.getItem('fu-welcome-dismissed') : 'true';
    if (!hasSeen) {
      setShowWelcome(true);
    }
  }, []);

  const dismissWelcome = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('fu-welcome-dismissed', 'true');
    }
    setShowWelcome(false);
  };

  const gradientMap = useMemo(() => ({
    primary: 'from-primary to-primary/80 text-primary-content',
    secondary: 'from-secondary to-secondary/80 text-secondary-content',
    accent: 'from-accent to-accent/80 text-accent-content',
    info: 'from-info to-info/80 text-info-content',
    success: 'from-success to-success/80 text-success-content',
    warning: 'from-warning to-warning/80 text-warning-content',
    error: 'from-error to-error/80 text-error-content',
    neutral: 'from-neutral to-neutral/80 text-neutral-content',
  }), []);

  const ringMap = useMemo(() => ({
    primary: 'focus:ring-primary',
    secondary: 'focus:ring-secondary',
    accent: 'focus:ring-accent',
    info: 'focus:ring-info',
    success: 'focus:ring-success',
    warning: 'focus:ring-warning',
    error: 'focus:ring-error',
    neutral: 'focus:ring-neutral',
  }), []);

  const hoverBorderMap = useMemo(() => ({
    primary: 'hover:border-primary/40',
    secondary: 'hover:border-secondary/40',
    accent: 'hover:border-accent/40',
    info: 'hover:border-info/40',
    success: 'hover:border-success/40',
    warning: 'hover:border-warning/40',
    error: 'hover:border-error/40',
    neutral: 'hover:border-neutral/40',
  }), []);

  const handleEmotionSelect = (emotionId: EmotionType) => {
    setSelectedEmotion(emotionId);
  };

  const handleSave = () => {
    if (!selectedEmotion) return;

    const newEntry: JournalEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      emotion: selectedEmotion,
      intensity,
      note: note.trim() || undefined,
    };

    setEntries([newEntry, ...entries]);
    
    // Reset form
    setSelectedEmotion(null);
    setIntensity(5);
    setNote('');
    setShowWelcome(false);

    // Callback for parent component
    onComplete?.(newEntry);
  };

  const handleSkip = () => {
    setSelectedEmotion(null);
    setIntensity(5);
    setNote('');
  };

  const supportCard = () => {
    if (!selectedEmotion) return null;
    const map: Partial<Record<EmotionType, { title: string; copy: string }>> = {
      'overwhelmed': {
        title: 'Take a breather',
        copy: 'Try a 4-7-8 breath, step outside for 60 seconds, or visit quick resources if it feels too heavy.',
      },
      'numb': {
        title: 'Feeling flat is still a feeling',
        copy: 'Micro-movements help—stretch hands, drink water, or tap through sensory grounding exercises.',
      },
      'confused': {
        title: 'It’s okay not to know',
        copy: 'You can jot messy thoughts or bookmark this moment and circle back later. There’s no rush.',
      },
    };
    const info = map[selectedEmotion];
    if (!info) return null;
    return (
      <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-5 space-y-3 text-left">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-secondary/70">Support cue</p>
          <h3 className="font-serif text-xl text-neutral">{info.title}</h3>
          <p className="text-sm leading-relaxed text-neutral/75">{info.copy}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/resources"
            className="rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-content shadow-sm transition-colors hover:bg-secondary/80"
          >
            Quick help →
          </Link>
          <button
            className="rounded-full border border-neutral/20 px-4 py-2 text-xs font-semibold text-neutral/70 hover:text-neutral"
            onClick={handleSkip}
          >
            Pause for now
          </button>
        </div>
      </div>
    );
  };

  const getButtonClass = (emotion: typeof EMOTIONS[0], isSelected: boolean) => {
    const gradient = gradientMap[emotion.color] || 'from-primary to-primary/80 text-primary-content';
    const ringClass = ringMap[emotion.color] || 'focus:ring-primary';
    const hoverClass = hoverBorderMap[emotion.color] || 'hover:border-primary/40';
    const base = `w-full rounded-3xl border border-neutral/10 bg-white/70 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${ringClass} flex items-center gap-4 p-4 md:p-5 ${hoverClass} hover:-translate-y-1`;
    const selected = `bg-gradient-to-br ${gradient} shadow-glow scale-[1.02] border-transparent text-primary-content`;
    return `${base} ${isSelected ? selected : ''}`;
  };

  return (
    <div className="glass-card mx-auto w-full max-w-2xl space-y-6 p-8 md:p-10">
      {showWelcome && (
        <div className="rounded-2xl border border-info/25 bg-info/10 p-5 text-left">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-info/70">Private studio</p>
              <h3 className="font-serif text-xl text-neutral">This space is yours</h3>
              <p className="text-sm leading-relaxed text-neutral/70">
                Everything you save stays on this device. Export or wipe it anytime in Settings.
              </p>
            </div>
            <button
              className="rounded-full border border-neutral/20 px-3 py-1 text-xs font-semibold text-neutral/60 hover:text-neutral"
              onClick={dismissWelcome}
              aria-label="Dismiss welcome message"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral/50">Emotion check-in</p>
        <h2 className="font-serif text-3xl text-neutral">Right now, I&apos;m feeling...</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {EMOTIONS.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => handleEmotionSelect(emotion.id)}
            className={getButtonClass(emotion, selectedEmotion === emotion.id)}
            aria-pressed={selectedEmotion === emotion.id}
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-3xl md:text-4xl">
              {emotion.emoji}
            </span>
            <div className="flex flex-col items-start text-left">
              <span
                className={`text-base font-semibold md:text-lg ${selectedEmotion === emotion.id ? 'text-primary-content' : 'text-neutral'}`}
              >
                {emotion.label}
              </span>
              <span
                className={`text-xs md:text-sm ${selectedEmotion === emotion.id ? 'text-primary-content/80' : 'text-neutral/60'}`}
              >
                {emotion.description}
              </span>
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-neutral/60 md:text-sm" aria-live="polite">
        {selectedEmotion
          ? `You chose ${selectedEmotion.replace('-', ' ')}. Adjust intensity below, then save when you’re ready.`
          : 'Tap one that matches your vibe — nothing saves until you hit “Save”.'}
      </p>

      {selectedEmotion && (
        <div className="space-y-3">
          <label className="flex items-center justify-between text-sm font-semibold text-neutral/80">
            <span>How strong is this feeling?</span>
            <span className="rounded-full border border-neutral/20 px-3 py-1 text-xs font-semibold text-neutral/60">
              {intensity}/10
            </span>
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="range range-primary"
          />
          <div className="flex justify-between text-xs text-neutral/50">
            <span>barely there</span>
            <span>all consuming</span>
          </div>
        </div>
      )}

      {supportCard()}

      {selectedEmotion && (
        <details className="group rounded-2xl border border-neutral/12 bg-white/70 p-4 transition-colors">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-neutral/70">
            <span>Want to say more? (optional)</span>
            <span className="text-neutral/40 transition-transform group-open:rotate-90">→</span>
          </summary>
          <div className="space-y-2 pt-4">
            <textarea
              className="h-28 w-full rounded-2xl border border-neutral/15 bg-white px-4 py-3 text-sm text-neutral/80 placeholder:text-neutral/40 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
              placeholder="No pressure, just if you want to..."
              maxLength={280}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="text-right text-xs text-neutral/50">{note.length}/280</div>
          </div>
        </details>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          className="rounded-full border border-neutral/20 px-5 py-2 text-sm font-semibold text-neutral/70 transition-colors hover:text-neutral md:px-6"
          onClick={handleSkip}
        >
          Not today
        </button>
        <button
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-content shadow-md shadow-primary/25 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={handleSave}
          disabled={!selectedEmotion}
        >
          Save this moment
        </button>
      </div>
      <div className="flex flex-wrap gap-3 text-xs text-neutral/60 md:text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="rounded-full border border-neutral/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]">
            Privacy
          </span>
          Nothing leaves this device unless you export it.
        </span>
        <Link href="/resources" className="inline-flex items-center gap-1 text-secondary transition-colors hover:text-secondary/80">
          Need help fast? →
        </Link>
      </div>
    </div>
  );
}

