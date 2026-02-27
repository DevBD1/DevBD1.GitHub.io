// src/components/ProjectCard.tsx
import React from 'react';
import { useMarketData } from '../stores/marketStore';
import type { ProjectType } from '../data/projects';

interface ProjectProps {
  title: string;
  description: string;
  blockHeight: string;
  hash: string;
  gas: string;
  stack: string[];
  link?: string;
  status?: 'Confirmed' | 'Pending' | 'Failed';
  type: ProjectType;
  aiAssisted?: boolean;
}

const typeConfig: Record<ProjectType, { label: string; color: string; bgColor: string }> = {
  production: {
    label: 'Production',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.15)',
  },
  research: {
    label: 'Research',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.15)',
  },
  experiment: {
    label: 'Experiment',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.15)',
  },
};

export default function ProjectCard({
  title,
  description,
  blockHeight,
  hash,
  gas,
  stack,
  link,
  status = 'Confirmed',
  type,
  aiAssisted = false,
}: ProjectProps) {
  const { sentiment } = useMarketData();
  const isBull = sentiment === 'BULL';
  const isBear = sentiment === 'BEAR';

  const hoverBorderColor = isBull
    ? 'group-hover:border-emerald-500'
    : isBear
      ? 'group-hover:border-red-500'
      : 'group-hover:border-slate-500';

  const titleColor = isBull
    ? 'group-hover:text-emerald-400'
    : isBear
      ? 'group-hover:text-red-400'
      : 'group-hover:text-slate-300';

  const statusColor = status === 'Confirmed'
    ? 'text-emerald-500'
    : status === 'Pending'
      ? 'text-amber-500'
      : 'text-red-500';

  const typeStyle = typeConfig[type];

  return (
    <a
      href={link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-slate-900/50 border border-slate-800 p-6 rounded-lg transition-all duration-300 group hover:-translate-y-1 ${hoverBorderColor}`}
    >
      {/* Header: Type Badge, Hash & Block */}
      <div className="flex justify-between items-start mb-4 font-mono text-xs text-slate-500 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Project Type Badge */}
          <span
            className="px-2 py-0.5 rounded font-medium"
            style={{
              backgroundColor: typeStyle.bgColor,
              color: typeStyle.color,
              border: `1px solid ${typeStyle.color}40`,
            }}
          >
            {typeStyle.label}
          </span>

          {/* AI Badge (if applicable) */}
          {aiAssisted && (
            <span
              className="px-2 py-0.5 rounded font-medium"
              style={{
                backgroundColor: 'rgba(236, 72, 153, 0.15)',
                color: '#ec4899',
                border: '1px solid rgba(236, 72, 153, 0.4)',
              }}
              title="AI collaboration: Architecture/design assisted by AI, implementation by engineer"
            >
              AI+
            </span>
          )}

          <span className="text-slate-600">Tx:</span>
          <span className="text-slate-400 group-hover:text-white transition-colors">{hash}</span>
        </div>
        <div>{blockHeight}</div>
      </div>

      {/* Body: Title & Desc */}
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <h3 className={`text-xl font-bold mb-2 transition-colors ${titleColor}`}>
            {title}
          </h3>
          <span className={`text-xs font-mono border border-slate-700 px-2 py-0.5 rounded ${statusColor}`}>
            {status}
          </span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Footer: Metadata & Stack */}
      <div className="mt-6 pt-4 border-t border-slate-800/50 flex flex-col gap-3">
        <div className="flex justify-between text-xs font-mono text-slate-500">
          <span>
            Gas Used: <span className="text-slate-300">{gas}</span>
          </span>
          <span>
            From: <span className="text-slate-300">0xBurak</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono bg-slate-800 text-slate-300 rounded border border-slate-700/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
