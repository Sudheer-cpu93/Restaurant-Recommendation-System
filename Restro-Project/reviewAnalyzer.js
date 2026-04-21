const positiveWords = ['great', 'amazing', 'delicious', 'excellent', 'loved', 'fantastic', 'perfect', 'fresh', 'tasty', 'recommend', 'best', 'wonderful', 'outstanding', 'clean', 'fast', 'friendly', 'value', 'authentic', 'superb', 'brilliant', 'enjoy', 'happy', 'pleased', 'impressed', 'quality', 'nice'];

const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'disgusting', 'cold', 'slow', 'rude', 'dirty', 'overpriced', 'bland', 'disappointing', 'stale', 'undercooked', 'fake', 'avoid', 'never', 'pathetic', 'gross', 'poor', 'mediocre', 'unacceptable', 'waste', 'regret'];

const fakePatterns = [
  /(\b\w+\b)(?:\s+\S+){0,5}\s+\1(?:\s+\S+){0,5}\s+\1/i,
  /[A-Z]{5,}/,
  /!{2,}|\?{2,}/,
  /(best .{0,20} ever|perfect .{0,20} everything|absolutely amazing)/i,
  /\b(must visit|go here|visit now|check it out)\b/i,
  /(\bgood\b|\bgreat\b|\bnice\b){3,}/i
];

export const analyzeReview = (text) => {
  const words = text.toLowerCase().split(/\W+/).filter(Boolean);
  const posCount = words.filter(w => positiveWords.includes(w)).length;
  const negCount = words.filter(w => negativeWords.includes(w)).length;
  const fakeSignals = fakePatterns.filter(p => p.test(text)).length;

  const sentiment = posCount > negCount ? 'Positive' : negCount > posCount ? 'Negative' : 'Neutral';
  const verdict = fakeSignals >= 2 ? 'Likely Fake' : fakeSignals === 1 ? 'Suspicious' : 'Genuine';
  
  const trust = Math.max(0, Math.min(100, 50 + (posCount * 5) - (negCount * 8) - (fakeSignals * 15)));
  
  const keyPhrases = words
    .filter(w => [...positiveWords, ...negativeWords].includes(w))
    .filter((w, i, a) => a.indexOf(w) === i)
    .slice(0, 5);

  return { sentiment, verdict, trustScore: trust, keyPhrases };
};
