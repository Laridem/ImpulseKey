# SAPTI / IMPULSE KEYS - Project Navigator

> **Quick Start**: This README is the central navigation hub for the IMPULSE KEYS personality test project. Read this file first in new conversation contexts to understand the project structure and locate relevant documentation.

---

## 📋 Project Overview

**Project Name**: IMPULSE KEYS (Impulse26 体验脉冲人格测试)  
**Type**: Internal SAP personality test game for Impulse26 event  
**Purpose**: Fun, shareable test to promote UX awareness, customer-first thinking, Human-AI interaction, AI Agent/Joule, API experience, and HPOM collaboration  
**Target Audience**: SAP internal teams (PM, UX, Engineering, QA)  
**Status**: Development Phase

### Core Concept
- **16 Result Types** (Impulse Keys): VOC, FIORI, PIXEL, A11Y, JOULE, CTRL, AGENT, SAFE, OData, BTP, CORE, API, QAQ, LOGS, TRIO, FIRE
- **4 Internal Dimensions**: Signal/Solution, Human/Machine, Explore/Align, Spark/Stabilize
- **16 Questions**: 3-option choice, scenario-based workplace questions
- **Bilingual**: English primary, Chinese results/punchlines
- **Visual Theme**: Pixel art keycap characters

---

## 📁 Project Structure

```
SAPTI/
├── README.md                    # This file - project navigator
├── CHANGELOG.md                 # 📋 Centralized development log
├── GIT-WORKFLOW.md              # Git commands reference
├── FILE-NAMING.md               # File naming conventions
│
├── app/                         # 🚀 React application (Vite + TypeScript)
│   ├── src/                     # Source code
│   ├── public/keycaps/          # All 16 SVG illustrations
│   └── package.json
│
├── docs/                        # 📚 Documentation
│   ├── content/                 # Content & data
│   │   ├── results.md           # 16 result definitions (SOURCE OF TRUTH)
│   │   ├── questions-v3-complete-bilingual.md  # 16 questions
│   │   └── mapping-validation.md   # Scoring validation
│   │
│   ├── planning/                # Planning & strategy
│   │   ├── research-plan.md     # Development roadmap
│   │   └── Design.md            # Design system spec
│   │
│   ├── design/                  # UI/UX assets
│   │   ├── figma-ui-flow.png
│   │   └── result-page-web.png
│   │
│   └── reference/               # Reference materials
│       └── sbti-technical-analysis.md
│
├── assets/                      # 🎨 Design assets
│   ├── results-illustration/    # 16 SVG keycap characters
│   └── result-cards/            # Old PNG exports
│
└── archive/                     # 🗄️ Old versions
    └── old-status-docs/         # Archived status documents
```

---

## 🎯 **Essential Files to Read**

### **1. Development Changelog** 📋
**Path**: `CHANGELOG.md`  
**Read first** - Centralized development log organized by date, what's done, what's next

### **2. Result Definitions** ⭐
**Path**: `docs/content/results.md`  
**SOURCE OF TRUTH** for all 16 result types (VOC, FIORI, PIXEL, etc.)

### **3. Questions** ✅
**Path**: `docs/content/questions-v3-complete-bilingual.md`  
**SOURCE OF TRUTH** for all 16 questions (bilingual, 3 options each)

### **4. Design System** 🎨
**Path**: `docs/planning/Design.md`  
Complete visual design specification

### **5. Development Roadmap** 🗺️
**Path**: `docs/planning/research-plan.md`  
Comprehensive implementation plan (1,135 lines)

---

## 🚀 **Quick Start for Development**

### **Run the App**
```bash
cd app
npm install
npm run dev
# Visit http://localhost:5173
```

### **View Assets**
- All keycap illustrations: `app/public/keycaps/`
- Design screenshots: `docs/design/`
- Original SVGs: `assets/results-illustration/`

### **Git Workflow**
```bash
# Make changes, then:
git add -A
git commit -m "Your message"
git push
```
See `GIT-WORKFLOW.md` for detailed guide.

---

