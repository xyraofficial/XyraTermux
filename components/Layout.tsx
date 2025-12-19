
import React from 'react';
import { TabType } from '../types';
import { Search, Home, LayoutGrid, Cpu, Settings, MessageCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, title }) => {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative border-x border-gray-200">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 ios-blur pt-12 pb-2 px-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-black">{title}</h1>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-blue-500">
            {activeTab === 'assistant' ? <MessageCircle size={22} /> : <Search size={22} />}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto hide-scrollbar bg-[#f2f2f7] p-4">
        {children}
      </main>

      {/* Tab Bar */}
      <nav className="sticky bottom-0 z-20 bg-white/80 ios-blur border-t border-gray-200 px-6 pt-3 pb-8 flex justify-between items-center">
        <TabButton 
          active={activeTab === 'explore'} 
          onClick={() => setActiveTab('explore')} 
          icon={<Home size={24} />} 
          label="Home" 
        />
        <TabButton 
          active={activeTab === 'tools'} 
          onClick={() => setActiveTab('tools')} 
          icon={<LayoutGrid size={24} />} 
          label="Tools" 
        />
        <TabButton 
          active={activeTab === 'assistant'} 
          onClick={() => setActiveTab('assistant')} 
          icon={<MessageCircle size={24} />} 
          label="AI" 
        />
        <TabButton 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')} 
          icon={<Settings size={24} />} 
          label="Settings" 
        />
      </nav>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors duration-200 ${active ? 'text-blue-600' : 'text-gray-400'}`}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export default Layout;
