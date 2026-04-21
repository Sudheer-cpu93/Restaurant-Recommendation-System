export const mapWeatherCode = (code) => {
  if (code === 0) return { condition: 'Clear Sky', icon: '☀️' };
  if ([1, 2, 3].includes(code)) return { condition: 'Partly Cloudy', icon: '⛅' };
  if ([45, 48].includes(code)) return { condition: 'Foggy', icon: '🌫️' };
  if ([51, 53, 55].includes(code)) return { condition: 'Drizzle', icon: '🌦️' };
  if ([61, 63, 65].includes(code)) return { condition: 'Rainy', icon: '🌧️' };
  if ([71, 73, 75].includes(code)) return { condition: 'Snowy', icon: '❄️' };
  if ([80, 81, 82].includes(code)) return { condition: 'Showers', icon: '🚿' };
  if (code === 95) return { condition: 'Thunderstorm', icon: '⛈️' };
  return { condition: 'Cloudy', icon: '☁️' };
};
