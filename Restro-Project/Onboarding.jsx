import React, { useState, useEffect } from 'react';

const Onboarding = ({ onSave, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    city: '',
    diet: 'Veg',
    goal: 'Balanced',
    budget: '₹200–500',
    spice: 'Medium',
    categories: []
  });
  const [availableCategories, setAvailableCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => res.json())
      .then(data => {
        setAvailableCategories(data.categories || []);
        setLoading(false);
      });
  }, []);

  const handleCategoryToggle = (cat) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim().length < 2) return alert('Name must be at least 2 characters');
    if (!formData.city.trim()) return alert('City is required');
    if (formData.categories.length === 0) return alert('Select at least one category');
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0F172A] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1E293B] w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden animate-fade-in my-auto">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome to RestroAI</h2>
            <p className="text-slate-400">Let's personalize your culinary experience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Your City
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="e.g. Kapurthala"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dietary Style */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Dietary Style
                </label>
                <select
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  value={formData.diet}
                  onChange={e => setFormData({ ...formData, diet: e.target.value })}
                >
                  <option>Veg</option>
                  <option>Vegan</option>
                  <option>Non-Veg</option>
                  <option>Keto</option>
                  <option>Gluten-Free</option>
                </select>
              </div>

              {/* Health Goal */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Health Goal
                </label>
                <select
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  value={formData.goal}
                  onChange={e => setFormData({ ...formData, goal: e.target.value })}
                >
                  <option>Weight Loss</option>
                  <option>Muscle Gain</option>
                  <option>Balanced</option>
                  <option>No Goal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Budget */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Budget Range
                </label>
                <select
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  value={formData.budget}
                  onChange={e => setFormData({ ...formData, budget: e.target.value })}
                >
                  <option>Under ₹200</option>
                  <option>₹200–500</option>
                  <option>₹500–1000</option>
                  <option>₹1000+</option>
                </select>
              </div>

              {/* Spice Level */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Spice Level
                </label>
                <select
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  value={formData.spice}
                  onChange={e => setFormData({ ...formData, spice: e.target.value })}
                >
                  <option>Mild</option>
                  <option>Medium</option>
                  <option>Spicy</option>
                  <option>Extra Spicy</option>
                </select>
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Favourite Categories ({formData.categories.length} selected)
              </label>
              {loading ? (
                <div className="grid grid-cols-4 gap-4 animate-pulse">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-10 bg-slate-800 rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700">
                  {availableCategories.map(cat => (
                    <button
                      key={cat.idCategory}
                      type="button"
                      onClick={() => handleCategoryToggle(cat.strCategory)}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                        formData.categories.includes(cat.strCategory)
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      {cat.strCategory}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              SAVE PROFILE & CONTINUE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
