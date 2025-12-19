
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
    id: 'setup-storage',
    name: 'Storage Access',
    category: 'System',
    description: 'Grants Termux access to shared storage (Photos, Downloads, etc).',
    command: 'termux-setup-storage',
    tags: ['setup', 'permissions'],
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
    id: 'ffmpeg-conv',
    name: 'FFmpeg Converter',
    category: 'Media',
    description: 'Converts media files between formats (e.g., MKV to MP4).',
    command: 'ffmpeg -i input.mkv -c copy output.mp4',
    tags: ['media', 'processing'],
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
    id: 'nodejs-lts',
    name: 'Node.js Environment',
    category: 'Dev',
    description: 'Installs Node.js LTS and NPM for JavaScript development.',
    command: 'pkg install nodejs-lts',
    tags: ['javascript', 'dev'],
    complexity: 'Low'
  },
  {
    id: 'proot-distro',
    name: 'Linux Distros',
    category: 'System',
    description: 'Install full Linux distributions (Ubuntu, Arch, etc) inside Termux.',
    command: 'pkg install proot-distro && proot-distro list',
    tags: ['linux', 'virtualization'],
    complexity: 'High'
  },
  {
    id: 'ssh-server',
    name: 'SSH Server',
    category: 'Network',
    description: 'Start OpenSSH server to access Termux from your PC.',
    command: 'sshd && echo "SSHD Started. Port 8022"',
    tags: ['remote', 'server'],
    complexity: 'Medium'
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
  },
  {
    id: 'aria2',
    name: 'Aria2 Downloader',
    category: 'Utility',
    description: 'High speed multi-protocol and multi-source download utility.',
    command: 'aria2c -x 16 [URL]',
    tags: ['download', 'utility'],
    complexity: 'Medium'
  },
  {
    id: 'vim-editor',
    name: 'Vim Editor',
    category: 'Dev',
    description: 'Install and configure the ubiquitous text editor.',
    command: 'pkg install vim',
    tags: ['editor', 'cli'],
    complexity: 'Low'
  }
];

export const MOCK_STATS: SystemStat[] = [
  { label: 'Storage', value: '12.4', unit: 'GB', status: 'optimal' },
  { label: 'Memory', value: '64', unit: '%', status: 'warning' },
  { label: 'Uptime', value: '42:10', unit: 'HRS', status: 'optimal' },
  { label: 'Pkgs', value: '142', unit: 'INST', status: 'optimal' }
];
