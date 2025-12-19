
import React from 'react';
import { ViewType } from '../types';
import { LayoutDashboard, Terminal, Package, Settings, Hexagon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setView: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'modules', label: 'Tools', icon: Package },
    { id: 'neurolink', label: 'Xyra AI', icon: Terminal },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-black text-slate-100 font-sans overflow-hidden">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 glass-panel border-r border-white/5 m-6 rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent pointer-events-none" />
        
        <div className="p-8 flex items-center gap-4">
          <div className="text-primary-400 p-2 bg-primary-500/10 rounded-xl">
            <Hexagon size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">XyraTermux</h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">Toolbox v2.0</p>
          </div>
        </div>
        
        <nav className="flex-1 px-6 space-y-2 mt-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewType)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                activeView === item.id 
                  ? 'bg-primary-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className={activeView === item.id ? "" : "opacity-70 group-hover:opacity-100"} />
              <span className="font-medium tracking-wide text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6">
          <div className="rounded-2xl bg-white/5 p-4 border border-white/5 backdrop-blur-md">
            <div className="text-[10px] font-mono text-slate-400">
              <span className="text-primary-400">●</span> SYSTEM ONLINE
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden md:py-6 md:pr-6">
        {/* Mobile Header - iOS Style */}
        <header className="md:hidden flex items-center justify-between px-5 py-4 pt-safe glass-panel border-b border-white/5 z-20 sticky top-0">
          <div className="flex items-center gap-2.5">
            <div className="text-primary-400">
              <Hexagon size={22} strokeWidth={2.5} />
            </div>
            <span className="font-semibold tracking-tight text-lg">Xyra</span>
          </div>
          <div className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
            ONLINE
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-hide md:rounded-3xl md:glass-panel bg-gradient-to-b from-transparent to-slate-900/20 md:border md:border-white/5 relative pb-32">
           {children}
        </div>

        {/* Mobile Bottom Nav - iOS Tab Bar Style */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-t border-white/5 z-40" style={{ maxHeight: '130px' }}>
          <div className="flex justify-around items-center py-3 px-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id as ViewType)}
                className={`flex flex-col items-center gap-1.5 p-3 min-w-[64px] transition-all duration-300 ${
                  activeView === item.id ? 'text-primary-400 scale-105' : 'text-slate-500'
                }`}
              >
                <item.icon size={24} strokeWidth={activeView === item.id ? 2.5 : 2} />
                <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </main>
    </div>
  );
};

export default Layout;
