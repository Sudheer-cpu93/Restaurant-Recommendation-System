import React from 'react';
import { getGreeting, formatTime } from '../utils/mealtime';

const Navbar = ({ profile, weather, onLogout, time }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-700 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Branding & Greeting */}
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-lg text-white text-xl">🍽️</div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">
              {getGreeting(profile.name)}
            </h1>
            <p className="text-slate-400 text-xs font-medium tracking-wider uppercase">
              Smart Recommendations
            </p>
          </div>
        </div>

        {/* Center: Context Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-slate-800 border border-slate-700 rounded-full px-3 py-1 flex items-center gap-2">
            <span className="text-sm">📍</span>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-tight">
              {profile.city}
            </span>
          </div>
          
          <div className="bg-slate-800 border border-slate-700 rounded-full px-3 py-1 flex items-center gap-2">
            <span className="text-sm">🕐</span>
            <span className="text-xs font-bold text-slate-300">
              {formatTime(time)}
            </span>
          </div>

          {weather && (
            <div className="bg-slate-800 border border-slate-700 rounded-full px-3 py-1 flex items-center gap-2">
              <span className="text-sm">{weather.icon}</span>
              <span className="text-xs font-bold text-slate-300">
                {weather.temperature}°C, {weather.condition}
              </span>
            </div>
          )}
        </div>

        {/* Right: User Menu */}
        <button
          onClick={onLogout}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 border border-slate-700"
        >
          <span>👤</span> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
