/**
 * Badge Production Planner
 * Calculate probability distribution for 16 personality types
 * Based on IMPULSE KEYS scoring system
 */

// Import question data (simulated - in reality would import from questions.ts)
const DIMENSIONS = {
  A: ['Signal', 'Solution'],  // 5 questions (A1-A5)
  B: ['Human', 'Machine'],    // 5 questions (B1-B5)
  C: ['Explore', 'Align'],    // 5 questions (C1-C5)
  D: ['Spark', 'Stabilize']   // 5 questions (D1-D5)
};

// Scoring patterns from questions.ts
const QUESTION_SCORES = {
  // Dimension A: Signal vs Solution (5 questions)
  A1: [{Signal: 2}, {Signal: 1, Solution: 1}, {Solution: 2}],
  A2: [{Signal: 2}, {Signal: 1, Solution: 1}, {Solution: 2}],
  A3: [{Signal: 2}, {Signal: 1, Solution: 1}, {Solution: 2}],
  A4: [{Signal: 2}, {Signal: 1, Solution: 1}, {Solution: 2}],
  A5: [{Signal: 1}, {}, {Solution: 1}], // Tiebreaker: 1-0-1

  // Dimension B: Human vs Machine (5 questions)
  B1: [{Human: 2}, {Human: 1, Machine: 1}, {Machine: 2}],
  B2: [{Human: 2}, {Human: 1, Machine: 1}, {Machine: 2}],
  B3: [{Human: 2}, {Human: 1, Machine: 1}, {Machine: 2}],
  B4: [{Human: 2}, {Human: 1, Machine: 1}, {Machine: 2}],
  B5: [{Human: 1}, {}, {Machine: 1}], // Tiebreaker: 1-0-1

  // Dimension C: Explore vs Align (5 questions)
  C1: [{Explore: 2}, {Explore: 1, Align: 1}, {Align: 2}],
  C2: [{Explore: 2}, {Explore: 1, Align: 1}, {Align: 2}],
  C3: [{Explore: 2}, {Explore: 1, Align: 1}, {Align: 2}],
  C4: [{Explore: 2}, {Explore: 1, Align: 1}, {Align: 2}],
  C5: [{Explore: 1}, {}, {Align: 1}], // Tiebreaker: 1-0-1

  // Dimension D: Spark vs Stabilize (5 questions)
  D1: [{Spark: 2}, {Spark: 1, Stabilize: 1}, {Stabilize: 2}],
  D2: [{Spark: 2}, {Spark: 1, Stabilize: 1}, {Stabilize: 2}],
  D3: [{Spark: 2}, {Spark: 1, Stabilize: 1}, {Stabilize: 2}],
  D4: [{Spark: 2}, {Spark: 1, Stabilize: 1}, {Stabilize: 2}],
  D5: [{Spark: 1}, {}, {Stabilize: 1}], // Tiebreaker: 1-0-1
};

// CORRECT mapping from scoring.ts (lines 87-107)
const RESULTS_BY_SCORES = {
  // Signal + Human (Magenta group)
  'Signal-Human-Explore-Spark': 'VOC',
  'Signal-Human-Explore-Stabilize': 'FIORI',
  'Signal-Human-Align-Spark': 'PIXEL',
  'Signal-Human-Align-Stabilize': 'A11Y',

  // Signal + Machine (Yellow group)
  'Signal-Machine-Explore-Spark': 'JOULE',
  'Signal-Machine-Explore-Stabilize': 'CTRL',    // FIXED: was AGENT
  'Signal-Machine-Align-Spark': 'AGENT',          // FIXED: was SAFE
  'Signal-Machine-Align-Stabilize': 'SAFE',       // FIXED: was OData

  // Solution + Human (Cyan group)
  'Solution-Human-Explore-Spark': 'OData',        // FIXED: was BTP
  'Solution-Human-Explore-Stabilize': 'BTP',      // FIXED: was CORE
  'Solution-Human-Align-Spark': 'CORE',           // FIXED: was API
  'Solution-Human-Align-Stabilize': 'API',        // FIXED: was QAQ

  // Solution + Machine (Purple group)
  'Solution-Machine-Explore-Spark': 'QAQ',        // FIXED: was LOGS
  'Solution-Machine-Explore-Stabilize': 'LOGS',   // FIXED: was TRIO
  'Solution-Machine-Align-Spark': 'TRIO',         // FIXED: was FIRE
  'Solution-Machine-Align-Stabilize': 'FIRE'      // FIXED: removed duplicate OData
};

