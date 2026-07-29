# Questions Language Review - 题目用语审查

## 总体评估

✅ **优点：**
- 中英文双语覆盖完整
- 技术术语使用准确（Teams, HANA, Fiori, OData, API等）
- humor文本有趣且贴近SAP工作场景
- 选项表述清晰，便于选择

⚠️ **需要改进的地方：**

---

## 具体建议

### 1. A1 - 客户反馈场景

**当前：**
```
textCN: '一个客户在 Teams 上说："这个功能用起来不太方便。"'
```

**建议：** ✅ 保持不变（自然、地道）

---

### 2. A2 - Sprint Planning场景

**当前：**
```
textCN: 'Sprint Planning 前，PM 从 AHA 里拖出来 10 个用户故事，但没人知道优先级怎么定。'
```

**建议修改：**
```
textCN: 'Sprint Planning 前，PM 从 Aha! 里拖出来 10 个用户故事，但没人知道优先级怎么定。'
```
- **理由：** "AHA" 应该是 "Aha!"（产品管理工具的正确名称）

---

### 3. A3 - Edge Case场景

**当前：**
```
Option A humorCN: 'Edge case 往往是"被忽略的用户"的委婉说法。'
```

**建议：** ✅ 保持不变（深刻且贴切）

---

### 4. A4 - Dashboard优化

**当前：**
```
Option C humorCN: '没有决策目标的 dashboard 就是公司墙纸，好看但没用。'
```

**建议修改：**
```
humorCN: '没有决策目标的 dashboard 就是公司墙纸——好看但没用。'
```
- **理由：** 使用破折号更符合中文标点习惯

---

### 5. B1 - API错误消息

**当前：**
```
textCN: 'API 返回："Error Code 400_INVALID_REQUEST"。Developer 在 Teams 里问：这到底啥意思？'
```

**建议修改：**
```
textCN: 'API 返回："Error Code 400_INVALID_REQUEST"。开发在 Teams 里问：这到底啥意思？'
```
- **理由：** "Developer" 在中文语境中可以直接说"开发"更自然

---

### 6. B2 - Joule workflow场景

**当前：**
```
textEN: 'Joule generates a workflow, but a PM says: "This doesn\'t match our actual approval process."'
Option A humorEN: 'AI needs context. Without it, it\'s just a fancy autocomplete.'
```

**建议：** ✅ 保持不变（准确描述AI局限性）

---

### 7. B3 - 表单验证

**当前：**
```
Option A textCN: '精确显示哪个字段错了，为什么："邮箱格式不正确，请使用 xxx@domain.com 格式"'
```

**建议修改：**
```
textCN: '精确显示哪个字段错了，为什么错："邮箱格式不正确，请使用 xxx@domain.com 格式"'
```
- **理由：** 添加"为什么错"更完整

---

### 8. B4 - AI票据分配

**当前：**
```
Option A humorCN: '没有人类反馈的 AI，就是自信的随机数生成器。'
```

**建议：** ✅ 保持不变（幽默且准确）

---

### 9. C1 - 设计评审

**当前：**
```
textCN: '设计评审时，有人提议："我们要不要试试完全不同的交互模式？"'
```

**建议：** ✅ 保持不变

---

### 10. C2 - 打破用户习惯

**当前：**
```
Option C humorCN: '"能用就别动" - 直到它变成技术债。'
```

**建议修改：**
```
humorCN: '"能用就别动"——直到它变成技术债。'
```
- **理由：** 使用破折号更符合中文标点

---

### 11. C3 - 客户需求不符roadmap

**当前：**
```
Option C textCN: '解释为什么不符合 roadmap，建议 workaround 方案。'
```

**建议修改：**
```
textCN: '解释为什么不符合 Roadmap，建议替代方案。'
```
- **理由：** "workaround"在中文语境中说"替代方案"更自然

---

### 12. C4 - 新框架选择

**当前：**
```
Option C humorCN: '每个新框架都是一次赌博。有时候庄家会赢。'
```

**建议：** ✅ 保持不变（隐喻恰当）

---

### 13. D1 - 生产环境bug

**当前：**
```
Option A humorCN: '生产环境在燃烧的时候，sprint planning 可以等。'
```

