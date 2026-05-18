/**
 * Keycap illustration assets
 * All 16 result types now have SVG illustrations
 */

export type KeycapType =
  | 'VOC' | 'FIORI' | 'PIXEL' | 'A11Y'
  | 'JOULE' | 'CTRL' | 'AGENT' | 'SAFE'
  | 'OData' | 'BTP' | 'CORE' | 'API'
  | 'QAQ' | 'LOGS' | 'TRIO' | 'FIRE'

/**
 * Get the path to a keycap illustration (SVG format)
 * @param type - The result type key (e.g., 'VOC', 'FIORI')
 * @returns Path to the SVG asset
 */
export function getKeycapAsset(type: KeycapType): string {
  return `/keycaps/Type=${type}.svg`
}

/**
 * Check if a keycap asset is available (all 16 are now available)
 */
export function hasKeycapAsset(type: KeycapType): boolean {
  return true // All 16 assets are now available!
}

/**
 * Get all available keycap types (all 16!)
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
 * Get keycap color for a given type (from tailwind.config.js)
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
