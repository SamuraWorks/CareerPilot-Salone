
const { google } = require('@ai-sdk/google');
const { streamObject } = require('ai');
const { z } = require('zod');
require('dotenv').config({ path: '.env.local' });

async function testGemini() {
    console.log('Testing Gemini with API Key:', process.env.GOOGLE_GENERATIVE_AI_API_KEY ? 'Present' : 'Missing');

    try {
        const result = await streamObject({
            model: google('gemini-1.5-flash'),
            schema: z.object({
                message: z.string(),
            }),
            prompt: 'Say hello world',
        });

        for await (const chunk of result.partialObjectStream) {
            console.log('Chunk:', chunk);
        }
        console.log('Gemini Test Success!');
    } catch (error) {
        console.error('Gemini Test Failed:', error);
    }
}

testGemini();
