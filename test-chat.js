const { openai } = require('@ai-sdk/openai');
const { streamText } = require('ai');
require('dotenv').config({ path: '.env.local' });

async function run() {
    console.log("Checking API Key:", process.env.OPENAI_API_KEY ? "EXISTS" : "MISSING");
    try {
        const result = await streamText({
            model: openai('gpt-4o'),
            prompt: 'Hello, are you working?',
        });

        console.log("Stream started.");
        for await (const chunk of result.textStream) {
            process.stdout.write(chunk);
        }
        console.log("\nStream finished.");
    } catch (e) {
        console.error("Error:", e);
    }
}

run();
