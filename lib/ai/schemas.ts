import { z } from 'zod';

export const RoadmapStepSchema = z.object({
    phase: z.string().describe("Phase name (e.g. 'Foundations', 'Advanced')"),
    duration: z.string().describe("Estimated duration (e.g. '3 months')"),
    actions: z.array(z.string()).describe("Specific actions to take")
});

export const InstitutionSchema = z.object({
    name: z.string().describe("Name of the institution (e.g. 'Fourah Bay College')"),
    program: z.string().describe("Specific degree or certification program"),
    type: z.enum(['University', 'TVET', 'Online', 'Bootcamp']).describe("Type of institution")
});

export const MentorSchema = z.object({
    role: z.string().describe("Type of mentor needed (e.g. 'Senior Engineer')"),
    organization: z.string().describe("Example organization to find them (e.g. 'Orange SL')")
});

export const CareerPathSchema = z.object({
    title: z.string().describe("The job title of the recommended career"),
    match_score: z.number().min(0).max(100).describe("Percentage match based on user profile"),
    feasibility_check: z.enum(['Realistic', 'Stretch', 'Unrealistic']).describe("Radical Reality check"),
    reason: z.string().describe("Why this is a good fit and realistic"),
    salary_range: z.string().describe("Estimated monthly salary in Sierra Leone Leones (SLL/SLE)"),
    demand_level: z.enum(['High', 'Medium', 'Low']).describe("Current market demand in Sierra Leone"),
    roadmap: z.array(RoadmapStepSchema).describe("Step-by-step roadmap for this specific career"),
    education_options: z.array(InstitutionSchema).describe("Linked institutions for this career"),
    potential_mentors: z.array(MentorSchema).describe("Types of mentors to seek")
});

export const CareerGuidanceResponseSchema = z.object({
    verdict: z.enum(['Realistic', 'Unrealistic']).describe("Overall assessment of the user's goals vs reality"),
    summary: z.string().describe("A personalized, encouraging but realistic 2-sentence summary."),
    recommended_careers: z.array(CareerPathSchema).length(3).describe("Exactly 3 career matches, ranked by fit and realism"),
    next_steps_48h: z.array(z.string()).describe("3 immediate actions to take in the next 48 hours")
});
