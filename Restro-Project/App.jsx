import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Onboarding from './components/Onboarding';
import RestaurantListing from './components/RestaurantListing';
import RestaurantDetail from './components/RestaurantDetail';
import ReviewAnalyzer from './components/ReviewAnalyzer';
import ContextExplorer from './components/ContextExplorer';
import NutritionLookup from './components/NutritionLookup';
import { useWeather } from './hooks/useWeather';
import { useMeals } from './hooks/useMeals';
import { getMealtime } from './utils/mealtime';
import { buildRestaurants } from './utils/restaurantBuilder';

const App = () => {
  // --- STATE ---
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem('user_profile')) || null
  );
  const [time, setTime] = useState(new Date());
  const [mealtime, setMealtime] = useState(getMealtime());
  const [activeTab, setActiveTab] = useState('recommendations');
  const [view, setView] = useState('listing');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showOnboarding, setShowOnboarding] = useState(!profile);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [toast, setToast] = useState('');

  // --- HOOKS ---
  const { weather, loading: weatherLoading, fetchWeather } = useWeather();
  const { loading: mealsLoading, fetchMealsByCategories, fetchDishNutrition } = useMeals();

  // --- EFFECTS ---
  useEffect(() => {
    if (profile?.city) {
      fetchWeather(profile.city);
    }
  }, [profile?.city, fetchWeather]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      setMealtime(getMealtime());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // --- HANDLERS ---
  const handleSaveProfile = (newProfile) => {
    localStorage.setItem('user_profile', JSON.stringify(newProfile));
    setProfile(newProfile);
    setShowOnboarding(false);
    setShowEditProfile(false);
    showToast('✅ Profile saved successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('user_profile');
    setProfile(null);
    setRestaurants([]);
    setShowOnboarding(true);
  };

  const handleGetSuggestions = useCallback(async () => {
    if (!profile) return;
    
    const mealsData = await fetchMealsByCategories(profile.categories);
    const builtRestaurants = buildRestaurants(mealsData, profile, weather, mealtime);
    
    setRestaurants(builtRestaurants);
    showToast('✨ Smart recommendations updated!');
  }, [profile, weather, mealtime, fetchMealsByCategories]);

  const handleAddReview = (restaurantId, newReview) => {
    setRestaurants(prev => prev.map(res => {
      if (res.id === restaurantId) {
        const updatedReviews = [newReview, ...res.reviews];
        // Recalculate rating
        const newRating = parseFloat((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1));
        return { 
          ...res, 
          reviews: updatedReviews, 
          rating: newRating,
          reviewCount: updatedReviews.length
        };
      }
      return res;
    }));
    
    if (selectedRestaurant?.id === restaurantId) {
      setSelectedRestaurant(prev => {
        const updatedReviews = [newReview, ...prev.reviews];
        const newRating = parseFloat((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1));
        return { ...prev, reviews: updatedReviews, rating: newRating, reviewCount: updatedReviews.length };
      });
    }

    showToast('✅ Review submitted successfully!');
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 selection:bg-orange-500/30">
      {showOnboarding && <Onboarding onSave={handleSaveProfile} />}
      {showEditProfile && <Onboarding onSave={handleSaveProfile} initialData={profile} />}

      {profile && (
        <>
          <Navbar 
            profile={profile} 
            weather={weather} 
            onLogout={handleLogout} 
            time={time} 
          />

          <main className="pt-28 md:pt-24 px-4 pb-12 max-w-7xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex bg-slate-800/50 p-1 rounded-2xl border border-slate-700/50 mb-10 overflow-x-auto scrollbar-hide">
              {[
                { id: 'recommendations', label: '❤ Recommendations' },
                { id: 'review-ai', label: '💬 Review AI' },
                { id: 'explorer', label: '🔭 Explorer' },
                { id: 'nutrition', label: '📊 Nutrition' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setView('listing'); // Reset view when switching tabs
                  }}
                  className={`flex-1 min-w-fit px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[60vh]">
              {activeTab === 'recommendations' && (
                view === 'listing' ? (
                  <RestaurantListing 
                    restaurants={restaurants}
                    loading={mealsLoading}
                    onGetSuggestions={handleGetSuggestions}
                    onViewDetail={(res) => {
                      setSelectedRestaurant(res);
                      setView('detail');
                      window.scrollTo(0, 0);
                    }}
                    filter={filter}
                    onFilterChange={setFilter}
                  />
                ) : (
                  <RestaurantDetail 
                    restaurant={selectedRestaurant}
                    onBack={() => setView('listing')}
                    onAddReview={handleAddReview}
                    fetchNutrition={fetchDishNutrition}
                  />
                )
              )}

              {activeTab === 'review-ai' && <ReviewAnalyzer />}
              
              {activeTab === 'explorer' && (
                <ContextExplorer 
                  weather={weather}
                  mealtime={mealtime}
                  time={time}
                  profile={profile}
                  onEditProfile={() => setShowEditProfile(true)}
                  onRefresh={handleGetSuggestions}
                />
              )}

              {activeTab === 'nutrition' && (
                <NutritionLookup fetchNutrition={fetchDishNutrition} />
              )}
            </div>
          </main>
        </>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] animate-bounce-in">
          <div className="bg-slate-800 border border-slate-700 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
             <p className="text-white font-bold text-sm tracking-wide">{toast}</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce-in {
          0% { transform: translate(-50%, 100px); opacity: 0; }
          60% { transform: translate(-50%, -10px); opacity: 1; }
          100% { transform: translate(-50%, 0); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
