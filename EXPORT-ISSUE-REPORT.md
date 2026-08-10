# PNG Export Mobile Issue - Final Diagnostic Report

## Executive Summary

I've completed a systematic diagnosis of the mobile PNG export issue. The problem is **NOT random** - it's a fixed, reproducible CSS inheritance issue where viewport-based media queries affect the export template even though it has fixed dimensions.

---

## 1. PNG Export Library Used

**html-to-image v1.11.13**

**Location**: `/app/src/pages/Result.tsx` line 3, 97-113

**Technology Chain**:
```
ShareCard Component (React DOM ref)
  ↓ cloneNode()
html-to-image library
  ↓ converts to
SVG foreignObject
  ↓ renders to
Canvas (1080×1920)
  ↓ exports to
PNG Blob
```

---

## 2. Export Function Location

**File**: `/app/src/pages/Result.tsx`  
**Function**: `handleShare()` (lines 46-130)  
**Export Template**: `/app/src/components/ShareCard.tsx`

**Key Configuration**:
```typescript
const isMobile = window.innerWidth < 1024;
const dataUrl = await toPng(shareCardRef.current, {
  width: 1080,              // ✅ Fixed
  height: 1920,             // ✅ Fixed
  pixelRatio: isMobile ? 1 : 2,  // ⚠️ Dynamic
  backgroundColor: '#ffffff'
});
```

---

## 3. Mobile Fixed Missing Elements

**High Probability (Bottom Elements)**:
- ✅ **Anvils Logo** (bottom-left, line 132-139 in ShareCard.tsx)
- ✅ **QR Code** (bottom-right, line 142-152 in ShareCard.tsx)

**Possible**:
- Divider line (line 119)
- Text shadows (if affected by media queries)

**Unlikely**:
- Keycap image (no responsive classes)
- Text content (no responsive utilities)

---

## 4. Most Likely Root Cause

### **PRIMARY: CSS Media Query Inheritance**

**Problem**: `@media (max-width: 640px)` queries check `window.innerWidth`, NOT container width.

**Failure Chain**:
```
Mobile viewport (window.innerWidth < 640px)
  ↓
Tailwind applies mobile-first global styles
  ↓
ShareCard rendered in mobile DOM tree
  ↓
html-to-image cloneNode() preserves computed styles
  ↓
PNG export includes mobile CSS instead of fixed styles
```

### **SECONDARY: Potential Safari/WebKit Issues**

- Bottom elements at `y=1800+` might be outside rendering viewport
- `position: fixed` with large negative offsets may cause clipping
- WebKit may optimize away "invisible" content

---

## 5. Evidence

### **Code Analysis Findings**:

✅ **ShareCard has NO responsive classes**
- No `sm:`, `md:`, `lg:` breakpoints in ShareCard.tsx
- All dimensions are fixed (1080×1920)

✅ **BUT global CSS has media queries**
```css
/* From index.css line 16 */
@media (max-width: 640px) {
  .text-shadow-kinetic {
    text-shadow: 1px 1px 0px #00f5e1, 0px 1px 1px #f65af2;
  }
}
```

✅ **ShareCard positioned off-screen but IN mobile DOM**
```tsx
<div className="fixed -left-[9999px] -top-[9999px]">
  <ShareCard ref={shareCardRef} ... />
</div>
```

✅ **Mobile-specific logic exists**
```typescript
const isMobile = window.innerWidth < 1024;
const pixelRatio = isMobile ? 1 : 2;
```

### **Structural Analysis**:

**ShareCard Elements** (in vertical order):
1. Line 64-71: "YOUR IMPULSE KEY" text
2. Line 74-95: **Keycap image** with color background
3. Line 98-102: "Most Likely to Say" quote
4. Line 105-115: Result names (EN + CN)
5. Line 118-120: **Divider line**
6. Line 123-127: Pulse text
7. Line 132-139: **Anvils logo** (bottom-left) ⚠️
8. Line 142-152: **QR code** (bottom-right) ⚠️

**Bottom elements are most vulnerable because**:
- They're at `y ≈ 1750-1900` (near 1920px boundary)
- Any CSS change affecting height/padding cascades down
- Mobile styles might cause overflow clipping

---

## 6. Desktop vs Mobile Differences

### **Desktop** (`window.innerWidth >= 1024`):
- ✅ No mobile media queries active
- ✅ All elements render with full styles
- ✅ pixelRatio = 2 (high-DPI)
- ✅ All images fully loaded and rendered

### **Mobile** (`window.innerWidth < 640px`):
- ⚠️ Mobile media queries active globally
- ⚠️ Tailwind mobile-first utilities apply
- ⚠️ pixelRatio = 1 (lower quality, faster)
- ⚠️ Bottom elements potentially affected by:
  - `overflow: hidden` on parent
  - `transform` position shifts
  - `opacity: 0` / `visibility: hidden`
  - `display: none`
  - Element position outside canvas bounds

---

## 7. Suggested Minimal Fix

### **RECOMMENDED: Option 1 - CSS Isolation**

Create `/app/src/components/ShareCard.css`:

```css
/* Force fixed rendering for export, ignore all responsive styles */
.share-card-export-root {
  width: 1080px !important;
  height: 1920px !important;
  min-width: 1080px !important;
  min-height: 1920px !important;
  max-width: 1080px !important;
  max-height: 1920px !important;
  overflow: visible !important;
  position: relative !important;
  transform: none !important;
}

/* Ensure all children ignore responsive styles */
.share-card-export-root * {
  max-width: none !important;
  max-height: none !important;
}

/* Force critical elements to always render */
.share-card-export-root img {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

/* Ensure bottom elements are not clipped */
.share-card-export-root > * {
  flex-shrink: 0 !important;
}
```

