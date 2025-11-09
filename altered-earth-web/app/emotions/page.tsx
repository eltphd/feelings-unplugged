'use client';

import { useState } from 'react';
import EmotionCheckIn from '@/components/emotions/EmotionCheckIn';
import Layout from '../components/Layout';
import Toast from '../components/Toast';
import { JournalEntry } from '@/types';

export default function EmotionsPage() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleCheckInComplete = (entry: JournalEntry) => {
    setToast({ message: 'Moment saved! 💜', type: 'success' });
  };

  return (
    <Layout>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How are you feeling?
          </h1>
          <p className="text-lg opacity-70">
            Check in with yourself — no pressure, just honesty
          </p>
        </div>
        
        <EmotionCheckIn onComplete={handleCheckInComplete} />
      </div>
    </Layout>
  );
}

