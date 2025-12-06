
import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';
import { matchCareers } from '@/lib/local-ai';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const { answers } = await req.json();

        // Try OpenAI first if valid API key exists
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
            try {
                console.log("Attempting OpenAI career matching...");
                const result = await streamObject({
                    model: openai('gpt-4o'),
                    schema: z.object({
                        summary: z.string().describe("A brief analysis of the user's personality and strengths."),
                        recommendations: z.array(z.object({
                            title: z.string().describe("Job Title"),
                            matchScore: z.number().describe("Percentage match (0-100)"),
                            reason: z.string().describe("Why this fits the user"),
                            demand: z.enum(['High', 'Medium', 'Low']).describe("Current demand in Sierra Leone"),
                            salaryRange: z.string().describe("Estimated monthly salary in SLE"),
                        })),
                    }),
                    system: `You are an expert Career Counselor for Sierra Leone. Analyze the user's quiz answers and suggest 3 top careers.
    
    Context:
    - Focus on VIABLE careers in Sierra Leone (Mining, Agriculture, Tech/Telecommunications, Healthcare, Banking, NGO).
    - Be realistic about demand.
    - Salary should be in New Leones (SLE).`,
                    prompt: `User Answers: ${JSON.stringify(answers)}`,
                });

                console.log("OpenAI career matching successful");
                return result.toTextStreamResponse();
            } catch (openaiError: any) {
                console.warn("OpenAI API failed, falling back to local AI:", openaiError.message);
                // Fall through to local AI
            }
        }

        // Local AI Fallback
        console.log("Using local career matching...");
        const result = await matchCareers(answers);

        // Return as streaming text response compatible with useObject
        // Format: stream partial JSON objects line by line
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            start(controller) {
                // Send the complete object as a single chunk in the expected format
                const chunk = `0:${JSON.stringify(result)}\n`;
                controller.enqueue(encoder.encode(chunk));
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
        console.error("Career matching error:", error);
        return new Response(
            JSON.stringify({
                error: 'Failed to match careers',
                details: error instanceof Error ? error.message : String(error)
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
