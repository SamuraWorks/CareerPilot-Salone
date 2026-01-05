import { z } from 'zod';

export const CareerPathSchema = z.object({
    title: z.string().describe("The job title of the recommended career"),
    match_score: z.number().min(0).max(100).describe("Percentage match based on user profile"),
    reason: z.string().describe("Why this is a good fit for the user"),
    salary_range: z.string().describe("Estimated monthly salary in Sierra Leone Leones (SLL/SLE)"),
    demand_level: z.enum(['High', 'Medium', 'Low']).describe("Current market demand in Sierra Leone"),
});

export const EducationSchema = z.object({
    institution: z.string().describe("Name of University or Institution (e.g. Fourah Bay College)"),
    program: z.string().describe("Recommended degree or certification"),
    type: z.enum(['University', 'TVET', 'Online', 'Other']).describe("Type of education"),
});

export const CareerGuidanceResponseSchema = z.object({
    summary: z.string().describe("A personalized, encouraging 2-sentence summary for the user."),
    recommended_careers: z.array(CareerPathSchema).length(3).describe("Top 3 career matches"),
    education_path: z.array(EducationSchema).describe("Recommended local education options"),
    online_courses: z.array(z.string()).describe("Specific names of 3 relevant online courses (Coursera, Udemy, etc)"),
    skill_roadmap: z.array(z.object({
        phase: z.string(),
        actions: z.array(z.string())
    })).describe("A 3-phase roadmap (Short-term, Mid-term, Long-term)"),
});
