import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg animate-pulse border border-slate-700">
      <div className="h-48 bg-slate-700" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-slate-700 rounded w-3/4" />
        <div className="flex space-x-2">
          <div className="h-4 bg-slate-700 rounded w-1/4" />
          <div className="h-4 bg-slate-700 rounded w-1/4" />
        </div>
        <div className="h-4 bg-slate-700 rounded w-full" />
        <div className="h-10 bg-slate-700 rounded w-full mt-4" />
      </div>
    </div>
  );
};

export default SkeletonCard;
