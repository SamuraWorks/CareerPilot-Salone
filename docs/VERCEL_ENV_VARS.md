# 🔐 Environment Variables Guide

## 🚀 Critical Variables (Must Add to Vercel)

Go to **Vercel Dashboard** -> **Settings** -> **Environment Variables** and add:

### 1. Database (Supabase)
Required for Database, Auth, and Saving Data.
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. AI (Google Gemini)
Required for Chatbot and WhatsApp Intelligence.
```env
GEMINI_API_KEY=your_google_gemini_api_key
```
*(Get it from [Google AI Studio](https://aistudio.google.com/))*

### 3. WhatsApp (Twilio)
Required for WhatsApp features.
```env
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```
*(The number must match your Twilio Sandbox number)*

---

## 🛠️ Optional Variables

### OpenAI (Fallback AI)
If Gemini fails, the system will try OpenAI.
```env
OPENAI_API_KEY=sk-...
```

---

## ⚠️ Important Notes

1. **Redeploy Required**: After adding these variables, you MUST go to **Deployments** and **Redeploy** for them to take effect.
2. **Do Not Commit**: Never commit `.env` files to GitHub.
3. **Local Development**: Create a `.env.local` file in your project root with these same values for testing.
