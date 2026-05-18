# IMPULSE KEYS - Complete Question List V3 (SAP Pudong Edition)
# 完整题库 - SAP浦东版（中英双语）

> **16 Questions | 3 Options Each | Randomized Order**  
> **16 道题 | 每题 3 选项 | 随机顺序**

---

## Dimension A: Signal vs Solution (信号 vs 方案)

### Q1 - Customer Feedback Response (客户反馈响应)

**EN**: A customer says in Teams: "This feature is not very convenient to use."

**CN**: 一个客户在 Teams 上说："这个功能用起来不太方便。"

**What do you do first? / 你的第一反应是？**

**A (+2 Signal)**  
- EN: Schedule a call to dig deeper: In what scenario is it inconvenient? Which specific step is the problem?
- CN: 约个会深挖：在什么场景下不方便？具体卡在哪个步骤？
- *Humor EN: "Tell me more." Then you start reconstructing the crime scene. The customer starts to regret saying this.*
- *黑色幽默: "Tell me more." 然后你开始做案发现场还原，客户开始后悔说了这句话。*

**B (+1 Signal, +1 Solution)**  
- EN: First check the existing process flow, then ask the user about specific pain points.
- CN: 先看看现有的 process flow，再问用户具体痛点。
- *Humor EN: Check the design first, then listen to complaints. Both hands must be strong.*
- *黑色幽默: 先看设计图，再听吐槽。两手都要硬。*

**C (+2 Solution)**  
- EN: Open Fiori Design Guidelines and check if the current design meets standards.
- CN: 打开 Fiori Design Guidelines，检查当前设计是否符合标准。
- *Humor EN: You discover this isn't a bug, it's "ancestral design" that's been sitting in jira backlog for three years.*
- *黑色幽默: 你发现这不是 bug，这是"祖传设计"。已经在 jira backlog 里躺了三年。*

---

### Q2 - Sprint Planning Priorities (Sprint计划优先级)

**EN**: Before Sprint Planning, the PM pulls 10 user stories from AHA, but nobody knows how to prioritize them.

**CN**: Sprint Planning 前，PM 从 AHA 里拖出来 10 个用户故事，但没人知道优先级怎么定。

**What would you do? / 你会？**

**A (+2 Signal)**  
- EN: Re-cluster these stories by user pain points, roles, and usage scenarios.
- CN: 把这些 story 按用户痛点、角色、使用场景重新聚类。
- *Humor EN: Quotes ≠ insights. Someone needs to suffer through synthesis.*
- *黑色幽默: Quote 不等于 insight。需要有人受苦做 synthesis。*

**B (+1 Signal, +1 Solution)**  
- EN: First cluster pain points, then look at technical dependencies and effort, then prioritize comprehensively.
- CN: 先聚类痛点，再看技术依赖和工作量，综合排序。
- *Humor EN: Need to see both user urgency and whether the backend API can handle it.*
- *黑色幽默: 既要看用户急不急，也要看 backend API 搞不搞得定。*

**C (+2 Solution)**  
- EN: Directly check which can reuse existing APIs, which need data model changes, and prioritize by technical risk.
- CN: 直接看哪些能复用现有 API，哪些要改 data model，按技术风险排优先级。
- *Humor EN: Insights without owners eventually become decorations in SharePoint.*
- *黑色幽默: 没 owner 的 insight 最后都变成 SharePoint 里的装饰品。*

---

### Q3 - Edge Case Handling (边缘场景处理)

**EN**: Testing discovers an edge case: When a username exceeds 50 characters, the UI breaks.

**CN**: 测试发现一个 edge case：当用户名字超过 50 个字符时，UI 会错位。

**How should this be handled? / 你觉得怎么处理？**

**A (+2 Signal)**  
- EN: First ask the PM: How many users in reality have names over 50 characters? How many people are affected?
- CN: 先问 PM：现实中有多少用户名字会超过 50 字符？影响多少人？
- *Humor EN: Edge cases are often a euphemism for "ignored users."*
- *黑色幽默: Edge case 往往是"被忽略的用户"的委婉说法。*

**B (+1 Signal, +1 Solution)**  
- EN: Check user data + review production logs to assess impact scope and crash risk.
- CN: 看用户数据 + 查生产日志，评估影响面和崩溃风险。
- *Humor EN: Some edge cases affect few users, but once triggered, it's a P1 incident.*
- *黑色幽默: 有些 edge case 用户很少，但一旦触发就是 P1 incident。*

