
import React, { useState, useEffect } from 'react';
import { BookUnit, BookExercise } from '../types';
import { BOOK_UNITS } from '../data/bookData';
import { speakText } from '../services/geminiService';

const BookMode: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<BookUnit | null>(null);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [userAnswer, setUserAnswer] = useState('');
  const [completedUnits, setCompletedUnits] = useState<string[]>([]);
  
  // Arrange Exercise State
  const [shuffledWords, setShuffledWords] = useState<{id: number, text: string}[]>([]);
  const [arrangedWords, setArrangedWords] = useState<{id: number, text: string}[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('book_progress');
    if (saved) {
      setCompletedUnits(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (unitId: string) => {
    if (!completedUnits.includes(unitId)) {
      const updated = [...completedUnits, unitId];
      setCompletedUnits(updated);
      localStorage.setItem('book_progress', JSON.stringify(updated));
    }
  };

  const startUnit = (unit: BookUnit) => {
    setSelectedUnit(unit);
    setCurrentExerciseIdx(0);
    resetExerciseState(unit.exercises[0]);
  };

  const resetExerciseState = (ex: BookExercise) => {
    setFeedback('idle');
    setUserAnswer('');
    if (ex.type === 'arrange' && ex.content) {
      const words = ex.content.split('/').map(w => w.trim());
      // Simple shuffle
      const items = words.map((w, i) => ({ id: i, text: w }));
      setShuffledWords([...items].sort(() => 0.5 - Math.random()));
      setArrangedWords([]);
    }
  };

  const handleArrangeClick = (wordObj: {id: number, text: string}, fromPool: boolean) => {
    if (feedback !== 'idle') return;
    
    if (fromPool) {
      setShuffledWords(prev => prev.filter(w => w.id !== wordObj.id));
      setArrangedWords(prev => [...prev, wordObj]);
    } else {
      setArrangedWords(prev => prev.filter(w => w.id !== wordObj.id));
      setShuffledWords(prev => [...prev, wordObj]);
    }
  };

  const checkAnswer = () => {
    if (!selectedUnit) return;
    const currentEx = selectedUnit.exercises[currentExerciseIdx];
    
    let isCorrect = false;
    
    if (currentEx.type === 'multiple-choice') {
      isCorrect = userAnswer === currentEx.correctAnswer;
    } else if (currentEx.type === 'fill-gap') {
      isCorrect = userAnswer.trim().toLowerCase() === currentEx.correctAnswer.toLowerCase();
    } else if (currentEx.type === 'arrange') {
      const constructed = arrangedWords.map(w => w.text).join(' ');
      // Remove punctuation for comparison flexibility if needed, but usually strict
      isCorrect = constructed === currentEx.correctAnswer;
    }

    if (isCorrect) {
      setFeedback('correct');
      // Play audio of correct answer if it's text
      if (currentEx.type !== 'multiple-choice' || currentEx.correctAnswer.length > 2) {
          speakText(currentEx.correctAnswer);
      }
    } else {
      setFeedback('wrong');
    }
  };

  const nextExercise = () => {
    if (!selectedUnit) return;
    
    if (currentExerciseIdx < selectedUnit.exercises.length - 1) {
      const nextIdx = currentExerciseIdx + 1;
      setCurrentExerciseIdx(nextIdx);
      resetExerciseState(selectedUnit.exercises[nextIdx]);
    } else {
      // Unit Complete
      saveProgress(selectedUnit.id);
      setSelectedUnit(null); // Go back to menu
    }
  };

  // --- RENDER HELPERS ---

  const renderProgressBar = () => {
     if (!selectedUnit) return null;
     const progress = ((currentExerciseIdx) / selectedUnit.exercises.length) * 100;
     return (
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full mb-6">
            <div className="h-full bg-german-gold transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
     );
  };

  if (!selectedUnit) {
    // === CHAPTER LIST VIEW ===
    return (
      <div className="flex flex-col h-full max-w-2xl mx-auto px-4 pb-24 pt-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Workbook</h2>
          <p className="text-gray-500 dark:text-gray-400">Structured Exercises with Answers</p>
        </div>

        <div className="space-y-4">
          {BOOK_UNITS.map((unit) => {
            const isCompleted = completedUnits.includes(unit.id);
            return (
              <button
                key={unit.id}
                onClick={() => startUnit(unit)}
                className={`w-full text-left p-6 rounded-2xl border transition-all relative overflow-hidden group
                  ${isCompleted 
                    ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' 
                    : 'bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-gray-800 hover:border-german-gold dark:hover:border-german-gold shadow-sm hover:shadow-md'
                  }`}
              >
                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        {unit.id.replace('-', ' ').toUpperCase()}
                      </span>
                      {isCompleted && (
                        <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-bold px-2 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-german-gold transition-colors">{unit.title}</h3>
                   <p className="text-sm text-gray-500 dark:text-gray-400">{unit.description}</p>
                   <div className="mt-4 text-xs font-medium text-gray-400">
                      {unit.exercises.length} Exercises
                   </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // === EXERCISE VIEW ===
  const currentEx = selectedUnit.exercises[currentExerciseIdx];

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto px-4 pb-24 pt-4">
       {/* Header */}
       <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setSelectedUnit(null)}
            className="text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ← Back to Units
          </button>
          <span className="text-xs font-bold text-gray-400">
            {currentExerciseIdx + 1} / {selectedUnit.exercises.length}
          </span>
       </div>
       
       {renderProgressBar()}

       <div className="flex-1 flex flex-col items-center">
          <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white mb-8">
             {currentEx.prompt}
          </h3>

          {/* --- TYPE: MULTIPLE CHOICE --- */}
          {currentEx.type === 'multiple-choice' && (
             <div className="grid grid-cols-1 w-full gap-3">
                {currentEx.options?.map(opt => (
                   <button
                     key={opt}
                     onClick={() => setUserAnswer(opt)}
                     disabled={feedback !== 'idle'}
                     className={`p-4 rounded-xl border-2 text-lg font-medium transition-all
                        ${userAnswer === opt 
                           ? (feedback === 'idle' ? 'border-german-gold bg-yellow-50 dark:bg-yellow-900/10' : 
                              feedback === 'correct' ? 'border-green-500 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' : 'border-red-500 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200')
                           : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#252525] hover:border-gray-300'
                        }
                     `}
                   >
                     {opt}
                   </button>
                ))}
             </div>
          )}

          {/* --- TYPE: FILL GAP --- */}
          {currentEx.type === 'fill-gap' && (
             <div className="w-full max-w-md">
                <div className="text-2xl text-center mb-6 leading-loose font-serif">
                   {currentEx.content?.split('______').map((part, i, arr) => (
                      <React.Fragment key={i}>
                         {part}
                         {i < arr.length - 1 && (
                            <span className={`inline-block border-b-2 px-2 min-w-[80px] font-bold mx-1
                               ${feedback === 'correct' ? 'border-green-500 text-green-600' : 
                                 feedback === 'wrong' ? 'border-red-500 text-red-600' : 'border-german-gold text-german-black dark:text-white'}
                            `}>
                               {userAnswer || (feedback === 'idle' ? '___' : userAnswer)}
                            </span>
                         )}
                      </React.Fragment>
                   ))}
                </div>
                {feedback === 'idle' && (
                   <input 
                      type="text" 
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#252525] text-center text-lg focus:ring-2 focus:ring-german-gold outline-none"
                      placeholder="Type the missing word"
                      autoFocus
                   />
                )}
             </div>
          )}

          {/* --- TYPE: ARRANGE --- */}
          {currentEx.type === 'arrange' && (
             <div className="w-full">
                <div className="min-h-[60px] border-b-2 border-gray-200 dark:border-gray-700 mb-8 flex flex-wrap gap-2 justify-center items-center pb-2">
                   {arrangedWords.map(w => (
                      <button 
                        key={w.id} 
                        onClick={() => handleArrangeClick(w, false)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm font-medium animate-in zoom-in-50"
                      >
                         {w.text}
                      </button>
                   ))}
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center">
                   {shuffledWords.map(w => (
                      <button 
                        key={w.id} 
                        onClick={() => handleArrangeClick(w, true)}
                        className="px-4 py-2 bg-white dark:bg-[#252525] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-[#333] font-medium"
                      >
                         {w.text}
                      </button>
                   ))}
                </div>
             </div>
          )}
       </div>

       {/* --- FEEDBACK AREA --- */}
       <div className="mt-8 min-h-[140px]">
          {feedback !== 'idle' && (
             <div className={`p-4 rounded-xl mb-4 animate-in slide-in-from-bottom-2 ${
                feedback === 'correct' ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
             }`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                   {feedback === 'correct' ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                   ) : (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                   )}
                   {feedback === 'correct' ? 'Correct!' : 'Incorrect'}
                </div>
                
                <div className="text-sm opacity-90">
                   {currentEx.explanation}
                </div>
                
                {feedback === 'wrong' && (
                   <div className="mt-2 text-sm font-bold">
                      Answer: {currentEx.correctAnswer}
                   </div>
                )}
             </div>
          )}

          <button
             onClick={feedback === 'idle' ? checkAnswer : nextExercise}
             disabled={feedback === 'idle' && !userAnswer && arrangedWords.length === 0}
             className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                ${feedback === 'idle' 
                   ? 'bg-german-black dark:bg-white text-white dark:text-black' 
                   : feedback === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }
             `}
          >
             {feedback === 'idle' ? 'Check Answer' : (currentExerciseIdx === selectedUnit.exercises.length - 1 ? 'Finish Unit' : 'Next Exercise')}
          </button>
       </div>

    </div>
  );
};

export default BookMode;
