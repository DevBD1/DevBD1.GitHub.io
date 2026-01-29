# Burak Dorman – Personal Portfolio

A futuristic, starship-themed developer portfolio built with React, TypeScript, and Tailwind CSS.

![License: All Rights Reserved](https://img.shields.io/badge/license-All%20Rights%20Reserved-red)

## Features

- **Starship/Space Theme** – Animated canvas starfield background with parallax mouse tracking
- **Data-Driven** – Content loaded from JSON files in `/public/data/`
- **Responsive Design** – Mobile-first with desktop-optimized layouts
- **Sections**: Hero, Projects, Career Timeline, About/Skills, Contact

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/     # React components (StarshipLayout, HeroSection, etc.)
├── services/       # Data fetching (portfolioData.ts)
├── types/          # TypeScript interfaces
└── index.tsx       # App entry point

public/data/        # JSON data files (profile, projects, skills, etc.)
```
