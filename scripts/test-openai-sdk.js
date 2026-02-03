const { generateText } = require("ai");
const { createOpenAI } = require("@ai-sdk/openai");
require('dotenv').config();
const fs = require('fs');

async function testOpenAI() {
    let log = "";
    const logFile = 'openai-sdk-test-log.txt';

    const apiKey = process.env.OPENAI_API_KEY;
    log += `Testing OpenAI API Key: ${apiKey ? "Found" : "Not Found"}\n`;

    if (!apiKey) {
        fs.writeFileSync(logFile, log);
        console.log("No API Key found.");
        return;
    }

    try {
        const openai = createOpenAI({
            apiKey: apiKey,
        });

        const { text } = await generateText({
            model: openai('gpt-4o-mini'),
            prompt: 'Say hello world',
        });

        log += "Response Status: OK\n";
        log += `Response Text: ${text}\n`;
    } catch (error) {
        log += `OpenAI SDK Error: ${error.message}\n`;
        if (error.stack) log += `Stack: ${error.stack}\n`;
    }

    fs.writeFileSync(logFile, log);
    console.log("Test complete. Results in openai-sdk-test-log.txt");
}

testOpenAI();
