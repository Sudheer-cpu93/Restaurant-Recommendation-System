import React from 'react';

const RestaurantCard = ({ restaurant, onViewDetail }) => {
  const {
    name, category, address, rating, reviewCount,
    priceForTwo, deliveryTime, isOpen, coverImage, tags, matchScore
  } = restaurant;

  return (
    <div className="group bg-[#1E293B] rounded-2xl overflow-hidden border border-slate-700 hover:border-orange-500/50 transition-all duration-300 shadow-lg hover:shadow-orange-500/10 flex flex-col h-full animate-fade-in">
      {/* Image Area */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={coverImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
            isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="bg-orange-500 text-white px-2 py-1 rounded-md flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase leading-none mb-0.5">Match</span>
            <span className="text-sm font-bold leading-none">{matchScore}%</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white font-bold text-lg group-hover:text-orange-400 transition-colors truncate">
            {name}
          </h3>
          <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-slate-700 self-start mt-1">
            {category}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded text-xs font-bold">
            ⭐ {rating}
          </div>
          <span className="text-slate-500 text-xs">•</span>
          <span className="text-slate-400 text-xs">{reviewCount} reviews</span>
        </div>

        <div className="space-y-1.5 mb-4 flex-grow">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-xs">📍</span>
            <p className="text-xs truncate">{address}</p>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <p className="text-xs">
              <span className="font-semibold text-orange-400">{priceForTwo}</span> for two
            </p>
            <span className="text-slate-500 text-xs">•</span>
            <p className="text-xs">{deliveryTime}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-slate-800/50 text-slate-400 px-2 py-0.5 rounded-full text-[10px] font-medium border border-slate-700">
              {tag}
            </span>
          ))}
        </div>

        {/* Match Score Bar */}
        <div className="mb-5">
          <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 transition-all duration-1000 ease-out"
              style={{ width: `${matchScore}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => onViewDetail(restaurant)}
          className="w-full bg-slate-800 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-bold transition-all border border-slate-700 hover:border-orange-500"
        >
          View Menu →
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
