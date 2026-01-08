import { NextRequest, NextResponse } from 'next/server'
import { processWhatsAppMessage } from '@/lib/whatsapp/bot'
import { sendWhatsAppMessage } from '@/lib/whatsapp/green-api'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        console.log("Incoming GREEN-API Webhook:", JSON.stringify(body, null, 2))

        // 1. Filter for incoming messages only
        if (body.typeWebhook !== 'incomingMessageReceived') {
            return NextResponse.json({ status: 'ignored' })
        }

        const sender = body.senderData.sender // e.g. "23275668258@c.us"
        const messageText = body.messageData.textMessageData?.textMessage

        if (!messageText) {
            return NextResponse.json({ status: 'no_text' })
        }

        // 2. Process via Bot Logic
        const responseText = await processWhatsAppMessage(messageText, sender)

        // 3. Send Reply using GREEN-API
        await sendWhatsAppMessage(sender, responseText)

        return NextResponse.json({ status: 'success' })

    } catch (error) {
        console.error("Webhook Error:", error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
