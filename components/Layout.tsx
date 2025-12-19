
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
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'modules', label: 'Modules', icon: Package },
    { id: 'neurolink', label: 'Neurolink', icon: Terminal },
    { id: 'settings', label: 'Config', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* Desktop Sidebar - Hidden on Mobile */}
      <aside className="hidden md:flex flex-col w-64 glass-panel border-r border-slate-800 m-4 rounded-2xl">
        <div className="p-6 flex items-center gap-3">
          <div className="text-primary-400 animate-pulse">
            <Hexagon size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-bold tracking-wider text-slate-100">XYRA<span className="text-primary-400">TERM</span></h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewType)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeView === item.id 
                  ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <item.icon size={20} className={activeView === item.id ? "animate-pulse" : ""} />
              <span className="font-medium tracking-wide">{item.label}</span>
              {activeView === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400 shadow-[0_0_8px_currentColor]" />}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800/50">
          <div className="text-xs font-mono text-slate-500">
            SYS.VER: 2.0.4-ALPHA
            <br/>
            CONN: SECURE
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden md:py-4 md:pr-4">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 glass-panel border-b border-slate-800 z-10">
          <div className="flex items-center gap-2">
            <Hexagon size={24} className="text-primary-400" />
            <span className="font-bold tracking-wider">XYRA</span>
          </div>
          <div className="text-xs font-mono px-2 py-1 rounded bg-slate-900 border border-slate-800 text-primary-400">
            ONLINE
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-hide md:rounded-2xl md:glass-panel bg-slate-950/50 md:bg-slate-900/30 relative">
           {children}
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden glass-panel border-t border-slate-800 pb-safe">
          <div className="flex justify-around items-center p-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id as ViewType)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  activeView === item.id ? 'text-primary-400' : 'text-slate-500'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${activeView === item.id ? 'bg-primary-500/10' : ''}`}>
                  <item.icon size={22} />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wide">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </main>
    </div>
  );
};

export default Layout;
