# IMPULSE KEYS - Questions and Mapping Design

> **Reference**: Based on game-content.md sections 16-18 and research-plan.md Part 4-5

---

## 1. Four Dimensions Overview

```
Dimension A: Signal vs Solution
Dimension B: Human vs Machine  
Dimension C: Explore vs Align
Dimension D: Spark vs Stabilize
```

**Target**: 24 questions total (6 per dimension)

**Balance Goal**: Each dimension should have ~50/50 split possibility

---

## 2. Question Bank (24 Questions)

### Dimension A: Signal vs Solution (6 questions)

#### Q1 (Signal vs Solution)
**Scenario**: A customer says, "This part is not very convenient."

**What do you do first?**

- **A (Signal)**: Ask follow-up questions to understand the real workflow pain.
- **B (Solution)**: Check whether the current behavior matches the designed process.

**Humor flavor**:
- A: "Tell me more." Then pain-point archaeology begins.
- B: "Let me check the process." Then you discover this is not a bug, but ancestral design.

---

#### Q2 (Signal vs Solution)
**Scenario**: A workshop produces ten customer quotes and zero decisions.

**What's your next move?**

- **A (Signal)**: Cluster the quotes into pain points, roles, and scenarios.
- **B (Solution)**: Map them to product scope, owners, and feasibility.

**Humor flavor**:
- A: Quotes are not insights until someone suffers through synthesis.
- B: Without owners, insights become decoration.

---

#### Q3 (Signal vs Solution)
**Scenario**: A small edge case appears before release.

**How do you evaluate it?**

- **A (Signal)**: Ask whether this edge case creates real user pain.
- **B (Solution)**: Check whether it could become a production incident.

**Humor flavor**:
- A: Edge case is often just another word for ignored user.
- B: Small bugs grow up fast in production.

---

#### Q4 (Signal vs Solution)
**Scenario**: The team debates whether to add a new filter option.

**What's your first question?**

- **A (Signal)**: Who needs this filter and in what workflow?
- **B (Solution)**: What's the performance impact and data model change?

**Humor flavor**:
- A: "Who asked for this?" is not hostility. It's archaeology.
- B: Every new filter is one more JOIN waiting to timeout.

---

#### Q5 (Signal vs Solution)
**Scenario**: Users report that a flow "feels complicated."

**Where do you start?**

- **A (Signal)**: Observe where users hesitate or get stuck.
- **B (Solution)**: Review the step count, logic branches, and error states.

**Humor flavor**:
- A: "Feels complicated" = user trying to be polite.
- B: Complicated flow usually has ten hidden IF statements nobody remembers.

---

#### Q6 (Signal vs Solution)
**Scenario**: A stakeholder wants to "improve the dashboard."

**What do you ask first?**

- **A (Signal)**: What decision are users trying to make with this dashboard?
- **B (Solution)**: What metrics, filters, and actions should it support?

**Humor flavor**:
- A: "Improve" is a symptom. Not a requirement.
- B: A dashboard without a decision is just corporate wallpaper.

---

### Dimension B: Human vs Machine (6 questions)

#### Q7 (Human vs Machine)
**Scenario**: The API technically works, but the error message is unclear.

**What's your priority?**

- **A (Human)**: Improve the message because developers are also users.
- **B (Machine)**: Check the contract, status code, and documentation consistency.

**Humor flavor**:
- A: Developer is also a user, just with better screenshots.
- B: 400 Bad Request is not an error message. It's an emotional state.

---

#### Q8 (Human vs Machine)
**Scenario**: The AI agent gives a recommendation confidently.

**What do you check first?**

- **A (Human)**: Whether users can understand, trust, and override it.
- **B (Machine)**: What data, permission, and workflow triggered the recommendation.

**Humor flavor**:
- A: AI is confident. Users may still have trust issues.
- B: The more realistic AI sounds, the more you want to check where it learned that.

---

#### Q9 (Human vs Machine)
**Scenario**: A screen looks "almost fine," but something feels wrong.

**What do you check?**

- **A (Human)**: Hierarchy, spacing, wording, and visual priority.
- **B (Machine)**: Whether the screen matches process logic and data states.

