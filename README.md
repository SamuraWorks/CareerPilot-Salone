# CareerPilot Salone 🇸🇱

**CareerPilot Salone** is an AI-powered career navigator designed specifically for the Sierra Leonean labor market. It helps students and professionals bridge the gap between academic education and employability through strategic profile synthesis, AI-generated CVs, and local opportunity matching.

## Table of contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [AI Engine & Local Synthesis](#ai-engine--local-synthesis)
- [License](#license)

## Features
- **Smart Intake System**: A 9-step biometric career profiling tool that captures experience, impact metrics, and leadership signals.
- **AI Career Synthesis**: Generates professional roadmaps and guidance grounded in Sierra Leonean institutions and market demand.
- **Dynamic Dashboard**: Personalized "Ready to Apply" metrics and tactical recommendations based on your unique profile.
- **Resume (CV) Builder**: Robust tool that generates industry-standard CVs tailored to the local market.
- **Cover Letter Engine**: Tone-aware generator that aligns your "Professional Hook" with specific job targets.
- **Mentorship & Scholarships**: Integrated directory for local resources at FBC, IPAM, and Njala.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion
- **AI/LLM**: Google Gemini (Flash 1.5/2.0), Vercel AI SDK
- **Backend/Database**: Supabase (PostgreSQL), Edge Runtime
- **UI Components**: Shadcn/UI, Radix UI, Lucide Icons

## Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/SamuraWorks/CareerPilot-Salone.git
   cd CareerPilot-Salone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup Environment Variables:
   Create a `.env` file (copied from `.env.example`) and add your API keys:
   ```bash
   GEMINI_API_KEY=your_gemini_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### Running Locally
```bash
npm run dev
```
Navigate to `http://localhost:3000` to start your career intake.

## Deployment
This project is optimized for **Vercel**.
- **Edge Compatibility**: Key API routes are configured for the Edge Runtime for maximum performance.
- **Environment Variables**: Ensure all keys in `.env.example` are added to your Vercel project settings.

## AI Engine & Local Synthesis
CareerPilot Salone uses a "Distributed Reasoning" approach. If API keys are missing or high-latency is detected, the system gracefully falls back to a **Local Synthesis Layer** (located in `lib/local-ai.ts`). This ensures the app remains interactive and provides grounded, relevant career advice even in offline-first or limited-connectivity scenarios.

## License
This project is licensed under the MIT License.

---
**Maintaining Excellence for Salone Youth.** 🇸🇱
