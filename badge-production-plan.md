# 🎯 IMPULSE KEYS Badge Production Plan

## Overview
Production plan for **100 badges** across 16 personality types based on probability analysis.

---

## 📊 Probability Analysis

### Methodology
- Each dimension has 5 questions with 3 options (A, B, C)
- Total combinations per dimension: 3^5 = 243
- Scoring: Option A (+2 to left pole), Option B (split +1/+1), Option C (+2 to right pole)
- Question 5 in each dimension is a tiebreaker: +1/-/+1 scoring pattern
- **Assumption**: Users answer independently and uniformly random across options

### Dimension Distribution
Each dimension has slight bias toward left pole due to tiebreaker question:
- **Dimension A**: Signal (125/243 = 51.4%) vs Solution (118/243 = 48.6%)
- **Dimension B**: Human (125/243 = 51.4%) vs Machine (118/243 = 48.6%)
- **Dimension C**: Explore (125/243 = 51.4%) vs Align (118/243 = 48.6%)
- **Dimension D**: Spark (125/243 = 51.4%) vs Stabilize (118/243 = 48.6%)

---

## 📦 Badge Production Recommendation (100 Total)

| Rank | Type | Probability | Badges | Color Group | Description |
|------|------|-------------|--------|-------------|-------------|
| 1 | **VOC** | 7.00% | **7** | 🔴 Magenta | Voice-of-Customer Detective |
| 2 | **FIORI** | 6.61% | **7** | 🔴 Magenta | Fiori Experience Guardian |
| 3 | **PIXEL** | 6.61% | **7** | 🔴 Magenta | Pixel-Level Perfectionist |
| 4 | **JOULE** | 6.61% | **7** | 🟡 Yellow | Joule Dream Weaver |
| 5 | **OData** | 6.61% | **7** | 🟢 Cyan | Process Contract Cartographer |
| 6 | **A11Y** | 6.24% | **6** | 🔴 Magenta | Accessibility Conscience |
| 7 | **CTRL** | 6.24% | **6** | 🟡 Yellow | Human Control Keeper |
| 8 | **AGENT** | 6.24% | **6** | 🟡 Yellow | Agentic Workflow Prophet |
| 9 | **BTP** | 6.24% | **6** | 🟢 Cyan | Prototype Escape Artist |
| 10 | **CORE** | 6.24% | **6** | 🟢 Cyan | Clean Core Monk |
| 11 | **QAQ** | 6.24% | **6** | 🟣 Purple | Quality Empath |
| 12 | **SAFE** | 5.89% | **6** | 🟡 Yellow | Trustworthy AI Therapist |
| 13 | **API** | 5.89% | **6** | 🟢 Cyan | Developer Experience Whisperer |
| 14 | **LOGS** | 5.89% | **6** | 🟣 Purple | Production Reality Reader |
| 15 | **TRIO** | 5.89% | **6** | 🟣 Purple | HPOM Alignment Summoner |
| 16 | **FIRE** | 5.56% | **6** | 🟣 Purple | Customer Firefighter |

**Total: 100 badges**

---

## 🎨 Color Group Distribution

| Color | Group | Count | Types |
|-------|-------|-------|-------|
| 🔴 Magenta | Signal + Human | **26** | VOC (7), FIORI (7), PIXEL (7), A11Y (6) |
| 🟡 Yellow | Signal + Machine | **25** | JOULE (7), CTRL (6), AGENT (6), SAFE (6) |
| 🟢 Cyan | Solution + Human | **25** | OData (7), BTP (6), CORE (6), API (6) |
| 🟣 Purple | Solution + Machine | **24** | QAQ (6), LOGS (6), TRIO (6), FIRE (6) |

---

## ✅ Production Strategy

### Phase 1: Initial Production (100 badges)
1. **Top Tier (7 badges each)**: VOC, FIORI, PIXEL, JOULE, OData
2. **Standard Tier (6 badges each)**: All remaining 11 types