**C (+2 Solution)**  
- EN: Check HANA logs to see if this case will cause system errors or data corruption.
- CN: 查 HANA 日志，看这个 case 是否会导致 system error 或 data corruption。
- *Humor EN: Small bugs grow fast in production. Especially ones found Friday afternoon.*
- *黑色幽默: 小 bug 在生产环境长得很快。特别是周五下午发现的那种。*

---

### Q4 - Dashboard Optimization Request (Dashboard优化需求)

**EN**: A stakeholder writes in an Outlook meeting invite: "We need to optimize this dashboard."

**CN**: Stakeholder 在 Outlook 会议邀请里写："我们需要优化这个 dashboard。"

**How would you respond? / 你会怎么回？**

**A (+2 Signal)**  
- EN: Reply: "Can you be specific about what decisions users want to make with this dashboard?"
- CN: 回复："能具体说说，用户想用这个 dashboard 做什么决策吗？"
- *Humor EN: "Optimize" is a symptom, not a requirement. Need to do requirement archaeology.*
- *黑色幽默: "优化"是一种症状，不是需求。需要做需求考古。*

**B (+1 Signal, +1 Solution)**  
- EN: First ask about user goals, then list possible optimization directions (performance/readability/interaction).
- CN: 先问用户目标，再列出可能的优化方向（性能/可读性/交互）。
- *Humor EN: Dashboards need both soul (user goals) and body (loading speed).*
- *黑色幽默: Dashboard 既要有灵魂（用户目标），也要有肉体（加载速度）。*

**C (+2 Solution)**  
- EN: Reply: "Which KPIs, filters, drill-down features do we need? Let me check if the OData API supports them."
- CN: 回复："需要加哪些 KPI、filter、drill-down 功能？我看看 OData API 支持不支持。"
- *Humor EN: A dashboard without decision goals is just corporate wallpaper—pretty but useless.*
- *黑色幽默: 没有决策目标的 dashboard 就是公司墙纸，好看但没用。*

---

## Dimension B: Human vs Machine (人性 vs 系统)

### Q5 - API Error Message Quality (API错误信息质量)

**EN**: The API call succeeds, but the error message returned is: "Error Code 400_INVALID_REQUEST". A developer asks in Teams: What does this even mean?

**CN**: API 调用成功了，但返回的 error message 是："Error Code 400_INVALID_REQUEST"。Developer 在 Teams 里问：这到底啥意思？

**Your reaction? / 你的反应？**

**A (+2 Human)**  
- EN: Change it to human language: "Request is missing required field 'approver', please check request body."
- CN: 改成人话："请求参数缺少必填字段 'approver'，请检查 request body。"
- *Humor EN: Developers are users too, they just take better screenshots.*
- *黑色幽默: Developer 也是 user，只是他们更会截图发 Jira ticket。*

**B (+1 Human, +1 Machine)**  
- EN: Improve the message while ensuring status codes, API docs, and Postman examples all align.
- CN: 改善 message 的同时，确保 status code、API doc、Postman example 都对得上。
- *Humor EN: Good DX needs empathy + contract precision. Can't miss either one.*
- *黑色幽默: 好的 DX 需要同理心 + 契约精确度。两个都不能少。*

**C (+2 Machine)**  
- EN: Check API contract, OpenAPI spec, SAP Wiki documentation to ensure consistency across all three.
- CN: 检查 API contract、OpenAPI spec、SAP Wiki 文档，确保三者一致。
- *Humor EN: "400 Bad Request" isn't an error message, it's an emotional state.*
- *黑色幽默: "400 Bad Request" 不是 error message，是一种情绪状态。*

---

### Q6 - AI Recommendation Trust (AI推荐信任度)

**EN**: Joule gives a procurement recommendation with 95% confidence score, but users look completely confused.

**CN**: Joule 给出了一个采购建议，confidence score 95%，但用户看了一脸懵。

**What do you check first? / 你首先检查什么？**

**A (+2 Human)**  
- EN: Can users understand Joule's recommendation logic? Can they manually override? Can they see the data source?
- CN: 用户能不能理解 Joule 的推荐逻辑？能不能手动改？能不能看到数据来源？
- *Humor EN: AI is confident. Users have PTSD.*
- *黑色幽默: AI 很自信。用户有 PTSD。*

**B (+1 Human, +1 Machine)**  
- EN: Check both user comprehension and which data sources and permissions Joule used.
- CN: 既看用户理解度，也查 Joule 用了哪些 data source 和 permission。
- *Humor EN: Trust requires transparency AND accuracy. Can't miss one.*
- *黑色幽默: Trust 需要透明度和准确度。少一个都不行。*

**C (+2 Machine)**  
- EN: Check Joule's data pipeline, permission model, and whether the training data is up-to-date.
- CN: 检查 Joule 的 data pipeline、permission model、training data 是不是最新的。
- *Humor EN: The more human-like AI sounds, the more you want to know where it learned that.*
- *黑色幽默: AI 说得越像人话，你越想知道它是从哪学的。*

---

### Q7 - UI Visual Issues (UI视觉问题)

**EN**: The UI looks fine in Figma, but after deploying to the dev environment, something feels off.

**CN**: UI 在 Figma 里看着挺好，但上到 dev 环境后，总觉得哪里不对劲。

**What would you check? / 你会检查？**

**A (+2 Human)**  
- EN: Is spacing aligned, is wording ambiguous, is visual hierarchy clear?
- CN: Spacing 对不对齐、文案有没有歧义、视觉层级清不清楚。
- *Humor EN: It's only 2px off, but that's the beginning of chaos.*
- *黑色幽默: 只差 2px，但这是混乱的开端。*

**B (+1 Human, +1 Machine)**  
- EN: Check visual + check if data states (loading, error, empty state) are all covered.
- CN: 看视觉 + 看数据状态（loading、error、empty state）有没有都覆盖。
- *Humor EN: Sometimes it's a UI problem, sometimes it's a missing error state problem.*
- *黑色幽默: 有时候是 UI 的问题，有时候是 missing error state 的问题。*

**C (+2 Machine)**  
- EN: Check if this page's data binding, workflow state, and OData response are correct.
- CN: 检查这个页面的 data binding、workflow state、OData response 对不对。
- *Humor EN: The layout is fine. The underlying process logic is screaming.*
- *黑色幽默: Layout 没问题。是底层 process logic 在尖叫。*

---

### Q8 - AI Automation Control (AI自动化控制)

**EN**: Someone proposes: "Let the AI Agent automatically approve purchase requests under 5000 yuan."

**CN**: 有人提议："让 AI Agent 自动审批 5000 块以下的采购申请。"

**What's your first concern? / 你第一个担心的是？**

**A (+2 Human)**  
- EN: Can users see the AI's approval rationale? Can they manually override if they disagree?
- CN: 用户能看到 AI 的审批依据吗？不同意的话能手动推翻吗？
- *Humor EN: AI can help, but doesn't need to become everyone's new manager.*
- *黑色幽默: AI 可以帮忙，但不用变成所有人的新 manager。*

**B (+1 Human, +1 Machine)**  
- EN: Ensure users have control AND clearly define the agent's permission boundaries and audit logs.
- CN: 既要保证用户能控制，也要定义清楚 agent 的权限边界和 audit log。
- *Humor EN: Good automation needs a steering wheel (user control) and brakes (system boundaries).*
- *黑色幽默: 好的 automation 需要方向盘（用户控制）和刹车（系统边界）。*

**C (+2 Machine)**  
- EN: What's the agent's permission model, escalation rules, audit trail, and rollback mechanism?
- CN: Agent 的 permission model、escalation rule、audit trail、rollback 机制是什么？
- *Humor EN: Agents can run, but not naked.*
- *黑色幽默: Agent 可以跑，但不能裸奔。*

---

## Dimension C: Explore vs Align (探索 vs 对齐)

### Q9 - Meeting Room Debate (会议室争论)

**EN**: In the meeting room (PVG03-8F-Meeting Room 3), the team has been arguing for 30 minutes with no conclusion.

**CN**: 会议室（PVG03-8F-Meeting Room 3）里，团队已经争论了 30 分钟，但还是没结论。

**What would you do? / 你会？**

**A (+2 Explore)**  
- EN: Say: "Let's stop talking. I'll make a clickable prototype this afternoon, and we'll discuss it tomorrow."
- CN: 说："我们别说了，我下午做个 clickable prototype，明天大家看着原型讨论。"
- *Humor EN: Words have failed. Prototypes speak.*
- *黑色幽默: 语言已经失效了。Prototype 会说话。*

**B (+1 Explore, +1 Align)**  
- EN: Quickly sketch something + define criteria: "Let's look at the prototype after lunch at Changtai Plaza, then vote based on these three criteria."
- CN: 快速画个草图 + 定个评判标准："我们先看长泰广场吃饭回来的原型，然后按这三个标准投票。"
- *Humor EN: Show, don't just tell. But agree on what "good" looks like first.*
- *黑色幽默: Show, don't just tell. 但要先说好怎么算"好"。*

**C (+2 Align)**  
- EN: Say: "Let's define decision criteria first: performance, development cost, user experience. Then discuss based on criteria."
- CN: 说："我们先定好决策标准：性能、开发成本、用户体验。然后按标准讨论。"
- *Humor EN: Meetings without criteria are just opinion yoga.*
- *黑色幽默: 没有标准的会议就是 opinion yoga。*

---

### Q10 - Cross-Team Alignment (跨团队对齐)

**EN**: PM, UX, and Engineering have completely different understandings of the same feature. After the meeting, everyone goes back to their respective buildings (PVG01 vs PVG03).

**CN**: PM、UX、Engineering 三方对同一个 feature 的理解完全不一样。开完会各回各的楼层（PVG01 vs PVG03）。

**What would you do? / 你会？**

**A (+2 Explore)**  
- EN: Quickly pull together an alignment session where everyone reviews the user flow and value together.
- CN: 快速拉个 alignment session，大家一起过一遍用户流程和价值。
- *Humor EN: Early alignment is boring, but rework is dramatic.*
- *黑色幽默: 早期 align 很无聊，但返工很刺激。*

**B (+1 Explore, +1 Align)**  
- EN: First align on the user problem, then write a decision log in Teams specifying scope, owner, and timeline.
- CN: 先对齐用户问题，再写个 decision log 发 Teams，明确 scope、owner、timeline。
- *Humor EN: Start with "why," then define "who" and "what."*
- *黑色幽默: 先说"为什么"，再定"谁"和"什么"。*

**C (+2 Align)**  
- EN: Immediately open Jira and clearly write: scope, owner, dependencies, risks, decision log.
- CN: 立刻开 Jira，写清楚：scope、owner、dependency、risk、decision log。
- *Humor EN: Without a decision log, everyone has their own version of "meeting conclusions."*
- *黑色幽默: 没有 decision log，每个人都有自己版本的"会议结论"。*

---

### Q11 - Vague Requirements (模糊需求)

**EN**: A stakeholder writes in AHA: "Make the flow more intuitive."

**CN**: Stakeholder 在 AHA 里写了个需求："Make the flow more intuitive."

**What would you do? / 你怎么办？**

**A (+2 Explore)**  
- EN: Schedule some real users for usability testing to see where they get stuck.
- CN: 约几个真实用户做 usability test，看他们卡在哪里。
- *Humor EN: "Intuitive" is code for "I don't know what I want, but I'll know it when I see it."*
- *黑色幽默: "Intuitive" 是"我也不知道要啥，但我看到就知道"的代号。*

**B (+1 Explore, +1 Align)**  
- EN: Do user testing + ask stakeholders to provide specific examples of what "intuitive" means.
- CN: 做 user test + 让 stakeholder 给出"intuitive"的具体例子。
- *Humor EN: User testing + clear criteria = actual progress.*
- *黑色幽默: User testing + 清晰标准 = 真正的进展。*

**C (+2 Align)**  
- EN: Reply via email: "Can you provide a few examples of what you consider intuitive? We need to make it concrete."
- CN: 回邮件："能给几个你觉得 intuitive 的例子吗？我们需要具象化一下。"
- *Humor EN: One person's intuitive is another person's mystery meat navigation.*
- *黑色幽默: 一个人的 intuitive 是另一个人的 mystery meat navigation。*

---

### Q12 - Cross-Product Feature (跨产品功能)

**EN**: A feature needs input from S4, Ariba, and SuccessFactors teams, but nobody is making the decision.

**CN**: 一个 feature 需要 S4、Ariba、SuccessFactors 三个产品的 team 输入，但没人拍板。

**What would you do first? / 你会？**

**A (+2 Explore)**  
- EN: First create a prototype proposal so everyone can see the concrete solution, then discuss decision points.
- CN: 先做个 prototype proposal，让大家看到具体方案，然后讨论决策点。
- *Humor EN: Sometimes you need a villain (the prototype) to unite the heroes.*
- *黑色幽默: 有时候需要一个"反派"（prototype）来让英雄们团结。*

**B (+1 Explore, +1 Align)**  
- EN: Draft a proposal + clearly identify who the decision owner is, then post in Teams @relevant people.
- CN: 起草方案 + 明确谁是 decision owner，发 Teams 里 @相关人。
- *Humor EN: Good ideas need content (proposal) AND a decision maker (owner).*
- *黑色幽默: 好的想法需要内容（proposal）和决策者（owner）。*

**C (+2 Align)**  
- EN: First define the decision owner, stakeholder list, approval criteria, and write it into Jira.
- CN: 先定 decision owner、stakeholder list、approval criteria，写进 Jira。
- *Humor EN: Decisions without owners become eternal meetings.*
- *黑色幽默: 没有 owner 的决策会变成永恒的会议。*

---

## Dimension D: Spark vs Stabilize (创新 vs 稳定)

### Q13 - AI Automation Opportunity (AI自动化机会)

**EN**: A customer asks: "Why can't Joule automatically fill out this form for me?"

**CN**: 客户问："为什么 Joule 不能自动帮我填这个表单？"

**Your reaction? / 你的反应？**

**A (+2 Spark)**  
- EN: Your brain has already started sketching the AI-assisted workflow.
- CN: 脑子里已经开始画 AI-assisted workflow 的草图了。
- *Humor EN: Every limitation is an AI opportunity. You're already thinking about the product roadmap three years from now.*
- *黑色幽默: 每个 limitation 都是 AI opportunity。你已经在想三年后的产品路线图了。*

**B (+1 Spark, +1 Stabilize)**  
- EN: First ask what the pain points are with manually filling the form, then consider if AI can truly solve them.
- CN: 先问现在手动填表单的痛点是什么，再考虑 AI 能不能真的解决。
- *Humor EN: Dream big, but validate the problem exists first.*
- *黑色幽默: 梦想要大，但先验证问题是不是真的存在。*

**C (+2 Stabilize)**  
- EN: First look at where the current manual process pain points are—does it really need AI, or just better UI?
- CN: 先看现在的手动流程痛点在哪，是不是真的需要 AI，还是只是需要更好的 UI。
- *Humor EN: AI is great. But sometimes users just want a better button.*
- *黑色幽默: AI 很好。但有时候用户只是想要一个更好的按钮。*

---

### Q14 - Mid-Sprint Value Clarification (Sprint中途价值澄清)

**EN**: The sprint has already started, but the user story's value is still vague. Developers in PVG06 are already writing code.

**CN**: Sprint 已经开始了，但 user story 的价值还是很模糊。开发已经在 PVG06 写代码了。

**What do you suggest? / 你建议？**

**A (+2 Spark)**  
- EN: See which parts can still be adjusted without blowing up the sprint.
- CN: 看看哪些部分还能调整，在不炸 sprint 的前提下快速优化。
- *Humor EN: The sprint is already moving. Please don't stand in front of it without a plan.*
- *黑色幽默: Sprint 已经在跑了。请不要在没有计划的情况下站在它前面。*

**B (+1 Spark, +1 Stabilize)**  
- EN: If adjustments are possible, adjust quickly. If not, log it to the backlog for next sprint.
- CN: 如果还能调，就快速调。如果调不了，就记录到 backlog 下个 sprint 改。
- *Humor EN: Sometimes you can brake. Sometimes you can only write it down in a notebook.*
- *黑色幽默: 有些时候能刹车。有些时候只能拿小本本记下来。*

**C (+2 Stabilize)**  
- EN: Pause the sprint and clarify the user story's value before continuing to write code.
- CN: Pause sprint，把 user story 的价值讲清楚再继续写代码。
- *Humor EN: Moving fast in the wrong direction is still moving fast.*
- *黑色幽默: 快速朝错误方向前进，还是快速前进。*

---

### Q15 - Creative Workaround (创意绕行方案)

**EN**: Someone proposes a creative workaround: "We can use a Cloud Function on BTP to bypass this S/4 limitation and go live this week."

**CN**: 有人提出一个创意 workaround："我们可以用 BTP 上的 Cloud Function 绕过 S/4 的这个限制，这周就能上线。"

**What's your first reaction? / 你的第一反应？**

