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
  const [showNote, setShowNote] = useState(false);
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
    setShowNote(false);
    setShowWelcome(false);

    // Callback for parent component
    onComplete?.(newEntry);
  };

  const handleSkip = () => {
    setSelectedEmotion(null);
    setIntensity(5);
    setNote('');
    setShowNote(false);
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
      <div className="alert alert-soft bg-base-200/80 border border-base-content/10 text-left">
        <div>
          <h3 className="font-semibold text-base md:text-lg">{info.title}</h3>
          <p className="text-sm opacity-80 leading-relaxed">{info.copy}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/resources" className="btn btn-xs btn-primary">Quick help →</Link>
          <button className="btn btn-xs" onClick={handleSkip}>Pause for now</button>
        </div>
      </div>
    );
  };

  const getButtonClass = (emotion: typeof EMOTIONS[0], isSelected: boolean) => {
    const gradient = gradientMap[emotion.color] || 'from-primary to-primary/80 text-primary-content';
    const ringClass = ringMap[emotion.color] || 'focus:ring-primary';
    const hoverClass = hoverBorderMap[emotion.color] || 'hover:border-primary/40';
    const base = `w-full rounded-3xl border border-base-content/10 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${ringClass} flex items-center gap-4 p-4 md:p-5 bg-base-200/70 ${hoverClass} hover:-translate-y-1`;
    const selected = `bg-gradient-to-br ${gradient} shadow-glow scale-[1.03] border-transparent`;
    return `${base} ${isSelected ? selected : ''}`;
  };

  return (
    <div className="card glass-card w-full max-w-md mx-auto">
      <div className="card-body">
        {showWelcome && (
          <div className="alert alert-info flex items-start gap-3 text-left">
            <div>
              <h3 className="font-semibold">This space is yours</h3>
              <p className="text-sm opacity-80">Everything you save stays on this device. Export or wipe it anytime in Settings.</p>
            </div>
            <button className="btn btn-xs btn-ghost" onClick={dismissWelcome} aria-label="Dismiss welcome message">Got it</button>
          </div>
        )}

        <h2 className="card-title text-2xl font-bold">Right now, I'm feeling...</h2>
        
        {/* Emotion Selection Grid */}
        <div className="grid grid-cols-1 gap-3 my-4 sm:grid-cols-2">
          {EMOTIONS.map((emotion) => (
            <button
              key={emotion.id}
              onClick={() => handleEmotionSelect(emotion.id)}
              className={getButtonClass(emotion, selectedEmotion === emotion.id)}
              aria-pressed={selectedEmotion === emotion.id}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-base-100/20 text-3xl md:text-4xl">
                {emotion.emoji}
              </span>
              <div className="flex flex-col items-start text-left">
                <span className="text-base font-semibold md:text-lg">{emotion.label}</span>
                <span className="text-xs opacity-80 md:text-sm">{emotion.description}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Optional Note Section */}
        {selectedEmotion && (
          <div className="mt-4 space-y-2">
            <label className="flex items-center justify-between text-sm font-semibold text-base-content/80">
              <span>How strong is this feeling?</span>
              <span className="badge badge-outline">{intensity}/10</span>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="range range-primary"
            />
            <div className="flex justify-between text-xs opacity-60">
              <span>barely there</span>
              <span>all consuming</span>
            </div>
          </div>
        )}

        {supportCard()}

        {selectedEmotion && (
          <div className="collapse collapse-arrow bg-base-200 mt-4">
            <input 
              type="checkbox" 
              checked={showNote}
              onChange={(e) => setShowNote(e.target.checked)}
            /> 
            <div className="collapse-title text-sm opacity-70">
              Want to say more? (optional)
            </div>
            <div className="collapse-content">
              <textarea 
                className="textarea textarea-bordered w-full h-24" 
                placeholder="No pressure, just if you want to..."
                maxLength={280}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <div className="text-xs text-right opacity-60 mt-1">
                {note.length}/280
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <button 
            className="btn btn-ghost btn-sm md:btn-md"
            onClick={handleSkip}
          >
            Not today
          </button>
          <button 
            className="btn btn-primary btn-sm md:btn-md"
            onClick={handleSave}
            disabled={!selectedEmotion}
          >
            Save this moment
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs md:text-sm opacity-70">
          <span className="inline-flex items-center gap-2">
            <span className="badge badge-ghost badge-sm">Privacy</span> Nothing leaves this device unless you export it.
          </span>
          <Link href="/resources" className="link link-hover inline-flex items-center gap-1">
            Need help fast? →
          </Link>
        </div>
      </div>
    </div>
  );
}

