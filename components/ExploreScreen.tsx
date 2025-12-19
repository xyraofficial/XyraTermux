
import React from 'react';
import { TOOLS_DATA, CATEGORIES, SYSTEM_INFO } from '../constants';
import { Terminal, Star, ChevronRight, Info, Cpu, Folder, Database } from 'lucide-react';

const ExploreScreen: React.FC = () => {
  const featured = TOOLS_DATA.slice(0, 4);

  return (
    <div className="space-y-6 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Info Card */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Environment Status</h2>
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InfoItem icon={<Cpu size={14}/>} label="Arch" value={SYSTEM_INFO.arch} />
          <InfoItem icon={<Database size={14}/>} label="Prefix" value="~/usr" />
          <InfoItem icon={<Folder size={14}/>} label="Home" value="/data/.../home" />
          <InfoItem icon={<Terminal size={14}/>} label="Shell" value="bash" />
        </div>
      </div>

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-6 rounded-3xl text-white shadow-xl shadow-blue-200 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <h2 className="text-2xl font-bold mb-2">Termux Toolbox</h2>
        <p className="text-blue-100 text-sm mb-5 leading-relaxed">The ultimate companion for your Android terminal environment.</p>
        <div className="flex gap-2">
          <button className="bg-white text-blue-600 px-5 py-2.5 rounded-2xl text-xs font-bold hover:bg-blue-50 transition-all shadow-lg active:scale-95">
            Quick Start
          </button>
          <button className="bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-2xl text-xs font-bold hover:bg-white/30 transition-all active:scale-95">
            Mirror List
          </button>
        </div>
      </div>

      {/* Featured Tools Grid */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">Essential Tools</h3>
          <button className="text-blue-500 text-sm font-semibold">See More</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featured.map(tool => (
            <div key={tool.id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 hover:border-blue-100 transition-all active:scale-95">
              <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center mb-3">
                <Terminal className="text-blue-500" size={20} />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">{tool.name}</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5 tracking-tighter">{tool.category}</p>
              <div className="flex items-center gap-1 text-yellow-500 mt-2">
                <Star size={10} fill="currentColor" />
                <span className="text-[10px] font-bold">{tool.stars}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* iOS Settings Style Category List */}
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-4 px-1 tracking-tight">Functions</h3>
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          {CATEGORIES.map((category, idx) => (
            <div 
              key={category} 
              className={`px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors ${idx !== CATEGORIES.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(category)}`}>
                  <Info size={16} className="text-white" />
                </div>
                <span className="font-semibold text-gray-800">{category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium">{TOOLS_DATA.filter(t => t.category === category).length} tools</span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    <div className="text-gray-400">{icon}</div>
    <div className="overflow-hidden">
      <p className="text-[9px] font-bold text-gray-400 uppercase leading-none">{label}</p>
      <p className="text-xs font-bold text-gray-700 truncate">{value}</p>
    </div>
  </div>
);

const getCategoryColor = (cat: string) => {
  switch (cat) {
    case 'Security': return 'bg-red-500';
    case 'Coding': return 'bg-blue-500';
    case 'Network': return 'bg-purple-500';
    case 'System': return 'bg-orange-500';
    case 'Sources': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

export default ExploreScreen;