**Humor flavor**:
- A: It is only 2px, but so is the beginning of chaos.
- B: The layout is fine. The underlying process is screaming.

---

#### Q10 (Human vs Machine)
**Scenario**: A developer asks why an endpoint behaves differently from the documentation.

**How do you frame the problem?**

- **A (Human)**: Treat it as an experience gap.
- **B (Machine)**: Treat it as a contract and governance issue.

**Humor flavor**:
- A: Documentation drift is where developer trust goes to die.
- B: The API did not lie. It simply developed a second personality.

---

#### Q11 (Human vs Machine)
**Scenario**: A proposal says, "Let the AI automatically handle this."

**What's your first concern?**

- **A (Human)**: Ask where users stay in control.
- **B (Machine)**: Ask what system boundary, permission, and audit trail are needed.

**Humor flavor**:
- A: AI can help. It does not need to become everyone's new manager.
- B: The agent can run, but not naked.

---

#### Q12 (Human vs Machine)
**Scenario**: The team wants to add a new automation feature.

**What do you validate first?**

- **A (Human)**: Whether users want this to be automated or just faster.
- **B (Machine)**: Whether the system can reliably detect the trigger condition.

**Humor flavor**:
- A: "Automate everything" assumes users want to be passengers.
- B: Automation without reliable triggers is just scheduled chaos.

---

### Dimension C: Explore vs Align (6 questions)

#### Q13 (Explore vs Align)
**Scenario**: The team has argued about one flow for 30 minutes.

**What do you do?**

- **A (Explore)**: Make a quick prototype so people can react to something real.
- **B (Align)**: Define decision criteria before the discussion becomes group therapy.

**Humor flavor**:
- A: Words fail. Prototypes speak.
- B: Without criteria, meetings are just opinion yoga.

---

#### Q14 (Explore vs Align)
**Scenario**: PM, UX, and Engineering each have a different understanding of the same feature.

**What's your next move?**

- **A (Explore)**: Run a quick alignment session around customer value and user flow.
- **B (Align)**: Define scope, owner, decision log, dependency, and feasibility risks.

**Humor flavor**:
- A: Early alignment is boring, but rework is dramatic.
- B: No decision log means everyone gets their own version of history.

---

#### Q15 (Explore vs Align)
**Scenario**: A vague requirement says "make it more intuitive."

**How do you respond?**

- **A (Explore)**: Test with users to see where they struggle.
- **B (Align)**: Ask stakeholders to define what "intuitive" means with examples.

**Humor flavor**:
- A: "Intuitive" is code for "I'll know it when I see it."
- B: One person's intuitive is another person's mystery meat navigation.

---

#### Q16 (Explore vs Align)
**Scenario**: The design looks good but has never been tested with real data.

**What's your priority?**

- **A (Explore)**: Test it with production-like data and edge cases.
- **B (Align)**: Ensure all stakeholders agree on what "ready for testing" means.

**Humor flavor**:
- A: Lorem ipsum is not user research.
- B: "Looks good" is not a launch checklist.

---

#### Q17 (Explore vs Align)
**Scenario**: A feature needs input from multiple teams but nobody owns the decision.

**What do you do first?**

- **A (Explore)**: Prototype a solution to clarify what needs to be decided.
- **B (Align)**: Identify decision owner, stakeholders, and approval criteria.

**Humor flavor**:
- A: Sometimes you need a villain (the prototype) to unite the heroes.
- B: Decisions without owners become eternal meetings.

---

#### Q18 (Explore vs Align)
**Scenario**: A user story is too vague to estimate.

**What's your approach?**

- **A (Explore)**: Sketch or prototype to understand the scope better.
- **B (Align)**: Break it into concrete acceptance criteria with the team.

**Humor flavor**:
- A: Can't estimate fog. Need to make it rain first.
- B: "As a user I want to be happy" is not a user story.

---

### Dimension D: Spark vs Stabilize (6 questions)

#### Q19 (Spark vs Stabilize)
**Scenario**: A customer asks, "Why can't Joule do this automatically?"

**What's your reaction?**

