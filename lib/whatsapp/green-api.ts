export async function sendWhatsAppMessage(chatId: string, text: string) {
    const idInstance = process.env.GREEN_API_ID_INSTANCE;
    const apiTokenInstance = process.env.GREEN_API_TOKEN_INSTANCE;

    // Auto-determine host from Instance ID (first 4 digits) or use env var
    const defaultHost = idInstance ? `https://${idInstance.slice(0, 4)}.api.greenapi.com` : 'https://7103.api.greenapi.com';
    const apiUrl = process.env.GREEN_API_URL || defaultHost;

    if (!idInstance || !apiTokenInstance) {
        console.error("GREEN-API credentials missing");
        return;
    }

    try {
        const url = `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chatId: chatId.includes('@') ? chatId : `${chatId}@c.us`,
                message: text
            })
        });

        const data = await response.json();
        console.log("GREEN-API response:", data);
        return data;
    } catch (error) {
        console.error("GREEN-API Error:", error);
        throw error;
    }
}
