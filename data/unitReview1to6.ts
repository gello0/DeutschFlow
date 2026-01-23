
import { BookExercise } from "../types";

export const UNIT_REVIEW_1_6: BookExercise[] = [
  // === SECTION 1: VERB POSITION (THE GOLDEN RULE) ===
  {
    id: "rev-1-order",
    type: "arrange",
    prompt: "Word Order: 'I drink coffee today.' (Time usually comes before Object)",
    content: "Kaffee / trinke / heute / Ich / .",
    correctAnswer: "Ich trinke heute Kaffee.",
    explanation: "Standard order: Subject + Verb + Time + Object. Verb MUST be position 2."
  },
  {
    id: "rev-2-order",
    type: "arrange",
    prompt: "Question Word Order: 'Where do you come from?'",
    content: "kommen / Sie / Woher / ?",
    correctAnswer: "Woher kommen Sie?",
    explanation: "W-Word + Verb + Subject."
  },

  // === SECTION 2: ARTICLES & CASES (NOMINATIV vs AKKUSATIV) ===
  {
    id: "rev-3-case",
    type: "fill-gap",
    prompt: "Nominativ: '___ Mann ist nett.' (The man - Subject)",
    content: "______ Mann ist nett.",
    correctAnswer: "Der",
    explanation: "Subject is Nominativ. Masculine = Der."
  },
  {
    id: "rev-4-case",
    type: "fill-gap",
    prompt: "Akkusativ: 'Ich kenne ___ Mann.' (The man - Object)",
    content: "Ich kenne ______ Mann.",
    correctAnswer: "den",
    explanation: "Object is Akkusativ. Masculine changes: Der -> Den."
  },
  {
    id: "rev-5-case",
    type: "fill-gap",
    prompt: "Akkusativ: 'Ich habe ___ Buch.' (A book - Neuter)",
    content: "Ich habe ______ Buch.",
    correctAnswer: "ein",
    explanation: "Neuter (Das) does NOT change in Akkusativ. Ein -> Ein."
  },
  {
    id: "rev-6-negation",
    type: "fill-gap",
    prompt: "Negation: 'Ich habe ___ Hunger.' (I have NO hunger)",
    content: "Ich habe ______ Hunger.",
    correctAnswer: "keinen",
    explanation: "Hunger is Masculine (Der Hunger). Akkusativ negation: keinen."
  },

  // === SECTION 3: PREPOSITIONS (TIME & PLACE) ===
  {
    id: "rev-7-prep",
    type: "multiple-choice",
    prompt: "Which preposition for CLOCK time? (___ 8 Uhr)",
    options: ["am", "um", "im"],
    correctAnswer: "um",
    explanation: "Clock times always use 'um'."
  },
  {
    id: "rev-8-prep",
    type: "multiple-choice",
    prompt: "Which preposition for DAYS? (___ Montag)",
    options: ["am", "um", "im"],
    correctAnswer: "am",
    explanation: "Days and parts of days use 'am' (an dem)."
  },
  {
    id: "rev-9-prep",
    type: "multiple-choice",
    prompt: "Which preposition for MONTHS? (___ Juli)",
    options: ["am", "um", "im"],
    correctAnswer: "im",
    explanation: "Months and Seasons use 'im' (in dem)."
  },
  {
    id: "rev-10-prep",
    type: "fill-gap",
    prompt: "Movement: 'I go ___ Berlin.' (Cities)",
    content: "Ich fahre ______ Berlin.",
    correctAnswer: "nach",
    explanation: "Destinations (Cities/Countries without article) use 'nach'."
  },

  // === SECTION 4: CONJUGATION & PRONOUNS ===
  {
    id: "rev-11-conj",
    type: "fill-gap",
    prompt: "Irregular Verb 'fahren' (du): '___ du nach München?'",
    content: "______ du nach München?",
    correctAnswer: "Fährst",
    explanation: "Fahren is a strong verb (a -> ä). Du fährst."
  },
  {
    id: "rev-12-conj",
    type: "fill-gap",
    prompt: "Verb 'sein' (ihr - you plural): '___ ihr zu Hause?'",
    content: "______ ihr zu Hause?",
    correctAnswer: "Seid",
    explanation: "Ihr seid (You all are)."
  },
  {
    id: "rev-13-pronoun",
    type: "fill-gap",
    prompt: "Possessive: 'Das ist Anna und ___ Mann.' (HER husband)",
    content: "Das ist Anna und ______ Mann.",
    correctAnswer: "ihr",
    explanation: "Her = ihr. (His = sein)."
  },

  // === SECTION 5: SEPARABLE VERBS ===
  {
    id: "rev-14-sep",
    type: "arrange",
    prompt: "Einkaufen (to shop): 'I shop on Saturday.'",
    content: "ein / am / kaufe / Samstag / Ich / .",
    correctAnswer: "Ich kaufe am Samstag ein.",
    explanation: "Prefix 'ein' goes to the very end."
  },
  {
    id: "rev-15-sep",
    type: "arrange",
    prompt: "Anrufen (to call): 'He calls me.'",
    content: "ruft / Er / mich / an / .",
    correctAnswer: "Er ruft mich an.",
    explanation: "Prefix 'an' goes to the very end."
  },

  // === SECTION 6: PLURALS & VOCAB CHECK ===
  {
    id: "rev-16-pl",
    type: "multiple-choice",
    prompt: "Plural of 'Die Stadt' (City)",
    options: ["Die Stadten", "Die Städte", "Die Stadt"],
    correctAnswer: "Die Städte",
    explanation: "a -> ä + e."
  },
  {
    id: "rev-17-pl",
    type: "multiple-choice",
    prompt: "Plural of 'Das Kind' (Child)",
    options: ["Die Kinder", "Die Kinde", "Die Kind"],
    correctAnswer: "Die Kinder",
    explanation: "Adds -er."
  },
  {
    id: "rev-18-vocab",
    type: "multiple-choice",
    prompt: "What is 'Das Frühstück'?",
    options: ["Breakfast", "Lunch", "Dinner"],
    correctAnswer: "Breakfast",
    explanation: "Früh = Early, Stück = Piece."
  },
  
  // === SECTION 7: IMPERATIVE ===
  {
    id: "rev-19-imp",
    type: "fill-gap",
    prompt: "Imperative (Sie): '___ this!' (Lesen)",
    content: "______ Sie das!",
    correctAnswer: "Lesen",
    explanation: "Formal imperative is simple: Verb + Sie."
  },
  {
    id: "rev-20-imp",
    type: "fill-gap",
    prompt: "Imperative (Du): '___ quiet!' (Sein)",
    content: "______ leise!",
    correctAnswer: "Sei",
    explanation: "Irregular imperative of sein -> Sei!"
  }
];
