import React, { useState } from 'react';
import { HelpCircle, MessageCircle, Book, Zap, Shield, Mail, X } from 'lucide-react';

const HelpScreen: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<{ title: string; content: string } | null>(null);

  const helpTopics: Record<string, { title: string; content: string }> = {
    'Terminal Commands': {
      title: 'Terminal Commands',
      content: 'Learn how to interact with the Live Neural Interface. Type your commands and get instant feedback from Xyra AI. Commands are executed safely with verification checks.'
    },
    'Module Management': {
      title: 'Module Management',
      content: 'Manage system modules and tools. Install, update, or remove modules from the Tools section. Each module comes with detailed information about its functionality.'
    },
    'System Info': {
      title: 'System Information',
      content: 'View real-time system statistics including storage, memory, uptime, and package count. Monitor your system health at a glance.'
    },
    'Live Neural Interface': {
      title: 'Live Neural Interface',
      content: 'Experience AI-powered command generation. Xyra AI assists with terminal operations and provides smart suggestions based on your needs.'
    },
    'Tools & Modules': {
      title: 'Tools & Modules',
      content: 'Explore available tools and modules. Each tool is categorized by complexity and function. Install recommended modules to enhance your workflow.'
    },
    'Auto Commands': {
      title: 'Auto Commands',
      content: 'Enable auto-copy feature to automatically copy generated commands to clipboard. Speed up your workflow with smart automation.'
    },
    'Command Verification': {
      title: 'Command Verification',
      content: 'All commands are verified before execution. The system checks for potential risks and ensures safe operation of your terminal.'
    },
    'Safety Checks': {
      title: 'Safety Checks',
      content: 'Enable safety checks to scan generated scripts for potential issues. This feature helps protect your system from harmful commands.'
    },
    'Risk Assessment': {
      title: 'Risk Assessment',
      content: 'Get risk ratings for commands. Commands are assessed and categorized by their potential impact on your system.'
    }
  };

  const helpSections = [
    {
      icon: Book,
      title: 'Getting Started',
      description: 'Learn the basics of Xyra Termux and how to use each feature',
      items: ['Terminal Commands', 'Module Management', 'System Info']
    },
    {
      icon: Zap,
      title: 'Features Guide',
      description: 'Deep dive into Xyra Termux powerful features',
      items: ['Live Neural Interface', 'Tools & Modules', 'Auto Commands']
    },
    {
      icon: Shield,
      title: 'Safety & Security',
      description: 'Information about security features and best practices',
      items: ['Command Verification', 'Safety Checks', 'Risk Assessment']
    },
    {
      icon: Mail,
      title: 'Support',
      description: 'Contact our support team for assistance',
      items: ['Email Support', 'Send Feedback', 'Report Issue']
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold mb-2 text-slate-100">Help Center</h2>
      <p className="text-sm text-slate-400 mb-8">Find answers and get support for Xyra Termux</p>

      <div className="space-y-4">
        {helpSections.map((section, idx) => (
          <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 hover:border-primary-500/30 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-primary-500/10 rounded-lg mt-1">
                <section.icon size={20} className="text-primary-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-100 mb-1">{section.title}</h3>
                <p className="text-xs text-slate-500 mb-3">{section.description}</p>
                <div className="flex flex-wrap gap-2">
                  {section.items.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTopic(helpTopics[item])}
                      className="text-[10px] px-2.5 py-1 bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-slate-300 rounded-full border border-slate-700/50 hover:border-slate-600/50 transition-all cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-primary-500/10 to-transparent border border-primary-500/20 rounded-2xl">
        <div className="flex items-start gap-3">
          <HelpCircle size={18} className="text-primary-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-slate-200">Didn't find what you're looking for?</p>
            <p className="text-xs text-slate-400 mt-1">Send us your feedback or questions. Our team will respond as soon as possible.</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedTopic && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 animate-in fade-in scale-95 duration-300">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-100">{selectedTopic.title}</h3>
              <button
                onClick={() => setSelectedTopic(null)}
                className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={18} className="text-slate-400" />
              </button>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">{selectedTopic.content}</p>
            <button
              onClick={() => setSelectedTopic(null)}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 rounded-xl transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpScreen;
