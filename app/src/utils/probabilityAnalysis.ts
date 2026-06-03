/**
 * IMPULSE KEYS - Probability Analysis
 * Calculate the exact probability of reaching each of the 16 results
 */

import { ResultKey } from '../data/types';

interface ProbabilityResult {
  resultKey: ResultKey;
  probability: number;
  pathCount: number;
  description: string;
}

/**
 * Calculate exact probabilities for all 16 results
 * Accounts for 50/50 random tie resolution
 */
export function calculateExactProbabilities(): ProbabilityResult[] {
  // Result mapping
  const mapping: Record<string, ResultKey> = {
    'Signal-Human-Explore-Spark': 'VOC',
    'Signal-Human-Explore-Stabilize': 'FIORI',
    'Signal-Human-Align-Spark': 'PIXEL',
    'Signal-Human-Align-Stabilize': 'A11Y',
    'Signal-Machine-Explore-Spark': 'JOULE',
    'Signal-Machine-Explore-Stabilize': 'CTRL',
    'Signal-Machine-Align-Spark': 'AGENT',
    'Signal-Machine-Align-Stabilize': 'SAFE',
    'Solution-Human-Explore-Spark': 'OData',
    'Solution-Human-Explore-Stabilize': 'BTP',
    'Solution-Human-Align-Spark': 'CORE',
    'Solution-Human-Align-Stabilize': 'API',
    'Solution-Machine-Explore-Spark': 'QAQ',
    'Solution-Machine-Explore-Stabilize': 'LOGS',
    'Solution-Machine-Align-Spark': 'TRIO',
    'Solution-Machine-Align-Stabilize': 'FIRE'
  };

  // Calculate dimension distribution with proper tie handling
  // Q1-Q4: [2,0], [1,1], [0,2] and Q5: [1,0], [0,0], [0,1]
  const q14Scores: [number, number][] = [[2, 0], [1, 1], [0, 2]];
  const q5Scores: [number, number][] = [[1, 0], [0, 0], [0, 1]];

  let leftWins = 0, rightWins = 0, ties = 0;
  for (let q1 = 0; q1 < 3; q1++) {
    for (let q2 = 0; q2 < 3; q2++) {
      for (let q3 = 0; q3 < 3; q3++) {
        for (let q4 = 0; q4 < 3; q4++) {
          for (let q5 = 0; q5 < 3; q5++) {
            const left = q14Scores[q1][0] + q14Scores[q2][0] + q14Scores[q3][0] + q14Scores[q4][0] + q5Scores[q5][0];
            const right = q14Scores[q1][1] + q14Scores[q2][1] + q14Scores[q3][1] + q14Scores[q4][1] + q5Scores[q5][1];

            if (left > right) leftWins++;
            else if (right > left) rightWins++;
            else ties++;
          }
        }
      }
    }
  }

  // Effective probability with 50/50 tie resolution
  const totalCombos = 243;
  const effLeft = (leftWins + ties / 2) / totalCombos;
  const effRight = (rightWins + ties / 2) / totalCombos;

  // Total paths across all 4 dimensions
  const totalPaths = Math.pow(totalCombos, 4);

  // Generate all result probabilities
  const resultProbs: Record<ResultKey, number> = {} as any;

  Object.entries(mapping).forEach(([key, resultKey]) => {
    const [dimA, dimB, dimC, dimD] = key.split('-');

    // Each dimension has effLeft or effRight probability
    const probA = dimA === 'Signal' ? effLeft : effRight;
    const probB = dimB === 'Human' ? effLeft : effRight;
    const probC = dimC === 'Explore' ? effLeft : effRight;
    const probD = dimD === 'Spark' ? effLeft : effRight;

    resultProbs[resultKey] = probA * probB * probC * probD;
  });

  // Convert to probability results
  const results: ProbabilityResult[] = Object.entries(resultProbs).map(([key, prob]) => ({
    resultKey: key as ResultKey,
    probability: prob * 100,
    pathCount: Math.round(prob * totalPaths),
    description: `${(prob * 100).toFixed(4)}% (effective probability with 50/50 tie resolution)`
  }));

  return results.sort((a, b) => b.probability - a.probability);
}

