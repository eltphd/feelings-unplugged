'use client';

import dynamic from 'next/dynamic';
import PromptCarouselSkeleton from '@/components/prompts/PromptCarouselSkeleton';
import Layout from '../components/Layout';

const PromptCarousel = dynamic(() => import('@/components/prompts/PromptCarousel'), {
  ssr: false,
  loading: () => <PromptCarouselSkeleton />,
});

export default function PromptsPage() {
  return (
    <Layout>
      <PromptCarousel />
    </Layout>
  );
}

