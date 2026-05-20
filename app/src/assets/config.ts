/**
 * Asset Management System
 * Centralized configuration for all image and media assets
 */

/**
 * Keycap Types (16 personality results)
 */
export type KeycapType =
  | 'VOC' | 'FIORI' | 'PIXEL' | 'A11Y'
  | 'JOULE' | 'CTRL' | 'AGENT' | 'SAFE'
  | 'OData' | 'BTP' | 'CORE' | 'API'
  | 'QAQ' | 'LOGS' | 'TRIO' | 'FIRE'

/**
 * Design Screen Types (UI mockups)
 */
export type DesignScreenType =
  | 'landing'
  | 'testIntro'
  | 'question'
  | 'loading'
  | 'result'
  | 'resultExamples'

/**
 * Asset Paths Configuration
 * All paths are relative to /public directory
 */
export const ASSET_PATHS = {
  // Keycap illustrations (SVG format)
  keycaps: '/keycaps',

  // Design screens (PNG format)
  screens: {
    png: '/screens/png',
    svg: '/screens/svg'
  },

  // Icons and other assets
  icons: '/icons.svg',
  favicon: '/favicon.svg',

  // Key visual illustration
  keyVisual: '/impulse-key-visual.svg'
} as const

/**
 * Get keycap asset path
 * @param type - Keycap type (e.g., 'VOC', 'FIORI')
 * @returns Relative path to keycap SVG
 */
export function getKeycapAsset(type: KeycapType): string {
  return `${ASSET_PATHS.keycaps}/Type=${type}.svg`
}

/**
 * Get design screen asset path
 * @param screen - Screen type
 * @param format - Image format (png or svg)
 * @returns Relative path to screen mockup
 */
export function getScreenAsset(
  screen: DesignScreenType,
  format: 'png' | 'svg' = 'png'
): string {
  const screenNames: Record<DesignScreenType, string> = {
    landing: 'Landing_Web',
    testIntro: 'Test Intro_Web',
    question: 'Survey Question_Web',
    loading: 'Loading - IMPULSE KEYS (Tactile)',
    result: 'Comprehensive Result_Web',
    resultExamples: 'Results Examples'
  }

  const basePath = format === 'png' ? ASSET_PATHS.screens.png : ASSET_PATHS.screens.svg
  return `${basePath}/${screenNames[screen]}.${format}`
}

/**
 * Get all available keycap types
 */
export function getAllKeycaps(): KeycapType[] {
  return [
    'VOC', 'FIORI', 'PIXEL', 'A11Y',
    'JOULE', 'CTRL', 'AGENT', 'SAFE',
    'OData', 'BTP', 'CORE', 'API',
    'QAQ', 'LOGS', 'TRIO', 'FIRE'
  ]
}

/**
 * Check if a keycap asset exists
 */
export function hasKeycapAsset(type: KeycapType): boolean {
  return getAllKeycaps().includes(type)
}

/**
 * Keycap color mapping (for UI highlights and styling)
 */
export function getKeycapColor(type: KeycapType): string {
  const colors: Record<KeycapType, string> = {
    'VOC': '#FF6B4A',      // Orange/Coral
    'FIORI': '#4A90FF',    // Blue
    'PIXEL': '#FF4A8C',    // Pink
    'A11Y': '#8C4AFF',     // Purple
    'JOULE': '#FFD74A',    // Yellow/Gold
    'CTRL': '#9E9E9E',     // Gray/Silver
    'AGENT': '#4AFFDB',    // Teal
    'SAFE': '#4AFF7D',     // Green
    'OData': '#4AD9FF',    // Cyan
    'BTP': '#1A3A5C',      // Navy
    'CORE': '#8B4513',     // Brown
    'API': '#7DFFB8',      // Mint
    'QAQ': '#FFAB4A',      // Peach
    'LOGS': '#555555',     // Dark Gray
    'TRIO': '#9370DB',     // Violet
    'FIRE': '#FF4A4A',     // Red
  }
  return colors[type]
}
