# Questions库 SAP术语审查

## 🔍 发现的问题

### Question中的SAP特定术语

#### 1. **Fiori Design Guidelines** (出现3次)
```
❌ "Open Fiori Design Guidelines and check if the current design meets standards."
❌ "打开 Fiori Design Guidelines，检查当前设计是否符合标准。"
```

**建议修改：**
```
✅ "Open the design system guidelines and check if the current design meets standards."
✅ "打开设计系统规范，检查当前设计是否符合标准。"
```

---

#### 2. **OData API**
```
❌ "Which KPIs and filters do we need? Let me check if the OData API supports them."
❌ "需要加哪些 KPI、filter 功能？我看看 OData API 支持不支持。"
```

**建议修改：**
```
✅ "Which KPIs and filters do we need? Let me check if the API supports them."
✅ "需要加哪些 KPI、filter 功能？我看看 API 支持不支持。"
```

---

#### 3. **SAP Wiki**
```
❌ "检查 API contract、OpenAPI spec、SAP Wiki 文档，确保三者一致。"
```

**建议修改：**
```
✅ "检查 API contract、OpenAPI spec、内部文档，确保三者一致。"
or
✅ "检查 API contract、OpenAPI spec、团队文档，确保三者一致。"
```

---

#### 4. **Joule** (出现4次)
```
❌ "Joule generates a workflow, but a PM says..."
❌ "Joule 生成了一个 workflow，但 PM 说..."
❌ "Improve prompts and check if Joule can connect..."
❌ "改进 prompt，同时检查 Joule 能否接入..."
❌ "Check if workflow data model and API schema support Joule integration."
❌ "检查 workflow 数据模型和 API schema 是否支持 Joule 对接。"
```

**建议修改：**
```
✅ "The AI assistant generates a workflow, but a PM says..."
✅ "AI 助手生成了一个 workflow，但 PM 说..."
✅ "Improve prompts and check if the AI can connect..."
✅ "改进 prompt，同时检查 AI 能否接入..."
✅ "Check if workflow data model and API schema support AI integration."
✅ "检查 workflow 数据模型和 API schema 是否支持 AI 对接。"
```

---

#### 5. **Fiori principles / patterns** (出现2次)
```
❌ "Check if the new pattern is consistent with Fiori design principles."
❌ "先检查新模式是否符合 Fiori 设计原则。"
❌ "...but ensure drag-and-drop uses Fiori interaction patterns..."
❌ "...但如果选拖拽，确保使用 Fiori 交互模式。"
```

**建议修改：**
```
✅ "Check if the new pattern is consistent with your design system principles."
✅ "先检查新模式是否符合设计系统原则。"
✅ "...but ensure drag-and-drop uses the design system's interaction patterns..."
✅ "...但如果选拖拽，确保使用设计系统的交互模式。"
```

---

#### 6. **Fiori guidelines**
```
❌ "Your team prototyped a drag-and-drop workflow builder, but Fiori guidelines recommend..."
❌ "你的团队做了一个拖拽式流程构建器的 prototype，但 Fiori 指南推荐..."
❌ "Follow Fiori guidelines and use the form-based pattern."
❌ "遵循 Fiori 指南，使用表单式模式。"
```

**建议修改：**
```
✅ "...but your design system guidelines recommend..."
✅ "...但设计系统指南推荐..."
✅ "Follow the design system guidelines and use the form-based pattern."
✅ "遵循设计系统指南，使用表单式模式。"
```

---

## 📊 统计

| 术语 | 出现次数 | 优先级 |
|------|---------|--------|
| Fiori | 7次 | 🔴 高 |
| Joule | 4次 | 🔴 高 |
| OData | 1次 | 🟡 中 |
| SAP Wiki | 1次 | 🟡 中 |

---

## 🎯 替换策略

### 统一替换规则：

1. **Fiori** → **design system** / **设计系统**
2. **Joule** → **AI assistant** / **AI 助手** or **the AI** / **AI**
3. **OData API** → **API**
4. **SAP Wiki** → **internal documentation** / **内部文档** or **team wiki** / **团队文档**

---

## ✅ 实施清单

- [ ] 替换所有"Fiori"为"design system"（7处）
- [ ] 替换所有"Joule"为"AI assistant/AI"（4处）
- [ ] 替换"OData API"为"API"（1处）
- [ ] 替换"SAP Wiki"为"internal documentation"（1处）
- [ ] 测试所有question的可读性
- [ ] 确保中英文一致性

---

需要我现在开始批量替换这些术语吗？
