import { ColorGroup, ColorGroupInfo, ResultKey } from './types'

/**
 * IMPULSE KEYS - Color Grouping System
 * Official Impulse26 Design Festival colors
 * Maps 16 personalities into 4 color groups based on dimensional characteristics
 */

// Official Impulse26 colors
export const IMPULSE_COLORS = {
  magenta: '#A100C2',
  yellow: '#FFC933',
  cyan: '#64EDD2',
  purple: '#7858FF'
} as const

// Color group definitions
export const COLOR_GROUPS: Record<ColorGroup, ColorGroupInfo> = {
  magenta: {
    key: 'magenta',
    nameEN: 'Magenta',
    nameCN: '紫红系',
    color: IMPULSE_COLORS.magenta,
    descriptionEN: 'Proactively discovering user needs, human-centered',
    descriptionCN: '主动发现用户需求，以人为本',
    dimensionTraits: 'Signal + Human'
  },
  yellow: {
    key: 'yellow',
    nameEN: 'Yellow',
    nameCN: '亮黄系',
    color: IMPULSE_COLORS.yellow,
    descriptionEN: 'Innovative technology, AI-driven experiences',
    descriptionCN: '技术创新，智能驱动',
    dimensionTraits: 'Signal + Machine'
  },
  cyan: {
    key: 'cyan',
    nameEN: 'Cyan',
    nameCN: '青绿系',
    color: IMPULSE_COLORS.cyan,
    descriptionEN: 'Stable and reliable, humanized solutions',
    descriptionCN: '稳定可靠，人性化解决',
    dimensionTraits: 'Solution + Human'
  },
  purple: {
    key: 'purple',
    nameEN: 'Purple',
    nameCN: '蓝紫系',
    color: IMPULSE_COLORS.purple,
    descriptionEN: 'System architecture, technical integration',
    descriptionCN: '系统架构，技术集成',
    dimensionTraits: 'Solution + Machine'
  }
}

// Mapping: ResultKey → ColorGroup
export const RESULT_COLOR_MAPPING: Record<ResultKey, ColorGroup> = {
  // Magenta Group: Signal + Human
  VOC: 'magenta',
  FIORI: 'magenta',
  A11Y: 'magenta',
  CTRL: 'magenta',

  // Yellow Group: Signal + Machine
  PIXEL: 'yellow',
  JOULE: 'yellow',
  AGENT: 'yellow',
  BTP: 'yellow',

  // Cyan Group: Solution + Human
  CORE: 'cyan',
  QAQ: 'cyan',
  SAFE: 'cyan',
  TRIO: 'cyan',

  // Purple Group: Solution + Machine
  OData: 'purple',
  API: 'purple',
  LOGS: 'purple',
  FIRE: 'purple'
}

// Helper function: Get color group info by result key
export function getColorGroupForResult(resultKey: ResultKey): ColorGroupInfo {
  const colorGroup = RESULT_COLOR_MAPPING[resultKey]
  return COLOR_GROUPS[colorGroup]
}

// Helper function: Get all results in a color group
export function getResultsInColorGroup(colorGroup: ColorGroup): ResultKey[] {
  return Object.entries(RESULT_COLOR_MAPPING)
    .filter(([_, group]) => group === colorGroup)
    .map(([key, _]) => key as ResultKey)
}

// Helper function: Get text color for background (accessibility)
export function getTextColorForGroup(colorGroup: ColorGroup): string {
  // Yellow and Cyan need dark text for better contrast
  return colorGroup === 'yellow' || colorGroup === 'cyan' ? '#000000' : '#FFFFFF'
}
