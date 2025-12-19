
import React from 'react';
import { ChevronRight, Shield, Bell, Moon, BookOpen, ExternalLink, Github } from 'lucide-react';

const SettingsScreen: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Bell size={18} />
            </div>
            <span className="font-medium text-gray-700">Notifications</span>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </div>
        <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <Moon size={18} />
            </div>
            <span className="font-medium text-gray-700">Appearance</span>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </div>
        <div className="px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <Shield size={18} />
            </div>
            <span className="font-medium text-gray-700">Privacy & Security</span>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </div>
      </section>

      <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <h3 className="px-4 pt-4 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Resources</h3>
        <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <BookOpen size={18} className="text-gray-400" />
            <span className="font-medium text-gray-700">Official Wiki</span>
          </div>
          <ExternalLink size={16} className="text-gray-300" />
        </div>
        <div className="px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <Github size={18} className="text-gray-400" />
            <span className="font-medium text-gray-700">Contribute</span>
          </div>
          <ExternalLink size={16} className="text-gray-300" />
        </div>
      </section>

      <div className="text-center">
        <p className="text-xs text-gray-400 font-medium italic">TermuxToolBox v1.0.4 - Designed with ♥ for the community</p>
      </div>
    </div>
  );
};

export default SettingsScreen;
