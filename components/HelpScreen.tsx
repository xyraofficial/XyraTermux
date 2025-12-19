import React from 'react';
import { HelpCircle, MessageCircle, Book, Zap, Shield, Mail } from 'lucide-react';

const HelpScreen: React.FC = () => {
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
          <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 hover:border-primary-500/30 transition-all duration-300 cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-primary-500/10 rounded-lg mt-1">
                <section.icon size={20} className="text-primary-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-100 mb-1">{section.title}</h3>
                <p className="text-xs text-slate-500 mb-3">{section.description}</p>
                <div className="flex flex-wrap gap-2">
                  {section.items.map((item, i) => (
                    <span key={i} className="text-[10px] px-2.5 py-1 bg-slate-800/50 text-slate-400 rounded-full border border-slate-700/50">
                      {item}
                    </span>
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
    </div>
  );
};

export default HelpScreen;
