# Design Gap Analysis: Figma vs. Design.md

**Date**: 2026-07-27  
**Purpose**: Identify discrepancies between the Figma design (node 246:20) and the Kinetic Pulse Light design system specification.

---

## 🔴 CRITICAL CONFLICTS

### 1. **Border Radius / Shape Language**

**Design.md Says:**
> "The shape language is strictly **Sharp (0px)**. Every element—from buttons and input fields to large container cards—must have 90-degree corners."

**Figma Shows:**
- Buttons: `rounded-[8px]` (8px radius)
- Cards: `rounded-[12px]` (12px radius)
- Tags: `rounded-[4px]` (4px radius)
- Header button: `rounded-[9999px]` (pill shape)

**❌ CONFLICT**: Guideline mandates 0px, Figma uses 4-12px consistently

---

### 2. **Typography System**

**Design.md Says:**
> "**Space Grotesk** is the exclusive typeface"

**Figma Shows:**
- `Space Grotesk` - Main headings (80px, 48px, 24px)
- `72 Brand` - Body text and subtitles (18px, 16px, 14px)
- `Hanken Grotesk` - About section body (18px)
- `JetBrains Mono` - Technical labels/tags (12px)

**❌ CONFLICT**: Guideline says "exclusive", Figma uses 4 different fonts

---

### 3. **Shadows & Depth**

**Design.md Says:**
> "Use a 'hard' shadow: a solid offset block of color (Indigo or Pink) at 4px displacement with 0 blur."

**Figma Shows:**
```css
shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]
shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]
```

**❌ CONFLICT**: Guideline wants hard/geometric shadows, Figma uses soft blur shadows

---

### 4. **Text Shadow Effect**

**Design.md Says:**
> "Avoid gradients or blurs to maintain the crisp, 'Kinetic' light-mode aesthetic."

**Figma Shows:**
```css
text-shadow: 5px 5px 0px #00f5e1, 0px 4px 4px #f65af2
```
- Cyan hard shadow + Pink blur shadow on main title

**⚠️ PARTIAL CONFLICT**: Text shadow combines both hard and blur effects

---

## 🟡 SEMANTIC DIFFERENCES

### 5. **Color Palette Usage**

**Design.md Colors:**
```yaml
primary: '#a800aa'
primary-container: '#f65af2'
secondary: '#5d38e3'
tertiary: '#006b5b'
```

**Figma Actual Colors:**
```css
primary: '#a800aa' ✅ (matches)
primary-container: '#f65af2' ✅ (matches) 
secondary: '#5d38e3' ✅ (matches)
tertiary/teal: '#00f5e1' ❌ (not in guideline!)
outline-variant: '#d8bfd1' ✅ (matches)
surface-container-low: '#ffeff8' ✅ (matches)
surface-container-high: '#f7e3ef' ✅ (matches)
```

**❌ NEW COLOR**: Cyan `#00f5e1` appears in text-shadow but is NOT in the design system specification

---

### 6. **Border Styling**

**Design.md Says:**
> "Geometric Framing: Use `1px` or `2px` solid borders"

**Figma Shows:**
- Most borders: `border` (1px) ✅
- Primary button: `border-b-4` (4px bottom border) ❌
- Hero visual corners: `border-l-4 border-t-4` and `border-b-4 border-r-4` ❌
- Tag badge: `border` (1px) ✅

**⚠️ MIXED**: Uses 1px as standard, but 4px for decorative/emphasis borders

---

## 🟢 MATCHES

### 7. **Colors (Mostly Aligned)**

| Token | Design.md | Figma | Status |
|-------|-----------|-------|--------|
| `surface-container-lowest` | `#ffffff` | `#ffffff` (white bg) | ✅ |
| `surface-container-low` | `#ffeff8` | `#ffeff8` | ✅ |
| `surface-container-high` | `#f7e3ef` | `#f7e3ef` | ✅ |
| `primary` | `#a800aa` | `#a800aa` | ✅ |
| `on-surface` | `#231821` | `#231821` | ✅ |
| `on-surface-variant` | `#534150` | `#534150` | ✅ |
| `outline-variant` | `#d8bfd1` | `#d8bfd1` | ✅ |

---

### 8. **Spacing System**

**Design.md:**
- Unit: 4px
- Gutter: 24px
- Desktop margin: 48px

**Figma:**
- Gaps: `gap-[16px]` (16px = 4×4), `gap-[24px]` (24px = 6×4), `gap-[32px]` (32px = 8×4) ✅
- Padding: `px-[64px]` (64px desktop margin) ❌ (guideline says 48px)
- Container: `py-[96px]` (96px vertical) ✅ (24×4)

**⚠️ MOSTLY ALIGNED**: Uses 4px rhythm, but desktop horizontal padding is 64px not 48px

---

### 9. **Font Sizes**

**Design.md:**
```yaml
display-lg: 48px
headline-md: 24px
body-lg: 18px
body-md: 16px
label-caps: 12px
```

**Figma:**
- Main title: `80px` ❌ (not in system)
- Subtitle: `48px` ✅ (matches display-lg)
- Header logo: `24px` ✅ (matches headline-md)
- Body: `18px`, `16px`, `14px` ⚠️ (14px not defined)
- Technical label: `12px` ✅ (matches label-caps)

**⚠️ EXTENDED**: Figma adds 80px and 14px sizes not in spec

---

## 📊 SUMMARY

### Critical Decisions Needed:

1. **🔴 Border Radius**: 0px (guideline) vs. 4-12px (Figma)
2. **🔴 Typography**: Single font (guideline) vs. Multi-font (Figma)
3. **🔴 Shadow Style**: Hard geometric (guideline) vs. Soft blur (Figma)
4. **🟡 Text Shadow**: None (implied) vs. Dual cyan+pink (Figma)
5. **🟡 Cyan Accent**: Not defined (guideline) vs. Used in title (Figma)

### Recommendation:

**The Figma design represents the FINAL, REFINED visual system** and should take precedence. The Design.md appears to be an earlier conceptual guideline that described the "Modern Tech-Brutalism" direction, but the Figma shows the actual implementation has softened to a more approachable aesthetic while maintaining the core color palette and technical feel.

### Proposed Action:

1. ✅ **Follow Figma exactly** for implementation
2. 📝 **Update Design.md** to match the refined Figma specifications
3. 🎨 **Document the multi-font system** properly
4. 🔧 **Add cyan `#00f5e1`** to the color tokens as a utility color
