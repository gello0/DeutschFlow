
import { BookExercise } from "../types";

export const UNIT5_EXERCISES: BookExercise[] = [
  // === PART 1: TELLING TIME ===
  {
    id: "u5-time-1",
    type: "fill-gap",
    prompt: "Preposition for time: '___ 3 Uhr.'",
    content: "Wir treffen uns ______ 3 Uhr.",
    correctAnswer: "um",
    explanation: "Clock times always use 'um'."
  },
  {
    id: "u5-time-2",
    type: "multiple-choice",
    prompt: "Translate: 2:30",
    options: ["Halb zwei", "Halb drei", "Zwei Uhr dreißig"],
    correctAnswer: "Halb drei",
    explanation: "In German, 'Halb' refers to the UPCOMING hour. Half OF three."
  },
  {
    id: "u5-time-3",
    type: "multiple-choice",
    prompt: "Translate: 10:15",
    options: ["Viertel vor zehn", "Viertel nach zehn", "Zehn Uhr fünfzehn"],
    correctAnswer: "Viertel nach zehn",
    explanation: "Quarter PAST (nach) ten."
  },
  {
    id: "u5-time-4",
    type: "multiple-choice",
    prompt: "Translate: 10:45",
    options: ["Viertel vor elf", "Viertel nach zehn", "Viertel vor zehn"],
    correctAnswer: "Viertel vor elf",
    explanation: "Quarter TO (vor) eleven."
  },

  // === PART 2: DAYS & PREPOSITIONS ===
  {
    id: "u5-day-1",
    type: "fill-gap",
    prompt: "Preposition for days: '___ Montag.'",
    content: "Ich komme ______ Montag.",
    correctAnswer: "am",
    explanation: "Days and parts of days use 'am' (an dem)."
  },
  {
    id: "u5-day-2",
    type: "multiple-choice",
    prompt: "Which is NOT a time of day?",
    options: ["Morgen", "Mittag", "Tisch", "Abend"],
    correctAnswer: "Tisch",
    explanation: "Tisch is a table."
  },
  {
    id: "u5-day-3",
    type: "arrange",
    prompt: "I have no time on Friday.",
    content: "Freitag / keine / am / Zeit / habe / Ich / .",
    correctAnswer: "Ich habe am Freitag keine Zeit.",
    explanation: "Time phrase (am Freitag) usually after Verb."
  },

  // === PART 3: SEPARABLE VERBS ===
  {
    id: "u5-sep-1",
    type: "fill-gap",
    prompt: "Anfangen (to start): 'Der Film ___ an.'",
    content: "Der Film ______ an.",
    correctAnswer: "fängt",
    explanation: "Stem vowel change a -> ä. Prefix 'an' at the end."
  },
  {
    id: "u5-sep-2",
    type: "fill-gap",
    prompt: "Anrufen (to call): 'Ich ___ dich an.'",
    content: "Ich ______ dich an.",
    correctAnswer: "rufe",
    explanation: "Stem 'rufe' in pos 2. Prefix 'an' at the end."
  },
  {
    id: "u5-sep-3",
    type: "arrange",
    prompt: "He gets up at 6. (aufstehen)",
    content: "um / steht / Er / auf / 6 Uhr / .",
    correctAnswer: "Er steht um 6 Uhr auf.",
    explanation: "Verb 'steht' pos 2. Prefix 'auf' last."
  },
  {
    id: "u5-sep-4",
    type: "multiple-choice",
    prompt: "Which verb is separable?",
    options: ["verstehen", "aufstehen", "besuchen"],
    correctAnswer: "aufstehen",
    explanation: "Prefixes like auf-, an-, mit- are separable. Ver-, be- are not."
  },

  // === PART 4: WANN & PREPOSITIONS ===
  {
    id: "u5-wann-1",
    type: "fill-gap",
    prompt: "From ... to ... : '___ 8 ___ 10 Uhr.'",
    content: "Der Kurs ist ______ 8 ______ 10 Uhr.",
    correctAnswer: "von bis",
    explanation: "Von ... bis (From ... until)."
  },
  {
    id: "u5-wann-2",
    type: "arrange",
    prompt: "When does the train leave?",
    content: "Zug / fährt / Wann / ab / der / ?",
    correctAnswer: "Wann fährt der Zug ab?",
    explanation: "Abfahren (separable). Wann + stem + subject + prefix."
  },

  // === PART 5: MASTERY (FINE DETAILS) ===
  {
    id: "u5-mastery-1",
    type: "multiple-choice",
    prompt: "How do you ask for the specific time on the clock?",
    options: ["Wann ist es?", "Wie spät ist es?", "Wie viel Uhr?"],
    correctAnswer: "Wie spät ist es?",
    explanation: "Standard phrase for 'What time is it?'."
  },
  {
    id: "u5-mastery-2",
    type: "arrange",
    prompt: "I am free on the weekend.",
    content: "frei / habe / Wochenende / am / Ich / .",
    correctAnswer: "Ich habe am Wochenende frei.",
    explanation: "Time element (am Wochenende) often placed mid-sentence."
  }
];
