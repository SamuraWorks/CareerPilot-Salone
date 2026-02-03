import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { SIERRA_LEONE_CAREERS } from '@/lib/career-data';

const CareerAnalysisSchema = z.object({
    summary: z.string(),
    recommendations: z.array(z.object({
        title: z.string(),
        matchScore: z.number(),
        whyFits: z.string(),
        image: z.string().describe("Relevant career image path"),
        demand: z.enum(['High', 'Medium', 'Low']),
        growthPotential: z.string(),
        entrySalary: z.string(),
        entryRoles: z.array(z.string()),
        feasibility: z.string(),
        nextSteps: z.array(z.string())
    }))
});

export async function analyzeUserCareers(userData: any) {
    try {
        const { object } = await generateObject({
            model: google('models/gemini-1.5-flash'),
            schema: CareerAnalysisSchema as any,
            prompt: `
            Analyze this user's profile and match them to at least 3 career paths in Sierra Leone.
            
            USER PROFILE:
            ${JSON.stringify(userData)}
            
            LOCAL CONTEXT (KNOWLEDGE BASE):
            ${JSON.stringify(SIERRA_LEONE_CAREERS)}
            
            CRITERIA:
            1. Skill Fit: How well do their subjects/skills match?
            2. Education Feasibility: Can they realistically pursue this given their level?
            3. Local Demand: Must reflect the Sierra Leone market.
            4. Growth Potential: Long-term career health.
            5. Visuals: Always include the correct image path from the grounding data.
            
            Be specific and actionable.
            `
        });
        return object;
    } catch (error) {
        console.error("Deep Analysis Error:", error);
        // Fallback to simpler logic or handle error
        throw error;
    }
}
