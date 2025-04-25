
export const thresholds = {
  client_review_minimum_score: 85,
  certification_minimum_score: 90,
  edicts: {
    1: { passing_threshold: 80, weight: 4 },  // Short Sentences
    2: { passing_threshold: 85, weight: 5 },  // Readability Level
    3: { passing_threshold: 90, weight: 4 },  // Structure & Format
    4: { passing_threshold: 80, weight: 3 },  // Active Voice
    5: { passing_threshold: 75, weight: 2 },  // Comma Usage
    6: { passing_threshold: 85, weight: 5 },  // Emotional Triggers
    7: { passing_threshold: 90, weight: 5 },  // Pain & Solution
    8: { passing_threshold: 80, weight: 4 },  // Specificity
    9: { passing_threshold: 85, weight: 3 },  // Credibility Elements
    10: { passing_threshold: 90, weight: 4 }, // Risk Reversal
    11: { passing_threshold: 90, weight: 5 }, // Opening Hook
    12: { passing_threshold: 80, weight: 3 }, // Transitional Phrases
    13: { passing_threshold: 75, weight: 2 }, // Pattern Interrupts
    14: { passing_threshold: 85, weight: 4 }, // Storytelling
    15: { passing_threshold: 85, weight: 4 }, // Conversational Tone
    16: { passing_threshold: 90, weight: 5 }, // Clear CTA
    17: { passing_threshold: 80, weight: 4 }, // Urgency & Scarcity
    18: { passing_threshold: 85, weight: 5 }, // Value Proposition
    19: { passing_threshold: 80, weight: 4 }, // Future Pacing
    20: { passing_threshold: 85, weight: 4 }, // Decision Simplification
    21: { passing_threshold: 75, weight: 3 }  // Post-Purchase Reassurance
  }
};
