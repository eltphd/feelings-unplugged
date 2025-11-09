'use client';

import React from 'react';
import { Prompt } from '@/types';

interface PromptCardProps {
  prompt: Prompt;
  onStart: (prompt: Prompt) => void;
  onSkip: () => void;
  onBookmark?: (prompt: Prompt) => void;
}

export default function PromptCard({ prompt, onStart, onSkip, onBookmark }: PromptCardProps) {
  const categoryBadge = (category: Prompt['category']) => {
    const map: Record<Prompt['category'], { badge: string; emoji: string }> = {
      'identity': { badge: 'badge-primary text-primary-content', emoji: '🪞' },
      'relationships': { badge: 'badge-secondary text-secondary-content', emoji: '🫂' },
      'future-self': { badge: 'badge-accent text-accent-content', emoji: '🔮' },
      'hard-days': { badge: 'badge-info text-info-content', emoji: '🛡️' },
      'joy': { badge: 'badge-success text-success-content', emoji: '🌈' },
    };
    return map[category];
  };

  const { badge, emoji } = categoryBadge(prompt.category);

  return (
    <div className="card w-72 sm:w-80 glass-card shadow-lg hover:shadow-glow transition-all duration-200 ease-out">
      <div className="card-body space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className={`badge badge-lg rounded-full px-4 py-2 font-semibold ${badge}`}>
            <span className="text-lg mr-2">{emoji}</span>
            <span className="capitalize">{prompt.category.replace('-', ' ')}</span>
          </div>
          {onBookmark && (
            <button 
              className="btn btn-ghost btn-xs btn-circle"
              onClick={() => onBookmark(prompt)}
              aria-label="Bookmark prompt"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          )}
        </div>

        <div className="space-y-2 text-left">
          <h2 className="text-xl font-semibold leading-snug">{prompt.question}</h2>
          <p className="text-sm opacity-70 leading-relaxed">{prompt.context}</p>
        </div>

        {prompt.contentWarning && (
          <div className="alert alert-warning py-2 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>CW: {prompt.contentWarning}</span>
          </div>
        )}

        <div className="card-actions justify-end gap-2 pt-2">
          <button 
            className="btn btn-ghost btn-sm"
            onClick={onSkip}
          >
            Skip
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onStart(prompt)}
          >
            Let's go →
          </button>
        </div>
      </div>
    </div>
  );
}

