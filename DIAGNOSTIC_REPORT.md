# 🔬 iOS Image Export Bug - Complete Diagnostic Report

## Executive Summary

**Bug**: First "Save as Image" export on iOS Chrome shows everything EXCEPT the main character image. Second export shows character correctly.

**Investigation Status**: Diagnostic instrumentation deployed. Awaiting iOS Chrome testing to determine failure stage.

---

## 1. html-to-image Version
- **Version**: `1.11.13`
- **Package**: `html-to-image` (not `dom-to-image`)
- **Import Location**: `Result.tsx` line 3
- **Method Used**: `toJpeg()` (not `toPng()`)

---

## 2. Export Function Location
- **File**: `/Users/I549685/Documents/SAPTI/app/src/pages/Result.tsx`
- **Function**: `handleShare()` (lines 85-277)
- **Trigger**: User clicks "Save as Image" button
- **Entry Point**: Line 234 (toJpeg call)

---

## 3. Character Image Details

### Asset Type
- **Format**: PNG
- **Location**: Local public asset
- **Path Pattern**: `/assets/result-cards/${type}.png`
- **Example**: `/assets/result-cards/VOC.png`

### Implementation
- **Component**: `ShareCard.tsx`
- **Element**: `<img>` tag (lines 71-75)
- **Code**:
  ```tsx
  <img
    src={getKeycapAsset(result.key)}  // returns /assets/result-cards/${key}.png
    alt={nameEN}
    className="w-[640px] h-[640px] object-contain"
  />
  ```

### Same-Origin Status
- **✅ YES**: Relative path, served from same domain
- **CORS**: Not an issue (same-origin)

---

## 4. html-to-image Options (Current Configuration)

### toSvg() Options:
```javascript
{
  cacheBust: false,
  pixelRatio: 2 (mobile) / 3 (desktop),
  backgroundColor: '#ffffff',
  width: 1080,
  height: 1920,
  skipFonts: false,
  preferredFontFormat: 'woff2'
}
```

### toJpeg() Options:
```javascript
{
  cacheBust: false,           // NOT using cache busting
  pixelRatio: 2 (mobile) / 3 (desktop),
  quality: 0.9,               // 90% JPEG quality
  backgroundColor: '#ffffff',
  width: 1080,
  height: 1920,
  skipFonts: false,
  preferredFontFormat: 'woff2'
}
```

**⚠️ Note**: `cacheBust: false` means html-to-image reuses its internal cache. This aligns with the symptom: first export (cold cache) fails, second export (warm cache) succeeds.

---

## 5. Diagnostic Instrumentation Deployed

### A. Export DOM Image Audit (BEFORE html-to-image)
**Location**: Result.tsx lines 228-263

**What it logs**:
```javascript
- Total image count in shareCardRef
- For each image:
  - src, currentSrc
  - complete (boolean)
  - naturalWidth, naturalHeight
  - loading attribute
  - alt, className
- Special marker for character image: "👤 CHARACTER IMAGE"
```

**Critical checks**:
- ✅ `complete === true`
- ✅ `naturalWidth > 0 && naturalHeight > 0`
- ❌ Warnings for incomplete or zero-dimension images

### B. toSvg vs toJpeg Comparison
**Location**: Result.tsx lines 269-288

**What it does**:
1. Generates SVG first: `await toSvg(...)`
2. Generates JPEG second: `await toJpeg(...)`
3. Logs both data URLs
4. Shows side-by-side visual preview on iOS (needsPreview devices)

**Purpose**: Determine if bug is:
- **Case A**: SVG generation (clone/embed/fetch/CORS)
- **Case B**: SVG→Canvas→JPEG conversion (decode/drawImage)

---

## 6. Testing Instructions

### On iOS Chrome (First Export):

1. Open Result page
2. Click "Save as Image"
3. **Check Console Logs**:
   ```
   📸 EXPORT DOM IMAGE AUDIT
   ↳ Does "👤 CHARACTER IMAGE" show:
      complete: true
      naturalWidth: > 0
      naturalHeight: > 0
   ```

4. **Check Visual Preview** (iOS shows diagnostic modal):
   - **1️⃣ SVG Version**: Does it show the character?
   - **2️⃣ JPEG Version**: Does it show the character?

