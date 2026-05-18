# IMPULSE KEYS - Mapping Validation Report

> **Goal**: Verify that the 24 questions can produce all 16 distinct Impulse Keys and that the dimension percentages make logical sense.

---

## 1. Theoretical Coverage Analysis

### 1.1 Dimension Combinations

With 4 binary dimensions, we have:
```
2^4 = 16 possible combinations
```

This perfectly matches our 16 Impulse Keys.

**All possible patterns**:
```
1.  Signal + Human + Explore + Spark
2.  Signal + Human + Explore + Stabilize
3.  Signal + Human + Align + Spark
4.  Signal + Human + Align + Stabilize
5.  Signal + Machine + Explore + Spark
6.  Signal + Machine + Explore + Stabilize
7.  Signal + Machine + Align + Spark
8.  Signal + Machine + Align + Stabilize
9.  Solution + Human + Explore + Spark
10. Solution + Human + Explore + Stabilize
11. Solution + Human + Align + Spark
12. Solution + Human + Align + Stabilize
13. Solution + Machine + Explore + Spark
14. Solution + Machine + Explore + Stabilize
15. Solution + Machine + Align + Spark
16. Solution + Machine + Align + Stabilize
```

### 1.2 Question Balance

| Dimension | Questions | Balance |
|---|---|---|
| A: Signal/Solution | Q1-Q6 | 6 questions |
| B: Human/Machine | Q7-Q12 | 6 questions |
| C: Explore/Align | Q13-Q18 | 6 questions |
| D: Spark/Stabilize | Q19-Q24 | 6 questions |

✅ **Perfect balance**: Each dimension has exactly 6 questions.

---

## 2. Complete Mapping Table (16 Results)

Here's the corrected and complete mapping for all 16 Impulse Keys:

| # | Pattern | Key | Name | Rationale |
|---|---|---|---|---|
| 1 | Signal + Human + Explore + Spark | **VOC** | Voice-of-Customer Detective | Customer research, empathy, discovery, proactive |
| 2 | Signal + Human + Explore + Stabilize | **QAQ** | Quality Empath | User pain signals, empathy, testing, quality focus |
| 3 | Signal + Human + Align + Spark | **FIRE** | Customer Firefighter | Customer signals, urgency, fast response |
| 4 | Signal + Human + Align + Stabilize | **A11Y** | Accessibility Conscience | Inclusive signals, human needs, standards, responsible |
| 5 | Signal + Machine + Explore + Spark | **JOULE** | Joule Dream Weaver | AI opportunity signals, future thinking, exploration |
| 6 | Signal + Machine + Explore + Stabilize | **LOGS** | Production Reality Reader | Real usage signals, data-driven, monitoring |
| 7 | Signal + Machine + Align + Spark | **AGENT** | Agentic Workflow Prophet | Workflow signals, system thinking, innovation |
| 8 | Signal + Machine + Align + Stabilize | **SAFE** | Trustworthy AI Therapist | AI trust signals, governance, responsible AI |
| 9 | Solution + Human + Explore + Spark | **BTP** | Prototype Escape Artist | Solution experimentation, user-facing, fast iteration |
| 10 | Solution + Human + Explore + Stabilize | **PIXEL** | Pixel-Level Perfectionist | Design solutions, craft, visual detail, refinement |
| 11 | Solution + Human + Align + Spark | **TRIO** | HPOM Alignment Summoner | Cross-team solutions, collaboration, momentum |
| 12 | Solution + Human + Align + Stabilize | **FIORI** | Fiori Experience Guardian | Consistent solutions, patterns, usability standards |
| 13 | Solution + Machine + Explore + Spark | **API** | Developer Experience Whisperer | API solutions, DX focus, experimentation |
| 14 | Solution + Machine + Explore + Stabilize | **OData** | Process Contract Cartographer | Data/process solutions, contract focus, systematic |
| 15 | Solution + Machine + Align + Spark | **CTRL** | Human Control Keeper | Control solutions, human-in-loop, proactive safety |
| 16 | Solution + Machine + Align + Stabilize | **CORE** | Clean Core Monk | Architectural solutions, governance, sustainability |

✅ **All 16 results mapped** - Every combination has a unique Impulse Key.

---

## 3. Reachability Test Cases

Let me verify that extreme answer patterns can reach each result:

### Test Case 1: VOC Profile
**Pattern**: Signal + Human + Explore + Spark