// Calculate all possible score combinations
function calculateProbabilities() {
  const resultCounts = {};
  let totalCombinations = 0;

  // Each dimension has 3 options per question, 5 questions
  // Total combinations per dimension = 3^5 = 243
  // Total combinations across 4 dimensions = 243^4 = 3,486,784,401

  // For computational efficiency, let's calculate dimension-wise probabilities
  // Each dimension: 3 choices per question, 5 questions

  function calculateDimensionScores(questionScores) {
    const dimensionResults = {};

    // Iterate through all 3^5 = 243 combinations
    const numQuestions = questionScores.length;
    const totalCombos = Math.pow(3, numQuestions);

    for (let combo = 0; combo < totalCombos; combo++) {
      let tempCombo = combo;
      const scores = {};

      // Decode combination number into question choices
      for (let q = 0; q < numQuestions; q++) {
        const choice = tempCombo % 3; // 0, 1, or 2
        tempCombo = Math.floor(tempCombo / 3);

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

      dimensionResults[dominant] = (dimensionResults[dominant] || 0) + 1;
    }

    return dimensionResults;
  }

  // Calculate for each dimension
  const dimA = calculateDimensionScores(Object.values(QUESTION_SCORES).slice(0, 5));
  const dimB = calculateDimensionScores(Object.values(QUESTION_SCORES).slice(5, 10));
  const dimC = calculateDimensionScores(Object.values(QUESTION_SCORES).slice(10, 15));
  const dimD = calculateDimensionScores(Object.values(QUESTION_SCORES).slice(15, 20));

  console.log('\n📊 DIMENSION PROBABILITIES\n');
  console.log('Dimension A (Signal vs Solution):');
  console.log(dimA);
  console.log('\nDimension B (Human vs Machine):');
  console.log(dimB);
  console.log('\nDimension C (Explore vs Align):');
  console.log(dimC);
  console.log('\nDimension D (Spark vs Stabilize):');
  console.log(dimD);

  // Calculate combined probabilities
  // Assuming independence between dimensions
  const totalA = Object.values(dimA).reduce((a, b) => a + b, 0);
  const totalB = Object.values(dimB).reduce((a, b) => a + b, 0);
  const totalC = Object.values(dimC).reduce((a, b) => a + b, 0);
  const totalD = Object.values(dimD).reduce((a, b) => a + b, 0);

  console.log('\n\n🎯 16 PERSONALITY TYPE PROBABILITIES\n');

  const resultProbs = {};

  for (const [traitA, countA] of Object.entries(dimA)) {
    for (const [traitB, countB] of Object.entries(dimB)) {
      for (const [traitC, countC] of Object.entries(dimC)) {
        for (const [traitD, countD] of Object.entries(dimD)) {
          const key = `${traitA}-${traitB}-${traitC}-${traitD}`;
          const resultKey = RESULTS_BY_SCORES[key];

          if (resultKey) {
            const prob = (countA / totalA) * (countB / totalB) * (countC / totalC) * (countD / totalD);
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

  return sorted;
}

// Run calculation
const distribution = calculateProbabilities();

console.table(distribution);

console.log('\n\n📦 BADGE PRODUCTION RECOMMENDATION (for 100 badges)\n');
console.log('Based on equal probability distribution:\n');

let remaining = 100;
const recommendations = distribution.map(item => {
  const recommended = Math.max(1, Math.round(item.probability * 100));
  remaining -= recommended;
  return {
    'Result Type': item.result,
    'Probability': item.percentage,
    'Recommended Quantity': recommended,
    'Notes': ''
  };
});

// Adjust for rounding errors
if (remaining !== 0) {
  // Add remaining to most probable
  recommendations[0]['Recommended Quantity'] += remaining;
  recommendations[0]['Notes'] = `(+${remaining} from rounding adjustment)`;
}

console.table(recommendations);

console.log('\n💡 PRODUCTION STRATEGY:\n');
console.log('1. ✅ Produce based on calculated probabilities');
console.log('2. ✅ Ensure minimum 1 badge per type (collectibility)');
console.log('3. ✅ Top 4 types should have ~6-7 badges each');
console.log('4. ✅ Rare types (bottom 4) should have 1-3 badges each');
console.log('5. ⚠️  Consider producing 110-120 total to allow buffer');
console.log('6. 📊 After first batch, adjust based on actual test data\n');
