const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const fs = require('fs');

async function testGemini() {
    let log = "";
    const logFile = 'gemini-final-test.txt';

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
        fs.writeFileSync(logFile, "No API Key found.");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const models = ["gemini-1.5-flash-latest", "gemini-1.5-pro-latest", "gemini-1.5-flash", "gemini-pro"];

    for (const modelName of models) {
        try {
            log += `Testing Model: ${modelName}...\n`;
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("test");
            const response = await result.response;
            log += `SUCCESS: ${modelName} returned: ${response.text().substring(0, 20)}...\n\n`;
        } catch (e) {
            log += `FAILED: ${modelName} - ${e.message}\n\n`;
        }
    }

    fs.writeFileSync(logFile, log);
    console.log("Test complete. Results in gemini-final-test.txt");
}

testGemini();