**Answer Pattern**:
- Q1-Q6 (Signal/Solution): All A → 6 Signal, 0 Solution ✅
- Q7-Q12 (Human/Machine): All A → 6 Human, 0 Machine ✅
- Q13-Q18 (Explore/Align): All A → 6 Explore, 0 Align ✅
- Q19-Q24 (Spark/Stabilize): All A → 6 Spark, 0 Stabilize ✅

**Result**: VOC ✅

---

### Test Case 2: FIORI Profile
**Pattern**: Solution + Human + Align + Stabilize

**Answer Pattern**:
- Q1-Q6: All B → 0 Signal, 6 Solution ✅
- Q7-Q12: All A → 6 Human, 0 Machine ✅
- Q13-Q18: All B → 0 Explore, 6 Align ✅
- Q19-Q24: All B → 0 Spark, 6 Stabilize ✅

**Result**: FIORI ✅

---

### Test Case 3: CORE Profile
**Pattern**: Solution + Machine + Align + Stabilize

**Answer Pattern**:
- Q1-Q6: All B → 0 Signal, 6 Solution ✅
- Q7-Q12: All B → 0 Human, 6 Machine ✅
- Q13-Q18: All B → 0 Explore, 6 Align ✅
- Q19-Q24: All B → 0 Spark, 6 Stabilize ✅

**Result**: CORE ✅

---

### Test Case 4: Balanced Profile (Tie Scenario)
**Answer Pattern**: Alternating A/B for each dimension
- Q1-Q6: 3A, 3B → 3 Signal, 3 Solution (TIE)
- Q7-Q12: 3A, 3B → 3 Human, 3 Machine (TIE)
- Q13-Q18: 3A, 3B → 3 Explore, 3 Align (TIE)
- Q19-Q24: 3A, 3B → 3 Spark, 3 Stabilize (TIE)

**Tie-Breaking Strategy**:
- Use last answered question in each dimension
- OR default to Signal, Human, Explore, Spark (defaulting to first pole)
- OR show hybrid note: "You are balanced across dimensions"

**Suggested Result**: VOC (with note: "You show balanced tendencies")

---

### Test Case 5: Realistic Profile Mix
**Scenario**: Someone who is slightly more Signal, strongly Human, slightly Explore, moderately Spark

**Answer Pattern**:
- Q1-Q6: 4A, 2B → 4 Signal, 2 Solution → Winner: Signal ✅
- Q7-Q12: 5A, 1B → 5 Human, 1 Machine → Winner: Human ✅
- Q13-Q18: 4A, 2B → 4 Explore, 2 Align → Winner: Explore ✅
- Q19-Q24: 4A, 2B → 4 Spark, 2 Stabilize → Winner: Spark ✅

**Result**: VOC ✅
**Percentages**: 
- Signal: 67% (4/6)
- Human: 83% (5/6)
- Explore: 67% (4/6)
- Spark: 67% (4/6)

---

## 4. Percentage Display Design

### 4.1 Calculation Formula

```typescript
interface DimensionPercentages {
  signalPercentage: number;    // 0-100
  solutionPercentage: number;  // 0-100
  humanPercentage: number;     // 0-100
  machinePercentage: number;   // 0-100
  explorePercentage: number;   // 0-100
  alignPercentage: number;     // 0-100
  sparkPercentage: number;     // 0-100
  stabilizePercentage: number; // 0-100
}

function calculatePercentages(scores: DimensionScores): DimensionPercentages {
  return {
    signalPercentage: Math.round((scores.Signal / 6) * 100),
    solutionPercentage: Math.round((scores.Solution / 6) * 100),
    humanPercentage: Math.round((scores.Human / 6) * 100),
    machinePercentage: Math.round((scores.Machine / 6) * 100),
    explorePercentage: Math.round((scores.Explore / 6) * 100),
    alignPercentage: Math.round((scores.Align / 6) * 100),
    sparkPercentage: Math.round((scores.Spark / 6) * 100),
    stabilizePercentage: Math.round((scores.Stabilize / 6) * 100)
  };
}
```

### 4.2 Visual Display Format

**Compact 4-Bar Display** (Recommended):

```
Your Impulse Key: VOC

Your Dimension Profile:

┌─────────────────────────────────────┐
│ Signal    ████████████░░░░  67%     │
│ Solution  ████░░░░░░░░░░░░  33%     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Human     █████████████████  83%     │
│ Machine   ███░░░░░░░░░░░░░  17%     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Explore   ████████████░░░░  67%     │
│ Align     ████░░░░░░░░░░░░  33%     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Spark     ████████████░░░░  67%     │
│ Stabilize ████░░░░░░░░░░░░  33%     │
└─────────────────────────────────────┘
```

