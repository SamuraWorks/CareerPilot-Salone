const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const fs = require('fs');

async function testGemini2() {
    let log = "";
    const logFile = 'gemini-2.0-test.txt';

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
        fs.writeFileSync(logFile, "No API Key found.");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = "gemini-2.0-flash";

    try {
        log += `Testing Model: ${modelName}...\n`;
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("test");
        const response = await result.response;
        log += `SUCCESS: ${modelName} returned: ${response.text().substring(0, 50)}...\n\n`;
    } catch (e) {
        log += `FAILED: ${modelName} - ${e.message}\n\n`;
    }

    fs.writeFileSync(logFile, log);
    console.log("Test complete. Results in gemini-2.0-test.txt");
}

testGemini2();
