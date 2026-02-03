require('dotenv').config();
const fs = require('fs');

async function listModelsNewKey() {
    const apiKey = "AIzaSyCrmtcYwBbBw1KAYwQ75X0xWHz6dLPZya0";
    const logFile = 'gemini-new-key-models.txt';
    let log = "";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            log += `API Error: ${data.error.message}\n`;
        } else if (data.models) {
            log += "Available Models:\n";
            data.models.forEach(m => {
                log += `- ${m.name}\n`;
            });
        } else {
            log += "No models found.\n" + JSON.stringify(data);
        }
    } catch (e) {
        log += `Fetch Error: ${e.message}\n`;
    }

    fs.writeFileSync(logFile, log);
    console.log("Done.");
}

listModelsNewKey();
