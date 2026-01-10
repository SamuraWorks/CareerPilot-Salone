import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { SIERRA_LEONE_CAREERS, INSTITUTIONS, ONLINE_RESOURCES } from '@/lib/career-data';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const { messages, userProfile } = await req.json();

        let groundedCareers = "";
        // Optimize context size: Map only essential fields
        groundedCareers = SIERRA_LEONE_CAREERS.map(c =>
            `CAREER: ${c.title}
             SALARY: ${c.salaryRange}
             DEMAND: ${c.demand}
             EDUCATION: ${c.requiredEducation.join(', ')}
             INSTITUTIONS: ${c.localInstitutions.join(', ')}
             SKILLS: ${c.requiredSkills.join(', ')}`
        ).join('\n---\n');

        const groundedInstitutions = INSTITUTIONS.map(inst =>
            `INSTITUTION: ${inst.name} (${inst.location}) - SPECIALTIES: ${inst.specializations.join(', ')}`
        ).join('\n');

        const groundingContext = `
You are CareerPilot Salone AI, a dedicated career architect for Sierra Leone. 
**CRITICAL DIRECTIVE: NO GUESSWORK.** 
You must ONLY provide information based on the "OFFICIAL DATA" provided below.

OFFICIAL DATA (SIERRA LEONE CAREERS):
${groundedCareers}

OFFICIAL DATA (LOCAL INSTITUTIONS):
${groundedInstitutions}

USER PROFILE:
${JSON.stringify(userProfile || {})}

STRICT RESPONSE RULES:
1. **Fact-Check First**: Before recommending a salary or degree, verify it exists in the "OFFICIAL DATA" above. If it is NOT listed, state: "I don't have verified local data for that specific role yet, but generally in West Africa..."
2. **Local Currency**: Always quote salaries in SLE (New Leones). Use the ranges provided in the data.
3. **Real Institutions**: Only recommend universities/colleges listed in the data. Do NOT invent course names.
4. **Actionable Steps**: Give 3 real, physical steps the user can take in Sierra Leone (e.g., "Visit the IPAM registrar's office at Tower Hill", "Check usage of LinkedIn in Freetown").
5. **Tone**: Empowerment, professional, and locally grounded (use "Salone", "Kusheh" sparingly but naturally).

If the user asks about a career NOT in your database, answer based on general professional principles but explicitly flag it as "General Advice" rather than "Verified Local Data".
`;

        let result;

        // 2. Select Model with strict preference for high-intelligence models
        if (process.env.OPENAI_API_KEY) {
            console.log("Using OpenAI GPT-4o for authentic responses");
            result = await streamText({
                model: openai('gpt-4o'),
                system: groundingContext,
                messages: messages,
                temperature: 0.3, // Lower temperature for more factual responses
            });
        }
        else if (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            console.log("Using Google Gemini 1.5 Pro for authentic responses");
            result = await streamText({
                model: google('gemini-1.5-pro'), // Upgraded to Pro for better reasoning
                system: groundingContext,
                messages: messages,
                temperature: 0.3,
            });
        }
        else {
            // DYNAMIC LOCAL AI RESPONSE FOR DEMO/DEVELOPMENT WITHOUT KEYS
            console.log("Using Dynamic Local AI Response (No Keys Found)");
            const { generateChatResponse } = await import('@/lib/local-ai');

            const reply = await generateChatResponse(messages, JSON.stringify(userProfile || {}));

            // Format as a data stream chunk for useChat
            // The format is {type}:{content}\n
            // type 0 is for text
            const serializedReply = JSON.stringify(reply);
            return new Response(
                `0:${serializedReply}\n`,
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
