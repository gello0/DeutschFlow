import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";
import { VocabWord, DifficultyLevel, ChatMessage, VerbDrill, SentencePuzzle } from "../types";
import { decodeBase64, decodeAudioData, playAudioBuffer } from "./audioUtils";
import { LOCAL_VOCAB, LOCAL_VERBS, LOCAL_SENTENCES } from "../data/fallbackData";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 1. Generate Vocabulary (Hybrid: Local First, then AI)
export const generateVocabulary = async (
  level: DifficultyLevel, 
  nuance: 'easier' | 'standard' | 'harder' = 'standard',
  existingWords: string[] = []
): Promise<VocabWord[]> => {
  try {
    // A. Check Local Database First
    const unseenLocalWords = LOCAL_VOCAB.filter(localWord => 
        !existingWords.includes(localWord.german) &&
        (
            level === DifficultyLevel.Beginner ? localWord.level === DifficultyLevel.Beginner : 
            true // If intermediate/advanced, allow all local words for now (or strictly filter if DB grows large enough)
        )
    );

    // If we have enough local words, return a batch of them (max 5)
    if (unseenLocalWords.length > 0) {
        console.log("Serving vocabulary from Local DB");
        // Shuffle array slightly to give variety
        const shuffled = unseenLocalWords.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 5);
    }

    // B. Fallback to AI if Local DB is exhausted
    console.log("Local DB exhausted, calling AI...");
    const existingList = existingWords.slice(-20).join(", "); 
    const nuancePrompt = nuance === 'harder' 
      ? "Select slightly more complex words or nuanced grammar concepts." 
      : nuance === 'easier' 
      ? "Select very fundamental words and essential grammar particles." 
      : "Select standard vocabulary and high-frequency grammar words.";

    const prompt = `Generate 5 new German vocabulary cards for a ${level} learner.
    ${nuancePrompt}
    
    Do not use these words: ${existingList}.
    
    CRITICAL: 
    - Include gender (der/die/das) for Nouns.
    - Provide a practical example sentence.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              german: { type: Type.STRING },
              english: { type: Type.STRING },
              gender: { type: Type.STRING, description: "der, die, das only for Nouns. Empty string for others." },
              type: { type: Type.STRING, description: "Noun, Verb, Adjective, Article, Pronoun, Preposition" },
              exampleGerman: { type: Type.STRING },
              exampleEnglish: { type: Type.STRING },
            },
            required: ["german", "english", "exampleGerman", "exampleEnglish", "type"],
          },
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    return JSON.parse(jsonText) as VocabWord[];
  } catch (error) {
    console.error("Error generating vocab:", error);
    return [];
  }
};

// 2. Chat Tutor Logic (AI Only - Dynamic)
export const sendMessageToTutor = async (
  history: ChatMessage[], 
  newMessage: string, 
  level: DifficultyLevel,
  systemInstructionOverride?: string
): Promise<{ text: string; correction?: string }> => {
  try {
    const recentHistory = history.slice(-10).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const defaultInstruction = `You are a friendly and patient German language tutor helping a student at the ${level} level. 
    Engage in natural conversation. 
    If the user makes a grammatical mistake, provide a gentle correction in a separate JSON field, but keep the main response conversational in German (with English hints if beginner).
    Return response as JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...recentHistory,
        { role: 'user', parts: [{ text: newMessage }] }
      ],
      config: {
        systemInstruction: systemInstructionOverride || defaultInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            response: { type: Type.STRING, description: "Your conversational response in German" },
            correction: { type: Type.STRING, description: "Optional correction of the user's last message if there were errors. Explain briefly why." }
          },
          required: ["response"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return { text: "Entschuldigung, ich habe das nicht verstanden.", correction: undefined };
    
    const parsed = JSON.parse(jsonText);
    return {
      text: parsed.response,
      correction: parsed.correction
    };

  } catch (error) {
    console.error("Chat error:", error);
    return { text: "Error connecting to tutor." };
  }
};

