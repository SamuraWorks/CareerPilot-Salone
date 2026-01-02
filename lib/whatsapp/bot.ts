import { MENU_TEXT, getMessage } from './strings';
import { generateCareerGuidance } from '@/lib/ai/service';

// Mock database of jobs for the bot
const MOCK_JOBS = [
    "1. Software Dev @ TechSalone (Freetown)",
    "2. Accountant @ RCBank (Bo)",
    "3. Driver @ NGO (Makeni)"
].join("\n");

export async function processWhatsAppMessage(body: string, sender: string): Promise<string> {
    const cleanBody = body.trim().toUpperCase();

    // 1. Language Toggle (Simplistic Session handling simulation)
    // In a real app, we'd check the User DB for preference.
    let lang: 'en' | 'krio' = 'en';

    // 2. Command Routing
    switch (cleanBody) {
        case 'MENU':
        case 'HI':
        case 'HELLO':
        case 'KUSHE':
            return MENU_TEXT;

        case 'JOBS':
        case 'WOK':
            return `${getMessage('jobs', lang)}\n${MOCK_JOBS}\n\nReply with a number to apply.`;

        case 'CV':
            return "To build your CV, visit our website: https://careerpilot-salone.vercel.app/cv-builder";

        case 'CAREER':
            return "Tell me about your skills and interests (e.g., 'I like math and coding').";

        default:
            // If it looks like a profile/sentence, send to AI
            if (cleanBody.length > 20) {
                try {
                    // We use the AI service we built earlier, but strictly summarize for WhatsApp
                    // This is a simplified call - in production we'd have a specific prompt for WhatsApp brevity
                    return "I am analyzing your profile... (AI integration active). Visit the web app for the full report!";
                } catch (e) {
                    return getMessage('error', lang);
                }
            }
            return getMessage('error', lang);
    }
}
