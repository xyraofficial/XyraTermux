
import { ModuleItem, SystemStat } from './types';

export const MODULES: ModuleItem[] = [
  {
    id: 'pkg-update',
    name: 'System Update',
    category: 'System',
    description: 'Updates all installed packages to their latest versions and upgrades the system.',
    command: 'pkg update && pkg upgrade -y',
    tags: ['maintenance', 'core'],
    complexity: 'Low'
  },
  {
    id: 'net-scan',
    name: 'Network Mapper',
    category: 'Network',
    description: 'Scans target IP for open ports and service versions using Nmap.',
    command: 'nmap -sV -T4 [IP_ADDRESS]',
    tags: ['recon', 'security'],
    complexity: 'Medium'
  },
  {
    id: 'py-server',
    name: 'Python HTTP Server',
    category: 'Web',
    description: 'Instantly hosts the current directory on port 8000.',
    command: 'python -m http.server 8000',
    tags: ['dev', 'utility'],
    complexity: 'Low'
  },
  {
    id: 'yt-dl',
    name: 'Media Downloader',
    category: 'Utility',
    description: 'Downloads high-quality video or audio from various platforms using yt-dlp.',
    command: 'yt-dlp -f "bestvideo+bestaudio" [URL]',
    tags: ['media', 'python'],
    complexity: 'Medium'
  },
  {
    id: 'git-config',
    name: 'Git Setup',
    category: 'Dev',
    description: 'Configures global user name and email for version control.',
    command: 'git config --global user.name "Your Name" && git config --global user.email "you@example.com"',
    tags: ['git', 'setup'],
    complexity: 'Low'
  },
  {
    id: 'termux-api',
    name: 'Termux API',
    category: 'System',
    description: 'Enables access to Android hardware features (Camera, GPS, etc). Requires Termux:API app.',
    command: 'pkg install termux-api',
    tags: ['hardware', 'integration'],
    complexity: 'Medium'
  },
  {
    id: 'metasploit',
    name: 'Metasploit Framework',
    category: 'Security',
    description: 'The world\'s most used penetration testing framework.',
    command: 'pkg install metasploit',
    tags: ['hacking', 'advanced'],
    complexity: 'High'
  }
];

export const MOCK_STATS: SystemStat[] = [
  { label: 'Storage', value: '12.4', unit: 'GB', status: 'optimal' },
  { label: 'Memory', value: '64', unit: '%', status: 'warning' },
  { label: 'Uptime', value: '42:10', unit: 'HRS', status: 'optimal' },
  { label: 'Pkgs', value: '142', unit: 'INST', status: 'optimal' }
];
