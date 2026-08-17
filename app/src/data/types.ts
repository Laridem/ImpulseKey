/**
 * Core type definitions for IMPULSE KEYS
 */

// Dummy export to prevent TypeScript from erasing this module
export const __types = true;

// Result type keys
export type ResultKey =
  | 'VOC' | 'FIORI' | 'PIXEL' | 'A11Y'
  | 'JOULE' | 'CTRL' | 'AGENT' | 'SAFE'
  | 'OData' | 'BTP' | 'CORE' | 'API'
  | 'QAQ' | 'LOGS' | 'TRIO' | 'FIRE'

// Dimension poles
export type Dimension = 'A' | 'B' | 'C' | 'D'

export type PoleA = 'Signal' | 'Human' | 'Explore' | 'Spark'
export type PoleB = 'Solution' | 'Machine' | 'Align' | 'Stabilize'
export type Pole = PoleA | PoleB

// Bilingual text interface
export interface BilingualText {
  en: string
  zh: string
}

// Question structure
export interface Question {
  id: string
  dimension: Dimension
  text?: BilingualText  // Optional for backward compatibility
  textEN: string
  textCN: string
  hintEN?: string  // Question-level hint text
  hintCN?: string
  options: QuestionOption[]
}

export interface QuestionOption {
  id: 'A' | 'B' | 'C'
  text?: BilingualText  // Optional for backward compatibility
  textEN: string
  textCN: string
  // Role-specific text variants
  textByRole?: {
    product_design?: BilingualText
    tech_engineering?: BilingualText
    business_strategy?: BilingualText
  }
  humor?: BilingualText  // Optional for backward compatibility
  humorEN: string
  humorCN: string
  score?: Partial<Record<Pole, number>>  // Optional for backward compatibility
  scores: Partial<Record<Pole, number>>
}

// Result type definition
export interface ResultType {
  key: ResultKey
  nameEN: string
  nameCN: string
  mottoEN: string
  mottoCN: string
  signalEN: string
  signalCN: string
  pulseEN: string
  pulseCN: string
  riskEN: string
  riskCN: string
  punchlineEN: string
  punchlineCN: string
  color: string
  colorGroup: ColorGroup
  // Long-form content for detail pages
  mottoLongCN?: string
  signalLongEN?: string
  signalLongCN?: string
  pulseLongEN?: string
  pulseLongCN?: string
  riskLongEN?: string
  riskLongCN?: string
  punchlineLongEN?: string
  punchlineLongCN?: string
  // V2 Framework - New fields
  meetingBehaviorEN?: string
  meetingBehaviorCN?: string
  mostLikelyToSayEN?: string
  mostLikelyToSayCN?: string
}

// User's answer
export interface UserAnswer {
  questionId: string
  selectedOption: 'A' | 'B' | 'C'
  dimension: Dimension
  score: Partial<Record<Pole, number>>
}

// Result for display
export interface Result {
  key: ResultKey
  name: BilingualText
  motto: BilingualText
  signal: BilingualText
  pulse: BilingualText
  risk: BilingualText
  punchline: BilingualText
  color: string
  // V2 fields
  meetingBehaviorEN?: string
  meetingBehaviorCN?: string
  mostLikelyToSayEN?: string
  mostLikelyToSayCN?: string
}

// Dimension scores
export interface DimensionScores {
  Signal: number
  Solution: number
  Human: number
  Machine: number
  Explore: number
  Align: number
  Spark: number
  Stabilize: number
}

// Color groups for 4-color personality system
export type ColorGroup = 'magenta' | 'yellow' | 'cyan' | 'purple'

export interface ColorGroupInfo {
  key: ColorGroup
  nameEN: string
  nameCN: string
  color: string
  descriptionEN: string
  descriptionCN: string
  dimensionTraits: string
}