// 3. Journal Helper (AI Only - Complex Task)
export const getJournalSuggestions = async (
  currentText: string, 
  level: DifficultyLevel
): Promise<{ suggestion: string; translation?: string; nextWordPrediction?: string }> => {
  try {
    const prompt = `The user is writing a journal entry in German (Level: ${level}). 
    Current text: "${currentText}".
    Analyze the last word or incomplete phrase.
    1. If the last word is English, provide the German translation.
    2. If the last word is German, suggest the next logical word to continue the sentence.
    3. Provide a brief encouraging tip or correction if the grammar is clearly wrong.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestion: { type: Type.STRING, description: "Correction of last word or general tip" },
            translation: { type: Type.STRING, description: "German translation if user typed English, else null" },
            nextWordPrediction: { type: Type.STRING, description: "Predicted next word in German" }
          },
          required: ["suggestion"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return { suggestion: "" };
    return JSON.parse(jsonText);
  } catch (error) {
    return { suggestion: "" };
  }
};

export const correctJournalEntry = async (text: string): Promise<{ corrected: string; explanation: string }> => {
   try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Correct this German journal entry: "${text}".
      Return a JSON object with:
      - corrected: The fully polished, natural German text.
      - explanation: A concise explanation of what was changed and why (in English). Keep it helpful for a learner.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
             corrected: { type: Type.STRING },
             explanation: { type: Type.STRING }
          },
          required: ["corrected", "explanation"]
        }
      }
    });
    
    const jsonText = response.text;
    if (!jsonText) return { corrected: "", explanation: "No response from AI." };
    return JSON.parse(jsonText);

  } catch (error) {
    return { corrected: "Error", explanation: "Could not correct entry." };
  }
}

// 4. Conjugation Drill Generator (Hybrid: Local First)
export const generateVerbDrill = async (level: DifficultyLevel): Promise<VerbDrill | null> => {
  try {
    if (LOCAL_VERBS.length > 0) {
        console.log("Serving Verb Drill from Local DB");
        const randomIndex = Math.floor(Math.random() * LOCAL_VERBS.length);
        return LOCAL_VERBS[randomIndex];
    }

    const prompt = `Generate a single German verb conjugation exercise for a student at level: ${level}.
    - Pick a common verb appropriate for this level.
    - Choose a tense (Präsens, Präteritum, or Perfekt) appropriate for this level.
    - Provide the conjugation for all 6 pronouns.
    - Provide a short tip if there's an irregularity.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            infinitive: { type: Type.STRING },
            translation: { type: Type.STRING },
            tense: { type: Type.STRING },
            tip: { type: Type.STRING },
            conjugations: {
              type: Type.OBJECT,
              properties: {
                ich: { type: Type.STRING },
                du: { type: Type.STRING },
                er_sie_es: { type: Type.STRING },
                wir: { type: Type.STRING },
                ihr: { type: Type.STRING },
                sie_Sie: { type: Type.STRING },
              },
              required: ["ich", "du", "er_sie_es", "wir", "ihr", "sie_Sie"]
            }
          },
          required: ["infinitive", "translation", "tense", "conjugations"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return null;
    return JSON.parse(jsonText) as VerbDrill;

  } catch (error) {
    console.error("Drill generation error:", error);
    return LOCAL_VERBS[0] || null;
  }
};

// 5. Sentence Puzzle Generator (Hybrid: Local First)
export const generateSentencePuzzle = async (level: DifficultyLevel): Promise<SentencePuzzle | null> => {
  try {
     // A. Local Fallback (50% chance or if error)
     if (Math.random() > 0.6) {
        const randomIndex = Math.floor(Math.random() * LOCAL_SENTENCES.length);
        return LOCAL_SENTENCES[randomIndex];
     }

     // B. AI Generation
     const prompt = `Generate a German sentence appropriate for ${level} level. 
     Return a JSON object with:
     - german: The sentence in German.
     - english: The English translation.
     Keep the sentence between 4 and 10 words long.`;

     const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    german: { type: Type.STRING },
                    english: { type: Type.STRING }
                },
                required: ["german", "english"]
            }
        }
     });

     const jsonText = response.text;
     if (!jsonText) return LOCAL_SENTENCES[0];
     return JSON.parse(jsonText) as SentencePuzzle;

  } catch (e) {
      console.error("Sentence gen error", e);
      return LOCAL_SENTENCES[0];
  }
}

// 6. Text to Speech (AI Only - Media Gen)
let audioContext: AudioContext | null = null;

export const speakText = async (text: string) => {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (base64Audio && audioContext) {
      const audioBytes = decodeBase64(base64Audio);
      const audioBuffer = await decodeAudioData(audioBytes, audioContext, 24000, 1);
      playAudioBuffer(audioBuffer, audioContext);
    }
  } catch (error) {
    console.error("TTS Error:", error);
  }
};