**Alternative: Radar Chart Style**:

```
      Signal (67%)
            |
            |
Stabilize   |   Human (83%)
  (33%)     |
      \     |     /
       \    |    /
        \   |   /
         \  |  /
          \ | /
           \|/
    --------X--------
           /|\
          / | \
         /  |  \
        /   |   \
       /    |    \
      /     |     \
Solution    |   Machine
 (33%)      |    (17%)
            |
        Explore
         (67%)
```

### 4.3 Interpretation Guide

Display this alongside percentages:

```
Understanding Your Dimensions:

📊 Signal (67%) vs Solution (33%)
   You focus more on uncovering customer needs than implementing solutions.

👥 Human (83%) vs Machine (17%)
   You strongly prioritize human experience over system logic.

🔍 Explore (67%) vs Align (33%)
   You lean toward discovery and testing over structured alignment.

⚡ Spark (67%) vs Stabilize (33%)
   You favor innovation and momentum over stability and governance.
```

---

## 5. Logic Issues & Fixes

### Issue 1: Some Keys Need Better Differentiation

**Problem**: Similar patterns might map to wrong keys if we only use 4 dimensions.

**Example**:
- VOC = Signal + Human + Explore + Spark
- QAQ = Signal + Human + Explore + Stabilize

Both are Signal + Human + Explore, differentiated only by Spark/Stabilize.

**Solution**: The mapping is actually correct:
- VOC: Proactive customer research (Spark = initiative)
- QAQ: Reactive quality testing (Stabilize = preventing issues)

✅ **No fix needed** - dimensions naturally separate these roles.

---

### Issue 2: Tie-Breaking Needs Clear Rules

**Problem**: When scores are 3-3, which pole wins?

**Solution Options**:

1. **Last-answer wins**: Use the most recent answer in that dimension
2. **Contextual tie-break**: If tied on Signal/Solution, look at Human/Machine to decide
3. **Lean toward positive pole**: Default to Signal, Human, Explore, Spark
4. **Show hybrid result**: "You are VOC with FIORI tendencies (50/50 on Align/Explore)"

**Recommendation**: Use Option 3 (lean toward first pole) for simplicity.

```typescript
function determineWinners(scores: DimensionScores) {
  return {
    dimensionA: scores.Signal >= scores.Solution ? 'Signal' : 'Solution',
    dimensionB: scores.Human >= scores.Machine ? 'Human' : 'Machine',
    dimensionC: scores.Explore >= scores.Align ? 'Explore' : 'Align',
    dimensionD: scores.Spark >= scores.Stabilize ? 'Spark' : 'Stabilize'
  };
}
```

Note: Using `>=` means ties default to the first pole.

---

## 6. Enhanced Mapping with Confidence Score

To show nuance, we can add a "confidence" indicator:

```typescript
interface ResultWithConfidence {
  impulseKey: string;
  confidence: 'Strong' | 'Moderate' | 'Balanced';
  dominantDimensions: string[];
  percentages: DimensionPercentages;
}

function calculateConfidence(scores: DimensionScores): string {
  const margins = [
    Math.abs(scores.Signal - scores.Solution),
    Math.abs(scores.Human - scores.Machine),
    Math.abs(scores.Explore - scores.Align),
    Math.abs(scores.Spark - scores.Stabilize)
  ];
  
  const avgMargin = margins.reduce((a, b) => a + b, 0) / 4;
  
  if (avgMargin >= 3) return 'Strong';      // Clear preference (e.g., 5-1)
  if (avgMargin >= 1.5) return 'Moderate';  // Slight preference (e.g., 4-2)
  return 'Balanced';                        // Very close (e.g., 3-3)
}
```

**Display Example**:

```
Your Impulse Key: VOC
Confidence: Strong Match

You strongly align with customer research and discovery.

Your profile shows:
- Strong Signal tendency (67%)
- Very strong Human focus (83%)
- Clear Explore preference (67%)
- Clear Spark orientation (67%)
```

---

## 7. Complete Implementation Code

### mapping.ts (Complete)

