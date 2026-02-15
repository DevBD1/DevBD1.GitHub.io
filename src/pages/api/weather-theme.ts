import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    // Istanbul coordinates
    const lat = 41.0082;
    const lon = 28.9784;
    
    // Fetch weather from Open-Meteo (free, no API key, reliable)
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=Europe/Istanbul`
    );
    const data = await response.json();
    
    if (!data.current) {
      throw new Error('Invalid weather data');
    }
    
    // WMO Weather interpretation codes
    // https://open-meteo.com/en/docs
    const weatherCode = data.current.weather_code;
    const temp = Math.round(data.current.temperature_2m);
    
    // Map weather code to theme
    let theme = 'warm'; // default
    let weatherDesc = '';
    
    if (weatherCode === 0 || weatherCode === 1) {
      // Clear sky, mainly clear
      theme = 'warm';
      weatherDesc = 'Clear';
    } else if (weatherCode === 2 || weatherCode === 3) {
      // Partly cloudy, overcast
      theme = 'cool';
      weatherDesc = 'Cloudy';
    } else if (weatherCode >= 45 && weatherCode <= 48) {
      // Fog
      theme = 'cool';
      weatherDesc = 'Foggy';
    } else if (weatherCode >= 51 && weatherCode <= 67) {
      // Drizzle and rain
      theme = 'cool';
      weatherDesc = 'Rainy';
    } else if (weatherCode >= 71 && weatherCode <= 77) {
      // Snow
      theme = 'snowy';
      weatherDesc = 'Snowy';
    } else if (weatherCode >= 80 && weatherCode <= 82) {
      // Rain showers
      theme = 'cool';
      weatherDesc = 'Rainy';
    } else if (weatherCode >= 85 && weatherCode <= 86) {
      // Snow showers
      theme = 'snowy';
      weatherDesc = 'Snowy';
    } else if (weatherCode >= 95 && weatherCode <= 99) {
      // Thunderstorm
      theme = 'cool';
      weatherDesc = 'Stormy';
    }
    
    return new Response(
      JSON.stringify({
        theme,
        weather: weatherDesc,
        temp: temp,
        city: 'Istanbul',
        code: weatherCode,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=1800', // Cache for 30 minutes
        },
      }
    );
  } catch (error) {
    console.error('Weather API error:', error);
    // Fallback to warm theme on error
    return new Response(
      JSON.stringify({
        theme: 'warm',
        weather: 'Unknown',
        temp: null,
        error: 'Failed to fetch weather',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
