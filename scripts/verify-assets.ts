import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, '/', file));
        }
    });

    return arrayOfFiles;
}

function checkMagicNumbers() {
    const allFiles = getAllFiles(PUBLIC_DIR);
    let issuesFound = 0;

    console.log(`Checking headers of ${allFiles.length} files...`);

    allFiles.forEach((fullPath) => {
        const ext = path.extname(fullPath).toLowerCase();
        if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

        try {
            const fd = fs.openSync(fullPath, 'r');
            const buffer = Buffer.alloc(4);
            fs.readSync(fd, buffer, 0, 4, 0);
            fs.closeSync(fd);

            const hex = buffer.toString('hex');

            // PDF Magic: 25 50 44 46 (%PDF)
            if (hex === '25504446') {
                console.error(`🚨 DETECTED PDF AS IMAGE: ${path.basename(fullPath)}`);
                issuesFound++;
            }

            // PNG Magic: 89 50 4E 47
            if (ext === '.png' && hex !== '89504e47') {
                // console.warn(`⚠️ Warning: ${path.basename(fullPath)} might not be a valid PNG (Hex: ${hex})`);
            }

            // JPG Magic: FF D8 FF ...
            if ((ext === '.jpg' || ext === '.jpeg') && !hex.startsWith('ffd8')) {
                // console.warn(`⚠️ Warning: ${path.basename(fullPath)} might not be a valid JPG (Hex: ${hex})`);
            }

        } catch (e) {
            console.error(`Error reading ${fullPath}:`, e);
        }
    });

    if (issuesFound === 0) {
        console.log("✅ No PDFs masquerading as images found.");
    } else {
        console.log(`❌ Found ${issuesFound} problematic files.`);
    }
}

checkMagicNumbers();
