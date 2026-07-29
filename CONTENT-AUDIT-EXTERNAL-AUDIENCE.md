# 内容审查报告 - 外部受众可理解性

## 🎯 目标
调整题库和用语，使外部嘉宾（非SAP员工）也能轻松理解

---

## 🔍 发现的SAP/技术特定术语

### 1. Personality Names 需要注释

#### ⚠️ 高优先级（完全SAP特定）

| Personality | 当前名称 | 问题 | 建议方案 |
|-------------|---------|------|---------|
| **FIORI** | Fiori Experience Guardian<br/>Fiori 体验守门员 | ❌ "Fiori"是SAP设计系统<br/>外部人员不知道 | ✅ 添加副标题<br/>"(Design System Guardian)" |
| **JOULE** | Joule Dream Weaver<br/>Joule 造梦师 | ❌ "Joule"是SAP的AI助手<br/>外部人员不知道 | ✅ 改为通用：<br/>"AI Copilot Dream Weaver"<br/>或添加注释 "(AI Assistant)" |
| **BTP** | Prototype Escape Artist<br/>原型逃生大师 | ⚠️ BTP = SAP Business Technology Platform<br/>但名字本身是通用的 | ✅ 保持名称<br/>❌ 避免内容中提BTP缩写 |
| **OData** | Process Contract Cartographer<br/>流程契约地图师 | ⚠️ OData是特定协议<br/>但名字本身是通用的 | ✅ 保持名称<br/>✅ 内容改为"API契约" |
| **CORE** | Clean Core Monk<br/>Clean Core 修行僧 | ❌ "Clean Core"是SAP特定概念 | ✅ 改为：<br/>"Clean Architecture Monk"<br/>或 "Technical Debt Guardian" |
| **HPOM** | HPOM Alignment Summoner<br/>HPOM 对齐召唤师 | ❌ HPOM = Human, Product, Operation, Market<br/>SAP内部术语 | ✅ 改为：<br/>"Cross-Functional Alignment Summoner"<br/>在描述中解释HPOM |

---

### 2. Personality Content 需要调整

#### FIORI - Fiori Experience Guardian

**当前问题：**
```
signalEN: "Consistency, usability, accessibility, and interaction patterns are product quality."
```

**建议：**
✅ 保持通用，已经很好
✅ 添加副标题说明

---

#### JOULE - Joule Dream Weaver

**当前问题：**
```
mottoEN: "AI can generate code. You create the future."
signalEN: "Generative AI is an opportunity to rethink workflows..."
punchlineEN: "You see Joule as a co-pilot. Others see it as a chatbot."
```

**建议：**
```
punchlineEN: "You see AI as a co-pilot. Others see it as a chatbot."
# 去掉"Joule"，改为通用"AI"
```

---

#### CORE - Clean Core Monk

**当前问题：**
```
signalEN: "Clean Core is not a restriction. It is a strategy..."
pulseEN: "...what should be in Clean Core, what should be an extension..."
signalLongEN: "...Clean Core isn't a rulebook to you. It's an investment strategy."
```

**建议：**
```
signalEN: "Clean architecture is not a restriction. It's a strategy to keep customizations maintainable."
pulseEN: "You can distinguish: what should stay in the core system, what should be an extension, and what shouldn't exist at all."
```

---

#### OData - Process Contract Cartographer

**当前问题：**
```
mottoEN: "Data models and process flows are not backend concerns. They are product architecture."
```

**建议：**
✅ 已经很通用！无需修改
✅ 名字保持"Process Contract"，避免提"OData"

---

#### HPOM - Alignment Summoner

**当前问题：**
```
mottoEN: "Products fail when H, P, O, M speak different languages."
pulseEN: "You can sense: where Human (UX), Product (PM), Operation (Eng), and Market are misaligned."
```

**建议：**
```
nameEN: "Cross-Functional Alignment Summoner"
mottoEN: "Products fail when UX, Product, Engineering, and Market speak different languages."
pulseEN: "You can sense: where Human experience (UX), Product (PM), Operations (Engineering), and Market are misaligned."
# 首次出现时展开HPOM
```

---

### 3. Questions 中的术语

让我检查问题库...

---

## 📊 优先级建议

### 🔴 高优先级（必须改）

1. **FIORI** → 添加副标题 `(Design System Guardian)`
2. **JOULE** → 改名为 `AI Copilot Dream Weaver` 或添加 `(AI Assistant)`
3. **CORE** → 改名为 `Clean Architecture Monk` 或 `Technical Debt Guardian`
4. **HPOM** → 改名为 `Cross-Functional Alignment Summoner`
5. **JOULE punchline** → 去掉 "Joule"，改为 "AI"

### 🟡 中优先级（建议改）

6. **CORE content** → "Clean Core" → "Clean Architecture"
7. **OData name** → 保持，但避免内容提"OData"
8. **BTP name** → 保持 "Prototype Escape Artist"

### 🟢 低优先级（可选）

9. 添加一个glossary页面解释专业术语
10. 在结果页面添加tooltips

---

## 💡 实施方案

### 方案A：最小改动（快速）
- 仅修改最明显的名称
- 添加括号注释
- 时间：30分钟

### 方案B：适度重命名（推荐）
- 重命名4-5个personalities
- 调整内容中的术语
- 时间：1-2小时

### 方案C：完全通用化
- 所有SAP特定术语改为行业通用
- 添加glossary
- 时间：2-3小时

---

## 🎯 推荐行动

**立即执行（方案B）：**

1. ✅ FIORI → 添加副标题 `Fiori (Design System) Experience Guardian`
2. ✅ JOULE → 改为 `AI Copilot Dream Weaver`，内容去掉"Joule"
3. ✅ CORE → 改为 `Clean Architecture Monk`，内容"Clean Core" → "clean architecture"
4. ✅ HPOM → 改为 `Cross-Functional Alignment Summoner`，首次展开缩写
5. ✅ 检查questions.ts中是否有SAP特定术语

**稍后考虑：**
- 添加glossary页面（/glossary路由）
- 在personality卡片上添加tooltip解释
- 在Landing页面添加一句"适合所有产品团队"的说明

---

需要我现在开始实施这些修改吗？
