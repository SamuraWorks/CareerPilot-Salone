
const { google } = require('@ai-sdk/google');
const { streamText } = require('ai');
require('dotenv').config({ path: '.env.local' });

async function testStreamText() {
    console.log('Testing streamText with models/gemini-1.5-flash...');
    try {
        const result = await streamText({
            model: google('models/gemini-1.5-flash'),
            prompt: 'Respond with "Working"',
        });

        console.log('Stream started:');
        for await (const text of result.textStream) {
            process.stdout.write(text);
        }
        console.log('\nStream finished.');
    } catch (error) {
        console.error('streamText Failed:', error);
        console.error(JSON.stringify(error, null, 2));
    }
}

testStreamText();