/**
 * Get winner distribution for a single dimension
 * All dimensions have the same distribution due to identical scoring patterns
 */
export function getDimensionDistribution(_dimension: 'A' | 'B' | 'C' | 'D'): {
  leftWinner: number;
  rightWinner: number;
  tieCount: number;
} {
  let leftWinner = 0;
  let rightWinner = 0;
  let tieCount = 0;

  // Check all 243 combinations (3^5)
  // Q1-Q4 use [2,1,0] scoring, Q5 uses [1,0,0] for left and [0,0,1] for right
  for (let q1 = 0; q1 < 3; q1++) {
    for (let q2 = 0; q2 < 3; q2++) {
      for (let q3 = 0; q3 < 3; q3++) {
        for (let q4 = 0; q4 < 3; q4++) {
          for (let q5 = 0; q5 < 3; q5++) {
            const left = [2, 1, 0][q1] + [2, 1, 0][q2] + [2, 1, 0][q3] + [2, 1, 0][q4] + [1, 0, 0][q5];
            const right = [0, 1, 2][q1] + [0, 1, 2][q2] + [0, 1, 2][q3] + [0, 1, 2][q4] + [0, 0, 1][q5];

            if (left > right) leftWinner++;
            else if (right > left) rightWinner++;
            else tieCount++;
          }
        }
      }
    }
  }

  return {
    leftWinner,
    rightWinner,
    tieCount
  };
}

/**
 * Print formatted probability report
 */
export function printProbabilityReport(): string {
  const results = calculateExactProbabilities();
  const totalPaths = 3 ** 16; // 43,046,721

  let report = '═══════════════════════════════════════════════════════════\n';
  report += '  IMPULSE KEYS - Result Probability Analysis\n';
  report += '═══════════════════════════════════════════════════════════\n\n';

  report += `Total possible answer combinations: ${totalPaths.toLocaleString()}\n`;
  report += `(20 questions × 3 options each = 3^20)\n\n`;

  report += '───────────────────────────────────────────────────────────\n';
  report += '  Result Type Probabilities\n';
  report += '───────────────────────────────────────────────────────────\n\n';

  results.forEach((result, index) => {
    report += `${(index + 1).toString().padStart(2)}. ${result.resultKey.padEnd(8)} : ${result.description}\n`;
  });

  report += '\n───────────────────────────────────────────────────────────\n';
  report += '  Dimension Winner Distribution\n';
  report += '───────────────────────────────────────────────────────────\n\n';

  const dimLabels = {
    A: ['Signal', 'Solution'],
    B: ['Human', 'Machine'],
    C: ['Explore', 'Align'],
    D: ['Spark', 'Stabilize']
  };

  (['A', 'B', 'C', 'D'] as const).forEach(dim => {
    const dist = getDimensionDistribution(dim);
    const [left, right] = dimLabels[dim];
    report += `Dimension ${dim} (${left} vs ${right}):\n`;
    report += `  ${left}:      ${dist.leftWinner} paths (${((dist.leftWinner / 243) * 100).toFixed(2)}%)\n`;
    report += `  ${right}:  ${dist.rightWinner} paths (${((dist.rightWinner / 243) * 100).toFixed(2)}%)\n`;
    report += `  Ties:          ${dist.tieCount} paths (${((dist.tieCount / 243) * 100).toFixed(2)}%)\n\n`;
  });

  report += '═══════════════════════════════════════════════════════════\n';
  report += '  Analysis Notes\n';
  report += '═══════════════════════════════════════════════════════════\n\n';
  report += '• Questions 1-4 use 2-1-0 scoring pattern per dimension\n';
  report += '• Question 5 uses 1-0-0 vs 0-0-1 scoring pattern (neutral B option)\n';
  report += '• This creates exactly 50% probability for each pole\n';
  report += '• For equal distribution, we expect 6.25% per result\n';
  report += '\n';

  return report;
}
