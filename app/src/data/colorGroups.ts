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
// Based on dimension A (Signal/Solution) + dimension D (Spark/Stabilize)
export const COLOR_GROUPS: Record<ColorGroup, ColorGroupInfo> = {
  magenta: {
    key: 'magenta',
    nameEN: 'Magenta',
    nameCN: '紫红系',
    color: IMPULSE_COLORS.magenta,
    descriptionEN: 'Signal-driven with stabilizing execution',
    descriptionCN: '信号驱动，稳定执行',
    dimensionTraits: 'Signal + Stabilize'
  },
  yellow: {
    key: 'yellow',
    nameEN: 'Yellow',
    nameCN: '亮黄系',
    color: IMPULSE_COLORS.yellow,
    descriptionEN: 'Signal-driven with rapid response',
    descriptionCN: '信号驱动，快速响应',
    dimensionTraits: 'Signal + Spark'
  },
  cyan: {
    key: 'cyan',
    nameEN: 'Cyan',
    nameCN: '青绿系',
    color: IMPULSE_COLORS.cyan,
    descriptionEN: 'Solution-focused with rapid response',
    descriptionCN: '方案聚焦，快速响应',
    dimensionTraits: 'Solution + Spark'
  },
  purple: {
    key: 'purple',
    nameEN: 'Purple',
    nameCN: '蓝紫系',
    color: IMPULSE_COLORS.purple,
    descriptionEN: 'Solution-focused with stabilizing execution',
    descriptionCN: '方案聚焦，稳定执行',
    dimensionTraits: 'Solution + Stabilize'
  }
}

// Mapping: ResultKey → ColorGroup
// Based on dimension A (Signal/Solution) + dimension D (Spark/Stabilize)
export const RESULT_COLOR_MAPPING: Record<ResultKey, ColorGroup> = {
  // Magenta Group: Signal-driven + Stabilize (A=S dominant, D=H dominant)
  VOC: 'magenta',    // SSSS
  FIORI: 'magenta',  // SSSH
  A11Y: 'magenta',   // SSHH
  CTRL: 'magenta',   // SHSH

  // Yellow Group: Signal-driven + Spark (A=S, D=S)
  PIXEL: 'yellow',   // SSHS
  JOULE: 'yellow',   // SHSS
  AGENT: 'yellow',   // SHHS
  BTP: 'yellow',     // HSSH

  // Cyan Group: Solution-focused + Spark (A=H, D=S)
  SAFE: 'cyan',      // SHHH
  CORE: 'cyan',      // HSHS
  QAQ: 'cyan',       // HHSS
  TRIO: 'cyan',      // HHHS

  // Purple Group: Solution-focused + Stabilize (A=H dominant, D=H dominant)
  OData: 'purple',   // HSSS
  API: 'purple',     // HSHH
  LOGS: 'purple',    // HHSH
  FIRE: 'purple'     // HHHH
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
