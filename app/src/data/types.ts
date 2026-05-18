/**
 * Core type definitions for IMPULSE KEYS
 */

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

// Question structure
export interface Question {
  id: string
  dimension: Dimension
  textEN: string
  textCN: string
  options: QuestionOption[]
}

export interface QuestionOption {
  id: 'A' | 'B' | 'C'
  textEN: string
  textCN: string
  humorEN: string
  humorCN: string
  scores: Partial<Record<Pole, number>>
}

// Result type definition
export interface ResultType {
  key: ResultKey
  nameEN: string
  nameCN: string
  motto: string
  signal: string
  pulse: string
  risk: string
  punchlineEN: string
  punchlineCN: string
  color: string
}

// User's answer
export interface Answer {
  questionId: string
  optionId: 'A' | 'B' | 'C'
  scores: Partial<Record<Pole, number>>
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

// Final result
export interface TestResult {
  resultKey: ResultKey
  scores: DimensionScores
  answers: Answer[]
}