```typescript
export const impulseKeyMappings: Record<string, string> = {
  'Signal+Human+Explore+Spark': 'VOC',
  'Signal+Human+Explore+Stabilize': 'QAQ',
  'Signal+Human+Align+Spark': 'FIRE',
  'Signal+Human+Align+Stabilize': 'A11Y',
  'Signal+Machine+Explore+Spark': 'JOULE',
  'Signal+Machine+Explore+Stabilize': 'LOGS',
  'Signal+Machine+Align+Spark': 'AGENT',
  'Signal+Machine+Align+Stabilize': 'SAFE',
  'Solution+Human+Explore+Spark': 'BTP',
  'Solution+Human+Explore+Stabilize': 'PIXEL',
  'Solution+Human+Align+Spark': 'TRIO',
  'Solution+Human+Align+Stabilize': 'FIORI',
  'Solution+Machine+Explore+Spark': 'API',
  'Solution+Machine+Explore+Stabilize': 'OData',
  'Solution+Machine+Align+Spark': 'CTRL',
  'Solution+Machine+Align+Stabilize': 'CORE'
};

export function getImpulseKey(
  scores: DimensionScores
): string {
  const dimensionA = scores.Signal >= scores.Solution ? 'Signal' : 'Solution';
  const dimensionB = scores.Human >= scores.Machine ? 'Human' : 'Machine';
  const dimensionC = scores.Explore >= scores.Align ? 'Explore' : 'Align';
  const dimensionD = scores.Spark >= scores.Stabilize ? 'Spark' : 'Stabilize';
  
  const pattern = `${dimensionA}+${dimensionB}+${dimensionC}+${dimensionD}`;
  
  const key = impulseKeyMappings[pattern];
  
  if (!key) {
    console.error(`No mapping found for pattern: ${pattern}`);
    return 'VOC'; // Fallback
  }
  
  return key;
}

export function getFullResult(scores: DimensionScores) {
  const impulseKey = getImpulseKey(scores);
  const percentages = calculatePercentages(scores);
  const confidence = calculateConfidence(scores);
  
  return {
    impulseKey,
    confidence,
    scores,
    percentages,
    dominantDimensions: [
      scores.Signal >= scores.Solution ? 'Signal' : 'Solution',
      scores.Human >= scores.Machine ? 'Human' : 'Machine',
      scores.Explore >= scores.Align ? 'Explore' : 'Align',
      scores.Spark >= scores.Stabilize ? 'Spark' : 'Stabilize'
    ]
  };
}
```

---

## 8. Validation Summary

### ✅ Coverage
- All 16 combinations are mapped
- All 16 Impulse Keys are reachable
- No orphaned results

### ✅ Balance
- 6 questions per dimension
- Each question clearly maps to one pole
- No dimension is easier to score high on

### ✅ Logic
- Mappings make thematic sense
- Similar patterns map to related roles
- Percentages provide nuance beyond binary results

### ✅ Edge Cases
- Ties have clear resolution rules
- Extreme patterns (all A or all B) work correctly
- Balanced profiles have fallback logic

### ⚠️ Recommendations

1. **Playtest with 20+ people** to verify:
   - Do results feel accurate?
   - Are any questions confusing?
   - Is distribution reasonably spread? (no result >20% or <2%)

2. **Consider adding flavor markers**:
   - Certain question combos hint at specific keys
   - E.g., If Q7 (API error) + Q10 (API docs) both lean Machine → boost API key likelihood

3. **Add confidence thresholds**:
   - Strong match: 4-2 or better in 3+ dimensions
   - Moderate match: Mix of 4-2 and 3-3
   - Balanced: Mostly 3-3 ties

4. **Result page enhancements**:
   - Show "You are 67% VOC, 33% FIORI" for close calls
   - Display dimension bars with color coding
   - Add "People with your profile often..." descriptions

---

## 9. Final Validation Checklist

- [x] All 16 Impulse Keys have unique patterns
- [x] All patterns are reachable through questions
- [x] Questions are balanced (6 per dimension)
- [x] Tie-breaking rules are defined
- [x] Percentage calculation is correct
- [x] Edge cases are handled
- [x] Implementation code is complete
- [ ] Playtesting with real users (next step)
- [ ] Distribution analysis after 50+ responses (next step)

---

## 10. Next Steps

1. ✅ Mapping validated
2. ✅ Percentage display designed
3. 🔜 Implement in React/TypeScript
4. 🔜 Create result page with dimension bars
5. 🔜 Internal playtest (10-15 people)
6. 🔜 Analyze distribution and adjust if needed
7. 🔜 Launch at Impulse26 event

---

*Last updated: 2026-05-15*  
*Status: Validation complete, ready for implementation*
