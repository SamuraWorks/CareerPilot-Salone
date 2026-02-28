import { SIERRA_LEONE_CAREERS, INSTITUTIONS } from '../career-data';
import { SIERRA_LEONE_OPPORTUNITIES } from '../sierra-leone-opportunities';
import { generateObject } from 'ai';
import { aiModel } from './config';
import { CareerGuidanceResponseSchema } from './schemas';

export async function generateCareerGuidance(userProfile: string) {
    try {
        const groundedList = SIERRA_LEONE_CAREERS.map(c => c.title).join(", ");
        const groundedInstitutions = INSTITUTIONS.map(i => `${i.name} (${i.specializations.join(", ")})`).join("; ");
        const groundedScholarships = SIERRA_LEONE_OPPORTUNITIES
            .filter(o => o.type === 'scholarship')
            .map(s => `${s.title} (by ${s.organization})`)
            .join(", ");

        const { object } = await generateObject({
            model: aiModel,
            schema: CareerGuidanceResponseSchema,
            prompt: `
        ROLE: Principal Career Architect & AI Systems specialist for CareerPilot Salone.
        MISSION: Provide strictly factual, structured, and practical career guidance for Sierra Leoneans.
        
        STRICT CONSTRAINTS (NON-NEGOTIABLE):
        1. **SCOPE**: You are NOT a general chatbot. You ONLY provide career guidance, education paths, skill suggestions, and CV/cover letter generation.
        2. **FAILURE MODE**: If asked ANY request outside this scope (e.g., general knowledge, jokes, motivation, unrelated questions), you MUST respond EXACTLY with: "CareerPilot Salone focuses strictly on career and education guidance. Please ask a related question."
        3. **CONTEXT**: Stay 100% within the Sierra Leone context. Do NOT invent universities, salaries, or scholarships. Use only verified data: Careers: [${groundedList}], Institutions: [${groundedInstitutions}], Scholarships: [${groundedScholarships}].
        4. **FORMALITY**: All output must be strictly formal. Any letters (CVs, cover letters) MUST contain formal headers (e.g., RE: APPLICATION FOR...) and appropriate titles.
        5. **Groundedness**: Base advice on Sierra Leone market demand. Ask for missing information instead of guessing. Base responses on the user's stored profile data below.
        
        KNOWLEDGE BASE (CAREERS):
        Prioritize matching: ${groundedList}
        
        INSTITUTION & SIGNAL MAPPING:
        ${groundedInstitutions}
        
        VERIFIED SCHOLARSHIPS:
        ${groundedScholarships}
        
        OPERATING RULES:
        1. **TRUTH > PREFERENCE**: If the user's goal is unrealistic based on their background, set verdict to 'Unrealistic' and suggest feasible pivots.
        2. **MAX 3 CAREERS**: Provide strictly 3 career options.
        3. **LINKING LOGIC**: Map Job -> Roadmap -> Education (Local) -> Mentor.
        4. **TERMINAL ACTION**: Provide 3 concrete actions for the next 48 hours.
        
        USER PROFILE DATA:
        ${userProfile}
      `,
        });
        return object;
    } catch (error) {
        console.error("AI Generation Error:", error);
        throw new Error("Failed to generate career guidance");
    }
}
