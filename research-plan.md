# IMPULSE KEYS: Complete Design & Development Roadmap

## Project Overview

**IMPULSE KEYS** (Impulse26 体验脉冲人格测试) is an internal SAP personality test game designed for the Impulse26 event. It's a playful but meaningful tool to increase awareness of UX work, customer-first thinking, Human-AI interaction, AI Agent/Joule, API experience, and HPOM collaboration within enterprise product teams.

### Purpose

This is a not-so-serious personality test about the very serious ways we shape customer experience. It translates UX awareness, customer-first mindset, AI agent thinking, API experience, and HPOM collaboration into 16 shareable workplace personality keys.

### Target Audience

- SAP internal teams (PM, UX, Engineering, QA)
- Enterprise product professionals
- Impulse26 event participants
- Teams wanting to improve cross-functional collaboration awareness

### Design Philosophy

This test balances:
- **"Scientific feel"** - Structured questions based on real work scenarios, detailed results
- **Entertainment value** - Humor, shareable results, workplace memes
- **Educational purpose** - Each result promotes specific UX/AI/HPOM awareness areas
- **Cultural fit** - Chinese internet-friendly, SAP-flavored, safe for internal sharing

---

## Part 1: Research Foundation

### Summary of Personality Test Design Patterns

Understanding successful personality test frameworks informs our IMPULSE KEYS design:

### 1. Viral Test Success Factors (MBTI, 16 Personalities, SBTI)

**What Makes Tests Shareable:**
- Cartoon avatars/illustrations for each type
- Clean grid layout showing all personality types
- Distinct memorable codes (MBTI's 4 letters, SBTI's fun keys)
- Visual personality "cards" with character + description
- Quick completion time (5-10 minutes / 20-30 questions)
- Progress indicator during test
- Immediate, detailed results
- No registration required
- Easy social sharing (images, links)

**MBTI Framework (Applied to IMPULSE KEYS):**
- **MBTI**: 4 dichotomies creating 16 types (E/I, S/N, T/F, J/P)
  - Original MBTI: ~290 items
  - Measures preferences, not abilities
  - Uses cutoff scoring (binary classification)
  
- **16 Personalities**: Enhanced 5-axis model
  - 5 dimensions: Energy (E/I), Mind (N/S), Nature (T/F), Tactics (J/P), Identity (A/T)
  - Creates 16 base types + 2 variations (32 total with -A/-T suffix)
  - Takes ~10 minutes to complete
  - 91.2% user-reported accuracy
  - **IMPULSE KEYS adopts**: 4 dimensions, 16 keys, binary scoring, ~20-24 questions, 2-4 minute completion

**Question Design Best Practices:**
- Likert scale responses (typically 5-7 points: Strongly Disagree → Strongly Agree)
  - **IMPULSE KEYS uses**: Binary choice (A/B) for speed and clarity
- Statement-based format: "I am always prepared" or "I feel comfortable around people"
  - **IMPULSE KEYS uses**: Scenario-based workplace questions
- Mix of positive and reverse-scored items
- Questions map to specific dimensions (not always transparent to test-taker)
  - **IMPULSE KEYS**: Transparent scoring for internal review, opaque to users

**Grouping & Role Strategies (Adapted for Enterprise Context):**
- MBTI/16P use role groupings (Analysts, Diplomats, Sentinels, Explorers)
- **IMPULSE KEYS groups by awareness theme**:
  - Customer First: VOC, FIRE, QAQ, LOGS
  - UX Craft & Inclusive Design: FIORI, PIXEL, A11Y
  - AI Agent & Human-AI Interaction: JOULE, AGENT, CTRL, SAFE
  - API & Platform Experience: API, OData, BTP
  - HPOM & Product Operating Model: TRIO, CORE
  - Product Reality & Quality: QAQ, LOGS, FIRE, CORE

### 2. Other Popular Assessment Models

**Big Five (OCEAN):**
- 5 continuous dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
- Range from abbreviated (10-item TIPI) to extended (NEO PI-R with 6 facets per dimension)
- Likert scale responses
- Scientifically validated but less "fun" for viral sharing

**DISC Assessment:**
- 4 types: Dominance, Inducement, Submission, Compliance
- Original: Adjective checklist
- Modern: Forced-choice comparisons
- Workplace-focused (team building, communication)
- Note: Criticized as pseudoscientific

### 2. Other Assessment Models (Reference Only)

**Big Five (OCEAN):**
- 5 continuous dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
- Scientifically validated but less engaging for viral sharing
- **Takeaway**: Scientific validity vs. entertainment - IMPULSE KEYS prioritizes engagement

**DISC Assessment:**
- 4 types: Dominance, Inducement, Submission, Compliance
- Workplace-focused (team building, communication)
- **Takeaway**: Workplace scenarios resonate with professional audiences

---

## Part 2: IMPULSE KEYS Core Design

### Game Identity

