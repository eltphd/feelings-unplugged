'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PromptResponse from '@/components/prompts/PromptResponse';
import { getPromptById } from '@/utils/prompts';

export default function PromptResponsePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const prompt = id ? getPromptById(id) : undefined;

  useEffect(() => {
    if (!prompt) {
      router.replace('/prompts-feelings');
    }
  }, [prompt, router]);

  if (!prompt) {
    return null;
  }

  return <PromptResponse prompt={prompt} />;
}