- **A (Spark)**: Explore what the AI-assisted workflow could look like.
- **B (Stabilize)**: Check current workflow pain points before adding AI.

**Humor flavor**:
- A: Every limitation is an AI opportunity waiting to happen.
- B: AI is great. But sometimes people just want a better button.

---

#### Q20 (Spark vs Stabilize)
**Scenario**: A feature has started implementation, but the user value is still vague.

**What do you suggest?**

- **A (Spark)**: Identify what can still be adjusted without destroying the sprint.
- **B (Stabilize)**: Pause and clarify the customer problem before building more.

**Humor flavor**:
- A: The sprint is already moving. Please do not stand in front of it without a plan.
- B: Building fast in the wrong direction is still fast.

---

#### Q21 (Spark vs Stabilize)
**Scenario**: Someone proposes a creative workaround to ship faster.

**What's your first thought?**

- **A (Spark)**: Let's try it and learn quickly.
- **B (Stabilize)**: Today's shortcut could be tomorrow's migration nightmare.

**Humor flavor**:
- A: Ship now, refactor later. (Narrator: They never refactored.)
- B: Every dirty shortcut wants to become legacy.

---

#### Q22 (Spark vs Stabilize)
**Scenario**: The roadmap looks great, but support tickets tell a different story.

**What's your focus?**

- **A (Spark)**: Bring support signals back into product discovery.
- **B (Stabilize)**: Read logs and incidents to understand the real behavior.

**Humor flavor**:
- A: Roadmap is optimistic. Customers are specific.
- B: Logs are the product diary nobody wanted to publish.

---

#### Q23 (Spark vs Stabilize)
**Scenario**: A team member suggests trying a new technology in the project.

**What do you consider?**

- **A (Spark)**: Whether it solves a real problem we have.
- **B (Stabilize)**: Whether it's proven, supported, and aligned with our architecture.

**Humor flavor**:
- A: "Let's try it" is how we learn. And sometimes regret.
- B: "Battle-tested" means someone else already fought the bugs.

---

#### Q24 (Spark vs Stabilize)
**Scenario**: A prototype looks great but wasn't built with Clean Core principles.

**What do you prioritize?**

- **A (Spark)**: Use it to validate the concept, then rebuild properly.
- **B (Stabilize)**: Rebuild it with Clean Core before showing stakeholders.

**Humor flavor**:
- A: This is just a prototype, said every future production incident.
- B: Prototypes have a magical ability to become permanent.

---

## 3. Scoring Logic

### Step 1: Accumulate Scores

Each user answer adds +1 to one pole of one dimension:

```typescript
interface DimensionScores {
  Signal: number;
  Solution: number;
  Human: number;
  Machine: number;
  Explore: number;
  Align: number;
  Spark: number;
  Stabilize: number;
}
```

After all 24 questions:
```typescript
// Example result
{
  Signal: 9,
  Solution: 7,    // Dimension A winner: Signal
  Human: 10,
  Machine: 6,     // Dimension B winner: Human
  Explore: 8,
  Align: 8,       // Dimension C: TIE (needs handling)
  Spark: 11,
  Stabilize: 5    // Dimension D winner: Spark
}
```

### Step 2: Determine Winners

```typescript
const dimensionA = scores.Signal > scores.Solution ? 'Signal' : 'Solution';
const dimensionB = scores.Human > scores.Machine ? 'Human' : 'Machine';
const dimensionC = scores.Explore > scores.Align ? 'Explore' : 'Align';
const dimensionD = scores.Spark > scores.Stabilize ? 'Spark' : 'Stabilize';
```

### Step 3: Handle Ties

**Option 1**: Use last answered question in that dimension as tie-breaker
**Option 2**: Show hybrid note (e.g., "You are VOC with FIORI symptoms")
**Option 3**: Default to specific pole based on design decision

### Step 4: Map to Impulse Key

The 4-letter internal pattern maps to one public key:

```typescript
const internalPattern = `${dimensionA}+${dimensionB}+${dimensionC}+${dimensionD}`;
// Example: "Signal+Human+Explore+Spark"

const impulseKey = getImpulseKey(internalPattern);
// Returns: "VOC"
```

---

