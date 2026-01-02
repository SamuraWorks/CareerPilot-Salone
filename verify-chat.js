
const fetch = require('node-fetch');

async function testChat() {
    console.log('Testing Chat API...');
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'user', content: 'Hello, are you working?' }
                ]
            })
        });

        if (!response.ok) {
            console.error('API Error:', response.status, response.statusText);
            const text = await response.text();
            console.error('Response:', text);
            return;
        }

        console.log('API Success! Status:', response.status);

        // Check if it's a stream
        // In node-fetch, body is a stream
        response.body.on('data', chunk => {
            console.log('Received chunk:', chunk.toString());
        });

        response.body.on('end', () => {
            console.log('Stream finished.');
        });

    } catch (error) {
        console.error('Test Failed:', error);
    }
}

testChat();
