# CareerPilot Salone - Comprehensive Refactor Plan

## 1. Project Architecture & Environment
- [ ] **Dependencies**: Verify `next`, `@supabase/supabase-js`, `ai` SDKs, `twilio`, `html-to-image`/`jspdf`.
- [ ] **Environment**: Setup `.env.local` template with Supabase, AI, and Twilio keys.
- [ ] **Types**: Generate/Define TypeScript definitions for Database Schema (Supabase).

## 2. Database Schema (Supabase)
- [ ] **Users**: Profiles, preferences, skills, avatar.
- [ ] **Careers**: Title, description, salary, demand, roadmap JSON.
- [ ] **Opportunities**: Jobs, Scholarships, Internships (with deadlines, location).
- [ ] **Mentorship**: Mentors, sessions, requests.
- [ ] **Activity**: CV saves, test results, chat logs.
- [ ] **SQL Script**: Create `supabase_schema_v2.sql`.

## 3. Core Features Implementation

### 3.1 AI Career Guidance (Chat & Test)
- [ ] **Chat API**: Refactor `/api/chat` to output structured JSON (recommended careers, skills, local context).
- [ ] **Test Engine**: Build a defined "Career Test" flow (multiple choice) -> AI Scoring -> Result.
- [ ] **Context**: Inject "Sierra Leone" context (universities, local job market) into system prompts.

### 3.2 Opportunities Engine
- [ ] **Feed**: Real-time subscriptions (Supabase Realtime).
- [ ] **Alerts**: Background job or API hook to push alerts to WhatsApp (mock/ready logic).
- [ ] **UI**: Filterable list for Jobs/Scholarships.

### 3.3 CV Builder
- [ ] **Form**: Personal info, education, exp, skills.
- [ ] **AI Enhancement**: "Improve my bio" button.
- [ ] **PDF Generation**: Robust client-side generation using `html-to-image` + `jspdf`.
- [ ] **Storage**: Save PDF reference to Supabase.

### 3.4 Mentorship
- [ ] **Matching Logic**: categorize users vs mentors.
- [ ] **UI**: Booking interface (link to WhatsApp/Email).

### 3.5 WhatsApp Bot (Twilio)
- [ ] **Webhook**: `/api/whatsapp` endpoint.
- [ ] **Logic**: State machine for menu navigation (Home -> Jobs -> Details).
- [ ] **Krio Support**: Bilingual response templates.

## 4. UI/UX Refactor (Mobile First)
- [ ] **Design System**: Define colors (Salone Flag inspired + Modern Dark UI), typography.
- [ ] **Components**: Reusable Cards, Bottom Navigation (Mobile), Skeleton Loaders.
- [ ] **Accessibility**: Aria labels, large touch targets.

## 5. Deployment & QA
- [ ] **Tests**: Unit tests for AI parsers.
- [ ] **CI/CD**: Github Actions (already present, verify).
- [ ] **Vercel**: Final push check.
