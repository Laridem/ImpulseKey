# CSS Architecture - Screen vs Export Isolation

## Overview

This document outlines the CSS isolation strategy for IMPULSE KEYS to ensure the PNG export template is completely independent from responsive screen styles.

---

## Problem

**Before**: The `ShareCard` export template was affected by viewport-based media queries, causing elements to disappear on mobile devices during PNG export.

**Root Cause**: `@media (max-width: 640px)` queries check `window.innerWidth`, not container width.

---

## Solution: Complete CSS Isolation

### Architecture

```
Result Page (Result.tsx)
  │
  ├─ Screen Display Component
  │    ├─ Uses: Responsive Tailwind classes (sm:, md:, lg:)
  │    ├─ Behavior: Adapts to viewport size
  │    └─ Purpose: User-facing UI with mobile-optimized layout
  │
  └─ Export Template (ShareCard.tsx)
       ├─ Uses: .share-card-export-root + fixed Tailwind classes
       ├─ Behavior: Always renders at 1080×1920px
       └─ Purpose: PNG generation with predictable output
```

---

## Implementation

### 1. Export-Specific CSS (ShareCard.css)

**File**: `/app/src/components/ShareCard.css`

**Purpose**: Override ALL responsive styles for export template

**Key Rules**:
```css
.share-card-export-root {
  /* Fixed dimensions */
  width: 1080px !important;
  height: 1920px !important;
  
  /* Prevent layout shifts */
  overflow: visible !important;
  transform: none !important;
  
  /* Force all images to render */
  & img {
    display: block !important;
    visibility: visible !important;
  }
}
```

### 2. Component Integration

**File**: `/app/src/components/ShareCard.tsx`

**Changes**:
```tsx
import './ShareCard.css';  // Import isolation CSS

<div
  ref={ref}
  className="share-card-export-root relative w-[1080px] h-[1920px] ..."
>
  {/* All content here is isolated from responsive styles */}
</div>
```

### 3. Screen Display (Result.tsx)

**No changes needed** - continues to use responsive Tailwind classes:
```tsx
<div className="lg:col-span-4 flex flex-col gap-6">
  {/* Responsive layout for screen display */}
</div>
```

---

## Guidelines

### ✅ DO: Export Template

- Use `.share-card-export-root` wrapper class
- Use fixed pixel values (`1080px`, not `w-[1080px]`)
- Use inline styles for critical positioning
- Test on mobile device after every change
- Keep dimensions hardcoded

### ❌ DON'T: Export Template

- Use responsive breakpoints (`sm:`, `md:`, `lg:`)
- Use viewport units (`vh`, `vw`)
- Use media queries
- Rely on global CSS that might change
- Use percentage widths/heights

### ✅ DO: Screen Display

- Use responsive Tailwind classes freely
- Optimize for mobile UX
- Use flexbox/grid with breakpoints
- Adapt to viewport size

### ❌ DON'T: Screen Display

- Apply `.share-card-export-root` class
- Mix export and screen components

---

## Testing Checklist

### Desktop Testing
- [ ] Export PNG at 1920×1080 resolution
- [ ] Verify all elements present
- [ ] Check image quality (pixelRatio: 2)

### Mobile Testing
- [ ] Test on real iOS device (Safari)
- [ ] Test on real Android device (Chrome)
- [ ] Verify diagnostic logs show no "OUTSIDE CANVAS BOUNDS"
- [ ] Confirm all images loaded (`complete: true`)
- [ ] Check PNG contains:
  - [ ] Keycap image
  - [ ] Anvils logo (bottom-left)
  - [ ] QR code (bottom-right)
  - [ ] Divider line
  - [ ] All text content

### Regression Testing
- [ ] Screen display still responsive on mobile
- [ ] No visual regressions on desktop
- [ ] Export button works on both platforms

---

## File Structure

```
/app/src/
  ├── pages/
  │   └── Result.tsx              # Screen display (responsive)
  │
  ├── components/
  │   ├── ShareCard.tsx           # Export template (fixed)
  │   └── ShareCard.css           # Export isolation CSS
  │
  └── index.css                   # Global styles (responsive)
```

---

## Maintenance

### When Adding New Elements to ShareCard

1. **Always use fixed units**: `80px` not `w-20`
2. **Test on mobile immediately**: Don't batch changes
3. **Check diagnostic logs**: Look for warnings
4. **Verify position**: Ensure `y < 1920px`

### When Modifying Global CSS

1. **Never target `.share-card-export-root` children**
2. **Test export after global CSS changes**
3. **Avoid `* { }` selectors** - they affect export

### When Updating Tailwind Config

1. **Export template uses minimal Tailwind**
2. **Purge unused classes** - reduces bundle
3. **Test export compatibility**

---

## Troubleshooting

### Problem: Element missing on mobile export

**Check**:
1. Is element inside `.share-card-export-root`?
2. Does element have `display: block !important` in CSS?
3. Is element position `y < 1920px`?
4. Check diagnostic logs for "NOT FOUND" or "OUTSIDE CANVAS"

### Problem: Export quality low on mobile

**Check**:
1. `pixelRatio` in Result.tsx (currently `1` on mobile)
2. Image `naturalWidth` matches expected size
3. html-to-image options (cacheBust, skipFonts)

### Problem: Styles not applying

**Check**:
1. Is `ShareCard.css` imported?
2. Is `.share-card-export-root` class applied?
3. Are styles using `!important` to override Tailwind?
4. Check CSS specificity

---

## Benefits of This Architecture

✅ **Predictable**: Export always renders the same, regardless of viewport  
✅ **Maintainable**: Clear separation of concerns  
✅ **Debuggable**: Diagnostic logs pinpoint issues  
✅ **Scalable**: Easy to add new export templates  
✅ **Cross-platform**: Works on all devices consistently

---

## Related Files

- `/DIAGNOSIS.md` - Full technical analysis
- `/诊断报告-PNG导出问题.md` - Chinese summary
- `/EXPORT-ISSUE-REPORT.md` - Diagnostic report

---

*Last Updated: 2026-08-10*  
*Status: ✅ Implemented - Ready for testing*
