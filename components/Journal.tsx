
import React, { useState } from 'react';
import { DifficultyLevel } from '../types';

interface JournalProps {
  level: DifficultyLevel;
}

interface JournalEntryData {
  id: string;
  text: string;
  date: Date;
}

const Journal: React.FC<JournalProps> = ({ level }) => {
  const [entry, setEntry] = useState('');
  const [history, setHistory] = useState<JournalEntryData[]>([]);

  // Load from local storage on mount (optional enhancement, but keeping simple for now)
  // In a real app we'd load `history` from localStorage here.

  const handleSaveEntry = () => {
    if (!entry.trim()) return;
    const newEntry: JournalEntryData = {
        id: Date.now().toString(),
        text: entry,
        date: new Date()
    };
    setHistory([newEntry, ...history]);
    setEntry('');
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto px-4">
      {/* Header Section */}
      <div className="flex items-end justify-between mb-6 pt-2">
        <div>
           <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dein Tagebuch</h2>
           <p className="text-gray-400 dark:text-gray-500 font-medium">
             {new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
           </p>
        </div>
        <div className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
          {level}
        </div>
      </div>

      {/* Main Editor Card */}
      <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col min-h-[300px] transition-all relative z-10">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Worüber denkst du nach? (Schreib einfach drauf los...)"
          className="flex-1 w-full p-8 text-xl text-gray-900 dark:text-gray-100 placeholder:text-gray-400 bg-transparent resize-none focus:outline-none leading-9 font-medium"
          spellCheck={false}
        />
        
        {/* Toolbar Area */}
        <div className="bg-gray-50/80 dark:bg-[#252525] backdrop-blur-sm border-t border-gray-100 dark:border-gray-800 p-4 flex items-center justify-end">
           <button 
                onClick={handleSaveEntry}
                disabled={!entry.trim()}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-sm transition-all
                  ${!entry.trim() 
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                    : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-105 active:scale-95 shadow-lg'
                  }`}
              >
                Save Entry
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-german-gold dark:text-black" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
           </button>
        </div>
      </div>

      {/* History List */}
      <div className="mt-12 pb-24">
         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Previous Entries
         </h3>
         
         {history.length === 0 ? (
           <div className="text-center py-12 bg-white dark:bg-[#1e1e1e] rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
              <p className="text-gray-400">No entries yet. Write something above!</p>
           </div>
         ) : (
           <div className="space-y-4">
             {history.map((item) => (
                <div key={item.id} className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                   <div className="text-xs font-semibold text-german-gold uppercase tracking-wider mb-3">
                      {item.date.toLocaleDateString('de-DE')} • {item.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                   </div>
                   <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-serif text-lg">{item.text}</p>
                </div>
             ))}
           </div>
         )}
      </div>
    </div>
  );
};

export default Journal;
