
import { VocabWord, VerbDrill, DifficultyLevel } from "../types";

// Extended interface for local DB
interface LocalVocabEntry extends VocabWord {
  level: DifficultyLevel;
  category: string;
}

export const LOCAL_SENTENCES = [
  // Unit 1: Kaffee oder Tee? / Basics
  { german: "Ich möchte einen Kaffee.", english: "I would like a coffee." },
  { german: "Die Rechnung bitte.", english: "The check please." },
  { german: "Was trinken Sie?", english: "What are you drinking?" },
  { german: "Ich nehme einen Tee.", english: "I will take a tea." },
  { german: "Zusammen oder getrennt?", english: "Together or separate?" },
  { german: "Wie heißen Sie?", english: "What is your name?" },
  { german: "Woher kommen Sie?", english: "Where do you come from?" },
  
  // Unit 2: Sprache im Kurs
  { german: "Das ist ein Buch.", english: "This is a book." },
  { german: "Wie schreibt man das?", english: "How do you write that?" },
  { german: "Ich verstehe das nicht.", english: "I do not understand that." },
  { german: "Bitte wiederholen Sie.", english: "Please repeat." },
  { german: "Das ist kein Kuli.", english: "That is not a pen." },
  { german: "Haben Sie eine Frage?", english: "Do you have a question?" },

  // Unit 3: Städte - Länder - Sprachen
  { german: "Ich wohne in Berlin.", english: "I live in Berlin." },
  { german: "Er kommt aus Spanien.", english: "He comes from Spain." },
  { german: "Wo liegt München?", english: "Where is Munich located?" },
  { german: "Sprichst du Deutsch?", english: "Do you speak German?" },
  { german: "Wir lernen Italienisch.", english: "We are learning Italian." },

  // Unit 4: Menschen und Häuser
  { german: "Die Wohnung ist groß.", english: "The apartment is big." },
  { german: "Das Zimmer ist hell.", english: "The room is bright." },
  { german: "Der Tisch ist billig.", english: "The table is cheap." },
  { german: "Hier ist das Bad.", english: "Here is the bathroom." },
  { german: "Wir haben einen Balkon.", english: "We have a balcony." },
  { german: "Möbel sind teuer.", english: "Furniture is expensive." },

  // Unit 5: Termine
  { german: "Wie spät ist es?", english: "What time is it?" },
  { german: "Es ist halb drei.", english: "It is half past two." },
  { german: "Wann hast du Zeit?", english: "When do you have time?" },
  { german: "Wir treffen uns heute.", english: "We are meeting today." },
  { german: "Am Montag arbeite ich.", english: "On Monday I work." },
  { german: "Der Zug fährt jetzt.", english: "The train is leaving now." },

  // Unit 6: Orientierung
  { german: "Entschuldigung wo ist der Bahnhof?", english: "Excuse me where is the station?" },
  { german: "Gehen Sie geradeaus.", english: "Go straight ahead." },
  { german: "Dann links abbiegen.", english: "Then turn left." },
  { german: "Die Post ist rechts.", english: "The post office is on the right." },
  { german: "Ich fahre mit dem Bus.", english: "I am going by bus." },
  { german: "Wir suchen das Hotel.", english: "We are looking for the hotel." },

  // Unit 7: Berufe
  { german: "Was sind Sie von Beruf?", english: "What is your profession?" },
  { german: "Ich arbeite als Lehrer.", english: "I work as a teacher." },
  { german: "Ich bin Studentin.", english: "I am a student." },
  { german: "Macht die Arbeit Spaß?", english: "Is the work fun?" },
  { german: "Ich habe viel Stress.", english: "I have a lot of stress." },

  // Unit 9: Urlaub
  { german: "Wir fahren ans Meer.", english: "We are going to the sea." },
  { german: "Das Wetter ist schön.", english: "The weather is nice." },
  { german: "Die Sonne scheint.", english: "The sun is shining." },
  { german: "Ich wandere gern.", english: "I like hiking." },
  { german: "Wir haben im Hotel übernachtet.", english: "We stayed at a hotel." },

  // Unit 10: Essen und Trinken
  { german: "Ich habe Hunger.", english: "I am hungry." },
  { german: "Schmeckt es dir?", english: "Does it taste good to you?" },
  { german: "Ich esse kein Fleisch.", english: "I do not eat meat." },
  { german: "Möchtest du Kartoffeln?", english: "Would you like potatoes?" },
  { german: "Das Frühstück ist fertig.", english: "Breakfast is ready." },

  // Unit 11: Kleidung
  { german: "Die Jacke passt mir.", english: "The jacket fits me." },
  { german: "Ich kaufe eine Hose.", english: "I am buying trousers." },
  { german: "Welche Farbe magst du?", english: "Which color do you like?" },
  { german: "Der Pullover ist warm.", english: "The sweater is warm." },
  
  // Unit 12: Gesundheit
  { german: "Mein Kopf tut weh.", english: "My head hurts." },
  { german: "Ich bin krank.", english: "I am sick." },
  { german: "Ich muss zum Arzt.", english: "I must go to the doctor." },
  { german: "Gute Besserung!", english: "Get well soon!" }
];

