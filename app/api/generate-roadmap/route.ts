import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { getRoadmap, searchRoadmaps, RoadmapTemplate } from '@/lib/roadmap-database';
import { SIERRA_LEONE_CAREERS } from '@/lib/career-data';

// Initialize Google AI (Optional: reserved for enhancements if needed later)
const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
});

// Use Edge Runtime
export const runtime = 'edge';

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

    // Find matching career for grounding
    const groundedCareer = SIERRA_LEONE_CAREERS.find(c =>
        c.id === trimmedCareer ||
        c.title.toLowerCase() === trimmedCareer.toLowerCase()
    );

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
                userType || "student",
                groundedCareer
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
        what_it_actually_is: z.string(),
        demand_level: z.enum(['High', 'Medium', 'Low']),
        automation_risk: z.enum(['Low', 'Medium', 'High']),
        saturation_score: z.number().min(1).max(10),
    }),
    suitability: z.object({
        good_fit: z.array(z.string()),
        bad_fit: z.array(z.string())
    }),
    hard_requirements: z.object({
        education: z.string(),
        core_skills: z.array(z.string()),
        supporting_skills: z.array(z.string()),
        tools: z.array(z.string()),
        certifications: z.array(z.string())
    }),
    reality_check: z.object({
        why_fail: z.string(),
        common_traps: z.string(),
        noise_filter: z.string()
    }),
    resources: z.object({
        online_free: z.array(z.string()),
        online_paid: z.array(z.string())
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
            skills_unlocked: z.array(z.string()),
            tasks: z.array(z.string()),
            proof_requirement: z.string()
        }))
    }),
    universities: z.array(z.object({
        name: z.string(),
        type: z.string(),
        value_add: z.string()
    })),
    mentors: z.array(z.object({
        profile: z.string(),
        approach_strategy: z.string(),
        key_advice: z.string()
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
        status: z.string(), // e.g. "STRONGLY RECOMMENDED"
        justification: z.string(),
        immediate_action: z.string()
    }),
    salary_range: z.string(),
});

// Helper: Map AI Response to Our Format
function mapAIResponseToFormat(aiData: any, careerTitle: string): DetailedRoadmapResponse {
    return {
        id: `ai_intel_${Date.now()}`,
        title: aiData.career_snapshot.name || careerTitle,
        short_explanation: aiData.career_snapshot.what_it_actually_is,
        career_details: {
            description: `VERDICT: ${aiData.verdict.status}\n\nINTEL: ${aiData.career_snapshot.what_it_actually_is}\n\nREALITY CHECK: ${aiData.reality_check.why_fail}`,
            salary_range: aiData.salary_range,
            market_demand: aiData.career_snapshot.demand_level,
            demand_explanation: `SATURATION: ${aiData.career_snapshot.saturation_score}/10. ${aiData.verdict.justification}. NOISE FILTER: ${aiData.reality_check.noise_filter}`,
            responsibilities: aiData.pathway_plan.phases.flatMap((p: any) => p.tasks) || [],
            work_environment: "Variable",
            career_levels: aiData.market_entry.entry_roles,
            required_tools: aiData.hard_requirements.tools,
            certifications: aiData.hard_requirements.certifications,
            skill_gap_analysis: `TRAPS TO AVOID: ${aiData.reality_check.common_traps}`,
            market_reality: aiData.verdict.justification
        },
        learning_resources: {
            free: aiData.resources.online_free,
            paid: aiData.resources.online_paid,
            local: aiData.universities.map((u: any) => u.name)
        },
        why_this_career: {
            reason: aiData.verdict.justification,
            demand_locations: ["Sierra Leone"],
            growth_outlook: `Automation Risk: ${aiData.career_snapshot.automation_risk}`
        },
        entry_requirements: [
            aiData.hard_requirements.education,
            ...aiData.hard_requirements.core_skills
        ],
        phases: aiData.pathway_plan.phases.map((phase: any, i: number) => ({
            id: `ai_p${i + 1}`,
            name: phase.name,
            duration: phase.duration,
            goal: phase.goal,
            what_you_will_learn: phase.skills_unlocked,
            what_you_must_do: [
                ...phase.tasks.map((task: string, j: number) => ({
                    id: `ai_p${i + 1}_t${j}`,
                    task
                })),
                {
                    id: `ai_p${i + 1}_proof`,
                    task: `🏆 PROOF REQUIREMENT: ${phase.proof_requirement}`
                }
            ]
        })),
        universities: aiData.universities.map((u: any) => ({
            name: u.name,
            focus: u.type,
            requirements: u.value_add
        })),
        mentors: aiData.mentors.map((m: any) => ({
            name: "Industry Specialist",
            role: m.profile,
            help_with: m.key_advice,
            contact: m.approach_strategy
        })),
        opportunities: aiData.market_entry.entry_roles,
        next_steps: [aiData.verdict.immediate_action]
    };
}

