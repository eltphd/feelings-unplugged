'use client';

import React, { useState } from 'react';
import PromptCard from './PromptCard';
import { Prompt } from '@/types';

// Sample prompts (TODO: Replace with actual prompt data source)
const SAMPLE_PROMPTS: Prompt[] = [
  {
    id: '1',
    category: 'hard-days',
    question: 'What would you tell your 5-years-ago self about today?',
    context: 'Time-travel compassion — looking back helps us see growth',
    difficulty: 'medium'
  },
  {
    id: '2',
    category: 'identity',
    question: 'When do you feel most like yourself?',
    context: 'Notice the moments when you are not performing for anyone',
    difficulty: 'easy'
  },
  {
    id: '3',
    category: 'relationships',
    question: 'Who makes you feel seen, and how?',
    context: 'Recognition matters — who reflects your truth back to you?',
    difficulty: 'medium'
  },
  {
    id: '4',
    category: 'future-self',
    question: 'What does 30-year-old you thank you for today?',
    context: 'Future gratitude practice — connecting actions to long-term care',
    difficulty: 'easy'
  },
  {
    id: '5',
    category: 'joy',
    question: 'What\'s something small that made you smile this week?',
    context: 'Joy archaeology — excavating micro-moments of happiness',
    difficulty: 'easy'
  }
];

interface PromptCarouselProps {
  onPromptSelect?: (prompt: Prompt) => void;
}

export default function PromptCarousel({ onPromptSelect }: PromptCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SAMPLE_PROMPTS.length);
  };

  const handleStart = (prompt: Prompt) => {
    onPromptSelect?.(prompt);
    // TODO: Navigate to journaling interface with selected prompt
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Soul Compass</h2>
        <p className="opacity-70">Prompts that feel like conversations, not homework</p>
      </div>

      {/* Carousel */}
      <div className="carousel carousel-center w-full space-x-4 p-4 carousel-smooth overflow-x-auto snap-x snap-mandatory">
        {SAMPLE_PROMPTS.map((prompt, index) => (
          <div key={prompt.id} className="carousel-item snap-start">
            <PromptCard
              prompt={prompt}
              onStart={handleStart}
              onSkip={handleNext}
            />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 py-4">
        {SAMPLE_PROMPTS.map((_, index) => (
          <button
            key={index}
            className={`btn btn-xs ${index === currentIndex ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to prompt ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

