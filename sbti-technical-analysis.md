# SBTI Technical Analysis & Key Patterns for IMPULSE KEYS

## Source Reference
- **Repository**: FairFang-730/sbti-personality-test
- **File Analyzed**: index.html (2365 lines, single-file SPA)
- **Saved Locally**: `/Users/I549685/Documents/SAPTI/sbti-reference.html`

---

## Architecture Overview

### Tech Stack
- **Pure Vanilla JavaScript** - No frameworks (React/Vue/etc.)
- **Single HTML file** - All code embedded (CSS + JS inline)
- **Client-side only** - No backend, no database
- **Mobile-first responsive** - Breakpoints at 860px and 600px

### Why This Matters for IMPULSE KEYS
✅ **Pros**:
- Extremely lightweight and fast
- Easy to deploy (single file)
- No build process needed
- Works offline after first load
- Simple to understand and modify

❌ **Cons**:
- Harder to maintain as it grows
- No component reusability
- No TypeScript safety
- Mixing concerns (HTML/CSS/JS together)

**Recommendation**: Use SBTI's patterns but implement in React+TypeScript for better maintainability and team collaboration.

---

## Visual Design Patterns

### Color Scheme (Nature-Inspired)
```css
--bg: #f6faf6           /* Light sage background */
--panel: #ffffff         /* White cards */
--text: #1e2a22          /* Dark green text */
--muted: #6a786f         /* Muted gray-green */
--line: #dbe8dd          /* Border color */
--soft: #edf6ef          /* Soft background */
--accent: #6c8d71        /* Sage green */
--accent-strong: #4d6a53 /* Dark sage */
--radius: 22px           /* Rounded corners */
```

### Key Visual Elements

#### 1. Card-Based UI
- Everything is a "card" with rounded corners (22px)
- Soft shadows: `0 16px 40px rgba(47, 73, 55, 0.08)`
- Clean white panels on subtle gradient background

#### 2. Hero Section
- Large responsive headings: `clamp(28px, 5vw, 52px)`
- Decorative circle blur in background (position: absolute)
- "Eyebrow" badge style: pill-shaped, soft background

#### 3. Button Styles
```css
/* Primary button */
background: linear-gradient(135deg, var(--accent), var(--accent-strong));
border-radius: 14px;
padding: 16px 28px;
font-weight: 600;
transition: transform .16s ease;

/* Hover: slight lift */
transform: translateY(-1px);
```

#### 4. Question Cards
- Single question per screen
- Radio buttons styled as rounded cards
- Options stack vertically on mobile
- Immediate progression on click (no "Next" button)

### **IMPULSE KEYS Adaptation**:
- Keep the card-based, clean aesthetic
- Swap sage green for tech-themed colors (blues, cyans for AI themes?)
- Add keyboard/keycap visual motif
- Maintain the soft, approachable feel (not too corporate)

---

## Question Structure & Data Model

### Question Format
```javascript
{
  id: 'q1',              // Unique identifier
  dim: 'S1',             // Dimension code
  text: '问题文本',      // Question text
  options: [
    { label: '选项A', value: 1 },  // Value 1-3 scale
    { label: '选项B', value: 2 },
    { label: '选项C', value: 3 }
  ]
}
```

### SBTI's 15 Dimensions
- **S1-S3**: Self dimensions (自我认知)
  - S1: Self-perception (低自尊/中立/自信)
  - S2: Self-clarity (迷茫/中立/清晰)
  - S3: Self-drive (佛系/中立/内驱)

- **E1-E3**: Emotional dimensions (情绪维度)
  - E1: Security (不安/中立/安全)
  - E2: Investment (浅尝/中立/深情)
  - E3: Attachment (独立/中立/黏着)

- **A1-A3**: Attitude dimensions (态度维度)
  - A1: Trust (怀疑/中立/信任)
  - A2: Boundary (冷漠/中立/热情)
  - A3: Openness (封闭/中立/开放)

- **D1-D3**: Action dimensions (行动维度)
  - D1: Expression (克制/中立/外显)
  - D2: Initiative (被动/中立/主动)
  - D3: Decisiveness (犹豫/中立/果断)

- **C1-C3**: Social dimensions (社交维度)
  - C1: Social need (孤僻/中立/社交)
  - C2: Performance (真实/中立/表演)
  - C3: Adaptability (坚持/中立/适应)

### Question Balance
- 30 regular questions + 2 special "trigger" questions
- Each dimension has 2 questions typically
- 3-point scale (Low/Neutral/High)

