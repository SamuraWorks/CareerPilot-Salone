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
    return `🔒 MASTER PROMPT: SIERRA LEONE CAREER ROADMAP ENGINE

SYSTEM ROLE:
You are a Career Roadmap Engine for Sierra Leoneans.
Your job is to generate clear, structured, mistake-free career roadmaps that guide users step-by-step from where they are now to a real, achievable career inside Sierra Leone.

You must:
- Use only realistic, locally applicable information
- Avoid foreign assumptions (no US/UK licensing unless explicitly relevant)
- Use simple, clear English understandable nationwide
- Never overwhelm or confuse the user
- Never show careers, content, or sections the user did not request

🎯 INPUT (FROM USER):
Career of interest: ${career}
Education level: ${educationLevel}
Location: Sierra Leone

🚫 STRICT RULES (NON-NEGOTIABLE):
1. ONLY show the career the user searched for
   ❌ No alternative careers
   ❌ No "you may also like"
   ❌ No extra professions

2. NO AI disclaimers, no marketing language, no apologies

3. NO fake universities, courses, or requirements

4. If data is uncertain, say "Varies by institution in Sierra Leone"

5. Use this exact structure and order

🧱 REQUIRED OUTPUT STRUCTURE:

1️⃣ CAREER HEADER
- Title: ${career}
- Short one-line description of what the career does in Sierra Leone
- Demand Level: Low / Medium / High (Sierra Leone context)

2️⃣ ENTRY REQUIREMENTS (CLEAR & LOCAL)
- Minimum Education Required (WASSCE / Diploma / Degree)
- Core Subjects Needed (exact WASSCE subjects if applicable)
- Other Requirements (age limits, physical fitness, licensing)

3️⃣ WHERE TO STUDY IN SIERRA LEONE (REAL ONLY)
List only existing institutions:
- Fourah Bay College (FBC)
- Njala University
- University of Makeni (UNIMAK)
- IPAM (USL)
- COMAHS (USL)
- Milton Margai University
- Eastern Technical University
- Relevant technical institutes

For each: Institution Name, Qualification Offered, Notes
❗ If the career does not require university, clearly say so.

4️⃣ SKILLS YOU MUST DEVELOP
List practical, job-relevant skills:
- Technical skills
- Field skills
- Computer or tool usage
- Communication skills (if relevant)

5️⃣ 90-DAY ROADMAP (MANDATORY FORMAT)

Phase 1 – Weeks 1–4: Foundation
- What to learn
- What to practice
- What to understand locally

Phase 2 – Weeks 5–8: Practical Exposure
- Hands-on practice
- Local workshops / attachments / volunteering
- Skill application

Phase 3 – Weeks 9–12: Entry Preparation
- CV preparation
- Certification (if any)
- Job application or recruitment preparation

6️⃣ JOB OPPORTUNITIES IN SIERRA LEONE
Where people in this career actually work:
- Government institutions
- Private companies
- NGOs
- Self-employment (if applicable)

7️⃣ STARTING INCOME RANGE (HONEST)
Give a realistic entry-level range in SLE (Sierra Leonean Leones).
Format: "SLE X,XXX - X,XXX/month (entry-level)"
Note: "Income varies by employer and experience in Sierra Leone"

8️⃣ COMMON MISTAKES TO AVOID
List 3–5 realistic mistakes people make in Sierra Leone pursuing this career.

9️⃣ NEXT IMMEDIATE ACTION (ONE STEP)
End with one clear action: "Your next step: _______"

🧠 LANGUAGE & UX RULES:
- Use plain English
- No long paragraphs
- Bullet points only
- Nationwide understanding (not Freetown slang)
- Professional but human tone

✅ SUPPORTED CAREERS (50+):
Software Developer, Data Analyst, ICT Support, Network Admin, Cybersecurity Analyst, UX/UI Designer, Digital Marketer, Graphic Designer, Project Manager, Business Analyst, Accountant, Auditor, Civil Engineer, Mechanical Engineer, Electrical Engineer, Mining Engineer, Agricultural Engineer, Teacher, Trainer, Healthcare Worker, Nurse, Lab Technician, Pharmacy Tech, Public Health Officer, Environmental Scientist, Agripreneur, Supply Chain Coordinator, Logistics Manager, Entrepreneur, Sales Officer, Customer Service Rep, HR Officer, Legal Assistant, Journalist, Content Creator, Translator, Tourism Guide, Hospitality Manager, Chef, Construction Supervisor, Welder, Electrician, Plumber, Carpenter, Auto Mechanic, Machine Operator, Quality Control Inspector, Account Manager, Financial Analyst, Insurance Officer, Risk & Safety Officer, and more.

🛑 FINAL SYSTEM BEHAVIOR:
- One career at a time
- One clean roadmap
- Zero confusion
- Zero hallucination
- Judge-level clarity

Generate the roadmap now for: ${career}`;
}