**建议修改：**
```
humorCN: '生产环境在燃烧的时候，Sprint Planning 可以等。'
```
- **理由：** 统一"Sprint Planning"的大写格式

---

### 14. D2 - Demo时间压力

**当前：**
```
Option A textCN: '快速做个 prototype 用于 demo，之后再完善。'
Option A humorCN: 'Demo 驱动开发：这是真的存在的。'
```

**建议修改：**
```
textCN: '快速做个 Prototype 用于 Demo，之后再完善。'
humorCN: 'Demo 驱动开发——这是真实存在的。'
```
- **理由：** 
  - 统一术语大写
  - "真的存在的"改为"真实存在的"更准确

---

### 15. D3 - 核心模块重写

**当前：**
```
Option C humorCN: '永远不要重写能用的系统，除非你想知道为什么它当初要这么设计。'
```

**建议：** ✅ 保持不变（经典智慧）

---

### 16. D4 - 进度落后

**当前：**
```
Option C humorCN: '赶工导致 bug。Bug 导致救火。救火导致 burnout。'
```

**建议修改：**
```
humorCN: '赶工导致 Bug。Bug 导致救火。救火导致 Burnout。'
```
- **理由：** 统一术语大写

---

### 17. A5 - Excel导出需求

**当前：**
```
Option A humorCN: '你不是在说不。你在做需求考古，避免建一座没人拜的庙。'
```

**建议：** ✅ 保持不变（隐喻生动）

---

### 18. B5 - 确认消息设计

**当前：**
```
Option A humorCN: 'Transaction ID 是给日志看的，不是给赶着干活的人看的。'
```

**建议：** ✅ 保持不变（用户视角准确）

---

### 19. C5 - 拖拽vs表单

**当前：**
```
Option C humorCN: 'Design system 的存在是为了让我们不用每季度重复造 47 次轮子。'
```

**建议：** ✅ 保持不变（夸张但有效）

---

### 20. D5 - 测试vs上线

**当前：**
```
Option A humorCN: '生产环境是最好的测试环境。用户是不拿工资的 QA。'
```

**建议：** ✅ 保持不变（讽刺恰当，提醒风险）

---

## 术语一致性检查

### 需要统一的术语：

| 术语 | 当前用法 | 建议用法 | 位置 |
|------|---------|---------|------|
| AHA | 全部大写 | Aha! | A2题目 |
| workaround | 英文 | 替代方案 | C3-Option C |
| sprint planning | 小写 | Sprint Planning | D1 humor |
| prototype | 小写 | Prototype | D2选项 |
| demo | 小写 | Demo | D2选项 |
| bug | 小写 | Bug | D4 humor |
| burnout | 小写 | Burnout | D4 humor |

---

## 标点符号建议

### 中文破折号使用：

在以下位置将 " - " 改为 "——"：

1. A4 - Option C humor
2. C2 - Option C humor  
3. D2 - Option A humor
4. D5 - Option B humor

---

## 整体语气评估

✅ **符合目标受众（SAP员工）：**
- 技术术语使用准确
- SAP内部工具提及恰当（Teams, HANA, Fiori, Aha!, Jira, SharePoint）
- Humor文本接地气，反映真实工作场景
- 不过分正式，但也不过于随意

✅ **双语对照质量：**
- 中英文含义对应准确
- 文化适配良好（没有直译导致的不自然）
- Humor文本在两种语言中都有效

---

## 优先改进项（按重要性排序）

### 🔴 高优先级：
1. **A2** - 将"AHA"改为"Aha!"（品牌名称准确性）
2. **统一术语大写** - Sprint Planning, Prototype, Demo, Bug, Burnout

### 🟡 中优先级：
3. **中文标点** - 将" - "改为"——"（4处）
4. **B1** - "Developer"改为"开发"（更自然）
5. **C3** - "workaround"改为"替代方案"（更易理解）

### 🟢 低优先级：
6. **B3** - "为什么"改为"为什么错"（更完整）
7. **D2** - "真的存在的"改为"真实存在的"（更准确）

---

## 总结

当前题目整体质量很高，主要是术语一致性和标点符号的细微调整。建议优先处理高优先级的7项修改，可以立即提升专业性和可读性。
