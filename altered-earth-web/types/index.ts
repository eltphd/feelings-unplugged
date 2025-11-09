// Emotion types
export type EmotionType = 'fired-up' | 'grounded' | 'overwhelmed' | 'hopeful' | 'numb' | 'confused';

export interface Emotion {
  id: EmotionType;
  emoji: string;
  label: string;
  color: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
  description: string;
}

// Journal entry types
export interface JournalEntry {
  id: string;
  timestamp: Date;
  emotion: EmotionType;
  intensity?: number; // 1-10 scale
  note?: string;
  prompt?: string;
  promptId?: string;
  promptQuestion?: string;
  tags?: string[];
}

// Prompt types
export interface Prompt {
  id: string;
  category: 'identity' | 'relationships' | 'future-self' | 'hard-days' | 'joy';
  question: string;
  context: string;
  difficulty: 'easy' | 'medium' | 'deep';
  contentWarning?: string;
}

// User preferences
export interface UserPreferences {
  localStorageOnly: boolean;
  cloudBackupEnabled: boolean;
  shareAnonymousData: boolean;
  notificationsEnabled: boolean;
  streakReminders: boolean;
}

