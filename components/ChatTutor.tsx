import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, DifficultyLevel, Scenario } from '../types';
import { sendMessageToTutor, speakText } from '../services/geminiService';

interface ChatTutorProps {
  level: DifficultyLevel;
}

const PREDEFINED_SCENARIOS: Scenario[] = [
  {
    id: 'bakery',
    title: 'The Bakery (Bäckerei)',
    emoji: '🥐',
    description: 'Order fresh bread rolls and coffee.',
    initialMessage: 'Guten Morgen! Der Nächste, bitte! Was darf es sein?',
    systemPrompt: 'Roleplay: You are a busy baker in a German bakery ("Bäckerei"). You are polite but efficient. The user is a customer ordering breakfast (Brötchen, Coffee, Cake). Ask "Sonst noch etwas?" before finishing. Keep responses short.'
  },
  {
    id: 'restaurant',
    title: 'Restaurant Order',
    emoji: '🍽️',
    description: 'Order dinner and ask for the bill.',
    initialMessage: 'Guten Abend! Haben Sie reserviert? Hier ist die Speisekarte.',
    systemPrompt: 'Roleplay: You are a waiter in a German restaurant. Be formal ("Sie"). Ask for drinks first, then food. Ask if everything tasted good ("Hat es geschmeckt?"). Finally handle the payment.'
  },
  {
    id: 'train',
    title: 'Train Station',
    emoji: '🚆',
    description: 'Buy a ticket or find your platform.',
    initialMessage: 'Hallo, DB Information. Wohin möchten Sie reisen?',
    systemPrompt: 'Roleplay: You are a Deutsche Bahn employee at the information desk. The user wants to buy a ticket, reserve a seat, or find a platform. Be helpful and professional.'
  },
  {
    id: 'doctor',
    title: 'At the Doctor',
    emoji: '🩺',
    description: 'Describe symptoms and get an appointment.',
    initialMessage: 'Praxis Dr. Müller, guten Tag. Was kann ich für Sie tun?',
    systemPrompt: 'Roleplay: You are a receptionist at a Doctor\'s office. The user is calling to make an appointment or describe pain. Ask for their insurance card or symptoms. Be empathetic but professional.'
  },
  {
    id: 'shopping',
    title: 'Clothing Store',
    emoji: '👕',
    description: 'Ask for a different size or color.',
    initialMessage: 'Hallo! Kann ich Ihnen helfen, oder schauen Sie nur?',
    systemPrompt: 'Roleplay: You are a sales assistant in a clothing store ("Kleidungsgeschäft"). The user looks for a specific size, color, or item. Give advice on style.'
  },
  {
    id: 'party',
    title: 'Small Talk',
    emoji: '👋',
    description: 'Introduce yourself to a stranger.',
    initialMessage: 'Hi! Ich glaube, wir kennen uns noch nicht. Ich bin Thomas.',
    systemPrompt: 'Roleplay: You are Thomas, a friendly person at a party in Berlin. You are meeting the user for the first time. Ask about their hobbies, job, and origin. Be casual ("du").'
  }
];

const ChatTutor: React.FC<ChatTutorProps> = ({ level }) => {
  const [mode, setMode] = useState<'menu' | 'chat'>('menu');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat
  const startChat = (scenario: Scenario | null) => {
    setSelectedScenario(scenario);
    setMode('chat');
    setInput('');
    
    if (scenario) {
      setMessages([{ 
        id: '1', 
        role: 'model', 
        text: scenario.initialMessage 
      }]);
    } else {
      setMessages([{ 
        id: '1', 
        role: 'model', 
        text: `Hallo! Wie geht es dir heute? (Free Chat - ${level})` 
      }]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, mode]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await sendMessageToTutor(
        messages, 
        input, 
        level, 
        selectedScenario ? selectedScenario.systemPrompt : undefined
    );
    
    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response.text,
      correction: response.correction
    };

    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
    
    // Auto-speak the response for immersion
    speakText(response.text);
  };

  if (mode === 'menu') {
      return (
          <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-german-black text-white p-4 text-center z-10">
                <h2 className="font-semibold text-lg">AI Roleplay Tutor</h2>
                <p className="text-xs text-gray-400">Choose a situation to practice</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <div className="grid gap-4">
                    <button
                    onClick={() => startChat(null)}
                    className="p-4 rounded-xl border-2 border-dashed border-gray-300 bg-white text-left transition-all hover:border-german-gold hover:bg-yellow-50 flex items-center gap-4 group"
                    >
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">💬</div>
                        <div>
                            <h4 className="font-bold text-gray-900">Free Chat</h4>
                            <p className="text-sm text-gray-500">Just talk about anything.</p>
                        </div>
                    </button>

                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-4 mb-2">Scenarios</div>

                    {PREDEFINED_SCENARIOS.map(scenario => (
                        <button
                        key={scenario.id}
                        onClick={() => startChat(scenario)}
                        className="p-4 rounded-xl border border-gray-200 bg-white text-left transition-all hover:border-blue-500 hover:shadow-md flex items-center gap-4 group"
                        >
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{scenario.emoji}</div>
                            <div>
                                <h4 className="font-bold text-gray-900">{scenario.title}</h4>
                                <p className="text-sm text-gray-500">{scenario.description}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-german-black text-white p-4 flex justify-between items-center z-10 shadow-md">
        <div className="flex items-center gap-3">
           <button 
             onClick={() => setMode('menu')} 
             className="p-1 rounded-full hover:bg-white/20 transition-colors"
             title="Back to scenarios"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
             </svg>
           </button>
           <div className="flex flex-col">
               <h2 className="font-semibold text-sm md:text-base leading-tight">
                   {selectedScenario ? selectedScenario.title : 'Free Chat'}
               </h2>
               <span className="text-[10px] text-gray-400 flex items-center gap-1">
                   <span className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-yellow-400' : 'bg-green-500'}`}></span>
                   {loading ? 'Thinking...' : 'Online'}
               </span>
           </div>
        </div>
        <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300 border border-white/10">{level.split(' ')[0]}</span>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar bg-gray-50">
        {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
            <div 
                className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm md:text-base relative group
                ${msg.role === 'user' 
                    ? 'bg-german-gold text-black rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}`}
            >
                {msg.text}
                
                {msg.role === 'model' && (
                <button 
                    onClick={() => speakText(msg.text)}
                    className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-german-black"
                    title="Listen"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0117 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                )}
            </div>
            
            {msg.correction && (
                <div className="mt-2 text-xs bg-red-50 text-red-600 p-2 rounded-lg border border-red-100 max-w-[85%] animate-in fade-in slide-in-from-top-2 flex gap-2 items-start">
                    <span className="font-bold">⚠️</span>
                    <span>{msg.correction}</span>
                </div>
            )}
            </div>
        ))}
        {loading && (
            <div className="flex items-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
            </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={selectedScenario ? "Antworte..." : "Schreib etwas..."}
            className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-german-gold/50 bg-gray-50 text-gray-900 placeholder:text-gray-400"
            disabled={loading}
            autoFocus
            />
            <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-german-black text-white p-3 rounded-xl hover:bg-gray-800 disabled:opacity-50 transition-colors shadow-sm"
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChatTutor;