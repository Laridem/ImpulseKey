import { Question } from './types'

/**
 * IMPULSE KEYS - Question Bank
 * 16 questions, 3 options each, bilingual (EN/CN)
 * 4 dimensions: Signal/Solution, Human/Machine, Explore/Align, Spark/Stabilize
 */

export const QUESTIONS: Question[] = [
  // DIMENSION A: Signal vs Solution
  {
    id: 'A1',
    dimension: 'A',
    textEN: 'A customer says in Teams: "This feature is not very convenient to use."',
    textCN: '一个客户在 Teams 上说："这个功能用起来不太方便。"',
    options: [
      {
        id: 'A',
        textEN: 'Schedule a call to dig deeper: In what scenario is it inconvenient? Which specific step is the problem?',
        textCN: '约个会深挖：在什么场景下不方便？具体卡在哪个步骤？',
        humorEN: '"Tell me more." Then you start reconstructing the crime scene.',
        humorCN: '"Tell me more." 然后你开始做案发现场还原，客户开始后悔说了这句话。',
        scores: { Signal: 2 }
      },
      {
        id: 'B',
        textEN: 'First check the existing process flow, then ask the user about specific pain points.',
        textCN: '先看看现有的 process flow，再问用户具体痛点。',
        humorEN: 'Check the design first, then listen to complaints. Both hands must be strong.',
        humorCN: '先看设计图，再听吐槽。两手都要硬。',
        scores: { Signal: 1, Solution: 1 }
      },
      {
        id: 'C',
        textEN: 'Open Fiori Design Guidelines and check if the current design meets standards.',
        textCN: '打开 Fiori Design Guidelines，检查当前设计是否符合标准。',
        humorEN: 'You discover this isn\'t a bug, it\'s "ancestral design" sitting in backlog for three years.',
        humorCN: '你发现这不是 bug，这是"祖传设计"。已经在 jira backlog 里躺了三年。',
        scores: { Solution: 2 }
      }
    ]
  },

  {
    id: 'A2',
    dimension: 'A',
    textEN: 'Before Sprint Planning, the PM pulls 10 user stories from AHA, but nobody knows how to prioritize them.',
    textCN: 'Sprint Planning 前，PM 从 AHA 里拖出来 10 个用户故事，但没人知道优先级怎么定。',
    options: [
      {
        id: 'A',
        textEN: 'Re-cluster these stories by user pain points, roles, and usage scenarios.',
        textCN: '把这些 story 按用户痛点、角色、使用场景重新聚类。',
        humorEN: 'Quotes ≠ insights. Someone needs to suffer through synthesis.',
        humorCN: 'Quote 不等于 insight。需要有人受苦做 synthesis。',
        scores: { Signal: 2 }
      },
      {
        id: 'B',
        textEN: 'First cluster pain points, then look at technical dependencies and effort.',
        textCN: '先聚类痛点，再看技术依赖和工作量，综合排序。',
        humorEN: 'Need to see both user urgency and whether the backend API can handle it.',
        humorCN: '既要看用户急不急，也要看 backend API 搞不搞得定。',
        scores: { Signal: 1, Solution: 1 }
      },
      {
        id: 'C',
        textEN: 'Directly check which can reuse existing APIs and prioritize by technical risk.',
        textCN: '直接看哪些能复用现有 API，按技术风险排优先级。',
        humorEN: 'Insights without owners eventually become decorations in SharePoint.',
        humorCN: '没 owner 的 insight 最后都变成 SharePoint 里的装饰品。',
        scores: { Solution: 2 }
      }
    ]
  },

  {
    id: 'A3',
    dimension: 'A',
    textEN: 'Testing discovers an edge case: When a username exceeds 50 characters, the UI breaks.',
    textCN: '测试发现一个 edge case：当用户名字超过 50 个字符时，UI 会错位。',
    options: [
      {
        id: 'A',
        textEN: 'First ask the PM: How many users have names over 50 characters? How many are affected?',
        textCN: '先问 PM：现实中有多少用户名字会超过 50 字符？影响多少人？',
        humorEN: 'Edge cases are often a euphemism for "ignored users."',
        humorCN: 'Edge case 往往是"被忽略的用户"的委婉说法。',
        scores: { Signal: 2 }
      },
      {
        id: 'B',
        textEN: 'Check user data + production logs to assess impact scope and crash risk.',
        textCN: '看用户数据 + 查生产日志，评估影响面和崩溃风险。',
        humorEN: 'Some edge cases affect few users, but once triggered, it\'s a P1 incident.',
        humorCN: '有些 edge case 用户很少，但一旦触发就是 P1 incident。',
        scores: { Signal: 1, Solution: 1 }
      },
      {
        id: 'C',
        textEN: 'Check HANA logs to see if this case will cause system errors or data corruption.',
        textCN: '查 HANA 日志，看这个 case 是否会导致 system error 或 data corruption。',
        humorEN: 'Small bugs grow fast in production. Especially ones found Friday afternoon.',
        humorCN: '小 bug 在生产环境长得很快。特别是周五下午发现的那种。',
        scores: { Solution: 2 }
      }
    ]
  },

  {
    id: 'A4',
    dimension: 'A',
    textEN: 'A stakeholder writes: "We need to optimize this dashboard."',
    textCN: 'Stakeholder 在 Outlook 会议邀请里写："我们需要优化这个 dashboard。"',
    options: [
      {
        id: 'A',
        textEN: 'Reply: "Can you be specific about what decisions users want to make with this dashboard?"',
        textCN: '回复："能具体说说，用户想用这个 dashboard 做什么决策吗？"',
        humorEN: '"Optimize" is a symptom, not a requirement. Need to do requirement archaeology.',
        humorCN: '"优化"是一种症状，不是需求。需要做需求考古。',
        scores: { Signal: 2 }
      },
      {
        id: 'B',
        textEN: 'First ask about user goals, then list possible optimization directions.',
        textCN: '先问用户目标，再列出可能的优化方向（性能/可读性/交互）。',
        humorEN: 'Dashboards need both soul (user goals) and body (loading speed).',
        humorCN: 'Dashboard 既要有灵魂（用户目标），也要有肉体（加载速度）。',
        scores: { Signal: 1, Solution: 1 }
      },
      {
        id: 'C',
        textEN: 'Reply: "Which KPIs and filters do we need? Let me check if the OData API supports them."',
        textCN: '回复："需要加哪些 KPI、filter 功能？我看看 OData API 支持不支持。"',
        humorEN: 'A dashboard without decision goals is just corporate wallpaper.',
        humorCN: '没有决策目标的 dashboard 就是公司墙纸，好看但没用。',
        scores: { Solution: 2 }
      }
    ]
  },

  // DIMENSION B: Human vs Machine
  {
    id: 'B1',
    dimension: 'B',
    textEN: 'API error message: "Error Code 400_INVALID_REQUEST". A developer asks: What does this mean?',
    textCN: 'API 返回："Error Code 400_INVALID_REQUEST"。Developer 在 Teams 里问：这到底啥意思？',
    options: [
      {
        id: 'A',
        textEN: 'Change it to: "Request is missing required field \'approver\', please check request body."',
        textCN: '改成人话："请求参数缺少必填字段 \'approver\'，请检查 request body。"',
        humorEN: 'Developers are users too, they just take better screenshots.',
        humorCN: 'Developer 也是 user，只是他们更会截图发 Jira ticket。',
        scores: { Human: 2 }
      },
      {
        id: 'B',
        textEN: 'Improve the message while ensuring status codes, API docs, and examples align.',
        textCN: '改善 message 的同时，确保 status code、API doc、Postman example 都对得上。',
        humorEN: 'Good DX needs empathy + contract precision. Can\'t miss either.',
        humorCN: '好的 DX 需要同理心 + 契约精确度。两个都不能少。',
        scores: { Human: 1, Machine: 1 }
      },
      {
        id: 'C',
        textEN: 'Check API contract, OpenAPI spec, and documentation to ensure consistency.',
        textCN: '检查 API contract、OpenAPI spec、SAP Wiki 文档，确保三者一致。',
        humorEN: '"400 Bad Request" isn\'t an error message, it\'s an emotional state.',
        humorCN: '"400 Bad Request" 不是 error message，是一种情绪状态。',
        scores: { Machine: 2 }
      }
    ]
  },

  // (Continue with remaining dimensions - I'll create a condensed version for MVP)
  // For MVP, let me create placeholders for the remaining 11 questions

  {
    id: 'B2',
    dimension: 'B',
    textEN: 'Joule generates a workflow, but a PM says: "This doesn\'t match our actual approval process."',
    textCN: 'Joule 生成了一个 workflow，但 PM 说："这跟我们实际的审批流程不符合。"',
    options: [
      {
        id: 'A',
        textEN: 'Redesign the prompt to better describe the real process.',
        textCN: '重新设计 prompt，更好地描述真实流程。',
        humorEN: 'AI needs context. Without it, it\'s just a fancy autocomplete.',
        humorCN: 'AI 需要上下文。没有上下文，它就是个高级自动补全。',
        scores: { Human: 2 }
      },
      {
        id: 'B',
        textEN: 'Improve prompts and check if Joule can connect to internal workflow systems.',
        textCN: '改进 prompt，同时检查 Joule 能否接入内部流程系统。',
        humorEN: 'Generative AI + API = actual automation.',
        humorCN: '生成式 AI + API 对接 = 真正的自动化。',
        scores: { Human: 1, Machine: 1 }
      },
      {
        id: 'C',
        textEN: 'Check if workflow data model and API schema support Joule integration.',
        textCN: '检查 workflow 数据模型和 API schema 是否支持 Joule 对接。',
        humorEN: 'Without structured data, AI is just chatting with you.',
        humorCN: '没有结构化数据，AI 只是在跟你聊天。',
        scores: { Machine: 2 }
      }
    ]
  },

  {
    id: 'B3',
    dimension: 'B',
    textEN: 'A user completes a form, but the system returns: "Validation failed."',
    textCN: '用户填完表单，系统返回："Validation failed。"',
    options: [
      {
        id: 'A',
        textEN: 'Show exactly which field failed and why: "Email format invalid, please use xxx@domain.com"',
        textCN: '精确显示哪个字段错了，为什么："邮箱格式不正确，请使用 xxx@domain.com 格式"',
        humorEN: '"Validation failed" is not a message, it\'s a relationship status.',
        humorCN: '"Validation failed" 不是提示，是一种关系状态。',
        scores: { Human: 2 }
      },
      {
        id: 'B',
        textEN: 'Improve error messages and add frontend validation to catch errors earlier.',
        textCN: '改进错误提示，并加前端校验让用户更早发现问题。',
        humorEN: 'Good UX prevents errors before they happen.',
        humorCN: '好的 UX 在错误发生之前就阻止它。',
        scores: { Human: 1, Machine: 1 }
      },
      {
        id: 'C',
        textEN: 'Check validation rule definitions and ensure frontend/backend schemas match.',
        textCN: '检查 validation rule 定义，确保前后端 schema 一致。',
        humorEN: 'Frontend validation without backend validation is theater security.',
        humorCN: '只有前端校验没有后端校验的系统，是安全剧场。',
        scores: { Machine: 2 }
      }
    ]
  },

  {
    id: 'B4',
    dimension: 'B',
    textEN: 'An AI agent auto-assigns tickets, but engineers complain: "These tickets don\'t belong to my module."',
    textCN: 'AI agent 自动分配 ticket，但工程师抱怨："这些 ticket 根本不属于我的模块。"',
    options: [
      {
        id: 'A',
        textEN: 'Let engineers review and correct assignments to help the AI learn.',
        textCN: '让工程师 review 并纠正分配结果，帮助 AI 学习。',
        humorEN: 'AI without human feedback is just confident randomness.',
        humorCN: '没有人类反馈的 AI，就是自信的随机数生成器。',
        scores: { Human: 2 }
      },
      {
        id: 'B',
        textEN: 'Improve AI model and add a human review step before final assignment.',
        textCN: '改进 AI 模型，并增加人工 review 环节再最终分配。',
        humorEN: 'Best automation: AI proposes, human decides.',
        humorCN: '最好的自动化：AI 提建议，人来做决策。',
        scores: { Human: 1, Machine: 1 }
      },
      {
        id: 'C',
        textEN: 'Check component ownership metadata and update AI training data.',
        textCN: '检查组件 ownership 元数据，更新 AI 训练数据。',
        humorEN: 'Garbage in, garbage out. Even if the garbage is ML-powered.',
        humorCN: 'Garbage in, garbage out。哪怕 garbage 是 AI 处理的。',
        scores: { Machine: 2 }
      }
    ]
  },

  // DIMENSION C: Explore vs Align
  {
    id: 'C1',
    dimension: 'C',
    textEN: 'During a design review, someone suggests: "Why don\'t we try a completely different interaction pattern?"',
    textCN: '设计评审时，有人提议："我们要不要试试完全不同的交互模式？"',
    options: [
      {
        id: 'A',
        textEN: 'Prototype the new idea and A/B test with users to see which performs better.',
        textCN: '快速 prototype 新想法，做 A/B test 看用户反应。',
        humorEN: 'The best answer to "which is better?" is "let users tell us."',
        humorCN: '"哪个更好？"的最佳答案是"让用户告诉我们"。',
        scores: { Explore: 2 }
      },
      {
        id: 'B',
        textEN: 'Prototype both options and see if the new pattern fits our design system.',
        textCN: '两个方案都 prototype 一下，看新模式是否契合我们的 design system。',
        humorEN: 'Innovation within constraints is still innovation.',
        humorCN: '约束内的创新也是创新。',
        scores: { Explore: 1, Align: 1 }
      },
      {
        id: 'C',
        textEN: 'Check if the new pattern is consistent with Fiori design principles.',
        textCN: '先检查新模式是否符合 Fiori 设计原则。',
        humorEN: 'Design systems exist so we don\'t reinvent the wheel 47 times.',
        humorCN: 'Design system 的存在是为了让我们不用重复造 47 次轮子。',
        scores: { Align: 2 }
      }
    ]
  },

  {
    id: 'C2',
    dimension: 'C',
    textEN: 'You discover a workflow that could be simplified, but it would break existing user habits.',
    textCN: '你发现一个流程可以简化，但会打破用户现有习惯。',
    options: [
      {
        id: 'A',
        textEN: 'Launch the new flow with in-app guidance and collect feedback.',
        textCN: '上线新流程，加入 in-app guidance，收集用户反馈。',
        humorEN: 'Sometimes you have to break habits to build better ones.',
        humorCN: '有时候要打破旧习惯，才能建立更好的习惯。',
        scores: { Explore: 2 }
      },
      {
        id: 'B',
        textEN: 'Gradually migrate users with a transition period.',
        textCN: '逐步迁移用户，设置过渡期。',
        humorEN: 'Change is hard. Give people time to adjust.',
        humorCN: '改变很难。给人们适应的时间。',
        scores: { Explore: 1, Align: 1 }
      },
      {
        id: 'C',
        textEN: 'Keep the existing flow to maintain consistency and avoid user complaints.',
        textCN: '保持现有流程，维护一致性，避免用户抱怨。',
        humorEN: '"If it ain\'t broke, don\'t fix it" - until it becomes legacy debt.',
        humorCN: '"能用就别动" - 直到它变成技术债。',
        scores: { Align: 2 }
      }
    ]
  },

  {
    id: 'C3',
    dimension: 'C',
    textEN: 'A customer requests a feature that doesn\'t fit your product roadmap.',
    textCN: '客户提出一个需求，但不符合你的产品 roadmap。',
    options: [
      {
        id: 'A',
        textEN: 'Explore the underlying need and see if there\'s a creative solution.',
        textCN: '深挖底层需求，看能否找到创造性的解决方案。',
        humorEN: 'Behind every weird request is a real problem.',
        humorCN: '每个奇怪需求背后都有一个真实的问题。',
        scores: { Explore: 2 }
      },
      {
        id: 'B',
        textEN: 'Explain the roadmap while exploring if we can meet their need differently.',
        textCN: '解释 roadmap，同时探索能否用其他方式满足需求。',
        humorEN: 'Saying no to the request doesn\'t mean saying no to the need.',
        humorCN: '拒绝需求，不等于拒绝解决问题。',
        scores: { Explore: 1, Align: 1 }
      },
      {
        id: 'C',
        textEN: 'Explain why it doesn\'t fit the roadmap and suggest workarounds.',
        textCN: '解释为什么不符合 roadmap，建议 workaround 方案。',
        humorEN: 'Roadmaps exist to say yes to the right things by saying no to everything else.',
        humorCN: 'Roadmap 的存在是为了对正确的事说 yes，对其他所有事说 no。',
        scores: { Align: 2 }
      }
    ]
  },

  {
    id: 'C4',
    dimension: 'C',
    textEN: 'Your team wants to try a new framework, but the rest of the org uses a different stack.',
    textCN: '你的团队想尝试新框架，但公司其他团队用的是不同的技术栈。',
    options: [
      {
        id: 'A',
        textEN: 'Try it in a small project and share learnings with the org.',
        textCN: '在小项目里试用，向组织分享经验。',
        humorEN: 'Innovation requires permission to experiment.',
        humorCN: '创新需要被允许试错。',
        scores: { Explore: 2 }
      },
      {
        id: 'B',
        textEN: 'Evaluate if the new framework solves real problems worth the migration cost.',
        textCN: '评估新框架能否解决真实问题，值不值得迁移成本。',
        humorEN: 'New tech is not automatically better. Context matters.',
        humorCN: '新技术不自动等于更好。要看场景。',
        scores: { Explore: 1, Align: 1 }
      },
      {
        id: 'C',
        textEN: 'Stick with the existing stack to maintain consistency and shared knowledge.',
        textCN: '坚持使用现有技术栈，保持一致性和知识共享。',
        humorEN: 'Every new framework is a bet. Sometimes the house wins.',
        humorCN: '每个新框架都是一次赌博。有时候庄家会赢。',
        scores: { Align: 2 }
      }
    ]
  },

  // DIMENSION D: Spark vs Stabilize
  {
    id: 'D1',
    dimension: 'D',
    textEN: 'A critical bug is found in production. Do you fix it immediately or wait for the next sprint?',
    textCN: '生产环境发现严重 bug。你会立即修复还是等下个 sprint？',
    options: [
      {
        id: 'A',
        textEN: 'Hotfix immediately and deploy. Speed is critical.',
        textCN: '立即 hotfix 并部署。速度最重要。',
        humorEN: 'When production burns, sprint planning can wait.',
        humorCN: '生产环境在燃烧的时候，sprint planning 可以等。',
        scores: { Spark: 2 }
      },
      {
        id: 'B',
        textEN: 'Hotfix quickly, but ensure proper testing and code review first.',
        textCN: '快速 hotfix，但要先确保测试和 code review。',
        humorEN: 'Fast and broken helps no one.',
        humorCN: '又快又烂的修复帮不了任何人。',
        scores: { Spark: 1, Stabilize: 1 }
      },
      {
        id: 'C',
        textEN: 'Follow the proper change management process even for hotfixes.',
        textCN: '即使是 hotfix 也要走正常的变更管理流程。',
        humorEN: 'Process exists because someone got burned before.',
        humorCN: '流程的存在是因为有人之前被烧过。',
        scores: { Stabilize: 2 }
      }
    ]
  },

  {
    id: 'D2',
    dimension: 'D',
    textEN: 'A stakeholder wants a feature for a demo next week. The team says it needs 3 weeks.',
    textCN: 'Stakeholder 想要一个 feature 下周 demo。团队说需要 3 周。',
    options: [
      {
        id: 'A',
        textEN: 'Build a quick prototype for demo and refine later.',
        textCN: '快速做个 prototype 用于 demo，之后再完善。',
        humorEN: 'Demo-driven development: it\'s a thing.',
        humorCN: 'Demo 驱动开发：这是真的存在的。',
        scores: { Spark: 2 }
      },
      {
        id: 'B',
        textEN: 'Negotiate scope: deliver core functionality for demo, polish later.',
        textCN: '协商范围：demo 交付核心功能，后续再打磨。',
        humorEN: 'MVPs exist for a reason.',
        humorCN: 'MVP 的存在是有原因的。',
        scores: { Spark: 1, Stabilize: 1 }
      },
      {
        id: 'C',
        textEN: 'Explain why rushing will create technical debt and stick to 3 weeks.',
        textCN: '解释为什么赶工会制造技术债，坚持 3 周时间。',
        humorEN: 'You can have it fast, good, or cheap. Pick two.',
        humorCN: '快、好、省 - 三选二。',
        scores: { Stabilize: 2 }
      }
    ]
  },

  {
    id: 'D3',
    dimension: 'D',
    textEN: 'You discover an innovative solution, but it requires rewriting a core module.',
    textCN: '你发现了一个创新方案，但需要重写核心模块。',
    options: [
      {
        id: 'A',
        textEN: 'Start the rewrite. Innovation requires bold moves.',
        textCN: '开始重写。创新需要大胆的举动。',
        humorEN: 'Sometimes you have to tear down to build better.',
        humorCN: '有时候要拆掉旧的才能建更好的。',
        scores: { Spark: 2 }
      },
      {
        id: 'B',
        textEN: 'Incrementally refactor while adding the new feature.',
        textCN: '增量式重构，同时添加新功能。',
        humorEN: 'The best time to refactor was last year. The second best time is now.',
        humorCN: '重构的最佳时机是去年。第二好的时机是现在。',
        scores: { Spark: 1, Stabilize: 1 }
      },
      {
        id: 'C',
        textEN: 'Keep the existing module stable. Rewrites are risky.',
        textCN: '保持现有模块稳定。重写风险太大。',
        humorEN: 'Never rewrite a working system unless you want to discover why it was built that way.',
        humorCN: '永远不要重写能用的系统，除非你想知道为什么它当初要这么设计。',
        scores: { Stabilize: 2 }
      }
    ]
  },

  {
    id: 'D4',
    dimension: 'D',
    textEN: 'Your team is behind schedule. Do you cut features or extend the deadline?',
    textCN: '你的团队进度落后。你会砍功能还是延长时间？',
    options: [
      {
        id: 'A',
        textEN: 'Ship what we have now and iterate fast based on feedback.',
        textCN: '先上线现有的，基于反馈快速迭代。',
        humorEN: 'Done is better than perfect.',
        humorCN: '完成比完美更重要。',
        scores: { Spark: 2 }
      },
      {
        id: 'B',
        textEN: 'Cut nice-to-have features, keep must-haves, extend slightly if needed.',
        textCN: '砍掉 nice-to-have 功能，保留 must-have，必要时稍微延期。',
        humorEN: 'Scope, time, quality - pick two and negotiate the third.',
        humorCN: '范围、时间、质量 - 选两个，第三个可以谈。',
        scores: { Spark: 1, Stabilize: 1 }
      },
      {
        id: 'C',
        textEN: 'Extend the deadline to deliver all planned features with quality.',
        textCN: '延长时间，确保所有计划功能都能高质量交付。',
        humorEN: 'Rushing leads to bugs. Bugs lead to firefighting. Firefighting leads to burnout.',
        humorCN: '赶工导致 bug。Bug 导致救火。救火导致 burnout。',
        scores: { Stabilize: 2 }
      }
    ]
  },

  // NEW QUESTION A5 - Signal vs Solution (1-0-1 TIEBREAKER)
  // Scoring: A=[1,0], B=[0,0], C=[0,1] for perfect 50/50 distribution
  {
    id: 'A5',
    dimension: 'A',
    textEN: 'During a sprint demo, a stakeholder says: "Can we add a feature to export this data to Excel?"',
    textCN: '在 Sprint Demo 时，stakeholder 说："能不能加个导出到 Excel 的功能？"',
    options: [
      {
        id: 'A',
        textEN: 'Ask: What decisions do users need to make with this data? How will they use the export? What happens after export?',
        textCN: '问：用户需要用这个数据做什么决策？导出后怎么用？导出后的流程是什么？',
        humorEN: 'You\'re not saying no. You\'re doing requirement archaeology before someone builds a temple.',
        humorCN: '你不是在说不。你在做需求考古，避免建一座没人拜的庙。',
        scores: { Signal: 1 }
      },
      {
        id: 'B',
        textEN: 'Explore the use case while checking if existing export formats (CSV, PDF) or APIs can already solve this.',
        textCN: '探索使用场景，同时检查现有导出格式（CSV、PDF）或 API 能否已经解决。',
        humorEN: 'User needs meet existing features. Usually someone forgot we already have it.',
        humorCN: '用户需求遇见现有功能。通常是有人忘了我们已经有了。',
        scores: {}
      },
      {
        id: 'C',
        textEN: 'Check if the UI5 Spreadsheet Export library supports the current table format and estimate implementation effort.',
        textCN: '检查 UI5 Spreadsheet Export 库是否支持当前表格格式，评估实现工作量。',
        humorEN: 'The answer is always "yes, but it\'ll break on tables with more than 10,000 rows."',
        humorCN: '答案永远是"可以，但是超过 10,000 行就会炸。"',
        scores: { Solution: 1 }
      }
    ]
  },

  // NEW QUESTION B5 - Human vs Machine (1-0-1 TIEBREAKER)
  // Scoring: A=[1,0], B=[0,0], C=[0,1] for perfect 50/50 distribution
  {
    id: 'B5',
    dimension: 'B',
    textEN: 'A developer asks: "Should this confirmation message say \'Operation completed successfully\' or show the transaction ID?"',
    textCN: '开发问："确认消息应该显示\'操作成功\'还是显示 transaction ID？"',
    options: [
      {
        id: 'A',
        textEN: 'Show a message the user understands: "Your request was submitted. You\'ll receive an email when it\'s processed."',
        textCN: '显示用户能理解的消息："你的请求已提交。处理完成后会收到邮件通知。"',
        humorEN: 'Transaction IDs are for logs, not for humans trying to finish their work.',
        humorCN: 'Transaction ID 是给日志看的，不是给赶着干活的人看的。',
        scores: { Human: 1 }
      },
      {
        id: 'B',
        textEN: 'Show user-friendly confirmation with transaction ID available via "Show details" for power users and support debugging.',
        textCN: '显示友好确认消息，同时提供"显示详情"让高级用户和技术支持查看 transaction ID。',
        humorEN: 'Best of both worlds: normal people see "success", paranoid people see proof.',
        humorCN: '两全其美：普通人看到"成功"，焦虑的人看到证据。',
        scores: {}
      },
      {
        id: 'C',
        textEN: 'Return standardized response with transaction ID, timestamp, and status code for downstream system integration.',
        textCN: '返回标准化响应，包含 transaction ID、时间戳和状态码，用于下游系统对接。',
        humorEN: 'If the API returns HTTP 200, why do humans need to know it succeeded?',
        humorCN: '如果 API 返回 200，人类为什么需要知道它成功了？',
        scores: { Machine: 1 }
      }
    ]
  },

  // NEW QUESTION C5 - Explore vs Align (1-0-1 TIEBREAKER)
  // Scoring: A=[1,0], B=[0,0], C=[0,1] for perfect 50/50 distribution
  {
    id: 'C5',
    dimension: 'C',
    textEN: 'Your team prototyped a drag-and-drop workflow builder, but Fiori guidelines recommend a form-based approach.',
    textCN: '你的团队做了一个拖拽式流程构建器的 prototype，但 Fiori 指南推荐表单式的方式。',
    options: [
      {
        id: 'A',
        textEN: 'User test both approaches. If drag-and-drop significantly improves task completion, document the case and propose a pattern.',
        textCN: '用户测试两种方式。如果拖拽明显提升任务完成率，记录案例并提出新模式。',
        humorEN: 'Guidelines are great until users vote with their cursor.',
        humorCN: '指南很棒，直到用户用鼠标投票。',
        scores: { Explore: 1 }
      },
      {
        id: 'B',
        textEN: 'Prototype both to see which works better, but ensure drag-and-drop uses Fiori interaction patterns if we choose it.',
        textCN: '两种都 prototype 看哪个更好，但如果选拖拽，确保使用 Fiori 交互模式。',
        humorEN: 'Innovation within constraints is still innovation. Just more paperwork.',
        humorCN: '约束内的创新也是创新。只是文档多点。',
        scores: {}
      },
      {
        id: 'C',
        textEN: 'Follow Fiori guidelines and use the form-based pattern. Guidelines exist because someone tested this already.',
        textCN: '遵循 Fiori 指南，使用表单式模式。指南的存在是因为已经有人测过了。',
        humorEN: 'Design systems exist so we don\'t reinvent the wheel 47 times per quarter.',
        humorCN: 'Design system 的存在是为了让我们不用每季度重复造 47 次轮子。',
        scores: { Align: 1 }
      }
    ]
  },

  // NEW QUESTION D5 - Spark vs Stabilize (1-0-1 TIEBREAKER)
  // Scoring: A=[1,0], B=[0,0], C=[0,1] for perfect 50/50 distribution
  {
    id: 'D5',
    dimension: 'D',
    textEN: 'Your feature is ready for release, but there\'s no time to write end-to-end tests. The PM says "ship now, test later."',
    textCN: '你的功能可以发布了，但没时间写端到端测试。PM 说"先上线，后面再测。"',
    options: [
      {
        id: 'A',
        textEN: 'Ship with manual smoke testing. Real users will find issues faster than writing tests.',
        textCN: '手动冒烟测试后上线。真实用户会比写测试更快发现问题。',
        humorEN: 'Production is the best test environment. Users are unpaid QA.',
        humorCN: '生产环境是最好的测试环境。用户是不拿工资的 QA。',
        scores: { Spark: 1 }
      },
      {
        id: 'B',
        textEN: 'Ship the feature behind a feature flag, monitor closely, and write tests for the next sprint.',
        textCN: '用 feature flag 上线，密切监控，下个 sprint 补测试。',
        humorEN: 'Feature flags: because "we\'ll fix it later" needs a safety net.',
        humorCN: 'Feature flag：因为"之后再修"需要一张安全网。',
        scores: {}
      },
      {
        id: 'C',
        textEN: 'Delay release until critical path tests are written. Bugs in production cost more than delayed features.',
        textCN: '延期发布直到关键路径测试完成。生产环境的 bug 比延期的成本更高。',
        humorEN: 'You can ship fast or ship broken. Pick one and own it.',
        humorCN: '你可以快速上线，也可以上线烂代码。选一个，然后承担后果。',
        scores: { Stabilize: 1 }
      }
    ]
  }
]
