
import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';
import { generateRoadmap } from '@/lib/local-ai';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { career } = body;

        // Validate input
        if (!career || typeof career !== 'string' || career.trim().length === 0) {
            return new Response(
                JSON.stringify({
                    error: 'Invalid input',
                    message: 'Career field is required and must be a non-empty string.'
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Trim and validate length
        const trimmedCareer = career.trim();
        if (trimmedCareer.length > 100) {
            return new Response(
                JSON.stringify({
                    error: 'Invalid input',
                    message: 'Career name is too long. Please keep it under 100 characters.'
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Try OpenAI first if valid API key exists
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
            try {
                console.log("Attempting OpenAI roadmap generation...");
                const result = await streamObject({
                    model: openai('gpt-4o'),
                    schema: z.object({
                        title: z.string().describe('The title of the roadmap, e.g., "Your Roadmap to Software Engineering in Sierra Leone"'),
                        overview: z.string().describe('A brief encouraging overview of this career path in Sierra Leone, mentioning opportunities and growth potential.'),
                        phases: z.array(z.object({
                            name: z.string().describe('Phase name with timeframe, e.g., "Month 1: Foundation Building"'),
                            goal: z.string().describe('Main goal of this phase in one concise sentence'),
                            steps: z.array(z.string()).describe('5-7 specific, actionable steps to take in this phase'),
                            resources: z.array(z.string()).describe('3-5 recommended resources (courses, books, local institutions, online platforms)'),
                        })).describe('Exactly 3 phases representing Month 1, Month 2, and Month 3+'),
                    }),
                    system: `You are an expert career advisor specializing in Sierra Leone's job market and educational landscape.
    
Create a detailed, practical 3-month roadmap for someone pursuing: "${trimmedCareer}" in Sierra Leone.

CRITICAL GUIDELINES:
1. **Local Context**: Reference Sierra Leone institutions (Fourah Bay College, IPAM, Njala University, etc.), local companies, and Freetown/Bo/Kenema opportunities.
2. **Practical Reality**: Account for limited internet, power challenges. Suggest offline resources, local libraries, study groups.
3. **Actionable Steps**: Each step must be specific and achievable. Avoid vague advice.
4. **Encouraging Tone**: Be motivating but realistic. Acknowledge challenges while emphasizing opportunities.
5. **Structure**: Exactly 3 phases:
   - Month 1: Foundation & Learning
   - Month 2: Skill Development & Practice
   - Month 3+: Job Search & Networking
6. **Resources**: Mix of free online resources (that work on slow internet), local institutions, books available in Freetown, and networking opportunities.

Make this roadmap feel personal, achievable, and specifically tailored to Sierra Leone's context.`,
                    prompt: `Generate a comprehensive 3-month career roadmap for: ${trimmedCareer}`,
                });

                console.log("OpenAI roadmap generation successful");
                return result.toTextStreamResponse();
            } catch (openaiError: any) {
                console.warn("OpenAI API failed, falling back to local AI:", openaiError.message);
                // Fall through to local AI
            }
        }

        // Local AI Fallback
        console.log("Using local roadmap generation...");
        const roadmap = await generateRoadmap(trimmedCareer);

        // Return as streaming text response compatible with useObject
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            start(controller) {
                // Send the complete object as a single chunk in the expected format
                const chunk = `0:${JSON.stringify(roadmap)}\n`;
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

    } catch (error: any) {
        console.error('Error generating roadmap:', error);

        // Generic error response
        return new Response(
            JSON.stringify({
                error: 'generation_failed',
                message: error?.message || 'Failed to generate roadmap. Please try again.'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