**Name**: IMPULSE KEYS  
**Chinese Name**: Impulse26 体验脉冲人格测试  
**Result Label**: Your Impulse Key / 你的 Impulse Key  
**Positioning**: "A not-so-serious test about the very serious ways we shape customer experience."

**Disclaimer**:
```
For fun only.
Not for performance review, promotion, ticket assignment, blame allocation,
or identifying who caused the last alignment meeting.

仅供娱乐。
不能用于绩效、晋升、排期、分锅、甩锅，
也不能用于追查上一次 alignment meeting 到底是谁开的头。
```

### Tone & Humor Guidelines

The test should be:
- ✅ Light, smart, slightly dark
- ✅ Workplace-realistic
- ✅ Chinese internet-friendly
- ✅ SAP-flavored but not official-looking
- ✅ Safe for internal sharing
- ✅ Funny without attacking any role
- ❌ Never personal attacks
- ❌ Never role shaming
- ❌ Never confidential product references
- ❌ Never HR assessment tone

### The 4 Internal Dimensions

IMPULSE KEYS uses 4 binary dimensions to create 16 result types. These dimensions are hidden from users but drive the scoring logic:

#### Dimension A: Signal vs Solution

| Pole | Meaning | Promotes Awareness Of |
|------|---------|----------------------|
| **Signal** | Focuses first on user signals, research insights, experience problems, customer pain | User research, VOC, customer-first decision making |
| **Solution** | Focuses first on system solutions, technical structure, business logic, feasibility | Technical architecture, system thinking, process design |

**Design Note**: This dimension avoids "designers vs engineers" framing while promoting user research awareness.

#### Dimension B: Human vs Machine

| Pole | Meaning | Promotes Awareness Of |
|------|---------|----------------------|
| **Human** | Focuses on user understanding, trust, control, emotions, adoption | Human-AI interaction, usability, user control |
| **Machine** | Focuses on data, API, AI agent, process, system rules, automation logic | API experience, data contracts, agentic workflows |

**Design Note**: Connects naturally to Human-AI interaction and developer experience themes.

#### Dimension C: Explore vs Align

| Pole | Meaning | Promotes Awareness Of |
|------|---------|----------------------|
| **Explore** | Prefers research, prototypes, experiments, quick discovery, divergent thinking | Prototyping, experimentation, early validation |
| **Align** | Prefers HPOM alignment, decision records, scope, owner, feasibility, structured collaboration | HPOM collaboration, decision ownership, cross-functional work |

**Design Note**: Supports HPOM (PM-UX-Engineering) alignment awareness.

#### Dimension D: Spark vs Stabilize

| Pole | Meaning | Promotes Awareness Of |
|------|---------|----------------------|
| **Spark** | Pushes ideas forward, creates demos, triggers change, tests fast | Innovation, rapid prototyping, pushing boundaries |
| **Stabilize** | Protects quality, governance, accessibility, Clean Core, production reliability | Quality, sustainability, governance, long-term thinking |

**Design Note**: Embodies the "Impulse" concept - some people spark change, others stabilize it.

---

## Part 3: The 16 Impulse Keys (Result Types)

### Result Key Grid

```
VOC     FIORI   PIXEL   A11Y
JOULE   CTRL    AGENT   SAFE
OData   BTP     CORE    API
QAQ     LOGS    TRIO    FIRE
```

These keys are:
- Short (3-5 letters)
- SAP/UX/IT-flavored (Fiori, Joule, OData, BTP, API, A11Y)
- Memorable and shareable
- More meaningful than random 4-letter codes
- Designed for keycap visual treatment

### Result Type Summary Table

| Key | English Name | Chinese Name | Core Traits | Awareness Focus |
|-----|--------------|--------------|-------------|-----------------|
| **VOC** | Voice-of-Customer Detective | 客户之声侦探 | Signal + Human + Explore | User Research, VOC |
| **FIORI** | Fiori Experience Guardian | Fiori 体验守门员 | Human + Stabilize | UX Consistency, Usability |
| **PIXEL** | Pixel-Level Perfectionist | 像素级强迫症患者 | Human + Design Craft | Visual Hierarchy, UX Design |
| **A11Y** | Accessibility Conscience | 无障碍良心发现者 | Human + Stabilize | Accessibility, Inclusive Design |
| **JOULE** | Joule Dream Weaver | Joule 造梦师 | Spark + Future-thinking | AI Opportunity, Joule |
| **CTRL** | Human Control Keeper | 人类控制权守门员 | Human + Stabilize + AI | Human-AI Interaction, Control |
| **AGENT** | Agentic Workflow Prophet | 智能体流程预言家 | Machine + System-thinking | AI Agent, Cross-system UX |
| **SAFE** | Trustworthy AI Therapist | 可信 AI 心理咨询师 | Human + AI Trust | Explainability, AI Trust |
| **OData** | Process Contract Cartographer | 流程契约地图师 | Machine + Process | Data Contracts, Process Logic |
| **BTP** | Prototype Escape Artist | 原型逃生大师 | Explore + Spark | Prototyping, Experimentation |
| **CORE** | Clean Core Monk | Clean Core 修行僧 | Stabilize + Architecture | Clean Core, Sustainability |
| **API** | Developer Experience Whisperer | API 体验低语者 | Machine + Human (DX) | API Experience, DX |
| **QAQ** | Quality Empath | 用户痛感 QA | Human + Quality | Usability, Quality, Edge Cases |
| **LOGS** | Production Reality Reader | 生产现实解读师 | Stabilize + Reality-check | Production Quality, Incidents |
| **TRIO** | HPOM Alignment Summoner | HPOM 对齐召唤师 | Align + Collaboration | HPOM, Cross-functional |
| **FIRE** | Customer Firefighter | 客户现场救火队长 | Signal + Urgency | Customer-First, Escalations |

