import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { MASTER_PROMPT, SNIPPET_ENHANCEMENT_PROMPT } from '@/lib/ai/prompts';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const { text, type, career, profile, jobDetails } = await req.json();

        let systemPrompt = "";
        let promptContent = "";

        if (type === 'full_application') {
            systemPrompt = MASTER_PROMPT;
            const userContext = JSON.stringify(profile, null, 2);
            const jobContext = jobDetails ? JSON.stringify(jobDetails, null, 2) : "NO_SPECIFIC_JOB_TARGET";

            promptContent = `
             STRUCTURED USER DATA:
             ${userContext}

             JOB TARGET DATA:
             ${jobContext}

             INSTRUCTIONS:
             Generate the Application Package now.
             `;
        } else {
            // Legacy / Snippet Mode
            systemPrompt = SNIPPET_ENHANCEMENT_PROMPT;
            if (type === 'summary') {
                systemPrompt += "\n\nEnhance the provided professional summary. Make it impact-driven, professional, and tailored for a " + (career || "professional") + " role. Keep it concise (3-4 sentences).";
            } else if (type === 'experience') {
                systemPrompt += "\n\nEnhance the provided job description bullet points. Focus on achievements rather than just duties. Make them professional and relevant for a " + (career || "professional") + " context in Sierra Leone and abroad.";
            }
            promptContent = `Original Text: ${text}`;
        }

        // 1. Try OpenAI (Primary)
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
            const result = await streamText({
                model: openai('gpt-4o'),
                system: systemPrompt,
                prompt: promptContent,
            });

            return result.toTextStreamResponse();
        }

        // 2. Try Gemini (Fallback)
        if (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            try {
                const result = await streamText({
                    model: google('gemini-1.5-flash'),
                    system: systemPrompt,
                    prompt: promptContent,
                });

                return result.toTextStreamResponse();
            } catch (geminiError: any) {
                console.warn("Gemini CV enhancement failed:", geminiError.message);
            }
        }

        // Mock response if no keys
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            start(controller) {
                let response = "";
                if (type === 'full_application') {
                    response = `[MOCK GENERATED CV]
Name: ${profile?.fullName || "Candidate"}
Role: ${career || "Professional"}

SUMMARY
High-potential professional with...

EXPERIENCE
...

[MOCK COVER LETTER]
Dear Hiring Manager,
I am writing to express my strong interest...
`;
                } else {
                    response = `[AI ENHANCED] ${text} (Enhanced for impact)`;
                }

                controller.enqueue(encoder.encode(response));
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