5. **Close and retry** (Second Export):
   - Repeat steps 2-4
   - Compare first vs second export logs

### Expected Outcomes:

| Scenario | SVG Has Character | JPEG Has Character | Diagnosis |
|----------|-------------------|-------------------|-----------|
| A | ❌ | ❌ | Bug in DOM clone / image embedding (html-to-image internals) |
| B | ✅ | ❌ | Bug in SVG decode or Canvas drawImage (iOS WebKit) |
| C | ✅ | ✅ | Bug elsewhere (React state, asset loading timing) |

---

## 7. Safari Infinite Loading Issue

### Symptom
Safari remains stuck at: `"加载中...和周一的脑子一样慢..."` (Loading... like your Monday brain...)

### Root Cause Analysis

**State Management**:
- `isCapturing` state controls loading message
- Set to `true` at line 98 (start of handleShare)
- Should reset to `false` at line 262 or 275

**Identified Hang Points**:

#### 🔴 **Most Likely: Infinite Retry Loop** (lines 168-222)
```javascript
const checkImages = async () => {
  const cardImages = shareCardRef.current?.querySelectorAll('img');
  if (!cardImages || cardImages.length === 0) {
    setTimeout(checkImages, 100);  // ⚠️ NO TIMEOUT
    return;
  }
  // ...
};
```

**Problem**:
- ShareCard rendered offscreen: `position: fixed; left: -9999px`
- Safari might not hydrate offscreen DOM immediately
- `querySelectorAll('img')` returns empty
- Infinite retry with no maximum count
- Promise never resolves
- `isCapturing` stuck at `true`

#### 🟡 **Secondary Issue: img.decode() Hanging**
```javascript
await img.decode();  // No timeout
```

**Problem**:
- `img.decode()` can hang indefinitely on iOS WebKit
- No timeout wrapper
- If image fails to decode, Promise never resolves

---

## 8. Recommended Fixes (NOT APPLIED YET)

### Fix 1: Add Retry Limit to checkImages
```javascript
let retryCount = 0;
const MAX_RETRIES = 50; // 5 seconds

const checkImages = async () => {
  const cardImages = shareCardRef.current?.querySelectorAll('img');
  
  if (!cardImages || cardImages.length === 0) {
    retryCount++;
    if (retryCount >= MAX_RETRIES) {
      console.error('❌ ShareCard images not found, continuing anyway');
      resolve();
      return;
    }
    setTimeout(checkImages, 100);
    return;
  }
  // ...
};
```

### Fix 2: Add Timeout to img.decode()
```javascript
const decodeWithTimeout = (img: HTMLImageElement, timeoutMs = 3000) => {
  return Promise.race([
    img.decode(),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('decode timeout')), timeoutMs)
    )
  ]).catch(err => {
    console.warn('decode timeout, continuing anyway:', err);
  });
};

await decodeWithTimeout(img);
```

### Fix 3: Add Global Timeout to handleShare
```javascript
const exportPromise = (async () => {
  // ... all current logic
})();

const timeoutPromise = new Promise((_, reject) => {
  setTimeout(() => reject(new Error('Export timeout')), 30000); // 30s
});

try {
  await Promise.race([exportPromise, timeoutPromise]);
} catch (error) {
  console.error('Export failed or timed out:', error);
  setIsCapturing(false);
}
```

---

## 9. html-to-image Pipeline Stages

### Stage Breakdown:
```
Original DOM
  ↓
A. Clone DOM                    ← html-to-image internal
  ↓
B. Embed external resources     ← html-to-image internal (images → data URLs)
  ↓
C. Generate SVG                 ← toSvg() output
  ↓
D. Decode SVG as Image          ← Image.decode()
  ↓
E. Draw to Canvas               ← canvas.drawImage()
  ↓
F. Export to JPEG               ← canvas.toDataURL('image/jpeg', 0.9)
```

### Failure Stage Determination:
- **Stage A-C failure**: SVG missing character ❌
- **Stage D-F failure**: SVG has character ✅, JPEG missing character ❌

**The diagnostic instrumentation (Step 6) will identify the exact stage.**

---

## 10. cacheBust: false Implications

