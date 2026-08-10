# PNG Export Mobile Issue - Diagnosis Report

## Issue Summary
- **Symptom**: PNG export missing fixed elements on mobile, works on desktop
- **Behavior**: Always the same elements missing (not random)
- **Export Method**: `html-to-image` (toPng) v1.11.13

---

## Analysis

### 1. PNG Export Library: **html-to-image**
**File**: `/app/src/pages/Result.tsx` (lines 3, 97-113)

```typescript
import { toPng } from 'html-to-image';

const dataUrl = await toPng(shareCardRef.current, {
  cacheBust: true,
  pixelRatio: isMobile ? 1 : 2,      // ⚠️ Dynamic based on viewport
  backgroundColor: '#ffffff',
  width: 1080,                        // ✅ Fixed size
  height: 1920,                       // ✅ Fixed size
  skipFonts: false,
  fetchRequestInit: {
    mode: 'cors',
    cache: 'no-cache'
  }
});
```

**Technology Chain**:
```
ShareCard DOM (ref: shareCardRef)
  → html-to-image cloneNode()
  → SVG foreignObject
  → Canvas
  → PNG (1080x1920)
```

---

### 2. Export Template Structure

**File**: `/app/src/components/ShareCard.tsx`

The `ShareCard` component is the export template:
- ✅ **Fixed dimensions**: `w-[1080px] h-[1920px]`
- ✅ **No responsive classes**: No `sm:`, `md:`, `lg:` breakpoints
- ✅ **Positioned off-screen**: `fixed -left-[9999px] -top-[9999px]`
- ✅ **Render isolation**: `pointer-events-none`

**Key Elements in ShareCard**:
1. **YOUR IMPULSE KEY** text (line 65-70)
2. **Keycap image** with color background (line 74-95)
3. **Most Likely to Say** quote (line 98-102)
4. **Result names** EN + CN (line 105-115)
5. **Divider** (line 118-120)
6. **Pulse text** (line 123-127)
7. **Anvils logo** bottom-left (line 132-139) ⚠️
8. **QR code** bottom-right (line 142-152) ⚠️

---

### 3. ROOT CAUSE ANALYSIS

#### ❌ **CRITICAL ISSUE #1: Tailwind CSS Responsive Classes Applied to Export Container**

The ShareCard uses **Tailwind utility classes**, which are affected by **global CSS breakpoints**:

```css
/* From index.css line 16 */
@media (max-width: 640px) {
  .text-shadow-kinetic {
    text-shadow: 1px 1px 0px #00f5e1, 0px 1px 1px #f65af2;
  }
}
```

**Problem**:
- The export template at line 958 is rendered as: `<div className="fixed -left-[9999px]...">`
- Even though positioned off-screen, it's **still in the mobile viewport DOM**
- When `window.innerWidth < 640px`, Tailwind's mobile-first responsive utilities apply
- The `@media (max-width: 640px)` queries check **viewport width**, NOT container width

#### ❌ **CRITICAL ISSUE #2: Image Loading State on Mobile**

```typescript
// Lines 63-85: Pre-load images
const imagesToPreload = [
  getKeycapAsset(result.key),
  '/assets/Anvils-1.png',        // ⚠️ Bottom logo
  '/assets/qr-code.png'           // ⚠️ Bottom QR code
];
```

**Potential Issues**:
1. **CORS**: Images have `crossOrigin="anonymous"` (lines 92, 137, 147)
2. **Loading timing**: 800ms wait may not be enough on mobile
3. **html-to-image clone**: May not preserve loaded images correctly on WebKit

#### ❌ **CRITICAL ISSUE #3: Position Rendering Outside Canvas**

The ShareCard is `1080px × 1920px` but positioned at:
```tsx
className="fixed -left-[9999px] -top-[9999px]"
```

**Potential Safari/WebKit Issue**:
- Elements positioned far off-screen may not fully render
- Safari might optimize away invisible content
- Bottom elements (logo, QR) at `y=1800+` might be clipped

---

### 4. MOST LIKELY ROOT CAUSE

**Primary Suspect: CSS Media Query Inheritance**

Even though the ShareCard component has fixed width `1080px`, the CSS media queries are based on:
- `window.innerWidth` (viewport)
- NOT the container's width