export async function POST(req: Request) {
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

    try {
        console.log(`Generating clean roadmap for: ${trimmedCareer}`);

        const result = await generateObject({
            model: google('gemini-1.5-flash'),
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
        console.error('Error generating roadmap (Primary):', error);

        // FALLBACK SYSTEM: Attempt to use local static data
        try {
            const { SIERRA_LEONE_CAREERS } = await import("@/lib/career-data");

            // formatting helper
            const formatSalary = (usdStr: string) => {
                // Try to extract only the SLE part or return raw
                const sleMatch = usdStr.match(/SLE [0-9,]+ - [0-9,]+/);
                return sleMatch ? sleMatch[0] : usdStr;
            };

            const fallbackCareer = SIERRA_LEONE_CAREERS.find(c =>
                c.title.toLowerCase().includes(trimmedCareer.toLowerCase()) ||
                trimmedCareer.toLowerCase().includes(c.title.toLowerCase()) ||
                c.keywords.some(k => trimmedCareer.toLowerCase().includes(k))
            );

            if (fallbackCareer) {
                console.log(`Using fallback data for: ${trimmedCareer}`);

                const fallbackRoadmap = {
                    title: fallbackCareer.title,
                    short_explanation: fallbackCareer.description,
                    career_details: {
                        description: fallbackCareer.description,
                        salary_range: formatSalary(fallbackCareer.salaryRange),
                        market_demand: fallbackCareer.demand,
                        responsibilities: [
                            `Master core skills like ${fallbackCareer.requiredSkills.slice(0, 3).join(', ')}`,
                            "Complete relevant projects or internships",
                            "Network with professionals in the " + fallbackCareer.industry
                        ]
                    },
                    why_this_career: {
                        reason: `${fallbackCareer.industry} is a growing key sector in Sierra Leone.`,
                        demand_locations: ["Freetown", "Bo", "Kenema", "Makeni"], // Generic major cities
                        growth_outlook: fallbackCareer.growthPotential
                    },
                    entry_requirements: fallbackCareer.requiredEducation.slice(0, 4),
                    phases: [
                        {
                            name: "Fundamentals",
                            duration: "Weeks 1-4",
                            goal: "Build a strong foundation",
                            what_you_will_learn: fallbackCareer.requiredSkills.slice(0, 3),
                            what_you_must_do: ["Complete introductory course", "Join a local community group", "Find a mentor"]
                        },
                        {
                            name: "Practical Application",
                            duration: "Weeks 5-8",
                            goal: "Apply knowledge to real projects",
                            what_you_will_learn: ["Advanced techniques", "Project management basics", "Industry tools"],
                            what_you_must_do: ["Build a portfolio project", "Apply for internships", "Attend industry workshops"]
                        },
                        {
                            name: "Career Entry",
                            duration: "Weeks 9-12",
                            goal: "Secure a position or advanced training",
                            what_you_will_learn: ["Interview preparation", "CV writing", "Professional networking"],
                            what_you_must_do: ["Submit 5 job applications", "Refine CV and cover letter", "Mock interview practice"]
                        }
                    ],
                    universities: fallbackCareer.localInstitutions.map(inst => ({
                        name: inst,
                        focus: fallbackCareer.industry + " Studies",
                        requirements: "WASSCE with credits in English and Math"
                    })),
                    mentors: [
                        { type: "Senior " + fallbackCareer.title, contact_method: "LinkedIn" },
                        { type: "University Lecturer", contact_method: "Campus Office" }
                    ],
                    opportunities: ["Junior " + fallbackCareer.title, "Internship", "Trainee Program"],
                    next_steps: [
                        "Update your CV",
                        "Enroll in a recommended course",
                        "Join a professional WhatsApp group"
                    ]
                };

                return new Response(JSON.stringify(fallbackRoadmap), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json', 'X-Fallback': 'true' }
                });
            }
        } catch (fallbackError) {
            console.error("Fallback generation failed:", fallbackError);
        }

        return new Response(JSON.stringify({
            error: 'generation_failed',
            message: error.message || 'Unable to generate roadmap.',
            details: error.cause || error.stack
        }), { status: 500 });
    }
}