### Detailed Result Card Structure

Each result type includes:

```markdown
## [KEY] - [English Type Name]
**Chinese Name**: [中文结果名]
**Motto**: "[Memorable quote]"

### Impulse26 Signal
[Educational message about UX/AI/HPOM awareness this result promotes]

### Your Impulse
[What this person contributes to product experience]

### Dark Side
[Humorous risk / workplace reality - black humor]

### Workplace Bullet Comments
- [Shareable punchline 1]
- [Shareable punchline 2]
- [Shareable punchline 3]

### Chinese Punchline
[一句适合截图分享的话]

### Awareness Themes
- [Theme 1]
- [Theme 2]
- [Theme 3]

### Visual Hint
[Props/symbols for keycap illustration]
```

### Example: VOC (Voice-of-Customer Detective)

**Key**: VOC  
**English Name**: Voice-of-Customer Detective  
**Chinese Name**: 客户之声侦探  
**Motto**: "Users rarely give answers. They leave evidence."

**Impulse26 Signal**:  
User research is not just collecting quotes. It is turning messy signals into product decisions.

**Your Impulse**:  
You can hear roles, scenarios, tasks, pain points, and opportunity areas from one vague customer sentence.

**Dark Side**:  
After you ask "why" three times, the meeting may never return to its original agenda.

**Workplace Bullet Comments**:
- "Tell me more." Then the pain-point archaeology begins.
- One customer quote is not insight yet. It is evidence.
- You do not collect feedback. You investigate scenes.

**Chinese Punchline**:  
客户说"不太方便"，你已经开始做案发现场还原了。

**Awareness Themes**: User Research, Voice of Customer, Customer-First

**Visual Hint**: Magnifier, sticky notes, customer quote fragments

---

## Part 4: Question Design

### Question Design Principles

Questions should be:
- ✅ Scenario-based (not abstract personality statements)
- ✅ Workplace-realistic (recognizable situations)
- ✅ Short enough for mobile (<2 lines)
- ✅ Funny but still meaningful
- ✅ Not too formal (avoid HR-speak)
- ✅ Not obviously tied to one "correct" answer
- ✅ Balanced across UX, AI, API, HPOM, and product quality themes

**Avoid Direct Questions:**
```
❌ Are you customer-first?
❌ Are you a UX person?
❌ Do you care about AI governance?
```

**Instead, Use Scenarios:**
```
✅ A customer says, "This part is not very convenient." What do you do first?
✅ The AI agent gives a recommendation confidently. Your first thought?
✅ PM, UX, and Engineering each have a different understanding of the same feature...
```

### Question Format

**Binary Choice (A/B)**:
- Faster completion than Likert scale (target: 2-4 minutes)
- Forces decision (no neutral option)
- Each option scores one pole of one dimension
- Can include "dark humor" flavor text

**Example Question Structure**:
```json
{
  "id": "Q1",
  "dimension": "SignalSolution",
  "scenario": "A customer says, 'This part is not very convenient.'",
  "question": "What do you do first?",
  "optionA": {
    "text": "Ask follow-up questions to understand the real workflow pain.",
    "score": "Signal",
    "darkHumor": "Tell me more. Then pain-point archaeology begins."
  },
  "optionB": {
    "text": "Check whether the current behavior matches the designed process.",
    "score": "Solution",
    "darkHumor": "Let me check the process. Then discover this is ancestral design."
  }
}
```

### Question Bank Structure (20-24 Questions Total)

**Distribution by Dimension** (5-6 questions each):
- Signal/Solution: 6 questions
- Human/Machine: 6 questions
- Explore/Align: 6 questions
- Spark/Stabilize: 6 questions

**Distribution by Theme** (for balance and variety):
- User Research / VOC: 3-4 questions
- UX Design Techniques: 3-4 questions
- Human-AI Interaction: 3-4 questions
- API / Developer Experience: 3-4 questions
- HPOM Collaboration: 3-4 questions
- Production / Quality: 3-4 questions

### Sample Questions

#### User Research / VOC Theme

**Q1: Signal vs Solution**
```
Scenario: A customer says, "This part is not very convenient."
What do you do first?

A) Ask follow-up questions to understand the real workflow pain. [Signal]
B) Check whether the current behavior matches the designed process. [Solution]
```

