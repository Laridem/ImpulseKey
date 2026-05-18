# SAPTI / IMPULSE KEYS - Project Navigator

> **Quick Start**: This README is the central navigation hub for the IMPULSE KEYS personality test project. Read this file first in new conversation contexts to understand the project structure and locate relevant documentation.

---

## 📋 Project Overview

**Project Name**: IMPULSE KEYS (Impulse26 体验脉冲人格测试)  
**Type**: Internal SAP personality test game for Impulse26 event  
**Purpose**: Fun, shareable test to promote UX awareness, customer-first thinking, Human-AI interaction, AI Agent/Joule, API experience, and HPOM collaboration  
**Target Audience**: SAP internal teams (PM, UX, Engineering, QA)  
**Status**: Design & Planning Phase

### Core Concept
- **16 Result Types** (Impulse Keys): VOC, FIORI, PIXEL, A11Y, JOULE, CTRL, AGENT, SAFE, OData, BTP, CORE, API, QAQ, LOGS, TRIO, FIRE
- **4 Internal Dimensions**: Signal/Solution, Human/Machine, Explore/Align, Spark/Stabilize
- **20-24 Questions**: Binary A/B choice, scenario-based workplace questions
- **Bilingual**: English primary, Chinese results/punchlines
- **Visual Theme**: Keyboard keycap cards

---

## 📁 Project Files & Purpose

### Core Files (Root Directory)

### **1. project-status.md** 📊 PROJECT DASHBOARD
**Path**: `/Users/I549685/Documents/SAPTI/project-status.md`  
**Purpose**: Current project status, timeline, and tracking

**Contains**:
- Completed work checklist
- In-progress items
- Next steps (prioritized)
- 8-week timeline
- Technical decisions made
- Success metrics
- Risks & mitigations
- Change log

**When to read**: First - for quick status update and what's happening now.

---

### **2. results.md** ⭐ RESULT TYPE DEFINITIONS (SOURCE OF TRUTH)
**Path**: `/Users/I549685/Documents/SAPTI/results.md`  
**Purpose**: Single source of truth for all 16 result type definitions

**Contains**:
- All 16 result types (VOC, FIORI, PIXEL, A11Y, JOULE, CTRL, AGENT, SAFE, OData, BTP, CORE, API, QAQ, LOGS, TRIO, FIRE)
- English + Chinese names
- Motto, Impulse26 Signal, 体验脉冲, 隐藏风险, 黑色幽默弹幕, 中文弹幕
- Ready for Figma, development, and all use cases

**When to read**: For any result type content. **Edit here only** - all other files reference this file.

---

### **3. game-content.md** 📖 ARCHIVED
**Former Path**: Moved to `/Users/I549685/Documents/SAPTI/archive/game-content-old.md`  
**Status**: Archived - result definitions superseded by `results.md`

---

### **4. questions-v3-complete-bilingual.md** ✅ QUESTIONS (SOURCE OF TRUTH)
**Path**: `/Users/I549685/Documents/SAPTI/questions-v3-complete-bilingual.md`  
**Purpose**: Final question bank (16 questions, 3 options, bilingual, SAP Pudong context)

**Contains**:
- 16 questions (4 per dimension)
- 3 options each (A: +2 to Pole A, B: +1/+1, C: +2 to Pole B)
- English + Chinese text
- SAP Pudong context (PVG01-06, 长泰广场, 汇智湖, Jira, Teams, etc.)
- Black humor for each option
- Implementation notes (randomization, display, mobile optimization)

**When to read**: For complete question data ready for implementation.

---

### **5. mapping-validation.md** ✅ VALIDATION PROOF
**Path**: `/Users/I549685/Documents/SAPTI/mapping-validation.md`  
**Purpose**: Validation report proving all 16 results are reachable

**Contains**:
- Complete mapping table (all 16 dimension patterns → Impulse Keys)
- Test cases (extreme, balanced, mixed)
- Scoring logic formulas
- Tie-breaking rules

**When to read**: For scoring implementation and validation logic.

---

### **6. research-plan.md** 🗺️ ROADMAP
**Path**: `/Users/I549685/Documents/SAPTI/research-plan.md`  
**Size**: 1,135 lines  
**Purpose**: Comprehensive design & development roadmap

**Contains**:
- Research on MBTI/16 Personalities/Big Five patterns
- IMPULSE KEYS core design principles
- Question design guidelines
- Visual design specifications
- Technical implementation plan (React + TypeScript)
- 4-phase development roadmap

**When to read**: When planning implementation or understanding design rationale.

---

### **7. sbti-technical-analysis.md** 🔍 REFERENCE
**Path**: `/Users/I549685/Documents/SAPTI/sbti-technical-analysis.md`  
**Purpose**: Technical analysis of SBTI personality test

