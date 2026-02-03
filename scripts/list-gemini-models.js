const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const fs = require('fs');

async function listAllModels() {
    let log = "";
    const logFile = 'gemini-list-models.txt';

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
        fs.writeFileSync(logFile, "No API Key found.");
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Direct fetch to the list models endpoint
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            log += `API Error: ${data.error.message}\n`;
        } else if (data.models) {
            log += "Available Models:\n";
            data.models.forEach(m => {
                log += `- ${m.name} (Methods: ${m.supportedGenerationMethods.join(", ")})\n`;
            });
        } else {
            log += "No models found in the response.\n";
            log += JSON.stringify(data, null, 2);
        }
    } catch (error) {
        log += `Fetch Error: ${error.message}\n`;
    }

    fs.writeFileSync(logFile, log);
    console.log("List models complete. Results in gemini-list-models.txt");
}

listAllModels();
