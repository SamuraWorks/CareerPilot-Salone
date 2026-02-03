import { SIERRA_LEONE_CAREERS, INSTITUTIONS } from '../career-data';
import { generateObject } from 'ai';
import { aiModel } from './config';
import { CareerGuidanceResponseSchema } from './schemas';

export async function generateCareerGuidance(userProfile: string) {
    try {
        const groundedList = SIERRA_LEONE_CAREERS.map(c => c.title).join(", ");
        const groundedInstitutions = INSTITUTIONS.map(i => `${i.name} (${i.specializations.join(", ")})`).join("; ");

        const { object } = await generateObject({
            model: aiModel,
            schema: CareerGuidanceResponseSchema,
            prompt: `
        ROLE: Distributed Career Intelligence System (Executive Reasoning Layer)
        MISSION: Maximize the user's probability of real career success in Sierra Leone.
        
        KNOWLEDGE BASE (CAREERS):
        Prioritize matching: ${groundedList}
        
        INSTITUTION & SIGNAL MAPPING:
        ${groundedInstitutions}
        
        NON-NEGOTIABLE OPERATING RULES (RADICAL REALITY):
        1. **TRUTH > PREFERENCE**: If the user's goal is unrealistic (e.g. Doctor without science background), set verdict to 'Unrealistic' and suggest feasible pivots.
        2. **MAX 3 CAREERS**: You MUST provide strictly 3 career options. No more, no less.
        3. **LINKING LOGIC**: For EACH career, you must verify and map: Job -> Roadmap -> Education (Local) -> Mentor.
        4. **PRECISION PROTOCOL**: Answer EXACTLY what the user asks for. 
        5. **DISTRIBUTED EVIDENCE**: Base advice on Sierra Leone market demand.
        6. **PROOF-CENTRIC**: Progress is building/shipping.
        7. **TERMINAL ACTION**: Provide 3 concrete actions for the next 48 hours.
        
        USER PROFILE:
        ${userProfile}
      `,
        });
        return object;
    } catch (error) {
        console.error("AI Generation Error:", error);
        throw new Error("Failed to generate career guidance");
    }
}
