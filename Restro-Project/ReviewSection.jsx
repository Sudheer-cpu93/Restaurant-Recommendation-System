import React from 'react';
import AddReviewForm from './AddReviewForm';

const ReviewSection = ({ reviews, onAddReview }) => {
  const avgRating = (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1);
  
  const ratingDist = [5, 4, 3, 2, 1].map(r => ({
    stars: r,
    count: reviews.filter(rev => rev.rating === r).length,
    percentage: (reviews.filter(rev => rev.rating === r).length / reviews.length) * 100
  }));

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-2xl font-bold text-white mb-8">Customer Reviews</h3>
        
        {/* Rating Summary Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-slate-800/30 p-8 rounded-3xl border border-slate-700">
          <div className="text-center md:border-r border-slate-700">
            <div className="text-6xl font-black text-white mb-2">{avgRating}</div>
            <div className="flex justify-center text-orange-500 text-xl mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < Math.floor(avgRating) ? '★' : '☆'}</span>
              ))}
            </div>
            <p className="text-slate-400 text-sm font-medium">Based on {reviews.length} reviews</p>
          </div>

          <div className="md:col-span-2 space-y-3">
            {ratingDist.map(dist => (
              <div key={dist.stars} className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400 w-4">{dist.stars}★</span>
                <div className="flex-grow h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 transition-all duration-500" 
                    style={{ width: `${dist.percentage}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-500 w-4 text-right">{dist.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{review.name}</h4>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{review.date}</p>
                </div>
              </div>
              <div className="flex text-orange-500 text-sm">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                ))}
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4 italic">
              "{review.text}"
            </p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-orange-400 transition-colors">
                👍 Helpful ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddReviewForm onAddReview={onAddReview} />
    </div>
  );
};

export default ReviewSection;
