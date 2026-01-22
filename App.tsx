
import React, { useState, useEffect } from 'react';
import { AppView, DifficultyLevel, VocabWord } from './types';
import { generateVocabulary } from './services/geminiService';
import { LOCAL_VOCAB } from './data/fallbackData';
import Flashcard from './components/Flashcard';
import Journal from './components/Journal';
import ConjugationDrill from './components/ConjugationDrill';
import NumberGame from './components/NumberGame';
import GrammarGuide from './components/GrammarGuide';

const SESSION_SIZE = 15; // Learning Chunk Size

// Extract unique categories from data for the topic selector
const AVAILABLE_CATEGORIES = Array.from(new Set(LOCAL_VOCAB.map(w => w.category))).filter(c => c !== 'Grammar' && c !== 'Basics');

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.Vocab);
  const [level, setLevel] = useState<DifficultyLevel>(DifficultyLevel.Beginner);
  const [words, setWords] = useState<VocabWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [loadingWords, setLoadingWords] = useState(false);
  const [learnMode, setLearnMode] = useState<'menu' | 'flashcards' | 'grammar' | 'favorites'>('menu');
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  
  // Favorites
  const [favorites, setFavorites] = useState<VocabWord[]>([]);

  // Adaptive Learning State
  const [correctStreak, setCorrectStreak] = useState(0);
  const [wrongStreak, setWrongStreak] = useState(0);

  // Helper: Get a fresh batch of words based on level AND optional category
  const getFreshBatch = (lvl: DifficultyLevel, category?: string): VocabWord[] => {
    // Filter by level first
    let pool = LOCAL_VOCAB.filter(w => {
        // Strict level filtering for Beginner to ensure A1/A2 compliance
        if (lvl === DifficultyLevel.Beginner) return w.level === DifficultyLevel.Beginner; 
        if (lvl === DifficultyLevel.Intermediate) return w.level === DifficultyLevel.Intermediate;
        return w.level === DifficultyLevel.Advanced;
    });

    // Apply Category Filter if exists
    if (category) {
        pool = pool.filter(w => w.category === category);
    }

    // Shuffle
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    
    // Take chunk
    // If specific topic selected, we might want slightly more, but 15 is good for retention.
    return shuffled.slice(0, SESSION_SIZE);
  };

  // Load from LocalStorage on Mount
  useEffect(() => {
    try {
        const savedWords = localStorage.getItem('vocab_words');
        const savedIndex = localStorage.getItem('vocab_index');
        const savedFavorites = localStorage.getItem('vocab_favorites');
        const savedLevel = localStorage.getItem('vocab_level');

        if (savedLevel) {
            setLevel(savedLevel as DifficultyLevel);
        }

        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }

        let loadedWords: VocabWord[] = [];

        if (savedWords) {
            const parsed = JSON.parse(savedWords);
            if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].german) {
                loadedWords = parsed;
            }
        }

        // If no valid save found, start fresh
        if (loadedWords.length === 0 || (savedIndex && parseInt(savedIndex) >= loadedWords.length)) {
            loadedWords = getFreshBatch(savedLevel as DifficultyLevel || DifficultyLevel.Beginner);
            setCurrentWordIndex(0);
        } else {
            setWords(loadedWords);
            if (savedIndex) setCurrentWordIndex(parseInt(savedIndex, 10));
        }
        
        // Ensure state is set
        setWords(loadedWords);

    } catch (e) {
        console.error("Storage corrupted, resetting", e);
        localStorage.clear();
        const fresh = getFreshBatch(DifficultyLevel.Beginner);
        setWords(fresh);
        setCurrentWordIndex(0);
    }
  }, []);

  // Persist State
  useEffect(() => {
    if (words.length > 0) {
      localStorage.setItem('vocab_words', JSON.stringify(words));
      localStorage.setItem('vocab_index', currentWordIndex.toString());
      localStorage.setItem('vocab_level', level);
    }
  }, [words, currentWordIndex, level]);

  useEffect(() => {
      localStorage.setItem('vocab_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (word: VocabWord) => {
     setFavorites(prev => {
        const exists = prev.some(w => w.german === word.german);
        if (exists) {
            return prev.filter(w => w.german !== word.german);
        } else {
            return [...prev, word];
        }
     });
  };

  const startNewSession = async (category?: string) => {
      setLoadingWords(true);
      if (category) setCurrentTopic(category);
      else setCurrentTopic(null);

      // Using the service logic (now static)
      // Small delay handled by service promise, but we can do a UI set here
      const newBatch = await generateVocabulary(level, category);
      
      setWords(newBatch);
      setCurrentWordIndex(0);
      setCorrectStreak(0);
      setWrongStreak(0);
      setLearnMode('flashcards');
      setLoadingWords(false);
  };

  const handleCardResult = (difficulty: 'hard' | 'easy') => {
    // Only fetch more/track metrics if NOT in favorites mode
    if (learnMode !== 'favorites') {
        if (difficulty === 'easy') {
            setCorrectStreak(prev => prev + 1);
            setWrongStreak(0);
        } else {
            setWrongStreak(prev => prev + 1);
            setCorrectStreak(0);
        }
    }

    // Move to next word
    const nextIndex = currentWordIndex + 1;
    setCurrentWordIndex(nextIndex);
  };

  const renderContent = () => {
    if (currentView === AppView.Vocab) {
      if (learnMode === 'menu') {
        return (
          <div className="flex flex-col items-center justify-center min-h-full max-w-2xl mx-auto px-6 pb-20 pt-8">
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">Learning Hub</h1>
             <p className="text-gray-500 dark:text-gray-400 mb-8 text-center">Your A1/A2 Path</p>
             
             <div className="grid gap-4 w-full max-w-md">
                {/* 1. MAIN ACTIONS */}
                <button 
                  onClick={() => startNewSession()}
                  className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl shadow-lg border border-gray-700 flex items-center gap-4 hover:scale-[1.02] transition-transform text-left group"
                >
                   <div className="w-12 h-12 rounded-full bg-german-gold text-black flex items-center justify-center font-bold text-xl">
                      🚀
                   </div>
                   <div className="flex-1">
                      <h3 className="font-bold text-white text-lg">Daily Session</h3>
                      <p className="text-sm text-gray-300">Smart Mix (15 words)</p>
                   </div>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                   </svg>
                </button>

                <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => {
                          if(favorites.length > 0) {
                              setCurrentWordIndex(0);
                              setLearnMode('favorites');
                          }
                      }}
                      className={`bg-white dark:bg-[#1e1e1e] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-2 text-center transition-all ${favorites.length === 0 ? 'opacity-60' : 'hover:border-red-400'}`}
                    >
                       <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
                          ❤️
                       </div>
                       <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm">Favorites</h3>
                          <p className="text-xs text-gray-400">{favorites.length} words</p>
                       </div>
                    </button>

                    <button 
                      onClick={() => startNewSession('Time')}
                      className="bg-white dark:bg-[#1e1e1e] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-2 text-center transition-all hover:border-blue-400 group"
                    >
                       <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          📅
                       </div>
                       <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm">Days & Months</h3>
                          <p className="text-xs text-gray-400">Time & Dates</p>
                       </div>
                    </button>
                </div>

                {/* 2. GRAMMAR & DRILLS ROW */}
                <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                    <button 
                      onClick={() => setLearnMode('grammar')}
                      className="flex-shrink-0 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800 px-4 py-3 rounded-xl flex items-center gap-2 text-purple-700 dark:text-purple-300 text-sm font-bold w-1/2 justify-center"
                    >
                       📚 Grammar Guide
                    </button>
                    <button 
                      onClick={() => setCurrentView(AppView.Drills)}
                      className="flex-shrink-0 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800 px-4 py-3 rounded-xl flex items-center gap-2 text-green-700 dark:text-green-300 text-sm font-bold w-1/2 justify-center"
                    >
                       🔄 Verb Drills
                    </button>
                </div>

                {/* 3. STUDY BY TOPIC */}
                <div className="mt-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Study by Topic</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {AVAILABLE_CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => startNewSession(cat)}
                                className="bg-white dark:bg-[#252525] p-3 rounded-xl border border-gray-100 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2d2d2d] hover:border-gray-300 dark:hover:border-gray-600 transition-colors text-left truncate"
                            >
                                {cat === 'Time' ? 'Time & Dates' : cat}
                            </button>
                        ))}
                    </div>
                </div>

             </div>
          </div>
        );
      }

      if (learnMode === 'grammar') {
          return (
             <div className="h-full relative">
                 <button 
                     onClick={() => setLearnMode('menu')}
                     className="absolute top-0 left-4 z-10 flex items-center gap-1 text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm font-medium p-2"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                     </svg>
                     Back to Menu
                  </button>
                 <GrammarGuide />
             </div>
          );
      }

      // Flashcards View (Standard or Favorites)
      const activeList = learnMode === 'favorites' ? favorites : words;
      
      // Safety check: if in favorites mode but list empty, go back
      if (learnMode === 'favorites' && favorites.length === 0) {
          setLearnMode('menu');
      }

      // Progress calculation
      const progress = Math.min(((currentWordIndex) / activeList.length) * 100, 100);

      return (
        <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto px-4 pb-20 relative">
          <button 
             onClick={() => setLearnMode('menu')}
             className="absolute top-0 left-4 flex items-center gap-1 text-gray-400 hover:text-black dark:hover:text-white transition-colors text-sm font-medium p-2"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
             </svg>
             {learnMode === 'favorites' ? 'Back to Menu' : 'Change Topic'}
          </button>

          <div className="mb-8 text-center mt-12 w-full">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {learnMode === 'favorites' ? 'My Favorites' : currentTopic === 'Time' ? 'Time & Dates' : currentTopic ? currentTopic : 'Daily Session'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                 {learnMode === 'favorites' 
                    ? `Reviewing ${activeList.length} saved words`
                    : `Focus: ${level} (A1/A2)`}
            </p>
            
            {/* Progress Bar */}
            <div className="w-full max-w-xs mx-auto h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mt-6 overflow-hidden">
                <div 
                    className="h-full bg-german-gold transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
                {Math.min(currentWordIndex + 1, activeList.length)} / {activeList.length}
            </div>
          </div>
          
          {activeList.length > 0 && currentWordIndex < activeList.length ? (
            <Flashcard 
              word={activeList[currentWordIndex]} 
              onResult={handleCardResult} 
              isFavorite={favorites.some(f => f.german === activeList[currentWordIndex].german)}
              onToggleFavorite={toggleFavorite}
            />
          ) : learnMode !== 'favorites' && loadingWords ? (
            <div className="flex flex-col items-center justify-center h-96 w-full max-w-sm bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
               <div className="w-12 h-12 border-4 border-german-gold border-t-transparent rounded-full animate-spin mb-4"></div>
               <p className="text-gray-500 dark:text-gray-400 animate-pulse">Loading Session...</p>
            </div>
          ) : (
             <div className="text-center bg-white dark:bg-[#1e1e1e] p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 max-w-sm w-full">
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Session Complete! 🎉</h3>
               <p className="text-gray-500 dark:text-gray-400 mb-6">You've practiced {activeList.length} words.</p>
               
               <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                       <span className="block text-xl font-bold text-green-600 dark:text-green-400">{correctStreak}</span>
                       <span className="text-xs text-gray-500 dark:text-gray-400">Easy</span>
                   </div>
                   <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                       <span className="block text-xl font-bold text-red-600 dark:text-red-400">{wrongStreak}</span>
                       <span className="text-xs text-gray-500 dark:text-gray-400">Hard</span>
                   </div>
               </div>

               <div className="flex flex-col gap-3">
                   <button 
                      onClick={() => {
                          if(learnMode === 'favorites') {
                              setCurrentWordIndex(0); // Restart favorites
                          } else {
                              startNewSession(currentTopic || undefined);
                          }
                      }} 
                      className="px-4 py-3 bg-german-gold text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-400/20"
                   >
                      {learnMode === 'favorites' ? 'Review Again' : 'Start New Session'}
                   </button>
                   <button 
                      onClick={() => setLearnMode('menu')}
                      className="px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                   >
                      Back to Menu
                   </button>
               </div>
             </div>
          )}
        </div>
      );
    }

    if (currentView === AppView.Journal) {
        return (
            <div className="h-full pt-4 pb-24">
                <Journal level={level} />
            </div>
        );
    }

    if (currentView === AppView.Drills) {
      return (
        <div className="h-full pt-4 pb-24">
          <ConjugationDrill level={level} />
        </div>
      );
    }

    if (currentView === AppView.Numbers) {
      return (
        <div className="h-full pt-4 pb-24">
          <NumberGame level={level} />
        </div>
      );
    }

    return (
       <div className="max-w-md mx-auto px-4 py-8 pb-24">
         <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Settings</h1>
         <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Level</label>
           <div className="space-y-2">
             {Object.values(DifficultyLevel).map((lvl) => (
               <button
                 key={lvl}
                 onClick={() => { 
                     setLevel(lvl); 
                     startNewSession();
                 }}
                 className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                   level === lvl 
                   ? 'border-german-gold bg-yellow-50 dark:bg-yellow-900/20 text-black dark:text-white ring-1 ring-german-gold' 
                   : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                 }`}
               >
                 {lvl}
               </button>
             ))}
           </div>
           
           <div className="mt-8">
               <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Statistics</h3>
               <div className="grid grid-cols-2 gap-4">
                   <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
                       <span className="block text-2xl font-bold text-green-600 dark:text-green-400">{correctStreak}</span>
                       <span className="text-xs text-gray-500 dark:text-gray-400">Correct Streak</span>
                   </div>
                   <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center">
                       <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400">{LOCAL_VOCAB.length}</span>
                       <span className="text-xs text-gray-500 dark:text-gray-400">Total Database Words</span>
                   </div>
               </div>
           </div>
           
           <div className="mt-8">
              <button 
                onClick={() => {
                   localStorage.clear();
                   window.location.reload();
                }}
                className="w-full text-center text-red-500 hover:text-red-400 text-sm py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                 Reset All Progress
              </button>
           </div>

           <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
             <p className="text-xs text-gray-400 text-center">DeutschFlow v2.0 • Offline Mode</p>
           </div>
         </div>
       </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] font-sans transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-[#1e1e1e] shadow-sm border-b dark:border-[#333] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-black via-red-600 to-german-gold flex items-center justify-center text-white font-bold text-xs shadow-md">
              DE
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">DeutschFlow</span>
          </div>
          <div className="flex gap-4 items-center">
             <div className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-[#333] rounded-md text-gray-600 dark:text-gray-300 hidden sm:block">
                {level.split(' ')[0]}
             </div>
             <button 
               onClick={() => setCurrentView(AppView.Settings)}
               className={`p-2 rounded-full transition-colors ${currentView === AppView.Settings ? 'bg-gray-100 dark:bg-[#333] text-black dark:text-white' : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-[#252525]'}`}
             >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-6 h-[calc(100vh-64px)] overflow-y-auto no-scrollbar">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1e1e1e] border-t border-gray-200 dark:border-[#333] py-3 z-50 safe-area-pb">
        <div className="max-w-md mx-auto flex justify-around items-center px-4">
          <button 
            onClick={() => {
                setCurrentView(AppView.Vocab);
                if(currentView === AppView.Vocab) setLearnMode('menu');
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${currentView === AppView.Vocab ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-[10px] font-medium">Learn</span>
          </button>
          
          <button 
            onClick={() => setCurrentView(AppView.Drills)}
            className={`flex flex-col items-center gap-1 transition-colors ${currentView === AppView.Drills ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className="text-[10px] font-medium">Verbs</span>
          </button>

          <button 
            onClick={() => setCurrentView(AppView.Numbers)}
            className={`flex flex-col items-center gap-1 transition-colors ${currentView === AppView.Numbers ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            <span className="text-[10px] font-medium">Numbers</span>
          </button>

           <button 
            onClick={() => setCurrentView(AppView.Journal)}
            className={`flex flex-col items-center gap-1 transition-colors ${currentView === AppView.Journal ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="text-[10px] font-medium">Journal</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
