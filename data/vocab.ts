
import { VocabWord, VerbDrill, DifficultyLevel } from "../types";

// Extended interface for local DB
export interface LocalVocabEntry extends VocabWord {
  level: DifficultyLevel;
  category: string;
}

// === GRAMMAR HELPERS ===

export const getArticle = (key: string): string => {
  switch (key) {
    case 'm': return 'der';
    case 'f': return 'die';
    case 'n': return 'das';
    case 'p': return 'die'; // Plural
    default: return '';
  }
};

const getIndefinite = (key: string): string => {
    if (key === 'f') return 'eine';
    if (key === 'p') return 'viele'; // Plural indefinite often "many" or no article, simplified here
    return 'ein';
};

const getPossessive = (key: string): string => {
    if (key === 'f' || key === 'p') return 'meine';
    return 'mein';
};

const getAkkusativeDefinite = (key: string): string => {
    if (key === 'm') return 'den';
    if (key === 'f') return 'die';
    if (key === 'n') return 'das';
    return 'die';
};

const getAkkusativeIndefinite = (key: string): string => {
    if (key === 'm') return 'einen';
    if (key === 'f') return 'eine';
    if (key === 'n') return 'ein';
    return 'viele';
};

export const parseLevel = (key: string): DifficultyLevel => {
  switch(key) {
      case '2': return DifficultyLevel.Intermediate;
      case '3': return DifficultyLevel.Advanced;
      default: return DifficultyLevel.Beginner;
  }
};

// === RANDOMIZATION HELPERS ===

const pickRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Cap first letter
const cap = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const generateExample = (german: string, english: string, type: string, genderKey: string, category: string): { de: string, en: string } => {
    // 1. Verbs (Custom Logic + Randomization)
    if (type === 'Verb') {
        if (german === 'sein') return { de: 'Ich bin glücklich.', en: 'I am happy.' };
        if (german === 'haben') return { de: 'Ich habe eine Idee.', en: 'I have an idea.' };
        if (german === 'gehen') return { de: 'Ich gehe nach Hause.', en: 'I am going home.' };
        if (german === 'essen') return { de: 'Ich esse gern Pizza.', en: 'I like eating pizza.' };
        if (german === 'trinken') return { de: 'Ich trinke Wasser.', en: 'I drink water.' };
        if (german === 'kommen') return { de: 'Woher kommst du?', en: 'Where do you come from?' };
        
        const cleanEnglish = english.replace(/^to\s+/i, '');
        const verbTemplates = [
            { de: `Ich ${german} gern.`, en: `I like to ${cleanEnglish}.` },
            { de: `Wir ${german} oft.`, en: `We ${cleanEnglish} often.` },
            { de: `Kannst du ${german}?`, en: `Can you ${cleanEnglish}?` },
            { de: `Ich muss jetzt ${german}.`, en: `I have to ${cleanEnglish} now.` },
            { de: `Sie ${german} nicht.`, en: `She does not ${cleanEnglish}.` }
        ];
        return pickRandom(verbTemplates);
    }

    // 2. Nouns
    if (type === 'Noun') {
        const art = getArticle(genderKey);
        const artIndef = getIndefinite(genderKey);
        const artAkk = getAkkusativeDefinite(genderKey);
        const artAkkIndef = getAkkusativeIndefinite(genderKey);
        const poss = getPossessive(genderKey);
        
        const CapArt = cap(art);

        // -- CATEGORY TEMPLATES --

        // Languages (Specific Override)
        if (category === 'Basics' && (german.endsWith('isch') || german === 'Deutsch')) {
             return { de: `Ich spreche ${german}.`, en: `I speak ${english}.` };
        }

        // Countries
        if (category === 'Countries') {
             if (genderKey === 'f' || genderKey === 'p') { // Die Schweiz, Die USA
                 return { de: `Ich lebe in ${genderKey === 'p' ? 'den' : 'der'} ${german}.`, en: `I live in ${english}.` };
             }
             const countryTemplates = [
                 { de: `Ich reise nach ${german}.`, en: `I am traveling to ${english}.` },
                 { de: `Ich komme aus ${german}.`, en: `I come from ${english}.` },
                 { de: `${german} ist wunderschön.`, en: `${english} is beautiful.` }
             ];
             return pickRandom(countryTemplates);
        }

        // Food & Drink
        if (['Food', 'Drinks', 'Fruit', 'Vegetables'].includes(category)) {
             const isDrink = ['Kaffee', 'Tee', 'Wasser', 'Saft', 'Bier', 'Wein', 'Milch', 'Cola', 'Getränk'].includes(german) || category === 'Drinks';
             const verb = isDrink ? 'trinke' : 'esse';
             const verbEn = isDrink ? 'drink' : 'eat';
             
             const foodTemplates = [
                 { de: `Ich ${verb} gerne ${german}.`, en: `I like to ${verbEn} ${english}.` },
                 { de: `${CapArt} ${german} schmeckt lecker.`, en: `The ${english} tastes yummy.` },
                 { de: `Ich möchte ${german} kaufen.`, en: `I want to buy ${english}.` },
                 { de: `Haben wir noch ${german}?`, en: `Do we still have ${english}?` },
                 { de: `Der Preis für ${german} ist gut.`, en: `The price for ${english} is good.` },
                 { de: `Ich brauche ${artAkkIndef} ${german}.`, en: `I need a ${english}.` }
             ];
             return pickRandom(foodTemplates);
        }

        // Family
        if (category === 'Family') {
             const familyTemplates = [
                 { de: `Das ist ${poss} ${german}.`, en: `That is my ${english}.` },
                 { de: `${poss} ${german} heißt Anna.`, en: `My ${english} is called Anna.` }, // Or generic name
                 { de: `Ich besuche ${poss === 'meine' ? 'meine' : 'meinen'} ${german}.`, en: `I am visiting my ${english}.` },
                 { de: `Wo wohnt ${poss} ${german}?`, en: `Where does my ${english} live?` }
             ];
             return pickRandom(familyTemplates);
        }

        // Clothing
        if (category === 'Clothing') {
             const clothTemplates = [
                 { de: `Ich trage ${artAkkIndef} ${german}.`, en: `I am wearing a ${english}.` },
                 { de: `${CapArt} ${german} passt mir gut.`, en: `The ${english} fits me well.` },
                 { de: `${CapArt} ${german} ist zu teuer.`, en: `The ${english} is too expensive.` },
                 { de: `Ich suche ${artAkkIndef} ${german}.`, en: `I am looking for a ${english}.` },
                 { de: `Wie findest du ${artAkk} ${german}?`, en: `How do you find the ${english}?` }
             ];
             return pickRandom(clothTemplates);
        }

        // Body
        if (category === 'Body') {
             const bodyTemplates = [
                 { de: `${poss} ${german} tut weh.`, en: `My ${english} hurts.` },
                 { de: `${CapArt} ${german} ist verletzt.`, en: `The ${english} is injured.` },
                 { de: `Er hat große ${german === 'Auge' || german === 'Ohr' || german === 'Hand' ? german + 'n' : german}.`, en: `He has big ${english}s.` } 
             ];
             return pickRandom(bodyTemplates);
        }

        // Places / Buildings / Rooms
        if (['City', 'Home', 'Places'].includes(category)) {
             const placeTemplates = [
                 { de: `Das ist ${artIndef} ${german}.`, en: `That is a ${english}.` },
                 { de: `${CapArt} ${german} ist sehr groß.`, en: `The ${english} is very big.` },
                 { de: `Wo ist hier ${artIndef} ${german}?`, en: `Where is a ${english} here?` },
                 { de: `Wir sind im ${german}.`, en: `We are in the ${english}.` },
                 { de: `Ich sehe ${artAkk} ${german}.`, en: `I see the ${english}.` }
             ];
             if (genderKey === 'f') {
                 placeTemplates[3] = { de: `Wir sind in der ${german}.`, en: `We are in the ${english}.` };
             }
             return pickRandom(placeTemplates);
        }

        // Objects / Technology / Office
        if (['Objects', 'Technology', 'Office', 'Classroom', 'Money', 'Shopping'].includes(category)) {
             const objTemplates = [
                 { de: `Wo ist ${art} ${german}?`, en: `Where is the ${english}?` },
                 { de: `Ich brauche ${artAkkIndef} ${german}.`, en: `I need a ${english}.` },
                 { de: `${CapArt} ${german} funktioniert nicht.`, en: `The ${english} does not work.` },
                 { de: `Hast du ${artAkkIndef} ${german}?`, en: `Do you have a ${english}?` },
                 { de: `${CapArt} ${german} ist neu.`, en: `The ${english} is new.` },
                 { de: `Das ist ${poss} ${german}.`, en: `That is my ${english}.` }
             ];
             return pickRandom(objTemplates);
        }

        // Professions
        if (category === 'Professions') {
             return { de: `Ich arbeite als ${german}.`, en: `I work as a ${english}.` };
        }

        // Feelings
        if (category === 'Feelings') {
            if (german === 'Liebe') return { de: 'Liebe ist alles.', en: 'Love is everything.' };
            if (german === 'Angst') return { de: 'Ich habe keine Angst.', en: 'I have no fear.' };
            if (german === 'Glück') return { de: 'Viel Glück!', en: 'Good luck!' };
            if (german === 'Spaß') return { de: 'Das macht Spaß!', en: 'That is fun!' };
            if (german === 'Trauer') return { de: 'Er zeigt keine Trauer.', en: 'He shows no grief.' };
            if (german === 'Hoffnung') return { de: 'Ich habe Hoffnung.', en: 'I have hope.' };
            return { de: `Ich fühle ${german}.`, en: `I feel ${english}.` };
        }

        // Time (Specific Logic)
        if (category === 'Time') {
             // Weekdays
             if (['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'].includes(german)) {
                 return pickRandom([
                     { de: `Am ${german} habe ich frei.`, en: `On ${english} I am free.` },
                     { de: `Bis ${german}!`, en: `See you ${english}!` },
                     { de: `Der Kurs ist am ${german}.`, en: `The course is on ${english}.` },
                     { de: `Kommst du am ${german}?`, en: `Are you coming on ${english}?` }
                 ]);
             }
             // Months
             if (['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'].includes(german)) {
                 return pickRandom([
                    { de: `Im ${german} ist es kalt.`, en: `In ${english} it is cold.` },
                    { de: `Mein Geburtstag ist im ${german}.`, en: `My birthday is in ${english}.` },
                    { de: `Wir fahren im ${german} weg.`, en: `We are going away in ${english}.` }
                 ]);
             }
             // Seasons
             if (['Frühling','Sommer','Herbst','Winter'].includes(german)) {
                 return pickRandom([
                    { de: `Ich mag den ${german}.`, en: `I like ${english}.` },
                    { de: `Im ${german} ist das Wetter schön.`, en: `In ${english} the weather is nice.` }
                 ]);
             }
             
             // Specific Time Nouns
             if (german === 'Zeit') return { de: 'Ich habe keine Zeit.', en: 'I have no time.' };
             if (german === 'Uhr') return pickRandom([
                { de: 'Wie viel Uhr ist es?', en: 'What time is it?' },
                { de: 'Ich habe eine neue Uhr.', en: 'I have a new watch.' }
             ]);
             if (german === 'Tag') return { de: 'Guten Tag!', en: 'Good day!' };
             if (german === 'Woche') return { de: 'Die Woche hat sieben Tage.', en: 'The week has seven days.' };
             if (german === 'Jahr') return { de: 'Frohes neues Jahr!', en: 'Happy New Year!' };
             if (german === 'Morgen') return { de: 'Guten Morgen!', en: 'Good morning!' };
             if (german === 'Abend') return { de: 'Guten Abend!', en: 'Good evening!' };
             if (german === 'Nacht') return { de: 'Gute Nacht!', en: 'Good night!' };
             if (german === 'Minute') return { de: 'Warte eine Minute bitte.', en: 'Wait a minute please.' };
             if (german === 'Stunde') return { de: 'Der Film dauert eine Stunde.', en: 'The movie lasts an hour.' };

             return { de: `Der ${german} vergeht schnell.`, en: `The ${english} passes quickly.` };
        }

        // -- FALLBACK FOR ANY NOUN --
        if (art) {
             const fallbackTemplates = [
                 { de: `Wo ist ${art} ${german}?`, en: `Where is the ${english}?` },
                 { de: `Da ist ${art} ${german}.`, en: `There is the ${english}.` },
                 { de: `Ich suche ${artAkk} ${german}.`, en: `I am looking for the ${english}.` },
                 { de: `Gefällt dir ${art} ${german}?`, en: `Do you like the ${english}?` },
                 { de: `Ich habe ${artAkkIndef} ${german}.`, en: `I have a ${english}.` }
             ];
             return pickRandom(fallbackTemplates);
        }
    }

    // 3. Adjectives / Adverbs
    if (type === 'Adjective' || type === 'Adverb') {
        if (category === 'Colors') {
            const nouns = ['Das Auto', 'Die Blume', 'Der Himmel', 'Das Haus', 'Mein T-Shirt'];
            const noun = pickRandom(nouns);
            return { de: `${noun} ist ${german}.`, en: `The ${noun.split(' ')[1].toLowerCase()} is ${english}.` };
        }
        
        const genericAdjTemplates = [
            { de: `Das ist sehr ${german}.`, en: `That is very ${english}.` },
            { de: `Bist du ${german}?`, en: `Are you ${english}?` },
            { de: `Ich finde das ${german}.`, en: `I find that ${english}.` },
            { de: `Alles ist ${german}.`, en: `Everything is ${english}.` }
        ];
        return pickRandom(genericAdjTemplates);
    }

    // 4. Fallback
    if (german === 'wer') return { de: 'Wer bist du?', en: 'Who are you?' };
    if (german === 'wie') return { de: 'Wie geht es dir?', en: 'How are you?' };
    if (german === 'woher') return { de: 'Woher kommst du?', en: 'Where do you come from?' };
    if (german === 'was') return { de: 'Was ist das?', en: 'What is that?' };
    
    return { de: `${german}!`, en: `${english}!` };
};

