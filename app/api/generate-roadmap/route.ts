import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

// Use Edge Runtime for longer timeout support
export const runtime = 'edge';

// Clean & Focused Schema
const roadmapSchema = z.object({
    title: z.string().describe('The career title (e.g., "Mining Engineering")'),
    short_explanation: z.string().describe('A step-by-step starter pathway explanation (1 line)'),
    why_this_career: z.object({
        reason: z.string().describe('Why it is a key industry in Sierra Leone'),
        demand_locations: z.array(z.string()).describe('List of specific locations/districts in SL where demand exists'),
        growth_outlook: z.string().describe('Long-term growth prospects')
    }),
    entry_requirements: z.array(z.string()).describe('List of 3-4 minimum entry requirements (WASSCE subjects, traits, literacy)'),
    phases: z.array(z.object({
        name: z.string().describe('Phase name (e.g., "Foundations", "Practical Exposure")'),
        duration: z.string().describe('Duration string (e.g., "Weeks 1-2")'),
        goal: z.string().describe('Main goal of this phase'),
        what_you_will_learn: z.array(z.string()).describe('3-4 key learning points'),
        what_you_must_do: z.array(z.string()).describe('2-3 specific action items')
    })).describe('Exactly 3 phases: Foundations, Practical Exposure, Transition'),
    universities: z.array(z.object({
        name: z.string(),
        focus: z.string().describe('Short focus description (e.g. "Engineering & Earth Sciences")')
    })).describe('3-4 Relevant Sierra Leone institutions'),
    mentor_guidance: z.string().describe('Short text encouraging connection with a mentor')
});

function getSystemPrompt(career: string, educationLevel: string, skills: string, interests: string, goals: string): string {
    return `You are the AI Career Roadmap engine for CareerPilot Salone. You must generate a "Clean & Focused" roadmap.

USER CONTEXT:
- Career: ${career}
- Education: ${educationLevel}
- Location: Sierra Leone

CORE PRINCIPLES (NON-NEGOTIABLE):
1. One search → One career → One clear pathway.
2. NO distractions, NO "related careers", NO personality analysis.
3. Tone: Calm, honest, direct, encouraging but realistic.
4. Context: STRICTLY Sierra Leone (locations, institutions, realities).

OUTPUT INSTRUCTIONS:

1. **Short Explanation**: A single sentence summarizing what this roadmap offers (e.g. "A step-by-step starter pathway to enter...").

2. **Why This Career**:
   - Reason: Factual statement about the industry in SL.
   - Demand Locations: Real districts (e.g. Kono, Freetown, Bo).
   - Growth: Realistic long-term outlook.

3. **Entry Requirements**:
   - 3-4 bullet points. Real constraints (WASSCE subjects, physical traits if needed, literacy).
   - Be honest about what is needed to *start*.

4. **90-Day Roadmap (3 Phases)**:
   - Phase 1 (Weeks 1-2): Foundations. Goal: Basics & Safety.
   - Phase 2 (Weeks 3-6): Practical Exposure. Goal: Applied understanding.
   - Phase 3 (Weeks 7-12): Transition. Goal: Next steps (School/Internship).
   - For each phase: List 3-4 specific things to "Learn" and 2-3 specific things to "Do".

5. **Universities**:
   - Only relevant SL institutions.
   - Short focus note for each.

6. **Mentor Guidance**:
   - One sentence encouraging them to find a mentor.

Keep it simple. Clarity beats noise.`;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            career,
            educationLevel = 'Secondary School',
            skills = 'Basic computer literacy',
            interests = 'Technology and problem solving',
            goals = 'Career start and job readiness'
        } = body;

        // Validate input
        if (!career || typeof career !== 'string' || career.trim().length === 0) {
            return new Response(JSON.stringify({
                error: 'Invalid input',
                message: 'Career field is required.'
            }), { status: 400 });
        }

        const trimmedCareer = career.trim();
        if (trimmedCareer.length > 100) {
            return new Response(JSON.stringify({
                error: 'Invalid input',
                message: 'Career name is too long.'
            }), { status: 400 });
        }

        console.log(`Generating clean roadmap for: ${trimmedCareer}`);

        const result = await generateObject({
            model: google('gemini-1.5-flash', {
                safetySettings: [
                    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
                ]
            }),
            schema: roadmapSchema,
            system: getSystemPrompt(trimmedCareer, educationLevel, skills, interests, goals),
            prompt: `Generate a Clean & Focused career roadmap for ${trimmedCareer} in Sierra Leone. Keep it brief.`,
        });

        console.log('Clean roadmap generation successful');

        return new Response(JSON.stringify(result.object), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Error generating roadmap:', error);
        return new Response(JSON.stringify({
            error: 'generation_failed',
            message: error.message || 'Unable to generate roadmap.',
            details: error.cause || error.stack
        }), { status: 500 });
    }
}
