import { NextRequest, NextResponse } from 'next/server';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';
import { processWhatsAppMessage } from '@/lib/whatsapp/bot';

export async function POST(req: NextRequest) {
    try {
        // 1. Parse Form Data (Twilio sends application/x-www-form-urlencoded)
        const formData = await req.formData();
        const body = formData.get('Body') as string;
        const from = formData.get('From') as string;

        if (!body) {
            return NextResponse.json({ error: 'No body provided' }, { status: 400 });
        }

        // 2. Process Logic
        const responseText = await processWhatsAppMessage(body, from);

        // 3. Generate TwiML
        const twiml = new MessagingResponse();
        twiml.message(responseText);

        // 4. Return XML
        return new NextResponse(twiml.toString(), {
            headers: {
                'Content-Type': 'text/xml',
            },
        });

    } catch (error) {
        console.error("WhatsApp Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
