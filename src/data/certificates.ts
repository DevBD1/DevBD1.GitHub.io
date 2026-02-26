/**
 * =============================================================================
 * CERTIFICATES DATA
 * =============================================================================
 */

export interface Certificate {
  id: string;
  name: string;
  provider: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
}

export const certificates: Certificate[] = [
  {
    id: 'btk-python-tensorflow',
    name: 'Veri Bilimi için Python ve TensorFlow',
    provider: 'BTK Akademi',
    issuer: 'BTK Akademi (T.C. Cumhurbaşkanlığı Dijital Dönüşüm Ofisi)',
    issueDate: '2024',
    credentialId: '103126',
    credentialUrl: 'https://www.btkakademi.gov.tr/portal/profile',
    skills: ['Python', 'TensorFlow', 'Data Science', 'Machine Learning', 'Deep Learning'],
  },
];
