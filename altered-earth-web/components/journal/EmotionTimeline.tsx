'use client';

import React, { useMemo } from 'react';
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
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Stats Cards */}
      <div className="stats stats-vertical lg:stats-horizontal shadow-lg w-full mb-8">
        <div className="stat bg-base-200">
          <div className="stat-figure text-secondary">
            <div 
              className="radial-progress text-primary" 
              style={{ "--value": stats.weekPercentage } as React.CSSProperties}
              role="progressbar"
            >
              {stats.weekPercentage}%
            </div>
          </div>
          <div className="stat-title">Week Streak</div>
          <div className="stat-value">{stats.weekStreak} days</div>
          <div className="stat-desc">You're showing up 💜</div>
        </div>
        
        {stats.mostFeltEmotion && (
          <div className="stat bg-base-200">
            <div className="stat-figure text-secondary">
              <span className="text-5xl">{stats.mostFeltEmotion.emoji}</span>
            </div>
            <div className="stat-title">Most Felt</div>
            <div className="stat-value text-2xl">{stats.mostFeltEmotion.label}</div>
            <div className="stat-desc">This week's vibe</div>
          </div>
        )}

        <div className="stat bg-base-200">
          <div className="stat-title">Total Moments</div>
          <div className="stat-value">{stats.totalEntries}</div>
          <div className="stat-desc">Captured so far</div>
        </div>
      </div>

      {/* Timeline */}
      {entries.length === 0 ? (
        <div className="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No entries yet. Check in with how you're feeling to start building your timeline.</span>
        </div>
      ) : (
        <ul className="timeline timeline-vertical timeline-snap-icon">
          {entries.map((entry, i) => {
            const emotion = getEmotionById(entry.emotion);
            if (!emotion) return null;

            const getBadgeClass = (color: string) => {
              const colorMap: Record<string, string> = {
                'primary': 'badge-primary',
                'secondary': 'badge-secondary',
                'accent': 'badge-accent',
                'info': 'badge-info',
                'success': 'badge-success',
                'warning': 'badge-warning',
                'error': 'badge-error',
                'neutral': 'badge-neutral',
              };
              return `badge ${colorMap[color] || 'badge-primary'} badge-lg p-3`;
            };

            return (
              <li key={entry.id}>
                <div className="timeline-middle">
                  <div className={getBadgeClass(emotion.color)}>
                    <span className="text-xl">{emotion.emoji}</span>
                  </div>
                </div>
                <div className={`${i % 2 === 0 ? 'timeline-start' : 'timeline-end'} mb-10`}>
                  <time className="font-mono italic text-sm opacity-60">
                    {formatDate(entry.timestamp)}
                  </time>
                  <div className="text-lg font-black">{emotion.label}</div>
                  {entry.promptQuestion && (
                    <p className="text-xs uppercase tracking-wide mt-1 opacity-60">Prompt: {entry.promptQuestion}</p>
                  )}
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="badge badge-ghost badge-sm">#{tag}</span>
                      ))}
                    </div>
                  )}
                  {entry.note && (
                    <p className="text-sm opacity-80 mt-2">{entry.note}</p>
                  )}
                </div>
                <hr className={i === entries.length - 1 ? 'bg-transparent border-base-300' : 'border-base-300'} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

