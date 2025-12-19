
import React, { useState } from 'react';
import Layout from './components/Layout';
import ExploreScreen from './components/ExploreScreen';
import ToolsScreen from './components/ToolsScreen';
import AssistantScreen from './components/AssistantScreen';
import SettingsScreen from './components/SettingsScreen';
import { TabType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('explore');

  const renderContent = () => {
    switch (activeTab) {
      case 'explore':
        return <ExploreScreen />;
      case 'tools':
        return <ToolsScreen />;
      case 'assistant':
        return <AssistantScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <ExploreScreen />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'explore': return 'Explore';
      case 'tools': return 'Packages';
      case 'assistant': return 'Assistant';
      case 'settings': return 'Settings';
      default: return 'Explore';
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      title={getTitle()}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
