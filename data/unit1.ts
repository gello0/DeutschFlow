
import { BookExercise } from "../types";

export const UNIT1_EXERCISES: BookExercise[] = [
  // === PART 1: GREETINGS & FAREWELLS ===
  {
    id: "u1-greet-1",
    type: "multiple-choice",
    prompt: "It is 9:00 AM. How do you greet someone formally?",
    options: ["Gute Nacht", "Guten Morgen", "Guten Abend", "Hallo"],
    correctAnswer: "Guten Morgen",
    explanation: "'Guten Morgen' is used in the morning hours."
  },
  {
    id: "u1-greet-2",
    type: "multiple-choice",
    prompt: "You are leaving a shop. What do you say?",
    options: ["Hallo", "Auf Wiedersehen", "Guten Tag", "Bitte"],
    correctAnswer: "Auf Wiedersehen",
    explanation: "'Auf Wiedersehen' is the standard formal goodbye."
  },
  {
    id: "u1-greet-3",
    type: "fill-gap",
    prompt: "Informal goodbye: '___ (Bye)!'",
    content: "______!",
    correctAnswer: "Tschüss",
    explanation: "'Tschüss' is the common informal way to say goodbye."
  },
  {
    id: "u1-greet-4",
    type: "arrange",
    prompt: "Formal greeting.",
    content: "Tag / Guten / Herr / Müller / .",
    correctAnswer: "Guten Tag Herr Müller.",
    explanation: "Standard formal greeting structure."
  },

  // === PART 2: INTRODUCTIONS (SEIN / HEIßEN) ===
  {
    id: "u1-intro-1",
    type: "fill-gap",
    prompt: "Conjugate 'sein' (to be): 'I ___ Anna.'",
    content: "Ich ______ Anna.",
    correctAnswer: "bin",
    explanation: "Ich bin, du bist, er ist."
  },
  {
    id: "u1-intro-2",
    type: "fill-gap",
    prompt: "Conjugate 'sein' (to be): 'Who ___ you?' (informal)",
    content: "Wer ______ du?",
    correctAnswer: "bist",
    explanation: "2nd person singular of sein: du bist."
  },
  {
    id: "u1-intro-3",
    type: "arrange",
    prompt: "Introduce yourself.",
    content: "heiße / Ich / Paco / .",
    correctAnswer: "Ich heiße Paco.",
    explanation: "Subject (Ich) + Verb (heiße) + Name."
  },
  {
    id: "u1-intro-4",
    type: "multiple-choice",
    prompt: "Which question is correct for 'What is your name?' (Formal)",
    options: ["Wer bist du?", "Wie heißen Sie?", "Was ist das?", "Wie geht es?"],
    correctAnswer: "Wie heißen Sie?",
    explanation: "'Sie' indicates the formal form. 'Wie heißen Sie' is standard."
  },
  {
    id: "u1-intro-5",
    type: "fill-gap",
    prompt: "Possessive: 'My name is Bond.'",
    content: "______ Name ist Bond.",
    correctAnswer: "Mein",
    explanation: "Mein (My) for masculine nouns like 'Name'."
  },

  // === PART 3: ORIGIN (KOMMEN AUS) ===
  {
    id: "u1-origin-1",
    type: "fill-gap",
    prompt: "Conjugate 'kommen': 'I ___ from Spain.'",
    content: "Ich ______ aus Spanien.",
    correctAnswer: "komme",
    explanation: "Regular conjugation: ich komm-e."
  },
  {
    id: "u1-origin-2",
    type: "arrange",
    prompt: "Ask where someone is from (Formal).",
    content: "Sie / kommen / Woher / ?",
    correctAnswer: "Woher kommen Sie?",
    explanation: "W-Word (Woher) + Verb (kommen) + Subject (Sie)."
  },
  {
    id: "u1-origin-3",
    type: "fill-gap",
    prompt: "Preposition: 'He comes ___ Berlin.'",
    content: "Er kommt ______ Berlin.",
    correctAnswer: "aus",
    explanation: "Use 'aus' for cities and countries of origin."
  },
  {
    id: "u1-origin-4",
    type: "multiple-choice",
    prompt: "Which verb form is correct? 'Du ___ aus Italien.'",
    options: ["kommst", "kommt", "kommen", "komme"],
    correctAnswer: "kommst",
    explanation: "2nd person singular ending is -st."
  },

  // === PART 4: IN THE CAFE (ORDERING) ===
  {
    id: "u1-cafe-1",
    type: "fill-gap",
    prompt: "Polite wish: 'I ___ a tea.'",
    content: "Ich ______ einen Tee.",
    correctAnswer: "möchte",
    explanation: "'Möchte' (would like) is standard for ordering."
  },
  {
    id: "u1-cafe-2",
    type: "multiple-choice",
    prompt: "Waiter asks: 'What would you like?'",
    options: ["Was trinken Sie?", "Wer sind Sie?", "Woher kommen Sie?", "Wie heißt das?"],
    correctAnswer: "Was trinken Sie?",
    explanation: "Asking about drinks."
  },
  {
    id: "u1-cafe-3",
    type: "arrange",
    prompt: "Order a water.",
    content: "Mineralwasser / bitte / ein / Ich / nehme / .",
    correctAnswer: "Ich nehme ein Mineralwasser bitte.",
    explanation: "Verb (nehme) in position 2."
  },
  {
    id: "u1-cafe-4",
    type: "fill-gap",
    prompt: "Akkusativ: 'I take ___ coffee.' (Der Kaffee)",
    content: "Ich nehme ______ Kaffee.",
    correctAnswer: "einen",
    explanation: "Masculine 'einen' in Akkusativ object position."
  },
  {
    id: "u1-cafe-5",
    type: "multiple-choice",
    prompt: "Asking if a seat is free.",
    options: ["Ist hier noch frei?", "Ist das Kaffee?", "Was kostet das?", "Wie geht es?"],
    correctAnswer: "Ist hier noch frei?",
    explanation: "Common phrase to ask for a seat."
  },

  // === PART 5: PAYING & NUMBERS ===
  {
    id: "u1-pay-1",
    type: "fill-gap",
    prompt: "Asking for the bill: 'The ___, please.'",
    content: "Die ______ bitte.",
    correctAnswer: "Rechnung",
    explanation: "Rechnung = Bill/Check."
  },
  {
    id: "u1-pay-2",
    type: "arrange",
    prompt: "Asking cost.",
    content: "kostet / das / Was / ?",
    correctAnswer: "Was kostet das?",
    explanation: "Standard W-Question."
  },
  {
    id: "u1-pay-3",
    type: "multiple-choice",
    prompt: "Translation: 'Twelve Euro'",
    options: ["Zehn Euro", "Zwölf Euro", "Zwanzig Euro"],
    correctAnswer: "Zwölf Euro",
    explanation: "12 = Zwölf."
  },
  {
    id: "u1-pay-4",
    type: "fill-gap",
    prompt: "Phrase: 'That ___ 5 Euro.'",
    content: "Das ______ 5 Euro.",
    correctAnswer: "macht",
    explanation: "'Das macht...' is used for stating total price."
  },
  {
    id: "u1-pay-5",
    type: "multiple-choice",
    prompt: "Waiter asks payment method:",
    options: ["Zusammen oder getrennt?", "Kaffee oder Tee?", "Hier oder da?", "Ja oder nein?"],
    correctAnswer: "Zusammen oder getrennt?",
    explanation: "Together or separate bills?"
  },

  // === PART 6: REVIEW GRAMMAR ===
  {
    id: "u1-gram-1",
    type: "fill-gap",
    prompt: "Verb Position: 'What ___ you?' (trinken)",
    content: "Was ______ Sie?",
    correctAnswer: "trinken",
    explanation: "In W-questions, the conjugated verb is in position 2."
  },
  {
    id: "u1-gram-2",
    type: "arrange",
    prompt: "Yes/No Question: 'Do you drink tea?'",
    content: "Sie / Tee / Trinken / ?",
    correctAnswer: "Trinken Sie Tee?",
    explanation: "Yes/No questions start with the Verb."
  },
  {
    id: "u1-gram-3",
    type: "multiple-choice",
    prompt: "Conjugation: 'Wir ___.'",
    options: ["bezahlen", "bezahle", "bezahlt", "bezahlst"],
    correctAnswer: "bezahlen",
    explanation: "Wir (we) always takes the infinitive -en."
  },

  // === PART 7: MASTERY (WELL-BEING & SPELLING) ===
  {
    id: "u1-mastery-1",
    type: "arrange",
    prompt: "Formal: 'How are you?'",
    content: "es / Ihnen / Wie / geht / ?",
    correctAnswer: "Wie geht es Ihnen?",
    explanation: "Standard formal inquiry of well-being. 'Ihnen' is Dative formal 'You'."
  },
  {
    id: "u1-mastery-2",
    type: "fill-gap",
    prompt: "Answer: 'I am doing well.'",
    content: "Mir ______ es gut.",
    correctAnswer: "geht",
    explanation: "Es geht mir gut (It goes well for me)."
  },
  {
    id: "u1-mastery-3",
    type: "multiple-choice",
    prompt: "Teacher says: 'Buchstabieren Sie bitte.' What do you do?",
    options: ["Say your name", "Spell your name", "Write your name"],
    correctAnswer: "Spell your name",
    explanation: "Buchstabieren = to spell (A-B-C...)."
  }
];
