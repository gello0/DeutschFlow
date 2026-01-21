import React, { useState, useEffect, useRef } from 'react';
import { DifficultyLevel } from '../types';
import { getJournalSuggestions, correctJournalEntry } from '../services/geminiService';

interface JournalProps {
  level: DifficultyLevel;
}

interface JournalEntryData {
  id: string;
  text: string;
  date: Date;
}

interface CorrectionData {
    corrected: string;
    explanation: string;
}

const Journal: React.FC<JournalProps> = ({ level }) => {
  const [entry, setEntry] = useState('');
  const [suggestion, setSuggestion] = useState<{ text: string, type: 'prediction' | 'translation' | 'tip' } | null>(null);
  const [correctionData, setCorrectionData] = useState<CorrectionData | null>(null);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [history, setHistory] = useState<JournalEntryData[]>([]);
  const timeoutRef = useRef<number | null>(null);

  // Debounce user typing to fetch suggestions
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    if (entry.length < 3) {
        setSuggestion(null);
        return;
    }

    setLoadingSuggestion(true);
    timeoutRef.current = window.setTimeout(async () => {
      const result = await getJournalSuggestions(entry, level);
      setLoadingSuggestion(false);
      
      if (result.translation) {
        setSuggestion({ text: result.translation, type: 'translation' });
      } else if (result.nextWordPrediction) {
        setSuggestion({ text: result.nextWordPrediction, type: 'prediction' });
      } else if (result.suggestion) {
        setSuggestion({ text: result.suggestion, type: 'tip' });
      } else {
        setSuggestion(null);
      }
    }, 1000); // Increased debounce slightly for smoother typing

    return () => {
        if(timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [entry, level]);

  const handleApplySuggestion = () => {
    if (!suggestion) return;
    
    if (suggestion.type === 'translation') {
        const words = entry.trim().split(' ');
        words.pop();
        setEntry(words.join(' ') + ' ' + suggestion.text + ' ');
    } else if (suggestion.type === 'prediction') {
        setEntry(entry.trim() + ' ' + suggestion.text + ' ');
    }
    setSuggestion(null);
  };

  const handleCheckGrammar = async () => {
    if (!entry.trim()) return;
    setIsCorrecting(true);
    const result = await correctJournalEntry(entry);
    setCorrectionData(result);
    setIsCorrecting(false);
  };

  const handleSaveEntry = (textToSave: string) => {
    const newEntry: JournalEntryData = {
        id: Date.now().toString(),
        text: textToSave,
        date: new Date()
    };
    setHistory([newEntry, ...history]);
    setEntry('');
    setCorrectionData(null);
    setSuggestion(null);
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto px-4">
      {/* Header Section */}
      <div className="flex items-end justify-between mb-6 pt-2">
        <div>
           <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Dein Tagebuch</h2>
           <p className="text-gray-400 font-medium">
             {new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
           </p>
        </div>
        <div className="px-3 py-1 bg-gray-200 rounded-full text-xs font-semibold text-gray-600 uppercase tracking-wide">
          {level}
        </div>
      </div>

      {/* Main Editor Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col min-h-[300px] transition-all relative z-10">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Worüber denkst du nach? (Schreib einfach drauf los...)"
          className="flex-1 w-full p-8 text-xl text-gray-900 placeholder:text-gray-400 bg-transparent resize-none focus:outline-none leading-9 font-medium"
          spellCheck={false}
        />
        
        {/* Suggestion & Toolbar Area */}
        <div className="bg-gray-50/80 backdrop-blur-sm border-t border-gray-100 p-4 flex items-center justify-between">
           
           {/* Left: AI Suggestions */}
           <div className="flex-1 flex items-center h-8">
              {loadingSuggestion ? (
                 <div className="flex items-center gap-2 text-xs text-gray-400 font-medium animate-pulse">
                    <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Thinking...
                 </div>
              ) : suggestion ? (
                <button 
                  onClick={handleApplySuggestion}
                  className={`group flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer border
                  ${suggestion.type === 'translation' 
                    ? 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100' 
                    : suggestion.type === 'prediction'
                    ? 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                  }`}
                >
                  <span className="opacity-50 text-xs uppercase tracking-wider">
                     {suggestion.type === 'prediction' ? 'Next:' : suggestion.type === 'translation' ? 'DE:' : 'Tip:'}
                  </span>
                  {suggestion.text}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              ) : (
                <span className="text-gray-300 text-sm italic pl-2">Start typing for AI suggestions...</span>
              )}
           </div>

           {/* Right: Actions */}
           <div>
              <button 
                onClick={handleCheckGrammar}
                disabled={!entry.trim() || isCorrecting}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-sm transition-all
                  ${!entry.trim() 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : isCorrecting 
                    ? 'bg-gray-800 text-white cursor-wait'
                    : 'bg-black text-white hover:bg-gray-800 hover:scale-105 active:scale-95 shadow-lg'
                  }`}
              >
                {isCorrecting ? 'Checking...' : 'Check & Polish'}
                {!isCorrecting && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-german-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
           </div>
        </div>
      </div>

      {/* History List */}
      <div className="mt-12 pb-24">
         <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Previous Entries
         </h3>
         
         {history.length === 0 ? (
           <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400">No entries yet. Write something above!</p>
           </div>
         ) : (
           <div className="space-y-4">
             {history.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                   <div className="text-xs font-semibold text-german-gold uppercase tracking-wider mb-3">
                      {item.date.toLocaleDateString('de-DE')} • {item.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                   </div>
                   <p className="text-gray-800 leading-relaxed font-serif text-lg">{item.text}</p>
                </div>
             ))}
           </div>
         )}
      </div>

      {/* Correction Modal Overlay */}
      {correctionData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              
              <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
                 <h3 className="text-xl font-bold text-gray-900">Review & Polish</h3>
                 <button onClick={() => setCorrectionData(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 </button>
              </div>

              <div className="overflow-y-auto p-6 md:p-8 space-y-8">
                {/* Comparison Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-2 flex flex-col">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Original</label>
                      <div className="p-4 bg-gray-50 rounded-xl text-gray-600 leading-relaxed border border-gray-100 flex-grow whitespace-pre-wrap">
                         {entry}
                      </div>
                   </div>
                   <div className="space-y-2 flex flex-col">
                      <label className="text-xs font-bold text-green-600 uppercase tracking-wider flex items-center gap-1">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                         </svg>
                         Polished Version
                      </label>
                      <div className="p-4 bg-green-50/50 rounded-xl text-gray-900 font-medium leading-relaxed border border-green-100 flex-grow shadow-inner whitespace-pre-wrap">
                         {correctionData.corrected}
                      </div>
                   </div>
                </div>

                {/* Explanation Section */}
                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Analysis & Feedback
                    </h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {correctionData.explanation}
                    </p>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-4 flex-shrink-0">
                 <button 
                    onClick={() => setCorrectionData(null)}
                    className="flex-1 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
                 >
                    Keep Editing
                 </button>
                 <button 
                    onClick={() => handleSaveEntry(correctionData.corrected)}
                    className="flex-[2] py-3 rounded-xl font-bold text-black bg-german-gold hover:bg-yellow-400 shadow-lg shadow-yellow-400/20 transition-all transform active:scale-95"
                 >
                    Accept & Save to Journal
                 </button>
              </div>

           </div>
        </div>
      )}
    </div>
  );
};

export default Journal;