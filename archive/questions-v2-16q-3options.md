# IMPULSE KEYS - Question Bank V2 (16 Questions, 3 Options)

> **Updates from V1**:
> - Reduced from 24 to 16 questions (4 per dimension)
> - Expanded from 2 to 3 options per question (A/B/C)
> - Added randomization support
> - Maintained balance across dimensions

---

## 1. Design Philosophy

### 1.1 Question Reduction Strategy

**From 24 to 16 questions**:
- Each dimension: 6 questions → 4 questions
- Still maintains balance (4 per dimension)
- Completion time: 4-6 minutes → 2-3 minutes
- Better mobile experience

### 1.2 Three-Option Scoring System

**Option weighting**:
```
Option A: +2 to Pole A, +0 to Pole B
Option B: +1 to Pole A, +1 to Pole B (balanced/neutral)
Option C: +0 to Pole A, +2 to Pole B
```

**Example**:
```
Q1: A customer says, "This part is not very convenient."

A (+2 Signal): Ask follow-up questions to understand the real workflow pain.
B (+1 Signal, +1 Solution): Check the current behavior first, then explore the pain.
C (+2 Solution): Check whether the current behavior matches the designed process.
```

**Why this works**:
- More nuanced results (not just binary)
- Allows "I'm somewhere in between" responses
- Still produces clear winners for each dimension
- Maximum possible score per dimension: 8 points
- Balanced middle options prevent forced choices

---

## 2. Complete Question Bank (16 Questions)

### Dimension A: Signal vs Solution (4 questions)

#### Q1 (Signal vs Solution)
**Scenario**: A customer says, "This part is not very convenient."

**What do you do first?**

- **A (+2 Signal)**: Ask follow-up questions to understand the real workflow pain.
  - *Humor: "Tell me more." Then pain-point archaeology begins.*
  
- **B (+1 Signal, +1 Solution)**: Check the current behavior first, then explore the pain.
  - *Humor: Start with facts, then feelings. Both matter.*
  
- **C (+2 Solution)**: Check whether the current behavior matches the designed process.
  - *Humor: "Let me check the process." Then you discover this is not a bug, but ancestral design.*

---

#### Q2 (Signal vs Solution)
**Scenario**: A small edge case appears before release.

**How do you evaluate it?**

- **A (+2 Signal)**: Ask whether this edge case creates real user pain.
  - *Humor: Edge case is often just another word for ignored user.*
  
- **B (+1 Signal, +1 Solution)**: Check user impact AND production incident risk.
  - *Humor: It's both a user problem and a system problem. Welcome to reality.*
  
- **C (+2 Solution)**: Check whether it could become a production incident.
  - *Humor: Small bugs grow up fast in production.*

---

#### Q3 (Signal vs Solution)
**Scenario**: Users report that a flow "feels complicated."

**Where do you start?**

- **A (+2 Signal)**: Observe where users hesitate or get stuck.
  - *Humor: "Feels complicated" = user trying to be polite.*
  
- **B (+1 Signal, +1 Solution)**: Watch users, then review the logic structure.
  - *Humor: Sometimes it's the UX. Sometimes it's 10 hidden IF statements.*
  
- **C (+2 Solution)**: Review the step count, logic branches, and error states.
  - *Humor: Complicated flow usually has ten hidden IF statements nobody remembers.*

---

#### Q4 (Signal vs Solution)
**Scenario**: A stakeholder wants to "improve the dashboard."

**What do you ask first?**

- **A (+2 Signal)**: What decision are users trying to make with this dashboard?
  - *Humor: "Improve" is a symptom. Not a requirement.*
  
- **B (+1 Signal, +1 Solution)**: What decision do they need, and what data supports it?
  - *Humor: Dashboards need both purpose and plumbing.*
  
- **C (+2 Solution)**: What metrics, filters, and actions should it support?
  - *Humor: A dashboard without a decision is just corporate wallpaper.*

---

### Dimension B: Human vs Machine (4 questions)

