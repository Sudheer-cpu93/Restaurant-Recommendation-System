import React, { useState, useEffect } from 'react';

const NutritionModal = ({ dishName, fetchNutrition, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNutrition(dishName).then(res => {
      setData(res);
      setLoading(false);
    });
  }, [dishName, fetchNutrition]);

  const Bar = ({ label, value, max, color, unit = 'g', isKcal = false }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-bold text-slate-400">
        <span>{label}</span>
        <span>{value} {isKcal ? 'kcal' : unit}</span>
      </div>
      <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1E293B] w-full max-w-md rounded-2xl border border-slate-700 shadow-2xl overflow-hidden animate-fade-in">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-white leading-tight">{dishName}</h3>
                {data && (
                  <span className="bg-slate-800 text-slate-500 px-2 py-0.5 rounded text-[8px] font-bold uppercase border border-slate-700">
                    {data.source || 'Local'}
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mt-1">Nutritional Breakdown (per 100g)</p>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              ✕
            </button>
          </div>

          {loading ? (
            <div className="space-y-6 py-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 bg-slate-700 rounded w-1/4 animate-pulse" />
                  <div className="h-2 bg-slate-700 rounded w-full animate-pulse" />
                </div>
              ))}
            </div>
          ) : data ? (
            <div className="space-y-6 py-4">
              <Bar label="🔥 Calories" value={data.calories} max={800} color="bg-orange-500" isKcal={true} />
              <Bar label="💪 Protein" value={data.protein} max={50} color="bg-blue-500" />
              <Bar label="🌾 Carbs" value={data.carbs} max={100} color="bg-yellow-500" />
              <Bar label="🧈 Fat" value={data.fat} max={60} color="bg-red-500" />
              <Bar label="🌿 Fiber" value={data.fiber} max={20} color="bg-green-500" />

              <div className="mt-8 bg-orange-900/10 border-l-4 border-orange-500 rounded-r-xl p-4 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <p className="text-xs text-slate-300 font-medium">
                  {data.calories > 500 ? "⚠️ High calorie dish — best for active days" : 
                   data.protein > 20 ? "💪 Excellent protein source for muscle goals" :
                   data.fat > 25 ? "🧈 High fat — enjoy in moderation" :
                   data.fiber > 5 ? "✅ Great fiber content for digestion" :
                   data.calories < 150 ? "🥗 Light dish — ideal for weight management" :
                   "✨ Balanced nutritional profile"}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <span className="text-3xl mb-4 block">🔍</span>
              <p className="text-slate-400 font-medium">No nutritional data found for this item.</p>
              <p className="text-slate-500 text-xs mt-2 italic">Try a more general name like "Pizza" or "Pasta"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionModal;
