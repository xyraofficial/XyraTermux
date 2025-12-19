
import React, { useState } from 'react';
import Layout from './components/Layout';
import HomeView from './components/ExploreScreen'; // Dashboard
import LibraryView from './components/ToolsScreen'; // Modules
import TerminalView from './components/AssistantScreen'; // Neurolink
import SettingsView from './components/SettingsScreen'; // Settings
import { ViewType } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [targetModuleId, setTargetModuleId] = useState<string | null>(null);

  const handleNavigate = (view: ViewType, moduleId?: string) => {
    setActiveView(view);
    if (moduleId) {
      setTargetModuleId(moduleId);
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': 
        return <HomeView onNavigate={handleNavigate} />;
      case 'modules': 
        return <LibraryView initialSelectedId={targetModuleId} clearSelection={() => setTargetModuleId(null)} />;
      case 'neurolink': 
        return <TerminalView />;
      case 'settings': 
        return <SettingsView />;
      default: 
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout activeView={activeView} setView={setActiveView}>
      {renderView()}
    </Layout>
  );
};

export default App;
