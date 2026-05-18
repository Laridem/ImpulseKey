import { Answer, DimensionScores, ResultKey, Pole } from '../data/types'

/**
 * Calculate dimension scores from user answers
 */
export function calculateScores(answers: Answer[]): DimensionScores {
  const scores: DimensionScores = {
    Signal: 0,
    Solution: 0,
    Human: 0,
    Machine: 0,
    Explore: 0,
    Align: 0,
    Spark: 0,
    Stabilize: 0
  }

  // Sum up all scores from answers
  answers.forEach(answer => {
    Object.entries(answer.scores).forEach(([pole, value]) => {
      scores[pole as Pole] += value
    })
  })

  return scores
}

/**
 * Map dimension scores to a result type
 * Based on which pole wins in each dimension
 */
export function mapToResultKey(scores: DimensionScores): ResultKey {
  // Determine winner of each dimension
  const dimA = scores.Signal >= scores.Solution ? 'Signal' : 'Solution'
  const dimB = scores.Human >= scores.Machine ? 'Human' : 'Machine'
  const dimC = scores.Explore >= scores.Align ? 'Explore' : 'Align'
  const dimD = scores.Spark >= scores.Stabilize ? 'Spark' : 'Stabilize'

  // Mapping table: [DimA, DimB, DimC, DimD] → ResultKey
  const mapping: Record<string, ResultKey> = {
    'Signal-Human-Explore-Spark': 'VOC',
    'Signal-Human-Explore-Stabilize': 'FIORI',
    'Signal-Human-Align-Spark': 'PIXEL',
    'Signal-Human-Align-Stabilize': 'A11Y',

    'Signal-Machine-Explore-Spark': 'JOULE',
    'Signal-Machine-Explore-Stabilize': 'CTRL',
    'Signal-Machine-Align-Spark': 'AGENT',
    'Signal-Machine-Align-Stabilize': 'SAFE',

    'Solution-Human-Explore-Spark': 'OData',
    'Solution-Human-Explore-Stabilize': 'BTP',
    'Solution-Human-Align-Spark': 'CORE',
    'Solution-Human-Align-Stabilize': 'API',

    'Solution-Machine-Explore-Spark': 'QAQ',
    'Solution-Machine-Explore-Stabilize': 'LOGS',
    'Solution-Machine-Align-Spark': 'TRIO',
    'Solution-Machine-Align-Stabilize': 'FIRE'
  }

  const key = `${dimA}-${dimB}-${dimC}-${dimD}`
  return mapping[key] || 'VOC' // Fallback to VOC if mapping fails
}

/**
 * Calculate percentages for dimension visualization
 */
export function calculatePercentages(scores: DimensionScores): {
  Signal: number
  Solution: number
  Human: number
  Machine: number
  Explore: number
  Align: number
  Spark: number
  Stabilize: number
} {
  const dimATotal = scores.Signal + scores.Solution
  const dimBTotal = scores.Human + scores.Machine
  const dimCTotal = scores.Explore + scores.Align
  const dimDTotal = scores.Spark + scores.Stabilize

  return {
    Signal: dimATotal > 0 ? Math.round((scores.Signal / dimATotal) * 100) : 50,
    Solution: dimATotal > 0 ? Math.round((scores.Solution / dimATotal) * 100) : 50,
    Human: dimBTotal > 0 ? Math.round((scores.Human / dimBTotal) * 100) : 50,
    Machine: dimBTotal > 0 ? Math.round((scores.Machine / dimBTotal) * 100) : 50,
    Explore: dimCTotal > 0 ? Math.round((scores.Explore / dimCTotal) * 100) : 50,
    Align: dimCTotal > 0 ? Math.round((scores.Align / dimCTotal) * 100) : 50,
    Spark: dimDTotal > 0 ? Math.round((scores.Spark / dimDTotal) * 100) : 50,
    Stabilize: dimDTotal > 0 ? Math.round((scores.Stabilize / dimDTotal) * 100) : 50
  }
}
