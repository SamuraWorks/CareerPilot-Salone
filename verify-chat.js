
async function testChat() {
    console.log('Testing Chat API...');
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                skills: 'Coding',
                interests: 'AI',
                education: 'College',
                goals: 'Software Engineer'
            })
        });

        if (!response.ok) {
            console.error('API Error:', response.status, response.statusText);
            const text = await response.text();
            console.error('Response:', text);
            return;
        }

        const data = await response.json();
        console.log('Chat API Success!', JSON.stringify(data, null, 2));

    } catch (error) {
        console.error('Test Failed:', error);
    }
}

testChat();
