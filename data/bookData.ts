
import { BookUnit } from "../types";

export const BOOK_UNITS: BookUnit[] = [
  // ==========================================
  // UNIT 1
  // ==========================================
  {
    id: "unit-1",
    title: "Unit 1: Kaffee oder Tee?",
    description: "Greetings, ordering in a café, and numbers 0-20.",
    exercises: [
      {
        id: "u1-ex1",
        type: "multiple-choice",
        prompt: "Situation: You enter a shop in the morning. What do you say?",
        options: ["Gute Nacht", "Guten Morgen", "Tschüss", "Auf Wiedersehen"],
        correctAnswer: "Guten Morgen",
        explanation: "'Guten Morgen' is used until about 11am."
      },
      {
        id: "u1-ex2",
        type: "fill-gap",
        prompt: "Complete the order: 'I would like a coffee.'",
        content: "Ich ______ einen Kaffee.",
        correctAnswer: "möchte",
        explanation: "'Möchte' is the polite form of 'wollen' (to want)."
      },
      {
        id: "u1-ex3",
        type: "arrange",
        prompt: "Ask for the price.",
        content: "das / kostet / Was / ?",
        correctAnswer: "Was kostet das?",
        explanation: "Standard question structure: W-Word (Was) + Verb (kostet) + Subject (das)?"
      },
      {
        id: "u1-ex4",
        type: "multiple-choice",
        prompt: "Choose the correct verb form: 'Wir ___ einen Tee.'",
        options: ["nehme", "nimmst", "nehmen", "nehmt"],
        correctAnswer: "nehmen",
        explanation: "Wir (we) always takes the infinitive form (-en)."
      },
      {
        id: "u1-ex5",
        type: "fill-gap",
        prompt: "Conjugate 'sein' (to be): 'Das ___ Herr Müller.'",
        content: "Das ______ Herr Müller.",
        correctAnswer: "ist",
        explanation: "3rd person singular of sein: er/sie/es ist."
      },
      {
        id: "u1-ex6",
        type: "arrange",
        prompt: "Pay the bill.",
        content: "bezahlen / Wir / bitte / möchten / .",
        correctAnswer: "Wir möchten bitte bezahlen.",
        explanation: "Modal verb (möchten) in position 2, infinitive (bezahlen) at the end."
      }
    ]
  },

  // ==========================================
  // UNIT 2
  // ==========================================
  {
    id: "unit-2",
    title: "Unit 2: Sprache im Kurs",
    description: "Classroom objects, articles (der/die/das), and questions.",
    exercises: [
      {
        id: "u2-ex1",
        type: "multiple-choice",
        prompt: "What is the gender of 'Buch'?",
        options: ["Der", "Die", "Das"],
        correctAnswer: "Das",
        explanation: "It is 'Das Buch' (neuter)."
      },
      {
        id: "u2-ex2",
        type: "multiple-choice",
        prompt: "What is the gender of 'Tisch'?",
        options: ["Der", "Die", "Das"],
        correctAnswer: "Der",
        explanation: "It is 'Der Tisch' (masculine)."
      },
      {
        id: "u2-ex3",
        type: "fill-gap",
        prompt: "Negate the noun with 'kein': 'Das ist ______ Handy.' (Das Handy)",
        content: "Das ist ______ Handy.",
        correctAnswer: "kein",
        explanation: "Neuter (das) negation is 'kein'. (Masculine would be 'keinen' in Akkusativ, but here it is Nominativ)."
      },
      {
        id: "u2-ex4",
        type: "arrange",
        prompt: "Ask someone to repeat.",
        content: "Sie / das / wiederholen / Können / bitte / ?",
        correctAnswer: "Können Sie das bitte wiederholen?",
        explanation: "Ja/Nein Question starts with the verb (Können)."
      },
      {
        id: "u2-ex5",
        type: "fill-gap",
        prompt: "Translation: 'How do you write that?'",
        content: "Wie ______ man das?",
        correctAnswer: "schreibt",
        explanation: "'Man' (one/people) acts like er/sie/es (3rd person singular)."
      },
      {
        id: "u2-ex6",
        type: "multiple-choice",
        prompt: "Which is correct?",
        options: ["Ich nicht verstehe.", "Ich verstehe nicht.", "Nicht ich verstehe."],
        correctAnswer: "Ich verstehe nicht.",
        explanation: "'Nicht' usually comes after the verb."
      }
    ]
  },

  // ==========================================
  // UNIT 3
  // ==========================================
  {
    id: "unit-3",
    title: "Unit 3: Städte, Länder, Sprachen",
    description: "Geography, origins, and regular verb conjugation.",
    exercises: [
      {
        id: "u3-ex1",
        type: "fill-gap",
        prompt: "Preposition for origin: 'I come from Italy.'",
        content: "Ich komme ______ Italien.",
        correctAnswer: "aus",
        explanation: "'Aus' (from) is used for cities and countries."
      },
      {
        id: "u3-ex2",
        type: "fill-gap",
        prompt: "Preposition for location: 'We live in Berlin.'",
        content: "Wir wohnen ______ Berlin.",
        correctAnswer: "in",
        explanation: "'In' is used for static location in cities/countries."
      },
      {
        id: "u3-ex3",
        type: "arrange",
        prompt: "Form a W-Question.",
        content: "du / woher / kommst / ?",
        correctAnswer: "Woher kommst du?",
        explanation: "W-Word (Woher) + Verb (kommst) + Subject (du)."
      },
      {
        id: "u3-ex4",
        type: "fill-gap",
        prompt: "Conjugate 'sprechen' for 'er' (vowel change!).",
        content: "Er ______ gut Deutsch.",
        correctAnswer: "spricht",
        explanation: "Sprechen is strong: e -> i (du sprichst, er spricht)."
      },
      {
        id: "u3-ex5",
        type: "multiple-choice",
        prompt: "Which country has an article?",
        options: ["Frankreich", "Spanien", "Schweiz", "Polen"],
        correctAnswer: "Schweiz",
        explanation: "Most are neutral, but it is 'Die Schweiz' (feminine)."
      },
      {
        id: "u3-ex6",
        type: "arrange",
        prompt: "State your location.",
        content: "liegt / im / München / Süden / .",
        correctAnswer: "München liegt im Süden.",
        explanation: "München (Subject) + liegt (Verb) + im Süden (Location)."
      }
    ]
  },

  // ==========================================
  // UNIT 4
  // ==========================================
  {
    id: "unit-4",
    title: "Unit 4: Menschen & Häuser",
    description: "Describing homes, furniture, and the Akkusativ case.",
    exercises: [
      {
        id: "u4-ex1",
        type: "fill-gap",
        prompt: "Akkusativ (Masc): 'I have a table.' (Der Tisch)",
        content: "Ich habe ______ Tisch.",
        correctAnswer: "einen",
        explanation: "'Haben' requires Akkusativ. 'Ein' (masc) becomes 'einen'."
      },
      {
        id: "u4-ex2",
        type: "fill-gap",
        prompt: "Akkusativ (Fem): 'I have a lamp.' (Die Lampe)",
        content: "Ich habe ______ Lampe.",
        correctAnswer: "eine",
        explanation: "Feminine 'eine' stays 'eine' in Akkusativ."
      },
      {
        id: "u4-ex3",
        type: "multiple-choice",
        prompt: "Opposite of 'hell' (bright)?",
        options: ["klein", "dunkel", "teuer", "neu"],
        correctAnswer: "dunkel",
        explanation: "Hell = Bright, Dunkel = Dark."
      },
      {
        id: "u4-ex4",
        type: "arrange",
        prompt: "Describe the balcony.",
        content: "Balkon / Der / ist / klein / sehr / .",
        correctAnswer: "Der Balkon ist sehr klein.",
        explanation: "Subject (Der Balkon) + Verb (ist) + Adverb (sehr) + Adjective (klein)."
      },
      {
        id: "u4-ex5",
        type: "fill-gap",
        prompt: "Negation (Adjective): 'The room is NOT big.'",
        content: "Das Zimmer ist ______ groß.",
        correctAnswer: "nicht",
        explanation: "Use 'nicht' for adjectives. Use 'kein' for nouns."
      },
      {
        id: "u4-ex6",
        type: "multiple-choice",
        prompt: "What is 'Das Wohnzimmer'?",
        options: ["Kitchen", "Bedroom", "Living room", "Bathroom"],
        correctAnswer: "Living room",
        explanation: "Wohnen (to live) + Zimmer (room)."
      }
    ]
  },

  // ==========================================
  // UNIT 5
  // ==========================================
  {
    id: "unit-5",
    title: "Unit 5: Termine",
    description: "Time, days, appointments, and separable verbs.",
    exercises: [
      {
        id: "u5-ex1",
        type: "fill-gap",
        prompt: "Preposition for clock time: '___ 3 o'clock'.",
        content: "Der Termin ist ______ drei Uhr.",
        correctAnswer: "um",
        explanation: "Always 'um' for specific times (um 3 Uhr, um halb 4)."
      },
      {
        id: "u5-ex2",
        type: "fill-gap",
        prompt: "Preposition for days: '___ Monday'.",
        content: "______ Montag habe ich frei.",
        correctAnswer: "Am",
        explanation: "Always 'am' (an dem) for days (am Montag, am Freitag)."
      },
      {
        id: "u5-ex3",
        type: "multiple-choice",
        prompt: "Translate: 'Half past four' (4:30)",
        options: ["Halb vier", "Halb fünf", "Viertel nach vier"],
        correctAnswer: "Halb fünf",
        explanation: "German 'Halb' refers to the hour COMING UP. So 4:30 is 'half (way to) five'."
      },
      {
        id: "u5-ex4",
        type: "arrange",
        prompt: "Separable Verb (anfangen): 'The film starts at 8.'",
        content: "Film / um / fängt / acht / Der / an / .",
        correctAnswer: "Der Film fängt um acht an.",
        explanation: "Prefix 'an' goes to the very end of the sentence."
      },
      {
        id: "u5-ex5",
        type: "fill-gap",
        prompt: "Conjugate 'treffen' (to meet) for 'wir'.",
        content: "Wann ______ wir uns?",
        correctAnswer: "treffen",
        explanation: "Wir treffen (regular plural ending)."
      },
      {
        id: "u5-ex6",
        type: "multiple-choice",
        prompt: "What is 'Das Wochenende'?",
        options: ["The week", "The weekend", "The holiday"],
        correctAnswer: "The weekend",
        explanation: "Wochen (week) + Ende (end)."
      }
    ]
  },

  // ==========================================
  // UNIT 6
  // ==========================================
  {
    id: "unit-6",
    title: "Unit 6: Orientierung",
    description: "Directions, Dative prepositions, and 'zu' vs 'nach'.",
    exercises: [
      {
        id: "u6-ex1",
        type: "multiple-choice",
        prompt: "Direction: 'straight ahead'",
        options: ["links", "rechts", "geradeaus", "zurück"],
        correctAnswer: "geradeaus",
        explanation: "Links (left), Rechts (right), Geradeaus (straight)."
      },
      {
        id: "u6-ex2",
        type: "fill-gap",
        prompt: "Dative: 'I go to the station.' (Der Bahnhof)",
        content: "Ich gehe ______ Bahnhof.",
        correctAnswer: "zum",
        explanation: "'Zu' is dative. Der Bahnhof -> Dem Bahnhof. Zu + dem = zum."
      },
      {
        id: "u6-ex3",
        type: "fill-gap",
        prompt: "Dative: 'I drive to the bank.' (Die Bank)",
        content: "Ich fahre ______ Bank.",
        correctAnswer: "zur",
        explanation: "Die Bank -> Der Bank (Dative). Zu + der = zur."
      },
      {
        id: "u6-ex4",
        type: "arrange",
        prompt: "Imperative (Formal): 'Go left.'",
        content: "links / Sie / Gehen / .",
        correctAnswer: "Gehen Sie links.",
        explanation: "Verb first in imperative."
      },
      {
        id: "u6-ex5",
        type: "multiple-choice",
        prompt: "Preposition: 'We drive ___ Berlin.' (Cities)",
        options: ["zu", "nach", "in", "bei"],
        correctAnswer: "nach",
        explanation: "Use 'nach' for cities and countries without articles."
      },
      {
        id: "u6-ex6",
        type: "fill-gap",
        prompt: "Two-way prep (Location): 'The bank is NEXT TO the post.'",
        content: "Die Bank ist ______ der Post.",
        correctAnswer: "neben",
        explanation: "Neben = next to."
      }
    ]
  },

  // ==========================================
  // UNIT 7
  // ==========================================
  {
    id: "unit-7",
    title: "Unit 7: Berufe",
    description: "Professions, workplace, and modal verbs (können/müssen).",
    exercises: [
      {
        id: "u7-ex1",
        type: "multiple-choice",
        prompt: "What is a female teacher called?",
        options: ["Lehrer", "Lehrerin", "Lehre"],
        correctAnswer: "Lehrerin",
        explanation: "Add '-in' to make most professions feminine."
      },
      {
        id: "u7-ex2",
        type: "fill-gap",
        prompt: "Modal verb (können): 'I ___ speak English.'",
        content: "Ich ______ Englisch sprechen.",
        correctAnswer: "kann",
        explanation: "Ich kann, du kannst, er kann."
      },
      {
        id: "u7-ex3",
        type: "fill-gap",
        prompt: "Modal verb (müssen): 'We ___ work.'",
        content: "Wir ______ arbeiten.",
        correctAnswer: "müssen",
        explanation: "Wir müssen (plural is regular)."
      },
      {
        id: "u7-ex4",
        type: "arrange",
        prompt: "Word Order: 'I have to write an email.'",
        content: "schreiben / Ich / E-Mail / muss / eine / .",
        correctAnswer: "Ich muss eine E-Mail schreiben.",
        explanation: "Conjugated modal verb (muss) in pos 2. Infinitive (schreiben) at the VERY END."
      },
      {
        id: "u7-ex5",
        type: "multiple-choice",
        prompt: "What does 'Arbeitsgeber' mean?",
        options: ["Employee", "Employer", "Worker"],
        correctAnswer: "Employer",
        explanation: "Geber = Giver (Employer). Nehmer = Taker (Employee)."
      }
    ]
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
