/**
 * Badge Production Planner - UX Designer Bias
 * Calculate probability distribution assuming 80% attendees are UX designers
 * UX designers likely skew toward: Signal (user research), Human (empathy), Explore (innovation)
 */

// Scoring patterns from questions.ts
const QUESTION_SCORES = {
  // Dimension A: Signal vs Solution (5 questions)
  A1: [{Signal: 2}, {Signal: 1, Solution: 1}, {Solution: 2}],
  A2: [{Signal: 2}, {Signal: 1, Solution: 1}, {Solution: 2}],
  A3: [{Signal: 2}, {Signal: 1, Solution: 1}, {Solution: 2}],
  A4: [{Signal: 2}, {Signal: 1, Solution: 1}, {Solution: 2}],
  A5: [{Signal: 1}, {}, {Solution: 1}], // Tiebreaker

  B1: [{Human: 2}, {Human: 1, Machine: 1}, {Machine: 2}],
  B2: [{Human: 2}, {Human: 1, Machine: 1}, {Machine: 2}],
  B3: [{Human: 2}, {Human: 1, Machine: 1}, {Machine: 2}],
  B4: [{Human: 2}, {Human: 1, Machine: 1}, {Machine: 2}],
  B5: [{Human: 1}, {}, {Machine: 1}], // Tiebreaker

  C1: [{Explore: 2}, {Explore: 1, Align: 1}, {Align: 2}],
  C2: [{Explore: 2}, {Explore: 1, Align: 1}, {Align: 2}],
  C3: [{Explore: 2}, {Explore: 1, Align: 1}, {Align: 2}],
  C4: [{Explore: 2}, {Explore: 1, Align: 1}, {Align: 2}],
  C5: [{Explore: 1}, {}, {Align: 1}], // Tiebreaker

  D1: [{Spark: 2}, {Spark: 1, Stabilize: 1}, {Stabilize: 2}],
  D2: [{Spark: 2}, {Spark: 1, Stabilize: 1}, {Stabilize: 2}],
  D3: [{Spark: 2}, {Spark: 1, Stabilize: 1}, {Stabilize: 2}],
  D4: [{Spark: 2}, {Spark: 1, Stabilize: 1}, {Stabilize: 2}],
  D5: [{Spark: 1}, {}, {Stabilize: 1}], // Tiebreaker
};