// ---------------------------------------------------------------------------
// 1. COMPACT DATA STORE (CSV Style)
// Format: German|English|Gender|Type|Category|Level
// Gender keys: m=der, f=die, n=das, -=none
// Level keys: 1=A1, 2=A2, 3=B1, 4=B2, 5=C1
// ---------------------------------------------------------------------------

const RAW_CSV_DATA = `
# BASICS & GREETINGS (Unit 1)
hallo|hello|-|Greeting|Basics|1
tschüss|bye|-|Greeting|Basics|1
guten Morgen|good morning|-|Greeting|Basics|1
guten Tag|good day|-|Greeting|Basics|1
guten Abend|good evening|-|Greeting|Basics|1
gute Nacht|good night|-|Greeting|Basics|1
bitte|please|-|Phrase|Basics|1
danke|thanks|-|Phrase|Basics|1
ja|yes|-|Adverb|Basics|1
nein|no|-|Adverb|Basics|1
vielleicht|maybe|-|Adverb|Basics|1
Entschuldigung|excuse me|-|Phrase|Basics|1
wie geht's?|how are you?|-|Phrase|Basics|1
mir geht es gut|I am fine|-|Phrase|Basics|1
wer|who|-|Pronoun|Basics|1
was|what|-|Pronoun|Basics|1
wann|when|-|Pronoun|Basics|1
wo|where|-|Pronoun|Basics|1
warum|why|-|Pronoun|Basics|1
wie|how|-|Pronoun|Basics|1
und|and|-|Conjunction|Basics|1
oder|or|-|Conjunction|Basics|1
aber|but|-|Conjunction|Basics|1
hier|here|-|Adverb|Basics|1
da|there|-|Adverb|Basics|1
dort|over there|-|Adverb|Basics|1

# DRINKS & CAFE (Unit 1)
Kaffee|coffee|m|Noun|Food|1
Tee|tea|m|Noun|Food|1
Milch|milk|f|Noun|Food|1
Zucker|sugar|m|Noun|Food|1
Wasser|water|n|Noun|Food|1
Saft|juice|m|Noun|Food|1
Cola|cola|f|Noun|Food|1
Bier|beer|n|Noun|Food|1
Wein|wine|m|Noun|Food|1
Rechnung|bill/check|f|Noun|Society|1
bezahlen|to pay|-|Verb|Verbs|1
bestellen|to order|-|Verb|Verbs|1
trinken|to drink|-|Verb|Verbs|1
Glas|glass|n|Noun|Kitchen|1
Tasse|cup|f|Noun|Kitchen|1

# CLASSROOM & OBJECTS (Unit 2)
Buch|book|n|Noun|Education|1
Heft|notebook|n|Noun|Education|1
Stift|pen|m|Noun|Education|1
Kugelschreiber|ballpoint pen|m|Noun|Education|1
Bleistift|pencil|m|Noun|Education|1
Radiergummi|eraser|m|Noun|Education|1
Tafel|blackboard|f|Noun|Education|1
Tisch|table|m|Noun|Home|1
Stuhl|chair|m|Noun|Home|1
Computer|computer|m|Noun|Work|1
Laptop|laptop|m|Noun|Work|1
Handy|mobile phone|n|Noun|Objects|1
Brille|glasses|f|Noun|Objects|1
Tasche|bag|f|Noun|Objects|1
Wörterbuch|dictionary|n|Noun|Education|1
lesen|to read|-|Verb|Verbs|1
schreiben|to write|-|Verb|Verbs|1
lernen|to learn|-|Verb|Verbs|1
fragen|to ask|-|Verb|Verbs|1
antworten|to answer|-|Verb|Verbs|1
verstehen|to understand|-|Verb|Verbs|1
wiederholen|to repeat|-|Verb|Verbs|1

# COUNTRIES & LANGUAGES (Unit 3)
Land|country|n|Noun|City|1
Stadt|city|f|Noun|City|1
Sprache|language|f|Noun|Society|1
Deutschland|Germany|n|Noun|City|1
Österreich|Austria|n|Noun|City|1
Schweiz|Switzerland|f|Noun|City|1
Italien|Italy|n|Noun|City|1
Frankreich|France|n|Noun|City|1
Spanien|Spain|n|Noun|City|1
sprechen|to speak|-|Verb|Verbs|1
kommen|to come|-|Verb|Verbs|1
wohnen|to live|-|Verb|Verbs|1
liegen|to be located|-|Verb|Verbs|1
Norden|North|m|Noun|Nature|1
Süden|South|m|Noun|Nature|1
Osten|East|m|Noun|Nature|1
Westen|West|m|Noun|Nature|1

# HOME & FURNITURE (Unit 4)
Haus|house|n|Noun|Home|1
Wohnung|apartment|f|Noun|Home|1
Zimmer|room|n|Noun|Home|1
Wohnzimmer|living room|n|Noun|Home|1
Schlafzimmer|bedroom|n|Noun|Home|1
Küche|kitchen|f|Noun|Home|1
Bad|bathroom|n|Noun|Home|1
Balkon|balcony|m|Noun|Home|1
Garten|garden|m|Noun|Home|1
Flur|hallway|m|Noun|Home|1
Bett|bed|n|Noun|Home|1
Schrank|cabinet/closet|m|Noun|Home|1
Sofa|sofa|n|Noun|Home|1
Sessel|armchair|m|Noun|Home|1
Regal|shelf|n|Noun|Home|1
Lampe|lamp|f|Noun|Home|1
Teppich|rug/carpet|m|Noun|Home|1
groß|big|-|Adjective|Adjectives|1
klein|small|-|Adjective|Adjectives|1
hell|bright|-|Adjective|Adjectives|1
dunkel|dark|-|Adjective|Adjectives|1
schön|beautiful|-|Adjective|Adjectives|1
gemütlich|cozy|-|Adjective|Adjectives|1
teuer|expensive|-|Adjective|Adjectives|1
billig|cheap|-|Adjective|Adjectives|1

# TIME & APPOINTMENTS (Unit 5)
Zeit|time|f|Noun|Time|1
Uhr|clock/watch|f|Noun|Time|1
Stunde|hour|f|Noun|Time|1
Minute|minute|f|Noun|Time|1
Tag|day|m|Noun|Time|1
Woche|week|f|Noun|Time|1
Monat|month|m|Noun|Time|1
Jahr|year|n|Noun|Time|1
Montag|Monday|m|Noun|Time|1
Dienstag|Tuesday|m|Noun|Time|1
Mittwoch|Wednesday|m|Noun|Time|1
Donnerstag|Thursday|m|Noun|Time|1
Freitag|Friday|m|Noun|Time|1
Samstag|Saturday|m|Noun|Time|1
Sonntag|Sunday|m|Noun|Time|1
Wochenende|weekend|n|Noun|Time|1
Morgen|morning|m|Noun|Time|1
Mittag|noon|m|Noun|Time|1
Abend|evening|m|Noun|Time|1
Nacht|night|f|Noun|Time|1
Termin|appointment|m|Noun|Time|1
Verabredung|date/meeting|f|Noun|Time|1
Kalender|calendar|m|Noun|Time|1
anfangen|to start|-|Verb|Verbs|1
aufstehen|to get up|-|Verb|Verbs|1
schlafen|to sleep|-|Verb|Verbs|1
arbeiten|to work|-|Verb|Verbs|1
spät|late|-|Adjective|Adjectives|1
früh|early|-|Adjective|Adjectives|1

# CITY & TRANSPORT (Unit 6 & 8)
Bahnhof|train station|m|Noun|Transport|1
Flughafen|airport|m|Noun|Transport|1
Hotel|hotel|n|Noun|City|1
Bank|bank|f|Noun|City|1
Post|post office|f|Noun|City|1
Polizei|police|f|Noun|City|1
Museum|museum|n|Noun|City|1
Kino|cinema|n|Noun|City|1
Theater|theater|n|Noun|City|1
Bus|bus|m|Noun|Transport|1
Zug|train|m|Noun|Transport|1
Straßenbahn|tram|f|Noun|Transport|1
U-Bahn|subway|f|Noun|Transport|1
Auto|car|n|Noun|Transport|1
Fahrrad|bicycle|n|Noun|Transport|1
Taxi|taxi|n|Noun|Transport|1
fahren|to drive/go|-|Verb|Verbs|1
gehen|to go/walk|-|Verb|Verbs|1
nehmen|to take|-|Verb|Verbs|1
suchen|to search|-|Verb|Verbs|1
finden|to find|-|Verb|Verbs|1
links|left|-|Adverb|City|1
rechts|right|-|Adverb|City|1
geradeaus|straight ahead|-|Adverb|City|1
Weg|way/path|m|Noun|City|1
Plan|map/plan|m|Noun|City|1

# PROFESSIONS (Unit 7)
Beruf|profession|m|Noun|Professions|1
Arbeit|work|f|Noun|Work|1
Arzt|doctor|m|Noun|Professions|1
Ärztin|doctor (f)|f|Noun|Professions|1
Lehrer|teacher|m|Noun|Professions|1
Lehrerin|teacher (f)|f|Noun|Professions|1
Student|student|m|Noun|Professions|1
Verkäufer|salesperson|m|Noun|Professions|1
Kellner|waiter|m|Noun|Professions|1
Ingenieur|engineer|m|Noun|Professions|1
Friseur|hairdresser|m|Noun|Professions|1
Sekretärin|secretary (f)|f|Noun|Professions|1
Büro|office|n|Noun|Work|1
Firma|company|f|Noun|Work|1
Kollege|colleague|m|Noun|Work|1
Chef|boss|m|Noun|Work|1
verdienen|to earn|-|Verb|Verbs|1
machen|to do/make|-|Verb|Verbs|1

# VACATION & NATURE (Unit 9)
Urlaub|vacation|m|Noun|Time|1
Ferien|holidays|f|Noun|Time|1
Reise|trip|f|Noun|Transport|1
Meer|sea|n|Noun|Nature|1
Strand|beach|m|Noun|Nature|1
See|lake|m|Noun|Nature|1
Berg|mountain|m|Noun|Nature|1
Wald|forest|m|Noun|Nature|1
Sonne|sun|f|Noun|Nature|1
Wetter|weather|n|Noun|Nature|1
wandern|to hike|-|Verb|Verbs|1
baden|to bathe/swim|-|Verb|Verbs|1
schwimmen|to swim|-|Verb|Verbs|1
reisen|to travel|-|Verb|Verbs|1
besichtigen|to visit (sights)|-|Verb|Verbs|1
warm|warm|-|Adjective|Adjectives|1
kalt|cold|-|Adjective|Adjectives|1

# FOOD (Unit 10)
Essen|food|n|Noun|Food|1
Brot|bread|n|Noun|Food|1
Brötchen|roll|n|Noun|Food|1
Käse|cheese|m|Noun|Food|1
Wurst|sausage|f|Noun|Food|1
Ei|egg|n|Noun|Food|1
Butter|butter|f|Noun|Food|1
Marmelade|jam|f|Noun|Food|1
Joghurt|yogurt|m|Noun|Food|1
Fleisch|meat|n|Noun|Food|1
Fisch|fish|m|Noun|Food|1
Obst|fruit|n|Noun|Food|1
Gemüse|vegetables|n|Noun|Food|1
Apfel|apple|m|Noun|Food|1
Banane|banana|f|Noun|Food|1
Kartoffel|potato|f|Noun|Food|1
Nudel|noodle|f|Noun|Food|1
Reis|rice|m|Noun|Food|1
Salat|salad|m|Noun|Food|1
Suppe|soup|f|Noun|Food|1
Kuchen|cake|m|Noun|Food|1
Schokolade|chocolate|f|Noun|Food|1
essen|to eat|-|Verb|Verbs|1
kochen|to cook|-|Verb|Verbs|1
kaufen|to buy|-|Verb|Verbs|1
schmecken|to taste|-|Verb|Verbs|1
lecker|yummy|-|Adjective|Adjectives|1

# CLOTHING (Unit 11)
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
Farbe|color|f|Noun|Colors|1
rot|red|-|Adjective|Colors|1
blau|blue|-|Adjective|Colors|1
grün|green|-|Adjective|Colors|1
gelb|yellow|-|Adjective|Colors|1
schwarz|black|-|Adjective|Colors|1
weiß|white|-|Adjective|Colors|1
tragen|to wear|-|Verb|Verbs|1
anziehen|to put on|-|Verb|Verbs|1
gefallen|to like/please|-|Verb|Verbs|1

# BODY & HEALTH (Unit 12)
Körper|body|m|Noun|Body|1
Kopf|head|m|Noun|Body|1
Auge|eye|n|Noun|Body|1
Ohr|ear|n|Noun|Body|1
Nase|nose|f|Noun|Body|1
Mund|mouth|m|Noun|Body|1
Hals|neck/throat|m|Noun|Body|1
Arm|arm|m|Noun|Body|1
Hand|hand|f|Noun|Body|1
Finger|finger|m|Noun|Body|1
Bauch|stomach|m|Noun|Body|1
Rücken|back|m|Noun|Body|1
Bein|leg|n|Noun|Body|1
Fuß|foot|m|Noun|Body|1
Krankheit|illness|f|Noun|Body|1
Schmerz|pain|m|Noun|Body|1
Fieber|fever|n|Noun|Body|1
Husten|cough|m|Noun|Body|1
Schnupfen|cold (runny nose)|m|Noun|Body|1
Arzt|doctor|m|Noun|Professions|1
Praxis|practice (doctor)|f|Noun|City|1
Apotheke|pharmacy|f|Noun|City|1
Medikament|medicine|n|Noun|Body|1
Tablette|pill|f|Noun|Body|1
gesund|healthy|-|Adjective|Adjectives|1
krank|sick|-|Adjective|Adjectives|1
weh tun|to hurt|-|Verb|Verbs|1
`;

