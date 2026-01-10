import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';

const getModel = () => {
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
        return openai('gpt-4o');
    }
    if (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        return google('gemini-1.5-flash');
    }
    // Fallback or Mock can be handled at the call site or via a null-check
    return google('gemini-1.5-flash'); // Default to google as before if nothing found
};

export const aiModel = getModel();
