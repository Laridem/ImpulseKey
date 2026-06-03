/**
 * Detailed breakdown showing how probability is calculated for each result
 */

import { getDimensionDistribution } from '../src/utils/probabilityAnalysis';

console.log('\n🔍 IMPULSE KEYS - Detailed Probability Calculation\n');
console.log('═'.repeat(80));

// Show dimension distributions
const dims = [
  { key: 'A', left: 'Signal', right: 'Solution' },
  { key: 'B', left: 'Human', right: 'Machine' },
  { key: 'C', left: 'Explore', right: 'Align' },
  { key: 'D', left: 'Spark', right: 'Stabilize' }
] as const;

console.log('\n📊 DIMENSION WINNER PROBABILITIES (out of 243 combinations per dimension)\n');

const dimProbs: Record<string, { left: number; right: number }> = {};

dims.forEach(dim => {
  const dist = getDimensionDistribution(dim.key);
  // Left wins OR ties (ties go to left)
  const leftWins = dist.leftWinner + dist.tieCount;
  const rightWins = dist.rightWinner;

  dimProbs[dim.key] = {
    left: leftWins / 243,
    right: rightWins / 243
  };

  console.log(`Dimension ${dim.key}: ${dim.left} vs ${dim.right}`);
  console.log(`  ${dim.left.padEnd(10)} wins: ${dist.leftWinner.toString().padStart(2)} pure + ${dist.tieCount.toString().padStart(2)} ties = ${leftWins.toString().padStart(3)}/243 = ${((leftWins/243)*100).toFixed(2)}%`);
  console.log(`  ${dim.right.padEnd(10)} wins: ${dist.rightWinner.toString().padStart(2)} pure + ${'0'.padStart(2)} ties = ${rightWins.toString().padStart(3)}/243 = ${((rightWins/243)*100).toFixed(2)}%`);
  console.log();
});

console.log('═'.repeat(80));
console.log('\n🎯 RESULT PROBABILITY CALCULATIONS\n');
console.log('Formula: P(Result) = P(Dim A) × P(Dim B) × P(Dim C) × P(Dim D)\n');

const results = [
  { key: 'VOC', dims: ['Signal', 'Human', 'Explore', 'Spark'], leftCount: 4 },
  { key: 'FIORI', dims: ['Signal', 'Human', 'Explore', 'Stabilize'], leftCount: 3 },
  { key: 'PIXEL', dims: ['Signal', 'Human', 'Align', 'Spark'], leftCount: 3 },
  { key: 'A11Y', dims: ['Signal', 'Human', 'Align', 'Stabilize'], leftCount: 2 },
  { key: 'JOULE', dims: ['Signal', 'Machine', 'Explore', 'Spark'], leftCount: 3 },
  { key: 'CTRL', dims: ['Signal', 'Machine', 'Explore', 'Stabilize'], leftCount: 2 },
  { key: 'AGENT', dims: ['Signal', 'Machine', 'Align', 'Spark'], leftCount: 2 },
  { key: 'SAFE', dims: ['Signal', 'Machine', 'Align', 'Stabilize'], leftCount: 1 },
  { key: 'OData', dims: ['Solution', 'Human', 'Explore', 'Spark'], leftCount: 3 },
  { key: 'BTP', dims: ['Solution', 'Human', 'Explore', 'Stabilize'], leftCount: 2 },
  { key: 'CORE', dims: ['Solution', 'Human', 'Align', 'Spark'], leftCount: 2 },
  { key: 'API', dims: ['Solution', 'Human', 'Align', 'Stabilize'], leftCount: 1 },
  { key: 'QAQ', dims: ['Solution', 'Machine', 'Explore', 'Spark'], leftCount: 2 },
  { key: 'LOGS', dims: ['Solution', 'Machine', 'Explore', 'Stabilize'], leftCount: 1 },
  { key: 'TRIO', dims: ['Solution', 'Machine', 'Align', 'Spark'], leftCount: 1 },
  { key: 'FIRE', dims: ['Solution', 'Machine', 'Align', 'Stabilize'], leftCount: 0 }
];

// Group by left count
const groups = [4, 3, 2, 1, 0];

groups.forEach(leftCount => {
  const group = results.filter(r => r.leftCount === leftCount);
  if (group.length === 0) return;

  console.log(`\n${'─'.repeat(80)}`);
  console.log(`Results with ${leftCount} left poles (${group.length} results):`);
  console.log(`${'─'.repeat(80)}\n`);

  group.forEach(result => {
    const dimA = result.dims[0] === 'Signal' || result.dims[0] === 'Solution' ? result.dims[0] : 'Signal';
    const dimB = result.dims[1] === 'Human' || result.dims[1] === 'Machine' ? result.dims[1] : 'Human';
    const dimC = result.dims[2] === 'Explore' || result.dims[2] === 'Align' ? result.dims[2] : 'Explore';
    const dimD = result.dims[3] === 'Spark' || result.dims[3] === 'Stabilize' ? result.dims[3] : 'Spark';

    const pA = dimA === 'Signal' ? 147/243 : 96/243;
    const pB = dimB === 'Human' ? 147/243 : 96/243;
    const pC = dimC === 'Explore' ? 147/243 : 96/243;
    const pD = dimD === 'Spark' ? 147/243 : 96/243;

    const totalProb = pA * pB * pC * pD * 100;
    const pathCount = Math.round((pA * 243) * (pB * 243) * (pC * 243) * (pD * 243));

    console.log(`${result.key.padEnd(8)} = ${dimA.padEnd(10)} × ${dimB.padEnd(10)} × ${dimC.padEnd(10)} × ${dimD.padEnd(10)}`);
    console.log(`         = ${(pA*100).toFixed(2)}% × ${(pB*100).toFixed(2)}% × ${(pC*100).toFixed(2)}% × ${(pD*100).toFixed(2)}%`);
    console.log(`         = ${totalProb.toFixed(4)}% (${pathCount.toLocaleString()} paths)\n`);
  });
});

console.log('═'.repeat(80));
console.log('\n💡 KEY INSIGHT:\n');
console.log('The probability tier structure:');
console.log('  • 4 left poles: 147/243 × 147/243 × 147/243 × 147/243 = 13.39%  (1 result)');
console.log('  • 3 left poles: 147/243 × 147/243 × 147/243 × 96/243 =  8.75%  (4 results)');
console.log('  • 2 left poles: 147/243 × 147/243 × 96/243 × 96/243 =  5.71%  (6 results)');
console.log('  • 1 left pole:  147/243 × 96/243 × 96/243 × 96/243 =  3.73%  (4 results)');
console.log('  • 0 left poles: 96/243 × 96/243 × 96/243 × 96/243 =  2.44%  (1 result)');
console.log();
console.log('With 5 questions per dimension:');
console.log('  • 96 pure left wins (e.g., AAAAA, AAAAB, AAAAC, etc.)');
console.log('  • 96 pure right wins (e.g., CCCCC, CCCCA, etc.)');
console.log('  • 51 ties (e.g., AABCC, ABBBC, BBBBB, etc.)');
console.log('  • Ties still occur in 21% of cases due to 5-5 splits');
console.log();
