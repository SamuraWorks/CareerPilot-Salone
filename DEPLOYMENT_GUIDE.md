# Deployment Guide for CareerPilot Salone

## 1. Prerequisites

Ensure your project builds locally before deploying:
```bash
npm run build
```

## 2. Deploying to Vercel

### Step 1: Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. Import `SamuraWorks/CareerPilot-Salone`.

### Step 2: Configure Project
- **Framework Preset**: Next.js (should be auto-detected)
- **Root Directory**: `./`
- **Build Command**: `next build` (or `npm run build`)
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Step 3: Environment Variables (CRITICAL)
You **MUST** add these variables in Vercel Settings -> Environment Variables.

| Variable Name | Value |
|--------------|-------|
| `GEMINI_API_KEY` | `Enter your Gemini API Key` |
| `GOOGLE_GENERATIVE_AI_API_KEY` | `Enter your Google Gen AI Key` |
| `NEXT_PUBLIC_SUPABASE_URL` | *(If you have one)* |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(If you have one)* |

> **Note**: If you don't have Supabase keys yet, the app may still build but database features won't work. The AI features depend on `GEMINI_API_KEY`.

### Step 4: Deploy
Click **"Deploy"**.

## 3. Troubleshooting

### "Build Failed" on Vercel
1. Check the logs in Vercel.
2. If it says "Command not found", check the "Build Command" setting.
3. If it says "Missing API Key", double-check Step 3 above.

### "404 Not Found"
- Ensure your `next.config.mjs` is valid.
- Ensure you are not building to a subfolder unexpectedly.

### "Edge Runtime" Warnings
- These are normal warnings for some dependencies. They typically do not fail the build.
