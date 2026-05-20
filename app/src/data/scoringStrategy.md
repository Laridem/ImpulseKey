/**
 * Improved Question Scoring Strategy
 * Goal: Make all 16 results equally reachable
 * 
 * Current issue: All questions in a dimension use the same pattern:
 * A=2:0, B=1:1, C=0:2
 * 
 * This creates bias toward certain results.
 * 
 * Solution: Vary the scoring patterns across questions
 */

// DIMENSION A (Signal vs Solution) - 4 questions
// Pattern variation to balance distribution:

// Q1: Standard pattern
// A: Signal:2  B: Signal:1, Solution:1  C: Solution:2

// Q2: Stronger middle ground
// A: Signal:2  B: Signal:1, Solution:1  C: Solution:2

// Q3: More extreme
// A: Signal:3  B: Signal:1, Solution:1  C: Solution:3
// (Higher stakes question)

// Q4: Inverted weight
// A: Signal:1, Solution:1  B: Signal:2  C: Solution:2
// (Middle option is Signal-leaning)

// RECOMMENDATION FOR ALL DIMENSIONS:
// Mix these patterns:
// - Pattern 1 (2-1-0): Clear binary choice
// - Pattern 2 (3-1-0): High-stakes question  
// - Pattern 3 (2-2-2): All options have equal weight
// - Pattern 4 (1-1-2): Neutral middle option

export const IMPROVED_PATTERNS = {
  // For each dimension, use 4 different patterns across 4 questions
  standard: {
    A: 2, // Pure left pole
    B: { left: 1, right: 1 }, // Balanced
    C: 2 // Pure right pole
  },
  highStakes: {
    A: 3, // Strong left
    B: { left: 1, right: 1 },
    C: 3 // Strong right
  },
  neutralMiddle: {
    A: 2,
    B: 2, // Middle favors left
    C: 2
  },
  invertedMiddle: {
    A: { left: 1, right: 1 },
    B: 2, // Middle is decisive
    C: 2
  }
};
