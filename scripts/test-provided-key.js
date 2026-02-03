const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

async function testSpecificKey() {
    const apiKey = "AIzaSyCrmtcYwBbBw1KAYwQ75X0xWHz6dLPZya0";
    const logFile = 'gemini-new-key-test.txt';
    let log = "";

    console.log("Testing Provided API Key...");

    const genAI = new GoogleGenerativeAI(apiKey);
    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash-exp", "gemini-pro"];

    for (const modelName of models) {
        try {
            log += `Testing Model: ${modelName}...\n`;
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say 'Key is Working'");
            const response = await result.response;
            log += `SUCCESS: ${modelName} returned: ${response.text()}\n\n`;
            break; // Stop at first success
        } catch (e) {
            log += `FAILED: ${modelName} - ${e.message}\n\n`;
        }
    }

    fs.writeFileSync(logFile, log);
    console.log("Test complete. Results in gemini-new-key-test.txt");
}

testSpecificKey();
