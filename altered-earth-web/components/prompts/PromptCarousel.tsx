'use client';

import React, { useRef, useState } from 'react';
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
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleScrollToIndex = (index: number) => {
    const target = PROMPTS[index];
    itemRefs.current[target.id]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % PROMPTS.length;
    setCurrentIndex(nextIndex);
    handleScrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + PROMPTS.length) % PROMPTS.length;
    setCurrentIndex(prevIndex);
    handleScrollToIndex(prevIndex);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-0 sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-1">Soul Compass</h2>
          <p className="opacity-70 text-sm sm:text-base">Prompts that feel like conversations, not homework.</p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2 text-sm">
          <span className="badge badge-outline text-xs sm:text-sm">
            Prompt {currentIndex + 1} of {PROMPTS.length}
          </span>
          <div className="btn-group">
            <button className="btn btn-sm sm:btn-md" onClick={handlePrev} type="button" aria-label="Show previous prompt">
              ← Back
            </button>
            <button className="btn btn-sm sm:btn-md" onClick={handleNext} type="button" aria-label="Show next prompt">
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="carousel carousel-center w-full space-x-4 p-4 pb-2 carousel-smooth overflow-x-auto snap-x snap-mandatory">
        {PROMPTS.map((prompt) => (
          <div key={prompt.id} className="carousel-item">
            <div
              ref={(el) => {
                itemRefs.current[prompt.id] = el;
              }}
            >
              <PromptCard
                prompt={prompt}
                layout="carousel"
                onStart={(p) => {
                  onPromptSelect?.(p);
                  router.push(`/prompts-feelings/${p.id}`);
                }}
                onSkip={handleNext}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 py-4">
        {PROMPTS.map((_, index) => (
          <button
            key={index}
            className={`btn btn-xs sm:btn-sm ${index === currentIndex ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => {
              setCurrentIndex(index);
              handleScrollToIndex(index);
            }}
            aria-label={`Go to prompt ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

