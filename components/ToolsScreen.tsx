
import React, { useState } from 'react';
import { TOOLS_DATA } from '../constants';
import { Search, Terminal, Copy, Check, ChevronLeft, Star, Download, ShieldCheck, Share2 } from 'lucide-react';
import { TermuxTool } from '../types';

const ToolsScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedTool, setSelectedTool] = useState<TermuxTool | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredTools = TOOLS_DATA.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (selectedTool) {
    return (
      <div className="animate-in slide-in-from-right-10 duration-400 space-y-6 pb-20">
        <div className="flex justify-between items-center -mx-2 mb-2">
          <button 
            onClick={() => setSelectedTool(null)}
            className="text-blue-500 font-semibold flex items-center gap-0.5 px-2 py-1"
          >
            <ChevronLeft size={24} /> Back
          </button>
          <button className="text-blue-500 p-2 rounded-full hover:bg-gray-100">
            <Share2 size={20} />
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[1.8rem] flex items-center justify-center shadow-lg shadow-blue-100 mb-6">
              <Terminal className="text-white" size={48} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{selectedTool.name}</h2>
            <p className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">{selectedTool.category}</p>
            
            <div className="flex gap-8 mt-6 w-full border-y border-gray-50 py-4">
              <div className="flex-1 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Rating</p>
                <p className="text-lg font-bold text-gray-700">{selectedTool.stars} <Star className="inline mb-1 text-yellow-500" size={14} fill="currentColor" /></p>
              </div>
              <div className="flex-1 text-center border-x border-gray-50">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Size</p>
                <p className="text-lg font-bold text-gray-700">{selectedTool.size || 'N/A'}</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Version</p>
                <p className="text-lg font-bold text-gray-700">{selectedTool.version}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-3">About</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{selectedTool.description}</p>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Installation</h3>
                  <ShieldCheck size={16} className="text-green-500" />
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center group active:bg-gray-100 transition-colors cursor-pointer" onClick={() => copyToClipboard(selectedTool.installCommand)}>
                  <code className="text-sm font-mono text-pink-600 break-all">{selectedTool.installCommand}</code>
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 text-gray-400 group-hover:text-blue-500">
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Execution</h3>
                <div className="bg-gray-900 p-5 rounded-2xl shadow-inner border border-gray-800">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <code className="text-sm font-mono text-green-400 leading-relaxed block overflow-x-auto">$ {selectedTool.usage}</code>
                </div>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-10 bg-blue-600 text-white font-bold py-4 rounded-[1.2rem] shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Download size={20} />
            Add to Environment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-in fade-in duration-400 pb-10">
      <div className="sticky top-0 z-10 py-2">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search Packages..."
            className="w-full bg-white/70 ios-blur border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-base font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-400 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredTools.map(tool => (
          <div 
            key={tool.id} 
            onClick={() => setSelectedTool(tool)}
            className="bg-white p-5 rounded-[1.8rem] shadow-sm border border-gray-100 flex items-center gap-5 cursor-pointer active:scale-[0.97] hover:bg-gray-50 transition-all group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center text-blue-500 group-hover:from-blue-50 group-hover:to-blue-100 transition-colors">
              <Terminal size={32} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-lg leading-tight truncate">{tool.name}</h4>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-tight mt-0.5">{tool.category} • {tool.version}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-500" fill="currentColor" />
                  <span className="text-xs font-bold text-gray-600">{tool.stars}</span>
                </div>
                <span className="text-[10px] text-gray-300">•</span>
                <span className="text-xs font-bold text-blue-500/70">{tool.size || 'Small'}</span>
              </div>
            </div>
            <div className="bg-gray-100 p-2 rounded-full text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Download size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsScreen;
