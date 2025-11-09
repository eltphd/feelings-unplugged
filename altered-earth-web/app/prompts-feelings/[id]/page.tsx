import { redirect } from 'next/navigation';
import Layout from '../../components/Layout';
import { PROMPTS, getPromptById } from '@/utils/prompts';
import PromptResponse from '@/components/prompts/PromptResponse';

export const dynamicParams = false;

export function generateStaticParams() {
  return PROMPTS.map((prompt) => ({ id: prompt.id }));
}

interface PageProps {
  params: { id: string };
}

export default function PromptResponsePage({ params }: PageProps) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const prompt = getPromptById(id);
  if (!prompt) {
    redirect('/prompts-feelings');
  }

  return (
    <Layout>
      <PromptResponse prompt={prompt} />
    </Layout>
  );
}
