/**
 * Theme Tokens - JavaScript/TypeScript Color Constants
 * 
 * This file exports the color palette as typed objects for programmatic use.
 * Keep in sync with src/styles/global.css
 * 
 * @module theme-tokens
 */

// =============================================================================
// Type Definitions
// =============================================================================

/** Available theme modes */
export type ThemeMode = 'crab' | 'bull' | 'bear';

/** Color format variants */
export interface ColorValue {
  /** Hex color code */
  hex: string;
  /** RGB values as object */
  rgb: { r: number; g: number; b: number };
  /** RGB string format */
  rgbString: string;
  /** Tailwind CSS reference */
  tailwind: string;
}

/** RGBA color for accents */
export interface AccentColor {
  /** RGBA string */
  rgba: string;
  /** Base RGB values */
  rgb: { r: number; g: number; b: number };
  /** Opacity value (0-1) */
  opacity: number;
  /** Hex equivalent (approximate) */
  hex: string;
}

/** Complete theme configuration */
export interface ThemeConfig {
  /** Display name */
  name: string;
  /** Emoji icon */
  emoji: string;
  /** Theme sentiment description */
  sentiment: string;
  /** Primary brand color */
  primary: ColorValue;
  /** Secondary/supporting color */
  secondary: ColorValue;
  /** Background base color */
  bgBase: ColorValue;
  /** Accent overlay color (RGBA) */
  accent: AccentColor;
  /** Background gradient */
  gradient: {
    /** Full CSS gradient value */
    css: string;
    /** Gradient center position (x y) */
    center: string;
    /** Start color */
    start: string;
    /** End color */
    end: string;
    /** Fade percentage */
    fadeAt: string;
  };
}

// =============================================================================
// Base Colors (Shared)
// =============================================================================

/** Text color used across all themes */
export const textBase: ColorValue = {
  hex: '#e2e8f0',
  rgb: { r: 226, g: 232, b: 240 },
  rgbString: 'rgb(226, 232, 240)',
  tailwind: 'slate-200',
};

// =============================================================================
// Crab Theme (Neutral Slate)
// =============================================================================

export const crabTheme: ThemeConfig = {
  name: 'Crab',
  emoji: '🦀',
  sentiment: 'Neutral / Baseline',

  primary: {
    hex: '#64748b',
    rgb: { r: 100, g: 116, b: 139 },
    rgbString: 'rgb(100, 116, 139)',
    tailwind: 'slate-500',
  },

  secondary: {
    hex: '#94a3b8',
    rgb: { r: 148, g: 163, b: 184 },
    rgbString: 'rgb(148, 163, 184)',
    tailwind: 'slate-400',
  },

  bgBase: {
    hex: '#0f172a',
    rgb: { r: 15, g: 23, b: 42 },
    rgbString: 'rgb(15, 23, 42)',
    tailwind: 'slate-900',
  },

  accent: {
    rgba: 'rgba(100, 116, 139, 0.1)',
    rgb: { r: 100, g: 116, b: 139 },
    opacity: 0.1,
    hex: '#64748b1a',
  },

  gradient: {
    css: 'radial-gradient(circle at 50% 10%, #1e293b 0%, #0f172a 60%)',
    center: '50% 10%',
    start: '#1e293b',
    end: '#0f172a',
    fadeAt: '60%',
  },
};

// =============================================================================
// Bull Theme (Growth Emerald)
// =============================================================================

export const bullTheme: ThemeConfig = {
  name: 'Bull',
  emoji: '🚀',
  sentiment: 'Growth / Optimism',

  primary: {
    hex: '#10b981',
    rgb: { r: 16, g: 185, b: 129 },
    rgbString: 'rgb(16, 185, 129)',
    tailwind: 'emerald-500',
  },

  secondary: {
    hex: '#34d399',
    rgb: { r: 52, g: 211, b: 153 },
    rgbString: 'rgb(52, 211, 153)',
    tailwind: 'emerald-400',
  },

  bgBase: {
    hex: '#020617',
    rgb: { r: 2, g: 6, b: 23 },
    rgbString: 'rgb(2, 6, 23)',
    tailwind: 'slate-950',
  },

  accent: {
    rgba: 'rgba(16, 185, 129, 0.2)',
    rgb: { r: 16, g: 185, b: 129 },
    opacity: 0.2,
    hex: '#10b98133',
  },

  gradient: {
    css: 'radial-gradient(circle at 50% 120%, rgba(16, 185, 129, 0.15) 0%, #020617 70%)',
    center: '50% 120%',
    start: 'rgba(16, 185, 129, 0.15)',
    end: '#020617',
    fadeAt: '70%',
  },
};

// =============================================================================
// Bear Theme (Resilience Red)
// =============================================================================

