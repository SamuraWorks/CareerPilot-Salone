
const { google } = require('@ai-sdk/google');
const { streamObject } = require('ai');
const { z } = require('zod');
require('dotenv').config({ path: '.env.local' });

async function testGemini() {
    console.log('Testing Gemini...');
    try {
        const result = await streamObject({
            model: google('gemini-1.5-flash'),
            schema: z.object({ message: z.string() }),
            prompt: 'Say hello',
        });
        console.log('Success reached logic start');
        for await (const chunk of result.partialObjectStream) {
            console.log('Chunk:', chunk);
        }
        console.log('Gemini Test Success!');
    } catch (error) {
        console.error('Gemini Test Failed with full error:');
        console.error(error);
    }
}

testGemini();
