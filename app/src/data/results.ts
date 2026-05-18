import { ResultType } from './types'
import { getKeycapColor } from '../utils/assets'

/**
 * IMPULSE KEYS - Result Type Definitions
 * All 16 result types with full bilingual content
 */

export const results: Record<string, ResultType> = {
  VOC: {
    key: 'VOC',
    nameEN: 'Voice-of-Customer Detective',
    nameCN: '客户之声侦探',
    motto: 'Users rarely give answers. They leave evidence.',
    signal: 'User research is not just collecting quotes. It is turning messy signals into product decisions.',
    pulse: '你能从客户一句"这个不太方便"里，拆出角色、场景、任务、痛点和潜在机会点。',
    risk: '你问完 "why" 之后，会议可能再也回不到原来的 agenda。',
    punchlineEN: 'The customer said one thing, you opened a murder mystery.',
    punchlineCN: '客户说"不太方便"，你已经开始做案发现场还原了。',
    color: getKeycapColor('VOC')
  },

  FIORI: {
    key: 'FIORI',
    nameEN: 'Fiori Experience Guardian',
    nameCN: 'Fiori 体验守门员',
    motto: 'Technically working is not the same as usable.',
    signal: 'Consistency, usability, accessibility, and interaction patterns are product quality.',
    pulse: '你能在用户测试之前，就提前察觉到一个 confusing flow。',
    risk: '你说"just one small UX comment"，然后会议多了 37 分钟。',
    punchlineEN: 'The button works. The user does not.',
    punchlineCN: '按钮能点，不代表人类知道为什么要点。',
    color: getKeycapColor('FIORI')
  },

  PIXEL: {
    key: 'PIXEL',
    nameEN: 'Pixel-Level Perfectionist',
    nameCN: '像素级强迫症患者',
    motto: 'Two pixels can also be a product issue.',
    signal: 'UX design techniques are not decoration. Layout, hierarchy, spacing, wording, and visual priority all shape task success.',
    pulse: '你能看出哪里不对齐、哪里层级混乱、哪里文案会让用户产生误解。',
    risk: '别人以为你在调 UI，你其实在抢救用户认知负担。',
    punchlineEN: 'It is only 2px, but so is the beginning of chaos.',
    punchlineCN: '你以为我在纠结 2px，我其实在阻止混乱的开始。',
    color: getKeycapColor('PIXEL')
  },

  A11Y: {
    key: 'A11Y',
    nameEN: 'Accessibility Conscience',
    nameCN: '无障碍良心发现者',
    motto: 'If nobody can access it, nobody can love it.',
    signal: 'Accessibility is not an edge case. It is part of responsible product experience.',
    pulse: '你会提醒大家：不是所有用户都有同样的视觉能力、动作能力、语言背景和使用环境。',
    risk: '你可能让一个"已经差不多了"的设计突然多出很多必须面对的问题。',
    punchlineEN: 'Accessibility is invisible until someone is excluded.',
    punchlineCN: '无障碍设计是隐形的，直到有人被排除在外。',
    color: getKeycapColor('A11Y')
  },

  JOULE: {
    key: 'JOULE',
    nameEN: 'Joule Dream Weaver',
    nameCN: 'Joule 造梦师',
    motto: 'AI can generate code. You create the future.',
    signal: 'Generative AI is an opportunity to rethink workflows, not just automate old processes.',
    pulse: '你会想象：如果 AI 能理解上下文，哪些工作可以被重新定义？',
    risk: '你描述的 AI 未来太美好，可能让大家忘记现在还需要写 API。',
    punchlineEN: 'You see Joule as a co-pilot. Others see it as a chatbot.',
    punchlineCN: '你看到的是 copilot，别人看到的是聊天机器人。',
    color: getKeycapColor('JOULE')
  },

  CTRL: {
    key: 'CTRL',
    nameEN: 'Human Control Keeper',
    nameCN: '人类控制权守门员',
    motto: 'Automation should serve humans, not replace their agency.',
    signal: 'Human-AI interaction is not about removing humans. It is about designing the right handoff points.',
    pulse: '你会问：这个 AI 功能让用户感到 empowered 还是 powerless？',
    risk: '你可能成为 AI 团队眼中的"进度杀手"。',
    punchlineEN: 'AI confidence without human oversight is just expensive randomness.',
    punchlineCN: '没有人类监督的 AI，是昂贵的随机数生成器。',
    color: getKeycapColor('CTRL')
  },

  AGENT: {
    key: 'AGENT',
    nameEN: 'Agentic Workflow Prophet',
    nameCN: '智能体流程预言家',
    motto: 'The future of work is not tasks. It is orchestrated intelligence.',
    signal: 'AI agents can reason, plan, and execute. Product design must shift from "what users click" to "what agents do."',
    pulse: '你已经在思考：如果 AI agent 能代表用户做决策，product logic 该如何重构？',
    risk: '你描述的 agent 架构让工程师怀疑你是不是看了太多科幻片。',
    punchlineEN: 'You design for agents. Others still design forms.',
    punchlineCN: '你在设计 agent workflow，别人还在设计表单。',
    color: getKeycapColor('AGENT')
  },

  SAFE: {
    key: 'SAFE',
    nameEN: 'Trustworthy AI Therapist',
    nameCN: '可信 AI 心理咨询师',
    motto: 'If users don\'t trust it, they won\'t use it.',
    signal: 'AI safety, explainability, bias mitigation, and user trust are not compliance checkboxes. They are product decisions.',
    pulse: '你会问：AI 做出的决策，用户能理解吗？能挑战吗？能纠正吗？',
    risk: '你提出的"可解释性"要求可能让 AI 团队觉得你在为难他们。',
    punchlineEN: 'A black-box AI that works is still a black box.',
    punchlineCN: '能用的黑盒 AI，也还是黑盒。',
    color: getKeycapColor('SAFE')
  },

  OData: {
    key: 'OData',
    nameEN: 'Process Contract Cartographer',
    nameCN: '流程契约地图师',
    motto: 'Data models and process flows are not backend concerns. They are product architecture.',
    signal: 'Good products start with clear data contracts and process definitions.',
    pulse: '你能看出：这个功能背后需要什么 entity、什么 relationship、什么 state machine。',
    risk: '别人觉得你在画 UML 图，你其实在定义产品的骨架。',
    punchlineEN: 'You see workflows as state machines. Others see them as "just a form."',
    punchlineCN: '你看到的是状态机，别人看到的是"就一个表单"。',
    color: getKeycapColor('OData')
  },

  BTP: {
    key: 'BTP',
    nameEN: 'Prototype Escape Artist',
    nameCN: '原型逃生大师',
    motto: 'The best prototype is the one that answers the right question.',
    signal: 'Prototypes exist to learn, not to look pretty. Speed beats perfection.',
    pulse: '你能快速搭出一个"够用"的 demo，验证假设，然后扔掉重来。',
    risk: '你做的 prototype 可能被误认为"快要上线的版本"。',
    punchlineEN: 'You prototype to learn. Others prototype to show stakeholders.',
    punchlineCN: '你做 prototype 是为了学习，别人做是为了给 stakeholder 看。',
    color: getKeycapColor('BTP')
  },

  CORE: {
    key: 'CORE',
    nameEN: 'Clean Core Monk',
    nameCN: 'Clean Core 修行僧',
    motto: 'Extensions are inevitable. Chaos is not.',
    signal: 'Clean Core is not a restriction. It is a strategy to keep customizations maintainable.',
    pulse: '你能区分：什么该放在 Clean Core，什么该做成 extension，什么根本不该存在。',
    risk: '你可能成为"不让我改 standard code"的守门人。',
    punchlineEN: 'Clean Core today saves firefighting tomorrow.',
    punchlineCN: '今天的 Clean Core，省掉明天的救火。',
    color: getKeycapColor('CORE')
  },

  API: {
    key: 'API',
    nameEN: 'Developer Experience Whisperer',
    nameCN: 'API 体验低语者',
    motto: 'APIs are products. Developers are users.',
    signal: 'Good developer experience is not just documentation. It is intuitive design, clear errors, and thoughtful defaults.',
    pulse: '你能感知：这个 API 设计会让开发者骂人还是点赞。',
    risk: '你提出的 DX 改进可能被视为"不重要的细节"。',
    punchlineEN: 'You design APIs for humans. Others design them for machines.',
    punchlineCN: '你设计给人用的 API，别人设计给机器用的 API。',
    color: getKeycapColor('API')
  },

  QAQ: {
    key: 'QAQ',
    nameEN: 'Quality Empath',
    nameCN: '用户痛感 QA',
    motto: 'Testing is not finding bugs. It is protecting user experience.',
    signal: 'QA is not the last gate. It is an early advocate for quality.',
    pulse: '你测试的不是功能，而是用户会不会在这里卡住、困惑、或放弃。',
    risk: '你发现的"体验问题"可能被归类为"不是 bug"。',
    punchlineEN: 'You test what breaks users, not what breaks code.',
    punchlineCN: '你测的是用户会不会崩溃，不是代码会不会崩溃。',
    color: getKeycapColor('QAQ')
  },

  LOGS: {
    key: 'LOGS',
    nameEN: 'Production Reality Reader',
    nameCN: '生产现实解读师',
    motto: 'Logs don\'t lie. Design assumptions do.',
    signal: 'Real user behavior lives in production data, not design specs.',
    pulse: '你能从 error rate、latency、usage pattern 里读出用户的真实困境。',
    risk: '你指出的"数据真相"可能打脸产品假设。',
    punchlineEN: 'Your Grafana dashboard tells stories that design docs never will.',
    punchlineCN: '你的 Grafana dashboard 讲的故事，设计文档永远讲不出来。',
    color: getKeycapColor('LOGS')
  },

  TRIO: {
    key: 'TRIO',
    nameEN: 'HPOM Alignment Summoner',
    nameCN: 'HPOM 对齐召唤师',
    motto: 'Products fail when H, P, O, M speak different languages.',
    signal: 'Cross-functional alignment is not a meeting. It is a continuous practice.',
    pulse: '你能察觉：Human (UX)、Product (PM)、Operation (Eng) 和 Market 在哪里 misaligned。',
    risk: '你召唤的对齐会议可能让大家觉得"又要开会了"。',
    punchlineEN: 'You see silos before they become crises.',
    punchlineCN: '你能在问题变成危机之前看到部门墙。',
    color: getKeycapColor('TRIO')
  },

  FIRE: {
    key: 'FIRE',
    nameEN: 'Customer Firefighter',
    nameCN: '客户现场救火队长',
    motto: 'When customers hurt, action beats analysis.',
    signal: 'Customer-first thinking is not empathy theater. It is decisive action under pressure.',
    pulse: '你在客户 escalation 时能快速判断：先救火还是先搞清楚 root cause。',
    risk: '你的"救火优先"策略可能让团队觉得 process 不重要。',
    punchlineEN: 'You put out fires while others schedule root cause analysis meetings.',
    punchlineCN: '你在救火，别人在约 root cause analysis 会议。',
    color: getKeycapColor('FIRE')
  }
}

// Helper to get result by key
export function getResult(key: string): ResultType | undefined {
  return results[key]
}

// Get all result keys
export function getAllResultKeys(): string[] {
  return Object.keys(results)
}
