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
  const getCategoryColor = (category: Prompt['category']) => {
    const colors: Record<Prompt['category'], string> = {
      'identity': 'badge badge-outline badge-primary',
      'relationships': 'badge badge-outline badge-secondary',
      'future-self': 'badge badge-outline badge-accent',
      'hard-days': 'badge badge-outline badge-info',
      'joy': 'badge badge-outline badge-success',
    };
    return colors[category];
  };

  return (
    <div className="card w-80 glass-card shadow-xl hover:shadow-glow transition-all">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <span className={getCategoryColor(prompt.category)}>
            {prompt.category.replace('-', ' ')}
          </span>
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
        
        {prompt.contentWarning && (
          <div className="alert alert-warning py-2 text-xs mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>CW: {prompt.contentWarning}</span>
          </div>
        )}
        
        <h2 className="card-title text-xl mt-2">{prompt.question}</h2>
        <p className="text-sm opacity-70">{prompt.context}</p>
        
        <div className="card-actions justify-end mt-4">
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

