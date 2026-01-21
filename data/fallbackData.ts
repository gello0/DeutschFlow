import { VocabWord, VerbDrill, DifficultyLevel } from "../types";

// Extended interface for local DB
interface LocalVocabEntry extends VocabWord {
  level: DifficultyLevel;
  category: string;
}

// ---------------------------------------------------------------------------
// 1. COMPACT DATA STORE (To support 1000+ words efficiently)
// Format: [German, English, Gender, Type, Category, Level, ExGerman, ExEnglish]
// ---------------------------------------------------------------------------
type CompactEntry = [string, string, "der"|"die"|"das"|"", string, string, DifficultyLevel, string, string];

const RAW_VOCAB_DATA: CompactEntry[] = [
  // === A1: BASICS & GREETINGS ===
  ["hallo", "hello", "", "Greeting", "Basics", DifficultyLevel.Beginner, "Hallo, wie geht es dir?", "Hello, how are you?"],
  ["tschüss", "bye", "", "Greeting", "Basics", DifficultyLevel.Beginner, "Tschüss, bis morgen!", "Bye, see you tomorrow!"],
  ["bitte", "please", "", "Phrase", "Basics", DifficultyLevel.Beginner, "Ein Wasser, bitte.", "A water, please."],
  ["danke", "thanks", "", "Phrase", "Basics", DifficultyLevel.Beginner, "Danke für alles.", "Thanks for everything."],
  ["ja", "yes", "", "Adverb", "Basics", DifficultyLevel.Beginner, "Ja, das stimmt.", "Yes, that is right."],
  ["nein", "no", "", "Adverb", "Basics", DifficultyLevel.Beginner, "Nein, leider nicht.", "No, unfortunately not."],
  ["vielleicht", "maybe", "", "Adverb", "Basics", DifficultyLevel.Beginner, "Vielleicht später.", "Maybe later."],
  ["wer", "who", "", "Pronoun", "Basics", DifficultyLevel.Beginner, "Wer ist das?", "Who is that?"],
  ["was", "what", "", "Pronoun", "Basics", DifficultyLevel.Beginner, "Was machst du?", "What are you doing?"],
  ["wann", "when", "", "Pronoun", "Basics", DifficultyLevel.Beginner, "Wann kommst du?", "When are you coming?"],
  ["wo", "where", "", "Pronoun", "Basics", DifficultyLevel.Beginner, "Wo wohnst du?", "Where do you live?"],
  ["warum", "why", "", "Pronoun", "Basics", DifficultyLevel.Beginner, "Warum lachst du?", "Why are you laughing?"],
  ["wie", "how", "", "Pronoun", "Basics", DifficultyLevel.Beginner, "Wie heißt du?", "What is your name?"],

  // === A1: FAMILY ===
  ["die Familie", "the family", "die", "Noun", "Family", DifficultyLevel.Beginner, "Meine Familie ist groß.", "My family is big."],
  ["der Vater", "the father", "der", "Noun", "Family", DifficultyLevel.Beginner, "Mein Vater arbeitet viel.", "My father works a lot."],
  ["die Mutter", "the mother", "die", "Noun", "Family", DifficultyLevel.Beginner, "Meine Mutter kocht gut.", "My mother cooks well."],
  ["das Kind", "the child", "das", "Noun", "Family", DifficultyLevel.Beginner, "Das Kind spielt.", "The child is playing."],
  ["der Bruder", "the brother", "der", "Noun", "Family", DifficultyLevel.Beginner, "Ich habe einen Bruder.", "I have a brother."],
  ["die Schwester", "the sister", "die", "Noun", "Family", DifficultyLevel.Beginner, "Meine Schwester ist älter.", "My sister is older."],
  ["der Opa", "the grandpa", "der", "Noun", "Family", DifficultyLevel.Beginner, "Opa liest Zeitung.", "Grandpa reads the newspaper."],
  ["die Oma", "the grandma", "die", "Noun", "Family", DifficultyLevel.Beginner, "Oma backt Kuchen.", "Grandma bakes cake."],

  // === A1: FOOD & DRINK ===
  ["das Essen", "the food", "das", "Noun", "Food", DifficultyLevel.Beginner, "Das Essen ist lecker.", "The food is delicious."],
  ["der Apfel", "the apple", "der", "Noun", "Food", DifficultyLevel.Beginner, "Der Apfel ist rot.", "The apple is red."],
  ["die Banane", "the banana", "die", "Noun", "Food", DifficultyLevel.Beginner, "Die Banane ist gelb.", "The banana is yellow."],
  ["das Brot", "the bread", "das", "Noun", "Food", DifficultyLevel.Beginner, "Ich kaufe Brot.", "I buy bread."],
  ["das Wasser", "the water", "das", "Noun", "Food", DifficultyLevel.Beginner, "Ich trinke Wasser.", "I drink water."],
  ["der Kaffee", "the coffee", "der", "Noun", "Food", DifficultyLevel.Beginner, "Kaffee macht wach.", "Coffee wakes you up."],
  ["das Bier", "the beer", "das", "Noun", "Food", DifficultyLevel.Beginner, "Ein Bier, bitte.", "A beer, please."],
  ["der Wein", "the wine", "der", "Noun", "Food", DifficultyLevel.Beginner, "Der Wein ist rot.", "The wine is red."],
  ["das Fleisch", "the meat", "das", "Noun", "Food", DifficultyLevel.Beginner, "Ich esse kein Fleisch.", "I don't eat meat."],
  ["das Gemüse", "the vegetables", "das", "Noun", "Food", DifficultyLevel.Beginner, "Gemüse ist gesund.", "Vegetables are healthy."],
  ["das Obst", "the fruit", "das", "Noun", "Food", DifficultyLevel.Beginner, "Obst schmeckt süß.", "Fruit tastes sweet."],
  ["die Kartoffel", "the potato", "die", "Noun", "Food", DifficultyLevel.Beginner, "Kartoffeln sind typisch deutsch.", "Potatoes are typically German."],
  ["die Wurst", "the sausage", "die", "Noun", "Food", DifficultyLevel.Beginner, "Die Wurst ist heiß.", "The sausage is hot."],
  ["frühstücken", "to eat breakfast", "", "Verb", "Food", DifficultyLevel.Beginner, "Wir frühstücken um 8.", "We eat breakfast at 8."],

  // === A1: HOUSEHOLD ===
  ["das Haus", "the house", "das", "Noun", "Home", DifficultyLevel.Beginner, "Das Haus hat ein Dach.", "The house has a roof."],
  ["die Wohnung", "the apartment", "die", "Noun", "Home", DifficultyLevel.Beginner, "Die Wohnung ist teuer.", "The apartment is expensive."],
  ["das Zimmer", "the room", "das", "Noun", "Home", DifficultyLevel.Beginner, "Mein Zimmer ist sauber.", "My room is clean."],
  ["die Küche", "the kitchen", "die", "Noun", "Home", DifficultyLevel.Beginner, "Die Küche ist neu.", "The kitchen is new."],
  ["das Bad", "the bathroom", "das", "Noun", "Home", DifficultyLevel.Beginner, "Wo ist das Bad?", "Where is the bathroom?"],
  ["der Tisch", "the table", "der", "Noun", "Home", DifficultyLevel.Beginner, "Der Tisch ist gedeckt.", "The table is set."],
  ["der Stuhl", "the chair", "der", "Noun", "Home", DifficultyLevel.Beginner, "Der Stuhl ist bequem.", "The chair is comfortable."],
  ["das Bett", "the bed", "das", "Noun", "Home", DifficultyLevel.Beginner, "Das Bett ist weich.", "The bed is soft."],
  ["der Schlüssel", "the key", "der", "Noun", "Home", DifficultyLevel.Beginner, "Hast du den Schlüssel?", "Do you have the key?"],
  
  // === A1/A2: COLORS ===
  ["rot", "red", "", "Adjective", "Colors", DifficultyLevel.Beginner, "Die Rose ist rot.", "The rose is red."],
  ["blau", "blue", "", "Adjective", "Colors", DifficultyLevel.Beginner, "Der Himmel ist blau.", "The sky is blue."],
  ["grün", "green", "", "Adjective", "Colors", DifficultyLevel.Beginner, "Das Gras ist grün.", "The grass is green."],
  ["gelb", "yellow", "", "Adjective", "Colors", DifficultyLevel.Beginner, "Die Sonne ist gelb.", "The sun is yellow."],
  ["schwarz", "black", "", "Adjective", "Colors", DifficultyLevel.Beginner, "Die Nacht ist schwarz.", "The night is black."],
  ["weiß", "white", "", "Adjective", "Colors", DifficultyLevel.Beginner, "Der Schnee ist weiß.", "The snow is white."],
  ["bunt", "colorful", "", "Adjective", "Colors", DifficultyLevel.Beginner, "Das Bild ist bunt.", "The picture is colorful."],

  // === A2: CITY & TRAVEL ===
  ["die Stadt", "the city", "die", "Noun", "Travel", DifficultyLevel.Beginner, "Die Stadt ist laut.", "The city is loud."],
  ["das Dorf", "the village", "das", "Noun", "Travel", DifficultyLevel.Beginner, "Das Dorf ist ruhig.", "The village is quiet."],
  ["der Zug", "the train", "der", "Noun", "Travel", DifficultyLevel.Beginner, "Der Zug hat Verspätung.", "The train is delayed."],
  ["der Bahnhof", "the station", "der", "Noun", "Travel", DifficultyLevel.Beginner, "Treffen wir uns am Bahnhof.", "Let's meet at the station."],
  ["das Flugzeug", "the airplane", "das", "Noun", "Travel", DifficultyLevel.Beginner, "Das Flugzeug fliegt hoch.", "The plane flies high."],
  ["der Flughafen", "the airport", "der", "Noun", "Travel", DifficultyLevel.Beginner, "Der Flughafen ist riesig.", "The airport is huge."],
  ["das Ticket", "the ticket", "das", "Noun", "Travel", DifficultyLevel.Beginner, "Das Ticket kostet 9 Euro.", "The ticket costs 9 Euro."],
  ["das Hotel", "the hotel", "das", "Noun", "Travel", DifficultyLevel.Beginner, "Das Hotel hat 5 Sterne.", "The hotel has 5 stars."],
  ["die Straße", "the street", "die", "Noun", "Travel", DifficultyLevel.Beginner, "Die Straße ist nass.", "The street is wet."],
  ["die Ampel", "the traffic light", "die", "Noun", "Travel", DifficultyLevel.Beginner, "Die Ampel ist rot.", "The traffic light is red."],
  ["links", "left", "", "Adverb", "Travel", DifficultyLevel.Beginner, "Biegen Sie links ab.", "Turn left."],
  ["rechts", "right", "", "Adverb", "Travel", DifficultyLevel.Beginner, "Rechts ist die Post.", "On the right is the post office."],
  ["geradeaus", "straight ahead", "", "Adverb", "Travel", DifficultyLevel.Beginner, "Gehen Sie geradeaus.", "Go straight ahead."],

  // === A2: CLOTHING ===
  ["die Kleidung", "the clothing", "die", "Noun", "Clothing", DifficultyLevel.Beginner, "Ich brauche neue Kleidung.", "I need new clothes."],
  ["die Hose", "the trousers/pants", "die", "Noun", "Clothing", DifficultyLevel.Beginner, "Die Hose passt mir nicht.", "The trousers don't fit me."],
  ["das Hemd", "the shirt", "das", "Noun", "Clothing", DifficultyLevel.Beginner, "Das Hemd ist gebügelt.", "The shirt is ironed."],
  ["der Schuh", "the shoe", "der", "Noun", "Clothing", DifficultyLevel.Beginner, "Ich suche meinen Schuh.", "I am looking for my shoe."],
  ["die Jacke", "the jacket", "die", "Noun", "Clothing", DifficultyLevel.Beginner, "Zieh deine Jacke an.", "Put on your jacket."],
  ["der Mantel", "the coat", "der", "Noun", "Clothing", DifficultyLevel.Beginner, "Im Winter trage ich einen Mantel.", "In winter I wear a coat."],
  ["tragen", "to wear/carry", "", "Verb", "Clothing", DifficultyLevel.Beginner, "Was trägst du heute?", "What are you wearing today?"],

  // === A2: TIME ===
  ["die Zeit", "the time", "die", "Noun", "Time", DifficultyLevel.Beginner, "Ich habe keine Zeit.", "I have no time."],
  ["die Uhr", "the clock/watch", "die", "Noun", "Time", DifficultyLevel.Beginner, "Meine Uhr ist kaputt.", "My watch is broken."],
  ["der Tag", "the day", "der", "Noun", "Time", DifficultyLevel.Beginner, "Der Tag war schön.", "The day was nice."],
  ["die Nacht", "the night", "die", "Noun", "Time", DifficultyLevel.Beginner, "Gute Nacht!", "Good night!"],
  ["die Woche", "the week", "die", "Noun", "Time", DifficultyLevel.Beginner, "Nächste Woche habe ich Urlaub.", "Next week I have vacation."],
  ["das Jahr", "the year", "das", "Noun", "Time", DifficultyLevel.Beginner, "Frohes neues Jahr!", "Happy New Year!"],
  ["heute", "today", "", "Adverb", "Time", DifficultyLevel.Beginner, "Heute ist Montag.", "Today is Monday."],
  ["morgen", "tomorrow", "", "Adverb", "Time", DifficultyLevel.Beginner, "Bis morgen!", "See you tomorrow!"],
  ["gestern", "yesterday", "", "Adverb", "Time", DifficultyLevel.Beginner, "Gestern war Sonntag.", "Yesterday was Sunday."],
  ["jetzt", "now", "", "Adverb", "Time", DifficultyLevel.Beginner, "Ich muss jetzt gehen.", "I must go now."],
  ["später", "later", "", "Adverb", "Time", DifficultyLevel.Beginner, "Bis später!", "See you later!"],

  // === B1: WORK & OFFICE ===
  ["die Arbeit", "the work", "die", "Noun", "Work", DifficultyLevel.Intermediate, "Die Arbeit macht Spaß.", "The work is fun."],
  ["der Chef", "the boss", "der", "Noun", "Work", DifficultyLevel.Intermediate, "Der Chef ist im Meeting.", "The boss is in a meeting."],
  ["das Büro", "the office", "das", "Noun", "Work", DifficultyLevel.Intermediate, "Unser Büro ist hell.", "Our office is bright."],
  ["der Computer", "the computer", "der", "Noun", "Work", DifficultyLevel.Intermediate, "Der Computer stürzt ab.", "The computer is crashing."],
  ["die E-Mail", "the email", "die", "Noun", "Work", DifficultyLevel.Intermediate, "Ich schreibe eine E-Mail.", "I am writing an email."],
  ["der Termin", "the appointment", "der", "Noun", "Work", DifficultyLevel.Intermediate, "Wir haben einen Termin.", "We have an appointment."],
  ["bewerben", "to apply", "", "Verb", "Work", DifficultyLevel.Intermediate, "Ich bewerbe mich um den Job.", "I am applying for the job."],
  ["der Vertrag", "the contract", "der", "Noun", "Work", DifficultyLevel.Intermediate, "Bitte unterschreiben Sie den Vertrag.", "Please sign the contract."],
  ["kündigen", "to resign/fire", "", "Verb", "Work", DifficultyLevel.Intermediate, "Er hat gestern gekündigt.", "He resigned yesterday."],
  ["der Erfolg", "the success", "der", "Noun", "Work", DifficultyLevel.Intermediate, "Viel Erfolg!", "Good luck / Much success!"],

  // === B1: NATURE & ENVIRONMENT ===
  ["die Natur", "the nature", "die", "Noun", "Nature", DifficultyLevel.Intermediate, "Wir lieben die Natur.", "We love nature."],
  ["der Wald", "the forest", "der", "Noun", "Nature", DifficultyLevel.Intermediate, "Der Wald ist dunkel.", "The forest is dark."],
  ["der Baum", "the tree", "der", "Noun", "Nature", DifficultyLevel.Intermediate, "Der Baum ist alt.", "The tree is old."],
  ["die Blume", "the flower", "die", "Noun", "Nature", DifficultyLevel.Intermediate, "Die Blume riecht gut.", "The flower smells good."],
  ["das Wetter", "the weather", "das", "Noun", "Nature", DifficultyLevel.Intermediate, "Das Wetter ist schlecht.", "The weather is bad."],
  ["der Regen", "the rain", "der", "Noun", "Nature", DifficultyLevel.Intermediate, "Der Regen fällt.", "The rain is falling."],
  ["die Sonne", "the sun", "die", "Noun", "Nature", DifficultyLevel.Intermediate, "Die Sonne scheint.", "The sun is shining."],
  ["der Schnee", "the snow", "der", "Noun", "Nature", DifficultyLevel.Intermediate, "Der Schnee ist kalt.", "The snow is cold."],
  ["die Umwelt", "the environment", "die", "Noun", "Nature", DifficultyLevel.Intermediate, "Umweltschutz ist wichtig.", "Environmental protection is important."],
  ["schützen", "to protect", "", "Verb", "Nature", DifficultyLevel.Intermediate, "Wir müssen die Erde schützen.", "We must protect the earth."],

  // === B1: FEELINGS & CHARACTER ===
  ["das Gefühl", "the feeling", "das", "Noun", "Feelings", DifficultyLevel.Intermediate, "Ich habe ein gutes Gefühl.", "I have a good feeling."],
  ["glücklich", "happy", "", "Adjective", "Feelings", DifficultyLevel.Intermediate, "Sie ist sehr glücklich.", "She is very happy."],
  ["traurig", "sad", "", "Adjective", "Feelings", DifficultyLevel.Intermediate, "Warum bist du traurig?", "Why are you sad?"],
  ["wütend", "angry", "", "Adjective", "Feelings", DifficultyLevel.Intermediate, "Er ist wütend auf mich.", "He is angry at me."],
  ["müde", "tired", "", "Adjective", "Feelings", DifficultyLevel.Intermediate, "Ich bin hundemüde.", "I am dog-tired."],
  ["die Angst", "the fear", "die", "Noun", "Feelings", DifficultyLevel.Intermediate, "Keine Angst!", "No fear!"],
  ["die Liebe", "the love", "die", "Noun", "Feelings", DifficultyLevel.Intermediate, "Liebe ist alles.", "Love is everything."],
  ["lachen", "to laugh", "", "Verb", "Feelings", DifficultyLevel.Intermediate, "Wir lachen viel.", "We laugh a lot."],
  ["weinen", "to cry", "", "Verb", "Feelings", DifficultyLevel.Intermediate, "Das Baby weint.", "The baby is crying."],
  ["ernst", "serious", "", "Adjective", "Feelings", DifficultyLevel.Intermediate, "Ist das dein Ernst?", "Are you serious?"],

  // === B2/C1: POLITICS & SOCIETY ===
  ["die Gesellschaft", "the society", "die", "Noun", "Society", DifficultyLevel.Advanced, "Die Gesellschaft ändert sich.", "Society is changing."],
  ["die Regierung", "the government", "die", "Noun", "Society", DifficultyLevel.Advanced, "Die Regierung beschließt neue Gesetze.", "The government decides on new laws."],
  ["die Wahl", "the election/choice", "die", "Noun", "Society", DifficultyLevel.Advanced, "Die Wahl ist morgen.", "The election is tomorrow."],
  ["das Gesetz", "the law", "das", "Noun", "Society", DifficultyLevel.Advanced, "Niemand steht über dem Gesetz.", "No one is above the law."],
  ["die Wirtschaft", "the economy", "die", "Noun", "Society", DifficultyLevel.Advanced, "Die Wirtschaft wächst.", "The economy is growing."],
  ["die Demokratie", "the democracy", "die", "Noun", "Society", DifficultyLevel.Advanced, "Demokratie braucht Beteiligung.", "Democracy needs participation."],
  ["die Freiheit", "the freedom", "die", "Noun", "Society", DifficultyLevel.Advanced, "Freiheit ist kostbar.", "Freedom is precious."],
  ["öffentlich", "public", "", "Adjective", "Society", DifficultyLevel.Advanced, "Das ist ein öffentlicher Platz.", "This is a public place."],
  ["abhängen", "to depend", "", "Verb", "Society", DifficultyLevel.Advanced, "Das hängt von der Situation ab.", "That depends on the situation."],
  ["verantwortlich", "responsible", "", "Adjective", "Society", DifficultyLevel.Advanced, "Wer ist dafür verantwortlich?", "Who is responsible for that?"],

  // === B2/C1: ABSTRACT & SCIENCE ===
  ["die Entwicklung", "the development", "die", "Noun", "Science", DifficultyLevel.Advanced, "Die technische Entwicklung ist schnell.", "Technical development is fast."],
  ["die Forschung", "the research", "die", "Noun", "Science", DifficultyLevel.Advanced, "Forschung kostet Geld.", "Research costs money."],
  ["die Ursache", "the cause", "die", "Noun", "Science", DifficultyLevel.Advanced, "Die Ursache ist unbekannt.", "The cause is unknown."],
  ["die Wirkung", "the effect", "die", "Noun", "Science", DifficultyLevel.Advanced, "Jede Ursache hat eine Wirkung.", "Every cause has an effect."],
  ["der Zusammenhang", "the context/connection", "der", "Noun", "Science", DifficultyLevel.Advanced, "In diesem Zusammenhang macht das Sinn.", "In this context, it makes sense."],
  ["die Theorie", "the theory", "die", "Noun", "Science", DifficultyLevel.Advanced, "Das ist nur eine Theorie.", "That is only a theory."],
  ["beweisen", "to prove", "", "Verb", "Science", DifficultyLevel.Advanced, "Kannst du das beweisen?", "Can you prove that?"],
  ["kompliziert", "complicated", "", "Adjective", "Science", DifficultyLevel.Advanced, "Es ist komplizierter als du denkst.", "It is more complicated than you think."],
  
  // === CONJUNCTIONS & CONNECTORS (Essential for all levels) ===
  ["und", "and", "", "Conjunction", "Grammar", DifficultyLevel.Beginner, "Du und ich.", "You and me."],
  ["aber", "but", "", "Conjunction", "Grammar", DifficultyLevel.Beginner, "Klein aber fein.", "Small but nice."],
  ["oder", "or", "", "Conjunction", "Grammar", DifficultyLevel.Beginner, "Kaffee oder Tee?", "Coffee or tea?"],
  ["weil", "because", "", "Conjunction", "Grammar", DifficultyLevel.Intermediate, "Ich esse, weil ich Hunger habe.", "I eat because I am hungry."],
  ["dass", "that", "", "Conjunction", "Grammar", DifficultyLevel.Intermediate, "Ich weiß, dass du recht hast.", "I know that you are right."],
  ["wenn", "if/when", "", "Conjunction", "Grammar", DifficultyLevel.Intermediate, "Wenn es regnet, bleiben wir zuhause.", "If it rains, we stay home."],
  ["obwohl", "although", "", "Conjunction", "Grammar", DifficultyLevel.Intermediate, "Obwohl er müde ist, arbeitet er.", "Although he is tired, he works."],
  ["damit", "so that", "", "Conjunction", "Grammar", DifficultyLevel.Advanced, "Lerne, damit du klug wirst.", "Learn so that you become smart."],
  ["trotzdem", "nevertheless", "", "Adverb", "Grammar", DifficultyLevel.Intermediate, "Es regnet, trotzdem gehe ich.", "It's raining, nevertheless I'm going."],
  
  // === ADJECTIVES (Opposites) ===
  ["groß", "big/tall", "", "Adjective", "Adjectives", DifficultyLevel.Beginner, "Das Haus ist groß.", "The house is big."],
  ["klein", "small", "", "Adjective", "Adjectives", DifficultyLevel.Beginner, "Die Maus ist klein.", "The mouse is small."],
  ["schnell", "fast", "", "Adjective", "Adjectives", DifficultyLevel.Beginner, "Der Wagen ist schnell.", "The car is fast."],
  ["langsam", "slow", "", "Adjective", "Adjectives", DifficultyLevel.Beginner, "Schnecken sind langsam.", "Snails are slow."],
  ["teuer", "expensive", "", "Adjective", "Adjectives", DifficultyLevel.Beginner, "Das Auto ist teuer.", "The car is expensive."],
  ["billig", "cheap", "", "Adjective", "Adjectives", DifficultyLevel.Beginner, "Ist das billig?", "Is that cheap?"],
  ["schwer", "heavy/difficult", "", "Adjective", "Adjectives", DifficultyLevel.Beginner, "Die Tasche ist schwer.", "The bag is heavy."],
  ["leicht", "light/easy", "", "Adjective", "Adjectives", DifficultyLevel.Beginner, "Die Aufgabe war leicht.", "The task was easy."],
  ["alt", "old", "", "Adjective", "Adjectives", DifficultyLevel.Beginner, "Mein Opa ist alt.", "My grandpa is old."],
  ["neu", "new", "", "Adjective", "Adjectives", DifficultyLevel.Beginner, "Ich habe ein neues Handy.", "I have a new phone."],
  ["jung", "young", "", "Adjective", "Adjectives", DifficultyLevel.Beginner, "Sie ist noch jung.", "She is still young."],
  ["schön", "beautiful", "", "Adjective", "Adjectives", DifficultyLevel.Beginner, "Das Leben ist schön.", "Life is beautiful."],
  ["hässlich", "ugly", "", "Adjective", "Adjectives", DifficultyLevel.Beginner, "Das Gebäude ist hässlich.", "The building is ugly."],
  
  // === SLANG & COMMON PHRASES (Real German) ===
  ["krass", "crazy/intense", "", "Adjective", "Slang", DifficultyLevel.Intermediate, "Das war echt krass!", "That was really intense!"],
  ["geil", "cool/awesome", "", "Adjective", "Slang", DifficultyLevel.Intermediate, "Das Konzert war geil.", "The concert was awesome."],
  ["Quatsch", "nonsense", "der", "Noun", "Slang", DifficultyLevel.Intermediate, "Das ist doch Quatsch.", "That is just nonsense."],
  ["egal", "doesn't matter", "", "Adjective", "Slang", DifficultyLevel.Beginner, "Das ist mir egal.", "I don't care / It doesn't matter to me."],
  ["Bock haben", "to be up for something", "", "Phrase", "Slang", DifficultyLevel.Intermediate, "Ich habe keinen Bock.", "I can't be bothered."],
  ["Na?", "Well? / How goes it?", "", "Phrase", "Slang", DifficultyLevel.Beginner, "Na, alles klar?", "Well, everything good?"],
  ["Mahlzeit", "Enjoy your meal (greeting at lunch)", "", "Phrase", "Slang", DifficultyLevel.Beginner, "Mahlzeit!", "Mealtime! (Greeting)"],
  ["Feierabend", "end of work day", "der", "Noun", "Slang", DifficultyLevel.Beginner, "Endlich Feierabend!", "Finally done with work!"]
];

// Helper to expand compact data into full objects
export const LOCAL_VOCAB: LocalVocabEntry[] = RAW_VOCAB_DATA.map(item => ({
  german: item[0],
  english: item[1],
  gender: item[2],
  type: item[3],
  category: item[4],
  level: item[5],
  exampleGerman: item[6],
  exampleEnglish: item[7]
}));

// ---------------------------------------------------------------------------
// 2. VERB CONJUGATION DRILLS
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