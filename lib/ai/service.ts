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
        You are an expert Career Counselor for Sierra Leone. 
        Analyze the following user profile and provide structured career guidance.
        
        Sectors in Sierra Leone: Technology, Agriculture, Mining, Public Service, Law, Healthcare, Finance, Media.
        
        KNOWLEDGE BASE (CAREERS):
        You must prioritize matching the user to careers from this list if relevant: ${groundedList}
        
        INSTITUTION MAPPING:
        ${groundedInstitutions}
        
        CONTEXT:
        - Focus on the Sierra Leone job market (Freetown, Bo, Makeni, Kenema).
        - Recommend REAL local institutions based on the mapping above. 
        - NEVER suggest Mining at COMAHS or Nursing at FBC.
        - Salary estimates must be realistic for the local economy in SLE (e.g. SLE 2,500 - 6,500).
        - Use local encouraging tone.

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
