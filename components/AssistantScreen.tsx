
import React, { useState, useRef, useEffect } from 'react';
import { askXyra } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Terminal, Loader2, Sparkles, AlertCircle } from 'lucide-react';

const TerminalView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'ai',
      content: "Neurolink active. I am Xyra. How can I assist with your terminal operations?",
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
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await askXyra(input);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: response,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'ai',
        content: "Error: Neural link disrupted. Please retry.",
        timestamp: Date.now()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/50 md:bg-transparent animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="shrink-0 p-4 border-b border-slate-800/50 flex items-center gap-2">
        <Sparkles size={16} className="text-primary-400" />
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Live Neural Interface</span>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 pb-20">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[70%] flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              
              {/* Avatar */}
              <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${
                m.role === 'user' 
                  ? 'bg-slate-800 border-slate-700 text-slate-300' 
                  : 'bg-primary-900/20 border-primary-500/30 text-primary-400'
              }`}>
                {m.role === 'user' ? <div className="text-xs font-bold">U</div> : <Terminal size={14} />}
              </div>

              {/* Bubble */}
              <div className={`rounded-xl p-3 text-sm leading-relaxed border ${
                m.role === 'user'
                  ? 'bg-slate-800 border-slate-700 text-slate-200'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300'
              }`}>
                {/* Markdown-ish parser */}
                {m.content.split('```').map((part, i) => (
                  i % 2 === 0 ? (
                    <div key={i} className="whitespace-pre-wrap">{part}</div>
                  ) : (
                    <div key={i} className="my-2 bg-black/50 border border-slate-800 rounded p-2 overflow-x-auto">
                      <code className="font-mono text-xs text-primary-300">{part}</code>
                    </div>
                  )
                ))}
                <div className="mt-1 text-[10px] text-slate-600 font-mono text-right">
                  {new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>

            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="shrink-0 w-8 h-8 rounded-lg bg-primary-900/20 border border-primary-500/30 flex items-center justify-center text-primary-400">
               <Loader2 className="animate-spin" size={14} />
            </div>
            <div className="flex items-center gap-2 text-xs text-primary-500/70 font-mono animate-pulse mt-2">
              PROCESSING<span className="tracking-widest">...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="shrink-0 p-4 bg-slate-950 border-t border-slate-800">
        <div className="flex items-end gap-2 bg-slate-900/50 border border-slate-800 rounded-xl p-2 focus-within:border-primary-500/50 focus-within:ring-1 focus-within:ring-primary-500/20 transition-all">
          <textarea
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-200 placeholder:text-slate-600 resize-none h-10 max-h-24 py-2 px-2 scrollbar-hide font-mono"
            placeholder="Ask Xyra command..."
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="p-2 rounded-lg bg-primary-600 text-white hover:bg-primary-500 disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-600 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="mt-2 text-[10px] text-slate-600 text-center flex items-center justify-center gap-1">
          <AlertCircle size={10} /> AI can make mistakes. Verify commands.
        </div>
      </div>
    </div>
  );
};

export default TerminalView;
