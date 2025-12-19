
import React, { useState, useRef, useEffect } from 'react';
import { askGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Terminal, Loader2, User } from 'lucide-react';

const AssistantScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your Termux Expert. Need a custom script or help with a command? Just ask!",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await askGemini(input);
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I hit an error. Please try again later.",
        timestamp: Date.now()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 px-1 pb-4 hide-scrollbar"
      >
        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white ${m.role === 'user' ? 'bg-blue-600' : 'bg-gray-800'}`}>
                {m.role === 'user' ? <User size={14} /> : <Terminal size={14} />}
              </div>
              <div 
                className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                }`}
              >
                <div className="whitespace-pre-wrap overflow-hidden">
                  {/* Simplistic Markdown styling */}
                  {m.content.split('```').map((part, idx) => (
                    idx % 2 === 0 
                      ? part 
                      : <pre key={idx} className="bg-gray-900 text-green-400 p-2 my-2 rounded-lg text-xs font-mono overflow-x-auto">{part}</pre>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2">
              <Loader2 className="animate-spin text-blue-500" size={16} />
              <span className="text-xs text-gray-400 font-medium">Assistant is thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-2 bg-white/50 ios-blur rounded-2xl flex items-center gap-2 border border-gray-200">
        <input 
          type="text" 
          placeholder="How do I setup a web server?"
          className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-blue-600 text-white p-2 rounded-xl disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AssistantScreen;
