import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { getRoadmap, searchRoadmaps, RoadmapTemplate } from '@/lib/roadmap-database';

// Initialize Google AI (Optional: reserved for enhancements if needed later)
const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
});

// Use Edge Runtime
export const runtime = 'edge';

// We map our DB structure to the Frontend's expected Schema
// We map our DB structure to the Frontend's expected Schema
interface DetailedRoadmapResponse {
    id: string;
    title: string;
    short_explanation: string;
    career_details: {
        description: string;
        salary_range: string;
        market_demand: 'High' | 'Medium' | 'Low';
        demand_explanation: string; // New: Explains why the demand is high/medium/low
        responsibilities: string[];
        work_environment: string;
        career_levels: string[];
        required_tools: string[]; // New: Specific tools (e.g. VS Code, Stethoscope)
        certifications: string[]; // New: Crucial certifications
        skill_gap_analysis: string; // New: Common gaps for Salone youth
        market_reality: string; // New: The rough truth about finding a job in this field in Salone
    };
    learning_resources: {
        free: string[];
        paid: string[];
        local: string[];
    };
    why_this_career: {
        reason: string;
        demand_locations: string[];
        growth_outlook: string;
    };
    entry_requirements: string[];
    phases: {
        id: string;
        name: string;
        duration: string;
        goal: string;
        what_you_will_learn: string[];
        what_you_must_do: { id: string; task: string; completed?: boolean }[];
    }[];
    universities: {
        name: string;
        focus: string;
        requirements: string;
    }[];
    mentors: {
        name: string;
        role: string;
        help_with: string;
        contact: string;
    }[];
    opportunities: string[];
    next_steps: string[];
}

export async function POST(req: Request) {
    const body = await req.json();
    const {
        career,
        educationLevel,
        location,
        skillLevel,
        userType
    } = body;

    if (!career || typeof career !== 'string' || career.trim().length === 0) {
        return new Response(JSON.stringify({ error: 'Invalid input', message: 'Career field is required.' }), { status: 400 });
    }

    const trimmedCareer = career.trim();

    // If user profile data is provided, use AI generation for personalization
    const hasProfileData = educationLevel || location || skillLevel || userType;

    if (hasProfileData) {
        try {
            console.log(`Generating personalized roadmap for: ${trimmedCareer}`);

            // Use AI with refined prompt for personalized generation
            const systemPrompt = createRefinedSystemPrompt(
                educationLevel || "secondary",
                location || "Freetown",
                skillLevel || "beginner",
                userType || "student"
            );

            const { object } = await generateObject({
                model: google('gemini-2.0-flash-exp'),
                schema: detailedRoadmapSchema,
                system: systemPrompt,
                prompt: `Generate a detailed All-in-One career roadmap for: ${trimmedCareer} in Sierra Leone.
User Context: ${userType} with ${educationLevel} education in ${location}.`,
            });

            // Map AI response to our expected format
            const formattedRoadmap = mapAIResponseToFormat(object, trimmedCareer);
            return new Response(JSON.stringify(formattedRoadmap), { status: 200 });

        } catch (aiError) {
            console.error('AI generation failed, falling back to database:', aiError);
            // Fall through to database lookup
        }
    }

    // Fallback: Database lookup
    console.log(`Searching database for: ${trimmedCareer}`);
    const roadmap = getRoadmap(trimmedCareer);

    if (roadmap) {
        console.log(`Match found: ${roadmap.title}`);
        const formattedRoadmap = mapDatabaseToResponse(roadmap);
        return new Response(JSON.stringify(formattedRoadmap), { status: 200 });
    }

    // Search suggestions if no exact match
    const suggestions = searchRoadmaps(trimmedCareer);
    if (suggestions.length > 0) {
        console.log(`Suggesting close match: ${suggestions[0].title}`);
        const formattedRoadmap = mapDatabaseToResponse(suggestions[0]);
        return new Response(JSON.stringify(formattedRoadmap), { status: 200 });
    }

    // No match found
    return new Response(JSON.stringify({
        error: 'not_found',
        message: 'This career is not yet in our verified database. Please check back later or try a different title.'
    }), { status: 404 });
}

