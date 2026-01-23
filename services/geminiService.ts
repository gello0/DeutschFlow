
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { VocabWord, DifficultyLevel, VerbDrill, ChatMessage, SentencePuzzle } from "../types";
import { LOCAL_VOCAB, LOCAL_VERBS } from "../data/vocab";
import { LOCAL_SENTENCES } from "../data/sentences";
import { decodeAudioData } from "./audioUtils";

// Initialize AI Client
const getClient = () => {
    if (!process.env.API_KEY) return null;
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// 1. Generate Vocabulary
export const generateVocabulary = async (
  level: DifficultyLevel, 
  category?: string
): Promise<VocabWord[]> => {
    // Artificial delay for UI consistency
    await new Promise(resolve => setTimeout(resolve, 300));

    const ai = getClient();

    if (ai) {
        try {
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
                model: 'gemini-2.5-flash-lite', // Using Lite for speed and RPM
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
        if (level === DifficultyLevel.Beginner) return w.level === DifficultyLevel.Beginner; 
        if (level === DifficultyLevel.Intermediate) return w.level === DifficultyLevel.Intermediate;
        return w.level === DifficultyLevel.Advanced;
    });

    if (category) {
        pool = pool.filter(w => w.category === category);
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 15);
};

// 2. Conjugation Drill Generator
export const generateVerbDrill = async (level: DifficultyLevel): Promise<VerbDrill | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    if (LOCAL_VERBS.length > 0) {
        const randomIndex = Math.floor(Math.random() * LOCAL_VERBS.length);
        return LOCAL_VERBS[randomIndex];
    }
    return null;
};

// 3. Text to Speech (Gemini TTS with Browser Fallback)
export const speakText = async (text: string) => {
    const ai = getClient();
    
    // Attempt Gemini TTS first
    if (ai) {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-tts",
                contents: { parts: [{ text }] },
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: 'Kore' }, // 'Kore' is often good for German, or let model decide
                        },
                    },
                },
            });

            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            
            if (base64Audio) {
                // Manually decode base64 string to a Uint8Array
                const binaryString = atob(base64Audio);
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }

                const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
                const audioBuffer = await decodeAudioData(
                    bytes,
                    outputAudioContext,
                    24000,
                    1,
                );
                
                const source = outputAudioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputAudioContext.destination);
                source.start();
                return; // Success, exit function
            }
        } catch (e) {
            console.warn("Gemini TTS failed, falling back to browser TTS:", e);
        }
    }

    // Fallback: Browser Native TTS
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.rate = 0.9;
        
        const voices = window.speechSynthesis.getVoices();
        const germanVoice = voices.find(v => v.lang.includes('de'));
        if (germanVoice) {
            utterance.voice = germanVoice;
        }
        window.speechSynthesis.speak(utterance);
    }
};

// 4. Chat Tutor AI
export const sendMessageToTutor = async (
    history: ChatMessage[],
    message: string,
    level: DifficultyLevel | string,
    systemContext?: string
): Promise<{ text: string; correction?: string }> => {
    const ai = getClient();
    if (!ai) {
        return { 
            text: "Please configure your API Key in the environment variables to use the AI Tutor.", 
            correction: undefined 
        };
    }

    const contents = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));

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
            model: 'gemini-2.5-flash-lite', // Lite for chat speed
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

// 5. Sentence Puzzle Generator (Prioritize Local Data for reliability)
export const generateSentencePuzzle = async (
    level: DifficultyLevel,
    excludeIds: string[] = [] // New param to avoid repetition
): Promise<SentencePuzzle | null> => {
    // Artificial delay
    await new Promise(resolve => setTimeout(resolve, 200));

    // 1. First, try to find a local sentence that hasn't been seen yet/recently
    // Filter sentences that are NOT in the exclude list
    const availableLocal = LOCAL_SENTENCES.filter(s => !excludeIds.includes(s.german)); // Using german text as ID for local

    if (availableLocal.length > 0) {
        // Pick random from available
        const randomIndex = Math.floor(Math.random() * availableLocal.length);
        const s = availableLocal[randomIndex];
        return { id: s.german, german: s.german, english: s.english }; // Use german text as ID
    }

    // 2. If we ran out of local sentences, try AI or reuse local
    const ai = getClient();
    if (ai) {
        const prompt = `Generate a simple German sentence appropriate for level ${level}. 
        It should be 4-8 words long.
        Return JSON with:
        1. "german": The sentence in German.
        2. "english": The English translation.
        `;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-lite',
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
                return { id: `ai-${Date.now()}`, german: parsed.german, english: parsed.english };
            }
        } catch (error) {
            console.error("Gemini API Error (Sentence):", error);
        }
    }

    // 3. Absolute fallback (reuse any local)
    if (LOCAL_SENTENCES.length > 0) {
        const randomIndex = Math.floor(Math.random() * LOCAL_SENTENCES.length);
        const s = LOCAL_SENTENCES[randomIndex];
        return { id: s.german, german: s.german, english: s.english };
    }

    return { id: 'fallback', german: "Das ist ein Haus.", english: "This is a house." };
};
