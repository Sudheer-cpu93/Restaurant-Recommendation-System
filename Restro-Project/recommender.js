export const scoreRestaurant = (category, profile, weather, mealtime) => {
  let score = 0;

  // Category preference match
  if (profile.categories.includes(category)) score += 30;

  // Diet compatibility
  const dietMap = {
    Veg: ['Vegetarian', 'Pasta', 'Dessert', 'Breakfast', 'Starter'],
    Vegan: ['Vegetarian', 'Starter'],
    Keto: ['Chicken', 'Beef', 'Lamb', 'Seafood', 'Pork'],
    'Non-Veg': ['Chicken', 'Beef', 'Lamb', 'Seafood', 'Pork', 'Goat'],
    'Gluten-Free': ['Chicken', 'Seafood', 'Lamb', 'Vegetarian'],
  };
  
  if (dietMap[profile.diet]?.includes(category)) score += 25;

  // Weather context
  const temp = weather?.temperature;
  if (temp !== undefined) {
    if (temp < 15 && ['Beef', 'Lamb', 'Pasta', 'Chicken'].includes(category)) score += 20;
    if (temp > 30 && ['Seafood', 'Starter', 'Vegetarian'].includes(category)) score += 20;
    if (temp >= 15 && temp <= 30) score += 10;
  }

  // Mealtime context
  const mealtimeMap = {
    Breakfast: ['Breakfast', 'Starter'],
    Lunch: ['Chicken', 'Beef', 'Seafood', 'Vegetarian', 'Lamb'],
    Snack: ['Starter', 'Dessert', 'Pasta'],
    Dinner: ['Beef', 'Lamb', 'Chicken', 'Seafood', 'Pasta'],
    'Late Night': ['Dessert', 'Starter', 'Chicken'],
  };
  
  if (mealtimeMap[mealtime]?.includes(category)) score += 15;

  // Health goal
  if (profile.goal === 'Weight Loss' && ['Vegetarian', 'Seafood', 'Starter'].includes(category)) score += 10;
  if (profile.goal === 'Muscle Gain' && ['Chicken', 'Beef', 'Lamb', 'Seafood'].includes(category)) score += 10;
  if (profile.goal === 'Balanced') score += 5;

  // Spice Preference Adjustment
  if (profile.spice === 'Spicy' || profile.spice === 'Extra Spicy') {
    if (['Chicken', 'Beef', 'Lamb', 'Goat', 'Starter'].includes(category)) score += 10;
  }

  return score;
};