**Q2: Explore vs Align**
```
Scenario: A workshop produces ten customer quotes and zero decisions.

A) Cluster the quotes into pain points, roles, and scenarios. [Explore]
B) Map them to product scope, owners, and feasibility. [Align]
```

#### UX Design Techniques Theme

**Q3: Explore vs Align**
```
Scenario: The team has argued about one flow for 30 minutes.

A) Make a quick prototype so people can react to something real. [Explore]
B) Define decision criteria before the discussion becomes group therapy. [Align]
```

**Q4: Human vs Machine**
```
Scenario: A screen looks "almost fine," but something feels wrong.

A) Check hierarchy, spacing, wording, and visual priority. [Human]
B) Check whether the screen matches process logic and data states. [Machine]

Dark humor:
A) It is only 2px, but so is the beginning of chaos.
B) The layout is fine. The underlying process is screaming.
```

#### Human-AI Interaction Theme

**Q5: Human vs Machine**
```
Scenario: The AI agent gives a recommendation confidently.

A) Ask whether users can understand, trust, and override it. [Human]
B) Ask what data, permission, and workflow triggered the recommendation. [Machine]
```

**Q6: Spark vs Stabilize**
```
Scenario: A proposal says, "Let the AI automatically handle this."

A) Ask where users stay in control. [Stabilize]
B) Ask what system boundary, permission, and audit trail are needed. [Stabilize/Machine]

Note: Adjust scoring based on final dimension mapping
```

#### API / Developer Experience Theme

**Q7: Human vs Machine**
```
Scenario: The API technically works, but the error message is unclear.

A) Improve the message because developers are also users. [Human]
B) Check the contract, status code, and documentation consistency. [Machine]

Dark humor:
A) Developer is also a user, just with better screenshots.
B) 400 Bad Request is not an error message. It is an emotional state.
```

**Q8: Signal vs Solution**
```
Scenario: A developer asks why an endpoint behaves differently from the documentation.

A) Treat it as an experience gap. [Signal]
B) Treat it as a contract and governance issue. [Solution]
```

#### HPOM Collaboration Theme

**Q9: Explore vs Align**
```
Scenario: PM, UX, and Engineering each have a different understanding of the same feature.

A) Run a quick alignment session around customer value and user flow. [Align]
B) Define scope, owner, decision log, dependency, and feasibility risks. [Align]

Note: Both lean Align - may need to adjust for balance
```

**Q10: Spark vs Stabilize**
```
Scenario: A feature has started implementation, but the user value is still vague.

A) Pause and clarify the customer problem before building more. [Stabilize]
B) Identify what can still be adjusted without destroying the sprint. [Spark]
```

#### Production / Quality Theme

**Q11: Signal vs Solution**
```
Scenario: A small edge case appears before release.

A) Ask whether this edge case creates real user pain. [Signal]
B) Check whether it could become a production incident. [Solution]
```

**Q12: Spark vs Stabilize**
```
Scenario: The roadmap looks great, but support tickets tell a different story.

A) Bring support signals back into product discovery. [Signal/Spark]
B) Read logs and incidents to understand the real behavior. [Stabilize]
```

---

## Part 5: Scoring & Mapping Logic

### Scoring Model

**Step 1: Accumulate Dimension Scores**
- Each question gives +1 to one pole of one dimension
- After all questions, calculate which pole wins in each dimension

**Example**:
```
Signal: 9 points | Solution: 7 points  → Result: Signal
Human: 10 points | Machine: 6 points  → Result: Human
Explore: 8 points | Align: 8 points   → TIE (use tie-breaker)
Spark: 11 points | Stabilize: 5 points → Result: Spark
```

**Step 2: Handle Ties**
- Option A: Use a designated tie-breaker question for each dimension
- Option B: Choose the pole from the most recent question in that dimension
- Option C: Show a "hybrid note" (e.g., "You are API with CTRL symptoms")

**Step 3: Map to Public Impulse Key**

The internal 4-letter pattern (e.g., Signal+Human+Explore+Spark) maps to one of 16 public keys.

### Mapping Logic (Proposed)

| Internal Pattern Traits | Public Key | Rationale |
|-------------------------|------------|-----------|
| Signal + Human + Explore | **VOC** | Customer detective, research-driven |
| Solution + Human + Stabilize | **FIORI** | Experience consistency guardian |
| Human + Design Craft + Stabilize | **PIXEL** | Detail-oriented UX craft |
| Human + Inclusive + Stabilize | **A11Y** | Accessibility conscience |
| Spark + AI Opportunity | **JOULE** | AI-first future thinker |
| Human + AI + Stabilize | **CTRL** | Human control keeper |
| Machine + System + Spark | **AGENT** | Agentic workflow thinker |
| Human + AI Trust + Stabilize | **SAFE** | Trustworthy AI guardian |
| Machine + Process + Solution | **OData** | Data/process contract expert |
| Explore + Spark + Platform | **BTP** | Prototype experimenter |
| Stabilize + Architecture | **CORE** | Clean Core sustainability monk |
| Machine + Human (DX) | **API** | Developer experience advocate |
| Human + Quality + Signal | **QAQ** | Quality empath |
| Stabilize + Reality | **LOGS** | Production reality checker |
| Align + Collaboration | **TRIO** | HPOM alignment champion |
| Signal + Urgency + Human | **FIRE** | Customer firefighter |

