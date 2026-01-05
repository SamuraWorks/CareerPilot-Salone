import { google } from '@ai-sdk/google';

// Create the model instance using the Google AI SDK
// This uses the GOOGLE_GENERATIVE_AI_API_KEY from env
export const aiModel = google('models/gemini-1.5-flash');
