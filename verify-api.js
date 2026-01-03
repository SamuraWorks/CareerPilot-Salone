
const fetch = require('node-fetch');

async function testApi() {
    console.log('Testing Roadmap API...');
    try {
        const response = await fetch('http://localhost:3000/api/generate-roadmap', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ career: 'Accountant' })
        });

        if (!response.ok) {
            console.error('API Error:', response.status, response.statusText);
            const text = await response.text();
            console.error('Response:', text);
            return;
        }

        const data = await response.json();
        console.log('API Success!');
        console.log('Title:', data.title);
        console.log('Phases count:', data.phases?.length);
        if (!data.phases || data.phases.length !== 3) {
            console.error('Invalid phases count!');
        }
    } catch (error) {
        console.error('Test Failed:', error);
    }
}

testApi();
