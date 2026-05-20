/**
 * Calculate theoretical probability distribution for all 16 result types
 *
 * This tool simulates all possible answer combinations to determine
 * the probability of each result type appearing.
 */

import { QUESTIONS } from '../data/questions';
import { calculateResult } from './scoring';
import { UserAnswer } from '../data/types';

interface ProbabilityResult {
  key: string;
  count: number;
  probability: number;
  percentage: string;
}

/**
 * Calculate probability of each result type
 *
 * @param samples - Number of random samples to simulate (default: 10000)
 * @returns Array of probability results for each type
 */
export function calculateResultProbabilities(samples: number = 10000): ProbabilityResult[] {
  const resultCounts: Record<string, number> = {};

  // Generate random test completions
  for (let i = 0; i < samples; i++) {
    const randomAnswers: UserAnswer[] = QUESTIONS.map((question) => {
      // Randomly select one of the 3 options (A, B, or C)
      const options: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
      const randomOption = options[Math.floor(Math.random() * 3)];

      const selectedAnswer = question.options.find(opt => opt.id === randomOption);

      return {
        questionId: question.id,
        selectedOption: randomOption,
        dimension: question.dimension,
        score: selectedAnswer?.score || selectedAnswer?.scores || {}
      };
    });

    // Calculate result for this random test
    const resultKey = calculateResult(randomAnswers);
    resultCounts[resultKey] = (resultCounts[resultKey] || 0) + 1;
  }

  // Convert counts to probabilities
  const results: ProbabilityResult[] = Object.entries(resultCounts).map(([key, count]) => ({
    key,
    count,
    probability: count / samples,
    percentage: ((count / samples) * 100).toFixed(2) + '%'
  }));

  // Sort by probability (highest first)
  results.sort((a, b) => b.probability - a.probability);

  return results;
}

/**
 * Print probability distribution to console
 */
export function printProbabilityDistribution(samples: number = 10000): void {
  console.log(`\n${'='.repeat(60)}`);
  console.log('IMPULSE KEYS - Result Probability Distribution');
  console.log(`Based on ${samples.toLocaleString()} random simulations`);
  console.log(`${'='.repeat(60)}\n`);

  const results = calculateResultProbabilities(samples);

  console.log(`${'Result Type'.padEnd(12)} | ${'Count'.padStart(8)} | ${'Probability'.padStart(12)}`);
  console.log('-'.repeat(60));

  results.forEach(result => {
    console.log(
      `${result.key.padEnd(12)} | ${result.count.toString().padStart(8)} | ${result.percentage.padStart(12)}`
    );
  });

  // Calculate statistics
  const probabilities = results.map(r => r.probability);
  const mean = probabilities.reduce((sum, p) => sum + p, 0) / probabilities.length;
  const variance = probabilities.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / probabilities.length;
  const stdDev = Math.sqrt(variance);

  console.log('\n' + '-'.repeat(60));
  console.log(`Mean:              ${(mean * 100).toFixed(4)}%`);
  console.log(`Expected:          ${(100 / 16).toFixed(4)}% (for uniform distribution)`);
  console.log(`Standard Dev:      ${(stdDev * 100).toFixed(4)}%`);
  console.log(`Min:               ${(Math.min(...probabilities) * 100).toFixed(2)}%`);
  console.log(`Max:               ${(Math.max(...probabilities) * 100).toFixed(2)}%`);
  console.log(`${'='.repeat(60)}\n`);

  // Check balance
  const expectedProbability = 1 / 16;
  const tolerance = 0.005; // 0.5% tolerance
  const isBalanced = probabilities.every(
    p => Math.abs(p - expectedProbability) < tolerance
  );

  if (isBalanced) {
    console.log('✅ Distribution is BALANCED (all types within ±0.5% of expected)');
  } else {
    console.log('⚠️  Distribution shows some IMBALANCE');
  }

  console.log('');
}

/**
 * Get probability for a specific result type
 */
export function getProbabilityForType(resultKey: string, samples: number = 10000): number {
  const results = calculateResultProbabilities(samples);
  const result = results.find(r => r.key === resultKey);
  return result ? result.probability : 0;
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).calculateProbabilities = printProbabilityDistribution;
}
