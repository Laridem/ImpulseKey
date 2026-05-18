# IMPULSE KEYS - Question Bank V3 (SAP浦东版 - 接地气版本)

> **V3 更新**:
> - 融入SAP浦东办公区真实场景（金科路、PVG01-06、长泰广场、汇智、汇智湖）
> - 加入日常工具梗（Jira、AHA、Teams、Outlook、SAP Wiki、SharePoint）
> - 更多SAP产品名称和内部黑话
> - 保持16题3选项结构
> - 更接地气的黑色幽默

---

## 完整题库 (16 Questions - SAP浦东定制版)

### Dimension A: Signal vs Solution (4 questions)

#### Q1 (Signal vs Solution)
**场景**: 一个客户在 Teams 上说："这个功能用起来不太方便。"

**你的第一反应是？**

- **A (+2 Signal)**: 约个会深挖：在什么场景下不方便？具体卡在哪个步骤？
  - *黑色幽默: "Tell me more." 然后你开始做案发现场还原，客户开始后悔说了这句话。*
  
- **B (+1 Signal, +1 Solution)**: 先看看现有的 process flow，再问用户具体痛点。
  - *黑色幽默: 先看设计图，再听吐槽。两手都要硬。*
  
- **C (+2 Solution)**: 打开 Fiori Design Guidelines，检查当前设计是否符合标准。
  - *黑色幽默: 你发现这不是 bug，这是"祖传设计"。已经在 SharePoint 里躺了三年。*

---

#### Q2 (Signal vs Solution)
**场景**: Sprint Planning 前，PO 从 AHA 里拖出来 10 个用户故事，但没人知道优先级怎么定。

**你会？**

- **A (+2 Signal)**: 把这些 story 按用户痛点、角色、使用场景重新聚类。
  - *黑色幽默: Quote 不等于 insight。需要有人受苦做 synthesis。*
  
- **B (+1 Signal, +1 Solution)**: 先聚类痛点，再看技术依赖和工作量，综合排序。
  - *黑色幽默: 既要看用户急不急，也要看 backend API 搞不搞得定。*
  
- **C (+2 Solution)**: 直接看哪些能复用现有 API，哪些要改 data model，按技术风险排优先级。
  - *黑色幽默: 没 owner 的 insight 最后都变成 SharePoint 里的装饰品。*

---

#### Q3 (Signal vs Solution)
**场景**: 测试发现一个 edge case：当用户名字超过 50 个字符时，UI 会错位。

**你觉得怎么处理？**

- **A (+2 Signal)**: 先问 PM：现实中有多少用户名字会超过 50 字符？影响多少人？
  - *黑色幽默: Edge case 往往是"被忽略的用户"的委婉说法。*
  
- **B (+1 Signal, +1 Solution)**: 看用户数据 + 查生产日志，评估影响面和崩溃风险。
  - *黑色幽默: 有些 edge case 用户很少，但一旦触发就是 P1 incident。*
  
- **C (+2 Solution)**: 查 HANA 日志，看这个 case 是否会导致 system error 或 data corruption。
  - *黑色幽默: 小 bug 在生产环境长得很快。特别是周五下午发现的那种。*

---

#### Q4 (Signal vs Solution)
**场景**: Stakeholder 在 Outlook 会议邀请里写："我们需要优化这个 dashboard。"

**你会怎么回？**

- **A (+2 Signal)**: 回复："能具体说说，用户想用这个 dashboard 做什么决策吗？"
  - *黑色幽默: "优化"是一种症状，不是需求。需要做需求考古。*
  
- **B (+1 Signal, +1 Solution)**: 先问用户目标，再列出可能的优化方向（性能/可读性/交互）。
  - *黑色幽默: Dashboard 既要有灵魂（用户目标），也要有肉体（加载速度）。*
  
- **C (+2 Solution)**: 回复："需要加哪些 KPI、filter、drill-down 功能？我看看 OData API 支持不支持。"
  - *黑色幽默: 没有决策目标的 dashboard 就是公司墙纸，好看但没用。*

---

### Dimension B: Human vs Machine (4 questions)

#### Q5 (Human vs Machine)
**场景**: API 调用成功了，但返回的 error message 是："Error Code 400_INVALID_REQUEST"。Developer 在 Teams 里问：这到底啥意思？

