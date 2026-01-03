import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

// Allow responses up to 60 seconds
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// Comprehensive schema for detailed roadmap structure
const roadmapSchema = z.object({
    career: z.string().describe('The career title'),
    overview: z.string().describe('One-paragraph summary explaining the career, why it fits the user, local demand in Sierra Leone, and common entry roles'),
    skills: z.object({
        core: z.array(z.object({
            name: z.string(),
            why_it_matters: z.string(),
            competency_level: z.enum(['beginner', 'intermediate', 'advanced'])
        })).describe('Core technical skills required'),
        supporting: z.array(z.object({
            name: z.string(),
            why_it_matters: z.string(),
            competency_level: z.enum(['beginner', 'intermediate', 'advanced'])
        })).describe('Supporting soft skills'),
        tools: z.array(z.object({
            name: z.string(),
            why_it_matters: z.string(),
            competency_level: z.enum(['beginner', 'intermediate', 'advanced'])
        })).describe('Tools and platforms needed')
    }),
    timeline: z.object({
        first_7_days: z.array(z.object({
            day: z.number(),
            task: z.string(),
            time_estimate: z.string(),
            outcome: z.string()
        })).describe('Day-by-day tasks for the first week'),
        first_30_days: z.array(z.object({
            week: z.number(),
            topic: z.string(),
            exercise: z.string(),
            proof_of_learning: z.string()
        })).describe('Weekly milestones for the first month'),
        first_90_days: z.array(z.object({
            month: z.number(),
            skill_building: z.string(),
            mini_project: z.string(),
            portfolio_task: z.string(),
            success_criteria: z.string()
        })).describe('Monthly milestones for 3 months')
    }),
    universities_and_training: z.array(z.object({
        name: z.string(),
        program: z.string(),
        duration: z.string(),
        entry_requirements: z.string(),
        why_it_fits: z.string(),
        next_action: z.string()
    })).describe('Real Sierra Leone universities and training programs'),
    mentors: z.array(z.object({
        type: z.string(),
        what_they_help_with: z.string(),
        next_step: z.string()
    })).describe('Recommended mentor types for this career'),
    opportunities: z.array(z.object({
        title: z.string(),
        type: z.enum(['job', 'internship', 'scholarship', 'training']),
        requirements: z.string(),
        how_it_fits: z.string()
    })).describe('Real entry-level opportunities matching this career'),
    proof_and_tracking: z.array(z.object({
        timeline: z.string(),
        measurable_proof: z.string(),
        artifact_examples: z.array(z.string())
    })).describe('Progress tracking and proof of competence'),
    next_step_summary: z.string().describe('Motivational summary and clear next action')
});

// Comprehensive system prompt
function getSystemPrompt(career: string, educationLevel: string, skills: string, interests: string, goals: string): string {
    return `You are the AI Career Roadmap engine for CareerPilot Salone — a career guidance platform for Sierra Leonean youth.

USER PROFILE:
- Education Level: ${educationLevel}
- Skills: ${skills}
- Interests: ${interests}
- Career Path: ${career}
- Goals: ${goals}
- Location: Sierra Leone

Generate a structured, detailed, and actionable roadmap for this career that includes:

1. **Career Overview**
- Provide a one-paragraph summary of the career
- Explain why it fits the user based on their profile
- State local demand in Sierra Leone context
- Provide common entry roles

2. **Skill Breakdown**
List required skills in 3 categories:
- Core technical skills (e.g., Python, Excel, wiring, teaching methods)
- Supporting skills (communication, problem solving)
- Tools and platforms (software, frameworks, etc.)

For each skill:
- Why it matters for this career
- Minimum competency expectation (beginner, intermediate, advanced)

3. **Time-Based Learning Plan**
A. **First 7 Days (Day 1-7)**
- Daily task list with:
  • Task description
  • Time estimate
  • Specific outcome

B. **First 30 Days (Week 1-4)**
- Weekly milestones with:
  • Topic to master
  • Example exercise
  • Proof of learning

C. **First 90 Days (Month 1-3)**
- Monthly milestones with:
  • Advanced skill building
  • Mini project
  • Portfolio task
  • Success criteria

4. **Universities & Training Paths**
Recommend REAL Sierra Leone institutions:
- Fourah Bay College (FBC)
- Njala University
- University of Makeni (UNIMAK)
- IPAM
- Central University
- AIT (African Institute of Technology)
- Ernest Bai Koroma University of Science and Technology

For each:
- Program name and duration
- Entry requirements (authentic)
- Why it fits the career
- Next action step

5. **Mentor Recommendations**
- Career mentor, academic mentor, AI mentor
- What each can help with
- Next actionable step

6. **Opportunity Alignment**
List real entry-level jobs, internships, scholarships in Sierra Leone that match this career path.

7. **Proof & Progress Tracking**
- Measurable proof of competence
- Artifact examples (projects, GitHub, portfolio)
- Checklist format

8. **Motivation & Next Step**
- Summary of achievements
- Clear next action

CRITICAL REQUIREMENTS:
- All institutions, programs, and opportunities must be REAL and verifiable
- Tailor to Sierra Leone context (low bandwidth, limited resources, WhatsApp accessibility)
- Be specific and actionable
- Use encouraging but realistic tone
- Account for power challenges and limited internet
- Suggest offline resources when possible

Output ONLY valid JSON matching the schema. No markdown, no extra text.`;
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

        console.log(`Generating comprehensive roadmap for: ${trimmedCareer}`);

        // Generate with Gemini (primary and most reliable)
        const result = await generateObject({
            model: google('gemini-1.5-flash'),
            schema: roadmapSchema,
            system: getSystemPrompt(trimmedCareer, educationLevel, skills, interests, goals),
            prompt: `Generate a comprehensive, detailed career roadmap for ${trimmedCareer} in Sierra Leone. Include all sections: overview, skills, timeline (7/30/90 days), universities, mentors, opportunities, and tracking. Be specific and actionable.`,
        });

        console.log('Roadmap generation successful');

        // Return final JSON
        return new Response(JSON.stringify(result.object), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Error generating roadmap:', error);

        // Return a helpful fallback response
        return new Response(JSON.stringify({
            error: 'generation_failed',
            message: 'Unable to generate roadmap. Please try again or contact support.',
            details: error.message
        }), { status: 500 });
    }
}