// Helper: Map DB Template to Frontend Response
function mapDatabaseToResponse(db: RoadmapTemplate): DetailedRoadmapResponse {
    const requirements = [
        db.entryRequirements.education,
        ...(db.entryRequirements.subjects ? [`Subjects: ${db.entryRequirements.subjects.join(', ')}`] : []),
        ...(db.entryRequirements.technicalSkills ? [`Skills: ${db.entryRequirements.technicalSkills.join(', ')}`] : []),
        ...(db.entryRequirements.certification ? [`Cert: ${db.entryRequirements.certification}`] : [])
    ];

    const synthesizedResponsibilities = [
        ...db.skillRoadmap.month1.activities.slice(0, 1),
        ...db.skillRoadmap.month2.activities.slice(0, 1),
        ...db.skillRoadmap.month3.activities.slice(0, 1),
        "Continuous professional development"
    ];

    return {
        id: db.id,
        title: db.title,
        short_explanation: db.overview,
        career_details: {
            description: db.overview,
            salary_range: `${db.salary.entry} - ${db.salary.experienced}`,
            market_demand: db.demandLevel as 'High' | 'Medium' | 'Low',
            demand_explanation: `There is a ${db.demandLevel} demand for ${db.title}s due to increasing needs in the ${db.category} sector across Sierra Leone.`,
            responsibilities: synthesizedResponsibilities,
            work_environment: "Office or Field based",
            career_levels: ["Entry Level", "Mid-Level Professional", "Senior Specialist", "Managerial"],
            required_tools: db.entryRequirements.technicalSkills || ["Basic Industry Tools"],
            certifications: [db.entryRequirements.certification || "Professional License"],
            skill_gap_analysis: "Most local candidates lack hands-on practical experience and soft skills like professional communication.",
            market_reality: "Competition is tough in Freetown, but provincial cities often have vacancies that go unfilled for months."
        },
        learning_resources: {
            free: ["Coursera (Audit)", "YouTube"],
            paid: ["Udemy", "LinkedIn Learning"],
            local: ["Local University", "Vocational Center"]
        },
        why_this_career: {
            reason: `The ${db.title} role is critical for the ${db.category} sector in Sierra Leone.`,
            demand_locations: ["Freetown", "Bo", "Kenema", "Makeni", "Mining Districts"],
            growth_outlook: "Stable and growing with national development."
        },
        entry_requirements: requirements,
        phases: [
            {
                id: "phase_1",
                name: db.skillRoadmap.month1.focus,
                duration: "Month 1",
                goal: "Foundation and Basics",
                what_you_will_learn: db.skillRoadmap.month1.skills,
                what_you_must_do: db.skillRoadmap.month1.activities.map((task, i) => ({ id: `p1_t${i}`, task }))
            },
            {
                id: "phase_2",
                name: db.skillRoadmap.month2.focus,
                duration: "Month 2",
                goal: "Practical Application",
                what_you_will_learn: db.skillRoadmap.month2.skills,
                what_you_must_do: db.skillRoadmap.month2.activities.map((task, i) => ({ id: `p2_t${i}`, task }))
            },
            {
                id: "phase_3",
                name: db.skillRoadmap.month3.focus,
                duration: "Month 3",
                goal: "Professional Entry",
                what_you_will_learn: db.skillRoadmap.month3.skills,
                what_you_must_do: db.skillRoadmap.month3.activities.map((task, i) => ({ id: `p3_t${i}`, task }))
            }
        ],
        universities: db.studyPathways.map(path => ({
            name: path.institution,
            focus: path.program,
            requirements: `${path.duration} (${path.type})`
        })),
        mentors: [
            {
                name: db.mentorship.type,
                role: "Senior Professional",
                help_with: "Career Guidance & Networking",
                contact: db.mentorship.source
            }
        ],
        opportunities: db.careerPath.entryTitles,
        next_steps: db.immediateActions
    };
}

// AI Generation Schema
const detailedRoadmapSchema = z.object({
    title: z.string(),
    overview: z.string(),
    salary_range: z.string(),
    market_demand: z.enum(['High', 'Medium', 'Low']),
    demand_explanation: z.string(),
    responsibilities: z.array(z.string()),
    work_environment: z.string(),
    career_levels: z.array(z.string()),
    required_tools: z.array(z.string()),
    certifications: z.array(z.string()),
    skill_gap_analysis: z.string(),
    market_reality: z.string(),
    learning_resources: z.object({
        free: z.array(z.string()),
        paid: z.array(z.string()),
        local: z.array(z.string())
    }),
    why_this_career: z.object({
        reason: z.string(),
        locations: z.array(z.string()),
        growth: z.string()
    }),
    entry_reqs: z.array(z.string()),
    phases: z.array(z.object({
        name: z.string(),
        duration: z.string(),
        goal: z.string(),
        skills: z.array(z.string()),
        tasks: z.array(z.string())
    })),
    study_locations: z.array(z.object({ name: z.string(), focus: z.string(), requirements: z.string().optional() })),
    mentor_roles: z.array(z.object({ name: z.string(), role: z.string(), specific_help: z.string() })),
    job_titles: z.array(z.string()),
    immediate_actions: z.array(z.string())
});

