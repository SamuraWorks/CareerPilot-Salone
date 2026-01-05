
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function run() {
    console.log("Testing with @google/generative-ai...");
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateContent("Say hello");
        const response = await result.response;
        console.log("Success:", response.text());
    } catch (e) {
        console.error("Failed:", e.message);
    }
}

run();
