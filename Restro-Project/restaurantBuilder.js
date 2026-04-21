import { scoreRestaurant } from './recommender';

const categoryNames = {
  Chicken: ["Chicken Republic", "The Grill Nest", "Clucky's Kitchen"],
  Pasta: ["Pasta Prima", "La Trattoria", "Noodle & Co"],
  Seafood: ["Ocean Bites", "The Fish Deck", "Pearl Coast"],
  Dessert: ["Sweet Cravings", "The Dessert Lab", "Sugar Rush"],
  Beef: ["The Steakhouse", "Bull & Grill", "Red Meat Co"],
  Vegetarian: ["Green Leaf", "The Veggie Table", "Garden Fresh"],
  Breakfast: ["Morning Glory", "Sunrise Cafe", "Brunch Club"],
  Starter: ["Bites & More", "The Appetizer Bar", "Snack Studio"],
  Lamb: ["Lamb House", "The Kebab Corner", "Mutton Masala"],
  Pork: ["Pork & Barrel", "The Smokehouse", "Grill & Chill"],
  Goat: ["Goat's Kitchen", "Desi Tadka", "The Curry Pot"],
  Default: ["The Food House", "Flavour Street", "Urban Bites"],
};

const streets = ["MG Road", "Station Road", "Civil Lines", "Sector 12", "Gandhi Nagar", "Nehru Street", "Market Road", "Mall Road"];

const getPriceForTwo = (budget) => {
  if (budget === 'Under ₹200') return "₹150–200";
  if (budget === '₹200–500') return "₹250–450";
  if (budget === '₹500–1000') return "₹500–900";
  return "₹1000–1500";
};

const generateDishPrice = (budget) => {
  if (budget === 'Under ₹200') return 80 + Math.floor(Math.random() * 70);
  if (budget === '₹200–500') return 150 + Math.floor(Math.random() * 150);
  if (budget === '₹500–1000') return 300 + Math.floor(Math.random() * 400);
  return 600 + Math.floor(Math.random() * 600);
};

const generateSeedReviews = () => [
  { id: 's1', name: 'Rahul M.', rating: 5, text: 'Absolutely loved the food here! The flavors were rich and authentic. Service was quick and staff very friendly. Will definitely come back again!', date: '12 Apr 2025', helpful: 24 },
  { id: 's2', name: 'Priya S.', rating: 4, text: 'Great place for lunch. The portions are generous and pricing is reasonable. The ambiance is cozy and the staff is polite. Would definitely visit again.', date: '08 Apr 2025', helpful: 17 },
  { id: 's3', name: 'Arjun K.', rating: 4, text: 'Decent food overall. The main course was excellent but dessert could be better. Nice ambiance and good value for money.', date: '01 Apr 2025', helpful: 9 }
];

export const buildRestaurants = (mealsByCategory, profile, weather, mealtime) => {
  const restaurants = [];

  Object.entries(mealsByCategory).forEach(([category, meals], index) => {
    const names = categoryNames[category] || categoryNames.Default;
    const name = names[index % names.length];
    
    const restaurant = {
      id: `rest_${category}_${index}`,
      name,
      category,
      cuisine: category,
      address: `${streets[Math.floor(Math.random() * streets.length)]}, ${profile.city}`,
      rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
      reviewCount: Math.floor(50 + Math.random() * 450),
      priceForTwo: getPriceForTwo(profile.budget),
      deliveryTime: `${20 + Math.floor(Math.random() * 25)} mins`,
      isOpen: Math.random() > 0.15,
      coverImage: meals[0]?.strMealThumb || 'https://via.placeholder.com/400x300',
      tags: [category, 'Popular', Math.random() > 0.5 ? 'Trending' : 'Comfort Food'],
      matchScore: scoreRestaurant(category, profile, weather, mealtime),
      dishes: meals.slice(0, 6).map(m => ({
        id: m.idMeal,
        name: m.strMeal,
        image: m.strMealThumb,
        price: generateDishPrice(profile.budget),
        tags: [category, Math.random() > 0.5 ? 'Healthy' : 'Spicy'],
        healthScore: Math.floor(4 + Math.random() * 6)
      })),
      reviews: generateSeedReviews()
    };

    restaurants.push(restaurant);
  });

  return restaurants.sort((a, b) => b.matchScore - a.matchScore);
};
