import { Prompt } from '@/types';

export const PROMPTS: Prompt[] = [
  {
    id: '1',
    category: 'hard-days',
    question: 'What would you tell your 5-years-ago self about today?',
    context: 'Time-travel compassion — looking back helps us see growth',
    difficulty: 'medium'
  },
  {
    id: '2',
    category: 'identity',
    question: 'When do you feel most like yourself?',
    context: "Notice the moments when you're not performing for anyone",
    difficulty: 'easy'
  },
  {
    id: '3',
    category: 'relationships',
    question: 'Who makes you feel seen, and how?',
    context: 'Recognition matters — who reflects your truth back to you?',
    difficulty: 'medium'
  },
  {
    id: '4',
    category: 'future-self',
    question: 'What does 30-year-old you thank you for today?',
    context: 'Future gratitude practice — connecting actions to long-term care',
    difficulty: 'easy'
  },
  {
    id: '5',
    category: 'joy',
    question: "What's something small that made you smile this week?",
    context: 'Joy archaeology — excavating micro-moments of happiness',
    difficulty: 'easy'
  }
];

export const getPromptById = (id: string): Prompt | undefined => {
  return PROMPTS.find((prompt) => prompt.id === id);
};
