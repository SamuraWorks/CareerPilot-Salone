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

    // Construct a rich system prompt with context
    const systemPrompt = `You are CareerPilot, an expert Career Advisor for Sierra Leone.

CONTEXT DATA:
${context || "No specific user context provided."}

YOUR ROLE:
- Give practical, actionable advice for students and job seekers in Sierra Leone.
- Be encouraging but realistic about the local job market (Freetown, Bo, Kenema, etc.).
- Structure answers clearly: bullet points, bold text for emphasis.
- If asked about salaries, quote ranges in Sierra Leonean Leones (SLE/SLL) if known, or generic ranges.
- Mention local universities (FBC, Njala, UNIMAK) and technical institutes (GTIs) where relevant.

FORMAT:
- Keep responses concise (under 200 words unless detailed explanation is requested).
- Use Markdown for formatting.`;

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

    // 3. Return Error (or could use local logic here if desired)
    throw new Error("All AI providers failed. Please check your internet connection or API keys.");
}
