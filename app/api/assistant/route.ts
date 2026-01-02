
import { streamText } from 'ai';
import { aiModel } from '@/lib/ai/config';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = await streamText({
        model: aiModel,
        system: `You are the CareerPilot Salone Assistant.
    - You help Sierra Leoneans with career advice, CV tips, and finding jobs.
    - Be polite, encouraging, and use simple English (or Krio if asked).
    - Keep responses concise (under 3 paragraphs) as many users are on mobile data.
    - Do not make up job postings. If asked for jobs, direct them to the Jobs page.
    - Context: Sierra Leone (Freetown, Bo, Kenema, Makeni). Currency: SLE/SLL.
    `,
        messages,
    });

    return result.toTextStreamResponse();
}
