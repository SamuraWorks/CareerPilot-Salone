
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getSiteContext } from '@/lib/ai-context';
import { generateChatResponse } from '@/lib/local-ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const siteContext = await getSiteContext();

        // Try OpenAI first if API key exists and has quota
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
            try {
                console.log("Attempting OpenAI API...");
                const result = await streamText({
                    model: openai('gpt-4o'),
                    system: `You are CareerPilot, an expert AI career counselor for High School and University students in Sierra Leone.
    
    Your Role:
    - Guide users to suitable career paths based on their interests.
    - Suggest relevant Sierra Leonean universities (FBC, Njala, UNIMAK, etc.) and online courses.
    - Provide realistic salary expectations in Sierra Leonean Leones (SLE).
    - Be encouraging, professional, and practical.
    - If asked about "Health", "Tech", "Agric", etc., detail specific jobs and requirements.
    
    REAL-TIME SITE DATA:
    ${siteContext}
    
    Context:
    - Users are often young students or job seekers.
    - Keep answers concise and bulleted for readability.`,
                    messages,
                });

                console.log("OpenAI stream created successfully");
                return result.toTextStreamResponse();
            } catch (openaiError: any) {
                console.warn("OpenAI API failed, falling back to local AI:", openaiError.message);
                // Fall through to local AI
            }
        }

        // Local AI Fallback
        console.log("Using local AI service...");
        const response = await generateChatResponse(messages, siteContext);

        // Return as plain text response (simulating streaming)
        return new Response(response, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });

    } catch (error) {
        console.error("Chat API Error:", error);
        return new Response(
            JSON.stringify({
                error: 'Failed to process chat',
                details: error instanceof Error ? error.message : String(error)
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
