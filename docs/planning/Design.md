---
name: Kinetic Pulse Light
colors:
  surface: '#fff7f9'
  surface-dim: '#e8d5e1'
  surface-bright: '#fff7f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ffeff8'
  surface-container: '#fce8f5'
  surface-container-high: '#f7e3ef'
  surface-container-highest: '#f1ddea'
  on-surface: '#231821'
  on-surface-variant: '#534150'
  inverse-surface: '#392d36'
  inverse-on-surface: '#ffebf8'
  outline: '#867181'
  outline-variant: '#d8bfd1'
  surface-tint: '#a800aa'
  primary: '#a800aa'
  on-primary: '#ffffff'
  primary-container: '#f65af2'
  on-primary-container: '#610062'
  primary-dark: '#800082'
  inverse-primary: '#ffaaf5'
  secondary: '#5d38e3'
  on-secondary: '#ffffff'
  secondary-container: '#7656fd'
  on-secondary-container: '#fffbff'
  tertiary: '#006b5b'
  on-tertiary: '#ffffff'
  tertiary-container: '#00b098'
  on-tertiary-container: '#003b32'
  accent-cyan: '#00f5e1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '80px'
    letterSpacing: -3.2px
  display-lg:
    fontFamily: 72 Brand
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '57.6px'
    letterSpacing: -0.96px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '32px'
    letterSpacing: -0.6px
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '700'
    lineHeight: '24px'
  body-lg:
    fontFamily: 72 Brand / Hanken Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '29.25px'
  body-md:
    fontFamily: 72 Brand
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: 72 Brand
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '22.75px'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '18px'
    letterSpacing: normal
    textTransform: uppercase
rounded:
  sm: 4px
  DEFAULT: 8px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1280px
shadows:
  soft: 0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)
  soft-lg: 0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)
  text-kinetic: 5px 5px 0px #00f5e1, 0px 4px 4px #f65af2
---

## Brand & Style
This design system is a refined, high-energy light-mode aesthetic that balances technical precision with approachable softness. It targets developers, innovators, and creative technologists who require a professional workspace with personality.

The style is **Technical Elegance**: it combines the clarity of pristine white surfaces with vibrant neon accents, soft rounded corners, and subtle shadows. The emotional response is one of precision, energy, and modern sophistication. The UI feels both professional and playful, technical yet approachable.

## Colors
The palette centers on a clean white (`#FFFFFF`) canvas with soft pastels for containers. Readability is prioritized through high-contrast text colors.

### Primary Palette
- **Primary Magenta (#A800AA):** Brand color, used for headers, key UI elements, and branding
- **Primary Container (#F65AF2):** Vibrant pink for primary actions and focus states
- **Primary Dark (#800082):** Deeper shade for hover states and bottom borders
- **Secondary Indigo (#5D38E3):** Used for secondary emphasis and structural highlights
- **Tertiary Teal (#00B098):** Accent for decorative elements
- **Accent Cyan (#00F5E1):** Special effect color for text shadows and visual pop

### Surface Colors
- **Container Low (#FFEFF8):** Soft pink-white for card backgrounds
- **Container High (#F7E3EF):** Slightly deeper for tags and badges
- **Outline Variant (#D8BFD1):** Subtle borders for cards and dividers

### Usage Guidelines
- Use soft pastels (#FFEFF8, #F7E3EF) for card backgrounds, not pure white
- Borders should be subtle (#D8BFD1) at 1px for containers
- Accent borders at 4px for emphasis (primary button bottom, decorative corners)
- Text colors: #231821 (primary), #534150 (secondary)

## Typography
This system uses a **multi-font hierarchy** to create visual variety and semantic meaning:

### Font Families
1. **Space Grotesk** - Display headings and brand elements (bold, geometric, technical)
2. **72 Brand (SAP)** - Body text, subtitles, UI labels (clean, professional)
3. **Hanken Grotesk** - About/content sections (readable, friendly)
4. **JetBrains Mono** - Technical labels, tags, code-like elements (monospace)

### Hierarchy
- **Display XL (80px):** Main hero titles only, with text-shadow effect
- **Display LG (48px):** Section headings, page titles
- **Headline MD (24px):** Logo, navigation elements
- **Headline SM (16px):** Card titles, subsection headers
- **Body LG/MD/SM (18/16/14px):** Content text, descriptions
- **Label Caps (12px):** Technical tags, uppercase labels

### Special Effects
- Main title uses **text-shadow-kinetic**: dual shadow (cyan hard + pink blur) for dramatic visual impact
- Labels are uppercase with JetBrains Mono for technical aesthetic

## Layout & Spacing
The layout follows a **12-column grid** on desktop with generous spacing.

- **Container Max:** 1280px centered
- **Desktop Margins:** 64px horizontal padding
- **Mobile Margins:** 16px horizontal padding
- **Vertical Rhythm:** 24px base gutter, scales in 4px increments
- **Section Spacing:** 96px vertical for major sections
- **Component Gaps:** 16px, 24px, 32px depending on relationship

## Elevation & Depth
Depth is achieved through **soft shadows** and **layered borders**.

### Shadows
- **Soft:** `0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)`
- **Soft LG:** `0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)`
- Use for buttons, cards, and floating elements
- Shadows are subtle blur-based, not hard geometric

### Border Emphasis
- Standard: 1px solid for containers and dividers
- Accent: 4px solid for bottom borders (buttons) and decorative corners
- Corner decorations: 4px borders on 2 sides only for geometric interest

## Shapes
The shape language uses **soft rounded corners** for approachability.

### Border Radius
- **Small (4px):** Tags, badges, small UI elements
- **Medium (8px):** Buttons, standard cards
- **Large (12px):** Large containers, hero sections
- **Full (9999px):** Pills (header button)

Rounded corners soften the technical aesthetic while maintaining a modern feel.

## Components

### Buttons
- **Primary:** Purple background (#A800AA), white text, 8px rounded, 4px bottom border (#800082), soft shadow
- **Secondary:** Light background (#F7E3EF), dark text, 1px border (#867181), 8px rounded, hover changes border to primary
- **Pill:** Full rounded for header actions

### Cards
- Background: #FFEFF8 (soft pink-white)
- Border: 1px #D8BFD1
- Rounded: 12px
- Padding: 24-25px
- No top-border color coding (cleaner look)

### Tags & Badges
- Background: #F7E3EF
- Border: 1px #A800AA
- Text: #A800AA, JetBrains Mono, uppercase
- Rounded: 4px
- Padding: tight (8-13px horizontal)

### Hero Visual Frame
- White container with 2px primary border
- Decorative 4px corner borders (teal top-left, magenta bottom-right)
- Inner frame with 1px subtle border
- Soft shadow for elevation
- White decorative blocks overlay for visual interest

### Technical Elements
- Use JetBrains Mono for labels
- Uppercase transformation
- Primary magenta color for technical text
- Tight letter spacing (normal, not expanded)
