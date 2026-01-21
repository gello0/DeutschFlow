
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
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  correction?: string; // Optional field if the tutor corrects the user
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

export interface Scenario {
  id: string;
  title: string;
  emoji: string;
  description: string;
  systemPrompt: string;
  initialMessage: string;
}

export interface SentencePuzzle {
  german: string;
  english: string;
}

export enum AppView {
  Vocab = 'vocab',
  Chat = 'chat',
  Journal = 'journal',
  Drills = 'drills',
  Numbers = 'numbers',
  SentenceBuilder = 'sentence_builder',
  Settings = 'settings'
}
