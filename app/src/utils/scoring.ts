import { UserAnswer, DimensionScores, ResultKey, Pole } from '../data/types'
import { getRole } from '../data/roles'

/**
 * Calculate dimension scores from user answers
 */
export function calculateScores(answers: UserAnswer[]): DimensionScores {
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
    Object.entries(answer.score).forEach(([pole, value]) => {
      scores[pole as Pole] += value
    })
  })

  return scores
}

/**
 * Apply role-based weight adjustments to dimension scores
 */
export function applyRoleWeights(scores: DimensionScores, roleId: string): DimensionScores {
  const role = getRole(roleId)
  if (!role || !role.weights) {
    return scores // No adjustments if role not found or no weights
  }

  const adjustedScores = { ...scores }

  // Apply small weight adjustments (typically +1 to +2 points per dimension)
  Object.entries(role.weights).forEach(([pole, weight]) => {
    adjustedScores[pole as Pole] += weight
  })

  return adjustedScores
}

/**
 * Map dimension scores to a result type
 * Based on which pole wins in each dimension
 *
 * With 5 questions per dimension:
 * - Max score: 10 per pole (5 questions × 2 points)
 * - Ties only possible if all 5 questions select middle option (B)
 * - Probability of tie: (1/3)^5 = 0.41% per dimension
 * - Across 4 dimensions: (1/3)^20 = 0.0000028% (effectively impossible)
 *
 * If tied, randomly choose to ensure 50/50 distribution (rare edge case)
 */
export function mapToResultKey(scores: DimensionScores): ResultKey {
  // Determine winner of each dimension (with random tiebreaker)
  const dimA = scores.Signal > scores.Solution
    ? 'Signal'
    : scores.Signal < scores.Solution
      ? 'Solution'
      : (Math.random() < 0.5 ? 'Signal' : 'Solution')

  const dimB = scores.Human > scores.Machine
    ? 'Human'
    : scores.Human < scores.Machine
      ? 'Machine'
      : (Math.random() < 0.5 ? 'Human' : 'Machine')

  const dimC = scores.Explore > scores.Align
    ? 'Explore'
    : scores.Explore < scores.Align
      ? 'Align'
      : (Math.random() < 0.5 ? 'Explore' : 'Align')

  const dimD = scores.Spark > scores.Stabilize
    ? 'Spark'
    : scores.Spark < scores.Stabilize
      ? 'Stabilize'
      : (Math.random() < 0.5 ? 'Spark' : 'Stabilize')

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
 * Calculate result key directly from answers
 * Combines calculateScores and mapToResultKey
 */
export function calculateResult(answers: UserAnswer[]): ResultKey {
  const scores = calculateScores(answers)
  return mapToResultKey(scores)
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