**你的反应？**

- **A (+2 Human)**: 改成人话："请求参数缺少必填字段 'approver'，请检查 request body。"
  - *黑色幽默: Developer 也是 user，只是他们更会截图发 Jira ticket。*
  
- **B (+1 Human, +1 Machine)**: 改善 message 的同时，确保 status code、API doc、Postman example 都对得上。
  - *黑色幽默: 好的 DX 需要同理心 + 契约精确度。两个都不能少。*
  
- **C (+2 Machine)**: 检查 API contract、OpenAPI spec、SAP Wiki 文档，确保三者一致。
  - *黑色幽默: "400 Bad Request" 不是 error message，是一种情绪状态。*

---

#### Q6 (Human vs Machine)
**场景**: Joule 给出了一个采购建议，confidence score 95%，但用户看了一脸懵。

**你首先检查什么？**

- **A (+2 Human)**: 用户能不能理解 Joule 的推荐逻辑？能不能手动改？能不能看到数据来源？
  - *黑色幽默: AI 很自信。用户有 PTSD。*
  
- **B (+1 Human, +1 Machine)**: 既看用户理解度，也查 Joule 用了哪些 data source 和 permission。
  - *黑色幽默: Trust 需要透明度和准确度。少一个都不行。*
  
- **C (+2 Machine)**: 检查 Joule 的 data pipeline、permission model、training data 是不是最新的。
  - *黑色幽默: AI 说得越像人话，你越想知道它是从哪学的。*

---

#### Q7 (Human vs Machine)
**场景**: UI 在 Figma 里看着挺好，但上到 dev 环境后，总觉得哪里不对劲。

**你会检查？**

- **A (+2 Human)**: Spacing 对不对齐、文案有没有歧义、视觉层级清不清楚。
  - *黑色幽默: 只差 2px，但这是混乱的开端。*
  
- **B (+1 Human, +1 Machine)**: 看视觉 + 看数据状态（loading、error、empty state）有没有都覆盖。
  - *黑色幽默: 有时候是 UI 的问题，有时候是 missing error state 的问题。*
  
- **C (+2 Machine)**: 检查这个页面的 data binding、workflow state、OData response 对不对。
  - *黑色幽默: Layout 没问题。是底层 process logic 在尖叫。*

---

#### Q8 (Human vs Machine)
**场景**: 有人提议："让 AI Agent 自动审批 5000 块以下的采购申请。"

**你第一个担心的是？**

- **A (+2 Human)**: 用户能看到 AI 的审批依据吗？不同意的话能手动推翻吗？
  - *黑色幽默: AI 可以帮忙，但不用变成所有人的新 manager。*
  
- **B (+1 Human, +1 Machine)**: 既要保证用户能控制，也要定义清楚 agent 的权限边界和 audit log。
  - *黑色幽默: 好的 automation 需要方向盘（用户控制）和刹车（系统边界）。*
  
- **C (+2 Machine)**: Agent 的 permission model、escalation rule、audit trail、rollback 机制是什么？
  - *黑色幽默: Agent 可以跑，但不能裸奔。*

---

### Dimension C: Explore vs Align (4 questions)

#### Q9 (Explore vs Align)
**场景**: 会议室（PVG03-8F-Meeting Room 3）里，团队已经争论了 30 分钟，但还是没结论。

**你会？**

- **A (+2 Explore)**: 说："我们别说了，我下午做个 clickable prototype，明天大家看着原型讨论。"
  - *黑色幽默: 语言已经失效了。Prototype 会说话。*
  
- **B (+1 Explore, +1 Align)**: 快速画个草图 + 定个评判标准："我们先看长泰广场吃饭回来的原型，然后按这三个标准投票。"
  - *黑色幽默: Show, don't just tell. 但要先说好怎么算"好"。*
  
- **C (+2 Align)**: 说："我们先定好决策标准：性能、开发成本、用户体验。然后按标准讨论。"
  - *黑色幽默: 没有标准的会议就是 opinion yoga。*

---

#### Q10 (Explore vs Align)
**场景**: PM、UX、Engineering 三方对同一个 feature 的理解完全不一样。开完会各回各的楼层（PVG01 vs PVG03）。

**你会？**

- **A (+2 Explore)**: 快速拉个 alignment session，大家一起过一遍用户流程和价值。
  - *黑色幽默: 早期 align 很无聊，但返工很刺激。*
  
