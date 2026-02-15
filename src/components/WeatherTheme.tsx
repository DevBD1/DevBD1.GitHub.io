import { useEffect, useState } from 'react';
import { themeRegistry } from '../config/themes';
import type { Theme } from '../types/theme';

export default function WeatherTheme() {
  const [currentTheme, setCurrentTheme] = useState<string>('warm');
  const [weather, setWeather] = useState<string>('');
  const [temp, setTemp] = useState<string>('');

  useEffect(() => {
    // Fetch weather-based theme
    fetch('/api/weather-theme')
      .then((res) => res.json())
      .then((data) => {
        setCurrentTheme(data.theme);
        setWeather(data.weather);
        setTemp(data.temp);
        applyTheme(themeRegistry[data.theme]);
      })
      .catch((err) => {
        console.error('Failed to fetch weather theme:', err);
        // Apply default warm theme on error
        applyTheme(themeRegistry.warm);
      });
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;

    // Apply all color scales
    Object.entries(theme.primary).forEach(([key, value]) => {
      root.style.setProperty(`--color-primary-${key}`, value);
    });
    Object.entries(theme.secondary).forEach(([key, value]) => {
      root.style.setProperty(`--color-secondary-${key}`, value);
    });
    Object.entries(theme.accent).forEach(([key, value]) => {
      root.style.setProperty(`--color-accent-${key}`, value);
    });
    Object.entries(theme.neutral).forEach(([key, value]) => {
      root.style.setProperty(`--color-neutral-${key}`, value);
    });
    Object.entries(theme.dark).forEach(([key, value]) => {
      root.style.setProperty(`--color-dark-${key}`, value);
    });

    // Apply background and text
    root.style.setProperty('--color-background', theme.background);
    root.style.setProperty('--color-text', theme.text);
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-neutral-100/90 backdrop-blur-sm border border-neutral-300 rounded-lg px-4 py-2 text-sm text-neutral-700 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="text-lg">
          {currentTheme === 'warm' ? '☀️' : currentTheme === 'cool' ? '🌧️' : '❄️'}
        </span>
        <div>
          <div className="font-medium capitalize">{currentTheme} Theme</div>
          <div className="text-xs text-neutral-600">
            Istanbul: {weather} {temp && `• ${temp}°C`}
          </div>
        </div>
      </div>
    </div>
  );
}