On mobile (`window.innerWidth < 640px`):
- Global Tailwind styles apply mobile-first rules
- Any element using responsive utilities gets mobile styles
- The export container inherits these styles during clone

**Evidence Needed**:
1. Which elements are missing? (Logo? QR code? Both? Others?)
2. Are they `display: none` or outside canvas bounds?
3. Do they have different computed styles on mobile vs desktop?

---

### 5. SUSPECTED MISSING ELEMENTS

Based on typical mobile export issues:

**High Probability**:
- ✅ Anvils logo (bottom-left, line 132-139)
- ✅ QR code (bottom-right, line 142-152)

**Possible**:
- Divider line (line 119)
- Text shadows or glows
- Background box-shadows

**Unlikely** (no responsive classes):
- Keycap image (fixed size, no breakpoints)
- Text content (no responsive utilities)

---

### 6. RECOMMENDED DIAGNOSIS STEPS

Add this debug code to `Result.tsx` before line 97 (`await toPng(...)`):

```typescript
// Debug: Log computed styles on mobile
const exportRoot = shareCardRef.current;
if (exportRoot) {
  console.log('=== EXPORT DIAGNOSTICS ===');
  console.log('Viewport:', {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    dpr: window.devicePixelRatio,
    isMobile
  });
  
  const rootRect = exportRoot.getBoundingClientRect();
  console.log('Export container rect:', rootRect);
  
  // Check bottom images
  const anvilsImg = exportRoot.querySelector('img[alt="Anvils"]');
  const qrImg = exportRoot.querySelector('img[alt="Scan QR Code"]');
  
  [
    { name: 'Anvils Logo', el: anvilsImg },
    { name: 'QR Code', el: qrImg }
  ].forEach(({ name, el }) => {
    if (el) {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      console.log(`${name}:`, {
        rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        position: style.position,
        transform: style.transform,
        complete: (el as HTMLImageElement).complete,
        naturalWidth: (el as HTMLImageElement).naturalWidth,
        src: (el as HTMLImageElement).src
      });
    } else {
      console.error(`${name}: NOT FOUND in DOM`);
    }
  });
}
```

---

### 7. RECOMMENDED FIX (Minimal Changes)

#### **Option A: Force Desktop Rendering (Temporary Hack)**

Temporarily widen viewport before export:

```typescript
// Before toPng
const originalWidth = document.body.style.width;
document.body.style.width = '1280px';

const dataUrl = await toPng(...);

// Restore
document.body.style.width = originalWidth;
```

⚠️ **Not recommended** - causes layout shift

#### **Option B: Isolate Export Styles (Recommended)**

Create a separate CSS scope for export:

```css
/* In ShareCard.tsx or index.css */
.export-card-container {
  /* Override ALL responsive styles */
  width: 1080px !important;
  height: 1920px !important;
  
  /* Force all children to ignore media queries */
  * {
    display: revert !important;
    visibility: revert !important;
    opacity: revert !important;
  }
}
```

Then wrap ShareCard:
```tsx
<div className="export-card-container">
  <ShareCard ref={shareCardRef} ... />
</div>
```

#### **Option C: Use Inline Styles (Best for Export)**

Replace Tailwind classes in ShareCard with inline styles:
- ✅ No media query interference
- ✅ Guaranteed cross-device consistency
- ❌ More verbose

---

### 8. VERIFICATION CHECKLIST

Before deploying fix:

- [ ] Test on actual mobile device (not just Chrome DevTools)
- [ ] Check Safari on iOS (WebKit rendering differences)
- [ ] Compare Desktop PNG vs Mobile PNG pixel-by-pixel
- [ ] Verify all images loaded: `img.complete === true`
- [ ] Check console for CORS errors
- [ ] Inspect element positions relative to 1920px height

---

## CONCLUSION

**Most Likely Root Cause**: CSS media queries based on viewport width affecting the export template, even though it has fixed dimensions.

**Evidence Required**: Run diagnostics to confirm which elements are missing and their computed styles on mobile.

**Recommended Action**: Add diagnostic logging first, then implement style isolation fix.

---

## FINAL DIAGNOSIS REPORT

### 1. PNG Export Uses: **html-to-image (v1.11.13)**

**Location**: `/app/src/pages/Result.tsx:97-113`

### 2. Export Function Location
**File**: `/app/src/pages/Result.tsx`
**Function**: `handleShare()` (lines 46-130)