- **B (+1 Explore, +1 Align)**: 先对齐用户问题，再写个 decision log 发 Teams，明确 scope、owner、timeline。
  - *黑色幽默: 先说"为什么"，再定"谁"和"什么"。*
  
- **C (+2 Align)**: 立刻开 Jira，写清楚：scope、owner、dependency、risk、decision log。
  - *黑色幽默: 没有 decision log，每个人都有自己版本的"会议结论"。*

---

#### Q11 (Explore vs Align)
**场景**: Stakeholder 在 AHA 里写了个需求："Make the flow more intuitive."

**你怎么办？**

- **A (+2 Explore)**: 约几个真实用户做 usability test，看他们卡在哪里。
  - *黑色幽默: "Intuitive" 是"我也不知道要啥，但我看到就知道"的代号。*
  
- **B (+1 Explore, +1 Align)**: 做 user test + 让 stakeholder 给出"intuitive"的具体例子。
  - *黑色幽默: User testing + 清晰标准 = 真正的进展。*
  
- **C (+2 Align)**: 回邮件："能给几个你觉得 intuitive 的例子吗？我们需要具象化一下。"
  - *黑色幽默: 一个人的 intuitive 是另一个人的 mystery meat navigation。*

---

#### Q12 (Explore vs Align)
**场景**: 一个 feature 需要 S4、Ariba、SuccessFactors 三个产品的 team 输入，但没人拍板。

**你会？**

- **A (+2 Explore)**: 先做个 prototype proposal，让大家看到具体方案，然后讨论决策点。
  - *黑色幽默: 有时候需要一个"反派"（prototype）来让英雄们团结。*
  
- **B (+1 Explore, +1 Align)**: 起草方案 + 明确谁是 decision owner，发 Teams 里 @相关人。
  - *黑色幽默: 好的想法需要内容（proposal）和决策者（owner）。*
  
- **C (+2 Align)**: 先定 decision owner、stakeholder list、approval criteria，写进 Jira。
  - *黑色幽默: 没有 owner 的决策会变成永恒的会议。*

---

### Dimension D: Spark vs Stabilize (4 questions)

#### Q13 (Spark vs Stabilize)
**场景**: 客户问："为什么 Joule 不能自动帮我填这个表单？"

**你的反应？**

- **A (+2 Spark)**: 脑子里已经开始画 AI-assisted workflow 的草图了。
  - *黑色幽默: 每个 limitation 都是 AI opportunity。你已经在想三年后的产品路线图了。*
  
- **B (+1 Spark, +1 Stabilize)**: 先问现在手动填表单的痛点是什么，再考虑 AI 能不能真的解决。
  - *黑色幽默: 梦想要大，但先验证问题是不是真的存在。*
  
- **C (+2 Stabilize)**: 先看现在的手动流程痛点在哪，是不是真的需要 AI，还是只是需要更好的 UI。
  - *黑色幽默: AI 很好。但有时候用户只是想要一个更好的按钮。*

---

#### Q14 (Spark vs Stabilize)
**场景**: Sprint 已经开始了，但 user story 的价值还是很模糊。开发已经在 PVG06 写代码了。

**你建议？**

- **A (+2 Spark)**: 看看哪些部分还能调整，在不炸 sprint 的前提下快速优化。
  - *黑色幽默: Sprint 已经在跑了。请不要在没有计划的情况下站在它前面。*
  
- **B (+1 Spark, +1 Stabilize)**: 如果还能调，就快速调。如果调不了，就记录到 backlog 下个 sprint 改。
  - *黑色幽默: 有些时候能刹车。有些时候只能拿小本本记下来。*
  
- **C (+2 Stabilize)**: Pause sprint，把 user story 的价值讲清楚再继续写代码。
  - *黑色幽默: 快速朝错误方向前进，还是快速前进。*

---

#### Q15 (Spark vs Stabilize)
**场景**: 有人提出一个创意 workaround："我们可以用 BTP 上的 Cloud Function 绕过 S/4 的这个限制，这周就能上线。"

**你的第一反应？**

- **A (+2 Spark)**: "可以试试，快速验证一下，学习成本不高。"
  - *黑色幽默: Ship now, refactor later. （旁白：他们再也没有 refactor。）*
  
