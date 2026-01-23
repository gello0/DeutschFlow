
import { BookExercise } from "../types";

export const UNIT4_EXERCISES: BookExercise[] = [
  // === PART 1: ROOMS & HOUSES ===
  {
    id: "u4-room-1",
    type: "multiple-choice",
    prompt: "What is 'Das Bad'?",
    options: ["The bed", "The bath/bathroom", "The kitchen"],
    correctAnswer: "The bath/bathroom",
    explanation: "Bad = Bathroom."
  },
  {
    id: "u4-room-2",
    type: "fill-gap",
    prompt: "We cook in the ___ (Küche).",
    content: "Wir kochen in der ______.",
    correctAnswer: "Küche",
    explanation: "Noun capitalization."
  },
  {
    id: "u4-room-3",
    type: "arrange",
    prompt: "The apartment is big.",
    content: "Wohnung / ist / Die / groß / .",
    correctAnswer: "Die Wohnung ist groß.",
    explanation: "Subject + Verb + Adjective."
  },

  // === PART 2: THE AKKUSATIV (HABEN) ===
  {
    id: "u4-akk-1",
    type: "multiple-choice",
    prompt: "Which verb always triggers Akkusativ?",
    options: ["sein", "haben", "heißen"],
    correctAnswer: "haben",
    explanation: "Haben implies ownership/having an object."
  },
  {
    id: "u4-akk-2",
    type: "fill-gap",
    prompt: "Masc (Der Tisch): 'Ich habe ___ Tisch.'",
    content: "Ich habe ______ Tisch.",
    correctAnswer: "einen",
    explanation: "Der -> Den / Ein -> Einen in Akkusativ."
  },
  {
    id: "u4-akk-3",
    type: "fill-gap",
    prompt: "Neut (Das Bett): 'Wir haben ___ Bett.'",
    content: "Wir haben ______ Bett.",
    correctAnswer: "ein",
    explanation: "Das/Ein does NOT change in Akkusativ."
  },
  {
    id: "u4-akk-4",
    type: "fill-gap",
    prompt: "Fem (Die Lampe): 'Sie hat ___ Lampe.'",
    content: "Sie hat ______ Lampe.",
    correctAnswer: "eine",
    explanation: "Die/Eine does NOT change in Akkusativ."
  },
  {
    id: "u4-akk-5",
    type: "arrange",
    prompt: "I have a balcony (Der Balkon).",
    content: "einen / habe / Balkon / Ich / .",
    correctAnswer: "Ich habe einen Balkon.",
    explanation: "Subject + Verb + Akkusativ Object."
  },

  // === PART 3: ADJECTIVES & OPPOSITES ===
  {
    id: "u4-adj-1",
    type: "multiple-choice",
    prompt: "Opposite of 'groß' (big)?",
    options: ["kurz", "klein", "dunkel"],
    correctAnswer: "klein",
    explanation: "Groß <> Klein."
  },
  {
    id: "u4-adj-2",
    type: "multiple-choice",
    prompt: "Opposite of 'teuer' (expensive)?",
    options: ["billig", "schön", "hell"],
    correctAnswer: "billig",
    explanation: "Teuer <> Billig (cheap)."
  },
  {
    id: "u4-adj-3",
    type: "fill-gap",
    prompt: "The room is very bright (hell).",
    content: "Das Zimmer ist sehr ______.",
    correctAnswer: "hell",
    explanation: "Adjective comes at the end."
  },
  {
    id: "u4-adj-4",
    type: "arrange",
    prompt: "The furniture is old.",
    content: "sind / alt / Die / Möbel / .",
    correctAnswer: "Die Möbel sind alt.",
    explanation: "Plural subject (Die Möbel) + Plural verb (sind)."
  },

  // === PART 4: NUMBERS & PRICES ===
  {
    id: "u4-num-1",
    type: "multiple-choice",
    prompt: "Translate '75'",
    options: ["Fünfundsiebzig", "Siebenundfünfzig", "Siebzigfünf"],
    correctAnswer: "Fünfundsiebzig",
    explanation: "5 (Fünf) + and (und) + 70 (siebzig)."
  },
  {
    id: "u4-num-2",
    type: "fill-gap",
    prompt: "Translate '100'.",
    content: "______.",
    correctAnswer: "Hundert",
    explanation: "Or 'Einhundert'."
  },
  {
    id: "u4-num-3",
    type: "arrange",
    prompt: "That costs 90 Euro.",
    content: "kostet / 90 / Das / Euro / .",
    correctAnswer: "Das kostet 90 Euro.",
    explanation: "Verb in position 2."
  },

  // === PART 5: MASTERY (NEGATIVE AKKUSATIV) ===
  {
    id: "u4-mastery-1",
    type: "arrange",
    prompt: "I have NO TV (Der Fernseher).",
    content: "keinen / habe / Ich / Fernseher / .",
    correctAnswer: "Ich habe keinen Fernseher.",
    explanation: "Akkusativ Masculine Negation: Kein -> Keinen."
  },
  {
    id: "u4-mastery-2",
    type: "fill-gap",
    prompt: "Plural: 'The furniture ___ (be) modern.'",
    content: "Die Möbel ______ modern.",
    correctAnswer: "sind",
    explanation: "Möbel is plural -> sind."
  }
];
