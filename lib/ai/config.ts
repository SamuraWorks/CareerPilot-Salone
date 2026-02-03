import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';

const getModel = () => {
    // 1. Primary: Google Gemini (as specified in .env)
    const geminiKey = process.env.GEMINI_API_KEY;
    const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (geminiKey && geminiKey.length > 10 && geminiKey !== 'mock_key') {
        return google('gemini-1.5-flash');
    }

    if (googleKey && googleKey.length > 10 && googleKey !== 'mock_key') {
        return google('gemini-1.5-flash');
    }

    // 2. Secondary: OpenAI Fallback
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
        const modelName = process.env.OPENAI_STREAMING_MODEL || 'gpt-4o-mini';
        return openai(modelName);
    }

    return null; // Return null if no valid keys found
};

export const hasAiKeys = () => {
    const openaiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    return (openaiKey && openaiKey.startsWith('sk-')) ||
        (geminiKey && geminiKey.length > 10 && geminiKey !== 'mock_key') ||
        (googleKey && googleKey.length > 10 && googleKey !== 'mock_key');
};

export const openaiProvider = openai;
export const googleProvider = google;

export const aiModel = getModel();
