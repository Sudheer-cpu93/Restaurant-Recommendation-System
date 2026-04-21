export const getMealtime = () => {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 11) return 'Breakfast';
  if (hour >= 11 && hour < 15) return 'Lunch';
  if (hour >= 15 && hour < 18) return 'Snack';
  if (hour >= 18 && hour < 22) return 'Dinner';
  return 'Late Night';
};

export const getGreeting = (name) => {
  const mealtime = getMealtime();
  return `Good ${mealtime}, ${name}`;
};

export const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};
