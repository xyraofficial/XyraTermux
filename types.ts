
export type ViewType = 'dashboard' | 'modules' | 'neurolink' | 'settings' | 'help' | 'feedback' | 'profile';

export interface ModuleItem {
  id: string;
  name: string;
  category: string;
  description: string;
  command: string;
  tags: string[];
  complexity: 'Low' | 'Medium' | 'High';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
  isCode?: boolean;
}

export interface SystemStat {
  label: string;
  value: string;
  unit: string;
  status: 'optimal' | 'warning' | 'critical';
}
