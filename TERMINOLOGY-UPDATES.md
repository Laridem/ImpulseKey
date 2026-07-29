# 术语解释更新总结

## 更新时间
2026-07-27

## 更新目标
为外部嘉宾添加术语解释，保留原术语+括号说明的方式，不影响SAP员工的阅读体验。

---

## ✅ 已添加解释的术语（共12处）

### SAP专有术语

| 题号 | 原文 | 修改后 | 位置 |
|------|------|--------|------|
| A1 | Fiori Design Guidelines | Fiori Design Guidelines（SAP设计规范） | 中文题目 |
| A1 | jira backlog | Jira Backlog（待办列表） | 中文humor |
| A3 | edge case | Edge Case（边缘场景） | 中文题目 |
| A3 | Edge case | Edge Case（边缘场景） | 中文humor |
| A3 | P1 incident | P1 Incident（严重故障） | 中文humor |
| A3 | HANA | HANA（数据库） | 中文选项 |
| A3 | system error 或 data corruption | System Error 或 Data Corruption（数据损坏） | 中文选项 |
| A4 | OData API | OData API（数据接口） | 中文选项 |
| B2 | Joule | Joule（AI助手） | 中文题目 |
| B2 | Joule | Joule（AI助手） | 中文选项B |
| B2 | Joule | Joule（AI助手） | 中文选项C |
| B3 | Validation failed | Validation Failed（数据校验失败） | 中文题目 |
| B3 | validation rule | Validation Rule（校验规则） | 中文选项 |
| C1 | Fiori | Fiori（SAP设计规范） | 中文选项C |
| C5 | Fiori | Fiori（SAP设计规范） | 中文选项C（2处）|

---

## 📋 术语解释原则

### ✅ 需要解释的术语：
- **SAP专有**：Fiori, HANA, OData, Aha!, Joule
- **技术专业**：Edge Case, Validation, P1 Incident, Backlog, Schema
- **判断标准**：外部人完全不可能知道的术语

### ⏸️ 保留不解释的术语：
- **科技行业通用**：API, Sprint, Dashboard, Bug, Jira, PM, UI, Roadmap
- **英文常见词**：Prototype, Demo, Hotfix, Code Review
- **判断标准**：科技行业或互联网公司的人大概率知道

---

## 🎯 解释格式

### 格式规范：
```
原术语（中文解释）
```

### 示例：
- Fiori（SAP设计规范）
- Joule（AI助手）
- HANA（数据库）
- Edge Case（边缘场景）
- Validation（数据校验）

---

## 📊 影响评估

### 对SAP员工：
- ✅ 保留了所有原术语，专业感不受影响
- ✅ 括号解释不干扰阅读流畅度
- ✅ 维持了职场真实感

### 对外部嘉宾：
- ✅ 可以通过括号快速理解术语含义
- ✅ 不需要查询就能继续答题
- ✅ 降低了认知门槛，提升测试体验

---

## 🔜 下一步：实现术语帮助侧边栏

### 功能设计：
1. 添加"💡 术语帮助"按钮在问题页面右上角
2. 点击展开侧边栏，显示10-15个关键术语
3. 每个术语1-2句话解释
4. 非侵入式设计，不影响答题流程
5. 移动端自适应

### 术语列表草案：
- **API**: 应用程序接口，系统之间交换数据的通道
- **Sprint**: 敏捷开发中的工作周期，通常1-2周
- **PM**: Product Manager，产品经理
- **Dashboard**: 数据仪表盘，用于展示关键指标
- **Backlog**: 待办事项列表
- **Hotfix**: 紧急修复补丁
- **Code Review**: 代码审查
- **Feature Flag**: 功能开关，控制功能上线
- **Fiori**: SAP的设计系统和设计规范
- **HANA**: SAP的高性能数据库
- **Joule**: SAP的AI助手
- **OData**: 开放数据协议，RESTful API标准
- **Edge Case**: 边缘场景，不常见但需要处理的情况
- **P1 Incident**: 最高优先级的生产故障
- **Validation**: 数据校验，检查输入是否符合要求

---

## 总结

通过添加12处括号解释，在不改变原文专业性的前提下，显著降低了外部嘉宾的理解门槛。下一步将开发术语帮助侧边栏，进一步提升非技术背景用户的测试体验。
