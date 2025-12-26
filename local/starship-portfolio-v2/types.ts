export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  status: 'Deployed' | 'In Orbit' | 'Classified';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Frontend' | 'Backend' | 'Core' | 'Tools';
}

export interface SystemStatus {
  fps: number;
  connection: 'STABLE' | 'UNSTABLE' | 'OFFLINE';
  coordinates: { x: number; y: number; z: number };
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  role: string;
  description: string;
  type: 'Education' | 'Work';
}