**Note**: This mapping will need refinement after playtesting. Some keys may require additional heuristics beyond the 4 dimensions (e.g., specific question responses as "flavor markers").

---

## Part 6: Visual Design

### Design Direction: Keyboard Keycap Concept

Since the game is called **IMPULSE KEYS**, each result is presented as a keyboard keycap card.

**Keycap Card Visual Structure**:
```
┌──────────────────────────┐
│           API             │  ← Key name (large, prominent)
│                           │
│ Developer Experience      │  ← English type name
│ Whisperer                 │
│                           │
│ API 体验低语者             │  ← Chinese name
│                           │
│ "Developer 也是 user，     │  ← Punchline quote
│  只是他们更会截图骂人。"   │
└──────────────────────────┘
```

### Style Guidelines

**Visual Keywords**:
- Modern, playful, slightly dark
- Office meme aesthetic
- Keyboard / terminal / dashboard inspired
- Not overly corporate
- Not HR-like
- SAP/enterprise product flavored
- Chinese internet culture-friendly

**Color Palette Suggestions**:
- Use tech/gaming color schemes
- Consider grouping by theme:
  - Customer First (warm tones: orange, red)
  - UX Craft (cool tones: blue, purple)
  - AI/Agent (bright: cyan, green)
  - API/Platform (neutral: gray, teal)
  - HPOM/Quality (earth tones: brown, green)

### Visual Props by Key

| Key | Visual Props |
|-----|--------------|
| VOC | Magnifier, sticky notes, customer quote fragments |
| FIORI | UI panel, ruler, alignment guides |
| PIXEL | Zoomed UI grid, 2px warning sign |
| A11Y | Contrast checker, keyboard navigation path |
| JOULE | Small AI assistant, glowing workflow bubbles |
| CTRL | Control key symbol, brake pedal, shield |
| AGENT | Cross-system workflow nodes, robot courier |
| SAFE | AI confidence meter, therapy couch, trust shield |
| OData | Data object, process map, tangled arrows |
| BTP | Prototype window, cable, coffee, "demo works" label |
| CORE | Clean cube, monk-like calm, no-shortcut sign |
| API | Endpoint map, error message bubble, developer console |
| QAQ | Bug net, crying face (QAQ), edge-case trap |
| LOGS | Terminal logs, magnifier, incident timeline |
| TRIO | PM/UX/Engineering triangle, sync calendar |
| FIRE | Headset, fire extinguisher, urgent escalation icon |

### Result Page Layout

**Desktop/Mobile-First Structure**:

1. **Hero Section**:
   - Large keycap illustration
   - "Your Impulse Key is: [KEY]"
   - Type name (English + Chinese)

2. **Core Result**:
   - Motto (quote)
   - "Impulse26 Signal" (educational message)
   - "Your Impulse" (strength)
   - "Dark Side" (humorous risk)

3. **Shareables**:
   - Workplace bullet comments (list)
   - Chinese punchline (prominent)

4. **Explore More**:
   - Grid of all 16 keys
   - "Find out what your teammates are" CTA

5. **Share Actions**:
   - Download result card as image
   - Copy link
   - Share to Teams/WeChat

### Loading Screen

Use rotating humorous loading messages:

**English**:
```
Analyzing your Jira survival pattern...
Checking your relationship with Confluence...
Asking Joule, then asking a human again...
Calculating your Clean Core karma...
Reading the logs the roadmap forgot...
Locating the owner of this action item...
Checking whether the prototype has already become production...
Testing if your AI agent is wearing a seatbelt...
```

**Chinese**:
```
正在分析你的 Jira 生存模式……
正在检测你和 Confluence 的关系……
正在先问 Joule，再问人类确认……
正在读取你的 Clean Core 功德值……
正在读取 roadmap 忘记的日志……
正在寻找这个 action item 的 owner……
正在检查这个 prototype 是否已经偷偷变成 production……
正在确认你的 AI agent 有没有系安全带……
```

---

## Part 7: Technical Implementation

### Recommended Technology Stack

**For Internal MVP**:
- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context / useState (simple state)
- **Image Export**: html-to-image library
- **Routing**: React Router (if multi-page)
- **Data**: Local JSON files (no backend needed for MVP)
- **Deployment**: Vercel / Netlify / SAP internal hosting

**Alternative for Simplicity**:
- Next.js (if SEO or server-side rendering is desired)
- Plain HTML/CSS/JS (if extremely lightweight MVP needed)

### Project File Structure

