import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { constructCoverLetterPrompt, determineTone, JobData } from '@/lib/cover-letter-logic';
import { UserProfile } from '@/lib/cv-logic-engine';
import { hasAiKeys } from '@/lib/ai/config';
import { generateLocalCoverLetter } from '@/lib/local-ai';

export async function POST(req: Request) {
    try {
        const { profile, job }: { profile: UserProfile, job: JobData } = await req.json();

        if (!job.title || !job.company) {
            return new Response("Job Title and Company are required.", { status: 400 });
        }

        const tone = determineTone(job.company, job.title);

        // --- LOCAL FALLBACK MODE ---
        // If keys are missing, jump straight to local synthesis
        if (!hasAiKeys()) {
            console.log('AI Keys missing, switching to Local Synthesis');
            const localText = generateLocalCoverLetter(profile, job, tone);
            return Response.json({ text: localText, tone, mode: 'local' });
        }

        const { prompt, systemInstruction } = constructCoverLetterPrompt(profile, job, tone);

        try {
            const result = await generateText({
                model: google('gemini-1.5-flash'),
                system: systemInstruction,
                prompt: prompt,
                temperature: 0.9,
            });

            return Response.json({ text: result.text, tone, mode: 'ai' });
        } catch (aiError) {
            console.error('AI Generation failed, falling back to Local:', aiError);
            const localText = generateLocalCoverLetter(profile, job, tone);
            return Response.json({ text: localText, tone, mode: 'local_fallback' });
        }
    } catch (error) {
        console.error('Cover Letter API Error:', error);
        return new Response("Process failed. Please verify your input.", { status: 500 });
    }
}
