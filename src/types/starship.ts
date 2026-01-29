// Starship-specific types and transformers
// Single source of truth for Starship theme data structures

import type { Project as PortfolioProject } from './portfolio';

export interface StarshipProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: 'Deployed' | 'In Orbit' | 'Classified';
  liveUrl?: string;
  storeUrl?: string;
  githubUrl?: string;
}

// Transform portfolio projects to Starship format
export function toStarshipProject(project: PortfolioProject, index: number): StarshipProject {
  return {
    id: project.id || `PRJ-${String(index + 1).padStart(2, '0')}`,
    title: project.title,
    description: project.description,
    tech: project.technologies,
    status: (project.status as StarshipProject['status']) || 'Deployed',
    liveUrl: project.liveUrl,
    storeUrl: project.storeUrl,
    githubUrl: project.githubUrl,
  };
}