### **IMPULSE KEYS Adaptation**:
```javascript
// Simpler: 4 dimensions, 24 questions, binary A/B choice
{
  id: 'q1',
  dimension: 'SignalSolution',
  scenario: 'A customer says, "This part is not very convenient."',
  question: 'What do you do first?',
  options: [
    { 
      id: 'A',
      text: 'Ask follow-up questions to understand the real workflow pain.',
      score: 'Signal',
      darkHumor: 'Tell me more. Then pain-point archaeology begins.'
    },
    {
      id: 'B',
      text: 'Check whether the current behavior matches the designed process.',
      score: 'Solution'
    }
  ]
}
```

---

## Scoring Algorithm

### SBTI's Approach: Vector Similarity Matching

```javascript
// 1. Calculate user's dimension profile (15 numbers)
const userProfile = [
  answers['S1'], // 1-3
  answers['S2'], // 1-3
  answers['S3'], // 1-3
  // ... 15 dimensions total
];

// 2. Each result type has a "template" profile
const types = {
  "IMSB": {
    "code": "IMSB",
    "template": [1, 1, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2]
  },
  "VOC": {
    "code": "VOC",
    "template": [2, 3, 2, 3, 3, 1, 3, 2, 3, 2, 3, 2, 2, 2, 2]
  }
  // ... 27 types
};

// 3. Calculate similarity (Euclidean distance)
function calculateSimilarity(userProfile, templateProfile) {
  let sumSquaredDiff = 0;
  for (let i = 0; i < userProfile.length; i++) {
    sumSquaredDiff += Math.pow(userProfile[i] - templateProfile[i], 2);
  }
  const distance = Math.sqrt(sumSquaredDiff);
  
  // Convert distance to similarity percentage
  const maxDistance = Math.sqrt(15 * 4); // Max possible distance
  const similarity = (1 - distance / maxDistance) * 100;
  return similarity;
}

// 4. Find best match
let bestMatch = null;
let highestSimilarity = 0;

for (const [key, type] of Object.entries(types)) {
  const similarity = calculateSimilarity(userProfile, type.template);
  if (similarity > highestSimilarity) {
    highestSimilarity = similarity;
    bestMatch = key;
  }
}

// 5. Handle low confidence
if (highestSimilarity < 60) {
  result = "HHHH"; // Fallback "equilibrium" type
}
```

### Special Features
- **Trigger questions**: Certain extreme answers trigger special results (e.g., "DRUNK" personality)
- **Fallback type**: If no good match (< 60% similarity), show "HHHH" (equilibrium person)

### **IMPULSE KEYS Adaptation**:

Much simpler - direct dimension mapping:

```javascript
// 1. Count scores for each pole
const scores = {
  Signal: 0, Solution: 0,
  Human: 0, Machine: 0,
  Explore: 0, Align: 0,
  Spark: 0, Stabilize: 0
};

answers.forEach(answer => {
  scores[answer.scorePole]++;
});

// 2. Determine winner for each dimension
const finalDimensions = {
  signalSolution: scores.Signal > scores.Solution ? 'Signal' : 'Solution',
  humanMachine: scores.Human > scores.Machine ? 'Human' : 'Machine',
  exploreAlign: scores.Explore > scores.Align ? 'Explore' : 'Align',
  sparkStabilize: scores.Spark > scores.Stabilize ? 'Spark' : 'Stabilize'
};

// 3. Map to Impulse Key using lookup table
const mapping = {
  'Signal+Human+Explore+Spark': 'VOC',
  'Solution+Human+Stabilize+Align': 'FIORI',
  // ... 16 mappings
};

const key = `${finalDimensions.signalSolution}+${finalDimensions.humanMachine}+...`;
const impulseKey = mapping[key] || 'VOC'; // fallback
```

---

## UI Flow & Interaction Patterns

### Screen Flow

```
1. Landing Page (Intro Screen)
   - Hero section with title
   - FAQ accordion
   - "Start Test" button
   
2. Test Screen (Question Loop)
   - Single question displayed
   - 3 radio button options (or 2 for binary)
   - Progress indicator at top
   - Auto-advance on selection (no Next button!)
   
3. Loading Screen (Brief animation)
   - Fun loading messages
   - "Calculating your personality..."
   - 1-2 second delay for dramatic effect
   
4. Result Screen
   - Large result card with type code
   - Type name (CN + EN)
   - Intro tagline
   - Full description
   - Share buttons (Weibo, Twitter, Copy)
   - "Restart Test" button
   - "Back to Home" button
```

