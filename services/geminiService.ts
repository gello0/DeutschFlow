
import { GoogleGenAI, Type } from "@google/genai";
import { VocabWord, DifficultyLevel, VerbDrill, ChatMessage, SentencePuzzle } from "../types";
import { LOCAL_VOCAB, LOCAL_VERBS } from "../data/fallbackData";

// 1. Generate Vocabulary (Dynamic via Gemini with Local Fallback)
export const generateVocabulary = async (
  level: DifficultyLevel, 
  category?: string
): Promise<VocabWord[]> => {
    // Artificial delay for UI consistency
    await new Promise(resolve => setTimeout(resolve, 300));

    // Try Gemini First
    if (process.env.API_KEY) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Generate 10 German vocabulary words for level ${level} ${category ? `related to "${category}"` : ''}.
            Include nouns (with gender), verbs, adjectives, or phrases.
            Return a JSON array where each object has:
            - german: string (the word/phrase)
            - english: string (translation)
            - gender: 'der', 'die', 'das', or '' (empty for non-nouns)
            - type: 'Noun', 'Verb', 'Adjective', 'Phrase'
            - exampleGerman: A natural, varied example sentence using the word. DO NOT use "Das ist [word]". Use context like "I eat...", "Where is...", "The [word] is beautiful".
            - exampleEnglish: translation of the example sentence
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                german: { type: Type.STRING },
                                english: { type: Type.STRING },
                                gender: { type: Type.STRING },
                                type: { type: Type.STRING },
                                exampleGerman: { type: Type.STRING },
                                exampleEnglish: { type: Type.STRING }
                            },
                            required: ['german', 'english', 'type', 'exampleGerman', 'exampleEnglish']
                        }
                    }
                }
            });

            const jsonText = response.text || "[]";
            const generatedWords = JSON.parse(jsonText);
            
            if (Array.isArray(generatedWords) && generatedWords.length > 0) {
                 // Map to ensure strict typing compatibility
                 return generatedWords.map((w: any) => ({
                     german: w.german,
                     english: w.english,
                     gender: (['der', 'die', 'das'].includes(w.gender) ? w.gender : '') as any,
                     type: w.type || 'Word',
                     exampleGerman: w.exampleGerman,
                     exampleEnglish: w.exampleEnglish,
                     category: category || 'AI Generated',
                     level: level
                 }));
            }
        } catch (e) {
            console.error("Gemini Vocab Gen Error (falling back to local):", e);
        }
    }

    // Fallback to Local Data
    let pool = LOCAL_VOCAB.filter(w => {
        // Strict level filtering for Beginner
        if (level === DifficultyLevel.Beginner) return w.level === DifficultyLevel.Beginner; 
        if (level === DifficultyLevel.Intermediate) return w.level === DifficultyLevel.Intermediate;
        return w.level === DifficultyLevel.Advanced;
    });

    if (category) {
        pool = pool.filter(w => w.category === category);
    }

    // Shuffle and take 15
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 15);
};

// 2. Conjugation Drill Generator (Static from Local DB)
export const generateVerbDrill = async (level: DifficultyLevel): Promise<VerbDrill | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    if (LOCAL_VERBS.length > 0) {
        const randomIndex = Math.floor(Math.random() * LOCAL_VERBS.length);
        return LOCAL_VERBS[randomIndex];
    }
    return null;
};

// 3. Text to Speech (Browser Native)
export const speakText = async (text: string) => {
    if (!('speechSynthesis' in window)) {
        console.warn("Browser does not support TTS");
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.9; // Slightly slower for learning
    
    // Try to find a German voice
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find(v => v.lang.includes('de'));
    if (germanVoice) {
        utterance.voice = germanVoice;
    }

    window.speechSynthesis.speak(utterance);
};

// 4. Chat Tutor AI
export const sendMessageToTutor = async (
    history: ChatMessage[],
    message: string,
    level: DifficultyLevel | string,
    systemContext?: string
): Promise<{ text: string; correction?: string }> => {
    if (!process.env.API_KEY) {
        return { 
            text: "Please configure your API Key in the environment variables to use the AI Tutor.", 
            correction: undefined 
        };
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Prepare history for Gemini
    const contents = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));

    // Append current user message
    contents.push({
        role: 'user',
        parts: [{ text: message }]
    });

    const systemInstruction = (systemContext || "You are a helpful German language tutor.") + 
        ` The user is at German level ${level}. Respond in German. ` + 
        `If the user's last message had grammar errors, provide a correction in the 'correction' field in English. ` +
        `Otherwise, leave 'correction' empty. Keep the conversation engaging.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        response: { type: Type.STRING },
                        correction: { type: Type.STRING, nullable: true }
                    },
                    required: ['response']
                }
            }
        });

        const jsonText = response.text || "{}";
        const parsed = JSON.parse(jsonText);
        return {
            text: parsed.response || "Entschuldigung, ich habe das nicht verstanden.",
            correction: parsed.correction || undefined
        };

    } catch (error) {
        console.error("Gemini API Error:", error);
        return {
            text: "Entschuldigung, es gab einen Fehler bei der Verbindung.",
            correction: undefined
        };
    }
};

// 5. Sentence Puzzle Generator AI
export const generateSentencePuzzle = async (level: DifficultyLevel): Promise<SentencePuzzle | null> => {
    if (!process.env.API_KEY) {
        // Fallback for demo without key
        return { german: "Das ist ein Haus.", english: "This is a house." };
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Generate a simple German sentence appropriate for level ${level}. 
    It should be 4-8 words long.
    Return JSON with:
    1. "german": The sentence in German.
    2. "english": The English translation.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        german: { type: Type.STRING },
                        english: { type: Type.STRING }
                    },
                    required: ['german', 'english']
                }
            }
        });

        const jsonText = response.text || "{}";
        const parsed = JSON.parse(jsonText);
        
        if (parsed.german && parsed.english) {
            return { german: parsed.german, english: parsed.english };
        }
        return null;

    } catch (error) {
        console.error("Gemini API Error:", error);
        return null;
    }
};
