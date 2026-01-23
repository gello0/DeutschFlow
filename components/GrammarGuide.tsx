
import React, { useState } from 'react';

type Category = 'basics' | 'cases' | 'verbs' | 'adjectives' | 'prepositions';

const GrammarGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>('basics');
  const [revealedExample, setRevealedExample] = useState<string | null>(null);

  const toggleReveal = (id: string) => {
    setRevealedExample(revealedExample === id ? null : id);
  };

  const InteractiveExample = ({ id, question, answer, explanation }: { id: string, question: string, answer: string, explanation: string }) => (
    <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">{question}</p>
      
      {revealedExample === id ? (
        <div className="animate-in fade-in slide-in-from-top-1">
          <p className="text-lg font-bold text-german-gold mb-1">{answer}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{explanation}</p>
        </div>
      ) : (
        <button 
          onClick={() => toggleReveal(id)}
          className="text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400 hover:underline"
        >
          Reveal Answer
        </button>
      )}
    </div>
  );

  const TabButton = ({ id, label, icon }: { id: Category, label: string, icon: string }) => (
    <button
      onClick={() => { setActiveTab(id); setRevealedExample(null); }}
      className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
        activeTab === id 
        ? 'bg-german-black dark:bg-white text-white dark:text-black shadow-lg transform scale-105' 
        : 'bg-white dark:bg-[#252525] text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#333]'
      }`}
    >
      <span>{icon}</span>
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto px-4 pb-24 pt-4">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Grammar Guide</h2>
        <p className="text-gray-500 dark:text-gray-400">Rules & Interactive Examples</p>
      </div>

      {/* Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-3 mb-8 pb-2">
        <TabButton id="basics" label="Nouns" icon="🏷️" />
        <TabButton id="cases" label="Cases" icon="📦" />
        <TabButton id="verbs" label="Verbs" icon="⚡" />
        <TabButton id="adjectives" label="Adjectives" icon="🎨" />
        <TabButton id="prepositions" label="Prepositions" icon="📍" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        
        {/* === BASICS (GENDER) === */}
        {activeTab === 'basics' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-4 dark:text-white">The 3 Genders</h3>
              <p className="text-sm text-gray-500 mb-4">Every noun has a gender. It's not always logical, but there are clues.</p>
              
              <div className="grid gap-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold block">DER (Masculine)</span>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 list-disc list-inside">
                    <li>Male persons/animals</li>
                    <li>Days, Months, Seasons</li>
                    <li>Endings: <b>-er, -ig, -ismus, -ling</b></li>
                  </ul>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <span className="text-red-600 dark:text-red-400 font-bold block">DIE (Feminine)</span>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 list-disc list-inside">
                    <li>Female persons/animals</li>
                    <li>Numbers (die Eins)</li>
                    <li>Endings: <b>-ung, -heit, -keit, -tät, -schaft, -ie</b></li>
                  </ul>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <span className="text-green-600 dark:text-green-400 font-bold block">DAS (Neuter)</span>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 list-disc list-inside">
                    <li>Diminutives (<b>-chen, -lein</b>)</li>
                    <li>Verbs as nouns (das Essen)</li>
                    <li>Endings: <b>-um, -ment, -tum</b></li>
                  </ul>
                </div>
              </div>

              <InteractiveExample 
                id="ex-gender"
                question="Guess the article: ___ Bäckerei (Bakery)"
                answer="Die Bäckerei"
                explanation="Words ending in '-ei' are always feminine."
              />
            </div>
          </div>
        )}

        {/* === CASES === */}
        {activeTab === 'cases' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
             <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30 text-sm text-amber-800 dark:text-amber-300 mb-2">
                <b>Core Concept:</b> Cases show the role of a noun in the sentence. The article changes based on the role.
             </div>

             <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="py-2 dark:text-gray-300">Case</th>
                      <th className="py-2 text-blue-600">Masc</th>
                      <th className="py-2 text-red-600">Fem</th>
                      <th className="py-2 text-green-600">Neu</th>
                      <th className="py-2 text-gray-600">Plural</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-gray-800 dark:text-gray-300">
                    <tr>
                      <td className="py-3 font-bold">Nominativ<br/><span className="text-[10px] font-normal text-gray-400">Subject</span></td>
                      <td className="py-3">der</td>
                      <td className="py-3">die</td>
                      <td className="py-3">das</td>
                      <td className="py-3">die</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold">Akkusativ<br/><span className="text-[10px] font-normal text-gray-400">Direct Object</span></td>
                      <td className="py-3 font-bold text-german-gold bg-yellow-50 dark:bg-yellow-900/10 px-1 rounded">den</td>
                      <td className="py-3">die</td>
                      <td className="py-3">das</td>
                      <td className="py-3">die</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold">Dativ<br/><span className="text-[10px] font-normal text-gray-400">Indirect Obj</span></td>
                      <td className="py-3 font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/10 px-1 rounded">dem</td>
                      <td className="py-3 font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/10 px-1 rounded">der</td>
                      <td className="py-3 font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/10 px-1 rounded">dem</td>
                      <td className="py-3 font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/10 px-1 rounded">den</td>
                    </tr>
                  </tbody>
                </table>
             </div>

             <InteractiveExample 
                id="ex-case"
                question="I see the man. (Ich sehe ___ Mann.)"
                answer="den"
                explanation="'Sehen' triggers the Akkusativ case. 'Mann' is masculine. Der -> Den."
              />
          </div>
        )}

        {/* === VERBS === */}
        {activeTab === 'verbs' && (
           <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
              
              {/* Present Tense */}
              <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Present Tense (Präsens)</h3>
                <p className="text-sm text-gray-500 mb-4">The standard endings for regular verbs (e.g., <i>machen</i>).</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 dark:bg-[#2d2d2d] p-2 rounded dark:text-gray-300">ich mach<b>-e</b></div>
                  <div className="bg-gray-50 dark:bg-[#2d2d2d] p-2 rounded dark:text-gray-300">wir mach<b>-en</b></div>
                  <div className="bg-gray-50 dark:bg-[#2d2d2d] p-2 rounded dark:text-gray-300">du mach<b>-st</b></div>
                  <div className="bg-gray-50 dark:bg-[#2d2d2d] p-2 rounded dark:text-gray-300">ihr mach<b>-t</b></div>
                  <div className="bg-gray-50 dark:bg-[#2d2d2d] p-2 rounded dark:text-gray-300">er/sie/es mach<b>-t</b></div>
                  <div className="bg-gray-50 dark:bg-[#2d2d2d] p-2 rounded dark:text-gray-300">sie/Sie mach<b>-en</b></div>
                </div>
              </div>

              {/* Perfect Tense */}
              <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                 <h3 className="text-xl font-bold mb-2 dark:text-white">Past: The Perfect (Perfekt)</h3>
                 <p className="text-sm text-gray-500 mb-4">Used for spoken past tense. Logic: Helper Verb + ge-Word at the end.</p>
                 
                 <div className="flex flex-col gap-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                       <span className="font-bold text-blue-800 dark:text-blue-300 block mb-1">Movement / Change of State</span>
                       <span className="text-sm dark:text-gray-300">Use <b>sein</b> + participle</span>
                       <p className="text-xs italic mt-1 text-gray-500">"Ich <b>bin</b> nach Hause <b>gegangen</b>."</p>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                       <span className="font-bold text-gray-800 dark:text-gray-200 block mb-1">Everything else</span>
                       <span className="text-sm dark:text-gray-300">Use <b>haben</b> + participle</span>
                       <p className="text-xs italic mt-1 text-gray-500">"Ich <b>habe</b> Pizza <b>gegessen</b>."</p>
                    </div>
                 </div>
              </div>

              {/* Simple Past (Important ones) */}
              <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                 <h3 className="text-xl font-bold mb-2 dark:text-white">Simple Past (Präteritum)</h3>
                 <p className="text-sm text-gray-500 mb-4">In A1/A2, mainly used for 'sein' and 'haben'.</p>
                 <div className="grid grid-cols-2 gap-4 text-sm dark:text-gray-300">
                    <div>
                       <span className="block font-bold mb-1">sein (was)</span>
                       <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                          <li>ich <b>war</b></li>
                          <li>du <b>warst</b></li>
                          <li>er/sie <b>war</b></li>
                       </ul>
                    </div>
                    <div>
                       <span className="block font-bold mb-1">haben (had)</span>
                       <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                          <li>ich <b>hatte</b></li>
                          <li>du <b>hattest</b></li>
                          <li>er/sie <b>hatte</b></li>
                       </ul>
                    </div>
                 </div>
              </div>

              <InteractiveExample 
                id="ex-verb"
                question="Past tense: We bought a car. (Wir _____ ein Auto _____.)"
                answer="haben ... gekauft"
                explanation="'Kaufen' is not movement, so use 'haben'. Regular ge-word: ge-kauf-t."
              />
           </div>
        )}

        {/* === ADJECTIVES === */}
        {activeTab === 'adjectives' && (
           <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-100 dark:border-yellow-900/30 text-sm text-yellow-800 dark:text-yellow-300">
                 <b>Rule of Thumb:</b> If the article (der/die/das) shows the grammar, the adjective stays lazy (<b>-e</b>). If the article changes or is missing, the adjective does the work (<b>-en</b> or others).
              </div>

              <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                 <h3 className="font-bold text-gray-900 dark:text-white mb-4">After "Der/Die/Das" (Definite)</h3>
                 <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                       <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">Nominativ (Singular)</span>
                       <div className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded dark:text-gray-300">-e</div>
                       <p className="text-xs mt-1 text-gray-500">der gut<b>e</b> Mann</p>
                    </div>
                    <div>
                       <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">Plural (All cases)</span>
                       <div className="font-mono bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded dark:text-gray-300">-en</div>
                       <p className="text-xs mt-1 text-gray-500">die gut<b>en</b> Männer</p>
                    </div>
                    <div className="col-span-2">
                       <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">Dativ / Genitiv / Akkusativ(Masc)</span>
                       <div className="font-mono bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded dark:text-gray-300">-en</div>
                       <p className="text-xs mt-1 text-gray-500">dem gut<b>en</b> Mann / den gut<b>en</b> Mann</p>
                    </div>
                 </div>
              </div>

              <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                 <h3 className="font-bold text-gray-900 dark:text-white mb-4">After "Ein/Eine" (Indefinite)</h3>
                 <div className="grid grid-cols-3 gap-2 text-sm text-center">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <span className="block text-xs text-blue-600 mb-1">Masc</span>
                        <span className="font-bold dark:text-white">-er</span>
                        <div className="text-[10px] text-gray-500 mt-1">ein guter Mann</div>
                    </div>
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                        <span className="block text-xs text-red-600 mb-1">Fem</span>
                        <span className="font-bold dark:text-white">-e</span>
                        <div className="text-[10px] text-gray-500 mt-1">eine gute Frau</div>
                    </div>
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <span className="block text-xs text-green-600 mb-1">Neu</span>
                        <span className="font-bold dark:text-white">-es</span>
                        <div className="text-[10px] text-gray-500 mt-1">ein gutes Kind</div>
                    </div>
                 </div>
              </div>

              <InteractiveExample 
                id="ex-adj"
                question="I have a red car. (Ich habe ein _____ Auto.)"
                answer="rotES"
                explanation="Auto is Das (Neuter). In Akkusativ, 'ein' doesn't change, so the adjective needs to show the gender signal 's'."
              />
           </div>
        )}

        {/* === PREPOSITIONS === */}
        {activeTab === 'prepositions' && (
           <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
              
              <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                 <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Accusative Only</h3>
                 <p className="text-sm text-gray-500 mb-3">Always trigger 'den' (masc) or 'die/das' (unchanged).</p>
                 <div className="flex flex-wrap gap-2 font-mono text-sm text-gray-800 dark:text-gray-200">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">durch</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">für</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">gegen</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">ohne</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">um</span>
                 </div>
              </div>

              <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                 <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-2">Dative Only</h3>
                 <p className="text-sm text-gray-500 mb-3">Always trigger 'dem' (masc/neu) or 'der' (fem).</p>
                 <div className="flex flex-wrap gap-2 font-mono text-sm text-gray-800 dark:text-gray-200">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">aus</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bei</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">mit</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">nach</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">seit</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">von</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">zu</span>
                 </div>
              </div>

              <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Two-Way (Wechselpräpositionen)</h3>
                 <p className="text-sm text-gray-500 mb-4"><i>in, an, auf, unter, über, vor, hinter, neben, zwischen</i></p>
                 
                 <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                       <span className="block font-bold text-blue-800 dark:text-blue-300">Movement (Wohin?)</span>
                       <span className="text-xs uppercase tracking-wide text-gray-500">Akkusativ</span>
                       <p className="text-xs mt-2 italic dark:text-gray-400">"Ich gehe <b>in den</b> Park."</p>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                       <span className="block font-bold text-purple-800 dark:text-purple-300">Position (Wo?)</span>
                       <span className="text-xs uppercase tracking-wide text-gray-500">Dativ</span>
                       <p className="text-xs mt-2 italic dark:text-gray-400">"Ich bin <b>im</b> Park."</p>
                    </div>
                 </div>
              </div>

              <InteractiveExample 
                id="ex-prep"
                question="I am going to the bank. (Ich gehe _____ Bank.)"
                answer="zur (zu der)"
                explanation="'Zu' is always Dative. Bank is feminine (die). Die -> Der. Zu + der = zur."
              />
           </div>
        )}
      </div>
    </div>
  );
};

export default GrammarGuide;
