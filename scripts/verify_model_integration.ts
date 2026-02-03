import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Mock Schema
const RecommendationSchema = z.object({
    roadmap_summary: z.string()
});

async function verifyIntegration() {
    console.log("Verifying Gemma 3 27B Integration...");

    // Explicitly set key if not waiting for env
    const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCrmtcYwBbBw1KAYwQ75X0xWHz6dLPZya0";
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = apiKey;
    }

    try {
        const { object } = await generateObject({
            model: google('gemma-3-27b-it'),
            schema: RecommendationSchema,
            prompt: "Generate a 1 sentence summary of a career in tech.",
        });
        console.log("SUCCESS! Model Generated:", object.roadmap_summary);
    } catch (e) {
        console.error("FAILURE:", e);
    }
}

verifyIntegration();
