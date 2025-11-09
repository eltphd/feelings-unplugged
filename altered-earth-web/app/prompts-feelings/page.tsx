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
      <div className="max-w-3xl mx-auto text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold">Soul Compass</h1>
        <p className="opacity-70 text-sm md:text-base">
          Pick a prompt that feels like a conversation. Everything you save stays on this device unless you choose to share.
        </p>
      </div>
      <PromptCarousel />
    </Layout>
  );
}

