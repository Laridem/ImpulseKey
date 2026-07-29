import { ResultType, Result, ResultKey } from '../data/types'

/**
 * Transform ResultType (storage format) to Result (display format)
 */
export function transformResult(resultType: ResultType): Result {
  return {
    key: resultType.key,
    name: {
      en: resultType.nameEN,
      zh: resultType.nameCN
    },
    motto: {
      en: resultType.mottoEN,
      zh: resultType.mottoCN
    },
    signal: {
      en: resultType.signalEN,
      zh: resultType.signalCN
    },
    pulse: {
      en: resultType.pulseEN,
      zh: resultType.pulseCN
    },
    risk: {
      en: resultType.riskEN,
      zh: resultType.riskCN
    },
    punchline: {
      en: resultType.punchlineEN,
      zh: resultType.punchlineCN
    },
    color: resultType.color,
    // V2 fields
    meetingBehaviorEN: resultType.meetingBehaviorEN,
    meetingBehaviorCN: resultType.meetingBehaviorCN,
    mostLikelyToSayEN: resultType.mostLikelyToSayEN,
    mostLikelyToSayCN: resultType.mostLikelyToSayCN
  }
}

/**
 * Get all results in display format
 */
export function getAllResults(): Record<ResultKey, Result> {
  const results = {} as Record<ResultKey, Result>
  // This will be populated from RESULTS
  return results
}
