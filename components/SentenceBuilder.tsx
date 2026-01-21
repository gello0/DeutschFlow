import React, { useState, useEffect } from 'react';
import { DifficultyLevel, SentencePuzzle } from '../types';
import { generateSentencePuzzle, speakText } from '../services/geminiService';

interface SentenceBuilderProps {
  level: DifficultyLevel;
}

const SentenceBuilder: React.FC<SentenceBuilderProps> = ({ level }) => {
  const [puzzle, setPuzzle] = useState<SentencePuzzle | null>(null);
  const [availableWords, setAvailableWords] = useState<{ id: string, text: string }[]>([]);
  const [selectedWords, setSelectedWords] = useState<{ id: string, text: string }[]>([]);
  const [status, setStatus] = useState<'playing' | 'correct' | 'wrong'>('playing');
  const [loading, setLoading] = useState(false);

  const fetchPuzzle = async () => {
    setLoading(true);
    setStatus('playing');
    setSelectedWords([]);
    
    const newPuzzle = await generateSentencePuzzle(level);
    if (newPuzzle) {
        setPuzzle(newPuzzle);
        // Clean punctuation for splitting (keep simple)
        const cleanSentence = newPuzzle.german.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
        const words = cleanSentence.split(/\s+/);
        
        // Create objects with unique IDs to handle duplicate words
        const wordObjects = words.map((w, i) => ({ id: `${w}-${i}`, text: w }));
        
        // Shuffle
        const shuffled = [...wordObjects].sort(() => 0.5 - Math.random());
        setAvailableWords(shuffled);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPuzzle();
  }, [level]);

  const handleSelectWord = (wordObj: { id: string, text: string }) => {
    if (status !== 'playing') return;
    setAvailableWords(prev => prev.filter(w => w.id !== wordObj.id));
    setSelectedWords(prev => [...prev, wordObj]);
  };

  const handleDeselectWord = (wordObj: { id: string, text: string }) => {
    if (status !== 'playing') return;
    setSelectedWords(prev => prev.filter(w => w.id !== wordObj.id));
    setAvailableWords(prev => [...prev, wordObj]);
  };

  const checkAnswer = () => {
    if (!puzzle) return;
    
    const constructed = selectedWords.map(w => w.text).join(' ');
    // Simple normalization for check: remove punctuation from target, ignore case for now or strict?
    // Let's do strict case but loose punctuation
    const targetClean = puzzle.german.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
    
    if (constructed === targetClean) {
        setStatus('correct');
        speakText(puzzle.german);
    } else {
        setStatus('wrong');
    }
  };

  if (loading && !puzzle) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-german-gold border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400">Building puzzle...</p>
      </div>
    );
  }

  if (!puzzle) return <div>Error loading.</div>;

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto px-4 pb-24 pt-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Satzbau</h2>
        <p className="text-gray-500 dark:text-gray-400">Build the sentence</p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 flex flex-col items-center flex-grow">
          
          <h3 className="text-xl text-gray-700 dark:text-gray-300 font-medium italic mb-8 text-center">
            "{puzzle.english}"
          </h3>

          {/* Construction Area */}
          <div className="w-full min-h-[80px] bg-gray-50 dark:bg-[#252525] rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-4 mb-8 flex flex-wrap gap-2 justify-center items-center">
             {selectedWords.length === 0 && (
                <span className="text-gray-400 text-sm">Tap words below to build sentence</span>
             )}
             {selectedWords.map(w => (
                <button
                   key={w.id}
                   onClick={() => handleDeselectWord(w)}
                   className="px-4 py-2 bg-white dark:bg-[#333] border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm font-medium text-gray-800 dark:text-white hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 transition-colors animate-in zoom-in-50 duration-200"
                >
                   {w.text}
                </button>
             ))}
          </div>

          {/* Word Pool */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
             {availableWords.map(w => (
                <button
                   key={w.id}
                   onClick={() => handleSelectWord(w)}
                   className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 rounded-lg font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:scale-105 transition-all shadow-sm"
                >
                   {w.text}
                </button>
             ))}
          </div>

          {/* Status Message */}
          {status === 'correct' && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-bold">{puzzle.german}</span>
              </div>
          )}
          
          {status === 'wrong' && (
              <div className="mb-6 text-red-500 font-bold animate-pulse">
                  Not quite right. Try again!
              </div>
          )}

          <div className="mt-auto w-full flex gap-4">
             <button 
               onClick={() => {
                   setSelectedWords([]);
                   setAvailableWords([...availableWords, ...selectedWords].sort(() => 0.5 - Math.random()));
                   setStatus('playing');
               }}
               className="flex-1 py-3 text-gray-500 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
             >
                Reset
             </button>
             <button 
               onClick={status === 'correct' ? fetchPuzzle : checkAnswer}
               className={`flex-[2] py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95
                  ${status === 'correct' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-german-gold text-black hover:bg-yellow-400'}`}
             >
                {status === 'correct' ? 'Next Puzzle' : 'Check'}
             </button>
          </div>

      </div>
    </div>
  );
};

export default SentenceBuilder;
