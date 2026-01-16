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
🚀 *CareerPilot Salone: Omni-Assistant*
Your premium AI guide to success in Sierra Leone. 🇸🇱

Type a keyword to begin:
👉 *START* - Career Match Quiz
👉 *JOBS* - Latest Opportunities 💼
👉 *SCHOLARSHIPS* - Funding for You 🎓
👉 *UNIVERSITIES* - Top Institutions 🏛️
👉 *MENTORS* - Connect with Experts 🤝
👉 *ROADMAP* - Career Pathways 🗺️
👉 *CV* - Pro CV Builder 📄
👉 *ABOUT* - Our Mission 🏢

🌐 _Type 'KRIO' or 'ENGLISH' to change language._
💡 _Type 'RESET' to clear your session._
`;
