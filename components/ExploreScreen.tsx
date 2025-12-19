
import React from 'react';
import { MOCK_STATS, MODULES } from '../constants';
import { Activity, Zap, ArrowUpRight, Terminal } from 'lucide-react';
import { ViewType } from '../types';

interface HomeViewProps {
  onNavigate: (view: ViewType, moduleId?: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-blue-600 p-6 shadow-lg shadow-primary-500/10">
        <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-10 -translate-y-10">
          <Terminal size={120} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 relative z-10">Welcome back, User</h2>
        <p className="text-blue-100 text-sm max-w-md relative z-10 mb-4">
          Xyra systems are fully operational. Termux environment scanning complete. 
          Ready for command input.
        </p>
        <button 
          onClick={() => onNavigate('neurolink')}
          className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white text-xs font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2 active:scale-95"
        >
          <Terminal size={14} /> Initiate Quick Scan
        </button>
      </div>

      {/* System Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {MOCK_STATS.map((stat, i) => (
          <div key={i} className="glass-panel p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/70 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-slate-400 text-xs font-mono uppercase tracking-wider">{stat.label}</span>
              <Activity size={14} className={stat.status === 'optimal' ? 'text-green-400' : 'text-yellow-400'} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold font-mono text-slate-100">{stat.value}</span>
              <span className="text-[10px] text-slate-500 font-bold">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions / Recent Modules */}
      <section>
        <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
          <Zap size={16} className="text-primary-400" /> Recommended Modules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {MODULES.slice(0, 3).map((mod) => (
            <div 
              key={mod.id} 
              onClick={() => onNavigate('modules', mod.id)}
              className="group p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-primary-500/50 transition-all cursor-pointer active:scale-[0.98]"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="bg-slate-800 group-hover:bg-primary-500/20 p-2 rounded-lg text-slate-400 group-hover:text-primary-400 transition-colors">
                  <Terminal size={18} />
                </div>
                <ArrowUpRight size={16} className="text-slate-600 group-hover:text-primary-400" />
              </div>
              <h4 className="font-bold text-slate-200 mb-1">{mod.name}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{mod.description}</p>
              <div className="mt-3 flex gap-2">
                {mod.tags.slice(0, 2).map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">#{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Terminal Snippet */}
      <div className="rounded-xl bg-black border border-slate-800 p-4 font-mono text-xs shadow-inner select-all">
        <div className="flex gap-1.5 mb-3 opacity-50">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <div className="space-y-1 text-slate-300">
          <p><span className="text-green-400">➜</span> <span className="text-blue-400">~</span> xyra init --verbose</p>
          <p className="text-slate-500">[INFO] Loading core modules...</p>
          <p className="text-slate-500">[INFO] Connecting to neural network...</p>
          <p className="text-slate-500">[OK] System ready.</p>
          <p><span className="text-green-400">➜</span> <span className="text-blue-400">~</span> <span className="animate-pulse">_</span></p>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