#### Q5 (Human vs Machine)
**Scenario**: The API technically works, but the error message is unclear.

**What's your priority?**

- **A (+2 Human)**: Improve the message because developers are also users.
  - *Humor: Developer is also a user, just with better screenshots.*
  
- **B (+1 Human, +1 Machine)**: Improve the message AND ensure contract consistency.
  - *Humor: Good DX needs both empathy and precision.*
  
- **C (+2 Machine)**: Check the contract, status code, and documentation consistency.
  - *Humor: 400 Bad Request is not an error message. It's an emotional state.*

---

#### Q6 (Human vs Machine)
**Scenario**: The AI agent gives a recommendation confidently.

**What do you check first?**

- **A (+2 Human)**: Whether users can understand, trust, and override it.
  - *Humor: AI is confident. Users may still have trust issues.*
  
- **B (+1 Human, +1 Machine)**: Check user trust AND the data quality behind it.
  - *Humor: Trust requires both transparency and correctness.*
  
- **C (+2 Machine)**: What data, permission, and workflow triggered the recommendation.
  - *Humor: The more realistic AI sounds, the more you want to check where it learned that.*

---

#### Q7 (Human vs Machine)
**Scenario**: A screen looks "almost fine," but something feels wrong.

**What do you check?**

- **A (+2 Human)**: Hierarchy, spacing, wording, and visual priority.
  - *Humor: It is only 2px, but so is the beginning of chaos.*
  
- **B (+1 Human, +1 Machine)**: Check the visual design AND whether data states are handled.
  - *Humor: Sometimes it's the layout. Sometimes it's the missing error state.*
  
- **C (+2 Machine)**: Whether the screen matches process logic and data states.
  - *Humor: The layout is fine. The underlying process is screaming.*

---

#### Q8 (Human vs Machine)
**Scenario**: A proposal says, "Let the AI automatically handle this."

**What's your first concern?**

- **A (+2 Human)**: Ask where users stay in control.
  - *Humor: AI can help. It does not need to become everyone's new manager.*
  
- **B (+1 Human, +1 Machine)**: Check user control AND system safety boundaries.
  - *Humor: Good automation needs both a steering wheel and brakes.*
  
- **C (+2 Machine)**: Ask what system boundary, permission, and audit trail are needed.
  - *Humor: The agent can run, but not naked.*

---

### Dimension C: Explore vs Align (4 questions)

#### Q9 (Explore vs Align)
**Scenario**: The team has argued about one flow for 30 minutes.

**What do you do?**

- **A (+2 Explore)**: Make a quick prototype so people can react to something real.
  - *Humor: Words fail. Prototypes speak.*
  
- **B (+1 Explore, +1 Align)**: Prototype a quick sketch AND define what "good" looks like.
  - *Humor: Show, don't just tell. But agree on the goal first.*
  
- **C (+2 Align)**: Define decision criteria before the discussion becomes group therapy.
  - *Humor: Without criteria, meetings are just opinion yoga.*

---

#### Q10 (Explore vs Align)
**Scenario**: PM, UX, and Engineering each have a different understanding of the same feature.

**What's your next move?**

- **A (+2 Explore)**: Run a quick alignment session around customer value and user flow.
  - *Humor: Early alignment is boring, but rework is dramatic.*
  
- **B (+1 Explore, +1 Align)**: Align on the user problem, then document scope and owners.
  - *Humor: Start with why, then define who and what.*
  
- **C (+2 Align)**: Define scope, owner, decision log, dependency, and feasibility risks.
  - *Humor: No decision log means everyone gets their own version of history.*

---

#### Q11 (Explore vs Align)
**Scenario**: A vague requirement says "make it more intuitive."

**How do you respond?**

- **A (+2 Explore)**: Test with users to see where they struggle.
  - *Humor: "Intuitive" is code for "I'll know it when I see it."*
  
- **B (+1 Explore, +1 Align)**: Test with users AND get stakeholder examples of "intuitive."
  - *Humor: User testing + clear criteria = actual progress.*
  
