/**
 * =============================================================================
 * EXPERIENCE DATA - Work Experience
 * =============================================================================
 */

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  achievements: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: 'kukso-founder',
    company: 'Kukso Studios',
    position: 'Founder & Lead Developer',
    location: 'Remote',
    startDate: '2023',
    endDate: 'Present',
    description: 'Founded game development studio focused on multiplayer plugins and AI solutions.',
    achievements: [
      'Built Relay Layer multi-agent orchestration system coordinating AI agents',
      'Developed FirstSpawn discovery platform connecting Hytale communities',
      'Managed end-to-end product development from concept to deployment',
    ],
    technologies: ['Node.js', 'React', 'PostgreSQL', 'SQLite', 'PM2'],
  },
  {
    id: 'algo-trader',
    company: 'Independent',
    position: 'Algorithmic Trader & Quant Developer',
    location: 'Remote',
    startDate: '2022',
    endDate: 'Present',
    description: 'Designed and deployed algorithmic trading systems applying Smart Money Concepts.',
    achievements: [
      'Built WickdBot with automated risk management and Binance execution',
      'Implemented Smart Money Concepts (SMC) for crypto market analysis',
      'Developed real-time market data processing pipelines',
    ],
    technologies: ['Python', 'Pandas', 'Binance API', 'Docker'],
  },
  {
    id: 'student-ise',
    company: 'Kocaeli University',
    position: 'Information Systems Engineering Student',
    location: 'Kocaeli, Turkey',
    startDate: '2022',
    endDate: 'Present',
    description: 'Pursuing ISE degree with focus on AI/ML, software engineering, and quantitative methods.',
    achievements: [
      'Built GraphSNA social network analysis tool using graph theory',
      'Developed CognitiveFire 3D Unity game for capstone project',
      'Active in algorithmic trading and AI research communities',
    ],
    technologies: ['Python', 'Unity', 'C#', 'NetworkX', 'Flask'],
  },
];
