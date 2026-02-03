const { OpenAI } = require("openai");
require('dotenv').config();
const fs = require('fs');

async function testOpenAI() {
    let log = "";
    const logFile = 'openai-test-log.txt';

    const apiKey = process.env.OPENAI_API_KEY;
    log += `Testing OpenAI API Key: ${apiKey ? "Found" : "Not Found"}\n`;

    if (!apiKey) {
        fs.writeFileSync(logFile, log);
        return;
    }

    try {
        const openai = new OpenAI({ apiKey });
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "Say hello world" }],
        });
        log += "Response Status: OK\n";
        log += `Response Text: ${response.choices[0].message.content}\n`;
    } catch (error) {
        log += `OpenAI API Error: ${error.message}\n`;
    }

    fs.writeFileSync(logFile, log);
    console.log("OpenAI test complete. Results in openai-test-log.txt");
}

testOpenAI();