```
impulse-keys/
├── src/
│   ├── data/
│   │   ├── questions.ts          # Question bank with scoring
│   │   ├── results.ts             # 16 result type definitions
│   │   ├── mappings.ts            # Dimension → Key mapping logic
│   │   └── loadingMessages.ts    # Fun loading screen texts
│   ├── components/
│   │   ├── LandingPage.tsx       # Welcome + start button
│   │   ├── QuestionCard.tsx      # Single question display
│   │   ├── ProgressBar.tsx       # Visual progress indicator
│   │   ├── LoadingScreen.tsx     # Animated loading with jokes
│   │   ├── ResultCard.tsx        # Final result display
│   │   ├── ResultKeycap.tsx      # Keycap visual component
│   │   ├── ShareActions.tsx      # Share/download buttons
│   │   ├── ResultGallery.tsx     # Grid of all 16 keys
│   │   └── Disclaimer.tsx        # "For fun only" notice
│   ├── utils/
│   │   ├── scoring.ts            # Calculate dimensions from answers
│   │   ├── mapping.ts            # Map dimensions to public key
│   │   └── exportImage.ts        # Generate shareable image
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   ├── App.tsx
│   └── main.tsx
├── public/
│   ├── assets/
│   │   ├── keycaps/              # 16 keycap illustrations
│   │   │   ├── voc.svg
│   │   │   ├── fiori.svg
│   │   │   └── ... (14 more)
│   │   └── logos/                # Impulse26 branding
│   └── favicon.ico
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

### Key Data Models

**Question Interface**:
```typescript
export type Dimension =
  | "SignalSolution"
  | "HumanMachine"
  | "ExploreAlign"
  | "SparkStabilize";

export type ScoreSide =
  | "Signal" | "Solution"
  | "Human" | "Machine"
  | "Explore" | "Align"
  | "Spark" | "Stabilize";

export interface QuestionOption {
  id: "A" | "B";
  text: string;
  score: ScoreSide;
  darkHumorText?: string;
}

export interface Question {
  id: string;
  dimension: Dimension;
  scenario?: string;         // Optional context sentence
  question: string;          // The actual question
  options: [QuestionOption, QuestionOption];
  tieBreaker?: boolean;      // Mark tie-breaker questions
}
```

**Result Type Interface**:
```typescript
export interface ImpulseResult {
  key: string;                        // e.g., "VOC", "API"
  englishName: string;                // e.g., "Voice-of-Customer Detective"
  chineseName: string;                // e.g., "客户之声侦探"
  motto: string;                      // Quote
  impulse26Signal: string;            // Educational message
  yourImpulse: string;                // Strength description
  darkSide: string;                   // Humorous risk
  workplaceBulletComments: string[];  // Shareable punchlines
  chinesePunchline: string;           // Main Chinese quote
  awarenessThemes: string[];          // UX/AI/HPOM topics
  visualHint: string;                 // For illustration design
  keycapImagePath: string;            // Path to SVG/PNG
}
```

**Scoring State Interface**:
```typescript
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

export interface TestResult {
  scores: DimensionScores;
  finalDimensions: {
    signalSolution: "Signal" | "Solution";
    humanMachine: "Human" | "Machine";
    exploreAlign: "Explore" | "Align";
    sparkStabilize: "Spark" | "Stabilize";
  };
  impulseKey: string;           // e.g., "VOC"
  resultDetails: ImpulseResult;
}
```

### User Flow

```
1. Landing Page
   ↓ (Click "Start Test")
2. Question 1/24
   ↓ (Select A or B)
3. Question 2/24
   ↓ (Progress bar updates)
   ...
24. Question 24/24
   ↓ (Submit final answer)
25. Loading Screen (2-3 seconds with rotating jokes)
   ↓ (Calculate score)
26. Result Page
   - Display keycap card
   - Show full description
   - Share buttons
   - Explore all 16 keys
```

### Shareable Image Generation

Use `html-to-image` to convert the result card DOM to PNG/JPEG:

```typescript
import { toPng, toJpeg } from 'html-to-image';

export async function exportResultCard(elementId: string): Promise<string> {
  const node = document.getElementById(elementId);
  if (!node) throw new Error('Element not found');
  
  const dataUrl = await toPng(node, { 
    backgroundColor: '#ffffff',
    pixelRatio: 2  // Higher quality for sharing
  });
  
  return dataUrl;
}
```

---

## Part 8: Event Usage & Facilitation

### Icebreaker Flow for Impulse26 Event

1. **Pre-Event**:
   - Share QR code / link in event invitation
   - Encourage people to take test before event (2-4 minutes)

2. **During Event**:
   - Show aggregate results: "Our team has 5 VOCs, 3 TRIOs, 2 APIs..."
   - Group discussion prompts (see below)

3. **Post-Event**:
   - Share result gallery in Teams/WeChat
   - Use as conversation starter in workshops

### Facilitation Discussion Prompts

**English**:
```
Which Impulse Keys are strong in our team?
Which keys are missing?
Where do we over-index?
Where do we need more balance?

