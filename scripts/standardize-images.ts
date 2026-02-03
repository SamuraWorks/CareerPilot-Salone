import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

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

function standardizeAssets() {
    const allFiles = getAllFiles(PUBLIC_DIR);
    let renameCount = 0;

    console.log(`Scanning ${allFiles.length} files...`);

    allFiles.forEach((fullPath) => {
        const ext = path.extname(fullPath).toLowerCase();
        if (!IMAGE_EXTENSIONS.includes(ext)) return;

        const dir = path.dirname(fullPath);
        const filename = path.basename(fullPath);

        // Normalize: safe_filename.png
        const newFilename = filename
            .toLowerCase()
            .replace(/\s+/g, '_')   // Spaces to underscores
            .replace(/[^a-z0-9._-]/g, ''); // Remove weird method chars

        if (filename !== newFilename) {
            const newPath = path.join(dir, newFilename);

            // Prevent overwriting if destination exists (unless it's just casing)
            if (fs.existsSync(newPath) && fullPath.toLowerCase() !== newPath.toLowerCase()) {
                console.warn(`⚠️ SKIPPED: ${filename} -> ${newFilename} (Target exists)`);
            } else {
                fs.renameSync(fullPath, newPath);
                console.log(`✅ RENAMED: ${filename} -> ${newFilename}`);
                renameCount++;
            }
        }
    });

    console.log(`\n🎉 Total Renamed: ${renameCount}`);
}

standardizeAssets();
