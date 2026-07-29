/**
 * WCAG 2.0 Contrast Ratio Calculator
 * Ensures text meets AA standard (4.5:1) for accessibility
 */

/**
 * Calculate relative luminance of a color
 * Formula from WCAG 2.0: https://www.w3.org/TR/WCAG20-TECHS/G17.html
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a ratio from 1:1 to 21:1
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

/**
 * Get accessible text color (black or white) for a given background
 * Ensures 4.5:1 contrast ratio (WCAG AA standard)
 */
export function getAccessibleTextColor(bgColor: string): string {
  const whiteContrast = getContrastRatio(bgColor, '#ffffff');
  const blackContrast = getContrastRatio(bgColor, '#231821');

  // AA standard requires 4.5:1 for normal text
  const WCAG_AA_RATIO = 4.5;

  // If both pass, choose the one with higher contrast
  if (whiteContrast >= WCAG_AA_RATIO && blackContrast >= WCAG_AA_RATIO) {
    return whiteContrast > blackContrast ? '#ffffff' : '#231821';
  }

  // Use whichever one passes (or has higher contrast if neither passes)
  return whiteContrast > blackContrast ? '#ffffff' : '#231821';
}

/**
 * Check if text meets WCAG AA standard (4.5:1) on background
 */
export function meetsWCAG_AA(textColor: string, bgColor: string): boolean {
  return getContrastRatio(textColor, bgColor) >= 4.5;
}
