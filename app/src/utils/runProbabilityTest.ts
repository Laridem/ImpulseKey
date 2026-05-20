/**
 * Standalone script to calculate and display probability distribution
 *
 * Run with: npx tsx src/utils/runProbabilityTest.ts
 */

import { printProbabilityDistribution } from './probabilityCalculator';

// Run with 100,000 samples for high accuracy
console.log('Calculating result probabilities...\n');
printProbabilityDistribution(100000);

console.log('To run this again with different sample size:');
console.log('  npx tsx src/utils/runProbabilityTest.ts\n');
