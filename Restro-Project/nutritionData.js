export const nutritionDB = {
  pizza:          { calories:266, protein:11, carbs:33, fat:10, fiber:2.3 },
  burger:         { calories:295, protein:17, carbs:24, fat:14, fiber:1.3 },
  pasta:          { calories:220, protein:8,  carbs:43, fat:1.3,fiber:2.5 },
  chicken:        { calories:239, protein:27, carbs:0,  fat:14, fiber:0   },
  rice:           { calories:130, protein:2.7,carbs:28, fat:0.3,fiber:0.4 },
  salad:          { calories:152, protein:1.3,carbs:3,  fat:15, fiber:1.5 },
  biryani:        { calories:290, protein:12, carbs:40, fat:9,  fiber:1.8 },
  paneer:         { calories:265, protein:18, carbs:1.2,fat:20, fiber:0   },
  dosa:           { calories:168, protein:3.9,carbs:32, fat:3,  fiber:1.1 },
  noodles:        { calories:138, protein:4.5,carbs:25, fat:2,  fiber:1.8 },
  sushi:          { calories:200, protein:9,  carbs:38, fat:0.7,fiber:0.5 },
  tacos:          { calories:226, protein:9,  carbs:20, fat:12, fiber:2.8 },
  sandwich:       { calories:252, protein:11, carbs:33, fat:9,  fiber:2.7 },
  soup:           { calories:71,  protein:3.8,carbs:8,  fat:2.8,fiber:0.8 },
  steak:          { calories:271, protein:26, carbs:0,  fat:18, fiber:0   },
  salmon:         { calories:208, protein:20, carbs:0,  fat:13, fiber:0   },
  'butter chicken':{ calories:245,protein:20,carbs:12, fat:13, fiber:1.2 },
  'fried rice':   { calories:238, protein:5,  carbs:44, fat:5,  fiber:1.4 },
  'fish and chips':{ calories:595,protein:24,carbs:60, fat:28, fiber:3.5 },
  dessert:        { calories:371, protein:5,  carbs:55, fat:15, fiber:1   },
  icecream:       { calories:207, protein:3.5,carbs:24, fat:11, fiber:0.7 },
  chocolate:      { calories:546, protein:5,  carbs:60, fat:31, fiber:7   },
  'grilled chicken':{ calories:165,protein:31,carbs:0,  fat:3.6,fiber:0  },
  kebab:          { calories:226, protein:17, carbs:8,  fat:14, fiber:1.2 },
  curry:          { calories:243, protein:14, carbs:20, fat:11, fiber:3.5 },
  idli:           { calories:58,  protein:2,  carbs:12, fat:0.4,fiber:0.5 },
  samosa:         { calories:308, protein:6,  carbs:32, fat:17, fiber:2.4 },
  paratha:        { calories:302, protein:7,  carbs:42, fat:12, fiber:2.7 },
  roti:           { calories:120, protein:3.5,carbs:25, fat:1,  fiber:2.7 },
  'dal makhani':  { calories:198, protein:10, carbs:28, fat:6,  fiber:6.8 }
};

export function getFallbackNutrition(query) {
  const q = query.toLowerCase().trim();
  // exact match first
  if (nutritionDB[q]) return { ...nutritionDB[q], source: 'Local Database' };
  // partial match
  const key = Object.keys(nutritionDB).find(k => 
    q.includes(k) || k.includes(q)
  );
  return key 
    ? { ...nutritionDB[key], source: 'Local Database' } 
    : null;
}