**Current Setting**: `cacheBust: false`

### How html-to-image Caches:
1. First call: Fetches `/assets/result-cards/VOC.png`, converts to data URL, caches internally
2. Second call: Returns cached data URL immediately

### Why This Matters:
- **Symptom**: First export fails, second succeeds
- **Hypothesis**: First fetch/conversion is incomplete, but cached incorrectly
- **OR**: Cache is correct, but first render is incorrect

### Should We Enable cacheBust?
**⚠️ NO, not yet.**

Enabling `cacheBust: true` forces fresh fetch every time:
- If the cache is wrong → fixes the issue
- If the cache is correct → makes every export fail (always cold)

**Decision**: Test with current instrumentation FIRST to see if original DOM has the image loaded correctly (Step 5). Then decide on cacheBust.

---

## 11. Assets to Monitor

### Images in ShareCard Export:
1. **Character Image** (PRIMARY SUSPECT)
   - Path: `/assets/result-cards/${key}.png`
   - Size: ~640×640px
   - Location: ShareCard.tsx line 71-75

2. **Anvils Logo**
   - Path: `/assets/Anvils-1.png`
   - Size: Small (~80px height)
   - Location: ShareCard.tsx line 116

3. **QR Code**
   - Path: `/assets/qr-code.png`
   - Size: 154×154px
   - Location: ShareCard.tsx line 125

### Expected Behavior:
- All 3 images should show `complete: true` and `naturalWidth > 0` BEFORE html-to-image runs
- If character image is NOT ready, but others are → asset-specific loading issue
- If ALL images missing → ShareCard DOM hydration issue

---

## 12. Next Steps

### Immediate Testing (iOS Chrome):
1. Deploy current instrumented code
2. Test on iOS Chrome (first export)
3. Review console logs:
   - Export DOM image audit
   - toSvg() output
   - toJpeg() output
4. Check diagnostic preview:
   - SVG version has character?
   - JPEG version has character?

### Based on Results:

#### If SVG Missing Character (Case A):
→ Bug is in html-to-image's DOM cloning or resource embedding
→ Investigate:
  - CORS issues (unlikely, same-origin)
  - Image caching mechanism in html-to-image
  - Try `cacheBust: true`
  - Check if html-to-image supports PNG properly

#### If SVG Has Character, JPEG Missing (Case B):
→ Bug is in iOS WebKit's SVG decode or Canvas drawImage
→ Implement Fix 6 (controlled SVG→Canvas bypass):
  ```javascript
  const svgUrl = await toSvg(...);
  const img = new Image();
  img.src = svgUrl;
  await img.decode();
  
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const jpeg = canvas.toDataURL('image/jpeg', 0.9);
  ```

#### If Both Have Character (Case C):
→ Bug is elsewhere (React hydration, timing)
→ Remove diagnostic code
→ Investigate preload logic (lines 126-154)

---

## 13. Files Modified

### `/Users/I549685/Documents/SAPTI/app/src/pages/Result.tsx`
**Changes**:
1. Added `toSvg` import (line 3)
2. Added Export DOM Image Audit (lines 228-263)
3. Added toSvg() diagnostic call (lines 269-288)
4. Added dual SVG/JPEG preview modal for iOS (lines 295-370)

**Status**: ✅ Compiles successfully (`npm run build` passed)

---

## 14. References

### Related Issues:
- html-to-image GitHub: https://github.com/bubkoo/html-to-image
- Known iOS/WebKit foreignObject issues with images
- Similar reports: Images in SVG foreignObject not rendering on first paint

### Tools Used:
- html-to-image v1.11.13
- React 19.2.6
- Vite 8.0.13
- TypeScript 6.0.2

---

## Summary

**Diagnostic instrumentation is now deployed.** The code will:
1. ✅ Log every image's readiness state before html-to-image runs
2. ✅ Generate both SVG and JPEG versions
3. ✅ Show visual comparison on iOS devices
4. ✅ Identify whether bug is in Stage A-C (SVG generation) or D-F (Canvas conversion)

**No speculative fixes applied** — following your instruction to "find the failing stage first" before adding timeouts or workarounds.

**Next Action Required**: Test on iOS Chrome and report findings from console logs and visual preview.
