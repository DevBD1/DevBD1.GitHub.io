import React from 'react';
import ProjectCard from './ProjectCard';
import type { Project } from '../data/projects';

interface ProjectsGridProps {
  projects: Project[];
}

/**
 * Quick fix: hydrate the entire projects grid as a single island so all cards
 * receive the market store update consistently.
 *
 * Usage (Astro):
 *   <ProjectsGrid client:load projects={projects} />
 */
export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
