import React, { useState } from 'react';
import MenuItemCard from './MenuItemCard';
import ReviewSection from './ReviewSection';
import NutritionModal from './NutritionModal';

const RestaurantDetail = ({ restaurant, onBack, onAddReview, fetchNutrition }) => {
  const [showNutrition, setShowNutrition] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const handleShowNutrition = (dishName) => {
    setSelectedDish(dishName);
    setShowNutrition(true);
  };

  return (
    <div className="animate-fade-in pb-20">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-orange-400 font-bold text-sm mb-6 transition-colors group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Restaurants
      </button>

      {/* Hero Section */}
      <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-10 shadow-2xl">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3 shadow-sm">{restaurant.name}</h2>
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-green-500 text-white px-2 py-0.5 rounded flex items-center gap-1 text-sm font-bold shadow-lg shadow-green-900/40">
                  ⭐ {restaurant.rating}
                </div>
                <span className="text-slate-300 text-sm font-medium">({restaurant.reviewCount} Reviews)</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 text-sm font-medium">🚗 {restaurant.deliveryTime}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 text-sm font-medium">💰 {restaurant.priceForTwo} for two</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-slate-800/80 backdrop-blur-md text-slate-300 px-4 py-2 rounded-xl text-xs font-bold border border-slate-700">
                📍 {restaurant.address}
              </span>
              <span className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                restaurant.isOpen 
                  ? 'bg-green-500/10 text-green-500 border-green-500/50' 
                  : 'bg-red-500/10 text-red-500 border-red-500/50'
              }`}>
                {restaurant.isOpen ? 'OPEN' : 'CLOSED'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Menu Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-orange-500 text-xl">🍽️</span> Our Menu
            </h3>
            <span className="text-slate-500 text-xs font-bold bg-slate-800 px-3 py-1 rounded-full border border-slate-700 uppercase tracking-widest">
              {restaurant.dishes.length} Items
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {restaurant.dishes.map(dish => (
              <MenuItemCard 
                key={dish.id} 
                dish={dish} 
                onShowNutrition={handleShowNutrition} 
              />
            ))}
          </div>
        </div>

        {/* Review Sidebar Area */}
        <div className="lg:col-span-1">
          <ReviewSection 
            reviews={restaurant.reviews} 
            onAddReview={(newRev) => onAddReview(restaurant.id, newRev)} 
          />
        </div>
      </div>

      {showNutrition && (
        <NutritionModal 
          dishName={selectedDish} 
          fetchNutrition={fetchNutrition} 
          onClose={() => setShowNutrition(false)} 
        />
      )}
    </div>
  );
};

export default RestaurantDetail;