- **C (+2 Align)**: Ask stakeholders to define what "intuitive" means with examples.
  - *Humor: One person's intuitive is another person's mystery meat navigation.*

---

#### Q12 (Explore vs Align)
**Scenario**: A feature needs input from multiple teams but nobody owns the decision.

**What do you do first?**

- **A (+2 Explore)**: Prototype a solution to clarify what needs to be decided.
  - *Humor: Sometimes you need a villain (the prototype) to unite the heroes.*
  
- **B (+1 Explore, +1 Align)**: Draft a proposal AND identify who decides.
  - *Humor: Good ideas need both content and a decision maker.*
  
- **C (+2 Align)**: Identify decision owner, stakeholders, and approval criteria.
  - *Humor: Decisions without owners become eternal meetings.*

---

### Dimension D: Spark vs Stabilize (4 questions)

#### Q13 (Spark vs Stabilize)
**Scenario**: A customer asks, "Why can't Joule do this automatically?"

**What's your reaction?**

- **A (+2 Spark)**: Explore what the AI-assisted workflow could look like.
  - *Humor: Every limitation is an AI opportunity waiting to happen.*
  
- **B (+1 Spark, +1 Stabilize)**: Explore AI possibilities while checking current pain points.
  - *Humor: Dream big, but validate the problem first.*
  
- **C (+2 Stabilize)**: Check current workflow pain points before adding AI.
  - *Humor: AI is great. But sometimes people just want a better button.*

---

#### Q14 (Spark vs Stabilize)
**Scenario**: Someone proposes a creative workaround to ship faster.

**What's your first thought?**

- **A (+2 Spark)**: Let's try it and learn quickly.
  - *Humor: Ship now, refactor later. (Narrator: They never refactored.)*
  
- **B (+1 Spark, +1 Stabilize)**: Try it with clear migration plan documented.
  - *Humor: Shortcuts are fine if they come with exit signs.*
  
- **C (+2 Stabilize)**: Today's shortcut could be tomorrow's migration nightmare.
  - *Humor: Every dirty shortcut wants to become legacy.*

---

#### Q15 (Spark vs Stabilize)
**Scenario**: The roadmap looks great, but support tickets tell a different story.

**What's your focus?**

- **A (+2 Spark)**: Bring support signals back into product discovery.
  - *Humor: Roadmap is optimistic. Customers are specific.*
  
- **B (+1 Spark, +1 Stabilize)**: Learn from support AND check production logs for patterns.
  - *Humor: Listen to customers. Trust the data. Do both.*
  
- **C (+2 Stabilize)**: Read logs and incidents to understand the real behavior.
  - *Humor: Logs are the product diary nobody wanted to publish.*

---

#### Q16 (Spark vs Stabilize)
**Scenario**: A team member suggests trying a new technology in the project.

**What do you consider?**

- **A (+2 Spark)**: Whether it solves a real problem we have.
  - *Humor: "Let's try it" is how we learn. And sometimes regret.*
  
- **B (+1 Spark, +1 Stabilize)**: Whether it solves our problem AND has community support.
  - *Humor: New is exciting. Proven is boring. Pick your battles.*
  
- **C (+2 Stabilize)**: Whether it's proven, supported, and aligned with our architecture.
  - *Humor: "Battle-tested" means someone else already fought the bugs.*

---

## 3. Updated Scoring System

### 3.1 Score Calculation

With 3-option questions and 4 questions per dimension:

**Maximum possible per pole**: 8 points (4 questions × 2 points)

**Example scoring**:
```
User answers: A, B, A, C
Question 1: A → +2 Signal, +0 Solution
Question 2: B → +1 Signal, +1 Solution
Question 3: A → +2 Signal, +0 Solution
Question 4: C → +0 Signal, +2 Solution

Result: Signal = 5, Solution = 3
Percentage: Signal 63%, Solution 37%
Winner: Signal
```

### 3.2 Percentage Formula

