import React from 'react';
import { TimelineEvent } from '../types';
import { Briefcase, GraduationCap } from 'lucide-react';

const events: TimelineEvent[] = [
  {
    id: 'TL-01',
    year: '2019',
    title: 'University of Tech',
    role: 'B.S. Computer Science',
    description: 'Specialized in Algorithms & AI. Led the university coding club.',
    type: 'Education',
  },
  {
    id: 'TL-02',
    year: '2020',
    title: 'Cyberdyne Systems',
    role: 'Frontend Intern',
    description: 'Developed internal tools using React. Optimized render performance by 40%.',
    type: 'Work',
  },
  {
    id: 'TL-03',
    year: '2021',
    title: 'Freelance Ops',
    role: 'Full Stack Developer',
    description: 'Delivered 15+ web solutions for startups. Mastered Node.js & Docker.',
    type: 'Work',
  },
  {
    id: 'TL-04',
    year: '2022',
    title: 'StarSystems Inc.',
    role: 'Junior Engineer',
    description: 'Core contributor to the main trading platform. Introduced TypeScript migration.',
    type: 'Work',
  },
  {
    id: 'TL-05',
    year: '2024',
    title: 'Nebula Corp',
    role: 'Senior Architect',
    description: 'Leading the frontend infrastructure team. Designing next-gen UI libraries.',
    type: 'Work',
  },
];

const TimelineSection: React.FC = () => {
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
        {events.map((event, index) => (
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