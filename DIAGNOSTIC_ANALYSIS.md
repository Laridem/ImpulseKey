# iOS Safari Infinite Loading Analysis

## The Problem
Safari stays stuck at: "加载中...和周一的脑子一样慢..." (Loading... like your Monday brain...)

## State Flow Analysis

### When does isCapturing become true?
Line 98: `setIsCapturing(true)` in handleShare()

### When should isCapturing become false?
1. Line 262: `if (!settings.device.needsPreview) { setIsCapturing(false); }`
2. Line 275: `setIsCapturing(false)` in catch block
3. NEW: Custom diagnostic modal's close button calls `setIsCapturing(false)`

### Where can the Promise chain hang?

#### Stage 1: Image Preload (lines 126-154)
```javascript
await Promise.all(
  imagesToPreload.map(async (src) => {
    const img = new Image();
    img.src = src;
    
    // Wait for image to load
    await new Promise((resolve, reject) => {
      if (img.complete && img.naturalHeight !== 0) {
        resolve(img);
      } else {
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load: ${src}`));
      }
    });
    
    // Wait for image to decode (iOS Chrome optimization)
    await img.decode();
  })
);
```

**Potential hang:**
- `img.decode()` can hang indefinitely on iOS Safari if image is corrupt or CORS-blocked
- No timeout on decode()

#### Stage 2: ShareCard DOM Images (lines 168-222)
```javascript
await new Promise<void>((resolve) => {
  const checkImages = async () => {
    const cardImages = shareCardRef.current?.querySelectorAll('img');
    if (!cardImages || cardImages.length === 0) {
      console.warn('No images found in ShareCard, retrying...');
      setTimeout(checkImages, 100);  // ⚠️ INFINITE RETRY LOOP
      return;
    }
    
    // ... more decode() calls
  };
  
  checkImages();
});
```

**Potential hang:**
- If `shareCardRef.current` is null or contains no images, infinite retry loop with `setTimeout(checkImages, 100)`
- No maximum retry count
- `img.decode()` called again on each image (line 206)

#### Stage 3: html-to-image (lines 234-248)
```javascript
const svgDataUrl = await toSvg(...);
const dataUrl = await toJpeg(...);
```

**Potential hang:**
- `toSvg()` or `toJpeg()` can hang if internal image fetching fails
- html-to-image clones DOM and re-fetches all images
- No timeout on these operations

## ROOT CAUSE HYPOTHESIS

### Most Likely: Stage 2 Infinite Retry
If `shareCardRef.current?.querySelectorAll('img')` returns empty array or null on Safari:
- `checkImages()` calls `setTimeout(checkImages, 100)` infinitely
- No escape condition
- Never resolves the Promise
- `isCapturing` stays true forever

### Why might this happen on Safari?
1. ShareCard is rendered with `position: fixed; left: -9999px` (hidden offscreen)
2. Safari might not render hidden elements immediately
3. `querySelectorAll('img')` returns empty because DOM not fully hydrated
4. Infinite retry with no timeout

## FIX NEEDED

Add maximum retry count to Stage 2:
```javascript
let retryCount = 0;
const MAX_RETRIES = 50; // 50 × 100ms = 5 seconds max

const checkImages = async () => {
  const cardImages = shareCardRef.current?.querySelectorAll('img');
  
  if (!cardImages || cardImages.length === 0) {
    retryCount++;
    if (retryCount >= MAX_RETRIES) {
      console.error('❌ Timeout: ShareCard images not found after 5 seconds');
      resolve(); // Continue anyway
      return;
    }
    console.warn(`No images found in ShareCard, retrying (${retryCount}/${MAX_RETRIES})...`);
    setTimeout(checkImages, 100);
    return;
  }
  
  // ... rest of logic
};
```

## ADDITIONAL CONCERN: img.decode() Hanging

`img.decode()` can hang indefinitely. Add timeout wrapper:
```javascript
const decodeWithTimeout = (img: HTMLImageElement, timeoutMs = 3000) => {
  return Promise.race([
    img.decode(),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('decode timeout')), timeoutMs)
    )
  ]).catch(err => {
    console.warn('decode failed or timeout:', err);
    // Continue anyway - image might render despite decode failure
  });
};

await decodeWithTimeout(img);
```
