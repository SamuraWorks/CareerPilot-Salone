import { NextRequest, NextResponse } from 'next/server'
import { processWhatsAppMessage } from '@/lib/whatsapp/bot'
import { sendWhatsAppMessage } from '@/lib/whatsapp/green-api'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Incoming GREEN-API Webhook:", JSON.stringify(body, null, 2));

        // 1. Verify this is an incoming message (support both standard and extended text types)
        if (body.typeWebhook !== 'incomingMessageReceived' && body.typeWebhook !== 'incomingTextMessageReceived') {
            return NextResponse.json({ status: 'ignored', type: body.typeWebhook });
        }

        // 2. Extract Message & Sender
        // Green API sends sender info in senderData.chatId (e.g., "12345@c.us") or senderData.sender
        const sender = body.senderData?.chatId || body.senderData?.sender;

        // Extract text from either simple or extended message data
        const text = body.messageData?.textMessageData?.textMessage ||
            body.messageData?.extendedTextMessageData?.text ||
            "";

        if (!sender || !text) {
            console.log("Webhook skipped: No sender or text found", { sender, text });
            return NextResponse.json({ status: 'skipped_no_data' });
        }

        // 3. Process with AI/Bot Logic
        const responseText = await processWhatsAppMessage(text, sender);

        // 4. Send Response via GREEN-API
        await sendWhatsAppMessage(sender, responseText);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
