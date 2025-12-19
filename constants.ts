
import { TermuxTool, ToolCategory } from './types';

export const TOOLS_DATA: TermuxTool[] = [
  {
    id: '1',
    name: 'nmap',
    category: ToolCategory.NETWORK,
    description: 'The industry standard for network discovery and security auditing. It uses raw IP packets in novel ways to determine what hosts are available on the network.',
    installCommand: 'pkg install nmap',
    usage: 'nmap -sV [target_ip]',
    stars: 4.9,
    size: '5.2 MB',
    version: '7.94'
  },
  {
    id: '2',
    name: 'python',
    category: ToolCategory.PROGRAMMING,
    description: 'A powerful programming language perfect for automation and scripting. Includes pip for package management.',
    installCommand: 'pkg install python',
    usage: 'python --version',
    stars: 5.0,
    size: '28 MB',
    version: '3.12.1'
  },
  {
    id: '3',
    name: 'metasploit',
    category: ToolCategory.HACKING,
    description: 'Advanced penetration testing framework. Allows you to test, exploit, and validate security vulnerabilities.',
    installCommand: 'pkg install metasploit',
    usage: 'msfconsole',
    stars: 4.7,
    size: '180 MB',
    version: '6.3.5'
  },
  {
    id: '4',
    name: 'git',
    category: ToolCategory.UTILITIES,
    description: 'Version control system for tracking changes in source code. Essential for developers using Termux.',
    installCommand: 'pkg install git',
    usage: 'git clone [repository_url]',
    stars: 4.8,
    size: '12 MB',
    version: '2.43.0'
  },
  {
    id: '5',
    name: 'htop',
    category: ToolCategory.SYSTEM,
    description: 'Interactive system-monitor process-viewer. A better version of the standard top command.',
    installCommand: 'pkg install htop',
    usage: 'htop',
    stars: 4.6,
    size: '240 KB',
    version: '3.2.2'
  },
  {
    id: '6',
    name: 'Termux-Repo',
    category: ToolCategory.SOURCES,
    description: 'Official main repository containing core packages.',
    installCommand: 'termux-change-repo',
    usage: 'Select mirror from GUI',
    stars: 5.0,
    version: '2024.1'
  },
  {
    id: '7',
    name: 'Tsu',
    category: ToolCategory.SYSTEM,
    description: 'A wrapper for su to make it easier to use root permissions within Termux environment.',
    installCommand: 'pkg install tsu',
    usage: 'tsu',
    stars: 4.4,
    size: '15 KB',
    version: '8.6.0'
  }
];

export const CATEGORIES = Object.values(ToolCategory);

export const SYSTEM_INFO = {
  prefix: '/data/data/com.termux/files/usr',
  home: '/data/data/com.termux/files/home',
  shell: '/data/data/com.termux/files/usr/bin/bash',
  os: 'Android (Linux Kernel)',
  arch: 'aarch64'
};
