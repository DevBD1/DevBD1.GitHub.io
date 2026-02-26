/**
 * =============================================================================
 * SKILLS DATA - Technical Skills with Market Ticker Format
 * =============================================================================
 */

export interface Skill {
  symbol: string;
  name: string;
  change: string;  // Market-style change indicator (+/- %)
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'language' | 'ai';
  proficiency: number; // 0-100 for skill bars
}

export const skills: Skill[] = [
  // Frontend
  { symbol: '$REACT', name: 'React.js', change: '+2.5%', category: 'frontend', proficiency: 90 },
  { symbol: '$NEXT', name: 'Next.js', change: '+4.2%', category: 'frontend', proficiency: 85 },
  { symbol: '$ASTRO', name: 'Astro', change: '+6.8%', category: 'frontend', proficiency: 80 },
  { symbol: '$TAILWIND', name: 'Tailwind CSS', change: '+2.1%', category: 'frontend', proficiency: 95 },
  
  // Backend
  { symbol: '$NODE', name: 'Node.js', change: '+1.8%', category: 'backend', proficiency: 90 },
  { symbol: '$EXPRESS', name: 'Express.js', change: '+1.2%', category: 'backend', proficiency: 85 },
  
  // Languages
  { symbol: '$TS', name: 'TypeScript', change: '+3.1%', category: 'language', proficiency: 90 },
  { symbol: '$JS', name: 'JavaScript', change: '+0.8%', category: 'language', proficiency: 95 },
  { symbol: '$PY', name: 'Python', change: '+1.2%', category: 'language', proficiency: 85 },
  { symbol: '$SOL', name: 'Solidity', change: '+5.0%', category: 'language', proficiency: 70 },
  
  // Database
  { symbol: '$SQL', name: 'PostgreSQL', change: '+0.5%', category: 'database', proficiency: 80 },
  { symbol: '$REDIS', name: 'Redis', change: '+1.5%', category: 'database', proficiency: 75 },
  { symbol: '$SQLITE', name: 'SQLite', change: '+0.3%', category: 'database', proficiency: 85 },
  
  // DevOps
  { symbol: '$DOCKER', name: 'Docker', change: '+0.9%', category: 'devops', proficiency: 75 },
  { symbol: '$AWS', name: 'AWS', change: '+1.1%', category: 'devops', proficiency: 70 },
  
  // AI/ML
  { symbol: '$AI', name: 'AI/ML', change: '+8.2%', category: 'ai', proficiency: 75 },
  { symbol: '$LLM', name: 'LLM Engineering', change: '+12.5%', category: 'ai', proficiency: 80 },
];

// Helper to get skills by category
export const getSkillsByCategory = (category: Skill['category']) =>
  skills.filter((s) => s.category === category);

// Categories for display
export const skillCategories = [
  { key: 'language', label: 'Languages' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Databases' },
  { key: 'devops', label: 'DevOps' },
  { key: 'ai', label: 'AI/ML' },
] as const;
