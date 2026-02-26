/**
 * =============================================================================
 * EDUCATION DATA
 * =============================================================================
 */

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  gpa?: string;
  highlights: string[];
}

export const education: Education[] = [
  {
    id: 'kocaeli-ise',
    institution: 'Kocaeli University',
    degree: 'Bachelor of Engineering',
    field: 'Information Systems Engineering',
    location: 'Kocaeli, Turkey',
    startDate: '2022',
    endDate: 'Present',
    highlights: [
      'Focus on AI/ML, software engineering, and quantitative methods',
      'Capstone project: CognitiveFire 3D Unity game',
      'Graph theory and social network analysis research',
    ],
  },
  {
    id: 'itu-marine',
    institution: 'Istanbul Technical University',
    degree: 'Bachelor of Engineering',
    field: 'Marine Engineering',
    location: 'Istanbul, Turkey',
    startDate: '2019',
    endDate: '2022',
    highlights: [
      'Fundamental engineering principles and systems design',
      'Transitioned to Information Systems Engineering in 2022',
      'Strong mathematical and analytical foundation',
    ],
  },
];