## 4. Mapping Table (16 Results)

| Internal Pattern | Primary Traits | Impulse Key | Rationale |
|---|---|---|---|
| Signal + Human + Explore + Spark | Customer signals, empathy, discovery | **VOC** | Voice-of-Customer Detective |
| Solution + Human + Align + Stabilize | Consistency, usability, patterns | **FIORI** | Fiori Experience Guardian |
| Solution + Human + Explore + Stabilize | Design craft, detail, visual hierarchy | **PIXEL** | Pixel-Level Perfectionist |
| Signal + Human + Align + Stabilize | Inclusive design, accessibility | **A11Y** | Accessibility Conscience |
| Spark + Machine + Explore + Spark | AI opportunity, future workflow | **JOULE** | Joule Dream Weaver |
| Human + Machine + Align + Stabilize | Human control, AI fallback | **CTRL** | Human Control Keeper |
| Machine + Spark + Explore + Spark | Agentic workflow, system orchestration | **AGENT** | Agentic Workflow Prophet |
| Machine + Human + Align + Stabilize | AI trust, explainability | **SAFE** | Trustworthy AI Therapist |
| Machine + Solution + Align + Stabilize | Data contract, process logic | **OData** | Process Contract Cartographer |
| Solution + Explore + Spark + Explore | Prototype, experimentation, platform | **BTP** | Prototype Escape Artist |
| Solution + Align + Stabilize + Stabilize | Architecture, sustainability | **CORE** | Clean Core Monk |
| Machine + Human + Solution + Stabilize | Developer experience, API usability | **API** | Developer Experience Whisperer |
| Signal + Human + Explore + Stabilize | Quality, user pain, edge cases | **QAQ** | Quality Empath |
| Solution + Stabilize + Stabilize + Stabilize | Production reality, logs, monitoring | **LOGS** | Production Reality Reader |
| Align + Align + Align + Stabilize | HPOM, cross-functional collaboration | **TRIO** | HPOM Alignment Summoner |
| Signal + Human + Spark + Spark | Customer urgency, escalation response | **FIRE** | Customer Firefighter |

**Note**: This is a simplified mapping. The actual implementation may need:
- Weighted scoring (some questions matter more)
- Multi-trait detection (e.g., "If Q7 + Q8 both Human → lean toward UX keys")
- Flavor markers (specific question combos hint at specific keys)

---

## 5. Implementation Data Structure

### questions.ts

```typescript
export interface Question {
  id: string;
  dimension: 'SignalSolution' | 'HumanMachine' | 'ExploreAlign' | 'SparkStabilize';
  scenario: string;
  question: string;
  optionA: {
    text: string;
    score: 'Signal' | 'Human' | 'Explore' | 'Spark';
    humor?: string;
  };
  optionB: {
    text: string;
    score: 'Solution' | 'Machine' | 'Align' | 'Stabilize';
    humor?: string;
  };
}

export const questions: Question[] = [
  {
    id: 'Q1',
    dimension: 'SignalSolution',
    scenario: 'A customer says, "This part is not very convenient."',
    question: 'What do you do first?',
    optionA: {
      text: 'Ask follow-up questions to understand the real workflow pain.',
      score: 'Signal',
      humor: 'Tell me more. Then pain-point archaeology begins.'
    },
    optionB: {
      text: 'Check whether the current behavior matches the designed process.',
      score: 'Solution',
      humor: 'Let me check the process. Then you discover this is not a bug, but ancestral design.'
    }
  },
  // ... 23 more questions
];
```

### mappings.ts

```typescript
export interface ImpulseKeyMapping {
  pattern: string;
  key: string;
  traits: string[];
}

export const mappings: ImpulseKeyMapping[] = [
  {
    pattern: 'Signal+Human+Explore+Spark',
    key: 'VOC',
    traits: ['Customer signals', 'Empathy', 'Discovery', 'Research-driven']
  },
  {
    pattern: 'Solution+Human+Align+Stabilize',
    key: 'FIORI',
    traits: ['Consistency', 'Usability patterns', 'Experience quality']
  },
  // ... 14 more mappings
];

export function getImpulseKey(
  dimensionA: string,
  dimensionB: string,
  dimensionC: string,
  dimensionD: string
): string {
  const pattern = `${dimensionA}+${dimensionB}+${dimensionC}+${dimensionD}`;
  
  const match = mappings.find(m => m.pattern === pattern);
  
  if (match) {
    return match.key;
  }
  
  // Fallback: use heuristics or default to VOC
  return 'VOC';
}
```