### 3. Mobile Fixed Missing Elements
**Most Likely Missing**:
- Anvils logo (bottom-left)
- QR code (bottom-right)
- Possibly divider line

### 4. Most Likely Root Cause

**PRIMARY: CSS Media Query Inheritance**

The export template (`ShareCard`) uses Tailwind CSS classes, which are affected by viewport-based media queries. Even though the ShareCard has fixed dimensions (1080×1920), the CSS `@media (max-width: 640px)` queries check `window.innerWidth`, NOT the container width.

**Chain of Issues**:
```
Mobile viewport (< 640px)
  ↓
Tailwind applies mobile-first styles globally
  ↓
ShareCard rendered in mobile viewport DOM
  ↓
html-to-image cloneNode() preserves mobile styles
  ↓
PNG export uses mobile CSS instead of fixed styles
```

### 5. Evidence

**From code analysis**:
- ✅ ShareCard has NO responsive breakpoint classes (no `sm:`, `md:`, `lg:`)
- ✅ BUT global CSS has `@media (max-width: 640px)` rules
- ✅ ShareCard positioned off-screen but still in mobile DOM
- ✅ html-to-image clones DOM with current computed styles
- ⚠️ Bottom elements (logo at line 132, QR at line 142) most vulnerable

**Mobile-specific behaviors in code**:
- Line 93-94: `const isMobile = window.innerWidth < 1024; const pixelRatio = isMobile ? 1 : 2;`
- This confirms viewport-dependent logic exists in export

### 6. Desktop vs Mobile Differences

**Desktop** (`window.innerWidth >= 1024`):
- No mobile media queries apply
- All elements render with full styles
- pixelRatio = 2 (high-DPI)

**Mobile** (`window.innerWidth < 1024`):
- Mobile media queries may affect global styles
- Tailwind utilities may apply mobile-first rules
- pixelRatio = 1 (lower quality, faster)
- Bottom elements potentially affected by:
  - Overflow clipping
  - Transform changes
  - Opacity/visibility changes
  - Position shifts

### 7. Suggested Minimal Fix

**OPTION 1: Add Export-Specific CSS Isolation** (Recommended)

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

.share-card-export-root * {
  /* Prevent any mobile styles from applying */
  max-width: none !important;
  max-height: none !important;
}

.share-card-export-root img {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
```

Then update `ShareCard.tsx` line 46-48:
```tsx
<div
  ref={ref}
  className="share-card-export-root relative w-[1080px] h-[1920px] overflow-hidden flex flex-col"
```

**OPTION 2: Inline Critical Styles**

Replace Tailwind classes for critical elements with inline styles in `ShareCard.tsx`:

Lines 132-139 (Anvils logo):
```tsx
<div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
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

Lines 142-152 (QR code): Similar inline styles

### 8. Should Screen CSS and Export CSS Be Isolated?

**YES - Strongly Recommended**

**Reasons**:
1. ✅ Export template should NEVER respond to viewport changes
2. ✅ Fixed design (1080×1920) should use fixed styles
3. ✅ Prevents mobile media queries from affecting export
4. ✅ Easier to debug - export template is predictable
5. ✅ Better cross-device consistency

**Implementation**:
- Screen CSS: Use responsive Tailwind classes freely
- Export CSS: Use separate `.export-*` classes or inline styles only
- Never mix responsive and fixed-size contexts

### 9. Next Steps

**Phase 1: Diagnose** (COMPLETED)
- ✅ Added diagnostic logging to Result.tsx
- ✅ Ready to test on mobile device

**Phase 2: Test** (User Action Required)
1. Test PNG export on mobile device
2. Check browser console for diagnostic output
3. Compare logged values between desktop and mobile
4. Confirm which elements are missing

**Phase 3: Fix** (After confirmation)
1. Implement CSS isolation (Option 1) OR inline styles (Option 2)
2. Test on mobile again
3. Verify all elements present in PNG

### 10. Testing Checklist

- [ ] Open `/result/AGENT` on mobile browser
- [ ] Click "SAVE AS IMAGE" button
- [ ] Check browser console for diagnostic logs
- [ ] Note which elements show "NOT FOUND" or "OUTSIDE CANVAS BOUNDS"
- [ ] Compare desktop vs mobile diagnostic logs
- [ ] Share console output for final diagnosis
