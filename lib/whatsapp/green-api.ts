export async function sendWhatsAppMessage(chatId: string, text: string) {
    const idInstance = process.env.GREEN_API_ID_INSTANCE;
    const apiTokenInstance = process.env.GREEN_API_TOKEN_INSTANCE;
    const apiUrl = process.env.GREEN_API_URL || 'https://api.greenapi.com';

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
