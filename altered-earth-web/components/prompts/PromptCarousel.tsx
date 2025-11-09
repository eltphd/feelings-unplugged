'use client';

import React, { useState } from 'react';
import PromptCard from './PromptCard';
import { PROMPTS } from '@/utils/prompts';
import { Prompt } from '@/types';
import { useRouter } from 'next/navigation';

interface PromptCarouselProps {
  onPromptSelect?: (prompt: Prompt) => void;
}

export default function PromptCarousel({ onPromptSelect }: PromptCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROMPTS.length);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Soul Compass</h2>
        <p className="opacity-70">Prompts that feel like conversations, not homework</p>
      </div>

      {/* Carousel */}
      <div className="carousel carousel-center w-full space-x-4 p-4 carousel-smooth overflow-x-auto snap-x snap-mandatory">
        {PROMPTS.map((prompt) => (
          <div key={prompt.id} className="carousel-item snap-start">
            <PromptCard
              prompt={prompt}
              onStart={(p) => {
                onPromptSelect?.(p);
                router.push(`/prompts-feelings/${p.id}`);
              }}
              onSkip={handleNext}
            />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 py-4">
        {PROMPTS.map((_, index) => (
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

