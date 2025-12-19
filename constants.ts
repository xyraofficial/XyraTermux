
import { ModuleItem, SystemStat } from './types';

export const MODULES: ModuleItem[] = [
  // --- PACKAGE MANAGEMENT & REPO ---
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
    id: 'termux-change-repo',
    name: 'Change Repo',
    category: 'System',
    description: 'Switch repository mirrors if downloads are slow or failing.',
    command: 'termux-change-repo',
    tags: ['maintenance', 'network'],
    complexity: 'Low'
  },
  {
    id: 'pkg-search',
    name: 'Search Packages',
    category: 'System',
    description: 'Search for packages in the repository.',
    command: 'pkg search [query]',
    tags: ['core', 'utility'],
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

  // --- TERMUX API (HARDWARE) ---
  {
    id: 'termux-api-install',
    name: 'Install API',
    category: 'Hardware',
    description: 'Required package for accessing hardware features.',
    command: 'pkg install termux-api',
    tags: ['hardware', 'core'],
    complexity: 'Medium'
  },
  {
    id: 'battery-status',
    name: 'Battery Info',
    category: 'Hardware',
    description: 'Get device battery status.',
    command: 'termux-battery-status',
    tags: ['hardware', 'info'],
    complexity: 'Low'
  },
  {
    id: 'clipboard-set',
    name: 'Set Clipboard',
    category: 'Hardware',
    description: 'Set the system clipboard text.',
    command: 'termux-clipboard-set "Hello Termux"',
    tags: ['hardware', 'utility'],
    complexity: 'Low'
  },
  {
    id: 'wifi-info',
    name: 'WiFi Info',
    category: 'Hardware',
    description: 'Get information about current WiFi connection.',
    command: 'termux-wifi-connectioninfo',
    tags: ['hardware', 'network'],
    complexity: 'Medium'
  },
  {
    id: 'torch-on',
    name: 'Flashlight On',
    category: 'Hardware',
    description: 'Turn on the device flashlight.',
    command: 'termux-torch on',
    tags: ['hardware', 'utility'],
    complexity: 'Low'
  },

  // --- SYSTEM TOOLS ---
  {
    id: 'htop',
    name: 'Htop Monitor',
    category: 'System',
    description: 'Interactive process viewer and system monitor.',
    command: 'pkg install htop && htop',
    tags: ['monitoring', 'cli'],
    complexity: 'Low'
  },
  {
    id: 'neofetch',
    name: 'Neofetch',
    category: 'System',
    description: 'Displays system information in a visually pleasing way.',
    command: 'pkg install neofetch && neofetch',
    tags: ['info', 'customization'],
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

  // --- NETWORK & SECURITY ---
  {
    id: 'net-scan',
    name: 'Nmap Scanner',
    category: 'Network',
    description: 'Scans target IP for open ports and service versions using Nmap.',
    command: 'pkg install nmap && nmap -sV [IP_ADDRESS]',
    tags: ['recon', 'security'],
    complexity: 'Medium'
  },
  {
    id: 'ssh-server',
    name: 'SSH Server',
    category: 'Network',
    description: 'Start OpenSSH server to access Termux from your PC.',
    command: 'pkg install openssh && sshd && echo "Port: 8022"',
    tags: ['remote', 'server'],
    complexity: 'Medium'
  },
  {
    id: 'metasploit',
    name: 'Metasploit',
    category: 'Security',
    description: 'Advanced penetration testing framework installation script.',
    command: 'pkg install wget && wget https://github.com/gushmazuko/metasploit_in_termux/raw/master/metasploit.sh && bash metasploit.sh',
    tags: ['hacking', 'advanced'],
    complexity: 'High'
  },
  {
    id: 'hydra',
    name: 'Hydra',
    category: 'Security',
    description: 'Parallelized login cracker which supports numerous protocols.',
    command: 'pkg install hydra',
    tags: ['hacking', 'brute-force'],
    complexity: 'High'
  },
  {
    id: 'sqlmap',
    name: 'SQLMap',
    category: 'Security',
    description: 'Automatic SQL injection and database takeover tool.',
    command: 'pkg install python && pip install sqlmap',
    tags: ['hacking', 'database'],
    complexity: 'Medium'
  },
  {
    id: 'whois',
    name: 'Whois',
    category: 'Network',
    description: 'Client for the whois directory service.',
    command: 'pkg install whois && whois google.com',
    tags: ['recon', 'info'],
    complexity: 'Low'
  },

  // --- DEVELOPMENT ---
  {
    id: 'git-config',
    name: 'Git Setup',
    category: 'Dev',
    description: 'Configures global user name and email for version control.',
    command: 'pkg install git && git config --global user.name "Your Name" && git config --global user.email "you@example.com"',
    tags: ['git', 'setup'],
    complexity: 'Low'
  },
  {
    id: 'python-dev',
    name: 'Python Env',
    category: 'Dev',
    description: 'Installs Python 3, PIP, and virtualenv.',
    command: 'pkg install python python-pip && pip install virtualenv',
    tags: ['python', 'coding'],
    complexity: 'Low'
  },
  {
    id: 'nodejs-lts',
    name: 'Node.js LTS',
    category: 'Dev',
    description: 'Installs Node.js LTS and NPM for JavaScript development.',
    command: 'pkg install nodejs-lts',
    tags: ['javascript', 'web'],
    complexity: 'Low'
  },
  {
    id: 'clang',
    name: 'Clang / C++',
    category: 'Dev',
    description: 'C language family frontend for LLVM.',
    command: 'pkg install clang make',
    tags: ['c++', 'compiler'],
    complexity: 'Medium'
  },
  {
    id: 'rust-lang',
    name: 'Rust',
    category: 'Dev',
    description: 'Systems programming language that runs blazingly fast.',
    command: 'pkg install rust',
    tags: ['rust', 'compiler'],
    complexity: 'Medium'
  },
  {
    id: 'golang',
    name: 'Go Lang',
    category: 'Dev',
    description: 'The Go programming language.',
    command: 'pkg install golang',
    tags: ['go', 'compiler'],
    complexity: 'Medium'
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'Dev',
    description: 'Server-side scripting language.',
    command: 'pkg install php',
    tags: ['php', 'web'],
    complexity: 'Medium'
  },
  {
    id: 'ruby',
    name: 'Ruby',
    category: 'Dev',
    description: 'Dynamic, open source programming language.',
    command: 'pkg install ruby',
    tags: ['ruby', 'scripting'],
    complexity: 'Medium'
  },
  {
    id: 'vim-editor',
    name: 'Vim Editor',
    category: 'Dev',
    description: 'Highly configurable text editor built to make creating changing text very efficient.',
    command: 'pkg install vim',
    tags: ['editor', 'cli'],
    complexity: 'Medium'
  },
  {
    id: 'nano-editor',
    name: 'Nano Editor',
    category: 'Dev',
    description: 'Simple, easy to use command line text editor.',
    command: 'pkg install nano',
    tags: ['editor', 'cli'],
    complexity: 'Low'
  },

  // --- WEB & SERVERS ---
  {
    id: 'py-server',
    name: 'Python HTTP',
    category: 'Web',
    description: 'Instantly hosts the current directory on port 8000.',
    command: 'python -m http.server 8000',
    tags: ['utility', 'server'],
    complexity: 'Low'
  },
  {
    id: 'nginx',
    name: 'Nginx Server',
    category: 'Web',
    description: 'High performance HTTP and reverse proxy server.',
    command: 'pkg install nginx && nginx',
    tags: ['server', 'web'],
    complexity: 'Medium'
  },
  {
    id: 'apache2',
    name: 'Apache2',
    category: 'Web',
    description: 'The most popular web server.',
    command: 'pkg install apache2 && apachectl start',
    tags: ['server', 'web'],
    complexity: 'Medium'
  },
  {
    id: 'mariadb',
    name: 'MariaDB',
    category: 'Database',
    description: 'Community-developed fork of the MySQL relational database.',
    command: 'pkg install mariadb && mysqld_safe',
    tags: ['sql', 'database'],
    complexity: 'Medium'
  },

  // --- UTILITIES ---
  {
    id: 'yt-dl',
    name: 'YT-DLP',
    category: 'Media',
    description: 'Command-line audio/video downloader.',
    command: 'pkg install python && pip install yt-dlp',
    tags: ['media', 'download'],
    complexity: 'Medium'
  },
  {
    id: 'ffmpeg-conv',
    name: 'FFmpeg',
    category: 'Media',
    description: 'Complete, cross-platform solution to record, convert and stream audio and video.',
    command: 'pkg install ffmpeg',
    tags: ['media', 'processing'],
    complexity: 'Medium'
  },
  {
    id: 'aria2',
    name: 'Aria2',
    category: 'Utility',
    description: 'Lightweight multi-protocol & multi-source command-line download utility.',
    command: 'pkg install aria2',
    tags: ['download', 'fast'],
    complexity: 'Low'
  },
  {
    id: 'wget',
    name: 'Wget',
    category: 'Utility',
    description: 'Network utility to retrieve files from the Web.',
    command: 'pkg install wget',
    tags: ['download', 'cli'],
    complexity: 'Low'
  },
  {
    id: 'curl',
    name: 'Curl',
    category: 'Utility',
    description: 'Command line tool for transferring data with URLs.',
    command: 'pkg install curl',
    tags: ['network', 'cli'],
    complexity: 'Low'
  },
  {
    id: 'oh-my-zsh',
    name: 'Oh My Zsh',
    category: 'Customization',
    description: 'Framework for managing your Zsh configuration.',
    command: 'pkg install zsh git curl && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"',
    tags: ['shell', 'theme'],
    complexity: 'Medium'
  },
  {
    id: 'cmatrix',
    name: 'CMatrix',
    category: 'Fun',
    description: 'Scrolling \'Matrix\' like screen in the terminal.',
    command: 'pkg install cmatrix && cmatrix',
    tags: ['screensaver', 'fun'],
    complexity: 'Low'
  },
  {
    id: 'sl',
    name: 'Steam Locomotive',
    category: 'Fun',
    description: 'A steam locomotive runs across your screen if you mistype ls.',
    command: 'pkg install sl && sl',
    tags: ['fun', 'cli'],
    complexity: 'Low'
  }
];

export const MOCK_STATS: SystemStat[] = [
  { label: 'Storage', value: '12.4', unit: 'GB', status: 'optimal' },
  { label: 'Memory', value: '64', unit: '%', status: 'warning' },
  { label: 'Uptime', value: '42:10', unit: 'HRS', status: 'optimal' },
  { label: 'Pkgs', value: '185', unit: 'INST', status: 'optimal' }
];
