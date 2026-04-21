import { useState, useCallback } from 'react';
import { mapWeatherCode } from '../utils/weatherHelper';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Geocoding
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found. Please check spelling.');
      }

      const { latitude: lat, longitude: lon, name: cityName } = geoData.results[0];

      // 2. Weather
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const weatherData = await weatherRes.json();

      if (!weatherData.current_weather) {
        throw new Error('Could not fetch weather data.');
      }

      const { temperature, weathercode } = weatherData.current_weather;
      const { condition, icon } = mapWeatherCode(weathercode);

      setWeather({
        temperature,
        condition,
        icon,
        city: cityName,
        lat,
        lon
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, loading, error, fetchWeather };
};
