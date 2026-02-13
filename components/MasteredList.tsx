import React, { useMemo } from 'react';
import { WordProgress } from '../types';
import { LOCAL_VOCAB } from '../data/vocab';

interface MasteredListProps {
  progress: Record<string, WordProgress>;
  onResetWord: (id: string) => void;
  onBack: () => void;
}

const MasteredList: React.FC<MasteredListProps> = ({ progress, onResetWord, onBack }) => {
  
  const masteredList = useMemo(() => {
    // 1. Get all IDs that are mastered
    const ids = (Object.values(progress) as WordProgress[])
        .filter(p => p.isMastered)
        .map(p => p.id);

    // 2. Map to display data (trying to find in LOCAL_VOCAB)
    return ids.map(id => {
        const found = LOCAL_VOCAB.find(w => w.german === id);
        return {
            id: id,
            german: id,
            english: found ? found.english : '(Custom/AI Word)',
            gender: found ? found.gender : '',
            type: found ? found.type : 'Word'
        };
    }).sort((a, b) => a.german.localeCompare(b.german));
  }, [progress]);

  const getGenderColor = (gender: string) => {
    switch (gender) {
      case 'der': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'die': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'das': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto px-4 pb-24 pt-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
           </svg>
        </button>
        <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mastered Words</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{masteredList.length} words learnt</p>
        </div>
      </div>

      {masteredList.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-gray-400">
             <div className="text-6xl mb-4 opacity-20">🏆</div>
             <p>No words mastered yet.</p>
             <p className="text-sm mt-2">Keep practicing in the Daily Session!</p>
          </div>
      ) : (
          <div className="flex-1 overflow-y-auto space-y-3 pb-8">
             {masteredList.map((item) => (
                 <div 
                   key={item.id} 
                   className="flex items-center justify-between p-4 bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm"
                 >
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold uppercase ${getGenderColor(item.gender)}`}>
                            {item.gender || item.type.substring(0,3)}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{item.german}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.english}</p>
                        </div>
                    </div>
                    
                    <button 
                       onClick={() => {
                           if(window.confirm(`Remove "${item.german}" from mastered list? It will appear in lessons again.`)) {
                               onResetWord(item.id);
                           }
                       }}
                       className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                       title="Delete / Reset Progress"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                       </svg>
                    </button>
                 </div>
             ))}
          </div>
      )}
    </div>
  );
};

export default MasteredList;