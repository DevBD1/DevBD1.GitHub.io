// src/components/CommandToolbar.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { profile, projects, experiences, skills, certificates, education } from '../data';
import type { Project, Experience, Skill, Certificate, Education } from '../data';

interface CommandResponse {
  type: 'success' | 'error' | 'info';
  text: string;
  lines?: string[];
}

interface Command {
  pattern: RegExp;
  handler: (args: string[]) => CommandResponse;
  description: string;
}

// Helper to format project details
const formatProject = (p: Project): string[] => [
  ``,
  `┌─ ${p.title}`,
  `│ ${p.description}`,
  `│ Stack: ${p.stack.join(', ')}`,
  p.link && p.link !== '#' ? `│ Link: ${p.link}` : null,
  p.github ? `│ GitHub: ${p.github}` : null,
  `└─ ${p.blockHeight} | ${p.status}`,
].filter(Boolean) as string[];

// Helper to format experience
const formatExperience = (e: Experience): string[] => [
  ``,
  `┌─ ${e.position}`,
  `│ ${e.company} | ${e.location}`,
  `│ ${e.startDate} — ${e.endDate}`,
  `│`,
  ...e.achievements.map(a => `│ • ${a}`),
  `│`,
  `│ Tech: ${e.technologies.join(', ')}`,
  `└─`,
];

