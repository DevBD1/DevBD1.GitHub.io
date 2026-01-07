import React, { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import type { Project as PortfolioProject } from '../types/portfolio';
import { StarshipProject, toStarshipProject } from '../types/starship';
import SectionHeader from './SectionHeader';
import FilterButton from './FilterButton';
import ProjectCard from './ProjectCard';

interface ProjectsSectionProps {
  projects: PortfolioProject[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects: portfolioProjects }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Transform and memoize data
  const projects = useMemo(
    () => portfolioProjects.map((p, i) => toStarshipProject(p, i)),
    [portfolioProjects]
  );

  // Filter Logic
  const allTechs = useMemo(() => Array.from(new Set(projects.flatMap(p => p.tech))), [projects]);
  const allStatuses = useMemo(() => Array.from(new Set(projects.map(p => p.status))), [projects]);

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true;
    if (project.status === activeFilter) return true;
    return project.tech.includes(activeFilter);
  });

  return (
    <section id="projects" className="py-32">
      <SectionHeader title="Mission Log" />

      {/* Filter Bar */}
      <div className="mb-10 p-4 glass-panel rounded-lg border border-slate-800/50 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-cyan-500 mr-2">
          <Filter size={16} />
          <span className="font-mono text-xs tracking-widest uppercase hidden sm:block">
            Filter Protocols:
          </span>
        </div>

        <FilterButton
          label="All Systems"
          isActive={activeFilter === 'All'}
          onClick={() => setActiveFilter('All')}
        />

        <div className="w-[1px] h-4 bg-slate-700 mx-1 hidden sm:block"></div>

        {allStatuses.map(status => (
          <FilterButton
            key={status}
            label={status}
            isActive={activeFilter === status}
            onClick={() => setActiveFilter(status)}
          />
        ))}

        <div className="w-[1px] h-4 bg-slate-700 mx-1 hidden sm:block"></div>

        {allTechs.map(tech => (
          <FilterButton
            key={tech}
            label={tech}
            isActive={activeFilter === tech}
            onClick={() => setActiveFilter(tech)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center border border-dashed border-slate-800 rounded-xl">
            <p className="text-slate-500 font-mono">NO MODULES FOUND MATCHING FILTER PARAMETERS.</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="mt-4 text-cyan-500 hover:text-cyan-400 text-sm font-mono underline underline-offset-4"
            >
              RESET FILTERS
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
