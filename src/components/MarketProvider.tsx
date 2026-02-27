// src/components/MarketProvider.tsx
import React, { useEffect } from 'react';
import type { MarketData } from '../types/theme';
import { marketStore } from '../stores/marketStore';

interface MarketCache {
  data: MarketData;
  timestamp: number;
}

const CACHE_KEY = 'market-data-cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getLocalStorage(): Storage | null {
  try {
    if (typeof window === 'undefined') return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

// Initializes the client-side market store.
// - Avoids any build-time/SSR fetches.
// - Optionally hydrates from provided initialData.
// - Fetches fresh data client-side from the API route after mount.

interface MarketProviderProps {
  initialData?: MarketData | null;
}

export const MarketProvider: React.FC<MarketProviderProps> = ({ initialData = null }) => {
  // Hydrate store from initialData (if any) once on mount.
  useEffect(() => {
    if (!initialData) return;

    marketStore.set(initialData);

    // Best-effort: seed the client cache so subsequent navigations don't refetch immediately.
    const ls = getLocalStorage();
    if (!ls) return;

    try {
      const cache: MarketCache = { data: initialData, timestamp: Date.now() };
      ls.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch {
      // Ignore quota / serialization issues.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch live market sentiment client-side (with a small localStorage cache to avoid rate limits).
  useEffect(() => {
    const controller = new AbortController();
    const ls = getLocalStorage();

    // 1) Try cache first.
    if (ls) {
      try {
        const raw = ls.getItem(CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<MarketCache>;
          const timestamp = typeof parsed.timestamp === 'number' ? parsed.timestamp : 0;
          const age = Date.now() - timestamp;

          if (parsed.data && age >= 0 && age < CACHE_TTL) {
            marketStore.set(parsed.data as MarketData);
            return () => controller.abort(); // Cache hit; do not fetch.
          }
        }
      } catch {
        // Ignore invalid cache.
      }
    }

    // 2) Cache miss or stale → fetch.
    (async () => {
      try {
        const res = await fetch('/api/market-sentiment', {
          signal: controller.signal,
          headers: { Accept: 'application/json' }
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch market sentiment: ${res.status} ${res.statusText}`);
        }

        const data = (await res.json()) as MarketData;
        if (data) {
          marketStore.set(data);

          // 3) Store into cache.
          if (ls) {
            try {
              const cache: MarketCache = { data, timestamp: Date.now() };
              ls.setItem(CACHE_KEY, JSON.stringify(cache));
            } catch {
              // Ignore quota / serialization issues.
            }
          }
        }
      } catch (err) {
        // Non-fatal: keep default theme (crab) and allow manual overrides.
        if ((err as any)?.name === 'AbortError') return;
        console.warn('[MarketProvider] client-side fetch failed:', err);
      }
    })();

    return () => controller.abort();
  }, []);

  return null; // Invisible component
};
