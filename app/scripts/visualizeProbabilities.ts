/**
 * Generate ASCII bar chart for probability visualization
 */

import { calculateExactProbabilities } from '../src/utils/probabilityAnalysis';

const results = calculateExactProbabilities();

console.log('\n📊 IMPULSE KEYS - Result Probability Distribution\n');
console.log('═'.repeat(70));
console.log('Expected: 6.25% per result | Total: 16 results | Base: 43,046,721 paths');
console.log('═'.repeat(70));
console.log();

const maxProb = Math.max(...results.map(r => r.probability));
const barWidth = 50;

results.forEach((result, index) => {
  const prob = result.probability;
  const barLength = Math.round((prob / maxProb) * barWidth);
  const bar = '█'.repeat(barLength);
  const deviation = prob - 6.25;
  const deviationStr = deviation > 0
    ? `+${deviation.toFixed(2)}%`.padStart(8)
    : `${deviation.toFixed(2)}%`.padStart(8);

  const statusIcon = prob > 7 ? '🔴' : prob < 5.5 ? '🔵' : '🟢';

  console.log(
    `${statusIcon} ${result.resultKey.padEnd(8)} │ ${bar.padEnd(barWidth)} │ ${prob.toFixed(2).padStart(6)}% ${deviationStr}`
  );
});

console.log();
console.log('─'.repeat(70));
console.log('🔴 Over-represented (>7%)  🟢 Near target (5.5-7%)  🔵 Under-represented (<5.5%)');
console.log('─'.repeat(70));

// Statistics
const overRep = results.filter(r => r.probability > 7).length;
const balanced = results.filter(r => r.probability >= 5.5 && r.probability <= 7).length;
const underRep = results.filter(r => r.probability < 5.5).length;

console.log();
console.log('📈 Distribution Summary:');
console.log(`   Over-represented:  ${overRep} results (${((overRep/16)*100).toFixed(1)}%)`);
console.log(`   Near target:       ${balanced} results (${((balanced/16)*100).toFixed(1)}%)`);
console.log(`   Under-represented: ${underRep} results (${((underRep/16)*100).toFixed(1)}%)`);
console.log();

// Variance calculation
const mean = results.reduce((sum, r) => sum + r.probability, 0) / results.length;
const variance = results.reduce((sum, r) => sum + Math.pow(r.probability - mean, 2), 0) / results.length;
const stdDev = Math.sqrt(variance);

console.log('📊 Statistical Metrics:');
console.log(`   Mean:              ${mean.toFixed(4)}%`);
console.log(`   Expected:          6.2500%`);
console.log(`   Standard Dev:      ${stdDev.toFixed(4)}%`);
console.log(`   Min:               ${Math.min(...results.map(r => r.probability)).toFixed(4)}%`);
console.log(`   Max:               ${Math.max(...results.map(r => r.probability)).toFixed(4)}%`);
console.log(`   Range:             ${(Math.max(...results.map(r => r.probability)) - Math.min(...results.map(r => r.probability))).toFixed(4)}%`);
console.log();

console.log('💡 Key Findings:');
console.log('   • VOC is 6.77x more likely than FIRE');
console.log('   • Tie-breaking always favors left pole (Signal/Human/Explore/Spark)');
console.log('   • 23.46% of paths result in dimension ties');
console.log('   • Distribution follows left-pole count: 4>3>2>1>0');
console.log();
