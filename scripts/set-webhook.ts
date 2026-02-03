import axios from 'axios';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config({ path: path.join(__dirname, '../.env') });

const idInstance = process.env.GREEN_API_ID_INSTANCE;
const apiTokenInstance = process.env.GREEN_API_TOKEN_INSTANCE;
const apiUrl = process.env.GREEN_API_URL || 'https://7103.api.greenapi.com';

// Replace with your actual deployment URL
const WEBHOOK_URL = 'https://career-pilot-salone.vercel.app/api/incoming';

async function setWebhook() {
    if (!idInstance || !apiTokenInstance) {
        console.error("❌ Error: GREEN-API credentials missing in .env");
        process.exit(1);
    }

    try {
        console.log(`🚀 Setting GREEN-API Webhook for instance ${idInstance}...`);
        console.log(`📍 Webhook URL: ${WEBHOOK_URL}`);

        const url = `${apiUrl}/waInstance${idInstance}/setSettings/${apiTokenInstance}`;

        const response = await axios.post(url, {
            webhookUrl: WEBHOOK_URL,
            outgoingMessageWebhook: 'yes',
            stateInstanceWebhook: 'yes',
            incomingMessageWebhook: 'yes'
        });

        if (response.data.saveSettings) {
            console.log("✅ Success: Webhook has been set successfully!");
        } else {
            console.log("⚠️ Warning: Settings saved, but check the response:", response.data);
        }

    } catch (error: any) {
        console.error("❌ Error setting webhook:");
        if (error.response) {
            console.error(JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(error.message);
        }
        process.exit(1);
    }
}

setWebhook();
