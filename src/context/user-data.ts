// src/context/user-data.ts

export const USER_DATA = {
  name: "Burak",
  surname: "Dorman",
  fullName: "Burak Dorman",
  location: "Tuzla, Istanbul, Turkiye",
  email: "burakdorman@gmail.com",
  
  // Hero section bio
  summary: "ISE student building AI solutions and fast algorithmic trade bots. Seeking Quantitative Developer, Backend, and AI/ML Engineering opportunities.",

  // Roles for Typewriter animation
  titles: [
    "Information Systems Engineer",
    "Software Engineer",
    "Full Stack Developer",
    "AI/ML Engineer",
    "Data Scientist",
    "Quantitative Developer",
    "Backend Software Engineer",
    "Algorithmic Trader"
  ],

  // Project data for Proof of Work section
  projects: [
    {
      title: "Relay Layer",
      description: "Production-ready multi-agent orchestration system. Coordinates tasks between specialized AI agents via a central SQLite database and dashboard.",
      blockHeight: "Block #202602",
      hash: "0x9a...Relay",
      gas: "250k Gwei",
      status: "Confirmed",
      stack: ['Node.js', 'SQLite', 'PM2', 'React', 'Tailwind'],
      link: "https://relay.kukso.com"
    },
    {
      title: "WickdBot",
      description: "Algorithmic trading bot applying Smart Money Concepts (SMC) to crypto markets. Features automated risk management and Binance execution.",
      blockHeight: "Block #202511",
      hash: "0x3b...Wickd",
      gas: "180k Gwei",
      status: "Confirmed",
      stack: ['Python', 'Binance API', 'Pandas', 'Docker'],
      link: "#"
    },
    {
      title: "FirstSpawn",
      description: "Discovery platform for Hytale servers. Connects players with communities through a robust search and listing engine.",
      blockHeight: "Block #202408",
      hash: "0x1c...Spawn",
      gas: "120k Gwei",
      status: "Confirmed",
      stack: ['Next.js', 'PostgreSQL', 'Redis'],
      link: "#"
    },
    {
      title: "GraphSNA",
      description: "Social Network Analysis tool using graph theory. Visualizes complex relationships and calculates centrality metrics for large datasets.",
      blockHeight: "Block #202405",
      hash: "0x8d...Graph",
      gas: "150k Gwei",
      status: "Confirmed",
      stack: ['Python', 'NetworkX', 'Matplotlib', 'Flask'],
      link: "https://github.com/DevBD1/graphSNA"
    },
    {
      title: "Kukso Studios",
      description: "Game development studio publishing plugins for Hytale and Minecraft. Focused on enhancing multiplayer experiences.",
      blockHeight: "Block #202312",
      hash: "0x4f...Kukso",
      gas: "90k Gwei",
      status: "Confirmed",
      stack: ['Java', 'Kotlin', 'Game Design'],
      link: "#"
    },
    {
      title: "CognitiveFire",
      description: "3D Unity game exploring cognitive puzzles. Developed as a capstone project demonstrating game physics and logic.",
      blockHeight: "Block #202306",
      hash: "0x2a...Unity",
      gas: "200k Gwei",
      status: "Confirmed",
      stack: ['Unity', 'C#', 'Blender'],
      link: "https://github.com/DevBD1/CognitiveFire"
    }
  ],

  // Links for footer/socials
  socials: {
    github: "https://github.com/DevBD1",
    portfolio: "https://devbd1.github.io/"
  },

  // Sliding header tech stack
  skills: [
    { symbol: '$REACT', name: 'React.js', change: '+2.5%' },
    { symbol: '$NEXT', name: 'Next.js', change: '+4.2%' },
    { symbol: '$NODE', name: 'Node.js', change: '+1.8%' },
    { symbol: '$TS', name: 'TypeScript', change: '+3.1%' },
    { symbol: '$SOL', name: 'Solidity', change: '+5.0%' },
    { symbol: '$PY', name: 'Python', change: '+1.2%' },
    { symbol: '$SQL', name: 'PostgreSQL', change: '+0.5%' },
    { symbol: '$ASTRO', name: 'Astro', change: '+6.8%' },
    { symbol: '$TAILWIND', name: 'Tailwind', change: '+2.1%' },
    { symbol: '$DOCKER', name: 'Docker', change: '+0.9%' },
  ]
};
