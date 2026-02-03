const { GoogleGenerativeAI } = require("@google/generative-ai");

// Allow specifying key via env or hardcoded (for testing provided key)
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCrmtcYwBbBw1KAYwQ75X0xWHz6dLPZya0";

async function diagnoseConnection() {
    console.log(`[Diagnosis] Testing Gemini API with key: ${apiKey.substring(0, 10)}... (Length: ${apiKey.length})`);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        console.log("[Diagnosis] Sending test request...");
        const result = await model.generateContent("Ping");
        const response = await result.response;
        console.log("[Diagnosis] SUCCESS: Received response:", response.text());
    } catch (error) {
        console.error("[Diagnosis] FAILURE:");
        console.error(" - Message:", error.message);
        if (error.cause) {
            console.error(" - Cause:", error.cause);
        }
        if (error.stack) {
            console.error(" - Stack:", error.stack);
        }

        // Check for common fetch issues
        if (error.message.includes("fetch failed")) {
            console.error("\n[Analysis] 'fetch failed' usually indicates a network issue, proxy requirement, or DNS failure.");
            console.error("Please check if you are behind a corporate firewall or VPN.");
        }
    }
}

diagnoseConnection();
