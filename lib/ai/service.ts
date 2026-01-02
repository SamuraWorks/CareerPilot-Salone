
import { generateObject } from 'ai';
import { aiModel } from './config';
import { CareerGuidanceResponseSchema } from './schemas';

export async function generateCareerGuidance(userProfile: string) {
    try {
        const { object } = await generateObject({
            model: aiModel,
            schema: CareerGuidanceResponseSchema,
            prompt: `
        You are an expert Career Counselor for Sierra Leone. 
        Analyze the following user profile and provide structured career guidance.
        
        CONTEXT:
        - Focus on the Sierra Leone job market (Freetown, Bo, Makeni, etc).
        - Recommend real local institutions (FBC, IPAM, Njala, UNIMAK).
        - Salary estimates should be realistic for the local economy in New Leones (SLE).
        - Be encouraging but realistic about skills gaps.

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
