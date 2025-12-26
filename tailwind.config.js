/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
      },

      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-fast': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        slate: {
            950: '#020617',
        },
        'myth-dark': '#0c0a09',
        'myth-stone': '#1c1917',
        'myth-gold': '#fbbf24',
        'myth-mist': '#a8a29e',
        'myth-moss': '#14532d',
        'hytale-blue': '#1e293b',
        'hytale-dark': '#0f172a',
        'hytale-border': '#475569',
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
        cinzel: ['Cinzel', 'serif'],
        crimson: ['Crimson Text', 'serif'],
        vt323: ['VT323', 'monospace'],
      },
      backgroundImage: {
        'grain': "url('https://www.transparenttextures.com/patterns/stardust.png')",
        'pixel-pattern': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzjwqhgYQAwcE0kAbCyCAgA1Ogw55eDrnAAAAABJRU5ErkJggg==')",
      },
      boxShadow: {
        'voxel-btn': 'inset 4px 4px 0px 0px rgba(255,255,255,0.2), inset -4px -4px 0px 0px rgba(0,0,0,0.6), 0px 4px 0px 0px rgba(0,0,0,0.8)',
        'voxel-btn-hover': 'inset 4px 4px 0px 0px rgba(255,255,255,0.3), inset -4px -4px 0px 0px rgba(0,0,0,0.7), 0px 6px 0px 0px rgba(0,0,0,0.9)',
        'voxel-btn-active': 'inset 4px 4px 0px 0px rgba(0,0,0,0.6), inset -4px -4px 0px 0px rgba(255,255,255,0.1), 0px 0px 0px 0px rgba(0,0,0,0.8)',
        'panel': 'inset 2px 2px 0px 0px rgba(255,255,255,0.1), inset -2px -2px 0px 0px rgba(0,0,0,0.4)',
      }
    },
  },
  plugins: [],
}
