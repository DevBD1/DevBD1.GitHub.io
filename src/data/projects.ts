/**
 * =============================================================================
 * PROJECTS DATA - Proof of Work
 * =============================================================================
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  blockHeight: string;
  hash: string;
  gas: string;
  status: 'Confirmed' | 'Pending' | 'Failed';
  stack: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'relay-layer',
    title: 'Relay Layer',
    description: 'Production-ready multi-agent orchestration system. Coordinates tasks between specialized AI agents via a central SQLite database and dashboard.',
    blockHeight: 'Block #202602',
    hash: '0x9a...Relay',
    gas: '250k Gwei',
    status: 'Confirmed',
    stack: ['Node.js', 'SQLite', 'PM2', 'React', 'Tailwind'],
    link: 'https://relay.kukso.com',
    github: 'https://github.com/DevBD1/relay-layer',
    featured: true,
  },
  {
    id: 'wickdbot',
    title: 'WickdBot',
    description: 'Algorithmic trading bot applying Smart Money Concepts (SMC) to crypto markets. Features automated risk management and Binance execution.',
    blockHeight: 'Block #202511',
    hash: '0x3b...Wickd',
    gas: '180k Gwei',
    status: 'Confirmed',
    stack: ['Python', 'Binance API', 'Pandas', 'Docker'],
    github: 'https://github.com/DevBD1/wickdbot',
    featured: true,
  },
  {
    id: 'firstspawn',
    title: 'FirstSpawn',
    description: 'Discovery platform for Hytale servers. Connects players with communities through a robust search and listing engine.',
    blockHeight: 'Block #202408',
    hash: '0x1c...Spawn',
    gas: '120k Gwei',
    status: 'Confirmed',
    stack: ['Next.js', 'PostgreSQL', 'Redis'],
    link: '#',
    featured: false,
  },
  {
    id: 'graphsna',
    title: 'GraphSNA',
    description: 'Social Network Analysis tool using graph theory. Visualizes complex relationships and calculates centrality metrics for large datasets.',
    blockHeight: 'Block #202405',
    hash: '0x8d...Graph',
    gas: '150k Gwei',
    status: 'Confirmed',
    stack: ['Python', 'NetworkX', 'Matplotlib', 'Flask'],
    link: 'https://github.com/DevBD1/graphSNA',
    github: 'https://github.com/DevBD1/graphSNA',
    featured: false,
  },
  {
    id: 'kukso-studios',
    title: 'Kukso Studios',
    description: 'Game development studio publishing plugins for Hytale and Minecraft. Focused on enhancing multiplayer experiences.',
    blockHeight: 'Block #202312',
    hash: '0x4f...Kukso',
    gas: '90k Gwei',
    status: 'Confirmed',
    stack: ['Java', 'Kotlin', 'Game Design'],
    link: '#',
    featured: false,
  },
  {
    id: 'cognitive-fire',
    title: 'CognitiveFire',
    description: '3D Unity game exploring cognitive puzzles. Developed as a capstone project demonstrating game physics and logic.',
    blockHeight: 'Block #202306',
    hash: '0x2a...Unity',
    gas: '200k Gwei',
    status: 'Confirmed',
    stack: ['Unity', 'C#', 'Blender'],
    link: 'https://github.com/DevBD1/CognitiveFire',
    github: 'https://github.com/DevBD1/CognitiveFire',
    featured: false,
  },
];

// Featured projects for hero section
export const featuredProjects = projects.filter((p) => p.featured);
