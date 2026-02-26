/**
 * =============================================================================
 * PROFILE DATA - Personal Information
 * =============================================================================
 */

export interface Profile {
  name: string;
  surname: string;
  fullName: string;
  title: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  summary: string;
  
  // Social links
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
  
  // Roles for typewriter animation
  titles: string[];
  
  // Key highlights for hero section
  highlights: string[];
}

export const profile: Profile = {
  name: 'Burak',
  surname: 'Dorman',
  fullName: 'Burak Dorman',
  title: 'Software Engineer',
  location: 'Tuzla, Istanbul, Turkiye',
  email: 'burakdorman@gmail.com',
  
  socials: {
    github: 'https://github.com/DevBD1',
    linkedin: 'https://linkedin.com/in/burakdorman',
    portfolio: 'https://devbd1.github.io/',
  },
  
  titles: [
    'Information Systems Engineer',
    'Software Engineer',
    'Full Stack Developer',
    'AI/ML Engineer',
    'Data Scientist',
    'Quantitative Developer',
    'Backend Software Engineer',
    'Algorithmic Trader',
  ],
  
  summary: 'ISE student building AI solutions and fast algorithmic trade bots. Seeking Quantitative Developer, Backend, and AI/ML Engineering opportunities.',
  
  highlights: [
    'Built production multi-agent orchestration systems',
    'Developed algorithmic trading bots with real market execution',
    'Full-stack experience from databases to UI',
  ],
};
