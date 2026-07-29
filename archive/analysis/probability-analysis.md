# IMPULSE KEYS - Result Probability Analysis

## Executive Summary

The probability distribution across the 16 personality results is **NOT uniform**. Results range from **2.15%** (FIRE) to **14.52%** (VOC), rather than the ideal 6.25% per result.

---

## Probability Distribution

| Rank | Result | Probability | Path Count | Expected |
|------|--------|-------------|------------|----------|
| 1 | **VOC** | 14.52% | 6,250,000 | 6.25% ⚠️ 2.32x |
| 2 | **FIORI** | 9.00% | 3,875,000 | 6.25% ⚠️ 1.44x |
| 3 | **PIXEL** | 9.00% | 3,875,000 | 6.25% ⚠️ 1.44x |
| 4 | **JOULE** | 9.00% | 3,875,000 | 6.25% ⚠️ 1.44x |
| 5 | **OData** | 9.00% | 3,875,000 | 6.25% ⚠️ 1.44x |
| 6 | **A11Y** | 5.58% | 2,402,500 | 6.25% ✓ 0.89x |
| 7 | **CTRL** | 5.58% | 2,402,500 | 6.25% ✓ 0.89x |
| 8 | **AGENT** | 5.58% | 2,402,500 | 6.25% ✓ 0.89x |
| 9 | **BTP** | 5.58% | 2,402,500 | 6.25% ✓ 0.89x |
| 10 | **CORE** | 5.58% | 2,402,500 | 6.25% ✓ 0.89x |
| 11 | **QAQ** | 5.58% | 2,402,500 | 6.25% ✓ 0.89x |
| 12 | **SAFE** | 3.46% | 1,489,550 | 6.25% ⚠️ 0.55x |
| 13 | **API** | 3.46% | 1,489,550 | 6.25% ⚠️ 0.55x |
| 14 | **LOGS** | 3.46% | 1,489,550 | 6.25% ⚠️ 0.55x |
| 15 | **TRIO** | 3.46% | 1,489,550 | 6.25% ⚠️ 0.55x |
| 16 | **FIRE** | 2.15% | 923,521 | 6.25% ⚠️ 0.34x |

**Total Paths:** 43,046,721 (3^16)

---

## Dimension Analysis

Each dimension has 4 questions with 3 options each = 81 possible combinations.

### Dimension Win Distribution

| Dimension | Left Pole | Win % | Right Pole | Win % | Ties | Tie % |
|-----------|-----------|-------|------------|-------|------|-------|
| **A** | Signal | 38.27% | Solution | 38.27% | 19 | 23.46% |
| **B** | Human | 38.27% | Machine | 38.27% | 19 | 23.46% |
| **C** | Explore | 38.27% | Align | 38.27% | 19 | 23.46% |
| **D** | Spark | 38.27% | Stabilize | 38.27% | 19 | 23.46% |

**Key Finding:** All dimensions have identical distributions due to the same scoring pattern (2-1-0) used across all questions.

---

## Why the Distribution is Uneven

### 1. **Tie-Breaking Bias**
- When scores tie (23.46% of cases), the system picks the **left pole**
- This creates a bias toward results with **left poles in all dimensions**
- **VOC** (Signal-Human-Explore-Spark) = 4 left poles = **14.52%** probability
- **FIRE** (Solution-Machine-Align-Stabilize) = 4 right poles = **2.15%** probability

### 2. **Multiplicative Effect**
```
P(Result) = P(DimA winner) × P(DimB winner) × P(DimC winner) × P(DimD winner)

VOC (Signal-Human-Explore-Spark):
= (31+19)/81 × (31+19)/81 × (31+19)/81 × (31+19)/81
= 50/81 × 50/81 × 50/81 × 50/81
= 14.52%

FIRE (Solution-Machine-Align-Stabilize):
= 31/81 × 31/81 × 31/81 × 31/81
= 2.15%
```

### 3. **Scoring Pattern Impact**
Current pattern for all questions:
- **Option A:** 2 points to left pole
- **Option B:** 1 point to each pole  
- **Option C:** 2 points to right pole

This creates 19 tie scenarios out of 81 combinations per dimension.

---

## Result Mapping

| Result | Dimension A | Dimension B | Dimension C | Dimension D | Left Poles | Probability |
|--------|-------------|-------------|-------------|-------------|------------|-------------|
| VOC | Signal | Human | Explore | Spark | 4 | 14.52% |
| FIORI | Signal | Human | Explore | Stabilize | 3 | 9.00% |
| PIXEL | Signal | Human | Align | Spark | 3 | 9.00% |
| JOULE | Signal | Machine | Explore | Spark | 3 | 9.00% |
| OData | Solution | Human | Explore | Spark | 3 | 9.00% |
| A11Y | Signal | Human | Align | Stabilize | 2 | 5.58% |
| CTRL | Signal | Machine | Explore | Stabilize | 2 | 5.58% |
| AGENT | Signal | Machine | Align | Spark | 2 | 5.58% |
| BTP | Solution | Human | Explore | Stabilize | 2 | 5.58% |
| CORE | Solution | Human | Align | Spark | 2 | 5.58% |
| QAQ | Solution | Machine | Explore | Spark | 2 | 5.58% |
| SAFE | Signal | Machine | Align | Stabilize | 1 | 3.46% |
| API | Solution | Human | Align | Stabilize | 1 | 3.46% |
| LOGS | Solution | Machine | Explore | Stabilize | 1 | 3.46% |
| TRIO | Solution | Machine | Align | Spark | 1 | 3.46% |
| FIRE | Solution | Machine | Align | Stabilize | 0 | 2.15% |

**Pattern:** More left poles = Higher probability

---

## Recommendations for Balanced Distribution

To achieve closer to 6.25% per result:

### Option 1: **Randomize Tie-Breaking**
- Instead of always picking the left pole, randomly choose left/right on ties
- This would make the distribution perfectly symmetric
- **Impact:** VOC drops from 14.52% to ~6.25%, FIRE rises from 2.15% to ~6.25%

### Option 2: **Vary Scoring Patterns**
Use different patterns across questions:
- **Pattern 1:** A=2:0, B=1:1, C=0:2 (current)
- **Pattern 2:** A=3:0, B=1:1, C=0:3 (high stakes)
- **Pattern 3:** A=2:0, B=0:0, C=0:2 (no middle)
- **Pattern 4:** A=1:0, B=1:1, C=0:1 (lower weight)

### Option 3: **Add/Remove Questions**
- If we had 5 questions per dimension (not 4), ties would be impossible
- 5 questions × 3 options = max score of 10 per pole (always odd total)

---

## Conclusion

The current system is **mathematically biased** toward results with more "left pole" wins due to:
1. Identical 2-1-0 scoring pattern across all questions
2. Tie-breaking always favoring the left pole
3. Multiplicative probability effects across 4 dimensions

**VOC is 6.77x more likely than FIRE.**

For a personality test, this may be acceptable if:
- The questions are well-designed to elicit natural responses
- The left poles represent more common tendencies
- The bias is intentional for product reasons

For a **truly balanced** test, implement randomized tie-breaking or vary the scoring patterns.
