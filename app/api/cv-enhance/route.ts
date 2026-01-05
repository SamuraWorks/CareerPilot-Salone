import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const { text, type, career } = await req.json();

        // System prompt context
        let systemPrompt = "You are an expert career consultant in Sierra Leone. Your goal is to improve professional CV content for the local and international market.";

        if (type === 'summary') {
            systemPrompt += "\n\nEnhance the provided professional summary. Make it impact-driven, professional, and tailored for a " + (career || "professional") + " role. Keep it concise (3-4 sentences). Use strong action verbs.";
        } else if (type === 'experience') {
            systemPrompt += "\n\nEnhance the provided job description bullet points. Focus on achievements rather than just duties. Use the star method where possible. Make them professional and relevant for a " + (career || "professional") + " context in Sierra Leone and abroad.";
        }

        // 1. Try OpenAI (Primary)
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
            const result = await streamText({
                model: openai('gpt-4o'),
                system: systemPrompt,
                prompt: `Original Text: ${text}`,
            });

            return result.toTextStreamResponse();
        }

        // 2. Try Gemini (Fallback)
        if (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            try {
                const result = await streamText({
                    model: google('gemini-1.5-flash'),
                    system: systemPrompt,
                    prompt: `Original Text: ${text}`,
                });

                return result.toTextStreamResponse();
            } catch (geminiError: any) {
                console.warn("Gemini CV enhancement failed:", geminiError.message);
            }
        }

        // Mock response if no OpenAI key
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            start(controller) {
                const response = `[AI ENHANCED VERSION]
This is a placeholder for the AI-enhanced version of your text. 
To see real AI improvements, please add an OPENAI_API_KEY to your environment variables.
Original Career: ${career || 'N/A'}
Original Text was: ${text.substring(0, 100)}...`;

                controller.enqueue(encoder.encode(`0:${JSON.stringify(response)}\n`));
                controller.close();
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'X-Vercel-AI-Data-Stream': 'v1',
            },
        });

    } catch (error) {
        console.error("CV Enhancement error:", error);
        return new Response(JSON.stringify({ error: 'Failed to enhance text' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
