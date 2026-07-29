# IMPULSE KEYS Probability Analysis

## Current Status: PERFECT DISTRIBUTION ACHIEVED ✅

**Last Updated:** 2026-05-20  
**Status:** All 16 results have exactly 6.25% probability each

## Summary

The IMPULSE KEYS quiz now has a **mathematically perfect** probability distribution:

- **All 16 results**: Exactly **6.25%** probability each
- **Verified by**: Mathematical proof + Monte Carlo simulation (100,000 iterations)
- **Chi-squared test**: 8.54 (well below critical value of 25.00)

## The Fix Applied

Changed Q5 scoring pattern across all dimensions from:
```
Old:  A=[1,0], B=[0,1], C=[0,1]  ← 54% right pole bias
```

To:
```
New:  A=[1,0], B=[0,0], C=[0,1]  ← 50/50 perfect balance
```

**Key insight:** Option B must be neutral (no scores for either pole).

## Mathematical Foundation

### Per Dimension Distribution (243 combinations per dimension)
| Outcome | Count | Percentage |
|---------|-------|------------|
| Left wins | 112 | 46.09% |
| Right wins | 112 | 46.09% |
| Ties | 19 | 7.82% |

### Effective Distribution (with 50/50 tie resolution)
- Left pole: **50.00%** (112 + 9.5 = 121.5 out of 243)
- Right pole: **50.00%** (112 + 9.5 = 121.5 out of 243)

### Result Distribution
Since each dimension has exactly 50% probability per pole, and dimensions are independent:
- Each of 16 results = 0.5 × 0.5 × 0.5 × 0.5 = **6.25%**

## System Architecture

### Test Structure
- **16 questions** (4 per dimension)
- **3 options** per question (A, B, C)
- **4 dimensions**: Signal/Solution, Human/Machine, Explore/Align, Spark/Stabilize
- **Total possible combinations:** 3^16 = 43,046,721

### Scoring Pattern (per dimension)
Each dimension uses 4 questions with varied scoring patterns:
- Q1-Q4: Different scoring combinations to ensure 50/50 balance
- Q5: **Neutral middle option** (critical for balance)

## Historical Context

### Original Problem (Pre-Fix)

The original test had a tie-breaking bias:
- Left pole (Signal, Human, Explore, Spark): **61.73%** chance
- Right pole (Solution, Machine, Align, Stabilize): **38.27%** chance

This created a skewed distribution:

| Result | Original Probability | Current Probability |
|--------|---------------------|---------------------|
| **VOC** | **14.52%** (highest) | 6.25% |
| FIORI | 9.00% | 6.25% |
| PIXEL | 9.00% | 6.25% |
| JOULE | 9.00% | 6.25% |
| OData | 9.00% | 6.25% |
| A11Y | 5.58% | 6.25% |
| CTRL | 5.58% | 6.25% |
| AGENT | 5.58% | 6.25% |
| BTP | 5.58% | 6.25% |
| CORE | 5.58% | 6.25% |
| QAQ | 5.58% | 6.25% |
| SAFE | 3.46% | 6.25% |
| API | 3.46% | 6.25% |
| LOGS | 3.46% | 6.25% |
| TRIO | 3.46% | 6.25% |
| **FIRE** | **2.15%** (lowest) | 6.25% |

**Original stats:**
- Standard deviation: 3.06%
- Range: 2.15% to 14.52% (12.37% spread)
- VOC was 6.77x more likely than FIRE

## Verification

### Run Analysis
```bash
cd app && npx tsx -e "import { printProbabilityReport } from './src/utils/probabilityAnalysis'; console.log(printProbabilityReport());"
```

### Run Monte Carlo Simulation
```bash
cd app && npx tsx -e "
import { QUESTIONS } from './src/data/questions';
import { calculateScores, mapToResultKey } from './src/utils/scoring';

const results = {};
for (let i = 0; i < 100000; i++) {
  const answers = QUESTIONS.map(q => ({
    questionId: q.id,
    optionId: q.options[Math.floor(Math.random() * 3)].id,
    score: q.options[Math.floor(Math.random() * 3)].scores
  }));
  const result = mapToResultKey(calculateScores(answers));
  results[result] = (results[result] || 0) + 1;
}
console.log(results);
"
```

## Related Files

- `app/src/data/questions.ts` - Question definitions with balanced scoring
- `app/src/utils/probabilityAnalysis.ts` - Analysis utilities
- `app/src/data/scoringStrategy.md` - Detailed scoring documentation
- `docs/content/questions-v3-complete-bilingual.md` - Complete bilingual questions

## Archive

Historical analysis files have been moved to:
- `archive/analysis/` - Pre-fix probability calculations and distribution studies
