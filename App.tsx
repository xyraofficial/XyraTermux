
import React, { useState } from 'react';
import Layout from './components/Layout';
import HomeView from './components/ExploreScreen'; // Dashboard
import LibraryView from './components/ToolsScreen'; // Modules
import TerminalView from './components/AssistantScreen'; // Neurolink
import SettingsView from './components/SettingsScreen'; // Settings
import { ViewType } from './types';

const App: React.FC = () => {
  const [activeView, setView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <HomeView />;
      case 'modules': return <LibraryView />;
      case 'neurolink': return <TerminalView />;
      case 'settings': return <SettingsView />;
      default: return <HomeView />;
    }
  };

  return (
    <Layout activeView={activeView} setView={setView}>
      {renderView()}
    </Layout>
  );
};

export default App;
