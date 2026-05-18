---
name: Tactile Impulse
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#59413c'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#8d716a'
  outline-variant: '#e1bfb8'
  surface-tint: '#ae3115'
  primary: '#ae3115'
  on-primary: '#ffffff'
  primary-container: '#ff6b4a'
  on-primary-container: '#661000'
  inverse-primary: '#ffb4a3'
  secondary: '#00677f'
  on-secondary: '#ffffff'
  secondary-container: '#8ee0fe'
  on-secondary-container: '#00647c'
  tertiary: '#755087'
  on-tertiary: '#ffffff'
  tertiary-container: '#b58bc7'
  on-tertiary-container: '#462358'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad2'
  primary-fixed-dim: '#ffb4a3'
  on-primary-fixed: '#3d0600'
  on-primary-fixed-variant: '#8c1900'
  secondary-fixed: '#b7eaff'
  secondary-fixed-dim: '#80d2ef'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#004e61'
  tertiary-fixed: '#f6d9ff'
  tertiary-fixed-dim: '#e3b6f6'
  on-tertiary-fixed: '#2d093f'
  on-tertiary-fixed-variant: '#5c386e'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  vibrant-pink: '#E14E97'
  soft-purple: '#A389D4'
  surface-stroke: '#EAEAEA'
  keycap-shadow: '#D1D5DB'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  motto-accent:
    fontFamily: Libre Caslon Text
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base-unit: 4px
  container-padding-mobile: 20px
  container-padding-desktop: 40px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is centered on a "Digital Tactility" narrative, merging the physical satisfaction of high-end mechanical keyboard culture with a soft, modern software aesthetic. The target audience is expressive, self-reflective, and digitally native.

The visual style is a sophisticated blend of **Modern Minimalism** and **Soft Neomorphism**, specifically utilizing "Keycap-inspired" components. This involves subtle 3D depth, soft-touch surfaces, and vibrant atmospheric gradients that suggest energy and internal "impulses." The emotional response should be one of playful discovery, comfort, and high-quality craftsmanship.

## Colors

The palette is anchored by "Action Coral" (#FF6B4A), used for primary calls to action and vocal points of the interface. This is supported by a spectrum of "Electric Pastels"—blues, purples, and pinks—that are primarily applied through linear gradients (45-degree angles) to create a sense of depth and movement.

The background is a clean, off-white neutral to allow the vibrant gradients to pop without causing visual fatigue. Secondary and tertiary colors are used for categorizing different personality traits or "keys," ensuring a high degree of color-coding clarity across the mobile-first experience.

## Typography

This design system utilizes **Plus Jakarta Sans** as the primary driver for all functional UI elements. Its geometric but soft curves echo the roundedness of keycaps. To add a layer of sophistication and "editorial soul," **Libre Caslon Text** is used sparingly for mottos, quotes, and reflective personality insights.

Hierarchy is established through significant weight variance in headlines (Bold/ExtraBold) versus body text (Regular). On mobile devices, headline sizes scale down slightly to maintain a high information density while preserving the playful, bold impact of the display type.

## Layout & Spacing

The layout follows a **fluid grid** philosophy optimized for vertical scrolling on mobile devices. A standard 12-column grid is used for desktop, but the mobile experience centers on a single-column stack with 20px safe-area margins.

Spacing follows an 8pt rhythm to ensure mathematical consistency between elements. Components like cards and "keys" use generous internal padding (typically 24px) to emphasize the soft, breathable nature of the design. Elements are grouped using "Stacking" logic, where related items have tighter spacing (8px) than distinct sections (32px).

## Elevation & Depth

Depth is the defining characteristic of this design system. We use **Tonal Layering** combined with **Keycap Shadows**. Instead of traditional, diffused global shadows, components utilize a dual-shadow approach:
1.  **The Base:** A soft, blurred ambient shadow to lift the card from the background.
2.  **The "Plinth":** A sharp, 2px to 4px solid or semi-transparent offset at the bottom of a component (mimicking the side profile of a mechanical keycap).

Interactive elements should feel "pressable." When active or hovered, the vertical offset should decrease, simulating a physical key-press. This creates a highly satisfying tactile loop for the user during the personality test.

## Shapes

The shape language is consistently **Rounded**. All container elements, buttons, and input fields utilize a 0.5rem (8px) base radius. For larger cards or keycap-style components, the radius scales to 1rem (16px) or 1.5rem (24px) to emphasize the soft, approachable aesthetic.

The "Keycap" component is a unique shape: a square or slightly rectangular container with a high corner radius, a subtle inner glow on the top edge, and the aforementioned "plinth" shadow at the bottom.

## Components

### Buttons & Keycaps
Buttons are styled as high-profile keycaps. The primary button uses the Action Coral gradient with a 4px bottom "lip" in a darker shade of the same hue. Labels are centered in Semi-Bold Plus Jakarta Sans.

### Cards
Cards are clean, white, or very light gray surfaces with a subtle 1px stroke (#EAEAEA). They use `rounded-lg` corners and an ambient shadow. Personality result cards feature a vibrant gradient header that bleeds into the white body.

### Chips & Inputs
Progress indicators and chips use "pill" shapes (full rounding) to contrast against the more structured keycap elements. Input fields are recessed (inner shadow) to indicate they are "slots" waiting to be filled.

### The "Impulse" Slider
A custom component for the test: a horizontal track with a large, circular, gradient-filled thumb. The track itself should have a subtle inner-shadow "groove" look, reinforcing the mechanical theme.

### Personality Keys
Small, square components representing different traits. These look like individual 1u keycaps, featuring a central icon or character and a subtle 3D lift.
