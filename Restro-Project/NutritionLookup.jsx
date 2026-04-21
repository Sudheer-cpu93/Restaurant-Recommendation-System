import React, { useState } from 'react';
import { getFallbackNutrition } from '../utils/nutritionData';

const NutritionLookup = ({ fetchNutrition }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const suggestions = [
    "Pizza", "Burger", "Biryani", "Chicken", "Pasta", "Salmon", 
    "Butter Chicken", "Dal Makhani", "Paneer", "Idli", "Salad", "Dosa"
  ];

  const handleSearch = async (e, directQuery = null) => {
    if (e) e.preventDefault();
    const searchTerm = directQuery || query;
    if (!searchTerm.trim()) return;

    if (directQuery) setQuery(directQuery);
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchNutrition(searchTerm);
      if (data) {
        setResult(data);
      } else {
        setError('No nutritional data found. Try: pizza, burger, chicken, biryani...');
      }
    } catch (err) {
      setError('Could not connect to nutrition services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Bar = ({ label, value, max, color, unit = 'g', isKcal = false }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-bold text-slate-400">
        <span>{label}</span>
        <span className="text-white">{value} {isKcal ? 'kcal' : unit}</span>
      </div>
      <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in max-w-4xl mx-auto pb-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Nutrition Lookup</h2>
        <p className="text-slate-400">Search any dish for real nutritional information powered by USDA.</p>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 shadow-xl mb-6">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="flex-grow bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors font-medium placeholder:text-slate-600"
            placeholder="Search for a dish (e.g. Pizza, Burger, Dosa)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-lg shadow-orange-900/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        <div className="mt-6">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Try searching:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => handleSearch(null, s)}
                className="bg-slate-900/50 hover:bg-slate-700 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-700 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-6 rounded-2xl text-center font-bold animate-fade-in">
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div className="bg-[#1E293B] border border-slate-700 rounded-3xl p-10 shadow-2xl animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-8 border-b border-slate-700">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-3xl font-black text-white leading-tight uppercase font-inter">{result.name}</h3>
                <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-slate-700 tracking-tighter">
                  Source: {result.source}
                </span>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Full Nutritional Analysis (per 100g serving)</p>
            </div>
            <div className="bg-orange-500/10 text-orange-400 px-4 py-2 rounded-xl border border-orange-500/30 font-black text-2xl">
              {result.calories} KCAL
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-12">
            <Bar label="🔥 Calories" value={result.calories} max={800} color="bg-orange-500" isKcal={true} />
            <Bar label="💪 Protein" value={result.protein} max={50} color="bg-blue-500" />
            <Bar label="🌾 Carbs" value={result.carbs} max={100} color="bg-yellow-500" />
            <Bar label="🧈 Fat" value={result.fat} max={60} color="bg-red-500" />
            <Bar label="🌿 Fiber" value={result.fiber} max={20} color="bg-green-500" />
          </div>

          <div className="bg-orange-900/10 p-6 rounded-2xl flex items-start gap-4 border-l-4 border-orange-500">
            <span className="text-3xl">🛡️</span>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">AI Health Advisory</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {result.calories > 500 ? "⚠️ High calorie dish — best for active days" : 
                 result.protein > 20 ? "💪 Excellent protein source for muscle goals" :
                 result.fat > 25 ? "🧈 High fat content — enjoy in moderation" :
                 result.fiber > 5 ? "✅ Great fiber content — great for digestion" :
                 result.calories < 150 ? "🥗 Light dish — ideal for weight management" :
                 "✨ Balanced nutritional profile"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionLookup;
