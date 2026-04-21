import React, { useState } from 'react';

const AddReviewForm = ({ onAddReview }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [text, setText] = useState('');
  const [nameError, setNameError] = useState('');
  const [ratingError, setRatingError] = useState('');
  const [reviewError, setReviewError] = useState('');

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!name.trim()) {
      setNameError('Please enter your name');
      hasError = true;
    }
    
    if (rating === 0) {
      setRatingError('Please select a star rating');
      hasError = true;
    }

    if (wordCount < 5) {
      setReviewError('Please write at least 5 words.');
      hasError = true;
    }

    if (hasError) return;

    onAddReview({
      id: Date.now(),
      name,
      rating,
      text,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      helpful: 0
    });

    setName('');
    setRating(0);
    setText('');
    setNameError('');
    setRatingError('');
    setReviewError('');
  };

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
      <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
        <span className="text-orange-500">✍️</span> Write a Review
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Name</label>
          <input
            type="text"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
            placeholder="Enter your name"
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (nameError) setNameError('');
            }}
          />
          {nameError && (
            <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">
              ⚠️ {nameError}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="text-3xl transition-all transform hover:scale-110 active:scale-95"
                style={{
                  color: star <= (hoveredRating || rating) ? '#F97316' : '#374151',
                }}
              >
                ★
              </button>
            ))}
          </div>
          {ratingError && (
            <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">
              ⚠️ {ratingError}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Your Review 
            <span className={`ml-2 text-[10px] ${wordCount < 5 ? 'text-red-400' : 'text-green-400'}`}>
              ({wordCount}/100 words - Min 5)
            </span>
          </label>
          <textarea
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
            placeholder="Tell us about your experience..."
            rows="4"
            maxLength={600} // Rough estimate for 100 words
            value={text}
            onChange={e => {
              const val = e.target.value;
              const count = val.trim() === '' ? 0 : val.trim().split(/\s+/).length;
              if (count <= 100 || val.length < text.length) {
                setText(val);
                if (reviewError) setReviewError('');
              }
            }}
          />
          {reviewError && (
            <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">
              ⚠️ {reviewError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-900/20"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReviewForm;
