
import React, { useState } from 'react';
import { Monitor, Code, ToggleRight, ToggleLeft } from 'lucide-react';

const SettingsView: React.FC = () => {
  // Local state for toggles
  const [highContrast, setHighContrast] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [autoCopy, setAutoCopy] = useState(true);
  const [safetyCheck, setSafetyCheck] = useState(true);

  const ToggleIcon = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
    <button onClick={onClick} className="focus:outline-none transition-colors">
      {active ? (
        <ToggleRight size={28} className="text-primary-400" />
      ) : (
        <ToggleLeft size={28} className="text-slate-600 hover:text-slate-500" />
      )}
    </button>
  );

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto animate-in fade-in duration-500" style={{ paddingBottom: '0' }}>
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
              <ToggleIcon active={highContrast} onClick={() => setHighContrast(!highContrast)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-200">Animations</p>
                <p className="text-xs text-slate-500">Reduce motion for performance</p>
              </div>
              <ToggleIcon active={animations} onClick={() => setAnimations(!animations)} />
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
              <ToggleIcon active={autoCopy} onClick={() => setAutoCopy(!autoCopy)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-200">Safety Check</p>
                <p className="text-xs text-slate-500">Scan generated scripts for risk</p>
              </div>
              <ToggleIcon active={safetyCheck} onClick={() => setSafetyCheck(!safetyCheck)} />
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
