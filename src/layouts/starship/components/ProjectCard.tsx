import React from 'react';
import { Project } from '../types';
import { ExternalLink, Github, Code } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <div 
      className="group relative glass-panel rounded-xl overflow-hidden hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header bar */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-70"></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
           <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-cyan-950/50 border border-cyan-500/20">
              <span className={`w-2 h-2 rounded-full ${project.status === 'Deployed' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300">{project.status}</span>
           </div>
           <div className="text-slate-500 font-mono text-xs">ID: {project.id}</div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t, i) => (
            <span key={i} className="px-2 py-1 text-xs font-mono text-cyan-200 bg-cyan-900/20 border border-cyan-800/30 rounded">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-800">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold bg-slate-800 hover:bg-cyan-900/50 text-white rounded transition-colors group/btn">
            <ExternalLink size={14} className="group-hover/btn:text-cyan-400" />
            <span>Launch</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold bg-transparent border border-slate-700 hover:border-cyan-500/50 text-slate-300 rounded transition-colors">
            <Github size={14} />
            <span>Source</span>
          </button>
        </div>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500/30 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-500/30 rounded-bl-lg"></div>
    </div>
  );
};

export default ProjectCard;