// Command registry
const createCommands = (): Command[] => [
  {
    pattern: /^help$|^\?$/,
    handler: () => ({
      type: 'info',
      text: 'Available commands:',
      lines: [
        '  about              → Who am I',
        '  projects           → List all projects',
        '  projects <name>    → Project details (try: Relay, Wickd, First)',
        '  nav <section>      → Navigate to section (about, exp, projects, skills, certs, edu, contact)',
        '  theme <mode>       → Switch theme (crab, bull, bear)',
        '  experience         → Work history',
        '  skills             → Tech stack overview',
        '  certs              → Certificates',
        '  edu                → Education',
        '  contact            → Get in touch',
        '  clear              → Clear terminal',
        '  help | ?           → Show this help',
        '',
        'Tip: Use Tab for autocomplete',
      ],
    }),
    description: 'Show available commands',
  },
  {
    pattern: /^about$/,
    handler: () => ({
      type: 'success',
      text: `${profile.fullName} — ${profile.title}`,
      lines: ['', ...profile.summary.split('. ').filter(Boolean).map(s => `  ${s.trim()}.`), ''],
    }),
    description: 'Show profile summary',
  },
  {
    pattern: /^projects$/,
    handler: () => ({
      type: 'success',
      text: `${projects.length} projects found:`,
      lines: [
        '',
        ...projects.map(p => `  • ${p.title.padEnd(20)} — ${p.stack.slice(0, 3).join(', ')}${p.stack.length > 3 ? '...' : ''}`),
        '',
        `Type "projects <name>" for details.`,
      ],
    }),
    description: 'List all projects',
  },
  {
    pattern: /^projects\s+(.+)$/,
    handler: (args) => {
      const query = args[0].toLowerCase();
      const match = projects.find(p => 
        p.title.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query)
      );
      
      if (!match) {
        return {
          type: 'error',
          text: `No project matching "${args[0]}"`,
          lines: ['Try: Relay, Wickd, FirstSpawn, GraphSNA, Kukso, Cognitive'],
        };
      }
      
      return {
        type: 'success',
        text: match.title,
        lines: formatProject(match),
      };
    },
    description: 'Show project details',
  },
  {
    pattern: /^nav(?:igate)?\s+(\w+)$/,
    handler: (args) => {
      const section = args[0].toLowerCase();
      const sectionMap: Record<string, string> = {
        'about': '#about',
        'exp': '#experience',
        'experience': '#experience',
        'projects': '#projects',
        'skills': '#skills',
        'certs': '#certificates',
        'certificates': '#certificates',
        'edu': '#education',
        'education': '#education',
        'contact': '#contact',
      };
      
      const target = sectionMap[section];
      if (!target) {
        return {
          type: 'error',
          text: `Unknown section: ${section}`,
          lines: ['Available: about, exp, projects, skills, certs, edu, contact'],
        };
      }
      
      // Navigate
      if (typeof document !== 'undefined') {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      return {
        type: 'success',
        text: `Navigating to ${section}...`,
      };
    },
    description: 'Navigate to section',
  },
  {
    pattern: /^theme\s+(crab|bull|bear)$/,
    handler: (args) => {
      const mode = args[0].toLowerCase() as 'crab' | 'bull' | 'bear';
      
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', mode);
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themechange', { detail: mode }));
      }
      
      const emoji = { crab: '🦀', bull: '🚀', bear: '🐻' }[mode];
      return {
        type: 'success',
        text: `Theme set to ${emoji} ${mode}`,
      };
    },
    description: 'Switch theme mode',
  },
  {
    pattern: /^experience$|^exp$|^work$/,
    handler: () => ({
      type: 'success',
      text: 'Experience:',
      lines: experiences.flatMap(formatExperience),
    }),
    description: 'Show work experience',
  },
  {
    pattern: /^skills?$/,
    handler: () => {
      const categories = [...new Set(skills.map(s => s.category))];
      return {
        type: 'success',
        text: `${skills.length} skills across ${categories.length} categories:`,
        lines: [
          '',
          ...categories.map(cat => {
            const catSkills = skills.filter(s => s.category === cat);
            return `  ${cat.padEnd(12)} → ${catSkills.map(s => s.symbol).join(' ')}`;
          }),
          '',
          'Type "skills <category>" for details.',
        ],
      };
    },
    description: 'Show tech skills',
  },
  {
    pattern: /^skills?\s+(\w+)$/,
    handler: (args) => {
      const category = args[0].toLowerCase();
      const catSkills = skills.filter(s => s.category.toLowerCase().includes(category));
      
      if (catSkills.length === 0) {
        return {
          type: 'error',
          text: `No skills in category "${category}"`,
        };
      }
      
      return {
        type: 'success',
        text: `${catSkills[0].category} (${catSkills.length} skills):`,
        lines: [
          '',
          ...catSkills.map(s => `  ${s.symbol.padEnd(10)} ${s.name.padEnd(15)} ${s.change}`),
          '',
        ],
      };
    },
    description: 'Show skills by category',
  },
  {
    pattern: /^certs?$/,
    handler: () => ({
      type: 'success',
      text: `${certificates.length} certificate(s):`,
      lines: certificates.flatMap(c => [
        '',
        `┌─ ${c.name}`,
        `│ ${c.provider}`,
        `│ ${c.issueDate}`,
        c.credentialId ? `│ ID: ${c.credentialId}` : null,
        `│ Skills: ${c.skills.join(', ')}`,
        `└─`,
      ].filter(Boolean) as string[]),
    }),
    description: 'Show certificates',
  },
  {
    pattern: /^edu(cation)?$/,
    handler: () => ({
      type: 'success',
      text: 'Education:',
      lines: education.flatMap(e => [
        '',
        `┌─ ${e.institution}`,
        `│ ${e.degree}`,
        `│ ${e.field}`,
        `│ ${e.startDate} — ${e.endDate}`,
        ...e.highlights.map(h => `│ • ${h}`),
        `└─`,
      ]),
    }),
    description: 'Show education',
  },
  {
    pattern: /^contact$/,
    handler: () => ({
      type: 'success',
      text: 'Get in touch:',
      lines: [
        '',
        `  Email    → ${profile.email}`,
        `  Location → ${profile.location}`,
        profile.socials.github ? `  GitHub   → ${profile.socials.github}` : null,
        profile.socials.linkedin ? `  LinkedIn → ${profile.socials.linkedin}` : null,
        '',
      ].filter(Boolean) as string[],
    }),
    description: 'Show contact info',
  },
  {
    pattern: /^clear$|^cls$/,
    handler: () => ({
      type: 'info',
      text: '',
      lines: [],
    }),
    description: 'Clear terminal',
  },
];

// Parse command and return response
const executeCommand = (input: string): CommandResponse => {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return { type: 'info', text: '' };
  
  const commands = createCommands();
  
  for (const cmd of commands) {
    const match = trimmed.match(cmd.pattern);
    if (match) {
      const args = match.slice(1);
      return cmd.handler(args);
    }
  }
  
  return {
    type: 'error',
    text: `Command not found: "${trimmed}"`,
    lines: ['Type "help" or "?" for available commands'],
  };
};

