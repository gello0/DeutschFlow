import React, { useState, useEffect } from 'react';
import { DifficultyLevel } from '../types';
import { speakText } from '../services/geminiService';

interface NumberGameProps {
  level: DifficultyLevel;
}

// Client-side Number to German logic for instant performance
const convertNumberToGerman = (n: number): string => {
    if (n === 0) return 'null';
    if (n < 0) return 'minus ' + convertNumberToGerman(-n);

    const units = ['', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'];
    const teens = ['zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
    const tens = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];

    if (n < 10) return units[n];
    if (n < 20) return teens[n - 10];
    
    if (n < 100) {
        const unit = n % 10;
        const ten = Math.floor(n / 10);
        if (unit === 0) return tens[ten];
        // Special case: "einundzwanzig" instead of "einsundzwanzig"
        const unitStr = unit === 1 ? 'ein' : units[unit];
        return unitStr + 'und' + tens[ten];
    }

    if (n < 1000) {
        const hundred = Math.floor(n / 100);
        const remainder = n % 100;
        // "einhundert" is cleaner than "einshundert"
        const hundredStr = hundred === 1 ? 'einhundert' : units[hundred] + 'hundert';
        if (remainder === 0) return hundredStr;
        return hundredStr + convertNumberToGerman(remainder);
    }

    if (n < 1000000) {
        const thousand = Math.floor(n / 1000);
        const remainder = n % 1000;
        // "eintausend"
        let thousandStr = convertNumberToGerman(thousand) + 'tausend';
        // fix "einstausend" -> "eintausend"
        if (thousand === 1) thousandStr = 'eintausend';
        
        if (remainder === 0) return thousandStr;
        // format: "eintausend" + rest, but need to handle "eins" vs "ein" if complex? 
        // Simple append works for most cases here.
        return thousandStr + convertNumberToGerman(remainder);
    }

    return n.toString(); // Fallback for huge numbers
};

const NumberGame: React.FC<NumberGameProps> = ({ level }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [germanText, setGermanText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [streak, setStreak] = useState(0);

  const generateNumber = () => {
    let max = 100;
    if (level === DifficultyLevel.Intermediate) max = 1000;
    if (level === DifficultyLevel.Advanced) max = 10000;

    const newNum = Math.floor(Math.random() * max);
    setCurrentNumber(newNum);
    setGermanText(convertNumberToGerman(newNum));
    setUserInput('');
    setStatus('idle');
  };

  useEffect(() => {
    generateNumber();
  }, [level]);

  const checkAnswer = () => {
    const parsed = parseInt(userInput);
    if (!isNaN(parsed) && parsed === currentNumber) {
        setStatus('correct');
        setStreak(prev => prev + 1);
        setTimeout(generateNumber, 1000);
    } else {
        setStatus('wrong');
        setStreak(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        if (status === 'wrong') {
            generateNumber();
        } else {
            checkAnswer();
        }
    }
  };

  return (
    <div className="flex flex-col items-center h-full max-w-xl mx-auto px-4 pb-20 pt-8">
      
      {/* Header / Streak */}
      <div className="w-full flex justify-between items-center mb-12">
         <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Zahlenraten</h2>
            <span className="text-gray-400 text-sm">Number Guessing</span>
         </div>
         <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full border border-orange-100 dark:border-orange-800">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-orange-600 dark:text-orange-400">{streak}</span>
         </div>
      </div>

      {/* Main Card */}
      <div className="w-full bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 text-center flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
         
         <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Schreib die Zahl</p>
         
         {/* German Word Display */}
         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 leading-tight break-words w-full">
            {germanText}
         </h1>

         {/* Audio Button */}
         <button 
           onClick={() => speakText(germanText)}
           className="mb-8 p-4 rounded-full bg-german-gold/10 hover:bg-german-gold/20 text-yellow-700 dark:text-yellow-500 transition-colors shadow-sm active:scale-95"
         >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
         </button>

         {/* Input Area */}
         <div className="relative w-full max-w-xs mx-auto">
            <input 
              type="number" 
              inputMode="numeric"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="123"
              className={`w-full text-center text-3xl font-bold py-4 rounded-2xl border-2 outline-none transition-all shadow-sm
                 ${status === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-900 dark:text-green-300' 
                 : status === 'wrong' ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-900 dark:text-red-300' 
                 : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2d2d2d] text-gray-900 dark:text-white focus:border-german-gold focus:ring-4 focus:ring-german-gold/20'}`}
              autoFocus
            />
            {status === 'wrong' && (
                <div className="absolute top-full left-0 w-full text-center mt-2 animate-in slide-in-from-top-2">
                    <span className="text-red-500 dark:text-red-400 font-bold">Answer: {currentNumber}</span>
                </div>
            )}
         </div>
      </div>

      {/* Action Button */}
      <button 
         onClick={status === 'idle' ? checkAnswer : generateNumber}
         className={`mt-8 w-full max-w-xs py-4 rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95
            ${status === 'idle' ? 'bg-german-black dark:bg-gray-700 text-white hover:bg-gray-800' 
            : status === 'correct' ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'}`}
      >
         {status === 'idle' ? 'Check' : status === 'correct' ? 'Great!' : 'Next'}
      </button>

    </div>
  );
};

export default NumberGame;