
import { BookExercise } from "../types";

export const UNIT6_EXERCISES: BookExercise[] = [
  // === PART 1: PLACES IN THE CITY ===
  {
    id: "u6-place-1",
    type: "multiple-choice",
    prompt: "Where do you buy stamps?",
    options: ["Die Bank", "Die Post", "Der Bahnhof"],
    correctAnswer: "Die Post",
    explanation: "Post office."
  },
  {
    id: "u6-place-2",
    type: "multiple-choice",
    prompt: "Where do you travel by train?",
    options: ["Der Flughafen", "Der Bahnhof", "Die Polizei"],
    correctAnswer: "Der Bahnhof",
    explanation: "Train station."
  },
  {
    id: "u6-place-3",
    type: "fill-gap",
    prompt: "Article: '___ Hotel' (Neut).",
    content: "Wo ist ______ Hotel?",
    correctAnswer: "das",
    explanation: "Das Hotel."
  },

  // === PART 2: PREPOSITIONS WITH DATIVE ===
  {
    id: "u6-dat-1",
    type: "fill-gap",
    prompt: "Zu + Dem (Masc/Neut) contracts to ___.",
    content: "Ich gehe ______ Bahnhof.",
    correctAnswer: "zum",
    explanation: "Zu + dem = zum."
  },
  {
    id: "u6-dat-2",
    type: "fill-gap",
    prompt: "Zu + Der (Fem) contracts to ___.",
    content: "Ich gehe ______ Bank.",
    correctAnswer: "zur",
    explanation: "Zu + der = zur."
  },
  {
    id: "u6-dat-3",
    type: "fill-gap",
    prompt: "Mit (with) always takes Dative. 'I go with the bus (der Bus).'",
    content: "Ich fahre mit ______ Bus.",
    correctAnswer: "dem",
    explanation: "Der -> Dem in Dative."
  },
  {
    id: "u6-dat-4",
    type: "multiple-choice",
    prompt: "Which preposition implies movement towards a city?",
    options: ["zu", "nach", "bei"],
    correctAnswer: "nach",
    explanation: "'Nach' Berlin, 'Nach' München."
  },
  {
    id: "u6-dat-5",
    type: "arrange",
    prompt: "I go to the university (Die Uni).",
    content: "zur / gehe / Ich / Uni / .",
    correctAnswer: "Ich gehe zur Uni.",
    explanation: "Zu + der = zur."
  },

  // === PART 3: DIRECTIONS & IMPERATIVE ===
  {
    id: "u6-dir-1",
    type: "multiple-choice",
    prompt: "Translation: 'Straight ahead'",
    options: ["Links", "Rechts", "Geradeaus"],
    correctAnswer: "Geradeaus",
    explanation: "Straight on."
  },
  {
    id: "u6-dir-2",
    type: "fill-gap",
    prompt: "Imperative (Sie): '___ left!' (Gehen)",
    content: "______ Sie links!",
    correctAnswer: "Gehen",
    explanation: "Formal imperative: Verb + Sie."
  },
  {
    id: "u6-dir-3",
    type: "fill-gap",
    prompt: "Imperative (Sie): '___ the bus!' (Nehmen)",
    content: "______ Sie den Bus!",
    correctAnswer: "Nehmen",
    explanation: "Formal imperative of Nehmen."
  },
  {
    id: "u6-dir-4",
    type: "arrange",
    prompt: "Turn right. (Sie form)",
    content: "Sie / rechts / Biegen / ab / .",
    correctAnswer: "Biegen Sie rechts ab.",
    explanation: "Abbiegen is separable. Biegen + Sie + direction + ab."
  },

  // === PART 4: WO vs WOHIN ===
  {
    id: "u6-wo-1",
    type: "multiple-choice",
    prompt: "Question for location (Static): '___ ist der Dom?'",
    options: ["Wo", "Wohin", "Woher"],
    correctAnswer: "Wo",
    explanation: "Wo = Where (static)."
  },
  {
    id: "u6-wo-2",
    type: "multiple-choice",
    prompt: "Question for movement: '___ gehen wir?'",
    options: ["Wo", "Wohin", "Woher"],
    correctAnswer: "Wohin",
    explanation: "Wohin = Where to (movement)."
  },

  // === PART 5: MASTERY (LOCATION DETAILS) ===
  {
    id: "u6-mastery-1",
    type: "fill-gap",
    prompt: "Ordinal Dative: 'On the 3rd floor.' (der dritte Stock -> dem ...)",
    content: "Im ______ Stock.",
    correctAnswer: "dritten",
    explanation: "Dative ending for adjectives/ordinals is -en."
  },
  {
    id: "u6-mastery-2",
    type: "multiple-choice",
    prompt: "How do you say 'on foot'?",
    options: ["Zu Fuß", "Mit Fuß", "Auf Fuß"],
    correctAnswer: "Zu Fuß",
    explanation: "Fixed expression."
  }
];
