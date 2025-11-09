'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EMOTIONS } from '@/utils/emotions';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { EmotionType, JournalEntry, Prompt } from '@/types';

interface PromptResponseProps {
  prompt: Prompt;
}

const SUGGESTED_TAGS = ['self', 'friendship', 'school', 'family', 'future', 'joy'];

export default function PromptResponse({ prompt }: PromptResponseProps) {
  const router = useRouter();
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('journal-entries', []);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = () => {
    const entry: JournalEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date(),
      emotion: selectedEmotion || 'grounded',
      intensity,
      note: note.trim() || undefined,
      promptId: prompt.id,
      promptQuestion: prompt.question,
      tags: tags.length ? tags : undefined,
    };
    setEntries([entry, ...entries]);
    setSaved(true);
  };

  const handleExport = () => {
    const data = {
      prompt: prompt.question,
      context: prompt.context,
      emotion: selectedEmotion,
      intensity,
      note,
      tags,
      savedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feelings-unplugged-${prompt.id}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const emotionPalette = useMemo(
    () =>
      EMOTIONS.map((emotion) => (
        <button
          key={emotion.id}
          onClick={() => setSelectedEmotion(emotion.id)}
          className={`flex-1 rounded-2xl border px-4 py-3 flex flex-col items-center gap-1 transition-all text-sm
            ${selectedEmotion === emotion.id ? 'bg-primary text-primary-content border-transparent shadow-glow scale-[1.02]' : 'bg-base-200/70 border-base-content/10 hover:border-primary/40'}`}
        >
          <span className="text-2xl">{emotion.emoji}</span>
          <span className="font-semibold">{emotion.label}</span>
        </button>
      )),
    [selectedEmotion]
  );

  return (
    <div className="space-y-6 pb-24">
      <div className="space-y-2 text-left">
        <Link href="/prompts-feelings" className="link link-hover text-sm opacity-70">← Back to prompts</Link>
        <div className="badge badge-secondary badge-lg px-4 py-2 text-base">{prompt.category.replace('-', ' ')}</div>
        <h1 className="text-3xl font-bold leading-snug">{prompt.question}</h1>
        <p className="text-sm opacity-70">{prompt.context}</p>
        <div className="alert alert-info mt-4 text-sm md:text-base">
          <span>Everything you write here stays on this device unless you export it. You can delete everything anytime in Settings.</span>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What emotion shows up first?</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {emotionPalette}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between text-sm font-semibold">
          <span>How strong is it?</span>
          <span className="badge badge-outline">{intensity}/10</span>
        </div>
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
      </section>

      <section className="space-y-3">
        <label className="text-sm font-semibold" htmlFor="prompt-note">Let the words spill (optional)</label>
        <textarea
          id="prompt-note"
          className="textarea textarea-bordered w-full h-40"
          placeholder="Start wherever you want. Messy is welcome."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </section>

      <section className="space-y-3">
        <span className="text-sm font-semibold">Tag it (optional)</span>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_TAGS.map((tag) => (
            <button
              key={tag}
              className={`badge badge-lg px-4 py-3 rounded-full transition ${tags.includes(tag) ? 'badge-primary text-primary-content' : 'badge-ghost opacity-80 hover:opacity-100'}`}
              onClick={() => toggleTag(tag)}
              type="button"
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>

      <section className="alert alert-soft bg-base-200/80 border border-base-content/10 text-sm leading-relaxed space-y-2">
        <div className="font-semibold">Need a pause?</div>
        <p>If answering this feels heavy, it’s okay to step away. Your work saves only when you tap save.</p>
        <div className="flex gap-2">
          <Link href="/resources" className="btn btn-xs btn-outline">Grounding tools</Link>
          <button className="btn btn-xs" onClick={() => router.back()}>Exit without saving</button>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-200 px-4 py-4 space-y-3 md:space-y-0 md:flex md:items-center md:justify-between">
        <div className="text-xs opacity-70 md:text-sm">Save privately or export a copy to keep forever.</div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm md:btn-md" onClick={handleExport}>Export</button>
          <button className="btn btn-primary btn-sm md:btn-md" onClick={handleSave}>Save to device</button>
        </div>
      </div>

      {saved && (
        <div className="alert alert-success mt-4">
          <div>
            <h3 className="font-semibold">Saved to your device 💜</h3>
            <p className="text-sm opacity-80">Visit your timeline to re-read it or manage it in Settings whenever you want.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/timeline" className="btn btn-xs btn-outline">View timeline</Link>
            <button className="btn btn-xs" onClick={() => { setNote(''); setTags([]); setSaved(false); }}>Start another</button>
          </div>
        </div>
      )}
    </div>
  );
}
