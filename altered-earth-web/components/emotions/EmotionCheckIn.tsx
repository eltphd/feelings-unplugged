'use client';

import React, { useState } from 'react';
import { EMOTIONS } from '@/utils/emotions';
import { JournalEntry, EmotionType } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface EmotionCheckInProps {
  onComplete?: (entry: JournalEntry) => void;
}

export default function EmotionCheckIn({ onComplete }: EmotionCheckInProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [note, setNote] = useState('');
  const [showNote, setShowNote] = useState(false);
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('journal-entries', []);

  const handleEmotionSelect = (emotionId: EmotionType) => {
    setSelectedEmotion(emotionId);
  };

  const handleSave = () => {
    if (!selectedEmotion) return;

    const newEntry: JournalEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      emotion: selectedEmotion,
      note: note.trim() || undefined,
    };

    setEntries([newEntry, ...entries]);
    
    // Reset form
    setSelectedEmotion(null);
    setNote('');
    setShowNote(false);

    // Callback for parent component
    onComplete?.(newEntry);
  };

  const handleSkip = () => {
    setSelectedEmotion(null);
    setNote('');
    setShowNote(false);
  };

  const getButtonClass = (emotion: typeof EMOTIONS[0], isSelected: boolean) => {
    const baseClass = 'btn btn-lg flex-col h-auto py-4 gap-2 emotion-pulse';
    if (!isSelected) return `${baseClass} btn-outline`;
    
    const colorMap: Record<string, string> = {
      'primary': 'btn-primary',
      'secondary': 'btn-secondary',
      'accent': 'btn-accent',
      'info': 'btn-info',
      'success': 'btn-success',
      'warning': 'btn-warning',
      'error': 'btn-error',
      'neutral': 'btn-neutral',
    };
    
    return `${baseClass} ${colorMap[emotion.color] || 'btn-primary'}`;
  };

  return (
    <div className="card glass-card w-full max-w-md mx-auto">
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">Right now, I'm feeling...</h2>
        
        {/* Emotion Selection Grid */}
        <div className="grid grid-cols-2 gap-3 my-4">
          {EMOTIONS.map((emotion) => (
            <button
              key={emotion.id}
              onClick={() => handleEmotionSelect(emotion.id)}
              className={getButtonClass(emotion, selectedEmotion === emotion.id)}
            >
              <span className="text-4xl">{emotion.emoji}</span>
              <span className="text-sm font-semibold">{emotion.label}</span>
            </button>
          ))}
        </div>

        {/* Optional Note Section */}
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
        <div className="card-actions justify-between mt-4">
          <button 
            className="btn btn-ghost btn-sm"
            onClick={handleSkip}
          >
            Not today
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!selectedEmotion}
          >
            Save this moment
          </button>
        </div>
      </div>
    </div>
  );
}

