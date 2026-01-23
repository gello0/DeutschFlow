
import { BookExercise } from "../types";

export const UNIT2_EXERCISES: BookExercise[] = [
  // === PART 1: CLASSROOM OBJECTS & GENDER ===
  {
    id: "u2-obj-1",
    type: "multiple-choice",
    prompt: "What is the article for 'Tisch' (Table)?",
    options: ["Der", "Die", "Das"],
    correctAnswer: "Der",
    explanation: "It is 'Der Tisch' (masculine)."
  },
  {
    id: "u2-obj-2",
    type: "multiple-choice",
    prompt: "What is the article for 'Tafel' (Board)?",
    options: ["Der", "Die", "Das"],
    correctAnswer: "Die",
    explanation: "It is 'Die Tafel' (feminine)."
  },
  {
    id: "u2-obj-3",
    type: "multiple-choice",
    prompt: "What is the article for 'Buch' (Book)?",
    options: ["Der", "Die", "Das"],
    correctAnswer: "Das",
    explanation: "It is 'Das Buch' (neuter)."
  },
  {
    id: "u2-obj-4",
    type: "fill-gap",
    prompt: "Complete with indefinite article: 'Das ist ___ Stuhl.' (Der Stuhl)",
    content: "Das ist ______ Stuhl.",
    correctAnswer: "ein",
    explanation: "Masculine indefinite in Nominativ is 'ein'."
  },
  {
    id: "u2-obj-5",
    type: "fill-gap",
    prompt: "Complete with indefinite article: 'Das ist ___ Lampe.' (Die Lampe)",
    content: "Das ist ______ Lampe.",
    correctAnswer: "eine",
    explanation: "Feminine indefinite is 'eine'."
  },

  // === PART 2: NEGATION (KEIN) ===
  {
    id: "u2-neg-1",
    type: "fill-gap",
    prompt: "Negate: 'Das ist ______ Handy.' (Das Handy)",
    content: "Das ist ______ Handy.",
    correctAnswer: "kein",
    explanation: "Neuter negation: kein."
  },
  {
    id: "u2-neg-2",
    type: "fill-gap",
    prompt: "Negate: 'Das ist ______ Brille.' (Die Brille)",
    content: "Das ist ______ Brille.",
    correctAnswer: "keine",
    explanation: "Feminine negation: keine."
  },
  {
    id: "u2-neg-3",
    type: "arrange",
    prompt: "Say: 'That is not a pen.' (Kuli = Der Kuli)",
    content: "ist / Kuli / Das / kein / .",
    correctAnswer: "Das ist kein Kuli.",
    explanation: "Nominativ masculine negation is 'kein'."
  },

  // === PART 3: PLURALS ===
  {
    id: "u2-pl-1",
    type: "multiple-choice",
    prompt: "What is the plural of 'Das Buch'?",
    options: ["Die Buche", "Die Bücher", "Die Büchern"],
    correctAnswer: "Die Bücher",
    explanation: "Vowel change u -> ü + er."
  },
  {
    id: "u2-pl-2",
    type: "multiple-choice",
    prompt: "What is the plural of 'Der Stift'?",
    options: ["Die Stifte", "Die Stifter", "Die Stift"],
    correctAnswer: "Die Stifte",
    explanation: "Add -e for many masculine nouns."
  },
  {
    id: "u2-pl-3",
    type: "fill-gap",
    prompt: "Plural of 'Die Frage' (Question).",
    content: "Ich habe viele ______.",
    correctAnswer: "Fragen",
    explanation: "Nouns ending in -e usually add -n."
  },

  // === PART 4: CLASSROOM COMMUNICATION ===
  {
    id: "u2-comm-1",
    type: "arrange",
    prompt: "Ask to repeat.",
    content: "wiederholen / Sie / das / Können / bitte / ?",
    correctAnswer: "Können Sie das bitte wiederholen?",
    explanation: "Modal verb 'Können' starts the Yes/No question."
  },
  {
    id: "u2-comm-2",
    type: "fill-gap",
    prompt: "Translate: 'How do you write that?'",
    content: "Wie ______ man das?",
    correctAnswer: "schreibt",
    explanation: "Man (one) conjugates like er/sie/es."
  },
  {
    id: "u2-comm-3",
    type: "fill-gap",
    prompt: "Translate: 'I don't understand.'",
    content: "Ich ______ nicht.",
    correctAnswer: "verstehe",
    explanation: "Verstehen -> Ich verstehe."
  },
  {
    id: "u2-comm-4",
    type: "multiple-choice",
    prompt: "Teacher says: 'Machen Sie das Buch auf.'",
    options: ["Close the book", "Open the book", "Read the book"],
    correctAnswer: "Open the book",
    explanation: "Aufmachen = to open."
  },

  // === PART 5: REVIEW ===
  {
    id: "u2-rev-1",
    type: "arrange",
    prompt: "Ask: 'What is that in German?'",
    content: "auf / das / heißt / Was / Deutsch / ?",
    correctAnswer: "Was heißt das auf Deutsch?",
    explanation: "Standard phrase for translation."
  },
  {
    id: "u2-rev-2",
    type: "fill-gap",
    prompt: "Article: '___ Radiergummi' (Eraser - Masc).",
    content: "Das ist ______ Radiergummi.",
    correctAnswer: "der",
    explanation: "Assuming definitive article requested, or 'ein' if indefinite. Context implies naming the gender: Der."
  },

  // === PART 6: MASTERY (NICHT VS KEIN) ===
  {
    id: "u2-mastery-1",
    type: "fill-gap",
    prompt: "Contrast: 'Das ist ___ Stift (Masc).' (Negate Noun)",
    content: "Das ist ______ Stift.",
    correctAnswer: "kein",
    explanation: "Negating a noun without an article -> kein."
  },
  {
    id: "u2-mastery-2",
    type: "fill-gap",
    prompt: "Contrast: 'Der Stift schreibt ___.' (Negate Verb)",
    content: "Der Stift schreibt ______.",
    correctAnswer: "nicht",
    explanation: "Negating a verb/action -> nicht."
  },
  {
    id: "u2-mastery-3",
    type: "arrange",
    prompt: "Compound Noun: 'Das Wörterbuch' (Dictionary).",
    content: "Wörterbuch / das / ist / Hier / .",
    correctAnswer: "Hier ist das Wörterbuch.",
    explanation: "Wort (Word) + Buch (Book) = Dictionary."
  }
];