Example:
- "We have lots of SPARKs (JOULE, BTP) but few STABILIZERs (CORE, LOGS)"
- "Strong on AI vision, weaker on production reality"
```

**Chinese**:
```
我们团队现在最多的是哪些 Key？
缺少哪些 Key？
我们是不是太会救火，但不够早期调研？
是不是很会做 demo，但不够关注 trust 和 fallback？
```

### Team Balance Analysis

| If Team Has Many... | But Few... | Consider... |
|---------------------|------------|-------------|
| JOULE, AGENT, BTP (Sparks) | CTRL, SAFE, CORE (Stabilizers) | Adding trust/governance checkpoints |
| VOC, FIRE (Customer signals) | TRIO, LOGS (Alignment) | Structured decision-making |
| PIXEL, FIORI (UX craft) | API, OData (DX/system) | Developer experience focus |
| TRIO (Alignment) | VOC, QAQ (Customer signal) | More user research upfront |

---

## Part 9: Development Roadmap

### Phase 1: MVP Scope (Week 1-2)

**Must-Have**:
- ✅ Landing page with disclaimer
- ✅ 20-24 questions (binary A/B format)
- ✅ Progress indicator
- ✅ Loading screen with jokes
- ✅ 16 result type definitions (text content)
- ✅ Result calculation logic
- ✅ Result page with keycap card
- ✅ Mobile-responsive design
- ✅ Bilingual support (English primary, Chinese results)
- ✅ Basic shareable text copy

**Validation Steps**:
1. Content review: All 16 result descriptions finalized
2. Question balance: Each dimension has 5-6 questions
3. Internal playtest: 10-15 people test and verify results feel accurate
4. Humor check: Ensure tone is safe for internal sharing

### Phase 2: Visual Polish (Week 3)

**Nice-to-Have**:
- ✅ Keycap illustrations (SVG/PNG for all 16 keys)
- ✅ Export result card as PNG
- ✅ Result gallery (grid of all 16 keys)
- ✅ Smooth transitions/animations
- ✅ Loading screen animations
- ✅ Dark mode support (optional)

**Design Tasks**:
1. Commission or create 16 keycap illustrations
2. Design result card template for image export
3. Test image export quality on mobile/desktop

### Phase 3: Sharing & Analytics (Week 4)

**Advanced Features**:
- ✅ QR code generation for result sharing
- ✅ Team distribution visualization
- ✅ "Find your missing team key" feature
- ✅ Anonymous usage analytics (if permitted)
- ✅ Easter eggs (hidden loading messages, special results)

**Deployment**:
1. Deploy to internal hosting (Vercel/SAP infrastructure)
2. Performance testing (mobile load times)
3. Accessibility audit (keyboard navigation, screen readers)
4. Final content review

### Phase 4: Event Launch (Week 5)

**Pre-Launch**:
- Internal soft launch to Impulse26 core team
- Gather feedback, fix bugs
- Prepare facilitation guide for event hosts

**Launch Day**:
- Announce in event kickoff
- Monitor completion rates and feedback
- Live support for technical issues

**Post-Event**:
- Collect result distribution data (anonymized)
- Gather qualitative feedback
- Plan v2 iterations based on learnings

---

## Part 10: Success Metrics & Validation

### Quantitative Metrics

**Completion Rate**:
- Target: >70% of starters complete all questions
- Measure: Track question abandonment points

**Engagement Time**:
- Target: 2-4 minutes average completion time
- If >5 minutes: Questions may be too complex
- If <2 minutes: Users might be clicking randomly

**Share Rate**:
- Target: >30% of completers share/download result
- Indicates virality and value perception

### Qualitative Validation

**Perceived Accuracy**:
- Survey: "Does this result feel accurate?" (Yes/Somewhat/No)
- Target: >80% "Yes" or "Somewhat"
- Method: Post-result optional feedback form

**Educational Impact**:
- Survey: "Did this test make you think about UX/AI/HPOM differently?"
- Collect anecdotes for Impulse26 event retrospective

**Tone Check**:
- Survey: "Was the humor appropriate for workplace sharing?"
- Watch for any results that feel attacking/offensive

### Result Distribution Analysis

**Balance Check**:
- Are all 16 keys represented? (Or are some never appearing?)
- Are results evenly distributed or heavily skewed?
- If skewed: Review question balance or scoring logic

**Example Red Flags**:
- If 80% of people get FIRE: Questions too focused on urgency
- If no one gets PIXEL: Missing design craft questions
- If everyone is Human (vs Machine): Dimension needs rebalancing

---

## Part 11: Content Checklist

### Before Development Starts

**✅ Finalize All 16 Result Types**:
- [ ] VOC - Complete
- [ ] FIORI - Complete
- [ ] PIXEL - Complete
- [ ] A11Y - Complete
- [ ] JOULE - Complete
- [ ] CTRL - Complete
- [ ] AGENT - Complete
- [ ] SAFE - Complete
- [ ] OData - Complete
- [ ] BTP - Complete
- [ ] CORE - Complete
- [ ] API - Complete
- [ ] QAQ - Complete
- [ ] LOGS - Complete
- [ ] TRIO - Complete
- [ ] FIRE - Complete

**✅ Write 20-24 Questions**:
- [ ] 6 questions for Signal/Solution dimension
- [ ] 6 questions for Human/Machine dimension
- [ ] 6 questions for Explore/Align dimension
- [ ] 6 questions for Spark/Stabilize dimension
- [ ] Questions cover all awareness themes (UX, AI, API, HPOM, Quality)
- [ ] Dark humor variants written (optional)
- [ ] Tie-breaker questions identified

**✅ Define Mapping Logic**:
- [ ] Dimension combinations → Impulse Key lookup table
- [ ] Tie-breaking rules documented
- [ ] Edge cases handled (e.g., perfectly balanced scores)

**✅ Create Visual Assets**:
- [ ] 16 keycap illustrations (SVG preferred)
- [ ] Impulse26 branding/logo
- [ ] Loading screen animations/graphics
- [ ] Favicon

**✅ Write Copy**:
- [ ] Landing page headline + description
- [ ] Disclaimer text (English + Chinese)
- [ ] 8-10 loading screen messages (English + Chinese)
- [ ] Share text templates for each result
- [ ] Post-result CTA copy

---

## Part 12: Risk Mitigation

### Potential Issues & Solutions

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Results feel inaccurate** | Low engagement, no sharing | Extensive playtesting, allow retakes, frame as "for fun" |
| **Humor is offensive** | HR concerns, negative feedback | Multiple reviews, tone guidelines, avoid role-shaming |
| **Questions too long** | High abandonment rate | Keep questions <2 lines, use simple language |
| **Technical issues (mobile)** | Poor user experience | Mobile-first design, performance testing |
| **Scoring feels random** | Low perceived accuracy | Clear dimension definitions, balanced questions |
| **One result dominates** | Boring distribution | Review question balance, adjust scoring weights |
| **Low completion rate** | Event fails to engage | Shorten to 16-20 questions, add progress incentives |
| **Results not shareable** | Low virality | Ensure image export works, catchy punchlines |

### Legal & Compliance

- ✅ Disclaimer clearly states "for fun only, not for performance review"
- ✅ No personally identifiable data collection (anonymous by default)
- ✅ No confidential product/roadmap references in questions/results
- ✅ Tone approved by event organizers
- ✅ Accessible (WCAG 2.1 AA compliance for internal tools)

---

## Part 13: Future Enhancements (Post-MVP)

### v1.5 Ideas

- **Hybrid Results**: "You're 60% VOC, 40% TRIO"
- **Team Compatibility**: "VOC works well with TRIO but may clash with LOGS"
- **Personal Growth Tips**: "As a JOULE, consider collaborating more with CTRL types"
- **Result History**: Save past results, track changes over time
- **Custom Team Reports**: Aggregate team distribution with insights

### v2.0 Ideas

- **Multi-language Support**: Full German, Japanese, etc.
- **Animated Keycap Reveals**: Dramatic result animation
- **Voice-Over**: Audio descriptions of results
- **Integration with SAP Jam/Teams**: Share directly within collaboration tools
- **Gamification**: Badges for completing, sharing, discovering all 16 keys
- **Manager Dashboard**: Team distribution insights (anonymous)

---

## Part 14: References & Resources

### Personality Test Design Research

- **16 Personalities** (https://www.16personalities.com/): 5-axis model, role groupings
- **MBTI** (Myers-Briggs Type Indicator): 4 dichotomies, binary scoring
- **Big Five / OCEAN**: Continuous dimensions, scientific validation
- **DISC Assessment**: Workplace personality, forced-choice format
- **SBTI Example Image**: Visual inspiration for result cards

### UX/Enterprise Context Resources

- **SAP Fiori Design Guidelines**: UX patterns and consistency
- **Human-AI Interaction Patterns**: Trust, control, explainability
- **API Design Best Practices**: Developer experience principles
- **HPOM (Product Operating Model)**: PM-UX-Engineering alignment
- **Clean Core**: SAP extensibility and sustainability principles

### Technical Resources

- **React + Vite**: Fast frontend setup
- **Tailwind CSS**: Utility-first styling
- **html-to-image**: DOM to image conversion for sharing
- **TypeScript**: Type-safe development
- **Vercel/Netlify**: Easy deployment for MVPs

---

## Conclusion

**IMPULSE KEYS** is positioned to be a successful internal engagement tool that achieves multiple goals:

1. **Entertainment**: Fun, shareable workplace personality test
2. **Education**: Increases awareness of UX, AI, API, and HPOM concepts
3. **Team Building**: Sparks conversations about collaboration and balance
4. **Cultural Fit**: Resonates with SAP enterprise context and Chinese internet humor

By following this roadmap, the game can be developed iteratively with clear validation checkpoints. The bilingual design, keycap visual concept, and scenario-based questions create a unique identity that balances professional credibility with playful engagement.

**Next Steps**: Begin with content finalization (all 16 results + 24 questions), followed by MVP development, internal playtesting, and iterative refinement before the Impulse26 event launch.
