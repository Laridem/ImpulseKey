# IMPULSE KEYS - Project Status & Workflow
# 项目状态与工作流程

> **Last Updated**: 2026-05-15  
> **Project Phase**: Design & Development Planning  
> **Target Launch**: Impulse26 Event (4-5 weeks)

---

## 📋 **Project Overview**

**Project Name**: IMPULSE KEYS (Impulse26 体验脉冲人格测试)  
**Type**: Internal SAP personality test game  
**Purpose**: Promote UX awareness, AI thinking, HPOM collaboration through fun personality test  
**Target Audience**: SAP Pudong teams (PM, UX, Engineering, QA)  
**Location Context**: 上海浦东新区金科路 2688 号 (PVG01-06)

---

## ✅ **Completed Work**

### **Phase 1: Research & Design (Week 1) ✅**

#### 1.1 Core Design
- ✅ 16 Impulse Keys定义完成
  - VOC, FIORI, PIXEL, A11Y, JOULE, CTRL, AGENT, SAFE
  - OData, BTP, CORE, API, QAQ, LOGS, TRIO, FIRE
- ✅ 4-dimension模型确定
  - Signal vs Solution
  - Human vs Machine
  - Explore vs Align
  - Spark vs Stabilize
- ✅ 完整描述文档
  - 英文名、中文名
  - Motto、Impulse26 Signal
  - 黑色幽默、中文弹幕

**Files**:
- `/Users/I549685/Documents/SAPTI/results.md` (384 lines - SOURCE OF TRUTH)

---

#### 1.2 Question Design
- ✅ V1: 24题版本（2选项）
- ✅ V2: 16题版本（3选项）- **Final Version**
- ✅ V3: SAP浦东定制版（中英双语）
  - 融入真实场景：PVG01-06, 长泰广场, 汇智湖
  - 融入工具梗：Jira, AHA, Teams, Outlook, SharePoint
  - 融入产品名：S/4HANA, Joule, Fiori, BTP, Clean Core
- ✅ 计分系统设计
  - 3选项计分：A (+2/+0), B (+1/+1), C (+0/+2)
  - 每维度最高8分
  - 百分比展示
- ✅ 随机化机制
  - 问题随机排序
  - 选项随机排序

**Files**:
- `/Users/I549685/Documents/SAPTI/questions-and-mapping.md` (24题版本)
- `/Users/I549685/Documents/SAPTI/questions-v2-16q-3options.md` (16题3选项)
- `/Users/I549685/Documents/SAPTI/questions-v3-sap-pudong.md` (SAP浦东版)
- `/Users/I549685/Documents/SAPTI/questions-v3-complete-bilingual.md` (完整双语)

---

#### 1.3 Mapping & Validation
- ✅ 16种结果映射逻辑
- ✅ 覆盖率验证（所有组合可达）
- ✅ 测试用例验证
  - 极端测试：全A → VOC, 全B → CORE
  - 平衡测试：混合答案
  - 边界测试：3-3平局处理

**Files**:
- `/Users/I549685/Documents/SAPTI/mapping-validation.md`

---

#### 1.4 Visual Design
- ✅ Figma 结果卡设计（第一版）
  - Page: "IMPULSE KEYS - Result Cards"
  - 16张卡片（320×480px）
  - Keycap风格设计
  - 颜色编码
- ✅ Figma 和谐化版本（更新版）
  - Page: "IMPULSE KEYS - Harmonized Results"
  - 新布局结构
  - 完整内容（Motto, Signal, 脉冲, 风险, 弹幕）
  - 16张完整卡片

**Figma File**: https://www.figma.com/design/3ejEdYTzhXbf2tzINwX88G/Test-Claude

---

#### 1.5 Result Page Layout Design
- ✅ Layout方案设计
  - Version A: Hero-focused layout (推荐)
  - Version B: Card-based layout
- ✅ 组件拆解
  - Hero section (keycap + names + motto)
  - Dimension bars (可视化百分比)
  - Expandable content sections
  - Punchline highlight box
  - All keys grid (4×4)
  - Action buttons (Share / Retake)
- ✅ Google Stitch 设计提示词生成

**Files**:
- Design prompt documented in conversation

---

#### 1.6 Reference Analysis
- ✅ SBTI技术分析
  - 架构分析（vanilla JS, single-file SPA）
  - 视觉设计模式
  - UX patterns（auto-advance, progress bar）
  - 可复用元素识别

**Files**:
- `/Users/I549685/Documents/SAPTI/sbti-technical-analysis.md`
- `/Users/I549685/Documents/SAPTI/sbti-reference.html` (2,365 lines)

---

#### 1.7 Project Documentation
- ✅ Comprehensive roadmap
  - 8-part research plan
  - Question design principles
  - Scoring logic
  - Visual specs
  - Technical implementation plan

**Files**:
- `/Users/I549685/Documents/SAPTI/research-plan.md` (1,135 lines)
- `/Users/I549685/Documents/SAPTI/README.md` (Navigation hub)

