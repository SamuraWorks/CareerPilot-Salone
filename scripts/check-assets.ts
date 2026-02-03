
import fs from 'fs';
import path from 'path';
import { SIERRA_LEONE_CAREERS } from '../lib/career-data';
import { MOCK_UNIVERSITIES } from '../lib/db';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

function checkFile(url: string | undefined, category: string): boolean {
    if (!url) {
        console.error(`[MISSING] ${category}: URL is undefined`);
        return false;
    }

    // Ensure it starts with /images/ or /
    const cleanPath = url.startsWith('/') ? url.slice(1) : url;
    const fullPath = path.join(PUBLIC_DIR, cleanPath);

    if (fs.existsSync(fullPath)) {
        console.log(`[OK] ${category}: ${url}`);
        return true;
    } else {
        console.error(`[ERROR] ${category}: ${url} (File not found at ${fullPath})`);
        return false;
    }
}

console.log('--- Checking Career Images ---');
let missingCareers = 0;
SIERRA_LEONE_CAREERS.forEach(career => {
    if (!checkFile(career.image, `Career: ${career.title}`)) {
        missingCareers++;
    }
});

console.log('\n--- Checking University Images & Logos ---');
let missingUniversities = 0;
MOCK_UNIVERSITIES.forEach(uni => {
    if (!checkFile(uni.image_url, `Uni Image: ${uni.name}`)) {
        missingUniversities++;
    }
    if (!checkFile(uni.logo_url, `Uni Logo: ${uni.name}`)) {
        missingUniversities++;
    }
});

console.log('\n--- Summary ---');
console.log(`Missing Career Images: ${missingCareers}`);
console.log(`Missing University Assets: ${missingUniversities}`);

if (missingCareers > 0 || missingUniversities > 0) {
    process.exit(1);
} else {
    console.log('All verified assets exist.');
}
