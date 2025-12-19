
export interface TermuxTool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  installCommand: string;
  usage: string;
  stars?: number;
  sourceUrl?: string;
  size?: string;
  version?: string;
}

export enum ToolCategory {
  SYSTEM = 'System',
  NETWORK = 'Network',
  HACKING = 'Security',
  PROGRAMMING = 'Coding',
  UTILITIES = 'Utilities',
  SOURCES = 'Sources'
}

export type TabType = 'explore' | 'tools' | 'assistant' | 'settings';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
