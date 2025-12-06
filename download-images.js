const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = 'public/images/universities';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const images = [
    { url: "https://upload.wikimedia.org/wikipedia/en/8/87/Fourah_Bay_College_Crest.jpg", path: "public/images/universities/fbc.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/en/e/e6/Njala_University_logo.jpeg", path: "public/images/universities/njala.jpg" },
    { url: "https://unimak.edu.sl/wp-content/uploads/2021/04/cropped-unimak-logo.png", path: "public/images/universities/unimak.png" },
    { url: "https://www.limkokwing.net/graphics/common/logo_limkokwing.png", path: "public/images/universities/limkokwing.png" },
    { url: "https://usl.edu.sl/wp-content/uploads/2021/06/IPAM-LOGO.png", path: "public/images/universities/ipam.png" }
];

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            }
        };

        const request = https.get(url, options, (response) => {
            // Handle redirects manually if needed, though https.get follows by default in some versions, but better safe
            if (response.statusCode === 301 || response.statusCode === 302) {
                return download(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                console.error(`Failed to download ${url}: Status Code ${response.statusCode}`);
                file.close();
                fs.unlink(dest, () => { }); // Delete partial file
                reject(new Error(`Status ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        });

        request.on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });

        request.setTimeout(15000, () => {
            request.destroy();
            reject(new Error('Request timed out'));
        });
    });
};

async function run() {
    for (const img of images) {
        try {
            console.log(`Downloading ${img.url}...`);
            await download(img.url, img.path);
            console.log(`Saved to ${img.path}`);
        } catch (e) {
            console.error(`Failed to download ${img.url}: ${e.message}`);
        }
    }
}

run();