- **B (+1 Spark, +1 Stabilize)**: "可以试，但要写清楚 migration plan，别让它变成祖传逻辑。"
  - *黑色幽默: Shortcut 可以走，但要有出口标识。*
  
- **C (+2 Stabilize)**: "今天的捷径是明天迁移时的坑。我们还是按 Clean Core 原则来吧。"
  - *黑色幽默: 每个脏 workaround 都梦想长成 legacy code。*

---

#### Q16 (Spark vs Stabilize)
**场景**: Roadmap 看起来很美好，但 ServiceNow 里的 incident ticket 和 support escalation 讲了另一个故事。

**你会？**

- **A (+2 Spark)**: 把 support 的信号带回 product discovery，看看 roadmap 是不是要调整。
  - *黑色幽默: Roadmap 很乐观。客户很具体。*
  
- **B (+1 Spark, +1 Stabilize)**: 听客户反馈 + 看 HANA 日志里的 pattern，综合判断。
  - *黑色幽默: 听客户说。信日志数据。两个都做。*
  
- **C (+2 Stabilize)**: 去翻 Kibana 日志和 incident timeline，看生产环境到底发生了什么。
  - *黑色幽默: 日志是产品日记，只是没人想公开发表。*

---

## SAP浦东梗 - 完整版本

### 办公场景梗
- **金科路 2688 号**：SAP 中国浦东总部
- **PVG01-06**：6 栋办公楼，不同 team 分散在不同楼
- **会议室命名**：PVG03-8F-Meeting Room 3（精确到楼层和房间号）
- **跨楼协作**：PVG01 的 PM 和 PVG06 的 Engineer 开会需要走很远

### 午餐 & 散步梗
- **长泰广场**：最常去的商场，各种餐厅（金鼎轩、海底捞、星巴克）
- **汇智**：汇智国际商业中心，另一个吃饭选择
- **汇智湖**：午休散步的地方，环湖步道
- **楼下便利店**：罗森/全家，下午茶续命站

### 工具梗
- **Jira**：Bug tracking 和 sprint planning 的地方，ticket 永远关不完
- **AHA**：产品 roadmap 和 feature planning 工具
- **Teams**：日常沟通、会议、救火都在这
- **Outlook**：会议轰炸的来源，日历永远是红的
- **SAP Wiki / Confluence**：文档墓地，信息很全但找不到
- **SharePoint**：文件存储，"祖传文档"都在这
- **ServiceNow**：Incident 和 support ticket 系统
- **HANA / Kibana**：生产日志查询
- **Postman**：API 测试必备

### SAP 产品梗
- **S/4HANA**：ERP 核心产品
- **Fiori**：SAP 的 UI/UX 设计系统
- **BTP (Business Technology Platform)**：云平台
- **Joule**：SAP 的 AI copilot
- **Ariba**：采购管理
- **SuccessFactors**：HR 管理
- **SAP Analytics Cloud**：BI 工具
- **Clean Core**：可扩展架构原则，工程师的信仰

### 内部黑话
- **Golden Path**：标准化的最佳实践
- **Tech Debt**：技术债，永远还不完
- **P1 Incident**：最高优先级的生产事故
- **Sprint Planning**：两周一次的"讨价还价"
- **Backlog Grooming**：需求池整理（一个永远干不完的活）
- **Go-Live**：产品上线
- **Hotfix**：紧急修复，通常发生在周五下午
- **Edge Case**：边缘场景（常被忽略，直到生产环境爆炸）

---

## 使用建议

### 幽默度把控
- **安全的幽默**：工具吐槽、流程调侃、技术梗
- **避免的内容**：个人攻击、敏感话题、部门矛盾
- **基调**：自嘲式幽默，IT 人的共鸣

### 文化融合
- **中英混用**：符合实际工作语境
- **产品名称**：保持官方命名（Joule, Fiori, BTP）
- **地名真实**：金科路、长泰广场、汇智湖（增加代入感）

### 测试时机
- **Impulse26 内部活动**：最佳使用场景
- **Team Building**：破冰游戏
- **新人 Onboarding**：了解团队文化

---

*Last updated: 2026-05-15*  
*Version: 3.0 - SAP浦东定制版*  
*地址: 上海浦东新区金科路 2688 号*
