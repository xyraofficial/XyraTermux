
import React, { useState } from 'react';
import { MODULES } from '../constants';
import { Search, Terminal, ChevronRight, Copy, Check } from 'lucide-react';
import { ModuleItem } from '../types';

const LibraryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<ModuleItem | null>(null);
  const [copied, setCopied] = useState(false);

  const filtered = MODULES.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const copyCmd = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col md:flex-row animate-in fade-in duration-300">
      
      {/* Search & List Panel */}
      <div className={`flex-1 flex flex-col p-4 md:p-6 ${selected ? 'hidden md:flex' : 'flex'}`}>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 tracking-tight">Module Library</h2>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search scripts (e.g., nmap, update)..."
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all placeholder:text-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-hide">
          {filtered.map(item => (
            <div 
              key={item.id}
              onClick={() => setSelected(item)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selected?.id === item.id 
                  ? 'bg-primary-500/10 border-primary-500/30' 
                  : 'bg-slate-900/30 border-slate-800 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selected?.id === item.id ? 'bg-primary-500/20 text-primary-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Terminal size={18} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${selected?.id === item.id ? 'text-primary-200' : 'text-slate-200'}`}>{item.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono uppercase">{item.category}</span>
                  </div>
                </div>
                <ChevronRight size={16} className={`text-slate-600 ${selected?.id === item.id ? 'text-primary-400' : ''}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      <div className={`flex-1 md:border-l md:border-slate-800 md:bg-slate-950/30 p-4 md:p-6 ${selected ? 'flex' : 'hidden md:flex'} flex-col`}>
        {selected ? (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <button 
              onClick={() => setSelected(null)}
              className="md:hidden flex items-center gap-1 text-slate-400 mb-4 hover:text-white"
            >
              <ChevronRight className="rotate-180" size={16} /> Back
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white">{selected.name}</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  selected.complexity === 'High' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                  selected.complexity === 'Medium' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                  'border-green-500/30 text-green-400 bg-green-500/10'
                }`}>
                  {selected.complexity}
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{selected.description}</p>
            </div>

            <div className="space-y-6">
              <div className="bg-black/50 rounded-xl border border-slate-800 overflow-hidden">
                <div className="flex justify-between items-center px-4 py-2 bg-slate-900/50 border-b border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Command</span>
                  <button onClick={() => copyCmd(selected.command)} className="text-slate-400 hover:text-primary-400">
                    {copied ? <Check size={14} className="text-green-400"/> : <Copy size={14} />}
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <code className="text-sm font-mono text-primary-300 whitespace-nowrap">
                    {selected.command}
                  </code>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-600">
            <Terminal size={48} className="mb-4 opacity-20" />
            <p className="text-sm">Select a module to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryView;
