
import axios from 'axios';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env from root
dotenv.config({ path: path.join(__dirname, '../.env') });

const idInstance = process.env.GREEN_API_ID_INSTANCE;
const apiTokenInstance = process.env.GREEN_API_TOKEN_INSTANCE;

// Dynamic host logic to match app
const defaultHost = idInstance ? `https://${idInstance.slice(0, 4)}.api.greenapi.com` : 'https://7103.api.greenapi.com';
const apiUrl = process.env.GREEN_API_URL || defaultHost;

async function diagnose() {
    console.log("🔍 Starting WhatsApp Diagnostics...");
    console.log(`🆔 Instance: ${idInstance}`);
    console.log(`🌐 API URL: ${apiUrl}`);

    if (!idInstance || !apiTokenInstance) {
        console.error("❌ Credentials missing in .env");
        return;
    }

    try {
        // 1. Check State
        console.log("\n1️⃣ Checking Instance State...");
        const stateUrl = `${apiUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;
        const stateRes = await axios.get(stateUrl);
        console.log("   Status:", JSON.stringify(stateRes.data, null, 2));

        // 2. Check Settings (Webhook)
        console.log("\n2️⃣ Checking Webhook Settings...");
        const settingsUrl = `${apiUrl}/waInstance${idInstance}/getSettings/${apiTokenInstance}`;
        const settingsRes = await axios.get(settingsUrl);

        console.log("   Webhook URL:", settingsRes.data.webhookUrl);
        console.log("   Incoming Webhook:", settingsRes.data.incomingMessageWebhook);
        console.log("   Outgoing Webhook:", settingsRes.data.outgoingMessageWebhook);
        console.log("   State Webhook:", settingsRes.data.stateInstanceWebhook);

        // Analysis
        if (stateRes.data.stateInstance !== 'authorized') {
            console.error("\n⚠️ CRITICAL: Phone is NOT authorized.");
            console.error("   ACTION: Go to GreenAPI console or scan the QR code for instance " + idInstance);
        } else {
            console.log("\n✅ Phone is AUTHORIZED.");
        }

        if (settingsRes.data.webhookUrl !== 'https://career-pilot-salone.vercel.app/api/incoming') {
            console.warn("\n⚠️ WARNING: Webhook URL might be incorrect or stale.");
            console.warn(`   Expected: https://career-pilot-salone.vercel.app/api/incoming`);
            console.warn(`   Found: ${settingsRes.data.webhookUrl}`);
        } else {
            console.log("\n✅ Webhook URL matches production.");
        }

    } catch (error: any) {
        console.error("\n❌ Diagnostic Failed:");
        if (error.response) {
            console.error(`   Status: ${error.response.status}`);
            console.error(`   Data: ${JSON.stringify(error.response.data)}`);
        } else {
            console.error(`   Error: ${error.message}`);
        }
    }
}

diagnose();
