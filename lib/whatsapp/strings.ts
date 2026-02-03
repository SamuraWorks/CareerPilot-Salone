// Simple Krio greetings and phrases
export const KRIO = {
    welcome: "Kushe! Welcome to CareerPilot Salone Omni-Assistant. How a go hep you today?",
    menu: "Wetin you want make we check?",
    jobs: "Latest wok dem na Salone:",
    career: "Career advice for you:",
    error: "Ah nor understand dat one. Type *MENU* for see options.",
};

export const ENGLISH = {
    welcome: "Hello! Welcome to CareerPilot Salone Omni-Assistant. How can I guide your career today?",
    menu: "What would you like to explore?",
    jobs: "Latest job opportunities in Sierra Leone:",
    career: "Personalized career guidance:",
    error: "I didn't quite get that. Type *MENU* to see available commands.",
};

export function getMessage(key: keyof typeof KRIO, lang: 'en' | 'krio' = 'en') {
    return lang === 'krio' ? KRIO[key] : ENGLISH[key];
}

export const MENU_TEXT = `
🚀 *CareerPilot Salone*
Select an option or ask me any career question:

👉 *START* - Career Matching
👉 *JOBS* - Local Vacancies
👉 *SCHOLARSHIPS* - Funding
👉 *UNIVERSITIES* - Campuses
👉 *MENTORS* - Connect
👉 *ROADMAP* - Strategic Paths
👉 *CV* - Pro CV Builder

🌐 Type *KRIO* or *ENGLISH* for language settings.
`;
