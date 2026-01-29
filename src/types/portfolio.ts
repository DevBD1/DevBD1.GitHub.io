// Unified type definitions for all portfolio layouts
// Single source of truth - all layouts consume these types

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  resumeUrl?: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  about: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  storeUrl?: string;
  githubUrl?: string;
  year?: string;
  status?: 'Deployed' | 'In Orbit' | 'Classified' | 'Active';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'Core' | 'Tools';
}

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  url: string;
}

export interface PortfolioData {
  profile: Profile;
  experiences: Experience[];
  projects: Project[];
  skills: Record<string, Skill[]>;
  blog: BlogPost[];
}
