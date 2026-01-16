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
        
        NON-NEGOTIABLE OPERATING RULES:
        1. **TRUTH > PREFERENCE**: Reason from constraints (location, power, financial pressure). If a path is unrealistic, refuse it.
        2. **DISTRIBUTED EVIDENCE**: Base advice on distributed signals (market demand, institution validity, employability).
        3. **EDUCATION VS EMPLOYABILITY**: Clearly distinguish between degrees that signal competence vs status.
        4. **PROOF-CENTRIC**: Progress is building/shipping. If the user isn't ready, say "No".
        5. **TERMINAL ACTION**: Every response must leave the user with a 48-hour deadline action.

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