### scoring.ts

```typescript
export interface Answer {
  questionId: string;
  selectedOption: 'A' | 'B';
  scoredPole: string; // 'Signal', 'Solution', 'Human', etc.
}

export interface DimensionScores {
  Signal: number;
  Solution: number;
  Human: number;
  Machine: number;
  Explore: number;
  Align: number;
  Spark: number;
  Stabilize: number;
}

export function calculateScores(answers: Answer[]): DimensionScores {
  const scores: DimensionScores = {
    Signal: 0,
    Solution: 0,
    Human: 0,
    Machine: 0,
    Explore: 0,
    Align: 0,
    Spark: 0,
    Stabilize: 0
  };
  
  answers.forEach(answer => {
    const pole = answer.scoredPole as keyof DimensionScores;
    scores[pole]++;
  });
  
  return scores;
}

export function determineWinners(scores: DimensionScores) {
  return {
    dimensionA: scores.Signal >= scores.Solution ? 'Signal' : 'Solution',
    dimensionB: scores.Human >= scores.Machine ? 'Human' : 'Machine',
    dimensionC: scores.Explore >= scores.Align ? 'Explore' : 'Align',
    dimensionD: scores.Spark >= scores.Stabilize ? 'Spark' : 'Stabilize'
  };
}
```

---

## 6. Testing & Validation Plan

### Phase 1: Logic Validation
- Ensure all 16 combinations are reachable
- Test edge cases (all same answer, alternating pattern)
- Verify tie-breaking works correctly

### Phase 2: Content Validation
- Internal playtest with 10-15 people
- Check perceived accuracy: "Does this feel right?"
- Identify questions that feel confusing or biased

### Phase 3: Distribution Check
- After 50+ responses, check result distribution
- Goal: No result should be < 2% or > 15% of total
- Adjust question wording or mapping if needed

### Sample Test Cases

```typescript
// Test Case 1: All Signal answers
const allSignal = Array(24).fill({ scoredPole: 'Signal' });
// Expected dimension winners: Signal, (varies), (varies), (varies)
// Should map to VOC or FIRE

// Test Case 2: Balanced answers
const balanced = [
  ...Array(3).fill({ scoredPole: 'Signal' }),
  ...Array(3).fill({ scoredPole: 'Solution' }),
  ...Array(3).fill({ scoredPole: 'Human' }),
  ...Array(3).fill({ scoredPole: 'Machine' }),
  // ... etc
];
// Should handle ties gracefully

// Test Case 3: FIORI profile
const fioriProfile = {
  dimensionA: 'Solution',
  dimensionB: 'Human',
  dimensionC: 'Align',
  dimensionD: 'Stabilize'
};
// Should map to FIORI
```

---

## 7. Question Balance Check

| Dimension | Pole A Questions | Pole B Questions | Balance |
|---|---|---|---|
| Signal/Solution | 6 (Q1-Q6) | 6 (Q1-Q6) | ✅ Even |
| Human/Machine | 6 (Q7-Q12) | 6 (Q7-Q12) | ✅ Even |
| Explore/Align | 6 (Q13-Q18) | 6 (Q13-Q18) | ✅ Even |
| Spark/Stabilize | 6 (Q19-Q24) | 6 (Q19-Q24) | ✅ Even |

**Total**: 24 questions, 6 per dimension, perfectly balanced.

---

## 8. Next Steps

1. ✅ Questions designed (24 total)
2. ✅ Mapping logic defined
3. ✅ Data structures specified
4. 🔜 Implement in TypeScript
5. 🔜 Build React question flow UI
6. 🔜 Internal playtest
7. 🔜 Refine based on feedback
8. 🔜 Create result card export feature

---

*Last updated: 2026-05-15*  
*Status: Ready for implementation*
