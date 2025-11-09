import { redirect } from 'next/navigation';
import Layout from '../../components/Layout';
import { getPromptById } from '@/utils/prompts';
import PromptResponse from '@/components/prompts/PromptResponse';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { id: string };
}

export default function PromptResponsePage({ params }: PageProps) {
  const prompt = getPromptById(params.id);
  if (!prompt) {
    redirect('/prompts-feelings');
  }

  return (
    <Layout>
      <PromptResponse prompt={prompt} />
    </Layout>
  );
}
