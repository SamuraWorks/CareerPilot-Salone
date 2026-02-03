import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { supabase } from '@/lib/supabase';
import { AI_RECOMMENDATION_PROMPT } from '@/lib/ai/prompts';
import { z } from 'zod';

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

const RecommendationSchema = z.object({
    careers: z.array(z.object({
        title: z.string(),
        reason: z.string(),
        salary: z.string(),
        demand: z.string()
    })),
    scholarships: z.array(z.object({
        name: z.string(),
        provider: z.string(),
        deadline: z.string(),
        link: z.string()
    })),
    jobs: z.array(z.object({
        title: z.string(),
        company: z.string(),
        type: z.string(),
        location: z.string()
    })),
    skills_to_learn: z.array(z.object({
        name: z.string(),
        priority: z.string(),
        source: z.string()
    })),
    roadmap_summary: z.string()
});

export async function POST(req: Request) {
    try {
        const { district, education, interests, career_goal, anon_id, direct_request } = await req.json();

        if (!anon_id) {
            console.warn("[AI-API] Missing anon_id in request");
            return NextResponse.json({ error: "Missing anon_id" }, { status: 400 });
        }

        const resolvedInputs = {
            district: district || "Not specified",
            education: education || "Not specified",
            interests: interests || "Not specified",
            career_goal: career_goal || "Not specified",
            direct_request: direct_request || "None"
        };

        const prompt = AI_RECOMMENDATION_PROMPT
            .replace('{district}', resolvedInputs.district)
            .replace('{education}', resolvedInputs.education)
            .replace('{interests}', resolvedInputs.interests)
            .replace('{career_goal}', resolvedInputs.career_goal)
            .replace('{direct_request}', resolvedInputs.direct_request);

        let recommendations;
        let providerUsed = "None";

        // Strategy 1: Gemini (Primary)
        if (API_KEY) {
            try {
                console.log(`[AI] Attempting Gemini for ${anon_id}...`);
                const { object } = await generateObject({
                    model: google('gemma-3-27b-it'),
                    schema: RecommendationSchema,
                    prompt: prompt,
                });
                recommendations = object;
                providerUsed = "Gemini";
            } catch (err) {
                console.error("[AI] Gemini failed:", err);
            }
        }

        // Strategy 2: OpenAI (Secondary)
        if (!recommendations && OPENAI_KEY) {
            try {
                console.log(`[AI] Falling back to OpenAI for ${anon_id}...`);
                const { object } = await generateObject({
                    model: openai(process.env.OPENAI_STREAMING_MODEL || 'gpt-4o-mini'),
                    schema: RecommendationSchema,
                    prompt: prompt,
                });
                recommendations = object;
                providerUsed = "OpenAI";
            } catch (err) {
                console.error("[AI] OpenAI fallback failed:", err);
            }
        }

        // Strategy 3: Local Static (Last Resort)
        if (!recommendations) {
            console.log(`[AI] Using Static Fallback for ${anon_id}`);
            const { SIERRA_LEONE_CAREERS } = await import("@/lib/career-data");

            // Try to match interests if available
            const userInterests = resolvedInputs.interests.toLowerCase();
            const matchedCareers = SIERRA_LEONE_CAREERS
                .filter(c => userInterests.includes(c.title.toLowerCase()) ||
                    userInterests.includes(c.industry.toLowerCase()))
                .slice(0, 3);

            const fallbackCareers = (matchedCareers.length > 0 ? matchedCareers : SIERRA_LEONE_CAREERS.slice(0, 3)).map(c => ({
                title: c.title,
                reason: `Based on your interest in ${c.industry}, this path offers substantial growth in Sierra Leone.`,
                salary: c.salaryRange,
                demand: c.demand
            }));

            recommendations = {
                careers: fallbackCareers,
                scholarships: [
                    { name: "Government Grant-in-Aid", provider: "Ministry of Higher Education", deadline: "Varies", link: "/scholarships" },
                    { name: "Orange SL Foundation", provider: "Orange SL", deadline: "Open", link: "/scholarships" }
                ],
                jobs: [
                    { title: "Assistant Project Officer", company: "Local Organization", type: "Full-time", location: "Freetown" },
                    { title: "Operations Intern", company: "Private Sector", type: "Internship", location: "Bo" }
                ],
                skills_to_learn: [
                    { name: "Digital Literacy", priority: "High", source: "CareerPilot Academy" },
                    { name: "Professional Communication", priority: "Medium", source: "Online" }
                ],
                roadmap_summary: "Generated from our verified local knowledge base (AI service currently unavailable)."
            };
            providerUsed = "Static";
        }

        console.log(`[AI-SUCCESS] Provider: ${providerUsed} for ${anon_id}`);

        // Save to recommendations table
        try {
            await supabase
                .from('recommendations')
                .upsert({
                    anon_id,
                    careers: recommendations.careers,
                    scholarships: recommendations.scholarships,
                    jobs: recommendations.jobs,
                    skills: recommendations.skills_to_learn,
                    roadmap_summary: recommendations.roadmap_summary,
                    generated_at: new Date().toISOString()
                }, { onConflict: 'anon_id' });
        } catch (dbErr) {
            console.error("[DB] Failed to save recommendations:", dbErr);
            // Non-blocking for the user
        }

        return NextResponse.json(recommendations);
    } catch (error: any) {
        console.error("AI Recommendation API Global Error:", error);

        // Ultimate Fallback: Never fail, return static recommendations
        const { SIERRA_LEONE_CAREERS } = await import("@/lib/career-data");
        const fallbackCareers = SIERRA_LEONE_CAREERS.slice(0, 3).map(c => ({
            title: c.title,
            reason: c.description.substring(0, 100) + "...",
            salary: c.salaryRange,
            demand: c.demand
        }));

        return NextResponse.json({
            careers: fallbackCareers,
            scholarships: [{ name: "General Grant", provider: "Government", deadline: "Open", link: "/scholarships" }],
            jobs: [{ title: "Entry Level Role", company: "Local Company", type: "Full-time", location: "Freetown" }],
            skills_to_learn: [{ name: "Digital Literacy", priority: "High", source: "Online" }],
            roadmap_summary: "Generated from static knowledge base (Critical API error)."
        });
    }
}

