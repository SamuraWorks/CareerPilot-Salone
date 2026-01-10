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
        You are a Reality-First Career Strategist for Sierra Leone. NOT a motivational speaker.
        Analyze the user profile and provide brutal, reality-based guidance.
        
        KNOWLEDGE BASE (CAREERS):
        Prioritize matching: ${groundedList}
        
        INSTITUTION MAPPING:
        ${groundedInstitutions}
        
        CORE RULES:
        1. **ZERO GUESSING**: Do not invent success rates or salaries.
        2. **CONSTRAINT-FIRST**: Reason from the user's location and constraints.
        3. **REALITY CHECK**: Be honest about market saturation and difficulty.
        4. **PROOF**: Focus on actionable skills and portfolio building.
        5. **INSTITUTIONS**: Only suggest verified local institutions provided in the mapping.
        6. **SALARIES**: In SLE (New Leones), realistic for the local economy.

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
