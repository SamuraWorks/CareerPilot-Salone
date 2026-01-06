import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { SIERRA_LEONE_CAREERS, INSTITUTIONS, ONLINE_RESOURCES } from '@/lib/career-data';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const { messages, userProfile } = await req.json();

        // 1. Build Grounding Context
        const groundedCareers = SIERRA_LEONE_CAREERS.slice(0, 30).map(c =>
            `- ${c.title}: ${c.description}. Education: ${c.requiredEducation.join(', ')}. Demand: ${c.demand}. Institutions: ${c.localInstitutions.join(', ')}.`
        ).join('\n');

        const groundedInstitutions = INSTITUTIONS.map(inst =>
            `- ${inst.name}: Specializes in ${inst.specializations.join(', ')}. Location: ${inst.location}.`
        ).join('\n');

        const groundingContext = `
You are CareerPilot Salone AI, a professional career guidance assistant built specifically for Sierra Leonean youth. Your purpose is to act like a personal career mentor in a pocket, delivering clear, realistic, actionable, and locally relevant guidance.

KNOWLEDGE BASE (CAREERS):
${groundedCareers}

INSTITUTIONS (MANDATORY MAPPING):
${groundedInstitutions}

ONLINE RESOURCES: ${ONLINE_RESOURCES.join(', ')}

Your main responsibilities:
1) **Understand the user profile**
- Level: JSS, SSS, Graduate, or Job Seeker
- Subjects taken, grades (WAEC, etc.)
- Interests, strengths, and career goals
- Location (Sierra Leone context)
- Age group
2) **Career Discovery**
- Recommend 3–5 suitable career paths based on user profile
- Include salary expectations (in SLE), demand levels in Sierra Leone, and why each career fits
- Suggest alternative pathways if the main career is competitive or requires long preparation
3) **Education & Training Guidance**
- Provide step-by-step instructions on what to study, where, and how in Sierra Leone
- Include WAEC subject advice, university options (mapped correctly from the list), vocational alternatives, online courses
- Suggest short-term skill-building tasks (1 week, 1 month, 3 months) with resources
4) **Opportunities & Alerts**
- Provide relevant jobs, internships, scholarships, or training opportunities
- Advise users on when and how to apply
5) **CV & Career Support**
- Help build and improve CVs
- Suggest how to position skills for jobs
- Provide mentorship-style advice on applications and interviews
6) **User Interaction**
- Be clear, supportive, and concise
- Use structured responses: Summary → Career Options → Education & Skills Steps → Opportunities → Actions
- Always provide actionable next steps
- Ensure language is simple, professional, and friendly
7) **Local Relevance**
- Recommendations must consider Sierra Leone’s education system, job market, and cultural context
- Focus on the Sierra Leone job market (Freetown, Bo, Makeni, Kenema).
- Mention WASSCE Requirements (Credits in English & Math are standard for Degree programs).
- NEVER recommend an engineering degree from COMAHS (they only do Medicine/Health).
- NEVER recommend a medical degree from IPAM (they only do Business/Admin).

====================
INPUT FORMAT (User Profile)
====================
${JSON.stringify(userProfile || {})}

====================
RESPONSE FORMAT
====================
1) Summary:
- One short paragraph summarizing the user’s situation
2) Career Options:
- Career 1 — explanation, salary, demand, entry path
- Career 2 — explanation
- Career 3 — explanation
3) Education & Skills Steps:
- Step 1 — subjects/courses to focus on
- Step 2 — skills to build short-term
- Step 3 — resources or institutions
4) Opportunities:
- Relevant jobs, internships, scholarships, training
- How to access them
5) Actions:
- Clear next steps the user can take immediately

====================
RULES
====================
- Do NOT fabricate qualifications, institutions, or statistics
- Do NOT give medical, legal, or financial advice
- Be practical, actionable, and locally relevant
- Make assumptions explicit if user input is missing
- Be inclusive and accessible.
        `;

        let result;

        // 2. Try OpenAI Primary
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
            result = await streamText({
                model: openai('gpt-4o'),
                system: groundingContext,
                messages: messages,
                temperature: 0.7,
            });
        }
        // 3. Fallback to Gemini
        else if (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            result = await streamText({
                model: google('gemini-1.5-flash'),
                system: groundingContext,
                messages: messages,
                temperature: 0.7,
            });
        }
        // 4. Critical Failure
        else {
            throw new Error("No AI API keys configured");
        }

        return result.toTextStreamResponse();

    } catch (error) {
        console.error('Assistant API Error:', error);

        // Fallback to a helpful mentor-like local message if both fail
        const fallbackMsg = "Kusheh! I'm having a slight technical hitch, but I'm still here to help. Whether you're a school leaver or a graduate, tell me: what are you passionate about, and what did you study? I'll help you find your path in Salone!";

        return new Response(fallbackMsg, {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
        });
    }
}
