
import { BookUnit } from "../types";
import { UNIT1_EXERCISES } from "./unit1";
import { UNIT2_EXERCISES } from "./unit2";
import { UNIT3_EXERCISES } from "./unit3";
import { UNIT4_EXERCISES } from "./unit4";
import { UNIT5_EXERCISES } from "./unit5";
import { UNIT6_EXERCISES } from "./unit6";
import { UNIT7_EXERCISES } from "./unit7";
import { UNIT_REVIEW_1_6 } from "./unitReview1to6";

export const BOOK_UNITS: BookUnit[] = [
  // ==========================================
  // UNIT 1: Extensive Mode
  // ==========================================
  {
    id: "unit-1",
    title: "Unit 1: Kaffee oder Tee?",
    description: "Greetings, ordering in a café, introductions, and numbers 0-20.",
    exercises: UNIT1_EXERCISES
  },

  // ==========================================
  // UNIT 2
  // ==========================================
  {
    id: "unit-2",
    title: "Unit 2: Sprache im Kurs",
    description: "Classroom objects, articles (der/die/das), and questions.",
    exercises: UNIT2_EXERCISES
  },

  // ==========================================
  // UNIT 3
  // ==========================================
  {
    id: "unit-3",
    title: "Unit 3: Städte, Länder, Sprachen",
    description: "Geography, origins, and regular verb conjugation.",
    exercises: UNIT3_EXERCISES
  },

  // ==========================================
  // UNIT 4
  // ==========================================
  {
    id: "unit-4",
    title: "Unit 4: Menschen & Häuser",
    description: "Describing homes, furniture, and the Akkusativ case.",
    exercises: UNIT4_EXERCISES
  },

  // ==========================================
  // UNIT 5
  // ==========================================
  {
    id: "unit-5",
    title: "Unit 5: Termine",
    description: "Time, days, appointments, and separable verbs.",
    exercises: UNIT5_EXERCISES
  },

  // ==========================================
  // UNIT 6
  // ==========================================
  {
    id: "unit-6",
    title: "Unit 6: Orientierung",
    description: "Directions, Dative prepositions, and 'zu' vs 'nach'.",
    exercises: UNIT6_EXERCISES
  },

  // ==========================================
  // REVIEW UNIT 1-6
  // ==========================================
  {
    id: "review-1-6",
    title: "🔥 Midterm Review (Units 1-6)",
    description: "Critical review of Cases, Word Order, and Prepositions to ensure mastery.",
    exercises: UNIT_REVIEW_1_6
  },

  // ==========================================
  // UNIT 7
  // ==========================================
  {
    id: "unit-7",
    title: "Unit 7: Berufe",
    description: "Professions, workplace, and modal verbs (können/müssen).",
    exercises: UNIT7_EXERCISES
  },

  // ==========================================
  // UNIT 8
  // ==========================================
  {
    id: "unit-8",
    title: "Unit 8: Berlin sehen",
    description: "Sightseeing, Prepositions (Akk), and Ordinal numbers.",
    exercises: [
      {
        id: "u8-ex1",
        type: "multiple-choice",
        prompt: "Preposition (Akk): 'The gift is FOR you.'",
        options: ["für", "mit", "von"],
        correctAnswer: "für",
        explanation: "'Für' always takes the Akkusativ case."
      },
      {
        id: "u8-ex2",
        type: "fill-gap",
        prompt: "Preposition (Akk): 'We walk THROUGH the park.'",
        content: "Wir gehen ______ den Park.",
        correctAnswer: "durch",
        explanation: "'Durch' (through) is always Akkusativ."
      },
      {
        id: "u8-ex3",
        type: "fill-gap",
        prompt: "Past tense of sein (was): 'I ___ in Berlin.'",
        content: "Ich ______ in Berlin.",
        correctAnswer: "war",
        explanation: "Ich war, du warst, er war."
      },
      {
        id: "u8-ex4",
        type: "arrange",
        prompt: "Past tense sentence.",
        content: "Wetter / Das / super / war / .",
        correctAnswer: "Das Wetter war super.",
        explanation: "Simple past of sein acts like a normal verb."
      },
      {
        id: "u8-ex5",
        type: "multiple-choice",
        prompt: "Ordinal Number: 'The 1st day.'",
        options: ["Der eins Tag", "Der erste Tag", "Der einste Tag"],
        correctAnswer: "Der erste Tag",
        explanation: "1st = erste, 2nd = zweite, 3rd = dritte."
      }
    ]
  },

  // ==========================================
  // UNIT 9
  // ==========================================
  {
    id: "unit-9",
    title: "Unit 9: Ab in den Urlaub",
    description: "The Perfect Tense (Perfekt) - Speaking about the past.",
    exercises: [
      {
        id: "u9-ex1",
        type: "multiple-choice",
        prompt: "Helper verb for 'fahren' (drive/go)?",
        options: ["haben", "sein"],
        correctAnswer: "sein",
        explanation: "Movement verbs (fahren, gehen, fliegen) use 'sein' in Perfekt."
      },
      {
        id: "u9-ex2",
        type: "multiple-choice",
        prompt: "Helper verb for 'kaufen' (buy)?",
        options: ["haben", "sein"],
        correctAnswer: "haben",
        explanation: "Most verbs (no movement) use 'haben'."
      },
      {
        id: "u9-ex3",
        type: "fill-gap",
        prompt: "Participle of 'machen': 'Ich habe Sport ______.'",
        content: "Ich habe Sport ______.",
        correctAnswer: "gemacht",
        explanation: "Regular verbs: ge + stem + t."
      },
      {
        id: "u9-ex4",
        type: "fill-gap",
        prompt: "Participle of 'essen': 'Wir haben Pizza ______.'",
        content: "Wir haben Pizza ______.",
        correctAnswer: "gegessen",
        explanation: "Irregular verbs often end in -en (ge-gess-en)."
      },
      {
        id: "u9-ex5",
        type: "arrange",
        prompt: "Word Order (Perfekt).",
        content: "gelernt / Ich / Deutsch / habe / .",
        correctAnswer: "Ich habe Deutsch gelernt.",
        explanation: "Helper (habe) in pos 2. Participle (gelernt) at the VERY END."
      }
    ]
  },

  // ==========================================
  // UNIT 10
  // ==========================================
  {
    id: "unit-10",
    title: "Unit 10: Essen & Trinken",
    description: "Food, frequency words, and 'mögen' vs 'möchten'.",
    exercises: [
      {
        id: "u10-ex1",
        type: "fill-gap",
        prompt: "Plural of 'der Apfel' (Apple).",
        content: "Ich kaufe drei ______.",
        correctAnswer: "Äpfel",
        explanation: "Apfel -> Äpfel (Vowel change)."
      },
      {
        id: "u10-ex2",
        type: "fill-gap",
        prompt: "Verb 'mögen' (to like) for 'ich'.",
        content: "Ich ______ Schokolade.",
        correctAnswer: "mag",
        explanation: "Irregular: Ich mag, du magst, er mag."
      },
      {
        id: "u10-ex3",
        type: "multiple-choice",
        prompt: "Translation: 'Vegetables'",
        options: ["Das Obst", "Das Gemüse", "Das Fleisch"],
        correctAnswer: "Das Gemüse",
        explanation: "Obst (Fruit), Fleisch (Meat)."
      },
      {
        id: "u10-ex4",
        type: "arrange",
        prompt: "Frequency: 'I never eat meat.'",
        content: "esse / Fleisch / nie / Ich / .",
        correctAnswer: "Ich esse nie Fleisch.",
        explanation: "Adverb 'nie' usually after the verb."
      },
      {
        id: "u10-ex5",
        type: "fill-gap",
        prompt: "Question word: '___ much is that?'",
        content: "______ viel ist das?",
        correctAnswer: "Wie",
        explanation: "Wie viel = How much."
      }
    ]
  },

  // ==========================================
  // UNIT 11
  // ==========================================
  {
    id: "unit-11",
    title: "Unit 11: Kleidung",
    description: "Shopping, Adjective endings (Akkusativ), and demonstratives.",
    exercises: [
      {
        id: "u11-ex1",
        type: "fill-gap",
        prompt: "Akkusativ Adjective (Masc): 'I buy the RED pullover.' (Der Pullover)",
        content: "Ich kaufe den ______ Pullover.",
        correctAnswer: "roten",
        explanation: "Den + -en ending (Weak declension). 'Den roten Pullover'."
      },
      {
        id: "u11-ex2",
        type: "fill-gap",
        prompt: "Akkusativ Adjective (Indefinite Masc): 'I buy A RED pullover.'",
        content: "Ich kaufe einen ______ Pullover.",
        correctAnswer: "roten",
        explanation: "Einen + -en ending (Mixed declension). 'Einen roten Pullover'."
      },
      {
        id: "u11-ex3",
        type: "fill-gap",
        prompt: "Akkusativ Adjective (Neut): 'I buy the blue shirt.' (Das Hemd)",
        content: "Ich kaufe das ______ Hemd.",
        correctAnswer: "blaue",
        explanation: "Das + -e ending. 'Das blaue Hemd'."
      },
      {
        id: "u11-ex4",
        type: "multiple-choice",
        prompt: "Question: 'Which pullover?'",
        options: ["Welcher Pullover?", "Welchen Pullover?", "Welches Pullover?"],
        correctAnswer: "Welcher Pullover?",
        explanation: "In Nominativ (Subject), it's 'Welcher' (like Der)."
      },
      {
        id: "u11-ex5",
        type: "arrange",
        prompt: "Expressing opinion: 'I find the pants too expensive.'",
        content: "finde / Hose / zu / Ich / die / teuer / .",
        correctAnswer: "Ich finde die Hose zu teuer.",
        explanation: "Subject + Verb + Object + Adjective."
      }
    ]
  },

  // ==========================================
  // UNIT 12
  // ==========================================
  {
    id: "unit-12",
    title: "Unit 12: Körper & Gesundheit",
    description: "Body parts, giving advice (Imperative), and modal verbs.",
    exercises: [
      {
        id: "u12-ex1",
        type: "multiple-choice",
        prompt: "Plural of 'das Auge' (Eye).",
        options: ["Augen", "Auges", "Auge"],
        correctAnswer: "Augen",
        explanation: "Most neutrals take -en or -er. Auge -> Augen."
      },
      {
        id: "u12-ex2",
        type: "fill-gap",
        prompt: "Imperative (Du form): '___ home!' (Gehen)",
        content: "______ nach Hause!",
        correctAnswer: "Geh",
        explanation: "Remove the -st from 'du gehst'. -> 'Geh!'"
      },
      {
        id: "u12-ex3",
        type: "fill-gap",
        prompt: "Imperative (Du form): '___ the tablet!' (Nehmen - vowel change)",
        content: "______ die Tablette!",
        correctAnswer: "Nimm",
        explanation: "Strong verbs retain vowel change (du nimmst -> Nimm!)."
      },
      {
        id: "u12-ex4",
        type: "fill-gap",
        prompt: "Modal verb (sollen - advice): 'You ___ sleep.'",
        content: "Du ______ schlafen.",
        correctAnswer: "sollst",
        explanation: "Ich soll, du sollst, er soll."
      },
      {
        id: "u12-ex5",
        type: "arrange",
        prompt: "Describing pain: 'My head hurts.'",
        content: "weh / Kopf / Mein / tut / .",
        correctAnswer: "Mein Kopf tut weh.",
        explanation: "Separate verb 'wehtun'. Subject + tut ... weh."
      }
    ]
  }
];
