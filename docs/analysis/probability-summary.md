# Probability Calculation Summary

## Quick Answer

Here are the probabilities of reaching each of the 16 IMPULSE KEYS results:

| Result | Probability | Interpretation |
|--------|-------------|----------------|
| **VOC** | **14.52%** | Most likely (6.77x more than least likely) |
| FIORI | 9.00% | Above average |
| PIXEL | 9.00% | Above average |
| JOULE | 9.00% | Above average |
| OData | 9.00% | Above average |
| A11Y | 5.58% | Near target |
| CTRL | 5.58% | Near target |
| AGENT | 5.58% | Near target |
| BTP | 5.58% | Near target |
| CORE | 5.58% | Near target |
| QAQ | 5.58% | Near target |
| SAFE | 3.46% | Below average |
| API | 3.46% | Below average |
| LOGS | 3.46% | Below average |
| TRIO | 3.46% | Below average |
| **FIRE** | **2.15%** | Least likely |

**Target for equal distribution:** 6.25% per result

---

## Why This Happens

### The Math

The test has:
- **16 questions** (4 per dimension)
- **3 options** per question (A, B, C)
- **Total possible answer combinations:** 3^16 = 43,046,721

Each dimension uses the same scoring pattern:
- Option A: 2 points to left pole, 0 to right pole
- Option B: 1 point to each pole
- Option C: 0 to left pole, 2 to right pole

### The Bias

For each dimension, out of 81 possible answer combinations (3^4):
- **Left pole wins:** 31 combinations (38.27%)
- **Right pole wins:** 31 combinations (38.27%)
- **Ties:** 19 combinations (23.46%)

**Critical issue:** When there's a tie, the system always picks the **left pole**.

This means:
- Left pole (Signal, Human, Explore, Spark): **50/81 = 61.73%** chance
- Right pole (Solution, Machine, Align, Stabilize): **31/81 = 38.27%** chance

### The Result

Results are determined by 4 binary choices (one per dimension). The probability follows a **binomial pattern** based on how many "left poles" you get:

```
P(Result) = P(Dim A) × P(Dim B) × P(Dim C) × P(Dim D)
```

**Distribution by left-pole count:**

| Left Poles | Formula | Probability | # of Results | Examples |
|------------|---------|-------------|--------------|----------|
| 4 | (50/81)^4 | 14.52% | 1 | VOC |
| 3 | (50/81)^3 × (31/81) | 9.00% | 4 | FIORI, PIXEL, JOULE, OData |
| 2 | (50/81)^2 × (31/81)^2 | 5.58% | 6 | A11Y, CTRL, AGENT, BTP, CORE, QAQ |
| 1 | (50/81) × (31/81)^3 | 3.46% | 4 | SAFE, API, LOGS, TRIO |
| 0 | (31/81)^4 | 2.15% | 1 | FIRE |

This creates a **bell curve** centered around 2 left poles (6 results at 5.58%).

---

## Visual Distribution

```
       │
14.52% │ ●                                VOC (4 left)
       │
 9.00% │ ●  ●  ●  ●                       FIORI, PIXEL, JOULE, OData (3 left)
       │
 6.25% │ ─ ─ ─ ─ ─ ─  (target)
       │
 5.58% │ ●  ●  ●  ●  ●  ●                 A11Y, CTRL, AGENT, BTP, CORE, QAQ (2 left)
       │
 3.46% │ ●  ●  ●  ●                       SAFE, API, LOGS, TRIO (1 left)
       │
 2.15% │ ●                                FIRE (0 left)
       │
       └─────────────────────────────────
```

---

## Impact

### Distribution Quality
- **Standard deviation:** 3.06%
- **Range:** 2.15% to 14.52% (12.37% spread)
- **Ideal (equal distribution):** 6.25% per result (0% spread)

### Balance Assessment
- 🔴 **Over-represented:** 5 results (>7%)
- 🟢 **Near target:** 6 results (5.5-7%)
- 🔵 **Under-represented:** 5 results (<5.5%)

### Dimension Fairness
Each dimension individually appears "fair":
- 31 pure left wins vs 31 pure right wins
- **But** the 19 ties always go left

This creates a **61.73% vs 38.27%** split per dimension, which compounds across 4 dimensions.

---

## Recommendations

If you want a more balanced distribution:

### Option 1: Random Tie-Breaking ✅ Easiest
Change the tie-breaking logic from "always left" to "random 50/50".

**Impact:**
- All dimensions become perfectly 50/50
- All results approach 6.25% probability
- No code changes to questions needed

### Option 2: Odd Number of Questions
Use 5 questions per dimension instead of 4.

**Impact:**
- Ties become impossible (total score always odd)
- Distribution would be perfectly symmetric
- Requires adding 4 new questions

### Option 3: Vary Scoring Patterns
Use different point distributions across questions:
- Some: 2-0, 1-1, 0-2 (current)
- Some: 3-0, 1-1, 0-3 (high stakes)
- Some: 2-0, 0-0, 0-2 (no middle)

**Impact:**
- Can fine-tune distribution
- More complex to design and analyze
- Requires rebalancing all questions

---

## Is This a Problem?

It depends on your goals:

### ✅ It's fine if:
- You want more granular differentiation (not all results equally likely)
- The "left pole" traits naturally occur more frequently in your target population
- You're okay with VOC being the most common result
- The test is for exploration/insight rather than clinical diagnosis

### ⚠️ Fix it if:
- You want equal representation of all personality types
- Users might feel "steered" toward certain results
- You're using this for research that requires balanced sampling
- Marketing/UX strategy depends on even distribution

---

## Files Generated

1. **`PROBABILITY_ANALYSIS.md`** - Full detailed analysis
2. **`app/src/utils/probabilityAnalysis.ts`** - TypeScript calculation code
3. **`app/scripts/analyzeProbabilities.ts`** - Basic probability report
4. **`app/scripts/visualizeProbabilities.ts`** - Visual bar chart
5. **`app/scripts/detailedCalculation.ts`** - Step-by-step math breakdown

To run the analysis:
```bash
cd app
npx tsx scripts/visualizeProbabilities.ts
```
