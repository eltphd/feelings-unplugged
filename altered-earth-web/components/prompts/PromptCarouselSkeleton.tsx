import React from 'react';

export default function PromptCarouselSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-4 w-64" />
        </div>
        <div className="skeleton h-10 w-36" />
      </div>

      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3].map((item) => (
          <div key={item} className="card w-80 glass-card shadow-lg p-6 space-y-4">
            <div className="skeleton h-4 w-20" />
            <div className="skeleton h-6 w-full" />
            <div className="skeleton h-4 w-full" />
            <div className="flex justify-end gap-2">
              <div className="skeleton h-8 w-16" />
              <div className="skeleton h-8 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
