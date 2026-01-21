import React, { useState, useEffect } from 'react';
import { DifficultyLevel, VerbDrill } from '../types';
import { generateVerbDrill, speakText } from '../services/geminiService';

interface ConjugationDrillProps {
  level: DifficultyLevel;
}

const ConjugationDrill: React.FC<ConjugationDrillProps> = ({ level }) => {
  const [drill, setDrill] = useState<VerbDrill | null>(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({
    ich: '',
    du: '',
    er_sie_es: '',
    wir: '',
    ihr: '',
    sie_Sie: ''
  });
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);

  const fetchDrill = async () => {
    setLoading(true);
    setChecked(false);
    setAnswers({ ich: '', du: '', er_sie_es: '', wir: '', ihr: '', sie_Sie: '' });
    setScore(null);
    const newDrill = await generateVerbDrill(level);
    setDrill(newDrill);
    setLoading(false);
  };

  useEffect(() => {
    fetchDrill();
  }, [level]);

  const handleInputChange = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const checkAnswers = () => {
    if (!drill) return;
    let correctCount = 0;
    const keys = Object.keys(drill.conjugations) as Array<keyof typeof drill.conjugations>;
    
    keys.forEach(key => {
      if (answers[key].trim().toLowerCase() === drill.conjugations[key].toLowerCase()) {
        correctCount++;
      }
    });

    setScore({ correct: correctCount, total: 6 });
    setChecked(true);
  };

  const getStatusColor = (key: keyof typeof drill.conjugations) => {
    if (!checked) return 'border-gray-200 focus:border-german-gold focus:ring-german-gold';
    const isCorrect = answers[key].trim().toLowerCase() === drill?.conjugations[key].toLowerCase();
    return isCorrect 
      ? 'border-green-500 bg-green-50 text-green-900' 
      : 'border-red-500 bg-red-50 text-red-900';
  };

  if (loading && !drill) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-german-gold border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500">Generating drill...</p>
      </div>
    );
  }

  if (!drill) return <div className="text-center p-8">Failed to load drill. <button onClick={fetchDrill} className="underline">Retry</button></div>;

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto px-4 pb-20">
      <div className="text-center mb-8 mt-4">
        <span className="inline-block px-3 py-1 bg-gray-200 rounded-full text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
          {drill.tense}
        </span>
        <h2 className="text-4xl font-bold text-gray-900 mb-1 flex items-center justify-center gap-3">
           {drill.infinitive}
           <button 
             onClick={() => speakText(drill.infinitive)}
             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
           >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0117 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
           </button>
        </h2>
        <p className="text-gray-500 italic text-lg">{drill.translation}</p>
        {drill.tip && !checked && (
          <div className="mt-4 inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-lg border border-blue-100">
             Tip: {drill.tip}
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {[
            { key: 'ich', label: 'ich' },
            { key: 'wir', label: 'wir' },
            { key: 'du', label: 'du' },
            { key: 'ihr', label: 'ihr' },
            { key: 'er_sie_es', label: 'er/sie/es' },
            { key: 'sie_Sie', label: 'sie/Sie' },
          ].map((item) => (
            <div key={item.key} className="relative">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                {item.label}
              </label>
              <input
                type="text"
                value={answers[item.key]}
                onChange={(e) => handleInputChange(item.key, e.target.value)}
                disabled={checked}
                autoComplete="off"
                className={`w-full text-lg p-3 rounded-xl border-2 outline-none transition-all ${getStatusColor(item.key as keyof typeof drill.conjugations)}`}
              />
              {checked && answers[item.key].trim().toLowerCase() !== drill.conjugations[item.key as keyof typeof drill.conjugations].toLowerCase() && (
                 <div className="absolute right-0 top-0 mt-8 mr-3 flex items-center">
                    <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded text-sm shadow-sm">
                      {drill.conjugations[item.key as keyof typeof drill.conjugations]}
                    </span>
                 </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
           {checked && score ? (
             <div className="flex flex-col">
               <span className="text-sm font-bold text-gray-400 uppercase">Score</span>
               <span className={`text-2xl font-bold ${score.correct === score.total ? 'text-green-600' : 'text-gray-900'}`}>
                 {score.correct} / {score.total}
               </span>
             </div>
           ) : (
             <div></div>
           )}

           <button 
             onClick={checked ? fetchDrill : checkAnswers}
             disabled={loading}
             className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center gap-2
               ${checked 
                 ? 'bg-german-black hover:bg-gray-800' 
                 : 'bg-german-gold text-black hover:bg-yellow-400'}`}
           >
             {loading ? 'Loading...' : checked ? 'Next Verb' : 'Check Answers'}
             {!loading && (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
               </svg>
             )}
           </button>
        </div>
      </div>
    </div>
  );
};

export default ConjugationDrill;