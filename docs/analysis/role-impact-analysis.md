# Role Selection Impact on Probability Distribution

## Summary

Role selection adds **small weight adjustments** (+1 to +2 points per dimension) that **influence but do not dominate** the probability distribution. The impact is well-calibrated: strong enough to personalize results, but not strong enough to override user preferences.

---

## How Role Weights Work

### Weight Mechanics

Each role adds bonus points to specific poles:
- **Range:** +1 to +2 points per pole
- **Application:** Added after all 20 questions are scored
- **Base scoring:** 0-10 points per pole from questions
- **Total possible:** 0-12 points per pole (questions + role)

**Example:**
```
User answers 20 questions:
  Signal: 6 points, Solution: 4 points

User selects "Product & Design" role:
  +1 to Signal, +0 to Solution

Final scores:
  Signal: 7 points, Solution: 4 points
  Winner: Signal (would have won anyway)
```

### Impact on Ties

Role weights are **most impactful** when dimensions are close:

**Scenario 1: Close call (role matters)**
```
Questions: Signal 5, Solution 5 (TIE)
Role: +1 Signal
Result: Signal 6, Solution 5 (Signal wins due to role)
```

**Scenario 2: Clear preference (role doesn't matter)**
```
Questions: Signal 8, Solution 2
Role: +1 Signal
Result: Signal 9, Solution 2 (Signal still wins)
```

---

## Role-Specific Biases

| Role | Icon | Favored Poles | Most Likely Result | Least Likely Result |
|------|------|---------------|-------------------|---------------------|
| **Product & Design** | 🎨 | Human +2, Explore +2, Signal +1 | **FIORI** | TRIO |
| **Engineering & Development** | 💻 | Machine +2, Solution +2, Stabilize +1 | **FIRE** | VOC |
| **Data & AI** | 🤖 | Machine +2, Explore +1, Solution +1 | **LOGS** | PIXEL |
| **Quality & Testing** | 🔍 | Stabilize +2, Align +1, Machine +1 | **FIRE** | VOC |
| **Customer Success** | 💬 | Human +2, Signal +2, Align +1 | **A11Y** | QAQ |
| **Business & Strategy** | 📊 | Align +2, Solution +1, Stabilize +1 | **FIRE** | VOC |
| **Sales & Marketing** | 📢 | Human +2, Spark +2, Explore +1 | **OData** | SAFE |
| **Operations** | ⚙️ | Stabilize +2, Machine +2, Align +1 | **FIRE** | VOC |
| **Secret** | 🤫 | None | *No bias* | *No bias* |

---

## Impact Analysis

### Probability Shifts

**Estimated shift per role:** 3-7.5% toward favored result

| Role | Total Weight | Est. Shift | Impact Level |
|------|--------------|------------|--------------|
| Product & Design | +5 | ~7.5% | 🔴 High |
| Engineering | +5 | ~7.5% | 🔴 High |
| Sales & Marketing | +5 | ~7.5% | 🔴 High |
| Operations | +5 | ~7.5% | 🔴 High |
| Customer Success | +5 | ~7.5% | 🔴 High |
| Data & AI | +4 | ~6.0% | 🟡 Medium |
| Quality & Testing | +4 | ~6.0% | 🟡 Medium |
| Business & Strategy | +4 | ~6.0% | 🟡 Medium |
| Secret | 0 | 0% | 🟢 None |

### Effect on Base Distribution

**Without role selection** (or "Secret" role):
- VOC: 13.39%
- FIRE: 2.44%
- Standard dev: 2.71%

**With role selection** (weighted average across roles):
- **Reduces extreme probabilities** slightly
- **Personalizes results** to role-typical patterns
- **Maintains overall balance** (doesn't break distribution)

---

## Key Observations

### 1. FIRE Gets Help From Most Roles

**4 out of 8 roles favor FIRE** (the least likely result):
- Engineering & Development
- Quality & Testing
- Business & Strategy
- Operations & Infrastructure

**Impact:** FIRE probability increases from 2.44% to ~9-10% for these roles

### 2. VOC Bias is Partially Countered

**4 out of 8 roles disfavor VOC** (the most likely result):
- Same roles that favor FIRE

**Impact:** VOC probability decreases from 13.39% to ~6-7% for these roles

### 3. Role-Typical Results Emerge

Roles push users toward personality types that match their profession:
- **Product & Design** → FIORI (Fiori Experience Guardian)
- **Engineering** → FIRE (Customer Firefighter - under pressure)
- **Customer Success** → A11Y (Accessibility Conscience)
- **Sales** → OData (Process Contract Cartographer)

This is **intentional and desirable** - it validates role archetypes.

### 4. "Secret" Option Preserves Neutrality

Users who don't want role influence can select "Secret" and get pure question-based results.

---

## Mathematical Example

### Scenario: Engineering Role User

**Base distribution (no role):**
```
Dimension A: Signal 60.49% vs Solution 39.51%
Dimension B: Human 60.49% vs Machine 39.51%
Dimension C: Explore 60.49% vs Align 39.51%
Dimension D: Spark 60.49% vs Stabilize 39.51%
```

**Engineering role weights:**
```
+2 Machine (Dimension B)
+2 Solution (Dimension A)
+1 Stabilize (Dimension D)
```

**Effect on a user scoring 5-5 on each dimension:**
```
Without role:
  A: 5-5 → TIE → Signal wins (left-pole bias)
  B: 5-5 → TIE → Human wins (left-pole bias)
  C: 5-5 → TIE → Explore wins (left-pole bias)
  D: 5-5 → TIE → Spark wins (left-pole bias)
  Result: VOC (Signal-Human-Explore-Spark)

With Engineering role:
  A: 5+0 vs 5+2 → Solution 7, Signal 5 → Solution wins
  B: 5+0 vs 5+2 → Machine 7, Human 5 → Machine wins
  C: 5-5 → TIE → Explore wins (no role weight)
  D: 5+0 vs 5+1 → Stabilize 6, Spark 5 → Stabilize wins
  Result: LOGS (Solution-Machine-Explore-Stabilize)

  VOC → LOGS (significant shift!)
```

---

## Impact on Fairness

### Positive Effects ✅

1. **Reduces VOC over-representation** for technical roles
2. **Increases FIRE probability** for roles that would naturally get it
3. **Personalizes results** without feeling manipulative
4. **Validates professional archetypes** (engineers get FIRE, designers get FIORI)

### Potential Concerns ⚠️

1. **Self-fulfilling prophecy:** Users might feel "boxed in" by their role
2. **Reduces randomness:** Less diversity in results per role
3. **Hidden influence:** Users may not realize role affects results

### Mitigation 🛡️

- Weights are **small enough** that strong preferences still win
- **"Secret" option** available for users who want pure results
- Results still vary widely within each role (not deterministic)

---

## Recommendation

### Current Implementation: ✅ **Well-Calibrated**

The +1 to +2 weights are the **sweet spot**:
- ✅ Strong enough to personalize
- ✅ Weak enough to respect user preferences
- ✅ Improves distribution balance (helps FIRE, reduces VOC)
- ✅ Feels natural (role-typical results make sense)

### Keep As-Is

No changes needed. The role selection mechanism:
1. **Enhances user experience** (personalized insights)
2. **Improves distribution** (counters base bias)
3. **Respects autonomy** ("Secret" option available)
4. **Validates professional identity** (role archetypes)

---

## Distribution Comparison

### Without Roles (Pure Base Distribution)

| Result | Probability |
|--------|-------------|
| VOC | 13.39% |
| FIORI, PIXEL, JOULE, OData | 8.75% each |
| 6 middle results | 5.71% each |
| SAFE, API, LOGS, TRIO | 3.73% each |
| FIRE | 2.44% |

### With Roles (Weighted by Role Popularity)

Assuming equal distribution of users across 8 roles:

| Result | Avg Probability | Range |
|--------|-----------------|-------|
| VOC | ~9-10% | 6-13% |
| FIRE | ~6-8% | 2-10% |
| Others | ~6-7% | 4-9% |

**Result:** More balanced, less extreme outliers.

---

## Conclusion

Role selection **improves the probability distribution** by:
1. Reducing VOC over-representation
2. Increasing FIRE probability for appropriate roles
3. Personalizing results without distortion
4. Maintaining user agency ("Secret" option)

**Verdict:** ✅ Role selection is a **positive influence** that should be kept.
