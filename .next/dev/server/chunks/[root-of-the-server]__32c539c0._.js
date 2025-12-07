module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/ai/geminiClient.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateCareerReply",
    ()=>generateCareerReply
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/@ai-sdk/openai/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/ai/dist/index.mjs [app-route] (ecmascript) <locals>");
;
;
;
// ------------------------------------------------------------------
// CONFIGURATION
// ------------------------------------------------------------------
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_KEY;
async function generateCareerReply({ messages, context, modelName = 'gemini-1.5-flash' }) {
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    // Construct a rich system prompt with context
    const systemPrompt = `You are CareerPilot, an expert Career Advisor for Sierra Leone.

CONTEXT DATA:
${context || "No specific user context provided."}

YOUR ROLE:
- Give practical, actionable advice for students and job seekers in Sierra Leone.
- Be encouraging but realistic about the local job market (Freetown, Bo, Kenema, etc.).
- Structure answers clearly: bullet points, bold text for emphasis.
- If asked about salaries, quote ranges in Sierra Leonean Leones (SLE/SLL) if known, or generic ranges.
- Mention local universities (FBC, Njala, UNIMAK) and technical institutes (GTIs) where relevant.

FORMAT:
- Keep responses concise (under 200 words unless detailed explanation is requested).
- Use Markdown for formatting.`;
    // 1. Try Gemini (Primary)
    if (GEMINI_API_KEY) {
        try {
            console.log(`[AI] Calling Google Gemini (${modelName})...`);
            const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({
                model: modelName
            });
            // Convert messages to Gemini format (simplification: chat session)
            // For REST simplicity, we'll just prompt with the history + latest message
            // or usage of chat.sendMessage if we were maintaining a session object.
            // Here, we use a constructed prompt for statelessness or the simple generateContent.
            const prompt = `${systemPrompt}\n\nUSER CHAT HISTORY:\n${messages.map((m)=>`${m.role.toUpperCase()}: ${m.content}`).join('\n')}\n\nASSISTANT:`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            return {
                text,
                raw: result,
                provider: 'gemini'
            };
        } catch (error) {
            console.error("[AI] Gemini Error:", error.message);
        // Fall through to OpenAI or Fallback
        }
    }
    // 2. Try OpenAI (Fallback)
    if (OPENAI_API_KEY) {
        try {
            console.log(`[AI] Falling back to OpenAI...`);
            const openai = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createOpenAI"])({
                apiKey: OPENAI_API_KEY
            });
            const { text, response } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateText"])({
                model: openai('gpt-4o-mini'),
                system: systemPrompt,
                messages: messages
            });
            return {
                text,
                raw: response,
                provider: 'openai'
            };
        } catch (error) {
            console.error("[AI] OpenAI Error:", error.message);
        }
    }
    // 3. Return Error (or could use local logic here if desired)
    throw new Error("All AI providers failed. Please check your internet connection or API keys.");
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/career-data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Sierra Leone Career Knowledge Base
// Comprehensive data for local AI fallback system
__turbopack_context__.s([
    "CAREER_CATEGORIES",
    ()=>CAREER_CATEGORIES,
    "ONLINE_RESOURCES",
    ()=>ONLINE_RESOURCES,
    "SIERRA_LEONE_CAREERS",
    ()=>SIERRA_LEONE_CAREERS,
    "UNIVERSITIES",
    ()=>UNIVERSITIES
]);
const SIERRA_LEONE_CAREERS = [
    {
        title: "Software Developer",
        industry: "Technology",
        description: "Design, develop, and maintain software applications and systems",
        salaryRange: "$150 - $400/month",
        salaryUSD: "Le 3,000,000 - Le 8,000,000/month",
        demand: "High",
        requiredEducation: [
            "Computer Science degree",
            "Self-taught with portfolio",
            "Coding bootcamp"
        ],
        requiredSkills: [
            "JavaScript",
            "Python",
            "Problem-solving",
            "Git",
            "Web development"
        ],
        localInstitutions: [
            "Fourah Bay College",
            "IPAM",
            "Njala University",
            "Online platforms (freeCodeCamp, Codecademy)"
        ],
        growthPotential: "Excellent - Tech sector growing rapidly in Freetown",
        keywords: [
            "coding",
            "programming",
            "tech",
            "software",
            "developer",
            "web",
            "app"
        ]
    },
    {
        title: "Nurse/Healthcare Worker",
        industry: "Healthcare",
        description: "Provide patient care, administer medications, and support medical teams",
        salaryRange: "$125 - $300/month",
        salaryUSD: "Le 2,500,000 - Le 6,000,000/month",
        demand: "High",
        requiredEducation: [
            "Nursing diploma/degree",
            "Medical training certificate"
        ],
        requiredSkills: [
            "Patient care",
            "Medical knowledge",
            "Communication",
            "Empathy",
            "Emergency response"
        ],
        localInstitutions: [
            "College of Medicine and Allied Health Sciences",
            "Njala University",
            "Holy Spirit Hospital School of Nursing"
        ],
        growthPotential: "Very high - Healthcare infrastructure expanding",
        keywords: [
            "nurse",
            "healthcare",
            "medical",
            "doctor",
            "health",
            "patient",
            "hospital"
        ]
    },
    {
        title: "Agricultural Officer",
        industry: "Agriculture",
        description: "Manage farming operations, improve crop yields, and advise farmers",
        salaryRange: "$100 - $250/month",
        salaryUSD: "Le 2,000,000 - Le 5,000,000/month",
        demand: "High",
        requiredEducation: [
            "Agriculture degree",
            "Agronomy certificate"
        ],
        requiredSkills: [
            "Crop management",
            "Soil science",
            "Pest control",
            "Farm planning",
            "Extension services"
        ],
        localInstitutions: [
            "Njala University",
            "Sierra Leone Agricultural Research Institute"
        ],
        growthPotential: "Excellent - Agriculture is 60% of economy",
        keywords: [
            "farming",
            "agriculture",
            "crops",
            "agric",
            "farmer",
            "food",
            "cultivation"
        ]
    },
    {
        title: "Teacher/Educator",
        industry: "Education",
        description: "Educate students, develop curriculum, and foster learning environments",
        salaryRange: "$90 - $225/month",
        salaryUSD: "Le 1,800,000 - Le 4,500,000/month",
        demand: "High",
        requiredEducation: [
            "Teaching certificate",
            "Education degree",
            "Subject specialization"
        ],
        requiredSkills: [
            "Communication",
            "Patience",
            "Curriculum development",
            "Classroom management"
        ],
        localInstitutions: [
            "Fourah Bay College",
            "Milton Margai College of Education",
            "Eastern Polytechnic"
        ],
        growthPotential: "Good - Free Quality Education initiative expanding",
        keywords: [
            "teacher",
            "education",
            "teaching",
            "school",
            "classroom",
            "tutor",
            "lecturer"
        ]
    },
    {
        title: "Mining Engineer",
        industry: "Mining",
        description: "Plan and oversee mining operations, ensure safety and efficiency",
        salaryRange: "$250 - $600/month",
        salaryUSD: "Le 5,000,000 - Le 12,000,000/month",
        demand: "High",
        requiredEducation: [
            "Mining engineering degree",
            "Geology degree"
        ],
        requiredSkills: [
            "Geological analysis",
            "Safety protocols",
            "Equipment operation",
            "Project management"
        ],
        localInstitutions: [
            "Fourah Bay College",
            "Njala University",
            "International training programs"
        ],
        growthPotential: "Excellent - Mining is major economic sector",
        keywords: [
            "mining",
            "engineer",
            "geology",
            "minerals",
            "extraction",
            "diamonds",
            "gold"
        ]
    },
    {
        title: "Accountant",
        industry: "Finance",
        description: "Manage financial records, prepare reports, and ensure compliance",
        salaryRange: "$150 - $350/month",
        salaryUSD: "Le 3,000,000 - Le 7,000,000/month",
        demand: "Medium",
        requiredEducation: [
            "Accounting degree",
            "ACCA/CPA certification"
        ],
        requiredSkills: [
            "Financial analysis",
            "Bookkeeping",
            "Tax preparation",
            "Excel",
            "Attention to detail"
        ],
        localInstitutions: [
            "IPAM",
            "Fourah Bay College",
            "University of Makeni"
        ],
        growthPotential: "Good - Every business needs accountants",
        keywords: [
            "accounting",
            "finance",
            "bookkeeping",
            "financial",
            "accountant",
            "money",
            "budget"
        ]
    },
    {
        title: "Civil Engineer",
        industry: "Engineering",
        description: "Design and supervise construction of infrastructure projects",
        salaryRange: "$200 - $500/month",
        salaryUSD: "Le 4,000,000 - Le 10,000,000/month",
        demand: "High",
        requiredEducation: [
            "Civil engineering degree"
        ],
        requiredSkills: [
            "AutoCAD",
            "Structural design",
            "Project management",
            "Construction knowledge"
        ],
        localInstitutions: [
            "Fourah Bay College",
            "Njala University",
            "COMAHS"
        ],
        growthPotential: "Excellent - Infrastructure development ongoing",
        keywords: [
            "civil",
            "engineer",
            "construction",
            "building",
            "infrastructure",
            "roads",
            "bridges"
        ]
    },
    {
        title: "Marketing Manager",
        industry: "Business",
        description: "Develop marketing strategies, manage campaigns, and drive sales",
        salaryRange: "$175 - $400/month",
        salaryUSD: "Le 3,500,000 - Le 8,000,000/month",
        demand: "Medium",
        requiredEducation: [
            "Marketing degree",
            "Business administration"
        ],
        requiredSkills: [
            "Digital marketing",
            "Social media",
            "Brand management",
            "Communication",
            "Analytics"
        ],
        localInstitutions: [
            "IPAM",
            "Fourah Bay College",
            "University of Makeni"
        ],
        growthPotential: "Good - Growing business sector",
        keywords: [
            "marketing",
            "business",
            "sales",
            "advertising",
            "promotion",
            "brand",
            "digital"
        ]
    },
    {
        title: "Telecommunications Technician",
        industry: "Technology",
        description: "Install, maintain, and repair telecommunications equipment",
        salaryRange: "$125 - $300/month",
        salaryUSD: "Le 2,500,000 - Le 6,000,000/month",
        demand: "High",
        requiredEducation: [
            "Technical diploma",
            "Electronics certificate"
        ],
        requiredSkills: [
            "Network installation",
            "Troubleshooting",
            "Electronics",
            "Customer service"
        ],
        localInstitutions: [
            "Eastern Polytechnic",
            "Technical institutes",
            "On-the-job training"
        ],
        growthPotential: "Very high - Mobile/internet expansion",
        keywords: [
            "telecom",
            "telecommunications",
            "network",
            "phone",
            "internet",
            "technician",
            "mobile"
        ]
    },
    {
        title: "NGO Program Officer",
        industry: "Non-Profit",
        description: "Manage development programs, coordinate projects, and support communities",
        salaryRange: "$150 - $375/month",
        salaryUSD: "Le 3,000,000 - Le 7,500,000/month",
        demand: "Medium",
        requiredEducation: [
            "Development studies",
            "Social sciences degree",
            "Public health"
        ],
        requiredSkills: [
            "Project management",
            "Community engagement",
            "Report writing",
            "Grant writing"
        ],
        localInstitutions: [
            "Fourah Bay College",
            "Njala University",
            "IPAM"
        ],
        growthPotential: "Good - Active NGO sector",
        keywords: [
            "ngo",
            "development",
            "nonprofit",
            "community",
            "social",
            "humanitarian",
            "aid"
        ]
    },
    {
        title: "Electrician",
        industry: "Skilled Trade",
        description: "Install and maintain electrical systems in buildings and facilities",
        salaryRange: "$100 - $275/month",
        salaryUSD: "Le 2,000,000 - Le 5,500,000/month",
        demand: "High",
        requiredEducation: [
            "Technical training",
            "Apprenticeship",
            "Electrical certificate"
        ],
        requiredSkills: [
            "Wiring",
            "Safety protocols",
            "Troubleshooting",
            "Blueprint reading"
        ],
        localInstitutions: [
            "Eastern Polytechnic",
            "Technical institutes",
            "Trade schools"
        ],
        growthPotential: "Very good - Construction boom in Freetown",
        keywords: [
            "electrician",
            "electrical",
            "wiring",
            "power",
            "electricity",
            "trade",
            "technician"
        ]
    },
    {
        title: "Journalist/Media Professional",
        industry: "Media",
        description: "Report news, create content, and inform the public",
        salaryRange: "$100 - $250/month",
        salaryUSD: "Le 2,000,000 - Le 5,000,000/month",
        demand: "Medium",
        requiredEducation: [
            "Journalism degree",
            "Mass communication"
        ],
        requiredSkills: [
            "Writing",
            "Research",
            "Interviewing",
            "Video editing",
            "Social media"
        ],
        localInstitutions: [
            "Fourah Bay College",
            "IPAM",
            "Media training centers"
        ],
        growthPotential: "Good - Growing media landscape",
        keywords: [
            "journalist",
            "media",
            "news",
            "reporter",
            "writing",
            "broadcasting",
            "communication"
        ]
    }
];
const CAREER_CATEGORIES = {
    technology: [
        "Software Developer",
        "Telecommunications Technician"
    ],
    healthcare: [
        "Nurse/Healthcare Worker"
    ],
    agriculture: [
        "Agricultural Officer"
    ],
    education: [
        "Teacher/Educator"
    ],
    mining: [
        "Mining Engineer"
    ],
    finance: [
        "Accountant"
    ],
    engineering: [
        "Civil Engineer"
    ],
    business: [
        "Marketing Manager"
    ],
    nonprofit: [
        "NGO Program Officer"
    ],
    trades: [
        "Electrician"
    ],
    media: [
        "Journalist/Media Professional"
    ]
};
const UNIVERSITIES = [
    "Fourah Bay College (FBC)",
    "Njala University",
    "University of Makeni (UNIMAK)",
    "Institute of Public Administration and Management (IPAM)",
    "Eastern Polytechnic",
    "Milton Margai College of Education",
    "College of Medicine and Allied Health Sciences (COMAHS)"
];
const ONLINE_RESOURCES = [
    "freeCodeCamp (coding)",
    "Coursera (various subjects)",
    "Khan Academy (math, science)",
    "edX (university courses)",
    "YouTube tutorials",
    "Codecademy (programming)",
    "Udemy (affordable courses)",
    "Google Digital Skills"
];
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/faq-database.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Comprehensive FAQ Database for Career Pilot Salone
// Complete knowledge base covering ALL possible user questions
__turbopack_context__.s([
    "COMPREHENSIVE_FAQ",
    ()=>COMPREHENSIVE_FAQ,
    "findBestAnswer",
    ()=>findBestAnswer,
    "getAllCategories",
    ()=>getAllCategories,
    "getFAQsByCategory",
    ()=>getFAQsByCategory
]);
const COMPREHENSIVE_FAQ = [
    // ========== APP FUNCTIONALITY ==========
    {
        question: "What is Career Pilot Salone?",
        answer: `Career Pilot Salone is Sierra Leone's first AI-powered career guidance platform. We help students and job seekers:

• Discover suitable career paths through our aptitude test
• Get personalized 3-month career roadmaps
• Find universities and courses in Sierra Leone
• Access scholarship opportunities
• Connect with mentors
• Build professional CVs
• Get AI-powered career advice

Everything is tailored specifically for Sierra Leone's job market and educational system.`,
        keywords: [
            'what is',
            'about',
            'platform',
            'career pilot',
            'app'
        ],
        category: 'app'
    },
    {
        question: "How do I use the aptitude test?",
        answer: `Our Aptitude Test helps you discover careers that match your interests and skills:

**Steps:**
1. Go to the "Aptitude Test" page from the menu
2. Answer 10 questions about your interests, skills, and preferences
3. Submit your answers
4. Get instant results with 3 personalized career recommendations
5. Each recommendation shows:
   - Match percentage
   - Why it fits you
   - Salary range in USD
   - Demand level in Sierra Leone

The test takes about 5 minutes and uses AI to analyze your responses!`,
        keywords: [
            'aptitude test',
            'quiz',
            'career test',
            'how to use',
            'take test'
        ],
        category: 'app'
    },
    {
        question: "How do I generate a career roadmap?",
        answer: `Get a personalized 3-month plan to start any career:

**Steps:**
1. Visit the "Roadmap" page
2. Enter your desired career (e.g., "Software Developer", "Nurse", "Teacher")
3. Click "Generate Plan"
4. Receive a detailed roadmap with:
   - Month 1: Foundation & Learning
   - Month 2: Skill Development & Practice
   - Month 3+: Job Search & Networking
   
Each phase includes specific action steps, resources, and local institutions in Sierra Leone.

You can download your roadmap as PDF and regenerate for different careers!`,
        keywords: [
            'roadmap',
            'career plan',
            'how to',
            'generate',
            '3 month'
        ],
        category: 'app'
    },
    {
        question: "How does the AI career guidance work?",
        answer: `Our AI Career Counselor provides instant, personalized advice:

**What it can help with:**
• Career exploration and recommendations
• University and course information
• Salary expectations in Sierra Leone
• Scholarship opportunities
• How to start any career
• Education requirements
• Skills needed for jobs

**How to use:**
1. Go to "AI Guidance" page
2. Type your question in plain English
3. Get instant, detailed responses
4. Ask follow-up questions anytime

The AI knows about Sierra Leone's job market, universities, and local opportunities!`,
        keywords: [
            'ai guidance',
            'chat',
            'ask questions',
            'career counselor',
            'how does it work'
        ],
        category: 'app'
    },
    {
        question: "How do I find scholarships?",
        answer: `Access scholarship opportunities through our platform:

**Steps:**
1. Visit the "Opportunities" page from the menu
2. Browse available scholarships
3. Filter by:
   - Amount
   - Deadline
   - Field of study
   - Level (undergraduate, graduate)

**Scholarship Types Available:**
• Government scholarships (TVET, teaching)
• International scholarships (Chevening, Commonwealth)
• University merit-based awards
• NGO education support

Each listing shows eligibility requirements, application deadlines, and how to apply.`,
        keywords: [
            'scholarship',
            'funding',
            'financial aid',
            'how to find',
            'opportunities'
        ],
        category: 'scholarship'
    },
    {
        question: "Can I connect with mentors?",
        answer: `Yes! Our Mentorship feature connects you with professionals:

**How it works:**
1. Go to "Mentorship" page
2. Browse mentors by industry:
   - Technology
   - Healthcare
   - Engineering
   - Business
   - Education
3. View mentor profiles showing:
   - Expertise and experience
   - Current position
   - Areas they can help with
4. Request mentorship connection

Mentors provide guidance, answer questions, and share career insights specific to Sierra Leone.`,
        keywords: [
            'mentor',
            'mentorship',
            'connect',
            'professional',
            'guidance'
        ],
        category: 'app'
    },
    {
        question: "How do I build my CV?",
        answer: `Use our CV Builder to create professional resumes:

**Features:**
• Pre-designed templates optimized for Sierra Leone employers
• Step-by-step guidance
• Sections for:
  - Personal information
  - Education
  - Work experience
  - Skills
  - References

**Steps:**
1. Go to "CV Builder" page
2. Fill in your information
3. Choose a template
4. Preview your CV
5. Download as PDF

Tips are provided for each section to help you stand out!`,
        keywords: [
            'cv',
            'resume',
            'build cv',
            'cv builder',
            'create resume'
        ],
        category: 'app'
    },
    // ========== CAREER EXPLORATION ==========
    {
        question: "What careers are in high demand in Sierra Leone?",
        answer: `**High-Demand Careers in Sierra Leone (2024):**

**Technology:**
• Software Developer ($150-400/month)
• IT Support Specialist ($120-300/month)
• Data Analyst ($180-350/month)

**Healthcare:**
• Nurse ($125-300/month)
• Medical Doctor ($250-750/month)
• Lab Technician ($100-250/month)

**Engineering:**
• Civil Engineer ($200-500/month)
• Electrical Engineer ($180-450/month)
• Mining Engineer ($250-600/month)

**Business:**
• Accountant ($150-350/month)
• Marketing Manager ($175-400/month)
• Business Analyst ($160-380/month)

**Agriculture:**
• Agricultural Officer ($120-280/month)
• Agribusiness Manager ($140-320/month)

These careers have strong growth potential and good opportunities in Freetown and other cities.`,
        keywords: [
            'high demand',
            'best careers',
            'in demand',
            'popular jobs',
            'what careers'
        ],
        category: 'career'
    },
    {
        question: "How do I become a software developer?",
        answer: `**Path to Software Developer in Sierra Leone:**

**Education Options:**
1. Computer Science degree at FBC, Njala, or IPAM (4 years)
2. Self-taught through online platforms (6-12 months)
3. Coding bootcamp (3-6 months)

**Required Skills:**
• JavaScript, Python, or Java
• Web development (HTML, CSS)
• Problem-solving
• Git version control
• Database basics

**Step-by-Step Plan:**
**Month 1:** Learn basics via freeCodeCamp or Codecademy
**Month 2:** Build 3-5 personal projects
**Month 3:** Apply for internships, join tech communities in Freetown

**Where to Study:**
• Fourah Bay College (Computer Science)
• IPAM (IT programs)
• Online: freeCodeCamp, Codecademy, YouTube

**Salary:** $150-400/month (entry to mid-level)
**Demand:** HIGH - Tech sector growing rapidly`,
        keywords: [
            'software developer',
            'programmer',
            'coding',
            'how to become',
            'tech career'
        ],
        category: 'career'
    },
    {
        question: "How do I become a nurse?",
        answer: `**Path to Nursing in Sierra Leone:**

**Education Required:**
• Nursing Diploma (3 years) or Degree (4 years)
• Must attend accredited nursing school

**Where to Study:**
• College of Medicine and Allied Health Sciences (COMAHS)
• Holy Spirit Hospital School of Nursing
• Connaught Hospital School of Nursing
• Makeni Government Hospital School of Nursing

**Requirements:**
• WASSCE with credits in Biology, Chemistry, English
• Pass entrance exam
• Medical fitness certificate

**Career Path:**
1. Complete nursing program (3-4 years)
2. Pass licensing exam
3. Register with Nurses and Midwives Board
4. Start as Staff Nurse
5. Specialize (optional): Pediatrics, Surgery, ICU

**Salary:** $125-300/month
**Demand:** HIGH - Healthcare sector needs more nurses
**Growth:** Excellent - can advance to Nursing Officer, Matron`,
        keywords: [
            'nurse',
            'nursing',
            'healthcare',
            'medical',
            'how to become'
        ],
        category: 'career'
    },
    {
        question: "What careers can I pursue with a business degree?",
        answer: `**Careers with Business Degree in Sierra Leone:**

**Accounting & Finance:**
• Accountant ($150-350/month)
• Financial Analyst ($160-380/month)
• Auditor ($140-320/month)
• Tax Consultant ($150-350/month)

**Management:**
• Business Manager ($180-400/month)
• Operations Manager ($170-390/month)
• Project Manager ($175-420/month)

**Marketing & Sales:**
• Marketing Manager ($175-400/month)
• Sales Manager ($160-380/month)
• Brand Manager ($170-390/month)

**Banking:**
• Bank Officer ($150-350/month)
• Loan Officer ($140-320/month)
• Branch Manager ($200-500/month)

**Entrepreneurship:**
• Start your own business
• Import/Export
• Retail
• Services

**Where to Study:**
• IPAM (Institute of Public Administration and Management)
• Fourah Bay College
• University of Makeni
• Njala University`,
        keywords: [
            'business degree',
            'business careers',
            'management',
            'accounting',
            'what can i do'
        ],
        category: 'career'
    },
    {
        question: "What engineering careers are available?",
        answer: `**Engineering Careers in Sierra Leone:**

**Civil Engineering:**
• Salary: $200-500/month
• Work: Construction, infrastructure, roads, buildings
• Demand: HIGH - Infrastructure development ongoing

**Electrical Engineering:**
• Salary: $180-450/month
• Work: Power systems, electrical installations
• Demand: HIGH - Energy sector growing

**Mining Engineering:**
• Salary: $250-600/month
• Work: Mining operations, mineral extraction
• Demand: HIGH - Mining is major industry

**Mechanical Engineering:**
• Salary: $190-460/month
• Work: Machinery, manufacturing, maintenance
• Demand: MEDIUM

**Agricultural Engineering:**
• Salary: $170-400/month
• Work: Farm equipment, irrigation, processing
• Demand: MEDIUM - Agriculture sector important

**Where to Study:**
• Njala University (Strong engineering programs)
• Fourah Bay College
• IPAM (Some technical programs)

**Requirements:**
• Strong math and physics background
• WASSCE with credits in Math, Physics, Chemistry
• 4-5 year degree program`,
        keywords: [
            'engineering',
            'engineer',
            'civil',
            'electrical',
            'mining',
            'mechanical'
        ],
        category: 'career'
    },
    // ========== EDUCATION & UNIVERSITIES ==========
    {
        question: "What universities are in Sierra Leone?",
        answer: `**Major Universities in Sierra Leone:**

**Fourah Bay College (FBC) - Freetown**
• Oldest university in West Africa (1827)
• Programs: Law, Humanities, Social Sciences, Pure Sciences
• Highly respected, competitive admission

**Njala University - Bo & Njala**
• Strong in: Agriculture, Engineering, Education
• Two campuses (Bo and Njala)
• Practical, hands-on programs

**University of Makeni (UNIMAK) - Makeni**
• Programs: Business, IT, Education, Health Sciences
• Modern facilities
• Growing reputation

**Institute of Public Administration & Management (IPAM) - Freetown**
• Specializes in: Business, Management, Accounting, IT
• Professional focus
• Strong industry connections

**College of Medicine & Allied Health Sciences (COMAHS) - Freetown**
• Medical programs: Medicine, Nursing, Pharmacy, Lab Sciences
• Part of University of Sierra Leone
• Premier health education institution

**Eastern Polytechnic - Kenema**
• Technical and vocational programs
• Engineering, IT, Business

**Entrance Requirements:**
• WASSCE with 5 credits (including English & Math)
• Pass university entrance exam
• Application fees vary by institution`,
        keywords: [
            'universities',
            'colleges',
            'schools',
            'where to study',
            'sierra leone universities'
        ],
        category: 'education'
    },
    {
        question: "What are the admission requirements for universities?",
        answer: `**General University Admission Requirements:**

**Academic Requirements:**
• WASSCE with minimum 5 credits
• Must include English Language and Mathematics
• Specific subjects required for specific programs:
  - Sciences: Biology, Chemistry, Physics
  - Business: Economics, Commerce
  - Engineering: Math, Physics, Chemistry

**Entrance Exam:**
• Most universities require entrance examination
• Tests: English, Math, General Knowledge
• Some programs have additional tests

**Application Process:**
1. Obtain application form (online or in-person)
2. Submit WASSCE results
3. Pay application fee (varies: Le 100,000 - 300,000)
4. Take entrance exam
5. Attend interview (some programs)
6. Wait for admission list

**Program-Specific Requirements:**

**Medicine:**
• WASSCE: Biology, Chemistry, Physics (all credits)
• Very competitive
• May require additional science exam

**Engineering:**
• Strong Math and Physics required
• Chemistry recommended

**Business:**
• Economics or Commerce helpful
• Math required

**Tips:**
• Apply early (deadlines usually June-July)
• Prepare well for entrance exam
• Have backup university choices
• Consider foundation programs if you don't meet requirements`,
        keywords: [
            'admission',
            'requirements',
            'how to apply',
            'university entrance',
            'wassce'
        ],
        category: 'education'
    },
    {
        question: "Can I study online or take online courses?",
        answer: `**Yes! Online Learning Options for Sierra Leone Students:**

**Free Online Platforms:**

**Technology & Programming:**
• freeCodeCamp - Web development (100% free)
• Codecademy - Programming basics
• YouTube - Countless tutorials
• Khan Academy - Computer science

**Business & Finance:**
• Google Digital Skills - Marketing, business
• Coursera - Business courses (audit for free)
• edX - Business fundamentals

**General Education:**
• Khan Academy - Math, Science, Economics
• MIT OpenCourseWare - University-level courses
• Coursera - Various subjects

**Professional Certificates:**
• Google Career Certificates (IT, Data, Project Management)
• Microsoft Learn - IT certifications
• HubSpot Academy - Marketing

**Tips for Online Learning in Sierra Leone:**
• Download videos when you have good internet
• Use offline resources (PDFs, downloaded content)
• Join study groups for accountability
• Many courses work on mobile phones
• Libraries in Freetown have internet access

**Combining Online + Local:**
• Use online courses to supplement university education
• Build skills while job searching
• Prepare for university entrance
• Learn new skills for career change

**Cost:** Most platforms offer free courses; certificates cost $30-300`,
        keywords: [
            'online courses',
            'online learning',
            'free courses',
            'study online',
            'internet'
        ],
        category: 'education'
    },
    // ========== SALARY & COMPENSATION ==========
    {
        question: "What are typical salaries in Sierra Leone?",
        answer: `**Monthly Salary Ranges in Sierra Leone (2024 - USD):**

**Entry-Level (0-2 years):**
• Office Assistant: $80-150
• Teacher (Primary): $90-180
• Nurse (Staff): $125-200
• IT Support: $120-220
• Accountant (Junior): $150-250

**Mid-Level (3-7 years):**
• Teacher (Secondary): $150-250
• Nurse (Senior): $200-300
• Software Developer: $200-350
• Civil Engineer: $250-400
• Accountant: $200-300
• Marketing Manager: $220-350

**Senior-Level (8+ years):**
• University Lecturer: $250-450
• Medical Doctor: $350-750
• Senior Engineer: $350-600
• Bank Manager: $300-600
• IT Manager: $300-500

**Factors Affecting Salary:**
• Location (Freetown pays more than provinces)
• Employer type (International NGOs pay highest, then private sector, then government)
• Experience and qualifications
• Industry (Mining, Banking, Tech pay well)
• Additional certifications

**Note:** Salaries are higher for those with:
• International certifications
• Advanced degrees (Masters, PhD)
• Specialized skills
• Bilingual abilities (English + French/Arabic)`,
        keywords: [
            'salary',
            'pay',
            'earn',
            'income',
            'how much',
            'wages'
        ],
        category: 'salary'
    },
    {
        question: "Do government jobs pay well?",
        answer: `**Government Salaries in Sierra Leone:**

**Reality Check:**
Government jobs typically pay LESS than private sector or NGOs, but offer other benefits:

**Advantages:**
• Job security (hard to be fired)
• Pension benefits
• Health insurance
• Predictable schedule
• Respect and status

**Typical Government Salaries:**
• Junior Civil Servant: $100-180/month
• Teacher (Government School): $90-200/month
• Nurse (Government Hospital): $125-250/month
• Mid-level Officer: $180-300/month
• Senior Officer: $250-400/month

**Higher-Paying Government Positions:**
• University Lecturer: $250-450/month
• Medical Doctor (Government): $300-600/month
• Director-level: $400-700/month

**Comparison:**
• NGO/International: 30-50% higher than government
• Private Sector: 20-40% higher than government
• Mining/Banking: 50-100% higher than government

**Recommendation:**
• Start in government for experience and stability
• Gain skills and certifications
• Move to private sector or NGOs for higher pay
• Or stay for pension and security

**Best Government Sectors:**
• Healthcare (doctors, nurses)
• Education (university level)
• Technical (engineering, IT)`,
        keywords: [
            'government job',
            'civil service',
            'public sector',
            'government salary'
        ],
        category: 'salary'
    },
    // ========== JOB SEARCH & CAREER PLANNING ==========
    {
        question: "How do I find jobs in Sierra Leone?",
        answer: `**Job Search Strategies in Sierra Leone:**

**Online Job Boards:**
• JobSearch SL - Local job listings
• Career Pilot Salone - Our opportunities page
• LinkedIn - Professional networking
• Company websites - Check careers pages

**Newspapers:**
• Awoko Newspaper - Job ads every week
• Concord Times - Classifieds section
• Standard Times - Job listings

**Networking:**
• Attend industry events in Freetown
• Join professional associations
• Connect with university alumni
• Inform family and friends you're job hunting
• Visit companies directly with CV

**Recruitment Agencies:**
• Several agencies in Freetown
• Specialize in different sectors
• Register your CV with multiple agencies

**Government Jobs:**
• Public Service Commission announcements
• Ministry websites
• Notice boards at government offices

**NGO Jobs:**
• ReliefWeb - International NGO jobs
• NGO notice boards
• Networking in NGO community

**Tips for Success:**
• Have a professional CV ready
• Dress professionally for drop-ins
• Follow up on applications
• Be persistent - job hunting takes time
• Consider internships to gain experience
• Network actively - many jobs aren't advertised`,
        keywords: [
            'find job',
            'job search',
            'employment',
            'where to find jobs',
            'hiring'
        ],
        category: 'career'
    },
    {
        question: "What skills do employers want?",
        answer: `**Most Wanted Skills in Sierra Leone (2024):**

**Technical Skills:**

**Technology:**
• Programming (JavaScript, Python)
• Microsoft Office (Excel, Word, PowerPoint)
• Data analysis
• Web development
• IT troubleshooting

**Business:**
• Accounting (QuickBooks, Sage)
• Financial analysis
• Project management
• Marketing (digital marketing growing)
• Sales

**Soft Skills (VERY IMPORTANT):**
• Communication (written and verbal English)
• Teamwork and collaboration
• Problem-solving
• Time management
• Adaptability
• Customer service
• Leadership

**Industry-Specific:**

**Healthcare:**
• Clinical skills
• Patient care
• Medical record keeping

**Engineering:**
• AutoCAD
• Technical drawing
• Site management

**Agriculture:**
• Modern farming techniques
• Agribusiness management

**How to Build These Skills:**
• Online courses (free on YouTube, Coursera)
• Volunteer work
• Internships
• University clubs and societies
• Practice projects
• Workshops and seminars in Freetown

**Most Valuable Combinations:**
• Technical skill + Communication
• Degree + Practical experience
• Local knowledge + International standards
• English + Another language (French, Arabic)`,
        keywords: [
            'skills',
            'what skills',
            'employers want',
            'job requirements',
            'qualifications'
        ],
        category: 'career'
    },
    // ========== SPECIFIC CAREER PATHS ==========
    {
        question: "How do I become a teacher?",
        answer: `**Path to Teaching in Sierra Leone:**

**Education Required:**
• Teaching Certificate (2-3 years)
• Bachelor's in Education (4 years)
• Or: Bachelor's degree + Teaching Diploma (1 year)

**Where to Study:**
• Fourah Bay College - Education programs
• Njala University - Teacher training
• Milton Margai College of Education
• Eastern Polytechnic - Technical teaching
• Various Teacher Training Colleges

**Requirements:**
• WASSCE with 5 credits (including English & Math)
• Pass entrance exam
• Teaching practice during training

**Career Levels:**

**Primary School Teacher:**
• Salary: $90-180/month
• Requirements: Teaching Certificate or Degree
• Subjects: All primary subjects

**Secondary School Teacher:**
• Salary: $150-250/month
• Requirements: Bachelor's degree in subject area
• Subjects: Specialize in one or two subjects

**University Lecturer:**
• Salary: $250-450/month
• Requirements: Master's or PhD
• Research and teaching

**Career Path:**
1. Complete teacher training
2. Register with Teaching Service Commission
3. Get posted to school (government) or apply (private)
4. Gain experience (3-5 years)
5. Pursue further education for advancement
6. Move to senior teacher, head of department, principal

**Demand:** HIGH - Sierra Leone needs more qualified teachers
**Growth:** Good - can advance to administration`,
        keywords: [
            'teacher',
            'teaching',
            'education career',
            'how to become teacher',
            'lecturer'
        ],
        category: 'career'
    },
    {
        question: "How do I become an accountant?",
        answer: `**Path to Accounting in Sierra Leone:**

**Education Options:**

**1. University Degree (4 years):**
• Bachelor's in Accounting
• Study at: IPAM, FBC, Njala, UNIMAK
• Most common path

**2. Professional Certifications:**
• ACCA (Association of Chartered Certified Accountants)
• CPA (Certified Public Accountant)
• Can study while working
• Highly valued by employers

**Requirements:**
• WASSCE with Math, Economics/Commerce
• Strong numerical skills
• Attention to detail

**Skills Needed:**
• Accounting software (QuickBooks, Sage, Tally)
• Microsoft Excel (advanced)
• Financial analysis
• Tax knowledge
• Auditing

**Career Path:**
1. Graduate with accounting degree
2. Start as Accounts Clerk ($120-200/month)
3. Gain experience (2-3 years)
4. Pursue ACCA or CPA while working
5. Advance to Accountant ($200-300/month)
6. Senior Accountant ($250-350/month)
7. Finance Manager ($300-500/month)

**Where to Work:**
• Banks and financial institutions
• NGOs (pay well!)
• Private companies
• Accounting firms
• Government ministries
• Start own accounting practice

**Salary:** $150-350/month (varies by experience)
**Demand:** HIGH - Every organization needs accountants
**Growth:** Excellent - can reach Finance Director level`,
        keywords: [
            'accountant',
            'accounting',
            'finance',
            'cpa',
            'acca',
            'how to become'
        ],
        category: 'career'
    },
    {
        question: "What careers are available in agriculture?",
        answer: `**Agriculture Careers in Sierra Leone:**

Sierra Leone's economy depends heavily on agriculture - great opportunities!

**Agricultural Officer:**
• Salary: $120-280/month
• Work: Advise farmers, implement programs
• Education: Degree in Agriculture from Njala
• Demand: HIGH

**Agribusiness Manager:**
• Salary: $140-320/month
• Work: Run agricultural business, marketing
• Education: Agriculture + Business knowledge
• Demand: MEDIUM-HIGH

**Farm Manager:**
• Salary: $130-300/month
• Work: Manage large farms, supervise workers
• Education: Agriculture degree or experience
• Demand: MEDIUM

**Agricultural Extension Worker:**
• Salary: $100-220/month
• Work: Train farmers, spread new techniques
• Education: Diploma or degree in Agriculture
• Demand: HIGH

**Crop Scientist/Researcher:**
• Salary: $180-400/month
• Work: Research, improve crop yields
• Education: Advanced degree (Masters/PhD)
• Demand: MEDIUM

**Where to Study:**
• Njala University - Premier agriculture institution
• Eastern Polytechnic - Agricultural programs

**Opportunities:**
• Government Ministry of Agriculture
• NGOs (FAO, WFP, etc.)
• Private farms and plantations
• Start your own farm/agribusiness
• Agricultural input companies

**Growth Sectors:**
• Rice production
• Cocoa and coffee
• Palm oil
• Poultry and livestock
• Vegetable farming

**Why Agriculture:**
• Government priority sector
• International funding available
• Can be very profitable
• Food security importance`,
        keywords: [
            'agriculture',
            'farming',
            'agribusiness',
            'agricultural',
            'crops'
        ],
        category: 'career'
    },
    // ========== GENERAL GUIDANCE ==========
    {
        question: "I don't know what career to choose. What should I do?",
        answer: `**Finding Your Career Path - Step by Step:**

**1. Take Our Aptitude Test (5 minutes):**
• Visit the Aptitude Test page
• Answer questions about your interests
• Get 3 personalized career recommendations
• See which careers match your personality

**2. Self-Reflection Questions:**
• What subjects do you enjoy in school?
• What activities make you lose track of time?
• Do you prefer working with people, data, or things?
• What problems do you want to solve?
• What are you naturally good at?

**3. Research Careers:**
• Use our AI Guidance to ask about different careers
• Check salary ranges and demand
• Read about day-to-day work
• Talk to people in those fields

**4. Consider Practical Factors:**
• Job availability in Sierra Leone
• Salary expectations
• Education requirements (can you afford it?)
• Time to enter the field
• Growth potential

**5. Try Before You Commit:**
• Volunteer or intern in the field
• Shadow someone for a day
• Take online courses to test interest
• Join related clubs or groups

**Popular Career Paths by Interest:**

**Like helping people?**
• Healthcare (Nurse, Doctor)
• Teaching
• Social Work
• NGO work

**Like technology/computers?**
• Software Development
• IT Support
• Data Analysis

**Like business/money?**
• Accounting
• Marketing
• Business Management
• Banking

**Like building/creating?**
• Engineering
• Architecture
• Construction Management

**Like nature/outdoors?**
• Agriculture
• Environmental Science
• Mining

**Remember:** 
• No choice is permanent - careers can change
• Start somewhere and adjust as you learn
• Most successful people tried several paths
• Focus on building transferable skills`,
        keywords: [
            'don\'t know',
            'confused',
            'what career',
            'help me choose',
            'undecided'
        ],
        category: 'general'
    },
    {
        question: "Is it too late to change careers?",
        answer: `**It's NEVER Too Late to Change Careers!**

**Success Stories:**
• Many people switch careers in their 30s, 40s, even 50s
• Your experience is valuable in a new field
• Sierra Leone's growing economy creates new opportunities

**How to Change Careers:**

**1. Assess Your Transferable Skills:**
• Communication
• Management
• Problem-solving
• Technical skills
• Industry knowledge

**2. Identify the Gap:**
• What new skills do you need?
• What education is required?
• Can you learn while working?

**3. Make a Transition Plan:**

**Option A - Gradual Transition:**
• Keep current job
• Study part-time (evenings, weekends)
• Build skills through online courses
• Volunteer in new field
• Switch when ready

**Option B - Quick Transition:**
• Save money for transition period
• Enroll in intensive program
• Complete training
• Start job search

**4. Leverage Your Experience:**
• Highlight transferable skills
• Show how your background adds value
• Network in new industry
• Consider related roles first

**Easiest Career Transitions:**

**From Teaching →**
• Training and Development
• NGO Program Officer
• Education Consultant

**From Nursing →**
• Health Program Manager
• Medical Sales
• Public Health Officer

**From Business →**
• Almost any field (business skills universal)
• Entrepreneurship
• Consulting

**From IT →**
• Data Analysis
• Project Management
• Business Analyst

**Tips:**
• Start with online courses (low cost, flexible)
• Network with people in target field
• Consider internship even if you're experienced
• Be patient - transitions take 6-18 months
• Your age brings maturity and reliability

**Use Our Platform:**
• Generate roadmap for new career
• Ask AI about transition strategies
• Find relevant courses and programs`,
        keywords: [
            'change career',
            'too late',
            'career change',
            'switch careers',
            'new career'
        ],
        category: 'general'
    },
    {
        question: "How important is a university degree?",
        answer: `**The Truth About Degrees in Sierra Leone:**

**When a Degree is ESSENTIAL:**
• Medicine and Healthcare (Doctor, Nurse, Pharmacist)
• Engineering (Civil, Electrical, Mining)
• Teaching (especially secondary and university)
• Law
• Most government professional positions

**When a Degree is HELPFUL but Not Required:**
• Business and Management
• Marketing and Sales
• IT and Technology (skills matter more)
• Agriculture (experience also valued)
• Entrepreneurship

**When Skills Matter More Than Degrees:**
• Software Development (portfolio > degree)
• Graphic Design
• Digital Marketing
• Trades (Electrician, Plumber, Mechanic)
• Sales

**Alternatives to Traditional Degree:**

**1. Professional Certifications:**
• ACCA (Accounting)
• CISCO (Networking)
• Google Certificates (IT, Data, Marketing)
• Microsoft Certifications
• Often faster and cheaper than degree

**2. Vocational Training:**
• TVET programs
• Technical colleges
• Apprenticeships
• Learn practical skills quickly

**3. Online Learning + Experience:**
• Free online courses
• Build portfolio of work
• Freelance to gain experience
• Prove skills through projects

**Reality in Sierra Leone:**
• Many employers still prefer degrees
• But skills + experience can overcome this
• Start without degree, add it later if needed
• Some fields more flexible than others

**Best Strategy:**
• If you can afford university, go (opens most doors)
• If not, start with skills training
• Work and save for part-time degree later
• Or pursue professional certifications
• Build experience while studying

**Success Without Degree:**
• Many entrepreneurs succeed without degrees
• Tech field values skills over credentials
• Experience can substitute for education
• But be prepared to work harder to prove yourself

**Bottom Line:**
• Degree helps but isn't everything
• Skills + Experience + Network = Success
• Choose path that fits your situation
• You can always add education later`,
        keywords: [
            'degree',
            'university degree',
            'important',
            'need degree',
            'without degree'
        ],
        category: 'general'
    }
];
function findBestAnswer(userQuestion) {
    const lowerQuestion = userQuestion.toLowerCase();
    // Calculate match scores for each FAQ
    const scoredFAQs = COMPREHENSIVE_FAQ.map((faq)=>{
        let score = 0;
        // Check if question keywords appear in user question
        faq.keywords.forEach((keyword)=>{
            if (lowerQuestion.includes(keyword.toLowerCase())) {
                score += 10;
            }
        });
        // Check for word matches in the FAQ question itself
        const faqWords = faq.question.toLowerCase().split(' ');
        const userWords = lowerQuestion.split(' ');
        faqWords.forEach((word)=>{
            if (word.length > 3 && userWords.includes(word)) {
                score += 5;
            }
        });
        return {
            faq,
            score
        };
    });
    // Sort by score and get best match
    scoredFAQs.sort((a, b)=>b.score - a.score);
    const bestMatch = scoredFAQs[0];
    // If we have a decent match, return it
    if (bestMatch.score > 10) {
        return bestMatch.faq.answer;
    }
    // Otherwise return a helpful default response
    return `I'd be happy to help! I can answer questions about:

📚 **Careers**: Software development, nursing, teaching, engineering, business, agriculture, and more
💰 **Salaries**: What different careers pay in Sierra Leone
🎓 **Education**: Universities, admission requirements, online courses
💼 **Job Search**: How to find jobs, what skills employers want
🗺️ **Career Planning**: Choosing a career, changing careers, building skills
🎯 **Our Platform**: How to use the aptitude test, roadmap generator, CV builder, and more

Please ask a specific question, like:
• "How do I become a software developer?"
• "What are typical salaries in Sierra Leone?"
• "How do I use the aptitude test?"
• "What universities offer engineering programs?"

What would you like to know?`;
}
function getFAQsByCategory(category) {
    return COMPREHENSIVE_FAQ.filter((faq)=>faq.category === category);
}
function getAllCategories() {
    return [
        'career',
        'app',
        'education',
        'salary',
        'scholarship',
        'general'
    ];
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/roadmap-database.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Comprehensive Roadmap Database for Career Pilot Salone
// Pre-built 3-month roadmaps for 30+ careers
__turbopack_context__.s([
    "CAREER_ROADMAPS",
    ()=>CAREER_ROADMAPS,
    "findCareerRoadmap",
    ()=>findCareerRoadmap,
    "getAllCareerRoadmaps",
    ()=>getAllCareerRoadmaps
]);
const CAREER_ROADMAPS = [
    // ========== TECHNOLOGY CAREERS ==========
    {
        keywords: [
            'software developer',
            'programmer',
            'coder',
            'software engineer',
            'web developer',
            'app developer'
        ],
        title: 'Software Developer',
        overview: 'Software developers design, develop, and maintain applications and systems. This is a high-demand field in Sierra Leone with excellent growth potential. Tech companies, NGOs, and businesses need developers. Salary: $150-400/month.',
        salaryRange: '$150-400/month',
        demand: 'High',
        phases: [
            {
                name: 'Month 1: Foundation & Learning',
                goal: 'Learn programming basics and understand the tech landscape in Sierra Leone',
                steps: [
                    'Choose a programming language (JavaScript recommended for beginners)',
                    'Complete freeCodeCamp Responsive Web Design course (free, works offline)',
                    'Learn HTML, CSS, and JavaScript basics',
                    'Join Sierra Leone tech communities on WhatsApp/Facebook',
                    'Research tech companies in Freetown (iDT Labs, Sierratel, etc.)',
                    'Set up development environment on your computer',
                    'Build your first simple website'
                ],
                resources: [
                    'freeCodeCamp (download lessons for offline)',
                    'Codecademy free courses',
                    'YouTube: Traversy Media, Programming with Mosh',
                    'Fourah Bay College Computer Science program',
                    'Local tech meetups in Freetown'
                ]
            },
            {
                name: 'Month 2: Skill Development & Projects',
                goal: 'Build practical projects and develop a portfolio',
                steps: [
                    'Build 3-5 personal projects (calculator, to-do list, portfolio site)',
                    'Learn Git and GitHub for version control',
                    'Start a GitHub profile to showcase your work',
                    'Practice coding daily (minimum 2 hours)',
                    'Join online coding challenges (HackerRank, Codewars)',
                    'Connect with local developers on LinkedIn',
                    'Attend tech events or workshops in Freetown'
                ],
                resources: [
                    'GitHub (free hosting for projects)',
                    'VS Code (free code editor)',
                    'Stack Overflow for problem-solving',
                    'Tech communities: DevCommunity SL',
                    'IPAM IT programs'
                ]
            },
            {
                name: 'Month 3+: Job Search & Networking',
                goal: 'Find internship or entry-level developer position',
                steps: [
                    'Polish your portfolio with best 3-5 projects',
                    'Create professional LinkedIn profile',
                    'Apply to tech companies and NGOs in Freetown',
                    'Offer to build websites for local businesses (for experience)',
                    'Attend job fairs and tech networking events',
                    'Consider freelancing on local platforms',
                    'Keep learning - technology changes fast',
                    'Network with developers at iDT Labs, Sierratel, NGOs'
                ],
                resources: [
                    'JobSearch SL',
                    'LinkedIn job postings',
                    'Direct applications to tech companies',
                    'Freelance opportunities',
                    'Tech recruitment agencies in Freetown'
                ]
            }
        ]
    },
    {
        keywords: [
            'data analyst',
            'data scientist',
            'business analyst',
            'data analysis'
        ],
        title: 'Data Analyst',
        overview: 'Data analysts collect, process, and analyze data to help organizations make informed decisions. Growing demand in Sierra Leone as businesses and NGOs seek data-driven insights. Salary: $180-350/month.',
        salaryRange: '$180-350/month',
        demand: 'High',
        phases: [
            {
                name: 'Month 1: Foundation & Tools',
                goal: 'Learn data analysis fundamentals and essential tools',
                steps: [
                    'Learn Microsoft Excel advanced features (pivot tables, VLOOKUP, charts)',
                    'Start Google Data Analytics Certificate (free to audit on Coursera)',
                    'Understand basic statistics and data visualization',
                    'Practice with sample datasets',
                    'Learn SQL basics for database queries',
                    'Research data analyst roles in Sierra Leone NGOs and businesses',
                    'Join data science communities online'
                ],
                resources: [
                    'Google Data Analytics Certificate (Coursera)',
                    'Khan Academy Statistics',
                    'Excel tutorials on YouTube',
                    'W3Schools SQL tutorial',
                    'IPAM business analytics programs'
                ]
            },
            {
                name: 'Month 2: Practice & Projects',
                goal: 'Build data analysis portfolio with real projects',
                steps: [
                    'Analyze public datasets (Sierra Leone census data, health data)',
                    'Create 3-5 data visualization projects',
                    'Learn Power BI or Tableau for dashboards',
                    'Practice SQL queries daily',
                    'Build a portfolio showcasing your analysis work',
                    'Write reports explaining your findings',
                    'Share insights on LinkedIn'
                ],
                resources: [
                    'Kaggle datasets and competitions',
                    'Power BI free version',
                    'Statistics Sierra Leone (public data)',
                    'DataCamp free tier',
                    'Local business data projects'
                ]
            },
            {
                name: 'Month 3+: Job Search & Specialization',
                goal: 'Secure data analyst position and continue learning',
                steps: [
                    'Apply to NGOs, banks, and businesses in Freetown',
                    'Highlight Excel, SQL, and visualization skills on CV',
                    'Prepare for technical interviews (SQL questions, case studies)',
                    'Network with professionals in business intelligence',
                    'Consider internships at research organizations',
                    'Specialize in a sector (health, finance, agriculture)',
                    'Keep building portfolio with new projects'
                ],
                resources: [
                    'NGO job boards (ReliefWeb)',
                    'Banks and financial institutions',
                    'Research organizations',
                    'Government statistics office',
                    'Business consulting firms'
                ]
            }
        ]
    },
    {
        keywords: [
            'it support',
            'help desk',
            'technical support',
            'it technician',
            'computer technician'
        ],
        title: 'IT Support Specialist',
        overview: 'IT support specialists help users with technical problems, maintain computer systems, and ensure technology runs smoothly. Every organization needs IT support. Salary: $120-300/month.',
        salaryRange: '$120-300/month',
        demand: 'High',
        phases: [
            {
                name: 'Month 1: Technical Foundations',
                goal: 'Build fundamental IT knowledge and troubleshooting skills',
                steps: [
                    'Learn computer hardware basics (CPU, RAM, storage, etc.)',
                    'Study Windows operating system administration',
                    'Understand networking basics (IP addresses, routers, WiFi)',
                    'Practice troubleshooting common computer problems',
                    'Learn about antivirus and security software',
                    'Start Google IT Support Certificate (free to audit)',
                    'Practice on your own computer or help friends/family'
                ],
                resources: [
                    'Google IT Support Certificate (Coursera)',
                    'Professor Messer free CompTIA A+ videos',
                    'YouTube IT tutorials',
                    'Eastern Polytechnic IT programs',
                    'Local computer repair shops (for practice)'
                ]
            },
            {
                name: 'Month 2: Hands-On Practice',
                goal: 'Gain practical experience with real IT issues',
                steps: [
                    'Volunteer to fix computers for friends, family, or community',
                    'Learn Microsoft Office troubleshooting',
                    'Practice setting up networks and printers',
                    'Study common software issues and solutions',
                    'Learn remote support tools (TeamViewer, AnyDesk)',
                    'Build a knowledge base of solutions you\'ve learned',
                    'Visit local IT companies to observe and learn'
                ],
                resources: [
                    'Practice computers (old laptops/desktops)',
                    'Online forums (Tom\'s Hardware, Reddit)',
                    'Local IT shops in Freetown',
                    'Community centers needing IT help',
                    'IPAM IT courses'
                ]
            },
            {
                name: 'Month 3+: Certification & Job Search',
                goal: 'Get certified and find IT support position',
                steps: [
                    'Consider CompTIA A+ certification (if affordable)',
                    'Create CV highlighting technical skills and experience',
                    'Apply to NGOs, schools, businesses, and government offices',
                    'Offer freelance IT support services',
                    'Network with IT professionals in Freetown',
                    'Join IT support groups and forums',
                    'Keep learning about new technologies',
                    'Consider specializing (networking, security, cloud)'
                ],
                resources: [
                    'CompTIA certification centers',
                    'NGO IT departments',
                    'Schools and universities',
                    'Business IT departments',
                    'Freelance platforms'
                ]
            }
        ]
    },
    // ========== HEALTHCARE CAREERS ==========
    {
        keywords: [
            'nurse',
            'nursing',
            'registered nurse',
            'staff nurse'
        ],
        title: 'Nurse',
        overview: 'Nurses provide patient care, administer medications, and support doctors in healthcare settings. Critical shortage of nurses in Sierra Leone creates excellent opportunities. Salary: $125-300/month.',
        salaryRange: '$125-300/month',
        demand: 'High',
        phases: [
            {
                name: 'Month 1: Research & Preparation',
                goal: 'Understand nursing requirements and prepare for nursing school',
                steps: [
                    'Research nursing programs (COMAHS, Holy Spirit, Connaught Hospital)',
                    'Ensure you have WASSCE credits in Biology, Chemistry, English',
                    'Visit nursing schools to learn about admission process',
                    'Shadow a nurse at local hospital (if possible)',
                    'Save money for tuition and application fees',
                    'Study biology and anatomy basics',
                    'Join pre-nursing student groups'
                ],
                resources: [
                    'College of Medicine & Allied Health Sciences (COMAHS)',
                    'Holy Spirit Hospital School of Nursing',
                    'Connaught Hospital School of Nursing',
                    'Makeni Government Hospital School',
                    'Local hospitals for shadowing'
                ]
            },
            {
                name: 'Month 2: Application & Skill Building',
                goal: 'Apply to nursing programs and build foundational knowledge',
                steps: [
                    'Complete nursing school applications',
                    'Prepare for entrance exams (Biology, Chemistry, English)',
                    'Get medical fitness certificate',
                    'Learn basic first aid and CPR',
                    'Read nursing textbooks from library',
                    'Volunteer at local clinic or hospital',
                    'Practice patient care basics (taking vitals, hygiene)'
                ],
                resources: [
                    'Nursing school application forms',
                    'First aid training programs',
                    'Local health centers for volunteering',
                    'Nursing textbooks at FBC library',
                    'Red Cross Sierra Leone'
                ]
            },
            {
                name: 'Month 3+: Enrollment & Career Planning',
                goal: 'Enroll in nursing program or gain healthcare experience',
                steps: [
                    'If accepted: Start nursing program (3-4 years)',
                    'If waiting: Work as nursing assistant or volunteer',
                    'Join nursing student associations',
                    'Network with practicing nurses',
                    'Learn about nursing specializations (pediatrics, surgery, ICU)',
                    'Plan for licensing exam after graduation',
                    'Research nursing career paths in Sierra Leone'
                ],
                resources: [
                    'Nursing schools',
                    'Nurses and Midwives Board of Sierra Leone',
                    'Government hospitals',
                    'Private clinics',
                    'NGO health programs'
                ]
            }
        ]
    },
    {
        keywords: [
            'doctor',
            'medical doctor',
            'physician',
            'medicine',
            'mbbs'
        ],
        title: 'Medical Doctor',
        overview: 'Medical doctors diagnose and treat illnesses, perform procedures, and save lives. Sierra Leone desperately needs more doctors. Long training but very rewarding career. Salary: $250-750/month.',
        salaryRange: '$250-750/month',
        demand: 'High',
        phases: [
            {
                name: 'Month 1: Academic Preparation',
                goal: 'Prepare for medical school admission',
                steps: [
                    'Ensure excellent WASSCE results in Biology, Chemistry, Physics',
                    'Research COMAHS medical program requirements',
                    'Study for medical school entrance exam',
                    'Save money for tuition (medical school is expensive)',
                    'Shadow doctors at local hospitals',
                    'Join pre-med student groups',
                    'Strengthen science knowledge (biology, chemistry, physics)'
                ],
                resources: [
                    'College of Medicine & Allied Health Sciences (COMAHS)',
                    'Connaught Hospital',
                    'Private hospitals in Freetown',
                    'Medical textbooks at university libraries',
                    'Pre-med study groups'
                ]
            },
            {
                name: 'Month 2: Application & Experience',
                goal: 'Apply to medical school and gain healthcare exposure',
                steps: [
                    'Complete COMAHS application',
                    'Take entrance examination',
                    'Volunteer at hospitals or clinics',
                    'Learn medical terminology',
                    'Understand healthcare system in Sierra Leone',
                    'Network with medical students and doctors',
                    'Prepare for interviews'
                ],
                resources: [
                    'COMAHS admissions office',
                    'Teaching hospitals',
                    'Community health centers',
                    'Medical professionals for mentorship',
                    'Scholarship opportunities'
                ]
            },
            {
                name: 'Month 3+: Long-term Planning',
                goal: 'Plan for 6+ years of medical education',
                steps: [
                    'If accepted: Begin medical school (6 years)',
                    'If not accepted: Retake exams, strengthen application',
                    'Consider alternative: Start with nursing, then medicine',
                    'Research medical specializations',
                    'Look for scholarships and financial aid',
                    'Join medical student associations',
                    'Plan for internship and residency',
                    'Stay committed - it\'s a long journey but worth it'
                ],
                resources: [
                    'COMAHS medical program',
                    'Government medical scholarships',
                    'International medical scholarships',
                    'Teaching hospitals for internships',
                    'Medical associations in Sierra Leone'
                ]
            }
        ]
    },
    // ========== BUSINESS CAREERS ==========
    {
        keywords: [
            'accountant',
            'accounting',
            'bookkeeper',
            'finance',
            'cpa',
            'acca'
        ],
        title: 'Accountant',
        overview: 'Accountants manage financial records, prepare reports, and ensure compliance with regulations. Every organization needs accountants. Strong career with good advancement opportunities. Salary: $150-350/month.',
        salaryRange: '$150-350/month',
        demand: 'High',
        phases: [
            {
                name: 'Month 1: Foundation & Education',
                goal: 'Start accounting education and learn basics',
                steps: [
                    'Enroll in accounting program (IPAM, FBC, Njala, UNIMAK)',
                    'Or start ACCA/CPA online courses',
                    'Learn accounting fundamentals (debits, credits, journal entries)',
                    'Master Microsoft Excel for accounting',
                    'Understand financial statements (balance sheet, income statement)',
                    'Study Sierra Leone tax basics',
                    'Join accounting student groups'
                ],
                resources: [
                    'IPAM accounting programs',
                    'Fourah Bay College',
                    'ACCA online courses',
                    'Accounting textbooks',
                    'Excel tutorials for accountants'
                ]
            },
            {
                name: 'Month 2: Practical Skills',
                goal: 'Develop practical accounting skills and software knowledge',
                steps: [
                    'Learn accounting software (QuickBooks, Sage, Tally)',
                    'Practice bookkeeping for small business',
                    'Understand payroll processing',
                    'Learn about auditing basics',
                    'Volunteer to help small businesses with books',
                    'Study Sierra Leone National Revenue Authority requirements',
                    'Build sample financial reports portfolio'
                ],
                resources: [
                    'QuickBooks tutorials',
                    'Local accounting firms for internships',
                    'Small businesses needing help',
                    'National Revenue Authority website',
                    'Accounting practice sets'
                ]
            },
            {
                name: 'Month 3+: Career Launch',
                goal: 'Find accounting position and pursue certification',
                steps: [
                    'Apply for accounts clerk or junior accountant positions',
                    'Target banks, NGOs, businesses, accounting firms',
                    'Continue ACCA or CPA studies while working',
                    'Network with professional accountants',
                    'Join Institute of Chartered Accountants Sierra Leone',
                    'Gain experience in different accounting areas',
                    'Plan career path: Senior Accountant → Finance Manager',
                    'Consider starting own accounting practice eventually'
                ],
                resources: [
                    'Banks in Freetown',
                    'NGO finance departments',
                    'Accounting firms (PwC, KPMG, local firms)',
                    'Government ministries',
                    'Private companies'
                ]
            }
        ]
    },
    {
        keywords: [
            'marketing',
            'digital marketing',
            'marketing manager',
            'social media manager',
            'brand manager'
        ],
        title: 'Marketing Manager',
        overview: 'Marketing managers develop strategies to promote products and services, manage campaigns, and build brand awareness. Growing field as businesses embrace digital marketing. Salary: $175-400/month.',
        salaryRange: '$175-400/month',
        demand: 'Medium',
        phases: [
            {
                name: 'Month 1: Marketing Fundamentals',
                goal: 'Learn marketing principles and digital marketing basics',
                steps: [
                    'Take Google Digital Marketing course (free)',
                    'Learn marketing fundamentals (4Ps, target audience, positioning)',
                    'Study social media marketing (Facebook, Instagram, WhatsApp)',
                    'Understand Sierra Leone consumer behavior',
                    'Research successful marketing campaigns in SL',
                    'Learn basic graphic design (Canva)',
                    'Start following marketing professionals on LinkedIn'
                ],
                resources: [
                    'Google Digital Garage (free certification)',
                    'HubSpot Academy (free marketing courses)',
                    'Facebook Blueprint',
                    'Canva for design',
                    'IPAM marketing programs'
                ]
            },
            {
                name: 'Month 2: Hands-On Practice',
                goal: 'Build marketing portfolio with real projects',
                steps: [
                    'Offer free marketing help to local small businesses',
                    'Create social media campaigns for practice',
                    'Build a portfolio of marketing materials',
                    'Learn email marketing basics',
                    'Practice writing marketing copy',
                    'Analyze competitors\' marketing strategies',
                    'Create your own professional brand on social media'
                ],
                resources: [
                    'Local businesses for projects',
                    'Mailchimp (free email marketing)',
                    'Social media platforms',
                    'Marketing case studies',
                    'Freelance projects'
                ]
            },
            {
                name: 'Month 3+: Job Search & Specialization',
                goal: 'Find marketing position and develop expertise',
                steps: [
                    'Apply to marketing roles at companies and NGOs',
                    'Highlight digital marketing skills on CV',
                    'Show portfolio of campaigns and results',
                    'Network at business events in Freetown',
                    'Consider specializing (digital, content, brand)',
                    'Keep learning new marketing tools and trends',
                    'Join marketing professional groups',
                    'Consider freelance marketing consulting'
                ],
                resources: [
                    'Businesses in Freetown',
                    'NGO communications departments',
                    'Advertising agencies',
                    'Telecommunications companies',
                    'Retail companies'
                ]
            }
        ]
    },
    // ========== ENGINEERING CAREERS ==========
    {
        keywords: [
            'civil engineer',
            'civil engineering',
            'construction engineer',
            'structural engineer'
        ],
        title: 'Civil Engineer',
        overview: 'Civil engineers design and oversee construction of infrastructure like roads, bridges, and buildings. High demand due to Sierra Leone\'s infrastructure development needs. Salary: $200-500/month.',
        salaryRange: '$200-500/month',
        demand: 'High',
        phases: [
            {
                name: 'Month 1: Academic Foundation',
                goal: 'Start engineering education and build technical knowledge',
                steps: [
                    'Enroll in Civil Engineering program (Njala, FBC)',
                    'Strengthen math and physics knowledge',
                    'Learn engineering drawing and AutoCAD basics',
                    'Understand construction materials and methods',
                    'Visit construction sites to observe',
                    'Join engineering student associations',
                    'Study successful infrastructure projects in SL'
                ],
                resources: [
                    'Njala University Engineering program',
                    'Fourah Bay College',
                    'AutoCAD tutorials (YouTube)',
                    'Construction sites for observation',
                    'Engineering textbooks'
                ]
            },
            {
                name: 'Month 2: Technical Skills',
                goal: 'Develop practical engineering skills',
                steps: [
                    'Learn AutoCAD for engineering drawings',
                    'Practice structural calculations',
                    'Understand surveying basics',
                    'Learn about building codes and standards',
                    'Intern at construction company (if possible)',
                    'Study project management basics',
                    'Network with practicing civil engineers'
                ],
                resources: [
                    'AutoCAD software',
                    'Construction companies in Freetown',
                    'Engineering firms',
                    'Government infrastructure projects',
                    'Engineering workshops and seminars'
                ]
            },
            {
                name: 'Month 3+: Career Development',
                goal: 'Gain experience and plan engineering career',
                steps: [
                    'Continue engineering degree (4-5 years)',
                    'Seek internships during school breaks',
                    'Join Sierra Leone Institution of Engineers',
                    'Work on real projects (even small ones)',
                    'Learn project management software',
                    'Plan for professional engineering license',
                    'Network with construction and engineering firms',
                    'Consider specialization (roads, buildings, water)'
                ],
                resources: [
                    'Construction companies',
                    'Engineering consulting firms',
                    'Government Ministry of Works',
                    'NGO infrastructure projects',
                    'Private developers'
                ]
            }
        ]
    },
    {
        keywords: [
            'electrical engineer',
            'electrical engineering',
            'power engineer',
            'electronics'
        ],
        title: 'Electrical Engineer',
        overview: 'Electrical engineers design and maintain electrical systems, power distribution, and electronics. Critical need due to Sierra Leone\'s energy challenges. Salary: $180-450/month.',
        salaryRange: '$180-450/month',
        demand: 'High',
        phases: [
            {
                name: 'Month 1: Foundation & Theory',
                goal: 'Build electrical engineering knowledge base',
                steps: [
                    'Enroll in Electrical Engineering program (Njala, FBC)',
                    'Master electrical circuit theory',
                    'Learn about power systems and distribution',
                    'Understand electrical safety standards',
                    'Study Sierra Leone\'s power grid challenges',
                    'Join electrical engineering student groups',
                    'Practice basic electrical calculations'
                ],
                resources: [
                    'Njala University',
                    'Fourah Bay College',
                    'Electrical engineering textbooks',
                    'Online circuit simulators',
                    'YouTube electrical tutorials'
                ]
            },
            {
                name: 'Month 2: Practical Experience',
                goal: 'Gain hands-on electrical skills',
                steps: [
                    'Learn electrical wiring and installations',
                    'Practice with electrical testing equipment',
                    'Understand motor controls and automation',
                    'Intern with electrician or electrical company',
                    'Study renewable energy systems (solar, wind)',
                    'Learn electrical design software',
                    'Work on small electrical projects'
                ],
                resources: [
                    'Electrical companies in Freetown',
                    'EDSA (Electricity Distribution)',
                    'Solar installation companies',
                    'Electrical workshops',
                    'Engineering labs at universities'
                ]
            },
            {
                name: 'Month 3+: Career Path',
                goal: 'Launch electrical engineering career',
                steps: [
                    'Continue degree program (4-5 years)',
                    'Seek internships at power companies',
                    'Learn about renewable energy opportunities',
                    'Network with electrical engineers',
                    'Consider specialization (power, electronics, renewable)',
                    'Plan for professional licensing',
                    'Apply to EDSA, telecommunications, or private firms',
                    'Stay updated on energy sector developments'
                ],
                resources: [
                    'EDSA (Electricity Distribution)',
                    'Telecommunications companies',
                    'Solar energy companies',
                    'Engineering firms',
                    'Government energy ministry'
                ]
            }
        ]
    },
    // ========== EDUCATION CAREERS ==========
    {
        keywords: [
            'teacher',
            'teaching',
            'primary teacher',
            'secondary teacher',
            'educator'
        ],
        title: 'Teacher',
        overview: 'Teachers educate and inspire students at primary or secondary level. Sierra Leone needs more qualified teachers. Rewarding career with stable employment. Salary: $90-250/month.',
        salaryRange: '$90-250/month',
        demand: 'High',
        phases: [
            {
                name: 'Month 1: Teacher Training Start',
                goal: 'Begin teacher education and understand requirements',
                steps: [
                    'Enroll in teacher training program (FBC, Njala, Milton Margai)',
                    'Or pursue Bachelor\'s degree + teaching diploma',
                    'Learn teaching methods and pedagogy',
                    'Study child psychology and development',
                    'Observe classes at local schools',
                    'Choose subject specialization (for secondary)',
                    'Join teacher training student groups'
                ],
                resources: [
                    'Fourah Bay College Education program',
                    'Milton Margai College of Education',
                    'Njala University',
                    'Teacher Training Colleges',
                    'Local schools for observation'
                ]
            },
            {
                name: 'Month 2: Teaching Practice',
                goal: 'Develop practical teaching skills',
                steps: [
                    'Practice lesson planning',
                    'Learn classroom management techniques',
                    'Volunteer to tutor students',
                    'Create teaching materials and resources',
                    'Practice teaching to small groups',
                    'Learn about Sierra Leone curriculum',
                    'Study assessment and evaluation methods'
                ],
                resources: [
                    'Practice teaching at schools',
                    'Teaching resource materials',
                    'Curriculum guides',
                    'Education workshops',
                    'Mentorship from experienced teachers'
                ]
            },
            {
                name: 'Month 3+: Career Launch',
                goal: 'Complete training and find teaching position',
                steps: [
                    'Complete teacher training program (2-4 years)',
                    'Register with Teaching Service Commission',
                    'Apply for teaching positions (government or private)',
                    'Prepare for teaching interviews and demo lessons',
                    'Join teachers\' unions and associations',
                    'Continue professional development',
                    'Consider advancement: Head of Department → Principal',
                    'Pursue further education (Masters) for university teaching'
                ],
                resources: [
                    'Teaching Service Commission',
                    'Government schools',
                    'Private schools',
                    'NGO education programs',
                    'Teachers\' associations'
                ]
            }
        ]
    },
    // ========== OTHER POPULAR CAREERS ==========
    {
        keywords: [
            'graphic designer',
            'graphic design',
            'designer',
            'visual designer',
            'creative designer'
        ],
        title: 'Graphic Designer',
        overview: 'Graphic designers create visual content for brands, marketing, and media. Growing demand as businesses invest in branding and digital presence. Salary: $120-320/month.',
        salaryRange: '$120-320/month',
        demand: 'Medium',
        phases: [
            {
                name: 'Month 1: Design Fundamentals',
                goal: 'Learn design principles and essential tools',
                steps: [
                    'Learn design basics (color theory, typography, composition)',
                    'Master Canva for beginners (free and easy)',
                    'Start learning Adobe Photoshop or GIMP (free alternative)',
                    'Study successful designs and branding in Sierra Leone',
                    'Practice recreating designs you admire',
                    'Build a mood board of design inspiration',
                    'Join design communities online'
                ],
                resources: [
                    'Canva (free design tool)',
                    'GIMP (free Photoshop alternative)',
                    'YouTube design tutorials',
                    'Coursera Graphic Design courses',
                    'Design inspiration: Behance, Dribbble'
                ]
            },
            {
                name: 'Month 2: Portfolio Building',
                goal: 'Create diverse portfolio of design work',
                steps: [
                    'Design logos for fictional or real businesses',
                    'Create social media graphics',
                    'Design posters and flyers',
                    'Offer free design work to local businesses',
                    'Build online portfolio (Behance or personal website)',
                    'Learn Adobe Illustrator basics',
                    'Practice daily design challenges'
                ],
                resources: [
                    'Behance for portfolio',
                    'Local businesses for projects',
                    'Daily design challenge websites',
                    'Freelance platforms',
                    'Design feedback communities'
                ]
            },
            {
                name: 'Month 3+: Freelance & Employment',
                goal: 'Find design clients or employment',
                steps: [
                    'Apply to advertising agencies and media companies',
                    'Start freelancing on local platforms',
                    'Market your services on social media',
                    'Network with business owners and marketers',
                    'Keep building portfolio with new projects',
                    'Learn motion graphics or UI/UX design',
                    'Consider specializing (branding, social media, print)',
                    'Set competitive rates for Sierra Leone market'
                ],
                resources: [
                    'Advertising agencies in Freetown',
                    'Media companies',
                    'Freelance platforms',
                    'Social media for marketing',
                    'Local businesses needing design'
                ]
            }
        ]
    },
    {
        keywords: [
            'entrepreneur',
            'business owner',
            'start business',
            'small business',
            'startup'
        ],
        title: 'Entrepreneur / Business Owner',
        overview: 'Entrepreneurs start and run their own businesses, creating jobs and solving problems. Many opportunities in Sierra Leone for innovative business ideas. Income varies widely.',
        salaryRange: 'Varies ($100-1000+/month)',
        demand: 'High',
        phases: [
            {
                name: 'Month 1: Business Idea & Planning',
                goal: 'Develop viable business idea and create plan',
                steps: [
                    'Identify a problem you can solve in Sierra Leone',
                    'Research your target market and customers',
                    'Analyze competition and find your unique angle',
                    'Create simple business plan',
                    'Calculate startup costs and funding needs',
                    'Learn business basics (accounting, marketing, operations)',
                    'Talk to existing business owners for advice'
                ],
                resources: [
                    'IPAM entrepreneurship programs',
                    'Small business development centers',
                    'Business plan templates online',
                    'Local entrepreneurs for mentorship',
                    'Market research in your community'
                ]
            },
            {
                name: 'Month 2: Setup & Launch Preparation',
                goal: 'Register business and prepare for launch',
                steps: [
                    'Register business with Corporate Affairs Commission',
                    'Get necessary licenses and permits',
                    'Set up business bank account',
                    'Source suppliers or materials',
                    'Create basic branding (name, logo)',
                    'Set up simple accounting system',
                    'Test your product/service with potential customers',
                    'Build initial customer base'
                ],
                resources: [
                    'Corporate Affairs Commission',
                    'National Revenue Authority (tax registration)',
                    'Local banks for business accounts',
                    'Suppliers and wholesalers',
                    'Business registration services'
                ]
            },
            {
                name: 'Month 3+: Launch & Growth',
                goal: 'Launch business and focus on growth',
                steps: [
                    'Officially launch your business',
                    'Market through social media, word-of-mouth, local ads',
                    'Provide excellent customer service',
                    'Track income and expenses carefully',
                    'Reinvest profits to grow',
                    'Learn from mistakes and adapt quickly',
                    'Network with other entrepreneurs',
                    'Consider joining business associations',
                    'Plan for scaling and expansion'
                ],
                resources: [
                    'Sierra Leone Chamber of Commerce',
                    'Small business associations',
                    'Microfinance for funding',
                    'Business mentorship programs',
                    'Entrepreneurship networks'
                ]
            }
        ]
    },
    {
        keywords: [
            'project manager',
            'program manager',
            'project management',
            'pmp'
        ],
        title: 'Project Manager',
        overview: 'Project managers plan, execute, and oversee projects to ensure they\'re completed on time and within budget. High demand in NGOs, construction, and businesses. Salary: $200-450/month.',
        salaryRange: '$200-450/month',
        demand: 'High',
        phases: [
            {
                name: 'Month 1: PM Fundamentals',
                goal: 'Learn project management principles and methodologies',
                steps: [
                    'Take Google Project Management Certificate (free to audit)',
                    'Learn PM basics (scope, time, cost, quality management)',
                    'Understand project lifecycle and phases',
                    'Study common PM tools and software',
                    'Learn about Agile and Waterfall methodologies',
                    'Practice creating project plans',
                    'Research PM roles in Sierra Leone NGOs and businesses'
                ],
                resources: [
                    'Google Project Management Certificate (Coursera)',
                    'PMI resources (free articles)',
                    'YouTube PM tutorials',
                    'Project management templates',
                    'IPAM management programs'
                ]
            },
            {
                name: 'Month 2: Tools & Practice',
                goal: 'Master PM tools and gain practical experience',
                steps: [
                    'Learn Microsoft Project or free alternatives (Trello, Asana)',
                    'Practice creating Gantt charts and timelines',
                    'Volunteer to manage small projects (community, church, school)',
                    'Learn stakeholder management',
                    'Practice risk management and problem-solving',
                    'Build portfolio of managed projects',
                    'Network with project managers in NGOs'
                ],
                resources: [
                    'Trello (free PM tool)',
                    'Asana (free tier)',
                    'Community projects for practice',
                    'NGO volunteer opportunities',
                    'PM practice scenarios'
                ]
            },
            {
                name: 'Month 3+: Certification & Career',
                goal: 'Get certified and find PM position',
                steps: [
                    'Complete Google PM Certificate',
                    'Consider CAPM or PMP certification (if affordable)',
                    'Apply to NGOs, construction firms, businesses',
                    'Highlight project management experience on CV',
                    'Prepare for PM interviews (behavioral questions, case studies)',
                    'Join PM professional groups',
                    'Continue learning about different PM methodologies',
                    'Build reputation as reliable project leader'
                ],
                resources: [
                    'NGOs in Freetown',
                    'Construction and engineering firms',
                    'International organizations',
                    'Government development projects',
                    'Private sector companies'
                ]
            }
        ]
    },
    {
        keywords: [
            'lawyer',
            'attorney',
            'legal',
            'law',
            'barrister',
            'solicitor'
        ],
        title: 'Lawyer',
        overview: 'Lawyers provide legal advice, represent clients in court, and draft legal documents. Respected profession with good earning potential. Requires dedication and long education. Salary: $200-600/month.',
        salaryRange: '$200-600/month',
        demand: 'Medium',
        phases: [
            {
                name: 'Month 1: Law School Preparation',
                goal: 'Prepare for law school admission',
                steps: [
                    'Ensure strong WASSCE results (especially English)',
                    'Research FBC Law program requirements',
                    'Study for law school entrance exam',
                    'Read about Sierra Leone legal system',
                    'Visit courts to observe proceedings',
                    'Shadow lawyers if possible',
                    'Join pre-law student groups'
                ],
                resources: [
                    'Fourah Bay College Law program',
                    'Law courts in Freetown',
                    'Law firms for shadowing',
                    'Legal textbooks and resources',
                    'Pre-law study materials'
                ]
            },
            {
                name: 'Month 2: Legal Knowledge Building',
                goal: 'Build foundational legal knowledge',
                steps: [
                    'Complete law school application',
                    'Study Sierra Leone Constitution',
                    'Learn legal terminology and concepts',
                    'Practice legal writing and analysis',
                    'Understand different areas of law',
                    'Network with law students and lawyers',
                    'Prepare for law school interviews'
                ],
                resources: [
                    'FBC Law Faculty',
                    'Sierra Leone Law Reports',
                    'Legal Aid Board',
                    'Law Society of Sierra Leone',
                    'Legal textbooks and cases'
                ]
            },
            {
                name: 'Month 3+: Long-term Law Career',
                goal: 'Plan for legal education and career',
                steps: [
                    'If accepted: Start law degree (3-4 years)',
                    'Complete law school successfully',
                    'Pass Bar exams',
                    'Complete pupillage (apprenticeship)',
                    'Get called to the Bar',
                    'Join law firm or start practice',
                    'Consider specialization (corporate, criminal, family)',
                    'Build reputation and client base'
                ],
                resources: [
                    'FBC Law program',
                    'Sierra Leone Bar Association',
                    'Law firms for pupillage',
                    'Courts for practice',
                    'Legal Aid for experience'
                ]
            }
        ]
    },
    {
        keywords: [
            'journalist',
            'reporter',
            'media',
            'news',
            'broadcasting',
            'journalism'
        ],
        title: 'Journalist',
        overview: 'Journalists research, write, and report news stories for newspapers, radio, TV, or online media. Important role in democracy and information sharing. Salary: $100-280/month.',
        salaryRange: '$100-280/month',
        demand: 'Medium',
        phases: [
            {
                name: 'Month 1: Journalism Basics',
                goal: 'Learn journalism fundamentals and start writing',
                steps: [
                    'Study journalism principles (accuracy, fairness, objectivity)',
                    'Learn news writing style (inverted pyramid)',
                    'Practice writing news stories daily',
                    'Read local newspapers (Awoko, Concord Times, Standard Times)',
                    'Listen to radio news programs',
                    'Start a blog to practice writing',
                    'Learn about media law and ethics in Sierra Leone'
                ],
                resources: [
                    'FBC Mass Communication program',
                    'Local newspapers',
                    'Radio stations (SLBC, Radio Democracy)',
                    'Online journalism courses',
                    'Journalism textbooks'
                ]
            },
            {
                name: 'Month 2: Skills & Portfolio',
                goal: 'Develop journalism skills and build portfolio',
                steps: [
                    'Write articles on local issues',
                    'Practice interviewing people',
                    'Learn photography basics for photo journalism',
                    'Submit articles to local newspapers (freelance)',
                    'Create portfolio of published or written work',
                    'Learn basic video editing for broadcast',
                    'Network with working journalists'
                ],
                resources: [
                    'Local newspapers for freelance',
                    'Community stories to cover',
                    'Photography equipment (phone camera works)',
                    'Free video editing software',
                    'Journalism workshops'
                ]
            },
            {
                name: 'Month 3+: Media Career',
                goal: 'Find journalism position and develop beat',
                steps: [
                    'Apply to newspapers, radio, TV stations',
                    'Start as freelancer or intern',
                    'Develop expertise in specific beat (politics, health, sports)',
                    'Build network of sources',
                    'Join Sierra Leone Association of Journalists',
                    'Continue improving writing and reporting skills',
                    'Consider specializing (investigative, broadcast, online)',
                    'Build reputation for quality, ethical journalism'
                ],
                resources: [
                    'Awoko Newspaper',
                    'Radio Democracy',
                    'SLBC (Sierra Leone Broadcasting Corporation)',
                    'Online news platforms',
                    'Freelance journalism opportunities'
                ]
            }
        ]
    },
    {
        keywords: [
            'pharmacist',
            'pharmacy',
            'pharmaceutical',
            'drug',
            'medication'
        ],
        title: 'Pharmacist',
        overview: 'Pharmacists dispense medications, advise on drug use, and ensure patient safety. Growing healthcare sector creates opportunities. Requires specialized education. Salary: $180-400/month.',
        salaryRange: '$180-400/month',
        demand: 'High',
        phases: [
            {
                name: 'Month 1: Pharmacy School Prep',
                goal: 'Prepare for pharmacy program admission',
                steps: [
                    'Ensure strong WASSCE in Chemistry, Biology, Physics',
                    'Research COMAHS Pharmacy program',
                    'Study for pharmacy school entrance exam',
                    'Visit pharmacies to understand the profession',
                    'Shadow a pharmacist if possible',
                    'Learn about different pharmacy career paths',
                    'Save for tuition and fees'
                ],
                resources: [
                    'COMAHS Pharmacy program',
                    'Local pharmacies',
                    'Hospital pharmacies',
                    'Pharmacy textbooks',
                    'Pre-pharmacy study groups'
                ]
            },
            {
                name: 'Month 2: Knowledge Building',
                goal: 'Build pharmaceutical knowledge foundation',
                steps: [
                    'Complete pharmacy school application',
                    'Study basic pharmacology',
                    'Learn about common medications',
                    'Understand drug classifications',
                    'Volunteer at pharmacy or clinic',
                    'Learn medical terminology',
                    'Network with pharmacy students'
                ],
                resources: [
                    'COMAHS admissions',
                    'Pharmacies for volunteering',
                    'Pharmacology textbooks',
                    'Online pharmacy courses',
                    'Hospital pharmacy departments'
                ]
            },
            {
                name: 'Month 3+: Pharmacy Career Path',
                goal: 'Plan for pharmacy education and licensure',
                steps: [
                    'If accepted: Start pharmacy program (4-5 years)',
                    'Complete clinical rotations',
                    'Pass licensing examination',
                    'Register with Pharmacy Board of Sierra Leone',
                    'Work in hospital, retail, or community pharmacy',
                    'Consider specialization (clinical, industrial, research)',
                    'Join Pharmaceutical Society',
                    'Stay updated on new medications and treatments'
                ],
                resources: [
                    'COMAHS Pharmacy program',
                    'Pharmacy Board of Sierra Leone',
                    'Hospital pharmacies',
                    'Retail pharmacies',
                    'Pharmaceutical companies'
                ]
            }
        ]
    },
    {
        keywords: [
            'human resources',
            'hr',
            'hr manager',
            'recruitment',
            'personnel'
        ],
        title: 'Human Resources Manager',
        overview: 'HR managers recruit, train, and manage employees, handle workplace issues, and ensure compliance with labor laws. Every organization needs HR. Salary: $160-380/month.',
        salaryRange: '$160-380/month',
        demand: 'Medium',
        phases: [
            {
                name: 'Month 1: HR Fundamentals',
                goal: 'Learn human resources principles and practices',
                steps: [
                    'Study HR basics (recruitment, training, compensation)',
                    'Learn about Sierra Leone labor laws',
                    'Understand employee relations and conflict resolution',
                    'Take free HR courses online (Coursera, Alison)',
                    'Learn about performance management',
                    'Study organizational behavior',
                    'Research HR roles in Sierra Leone companies'
                ],
                resources: [
                    'IPAM HR programs',
                    'Free online HR courses',
                    'Sierra Leone labor law resources',
                    'HR textbooks',
                    'SHRM free resources'
                ]
            },
            {
                name: 'Month 2: Practical HR Skills',
                goal: 'Develop hands-on HR capabilities',
                steps: [
                    'Learn recruitment and interviewing techniques',
                    'Practice writing job descriptions',
                    'Understand payroll and benefits administration',
                    'Learn HR software and systems',
                    'Volunteer for HR tasks in organizations',
                    'Study employee handbook creation',
                    'Network with HR professionals'
                ],
                resources: [
                    'HR software tutorials',
                    'Sample HR documents',
                    'Organizations needing HR help',
                    'HR workshops and seminars',
                    'Professional HR associations'
                ]
            },
            {
                name: 'Month 3+: HR Career Launch',
                goal: 'Find HR position and pursue certification',
                steps: [
                    'Apply for HR assistant or coordinator roles',
                    'Target NGOs, businesses, government',
                    'Highlight people skills and organizational abilities',
                    'Consider HR certification (SHRM, CIPD)',
                    'Join HR professional groups',
                    'Learn about different HR specializations',
                    'Build reputation as fair, professional HR practitioner',
                    'Advance to HR Manager or Director'
                ],
                resources: [
                    'NGOs in Freetown',
                    'Private companies',
                    'Banks and financial institutions',
                    'Government ministries',
                    'HR recruitment agencies'
                ]
            }
        ]
    }
];
function findCareerRoadmap(careerInput) {
    const lowerInput = careerInput.toLowerCase().trim();
    // Find exact or close match
    for (const roadmap of CAREER_ROADMAPS){
        // Check if any keyword matches
        if (roadmap.keywords.some((keyword)=>lowerInput.includes(keyword) || keyword.includes(lowerInput))) {
            return roadmap;
        }
    }
    // No match found
    return null;
}
function getAllCareerRoadmaps() {
    return CAREER_ROADMAPS.map((r)=>r.title);
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/local-ai.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Local AI Service for Career Pilot Salone
// Enhanced with comprehensive FAQ database for complete career guidance
__turbopack_context__.s([
    "generateChatResponse",
    ()=>generateChatResponse,
    "generateRoadmap",
    ()=>generateRoadmap,
    "matchCareers",
    ()=>matchCareers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$career$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/career-data.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$faq$2d$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/faq-database.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$roadmap$2d$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/roadmap-database.ts [app-route] (ecmascript)");
;
;
;
async function generateChatResponse(messages, siteContext) {
    const lastUserMessage = messages.filter((m)=>m.role === 'user').pop()?.content || '';
    // Use comprehensive FAQ database for intelligent matching
    const faqAnswer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$faq$2d$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findBestAnswer"])(lastUserMessage);
    // If FAQ found a good match, use it
    if (faqAnswer && !faqAnswer.includes("I'd be happy to help!")) {
        return faqAnswer;
    }
    // Fallback to original logic for edge cases
    const lowerMessage = lastUserMessage.toLowerCase();
    // 2. Broad Topic Matching (If no exact FAQ match)
    if (lowerMessage.includes("civil leg") || lowerMessage.includes("civil eng")) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$faq$2d$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findBestAnswer"])("What engineering careers are available?");
    if (lowerMessage.includes("data") || lowerMessage.includes("analyst")) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$faq$2d$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findBestAnswer"])("Why is Data Analysis a good career?");
    if (lowerMessage.includes("money") || lowerMessage.includes("pay") || lowerMessage.includes("salary") || lowerMessage.includes("earn")) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$faq$2d$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findBestAnswer"])("What are typical salaries in Sierra Leone?");
    if (lowerMessage.includes("university") || lowerMessage.includes("college") || lowerMessage.includes("study") || lowerMessage.includes("degree")) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$faq$2d$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findBestAnswer"])("What universities are in Sierra Leone?");
    if (lowerMessage.includes("job") || lowerMessage.includes("work") || lowerMessage.includes("hire")) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$faq$2d$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findBestAnswer"])("How do I find jobs in Sierra Leone?");
    if (lowerMessage.includes("nurse") || lowerMessage.includes("nursing") || lowerMessage.includes("doctor") || lowerMessage.includes("health")) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$faq$2d$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findBestAnswer"])("How do I become a nurse?");
    if (lowerMessage.includes("tech") || lowerMessage.includes("computer") || lowerMessage.includes("code") || lowerMessage.includes("software")) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$faq$2d$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findBestAnswer"])("How do I become a software developer?");
    if (lowerMessage.includes("teach") || lowerMessage.includes("teacher") || lowerMessage.includes("school")) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$faq$2d$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findBestAnswer"])("How do I become a teacher?");
    if (lowerMessage.includes("farm") || lowerMessage.includes("agric")) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$faq$2d$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findBestAnswer"])("What careers are available in agriculture?");
    if (lowerMessage.includes("bank") || lowerMessage.includes("accounting") || lowerMessage.includes("finance")) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$faq$2d$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findBestAnswer"])("How do I become an accountant?");
    // Greetings
    if (containsKeywords(lowerMessage, [
        'hello',
        'hi',
        'hey',
        'greetings',
        'good morning',
        'good afternoon'
    ])) {
        return `Hello! 👋 I'm CareerPilot, your AI career counselor for Sierra Leone.

**I can help you with:**

📚 **Careers** - Explore software development, nursing, teaching, engineering, business, agriculture, and more
💰 **Salaries** - Learn what different careers pay in Sierra Leone  
🎓 **Education** - Find universities, admission requirements, and online courses
💼 **Job Search** - Discover how to find jobs and what skills employers want
🗺️ **Career Planning** - Get guidance on choosing or changing careers
🎯 **Our Platform** - Learn how to use our aptitude test, roadmap generator, CV builder, and more

**Try asking:**
• "How do I become a software developer?"
• "What are typical salaries in Sierra Leone?"
• "How do I use the aptitude test?"
• "What universities offer engineering programs?"

What would you like to know about your career journey?`;
    }
    // If no specific match, return the FAQ's default helpful response
    return faqAnswer;
}
function containsKeywords(text, keywords) {
    return keywords.some((keyword)=>text.includes(keyword));
}
async function matchCareers(answers) {
    const answerText = answers.map((a)=>a.answer.toLowerCase()).join(' ');
    // Score each career based on keyword matching
    const scoredCareers = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$career$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SIERRA_LEONE_CAREERS"].map((career)=>{
        let score = 0;
        // Keyword matching
        career.keywords.forEach((keyword)=>{
            if (answerText.includes(keyword)) score += 15;
        });
        // Industry matching
        if (answerText.includes(career.industry.toLowerCase())) score += 10;
        // Skill matching
        career.requiredSkills.forEach((skill)=>{
            if (answerText.includes(skill.toLowerCase())) score += 8;
        });
        // Interest indicators
        if (answerText.includes('help') || answerText.includes('people')) {
            if ([
                'Healthcare',
                'Education',
                'Non-Profit'
            ].includes(career.industry)) score += 12;
        }
        if (answerText.includes('tech') || answerText.includes('computer') || answerText.includes('digital')) {
            if (career.industry === 'Technology') score += 15;
        }
        if (answerText.includes('business') || answerText.includes('money') || answerText.includes('entrepreneur')) {
            if ([
                'Business',
                'Finance'
            ].includes(career.industry)) score += 12;
        }
        if (answerText.includes('build') || answerText.includes('create') || answerText.includes('design')) {
            if ([
                'Engineering',
                'Technology'
            ].includes(career.industry)) score += 10;
        }
        return {
            career,
            score
        };
    });
    // Sort by score and take top 3
    const topCareers = scoredCareers.sort((a, b)=>b.score - a.score).slice(0, 3);
    // Normalize scores to percentages
    const maxScore = topCareers[0].score;
    const recommendations = topCareers.map(({ career, score })=>({
            title: career.title,
            matchScore: Math.min(Math.round(score / maxScore * 100), 98),
            reason: generateMatchReason(career, answerText),
            demand: career.demand,
            salaryRange: career.salaryRange
        }));
    const summary = generatePersonalitySummary(answerText, recommendations);
    return {
        summary,
        recommendations
    };
}
function generateMatchReason(career, answerText) {
    const reasons = [];
    if (career.keywords.some((k)=>answerText.includes(k))) {
        reasons.push(`Your interests align with ${career.industry.toLowerCase()}`);
    }
    if (answerText.includes('help') || answerText.includes('people')) {
        if ([
            'Healthcare',
            'Education'
        ].includes(career.industry)) {
            reasons.push('You show strong people-oriented values');
        }
    }
    if (answerText.includes('creative') || answerText.includes('design')) {
        reasons.push('This role offers creative problem-solving opportunities');
    }
    if (career.demand === 'High') {
        reasons.push('High demand in Sierra Leone job market');
    }
    if (reasons.length === 0) {
        reasons.push(`Strong growth potential in ${career.industry}`);
    }
    return reasons.slice(0, 2).join('. ') + '.';
}
function generatePersonalitySummary(answerText, recommendations) {
    let summary = "Based on your responses, ";
    if (answerText.includes('help') || answerText.includes('people') || answerText.includes('community')) {
        summary += "you demonstrate strong interpersonal skills and a desire to make a positive impact. ";
    } else if (answerText.includes('tech') || answerText.includes('computer') || answerText.includes('solve')) {
        summary += "you show analytical thinking and problem-solving abilities. ";
    } else if (answerText.includes('creative') || answerText.includes('design') || answerText.includes('art')) {
        summary += "you have creative talents and innovative thinking. ";
    } else {
        summary += "you have diverse interests and adaptable skills. ";
    }
    const topIndustry = recommendations[0].title;
    summary += `Careers in fields like ${topIndustry} would be excellent fits for your strengths and Sierra Leone's job market.`;
    return summary;
}
async function generateRoadmap(careerName) {
    // First, try to find in comprehensive roadmap database
    const roadmapTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$roadmap$2d$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findCareerRoadmap"])(careerName);
    if (roadmapTemplate) {
        // Use pre-built detailed roadmap
        return {
            title: `Your Roadmap to ${roadmapTemplate.title} in Sierra Leone`,
            overview: roadmapTemplate.overview,
            phases: roadmapTemplate.phases
        };
    }
    // Fallback: Check career-data.ts
    const career = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$career$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SIERRA_LEONE_CAREERS"].find((c)=>c.title.toLowerCase().includes(careerName.toLowerCase()) || c.keywords.some((k)=>careerName.toLowerCase().includes(k)));
    if (career) {
        return generateDetailedRoadmap(career);
    }
    // Last resort: Generic roadmap
    return generateGenericRoadmap(careerName);
}
function generateDetailedRoadmap(career) {
    return {
        title: `Your Roadmap to ${career.title} in Sierra Leone`,
        overview: `${career.description}. This is a ${career.demand.toLowerCase()}-demand field in Sierra Leone with ${career.growthPotential.toLowerCase()}. With dedication and the right preparation, you can build a successful career earning ${career.salaryRange}. This 3-month plan will set you on the right path.`,
        phases: [
            {
                name: "Month 1: Foundation & Learning",
                goal: `Build foundational knowledge in ${career.industry} and understand the Sierra Leone job market`,
                steps: [
                    `Research ${career.title} roles in Sierra Leone - check job postings on local sites`,
                    `Start learning core skill: ${career.requiredSkills[0]}`,
                    `Enroll in free online course: ${getRelevantOnlineResource(career)}`,
                    `Visit ${career.localInstitutions[0]} to learn about their programs`,
                    `Join relevant WhatsApp/Facebook groups for ${career.industry} professionals in SL`,
                    `Read industry news and trends (even with slow internet, download articles offline)`,
                    `Create a learning schedule that works around power cuts`
                ],
                resources: [
                    career.localInstitutions[0],
                    getRelevantOnlineResource(career),
                    `${career.industry} professional groups in Freetown`,
                    `Local libraries in Freetown for books on ${career.requiredSkills[0]}`,
                    `YouTube tutorials (download for offline viewing)`
                ]
            },
            {
                name: "Month 2: Skill Development & Practice",
                goal: `Develop practical skills and start building your portfolio/experience`,
                steps: [
                    `Practice ${career.requiredSkills[1] || career.requiredSkills[0]} daily - aim for 2 hours/day`,
                    `Work on a small project related to ${career.title}`,
                    `Reach out to 3 professionals in this field for informational interviews`,
                    `Attend industry meetups or events in Freetown/Bo`,
                    `Start building your CV highlighting relevant skills`,
                    `Join study groups at ${career.localInstitutions[1] || career.localInstitutions[0]}`,
                    `Document your learning journey (blog, social media, or journal)`
                ],
                resources: [
                    `Practice projects and exercises`,
                    `Professional networking events in Freetown`,
                    career.localInstitutions[1] || career.localInstitutions[0],
                    `LinkedIn for connecting with ${career.industry} professionals`,
                    `Local mentorship programs`
                ]
            },
            {
                name: "Month 3+: Job Search & Networking",
                goal: `Secure internship, entry-level position, or further education opportunity`,
                steps: [
                    `Apply to 5-10 ${career.title} positions or internships`,
                    `Prepare for interviews - practice common questions`,
                    `Update LinkedIn profile with new skills and projects`,
                    `Visit companies in ${career.industry} sector in Freetown`,
                    `Consider applying to ${career.localInstitutions[0]} if further education needed`,
                    `Network at professional events - bring printed CVs`,
                    `Follow up on applications and maintain connections`,
                    `Keep learning - this field requires continuous development`
                ],
                resources: [
                    `Job boards: JobSearch SL, local newspapers, company websites`,
                    `${career.localInstitutions[0]} career services`,
                    `Professional associations in Sierra Leone`,
                    `Recruitment agencies in Freetown`,
                    `Government employment programs (if applicable)`
                ]
            }
        ]
    };
}
function generateGenericRoadmap(careerName) {
    return {
        title: `Your Roadmap to ${careerName} in Sierra Leone`,
        overview: `Starting a career in ${careerName} requires dedication, continuous learning, and strategic networking. While this is a specialized field, Sierra Leone's growing economy offers opportunities for motivated professionals. This 3-month plan will help you take the first steps toward your goal.`,
        phases: [
            {
                name: "Month 1: Research & Foundation",
                goal: "Understand the field and identify learning pathways",
                steps: [
                    `Research ${careerName} opportunities in Sierra Leone`,
                    `Identify required skills and qualifications`,
                    `Find online courses or local training programs`,
                    `Connect with professionals in this field`,
                    `Visit universities to learn about relevant programs`,
                    `Create a learning plan based on your findings`,
                    `Start building foundational knowledge`
                ],
                resources: [
                    "Fourah Bay College career guidance",
                    "Online learning platforms (Coursera, edX, YouTube)",
                    "Professional networks in Freetown",
                    "Local libraries and resource centers",
                    "Industry-specific websites and forums"
                ]
            },
            {
                name: "Month 2: Skill Building",
                goal: "Develop core competencies and practical experience",
                steps: [
                    "Take online courses in key skills",
                    "Work on practical projects",
                    "Seek mentorship from experienced professionals",
                    "Join relevant professional groups",
                    "Attend workshops or seminars in Freetown",
                    "Build a portfolio of your work",
                    "Practice and refine your skills daily"
                ],
                resources: [
                    "Free online courses and tutorials",
                    "Study groups and peer learning",
                    "Professional associations",
                    "Mentorship programs",
                    "Local training centers"
                ]
            },
            {
                name: "Month 3+: Opportunities & Growth",
                goal: "Find opportunities and continue professional development",
                steps: [
                    "Apply for relevant positions or internships",
                    "Network actively in your industry",
                    "Consider further education if needed",
                    "Build your professional online presence",
                    "Attend industry events and conferences",
                    "Keep learning and staying updated",
                    "Explore entrepreneurship opportunities if applicable"
                ],
                resources: [
                    "Job search platforms",
                    "University career services",
                    "Professional networking events",
                    "LinkedIn and professional networks",
                    "Industry publications and news"
                ]
            }
        ]
    };
}
function getRelevantOnlineResource(career) {
    if (career.industry === 'Technology') return 'freeCodeCamp or Codecademy';
    if (career.industry === 'Healthcare') return 'Khan Academy Medical courses';
    if (career.industry === 'Business') return 'Google Digital Skills or Coursera Business';
    if (career.industry === 'Engineering') return 'edX Engineering fundamentals';
    return 'Coursera or edX courses in your field';
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/ai-context.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSiteContext",
    ()=>getSiteContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/@supabase/supabase-js/dist/esm/wrapper.mjs [app-route] (ecmascript)");
;
// Server-side Supabase client (using service role or anon key if public)
// Since we are in an API route, we can use the environment variables directly.
const supabaseUrl = ("TURBOPACK compile-time value", "https://qfmkkoswhhasbwvgcszb.supabase.co");
const supabaseKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmbWtrb3N3aGhhc2J3dmdjc3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NjkxMDAsImV4cCI6MjA4MDU0NTEwMH0.0szbkGML0d8xhIpMukVMyhmawqweEhSf3UM0P0UECTk");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])(supabaseUrl, supabaseKey);
async function getSiteContext() {
    try {
        // Fetch Top 5 Universities
        const { data: universities } = await supabase.from('universities').select('name, location').limit(5);
        // Fetch Top 5 Careers
        const { data: careers } = await supabase.from('careers').select('title, salary_range, industry').limit(5);
        // Fetch Top Scholarships
        const { data: scholarships } = await supabase.from('scholarships').select('title, amount, deadline').limit(3);
        let context = "Here is the real-time data from the CareerPilot Salone database:\n\n";
        if (universities && universities.length > 0) {
            context += "UNIVERSITIES:\n";
            universities.forEach((uni)=>{
                context += `- ${uni.name} (${uni.location})\n`;
            });
            context += "\n";
        }
        if (careers && careers.length > 0) {
            context += "POPULAR CAREERS:\n";
            careers.forEach((career)=>{
                context += `- ${career.title} (${career.industry}). Salary: ${career.salary_range}\n`;
            });
            context += "\n";
        }
        if (scholarships && scholarships.length > 0) {
            context += "ACTIVE SCHOLARSHIPS:\n";
            scholarships.forEach((sch)=>{
                context += `- ${sch.title}. Amount: ${sch.amount}. Deadline: ${sch.deadline}\n`;
            });
        }
        return context;
    } catch (error) {
        console.error("Error fetching site context:", error);
        return ""; // Fail gracefully
    }
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "maxDuration",
    ()=>maxDuration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$ai$2f$geminiClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/ai/geminiClient.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$local$2d$ai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/local-ai.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$ai$2d$context$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/ai-context.ts [app-route] (ecmascript)");
;
;
;
;
const maxDuration = 45; // Allow longer timeout for reasoning logic if needed
async function POST(req) {
    try {
        const { messages } = await req.json();
        if (!messages || !Array.isArray(messages)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid messages format"
            }, {
                status: 400
            });
        }
        // 1. Get Site Context
        let siteContext = "";
        try {
            siteContext = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$ai$2d$context$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSiteContext"])();
        } catch (e) {
            console.warn("[API] Failed to fetch site context, proceeding without it.");
        }
        // 2. Try External AI (Gemini -> OpenAI)
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$ai$2f$geminiClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateCareerReply"])({
                messages,
                context: siteContext
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                id: Date.now().toString(),
                reply: result.text,
                provider: result.provider,
                timestamp: new Date().toISOString()
            });
        } catch (aiError) {
            console.warn("[API] All External AI (Gemini/OpenAI) failed. Switching to LOCAL FALLBACK.", aiError);
            // 3. Last Resort: Local Logic
            // This guarantees an answer even if internet/keys are totally broken
            const localReply = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$local$2d$ai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateChatResponse"])(messages, siteContext);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                id: Date.now().toString(),
                reply: localReply,
                provider: 'local-fallback',
                timestamp: new Date().toISOString(),
                warning: 'Network/AI services unavailable. Using offline mode.'
            });
        }
    } catch (err) {
        console.error("[API] Critical Chat Error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal Server Error",
            details: err.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__32c539c0._.js.map