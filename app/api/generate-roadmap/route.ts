import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { getRoadmap, searchRoadmaps, RoadmapTemplate } from '@/lib/roadmap-database';
import { SIERRA_LEONE_CAREERS } from '@/lib/career-data';
import { MOCK_MENTORS } from '@/lib/mentors';
import { MOCK_UNIVERSITIES } from '@/lib/db';

// Initialize Google AI (Optional: reserved for enhancements if needed later)
const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
});

// Use Edge Runtime


// We map our DB structure to the Frontend's expected Schema
interface DetailedRoadmapResponse {
    id: string;
    title: string;
    short_explanation: string;
    career_details: {
        description: string;
        salary_range: string;
        market_demand: 'High' | 'Medium' | 'Low';
        demand_explanation: string;
        responsibilities: string[];
        work_environment: string;
        career_levels: string[];
        required_tools: string[];
        certifications: string[];
        skill_gap_analysis: string;
        market_reality: string;
        image_url?: string;
    };
    verdict: {
        status: string;
        justification: string;
        immediate_action: string;
    };
    reality_check: {
        why_fail: string;
        common_traps: string;
        noise_filter: string;
    };
    market_entry: {
        entry_roles: string[];
        employer_needs: string;
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
        weekly_rhythm: string;
        skills_unlocked: string[];
        proof_requirement: string;
        what_you_must_do: { id: string; task: string; completed?: boolean }[];
    }[];
    universities: {
        name: string;
        focus: string;
        requirements: string;
        image_url?: string;
    }[];
    mentors: {
        name: string;
        role: string;
        help_with: string;
        contact: string;
        image_url?: string;
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
            console.log(`[ROADMAP] Generating personalized roadmap for: ${trimmedCareer}`);

            const systemPrompt = createRefinedSystemPrompt(
                educationLevel || "secondary",
                location || "Freetown",
                skillLevel || "beginner",
                userType || "student",
                groundedCareer
            );

            // Attempt with 2.0 Flash Exp first (high quality)
            const { object } = await generateObject({
                model: google('gemini-1.5-flash'), // Using 1.5-flash for more stable production stability than experimental
                schema: detailedRoadmapSchema as any,
                system: systemPrompt,
                prompt: `Generate a detailed All-in-One career roadmap for: ${trimmedCareer} in Sierra Leone.
User Context: ${userType} with ${educationLevel} education in ${location}.`,
            });

            if (object) {
                const formattedRoadmap = mapAIResponseToFormat(object, trimmedCareer);
                return new Response(JSON.stringify(formattedRoadmap), { status: 200 });
            }

        } catch (aiError) {
            console.error('[ROADMAP] AI generation failed:', aiError);
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

    // No match found - ULTIMATE FALLBACK (Never show failed)
    console.log(`[ROADMAP] No match for "${trimmedCareer}", using base template fallback.`);

    // Create a base template on the fly for the requested career
    const baseTemplate: RoadmapTemplate = {
        id: `fallback_${Date.now()}`,
        category: 'General',
        title: trimmedCareer,
        keywords: [trimmedCareer.toLowerCase()],
        image: '/images/sections/careers/technology.png',
        overview: `A professional pathway for ${trimmedCareer} in the Sierra Leonean market. This is a preliminary roadmap while our verified database is being updated.`,
        demandLevel: 'Medium',
        entryRequirements: {
            education: 'Relevant Degree or Vocational Certificate',
            subjects: ['English', 'Mathematics'],
            technicalSkills: ['Computer Literacy', 'Communication']
        },
        studyPathways: [
            { institution: 'IPAM / FBC / UNIMAK', program: `Related to ${trimmedCareer}`, duration: '3-4 Years', location: 'Freetown/Regional', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Fundamentals',
                skills: ['Core Concepts', 'Basic Tools'],
                activities: ['Research career requirements', 'Identify local professional groups']
            },
            month2: {
                focus: 'Skill Building',
                skills: ['Technical Proficiency', 'Practical Application'],
                activities: ['Take online introductory courses', 'Build a small project or volunteer']
            },
            month3: {
                focus: 'Market Entry',
                skills: ['CV Preparation', 'Interviewing'],
                activities: ['Create a professional profile', 'Apply for entry-level internships']
            }
        },
        careerPath: {
            entryTitles: [`Junior ${trimmedCareer}`, 'Assistant'],
            employers: ['Local Private Sector', 'NGOs', 'Government Ministries'],
            workspace: 'Office or Field based'
        },
        salary: {
            entry: 'SLE 2,500 - 4,500',
            experienced: 'SLE 6,000 - 12,000',
            note: 'Varies by specialization and employer'
        },
        mentorship: {
            type: 'Senior Professional',
            source: 'LinkedIn (Sierra Leone) / Industry Associations'
        },
        immediateActions: [
            'Update your CV with relevant skills today.',
            'Connect with 3 professionals in this field on LinkedIn.',
            'Set up a daily learning routine of at least 1 hour.'
        ]
    };

    const formattedRoadmap = mapDatabaseToResponse(baseTemplate);
    return new Response(JSON.stringify(formattedRoadmap), { status: 200 });
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
            market_reality: "Competition is tough in Freetown, but provincial cities often have vacancies that go unfilled for months.",
            image_url: SIERRA_LEONE_CAREERS.find(c => c.id === db.id || c.title.toLowerCase() === db.title.toLowerCase())?.image || "/images/sections/careers/software-developer.png"
        },
        verdict: {
            status: "RECOMMENDED",
            justification: `The ${db.title} role is critical for the ${db.category} sector in Sierra Leone.`,
            immediate_action: db.immediateActions[0] || "Update your CV with relevant skills."
        },
        reality_check: {
            why_fail: "Many candidates fail due to lack of practical application beyond theoretical knowledge.",
            common_traps: "Avoid expensive certifications that aren't recognized by local employers.",
            noise_filter: "Focus on core competence rather than every new software tool."
        },
        market_entry: {
            entry_roles: db.careerPath.entryTitles,
            employer_needs: "Employers look for reliability, technical foundation, and local market understanding."
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
                weekly_rhythm: "10-15 hours per week",
                skills_unlocked: db.skillRoadmap.month1.skills,
                proof_requirement: "Complete foundational assessment",
                what_you_must_do: db.skillRoadmap.month1.activities.map((task, i) => ({ id: `p1_t${i}`, task }))
            },
            {
                id: "phase_2",
                name: db.skillRoadmap.month2.focus,
                duration: "Month 2",
                goal: "Practical Application",
                weekly_rhythm: "15-20 hours per week",
                skills_unlocked: db.skillRoadmap.month2.skills,
                proof_requirement: "Deliver first mini-project",
                what_you_must_do: db.skillRoadmap.month2.activities.map((task, i) => ({ id: `p2_t${i}`, task }))
            },
            {
                id: "phase_3",
                name: db.skillRoadmap.month3.focus,
                duration: "Month 3",
                goal: "Professional Entry",
                weekly_rhythm: "20+ hours per week",
                skills_unlocked: db.skillRoadmap.month3.skills,
                proof_requirement: "Professional portfolio review",
                what_you_must_do: db.skillRoadmap.month3.activities.map((task, i) => ({ id: `p3_t${i}`, task }))
            }
        ],
        universities: db.studyPathways.map(path => {
            const uni = MOCK_UNIVERSITIES.find(u => u.name.includes(path.institution) || path.institution.includes(u.name));
            return {
                name: path.institution,
                focus: path.program,
                requirements: `${path.duration} (${path.type})`,
                image_url: uni?.image_url || "/images/sections/universities/campus.png"
            };
        }),
        mentors: [
            {
                name: db.mentorship.type,
                role: "Senior Professional",
                help_with: "Career Guidance & Networking",
                contact: db.mentorship.source,
                image_url: "/images/sections/mentors/salima_bah.jpg" // Valid fallback for static DB lookups
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
            weekly_rhythm: z.string().describe("Typical weekly commitment/schedule (e.g. 10 hours/week, 2 hours every evening)"),
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
    recommended_mentor_id: z.string().describe("The 'id' of the most suitable mentor from the provided GROUNDING MENTORS list"),
    recommended_university_ids: z.array(z.string()).describe("The 'ids' of suitable institutions from the GROUNDING UNIVERSITIES list")
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
            skill_gap_analysis: aiData.qualification_check.status,
            market_reality: aiData.verdict.justification,
            image_url: SIERRA_LEONE_CAREERS.find(c => c.title.toLowerCase() === careerTitle.toLowerCase() || c.id === careerTitle.toLowerCase())?.image || "/images/sections/careers/software-developer.png"
        },
        verdict: {
            status: aiData.verdict.status,
            justification: aiData.verdict.justification,
            immediate_action: aiData.verdict.immediate_action
        },
        reality_check: {
            why_fail: aiData.reality_check.why_fail,
            common_traps: aiData.reality_check.common_traps,
            noise_filter: aiData.reality_check.noise_filter
        },
        market_entry: {
            entry_roles: aiData.market_entry.entry_roles,
            employer_needs: aiData.market_entry.employer_needs
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
            weekly_rhythm: phase.weekly_rhythm,
            skills_unlocked: phase.skills_unlocked,
            proof_requirement: phase.proof_requirement,
            what_you_must_do: phase.tasks.map((task: string, j: number) => ({
                id: `ai_p${i + 1}_t${j}`,
                task
            }))
        })),
        universities: (aiData.recommended_university_ids || []).map((id: string) => {
            const uni = MOCK_UNIVERSITIES.find(u => u.id === id);
            return uni ? {
                name: uni.name,
                focus: uni.popular_courses.join(", "),
                requirements: uni.badges.join(" | "),
                image_url: uni.image_url || uni.logo_url || "/images/sections/universities/campus.png"
            } : null;
        }).filter(Boolean),
        mentors: (() => {
            const mentor = MOCK_MENTORS.find(m => m.id === aiData.recommended_mentor_id);
            return mentor ? [{
                name: mentor.name,
                role: mentor.role,
                help_with: mentor.support_types.join(", "),
                contact: "Click to connect in Mentorship tab",
                image_url: mentor.image_url || "/images/sections/mentors/salima_bah.jpg"
            }] : [];
        })(),
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

    const mentorsContext = `
GROUNDING MENTORS (Choose the best fit ID):
${MOCK_MENTORS.map(m => `- ID: ${m.id} | Name: ${m.name} | Role: ${m.role} | Expertise: ${m.support_types.join(", ")}`).join("\n")}
`;

    const universitiesContext = `
GROUNDING UNIVERSITIES (Choose best fit IDs):
${MOCK_UNIVERSITIES.map(u => `- ID: ${u.id} | Name: ${u.name} | Focus: ${u.popular_courses.join(", ")} | Location: ${u.location}`).join("\n")}
`;

    return `You are the AI career guidance assistant for CareerPilot Salone. 🇸🇱
Your only purpose is to guide users toward the right career and help them make real progress.

### YOUR PERSONALITY
- Speak naturally and honestly, like a real human career guide.
- No fixed or scripted responses. Use a supportive but direct "coach" tone.
- Answer questions directly.

### USER CONTEXT
- User: ${userType}
- Education: ${educationLevel}
- Location: ${location}
- Skill Level: ${skillLevel}

${groundingContext}
${mentorsContext}
${universitiesContext}

### THE MANDATORY CONNECTION RULE
Every response MUST connect the career to:
1. A clear Roadmap (90-day execution).
2. Relevant Universities (from the IDs provided).
3. Relevant Mentors (from the IDs provided).

### ROADMAP RULES
- Roadmaps must be step-by-step and realistic for someone in Sierra Leone.
- Each step must have visual indicators (emojis) and be trackable.
- Differentiate between Freetown and other regions (Bo, Makeni, etc.).

### OUTPUT STRUCTURE
Generate a JSON object following the schema provided. 
- Ensure "verdict" is honest. If the user isn't ready for this career, say so and provide gaps.
- Ensure "immediate_action" is a physical or critical action (e.g. "Visit the registrar", "Buy a data bundle").
- "salary_range" should be in New Leone (SLE).

Generate ONLY VALID JSON. No conversational fluff outside the JSON.`;
}

