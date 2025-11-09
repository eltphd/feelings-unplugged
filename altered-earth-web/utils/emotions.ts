import { Emotion } from '@/types';

export const EMOTIONS: Emotion[] = [
  {
    id: 'fired-up',
    emoji: '🔥',
    label: 'Fired Up',
    color: 'error',
    description: 'Energized, passionate, maybe angry - something\'s got you moving'
  },
  {
    id: 'grounded',
    emoji: '😌',
    label: 'Grounded',
    color: 'success',
    description: 'Calm, centered, in your body'
  },
  {
    id: 'overwhelmed',
    emoji: '🌊',
    label: 'Overwhelmed',
    color: 'info',
    description: 'Too much happening, can\'t catch your breath'
  },
  {
    id: 'hopeful',
    emoji: '✨',
    label: 'Hopeful',
    color: 'accent',
    description: 'Optimistic, looking forward, possibilities ahead'
  },
  {
    id: 'numb',
    emoji: '😶',
    label: 'Numb',
    color: 'neutral',
    description: 'Flat, disconnected, going through the motions'
  },
  {
    id: 'confused',
    emoji: '💭',
    label: 'Confused',
    color: 'warning',
    description: 'Lost, uncertain, trying to figure things out'
  }
];

export const getEmotionById = (id: string): Emotion | undefined => {
  return EMOTIONS.find(e => e.id === id);
};

