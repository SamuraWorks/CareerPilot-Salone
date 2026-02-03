import { GoogleGenerativeAI } from "@google/generative-ai";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

// ------------------------------------------------------------------
// CONFIGURATION
// ------------------------------------------------------------------
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_KEY;

// ------------------------------------------------------------------
// TYPES
// ------------------------------------------------------------------
export interface CareerReplyParams {
    messages: Array<{ role: string; content: string }>;
    context?: string;
    modelName?: string;
}

export interface CareerReplyResult {
    text: string;
    raw?: any;
    provider: 'gemini' | 'openai' | 'fallback';
}

// ------------------------------------------------------------------
// MAIN GENERATOR FUNCTION
// ------------------------------------------------------------------
export async function generateCareerReply({
    messages,
    context,
    modelName = 'gemini-1.5-flash'
}: CareerReplyParams): Promise<CareerReplyResult> {
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    // Construct a focused system prompt with context
    // Construct a focused system prompt with context
    const systemPrompt = `You are CareerPilot Salone, a highly intelligent and friendly AI career guidance assistant for students and graduates in Sierra Leone. Your goal is to provide personalized, actionable, and practical advice to help users explore careers, generate CVs, create roadmaps, and find jobs. Respond in a conversational tone that is approachable, encouraging, and sometimes includes Krio phrases to resonate with local users.

CONTEXT:
${context || "No specific user context provided."}

RULES & BEHAVIORS:
1. **Career Guidance**
   - Understand the user’s interests, subjects, and skills.
   - Suggest **3–5 specific career paths** that realistically match their profile.
   - Include for each career: Name, Short description, Typical entry-level role, Approximate salary range (in Sierra Leone Leones, e.g. "Le 3M - 6M"), Key skills.

2. **Roadmaps**
   - If asked "how to become" something, give **step-by-step guidance**:
     - Learning steps (courses, specific SL universities if applicable).
     - Skills to acquire.
     - Projects/Internships.
     - Entry-level roles.
   - Make it **realistic** for Sierra Leone.

3. **CV Generation**
   - If asked to generate a CV:
     - Generate a **structured CV** in clean text format.
     - Sections: Full Name, Education (e.g. FBC, IPAM, Njala), Skills, Work/Internship (local context), Projects.
   - Ready for copy-paste.

4. **Job Search**
   - Suggest **realistic/typical jobs** in Sierra Leone or remote.
   - Include: Title, Company (if known or realistic examples), Location (Freetown, Bo, etc), Salary range, Apply link (placeholder).

5. **Dynamic & Local Tone**
   - Respond according to the user's specific specific need (don't force a career list if they asked for a CV).
   - Use succinct emojis (💻, 📊, 🎯).
   - **CRITICAL:** Include Krio phrases occasionally (e.g., "Kushe," "Dis na di way," "No worry," "Wi go mek am").

FORMAT EXAMPLES:

**Career Suggestion:**
1️⃣ Software Developer 💻
- Build apps for local businesses.
- Entry-level: Junior Dev
- Salary: Le 3M – 6M/month
- Skills: React, Node.js

**Roadmap:**
Step 1: Learn basics at IPAM/FBC or online.
Step 2: Build local projects.
Step 3: Intern at tech firms (e.g. Orange, Africell).

**CV:**
[Full structured text CV]

Please respond to the USER CHAT HISTORY below.`;


    // 1. Try Gemini (Primary)
    if (GEMINI_API_KEY) {
        try {
            console.log(`[AI] Calling Google Gemini (${modelName})...`);
            const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: modelName });

            // Convert messages to Gemini format (simplification: chat session)
            // For REST simplicity, we'll just prompt with the history + latest message
            // or usage of chat.sendMessage if we were maintaining a session object.
            // Here, we use a constructed prompt for statelessness or the simple generateContent.

            const prompt = `${systemPrompt}\n\nUSER CHAT HISTORY:\n${messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}\n\nASSISTANT:`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            return {
                text,
                raw: result,
                provider: 'gemini'
            };

        } catch (error: any) {
            console.error("[AI] Gemini Error:", error.message);
            // Fall through to OpenAI or Fallback
        }
    }

    // 2. Try OpenAI (Fallback)
    if (OPENAI_API_KEY) {
        try {
            console.log(`[AI] Falling back to OpenAI...`);
            const openai = createOpenAI({ apiKey: OPENAI_API_KEY });
            const { text, response } = await generateText({
                model: openai('gpt-4o-mini'), // Use a fast/cheap model for fallback
                system: systemPrompt,
                messages: messages as any,
            });

            return {
                text,
                raw: response,
                provider: 'openai'
            };
        } catch (error: any) {
            console.error("[AI] OpenAI Error:", error.message);
        }
    }

    // 3. Return a friendly, localized fallback response instead of failing
    console.warn("[AI] All AI providers failed. Returning localized fallback response.");

    return {
        text: `Kusheh fambul! 🇸🇱 Ah sorry, ah get small network issue for now but ah still ready for help you. 

How about you look at de **Resources** tab for courses, or de **CV Builder** for make you resume better? 

If you ask about specific jobs, eh better for check de **Opportunities** page. 

Wi go try again small time!`,
        provider: 'fallback'
    };
}