// ---------------------------------------------------------------------------
// 2. PARSER & HELPER FUNCTIONS
// ---------------------------------------------------------------------------

const parseLevel = (l: string): DifficultyLevel => {
  switch (l) {
    case '1': return DifficultyLevel.Beginner;
    case '2': return DifficultyLevel.Beginner; // Include A2 in Beginner level as requested
    case '3': return DifficultyLevel.Intermediate;
    case '4': return DifficultyLevel.Intermediate;
    case '5': return DifficultyLevel.Advanced;
    default: return DifficultyLevel.Beginner;
  }
};

const getArticle = (gender: string) => {
  if (gender === 'm') return 'der';
  if (gender === 'f') return 'die';
  if (gender === 'n') return 'das';
  return '';
};

// Improved Auto-Generator for Examples
const generateExample = (german: string, english: string, type: string, gender: string, category: string) => {
  const art = getArticle(gender); // der, die, das
  const Art = art ? art.charAt(0).toUpperCase() + art.slice(1) : ''; 
  
  if (type === 'Greeting') return { de: `${german}! Wie geht es dir?`, en: `${english}! How are you?` };
  if (type === 'Phrase') return { de: `${german}. Das ist gut.`, en: `${english}. That is good.` };
  
  if (type === 'Noun') {
     const noun = german; 

     // Food/Drinks
     if (category === 'Food') {
        const verbs = ['schmeckt', 'ist'];
        const adj = ['lecker', 'frisch', 'gut'];
        return { de: `${Art} ${noun} schmeckt lecker.`, en: `The ${english} tastes delicious.` };
     }
     
     // Clothing
     if (category === 'Clothing') {
        // Accusative masculine 'einen'
        const ein = gender === 'f' ? 'eine' : (gender === 'm' ? 'einen' : 'ein');
        return { de: `Ich kaufe ${ein} ${noun}.`, en: `I am buying a ${english}.` };
     }

     // Body Parts
     if (category === 'Body') {
        return { de: `Mein ${noun} tut weh.`, en: `My ${english} hurts.` };
     }

     // Family
     if (category === 'Family') {
        return { de: `Mein ${noun} ist sehr freundlich.`, en: `My ${english} is very friendly.` };
     }

     // Animals
     if (category === 'Animals') {
         return { de: `${Art} ${noun} hat Hunger.`, en: `The ${english} is hungry.` };
     }

     // City & Places
     if (category === 'City' || category === 'Home') {
        if (['Schule', 'Arbeit', 'Universität', 'Bank', 'Post'].includes(noun)) {
             return { de: `Ich muss zur ${noun} gehen.`, en: `I must go to the ${english}.` };
        }
        return { de: `Wo finde ich ${gender === 'm' ? 'den' : (gender === 'f' ? 'die' : 'das')} ${noun}?`, en: `Where do I find the ${english}?` };
     }
     
     // Professions
     if (category === 'Professions' || category === 'Work') {
        return { de: `Er arbeitet als ${noun}.`, en: `He works as a ${english}.` };
     }
     
     // Transport
     if (category === 'Transport') {
        if (noun === 'Auto' || noun === 'Taxi') return { de: `Ich fahre mit dem ${noun}.`, en: `I go by ${english}.` };
        return { de: `Der ${noun} hat Verspätung.`, en: `The ${english} is delayed.` };
     }

     // Nature & Weather
     if (category === 'Nature') {
        if (['Sonne', 'Welt', 'Erde'].includes(noun)) return { de: `Die ${noun} ist groß.`, en: `The ${english} is big.` };
        if (['Regen', 'Schnee', 'Wind'].includes(noun)) return { de: `Der ${noun} ist stark.`, en: `The ${english} is strong.` };
        return { de: `${Art} ${noun} ist wunderschön.`, en: `The ${english} is beautiful.` };
     }
     
     // Objects/Materials/Tools
     if (category === 'Objects' || category === 'Kitchen') {
         // I search for... (Akkusativ)
         const artAkk = gender === 'm' ? 'den' : (gender === 'f' ? 'die' : 'das');
         return { de: `Ich suche ${artAkk} ${noun}.`, en: `I am looking for the ${english}.` };
     }
     
     // Time
     if (category === 'Time') {
         if (noun.endsWith('tag') || noun === 'Wochenende') return { de: `Am ${noun} habe ich Zeit.`, en: `On ${english} I have time.` };
         return { de: `Die ${noun} vergeht schnell.`, en: `The ${english} passes quickly.` };
     }

     // Society / Abstract
     if (category === 'Society' || category === 'Abstract') {
         return { de: `${noun} ist wichtig.`, en: `${english} is important.` };
     }

     // Default Noun catch-all (Varied based on gender to avoid repetition)
     if (art === 'der') return { de: `Wo ist der ${noun}?`, en: `Where is the ${english}?` };
     if (art === 'die') return { de: `Ich sehe die ${noun}.`, en: `I see the ${english}.` };
     if (art === 'das') return { de: `Das ${noun} gehört mir.`, en: `The ${english} belongs to me.` };
     
     return { de: `Hier ist ein ${noun}.`, en: `Here is a ${english}.` };
  }

  // Verb Handling - create context
  if (type === 'Verb') {
     return { de: `Kannst du ${german}?`, en: `Can you ${english}?` };
  }

  // Adjective Handling
  if (type === 'Adjective') {
     if (category === 'Colors') return { de: `Die Blume ist ${german}.`, en: `The flower is ${english}.` };
     return { de: `Ich finde das ${german}.`, en: `I find that ${english}.` };
  }
  
  if (type === 'Adverb') {
      return { de: `Er läuft ${german}.`, en: `He runs ${english}.` };
  }
  
  if (type === 'Pronoun') {
      return { de: `${german} ist das?`, en: `${english} is that?` };
  }

  if (type === 'Preposition') {
      return { de: `Das Buch liegt ${german} dem Tisch.`, en: `The book is ${english} the table.` };
  }

  if (type === 'Conjunction') {
      return { de: `Ich mag Kaffee ${german} Tee.`, en: `I like coffee ${english} tea.` };
  }

  // Fallback
  return { de: `${german}`, en: `${english}` };
};

