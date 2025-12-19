
import React, { useState } from 'react';
import Layout from './components/Layout';
import HomeView from './components/ExploreScreen'; // Dashboard
import LibraryView from './components/ToolsScreen'; // Modules
import TerminalView from './components/AssistantScreen'; // Neurolink
import SettingsView from './components/SettingsScreen'; // Settings
import HelpView from './components/HelpScreen'; // Help
import FeedbackView from './components/FeedbackScreen'; // Feedback
import AuthScreen from './components/AuthScreen';
import ProfileScreen from './components/ProfileScreen';
import { ViewType } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [targetModuleId, setTargetModuleId] = useState<string | null>(null);

  React.useEffect(() => {
    // Handle OAuth redirect result
    const { authService } = require('./services/firebase');
    authService.handleRedirectResult().catch((error: any) => {
      console.error('Redirect result error:', error.message);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onAuthSuccess={() => {}} />;
  }

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
      case 'help': 
        return <HelpView />;
      case 'feedback': 
        return <FeedbackView />;
      case 'profile':
        return <ProfileScreen onLogout={() => setActiveView('dashboard')} />;
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

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
