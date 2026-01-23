
import { BookExercise } from "../types";

export const UNIT3_EXERCISES: BookExercise[] = [
  // === PART 1: PLACES & ORIGINS ===
  {
    id: "u3-place-1",
    type: "fill-gap",
    prompt: "Preposition: 'I come FROM Italy.'",
    content: "Ich komme ______ Italien.",
    correctAnswer: "aus",
    explanation: "Use 'aus' for origin (countries/cities)."
  },
  {
    id: "u3-place-2",
    type: "fill-gap",
    prompt: "Preposition: 'I live IN Berlin.'",
    content: "Ich wohne ______ Berlin.",
    correctAnswer: "in",
    explanation: "Use 'in' for current location."
  },
  {
    id: "u3-place-3",
    type: "arrange",
    prompt: "Question: Where do you live?",
    content: "du / wohnst / Wo / ?",
    correctAnswer: "Wo wohnst du?",
    explanation: "Wo (Where) + Verb + Subject."
  },
  {
    id: "u3-place-4",
    type: "arrange",
    prompt: "Question: Where are you from?",
    content: "Woher / Sie / kommen / ?",
    correctAnswer: "Woher kommen Sie?",
    explanation: "Woher (Where from) implies motion/origin."
  },

  // === PART 2: VERB CONJUGATION (REGULAR) ===
  {
    id: "u3-verb-1",
    type: "fill-gap",
    prompt: "Conjugate 'wohnen': 'Wir ___ in Köln.'",
    content: "Wir ______ in Köln.",
    correctAnswer: "wohnen",
    explanation: "Wir takes the infinitive (-en)."
  },
  {
    id: "u3-verb-2",
    type: "fill-gap",
    prompt: "Conjugate 'kommen': 'Er ___ aus Bern.'",
    content: "Er ______ aus Bern.",
    correctAnswer: "kommt",
    explanation: "Er/Sie/Es ending is -t."
  },
  {
    id: "u3-verb-3",
    type: "fill-gap",
    prompt: "Conjugate 'heißen': 'Du ___ Max.'",
    content: "Du ______ Max.",
    correctAnswer: "heißt",
    explanation: "Special case: 'ß' stem ends in s-sound, so du adds only -t, not -st."
  },

  // === PART 3: IRREGULAR VERBS (SPRECHEN/FAHREN) ===
  {
    id: "u3-irr-1",
    type: "fill-gap",
    prompt: "Sprechen (to speak): 'Du ___ gut Deutsch.'",
    content: "Du ______ gut Deutsch.",
    correctAnswer: "sprichst",
    explanation: "Vowel change e -> i for Du/Er/Sie/Es."
  },
  {
    id: "u3-irr-2",
    type: "fill-gap",
    prompt: "Sprechen (to speak): 'Er ___ Englisch.'",
    content: "Er ______ Englisch.",
    correctAnswer: "spricht",
    explanation: "Vowel change e -> i."
  },
  {
    id: "u3-irr-3",
    type: "multiple-choice",
    prompt: "Which form is correct for 'fahren' (to drive)?",
    options: ["Du fahrst", "Du fährst", "Du fuhrt"],
    correctAnswer: "Du fährst",
    explanation: "Vowel change a -> ä for Du/Er/Sie/Es."
  },

  // === PART 4: GEOGRAPHY ===
  {
    id: "u3-geo-1",
    type: "multiple-choice",
    prompt: "Where is Munich?",
    options: ["Im Norden", "Im Süden", "Im Westen"],
    correctAnswer: "Im Süden",
    explanation: "München is in southern Germany."
  },
  {
    id: "u3-geo-2",
    type: "arrange",
    prompt: "Berlin is the capital.",
    content: "Hauptstadt / ist / Berlin / die / .",
    correctAnswer: "Berlin ist die Hauptstadt.",
    explanation: "Subject + Verb + Predicate."
  },
  {
    id: "u3-geo-3",
    type: "multiple-choice",
    prompt: "Which country requires an article?",
    options: ["Deutschland", "Frankreich", "Türkei"],
    correctAnswer: "Türkei",
    explanation: "It is 'Die Türkei' (feminine)."
  },

  // === PART 5: REVIEW ===
  {
    id: "u3-rev-1",
    type: "fill-gap",
    prompt: "Formal question: 'What do you speak?'",
    content: "Was ______ Sie?",
    correctAnswer: "sprechen",
    explanation: "Sie (formal) takes -en."
  },
  {
    id: "u3-rev-2",
    type: "arrange",
    prompt: "I speak a little Spanish.",
    content: "Spanisch / ein / spreche / Ich / bisschen / .",
    correctAnswer: "Ich spreche ein bisschen Spanisch.",
    explanation: "ein bisschen = a little bit."
  },

  // === PART 6: MASTERY (MAN & LANGUAGES) ===
  {
    id: "u3-mastery-1",
    type: "fill-gap",
    prompt: "Impersonal 'One' (Man): 'In Austria, ___ speaks German.'",
    content: "In Österreich spricht ______ Deutsch.",
    correctAnswer: "man",
    explanation: "'Man' (one/people) conjugates like er/sie/es (spricht)."
  },
  {
    id: "u3-mastery-2",
    type: "multiple-choice",
    prompt: "What is the capital of France (Frankreich)?",
    options: ["London", "Paris", "Berlin"],
    correctAnswer: "Paris",
    explanation: "General knowledge test in context."
  },
  {
    id: "u3-mastery-3",
    type: "fill-gap",
    prompt: "In Poland one speaks ___.",
    content: "In Polen spricht man ______.",
    correctAnswer: "Polnisch",
    explanation: "Language name."
  }
];
