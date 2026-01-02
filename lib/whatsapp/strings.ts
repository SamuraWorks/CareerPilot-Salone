
// Simple Krio greetings and phrases
export const KRIO = {
    welcome: "Kushe! Welcome to CareerPilot Salone. How a go hep you today?",
    menu: "Here na wetin a go do for you:",
    jobs: "Latest wok dem:",
    career: "Career advice:",
    error: "A nor understand dat. Try typing MENU.",
};

export const ENGLISH = {
    welcome: "Hello! Welcome to CareerPilot Salone.",
    menu: "Here is what I can do for you:",
    jobs: "Latest Jobs:",
    career: "Career Guidance:",
    error: "I didn't understand that. Type MENU to see options.",
};

export function getMessage(key: keyof typeof KRIO, lang: 'en' | 'krio' = 'en') {
    return lang === 'krio' ? KRIO[key] : ENGLISH[key];
}

export const MENU_TEXT = `
🤖 *CareerPilot Salone Bot*

Type a keyword:
📌 *CAREER* - Get career advice
📌 *JOBS* - See latest jobs
📌 *CV* - CV tips and builder
📌 *SCHOLARSHIP* - Find scholarships
📌 *MENTOR* - Find a mentor
📌 *LEARN* - Skill courses

_Type 'Krio' to switch language._
`;
