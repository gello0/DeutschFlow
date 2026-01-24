
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

export interface WordProgress {
  id: string; // german word as id
  successCount: number; // consecutive correct answers
  isMastered: boolean; // true if successCount >= 3
  lastReview: number; // timestamp
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
  Settings = 'settings',
  Book = 'book' // New Book Mode
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
  id: string; 
  german: string;
  english: string;
}

export interface SentenceProgress {
  id: string;
  attempts: number;
  successCount: number;
  lastSeen: number; 
  status: 'new' | 'learning' | 'mastered';
}

// === BOOK MODE TYPES ===

export type ExerciseType = 'multiple-choice' | 'fill-gap' | 'arrange';

export interface BookExercise {
  id: string;
  type: ExerciseType;
  prompt: string; // The question or instruction
  content?: string; // Context sentence (for fill-gap) or words to arrange
  options?: string[]; // For Multiple Choice
  correctAnswer: string; // The correct string to match
  explanation: string; // Why is this correct?
}

export interface BookUnit {
  id: string;
  title: string;
  description: string;
  exercises: BookExercise[];
}