---

## 🚧 **In Progress**

### **Phase 2: Visual Design (Current Week)**

#### 2.1 Google Stitch Design
- 🔄 Result Page设计（使用Stitch）
  - Status: Prompt已生成，等待用户执行
  - Design: Version A layout
  - Components: Hero, dimension bars, punchline, grid

---

## 📝 **Next Steps (Prioritized)**

### **Immediate (This Week)**

1. **Complete Visual Design** 🎨
   - [ ] 在 Google Stitch 中创建 Result Page
   - [ ] 创建 Landing Page 设计
   - [ ] 创建 Question Screen 设计
   - [ ] 导出设计文件

2. **Keycap Illustrations** 🖼️
   - [ ] 设计/获取 16个 keycap SVG 图标
   - [ ] 应用颜色编码
   - [ ] 导出为可用资源

---

### **Week 2-3: Development**

3. **Project Setup** ⚙️
   - [ ] 创建 React + Vite + TypeScript 项目
   - [ ] 配置 Tailwind CSS
   - [ ] 设置项目结构
   - [ ] 配置 Git repository

4. **Core Implementation** 💻
   - [ ] Landing Page 组件
   - [ ] Question Flow 组件
     - [ ] 问题随机化
     - [ ] 选项随机化
     - [ ] 进度条
     - [ ] 自动前进
   - [ ] Scoring Logic 实现
   - [ ] Result Page 组件
     - [ ] Hero section
     - [ ] Dimension bars
     - [ ] Content sections (expandable)
     - [ ] Punchline box
     - [ ] All keys grid

5. **Data Implementation** 📊
   - [ ] questions.ts (16题数据)
   - [ ] results.ts (16个结果描述)
   - [ ] mappings.ts (维度映射)
   - [ ] colors.ts (颜色定义)

6. **Features** ✨
   - [ ] Loading screen (带幽默文案)
   - [ ] Share functionality (html-to-image)
   - [ ] Retake functionality
   - [ ] Mobile responsiveness

---

### **Week 4: Testing & Launch Prep**

7. **Testing** 🧪
   - [ ] Internal playtest (10-15 people)
   - [ ] Bug fixes
   - [ ] Content refinement
   - [ ] Performance optimization

8. **Deployment** 🚀
   - [ ] Vercel deployment (using `npx vercel`)
   - [ ] Custom domain setup (optional)
   - [ ] Analytics setup (optional)

9. **Launch Materials** 📢
   - [ ] QR code generation
   - [ ] Poster design
   - [ ] Teams announcement text
   - [ ] Email template

---

### **Week 5+: Launch & Promotion**

10. **Impulse26 Event Launch** 🎉
    - [ ] Event day deployment
    - [ ] Live demo
    - [ ] On-site support

11. **Promotion** 📱
    - [ ] Teams channels push
    - [ ] Email campaign
    - [ ] Poster distribution (PVG01-06)
    - [ ] Social sharing tracking

---

## 📂 **File Structure (Current)**

```
/Users/I549685/Documents/SAPTI/
├── README.md                                    ✅ Navigation hub
├── project-status.md                            ✅ This file - status tracker
├── results.md                                   ✅ 16 result definitions (SOURCE OF TRUTH)
├── questions-v3-complete-bilingual.md           ✅ Final questions (16Q, EN/CN)
├── mapping-validation.md                        ✅ Validation report
├── research-plan.md                             ✅ Development roadmap
├── sbti-technical-analysis.md                   ✅ Reference analysis
│
├── assets/                                      📦 Design assets
│   └── result-cards/                            Figma exports (10 of 16)
│       ├── VOC.png
│       ├── FIORI.png
│       ├── PIXEL.png
│       ├── A11Y.png
│       ├── JOULE.png
│       ├── CTRL.png
│       ├── AGENT.png
│       ├── SAFE.png
│       ├── BTP.png
│       └── OData.png
│
└── archive/                                     🗄️ Old versions
    ├── game-content-old.md                      Original design spec
    ├── questions-and-mapping.md                 V1 (24Q, 2 options)
    ├── questions-v2-16q-3options.md             V2 (16Q, 3 options)
    ├── questions-v3-sap-pudong.md               V3 draft (CN only)
    ├── sbti-reference.html                      Reference code
    ├── Image 1.png                              SBTI screenshot
    └── Image 2.png                              SBTI screenshot
```

**Future structure (after development starts)**:
```
/Users/I549685/Documents/SAPTI/
├── docs/                    # Current markdown files
├── designs/                 # Design files from Stitch
└── impulse-keys/           # React project (to be created)
    ├── src/
    ├── public/
    └── ...
```

---

## 🛠️ **Technical Decisions Made**

### **Tech Stack**
- ✅ Frontend: React + Vite + TypeScript
- ✅ Styling: Tailwind CSS
- ✅ State: React Context / Zustand
- ✅ Data: Static JSON (no backend)
- ✅ Deployment: Vercel (using `npx vercel`)

