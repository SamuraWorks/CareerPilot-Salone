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
    career_snapshot: z.object({
        name: z.string(),
        what_people_think: z.string(),
        what_it_actually_is: z.string(),
        location_type: z.string(),
        demand_level: z.enum(['High', 'Medium', 'Low']),
        automation_risk: z.enum(['Low', 'Medium', 'High']),
    }),
    suitability: z.object({
        good_fit: z.array(z.string()),
        bad_fit: z.array(z.string())
    }),
    hard_requirements: z.object({
        education: z.string(),
        core_skills: z.array(z.string()),
        supporting_skills: z.array(z.string()),
        tools: z.array(z.string())
    }),
    reality_check: z.object({
        why_fail: z.string(),
        common_traps: z.string()
    }),
    qualification_check: z.object({
        status: z.enum(['Qualified', 'Not yet qualified']),
        gaps: z.array(z.string())
    }),
    pathway_plan: z.object({
        objective: z.string(),
        phases: z.array(z.object({
            name: z.string(),
            duration: z.string(),
            goal: z.string(),
            tasks: z.array(z.string())
        }))
    }),
    universities: z.array(z.object({
        name: z.string(),
        type: z.string(),
        value_add: z.string()
    })),
    mentors: z.array(z.object({
        profile: z.string(),
        approach_strategy: z.string()
    })),
    market_entry: z.object({
        entry_roles: z.array(z.string()),
        employer_needs: z.string()
    }),
    trade_offs: z.object({
        gains: z.string(),
        sacrifices: z.string(),
        delays: z.string()
    }),
    verdict: z.object({
        status: z.enum(['Strongly Recommended', 'Conditionally Recommended', 'Not Recommended']),
        justification: z.string()
    }),
    immediate_action: z.string(),
    salary_range: z.string(), // Kept for UI compatibility
});

// Helper: Map AI Response to Our Format
function mapAIResponseToFormat(aiData: any, careerTitle: string): DetailedRoadmapResponse {
    return {
        id: `ai_${Date.now()}`,
        title: aiData.career_snapshot.name || careerTitle,
        short_explanation: aiData.career_snapshot.what_it_actually_is,
        career_details: {
            description: `REALITY CHECK: ${aiData.reality_check.why_fail}\n\nWHAT IT IS: ${aiData.career_snapshot.what_it_actually_is}`,
            salary_range: aiData.salary_range,
            market_demand: aiData.career_snapshot.demand_level,
            demand_explanation: `Verdict: ${aiData.verdict.status}. ${aiData.verdict.justification}`,
            responsibilities: aiData.pathway_plan.phases[0]?.tasks || [],
            work_environment: aiData.career_snapshot.location_type,
            career_levels: aiData.market_entry.entry_roles,
            required_tools: aiData.hard_requirements.tools,
            certifications: [],
            skill_gap_analysis: aiData.qualification_check.gaps.join(", ") || "No major gaps identified",
            market_reality: aiData.reality_check.common_traps
        },
        learning_resources: {
            free: [],
            paid: [],
            local: aiData.universities.filter((u: any) => u.type.toLowerCase().includes('local')).map((u: any) => u.name)
        },
        why_this_career: {
            reason: aiData.trade_offs.gains,
            demand_locations: ["Sierra Leone"],
            growth_outlook: `Automation Risk: ${aiData.career_snapshot.automation_risk}`
        },
        entry_requirements: [
            aiData.hard_requirements.education,
            ...aiData.hard_requirements.core_skills
        ],
        phases: aiData.pathway_plan.phases.map((phase: any, i: number) => ({
            id: `ai_phase_${i + 1}`,
            name: phase.name,
            duration: phase.duration,
            goal: phase.goal,
            what_you_will_learn: [],
            what_you_must_do: phase.tasks.map((task: string, j: number) => ({
                id: `ai_p${i + 1}_t${j}`,
                task
            }))
        })),
        universities: aiData.universities.map((u: any) => ({
            name: u.name,
            focus: u.type,
            requirements: u.value_add
        })),
        mentors: aiData.mentors.map((m: any) => ({
            name: "Industry Pro",
            role: m.profile,
            help_with: "Career Strategy",
            contact: m.approach_strategy
        })),
        opportunities: aiData.market_entry.entry_roles,
        next_steps: [aiData.immediate_action]
    };
}

// Refined System Prompt Generator
function createRefinedSystemPrompt(educationLevel: string, location: string, skillLevel: string, userType: string): string {
    return `🎯 CAREER INTELLIGENCE BLUEPRINT PROMPT
(Career → Reality → Requirements → Pathways → Proof)

ROLE
You are a Career Intelligence & Decision Engine for Sierra Leone. NOT a counselor.
Your job is to analyze one career at a time and produce a complete, reality-checked intelligence brief.

USER CONTEXT: ${userType} | Ed: ${educationLevel} | Loc: ${location} | Skill: ${skillLevel}

INPUT HANDLING
Analyze the target career based on the user's current status (skills, education, resources) in Sierra Leone.
If missing info, assume standard local constraints (power, internet, funds).

OUTPUT STRUCTURE (STRICT JSON)
1. CAREER SNAPSHOT (REALITY VERSION)
- what_people_think: Common misconception
- what_it_actually_is: Daily work reality
- demand_level: High/Medium/Low (Salone context)
- automation_risk: Low/Medium/High

2. SUITABILITY
- good_fit: List of traits matching this
- bad_fit: List of traits clashing with this

3. HARD REQUIREMENTS
- education: Minimum accepted level in Salone
- core_skills: Must-have skills
- supporting_skills: Useful extras
- tools: Devices/Software/Internet needed

4. REALITY CHECK
- why_fail: Why most beginners quit
- common_traps: Misinformation to avoid

5. QUALIFICATION CHECK
- status: "Qualified" or "Not yet qualified"
- gaps: List missing specific assets

6. PATHWAY PLAN (90 Days)
If Qualified: Objective -> Proof -> Exposure -> Monetization
If Not Qualified: Gap Breakdown -> Catch-Up Path -> Gate Checks
- phases: [Name, Duration, Goal, Tasks[]]

7. UNIVERSITIES & ALTERNATIVES
- Real local (FBC, IPAM, Njala) or credible online only.

8. MENTORS
- Practitioner profiles, not celebrities.
- approach_strategy: How to connect.

9. MARKET ENTRY
- Entry roles and employer needs.

10. TRADE-OFF ANALYSIS
- Gains (Income, Status)
- Sacrifices (Time, Stress)
- Delays (Years to payoff)

11. VERDICT
- "Strongly Recommended", "Conditionally Recommended", or "Not Recommended"
- justification: Short honest reason.

12. IMMEDIATE ACTION
- One unavoidable action for the next 48 hours.

13. SALARY RANGE
- In SLE (New Leones).

Generate ONLY VALID JSON matching the schema.`;
}