export const LOCAL_VOCAB: LocalVocabEntry[] = RAW_CSV_DATA
  .trim()
  .split('\n')
  .filter(line => line.length > 0 && !line.startsWith('#'))
  .map(line => {
    // 1. Split safely
    const parts = line.split('|');
    
    // 2. Trim every field to avoid "Noun " vs "Noun" mismatches
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


// ---------------------------------------------------------------------------
// 3. VERB CONJUGATION DRILLS (Unchanged)
// ---------------------------------------------------------------------------
export const LOCAL_VERBS: VerbDrill[] = [
  {
    infinitive: "sein", translation: "to be", tense: "Präsens", tip: "Highly irregular! Memorize this first.",
    conjugations: { ich: "bin", du: "bist", er_sie_es: "ist", wir: "sind", ihr: "seid", sie_Sie: "sind" }
  },
  {
    infinitive: "haben", translation: "to have", tense: "Präsens", tip: "Used for possession and forming the perfect tense.",
    conjugations: { ich: "habe", du: "hast", er_sie_es: "hat", wir: "haben", ihr: "habt", sie_Sie: "haben" }
  },
  {
    infinitive: "werden", translation: "to become", tense: "Präsens", tip: "Also used for future tense (Future I).",
    conjugations: { ich: "werde", du: "wirst", er_sie_es: "wird", wir: "werden", ihr: "werdet", sie_Sie: "werden" }
  },
  {
    infinitive: "machen", translation: "to do/make", tense: "Präsens", tip: "Regular verb.",
    conjugations: { ich: "mache", du: "machst", er_sie_es: "macht", wir: "machen", ihr: "macht", sie_Sie: "machen" }
  },
  {
    infinitive: "gehen", translation: "to go", tense: "Präsens", tip: "",
    conjugations: { ich: "gehe", du: "gehst", er_sie_es: "geht", wir: "gehen", ihr: "geht", sie_Sie: "gehen" }
  },
  {
    infinitive: "essen", translation: "to eat", tense: "Präsens", tip: "Vowel change e -> i",
    conjugations: { ich: "esse", du: "isst", er_sie_es: "isst", wir: "essen", ihr: "esst", sie_Sie: "essen" }
  },
  {
    infinitive: "schlafen", translation: "to sleep", tense: "Präsens", tip: "Vowel change a -> ä",
    conjugations: { ich: "schlafe", du: "schläfst", er_sie_es: "schläft", wir: "schlafen", ihr: "schlaft", sie_Sie: "schlafen" }
  },
  {
    infinitive: "können", translation: "can", tense: "Präsens", tip: "Modal verb: vowel change o -> a",
    conjugations: { ich: "kann", du: "kannst", er_sie_es: "kann", wir: "können", ihr: "könnt", sie_Sie: "können" }
  },
  {
    infinitive: "müssen", translation: "must", tense: "Präsens", tip: "Modal verb: vowel change ü -> u",
    conjugations: { ich: "muss", du: "musst", er_sie_es: "muss", wir: "müssen", ihr: "müsst", sie_Sie: "müssen" }
  },
  {
    infinitive: "wollen", translation: "want", tense: "Präsens", tip: "Modal verb: vowel change o -> i",
    conjugations: { ich: "will", du: "willst", er_sie_es: "will", wir: "wollen", ihr: "wollt", sie_Sie: "wollen" }
  },
  {
    infinitive: "sehen", translation: "to see", tense: "Präsens", tip: "Vowel change e -> ie",
    conjugations: { ich: "sehe", du: "siehst", er_sie_es: "sieht", wir: "sehen", ihr: "seht", sie_Sie: "sehen" }
  },
  {
    infinitive: "sprechen", translation: "to speak", tense: "Präsens", tip: "Vowel change e -> i",
    conjugations: { ich: "spreche", du: "sprichst", er_sie_es: "spricht", wir: "sprechen", ihr: "sprecht", sie_Sie: "sprechen" }
  },
  {
    infinitive: "fahren", translation: "to drive/go", tense: "Präsens", tip: "Vowel change a -> ä",
    conjugations: { ich: "fahre", du: "fährst", er_sie_es: "fährt", wir: "fahren", ihr: "fahrt", sie_Sie: "fahren" }
  },
  {
    infinitive: "nehmen", translation: "to take", tense: "Präsens", tip: "Irregular eh -> imm",
    conjugations: { ich: "nehme", du: "nimmst", er_sie_es: "nimmt", wir: "nehmen", ihr: "nehmt", sie_Sie: "nehmen" }
  },
  {
    infinitive: "geben", translation: "to give", tense: "Präsens", tip: "Vowel change e -> i",
    conjugations: { ich: "gebe", du: "gibst", er_sie_es: "gibt", wir: "geben", ihr: "gebt", sie_Sie: "geben" }
  },
  {
    infinitive: "wissen", translation: "to know (facts)", tense: "Präsens", tip: "Irregular structure",
    conjugations: { ich: "weiß", du: "weißt", er_sie_es: "weiß", wir: "wissen", ihr: "wisst", sie_Sie: "wissen" }
  },
  {
    infinitive: "lassen", translation: "to let/allow", tense: "Präsens", tip: "Vowel change a -> ä",
    conjugations: { ich: "lasse", du: "lässt", er_sie_es: "lässt", wir: "lassen", ihr: "lasst", sie_Sie: "lassen" }
  },
  {
    infinitive: "laufen", translation: "to run/walk", tense: "Präsens", tip: "Vowel change au -> äu",
    conjugations: { ich: "laufe", du: "läufst", er_sie_es: "läuft", wir: "laufen", ihr: "lauft", sie_Sie: "laufen" }
  },
  {
    infinitive: "helfen", translation: "to help", tense: "Präsens", tip: "Vowel change e -> i",
    conjugations: { ich: "helfe", du: "hilfst", er_sie_es: "hilft", wir: "helfen", ihr: "helft", sie_Sie: "helfen" }
  },
  {
    infinitive: "treffen", translation: "to meet", tense: "Präsens", tip: "Vowel change e -> i",
    conjugations: { ich: "treffe", du: "triffst", er_sie_es: "trifft", wir: "treffen", ihr: "trefft", sie_Sie: "treffen" }
  }
];
