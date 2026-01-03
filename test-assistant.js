
async function testAssistant() {
    console.log('Testing Assistant API with text() fallback...');
    try {
        const response = await fetch('http://localhost:3000/api/assistant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'user', content: 'hello' }
                ]
            })
        });

        if (!response.ok) {
            console.error('API Error:', response.status, response.statusText);
            return;
        }

        const text = await response.text();
        console.log('Response length:', text.length);
        console.log('Response Content:', text);

    } catch (error) {
        console.error('Test Failed:', error);
    }
}

testAssistant();