### **Design Decisions**
- ✅ 16 questions (down from 24)
- ✅ 3 options per question (up from 2)
- ✅ Randomized question order
- ✅ Randomized option order
- ✅ Auto-advance (no "Next" button)
- ✅ Mobile-first design
- ✅ Bilingual (EN/CN)

### **Deployment Strategy**
- ✅ Use `npx vercel` (no global install needed)
- ✅ Free hosting
- ✅ Auto HTTPS + CDN
- ✅ Git-based deployment

---

## 🎯 **Success Metrics**

### **Quantitative**
- Completion rate > 70%
- Share rate > 30%
- Total participants > 300 (2 weeks post-launch)

### **Qualitative**
- User feedback: "很准" / "有共鸣"
- Becomes team discussion topic
- Used as team building tool

---

## 📊 **Timeline Summary**

```
Week 1 (Done)    : Research + Design + Validation         ✅
Week 2 (Current) : Visual Design (Stitch)                 🔄
Week 3           : Development (React project)            📝
Week 4           : Features + Testing                     📝
Week 5           : Deployment + Internal Testing          📝
Week 6           : Impulse26 Launch                       📝
Week 7-8         : Promotion + Iteration                  📝
```

---

## 🔗 **Key Links**

- **Figma**: https://www.figma.com/design/3ejEdYTzhXbf2tzINwX88G/Test-Claude
- **Vercel Docs**: https://vercel.com/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com

---

## 💡 **Key Insights & Decisions**

### **Why 16 questions instead of 24?**
- Faster completion (2-3 min vs 4-6 min)
- Better mobile experience
- Higher completion rate expected
- Still maintains 4 questions per dimension (balanced)

### **Why 3 options instead of 2?**
- Allows nuanced responses ("I'm in between")
- Reduces forced binary choices
- Better reflects real thinking patterns
- Still produces clear winners

### **Why randomization?**
- Fresh experience on retakes
- Prevents memorization
- Reduces order bias
- More scientific validity

### **Why SAP Pudong context?**
- Increases relatability and humor
- Creates shared in-jokes
- Makes it feel personalized
- Encourages internal sharing

---

## ⚠️ **Risks & Mitigations**

| Risk | Impact | Mitigation |
|------|--------|------------|
| Low completion rate | High | Keep test short (16Q), auto-advance |
| Results feel inaccurate | High | Internal playtest + iteration |
| Low sharing | Medium | Make results visually shareable, add humor |
| Technical issues at launch | High | Deploy 1 week early for testing |
| Low participation | Medium | Multi-channel promotion (Teams/Email/Posters) |

---

## 📞 **Stakeholders & Contacts**

- **Project Owner**: [User - I549685]
- **Target Audience**: SAP Pudong teams (PM, UX, Eng, QA)
- **Launch Event**: Impulse26
- **Location**: 上海浦东新区金科路 2688 号 (PVG01-06)

---

## 🔄 **Change Log**

### 2026-05-15

#### Morning (09:00-12:00)
- ✅ Completed all 16 result type definitions
- ✅ Researched MBTI/16 Personalities/SBTI patterns
- ✅ Defined 4-dimension model
- ✅ Created initial question bank (24Q, 2 options)

#### Afternoon (12:00-17:00)
- ✅ Optimized to 16Q with 3-option system
- ✅ Added SAP Pudong context (PVG01-06, 长泰广场, 汇智湖)
- ✅ Created complete bilingual questions (EN/CN)
- ✅ Validated all 16 result mappings
- ✅ Created Figma result cards (harmonized version)
- ✅ Analyzed SBTI technical implementation

#### Evening (17:00-19:00)
- ✅ Designed Result Page layout (Version A)
- ✅ Generated Google Stitch design prompt
- ✅ Set up Vercel deployment strategy (npx method)
- ✅ Created comprehensive project documentation
- ✅ Reorganized project files (created archive/, assets/ folders)
- ✅ Consolidated result definitions into single source (results.md)
- ✅ Archived game-content.md (moved to archive/game-content-old.md)
- ✅ Updated README.md and project-status.md

---

## 📝 **Notes for Future Iterations**

### **Potential V2 Features** (Post-Launch)
- [ ] Team comparison feature ("Your team is 40% VOC, 30% FIORI...")
- [ ] "Most compatible with" suggestions
- [ ] Result history tracking
- [ ] Multilingual support (beyond EN/CN)
- [ ] Integration with SAP internal systems
- [ ] Analytics dashboard for organizers

### **Content Enhancements**
- [ ] More questions (create question pool, random selection)
- [ ] Dynamic punchlines (rotate different humor for same result)
- [ ] "Famous SAP personalities" with this type
- [ ] Career path suggestions per type

---

*Document maintained by: Claude Code*  
*Project Location: /Users/I549685/Documents/SAPTI/*  
*Status: Active Development*