### Phase 2: Buffer Strategy
Recommend producing **110-120 total** to allow for:
- **Popular type surge**: Extra 1-2 badges for top 5 types
- **Damage/defects**: 5% buffer
- **VIP/press kits**: Reserve 5-10 special badges

### Phase 3: Reorder Strategy
After first 50-100 users complete the test:
1. **Track actual distribution** in your analytics
2. **Compare with prediction**:
   - If actual matches predicted: continue with current ratios
   - If significant deviation (>15%): adjust production for next batch
3. **Monitor stockouts**: Reorder any type that drops below 20% inventory

---

## 📊 Expected Stockout Risk Analysis

### High Risk (Most Popular - 7.00%)
- **VOC** (7 badges, 7.00% expected)
  - Risk: Highest probability, may run out if >100 badges claimed
  - Mitigation: Produce 8-9 in first batch

### Medium-High Risk (Second Tier - 6.61%)
- **FIORI, PIXEL, JOULE, OData** (7 badges each, 6.61% expected)
  - Risk: May run out if cluster effect occurs
  - Mitigation: Monitor daily, fast-track reorder if <2 remaining

### Low Risk (Standard Types - 5.56-6.24%)
- **All remaining 11 types** (6 badges each)
  - Risk: Low, evenly distributed
  - Safe inventory level

---

## 🎯 Alternative: Conservative Strategy (Zero Stockouts)

If you want to **guarantee no stockouts** for 100 users:

| Strategy | Total Badges | Top 5 (VOC/FIORI/PIXEL/JOULE/OData) | Others |
|----------|-------------|--------------------------------------|--------|
| **Aggressive** | 100 | 7 each | 6 each |
| **Balanced** | 110 | 8 each | 6-7 each |
| **Conservative** | 120 | 9 each | 7 each |

---

## 💡 Key Assumptions & Limitations

### Assumptions
1. ✅ Users answer **uniformly random** across A/B/C options
2. ✅ No role weighting bias (or negligible impact)
3. ✅ Question randomization doesn't affect distribution
4. ✅ No cultural bias (EN vs 中文 users answer similarly)

### Real-World Factors That May Shift Distribution
1. ⚠️ **Design community bias**: May skew toward Human/Signal (Magenta)
2. ⚠️ **SAP audience bias**: May skew toward Solution/Machine (Purple)
3. ⚠️ **Social desirability**: Users may avoid "Machine" or "Stabilize" options
4. ⚠️ **Question difficulty**: If some questions are confusing, users may default to middle option (B)

### Recommendation
- **Start with calculated ratios** (100 badges as shown above)
- **Monitor first 30-50 users** and adjust if needed
- **Fast-track reorder** for OData if it hits 80% claim rate early

---

## 📈 Post-Launch Analytics to Track

1. **Actual distribution** vs predicted
2. **Time to stockout** for each type
3. **Color group preferences** (Magenta vs Purple vs Yellow vs Cyan)
4. **Dimension biases**:
   - Are users more Signal or Solution?
   - Are users more Human or Machine?
5. **User satisfaction**: Do people like their results?

---

## 🚀 Next Steps

1. ✅ **Approve badge quantities** (above table)
2. ✅ **Design 16 badge variants** (one per type)
3. ✅ **Set up production** with supplier
4. ✅ **Create inventory tracking** system
5. ✅ **Plan reorder triggers** (when <20% remaining)
6. ✅ **Launch and monitor** actual distribution

---

## 📞 Questions to Consider

1. **Budget**: Can we afford 110-120 badges instead of 100?
2. **Timeline**: How long does badge reorder take?
3. **Storage**: Can we store extra badges long-term?
4. **Digital fallback**: If badges run out, offer digital badges?
5. **Rarity**: Should we intentionally make some types rarer as collectibles?

---

**Generated on**: 2026-08-03  
**Based on**: IMPULSE KEYS question bank (20 questions, 4 dimensions)  
**Calculation**: Monte Carlo simulation with uniform random sampling