// Refined System Prompt Generator
function createRefinedSystemPrompt(educationLevel: string, location: string, skillLevel: string, userType: string, groundingCareer?: any): string {
    const groundingContext = groundingCareer ? `
GROUNDING DATA (Source of Truth):
- Title: ${groundingCareer.title}
- Industry: ${groundingCareer.industry}
- Core Description: ${groundingCareer.description}
- Salary Baseline: ${groundingCareer.salaryRange}
- Required Skills: ${groundingCareer.requiredSkills.join(", ")}
- Local Institutions: ${groundingCareer.localInstitutions.join(", ")}
- Growth Potential: ${groundingCareer.growthPotential}
` : "";

    return `🎯 CAREER INTELLIGENCE BLUEPRINT PROMPT (SYSTEM V2.0)
(Distributed Analysis | Truth over Preference | Execution Hub)

ROLE: You are the core Reasoning Layer of a distributed career intelligence system. You don't just "generate steps"—you produce a Decision Verdict.

USER CONTEXT: ${userType} | Ed: ${educationLevel} | Loc: ${location} | Skill: ${skillLevel}
${groundingContext}

CORE OPERATING RULES:
1. THE GLOBAL MISSION: Reduce wasted years and dead-end degrees. If a career is oversaturated or a "dead end" in the current Salone economy, your Verdict must reflect this.
2. DYNAMIC SCORING: Evaluate the target career based on: Demand Trend, Entry Barrier, Automation Risk, and Saturation Level.
3. TRUTH OVER PREFERENCE: Do not tell users what they want to hear. If their profile makes them a bad fit for this career, say so in the "Reality Check".
4. EDUCATION VS EMPLOYABILITY: Explicitly differentiate between degrees that signal competence (e.g., FBC Engineering) and certificates that carry no weight. 
5. PROOF CHECKPOINTS: Every phase of the roadmap MUST have a "Proof Requirement" (e.g., "Build a working inventory system", "Complete 20 hours of clinical shadowing"). Watching videos is NOT progress.

OUTPUT STRUCTURE (STRICT JSON)
1. CAREER SNAPSHOT
   - name, what_it_actually_is, demand_level, automation_risk, saturation_score (1-10)

2. VERDICT & SUITABILITY
   - verdict (One clear, decisive sentence), good_fit, bad_fit (Personality/Logistics/Financials)

3. HARD REQUIREMENTS
   - education (degree vs non-degree paths), core_skills, tools, certifications (Mark as 'Essential' or 'Status Only')

4. REALITY CHECK
   - why_fail (The ugly truth), market_traps (Scams/Misinfo), noise_filter (Ignoring fake hot skills)

5. RESOURCES
   - online_free (Coursera/edX SPECIFIC courses), local_verified (Njala, FBC, IPAM, etc.)

6. PATHWAY PLAN (90 Days - 3 Phases)
   - phase: [name, duration, goal, skills_unlocked[], tasks[], PROOF_REQUIREMENT (Must be tangible)]

7. MENTORING PROTOCOL
   - [profile, approach_strategy (Specific script), insider_tip]

8. RISK & FAILURE TRIGGERS
   - [List why people specifically fail in this path in Salone]

9. IMMEDIATE ACTION (48-Hour Deadline)

10. SALARY REALITY (SLE)

Generate ONLY VALID JSON. Maximize detail density. If the career is weak, downgrade the recommendation level.`;
}
