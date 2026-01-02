// Sierra Leone Career Knowledge Base
// Comprehensive data for local AI fallback system

export interface CareerInfo {
    title: string;
    industry: string;
    description: string;
    salaryRange: string;
    salaryUSD: string;
    demand: 'High' | 'Medium' | 'Low';
    requiredEducation: string[];
    requiredSkills: string[];
    localInstitutions: string[];
    growthPotential: string;
    keywords: string[];
}

export const SIERRA_LEONE_CAREERS: CareerInfo[] = [
    {
        title: "Software Developer",
        industry: "Technology",
        description: "Design, develop, and maintain software applications and systems",
        salaryRange: "SLE 3,500 - 9,000 (approx. $150 - $400)/month",
        salaryUSD: "SLE 3,500 - 9,000 (approx. $150 - $400)/month",
        demand: "High",
        requiredEducation: ["Computer Science degree", "Self-taught with portfolio", "Coding bootcamp"],
        requiredSkills: ["JavaScript", "Python", "Problem-solving", "Git", "Web development"],
        localInstitutions: ["Fourah Bay College", "IPAM", "Njala University", "Online platforms (freeCodeCamp, Codecademy)"],
        growthPotential: "Excellent - Tech sector growing rapidly in Freetown",
        keywords: ["coding", "programming", "tech", "software", "developer", "web", "app"]
    },
    {
        title: "Nurse/Healthcare Worker",
        industry: "Healthcare",
        description: "Provide patient care, administer medications, and support medical teams",
        salaryRange: "SLE 2,800 - 6,800 (approx. $125 - $300)/month",
        salaryUSD: "SLE 2,800 - 6,800 (approx. $125 - $300)/month",
        demand: "High",
        requiredEducation: ["Nursing diploma/degree", "Medical training certificate"],
        requiredSkills: ["Patient care", "Medical knowledge", "Communication", "Empathy", "Emergency response"],
        localInstitutions: ["College of Medicine and Allied Health Sciences", "Njala University", "Holy Spirit Hospital School of Nursing"],
        growthPotential: "Very high - Healthcare infrastructure expanding",
        keywords: ["nurse", "healthcare", "medical", "doctor", "health", "patient", "hospital"]
    },
    {
        title: "Agricultural Officer",
        industry: "Agriculture",
        description: "Manage farming operations, improve crop yields, and advise farmers",
        salaryRange: "SLE 2,250 - 5,600 (approx. $100 - $250)/month",
        salaryUSD: "SLE 2,250 - 5,600 (approx. $100 - $250)/month",
        demand: "High",
        requiredEducation: ["Agriculture degree", "Agronomy certificate"],
        requiredSkills: ["Crop management", "Soil science", "Pest control", "Farm planning", "Extension services"],
        localInstitutions: ["Njala University", "Sierra Leone Agricultural Research Institute"],
        growthPotential: "Excellent - Agriculture is 60% of economy",
        keywords: ["farming", "agriculture", "crops", "agric", "farmer", "food", "cultivation"]
    },
    {
        title: "Teacher/Educator",
        industry: "Education",
        description: "Educate students, develop curriculum, and foster learning environments",
        salaryRange: "SLE 2,000 - 5,100 (approx. $90 - $225)/month",
        salaryUSD: "SLE 2,000 - 5,100 (approx. $90 - $225)/month",
        demand: "High",
        requiredEducation: ["Teaching certificate", "Education degree", "Subject specialization"],
        requiredSkills: ["Communication", "Patience", "Curriculum development", "Classroom management"],
        localInstitutions: ["Fourah Bay College", "Milton Margai College of Education", "Eastern Polytechnic"],
        growthPotential: "Good - Free Quality Education initiative expanding",
        keywords: ["teacher", "education", "teaching", "school", "classroom", "tutor", "lecturer"]
    },
    {
        title: "Mining Engineer",
        industry: "Mining",
        description: "Plan and oversee mining operations, ensure safety and efficiency",
        salaryRange: "SLE 5,600 - 13,500 (approx. $250 - $600)/month",
        salaryUSD: "SLE 5,600 - 13,500 (approx. $250 - $600)/month",
        demand: "High",
        requiredEducation: ["Mining engineering degree", "Geology degree"],
        requiredSkills: ["Geological analysis", "Safety protocols", "Equipment operation", "Project management"],
        localInstitutions: ["Fourah Bay College", "Njala University", "International training programs"],
        growthPotential: "Excellent - Mining is major economic sector",
        keywords: ["mining", "engineer", "geology", "minerals", "extraction", "diamonds", "gold"]
    },
    {
        title: "Accountant",
        industry: "Finance",
        description: "Manage financial records, prepare reports, and ensure compliance",
        salaryRange: "SLE 3,400 - 7,900 (approx. $150 - $350)/month",
        salaryUSD: "SLE 3,400 - 7,900 (approx. $150 - $350)/month",
        demand: "Medium",
        requiredEducation: ["Accounting degree", "ACCA/CPA certification"],
        requiredSkills: ["Financial analysis", "Bookkeeping", "Tax preparation", "Excel", "Attention to detail"],
        localInstitutions: ["IPAM", "Fourah Bay College", "University of Makeni"],
        growthPotential: "Good - Every business needs accountants",
        keywords: ["accounting", "finance", "bookkeeping", "financial", "accountant", "money", "budget"]
    },
    {
        title: "Civil Engineer",
        industry: "Engineering",
        description: "Design and supervise construction of infrastructure projects",
        salaryRange: "SLE 4,500 - 11,250 (approx. $200 - $500)/month",
        salaryUSD: "SLE 4,500 - 11,250 (approx. $200 - $500)/month",
        demand: "High",
        requiredEducation: ["Civil engineering degree"],
        requiredSkills: ["AutoCAD", "Structural design", "Project management", "Construction knowledge"],
        localInstitutions: ["Fourah Bay College", "Njala University", "COMAHS"],
        growthPotential: "Excellent - Infrastructure development ongoing",
        keywords: ["civil", "engineer", "construction", "building", "infrastructure", "roads", "bridges"]
    },
    {
        title: "Marketing Manager",
        industry: "Business",
        description: "Develop marketing strategies, manage campaigns, and drive sales",
        salaryRange: "SLE 3,900 - 9,000 (approx. $175 - $400)/month",
        salaryUSD: "SLE 3,900 - 9,000 (approx. $175 - $400)/month",
        demand: "Medium",
        requiredEducation: ["Marketing degree", "Business administration"],
        requiredSkills: ["Digital marketing", "Social media", "Brand management", "Communication", "Analytics"],
        localInstitutions: ["IPAM", "Fourah Bay College", "University of Makeni"],
        growthPotential: "Good - Growing business sector",
        keywords: ["marketing", "business", "sales", "advertising", "promotion", "brand", "digital"]
    },
    {
        title: "Telecommunications Technician",
        industry: "Technology",
        description: "Install, maintain, and repair telecommunications equipment",
        salaryRange: "SLE 2,800 - 6,750 (approx. $125 - $300)/month",
        salaryUSD: "SLE 2,800 - 6,750 (approx. $125 - $300)/month",
        demand: "High",
        requiredEducation: ["Technical diploma", "Electronics certificate"],
        requiredSkills: ["Network installation", "Troubleshooting", "Electronics", "Customer service"],
        localInstitutions: ["Eastern Polytechnic", "Technical institutes", "On-the-job training"],
        growthPotential: "Very high - Mobile/internet expansion",
        keywords: ["telecom", "telecommunications", "network", "phone", "internet", "technician", "mobile"]
    },
    {
        title: "NGO Program Officer",
        industry: "Non-Profit",
        description: "Manage development programs, coordinate projects, and support communities",
        salaryRange: "SLE 3,400 - 8,400 (approx. $150 - $375)/month",
        salaryUSD: "SLE 3,400 - 8,400 (approx. $150 - $375)/month",
        demand: "Medium",
        requiredEducation: ["Development studies", "Social sciences degree", "Public health"],
        requiredSkills: ["Project management", "Community engagement", "Report writing", "Grant writing"],
        localInstitutions: ["Fourah Bay College", "Njala University", "IPAM"],
        growthPotential: "Good - Active NGO sector",
        keywords: ["ngo", "development", "nonprofit", "community", "social", "humanitarian", "aid"]
    },
    {
        title: "Electrician",
        industry: "Skilled Trade",
        description: "Install and maintain electrical systems in buildings and facilities",
        salaryRange: "SLE 2,250 - 6,200 (approx. $100 - $275)/month",
        salaryUSD: "SLE 2,250 - 6,200 (approx. $100 - $275)/month",
        demand: "High",
        requiredEducation: ["Technical training", "Apprenticeship", "Electrical certificate"],
        requiredSkills: ["Wiring", "Safety protocols", "Troubleshooting", "Blueprint reading"],
        localInstitutions: ["Eastern Polytechnic", "Technical institutes", "Trade schools"],
        growthPotential: "Very good - Construction boom in Freetown",
        keywords: ["electrician", "electrical", "wiring", "power", "electricity", "trade", "technician"]
    },
    {
        title: "Journalist/Media Professional",
        industry: "Media",
        description: "Report news, create content, and inform the public",
        salaryRange: "SLE 2,250 - 5,600 (approx. $100 - $250)/month",
        salaryUSD: "SLE 2,250 - 5,600 (approx. $100 - $250)/month",
        demand: "Medium",
        requiredEducation: ["Journalism degree", "Mass communication"],
        requiredSkills: ["Writing", "Research", "Interviewing", "Video editing", "Social media"],
        localInstitutions: ["Fourah Bay College", "IPAM", "Media training centers"],
        growthPotential: "Good - Growing media landscape",
        keywords: ["journalist", "media", "news", "reporter", "writing", "broadcasting", "communication"]
    }
];

export const CAREER_CATEGORIES = {
    technology: ["Software Developer", "Telecommunications Technician"],
    healthcare: ["Nurse/Healthcare Worker"],
    agriculture: ["Agricultural Officer"],
    education: ["Teacher/Educator"],
    mining: ["Mining Engineer"],
    finance: ["Accountant"],
    engineering: ["Civil Engineer"],
    business: ["Marketing Manager"],
    nonprofit: ["NGO Program Officer"],
    trades: ["Electrician"],
    media: ["Journalist/Media Professional"]
};

export const UNIVERSITIES = [
    "Fourah Bay College (FBC)",
    "Njala University",
    "University of Makeni (UNIMAK)",
    "IPAM (USL)",
    "COMAHS (USL)",
    "Milton Margai University",
    "Ernest Bai Koroma University",
    "Eastern Technical University"
];

export const ONLINE_RESOURCES = [
    "freeCodeCamp (coding)",
    "Coursera (various subjects)",
    "Khan Academy (math, science)",
    "edX (university courses)",
    "YouTube tutorials",
    "Codecademy (programming)",
    "Udemy (affordable courses)",
    "Google Digital Skills"
];
