'use client';

import dynamic from 'next/dynamic';
import EmotionTimelineSkeleton from '@/components/journal/EmotionTimelineSkeleton';
import Layout from '../components/Layout';

const EmotionTimeline = dynamic(() => import('@/components/journal/EmotionTimeline'), {
  ssr: false,
  loading: () => <EmotionTimelineSkeleton />,
});

export default function TimelinePage() {
  return (
    <Layout>
      <EmotionTimeline />
    </Layout>
  );
}

