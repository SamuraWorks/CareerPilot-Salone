import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { SIERRA_LEONE_CAREERS, INSTITUTIONS, ONLINE_RESOURCES } from '@/lib/career-data';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const { messages, userProfile } = await req.json();

        // 1. Build Grounding Context (Expanded to top 100 careers for better coverage)
        const groundedCareers = SIERRA_LEONE_CAREERS.slice(0, 100).map(c =>
            `- ${c.title} [${c.industry}]: ${c.description}. Paths: ${c.requiredEducation.join(', ')}. Demand: ${c.demand} in Salone. Sal: ${c.salaryRange}.`
        ).join('\n');

        const groundedInstitutions = INSTITUTIONS.map(inst =>
            `- ${inst.name}: ${inst.specializations.join(', ')}. (${inst.location})`
        ).join('\n');

        const groundingContext = `
You are "CareerPilot Salone AI", a professional career coach for Sierra Leonean youth.
Your mission is to provide realistic, encouraging, and highly local career guidance.

KNOWLEDGE BASE (LOCAL CAREERS):
${groundedCareers}

LOCAL INSTITUTIONS:
${groundedInstitutions}

USER CONTEXT:
${JSON.stringify(userProfile || {})}

GUIDELINES:
1. **Be Salone-Specific**: Always refer to the Sierra Leonean context (e.g., mention WASSCE, Freetown, provincial cities, local universities).
2. **Use the Knowledge Base**: If a user asks about a career, check if it's in the list above. If it is, use that data (salary, institutions).
3. **Structured Advice**: Respond with a Summary, followed by concrete Path options, and finish with 2-3 immediate Action Items.
4. **Tone**: Be a "Big Brother/Sister" mentor—professional but accessible. Use common local terms like "Salone" or "Kusheh" where appropriate, but keep the core advice in clear English.
5. **No Hallucinations**: If you don't know a local detail, admit it and suggest where they can find out (e.g., "Check with the Ministry of Technical and Higher Education").
6. **Integrity**: Never recommend a degree at a university that doesn't offer it (e.g., Engineering at IPAM is a NO).
`;

        let result;

        // 2. Select Model
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
            result = await streamText({
                model: openai('gpt-4o'),
                system: groundingContext,
                messages: messages,
                temperature: 0.7,
            });
        }
        else if (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            result = await streamText({
                model: google('gemini-1.5-flash'),
                system: groundingContext,
                messages: messages,
                temperature: 0.7,
            });
        }
        else {
            // MOCK RESPONSE FOR DEMO/DEVELOPMENT WITHOUT KEYS
            console.log("Using Mock AI Response (No Keys Found)");
            const lastMessage = messages[messages.length - 1]?.content || "Hello";

            return new Response(
                `0:"Kusheh! I'm currently in 'Demo Mode' because AI credentials aren't set up yet. \n\nHowever, I can still see you asked about: '${lastMessage}'. \n\nIn the full version, I provide detailed links to Sierra Leonean universities, salary data for Salone careers, and specific next steps for your profile! Try asking me about 'Engineering' or 'Law' once the keys are connected."\n`,
                {
                    headers: {
                        'Content-Type': 'text/plain; charset=utf-8',
                        'x-vercel-ai-data-stream': 'v1'
                    }
                }
            );
        }

        return result.toTextStreamResponse();

    } catch (error: any) {
        console.error('Assistant API Error:', error);

        return new Response(
            JSON.stringify({
                error: error.message || "Failed to process request",
                fallback: "Kusheh! I'm having a small technical hitch. Please try again in a moment, or tell me: what's your dream job in Salone?"
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
