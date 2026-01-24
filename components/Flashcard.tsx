
import React, { useState, useEffect } from 'react';
import { VocabWord } from '../types';
import { speakText } from '../services/geminiService';

interface FlashcardProps {
  word: VocabWord;
  onResult: (difficulty: 'hard' | 'easy') => void;
  isFavorite: boolean;
  onToggleFavorite: (word: VocabWord) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ word, onResult, isFavorite, onToggleFavorite }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Ensure card is reset if word changes externally
  useEffect(() => {
    setIsFlipped(false);
  }, [word]);

  const handleAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    speakText(text);
  };

  const handleNext = (e: React.MouseEvent, difficulty: 'hard' | 'easy') => {
    e.stopPropagation();
    if (isAnimating) return;

    setIsAnimating(true);
    setIsFlipped(false); // Start flipping back to front

    // The CSS transition is 0.6s (600ms).
    // We wait 300ms (halfway, when card is at 90deg and invisible) to swap the data.
    setTimeout(() => {
      onResult(difficulty);
      
      // Allow interaction again after the full flip completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  const getGenderColor = (gender: string) => {
    switch (gender) {
      case 'der': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30';
      case 'die': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
      case 'das': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800';
    }
  };

  return (
    <div 
      className="w-full max-w-sm h-96 cursor-pointer card-perspective group" 
      onClick={() => !isAnimating && setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full text-center transition-transform transform-style-3d card-inner ${isFlipped ? 'flipped' : ''}`}>
        
        {/* Front of Card */}
        <div className="absolute w-full h-full bg-white dark:bg-[#1e1e1e] dark:border-gray-800 rounded-2xl shadow-xl flex flex-col justify-center items-center p-6 border border-gray-100 card-front backface-hidden">
          {/* Favorite Button */}
          <button
             onClick={(e) => { e.stopPropagation(); onToggleFavorite(word); }}
             className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-colors z-10"
          >
             {isFavorite ? (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 fill-current" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
               </svg>
             ) : (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               </svg>
             )}
          </button>

          <span className={`text-xs uppercase tracking-widest mb-4 px-2 py-1 rounded ${getGenderColor(word.gender)}`}>
            {word.type}
          </span>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {word.gender && <span className="text-2xl font-normal text-gray-400 dark:text-gray-500 mr-2">{word.gender}</span>}
            {word.german}
          </h2>
          <p className="text-gray-400 dark:text-gray-500 mt-4 text-sm">(Tap to flip)</p>
          
          <button 
            onClick={(e) => handleAudio(e, word.german)}
            className="absolute bottom-6 right-6 p-3 rounded-full bg-german-gold/10 hover:bg-german-gold/30 text-yellow-700 dark:text-yellow-500 transition-colors"
            title="Listen to word"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
        </div>

        {/* Back of Card */}
        <div className="absolute w-full h-full bg-slate-900 dark:bg-black text-white rounded-2xl shadow-xl flex flex-col justify-center items-center p-6 card-back backface-hidden border dark:border-gray-800">
          <h3 className="text-2xl font-bold text-german-gold mb-6">{word.english}</h3>
          
          <div className="w-full text-left bg-white/10 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Example:</p>
            <p className="text-lg italic mb-2">"{word.exampleGerman}"</p>
            <p className="text-sm text-gray-300 border-t border-gray-600 pt-2">{word.exampleEnglish}</p>
          </div>

          {/* Controls Container */}
          <div className="absolute bottom-6 w-full px-6 flex justify-between items-center">
             <div className="flex gap-3 flex-1 mr-4">
                <button 
                  onClick={(e) => handleNext(e, 'hard')}
                  className="flex-1 py-3 px-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 text-sm font-semibold transition-colors border border-red-500/30"
                  disabled={isAnimating}
                >
                  Hard
                </button>
                <button 
                  onClick={(e) => handleNext(e, 'easy')}
                  className="flex-1 py-3 px-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-300 text-sm font-semibold transition-colors border border-green-500/30"
                  disabled={isAnimating}
                >
                  Easy
                </button>
             </div>
             
             {/* Audio Button - Positioned to match front card */}
             <button 
                onClick={(e) => { e.stopPropagation(); handleAudio(e, word.exampleGerman); }}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex-none"
                title="Play example sentence"
                aria-label="Play example sentence"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
