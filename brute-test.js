
const { google } = require('@ai-sdk/google');
const { generateText } = require('ai');
require('dotenv').config({ path: '.env.local' });

async function testAll() {
    const models = [
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-pro',
        'gemini-pro-vision',
        'gemini-1.0-pro',
    ];

    for (const m of models) {
        try {
            await generateText({
                model: google(m),
                prompt: 'hello',
            });
            console.log(`Success: ${m}`);
        } catch (e) {
            console.log(`Fail: ${m} -> ${e.message}`);
        }
    }
}

testAll();