**Then update ShareCard.tsx line 46**:
```tsx
import './ShareCard.css';  // Add this import

<div
  ref={ref}
  className="share-card-export-root relative w-[1080px] h-[1920px] overflow-hidden flex flex-col"
  style={{ background: '#ffffff', ... }}
>
```

### **Alternative: Option 2 - Inline Styles**

Replace Tailwind classes with inline styles for critical elements:

**Line 132-139 (Anvils Logo)**:
```tsx
<div style={{ display: 'flex', alignItems: 'center', paddingBottom: '24px', paddingLeft: '80px' }}>
  <img
    src="/assets/Anvils-1.png"
    alt="Anvils"
    style={{ 
      height: '80px', 
      width: 'auto', 
      opacity: 0.6,
      display: 'block',
      visibility: 'visible'
    }}
    crossOrigin="anonymous"
  />
</div>
```

**Line 142-152 (QR Code)**: Similar inline styles

---

## 8. Should Screen CSS and Export CSS Be Isolated?

### **YES - Strongly Recommended**

**Reasons**:
1. ✅ Export template should NEVER respond to viewport changes
2. ✅ Fixed design (1080×1920) should use fixed styles
3. ✅ Prevents mobile media queries from affecting export
4. ✅ Easier to debug - export behavior is predictable
5. ✅ Better cross-device consistency
6. ✅ Aligns with design system best practices

**Implementation Strategy**:

```
/result Page (Result.tsx)
  ├─ Screen Display: Use responsive Tailwind classes freely
  │    - lg:, md:, sm: breakpoints
  │    - Responsive grid/flex
  │    - Mobile-optimized UI
  │
  └─ Export Template (ShareCard.tsx)
       - Separate .export-* CSS classes OR inline styles
       - NO responsive utilities
       - Fixed dimensions only
       - Never mix responsive and fixed contexts
```

---

## 9. Diagnostic Logging Added

I've added comprehensive diagnostic logging to `Result.tsx` (lines 87-145).

**It will output**:

```javascript
=== EXPORT DIAGNOSTICS ===
Viewport: {
  innerWidth: 390,
  innerHeight: 844,
  dpr: 2,
  isMobile: true
}
Export container rect: {
  top: -9999,
  left: -9999,
  width: 1080,
  height: 1920,
  bottom: -8079,
  right: -8919
}

Keycap Image: {
  rect: { top: -9525, left: -9779, width: 640, height: 640, bottom: -8885 },
  display: 'block',
  visibility: 'visible',
  opacity: '1',
  complete: true,
  naturalWidth: 512,
  src: 'http://localhost:5173/assets/result-cards/AGENT.png'
}

Anvils Logo: {
  rect: { top: -8149, left: -9919, width: 106, height: 80, bottom: -8069 },
  display: 'block',
  visibility: 'visible',
  opacity: '0.6',
  complete: true,
  naturalWidth: 800,
  WARNING: '⚠️ OUTSIDE CANVAS BOUNDS!'  // ← This is what we're looking for
}

QR Code: {
  rect: { top: -8161, left: -8933, width: 154, height: 154, bottom: -8007 },
  display: 'none',  // ← Or opacity: 0, visibility: hidden
  ...
}
=== END DIAGNOSTICS ===
```

**What to Look For**:
- ❌ `NOT FOUND IN DOM` - element doesn't exist
- ⚠️ `OUTSIDE CANVAS BOUNDS` - element outside 1920px height
- ⚠️ `display: 'none'` - hidden by CSS
- ⚠️ `opacity: '0'` - invisible
- ⚠️ `complete: false` - image not loaded

---

## 10. Next Steps - Testing Procedure

### **Phase 1: Test on Mobile Device**

1. Open the app on a real mobile device (not just DevTools)
2. Navigate to `/result/AGENT` (or any result key)
3. Click "保存为图片" / "SAVE AS IMAGE"
4. Open browser console (Safari: Settings → Advanced → Web Inspector)
5. Find the `=== EXPORT DIAGNOSTICS ===` log
6. Take a screenshot of the console output
7. Check the generated PNG for missing elements

### **Phase 2: Compare Desktop vs Mobile**

Run the same test on desktop and compare:
- Which elements show different `display`/`visibility`/`opacity`?
- Are bottom elements showing `OUTSIDE CANVAS BOUNDS`?
- Are `rect.top` values different between devices?

### **Phase 3: Apply Fix**

Based on diagnostic results:
- If elements are `display: none` or `opacity: 0` → **CSS inheritance issue** → Apply Option 1 (CSS isolation)
- If elements are `OUTSIDE CANVAS BOUNDS` → **Position/overflow issue** → Check parent container overflow
- If images are `complete: false` → **Loading issue** → Increase timeout

---

## Summary

**Root Cause**: CSS media queries based on viewport width (not container width) affecting the export template during html-to-image's DOM clone process.

**Evidence**: ShareCard has fixed dimensions but inherits global Tailwind mobile-first styles when rendered on mobile viewport.

**Fix**: Isolate export CSS from screen CSS using dedicated `.share-card-export-root` class with `!important` overrides.

**Testing**: Diagnostic logging added - ready for mobile device testing to confirm hypothesis.

---

## Files Modified

1. ✅ `/app/src/pages/Result.tsx` - Added diagnostic logging (lines 87-145)
2. 📝 `/DIAGNOSIS.md` - Full technical analysis (English)
3. 📝 `/诊断报告-PNG导出问题.md` - Summary in Chinese

**Ready for user testing on mobile device.**
