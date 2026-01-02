# CareerPilot Salone - Deployment Guide

## 🚀 Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Link to existing project or create new one
   - Confirm settings

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - CareerPilot Salone"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Configure settings (Vercel auto-detects Next.js)
   - Click "Deploy"

## 🔐 Environment Variables

**CRITICAL:** Add these environment variables in Vercel Dashboard:

### Required Variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# AI Services (Google Gemini)
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key

# OpenAI (if using)
OPENAI_API_KEY=your_openai_key
```

### How to Add Variables in Vercel:
1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase URL
   - Environment: Production, Preview, Development
4. Click **Save**
5. Repeat for all variables
6. **Redeploy** after adding variables

## ✅ Pre-Deployment Checklist

### 1. **Build Test** (Local)
```bash
npm run build
```
- Make sure build completes without errors
- Fix any TypeScript/ESLint errors

### 2. **Environment Variables**
- ✅ `.env.example` documented
- ✅ `.env.local` NOT committed (in .gitignore)
- ✅ All required variables identified

### 3. **Database Setup**
- ✅ Run `supabase_setup.sql` in Supabase SQL Editor
- ✅ Verify tables are created
- ✅ Test RLS policies

### 4. **API Keys Ready**
- ✅ Supabase credentials
- ✅ Google AI API key
- ✅ OpenAI API key (optional)

## 📋 Deployment Steps

### Step 1: Initialize Git (if not done)
```bash
git init
git add .
git commit -m "feat: Initial deployment - CareerPilot Salone"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Create repository: `career-pilot-salone`
3. **Don't** initialize with README (you already have code)

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/career-pilot-salone.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel
```bash
# Option A: Use CLI
vercel --prod

# Option B: Use Vercel Dashboard
# 1. Go to https://vercel.com/new
# 2. Import GitHub repository
# 3. Configure and deploy
```

### Step 5: Add Environment Variables
In Vercel Dashboard:
- Settings → Environment Variables
- Add all variables from `.env.example`
- Redeploy

### Step 6: Configure Custom Domain (Optional)
1. Go to Vercel Dashboard → Domains
2. Add your custom domain
3. Update DNS settings as instructed
4. Wait for SSL certificate

## 🔧 Post-Deployment

### Verify Deployment:
- ✅ Visit your deployed URL
- ✅ Test all features:
  - CV Builder & PDF download
  - Career Roadmap generation
  - Aptitude test
  - Job/Scholarship listings
- ✅ Check browser console for errors
- ✅ Test on mobile devices

### Monitor:
- Check Vercel deployment logs
- Monitor Supabase usage/errors
- Track AI API usage

## 🐛 Troubleshooting

### Build Fails:
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check for ESLint errors
npm run lint
```

### Environment Variables Not Working:
1. Verify variables are set in Vercel Dashboard
2. Ensure variable names match exactly (case-sensitive)
3. Redeploy after adding variables
4. Check Vercel deployment logs

### Database Connection Issues:
1. Verify Supabase URL and key
2. Check RLS policies in Supabase
3. Ensure tables are created
4. Test connection in Supabase SQL Editor

### PDF Generation Issues:
- Already fixed with `html-to-image` library
- Should work in production

## 📊 Alternative Deployment Options

### Deploy to Netlify:

**Option 1: Git-based (Recommended)**
1. **Push to GitHub:** Ensure your code is pushed to your repository.
2. **Import to Netlify:**
   - Log in to [Netlify](https://app.netlify.com).
   - Click "Add new site" → "Import an existing project".
   - Select GitHub and choose your repository (`career-pilot-salone`).
3. **Configure:**
   - Netlify will detect `netlify.toml`.
   - Build Command: `npm run build`
   - Publish directory: `.next`
4. **Environment Variables:**
   - Go to **Site Settings** → **Environment Variables**.
   - Add all variables from `.env.example`.
5. **Deploy:** Click "Deploy Site".

**Option 2: CLI**
```bash
npm install -g netlify-cli
netlify link
netlify deploy --build --prod
```

### Deploy to Railway:
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Add environment variables
4. Deploy

### Deploy to DigitalOcean App Platform:
1. Push to GitHub
2. Create new app on DigitalOcean
3. Connect repository
4. Configure and deploy

## 🌐 Recommended Setup

**Production:**
- Platform: Vercel
- Database: Supabase
- Domain: Custom domain with SSL
- Analytics: Vercel Analytics (built-in)

**Estimated Time:**
- First deployment: 10-15 minutes
- Subsequent deploys: 2-3 minutes (automatic)

## 📝 Notes

- Vercel auto-deploys on every `git push` to main
- Use preview deployments for testing (auto-created for PRs)
- Production URL: `https://career-pilot-salone.vercel.app`
- Custom domain: Configure in Vercel dashboard

---

**Ready to Deploy?** Run: `vercel --prod`

**Need Help?** Check Vercel docs: https://vercel.com/docs
