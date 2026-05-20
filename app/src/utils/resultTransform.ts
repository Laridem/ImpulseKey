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
      en: resultType.motto,
      zh: resultType.motto // TODO: Add Chinese motto when available
    },
    signal: {
      en: resultType.signal,
      zh: resultType.signal // TODO: Add Chinese translation
    },
    pulse: {
      en: resultType.pulse,
      zh: resultType.pulse
    },
    risk: {
      en: resultType.risk,
      zh: resultType.risk
    },
    punchline: {
      en: resultType.punchlineEN,
      zh: resultType.punchlineCN
    },
    color: resultType.color
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
