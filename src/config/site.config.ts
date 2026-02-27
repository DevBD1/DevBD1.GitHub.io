/**
 * =============================================================================
 * SITE CONFIGURATION
 * =============================================================================
 * 
 * Market-themed portfolio configuration
 * Combines clean data structure with crypto market aesthetics
 * 
 * Theme Modes:
 * - crab: Neutral slate (default)
 * - bull: Growth emerald (green)  
 * - bear: Resilience red (red)
 * =============================================================================
 */

export interface SiteConfig {
  /** Site metadata */
  meta: {
    title: string;
    description: string;
    keywords: string[];
    siteUrl: string;
    locale: string;
  };

  /** Theme configuration */
  theme: {
    defaultMode: 'crab' | 'bull' | 'bear';
    allowThemeSwitch: boolean;
  };

  /** Feature toggles */
  features: {
    skillTicker: boolean;
    typewriter: boolean;
    projects: boolean;
    experience: boolean;
    education: boolean;
    certificates: boolean;
    skills: boolean;
    contact: boolean;
    resumeDownload: boolean;
  };

  /** Navigation items */
  navigation: Array<{
    label: string;
    href: string;
    icon?: string;
  }>;
}

export const siteConfig: SiteConfig = {
  meta: {
    title: 'Burak Dorman | Software Engineer',
    description: 'ISE student building AI solutions and algorithmic trade bots. Seeking Quantitative Developer, Backend, and AI/ML Engineering opportunities.',
    keywords: ['software engineer', 'full stack developer', 'AI/ML', 'quantitative developer', 'algorithmic trading'],
    siteUrl: 'https://devbd1.github.io',
    locale: 'en',
  },

  theme: {
    defaultMode: 'crab',
    allowThemeSwitch: true,
  },

  features: {
    skillTicker: true,
    typewriter: true,
    projects: true,
    experience: true,
    education: true,
    certificates: true,
    skills: true,
    contact: true,
    resumeDownload: true,
  },

  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Workshops & Certificates', href: '#certificates' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ],
};
