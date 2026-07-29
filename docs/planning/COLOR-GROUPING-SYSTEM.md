# IMPULSE KEYS - Color Grouping System

**Created**: 2026-07-23  
**Status**: Design Proposal

## 🎨 Official Impulse26 Colors

```css
--magenta: #A100C2;   /* 紫红/洋红 */
--yellow: #FFC933;     /* 亮黄色 */
--cyan: #64EDD2;       /* 青绿色 */
--purple: #7858FF;     /* 蓝紫色 */
```

## 📊 Color Grouping Logic

### Mapping Strategy: First Two Dimensions

16 personalities grouped by the combination of:
1. **Signal vs Solution** (主动发现 vs 被动响应)
2. **Human vs Machine** (人本 vs 技术)

This creates 4 natural clusters (2x2 = 4 groups, 4 personalities each).

---

## 🎯 The 4 Color Groups

### 🟣 Group 1: MAGENTA `#A100C2`
**Dimension**: Signal + Human  
**Philosophy**: 主动发现用户需求，以人为本

| Code | Name | Description |
|------|------|-------------|
| **VOC** | Voice of Customer | 用户之声 - 最纯粹的用户洞察者 |
| **FIORI** | Fiori Design Master | 设计大师 - 用户体验的践行者 |
| **A11Y** | Accessibility Champion | 无障碍倡导者 - 为所有人设计 |
| **CTRL** | Controller | 控制大师 - 用户掌控感的守护者 |

**Group Trait**: "We listen, we care, we design for humans"

---

### 🟡 Group 2: YELLOW `#FFC933`
**Dimension**: Signal + Machine  
**Philosophy**: 主动创新技术，智能驱动体验

| Code | Name | Description |
|------|------|-------------|
| **PIXEL** | Pixel Perfect | 像素完美主义者 - 技术与美学的结合 |
| **JOULE** | Joule AI Expert | AI专家 - 智能化的先锋 |
| **AGENT** | AI Agent Builder | Agent构建者 - 自动化的艺术家 |
| **BTP** | BTP Architect | 平台架构师 - 云端的设计者 |

**Group Trait**: "We innovate, we automate, we amplify with AI"

---

### 🔷 Group 3: CYAN `#64EDD2`
**Dimension**: Solution + Human  
**Philosophy**: 稳定响应需求，人性化解决问题

| Code | Name | Description |
|------|------|-------------|
| **CORE** | Core Value Guardian | 核心价值守护者 - 业务的基石 |
| **QAQ** | Quality Assurance Queen | 质量女王 - 可靠性的保证 |
| **SAFE** | Safety First | 安全第一 - 风险的控制者 |
| **TRIO** | Trinity Balance | 三位一体 - 平衡的艺术 |

**Group Trait**: "We stabilize, we protect, we deliver reliability"

---

### 🟪 Group 4: PURPLE `#7858FF`
**Dimension**: Solution + Machine  
**Philosophy**: 系统化响应，技术架构优先

| Code | Name | Description |
|------|------|-------------|
| **OData** | OData Specialist | 数据接口专家 - 系统间的桥梁 |
| **API** | API Guru | API大师 - 技术对接的艺术 |
| **LOGS** | Log Detective | 日志侦探 - 问题的追踪者 |
| **FIRE** | Firefighter | 救火队长 - 系统危机的终结者 |

**Group Trait**: "We architect, we integrate, we troubleshoot systems"

---

## 🎨 Visual Design Guidelines

### 1. Result Page Display
```
┌─────────────────────────────┐
│  🟣 紫红系                   │
│  你是 VOC - Voice of Customer │
│  主动发现用户需求，以人为本     │
└─────────────────────────────┘
```

### 2. Keycap Gallery Layout
```
┌─────────────────────────────┐
│  🟣 MAGENTA GROUP            │
│  [VOC] [FIORI] [A11Y] [CTRL] │
└─────────────────────────────┘
┌─────────────────────────────┐
│  🟡 YELLOW GROUP             │
│  [PIXEL] [JOULE] [AGENT] [BTP]│
└─────────────────────────────┘
┌─────────────────────────────┐
│  🔷 CYAN GROUP               │
│  [CORE] [QAQ] [SAFE] [TRIO]  │
└─────────────────────────────┘
┌─────────────────────────────┐
│  🟪 PURPLE GROUP             │
│  [OData] [API] [LOGS] [FIRE] │
└─────────────────────────────┘
```

### 3. Color Application

**Primary Use**: Background color of personality cards
**Secondary Use**: Border/accent colors
**Text**: White (#FFFFFF) for sufficient contrast

```css
/* Magenta Group */
.personality-magenta {
  background: #A100C2;
  color: #FFFFFF;
}

/* Yellow Group */
.personality-yellow {
  background: #FFC933;
  color: #000000; /* Black text for better contrast */
}

/* Cyan Group */
.personality-cyan {
  background: #64EDD2;
  color: #000000; /* Black text for better contrast */
}

/* Purple Group */
.personality-purple {
  background: #7858FF;
  color: #FFFFFF;
}
```

### 4. Progress Bar Enhancement
Show color transitions as user progresses through questions:
```
Q1-4:  Magenta → Yellow (Signal dimension)
Q5-8:  Yellow → Cyan (Human/Machine dimension)
Q9-12: Cyan → Purple (Explore/Align dimension)
Q13-16: Purple → Magenta (Spark/Stabilize dimension)
```

### 5. Share Card Design
Each result's share image uses its group color as:
- Background or border
- Accent elements
- Category badge

---

## 🔄 Alternative Grouping Option

If you prefer different mapping logic, here's an alternative based on **work style**:

| Color | Work Style | Personalities |
|-------|-----------|---------------|
| 🟣 Magenta | **User-Facing** | VOC, FIORI, A11Y, CTRL |
| 🟡 Yellow | **Innovation** | PIXEL, JOULE, AGENT, BTP |
| 🔷 Cyan | **Quality & Safety** | CORE, QAQ, SAFE, TRIO |
| 🟪 Purple | **Technical Integration** | OData, API, LOGS, FIRE |

---

## 📋 Implementation Checklist

### Phase 1: Data Layer
- [ ] Add `colorGroup` field to personality definitions
- [ ] Map each of 16 personalities to one of 4 colors
- [ ] Update TypeScript types

### Phase 2: Visual Components
- [ ] Update ResultPage to show color group badge
- [ ] Refactor KeycapGallery to group by color
- [ ] Add color-coded progress bar
- [ ] Update personality cards with group colors

### Phase 3: Copy & Content
- [ ] Add group descriptions (EN/ZH)
- [ ] Update result page copy to mention color group
- [ ] Add "你是X色系的" messaging

### Phase 4: Testing
- [ ] Verify color contrast (WCAG AA)
- [ ] Test on mobile devices
- [ ] Validate bilingual content
- [ ] Check share image rendering

---

## 🎯 Benefits of This System

1. **Cognitive Simplification**: 16 → 4 → 1 hierarchy
2. **Visual Identity**: Each group has distinct personality
3. **Brand Consistency**: Uses official Impulse26 colors
4. **Shareability**: "I'm in the Magenta group!" more memorable
5. **Educational**: Groups reveal dimensional patterns
6. **Scalability**: Easy to explain and remember

---

## 📝 Next Steps

1. **Validate grouping logic** with stakeholders
2. **Choose preferred mapping** (dimensional vs. work-style)
3. **Design mockups** for new color-grouped UI
4. **Update codebase** with color system
5. **Test with users** for clarity and appeal

---

*Aligned with Impulse26 Design Festival 2026 visual identity*
