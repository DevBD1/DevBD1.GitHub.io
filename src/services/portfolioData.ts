// Data service layer - single source of truth for all layouts
// Fetches data from /public/data/*.json and provides React hook

import { useState, useEffect } from 'react';
import type { PortfolioData, Profile, Experience, Project, Skill, BlogPost } from '../types/portfolio';

const DATA_BASE_URL = '/data';

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${DATA_BASE_URL}/${path}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchPortfolioData(): Promise<PortfolioData> {
  const [profile, experiences, projects, skills, blog] = await Promise.all([
    fetchJson<Profile>('profile.json'),
    fetchJson<Experience[]>('experience.json'),
    fetchJson<Project[]>('projects.json'),
    fetchJson<Record<string, Skill[]>>('skills.json'),
    fetchJson<BlogPost[]>('blog.json'),
  ]);

  return { profile, experiences, projects, skills, blog };
}

export interface UsePortfolioDataResult {
  data: PortfolioData | null;
  isLoading: boolean;
  error: Error | null;
}

export function usePortfolioData(): UsePortfolioDataResult {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchPortfolioData()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading, error };
}
