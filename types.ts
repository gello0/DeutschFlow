
export enum DifficultyLevel {
  Beginner = 'Beginner (A1/A2)',
  Intermediate = 'Intermediate (B1/B2)',
  Advanced = 'Advanced (C1/C2)'
}

export interface VocabWord {
  german: string;
  english: string;
  gender: 'der' | 'die' | 'das' | '';
  exampleGerman: string;
  exampleEnglish: string;
  type: string; // Noun, Verb, Adjective, etc.
  category?: string;
  level?: DifficultyLevel;
}

export interface VerbDrill {
  infinitive: string;
  translation: string;
  tense: string; // e.g., "Präsens", "Präteritum"
  conjugations: {
    ich: string;
    du: string;
    er_sie_es: string;
    wir: string;
    ihr: string;
    sie_Sie: string;
  };
  tip?: string; // Optional grammar tip (e.g., "Stem changing verb")
}

export enum AppView {
  Vocab = 'vocab',
  Journal = 'journal',
  Drills = 'drills',
  Numbers = 'numbers',
  Chat = 'chat',
  SentenceBuilder = 'sentences',
  Settings = 'settings'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  correction?: string;
}

export interface Scenario {
  id: string;
  title: string;
  emoji: string;
  description: string;
  initialMessage: string;
  systemPrompt: string;
}

export interface SentencePuzzle {
  id: string; // Added ID for tracking
  german: string;
  english: string;
}

export interface SentenceProgress {
  id: string;
  attempts: number;
  successCount: number;
  lastSeen: number; // Timestamp
  status: 'new' | 'learning' | 'mastered';
}
