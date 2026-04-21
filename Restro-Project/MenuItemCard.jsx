import React from 'react';

const MenuItemCard = ({ dish, onShowNutrition }) => {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all group">
      <div className="flex h-32">
        <div className="w-1/3 h-full overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="w-2/3 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h4 className="text-white font-bold text-sm leading-tight">{dish.name}</h4>
              <span className="text-orange-400 font-bold text-sm">₹{dish.price}</span>
            </div>
            <div className="flex gap-2 mt-2">
              {dish.tags.map((tag, i) => (
                <span key={i} className="text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i < dish.healthScore ? 'bg-green-500' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-slate-400 font-bold">{dish.healthScore}/10</span>
            </div>
            <button
              onClick={() => onShowNutrition(dish.name)}
              className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest"
            >
              📊 Nutrition Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