export const LOCAL_VERBS: VerbDrill[] = [
  {
    infinitive: "sein",
    translation: "to be",
    tense: "Präsens",
    conjugations: { ich: "bin", du: "bist", er_sie_es: "ist", wir: "sind", ihr: "seid", sie_Sie: "sind" },
    tip: "One of the most irregular verbs."
  },
  {
    infinitive: "haben",
    translation: "to have",
    tense: "Präsens",
    conjugations: { ich: "habe", du: "hast", er_sie_es: "hat", wir: "haben", ihr: "habt", sie_Sie: "haben" }
  },
  {
    infinitive: "machen",
    translation: "to make/do",
    tense: "Präsens",
    conjugations: { ich: "mache", du: "machst", er_sie_es: "macht", wir: "machen", ihr: "macht", sie_Sie: "machen" }
  },
  {
    infinitive: "kommen",
    translation: "to come",
    tense: "Präsens",
    conjugations: { ich: "komme", du: "kommst", er_sie_es: "kommt", wir: "kommen", ihr: "kommt", sie_Sie: "kommen" }
  },
  {
    infinitive: "gehen",
    translation: "to go",
    tense: "Präsens",
    conjugations: { ich: "gehe", du: "gehst", er_sie_es: "geht", wir: "gehen", ihr: "geht", sie_Sie: "gehen" }
  },
  {
    infinitive: "essen",
    translation: "to eat",
    tense: "Präsens",
    conjugations: { ich: "esse", du: "isst", er_sie_es: "isst", wir: "essen", ihr: "esst", sie_Sie: "essen" },
    tip: "Vowel change e -> i"
  },
  {
    infinitive: "schlafen",
    translation: "to sleep",
    tense: "Präsens",
    conjugations: { ich: "schlafe", du: "schläfst", er_sie_es: "schläft", wir: "schlafen", ihr: "schlaft", sie_Sie: "schlafen" },
    tip: "Vowel change a -> ä"
  },
  {
    infinitive: "sprechen",
    translation: "to speak",
    tense: "Präsens",
    conjugations: { ich: "spreche", du: "sprichst", er_sie_es: "spricht", wir: "sprechen", ihr: "sprecht", sie_Sie: "sprechen" },
    tip: "Vowel change e -> i"
  },
  {
    infinitive: "lesen",
    translation: "to read",
    tense: "Präsens",
    conjugations: { ich: "lese", du: "liest", er_sie_es: "liest", wir: "lesen", ihr: "lest", sie_Sie: "lesen" },
    tip: "Vowel change e -> ie"
  },
  {
    infinitive: "fahren",
    translation: "to drive/go",
    tense: "Präsens",
    conjugations: { ich: "fahre", du: "fährst", er_sie_es: "fährt", wir: "fahren", ihr: "fahrt", sie_Sie: "fahren" },
    tip: "Vowel change a -> ä"
  },
  {
    infinitive: "sehen",
    translation: "to see",
    tense: "Präsens",
    conjugations: { ich: "sehe", du: "siehst", er_sie_es: "sieht", wir: "sehen", ihr: "seht", sie_Sie: "sehen" },
    tip: "Vowel change e -> ie"
  },
  {
    infinitive: "helfen",
    translation: "to help",
    tense: "Präsens",
    conjugations: { ich: "helfe", du: "hilfst", er_sie_es: "hilft", wir: "helfen", ihr: "helft", sie_Sie: "helfen" },
    tip: "Vowel change e -> i"
  },
  {
    infinitive: "tragen",
    translation: "to wear/carry",
    tense: "Präsens",
    conjugations: { ich: "trage", du: "trägst", er_sie_es: "trägt", wir: "tragen", ihr: "tragt", sie_Sie: "tragen" },
    tip: "Vowel change a -> ä"
  },
  {
    infinitive: "geben",
    translation: "to give",
    tense: "Präsens",
    conjugations: { ich: "gebe", du: "gibst", er_sie_es: "gibt", wir: "geben", ihr: "gebt", sie_Sie: "geben" },
    tip: "Vowel change e -> i"
  },
  {
    infinitive: "nehmen",
    translation: "to take",
    tense: "Präsens",
    conjugations: { ich: "nehme", du: "nimmst", er_sie_es: "nimmt", wir: "nehmen", ihr: "nehmt", sie_Sie: "nehmen" },
    tip: "Vowel change e -> i + double m"
  }
];

