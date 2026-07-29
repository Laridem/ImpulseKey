# Deployment Guide - Vercel

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- Git repository pushed to GitHub

## Deployment Steps

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project root**
   ```bash
   cd /Users/I549685/Documents/SAPTI
   vercel
   ```

4. **Follow prompts:**
   - Setup and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N` (first time)
   - Project name? `impulse-keys` (or your choice)
   - In which directory is your code? `./app`
   - Override settings? `N`

5. **Production deployment**
   ```bash
   vercel --prod
   ```

### Option 2: Vercel Dashboard

1. **Go to** https://vercel.com/new
2. **Import Git Repository**
   - Connect GitHub account
   - Select `impulse-keys` repository
   - Select `develop/react-setup` branch
3. **Configure Project:**
   - Framework Preset: `Vite`
   - Root Directory: `app`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. **Click "Deploy"**

## Environment Variables

No environment variables needed for current setup.

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Post-Deployment

1. **Test the deployed app**
   - Complete a full test flow
   - Verify all 16 result types work
   - Test language switching
   - Test image download

2. **Share the URL**
   - Production URL: `https://impulse-keys.vercel.app` (or custom domain)
   - Share with internal team for testing

## Continuous Deployment

Once set up, every push to `develop/react-setup` branch will auto-deploy to Vercel.

## Troubleshooting

### Build fails
- Check build logs in Vercel dashboard
- Verify `npm run build` works locally
- Check Node.js version (should be 18.x or higher)

### App not loading
- Check browser console for errors
- Verify all assets are loading correctly
- Check routing configuration

### Images not showing
- Verify assets are in `/public` directory
- Check file paths are correct
- Ensure case-sensitive paths match

## Performance

Current build stats:
- JS Bundle: 318 KB (103 KB gzipped)
- CSS Bundle: 20 KB (4 KB gzipped)
- Total size: ~10 MB (includes keycap SVGs)
- Load time: < 2 seconds on average connection

## Rollback

If deployment has issues:
```bash
vercel rollback
```

Or select previous deployment in Vercel dashboard.
