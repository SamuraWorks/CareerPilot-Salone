const { openai } = require("@ai-sdk/openai");
const { generateText } = require("ai");

async function testOpenAI() {
    console.log("Testing OpenAI Connection...");
    if (!process.env.OPENAI_API_KEY) {
        console.error("FAILURE: OPENAI_API_KEY is not set.");
        return;
    }

    try {
        const { text } = await generateText({
            model: openai("gpt-4o-mini"),
            prompt: "Ping",
        });
        console.log("SUCCESS: OpenAI returned:", text);
    } catch (error) {
        console.error("FAILURE: OpenAI connection failed:", error.message);
        if (error.cause) console.error("Cause:", error.cause);
    }
}

testOpenAI();