// Result mapping from scoring.ts
const RESULTS_BY_SCORES = {
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

/**
 * UX Designer bias profile:
 * - Signal > Solution (UX = user research, understanding problems)
 * - Human > Machine (UX = empathy, human-centered design)
 * - Explore ≈ Align (mixed: some UX are innovative, some follow design systems)
 * - Spark ≈ Stabilize (mixed: some UX prototype fast, some ensure quality)
 */
const UX_BIAS = {
  // Dimension A: UX designers focus on user signals
  // Bias: 60% choose Signal (A), 25% choose balanced (B), 15% choose Solution (C)
  A: [0.60, 0.25, 0.15],

  // Dimension B: UX designers are human-centered
  // Bias: 65% choose Human (A), 25% choose balanced (B), 10% choose Machine (C)
  B: [0.65, 0.25, 0.10],

  // Dimension C: Mixed - some innovate, some follow systems
  // Bias: 40% Explore (A), 30% balanced (B), 30% Align (C)
  C: [0.40, 0.30, 0.30],

  // Dimension D: Mixed - some prototype fast, some ensure quality
  // Bias: 35% Spark (A), 35% balanced (B), 30% Stabilize (C)
  D: [0.35, 0.35, 0.30]
};

// Calculate dimension scores with UX bias
function calculateDimensionScoresWithBias(questionScores, biasWeights) {
  const dimensionResults = {};
  const totalCombos = Math.pow(3, questionScores.length);

  for (let combo = 0; combo < totalCombos; combo++) {
    let tempCombo = combo;
    const scores = {};
    let probability = 1.0;

    for (let q = 0; q < questionScores.length; q++) {
      const choice = tempCombo % 3; // 0=A, 1=B, 2=C
      tempCombo = Math.floor(tempCombo / 3);

      // Apply bias weight to probability
      probability *= biasWeights[choice];

      // Apply scoring
      const questionScore = questionScores[q][choice];
      for (const [trait, points] of Object.entries(questionScore)) {
        scores[trait] = (scores[trait] || 0) + points;
      }
    }

    // Determine dominant trait
    const traits = Object.keys(scores);
    if (traits.length === 0) continue;

    const maxScore = Math.max(...Object.values(scores));
    const dominant = traits.find(t => scores[t] === maxScore);

    if (!dimensionResults[dominant]) {
      dimensionResults[dominant] = { count: 0, probability: 0 };
    }
    dimensionResults[dominant].count += 1;
    dimensionResults[dominant].probability += probability;
  }

  return dimensionResults;
}

console.log('\n🎨 UX DESIGNER BIAS ANALYSIS (80% of attendees)\n');
console.log('Expected biases:');
console.log('- Signal > Solution (user research focus)');
console.log('- Human > Machine (empathy, human-centered design)');
console.log('- Explore ≈ Align (mixed: innovation vs design systems)');
console.log('- Spark ≈ Stabilize (mixed: prototyping vs quality)\n');

// Calculate for each dimension with bias
const dimA = calculateDimensionScoresWithBias(Object.values(QUESTION_SCORES).slice(0, 5), UX_BIAS.A);
const dimB = calculateDimensionScoresWithBias(Object.values(QUESTION_SCORES).slice(5, 10), UX_BIAS.B);
const dimC = calculateDimensionScoresWithBias(Object.values(QUESTION_SCORES).slice(10, 15), UX_BIAS.C);
const dimD = calculateDimensionScoresWithBias(Object.values(QUESTION_SCORES).slice(15, 20), UX_BIAS.D);

console.log('📊 DIMENSION PROBABILITIES (with UX bias)\n');
console.log('Dimension A (Signal vs Solution):');
const totalProbA = dimA.Signal.probability + dimA.Solution.probability;
console.log(`  Signal: ${(dimA.Signal.probability / totalProbA * 100).toFixed(1)}%`);
console.log(`  Solution: ${(dimA.Solution.probability / totalProbA * 100).toFixed(1)}%`);

console.log('\nDimension B (Human vs Machine):');
const totalProbB = dimB.Human.probability + dimB.Machine.probability;
console.log(`  Human: ${(dimB.Human.probability / totalProbB * 100).toFixed(1)}%`);
console.log(`  Machine: ${(dimB.Machine.probability / totalProbB * 100).toFixed(1)}%`);

console.log('\nDimension C (Explore vs Align):');
const totalProbC = dimC.Explore.probability + dimC.Align.probability;
console.log(`  Explore: ${(dimC.Explore.probability / totalProbC * 100).toFixed(1)}%`);
console.log(`  Align: ${(dimC.Align.probability / totalProbC * 100).toFixed(1)}%`);

console.log('\nDimension D (Spark vs Stabilize):');
const totalProbD = dimD.Spark.probability + dimD.Stabilize.probability;
console.log(`  Spark: ${(dimD.Spark.probability / totalProbD * 100).toFixed(1)}%`);
console.log(`  Stabilize: ${(dimD.Stabilize.probability / totalProbD * 100).toFixed(1)}%`);

// Calculate combined probabilities
console.log('\n\n🎯 16 PERSONALITY TYPE PROBABILITIES (UX-biased)\n');

const resultProbs = {};

for (const [traitA, dataA] of Object.entries(dimA)) {
  for (const [traitB, dataB] of Object.entries(dimB)) {
    for (const [traitC, dataC] of Object.entries(dimC)) {
      for (const [traitD, dataD] of Object.entries(dimD)) {
        const key = `${traitA}-${traitB}-${traitC}-${traitD}`;
        const resultKey = RESULTS_BY_SCORES[key];

        if (resultKey) {
          const probA = dataA.probability / totalProbA;
          const probB = dataB.probability / totalProbB;
          const probC = dataC.probability / totalProbC;
          const probD = dataD.probability / totalProbD;
          const prob = probA * probB * probC * probD;

          resultProbs[resultKey] = (resultProbs[resultKey] || 0) + prob;
        }
      }
    }
  }
}

// Sort by probability
const sorted = Object.entries(resultProbs)
  .sort((a, b) => b[1] - a[1])
  .map(([key, prob], index) => ({
    rank: index + 1,
    result: key,
    probability: prob,
    per100: Math.round(prob * 100),
    percentage: (prob * 100).toFixed(2) + '%'
  }));

console.table(sorted);

console.log('\n\n📦 BADGE PRODUCTION RECOMMENDATION (for 100 badges, 80% UX designers)\n');

let total = 0;
const recommendations = sorted.map(item => {
  const recommended = Math.max(1, Math.round(item.probability * 100));
  total += recommended;
  return {
    'Result Type': item.result,
    'Probability': item.percentage,
    'Recommended Quantity': recommended
  };
});

// Adjust for rounding errors
const adjustment = 100 - total;
if (adjustment !== 0) {
  recommendations[0]['Recommended Quantity'] += adjustment;
  recommendations[0]['Notes'] = `(${adjustment > 0 ? '+' : ''}${adjustment} rounding adj)`;
}

console.table(recommendations);

console.log('\n💡 UX DESIGNER BIAS INSIGHTS:\n');
console.log('1. 🔴 **Magenta group** (Signal+Human) will dominate - UX designers naturally align here');
console.log('2. 🟡 **Yellow group** (Signal+Machine) also strong - AI/tech-savvy UX designers');
console.log('3. 🟢 **Cyan group** (Solution+Human) moderate - more solution-oriented UX');
console.log('4. 🟣 **Purple group** (Solution+Machine) lowest - less common for UX designers');
console.log('\n5. **Top types**: VOC, FIORI, PIXEL, JOULE - all aligned with UX core skills');
console.log('6. **Rare types**: FIRE, TRIO, LOGS - more engineering/ops focused\n');

// Calculate color group totals
const colorGroups = {
  Magenta: ['VOC', 'FIORI', 'PIXEL', 'A11Y'],
  Yellow: ['JOULE', 'CTRL', 'AGENT', 'SAFE'],
  Cyan: ['OData', 'BTP', 'CORE', 'API'],
  Purple: ['QAQ', 'LOGS', 'TRIO', 'FIRE']
};

console.log('\n🎨 COLOR GROUP DISTRIBUTION (UX-biased):\n');
for (const [color, types] of Object.entries(colorGroups)) {
  const groupTotal = types.reduce((sum, type) => {
    const rec = recommendations.find(r => r['Result Type'] === type);
    return sum + (rec ? rec['Recommended Quantity'] : 0);
  }, 0);
  const groupProb = types.reduce((sum, type) => {
    const item = sorted.find(s => s.result === type);
    return sum + (item ? item.probability : 0);
  }, 0);

  const emoji = color === 'Magenta' ? '🔴' : color === 'Yellow' ? '🟡' : color === 'Cyan' ? '🟢' : '🟣';
  console.log(`${emoji} ${color}: ${groupTotal} badges (${(groupProb * 100).toFixed(1)}%)`);
}

console.log('\n\n⚠️  COMPARISON: Random vs UX-biased\n');
console.log('Random distribution: All groups ~25 badges each');
console.log('UX-biased distribution: Heavily skewed toward Magenta (Signal+Human)\n');
console.log('Recommendation: Use UX-biased numbers for Impulse26 Design Festival! 🎨\n');
