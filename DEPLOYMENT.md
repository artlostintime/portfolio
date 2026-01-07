# Deployment Guide

Your portfolio is built and ready to deploy! The production files are in the `dist/` folder.

## Option 1: Deploy to Vercel (Recommended)

**Via GitHub (Easiest):**

1. Push your portfolio to GitHub:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git remote add origin https://github.com/artlostintime/portfolio.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel auto-detects Astro - just click "Deploy"
6. Done! Your site will be live at `https://your-project.vercel.app`

**Via Vercel CLI:**

```bash
npm install -g vercel
vercel login
vercel
```

## Option 2: Deploy to Netlify

**Via Netlify CLI:**

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Via Drag & Drop:**

1. Go to [netlify.com](https://app.netlify.com)
2. Drag the `dist/` folder to the drop zone
3. Done! Your site is live

**Via GitHub (Auto Deploy):**

1. Push to GitHub (same as Vercel)
2. Go to [netlify.com](https://app.netlify.com)
3. Click "Add new site" → "Import existing project"
4. Connect GitHub and select repository
5. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

## Option 3: GitHub Pages

1. Install gh-pages:

   ```bash
   npm install -D gh-pages
   ```

2. Add to package.json scripts:

   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

3. Deploy:

   ```bash
   npm run deploy
   ```

4. Enable GitHub Pages in repository settings
5. Your site will be at `https://artlostintime.github.io/portfolio`

## Custom Domain Setup

### For Vercel:

1. Go to Project Settings → Domains
2. Add `shuvi.tech`
3. Add DNS records at your domain provider:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

### For Netlify:

1. Go to Site Settings → Domain Management
2. Add custom domain `shuvi.tech`
3. Update DNS at your domain provider:
   - Type: A, Name: @, Value: 75.2.60.5
   - Type: CNAME, Name: www, Value: [your-site].netlify.app

## Environment Variables

If you add any environment variables later:

- Create `.env` file (already in .gitignore)
- Add variables to Vercel/Netlify dashboard
- Format: `VARIABLE_NAME=value`

## Rebuild & Redeploy

Whenever you make changes:

```bash
npm run build
```

Then push to GitHub (auto-deploys) or run deploy command again.

## Performance Tips

Your site is already optimized, but you can:

- Add analytics (Vercel Analytics, Google Analytics)
- Enable CDN caching (automatic on Vercel/Netlify)
- Compress images if you add any
- Use `astro check` to validate before deploying

## Current Status

✅ Production build completed
✅ Domain configured: shuvi.tech
✅ Ready to deploy
✅ 4 pages generated
✅ Build size optimized

Choose your deployment method above and go live! 🚀
