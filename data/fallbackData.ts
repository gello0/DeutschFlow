import { VocabWord, VerbDrill, DifficultyLevel, SentencePuzzle } from "../types";

// Extended interface for local DB
interface LocalVocabEntry extends VocabWord {
  level: DifficultyLevel;
  category: string;
}

// ---------------------------------------------------------------------------
// 1. COMPACT DATA STORE (CSV Style)
// Format: German|English|Gender|Type|Category|Level
// Gender keys: m=der, f=die, n=das, -=none
// Level keys: 1=A1, 2=A2, 3=B1, 4=B2, 5=C1
// ---------------------------------------------------------------------------

const RAW_CSV_DATA = `
# BASICS
hallo|hello|-|Greeting|Basics|1
tschüss|bye|-|Greeting|Basics|1
bitte|please|-|Phrase|Basics|1
danke|thanks|-|Phrase|Basics|1
ja|yes|-|Adverb|Basics|1
nein|no|-|Adverb|Basics|1
vielleicht|maybe|-|Adverb|Basics|1
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
alles|everything|-|Pronoun|Basics|1
nichts|nothing|-|Pronoun|Basics|1
etwas|something|-|Pronoun|Basics|1
viel|much|-|Adjective|Basics|1
wenig|little|-|Adjective|Basics|1

# FAMILY
Familie|family|f|Noun|Family|1
Vater|father|m|Noun|Family|1
Mutter|mother|f|Noun|Family|1
Eltern|parents|f|Noun|Family|1
Kind|child|n|Noun|Family|1
Sohn|son|m|Noun|Family|1
Tochter|daughter|f|Noun|Family|1
Bruder|brother|m|Noun|Family|1
Schwester|sister|f|Noun|Family|1
Geschwister|siblings|f|Noun|Family|1
Opa|grandpa|m|Noun|Family|1
Oma|grandma|f|Noun|Family|1
Großeltern|grandparents|f|Noun|Family|1
Enkel|grandson|m|Noun|Family|1
Enkelin|granddaughter|f|Noun|Family|1
Onkel|uncle|m|Noun|Family|1
Tante|aunt|f|Noun|Family|1
Cousin|cousin (m)|m|Noun|Family|1
Cousine|cousin (f)|f|Noun|Family|1
Neffe|nephew|m|Noun|Family|2
Nichte|niece|f|Noun|Family|2
Mann|man/husband|m|Noun|Family|1
Frau|woman/wife|f|Noun|Family|1
Baby|baby|n|Noun|Family|1
Zwillinge|twins|f|Noun|Family|2

# BODY
Körper|body|m|Noun|Body|1
Kopf|head|m|Noun|Body|1
Haar|hair|n|Noun|Body|1
Gesicht|face|n|Noun|Body|1
Auge|eye|n|Noun|Body|1
Ohr|ear|n|Noun|Body|1
Nase|nose|f|Noun|Body|1
Mund|mouth|m|Noun|Body|1
Zahn|tooth|m|Noun|Body|1
Lippe|lip|f|Noun|Body|1
Zunge|tongue|f|Noun|Body|1
Hals|neck/throat|m|Noun|Body|1
Schulter|shoulder|f|Noun|Body|1
Rücken|back|m|Noun|Body|1
Brust|chest/breast|f|Noun|Body|1
Arm|arm|m|Noun|Body|1
Ellbogen|elbow|m|Noun|Body|1
Hand|hand|f|Noun|Body|1
Finger|finger|m|Noun|Body|1
Daumen|thumb|m|Noun|Body|1
Bauch|stomach|m|Noun|Body|1
Bein|leg|n|Noun|Body|1
Knie|knee|n|Noun|Body|1
Fuß|foot|m|Noun|Body|1
Zeh|toe|m|Noun|Body|1
Herz|heart|n|Noun|Body|1
Gehirn|brain|n|Noun|Body|2
Blut|blood|n|Noun|Body|2
Knochen|bone|m|Noun|Body|2
Muskel|muscle|m|Noun|Body|2
Haut|skin|f|Noun|Body|2

# ANIMALS
Tier|animal|n|Noun|Animals|1
Hund|dog|m|Noun|Animals|1
Katze|cat|f|Noun|Animals|1
Maus|mouse|f|Noun|Animals|1
Vogel|bird|m|Noun|Animals|1
Fisch|fish|m|Noun|Animals|1
Kuh|cow|f|Noun|Animals|1
Schwein|pig|n|Noun|Animals|1
Pferd|horse|n|Noun|Animals|1
Schaf|sheep|n|Noun|Animals|1
Ziege|goat|f|Noun|Animals|1
Huhn|chicken|n|Noun|Animals|1
Ente|duck|f|Noun|Animals|1
Gans|goose|f|Noun|Animals|1
Hase|rabbit|m|Noun|Animals|1
Bär|bear|m|Noun|Animals|1
Wolf|wolf|m|Noun|Animals|1
Fuchs|fox|m|Noun|Animals|1
Löwe|lion|m|Noun|Animals|1
Tiger|tiger|m|Noun|Animals|1
Elefant|elephant|m|Noun|Animals|1
Affe|monkey|m|Noun|Animals|1
Schlange|snake|f|Noun|Animals|1
Spinne|spider|f|Noun|Animals|1
Insekt|insect|n|Noun|Animals|1
Biene|bee|f|Noun|Animals|1
Schmetterling|butterfly|m|Noun|Animals|1
Fliege|fly|f|Noun|Animals|1
Mücke|mosquito|f|Noun|Animals|1
Hai|shark|m|Noun|Animals|1
Wal|whale|m|Noun|Animals|1
Dolphin|dolphin|m|Noun|Animals|1
Schildkröte|turtle|f|Noun|Animals|1
Eule|owl|f|Noun|Animals|1
Adler|eagle|m|Noun|Animals|2

# HOUSE & HOME
Haus|house|n|Noun|Home|1
Wohnung|apartment|f|Noun|Home|1
Zimmer|room|n|Noun|Home|1
Wohnzimmer|living room|n|Noun|Home|1
Schlafzimmer|bedroom|n|Noun|Home|1
Küche|kitchen|f|Noun|Home|1
Badezimmer|bathroom|n|Noun|Home|1
Flur|hallway|m|Noun|Home|1
Keller|basement|m|Noun|Home|1
Dach|roof|n|Noun|Home|1
Wand|wall|f|Noun|Home|1
Boden|floor|m|Noun|Home|1
Decke|ceiling/blanket|f|Noun|Home|1
Fenster|window|n|Noun|Home|1
Tür|door|f|Noun|Home|1
Treppe|stairs|f|Noun|Home|1
Garten|garden|m|Noun|Home|1
Balkon|balcony|m|Noun|Home|1
Garage|garage|f|Noun|Home|1
Schlüssel|key|m|Noun|Home|1
Möbel|furniture|f|Noun|Home|1
Tisch|table|m|Noun|Home|1
Stuhl|chair|m|Noun|Home|1
Sofa|sofa|n|Noun|Home|1
Sessel|armchair|m|Noun|Home|1
Bett|bed|n|Noun|Home|1
Schrank|cabinet/closet|m|Noun|Home|1
Regal|shelf|n|Noun|Home|1
Lampe|lamp|f|Noun|Home|1
Teppich|carpet|m|Noun|Home|1
Spiegel|mirror|m|Noun|Home|1
Bild|picture|n|Noun|Home|1
Vorhang|curtain|m|Noun|Home|2
Kissen|pillow|n|Noun|Home|2

# KITCHEN
Gabel|fork|f|Noun|Kitchen|1
Messer|knife|n|Noun|Kitchen|1
Löffel|spoon|m|Noun|Kitchen|1
Teller|plate|m|Noun|Kitchen|1
Tasse|cup|f|Noun|Kitchen|1
Glas|glass|n|Noun|Kitchen|1
Schüssel|bowl|f|Noun|Kitchen|1
Flasche|bottle|f|Noun|Kitchen|1
Dose|can|f|Noun|Kitchen|1
Topf|pot|m|Noun|Kitchen|1
Pfanne|pan|f|Noun|Kitchen|1
Herd|stove|m|Noun|Kitchen|1
Ofen|oven|m|Noun|Kitchen|1
Kühlschrank|fridge|m|Noun|Kitchen|1
Mikrowelle|microwave|f|Noun|Kitchen|1
Spülmaschine|dishwasher|f|Noun|Kitchen|2
Mülleimer|trash can|m|Noun|Kitchen|2
Serviette|napkin|f|Noun|Kitchen|2

# FOOD
Essen|food|n|Noun|Food|1
Frühstück|breakfast|n|Noun|Food|1
Mittagessen|lunch|n|Noun|Food|1
Abendessen|dinner|n|Noun|Food|1
Brot|bread|n|Noun|Food|1
Brötchen|roll|n|Noun|Food|1
Butter|butter|f|Noun|Food|1
Käse|cheese|m|Noun|Food|1
Wurst|sausage|f|Noun|Food|1
Ei|egg|n|Noun|Food|1
Joghurt|yogurt|m|Noun|Food|1
Marmelade|jam|f|Noun|Food|1
Honig|honey|m|Noun|Food|1
Müsli|cereal|n|Noun|Food|1
Fleisch|meat|n|Noun|Food|1
Fisch|fish|m|Noun|Food|1
Hähnchen|chicken|n|Noun|Food|1
Rindfleisch|beef|n|Noun|Food|1
Schweinefleisch|pork|n|Noun|Food|1
Reis|rice|m|Noun|Food|1
Nudel|noodle|f|Noun|Food|1
Kartoffel|potato|f|Noun|Food|1
Pommes|fries|f|Noun|Food|1
Salat|salad|m|Noun|Food|1
Suppe|soup|f|Noun|Food|1
Gemüse|vegetables|n|Noun|Food|1
Tomate|tomato|f|Noun|Food|1
Gurke|cucumber|f|Noun|Food|1
Paprika|pepper|f|Noun|Food|1
Karotte|carrot|f|Noun|Food|1
Zwiebel|onion|f|Noun|Food|1
Knoblauch|garlic|m|Noun|Food|1
Obst|fruit|n|Noun|Food|1
Apfel|apple|m|Noun|Food|1
Banane|banana|f|Noun|Food|1
Orange|orange|f|Noun|Food|1
Zitrone|lemon|f|Noun|Food|1
Erdbeere|strawberry|f|Noun|Food|1
Traube|grape|f|Noun|Food|1
Kirsche|cherry|f|Noun|Food|1
Wasser|water|n|Noun|Food|1
Saft|juice|m|Noun|Food|1
Milch|milk|f|Noun|Food|1
Kaffee|coffee|m|Noun|Food|1
Tee|tea|m|Noun|Food|1
Bier|beer|n|Noun|Food|1
Wein|wine|m|Noun|Food|1
Zucker|sugar|m|Noun|Food|1
Salz|salt|n|Noun|Food|1
Pfeffer|pepper|m|Noun|Food|1
Öl|oil|n|Noun|Food|1
Essig|vinegar|m|Noun|Food|1
Kuchen|cake|m|Noun|Food|1
Eis|ice cream|n|Noun|Food|1
Schokolade|chocolate|f|Noun|Food|1

# CLOTHING
Kleidung|clothing|f|Noun|Clothing|1
T-Shirt|T-shirt|n|Noun|Clothing|1
Hemd|shirt|n|Noun|Clothing|1
Bluse|blouse|f|Noun|Clothing|1
Pullover|sweater|m|Noun|Clothing|1
Jacke|jacket|f|Noun|Clothing|1
Mantel|coat|m|Noun|Clothing|1
Hose|trousers|f|Noun|Clothing|1
Jeans|jeans|f|Noun|Clothing|1
Rock|skirt|m|Noun|Clothing|1
Kleid|dress|n|Noun|Clothing|1
Anzug|suit|m|Noun|Clothing|2
Schuh|shoe|m|Noun|Clothing|1
Stiefel|boot|m|Noun|Clothing|1
Socke|sock|f|Noun|Clothing|1
Unterwäsche|underwear|f|Noun|Clothing|2
Hut|hat|m|Noun|Clothing|1
Mütze|cap/beanie|f|Noun|Clothing|1
Schal|scarf|m|Noun|Clothing|1
Handschuh|glove|m|Noun|Clothing|1
Brille|glasses|f|Noun|Clothing|1
Sonnenbrille|sunglasses|f|Noun|Clothing|1
Uhr|watch|f|Noun|Clothing|1
Schmuck|jewelry|m|Noun|Clothing|2
Tasche|bag|f|Noun|Clothing|1
Rucksack|backpack|m|Noun|Clothing|1
Geldbeutel|wallet|m|Noun|Clothing|1
Regenschirm|umbrella|m|Noun|Clothing|1

# CITY & PLACES
Stadt|city|f|Noun|City|1
Dorf|village|n|Noun|City|1
Zentrum|center|n|Noun|City|1
Platz|square|m|Noun|City|1
Markt|market|m|Noun|City|1
Straße|street|f|Noun|City|1
Weg|path/way|m|Noun|City|1
Brücke|bridge|f|Noun|City|1
Gebäude|building|n|Noun|City|1
Haus|house|n|Noun|City|1
Turm|tower|m|Noun|City|1
Schloss|castle|n|Noun|City|1
Kirche|church|f|Noun|City|1
Dom|cathedral|m|Noun|City|2
Schule|school|f|Noun|City|1
Universität|university|f|Noun|City|1
Bibliothek|library|f|Noun|City|2
Museum|museum|n|Noun|City|1
Theater|theater|n|Noun|City|1
Kino|cinema|n|Noun|City|1
Restaurant|restaurant|n|Noun|City|1
Café|café|n|Noun|City|1
Bar|bar|f|Noun|City|1
Hotel|hotel|n|Noun|City|1
Bank|bank|f|Noun|City|1
Post|post office|f|Noun|City|1
Polizei|police|f|Noun|City|1
Krankenhaus|hospital|n|Noun|City|1
Apotheke|pharmacy|f|Noun|City|1
Laden|shop|m|Noun|City|1
Geschäft|shop/business|n|Noun|City|1
Supermarkt|supermarket|m|Noun|City|1
Bäckerei|bakery|f|Noun|City|1
Metzgerei|butcher|f|Noun|City|1
Park|park|m|Noun|City|1
Spielplatz|playground|m|Noun|City|1
Zoo|zoo|m|Noun|City|1
Schwimmbad|swimming pool|n|Noun|City|1
Stadion|stadium|n|Noun|City|1

# TRANSPORT
Verkehr|traffic|m|Noun|Transport|1
Auto|car|n|Noun|Transport|1
Bus|bus|m|Noun|Transport|1
Bahn|train/railway|f|Noun|Transport|1
Zug|train|m|Noun|Transport|1
Straßenbahn|tram|f|Noun|Transport|1
U-Bahn|subway|f|Noun|Transport|1
Taxi|taxi|n|Noun|Transport|1
Fahrrad|bicycle|n|Noun|Transport|1
Motorrad|motorcycle|n|Noun|Transport|1
LKW|truck|m|Noun|Transport|2
Flugzeug|airplane|n|Noun|Transport|1
Schiff|ship|n|Noun|Transport|1
Boot|boat|n|Noun|Transport|1
Bahnhof|train station|m|Noun|Transport|1
Flughafen|airport|m|Noun|Transport|1
Haltestelle|stop|f|Noun|Transport|1
Gleis|track/platform|n|Noun|Transport|2
Ticket|ticket|n|Noun|Transport|1
Fahrkarte|ticket|f|Noun|Transport|1
Ampel|traffic light|f|Noun|Transport|1
Stau|traffic jam|m|Noun|Transport|2
Unfall|accident|m|Noun|Transport|2
Benzin|gasoline|n|Noun|Transport|2

# SCHOOL & WORK
Schule|school|f|Noun|Education|1
Klasse|class|f|Noun|Education|1
Lehrer|teacher|m|Noun|Education|1
Schüler|student (school)|m|Noun|Education|1
Student|student (uni)|m|Noun|Education|1
Unterricht|lesson|m|Noun|Education|1
Pause|break|f|Noun|Education|1
Ferien|vacation|f|Noun|Education|1
Test|test|m|Noun|Education|1
Prüfung|exam|f|Noun|Education|2
Note|grade|f|Noun|Education|2
Buch|book|n|Noun|Education|1
Heft|notebook|n|Noun|Education|1
Stift|pen|m|Noun|Education|1
Bleistift|pencil|m|Noun|Education|1
Papier|paper|n|Noun|Education|1
Tafel|blackboard|f|Noun|Education|1
Arbeit|work|f|Noun|Work|1
Beruf|profession|m|Noun|Work|1
Job|job|m|Noun|Work|1
Büro|office|n|Noun|Work|1
Chef|boss|m|Noun|Work|1
Kollege|colleague|m|Noun|Work|1
Firma|company|f|Noun|Work|1
Termin|appointment|m|Noun|Work|1
Meeting|meeting|n|Noun|Work|1
Computer|computer|m|Noun|Work|1
Laptop|laptop|m|Noun|Work|1
Drucker|printer|m|Noun|Work|2
Telefon|telephone|n|Noun|Work|1
Handy|mobile phone|n|Noun|Work|1
E-Mail|email|f|Noun|Work|1
Internet|internet|n|Noun|Work|1
WLAN|wifi|n|Noun|Work|1
Feierabend|end of work|m|Noun|Work|2
Urlaub|vacation|m|Noun|Work|1

# PROFESSIONS
Arzt|doctor|m|Noun|Professions|1
Krankenschwester|nurse|f|Noun|Professions|1
Polizist|police officer|m|Noun|Professions|1
Feuerwehrmann|firefighter|m|Noun|Professions|1
Lehrer|teacher|m|Noun|Professions|1
Student|student|m|Noun|Professions|1
Ingenieur|engineer|m|Noun|Professions|2
Architekt|architect|m|Noun|Professions|2
Anwalt|lawyer|m|Noun|Professions|2
Richter|judge|m|Noun|Professions|2
Koch|cook|m|Noun|Professions|1
Bäcker|baker|m|Noun|Professions|1
Metzger|butcher|m|Noun|Professions|1
Friseur|hairdresser|m|Noun|Professions|1
Kellner|waiter|m|Noun|Professions|1
Verkäufer|salesperson|m|Noun|Professions|1
Handwerker|craftsman|m|Noun|Professions|2
Mechaniker|mechanic|m|Noun|Professions|2
Gärtner|gardener|m|Noun|Professions|1
Bauer|farmer|m|Noun|Professions|1
Künstler|artist|m|Noun|Professions|1
Musiker|musician|m|Noun|Professions|1
Schauspieler|actor|m|Noun|Professions|1
Sänger|singer|m|Noun|Professions|1
Sportler|athlete|m|Noun|Professions|1
Pilot|pilot|m|Noun|Professions|1
Busfahrer|bus driver|m|Noun|Professions|1
Sekretär|secretary|m|Noun|Professions|1
Journalist|journalist|m|Noun|Professions|2

# NATURE & WEATHER
Natur|nature|f|Noun|Nature|1
Welt|world|f|Noun|Nature|1
Erde|earth|f|Noun|Nature|1
Himmel|sky|m|Noun|Nature|1
Sonne|sun|f|Noun|Nature|1
Mond|moon|m|Noun|Nature|1
Stern|star|m|Noun|Nature|1
Luft|air|f|Noun|Nature|1
Wasser|water|n|Noun|Nature|1
Feuer|fire|n|Noun|Nature|1
Land|land/country|n|Noun|Nature|1
Meer|sea|n|Noun|Nature|1
See|lake|m|Noun|Nature|1
Fluss|river|m|Noun|Nature|1
Berg|mountain|m|Noun|Nature|1
Wald|forest|m|Noun|Nature|1
Baum|tree|m|Noun|Nature|1
Blume|flower|f|Noun|Nature|1
Gras|grass|n|Noun|Nature|1
Wiese|meadow|f|Noun|Nature|2
Stein|stone|m|Noun|Nature|1
Sand|sand|m|Noun|Nature|1
Strand|beach|m|Noun|Nature|1
Insel|island|f|Noun|Nature|1
Wetter|weather|n|Noun|Nature|1
Regen|rain|m|Noun|Nature|1
Schnee|snow|m|Noun|Nature|1
Wind|wind|m|Noun|Nature|1
Wolke|cloud|f|Noun|Nature|1
Sturm|storm|m|Noun|Nature|1
Nebel|fog|m|Noun|Nature|2
Gewitter|thunderstorm|n|Noun|Nature|2
Hitze|heat|f|Noun|Nature|1
Kälte|cold|f|Noun|Nature|1
Grad|degree|m|Noun|Nature|1
Klima|climate|n|Noun|Nature|2
Umwelt|environment|f|Noun|Nature|2

# TIME & CALENDAR
Zeit|time|f|Noun|Time|1
Uhr|clock/watch|f|Noun|Time|1
Stunde|hour|f|Noun|Time|1
Minute|minute|f|Noun|Time|1
Sekunde|second|f|Noun|Time|1
Tag|day|m|Noun|Time|1
Woche|week|f|Noun|Time|1
Monat|month|m|Noun|Time|1
Jahr|year|n|Noun|Time|1
Jahrzehnt|decade|n|Noun|Time|2
Jahrhundert|century|n|Noun|Time|2
Montag|Monday|m|Noun|Time|1
Dienstag|Tuesday|m|Noun|Time|1
Mittwoch|Wednesday|m|Noun|Time|1
Donnerstag|Thursday|m|Noun|Time|1
Freitag|Friday|m|Noun|Time|1
Samstag|Saturday|m|Noun|Time|1
Sonntag|Sunday|m|Noun|Time|1
Wochenende|weekend|n|Noun|Time|1
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
Morgen|morning|m|Noun|Time|1
Vormittag|morning (late)|m|Noun|Time|1
Mittag|noon|m|Noun|Time|1
Nachmittag|afternoon|m|Noun|Time|1
Abend|evening|m|Noun|Time|1
Nacht|night|f|Noun|Time|1
Mitternacht|midnight|f|Noun|Time|1
vorgestern|day before yesterday|-|Adverb|Time|1
übermorgen|day after tomorrow|-|Adverb|Time|1
Datum|date|n|Noun|Time|1
Geburtstag|birthday|m|Noun|Time|1
Feiertag|holiday|m|Noun|Time|1
Weihnachten|Christmas|n|Noun|Time|1
Ostern|Easter|n|Noun|Time|1

# ABSTRACT & SOCIETY
Leben|life|n|Noun|Abstract|1
Tod|death|m|Noun|Abstract|1
Liebe|love|f|Noun|Abstract|1
Hass|hate|m|Noun|Abstract|1
Angst|fear|f|Noun|Abstract|1
Freude|joy|f|Noun|Abstract|1
Glück|luck/happiness|n|Noun|Abstract|1
Trauer|grief|f|Noun|Abstract|2
Wut|anger|f|Noun|Abstract|1
Spaß|fun|m|Noun|Abstract|1
Frieden|peace|m|Noun|Abstract|2
Krieg|war|m|Noun|Abstract|2
Freiheit|freedom|f|Noun|Abstract|2
Sicherheit|security|f|Noun|Abstract|2
Wahrheit|truth|f|Noun|Abstract|2
Lüge|lie|f|Noun|Abstract|2
Traum|dream|m|Noun|Abstract|1
Gedanke|thought|m|Noun|Abstract|2
Idee|idea|f|Noun|Abstract|1
Problem|problem|n|Noun|Abstract|1
Lösung|solution|f|Noun|Abstract|1
Frage|question|f|Noun|Abstract|1
Antwort|answer|f|Noun|Abstract|1
Grund|reason|m|Noun|Abstract|1
Beispiel|example|n|Noun|Abstract|1
Fehler|mistake|m|Noun|Abstract|1
Erfolg|success|m|Noun|Abstract|2
Geld|money|n|Noun|Society|1
Preis|price|m|Noun|Society|1
Rechnung|bill|f|Noun|Society|1
Kasse|checkout|f|Noun|Society|1
Steuer|tax|f|Noun|Society|3
Politik|politics|f|Noun|Society|2
Regierung|government|f|Noun|Society|3
Partei|party (pol.)|f|Noun|Society|3
Gesetz|law|n|Noun|Society|3
Recht|right/law|n|Noun|Society|3
Gerechtigkeit|justice|f|Noun|Society|3
Wirtschaft|economy|f|Noun|Society|3
Kultur|culture|f|Noun|Society|2
Kunst|art|f|Noun|Society|2
Musik|music|f|Noun|Society|1
Religion|religion|f|Noun|Society|2
Gott|god|m|Noun|Society|2
Geschichte|history/story|f|Noun|Society|1
Sprache|language|f|Noun|Society|1
Wort|word|n|Noun|Society|1
Satz|sentence|m|Noun|Society|1

# COLORS & SHAPES
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
bunt|colorful|-|Adjective|Colors|1
hell|light/bright|-|Adjective|Colors|1
dunkel|dark|-|Adjective|Colors|1
Form|shape|f|Noun|Colors|1
Kreis|circle|m|Noun|Colors|1
Quadrat|square|n|Noun|Colors|1
Dreieck|triangle|n|Noun|Colors|1
Punkt|dot/point|m|Noun|Colors|1
Linie|line|f|Noun|Colors|1

# MATERIALS & TOOLS
Ding|thing|n|Noun|Objects|1
Sache|thing/matter|f|Noun|Objects|1
Material|material|n|Noun|Objects|2
Holz|wood|n|Noun|Objects|1
Metall|metal|n|Noun|Objects|1
Plastik|plastic|n|Noun|Objects|1
Glas|glass|n|Noun|Objects|1
Papier|paper|n|Noun|Objects|1
Stein|stone|m|Noun|Objects|1
Stoff|fabric|m|Noun|Objects|1
Leder|leather|n|Noun|Objects|1
Gold|gold|n|Noun|Objects|1
Silber|silver|n|Noun|Objects|1
Werkzeug|tool|n|Noun|Objects|2
Hammer|hammer|m|Noun|Objects|2
Schere|scissors|f|Noun|Objects|1
Maschine|machine|f|Noun|Objects|1
Gerät|device|n|Noun|Objects|1

# VERBS (Common)
sein|to be|-|Verb|Verbs|1
haben|to have|-|Verb|Verbs|1
werden|to become|-|Verb|Verbs|1
können|can|-|Verb|Verbs|1
müssen|must|-|Verb|Verbs|1
wollen|want|-|Verb|Verbs|1
sollen|should|-|Verb|Verbs|1
dürfen|may/allowed|-|Verb|Verbs|1
mögen|to like|-|Verb|Verbs|1
machen|to do/make|-|Verb|Verbs|1
tun|to do|-|Verb|Verbs|1
sagen|to say|-|Verb|Verbs|1
fragen|to ask|-|Verb|Verbs|1
antworten|to answer|-|Verb|Verbs|1
sprechen|to speak|-|Verb|Verbs|1
reden|to talk|-|Verb|Verbs|1
hören|to hear|-|Verb|Verbs|1
sehen|to see|-|Verb|Verbs|1
schauen|to look|-|Verb|Verbs|1
gucken|to look (colloq)|-|Verb|Verbs|1
gehen|to go|-|Verb|Verbs|1
laufen|to run/walk|-|Verb|Verbs|1
rennen|to run|-|Verb|Verbs|1
kommen|to come|-|Verb|Verbs|1
bleiben|to stay|-|Verb|Verbs|1
fahren|to drive/go|-|Verb|Verbs|1
fliegen|to fly|-|Verb|Verbs|1
stehen|to stand|-|Verb|Verbs|1
liegen|to lie|-|Verb|Verbs|1
sitzen|to sit|-|Verb|Verbs|1
essen|to eat|-|Verb|Verbs|1
trinken|to drink|-|Verb|Verbs|1
schlafen|to sleep|-|Verb|Verbs|1
aufstehen|to get up|-|Verb|Verbs|1
arbeiten|to work|-|Verb|Verbs|1
lernen|to learn|-|Verb|Verbs|1
studieren|to study|-|Verb|Verbs|1
schreiben|to write|-|Verb|Verbs|1
lesen|to read|-|Verb|Verbs|1
spielen|to play|-|Verb|Verbs|1
singen|to sing|-|Verb|Verbs|1
tanzen|to dance|-|Verb|Verbs|1
malen|to paint|-|Verb|Verbs|1
kaufen|to buy|-|Verb|Verbs|1
verkaufen|to sell|-|Verb|Verbs|1
kosten|to cost|-|Verb|Verbs|1
bezahlen|to pay|-|Verb|Verbs|1
nehmen|to take|-|Verb|Verbs|1
geben|to give|-|Verb|Verbs|1
bekommen|to get/receive|-|Verb|Verbs|1
bringen|to bring|-|Verb|Verbs|1
holen|to fetch|-|Verb|Verbs|1
finden|to find|-|Verb|Verbs|1
suchen|to search|-|Verb|Verbs|1
verlieren|to lose|-|Verb|Verbs|1
gewinnen|to win|-|Verb|Verbs|1
denken|to think|-|Verb|Verbs|1
wissen|to know (fact)|-|Verb|Verbs|1
kennen|to know (person)|-|Verb|Verbs|1
glauben|to believe|-|Verb|Verbs|1
verstehen|to understand|-|Verb|Verbs|1
vergessen|to forget|-|Verb|Verbs|1
erinnern|to remember|-|Verb|Verbs|2
fühlen|to feel|-|Verb|Verbs|1
lieben|to love|-|Verb|Verbs|1
hassen|to hate|-|Verb|Verbs|1
hoffen|to hope|-|Verb|Verbs|1
wünschen|to wish|-|Verb|Verbs|1
brauchen|to need|-|Verb|Verbs|1
benutzen|to use|-|Verb|Verbs|1
versuchen|to try|-|Verb|Verbs|1
helfen|to help|-|Verb|Verbs|1
warten|to wait|-|Verb|Verbs|1
treffen|to meet|-|Verb|Verbs|1
besuchen|to visit|-|Verb|Verbs|1
wohnen|to live|-|Verb|Verbs|1
leben|to live (alive)|-|Verb|Verbs|1
öffnen|to open|-|Verb|Verbs|1
schließen|to close|-|Verb|Verbs|1
anfangen|to begin|-|Verb|Verbs|1
beginnen|to begin|-|Verb|Verbs|1
enden|to end|-|Verb|Verbs|1
aufhören|to stop|-|Verb|Verbs|1
zeigen|to show|-|Verb|Verbs|1
erklären|to explain|-|Verb|Verbs|1
erzählen|to tell|-|Verb|Verbs|1
rufen|to call|-|Verb|Verbs|1
telefonieren|to phone|-|Verb|Verbs|1
reisen|to travel|-|Verb|Verbs|1
feiern|to celebrate|-|Verb|Verbs|1
lachen|to laugh|-|Verb|Verbs|1
weinen|to cry|-|Verb|Verbs|1
lächeln|to smile|-|Verb|Verbs|1
passieren|to happen|-|Verb|Verbs|1
stimmen|to be correct|-|Verb|Verbs|1
ändern|to change|-|Verb|Verbs|2
schneiden|to cut|-|Verb|Verbs|1
kochen|to cook|-|Verb|Verbs|1
backen|to bake|-|Verb|Verbs|1
waschen|to wash|-|Verb|Verbs|1
putzen|to clean|-|Verb|Verbs|1
duschen|to shower|-|Verb|Verbs|1
baden|to bathe|-|Verb|Verbs|1
ziehen|to pull/move|-|Verb|Verbs|2
drücken|to push/press|-|Verb|Verbs|2
halten|to hold/stop|-|Verb|Verbs|1
fallen|to fall|-|Verb|Verbs|1
werfen|to throw|-|Verb|Verbs|1
tragen|to carry/wear|-|Verb|Verbs|1
schlagen|to hit|-|Verb|Verbs|2
töten|to kill|-|Verb|Verbs|2
sterben|to die|-|Verb|Verbs|2
geboren|born|-|Verb|Verbs|1
heiraten|to marry|-|Verb|Verbs|1

# ADJECTIVES
gut|good|-|Adjective|Adjectives|1
schlecht|bad|-|Adjective|Adjectives|1
groß|big/tall|-|Adjective|Adjectives|1
klein|small|-|Adjective|Adjectives|1
alt|old|-|Adjective|Adjectives|1
neu|new|-|Adjective|Adjectives|1
jung|young|-|Adjective|Adjectives|1
schön|beautiful|-|Adjective|Adjectives|1
hässlich|ugly|-|Adjective|Adjectives|1
lang|long|-|Adjective|Adjectives|1
kurz|short|-|Adjective|Adjectives|1
hoch|high|-|Adjective|Adjectives|1
tief|deep/low|-|Adjective|Adjectives|1
dick|fat/thick|-|Adjective|Adjectives|1
dünn|thin|-|Adjective|Adjectives|1
breit|wide|-|Adjective|Adjectives|1
schmal|narrow|-|Adjective|Adjectives|1
schnell|fast|-|Adjective|Adjectives|1
langsam|slow|-|Adjective|Adjectives|1
stark|strong|-|Adjective|Adjectives|1
schwach|weak|-|Adjective|Adjectives|1
warm|warm|-|Adjective|Adjectives|1
kalt|cold|-|Adjective|Adjectives|1
heiß|hot|-|Adjective|Adjectives|1
kühl|cool|-|Adjective|Adjectives|1
hell|bright/light|-|Adjective|Adjectives|1
dunkel|dark|-|Adjective|Adjectives|1
hart|hard|-|Adjective|Adjectives|1
weich|soft|-|Adjective|Adjectives|1
schwer|heavy/hard|-|Adjective|Adjectives|1
leicht|light/easy|-|Adjective|Adjectives|1
teuer|expensive|-|Adjective|Adjectives|1
billig|cheap|-|Adjective|Adjectives|1
günstig|affordable|-|Adjective|Adjectives|1
reich|rich|-|Adjective|Adjectives|1
arm|poor|-|Adjective|Adjectives|1
laut|loud|-|Adjective|Adjectives|1
leise|quiet|-|Adjective|Adjectives|1
ruhig|calm/quiet|-|Adjective|Adjectives|1
sauber|clean|-|Adjective|Adjectives|1
schmutzig|dirty|-|Adjective|Adjectives|1
trocken|dry|-|Adjective|Adjectives|1
nass|wet|-|Adjective|Adjectives|1
voll|full|-|Adjective|Adjectives|1
leer|empty|-|Adjective|Adjectives|1
offen|open|-|Adjective|Adjectives|1
geschlossen|closed|-|Adjective|Adjectives|1
frei|free|-|Adjective|Adjectives|1
besetzt|occupied|-|Adjective|Adjectives|1
richtig|correct|-|Adjective|Adjectives|1
falsch|wrong|-|Adjective|Adjectives|1
wichtig|important|-|Adjective|Adjectives|1
einfach|simple|-|Adjective|Adjectives|1
schwierig|difficult|-|Adjective|Adjectives|1
klug|smart|-|Adjective|Adjectives|1
dumm|stupid|-|Adjective|Adjectives|1
intelligent|intelligent|-|Adjective|Adjectives|1
interessant|interesting|-|Adjective|Adjectives|1
langweilig|boring|-|Adjective|Adjectives|1
lustig|funny|-|Adjective|Adjectives|1
ernst|serious|-|Adjective|Adjectives|1
glücklich|happy|-|Adjective|Adjectives|1
traurig|sad|-|Adjective|Adjectives|1
müde|tired|-|Adjective|Adjectives|1
wach|awake|-|Adjective|Adjectives|1
gesund|healthy|-|Adjective|Adjectives|1
krank|sick|-|Adjective|Adjectives|1
tot|dead|-|Adjective|Adjectives|1
lebendig|alive|-|Adjective|Adjectives|1
fertig|finished/ready|-|Adjective|Adjectives|1
bereit|ready|-|Adjective|Adjectives|1
klar|clear|-|Adjective|Adjectives|1
möglich|possible|-|Adjective|Adjectives|1
unmöglich|impossible|-|Adjective|Adjectives|1
sicher|safe/sure|-|Adjective|Adjectives|1
gefährlich|dangerous|-|Adjective|Adjectives|1
wahr|true|-|Adjective|Adjectives|1
echt|real|-|Adjective|Adjectives|1
ähnlich|similar|-|Adjective|Adjectives|2
anders|different|-|Adjective|Adjectives|1
gleich|same|-|Adjective|Adjectives|1
allein|alone|-|Adjective|Adjectives|1
zusammen|together|-|Adjective|Adjectives|1
typisch|typical|-|Adjective|Adjectives|1
berühmt|famous|-|Adjective|Adjectives|1
beliebt|popular|-|Adjective|Adjectives|1
fremd|foreign/strange|-|Adjective|Adjectives|2
bekannt|known|-|Adjective|Adjectives|2
bequem|comfortable|-|Adjective|Adjectives|2
gemütlich|cozy|-|Adjective|Adjectives|2
komisch|funny/weird|-|Adjective|Adjectives|1
toll|great|-|Adjective|Adjectives|1
super|super|-|Adjective|Adjectives|1
wunderbar|wonderful|-|Adjective|Adjectives|1
schrecklich|terrible|-|Adjective|Adjectives|1
nett|nice|-|Adjective|Adjectives|1
freundlich|friendly|-|Adjective|Adjectives|1
böse|evil/angry|-|Adjective|Adjectives|1
ehrlich|honest|-|Adjective|Adjectives|2
stolz|proud|-|Adjective|Adjectives|2
neugierig|curious|-|Adjective|Adjectives|2
nervös|nervous|-|Adjective|Adjectives|2
fleißig|hardworking|-|Adjective|Adjectives|2
faul|lazy|-|Adjective|Adjectives|2

# PREPOSITIONS
in|in|-|Preposition|Grammar|1
an|at/on|-|Preposition|Grammar|1
auf|on|-|Preposition|Grammar|1
bei|at/with|-|Preposition|Grammar|1
mit|with|-|Preposition|Grammar|1
nach|after/to|-|Preposition|Grammar|1
von|from/of|-|Preposition|Grammar|1
zu|to|-|Preposition|Grammar|1
aus|out of/from|-|Preposition|Grammar|1
über|over/about|-|Preposition|Grammar|1
unter|under|-|Preposition|Grammar|1
vor|before/in front|-|Preposition|Grammar|1
hinter|behind|-|Preposition|Grammar|1
neben|next to|-|Preposition|Grammar|1
zwischen|between|-|Preposition|Grammar|1
durch|through|-|Preposition|Grammar|1
für|for|-|Preposition|Grammar|1
gegen|against|-|Preposition|Grammar|1
ohne|without|-|Preposition|Grammar|1
um|around/at|-|Preposition|Grammar|1
seit|since|-|Preposition|Grammar|1
bis|until|-|Preposition|Grammar|1
während|during|-|Preposition|Grammar|2
wegen|because of|-|Preposition|Grammar|2
statt|instead of|-|Preposition|Grammar|2
trotz|despite|-|Preposition|Grammar|2
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
  const art = getArticle(gender);
  
  if (type === 'Greeting') return { de: `${german}!`, en: `${english}!` };
  if (type === 'Phrase') return { de: `${german}.`, en: `${english}.` };
  
  if (type === 'Noun') {
     const noun = german; 
     if (category === 'Food') return { de: `Ich esse ${art} ${noun}.`, en: `I eat the ${english}.` };
     if (category === 'Clothing') return { de: `Ich trage ${art} ${noun}.`, en: `I wear the ${english}.` };
     if (category === 'Body') return { de: `Das ist mein ${noun}.`, en: `That is my ${english}.` };
     if (category === 'Family') return { de: `Das ist mein ${noun}.`, en: `That is my ${english}.` };
     if (category === 'Animals') return { de: `${art ? art.charAt(0).toUpperCase() + art.slice(1) + ' ' : ''}${noun} ist hier.`, en: `The ${english} is here.` };
     if (category === 'City' || category === 'Home') return { de: `Wo ist ${art} ${noun}?`, en: `Where is the ${english}?` };
     if (category === 'Professions') return { de: `Ich bin ${noun}.`, en: `I am a ${english}.` };
     // Default Noun
     return { de: `Das ist ${art} ${noun}.`, en: `That is the ${english}.` };
  }

  if (type === 'Verb') {
     return { de: `Wir müssen ${german}.`, en: `We must ${english}.` };
  }

  if (type === 'Adjective') {
     return { de: `Es ist ${german}.`, en: `It is ${english}.` };
  }
  
  if (type === 'Adverb') {
      return { de: `Das ist ${german} so.`, en: `That is ${english} so.` };
  }
  
  if (type === 'Pronoun') {
      return { de: `${german} bist da?`, en: `${english} are there?` };
  }

  if (type === 'Preposition') {
      return { de: `${german} dem Haus.`, en: `${english} the house.` };
  }

  if (type === 'Conjunction') {
      return { de: `A ${german} B.`, en: `A ${english} B.` };
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
    const examples = generateExample(german, english, type, gender, category);
    
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

// ---------------------------------------------------------------------------
// 4. SENTENCE PUZZLES (Fallback)
// ---------------------------------------------------------------------------
export const LOCAL_SENTENCES: SentencePuzzle[] = [
  { german: "Ich gehe heute ins Kino.", english: "I am going to the cinema today." },
  { german: "Der Hund spielt im Garten.", english: "The dog is playing in the garden." },
  { german: "Wir trinken gerne Kaffee.", english: "We like drinking coffee." },
  { german: "Sie kauft ein neues Kleid.", english: "She is buying a new dress." },
  { german: "Das Wetter ist heute sehr schön.", english: "The weather is very nice today." },
  { german: "Kannst du mir helfen?", english: "Can you help me?" },
  { german: "Ich habe keinen Hunger.", english: "I am not hungry." },
  { german: "Er wohnt in Berlin.", english: "He lives in Berlin." },
  { german: "Die Kinder gehen zur Schule.", english: "The children are going to school." },
  { german: "Ich möchte ein Bier bestellen.", english: "I would like to order a beer." }
];
