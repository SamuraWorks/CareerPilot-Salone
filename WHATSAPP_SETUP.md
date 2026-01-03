# 🇸🇱 CareerPilot WhatsApp Bot - Complete Setup Guide

## 🎯 **What You Get**

Your WhatsApp bot now has:
- ✅ **AI-Powered Responses** - Intelligent career guidance
- ✅ **Krio Language** - Authentic Sierra Leone experience
- ✅ **Menu System** - Easy navigation (1-4 options)
- ✅ **Smart Detection** - Auto-switches between AI and menu based on message

---

## 📋 **Prerequisites**

- Twilio account (free sandbox available)
- Vercel deployment (already set up)
- OpenAI API key (for AI responses)

---

## 🚀 **Step-by-Step Setup**

### **Step 1: Twilio Account Setup** (5 minutes)

1. **Create Twilio Account**: https://www.twilio.com/try-twilio
2. **Go to WhatsApp Sandbox**: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
3. **Activate Sandbox**:
   - You'll see a number like `+1 415 523 8886`
   - You'll see a join code like `join abc-xyz`
4. **Send Join Message**:
   - Open WhatsApp on your phone
   - Send: `join abc-xyz` to `+1 415 523 8886`
   - You'll get a confirmation

5. **Get Your Credentials**:
   - Go to: https://console.twilio.com/
   - **Account SID**: Starts with `AC...`
   - **Auth Token**: Click "Show" to reveal

---

### **Step 2: Add Environment Variables to Vercel** (3 minutes)

1. Go to: https://vercel.com/dashboard
2. Select your **careerpilot-salone** project
3. Click **Settings** → **Environment Variables**
4. Add these three variables:

```
TWILIO_ACCOUNT_SID=AC1234567890abcdef... (your Account SID)
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886 (your sandbox number)
```

5. Click **Save**
6. **IMPORTANT**: Click **Redeploy** for changes to take effect

---

### **Step 3: Configure Twilio Webhook** (2 minutes)

1. Go back to Twilio WhatsApp Sandbox settings
2. Find **"When a message comes in"** section
3. Enter: `https://careerpilot-salone.vercel.app/api/whatsapp`
4. Method: **POST**
5. Click **Save**

---

## ✅ **Testing Your Bot**

### **Test 1: Basic Menu**
Send to your WhatsApp sandbox:
```
hi
```
**Expected Response**: Krio welcome menu with 4 options

### **Test 2: Menu Navigation**
Send:
```
1
```
**Expected Response**: Career discovery menu in Krio

### **Test 3: AI Mode** (requires OpenAI key)
Send:
```
What is the salary for a nurse in Freetown?
```
**Expected Response**: AI-powered answer specific to your question

### **Test 4: Krio Experience**
Send:
```
2
```
**Expected Response**: Scholarship info with Krio phrases

---

## 🤖 **How the Bot Works**

### **Smart Message Detection**:

1. **Short commands** (`hi`, `1`, `2`, `menu`) → Menu system
2. **Long questions** (15+ characters) → AI-powered responses
3. **Fallback** → Helpful menu with Krio

### **Bot Responses Include**:

- **Krio Greetings**: "Welkom", "Wi de ya fo elp yu"
- **Menu Options**: "Fain Work Path", "Scholarship Den"
- **AI Answers**: Focused, direct responses to career questions
- **Links**: Direct links to your web app features

---

## 🎨 **What Users Will Experience**

### **Example Chat Flow**:

**User**: `hi`
**Bot**: 
```
👋 Welkom to CareerPilot Salone!
🇸🇱 Wi de ya fo elp yu! (We're here to help!)

Wetin yu want do? (What would you like to do?)
1️⃣ Fain Work Path (Find Career)
2️⃣ Scholarship Den (Scholarships)
3️⃣ CV Tips
4️⃣ Ask AI Anytin

Reply wit number or just ask a question!
```

**User**: `What skills do I need to be a software developer?`
**Bot**:
```
🤖 CareerPilot AI

For software development in Sierra Leone:
• Programming languages (Python, JavaScript)
• Problem-solving skills
• Basic computer science
• Portfolio of projects

Start: FreeCodeCamp or local coding bootcamps in Freetown

Reply "menu" for options
```

