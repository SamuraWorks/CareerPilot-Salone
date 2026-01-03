import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

// Initialize Google AI with the provided key (Temporary Fix for Deployment)
// TODO: Move this to Vercel Environment Variables for security
const google = createGoogleGenerativeAI({
    apiKey: 'AIzaSyAqIESOc2NbSVsgv2UuMdzyOBgiHQ72lhY' // User provided key
});

// Use Edge Runtime for longer timeout support
export const runtime = 'edge';

// Detailed Career Schema (Updated for "50+ Careers" depth)
const roadmapSchema = z.object({
    title: z.string().describe('The career title (e.g., "Mining Engineering")'),
    short_explanation: z.string().describe('A step-by-step starter pathway explanation (1 line)'),
    // Expanded Career Summary
    career_details: z.object({
        description: z.string().describe('2-3 sentence career description in Sierra Leone context'),
        salary_range: z.string().describe('Typical salary range in SLE (e.g. "SLE 2,500 - 6,000")'),
        market_demand: z.enum(['High', 'Medium', 'Low']),
        responsibilities: z.array(z.string()).describe('List of 3-4 key job responsibilities')
    }),
    why_this_career: z.object({
        reason: z.string().describe('Why it is a key industry in Sierra Leone'),
        demand_locations: z.array(z.string()).describe('List of specific locations/districts in SL where demand exists'),
        growth_outlook: z.string().describe('Long-term growth prospects')
    }),
    entry_requirements: z.array(z.string()).describe('List of 3-4 minimum entry requirements (WASSCE subjects, traits, literacy)'),
    phases: z.array(z.object({
        name: z.string().describe('Phase name (e.g., "Foundations", "Practical Exposure")'),
        duration: z.string().describe('Duration string (e.g., "Weeks 1-4")'),
        goal: z.string().describe('Main goal of this phase'),
        what_you_will_learn: z.array(z.string()).describe('3-4 key learning points'),
        what_you_must_do: z.array(z.string()).describe('2-3 specific action items')
    })).describe('Exactly 3 phases: Fundamentals (Weeks 1-4), Practice (Weeks 5-8), Apply (Weeks 9-12)'),
    universities: z.array(z.object({
        name: z.string(),
        focus: z.string().describe('Short focus/course name (e.g. "BSc Geology")'),
        requirements: z.string().describe('Specific admission requirements if known')
    })).describe('3-5 Relevant Sierra Leone institutions'),
    mentors: z.array(z.object({
        type: z.string().describe('Type of mentor (e.g. "Senior Engineer")'),
        contact_method: z.string().describe('e.g. "LinkedIn", "Alumni Network", "Mining Association"')
    })).describe('2-3 aligned mentor profiles'),
    opportunities: z.array(z.string()).describe('List of 3-4 relevant job types, internships, or scholarships'),
    next_steps: z.array(z.string()).describe('3-4 clear, immediate action items')
});

function getSystemPrompt(career: string, educationLevel: string, skills: string, interests: string, goals: string): string {
    return `You are the specific Career Roadmap engine for CareerPilot Salone.

USER REQUEST: ${career}
CONTEXT: Sierra Leone (Real Data Only)

STRICT RULES:
1. **Real Data**: Use real institutions, real salary ranges (in SLE), and real market realities.
2. **One Path**: Focus ONLY on ${career}. Do not suggest alternatives.
3. **Structure**:
   - **Summary**: Description, Salary (SLE), Demand (High/Med/Low).
   - **Requirements**: WASSCE subjects, skills.
   - **Universities**: Real SL colleges (FBC, Njala, UNIMAK, etc.) with courses.
   - **Mentors**: Types of pros to find.
   - **12-Week Roadmap**:
     - Phase 1 (Weeks 1-4): Fundamentals.
     - Phase 2 (Weeks 5-8): Practice/Projects.
     - Phase 3 (Weeks 9-12): Apply/Internships.
   - **Opportunities**: Real job titles/internships.
   - **Next Steps**: Immediate actions.

Make it actionable, encouraging, and local. If data is unknown, give the best local approximation.`;
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
            model: google('gemini-1.5-flash-001', {
                safetySettings: [
                    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
                    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
                ]
            }),
            mode: 'json',
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