**Contains**:
- SBTI architecture (vanilla JS, single-file SPA)
- Visual design patterns (color scheme, card UI)
- UX patterns to adopt (auto-advance, progress bar)
- Mobile breakpoints
- What to adopt vs. improve

**When to read**: For UI/UX implementation patterns.

---

### Supporting Folders

### **assets/** 📦 DESIGN ASSETS
**Path**: `/Users/I549685/Documents/SAPTI/assets/`

**Structure**:
```
assets/
└── result-cards/         # Figma-exported result card images
    ├── VOC.png
    ├── FIORI.png
    ├── PIXEL.png
    ├── A11Y.png
    ├── JOULE.png
    ├── CTRL.png
    ├── AGENT.png
    ├── SAFE.png
    ├── BTP.png
    └── OData.png
    (10 out of 16 cards exported)
```

---

### **archive/** 🗄️ OLD VERSIONS
**Path**: `/Users/I549685/Documents/SAPTI/archive/`

**Contains**:
- `questions-and-mapping.md` (V1: 24 questions, 2 options)
- `questions-v2-16q-3options.md` (V2: 16 questions, 3 options, no SAP context)
- `questions-v3-sap-pudong.md` (V3 draft: Chinese only)
- `sbti-reference.html` (SBTI source code reference)
- `Image 1.png`, `Image 2.png` (SBTI reference screenshots)

**When to read**: Only if you need to reference old versions.

---

## 🎯 Key Design Decisions

### Test Structure
- **Format**: Binary A/B questions (not Likert scale)
- **Count**: 20-24 questions total (5-6 per dimension)
- **Duration**: 2-4 minutes completion time
- **Flow**: Auto-advance (no "Next" button)

### 4 Dimensions → 16 Keys
```
Dimension A: Signal vs Solution
Dimension B: Human vs Machine
Dimension C: Explore vs Align
Dimension D: Spark vs Stabilize

Example Mapping:
Signal + Human + Explore + Spark → VOC
Solution + Human + Stabilize + Align → FIORI
```

### Tech Stack (Recommended)
```
Frontend:  React + Vite + TypeScript
Styling:   Tailwind CSS
Data:      Local JSON (no backend)
Images:    html-to-image for sharing
Deploy:    Vercel / Netlify / SAP hosting
```

### Visual Theme
- **Keycap card design** (keyboard-inspired)
- **Soft, modern colors** (not too corporate)
- **Mobile-first responsive** (breakpoints: 600px, 860px)
- **Card-based UI** with rounded corners and subtle shadows

---

## 📊 Project Status

### ✅ Completed
- Research on personality test design patterns
- 16 Impulse Key definitions (complete with descriptions)
- 4-dimension model finalized
- 12 sample questions written
- SBTI technical analysis
- Visual design direction (keycap concept)
- Technical architecture plan

### 🚧 In Progress / Next Steps
1. **Content**: Write remaining 12-16 questions (need 24 total)
2. **Design**: Create 16 keycap illustrations (SVG/PNG)
3. **Development**: Build React prototype
4. **Data**: Create TypeScript data models (questions.ts, results.ts)
5. **Testing**: Internal playtest with 10-15 people

---

## 🎨 16 Impulse Keys Quick Reference

| Key | Name (EN) | Name (CN) | Theme |
|-----|-----------|-----------|-------|
| VOC | Voice-of-Customer Detective | 客户之声侦探 | User Research |
| FIORI | Fiori Experience Guardian | Fiori 体验守门员 | UX Consistency |
| PIXEL | Pixel-Level Perfectionist | 像素级强迫症患者 | UX Design Craft |
| A11Y | Accessibility Conscience | 无障碍良心发现者 | Accessibility |
| JOULE | Joule Dream Weaver | Joule 造梦师 | AI Opportunity |
| CTRL | Human Control Keeper | 人类控制权守门员 | Human-AI Interaction |
| AGENT | Agentic Workflow Prophet | 智能体流程预言家 | AI Agent |
| SAFE | Trustworthy AI Therapist | 可信 AI 心理咨询师 | AI Trust |
| OData | Process Contract Cartographer | 流程契约地图师 | Data/Process |
| BTP | Prototype Escape Artist | 原型逃生大师 | Prototyping |
| CORE | Clean Core Monk | Clean Core 修行僧 | Architecture |
| API | Developer Experience Whisperer | API 体验低语者 | API/DX |
| QAQ | Quality Empath | 用户痛感 QA | Quality |
| LOGS | Production Reality Reader | 生产现实解读师 | Production |
| TRIO | HPOM Alignment Summoner | HPOM 对齐召唤师 | HPOM |
| FIRE | Customer Firefighter | 客户现场救火队长 | Customer-First |

