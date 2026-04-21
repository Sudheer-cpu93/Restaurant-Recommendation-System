import React from 'react';

const ContextExplorer = ({ weather, mealtime, time, profile, onEditProfile, onRefresh }) => {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto pb-20">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Live Context Explorer</h2>
        <p className="text-slate-400">Real-time environmental factors driving your recommendations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Weather Card */}
        <div className="bg-[#1E293B] border border-slate-700 rounded-3xl p-8 shadow-xl flex flex-col items-center text-center">
          <div className="text-5xl mb-4">{weather?.icon || '🌡️'}</div>
          <div className="text-4xl font-black text-white mb-1">{weather?.temperature || '--'}°C</div>
          <p className="text-lg font-bold text-orange-500 mb-4">{weather?.condition || 'Loading...'}</p>
          <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 w-full">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</p>
            <p className="text-white font-bold">{profile.city}</p>
          </div>
        </div>

        {/* Mealtime Card */}
        <div className="bg-[#1E293B] border border-slate-700 rounded-3xl p-8 shadow-xl flex flex-col items-center text-center">
          <div className="text-5xl mb-4">🕐</div>
          <div className="text-4xl font-black text-white mb-1">{mealtime}</div>
          <p className="text-lg font-bold text-cyan-400 mb-4">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 w-full">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contextual Tag</p>
            <p className="text-white font-bold">{mealtime === 'Breakfast' ? 'Fresh Starts' : mealtime === 'Lunch' ? 'Power Hour' : mealtime === 'Snack' ? 'Quick Bites' : 'Comfort Dining'}</p>
          </div>
        </div>

        {/* User Card */}
        <div className="bg-[#1E293B] border border-slate-700 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {profile.name.charAt(0)}
            </div>
            <div className="text-left">
              <h3 className="text-white font-bold text-xl">{profile.name}</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{profile.diet} • {profile.goal}</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Budget</span>
              <span className="text-sm font-bold text-orange-400">{profile.budget}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.categories.slice(0, 4).map((cat, i) => (
                <span key={i} className="bg-slate-800 text-slate-500 px-2 py-1 rounded-lg text-[10px] font-bold uppercase border border-slate-700">
                  {cat}
                </span>
              ))}
              {profile.categories.length > 4 && (
                <span className="bg-slate-800 text-slate-500 px-2 py-1 rounded-lg text-[10px] font-bold uppercase border border-slate-700">
                  +{profile.categories.length - 4} More
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onEditProfile}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all border border-slate-700"
          >
            ✏️ Edit Profile
          </button>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onRefresh}
          className="bg-orange-600 hover:bg-orange-500 text-white px-10 py-4 rounded-full font-black text-lg transition-all shadow-xl shadow-orange-900/40 transform hover:scale-105 active:scale-95"
        >
          🔄 REFRESH RECOMMENDATIONS
        </button>
      </div>
    </div>
  );
};

export default ContextExplorer;