## 🎨 **16 Impulse Keys Quick Reference**

| Key | Name (EN) | Name (CN) | Color |
|-----|-----------|-----------|-------|
| VOC | Voice-of-Customer Detective | 客户之声侦探 | 🟠 Orange |
| FIORI | Fiori Experience Guardian | Fiori 体验守门员 | 🔵 Blue |
| PIXEL | Pixel-Level Perfectionist | 像素级强迫症患者 | 🩷 Pink |
| A11Y | Accessibility Conscience | 无障碍良心发现者 | 🟣 Purple |
| JOULE | Joule Dream Weaver | Joule 造梦师 | 🟡 Yellow |
| CTRL | Human Control Keeper | 人类控制权守门员 | ⚪ Gray |
| AGENT | Agentic Workflow Prophet | 智能体流程预言家 | 🩵 Teal |
| SAFE | Trustworthy AI Therapist | 可信 AI 心理咨询师 | 🟢 Green |
| OData | Process Contract Cartographer | 流程契约地图师 | 🔷 Cyan |
| BTP | Prototype Escape Artist | 原型逃生大师 | 🔹 Navy |
| CORE | Clean Core Monk | Clean Core 修行僧 | 🟤 Brown |
| API | Developer Experience Whisperer | API 体验低语者 | 💚 Mint |
| QAQ | Quality Empath | 用户痛感 QA | 🍑 Peach |
| LOGS | Production Reality Reader | 生产现实解读师 | ⬛ Dark Gray |
| TRIO | HPOM Alignment Summoner | HPOM 对齐召唤师 | 🟪 Violet |
| FIRE | Customer Firefighter | 客户现场救火队长 | 🔴 Red |

---

## 🔄 **Version History**

- **2026-05-18**: Project reorganization + React development started
  - Reorganized files into `docs/`, `app/`, `assets/`
  - Added all 16 SVG keycap illustrations
  - Built React + Vite + TypeScript + Tailwind project
  - Created asset utilities and gallery component
  - GitHub repo initialized

- **2026-05-15**: Initial research and design phase
  - Created 16 result type definitions
  - Created 16 questions (3-option system)
  - Validated all mappings
  - Created Figma designs
  - Comprehensive planning documentation

---

## 📞 **Quick Context Loading (New Conversation)**

**Read in this order**:

1. **README.md** (this file) - 3 min - Project overview
2. **CHANGELOG.md** - 5 min - Development history and current status
3. **docs/content/results.md** - 5 min - All 16 results
4. **docs/content/questions-v3-complete-bilingual.md** - 5 min - All 16 questions

**Total**: ~18 minutes

---

## 🛠️ **Tech Stack**

**Frontend**:
- React 18 + Vite 6 + TypeScript
- Tailwind CSS
- React Router (to be added)

**Assets**:
- 16 SVG keycap illustrations (pixel art style)
- All 16 result types with full content

**Deployment**:
- Vercel (pending manual auth)
- GitHub: `https://github.tools.sap/I549685/impulse-keys`

---

## 📊 **Current Status**

### ✅ **Completed**
- Research & design
- All 16 result definitions
- All 16 questions (bilingual)
- Mapping validation
- Figma designs
- React project setup
- All keycap illustrations
- Asset management utilities
- GitHub repository

### 🔄 **In Progress**
- Building core UI components
- Question flow implementation
- Result page implementation

### 📝 **Next Steps**
1. Implement landing page
2. Build question flow component
3. Build result page component
4. Add routing
5. Deploy to Vercel
6. Internal testing

**Timeline**: 4-5 weeks to Impulse26 launch

---

## 🔗 **Important Links**

- **GitHub Repo**: https://github.tools.sap/I549685/impulse-keys
- **Figma Design**: https://www.figma.com/design/3ejEdYTzhXbf2tzINwX88G/Test-Claude
- **Dev Server**: http://localhost:5173 (when running)

---

*Last updated: 2026-05-18*  
*Project: IMPULSE KEYS / SAPTI*  
*For: Impulse26 Internal SAP Event*
