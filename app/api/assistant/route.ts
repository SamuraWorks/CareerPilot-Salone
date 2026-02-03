import { streamText } from 'ai';
import { aiModel, hasAiKeys } from '@/lib/ai/config';
import { SIERRA_LEONE_CAREERS, INSTITUTIONS } from '@/lib/career-data';
import { generateChatResponse } from '@/lib/local-ai'; // Static import for stability
import { WEB_SYSTEM_PROMPT } from '@/lib/ai/prompts';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages, userProfile } = await req.json();
    console.log(">> API Request Received. Messages:", messages?.length, "Profile:", userProfile?.fullName);

    // ... (keep grounded data generation code if needed, or simplify for now)

    // Check for keys - strictly use boolean result
    const useRealAI = hasAiKeys();
    console.log(">> AI Mode:", useRealAI ? "Cloud (Gemini/OpenAI)" : "Local Fallback");

    if (useRealAI) {
      try {
        const systemPrompt = `${WEB_SYSTEM_PROMPT}\n\n### USER PROFILE CONTEXT:\n${JSON.stringify(userProfile, null, 2)}\n\nRespond based on this user's specific status, location, and progress.`;

        const result = await streamText({
          model: aiModel,
          system: systemPrompt,
          messages,
          temperature: 0.3,
        });
        return result.toTextStreamResponse();
      } catch (cloudError) {
        console.error(">> Cloud AI Failed, switching to local:", cloudError);
        // Fallthrough to local
      }
    }

    // Local Fallback Execution
    console.log(">> Executing Local AI Logic...");
    const reply = await generateChatResponse(messages, "CareerPilot Guidance", false);
    console.log(">> Local Response Generated:", reply?.substring(0, 50) + "...");

    // Return as a standard text chunk in the Vercel AI SDK stream protocol
    // Format: 0:"stringData"\n
    return new Response(`0:${JSON.stringify(reply)}\n`, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'x-vercel-ai-data-stream': 'v1'
      }
    });

  } catch (error: any) {
    console.error('>> Assistant API Critical Error:', error);

    // Robust Fallback: Attempt to generate a polite response via Local AI
    try {
      const { generateChatResponse } = await import("@/lib/local-ai");
      const reply = await generateChatResponse([{ role: 'user', content: "SYSTEM_ERROR_TRIGGER" }], "Error Handler", false);

      // Return structured stream format even for error/fallback
      return new Response(`0:${JSON.stringify(reply)}\n`, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'x-vercel-ai-data-stream': 'v1'
        }
      });
    } catch (finalError) {
      // Absolute last resort string
      const errorMsg = "⚠️ **System Update**: I am currently offline for maintenance but will be back shortly. Please check the FAQ or Roadmaps directly.";
      return new Response(`0:${JSON.stringify(errorMsg)}\n`, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'x-vercel-ai-data-stream': 'v1'
        }
      });
    }
  }
}
