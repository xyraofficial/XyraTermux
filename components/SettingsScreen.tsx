
import React from 'react';
import { Shield, Bell, Smartphone, Monitor, Code, ToggleRight } from 'lucide-react';

const SettingsView: React.FC = () => {
  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-xl font-bold mb-6 text-slate-100">System Configuration</h2>

      <div className="space-y-6">
        
        {/* Section */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center gap-2">
            <Monitor size={16} className="text-primary-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Interface</span>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-200">High Contrast Mode</p>
                <p className="text-xs text-slate-500">Increases visibility for terminals</p>
              </div>
              <ToggleRight size={24} className="text-slate-600 cursor-pointer hover:text-primary-400" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-200">Animations</p>
                <p className="text-xs text-slate-500">Reduce motion for performance</p>
              </div>
              <ToggleRight size={24} className="text-primary-400 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Section */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center gap-2">
            <Code size={16} className="text-primary-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Termux Integration</span>
          </div>
          <div className="p-4 space-y-4">
             <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-200">Auto-Copy Commands</p>
                <p className="text-xs text-slate-500">Automatically copy generated code</p>
              </div>
              <ToggleRight size={24} className="text-primary-400 cursor-pointer" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-200">Safety Check</p>
                <p className="text-xs text-slate-500">Scan generated scripts for risk</p>
              </div>
              <ToggleRight size={24} className="text-primary-400 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="text-center pt-8">
           <p className="text-xs text-slate-600 font-mono">XYRA-TERM-UI // BUILD 2024.10.15</p>
        </div>

      </div>
    </div>
  );
};

export default SettingsView;