### Key UX Patterns

#### 1. **Auto-Advance Questions**
```javascript
// On radio button change, immediately go to next question
options.forEach(option => {
  option.addEventListener('change', () => {
    saveAnswer();
    
    // Brief delay for visual feedback
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < totalQuestions) {
        showQuestion(currentQuestion);
      } else {
        showLoading();
        calculateResult();
      }
    }, 200);
  });
});
```

**Why this works**:
- Faster completion (no clicking "Next" 30 times)
- Feels more fluid and modern
- Mobile-friendly (less tapping)

#### 2. **Progress Bar**
```html
<div class="progress-bar">
  <div class="progress-fill" style="width: 33%"></div>
  <span class="progress-text">10 / 30</span>
</div>
```

Updates in real-time as user answers

#### 3. **Result Card Design**
```html
<div class="result-card">
  <div class="result-badge">VOC</div>
  <h2 class="result-name-cn">客户之声侦探</h2>
  <h3 class="result-name-en">Voice-of-Customer Detective</h3>
  <p class="result-intro">Users rarely give answers. They leave evidence.</p>
  <div class="result-desc">
    [Full description text...]
  </div>
</div>
```

#### 4. **Share Functionality**
```javascript
// Copy result text to clipboard
function copyResult() {
  const text = `我的SBTI人格是：${resultCode} - ${resultName}\n${resultIntro}`;
  navigator.clipboard.writeText(text);
  showToast('已复制到剪贴板！');
}

// Social sharing
function shareToWeibo() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`我的SBTI人格是${resultCode}`);
  window.open(`http://service.weibo.com/share/share.php?url=${url}&title=${text}`);
}
```

---

## Mobile Responsiveness

### Breakpoints
```css
/* Desktop: max-width: 980px */
.shell {
  max-width: 980px;
  margin: 0 auto;
  padding: 24px 16px;
}

/* Tablet: < 860px */
@media (max-width: 860px) {
  .hero-grid {
    grid-template-columns: 1fr; /* Stack vertically */
  }
}

/* Mobile: < 600px */
@media (max-width: 600px) {
  .hero h1 {
    font-size: 32px; /* Smaller headings */
  }
  
  .options {
    flex-direction: column; /* Stack options */
  }
}
```

### Mobile-First Considerations
- Touch targets ≥ 44px height
- Font sizes scale with viewport (clamp)
- Buttons full-width on mobile
- Reduced padding/margins on small screens

---

## Performance Optimizations

### What SBTI Does Well

1. **Single HTML file** - One HTTP request
2. **Inline CSS/JS** - No external dependencies
3. **No images** - Pure CSS design (except favicon)
4. **Lazy calculations** - Only compute result when needed
5. **Minimal DOM manipulation** - Show/hide screens rather than rebuilding

### Loading Performance
```javascript
// Initial page load: ~50KB (compressed)
// Time to interactive: < 1 second
// First contentful paint: < 0.5 seconds
```

### **IMPULSE KEYS Considerations**:
- React bundle will be larger (~200KB with dependencies)
- Can optimize with code splitting
- Use React.lazy() for result screen
- Consider preloading keycap SVG assets

---

## Bilingual Implementation

### SBTI's Approach: Separate Files
- `index.html` - Chinese version (default)
- `en.html` - English version (separate file)
- Simple link to switch: `<a href="en.html">English</a>`

### Pros/Cons

✅ **Pros**:
- SEO-friendly (separate URLs)
- No runtime language switching logic
- Fast (no JavaScript i18n overhead)
- Easy to maintain translations

❌ **Cons**:
- Code duplication (2x maintenance)
- Can't switch language without page reload
- Hard to add more languages

### **IMPULSE KEYS Alternative**: Runtime i18n

```javascript
// Use i18next or simple object-based approach
const translations = {
  en: {
    landing: {
      title: "IMPULSE KEYS",
      subtitle: "Find your experience impulse"
    }
  },
  zh: {
    landing: {
      title: "IMPULSE KEYS",
      subtitle: "找到你的体验脉冲"
    }
  }
};

// Current language state
const [language, setLanguage] = useState('en');