```typescript
interface DimensionScores {
  Signal: number;      // 0-8
  Solution: number;    // 0-8
  Human: number;       // 0-8
  Machine: number;     // 0-8
  Explore: number;     // 0-8
  Align: number;       // 0-8
  Spark: number;       // 0-8
  Stabilize: number;   // 0-8
}

function calculatePercentages(scores: DimensionScores) {
  const maxPerDimension = 8;
  
  return {
    signalPercentage: Math.round((scores.Signal / maxPerDimension) * 100),
    solutionPercentage: Math.round((scores.Solution / maxPerDimension) * 100),
    humanPercentage: Math.round((scores.Human / maxPerDimension) * 100),
    machinePercentage: Math.round((scores.Machine / maxPerDimension) * 100),
    explorePercentage: Math.round((scores.Explore / maxPerDimension) * 100),
    alignPercentage: Math.round((scores.Align / maxPerDimension) * 100),
    sparkPercentage: Math.round((scores.Spark / maxPerDimension) * 100),
    stabilizePercentage: Math.round((scores.Stabilize / maxPerDimension) * 100)
  };
}
```

**Note**: Percentages for each dimension pair should sum to 100% (e.g., Signal 63% + Solution 37% = 100%)

---

## 4. Randomization Strategy

### 4.1 Randomization Rules

**Why randomize**:
- Prevents memorization between retakes
- Reduces order bias
- Keeps test feeling fresh
- Prevents pattern gaming

**What to randomize**:
1. ✅ **Question order** - Shuffle all 16 questions
2. ✅ **Option order within each question** - Shuffle A/B/C options
3. ❌ **Do NOT randomize dimension balance** - Still need 4 per dimension

### 4.2 Implementation

```typescript
interface Question {
  id: string;
  dimension: 'SignalSolution' | 'HumanMachine' | 'ExploreAlign' | 'SparkStabilize';
  scenario: string;
  question: string;
  options: QuestionOption[];
}

interface QuestionOption {
  id: string;  // 'A', 'B', or 'C' (original identifier)
  text: string;
  scoreA: number;  // Points for pole A (Signal/Human/Explore/Spark)
  scoreB: number;  // Points for pole B (Solution/Machine/Align/Stabilize)
  humor?: string;
}

// Shuffle questions on load
function shuffleQuestions(questions: Question[]): Question[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Shuffle options within each question
function shuffleOptions(question: Question): Question {
  const shuffledOptions = [...question.options];
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  }
  return { ...question, options: shuffledOptions };
}

// Complete randomization
function prepareTest(questions: Question[]): Question[] {
  const shuffledQuestions = shuffleQuestions(questions);
  return shuffledQuestions.map(q => shuffleOptions(q));
}
```

### 4.3 User Experience

**On test start**:
```
Welcome to IMPULSE KEYS!

16 questions. 2-3 minutes.
Find your experience personality.

[Start Test] ← Click here, randomization happens
```

**During test**:
```
Question 5 of 16

[Randomized scenario text]

○ [Randomized option 1]
○ [Randomized option 2]  
○ [Randomized option 3]

Progress: ▓▓▓▓▓░░░░░░░░░░░ 31%
```

**Retake behavior**:
- Questions appear in different order
- Options within questions are reshuffled
- Fresh experience every time

---

## 5. Updated Data Structure

### questions-v2.ts

```typescript
export const questionsV2: Question[] = [
  // Dimension A: Signal vs Solution
  {
    id: 'Q1',
    dimension: 'SignalSolution',
    scenario: 'A customer says, "This part is not very convenient."',
    question: 'What do you do first?',
    options: [
      {
        id: 'A',
        text: 'Ask follow-up questions to understand the real workflow pain.',
        scoreA: 2,  // Signal
        scoreB: 0,  // Solution
        humor: 'Tell me more. Then pain-point archaeology begins.'
      },
      {
        id: 'B',
        text: 'Check the current behavior first, then explore the pain.',
        scoreA: 1,
        scoreB: 1,
        humor: 'Start with facts, then feelings. Both matter.'
      },
      {
        id: 'C',
        text: 'Check whether the current behavior matches the designed process.',
        scoreA: 0,
        scoreB: 2,
        humor: 'Let me check the process. Then you discover this is not a bug, but ancestral design.'
      }
    ]
  },
  // ... 15 more questions
];
```

