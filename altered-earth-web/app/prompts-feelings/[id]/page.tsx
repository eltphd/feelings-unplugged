import { notFound } from 'next/navigation';
import Layout from '../../components/Layout';
import { PROMPTS, getPromptById } from '@/utils/prompts';
import PromptResponse from '@/components/prompts/PromptResponse';

interface PageProps {
  params: { id: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PROMPTS.map((prompt) => ({ id: prompt.id }));
}

export default function PromptResponsePage({ params }: PageProps) {
  const prompt = getPromptById(params.id);
  if (!prompt) {
    notFound();
  }

  return (
    <Layout>
      <PromptResponse prompt={prompt} />
    </Layout>
  );
}