// Component usage
<h1>{translations[language].landing.title}</h1>
```

**Recommendation**: Use runtime switching for better UX, but generate separate static pages for SEO.

---

## Data Structure for 27 Result Types

### Type Definition
```javascript
{
  "IMSB": {
    "code": "IMSB",
    "cn": "傻者",
    "intro": "认真的么？我真的是傻逼么？",
    "desc": "恭喜您！您根本不在人类范畴内！您测出了百万年一遇的【IMSB】人格。...",
    "template": [1, 1, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2]
  }
}
```

### IMPULSE KEYS Equivalent
```javascript
{
  "VOC": {
    "key": "VOC",
    "englishName": "Voice-of-Customer Detective",
    "chineseName": "客户之声侦探",
    "motto": "Users rarely give answers. They leave evidence.",
    "impulse26Signal": "User research is not just collecting quotes...",
    "yourImpulse": "You can hear roles, scenarios, tasks...",
    "darkSide": "After you ask why three times, the meeting may never return...",
    "workplaceBulletComments": [
      "Tell me more. Then the pain-point archaeology begins.",
      "One customer quote is not insight yet. It is evidence."
    ],
    "chinesePunchline": "客户说"不太方便"，你已经开始做案发现场还原了。",
    "awarenessThemes": ["User Research", "VOC", "Customer-First"],
    "keycapImagePath": "/assets/keycaps/voc.svg"
  }
}
```

---

## Animation & Transitions

### SBTI's Subtle Animations

```css
/* Buttons lift on hover */
button:hover {
  transform: translateY(-1px);
  transition: transform .16s ease;
}

/* Fade in screens */
.screen {
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* Progress bar fills smoothly */
.progress-fill {
  transition: width 0.3s ease;
}
```

### **IMPULSE KEYS Ideas**:
- Keycap "pop" animation on result reveal
- Question slide transitions (card enters from right)
- Loading screen with rotating tech quotes
- Confetti or sparkle effect on result page
- Smooth scroll to result details

---

## Key Takeaways for IMPULSE KEYS

### ✅ **Adopt These Patterns**

1. **Auto-advance questions** - No "Next" button needed
2. **Card-based UI** - Clean, modern, mobile-friendly
3. **Soft color palette** - Approachable, not too corporate
4. **Progress indicator** - Show completion percentage
5. **Single-question-per-screen** - Focus and simplicity
6. **Immediate result** - No registration, no email
7. **Share functionality** - Copy text, social links
8. **Responsive design** - Mobile-first approach

### 🔄 **Adapt for Our Needs**

1. **Use React+TypeScript** - Better than vanilla JS for maintainability
2. **Binary A/B questions** - Simpler than 3-point scale
3. **Fewer questions** - 20-24 vs SBTI's 30
4. **Simpler scoring** - Direct dimension mapping vs vector similarity
5. **Keycap visual theme** - Unique to IMPULSE KEYS
6. **SAP/enterprise humor** - Context-specific content
7. **Bilingual in-app** - Runtime switching vs separate files

### ❌ **Avoid These**

1. **Single HTML file** - Hard to maintain at scale
2. **15 dimensions** - Too complex, stick with 4
3. **27 result types** - 16 is already plenty
4. **Complex similarity algorithm** - Overkill for binary questions
5. **Inline CSS/JS** - Split into proper components

---

## Technical Recommendation

**For IMPULSE KEYS, use this hybrid approach**:

```
SBTI's Strengths        +  Modern Best Practices
─────────────────────────  ──────────────────────────
✓ Auto-advance UX          ✓ React components
✓ Card-based design        ✓ TypeScript safety
✓ Progress indicator       ✓ Tailwind CSS
✓ Share functionality      ✓ Build optimization
✓ Mobile-first             ✓ Git-friendly structure
✓ Client-side only         ✓ Reusable patterns
```

**Tech Stack**:
- React + Vite + TypeScript
- Tailwind CSS (for SBTI-like utility patterns)
- Local JSON data (no backend)
- html-to-image for result export
- Deploy on Vercel/Netlify (like SBTI on Cloudflare Pages)

---

## Next Steps

1. **Extract color palette** from SBTI for inspiration
2. **Prototype single question screen** with auto-advance
3. **Design keycap card** based on SBTI's result card pattern
4. **Implement progress bar** component
5. **Build share functionality** (copy + social links)
6. **Test mobile responsiveness** at 600px and 860px breakpoints

---

## File Reference

- **Full source code**: `/Users/I549685/Documents/SAPTI/sbti-reference.html`
- **Live demo**: https://sbti.doodleempires.wiki
- **GitHub repo**: https://github.com/FairFang-730/sbti-personality-test
