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
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/local-ai.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Local AI Service for Career Pilot Salone
// Provides intelligent responses without external API dependencies
__turbopack_context__.s([
    "generateChatResponse",
    ()=>generateChatResponse,
    "generateRoadmap",
    ()=>generateRoadmap,
    "matchCareers",
    ()=>matchCareers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$career$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/career-data.ts [app-route] (ecmascript)");
;
async function generateChatResponse(messages, siteContext) {
    const lastUserMessage = messages.filter((m)=>m.role === 'user').pop()?.content.toLowerCase() || '';
    // Detect intent
    if (containsKeywords(lastUserMessage, [
        'hello',
        'hi',
        'hey',
        'greetings'
    ])) {
        return `Hello! 👋 I'm CareerPilot, your AI career counselor for Sierra Leone. I can help you:

• Explore career paths and opportunities
• Find suitable universities and courses
• Get salary information in USD
• Discover scholarships and funding
• Plan your career roadmap

What would you like to know about your career journey?`;
    }
    if (containsKeywords(lastUserMessage, [
        'salary',
        'pay',
        'earn',
        'income',
        'money'
    ])) {
        return generateSalaryResponse(lastUserMessage);
    }
    if (containsKeywords(lastUserMessage, [
        'university',
        'college',
        'school',
        'institution',
        'study',
        'education'
    ])) {
        return generateUniversityResponse(lastUserMessage, siteContext);
    }
    if (containsKeywords(lastUserMessage, [
        'career',
        'job',
        'work',
        'profession',
        'field'
    ])) {
        return generateCareerResponse(lastUserMessage, siteContext);
    }
    if (containsKeywords(lastUserMessage, [
        'scholarship',
        'funding',
        'financial aid',
        'grant'
    ])) {
        return generateScholarshipResponse(siteContext);
    }
    if (containsKeywords(lastUserMessage, [
        'how to',
        'become',
        'start',
        'get into'
    ])) {
        return generateHowToResponse(lastUserMessage);
    }
    // Default helpful response
    return `I'd be happy to help you with career guidance! I can assist with:

📚 **Education**: Universities, courses, and requirements
💼 **Careers**: Job opportunities and salary ranges in Sierra Leone
💰 **Scholarships**: Available funding opportunities
🗺️ **Career Planning**: Steps to achieve your goals

Could you tell me more about what you're interested in? For example:
- "What careers are available in technology?"
- "Which universities offer nursing programs?"
- "How much do teachers earn in Sierra Leone?"`;
}
function generateSalaryResponse(query) {
    const matchedCareers = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$career$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SIERRA_LEONE_CAREERS"].filter((career)=>career.keywords.some((keyword)=>query.includes(keyword)));
    if (matchedCareers.length > 0) {
        const career = matchedCareers[0];
        return `💰 **${career.title} Salary in Sierra Leone**

**Monthly Range**: ${career.salaryRange}
**Demand Level**: ${career.demand}

**Industry**: ${career.industry}
**Growth Potential**: ${career.growthPotential}

💡 **Tip**: Salaries vary based on experience, location (Freetown vs. provinces), and employer type (government, private, NGO). Entry-level positions typically start at the lower end of the range.

Would you like to know about career requirements or how to get started in this field?`;
    }
    // General salary overview
    return `💰 **Salary Ranges in Sierra Leone (2024)**

Here are typical monthly salaries across sectors:

**High-Paying Careers**:
• Mining Engineer: $250 - $600
• Civil Engineer: $200 - $500
• Software Developer: $150 - $400

**Healthcare**:
• Nurse: $125 - $300
• Medical Doctor: $250 - $750

**Education**:
• Teacher: $90 - $225
• University Lecturer: $150 - $350

**Business & Finance**:
• Accountant: $150 - $350
• Marketing Manager: $175 - $400

💡 Salaries are higher in Freetown and for those with international certifications. Which career interests you most?`;
}
function generateUniversityResponse(query, siteContext) {
    let response = `🎓 **Universities in Sierra Leone**\n\n`;
    if (siteContext.includes('UNIVERSITIES:')) {
        response += `${siteContext.split('UNIVERSITIES:')[1].split('\n\n')[0]}\n\n`;
    } else {
        response += `**Top Institutions**:\n`;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$career$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UNIVERSITIES"].forEach((uni)=>{
            response += `• ${uni}\n`;
        });
        response += '\n';
    }
    response += `**Choosing the Right University**:\n`;
    response += `• **FBC**: Best for law, humanities, social sciences\n`;
    response += `• **Njala**: Strong in agriculture, engineering\n`;
    response += `• **IPAM**: Business, management, accounting\n`;
    response += `• **COMAHS**: Medicine, nursing, health sciences\n`;
    response += `• **UNIMAK**: Growing programs in various fields\n\n`;
    response += `💡 **Tip**: Consider location, program strength, and affordability. Many students also use online courses to supplement their education.\n\n`;
    response += `What field are you interested in studying?`;
    return response;
}
function generateCareerResponse(query, siteContext) {
    const matchedCareers = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$career$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SIERRA_LEONE_CAREERS"].filter((career)=>career.keywords.some((keyword)=>query.includes(keyword)));
    if (matchedCareers.length > 0) {
        const career = matchedCareers[0];
        return `💼 **${career.title}**

${career.description}

**💰 Salary**: ${career.salaryRange}
**📊 Demand**: ${career.demand}
**📈 Growth**: ${career.growthPotential}

**Required Education**:
${career.requiredEducation.map((edu)=>`• ${edu}`).join('\n')}

**Key Skills**:
${career.requiredSkills.slice(0, 5).map((skill)=>`• ${skill}`).join('\n')}

**Where to Study**:
${career.localInstitutions.slice(0, 3).map((inst)=>`• ${inst}`).join('\n')}

Would you like a detailed 3-month roadmap to start this career?`;
    }
    // General career overview
    let response = `💼 **Career Opportunities in Sierra Leone**\n\n`;
    if (siteContext.includes('POPULAR CAREERS:')) {
        response += `${siteContext.split('POPULAR CAREERS:')[1].split('\n\n')[0]}\n\n`;
    }
    response += `**High-Demand Sectors**:\n`;
    response += `🏥 **Healthcare**: Nurses, doctors, lab technicians\n`;
    response += `💻 **Technology**: Software developers, IT support\n`;
    response += `🌾 **Agriculture**: Agricultural officers, agribusiness\n`;
    response += `⛏️ **Mining**: Engineers, geologists, technicians\n`;
    response += `🏗️ **Construction**: Civil engineers, electricians\n`;
    response += `📚 **Education**: Teachers, lecturers, trainers\n\n`;
    response += `Which sector interests you most? I can provide detailed information!`;
    return response;
}
function generateScholarshipResponse(siteContext) {
    let response = `🎓 **Scholarship Opportunities**\n\n`;
    if (siteContext.includes('ACTIVE SCHOLARSHIPS:')) {
        response += `**Currently Available**:\n`;
        response += `${siteContext.split('ACTIVE SCHOLARSHIPS:')[1]}\n\n`;
    }
    response += `**Types of Scholarships**:\n`;
    response += `• **Government**: TVET scholarships, teaching bursaries\n`;
    response += `• **International**: Chevening, Commonwealth, MasterCard Foundation\n`;
    response += `• **University**: Merit-based awards at FBC, Njala, UNIMAK\n`;
    response += `• **NGO**: Various organizations offer education support\n\n`;
    response += `**Application Tips**:\n`;
    response += `✓ Maintain strong academic performance\n`;
    response += `✓ Get involved in community service\n`;
    response += `✓ Apply early - deadlines are strict\n`;
    response += `✓ Prepare strong personal statements\n\n`;
    response += `Visit our Opportunities page to see current scholarships!`;
    return response;
}
function generateHowToResponse(query) {
    const matchedCareers = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$career$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SIERRA_LEONE_CAREERS"].filter((career)=>career.keywords.some((keyword)=>query.includes(keyword)));
    if (matchedCareers.length > 0) {
        const career = matchedCareers[0];
        return `🚀 **How to Become a ${career.title}**

**Step 1: Education** 📚
${career.requiredEducation[0]}
→ Study at: ${career.localInstitutions[0]}

**Step 2: Build Skills** 💪
Focus on: ${career.requiredSkills.slice(0, 3).join(', ')}

**Step 3: Gain Experience** 🎯
• Internships during studies
• Volunteer work in the field
• Personal projects (for tech/creative fields)

**Step 4: Network** 🤝
• Join professional associations
• Attend industry events in Freetown
• Connect with professionals on LinkedIn

**Step 5: Job Search** 💼
• Check local job boards
• Apply to companies in ${career.industry}
• Consider starting with entry-level positions

**Timeline**: 2-4 years depending on education path

💡 Would you like a detailed 3-month roadmap to get started?`;
    }
    return `I'd be happy to help you plan your career path! Could you specify which career you're interested in? For example:

• "How to become a software developer"
• "How to become a nurse"
• "How to become a teacher"

I'll provide a step-by-step guide tailored to Sierra Leone!`;
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
    const career = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$career$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SIERRA_LEONE_CAREERS"].find((c)=>c.title.toLowerCase().includes(careerName.toLowerCase()) || c.keywords.some((k)=>careerName.toLowerCase().includes(k)));
    if (career) {
        return generateDetailedRoadmap(career);
    }
    // Generic roadmap for unknown careers
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
                    `Practice ${career.requiredSkills[1]} daily - aim for 2 hours/day`,
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
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "maxDuration",
    ()=>maxDuration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/@ai-sdk/openai/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/ai/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$ai$2d$context$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/ai-context.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$local$2d$ai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/local-ai.ts [app-route] (ecmascript)");
;
;
;
;
const maxDuration = 30;
async function POST(req) {
    try {
        const { messages } = await req.json();
        const siteContext = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$ai$2d$context$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSiteContext"])();
        // Try OpenAI first if API key exists and has quota
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
            try {
                console.log("Attempting OpenAI API...");
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["streamText"])({
                    model: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$ai$2d$sdk$2f$openai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["openai"])('gpt-4o'),
                    system: `You are CareerPilot, an expert AI career counselor for High School and University students in Sierra Leone.
    
    Your Role:
    - Guide users to suitable career paths based on their interests.
    - Suggest relevant Sierra Leonean universities (FBC, Njala, UNIMAK, etc.) and online courses.
    - Provide realistic salary expectations in Sierra Leonean Leones (SLE).
    - Be encouraging, professional, and practical.
    - If asked about "Health", "Tech", "Agric", etc., detail specific jobs and requirements.
    
    REAL-TIME SITE DATA:
    ${siteContext}
    
    Context:
    - Users are often young students or job seekers.
    - Keep answers concise and bulleted for readability.`,
                    messages
                });
                console.log("OpenAI stream created successfully");
                return result.toTextStreamResponse();
            } catch (openaiError) {
                console.warn("OpenAI API failed, falling back to local AI:", openaiError.message);
            // Fall through to local AI
            }
        }
        // Local AI Fallback
        console.log("Using local AI service...");
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$local$2d$ai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateChatResponse"])(messages, siteContext);
        // Return as plain text response (simulating streaming)
        return new Response(response, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8'
            }
        });
    } catch (error) {
        console.error("Chat API Error:", error);
        return new Response(JSON.stringify({
            error: 'Failed to process chat',
            details: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6043f598._.js.map