// Autocomplete suggestions
const getSuggestions = (input: string): string[] => {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return [];
  
  const commands = ['help', 'about', 'projects', 'experience', 'skills', 'certs', 'edu', 'contact', 'nav', 'theme', 'clear'];
  const projectNames = projects.map(p => `projects ${p.title.split(' ')[0]}`);
  const navTargets = ['nav about', 'nav experience', 'nav projects', 'nav skills', 'nav certs', 'nav edu', 'nav contact'];
  const themes = ['theme crab', 'theme bull', 'theme bear'];
  
  const all = [...commands, ...projectNames, ...navTargets, ...themes];
  
  return all.filter(cmd => cmd.startsWith(trimmed) && cmd !== trimmed).slice(0, 5);
};

export default function CommandToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ input: string; response: CommandResponse }[]>([
    { input: '', response: { type: 'info', text: 'Portfolio CLI v1.0', lines: ['Type "help" or press ? for commands', ''] } },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of history
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with ? or / (when not typing in input)
      if ((e.key === '?' || e.key === '/') && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 10);
      }
      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  // Update suggestions
  useEffect(() => {
    setSuggestions(getSuggestions(input));
  }, [input]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const response = executeCommand(input);
    
    // Handle clear command
    if (input.trim().toLowerCase() === 'clear' || input.trim().toLowerCase() === 'cls') {
      setHistory([{ input: '', response: { type: 'info', text: '', lines: [] } }]);
    } else {
      setHistory(prev => [...prev, { input, response }]);
    }
    
    setInput('');
    setSuggestions([]);
  }, [input]);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 px-3 py-2 rounded-lg text-xs font-mono border backdrop-blur-sm transition-colors hover:opacity-100 opacity-60"
        style={{ 
          backgroundColor: 'rgba(15, 23, 42, 0.9)', 
          borderColor: 'var(--color-accent)',
          color: 'var(--color-secondary)'
        }}
        title="Press ? or / to open CLI"
      >
        ? CLI
      </button>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center pb-8 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
    >
      <div 
        className="w-full max-w-2xl mx-4 rounded-lg border shadow-2xl overflow-hidden"
        style={{ 
          backgroundColor: 'rgba(15, 23, 42, 0.95)', 
          borderColor: 'var(--color-accent)',
        }}
      >
        {/* Header */}
        <div 
          className="px-4 py-2 flex items-center justify-between border-b"
          style={{ borderColor: 'var(--color-accent)' }}
        >
          <span className="text-xs font-mono" style={{ color: 'var(--color-secondary)' }}>
            Portfolio CLI v1.0
          </span>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-xs px-2 py-1 rounded transition-colors hover:bg-white/10"
            style={{ color: 'var(--color-secondary)' }}
          >
            ESC to close
          </button>
        </div>

        {/* History */}
        <div className="px-4 py-3 max-h-64 overflow-y-auto font-mono text-sm">
          {history.map((entry, i) => (
            <div key={i} className="mb-2">
              {entry.input && (
                <div className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-primary)' }}>❯</span>
                  <span style={{ color: 'var(--color-text-base)' }}>{entry.input}</span>
                </div>
              )}
              <div 
                className="pl-4 whitespace-pre-wrap"
                style={{ 
                  color: entry.response.type === 'error' ? '#ef4444' : 
                         entry.response.type === 'success' ? 'var(--color-primary)' : 
                         'var(--color-secondary)'
                }}
              >
                {entry.response.text}
                {entry.response.lines?.map((line, j) => (
                  <div key={j} style={{ color: 'var(--color-text-base)' }}>{line}</div>
                ))}
              </div>
            </div>
          ))}
          <div ref={historyEndRef} />
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div 
            className="px-4 py-2 border-t text-xs font-mono"
            style={{ 
              backgroundColor: 'rgba(100, 116, 139, 0.1)',
              borderColor: 'var(--color-accent)',
              color: 'var(--color-secondary)'
            }}
          >
            <span className="opacity-60 mr-2">Suggestions:</span>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(s)}
                className="mr-3 px-2 py-0.5 rounded transition-colors hover:bg-white/10"
                style={{ color: 'var(--color-primary)' }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="px-4 py-3 border-t flex items-center gap-2" style={{ borderColor: 'var(--color-accent)' }}>
          <span style={{ color: 'var(--color-primary)' }}>❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command..."
            className="flex-1 bg-transparent outline-none font-mono text-sm"
            style={{ color: 'var(--color-text-base)' }}
            autoFocus
          />
          <button 
            type="submit"
            className="text-xs px-3 py-1 rounded transition-colors"
            style={{ 
              backgroundColor: 'var(--color-primary)', 
              color: 'var(--color-bg-base)',
              opacity: input.trim() ? 1 : 0.5 
            }}
            disabled={!input.trim()}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
