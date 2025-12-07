
import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { generateRoadmap } from '@/lib/local-ai';

// Allow responses up to 60 seconds
export const maxDuration = 60;

// Schema for roadmap structure
const roadmapSchema = z.object({
    title: z.string().describe('The title of the roadmap, e.g., "Your Roadmap to Software Engineering in Sierra Leone"'),
    overview: z.string().describe('A brief encouraging overview of this career path in Sierra Leone, mentioning opportunities and growth potential.'),
    phases: z.array(z.object({
        name: z.string().describe('Phase name with timeframe, e.g., "Month 1: Foundation Building"'),
        goal: z.string().describe('Main goal of this phase in one concise sentence'),
        steps: z.array(z.string()).describe('5-7 specific, actionable steps to take in this phase'),
        resources: z.array(z.string()).describe('3-5 recommended resources (courses, books, local institutions, online platforms)'),
    })).describe('Exactly 3 phases representing Month 1, Month 2, and Month 3+'),
});

// System prompt for AI
function getSystemPrompt(career: string): string {
    return `You are an expert career advisor specializing in Sierra Leone's job market and educational landscape.
    
Create a detailed, practical 3-month roadmap for someone pursuing: "${career}" in Sierra Leone.

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

Make this roadmap feel personal, achievable, and specifically tailored to Sierra Leone's context.`;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { career, useGemini } = body;

        // Validate input
        if (!career || typeof career !== 'string' || career.trim().length === 0) {
            return new Response(JSON.stringify({ error: 'Invalid input', message: 'Career field is required.' }), { status: 400 });
        }

        const trimmedCareer = career.trim();
        if (trimmedCareer.length > 100) {
            return new Response(JSON.stringify({ error: 'Invalid input', message: 'Career name is too long.' }), { status: 400 });
        }

        let roadmapData = null;

        // 1. Try OpenAI first (Primary)
        if (!useGemini) {
            try {
                console.log('Attempting OpenAI generation...');
                const result = await generateObject({
                    model: openai('gpt-4o'),
                    schema: roadmapSchema,
                    system: getSystemPrompt(trimmedCareer),
                    prompt: `Generate a comprehensive 3-month career roadmap for: ${trimmedCareer}`,
                });
                roadmapData = result.object;
                console.log('OpenAI generation successful');
            } catch (openaiError: any) {
                console.error('OpenAI error, falling back to Gemini:', openaiError);
                // Fallthrough to Gemini
            }
        }

        // 2. Fallback to Gemini
        if (!roadmapData) {
            try {
                console.log('Attempting Gemini generation...');
                const result = await generateObject({
                    model: google('gemini-1.5-flash'), // Stable and fast
                    schema: roadmapSchema,
                    system: getSystemPrompt(trimmedCareer),
                    prompt: `Generate a comprehensive 3-month career roadmap for: ${trimmedCareer}`,
                });
                roadmapData = result.object;
                console.log('Gemini generation successful');
            } catch (geminiError) {
                console.error('Gemini error, falling back to Local:', geminiError);
                // Fallthrough to Local
            }
        }

        // 3. Fallback to Local AI
        if (!roadmapData) {
            try {
                console.log('Falling back to Local AI...');
                roadmapData = await generateRoadmap(trimmedCareer);
                console.log('Local AI generation successful');
            } catch (localError) {
                console.error('Local AI failed:', localError);
                throw new Error('All generation methods failed');
            }
        }

        // Return final JSON
        return new Response(JSON.stringify(roadmapData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Fatal error generating roadmap:', error);
        return new Response(JSON.stringify({ error: 'generation_failed', message: error.message || 'Internal Server Error' }), { status: 500 });
    }
}
