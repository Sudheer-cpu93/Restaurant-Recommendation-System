import React from 'react';
import RestaurantCard from './RestaurantCard';
import SkeletonCard from './SkeletonCard';

const RestaurantListing = ({ restaurants, loading, onGetSuggestions, onViewDetail, filter, onFilterChange }) => {
  const filteredRestaurants = restaurants.filter(res => {
    if (filter === 'All') return true;
    if (filter === 'Veg Only') return res.category === 'Vegetarian' || res.category === 'Vegan';
    if (filter === 'Non-Veg') return !['Vegetarian', 'Vegan', 'Dessert'].includes(res.category);
    if (filter === 'Top Rated') return res.rating >= 4.0;
    if (filter === 'Fastest') return parseInt(res.deliveryTime) < 30;
    if (filter === 'Budget') return res.priceForTwo.includes('150') || res.priceForTwo.includes('250');
    return true;
  });

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Curated for You</h2>
          <p className="text-slate-400">AI-powered picks based on your profile and current context.</p>
        </div>
        <button
          onClick={onGetSuggestions}
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-900/20 active:scale-95 disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? 'Thinking...' : '⚡ Get Smart Suggestions'}
        </button>
      </div>

      {restaurants.length > 0 && !loading && (
        <div className="flex flex-wrap gap-2 mb-8 bg-slate-800/50 p-2 rounded-xl border border-slate-700/50">
          {['All', 'Veg Only', 'Non-Veg', 'Top Rated', 'Fastest', 'Budget'].map(f => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === f
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : restaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(res => (
            <RestaurantCard key={res.id} restaurant={res} onViewDetail={onViewDetail} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-800/30 border-2 border-dashed border-slate-700 rounded-3xl py-20 text-center">
          <div className="text-5xl mb-4">🍽️</div>
          <p className="text-slate-400 font-medium">Hit "Get Smart Suggestions" to see restaurants</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantListing;
