import React, { useState } from 'react';
import { analyzeReview } from '../utils/reviewAnalyzer';

const ReviewAnalyzer = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    
    // Split by double newline or numbered list
    const paragraphs = text.split(/\n\s*\n|\n(?=\d\.)/g).filter(p => p.trim().length > 10);
    const analysis = paragraphs.map(p => ({
      text: p.trim(),
      ...analyzeReview(p.trim())
    }));

    const avgTrust = Math.round(analysis.reduce((acc, r) => acc + r.trustScore, 0) / analysis.length);
    setResults({ overallTrust: avgTrust, individual: analysis });
  };

  const getTrustColor = (score) => {
    if (score > 70) return '#22C55E';
    if (score > 40) return '#EAB308';
    return '#EF4444';
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto pb-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Review Sentiment Analyzer</h2>
        <p className="text-slate-400">Paste restaurant reviews below to detect fake patterns and analyze sentiment.</p>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 shadow-xl mb-10">
        <textarea
          className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-orange-500 transition-colors min-h-[200px] mb-6 font-medium placeholder:text-slate-600"
          placeholder="Paste 1–5 restaurant reviews here, one per paragraph..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          onClick={handleAnalyze}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-900/20 active:scale-95"
        >
          Analyze Reviews
        </button>
      </div>

      {results && (
        <div className="space-y-8 animate-fade-in">
          {/* Overall Score */}
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-10 flex flex-col items-center text-center">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Overall Trust Score</h3>
            <div 
              className="w-40 h-40 rounded-full border-8 flex items-center justify-center mb-6 transition-all duration-1000"
              style={{ borderColor: getTrustColor(results.overallTrust), boxShadow: `0 0 20px ${getTrustColor(results.overallTrust)}33` }}
            >
              <span className="text-5xl font-black text-white">{results.overallTrust}%</span>
            </div>
            <p className="text-xl font-bold text-white">
              {results.overallTrust > 70 ? 'Verdict: Highly Reliable' : results.overallTrust > 40 ? 'Verdict: Proceed with Caution' : 'Verdict: Highly Suspicious'}
            </p>
          </div>

          {/* Individual Results */}
          <div className="space-y-4">
            {results.individual.map((res, i) => (
              <div key={i} className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all">
                <p className="text-slate-300 text-sm italic mb-6 leading-relaxed">"{res.text}"</p>
                
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    res.verdict === 'Genuine' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {res.verdict === 'Genuine' ? '🟢 Genuine' : res.verdict === 'Suspicious' ? '🟡 Suspicious' : '🔴 Likely Fake'}
                  </span>
                  
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    res.sentiment === 'Positive' ? 'bg-blue-500/10 text-blue-400' : res.sentiment === 'Negative' ? 'bg-red-500/10 text-red-400' : 'bg-slate-500/10 text-slate-400'
                  }`}>
                    {res.sentiment === 'Positive' ? '😊 Positive' : res.sentiment === 'Negative' ? '😞 Negative' : '😐 Neutral'}
                  </span>

                  <div className="h-4 w-px bg-slate-700 mx-2" />

                  <div className="flex flex-wrap gap-2">
                    {res.keyPhrases.map((phrase, idx) => (
                      <span key={idx} className="bg-slate-800 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-slate-700">
                        {phrase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewAnalyzer;
