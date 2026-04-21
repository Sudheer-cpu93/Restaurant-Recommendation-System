import { useState, useCallback } from 'react';
import { getFallbackNutrition } from '../utils/nutritionData';

export const useMeals = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMealsByCategories = useCallback(async (categories) => {
    setLoading(true);
    setError(null);
    try {
      const results = {};
      
      const requests = categories.map(async (cat) => {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(cat)}`);
        const data = await res.json();
        if (data.meals) {
          results[cat] = data.meals;
        }
      });

      await Promise.all(requests);
      return results;
    } catch (err) {
      setError('Could not load meals. Please check your connection.');
      return {};
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDishNutrition = useCallback(async (dishName) => {
    try {
      // 1. Try USDA FoodData Central API
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(dishName)}&pageSize=1&api_key=DEMO_KEY`
      );
      const data = await res.json();
      const food = data.foods?.[0];

      if (food && food.foodNutrients?.length > 0) {
        const get = (name) => parseFloat(
          (food.foodNutrients.find(n =>
            n.nutrientName?.toLowerCase().includes(name.toLowerCase())
          )?.value || 0).toFixed(1)
        );
        
        return {
          name: food.description,
          calories: get('energy'),
          protein: get('protein'),
          carbs: get('carbohydrate'),
          fat: get('total lipid'),
          fiber: get('fiber'),
          source: 'USDA FoodData'
        };
      }
      
      // 2. Fallback to local DB if USDA is empty
      const local = getFallbackNutrition(dishName);
      if (local) {
        return { name: dishName, ...local };
      }
      return null;
    } catch (err) {
      console.error('USDA API Error, falling back:', err);
      // 3. Fallback to local DB on network error
      const local = getFallbackNutrition(dishName);
      return local ? { name: dishName, ...local } : null;
    }
  }, []);

  return { loading, error, fetchMealsByCategories, fetchDishNutrition };
};
