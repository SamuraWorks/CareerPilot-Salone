
const { google } = require('@ai-sdk/google');
const { generateText } = require('ai');
require('dotenv').config({ path: '.env.local' });

async function test() {
    console.log('Fetching models? (Not supported via AI SDK directly)');
    const models = ['gemini-pro', 'gemini-1.0-pro', 'gemini-1.5-pro', 'gemini-1.5-flash'];
    for (const m of models) {
        try {
            const { text } = await generateText({
                model: google(m),
                prompt: 'hi'
            });
            console.log('SUCCESS:', m);
            return;
        } catch (e) { }
    }
    console.log('ALL FAILED');
}
test();
