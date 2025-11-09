import React from 'react';

export default function EmotionTimelineSkeleton() {
  return (
    <div className="space-y-6">
      <div className="stats stats-vertical lg:stats-horizontal shadow-lg w-full mb-8 animate-pulse">
        {[1, 2, 3].map((item) => (
          <div key={item} className="stat bg-base-200">
            <div className="stat-figure">
              <div className="skeleton h-16 w-16 rounded-full" />
            </div>
            <div className="stat-title">
              <div className="skeleton h-4 w-20" />
            </div>
            <div className="stat-value">
              <div className="skeleton h-6 w-24" />
            </div>
            <div className="stat-desc">
              <div className="skeleton h-4 w-32" />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex gap-4 items-start animate-pulse">
            <div className="skeleton h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-5 w-32" />
              <div className="skeleton h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