---

## 🔑 Key Concepts to Remember

### Tone & Humor
- Light, smart, slightly dark workplace humor
- SAP/UX/AI inside jokes
- Chinese internet-friendly
- Safe for internal sharing
- No role shaming or personal attacks

### Educational Goals
Each result type teaches awareness of:
- User Research & VOC
- UX Design Techniques
- Human-AI Interaction
- AI Agent / Joule thinking
- API & Developer Experience
- Customer-First mindset
- HPOM Collaboration
- Product Quality & Reality

### Success Metrics
- **Completion rate**: >70%
- **Share rate**: >30%
- **Perceived accuracy**: >80%
- Used as conversation starter in teams

---

## 🚀 How to Use This Repository

### For Design Work
1. Read **game-content.md** (sections 12.1-12.16) for all result type descriptions
2. Read **sbti-technical-analysis.md** (Visual Design section) for UI patterns
3. Reference **sbti-reference.html** for CSS implementation examples

### For Development Work
1. Read **research-plan.md** (Parts 4-7) for question design, scoring, visual specs, and tech implementation
2. Reference **sbti-technical-analysis.md** for UX patterns and data structures
3. Use **game-content.md** (sections 21-22) for data model structure

### For Content Writing
1. Read **game-content.md** (section 16) for sample questions
2. Read **research-plan.md** (Part 4) for question design principles
3. Follow the 4-dimension model and ensure 5-6 questions per dimension

### For Event Planning
1. Read **game-content.md** (section 20) for event usage suggestions
2. Read **research-plan.md** (Part 8) for facilitation discussion prompts
3. Check MVP scope in **research-plan.md** (Part 9)

---

## 🔄 Version History

- **2026-05-15**: Initial research and design phase
  - Created game-content.md with complete 16 result types
  - Researched MBTI/16 Personalities patterns
  - Analyzed SBTI implementation
  - Defined 4-dimension model
  - Created 16 questions (3-option system) with SAP Pudong context
  - Validated all 16 result mappings
  - Created Figma result cards (harmonized version)
  - Organized project structure (archive/, assets/)
  - Created comprehensive roadmap and status tracking

---

## 📞 Quick Context Loading

**When opening a new conversation, read in this order:**

1. **README.md** (this file) - 5 min - Get overview & file structure
2. **project-status.md** - 3 min - Current status & timeline
3. **results.md** - 5 min - All 16 result type definitions
4. **questions-v3-complete-bilingual.md** - 5 min - Final question bank

**Total context loading time**: ~18 minutes

**Optional deep dives**:
- **research-plan.md** - Complete roadmap
- **mapping-validation.md** - Scoring logic proof
- **archive/game-content-old.md** - Original design spec (archived)

---

## 📝 Current Project Structure

```
/Users/I549685/Documents/SAPTI/
├── README.md                                    # This file - navigation hub
├── project-status.md                            # Current status & timeline
├── results.md                                   # 16 result definitions (SOURCE OF TRUTH)
├── questions-v3-complete-bilingual.md           # Final questions (16Q, 3 options, EN/CN)
├── mapping-validation.md                        # Validation proof
├── research-plan.md                             # Development roadmap
├── sbti-technical-analysis.md                   # Reference analysis
│
├── assets/                                      # Design assets
│   └── result-cards/                            # Figma exports (10 of 16)
│       ├── VOC.png, FIORI.png, PIXEL.png, etc.
│
└── archive/                                     # Old versions
    ├── game-content-old.md                      # Original design spec (archived)
    ├── questions-and-mapping.md                 # V1 (24Q, 2 options)
    ├── questions-v2-16q-3options.md             # V2 (16Q, 3 options)
    ├── questions-v3-sap-pudong.md               # V3 draft (CN only)
    ├── sbti-reference.html                      # Reference code
    ├── Image 1.png, Image 2.png                 # SBTI screenshots
```

---

## 🎯 Current Status: Visual Design Phase

**Completed**:
- ✅ Research & Design
- ✅ Question Design (16Q, 3 options, bilingual)
- ✅ Result Content (all 16 types, harmonized)
- ✅ Mapping Validation (all results reachable)
- ✅ Figma Cards (harmonized layout)
- ✅ Project Organization

**In Progress**:
- 🔄 Visual design in Google Stitch

**Next**:
- 🔜 Keycap illustrations (16 SVGs)
- 🔜 React + Vite + TypeScript project setup
- 🔜 Development & testing

**Timeline**: 4-5 weeks to Impulse26 launch

---

*Last updated: 2026-05-15*  
*Project: IMPULSE KEYS / SAPTI*  
*For: Impulse26 Internal SAP Event*