**A (+2 Spark)**  
- EN: "We can try it, validate quickly—learning cost isn't high."
- CN: "可以试试，快速验证一下，学习成本不高。"
- *Humor EN: Ship now, refactor later. (Narrator: They never refactored.)*
- *黑色幽默: Ship now, refactor later. （旁白：他们再也没有 refactor。）*

**B (+1 Spark, +1 Stabilize)**  
- EN: "We can try, but need to document the migration plan clearly so it doesn't become ancestral logic."
- CN: "可以试，但要写清楚 migration plan，别让它变成祖传逻辑。"
- *Humor EN: Shortcuts are fine if they come with exit signs.*
- *黑色幽默: Shortcut 可以走，但要有出口标识。*

**C (+2 Stabilize)**  
- EN: "Today's shortcut is tomorrow's migration nightmare. Let's follow Clean Core principles."
- CN: "今天的捷径是明天迁移时的坑。我们还是按 Clean Core 原则来吧。"
- *Humor EN: Every dirty workaround dreams of growing up to become legacy code.*
- *黑色幽默: 每个脏 workaround 都梦想长成 legacy code。*

---

### Q16 - Roadmap vs Reality (路线图 vs 现实)

**EN**: The roadmap looks beautiful, but incident tickets and support escalations tell a different story.

**CN**: Roadmap 看起来很美好，但系统里的 incident ticket 和 support escalation 讲了另一个故事。

**What would you do? / 你会？**

**A (+2 Spark)**  
- EN: Bring support signals back into product discovery to see if the roadmap needs adjustment.
- CN: 把 support 的信号带回 product discovery，看看 roadmap 是不是要调整。
- *Humor EN: Roadmaps are optimistic. Customers are specific.*
- *黑色幽默: Roadmap 很乐观。客户很具体。*

**B (+1 Spark, +1 Stabilize)**  
- EN: Listen to customer feedback + look at patterns in HANA logs, then make comprehensive judgments.
- CN: 听客户反馈 + 看 HANA 日志里的 pattern，综合判断。
- *Humor EN: Listen to customers. Trust the data. Do both.*
- *黑色幽默: 听客户说。信日志数据。两个都做。*

**C (+2 Stabilize)**  
- EN: Go through Kibana logs and incident timelines to see what's actually happening in production.
- CN: 去翻 Kibana 日志和 incident timeline，看生产环境到底发生了什么。
- *Humor EN: Logs are the product diary that nobody wanted to publish.*
- *黑色幽默: 日志是产品日记，只是没人想公开发表。*

---

## Quick Reference: Answer Options Summary
## 快速参考：选项汇总

### Scoring System / 计分系统
```
Option A: +2 to First Pole (Signal/Human/Explore/Spark)
Option B: +1 to Each Pole (Balanced)
Option C: +2 to Second Pole (Solution/Machine/Align/Stabilize)

选项A：第一极 +2 分（Signal/Human/Explore/Spark）
选项B：各 +1 分（中立）
选项C：第二极 +2 分（Solution/Machine/Align/Stabilize）
```

### Maximum Scores / 最高分数
```
Each dimension: 8 points max per pole (4 questions × 2 points)
每个维度：每极最高 8 分（4 题 × 2 分）

Percentages: 0-100% for each pole
百分比：每极 0-100%
```

---

## Implementation Notes / 实现注意事项

### Randomization / 随机化
1. **Shuffle question order** on every test start
   - 每次测试开始时打乱问题顺序
2. **Shuffle option order** (A/B/C) within each question
   - 打乱每题内的选项顺序（A/B/C）
3. Keep original IDs for scoring
   - 保留原始 ID 用于计分

### Display / 显示方式
- Show progress: "Question 5 of 16" / "第 5 题 / 共 16 题"
- Auto-advance after selection (no "Next" button)
  - 选择后自动前进（无"下一题"按钮）
- Show humor text as subtitle/tooltip (optional)
  - 将幽默文本显示为副标题/提示（可选）

### Mobile Optimization / 移动端优化
- Stack options vertically
  - 选项垂直堆叠
- Large touch targets (≥44px)
  - 大触摸目标（≥44px）
- Readable font sizes (16px+ body text)
  - 可读字体大小（正文 16px+）

---

*Last updated: 2026-05-15*  
*Version: 3.0 - SAP Pudong Edition (Bilingual)*  
*Location: 上海浦东新区金科路 2688 号 / 2688 Jinke Road, Pudong, Shanghai*
