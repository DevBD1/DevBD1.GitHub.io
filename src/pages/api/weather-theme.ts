import type { APIRoute } from 'astro';
import { weatherToTheme } from '../../config/themes';

export const GET: APIRoute = async () => {
  try {
    // Fetch Istanbul weather from wttr.in (simple, no API key needed)
    const response = await fetch('https://wttr.in/Istanbul?format=j1');
    const data = await response.json();
    
    // Extract current weather condition
    const currentCondition = data.current_condition[0];
    const weatherDesc = currentCondition.weatherDesc[0].value.toLowerCase();
    
    // Map weather to theme
    let theme = 'warm'; // default
    
    if (weatherDesc.includes('sun') || weatherDesc.includes('clear')) {
      theme = 'warm';
    } else if (weatherDesc.includes('rain') || weatherDesc.includes('drizzle') || weatherDesc.includes('shower')) {
      theme = 'cool';
    } else if (weatherDesc.includes('snow') || weatherDesc.includes('sleet')) {
      theme = 'snowy';
    } else if (weatherDesc.includes('cloud') || weatherDesc.includes('overcast') || weatherDesc.includes('fog')) {
      theme = 'cool';
    }
    
    return new Response(
      JSON.stringify({
        theme,
        weather: weatherDesc,
        temp: currentCondition.temp_C,
        city: 'Istanbul',
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
    // Fallback to warm theme on error
    return new Response(
      JSON.stringify({
        theme: 'warm',
        weather: 'unknown',
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