// Helper: Map AI Response to Our Format
function mapAIResponseToFormat(aiData: any, careerTitle: string): DetailedRoadmapResponse {
    return {
        id: `ai_${Date.now()}`,
        title: aiData.title || careerTitle,
        short_explanation: aiData.overview || `Personalized roadmap for ${careerTitle}`,
        career_details: {
            description: aiData.overview,
            salary_range: aiData.salary_range || "Varies",
            market_demand: aiData.market_demand || "Medium",
            demand_explanation: aiData.demand_explanation || "Growing demand in the current market.",
            responsibilities: aiData.responsibilities || [],
            work_environment: aiData.work_environment || "Various settings",
            career_levels: aiData.career_levels || ["Junior", "Senior"],
            required_tools: aiData.required_tools || [],
            certifications: aiData.certifications || [],
            skill_gap_analysis: aiData.skill_gap_analysis || "General lack of technical expertise.",
            market_reality: aiData.market_reality || "Tough but rewarding for dedicated individuals."
        },
        learning_resources: aiData.learning_resources || { free: [], paid: [], local: [] },
        why_this_career: {
            reason: aiData.why_this_career?.reason || "Great opportunity",
            demand_locations: aiData.why_this_career?.locations || ["Freetown"],
            growth_outlook: aiData.why_this_career?.growth || "Steady"
        },
        entry_requirements: aiData.entry_reqs || [],
        phases: aiData.phases.map((phase: any, i: number) => ({
            id: `ai_phase_${i + 1}`,
            name: phase.name,
            duration: phase.duration,
            goal: phase.goal,
            what_you_will_learn: phase.skills || [],
            what_you_must_do: phase.tasks ? phase.tasks.map((task: string, j: number) => ({
                id: `ai_p${i + 1}_t${j}`,
                task
            })) : []
        })),
        universities: aiData.study_locations || [],
        mentors: aiData.mentor_roles.map((m: any) => ({
            name: m.name,
            role: m.role,
            help_with: m.specific_help,
            contact: "Professional Networks"
        })),
        opportunities: aiData.job_titles || [],
        next_steps: aiData.immediate_actions || []
    };
}

// Refined System Prompt Generator
function createRefinedSystemPrompt(educationLevel: string, location: string, skillLevel: string, userType: string): string {
    return `You are CareerPilot's Expert AI Career Architect for Sierra Leone.

MISSION: Generate a "career-ready" roadmap that removes all ambiguity and tells the user exactly what is required to succeed in their selected profession.

USER CONTEXT: ${userType} | Ed: ${educationLevel} | Loc: ${location} | Skill: ${skillLevel}

CORE GUIDELINES:
1. **Remove Ambiguity**: Be extremely specific. Instead of "Get a degree", say "Enroll in B.Sc Computer Science at IPAM or FBC".
2. **Visible Demand**: Select a demand indicator (High, Medium, Low) and provide a 1-sentence explanation based on the Salone market.
3. **Skill Gap Analysis**: Explain what the user is currently missing based on their ${skillLevel} level and what employers in Salone actually look for.
4. **Learning Pathway**: Provide a step-by-step pathway using the "Phases" structure.
5. **Local Reality**: State the "Local Job Market Reality"—be honest about how hard it is to get hired and where the real opportunities are.
6. **Required Assets**: List required education, specific tools (Software or Hardware), and must-have certifications.
7. **Mentors**: Suggest 2-3 specific "Mentor Roles" or types of professionals they should connect with in Freetown or online.

DATA FORMATTING:
- Salary Estimate: Use "SLE {amount} (approx {USD})/month"
- Local Resources: Must include real Sierra Leonean institutions and vocational centers.
- Phases: Actionable tasks like "Join the Orange Digital Center" or "Visit the Ministry of Labor".

OUTPUT JSON ONLY.`;
}
