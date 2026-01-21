import React, { useState } from 'react';

const GrammarGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gender' | 'cases' | 'tips'>('gender');

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto px-4 pb-20 pt-4">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Grammar Guide</h2>
        <p className="text-gray-500">Essential rules for mastering German</p>
      </div>

      <div className="flex justify-center gap-2 mb-8 bg-white p-1 rounded-xl border border-gray-200 shadow-sm mx-auto">
        <button
          onClick={() => setActiveTab('gender')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'gender' ? 'bg-german-black text-white shadow' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          Der/Die/Das
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'cases' ? 'bg-german-black text-white shadow' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          The 4 Cases
        </button>
        <button
          onClick={() => setActiveTab('tips')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'tips' ? 'bg-german-black text-white shadow' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          Quick Tips
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {activeTab === 'gender' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded text-sm">DER (Masculine)</span>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex gap-2">🔹 Male persons/animals (<i>der Vater, der Löwe</i>)</li>
                <li className="flex gap-2">🔹 Days, Months, Seasons (<i>der Montag, der Sommer</i>)</li>
                <li className="flex gap-2">🔹 Words ending in <b>-er, -en, -el</b> (often, not always!)</li>
                <li className="flex gap-2">🔹 Car brands (<i>der BMW, der Audi</i>)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded text-sm">DIE (Feminine)</span>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex gap-2">🔸 Female persons/animals (<i>die Mutter, die Löwin</i>)</li>
                <li className="flex gap-2">🔸 Words ending in <b>-ung, -heit, -keit, -schaft, -tät</b> (<i>die Freiheit</i>)</li>
                <li className="flex gap-2">🔸 Words ending in <b>-e</b> (mostly) (<i>die Lampe, die Sonne</i>)</li>
                <li className="flex gap-2">🔸 Numbers (<i>die Eins, die Million</i>)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded text-sm">DAS (Neuter)</span>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex gap-2">🟢 Diminutives ending in <b>-chen, -lein</b> (<i>das Mädchen</i>)</li>
                <li className="flex gap-2">🟢 Verbs used as nouns (<i>das Essen, das Leben</i>)</li>
                <li className="flex gap-2">🟢 Colors (<i>das Blau</i>)</li>
                <li className="flex gap-2">🟢 Words ending in <b>-um, -ment</b> (<i>das Museum</i>)</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
             <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-sm text-amber-800 mb-6">
                Think of cases as "roles" a word plays in a sentence. The article changes based on the role.
             </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">1. Nominativ (Subject)</h3>
                <p className="text-sm text-gray-500 mb-4">The person or thing <b>doing</b> the action.</p>
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-sm">
                   <div className="bg-gray-100 p-2 rounded">der</div>
                   <div className="bg-gray-100 p-2 rounded">die</div>
                   <div className="bg-gray-100 p-2 rounded">das</div>
                </div>
                <p className="mt-3 text-sm italic text-gray-600">"<b>Der Mann</b> isst." (The man eats)</p>
             </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">2. Akkusativ (Direct Object)</h3>
                <p className="text-sm text-gray-500 mb-4">The thing being <b>acted upon</b>. Only masculine changes!</p>
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-sm">
                   <div className="bg-blue-100 text-blue-800 p-2 rounded font-bold border border-blue-200">den</div>
                   <div className="bg-gray-100 p-2 rounded">die</div>
                   <div className="bg-gray-100 p-2 rounded">das</div>
                </div>
                <p className="mt-3 text-sm italic text-gray-600">"Ich sehe <b>den Mann</b>." (I see the man)</p>
             </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">3. Dativ (Indirect Object)</h3>
                <p className="text-sm text-gray-500 mb-4">Receiving something, or static location.</p>
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-sm">
                   <div className="bg-purple-100 text-purple-800 p-2 rounded font-bold border border-purple-200">dem</div>
                   <div className="bg-purple-100 text-purple-800 p-2 rounded font-bold border border-purple-200">der</div>
                   <div className="bg-purple-100 text-purple-800 p-2 rounded font-bold border border-purple-200">dem</div>
                </div>
                <p className="mt-3 text-sm italic text-gray-600">"Ich gebe <b>dem Mann</b> ein Buch."</p>
             </div>
          </div>
        )}

        {activeTab === 'tips' && (
           <div className="space-y-4 animate-in slide-in-from-bottom-4 fade-in duration-300">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                 <div className="text-3xl">🚫</div>
                 <div>
                    <h4 className="font-bold text-gray-900">Don't translate word for word</h4>
                    <p className="text-sm text-gray-500 mt-1">German often puts the verb at the very end. "I have the ball kicked."</p>
                 </div>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                 <div className="text-3xl">🗣️</div>
                 <div>
                    <h4 className="font-bold text-gray-900">Pronounce every letter</h4>
                    <p className="text-sm text-gray-500 mt-1">Unlike English or French, German is phonetic. If it's written, say it (mostly).</p>
                 </div>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                 <div className="text-3xl">🎩</div>
                 <div>
                    <h4 className="font-bold text-gray-900">Capitalize Nouns</h4>
                    <p className="text-sm text-gray-500 mt-1">Every Noun is capitalized, not just names. Table, Chair, Love -> Tisch, Stuhl, Liebe.</p>
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default GrammarGuide;