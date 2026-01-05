
const { google } = require('@ai-sdk/google');
const { generateText } = require('ai');
require('dotenv').config({ path: '.env.local' });

async function test() {
    console.log('Testing generateText with gemini-1.5-flash-latest...');
    try {
        const { text } = await generateText({
            model: google('gemini-1.5-flash-latest'),
            prompt: 'Say hello',
        });
        console.log('Response:', text);
    } catch (e) {
        console.error('Error with flash-latest:', e.message);

        console.log('Testing generateText with gemini-1.5-flash...');
        try {
            const { text } = await generateText({
                model: google('gemini-1.5-flash'),
                prompt: 'Say hello',
            });
            console.log('Response:', text);
        } catch (e2) {
            console.error('Error with flash:', e2.message);
        }
    }
}

test();
