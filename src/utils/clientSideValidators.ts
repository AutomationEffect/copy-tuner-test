
// This is a placeholder for the actual client-side validators that would be implemented
// In a full implementation, these would include functions to check copy against edicts

export const validateSentenceLength = (content: string): { passed: boolean; score: number; feedback?: string } => {
  // Remove HTML tags for analysis
  const plainText = content.replace(/<[^>]*>/g, '');
  
  // Split into sentences
  const sentences = plainText.split(/[.!?]+/).filter(Boolean);
  
  if (sentences.length === 0) {
    return {
      passed: false,
      score: 0,
      feedback: "No sentences found."
    };
  }
  
  // Count words in each sentence
  const wordCounts = sentences.map(sentence => {
    const words = sentence.trim().split(/\s+/).filter(Boolean);
    return words.length;
  });
  
  // Calculate percentage of sentences under 20 words
  const shortSentences = wordCounts.filter(count => count <= 20).length;
  const percentageShort = (shortSentences / sentences.length) * 100;
  
  let feedback;
  let passed = false;
  
  if (percentageShort >= 80) {
    passed = true;
    feedback = "Great job! Most of your sentences are concise.";
  } else if (percentageShort >= 60) {
    feedback = "Good, but try to make more sentences shorter (under 20 words).";
  } else {
    feedback = "Too many long sentences. Aim for shorter, punchier sentences.";
  }
  
  return {
    passed,
    score: Math.round(percentageShort),
    feedback
  };
};

export const validateReadabilityLevel = (content: string): { passed: boolean; score: number; feedback?: string } => {
  // Remove HTML tags for analysis
  const plainText = content.replace(/<[^>]*>/g, '');
  
  // Simple readability calculation (placeholder)
  // In a real implementation, use a proper readability algorithm like Flesch-Kincaid
  
  // Count complex words (more than 3 syllables)
  const words = plainText.split(/\s+/).filter(Boolean);
  const complexWordCount = words.filter(word => {
    // Very simplistic syllable count - would be more sophisticated in reality
    return word.length > 8;
  }).length;
  
  const complexWordPercentage = (complexWordCount / words.length) * 100;
  const readabilityScore = Math.max(0, Math.min(100, 100 - complexWordPercentage * 2));
  
  let feedback;
  let passed = false;
  
  if (readabilityScore >= 85) {
    passed = true;
    feedback = "Excellent readability level. Your copy is easy to understand.";
  } else if (readabilityScore >= 70) {
    feedback = "Good readability, but try simplifying some words and phrases.";
  } else {
    feedback = "Your copy is too complex. Aim for simpler words and shorter sentences.";
  }
  
  return {
    passed,
    score: Math.round(readabilityScore),
    feedback
  };
};

export const validatePainAndSolution = (content: string): { passed: boolean; score: number; feedback?: string } => {
  // Remove HTML tags for analysis
  const plainText = content.replace(/<[^>]*>/g, '').toLowerCase();
  
  // Keywords related to pain points
  const painKeywords = [
    'struggle', 'pain', 'problem', 'frustration', 'tired', 'difficult',
    'challenge', 'worry', 'fear', 'risk', 'avoid', 'stress', 'overwhelm',
    'fail', 'annoying', 'embarrass', 'stuck', 'helpless'
  ];
  
  // Keywords related to solutions
  const solutionKeywords = [
    'solution', 'solve', 'help', 'improve', 'increase', 'boost', 'enhance',
    'transform', 'fix', 'resolve', 'overcome', 'achieve', 'gain', 'benefit',
    'advantage', 'success', 'result'
  ];
  
  // Check for presence of pain keywords
  const painMatches = painKeywords.filter(word => 
    plainText.includes(word)
  );
  
  // Check for presence of solution keywords
  const solutionMatches = solutionKeywords.filter(word => 
    plainText.includes(word)
  );
  
  // Calculate scores
  const painScore = Math.min(100, (painMatches.length / 5) * 100);
  const solutionScore = Math.min(100, (solutionMatches.length / 5) * 100);
  const overallScore = (painScore * 0.4) + (solutionScore * 0.6);
  
  let feedback;
  let passed = false;
  
  if (painScore < 40) {
    feedback = "Your copy doesn't clearly identify customer pain points.";
  } else if (solutionScore < 60) {
    feedback = "You identify problems but don't strongly position your product as the solution.";
  } else {
    passed = true;
    feedback = "Good balance of highlighting problems and offering solutions.";
  }
  
  return {
    passed: passed || overallScore >= 90,
    score: Math.round(overallScore),
    feedback
  };
};

export const validateCommaUsage = (content: string): { passed: boolean; score: number; feedback?: string } => {
  // Remove HTML tags for analysis
  const plainText = content.replace(/<[^>]*>/g, '');
  
  // Count commas and sentences
  const commaCount = (plainText.match(/,/g) || []).length;
  const sentenceCount = (plainText.match(/[.!?]+/g) || []).length;
  
  // Calculate comma ratio
  const commaRatio = commaCount / Math.max(1, sentenceCount);
  
  // Check for run-on sentences (too few commas)
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const wordsPerSentence = wordCount / Math.max(1, sentenceCount);
  
  let feedback;
  let passed = false;
  let score = 0;
  
  if (commaRatio < 0.5 && wordsPerSentence > 15) {
    feedback = "Your sentences may be running too long without commas. Add commas to improve readability.";
    score = 50;
  } else if (commaRatio > 3) {
    feedback = "You're using too many commas, which can make your copy feel choppy.";
    score = 60;
  } else if (commaRatio >= 1 && commaRatio <= 2.5) {
    passed = true;
    feedback = "Good use of commas to create rhythm and improve readability.";
    score = 90;
  } else {
    feedback = "Your comma usage is acceptable but could be optimized for better flow.";
    score = 75;
  }
  
  return {
    passed,
    score,
    feedback
  };
};

// Additional validators would be implemented here in a complete system
