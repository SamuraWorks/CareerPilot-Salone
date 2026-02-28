const fs = require('fs');
const path = require('path');

const targetDirs = [
    path.join(__dirname, '../app'),
    path.join(__dirname, '../components')
];

const profileProps = ['profile', 'isProfileLoading', 'updateProfile', 'refreshProfile', 'completeOnboarding'];

function getFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getFiles(fullPath, fileList);
        } else {
            if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
                fileList.push(fullPath);
            }
        }
    }
    return fileList;
}

let allFiles = [];
targetDirs.forEach(dir => {
    allFiles = allFiles.concat(getFiles(dir));
});

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // We are looking for something like:
    // const { user, profile, isLoading, updateProfile } = useAuth()

    const authRegex = /const\s+\{([^}]+)\}\s*=\s*useAuth\(\)/g;

    content = content.replace(authRegex, (match, inner) => {
        // inner is the destructured part e.g. " user, profile, isLoading "
        const tokens = inner.split(',').map(s => s.trim()).filter(Boolean);

        const authTokens = [];
        const profileTokens = [];

        tokens.forEach(tok => {
            // Sometimes it's aliased: `profile: userProfile`
            const baseToken = tok.split(':')[0].trim();
            if (profileProps.includes(baseToken)) {
                profileTokens.push(tok);
            } else {
                // isLoading in useAuth was renamed to isLoadingAuth
                if (baseToken === 'isLoading') {
                    authTokens.push(tok.replace('isLoading', 'isLoadingAuth'));
                } else {
                    authTokens.push(tok);
                }
            }
        });

        if (profileTokens.length === 0) {
            // Only auth tokens (or maybe renamed isLoading)
            return `const { ${authTokens.join(', ')} } = useAuth()`;
        }

        changed = true;

        let replacement = '';
        if (authTokens.length > 0) {
            replacement += `const { ${authTokens.join(', ')} } = useAuth()\n  `;
        }
        replacement += `const { ${profileTokens.join(', ')} } = useProfile()`;

        return replacement;
    });

    if (changed) {
        // Ensure useProfile is imported
        if (!content.includes('import { useProfile }')) {
            // Find useAuth import and put it next to it
            const importRegex = /import\s+\{.*useAuth.*\}\s+from\s+['"]@\/lib\/auth-context['"];?/g;
            content = content.replace(importRegex, match => {
                return `${match}\nimport { useProfile } from "@/lib/profile-context"`;
            });
        }

        // Special Case: `isLoading` was frequently used for both. If it was used in the component before,
        // we might need to change it. We renamed it to `isLoadingAuth`.
        content = content.replace(/!isLoading/g, '!isLoadingAuth');
        content = content.replace(/\bisLoading\b/g, 'isLoadingAuth');

        // Fix instances where people used "profile?" but now "profile" could technically be null

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Refactored: ${file}`);
    }
});
