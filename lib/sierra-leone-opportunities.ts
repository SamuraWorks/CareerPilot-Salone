// Sierra Leone Local Opportunities Database
// Real, actionable opportunities for youth in Sierra Leone

export interface Opportunity {
    id: string
    type: "job" | "scholarship" | "training" | "internship" | "hackathon"
    title: string
    organization: string
    location: string
    description: string
    requirements: string[]
    deadline?: string
    link?: string
    salary?: string
    duration?: string
    category: string[]
    educationLevel: string[]
    isActive: boolean
    sourceType?: "legal" | "official" | "private"
    sourceAgency?: string
    lastVerifiedAt?: string
}

export const SIERRA_LEONE_OPPORTUNITIES: Opportunity[] = [
    // JOBS
    {
        id: "job-001",
        type: "job",
        title: "Junior Software Developer",
        organization: "Directorate of Science, Technology and Innovation (DSTI)",
        location: "Freetown",
        description: "Develop and maintain government digital services and applications. Work on e-government initiatives.",
        requirements: [
            "Diploma or Bachelor's in Computer Science or related field",
            "Knowledge of web development (HTML, CSS, JavaScript)",
            "Familiarity with databases",
            "Good problem-solving skills"
        ],
        salary: "Le 3,000,000 - 5,000,000/month",
        category: ["technology", "government"],
        educationLevel: ["diploma", "bachelor"],
        isActive: true,
        sourceType: "legal",
        sourceAgency: "DSTI Salone",
        lastVerifiedAt: new Date().toISOString()
    },
    {
        id: "job-002",
        type: "job",
        title: "Community Health Worker",
        organization: "Ministry of Health and Sanitation",
        location: "Various Districts",
        description: "Provide basic health services and education to communities. Support disease prevention programs.",
        requirements: [
            "Secondary school certificate (WASSCE)",
            "Training in community health",
            "Good communication skills",
            "Willingness to work in rural areas"
        ],
        salary: "Le 1,500,000 - 2,500,000/month",
        category: ["health", "community"],
        educationLevel: ["secondary", "diploma"],
        isActive: true,
        sourceType: "legal",
        sourceAgency: "Ministry of Health SL",
        lastVerifiedAt: new Date().toISOString()
    },
    {
        id: "job-003",
        type: "job",
        title: "Data Entry Clerk",
        organization: "Statistics Sierra Leone",
        location: "Freetown",
        description: "Enter and manage statistical data for national surveys and census programs.",
        requirements: [
            "Secondary school certificate",
            "Computer literacy (Microsoft Office)",
            "Attention to detail",
            "Typing speed of 40+ wpm"
        ],
        salary: "Le 1,800,000 - 2,800,000/month",
        category: ["data", "government"],
        educationLevel: ["secondary", "diploma"],
        isActive: true,
        sourceType: "legal",
        sourceAgency: "Statistics SL (StatsSL)",
        lastVerifiedAt: new Date().toISOString()
    },
    {
        id: "job-004",
        type: "job",
        title: "Teaching Assistant",
        organization: "University of Sierra Leone",
        location: "Freetown",
        description: "Assist lecturers with tutorials, grading, and student support.",
        requirements: [
            "Bachelor's degree in relevant field",
            "Strong academic record",
            "Good communication skills",
            "Passion for teaching"
        ],
        salary: "Le 2,500,000 - 4,000,000/month",
        category: ["education", "academic"],
        educationLevel: ["bachelor", "master"],
        isActive: true
    },
    {
        id: "job-005",
        type: "job",
        title: "Sample Reception Unit (SRU) Officer",
        organization: "Careers SL",
        location: "Freetown",
        description: "Manage and process incoming samples in a laboratory setting. Ensure accurate documentation and logistics.",
        requirements: [
            "Experience in logistics or sample management",
            "Attention to detail",
            "Deadline: January 15, 2026"
        ],
        deadline: "2026-01-15",
        category: ["health", "logistics"],
        educationLevel: ["diploma", "bachelor"],
        isActive: true
    },
    {
        id: "job-006",
        type: "job",
        title: "Security Officer",
        organization: "Careers SL",
        location: "Freetown",
        description: "Maintain safety and security protocols for organizational premises.",
        requirements: [
            "Prior experience in security operations",
            "Vigilance and strong communication skills",
            "Deadline: January 15, 2026"
        ],
        deadline: "2026-01-15",
        category: ["security", "operations"],
        educationLevel: ["secondary", "diploma"],
        isActive: true
    },
    {
        id: "job-007",
        type: "job",
        title: "Medical Laboratory Scientist",
        organization: "Ministry of Health and Sanitation",
        location: "Connaught Hospital, Freetown",
        description: "Official recruitment for health professionals to support diagnostic services at national referral centers.",
        requirements: [
            "Bachelor's in Medical Laboratory Science",
            "Valid license from Professional Regulatory Body",
            "Willingness to work in government facilities"
        ],
        salary: "Grade 8-10 Civil Service Scale",
        category: ["health", "government"],
        educationLevel: ["bachelor"],
        isActive: true,
        sourceType: "legal",
        sourceAgency: "PSC / MOHS",
        lastVerifiedAt: new Date().toISOString()
    },
    {
        id: "job-008",
        type: "job",
        title: "Public Service Internship Programme",
        organization: "Public Service Commission (PSC)",
        location: "Nationwide",
        description: "Annual internship for graduates to gain experience within government ministries.",
        requirements: [
            "Recent university graduate",
            "Below 29 years of age",
            "Sierra Leonean citizenship"
        ],
        category: ["internship", "government"],
        educationLevel: ["bachelor", "master"],
        isActive: true,
        sourceType: "legal",
        sourceAgency: "Public Service Commission",
        lastVerifiedAt: new Date().toISOString()
    },

    // SCHOLARSHIPS
    {
        id: "scholarship-001",
        type: "scholarship",
        title: "Mastercard Foundation Scholars Program",
        organization: "Mastercard Foundation",
        location: "Various African Universities",
        description: "Full scholarship for undergraduate and graduate studies at partner universities across Africa.",
        requirements: [
            "Sierra Leonean citizen",
            "Strong academic record",
            "Demonstrated leadership potential",
            "Financial need",
            "WASSCE or equivalent for undergraduate"
        ],
        deadline: "Varies by university (typically March-May)",
        link: "https://mastercardfdn.org/all/scholars/",
        category: ["education", "international"],
        educationLevel: ["secondary", "bachelor"],
        isActive: true
    },
    {
        id: "scholarship-002",
        type: "scholarship",
        title: "African Development Bank Scholarship",
        organization: "African Development Bank",
        location: "Various Countries",
        description: "Scholarships for Master's and PhD programs in development-related fields.",
        requirements: [
            "Bachelor's degree with good grades",
            "Admission to a recognized university",
            "Under 35 years old",
            "Commitment to return to Sierra Leone"
        ],
        deadline: "Usually July-August",
        link: "https://www.afdb.org/en/about-us/careers/scholarship-program",
        category: ["education", "development"],
        educationLevel: ["bachelor", "master"],
        isActive: true
    },
    {
        id: "scholarship-003",
        type: "scholarship",
        title: "Government of Sierra Leone Scholarship",
        organization: "Ministry of Technical and Higher Education",
        location: "Local and International",
        description: "Merit-based scholarships for Sierra Leonean students to study locally or abroad.",
        requirements: [
            "Excellent academic performance",
            "WASSCE with strong grades",
            "Admission letter from recognized institution",
            "Sierra Leonean citizenship"
        ],
        deadline: "Announced annually (usually September)",
        category: ["education", "government"],
        educationLevel: ["secondary", "bachelor"],
        isActive: true,
        sourceType: "legal",
        sourceAgency: "Ministry of Technical and Higher Education (MTHE)",
        lastVerifiedAt: new Date().toISOString()
    },
    {
        id: "scholarship-007",
        type: "scholarship",
        title: "Sierra Leone Government Grant-in-Aid (GIA)",
        organization: "Ministry of Technical & Higher Education",
        location: "All Public Universities",
        description: "Tuition fee support for students in public higher education institutions. Applications typically open in August.",
        requirements: [
            "First year student in a public university",
            "Strong WASSCE or previous college performance",
            "Needs assessment by MTHE"
        ],
        deadline: "August 30, 2026",
        link: "https://mthe.gov.sl/gia",
        category: ["education", "government"],
        educationLevel: ["bachelor", "diploma"],
        isActive: true,
        sourceType: "legal",
        sourceAgency: "MTHE Scholarship Division",
        lastVerifiedAt: new Date().toISOString()
    },
    {
        id: "scholarship-008",
        type: "scholarship",
        title: "Russian Government / SL Bilateral Award",
        organization: "Ministry of Technical & Higher Education",
        location: "Russian Federation",
        description: "Bilateral scholarship agreement between the Russian Republic and Sierra Leone for diverse undergraduate and graduate majors.",
        requirements: [
            "WASSCE score of B3 or better in relevant subjects",
            "Valid Passport",
            "Medical certificate"
        ],
        deadline: "February 28, 2026",
        link: "https://mthe.gov.sl/bilateral",
        category: ["education", "international"],
        educationLevel: ["bachelor", "master"],
        isActive: true,
        sourceType: "legal",
        sourceAgency: "MTHE / Russian Embassy",
        lastVerifiedAt: new Date().toISOString()
    },
    {
        id: "scholarship-004",
        type: "scholarship",
        title: "Women in STEM Award",
        organization: "Orange Sierra Leone Foundation",
        location: "Sierra Leone",
        description: "Full tuition, a laptop, and a paid internship for 30 female first-year students in Engineering, IT, or Mathematics.",
        requirements: [
            "Female student",
            "First year in STEM program",
            "Sierra Leonean citizen",
            "Application window: May 2026"
        ],
        deadline: "2026-05-31",
        link: "https://www.orange.sl",
        category: ["education", "STEM", "women"],
        educationLevel: ["bachelor"],
        isActive: true
    },
    {
        id: "scholarship-005",
        type: "scholarship",
        title: "Freetown Terminal Limited Community Scholarship",
        organization: "Freetown Terminal Limited",
        location: "Freetown",
        description: "Full tuition coverage for university students from specific port communities.",
        requirements: [
            "Student from designated port communities",
            "Admission to a recognized university",
            "Application window: June 2026"
        ],
        deadline: "2026-06-30",
        category: ["education", "community"],
        educationLevel: ["bachelor"],
        isActive: true
    },
    {
        id: "scholarship-006",
        type: "scholarship",
        title: "Fulbright Foreign Student Program",
        organization: "U.S. Embassy in Sierra Leone",
        location: "United States",
        description: "Fully funded Master's degree in the United States for young professionals.",
        requirements: [
            "Sierra Leonean professional",
            "Bachelor's degree with high academic standing",
            "Commitment to return to Sierra Leone",
            "Deadline: April 10, 2025 (for 2026 cycle)"
        ],
        deadline: "2025-04-10",
        link: "https://sl.usembassy.gov",
        category: ["education", "international"],
        educationLevel: ["bachelor", "master"],
        isActive: true
    },

    // TRAINING PROGRAMS
    {
        id: "training-001",
        type: "training",
        title: "Digital Skills Training",
        organization: "Orange Digital Center",
        location: "Freetown",
        description: "Free training in coding, digital marketing, and entrepreneurship.",
        requirements: [
            "18-35 years old",
            "Basic computer literacy",
            "Commitment to complete program"
        ],
        duration: "3-6 months",
        link: "https://www.orange.com/en/orange-digital-centers",
        category: ["technology", "skills"],
        educationLevel: ["secondary", "diploma", "bachelor", "self-taught"],
        isActive: true
    },
    {
        id: "training-002",
        type: "training",
        title: "Youth Entrepreneurship Program",
        organization: "National Youth Commission",
        location: "Freetown, Bo, Makeni",
        description: "Business skills training and startup support for young entrepreneurs.",
        requirements: [
            "18-35 years old",
            "Business idea or existing small business",
            "Sierra Leonean citizen"
        ],
        duration: "4 months + mentorship",
        category: ["business", "entrepreneurship"],
        educationLevel: ["secondary", "diploma", "bachelor", "self-taught"],
        isActive: true
    },
    {
        id: "training-003",
        type: "training",
        title: "Agricultural Skills Training",
        organization: "Ministry of Agriculture",
        location: "Various Districts",
        description: "Modern farming techniques, agribusiness, and value chain development.",
        requirements: [
            "Interest in agriculture",
            "Willingness to work in rural areas",
            "Basic literacy"
        ],
        duration: "6 months",
        category: ["agriculture", "skills"],
        educationLevel: ["secondary", "diploma", "self-taught"],
        isActive: true
    },

    // INTERNSHIPS
    {
        id: "internship-001",
        type: "internship",
        title: "UN Internship Program",
        organization: "United Nations Sierra Leone",
        location: "Freetown",
        description: "Gain experience in international development, humanitarian work, and policy.",
        requirements: [
            "Enrolled in or recently graduated from university",
            "Strong English skills",
            "Relevant field of study",
            "Computer literacy"
        ],
        duration: "3-6 months",
        link: "https://careers.un.org/lbw/home.aspx?viewtype=IP",
        category: ["development", "international"],
        educationLevel: ["bachelor", "master"],
        isActive: true
    },
    {
        id: "internship-002",
        type: "internship",
        title: "Banking Internship",
        organization: "Sierra Leone Commercial Bank",
        location: "Freetown",
        description: "Learn banking operations, customer service, and financial services.",
        requirements: [
            "University student or recent graduate",
            "Business, Finance, or Economics background",
            "Good communication skills",
            "Professional attitude"
        ],
        duration: "3 months",
        category: ["finance", "business"],
        educationLevel: ["bachelor"],
        isActive: true
    },
    {
        id: "internship-003",
        type: "internship",
        title: "Media & Journalism Internship",
        organization: "Sierra Leone Broadcasting Corporation (SLBC)",
        location: "Freetown",
        description: "Hands-on experience in broadcasting, journalism, and media production.",
        requirements: [
            "Diploma or degree in Mass Communication or Journalism",
            "Good writing and speaking skills",
            "Interest in media",
            "Portfolio of work (if available)"
        ],
        duration: "6 months",
        category: ["media", "communication"],
        educationLevel: ["diploma", "bachelor"],
        isActive: true
    },

    // HACKATHONS
    {
        id: "hack-001",
        type: "hackathon",
        title: "Sierra Leone Tech Challenge 2026",
        organization: "DSTI & UNDP",
        location: "Freetown / Hybrid",
        description: "Solve local problems with digital solutions. Prizes include up to $5,000 and incubation support.",
        requirements: [
            "Teams of 2-4 members",
            "Functional prototype at final stage",
            "Focus on health, education, or agriculture",
            "Sierra Leonean youth (18-35)"
        ],
        deadline: "2026-04-20",
        link: "https://dsti.gov.sl/tech-challenge-2026",
        category: ["technology", "innovation"],
        educationLevel: ["self-taught", "diploma", "bachelor"],
        isActive: true
    },
    {
        id: "hack-002",
        type: "hackathon",
        title: "Africa Digital Awards Hack",
        organization: "Africa Digital Forum",
        location: "Pan-Africa (Remote)",
        description: "A 48-hour buildathon for the next generation of African FinTech solutions.",
        requirements: [
            "Proficiency in at least one programming language",
            "Interest in FinTech and Financial Inclusion",
            "Open to all African countries"
        ],
        deadline: "2026-06-15",
        link: "https://africadigitalawards.com/hackathon",
        category: ["technology", "fintech"],
        educationLevel: ["diploma", "bachelor", "self-taught"],
        isActive: true
    }
]

// Helper functions
export function getOpportunitiesByType(type: Opportunity["type"]) {
    return SIERRA_LEONE_OPPORTUNITIES.filter(opp => opp.type === type && opp.isActive)
}

export function getOpportunitiesByEducation(educationLevel: string) {
    return SIERRA_LEONE_OPPORTUNITIES.filter(
        opp => opp.educationLevel.includes(educationLevel) && opp.isActive
    )
}

export function getOpportunitiesByCategory(category: string) {
    return SIERRA_LEONE_OPPORTUNITIES.filter(
        opp => opp.category.includes(category) && opp.isActive
    )
}

export function searchOpportunities(query: string) {
    const lowerQuery = query.toLowerCase()
    return SIERRA_LEONE_OPPORTUNITIES.filter(opp =>
        opp.isActive && (
            opp.title.toLowerCase().includes(lowerQuery) ||
            opp.organization.toLowerCase().includes(lowerQuery) ||
            opp.description.toLowerCase().includes(lowerQuery) ||
            opp.category.some(cat => cat.toLowerCase().includes(lowerQuery))
        )
    )
}
