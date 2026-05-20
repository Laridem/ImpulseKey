# Asset Management System
# All paths are relative to /public directory

# Keycap illustrations (16 personality types)
keycaps/
  Type=VOC.svg
  Type=FIORI.svg
  Type=PIXEL.svg
  Type=A11Y.svg
  Type=JOULE.svg
  Type=CTRL.svg
  Type=AGENT.svg
  Type=SAFE.svg
  Type=OData.svg
  Type=BTP.svg
  Type=CORE.svg
  Type=API.svg
  Type=QAQ.svg
  Type=LOGS.svg
  Type=TRIO.svg
  Type=FIRE.svg

# Design screen mockups
screens/
  png/
    Landing_Web.png
    Test Intro_Web.png
    Survey Question_Web.png
    Loading - IMPULSE KEYS (Tactile).png
    Comprehensive Result_Web.png
    Results Examples.png
  svg/
    Landing_Web.svg
    Test Intro_Web.svg
    Survey Question_Web.svg
    Loading - IMPULSE KEYS (Tactile).svg
    Comprehensive Result_Web.svg
    Results Examples.svg

# Icons and branding
icons.svg
favicon.svg

## Usage in Code:

```typescript
import { getKeycapAsset, getScreenAsset } from '@/assets/config';

// Get keycap illustration
const vocImage = getKeycapAsset('VOC'); // Returns: '/keycaps/Type=VOC.svg'

// Get design screen
const landingPng = getScreenAsset('landing', 'png'); // Returns: '/screens/png/Landing_Web.png'
const landingSvg = getScreenAsset('landing', 'svg'); // Returns: '/screens/svg/Landing_Web.svg'
```

## Adding New Assets:

1. Place files in /public directory following the structure above
2. Update ASSET_PATHS in /src/assets/config.ts if adding new categories
3. For new keycaps: Add type to KeycapType union
4. For new screens: Add type to DesignScreenType union and screenNames mapping

## Asset Guidelines:

- All paths are relative to /public (no leading /public in paths)
- Keycaps use SVG format for scalability
- Design screens available in both PNG (raster) and SVG (vector)
- Keep file naming consistent with existing pattern
- Use kebab-case for directories, preserve original names for files
