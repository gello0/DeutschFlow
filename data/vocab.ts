
import { VocabWord, VerbDrill, DifficultyLevel } from "../types";

// Extended interface for local DB
export interface LocalVocabEntry extends VocabWord {
  level: DifficultyLevel;
  category: string;
}

// Helpers
export const getArticle = (key: string): string => {
  switch (key) {
    case 'm': return 'der';
    case 'f': return 'die';
    case 'n': return 'das';
    default: return '';
  }
};

export const parseLevel = (key: string): DifficultyLevel => {
  switch(key) {
      case '2': return DifficultyLevel.Intermediate;
      case '3': return DifficultyLevel.Advanced;
      default: return DifficultyLevel.Beginner;
  }
};

export const generateExample = (german: string, english: string, type: string, genderKey: string, category: string): { de: string, en: string } => {
    if (type === 'Verb') {
        return { de: `Ich möchte ${german}.`, en: `I would like to ${english}.` };
    }
    const article = getArticle(genderKey);
    if (article) {
         const CapArticle = article.charAt(0).toUpperCase() + article.slice(1);
         return { de: `${CapArticle} ${german} ist schön.`, en: `The ${english} is beautiful.` };
    }
    return { de: `${german} ist wichtig.`, en: `${english} is important.` };
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

# UNIT 5: TERMINE
Zeit|time|f|Noun|Time|1
Uhr|clock/watch|f|Noun|Time|1
Uhrzeit|time of day|f|Noun|Time|1
Stunde|hour|f|Noun|Time|1
Minute|minute|f|Noun|Time|1
Sekunde|second|f|Noun|Time|1
Tag|day|m|Noun|Time|1
Woche|week|f|Noun|Time|1
Monat|month|m|Noun|Time|1
Jahr|year|n|Noun|Time|1
Morgen|morning|m|Noun|Time|1
Vormittag|late morning|m|Noun|Time|1
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
Wochenende|weekend|n|Noun|Time|1
Termin|appointment|m|Noun|Time|1
Kalender|calendar|m|Noun|Time|1
Verabredung|date/meeting|f|Noun|Time|1
Treffen|meeting|n|Noun|Time|1
anfangen|to begin|-|Verb|Verbs|1
aufhören|to stop|-|Verb|Verbs|1
dauern|to last|-|Verb|Verbs|1
treffen|to meet|-|Verb|Verbs|1
verabreden|to arrange a meeting|-|Verb|Verbs|1
abholen|to pick up|-|Verb|Verbs|1
anrufen|to call|-|Verb|Verbs|1
fernsehen|to watch TV|-|Verb|Verbs|1
einkaufen|to shop|-|Verb|Verbs|1
spät|late|-|Adjective|Adjectives|1
früh|early|-|Adjective|Adjectives|1
pünktlich|on time|-|Adjective|Adjectives|1
heute|today|-|Adverb|Time|1
morgen|tomorrow|-|Adverb|Time|1
gestern|yesterday|-|Adverb|Time|1
jetzt|now|-|Adverb|Time|1
immer|always|-|Adverb|Time|1
oft|often|-|Adverb|Time|1
manchmal|sometimes|-|Adverb|Time|1
nie|never|-|Adverb|Time|1

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
