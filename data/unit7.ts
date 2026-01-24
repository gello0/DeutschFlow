
import { BookExercise } from "../types";

export const UNIT7_EXERCISES: BookExercise[] = [
  // === PART 1: PROFESSIONS & GENDER (MASCULINE VS FEMININE) ===
  {
    id: "u7-gender-1",
    type: "fill-gap",
    prompt: "Female form of 'Der Lehrer' (Teacher).",
    content: "Die ______.",
    correctAnswer: "Lehrerin",
    explanation: "Add '-in' to most masculine professions to make them feminine."
  },
  {
    id: "u7-gender-2",
    type: "fill-gap",
    prompt: "Female form of 'Der Student'.",
    content: "Die ______.",
    correctAnswer: "Studentin",
    explanation: "Der Student -> Die Studentin."
  },
  {
    id: "u7-gender-3",
    type: "multiple-choice",
    prompt: "Male form of 'Die Ärztin' (Doctor).",
    options: ["Der Ärzt", "Der Arzt", "Der Arzte"],
    correctAnswer: "Der Arzt",
    explanation: "Feminine often adds Umlaut (Arzt -> Ärztin). Remove it for masculine."
  },
  {
    id: "u7-gender-4",
    type: "fill-gap",
    prompt: "Plural of 'Die Lehrerin' (The female teachers).",
    content: "Die ______.",
    correctAnswer: "Lehrerinnen",
    explanation: "Feminine nouns ending in '-in' double the 'n' in plural: -innen."
  },

  // === PART 2: MODAL VERB 'KÖNNEN' (ABILITY) ===
  {
    id: "u7-koennen-1",
    type: "fill-gap",
    prompt: "Conjugate 'können': 'I ___ speak German.'",
    content: "Ich ______ Deutsch sprechen.",
    correctAnswer: "kann",
    explanation: "Irregular singular: Ich kann, du kannst, er kann."
  },
  {
    id: "u7-koennen-2",
    type: "fill-gap",
    prompt: "Conjugate 'können': '___ you cook?' (Informal)",
    content: "______ du kochen?",
    correctAnswer: "Kannst",
    explanation: "Du form adds -st to the stem 'kann'."
  },
  {
    id: "u7-koennen-3",
    type: "multiple-choice",
    prompt: "Correct form: 'Wir ___ das machen.'",
    options: ["können", "kann", "könnt"],
    correctAnswer: "können",
    explanation: "Plural 'Wir' always takes the infinitive form."
  },

  // === PART 3: MODAL VERB 'MÜSSEN' (OBLIGATION) ===
  {
    id: "u7-muessen-1",
    type: "fill-gap",
    prompt: "Conjugate 'müssen': 'I ___ work.'",
    content: "Ich ______ arbeiten.",
    correctAnswer: "muss",
    explanation: "Vowel change ü -> u in singular. Ich muss."
  },
  {
    id: "u7-muessen-2",
    type: "fill-gap",
    prompt: "Conjugate 'müssen': 'He ___ sleep.'",
    content: "Er ______ schlafen.",
    correctAnswer: "muss",
    explanation: "Er/Sie/Es form is the same as Ich form for modals."
  },
  {
    id: "u7-muessen-3",
    type: "arrange",
    prompt: "Translate: 'We have to go.'",
    content: "gehen / müssen / Wir / .",
    correctAnswer: "Wir müssen gehen.",
    explanation: "Subject + Modal Verb + Infinitive."
  },

  // === PART 4: SENTENCE STRUCTURE (MODAL BRACKET) ===
  {
    id: "u7-sent-1",
    type: "arrange",
    prompt: "Arrange: 'I can speak English very well.'",
    content: "gut / sprechen / kann / sehr / Englisch / Ich / .",
    correctAnswer: "Ich kann sehr gut Englisch sprechen.",
    explanation: "Conjugated modal (kann) is Pos 2. Infinitive (sprechen) is LAST."
  },
  {
    id: "u7-sent-2",
    type: "arrange",
    prompt: "Arrange: 'She has to write an email.'",
    content: "schreiben / Sie / E-Mail / eine / muss / .",
    correctAnswer: "Sie muss eine E-Mail schreiben.",
    explanation: "Conjugated modal (muss) is Pos 2. Infinitive (schreiben) is LAST."
  },
  {
    id: "u7-sent-3",
    type: "fill-gap",
    prompt: "Fix the ending: 'Kannst du Klavier spiel___?'",
    content: "Kannst du Klavier spiel______?",
    correctAnswer: "en",
    explanation: "The second verb with a modal is always the Infinitive (-en)."
  },

  // === PART 5: WORKPLACE PREPOSITIONS ===
  {
    id: "u7-work-1",
    type: "fill-gap",
    prompt: "Employer: 'I work ___ Siemens.'",
    content: "Ich arbeite ______ Siemens.",
    correctAnswer: "bei",
    explanation: "Use 'bei' for companies/employers."
  },
  {
    id: "u7-work-2",
    type: "fill-gap",
    prompt: "Role: 'I work ___ engineer.'",
    content: "Ich arbeite ______ Ingenieur.",
    correctAnswer: "als",
    explanation: "Use 'als' for your job title/role."
  },
  {
    id: "u7-work-3",
    type: "multiple-choice",
    prompt: "What means 'Employer'?",
    options: ["Arbeitnehmer", "Arbeitgeber", "Arbeitsamt"],
    correctAnswer: "Arbeitgeber",
    explanation: "Geber = Giver (Employer). Nehmer = Taker (Employee)."
  }
];
