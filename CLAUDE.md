# CLAUDE.md - IMPULSE KEYS Project Guide

## Project Overview
IMPULSE KEYS is a personality assessment tool for the Impulse26 Design Festival, built with React + Vite + TypeScript.

**Repository**: https://github.com/Laridem/ImpulseKey.git  
**Deployment**: Cloudflare Pages  
**Live URL**: Check Cloudflare Pages dashboard for the deployment URL

---

## Project Structure

```
/Users/I549685/Documents/SAPTI/
├── app/                          # React application
│   ├── src/
│   │   ├── pages/               # Page components
│   │   │   ├── Landing.tsx      # Landing page with key visual
│   │   │   ├── TestIntro.tsx    # Test introduction
│   │   │   ├── RoleSelection.tsx # Role selection
│   │   │   ├── QuestionFlow.tsx # Question flow
│   │   │   ├── Result.tsx       # Result display page
│   │   │   └── AdminPreview.tsx # Admin preview (all results)
│   │   ├── components/          # Reusable components
│   │   ├── data/
│   │   │   ├── questions.ts     # Question data (bilingual)
│   │   │   ├── results.ts       # Result type definitions
│   │   │   ├── roles.ts         # Role definitions
│   │   │   ├── types.ts         # TypeScript types
│   │   │   └── colorGroups.ts   # Color grouping system
│   │   ├── i18n/                # Internationalization
│   │   │   ├── en.json          # English translations
│   │   │   ├── zh.json          # Chinese translations
│   │   │   └── LanguageContext.tsx
│   │   ├── utils/               # Utility functions
│   │   └── assets/              # Asset management
│   ├── public/
│   │   ├── assets/              # Static assets
│   │   │   ├── Impulse26_motto.svg
│   │   │   └── icons/
│   │   └── _redirects           # SPA routing for Cloudflare
│   ├── package.json
│   └── vite.config.ts
├── docs/                        # Documentation
├── archive/                     # Archived files
└── assets/                      # Design assets

```

---

## Development Commands

```bash
# Navigate to project directory
cd /Users/I549685/Documents/SAPTI

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Git Workflow

### Branch Structure
- **main**: Production branch (deployed to Cloudflare Pages)
- **develop/react-setup**: Development branch (all features merged here first)

### Common Operations

```bash
# Check status
git status

# Commit changes
git add -A
git commit -m "feat: description"

# Push to GitHub
git push origin main

# Force push (use carefully)
git push origin main --force
```

---

## Deployment History & Lessons Learned

### Cloudflare Pages Deployment (2026-07-29)

**Challenge**: Multiple failed deployments due to:
1. Old commits being pulled by Cloudflare
2. Missing app directory structure
3. TypeScript compilation errors

**Root Causes**:
- Initial `main` branch only had configuration files, not actual app code
- All actual code was on `develop/react-setup` branch
- Cloudflare was pulling commit `8644c22` (Initial commit) which lacked app structure

**Solution Process**:
1. ✅ Merged `develop/react-setup` into `main`
   ```bash
   git checkout main
   git reset --hard develop/react-setup
   git push origin main --force
   ```

2. ✅ Fixed TypeScript errors in `AdminPreview.tsx`:
   - Removed unused `toggleLanguage` and `t` from `useLanguage()`
   - Added type assertions: `as ResultKey`, `as KeycapType`
   - Added proper imports for TypeScript types

3. ✅ Removed problematic backup file:
   - Deleted `app/src/pages/Result.backup.tsx` (had compilation errors)

4. ✅ Verified local build passes:
   ```bash
   npm run build  # Must succeed before pushing
   ```

**Cloudflare Pages Configuration**:
```
Framework preset:         None
Build command:           cd app && npm install && npm run build
Build output directory:  app/dist
Production branch:       main
```

**Key Lessons**:
- Always test `npm run build` locally before pushing
- Ensure the production branch contains the complete app structure
- Cloudflare caches aggressively - force push may be needed after major changes
- TypeScript errors block production builds - fix all type issues locally first

---

## Design System

### Official Impulse26 Colors
```typescript
magenta: '#A100C2'  // Proactive, human-centered
yellow:  '#FFC933'  // System thinking, big picture
cyan:    '#64EDD2'  // Data-driven, structured
purple:  '#7858FF'  // Crisis management, rapid response
```

### Visual Effects
- **Neon Glitch Shadow**: Using other 3 Impulse colors as multi-layered shadows
- **Text Contrast**: Automatic black/white text color based on WCAG luminance
- **Hover Effects**: Scale transforms + shadow intensity changes
- **Rainbow Gradient**: Used in Landing page motto hover effect

---

## Common Issues & Solutions

### Issue: TypeScript errors in AdminPreview
**Error**: `Property 'toggleLanguage' does not exist on type 'LanguageContextType'`  
**Solution**: Remove unused destructured properties from `useLanguage()`

### Issue: Type mismatch for getColorGroupForResult
**Error**: `Argument of type 'string' is not assignable to parameter of type 'ResultKey'`  
**Solution**: Add type assertion `as ResultKey`

### Issue: Build fails on Cloudflare but works locally
**Cause**: Cloudflare pulled an old commit without latest fixes  
**Solution**: Force push latest commit and trigger new deployment

### Issue: Questions showing pre-selected wrong answers
**Cause**: Option IDs not reassigned after Fisher-Yates shuffle  
**Solution**: Map shuffled options to new IDs (A, B, C) in `randomize.ts`

---

## Testing Checklist

### Before Deployment
- [ ] Run `npm run build` locally - must succeed
- [ ] Test all pages in dev mode
- [ ] Check text contrast on all colored backgrounds
- [ ] Verify bilingual content (EN/中文)
- [ ] Test mobile responsive design
- [ ] Verify question randomization works correctly
- [ ] Check result page displays correctly for all 16 types

### After Deployment
- [ ] Access the Cloudflare Pages URL
- [ ] Complete a full test flow
- [ ] Test on mobile devices
- [ ] Share QR code for user testing

---

## Important File Locations

### Configuration Files
- `app/vite.config.ts` - Vite configuration
- `app/tsconfig.json` - TypeScript configuration
- `app/package.json` - Dependencies
- `app/public/_redirects` - SPA routing for Cloudflare

### Data Files
- `app/src/data/questions.ts` - All 30 questions (bilingual)
- `app/src/data/results.ts` - All 16 result types (bilingual)
- `app/src/data/colorGroups.ts` - Color grouping system
- `app/src/i18n/en.json` - English UI text
- `app/src/i18n/zh.json` - Chinese UI text

---

## Contact & Resources

**GitHub Repository**: https://github.com/Laridem/ImpulseKey  
**Project Owner**: I549685  
**GitHub Username**: Laridem

---

## Notes for Future Development

1. **Always work on `develop/react-setup` first**, then merge to `main` for deployment
2. **Test TypeScript compilation** before every push to production
3. **Cloudflare Pages monitors `main` branch** - any push triggers automatic deployment
4. **Keep backup files outside `src/`** to avoid compilation issues
5. **Use type assertions** when working with dynamic keys (ResultKey, KeycapType)

---

*Last Updated: 2026-07-29*
*Deployment Status: ✅ Successfully deployed to Cloudflare Pages*
