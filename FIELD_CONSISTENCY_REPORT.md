# IMPULSE KEYS 字段一致性检查报告

**检查时间**: 2026-08-31  
**状态**: ⚠️ 发现重要不一致问题

---

## ✅ 检查通过的项目

### 1. ResultKey 定义一致性 ✅

**types.ts 定义的 ResultKey (16个)**:
```
VOC, FIORI, PIXEL, A11Y, JOULE, CTRL, AGENT, SAFE,
OData, BTP, CORE, API, QAQ, LOGS, TRIO, FIRE
```

**results.ts 实际定义 (16个)**:
```
VOC, FIORI, PIXEL, A11Y, JOULE, CTRL, AGENT, SAFE,
OData, BTP, CORE, API, QAQ, LOGS, TRIO, FIRE
```

✅ **完全匹配**

---

### 2. 维度Pole定义一致性 ✅

**PoleA (4个)**: Signal, Human, Explore, Spark  
**PoleB (4个)**: Solution, Machine, Align, Stabilize

**DimensionScores 接口 (8个)**:
```
Signal, Solution, Human, Machine, Explore, Align, Spark, Stabilize
```

✅ **完全匹配**

---

### 3. Questions.ts 维度分布 ✅

| 维度 | 题目数量 | Pole对 | 状态 |
|------|---------|--------|------|
| A | 5题 | Signal vs Solution | ✅ 正确 |
| B | 5题 | Human vs Machine | ✅ 正确 |
| C | 5题 | Explore vs Align | ✅ 正确 |
| D | 5题 | Spark vs Stabilize | ✅ 正确 |

**总计**: 20题，60个选项（每题3个）

✅ **维度分布均衡，Pole使用正确**

---

### 4. ColorGroup 基础定义 ✅

**定义的4个颜色组**:
- Magenta: `#A100C2`
- Yellow: `#FFC933`
- Cyan: `#64EDD2`
- Purple: `#7858FF`

**RESULT_COLOR_MAPPING 完整性**:
- ✅ 所有16个ResultKey都有颜色映射
- ✅ 每个颜色组有4个结果（完美平衡）

---

## ❌ 发现的问题

### 🚨 问题1: 颜色映射逻辑不一致

**问题描述**:

`colorGroups.ts` 中定义的颜色分组规则：
```
Magenta: Signal + Human    (维度A=S + 维度B=S)
Yellow:  Signal + Machine  (维度A=S + 维度B=H)
Cyan:    Solution + Human  (维度A=H + 维度B=S)
Purple:  Solution + Machine (维度A=H + 维度B=H)
```

**但实际的 RESULT_COLOR_MAPPING 与此规则不符！**

#### 不一致的映射（8个，占50%）

| ResultKey | 维度模式 | 前两位 | 应该的颜色 | 实际颜色 | 状态 |
|-----------|---------|--------|-----------|---------|------|
| PIXEL | SSHS | SS | Magenta | Yellow | ❌ |
| CTRL | SHSH | SH | Yellow | Magenta | ❌ |
| SAFE | SHHH | SH | Yellow | Cyan | ❌ |
| OData | HSSS | HS | Cyan | Purple | ❌ |
| BTP | HSSH | HS | Cyan | Yellow | ❌ |
| API | HSHH | HS | Cyan | Purple | ❌ |
| QAQ | HHSS | HH | Purple | Cyan | ❌ |
| TRIO | HHHS | HH | Purple | Cyan | ❌ |

#### 一致的映射（8个，仅占50%）

| ResultKey | 维度模式 | 前两位 | 颜色 | 状态 |
|-----------|---------|--------|------|------|
| VOC | SSSS | SS | Magenta | ✅ |
| FIORI | SSSH | SS | Magenta | ✅ |
| A11Y | SSHH | SS | Magenta | ✅ |
| JOULE | SHSS | SH | Yellow | ✅ |
| AGENT | SHHS | SH | Yellow | ✅ |
| CORE | HSHS | HS | Cyan | ✅ |
| LOGS | HHSH | HH | Purple | ✅ |
| FIRE | HHHH | HH | Purple | ✅ |

---

## 🔍 问题分析

### 可能的原因

#### 原因1: 设计意图不明确
颜色分组可能不是只基于维度A+B，而是考虑了更复杂的逻辑（如4个维度的综合特征）

#### 原因2: 手动映射错误
在手动分配颜色时，没有严格遵循"只看前两位"的规则

#### 原因3: 定义与实现脱节
`COLOR_GROUPS` 的描述（Signal + Human）与实际分组逻辑不一致

---

## 💡 解决方案

### 方案A: 修正映射，严格按维度A+B分组（推荐）

**优点**:
- 逻辑清晰，易于理解
- 符合现有文档描述
- 实现简单

**需要修改** `colorGroups.ts` 中的 `RESULT_COLOR_MAPPING`:

```typescript
export const RESULT_COLOR_MAPPING: Record<ResultKey, ColorGroup> = {
  // Magenta Group: Signal + Human (SS**)
  VOC: 'magenta',    // SSSS ✅ 已正确
  FIORI: 'magenta',  // SSSH ✅ 已正确
  PIXEL: 'magenta',  // SSHS ❌ 需改为 magenta（当前为 yellow）
  A11Y: 'magenta',   // SSHH ✅ 已正确

  // Yellow Group: Signal + Machine (SH**)
  JOULE: 'yellow',   // SHSS ✅ 已正确
  CTRL: 'yellow',    // SHSH ❌ 需改为 yellow（当前为 magenta）
  AGENT: 'yellow',   // SHHS ✅ 已正确
  SAFE: 'yellow',    // SHHH ❌ 需改为 yellow（当前为 cyan）

  // Cyan Group: Solution + Human (HS**)
  OData: 'cyan',     // HSSS ❌ 需改为 cyan（当前为 purple）
  BTP: 'cyan',       // HSSH ❌ 需改为 cyan（当前为 yellow）
  CORE: 'cyan',      // HSHS ✅ 已正确
  API: 'cyan',       // HSHH ❌ 需改为 cyan（当前为 purple）

  // Purple Group: Solution + Machine (HH**)
  QAQ: 'purple',     // HHSS ❌ 需改为 purple（当前为 cyan）
  LOGS: 'purple',    // HHSH ✅ 已正确
  TRIO: 'purple',    // HHHS ❌ 需改为 purple（当前为 cyan）
  FIRE: 'purple'     // HHHH ✅ 已正确
}
```

**需要修改的8个映射**:
1. PIXEL: yellow → magenta
2. CTRL: magenta → yellow
3. SAFE: cyan → yellow
4. OData: purple → cyan
5. BTP: yellow → cyan
6. API: purple → cyan
7. QAQ: cyan → purple
8. TRIO: cyan → purple

---

### 方案B: 更新文档，说明实际分组逻辑

**如果当前映射是有意为之**，需要更新 `COLOR_GROUPS` 的描述，说明颜色分组的真实规则。

**优点**:
- 不改变现有映射
- 保持已有的设计意图

**缺点**:
- 需要找出并文档化真实的分组规则
- 可能逻辑更复杂，难以向用户解释

---

### 方案C: 重新设计颜色分组系统

完全重新思考颜色分组的意义，可能考虑：
- 4个维度的综合特征
- 结果类型的实际工作特点
- 用户对颜色的感知

**优点**:
- 可能更符合实际语义
- 有机会优化用户体验

**缺点**:
- 工作量大
- 可能影响已有内容

---

## 🎯 推荐行动

### 立即行动：确认设计意图

**关键问题**：当前的颜色映射是**错误的**还是**有意的**？

1. **如果是错误** → 实施方案A，修正8个映射
2. **如果是有意** → 实施方案B，更新文档说明真实规则

### 验证方法

检查以下文件/资源：
- 设计文档或需求文档
- 之前的讨论记录
- 产品经理的意图
- 用户测试反馈

---

## 📊 影响评估

### 如果修正映射（方案A）

**影响范围**:
- ✅ 代码层面：只需修改1个文件（colorGroups.ts）
- ⚠️ 用户体验：已生成的结果卡片颜色会变化
- ⚠️ 已有截图/文档可能需要更新

**风险**:
- 低 - 修改简单直接
- 用户可能已经习惯当前颜色

**建议时机**:
- 📅 **上线前修正** - 如果还未正式发布
- ⏸️ **暂缓修正** - 如果已有用户使用，需评估影响

---

## ✅ 其他一致性检查

所有其他字段检查均通过：
- ✅ ResultKey 定义完整且一致
- ✅ Pole 定义完整且一致  
- ✅ 维度分布均衡
- ✅ Scores 字段使用正确的 Pole 名称
- ✅ 选项ID格式正确（A/B/C）
- ✅ 所有ResultKey都有颜色映射

---

## 📝 总结

### 严重程度：⚠️ 中等

**问题**: 颜色映射与文档描述不一致（50%不匹配率）

**影响**: 可能导致用户困惑，或内部逻辑不清晰

**紧急程度**: 
- 🔴 高 - 如果即将上线且追求完美一致性
- 🟡 中 - 如果已上线，需评估用户影响
- 🟢 低 - 如果当前映射是有意的设计

**建议**: 
1. 立即确认设计意图
2. 如果是错误，修正映射（方案A）
3. 如果是有意，更新文档（方案B）

---

**检查人员**: Claude (Sonnet 4.5)  
**最后更新**: 2026-08-31  
**下一步**: 等待设计决策