---

## 6. Validation: Test Cases

### Test Case 1: All A answers (max Pole A)
```
Expected scores:
- Signal: 8, Solution: 0 (100% Signal)
- Human: 8, Machine: 0 (100% Human)
- Explore: 8, Align: 0 (100% Explore)
- Spark: 8, Stabilize: 0 (100% Spark)

Result: VOC ✅
```

### Test Case 2: All C answers (max Pole B)
```
Expected scores:
- Signal: 0, Solution: 8 (100% Solution)
- Human: 0, Machine: 8 (100% Machine)
- Explore: 0, Align: 8 (100% Align)
- Spark: 0, Stabilize: 8 (100% Stabilize)

Result: CORE ✅
```

### Test Case 3: All B answers (perfectly balanced)
```
Expected scores:
- Signal: 4, Solution: 4 (50% / 50%)
- Human: 4, Machine: 4 (50% / 50%)
- Explore: 4, Align: 4 (50% / 50%)
- Spark: 4, Stabilize: 4 (50% / 50%)

Result: VOC (tie-breaking defaults to Pole A) ✅
Note: Show "Balanced" confidence level
```

### Test Case 4: Mixed realistic answers
```
User answers: A, B, A, C, A, B, C, A, B, A, B, C, A, B, A, C

Dimension A (Q1-4): A, B, A, C
  Signal: 2+1+2+0 = 5, Solution: 0+1+0+2 = 3
  Winner: Signal (63%)

Dimension B (Q5-8): A, B, C, A
  Human: 2+1+0+2 = 5, Machine: 0+1+2+0 = 3
  Winner: Human (63%)

Dimension C (Q9-12): B, A, B, C
  Explore: 1+2+1+0 = 4, Align: 1+0+1+2 = 4
  Winner: Explore (50% - tie)

Dimension D (Q13-16): A, B, A, C
  Spark: 2+1+2+0 = 5, Stabilize: 0+1+0+2 = 3
  Winner: Spark (63%)

Result: VOC ✅
```

---

## 7. Comparison: V1 vs V2

| Feature | V1 (24Q, 2 options) | V2 (16Q, 3 options) |
|---|---|---|
| Question count | 24 | 16 |
| Options per Q | 2 (A/B) | 3 (A/B/C) |
| Completion time | 4-6 min | 2-3 min |
| Questions per dimension | 6 | 4 |
| Max score per pole | 6 | 8 |
| Nuance | Binary choice | Gradient with middle option |
| Randomization | No | Yes (questions + options) |
| Mobile friendly | Good | Better |
| Retake experience | Repetitive | Fresh every time |

---

## 8. Benefits of V2 Design

### ✅ Shorter & Faster
- 16 questions = 33% shorter
- Better completion rate
- Less fatigue
- Mobile-optimized

### ✅ More Nuanced
- 3 options allow "I'm in between" responses
- Reduces forced binary choices
- Better reflects real thinking
- Still produces clear results

### ✅ Randomized
- Fresh experience on retakes
- Prevents memorization
- Reduces order bias
- More scientific

### ✅ Maintains Balance
- Still 4 questions per dimension
- Fair distribution
- All 16 results reachable
- Percentages still meaningful

---

## 9. Next Steps

1. ✅ Question bank redesigned (16Q, 3 options)
2. ✅ Scoring system updated (8-point scale)
3. ✅ Randomization logic specified
4. 🔜 Implement in TypeScript/React
5. 🔜 Test with all answer patterns
6. 🔜 Internal playtest (10-15 people)
7. 🔜 Validate randomization works
8. 🔜 Launch!

---

*Last updated: 2026-05-15*  
*Version: 2.0 (16 questions, 3 options, randomized)*