---

## 🧪 **Local Testing** (Optional)

### **Test Webhook Locally**:

1. Install ngrok: `npm install -g ngrok`
2. Run your dev server: `npm run dev`
3. Expose it: `ngrok http 3000`
4. Use ngrok URL in Twilio: `https://abc123.ngrok.io/api/whatsapp`
5. Test from WhatsApp

---

## 📊 **Monitoring & Debugging**

### **Check Logs in Vercel**:
1. Go to Vercel Dashboard → Your Project
2. Click **Functions** tab
3. Click `/api/whatsapp`
4. See real-time requests and responses

### **Check Twilio Logs**:
1. Go to: https://console.twilio.com/us1/monitor/logs/messages
2. See all WhatsApp messages sent/received
3. Check for errors

---

## 🎯 **Krio Phrases in Your Bot**

| Krio | English | Used When |
|------|---------|-----------|
| Welkom | Welcome | Greeting |
| Wi de ya fo elp yu | We're here to help you | Welcome message |
| Wetin yu want do? | What would you like to do? | Menu prompt |
| Fain Work Path | Find Career Path | Menu option |
| Scholarship Den | Scholarships | Menu option |
| Diskova Yu Wok | Discover Your Career | Career section |
| A no unda | I don't understand | Error message |
| Si ol details | See all details | Link prompt |

---

## 🏆 **Competition Tips**

### **For Demo Video**:
1. Show live WhatsApp chat working
2. Ask question in Krio: "Wetin i de tek fo bi nurse?"
3. Show AI responding intelligently
4. Navigate menu (1, 2, 3)
5. Highlight that it's bilingual (Krio + English)

### **Talking Points**:
- "This bot speaks Krio - the local language of Sierra Leone"
- "It uses AI to give personalized career advice"
- "Works on any phone with WhatsApp - no app needed"
- "Perfect for offline-first communities"

---

## 🚨 **Troubleshooting**

### **Bot Not Responding**:
- ✅ Check Twilio webhook URL is correct
- ✅ Verify environment variables in Vercel
- ✅ Check Vercel deployment succeeded
- ✅ Look at Twilio error logs

### **AI Not Working**:
- ✅ Confirm `OPENAI_API_KEY` is set in Vercel
- ✅ Redeploy after adding env vars
- ✅ Bot will still work with menu fallback

### **Messages Not Sending**:
- ✅ Verify you sent join code to sandbox
- ✅ Use correct sandbox number
- ✅ Check Twilio account status

---

## 📱 **Production Deployment** (Optional)

To use your own WhatsApp number (not sandbox):

1. **Buy a Twilio number**: ~$1/month
2. **Enable WhatsApp**: In Twilio console
3. **Facebook Business Verification**: Required by Meta
4. **Update env var**: Use your new number

**For Competition**: Sandbox is perfectly fine!

---

## ✅ **Final Checklist**

- [ ] Twilio account created
- [ ] WhatsApp sandbox activated
- [ ] Sent join code from your phone
- [ ] Environment variables added to Vercel  
- [ ] Webhook URL configured in Twilio
- [ ] Tested bot with "hi" message
- [ ] Tested AI with a career question
- [ ] Verified Krio messages appear
- [ ] Ready for demo! 🎉

---

## 🎬 **Demo Script** (30 seconds)

```
[Open WhatsApp]
"Let me show you our WhatsApp bot for Sierra Leone"

[Send: hi]
"See? It welcomes you in Krio - the local language"

[Send: What does a teacher earn in Freetown?]
"Ask it anything about careers - powered by AI"

[Show response]
"Instant, personalized career guidance - right in WhatsApp"

[Send: 2]
"Or use the menu for scholarships, CV tips..."

"All in Krio and English - built FOR Sierra Leone"
```

---

## 🌟 **You're All Set!**

Your WhatsApp bot is now:
- ✅ AI-powered
- ✅ Krio-enabled
- ✅ Competition-ready

**Test it now** and prepare your demo! 🚀🇸🇱
