
import React, { useState, useEffect } from 'react';
import { MODULES } from '../constants';
import { Search, Terminal, ChevronRight, Copy, Check, X, Command } from 'lucide-react';
import { ModuleItem } from '../types';

interface LibraryViewProps {
  initialSelectedId: string | null;
  clearSelection: () => void;
}

const LibraryView: React.FC<LibraryViewProps> = ({ initialSelectedId, clearSelection }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<ModuleItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Handle deep link / pre-selection
  useEffect(() => {
    if (initialSelectedId) {
      const found = MODULES.find(m => m.id === initialSelectedId);
      if (found) {
        setSelected(found);
      }
      clearSelection();
    }
  }, [initialSelectedId, clearSelection]);

  const filtered = MODULES.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const copyCmd = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Clipboard failed', err);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-black animate-in fade-in duration-300">
      
      {/* Search & List Panel - iOS Style */}
      <div className={`flex-1 flex flex-col ${selected ? 'hidden md:flex' : 'flex'} relative`}>
        
        {/* iOS Style Large Header with Search */}
        <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-white/10 pt-safe">
          <div className="px-5 pt-4 pb-3">
            <div className="flex justify-between items-end mb-3">
              <h1 className="text-3xl font-bold text-white tracking-tight">Toolbox</h1>
              <span className="text-xs text-slate-500 font-medium mb-1.5">{filtered.length} Modules</span>
            </div>
            
            {/* iOS Search Bar */}
            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-opacity ${isSearching || searchTerm ? 'opacity-100' : 'opacity-60'}`}>
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input 
                type="text"
                placeholder="Search"
                className="block w-full rounded-xl border-0 bg-slate-900/90 py-2 pl-9 pr-8 text-white ring-1 ring-inset ring-slate-800 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-primary-500/50 sm:text-sm sm:leading-6 transition-all"
                value={searchTerm}
                onFocus={() => setIsSearching(true)}
                onBlur={() => !searchTerm && setIsSearching(false)}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                  <div className="bg-slate-700 rounded-full p-0.5">
                    <X size={10} className="text-slate-300" strokeWidth={3} />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto pb-32 scrollbar-hide">
          <div className="px-4 py-2 space-y-1">
            {filtered.length > 0 ? (
              filtered.map((item, index) => {
                // Group separator logic could go here if sorted by category
                const showSeparator = index !== filtered.length - 1;
                
                return (
                  <div 
                    key={item.id}
                    onClick={() => setSelected(item)}
                    className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all active:scale-[0.99] ${
                      selected?.id === item.id 
                        ? 'bg-primary-500/10' 
                        : 'hover:bg-slate-900/60'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                      selected?.id === item.id 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-slate-800 text-slate-400 group-hover:text-primary-400'
                    }`}>
                      <Terminal size={20} strokeWidth={2} />
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex justify-between items-center">
                        <h4 className={`font-semibold text-[15px] truncate ${selected?.id === item.id ? 'text-primary-400' : 'text-slate-100'}`}>
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-slate-600 font-mono hidden sm:inline-block">{item.category.toUpperCase()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs truncate ${selected?.id === item.id ? 'text-primary-500/70' : 'text-slate-500'}`}>
                          {item.description}
                        </span>
                      </div>
                    </div>
                    
                    <ChevronRight size={16} className={`shrink-0 transition-opacity ${selected?.id === item.id ? 'text-primary-500 opacity-100' : 'text-slate-600 opacity-30 group-hover:opacity-100'}`} />
                  </div>
                );
              })
            ) : (
              <div className="py-20 text-center text-slate-500 flex flex-col items-center">
                <Command size={32} className="mb-3 opacity-20" />
                <p>No tools found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <div className={`flex-1 md:border-l md:border-white/10 md:bg-slate-950/50 relative ${selected ? 'flex' : 'hidden md:flex'} flex-col`}>
        {selected ? (
          <div className="flex-1 flex flex-col h-full overflow-hidden animate-in slide-in-from-right-10 duration-300">
            {/* Detail Header */}
            <div className="p-4 pt-safe flex items-center gap-2 border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
              <button 
                onClick={() => setSelected(null)}
                className="md:hidden flex items-center gap-1 text-primary-400 font-medium"
              >
                <ChevronRight className="rotate-180" size={20} /> Back
              </button>
              <div className="ml-auto md:ml-0 md:flex-1 md:text-right text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                Termux Module // {selected.id}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 md:p-8 scrollbar-hide">
              
              {/* Icon & Title */}
              <div className="flex flex-col items-center text-center mb-8 mt-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 shadow-2xl flex items-center justify-center mb-4">
                  <Terminal size={40} className="text-primary-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{selected.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs font-medium border border-white/5">
                  {selected.category}
                </span>
              </div>

              {/* Description */}
              <div className="bg-slate-900/30 rounded-xl p-5 border border-white/5 mb-8 text-center">
                 <p className="text-slate-300 text-sm leading-relaxed">{selected.description}</p>
              </div>

              {/* Command Box */}
              <div className="space-y-6 max-w-lg mx-auto w-full">
                <div>
                  <div className="flex justify-between items-center mb-2 px-1">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Command</h3>
                    {copied && <span className="text-xs text-green-400 flex items-center gap-1 font-medium"><Check size={12}/> Copied</span>}
                  </div>
                  <button 
                    onClick={() => copyCmd(selected.command)}
                    className="w-full group relative bg-black rounded-xl border border-slate-800 overflow-hidden shadow-lg hover:border-slate-700 transition-colors text-left"
                  >
                    <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-black to-transparent pointer-events-none" />
                    <div className="p-4 flex items-center justify-between gap-4">
                      <code className="text-sm font-mono text-primary-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
                        {selected.command}
                      </code>
                      <div className="bg-slate-800/80 p-1.5 rounded-md text-slate-400 group-hover:text-white transition-colors shrink-0 backdrop-blur-sm z-10">
                        <Copy size={14} />
                      </div>
                    </div>
                  </button>
                  <p className="mt-2 text-[10px] text-slate-600 text-center">Tap to copy to clipboard</p>
                </div>

                {/* Tags */}
                <div className="border-t border-white/5 pt-6 text-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    {selected.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg bg-slate-900 text-slate-500 border border-slate-800">
                        {tag}
                      </span>
                    ))}
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg border border-slate-800 ${
                            selected.complexity === 'High' ? 'bg-red-500/5 text-red-500/70' :
                            selected.complexity === 'Medium' ? 'bg-yellow-500/5 text-yellow-500/70' :
                            'bg-green-500/5 text-green-500/70'
                          }`}>
                      {selected.complexity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 p-8 text-center bg-dots">
            <div className="w-16 h-16 rounded-full bg-slate-900/50 flex items-center justify-center mb-4 border border-white/5">
               <Terminal size={24} className="opacity-40" />
            </div>
            <h3 className="text-lg font-medium text-slate-300 mb-1">Select a Tool</h3>
            <p className="text-sm opacity-50 max-w-xs mx-auto">Browse the library on the left to view commands and installation guides.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryView;
