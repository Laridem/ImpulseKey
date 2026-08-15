# Mobile Image Export Issue - Fix Documentation

## Problem Summary

**Symptom**: On iOS Chrome mobile, clicking "Save as Image" the first time results in incomplete image export (missing keycap image and QR code). The second click works perfectly.

**Affected Platform**: iOS Chrome mobile only (desktop works fine)

**User Impact**: High - Users must click twice to successfully export their result

---

## Root Cause Analysis

### Why This Happens

1. **Asynchronous Image Rendering on iOS**
   - Browser cache preload ≠ DOM rendering complete
   - iOS Chrome has different timing for image decode/render compared to desktop
   - `html-to-image` library captures before images finish rendering

2. **ShareCard Hidden Positioning**
   - ShareCard is positioned at `left: -9999px` (off-screen)
   - iOS browsers may deprioritize rendering of off-screen elements
   - Images in hidden elements may not fully load until viewport interaction

3. **Second Click Success Reason**
   - Images are cached from first attempt
   - ShareCard DOM was already rendered once
   - Images are already decoded in memory

---

## Solution A (Current Implementation)

### Strategy: Triple-Layer Image Verification

**Implementation Date**: 2026-08-16

**Approach**: Replace timeout-based waiting with actual image readiness checks using `img.decode()` + DOM verification.

### How It Works

```typescript
// Layer 1: Preload to cache + decode
await Promise.all(
  imagesToPreload.map(async (src) => {
    const img = new Image();
    img.src = src;
    await img.onload;
    await img.decode(); // iOS Chrome optimization
  })
);

// Layer 2: Verify ShareCard DOM images
const cardImages = shareCardRef.current.querySelectorAll('img');
await Promise.all(
  Array.from(cardImages).map(async (img) => {
    if (!img.complete) {
      // Force reload if not loaded
      const currentSrc = img.src;
      img.src = '';
      img.src = currentSrc;
      await img.onload;
    }
    await img.decode();
  })
);

// Layer 3: Wait for iOS rendering frames
await requestAnimationFrame(() => {});
await requestAnimationFrame(() => {});
```

### Key Features

1. **img.decode()**: Explicitly waits for image decoding (critical for iOS)
2. **DOM Image Verification**: Checks actual `<img>` elements in ShareCard
3. **Force Reload**: Resets `src` if image hasn't loaded
4. **Frame Synchronization**: Waits 2 animation frames for iOS rendering pipeline
5. **Detailed Logging**: Console logs track each step for debugging

### Expected Console Output

```
Starting image capture...
Pre-loading and decoding images...
Loaded + decoded: /assets/keycaps/CTRL.png
Loaded + decoded: /assets/Anvils-1.png
Loaded + decoded: /assets/qr-code.png
✅ All images pre-loaded and decoded in 250ms
Waiting for ShareCard images to render...
Found 3 images in ShareCard
Image 1 already loaded: /assets/keycaps/CTRL.png
Image 2 already loaded: /assets/Anvils-1.png
Image 3 already loaded: /assets/qr-code.png
✅ ShareCard images ready in 50ms
Converting to jpeg...
✅ Export completed! Total time: 1200ms
```

---

## Testing Instructions

### Test on iOS Chrome

1. Navigate to any result page
2. Click "Save as Image" (first time)
3. Check console for logs
4. Verify exported image contains:
   - Keycap image ✓
   - QR code ✓
   - Anvils logo ✓

### What to Report if It Fails

Please provide:

1. **Full Console Log**
   - Especially between "Pre-loading..." and "ShareCard images ready"
   - Any error messages

2. **Image Load Status**
   ```
   Which images showed:
   - "already loaded" vs "Waiting for image X"
   - Did all 3 images decode successfully?
   ```

3. **Timing Information**
   - Preload time
   - ShareCard image ready time
   - Total time

4. **Network Conditions**
   - WiFi / 4G / 5G
   - Strong / Weak signal

5. **Failure Pattern**
   - Which image(s) are missing?
   - Does it fail on ALL result types or specific ones?

---

## Alternative Solutions (if Solution A fails)

### Solution B: Temporary Visible Position

**Strategy**: Temporarily move ShareCard to viewport during capture

```typescript
// Before capture
shareCardRef.current.style.position = 'fixed';
shareCardRef.current.style.top = '0';
shareCardRef.current.style.left = '0';
shareCardRef.current.style.zIndex = '9999';
shareCardRef.current.style.opacity = '0.01'; // Nearly invisible but rendered

await requestAnimationFrame(() => {});
await requestAnimationFrame(() => {});

// Capture here

// After capture
shareCardRef.current.style.left = '-9999px';
shareCardRef.current.style.opacity = '1';
```

**Pros**: Forces iOS to prioritize rendering  
**Cons**: May cause brief visual flicker

---

### Solution C: Canvas Preload

**Strategy**: Draw images to canvas first to ensure full decode

```typescript
const preloadToCanvas = async (src: string) => {
  const img = new Image();
  img.src = src;
  await img.decode();
  
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(img, 0, 0);
  
  return img;
};
```

**Pros**: Guarantees image is fully decoded  
**Cons**: Additional memory usage

---

### Solution D: MutationObserver

**Strategy**: Listen for actual DOM mutations in ShareCard

```typescript
const waitForCardReady = (cardElement: HTMLElement) => {
  return new Promise<void>((resolve) => {
    const observer = new MutationObserver(() => {
      const images = cardElement.querySelectorAll('img');
      const allReady = Array.from(images).every(
        img => img.complete && img.naturalHeight > 0
      );
      if (allReady && images.length === 3) {
        observer.disconnect();
        resolve();
      }
    });
    
    observer.observe(cardElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src']
    });
  });
};
```

**Pros**: Reacts to actual DOM changes  
**Cons**: More complex, potential infinite wait

---

## Combination Strategies

If Solution A doesn't fully work:

**Strategy A + B**: decode() + temporary visibility  
**Strategy A + D**: decode() + MutationObserver monitoring  
**Strategy B + D**: Visibility + Observer for double-check

---

## Code Location

**File**: `/Users/I549685/Documents/SAPTI/app/src/pages/Result.tsx`  
**Function**: `handleShare()` (lines 84-194)  
**Component**: ShareCard at line 1125

---

## Related Issues History

- 2026-08-15: Increased wait time from 100ms → 500ms → 800ms (didn't solve)
- 2026-08-15: Removed `crossOrigin="anonymous"` from images (helped web, not mobile)
- 2026-08-15: Added `getBoundingClientRect()` force reflow (minimal impact)
- 2026-08-16: **Current**: Implemented img.decode() + DOM verification (Solution A)

---

## Success Criteria

✅ **Goal**: First click should successfully export complete image on iOS Chrome mobile

**Metrics**:
- Image completeness: 100% (all 3 images present)
- Success rate: 100% on first attempt
- Time to export: < 2 seconds acceptable
- No user-visible errors or loading issues

---

## Next Steps if Solution A Fails

1. Collect detailed console logs from failed attempt
2. Analyze which specific step fails
3. Consider hybrid approach (A + B or A + D)
4. May need to test with simplified ShareCard (fewer elements)
5. Consider using `html-to-image` alternatives (e.g., `dom-to-image`, `html2canvas`)

---

*Last Updated: 2026-08-16*  
*Status: Testing in progress*  
*Reporter: User (iOS Chrome)*  
*Developer: Claude*