export const bearTheme: ThemeConfig = {
  name: 'Bear',
  emoji: '🐻',
  sentiment: 'Resilience / Caution',

  primary: {
    hex: '#ef4444',
    rgb: { r: 239, g: 68, b: 68 },
    rgbString: 'rgb(239, 68, 68)',
    tailwind: 'red-500',
  },

  secondary: {
    hex: '#f87171',
    rgb: { r: 248, g: 113, b: 113 },
    rgbString: 'rgb(248, 113, 113)',
    tailwind: 'red-400',
  },

  bgBase: {
    hex: '#18181b',
    rgb: { r: 24, g: 24, b: 27 },
    rgbString: 'rgb(24, 24, 27)',
    tailwind: 'zinc-900',
  },

  accent: {
    rgba: 'rgba(239, 68, 68, 0.2)',
    rgb: { r: 239, g: 68, b: 68 },
    opacity: 0.2,
    hex: '#ef444433',
  },

  gradient: {
    css: 'radial-gradient(circle at 50% -20%, rgba(239, 68, 68, 0.15) 0%, #18181b 70%)',
    center: '50% -20%',
    start: 'rgba(239, 68, 68, 0.15)',
    end: '#18181b',
    fadeAt: '70%',
  },
};

// =============================================================================
// Theme Collections
// =============================================================================

/** All themes indexed by mode */
export const themes: Record<ThemeMode, ThemeConfig> = {
  crab: crabTheme,
  bull: bullTheme,
  bear: bearTheme,
};

/** Array of all themes for iteration */
export const allThemes: ThemeConfig[] = [crabTheme, bullTheme, bearTheme];

/** Theme modes array for dropdowns/selects */
export const themeModes: ThemeMode[] = ['crab', 'bull', 'bear'];

/** Default theme mode */
export const defaultTheme: ThemeMode = 'crab';

// =============================================================================
// CSS Variable Names (for programmatic access)
// =============================================================================

export const cssVariables = {
  primary: '--color-primary',
  secondary: '--color-secondary',
  bgBase: '--color-bg-base',
  textBase: '--color-text-base',
  accent: '--color-accent',
  gradient: '--bg-gradient',
} as const;

/** Type for CSS variable keys */
export type CssVariableKey = keyof typeof cssVariables;

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get theme configuration by mode
 * @param mode - Theme mode
 * @returns Theme configuration
 */
export function getTheme(mode: ThemeMode): ThemeConfig {
  return themes[mode];
}

/**
 * Get the current theme from the document
 * @returns Current theme mode or default
 */
export function getCurrentTheme(): ThemeMode {
  if (typeof document === 'undefined') return defaultTheme;
  const attr = document.documentElement.getAttribute('data-theme');
  return (attr as ThemeMode) || defaultTheme;
}

/**
 * Set theme on the document
 * @param mode - Theme mode to set
 */
export function setTheme(mode: ThemeMode | null): void {
  if (typeof document === 'undefined') return;
  if (mode === null || mode === defaultTheme) {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', mode);
  }
}

/**
 * Toggle between themes
 * @param modes - Array of modes to cycle through (defaults to all)
 * @returns Next theme mode
 */
export function cycleTheme(modes: ThemeMode[] = themeModes): ThemeMode {
  const current = getCurrentTheme();
  const currentIndex = modes.indexOf(current);
  const nextIndex = (currentIndex + 1) % modes.length;
  const nextMode = modes[nextIndex];
  setTheme(nextMode);
  return nextMode;
}

/**
 * Get CSS variable value
 * @param variable - CSS variable name (with or without --)
 * @param element - Element to read from (defaults to document.documentElement)
 * @returns CSS variable value
 */
export function getCssVariable(
  variable: string,
  element?: HTMLElement
): string {
  if (typeof window === 'undefined') return '';
  const varName = variable.startsWith('--') ? variable : `--${variable}`;
  const target = element ?? document.documentElement;
  return getComputedStyle(target).getPropertyValue(varName).trim();
}

/**
 * Convert hex to RGB object
 * @param hex - Hex color string
 * @returns RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

/**
 * Convert RGB to hex string
 * @param r - Red (0-255)
 * @param g - Green (0-255)
 * @param b - Blue (0-255)
 * @returns Hex color string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

// =============================================================================
// Constants for Common Operations
// =============================================================================

/** Transition durations (matches CSS) */
export const transitions = {
  backgroundColor: '0.8s',
  color: '0.5s',
  backgroundImage: '0.8s',
} as const;

/** Timing function (matches CSS) */
export const easing = 'ease';

// =============================================================================
// Default Export
// =============================================================================

export default {
  textBase,
  crab: crabTheme,
  bull: bullTheme,
  bear: bearTheme,
  themes,
  allThemes,
  themeModes,
  defaultTheme,
  cssVariables,
  transitions,
  easing,
  getTheme,
  getCurrentTheme,
  setTheme,
  cycleTheme,
  getCssVariable,
  hexToRgb,
  rgbToHex,
};