const RAW_CSV_DATA = `
# UNIT 1: KAFFEE ODER TEE
Kaffee|coffee|m|Noun|Drinks|1
Tee|tea|m|Noun|Drinks|1
Milch|milk|f|Noun|Drinks|1
Zucker|sugar|m|Noun|Food|1
Rechnung|check/bill|f|Noun|Restaurant|1
bezahlen|to pay|-|Verb|Verbs|1
trinken|to drink|-|Verb|Verbs|1
nehmen|to take|-|Verb|Verbs|1
möchten|would like|-|Verb|Verbs|1
Saft|juice|m|Noun|Drinks|1
Wasser|water|n|Noun|Drinks|1
Cola|cola|f|Noun|Drinks|1
Bier|beer|n|Noun|Drinks|1
Wein|wine|m|Noun|Drinks|1
Glas|glass|n|Noun|Objects|1
Tasse|cup|f|Noun|Objects|1
Getränk|beverage|n|Noun|Drinks|1
Euro|Euro|m|Noun|Money|1
Cent|Cent|m|Noun|Money|1
Preis|price|m|Noun|Money|1
zahlen|to pay|-|Verb|Verbs|1
bestellen|to order|-|Verb|Verbs|1
Begrüßung|greeting|f|Noun|Basics|1
Name|name|m|Noun|Basics|1
Vorname|first name|m|Noun|Basics|1
Familienname|surname|m|Noun|Basics|1
Herkunft|origin|f|Noun|Basics|1
kommen|to come|-|Verb|Verbs|1
heißen|to be called|-|Verb|Verbs|1
sein|to be|-|Verb|Verbs|1
buchstabieren|to spell|-|Verb|Verbs|1
sprechen|to speak|-|Verb|Verbs|1
wer|who|-|Pronoun|Basics|1
wie|how|-|Pronoun|Basics|1
woher|where from|-|Pronoun|Basics|1
was|what|-|Pronoun|Basics|1
aus|from|-|Preposition|Grammar|1
in|in|-|Preposition|Grammar|1
ja|yes|-|Adverb|Basics|1
nein|no|-|Adverb|Basics|1
danke|thanks|-|Phrase|Basics|1
bitte|please|-|Phrase|Basics|1

# UNIT 2: SPRACHE IM KURS
Buch|book|n|Noun|Classroom|1
Heft|notebook|n|Noun|Classroom|1
Stift|pen|m|Noun|Classroom|1
Bleistift|pencil|m|Noun|Classroom|1
Füller|fountain pen|m|Noun|Classroom|1
Radiergummi|eraser|m|Noun|Classroom|1
Mäppchen|pencil case|n|Noun|Classroom|1
Tafel|board|f|Noun|Classroom|1
Kreide|chalk|f|Noun|Classroom|1
Schwamm|sponge|m|Noun|Classroom|1
Papier|paper|n|Noun|Classroom|1
Tisch|table|m|Noun|Classroom|1
Stuhl|chair|m|Noun|Classroom|1
Computer|computer|m|Noun|Classroom|1
Lehrer|teacher (m)|m|Noun|Professions|1
Lehrerin|teacher (f)|f|Noun|Professions|1
Kurs|course|m|Noun|Education|1
Unterricht|lesson|m|Noun|Education|1
Pause|break|f|Noun|Education|1
Frage|question|f|Noun|Basics|1
Antwort|answer|f|Noun|Basics|1
Wort|word|n|Noun|Education|1
Satz|sentence|m|Noun|Education|1
Text|text|m|Noun|Education|1
Dialog|dialogue|m|Noun|Education|1
Übung|exercise|f|Noun|Education|1
Seite|page|f|Noun|Education|1
Bild|picture|n|Noun|Education|1
lesen|to read|-|Verb|Verbs|1
schreiben|to write|-|Verb|Verbs|1
hören|to hear/listen|-|Verb|Verbs|1
verstehen|to understand|-|Verb|Verbs|1
fragen|to ask|-|Verb|Verbs|1
antworten|to answer|-|Verb|Verbs|1
lernen|to learn|-|Verb|Verbs|1
wiederholen|to repeat|-|Verb|Verbs|1
erklären|to explain|-|Verb|Verbs|1
ergänzen|to complete|-|Verb|Verbs|1
zuordnen|to assign/match|-|Verb|Verbs|1
ankreuzen|to check/tick|-|Verb|Verbs|1
falsch|wrong|-|Adjective|Basics|1
richtig|correct|-|Adjective|Basics|1
laut|loud|-|Adjective|Basics|1
leise|quiet|-|Adjective|Basics|1
langsam|slow|-|Adjective|Basics|1
schnell|fast|-|Adjective|Basics|1

# UNIT 3: STÄDTE, LÄNDER, SPRACHEN
Stadt|city|f|Noun|City|1
Land|country|n|Noun|City|1
Deutschland|Germany|n|Noun|City|1
Österreich|Austria|n|Noun|City|1
Schweiz|Switzerland|f|Noun|City|1
Hauptstadt|capital city|f|Noun|City|1
Sprache|language|f|Noun|Basics|1
Deutsch|German|n|Noun|Basics|1
Englisch|English|n|Noun|Basics|1
Französisch|French|n|Noun|Basics|1
Italienisch|Italian|n|Noun|Basics|1
Spanisch|Spanish|n|Noun|Basics|1
Russisch|Russian|n|Noun|Basics|1
Türkisch|Turkish|n|Noun|Basics|1
Polnisch|Polish|n|Noun|Basics|1
wohnen|to live|-|Verb|Verbs|1
leben|to live|-|Verb|Verbs|1
liegen|to be located|-|Verb|Verbs|1
reisen|to travel|-|Verb|Verbs|1
fahren|to drive/go|-|Verb|Verbs|1
Karte|map|f|Noun|Objects|1
Norden|North|m|Noun|Basics|1
Süden|South|m|Noun|Basics|1
Osten|East|m|Noun|Basics|1
Westen|West|m|Noun|Basics|1
Zentrum|center|n|Noun|City|1
Markt|market|m|Noun|City|1
Rathaus|town hall|n|Noun|City|1
Kirche|church|f|Noun|City|1
Dom|cathedral|m|Noun|City|1
Bahnhof|train station|m|Noun|City|1
Flughafen|airport|m|Noun|City|1
Hotel|hotel|n|Noun|City|1
Restaurant|restaurant|n|Noun|City|1
Cafe|cafe|n|Noun|City|1
Kino|cinema|n|Noun|City|1
Theater|theater|n|Noun|City|1
Museum|museum|n|Noun|City|1
Post|post office|f|Noun|City|1
Bank|bank|f|Noun|City|1
Polizei|police|f|Noun|City|1
hier|here|-|Adverb|Basics|1
dort|there|-|Adverb|Basics|1
da|there|-|Adverb|Basics|1
links|left|-|Adverb|Basics|1
rechts|right|-|Adverb|Basics|1
geradeaus|straight ahead|-|Adverb|Basics|1

# UNIT 4: MENSCHEN UND HÄUSER
Haus|house|n|Noun|Home|1
Wohnung|apartment|f|Noun|Home|1
Zimmer|room|n|Noun|Home|1
Küche|kitchen|f|Noun|Home|1
Bad|bathroom|n|Noun|Home|1
Wohnzimmer|living room|n|Noun|Home|1
Schlafzimmer|bedroom|n|Noun|Home|1
Kinderzimmer|children's room|n|Noun|Home|1
Arbeitszimmer|study|n|Noun|Home|1
Flur|hallway|m|Noun|Home|1
Balkon|balcony|m|Noun|Home|1
Keller|basement|m|Noun|Home|1
Garten|garden|m|Noun|Home|1
Tür|door|f|Noun|Home|1
Fenster|window|n|Noun|Home|1
Wand|wall|f|Noun|Home|1
Boden|floor|m|Noun|Home|1
Treppe|stairs|f|Noun|Home|1
Möbel|furniture|f|Noun|Home|1
Tisch|table|m|Noun|Home|1
Stuhl|chair|m|Noun|Home|1
Schrank|cupboard|m|Noun|Home|1
Regal|shelf|n|Noun|Home|1
Bett|bed|n|Noun|Home|1
Sofa|sofa|n|Noun|Home|1
Sessel|armchair|m|Noun|Home|1
Lampe|lamp|f|Noun|Home|1
Teppich|carpet|m|Noun|Home|1
Bild|picture|n|Noun|Home|1
Spiegel|mirror|m|Noun|Home|1
Herd|stove|m|Noun|Home|1
Kühlschrank|fridge|m|Noun|Home|1
Waschmaschine|washing machine|f|Noun|Home|1
Fernseher|TV|m|Noun|Home|1
groß|big|-|Adjective|Adjectives|1
klein|small|-|Adjective|Adjectives|1
schön|beautiful|-|Adjective|Adjectives|1
hässlich|ugly|-|Adjective|Adjectives|1
hell|bright|-|Adjective|Adjectives|1
dunkel|dark|-|Adjective|Adjectives|1
alt|old|-|Adjective|Adjectives|1
neu|new|-|Adjective|Adjectives|1
teuer|expensive|-|Adjective|Adjectives|1
billig|cheap|-|Adjective|Adjectives|1
gemütlich|cozy|-|Adjective|Adjectives|1
praktisch|practical|-|Adjective|Adjectives|1

# FAMILY (FAMILIE)
Familie|family|f|Noun|Family|1
Vater|father|m|Noun|Family|1
Mutter|mother|f|Noun|Family|1
Eltern|parents|p|Noun|Family|1
Kind|child|n|Noun|Family|1
Sohn|son|m|Noun|Family|1
Tochter|daughter|f|Noun|Family|1
Bruder|brother|m|Noun|Family|1
Schwester|sister|f|Noun|Family|1
Geschwister|siblings|p|Noun|Family|1
Großeltern|grandparents|f|Noun|Family|1
Opa|grandpa|m|Noun|Family|1
Oma|grandma|f|Noun|Family|1
Mann|man/husband|m|Noun|Family|1
Frau|woman/wife|f|Noun|Family|1
Junge|boy|m|Noun|Family|1
Mädchen|girl|n|Noun|Family|1
Baby|baby|n|Noun|Family|1
Freund|friend (m)|m|Noun|Family|1
Freundin|friend (f)|f|Noun|Family|1
Gast|guest|m|Noun|Family|1
Nachbar|neighbor|m|Noun|Family|1
Tante|aunt|f|Noun|Family|1
Onkel|uncle|m|Noun|Family|1
Cousin|cousin (m)|m|Noun|Family|1
Cousine|cousin (f)|f|Noun|Family|1

# ANIMALS (TIERE)
Tier|animal|n|Noun|Animals|1
Hund|dog|m|Noun|Animals|1
Katze|cat|f|Noun|Animals|1
Maus|mouse|f|Noun|Animals|1
Vogel|bird|m|Noun|Animals|1
Pferd|horse|n|Noun|Animals|1
Kuh|cow|f|Noun|Animals|1
Schwein|pig|n|Noun|Animals|1
Fisch|fish|m|Noun|Animals|1
Bär|bear|m|Noun|Animals|1
Ente|duck|f|Noun|Animals|1
Huhn|chicken|n|Noun|Animals|1
Elefant|elephant|m|Noun|Animals|1
Löwe|lion|m|Noun|Animals|1
Zoo|zoo|m|Noun|Animals|1

# NATURE & WEATHER (NATUR & WETTER)
Wetter|weather|n|Noun|Nature|1
Sonne|sun|f|Noun|Nature|1
Mond|moon|m|Noun|Nature|1
Stern|star|m|Noun|Nature|1
Regen|rain|m|Noun|Nature|1
Schnee|snow|m|Noun|Nature|1
Wind|wind|m|Noun|Nature|1
Wolke|cloud|f|Noun|Nature|1
Baum|tree|m|Noun|Nature|1
Blume|flower|f|Noun|Nature|1
Wald|forest|m|Noun|Nature|1
Berg|mountain|m|Noun|Nature|1
See|lake|m|Noun|Nature|1
Meer|sea|n|Noun|Nature|1
Fluss|river|m|Noun|Nature|1
regnen|to rain|-|Verb|Nature|1
schneien|to snow|-|Verb|Nature|1
scheinen|to shine|-|Verb|Nature|1
kalt|cold|-|Adjective|Nature|1
warm|warm|-|Adjective|Nature|1
heiß|hot|-|Adjective|Nature|1
Himmel|sky|m|Noun|Nature|1
Natur|nature|f|Noun|Nature|1
Wiese|meadow|f|Noun|Nature|1
Strand|beach|m|Noun|Nature|1
Insel|island|f|Noun|Nature|1

# COLORS (FARBEN)
Farbe|color|f|Noun|Colors|1
rot|red|-|Adjective|Colors|1
blau|blue|-|Adjective|Colors|1
grün|green|-|Adjective|Colors|1
gelb|yellow|-|Adjective|Colors|1
schwarz|black|-|Adjective|Colors|1
weiß|white|-|Adjective|Colors|1
grau|gray|-|Adjective|Colors|1
braun|brown|-|Adjective|Colors|1
orange|orange|-|Adjective|Colors|1
lila|purple|-|Adjective|Colors|1
rosa|pink|-|Adjective|Colors|1
hell|light|-|Adjective|Colors|1
dunkel|dark|-|Adjective|Colors|1
bunt|colorful|-|Adjective|Colors|1
golden|golden|-|Adjective|Colors|1
silbern|silver|-|Adjective|Colors|1

# CLOTHING (KLEIDUNG)
Kleidung|clothing|f|Noun|Clothing|1
Hose|trousers|f|Noun|Clothing|1
Jeans|jeans|f|Noun|Clothing|1
Rock|skirt|m|Noun|Clothing|1
Kleid|dress|n|Noun|Clothing|1
Bluse|blouse|f|Noun|Clothing|1
Hemd|shirt|n|Noun|Clothing|1
T-Shirt|T-shirt|n|Noun|Clothing|1
Pullover|sweater|m|Noun|Clothing|1
Jacke|jacket|f|Noun|Clothing|1
Mantel|coat|m|Noun|Clothing|1
Schuh|shoe|m|Noun|Clothing|1
Stiefel|boot|m|Noun|Clothing|1
Socke|sock|f|Noun|Clothing|1
Hut|hat|m|Noun|Clothing|1
Mütze|cap|f|Noun|Clothing|1
Schal|scarf|m|Noun|Clothing|1
Handschuh|glove|m|Noun|Clothing|1
Brille|glasses|f|Noun|Clothing|1
Tasche|bag|f|Noun|Clothing|1
Rucksack|backpack|m|Noun|Clothing|1
Koffer|suitcase|m|Noun|Clothing|1
Geldbeutel|wallet|m|Noun|Clothing|1
Anzug|suit|m|Noun|Clothing|1
tragen|to wear|-|Verb|Verbs|1
anprobieren|to try on|-|Verb|Verbs|1
passen|to fit|-|Verb|Verbs|1

# VERBS (VERBEN)
denken|to think|-|Verb|Verbs|1
wissen|to know (fact)|-|Verb|Verbs|1
kennen|to know (person)|-|Verb|Verbs|1
wollen|to want|-|Verb|Verbs|1
sollen|should|-|Verb|Verbs|1
müssen|must|-|Verb|Verbs|1
dürfen|allowed to|-|Verb|Verbs|1
können|can|-|Verb|Verbs|1
mögen|to like|-|Verb|Verbs|1
lieben|to love|-|Verb|Verbs|1
hassen|to hate|-|Verb|Verbs|1
kaufen|to buy|-|Verb|Verbs|1
verkaufen|to sell|-|Verb|Verbs|1
suchen|to search|-|Verb|Verbs|1
finden|to find|-|Verb|Verbs|1
zeigen|to show|-|Verb|Verbs|1
sehen|to see|-|Verb|Verbs|1
riechen|to smell|-|Verb|Verbs|1
fühlen|to feel|-|Verb|Verbs|1
schmecken|to taste|-|Verb|Verbs|1
sitzen|to sit|-|Verb|Verbs|1
stehen|to stand|-|Verb|Verbs|1
liegen|to lie|-|Verb|Verbs|1
legen|to lay|-|Verb|Verbs|1
stellen|to place|-|Verb|Verbs|1
hängen|to hang|-|Verb|Verbs|1
warten|to wait|-|Verb|Verbs|1
glauben|to believe|-|Verb|Verbs|1
hoffen|to hope|-|Verb|Verbs|1
bringen|to bring|-|Verb|Verbs|1
holen|to fetch|-|Verb|Verbs|1
geben|to give|-|Verb|Verbs|1
helfen|to help|-|Verb|Verbs|1
danken|to thank|-|Verb|Verbs|1
feiern|to celebrate|-|Verb|Verbs|1
singen|to sing|-|Verb|Verbs|1
tanzen|to dance|-|Verb|Verbs|1
spielen|to play|-|Verb|Verbs|1
lachen|to laugh|-|Verb|Verbs|1
öffnen|to open|-|Verb|Verbs|1
schließen|to close|-|Verb|Verbs|1
beginnen|to begin|-|Verb|Verbs|1
enden|to end|-|Verb|Verbs|1

# ADJECTIVES (ADJEKTIVE)
einfach|simple/easy|-|Adjective|Adjectives|1
schwer|heavy/difficult|-|Adjective|Adjectives|1
offen|open|-|Adjective|Adjectives|1
geschlossen|closed|-|Adjective|Adjectives|1
frei|free|-|Adjective|Adjectives|1
besetzt|occupied|-|Adjective|Adjectives|1
voll|full|-|Adjective|Adjectives|1
leer|empty|-|Adjective|Adjectives|1
hoch|high|-|Adjective|Adjectives|1
tief|deep|-|Adjective|Adjectives|1
weit|far|-|Adjective|Adjectives|1
nah|near|-|Adjective|Adjectives|1
hart|hard|-|Adjective|Adjectives|1
weich|soft|-|Adjective|Adjectives|1
süß|sweet|-|Adjective|Adjectives|1
sauer|sour|-|Adjective|Adjectives|1
scharf|spicy/sharp|-|Adjective|Adjectives|1
frisch|fresh|-|Adjective|Adjectives|1
fertig|finished|-|Adjective|Adjectives|1
bereit|ready|-|Adjective|Adjectives|1
wichtig|important|-|Adjective|Adjectives|1
gleich|same/equal|-|Adjective|Adjectives|1
anders|different|-|Adjective|Adjectives|1
allein|alone|-|Adjective|Adjectives|1
zusammen|together|-|Adjective|Adjectives|1
müde|tired|-|Adjective|Adjectives|1
wach|awake|-|Adjective|Adjectives|1
glücklich|happy|-|Adjective|Adjectives|1
traurig|sad|-|Adjective|Adjectives|1
stark|strong|-|Adjective|Adjectives|1
schwach|weak|-|Adjective|Adjectives|1

# FOOD & DRINK (ESSEN & TRINKEN)
Essen|food|n|Noun|Food|1
Brot|bread|n|Noun|Food|1
Brötchen|roll|n|Noun|Food|1
Butter|butter|f|Noun|Food|1
Käse|cheese|m|Noun|Food|1
Wurst|sausage|f|Noun|Food|1
Schinken|ham|m|Noun|Food|1
Ei|egg|n|Noun|Food|1
Salz|salt|n|Noun|Food|1
Pfeffer|pepper|m|Noun|Food|1
Fleisch|meat|n|Noun|Food|1
Fisch|fish|m|Noun|Food|1
Reis|rice|m|Noun|Food|1
Nudel|noodle|f|Noun|Food|1
Kartoffel|potato|f|Noun|Food|1
Salat|salad|m|Noun|Food|1
Suppe|soup|f|Noun|Food|1
Obst|fruit|n|Noun|Food|1
Apfel|apple|m|Noun|Food|1
Banane|banana|f|Noun|Food|1
Orange|orange|f|Noun|Food|1
Gemüse|vegetables|n|Noun|Food|1
Tomate|tomato|f|Noun|Food|1
Gurke|cucumber|f|Noun|Food|1
Zwiebel|onion|f|Noun|Food|1
Schokolade|chocolate|f|Noun|Food|1
Kuchen|cake|m|Noun|Food|1
Eis|ice cream|n|Noun|Food|1
essen|to eat|-|Verb|Verbs|1
kochen|to cook|-|Verb|Verbs|1
schmecken|to taste|-|Verb|Verbs|1
Hunger|hunger|m|Noun|Food|1
Durst|thirst|m|Noun|Food|1
Frühstück|breakfast|n|Noun|Food|1
Mittagessen|lunch|n|Noun|Food|1
Abendessen|dinner|n|Noun|Food|1

# UNIT 12: KÖRPER UND GESUNDHEIT
Körper|body|m|Noun|Body|1
Kopf|head|m|Noun|Body|1
Haar|hair|n|Noun|Body|1
Auge|eye|n|Noun|Body|1
Ohr|ear|n|Noun|Body|1
Nase|nose|f|Noun|Body|1
Mund|mouth|m|Noun|Body|1
Zahn|tooth|m|Noun|Body|1
Hals|neck/throat|m|Noun|Body|1
Schulter|shoulder|f|Noun|Body|1
Rücken|back|m|Noun|Body|1
Arm|arm|m|Noun|Body|1
Hand|hand|f|Noun|Body|1
Finger|finger|m|Noun|Body|1
Bauch|stomach|m|Noun|Body|1
Bein|leg|n|Noun|Body|1
Knie|knee|n|Noun|Body|1
Fuß|foot|m|Noun|Body|1
Arzt|doctor|m|Noun|Professions|1
Krankenhaus|hospital|n|Noun|City|1
Praxis|practice|f|Noun|City|1
Apotheke|pharmacy|f|Noun|City|1
Medikament|medicine|n|Noun|Body|1
Tablette|pill|f|Noun|Body|1
Salbe|ointment|f|Noun|Body|1
Pflaster|plaster|n|Noun|Body|1
Rezept|prescription|n|Noun|Body|1
Schmerz|pain|m|Noun|Body|1
Fieber|fever|n|Noun|Body|1
Husten|cough|m|Noun|Body|1
Schnupfen|cold|m|Noun|Body|1
Gesundheit|health|f|Noun|Body|1
Krankheit|illness|f|Noun|Body|1
krank|sick|-|Adjective|Adjectives|1
gesund|healthy|-|Adjective|Adjectives|1
müde|tired|-|Adjective|Adjectives|1
fit|fit|-|Adjective|Adjectives|1
weh tun|to hurt|-|Verb|Verbs|1
husten|to cough|-|Verb|Verbs|1
fehlen|to be missing/wrong|-|Verb|Verbs|1
nehmen|to take|-|Verb|Verbs|1
bleiben|to stay|-|Verb|Verbs|1
sollen|should|-|Verb|Verbs|1
müssen|must|-|Verb|Verbs|1
dürfen|may/allowed|-|Verb|Verbs|1
können|can|-|Verb|Verbs|1
wollen|want|-|Verb|Verbs|1
mögen|like|-|Verb|Verbs|1

# TRANSPORT (VERKEHR)
Auto|car|n|Noun|Transportation|1
Bus|bus|m|Noun|Transportation|1
Zug|train|m|Noun|Transportation|1
Bahn|train/railway|f|Noun|Transportation|1
U-Bahn|subway|f|Noun|Transportation|1
S-Bahn|suburban train|f|Noun|Transportation|1
Straßenbahn|tram|f|Noun|Transportation|1
Flugzeug|airplane|n|Noun|Transportation|1
Fahrrad|bicycle|n|Noun|Transportation|1
Taxi|taxi|n|Noun|Transportation|1
Schiff|ship|n|Noun|Transportation|1
Motorrad|motorcycle|n|Noun|Transportation|1
Ticket|ticket|n|Noun|Transportation|1
Fahrkarte|ticket|f|Noun|Transportation|1
Bahnhof|train station|m|Noun|Transportation|1
Haltestelle|stop|f|Noun|Transportation|1
Flughafen|airport|m|Noun|Transportation|1
Gleis|track/platform|n|Noun|Transportation|1
Verspätung|delay|f|Noun|Transportation|1
Abfahrt|departure|f|Noun|Transportation|1
Ankunft|arrival|f|Noun|Transportation|1
Koffer|suitcase|m|Noun|Transportation|1
Gepäck|luggage|n|Noun|Transportation|1
fahren|to drive/go|-|Verb|Transportation|1
fliegen|to fly|-|Verb|Transportation|1
einsteigen|to get on|-|Verb|Transportation|1
aussteigen|to get off|-|Verb|Transportation|1
umsteigen|to transfer|-|Verb|Transportation|1

# TECHNOLOGY (TECHNIK)
Computer|computer|m|Noun|Technology|1
Laptop|laptop|m|Noun|Technology|1
Handy|mobile phone|n|Noun|Technology|1
Tablet|tablet|n|Noun|Technology|1
Fernseher|TV|m|Noun|Technology|1
Radio|radio|n|Noun|Technology|1
Kamera|camera|f|Noun|Technology|1
Internet|internet|n|Noun|Technology|1
WLAN|WiFi|n|Noun|Technology|1
E-Mail|email|f|Noun|Technology|1
Nachricht|message|f|Noun|Technology|1
Bildschirm|screen|m|Noun|Technology|1
Tastatur|keyboard|f|Noun|Technology|1
Maus|mouse|f|Noun|Technology|1
Drucker|printer|m|Noun|Technology|1
Datei|file|f|Noun|Technology|1
Programm|program|n|Noun|Technology|1
App|app|f|Noun|Technology|1
Passwort|password|n|Noun|Technology|1
Link|link|m|Noun|Technology|1
klicken|to click|-|Verb|Technology|1
speichern|to save|-|Verb|Technology|1
senden|to send|-|Verb|Technology|1
löschen|to delete|-|Verb|Technology|1
drucken|to print|-|Verb|Technology|1
anrufen|to call|-|Verb|Technology|1
telefonieren|to phone|-|Verb|Technology|1
chatten|to chat|-|Verb|Technology|1
online|online|-|Adjective|Technology|1
offline|offline|-|Adjective|Technology|1

# TIME & CALENDAR (ZEIT)
Zeit|time|f|Noun|Time|1
Uhr|clock/watch|f|Noun|Time|1
Stunde|hour|f|Noun|Time|1
Minute|minute|f|Noun|Time|1
Sekunde|second|f|Noun|Time|1
Tag|day|m|Noun|Time|1
Woche|week|f|Noun|Time|1
Monat|month|m|Noun|Time|1
Jahr|year|n|Noun|Time|1
Morgen|morning|m|Noun|Time|1
Vormittag|morning (late)|m|Noun|Time|1
Mittag|noon|m|Noun|Time|1
Nachmittag|afternoon|m|Noun|Time|1
Abend|evening|m|Noun|Time|1
Nacht|night|f|Noun|Time|1
Montag|Monday|m|Noun|Time|1
Dienstag|Tuesday|m|Noun|Time|1
Mittwoch|Wednesday|m|Noun|Time|1
Donnerstag|Thursday|m|Noun|Time|1
Freitag|Friday|m|Noun|Time|1
Samstag|Saturday|m|Noun|Time|1
Sonntag|Sunday|m|Noun|Time|1
Januar|January|m|Noun|Time|1
Februar|February|m|Noun|Time|1
März|March|m|Noun|Time|1
April|April|m|Noun|Time|1
Mai|May|m|Noun|Time|1
Juni|June|m|Noun|Time|1
Juli|July|m|Noun|Time|1
August|August|m|Noun|Time|1
September|September|m|Noun|Time|1
Oktober|October|m|Noun|Time|1
November|November|m|Noun|Time|1
Dezember|December|m|Noun|Time|1
Frühling|Spring|m|Noun|Time|1
Sommer|Summer|m|Noun|Time|1
Herbst|Autumn|m|Noun|Time|1
Winter|Winter|m|Noun|Time|1
heute|today|-|Adverb|Time|1
morgen|tomorrow|-|Adverb|Time|1
gestern|yesterday|-|Adverb|Time|1
jetzt|now|-|Adverb|Time|1
später|later|-|Adverb|Time|1
bald|soon|-|Adverb|Time|1
immer|always|-|Adverb|Time|1
nie|never|-|Adverb|Time|1
oft|often|-|Adverb|Time|1
manchmal|sometimes|-|Adverb|Time|1

# FEELINGS (GEFÜHLE)
Liebe|love|f|Noun|Feelings|1
Angst|fear|f|Noun|Feelings|1
Glück|luck/happiness|n|Noun|Feelings|1
Spaß|fun|m|Noun|Feelings|1
Wut|anger|f|Noun|Feelings|1
Trauer|grief|f|Noun|Feelings|1
Stress|stress|m|Noun|Feelings|1
Ruhe|calm/peace|f|Noun|Feelings|1
Hoffnung|hope|f|Noun|Feelings|1
Traum|dream|m|Noun|Feelings|1
lachen|to laugh|-|Verb|Feelings|1
weinen|to cry|-|Verb|Feelings|1
lächeln|to smile|-|Verb|Feelings|1
freuen|to be happy|-|Verb|Feelings|1
ärgern|to be annoyed|-|Verb|Feelings|1
fühlen|to feel|-|Verb|Feelings|1
lieben|to love|-|Verb|Feelings|1
hassen|to hate|-|Verb|Feelings|1
glücklich|happy|-|Adjective|Feelings|1
traurig|sad|-|Adjective|Feelings|1
wütend|angry|-|Adjective|Feelings|1
müde|tired|-|Adjective|Feelings|1
nervös|nervous|-|Adjective|Feelings|1
zufrieden|satisfied|-|Adjective|Feelings|1
lustig|funny|-|Adjective|Feelings|1
langweilig|boring|-|Adjective|Feelings|1
interessant|interesting|-|Adjective|Feelings|1
nett|nice|-|Adjective|Feelings|1
böse|evil/angry|-|Adjective|Feelings|1
sympathisch|likable|-|Adjective|Feelings|1

# COUNTRIES (LÄNDER)
Deutschland|Germany|n|Noun|Countries|1
Österreich|Austria|n|Noun|Countries|1
Schweiz|Switzerland|f|Noun|Countries|1
Frankreich|France|n|Noun|Countries|1
Spanien|Spain|n|Noun|Countries|1
Italien|Italy|n|Noun|Countries|1
Großbritannien|Great Britain|n|Noun|Countries|1
USA|USA|p|Noun|Countries|1
Russland|Russia|n|Noun|Countries|1
Türkei|Turkey|f|Noun|Countries|1
Polen|Poland|n|Noun|Countries|1
China|China|n|Noun|Countries|1
Japan|Japan|n|Noun|Countries|1
Indien|India|n|Noun|Countries|1
Brasilien|Brazil|n|Noun|Countries|1
Ägypten|Egypt|n|Noun|Countries|1
Griechenland|Greece|n|Noun|Countries|1
Niederlande|Netherlands|p|Noun|Countries|1
Schweden|Sweden|n|Noun|Countries|1
Dänemark|Denmark|n|Noun|Countries|1

# PROFESSIONS (BERUFE)
Arzt|doctor (m)|m|Noun|Professions|1
Ärztin|doctor (f)|f|Noun|Professions|1
Lehrer|teacher (m)|m|Noun|Professions|1
Lehrerin|teacher (f)|f|Noun|Professions|1
Student|student (m)|m|Noun|Professions|1
Studentin|student (f)|f|Noun|Professions|1
Kellner|waiter|m|Noun|Professions|1
Kellnerin|waitress|f|Noun|Professions|1
Koch|cook (m)|m|Noun|Professions|1
Köchin|cook (f)|f|Noun|Professions|1
Ingenieur|engineer|m|Noun|Professions|1
Verkäufer|salesperson|m|Noun|Professions|1
Friseur|hairdresser|m|Noun|Professions|1
Polizist|police officer|m|Noun|Professions|1
Fahrer|driver|m|Noun|Professions|1
Sekretär|secretary|m|Noun|Professions|1
Chef|boss|m|Noun|Professions|1
Kollege|colleague|m|Noun|Professions|1
Firma|company|f|Noun|Professions|1
Büro|office|n|Noun|Professions|1
Arbeit|work|f|Noun|Professions|1
Job|job|m|Noun|Professions|1
arbeiten|to work|-|Verb|Professions|1
studieren|to study|-|Verb|Professions|1
verdienen|to earn|-|Verb|Professions|1

# OFFICE (BÜRO)
Schreibtisch|desk|m|Noun|Office|1
Stuhl|chair|m|Noun|Office|1
Computer|computer|m|Noun|Office|1
Drucker|printer|m|Noun|Office|1
Telefon|phone|n|Noun|Office|1
Termin|appointment|m|Noun|Office|1
Meeting|meeting|n|Noun|Office|1
Pause|break|f|Noun|Office|1
Kaffee|coffee|m|Noun|Office|1
E-Mail|email|f|Noun|Office|1
Brief|letter|m|Noun|Office|1
Notiz|note|f|Noun|Office|1
Stift|pen|m|Noun|Office|1
Papier|paper|n|Noun|Office|1
Chef|boss|m|Noun|Office|1
Kollege|colleague|m|Noun|Office|1
Mitarbeiter|employee|m|Noun|Office|1
Kunde|customer|m|Noun|Office|1
schreiben|to write|-|Verb|Office|1
anrufen|to call|-|Verb|Office|1
senden|to send|-|Verb|Office|1
drucken|to print|-|Verb|Office|1
kopieren|to copy|-|Verb|Office|1

# SHOPPING (EINKAUFEN)
Supermarkt|supermarket|m|Noun|Shopping|1
Markt|market|m|Noun|Shopping|1
Laden|shop|m|Noun|Shopping|1
Kasse|checkout|f|Noun|Shopping|1
Einkaufswagen|shopping cart|m|Noun|Shopping|1
Tasche|bag|f|Noun|Shopping|1
Tüte|bag (plastic/paper)|f|Noun|Shopping|1
Preis|price|m|Noun|Shopping|1
Geld|money|n|Noun|Shopping|1
Kreditkarte|credit card|f|Noun|Shopping|1
Quittung|receipt|f|Noun|Shopping|1
Angebot|offer|n|Noun|Shopping|1
Rabatt|discount|m|Noun|Shopping|1
teuer|expensive|-|Adjective|Shopping|1
billig|cheap|-|Adjective|Shopping|1
günstig|favorable/cheap|-|Adjective|Shopping|1
kosten|to cost|-|Verb|Shopping|1
kaufen|to buy|-|Verb|Shopping|1
bezahlen|to pay|-|Verb|Shopping|1
suchen|to search|-|Verb|Shopping|1
finden|to find|-|Verb|Shopping|1
brauchen|to need|-|Verb|Shopping|1

# EMERGENCY (NOTFALL)
Hilfe|help|f|Noun|Emergency|1
Polizei|police|f|Noun|Emergency|1
Feuerwehr|fire department|f|Noun|Emergency|1
Krankenwagen|ambulance|m|Noun|Emergency|1
Notarzt|emergency doctor|m|Noun|Emergency|1
Unfall|accident|m|Noun|Emergency|1
Feuer|fire|n|Noun|Emergency|1
Dieb|thief|m|Noun|Emergency|1
Schlüssel|key|m|Noun|Emergency|1
Geldbeutel|wallet|m|Noun|Emergency|1
Ausweis|ID card|m|Noun|Emergency|1
Pass|passport|m|Noun|Emergency|1
verlieren|to lose|-|Verb|Emergency|1
stehlen|to steal|-|Verb|Emergency|1
helfen|to help|-|Verb|Emergency|1
suchen|to search|-|Verb|Emergency|1
finden|to find|-|Verb|Emergency|1
rufen|to call|-|Verb|Emergency|1
verletzt|injured|-|Adjective|Emergency|1
gestohlen|stolen|-|Adjective|Emergency|1
weg|gone/away|-|Adjective|Emergency|1
`;

export const LOCAL_VOCAB: LocalVocabEntry[] = RAW_CSV_DATA
  .trim()
  .split('\n')
  .filter(line => line.length > 0 && !line.startsWith('#'))
  .map(line => {
    const parts = line.split('|');
    const german = parts[0]?.trim() || '';
    const english = parts[1]?.trim() || '';
    const genderKey = parts[2]?.trim() || '';
    const type = parts[3]?.trim() || '';
    const category = parts[4]?.trim() || '';
    const levelKey = parts[5]?.trim() || '';

    const gender = getArticle(genderKey);
    const examples = generateExample(german, english, type, genderKey, category);
    
    return {
      german,
      english,
      gender: gender as 'der'|'die'|'das'|'',
      type,
      category,
      level: parseLevel(levelKey),
      exampleGerman: examples.de,
      exampleEnglish: examples.en
    };
  });
