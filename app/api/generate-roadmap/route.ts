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
interface DetailedRoadmapResponse {
    id: string; // Added for unique progress tracking
    title: string;
    short_explanation: string;
    career_details: {
        description: string;
        salary_range: string;
        market_demand: 'High' | 'Medium' | 'Low';
        responsibilities: string[];
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
        what_you_must_do: { id: string; task: string }[];
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
    const { career } = body;

    if (!career || typeof career !== 'string' || career.trim().length === 0) {
        return new Response(JSON.stringify({ error: 'Invalid input', message: 'Career field is required.' }), { status: 400 });
    }

    const trimmedCareer = career.trim();
    console.log(`Searching locked-down database for: ${trimmedCareer}`);

    // 1. LOOKUP IN DATABASE
    const roadmap = getRoadmap(trimmedCareer);

    if (roadmap) {
        console.log(`Match found: ${roadmap.title}`);
        const formattedRoadmap = mapDatabaseToResponse(roadmap);
        return new Response(JSON.stringify(formattedRoadmap), { status: 200 });
    }

    // 2. SEARCH SUGGESTIONS IF NO EXACT MATCH
    const suggestions = searchRoadmaps(trimmedCareer);
    if (suggestions.length > 0) {
        // Return the first close match
        console.log(`Suggesting close match: ${suggestions[0].title}`);
        const formattedRoadmap = mapDatabaseToResponse(suggestions[0]);
        return new Response(JSON.stringify(formattedRoadmap), { status: 200 });
    }

    // 3. NO MATCH FOUND - STRICT FAIL (per "Prevent generation of alternative/filler")
    return new Response(JSON.stringify({
        error: 'not_found',
        message: 'This career is not yet in our verified database. Please check back later or try a different title.'
    }), { status: 404 });
}

// Helper: Map DB Template to Frontend Response
function mapDatabaseToResponse(db: RoadmapTemplate): DetailedRoadmapResponse {
    // Construct Entry Requirements List
    const requirements = [
        db.entryRequirements.education,
        ...(db.entryRequirements.subjects ? [`Subjects: ${db.entryRequirements.subjects.join(', ')}`] : []),
        ...(db.entryRequirements.technicalSkills ? [`Skills: ${db.entryRequirements.technicalSkills.join(', ')}`] : []),
        ...(db.entryRequirements.certification ? [`Cert: ${db.entryRequirements.certification}`] : [])
    ];

    // Synthesize Responsibilities from Skills/Activities if not explicit
    // We'll take a mix of skills and activities to represent "Responsibilities" for the UI summary
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
            market_demand: db.demandLevel,
            responsibilities: synthesizedResponsibilities
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
