import { NextRequest, NextResponse } from 'next/server';
import { processWhatsAppMessage } from '@/lib/whatsapp/bot';
import { sendWhatsAppMessage } from '@/lib/whatsapp/green-api';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("GREEN-API Webhook received:", JSON.stringify(body, null, 2));

        // 1. Verify this is an incoming message
        if (body.typeWebhook !== 'incomingMessageReceived' && body.typeWebhook !== 'incomingTextMessageReceived') {
            return NextResponse.json({ status: 'ignored', type: body.typeWebhook });
        }

        // 2. Extract Message & Sender
        const sender = body.senderData?.chatId;
        const text = body.messageData?.textMessageData?.textMessage || body.messageData?.extendedTextMessageData?.text || "";

        if (!sender || !text) {
            return NextResponse.json({ error: 'Incomplete data' }, { status: 400 });
        }

        // 3. Process with AI/Bot Logic
        const responseText = await processWhatsAppMessage(text, sender);

        // 4. Send Response via GREEN-API
        await sendWhatsAppMessage(sender, responseText);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("WhatsApp Webhook Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
