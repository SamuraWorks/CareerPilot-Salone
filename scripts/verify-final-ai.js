const { generateObject } = require("ai");
const { google } = require("@ai-sdk/google");
require('dotenv').config();
const fs = require('fs');
const { z } = require('zod');

async function verifyUnifiedAi() {
    let log = "";
    const logFile = 'final-ai-verification.txt';

    const RecommendationSchema = z.object({
        careers: z.array(z.object({
            title: z.string(),
            reason: z.string(),
            salary: z.string(),
            demand: z.string()
        })),
        roadmap_summary: z.string()
    });

    try {
        console.log("Testing Gemini via Vercel AI SDK...");
        const { object } = await generateObject({
            model: google('gemini-1.5-flash'),
            schema: RecommendationSchema,
            prompt: "Match me to 3 careers for a person interested in AI in Sierra Leone.",
        });
        log += "AI SUCCESS: Gemini delivered specific recommendations.\n";
        log += `Sample Career: ${object.careers[0].title}\n`;
        log += `Reason: ${object.careers[0].reason}\n`;
    } catch (error) {
        log += `AI FAILURE: ${error.message}\n`;
    }

    fs.writeFileSync(logFile, log);
    console.log("Final verification complete.");
}

verifyUnifiedAi();
