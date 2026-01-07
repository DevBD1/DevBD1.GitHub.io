import React from 'react';
import type { Experience } from '../types/portfolio';
import { Briefcase, GraduationCap } from 'lucide-react';

// Transform Experience to TimelineEvent format for this component
interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  role: string;
  description: string;
  type: 'Education' | 'Work';
}

interface TimelineSectionProps {
  experiences: Experience[];
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ experiences }) => {
  // Transform experiences to timeline events
  const events: TimelineEvent[] = experiences.map((exp, index) => ({
    id: `TL-${String(index + 1).padStart(2, '0')}`,
    year: exp.period.split(' - ')[0], // Get start year from period
    title: exp.company,
    role: exp.role,
    description: exp.description,
    type: 'Work',
  }));

  return (
    <section id="career" className="py-32 relative">
      <div className="flex items-center gap-4 mb-20">
        <h2 className="text-4xl font-bold text-white tracking-tight">Career Trajectory</h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
      </div>

      {/* Desktop View: Horizontal */}
      <div className="hidden lg:block relative py-20 px-20">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-cyan-900/30 -translate-y-1/2">
             <div className="absolute top-0 left-0 h-full bg-cyan-500/50 w-full animate-pulse opacity-50"></div>
        </div>

        <div className="flex justify-between items-center relative z-10 w-full">
          {events.map((event, index) => {
            const isTop = index % 2 === 0;
            return (
              <div key={event.id} className="relative group flex flex-col items-center flex-1">
                 {/* Node */}
                 <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-500 z-20 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)] cursor-pointer">
                    <div className="w-full h-full rounded-full bg-cyan-400/20 animate-ping"></div>
                 </div>
                 
                 {/* Content Card - Positioning based on index */}
                 <div className={`absolute w-72 ${isTop ? 'bottom-16' : 'top-16'} transition-all duration-500 opacity-90 group-hover:opacity-100 group-hover:-translate-y-2`}>
                    <div className="glass-panel p-5 rounded-lg border border-slate-700/50 group-hover:border-cyan-500/50 relative backdrop-blur-xl">
                        {/* Connector Line to Node */}
                        <div className={`absolute left-1/2 -translate-x-1/2 w-[1px] h-10 bg-cyan-500/30 ${isTop ? '-bottom-11' : '-top-11'}`}></div>
                        
                        {/* Little dot at end of connector */}
                         <div className={`absolute left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-500 rounded-full ${isTop ? '-bottom-11' : '-top-11'}`}></div>

                        <div className="flex items-center justify-between mb-3">
                            <span className="text-cyan-400 font-mono font-bold text-lg">{event.year}</span>
                            <div className="p-1.5 rounded bg-cyan-950/50 border border-cyan-500/20">
                                {event.type === 'Work' ? <Briefcase size={14} className="text-cyan-300"/> : <GraduationCap size={14} className="text-purple-300"/>}
                            </div>
                        </div>
                        <h4 className="text-white font-bold text-lg leading-tight mb-1">{event.role}</h4>
                        <div className="text-slate-400 text-xs font-mono mb-3 uppercase tracking-wider">{event.title}</div>
                        <p className="text-slate-400 text-sm leading-relaxed">{event.description}</p>
                    </div>
                 </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View: Vertical */}
      <div className="lg:hidden relative pl-8 border-l-2 border-cyan-900/30 ml-4 space-y-12">
        {events.map((event) => (
          <div key={event.id} className="relative group">
             {/* Node */}
             <div className="absolute -left-[41px] top-6 w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] z-10">
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping"></div>
             </div>
             
             <div className="glass-panel p-6 rounded-xl border border-slate-800 relative hover:border-cyan-500/30 transition-colors">
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
                    {event.type === 'Work' ? <Briefcase size={48} /> : <GraduationCap size={48} />}
                </div>
                
                <span className="inline-block px-3 py-1 mb-3 text-xs font-mono text-cyan-300 bg-cyan-950/50 rounded-full border border-cyan-500/20">
                    {event.year}
                </span>
                
                <h3 className="text-xl font-bold text-white mb-1">{event.role}</h3>
                <div className="text-slate-400 font-mono text-sm mb-4">{event.title}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{event.description}</p>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimelineSection;