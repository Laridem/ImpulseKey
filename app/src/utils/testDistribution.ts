/**
 * Test result distribution analysis
 * Simulate random selections to check if all 16 results are reachable
 */

import { calculateResult } from '../utils/scoring';
import { UserAnswer, Dimension } from '../data/types';

// Simulate answering all questions randomly
function simulateRandomTest(): string {
  const answers: UserAnswer[] = [];

  // 4 questions per dimension (A, B, C, D)
  const dimensions: Dimension[] = ['A', 'B', 'C', 'D'];

  dimensions.forEach((dimension, dimIndex) => {
    for (let i = 0; i < 4; i++) {
      const questionId = `${dimension}${i + 1}`;
      const selectedOption = ['A', 'B', 'C'][Math.floor(Math.random() * 3)] as 'A' | 'B' | 'C';

      // Dimension A: Signal vs Solution
      let score;
      if (dimension === 'A') {
        if (selectedOption === 'A') score = { Signal: 2 };
        else if (selectedOption === 'B') score = { Signal: 1, Solution: 1 };
        else score = { Solution: 2 };
      }
      // Dimension B: Human vs Machine
      else if (dimension === 'B') {
        if (selectedOption === 'A') score = { Human: 2 };
        else if (selectedOption === 'B') score = { Human: 1, Machine: 1 };
        else score = { Machine: 2 };
      }
      // Dimension C: Explore vs Align
      else if (dimension === 'C') {
        if (selectedOption === 'A') score = { Explore: 2 };
        else if (selectedOption === 'B') score = { Explore: 1, Align: 1 };
        else score = { Align: 2 };
      }
      // Dimension D: Spark vs Stabilize
      else {
        if (selectedOption === 'A') score = { Spark: 2 };
        else if (selectedOption === 'B') score = { Spark: 1, Stabilize: 1 };
        else score = { Stabilize: 2 };
      }

      answers.push({
        questionId,
        selectedOption,
        dimension,
        score
      });
    }
  });

  return calculateResult(answers);
}

// Run simulation
const iterations = 10000;
const resultCounts: Record<string, number> = {};

for (let i = 0; i < iterations; i++) {
  const result = simulateRandomTest();
  resultCounts[result] = (resultCounts[result] || 0) + 1;
}

console.log('Result Distribution (10,000 random tests):');
console.log('==========================================');
Object.entries(resultCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([key, count]) => {
    const percentage = ((count / iterations) * 100).toFixed(2);
    console.log(`${key}: ${count} (${percentage}%)`);
  });

console.log('\nTotal unique results:', Object.keys(resultCounts).length, '/ 16');
console.log('Expected per result:', ((iterations / 16) * 100 / iterations).toFixed(2) + '%', `(${iterations / 16} tests)`);
