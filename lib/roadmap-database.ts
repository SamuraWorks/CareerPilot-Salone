
// CareerPilot Salone - Comprehensive Roadmap Database
// "Locked Down" Version - Strictly Verified Data Only

export interface RoadmapSection {
    focus: string;
    skills: string[];
    activities: string[];
}

export interface StudyPathway {
    institution: string;
    program: string;
    duration: string;
    location: string;
    type: 'Degree' | 'Diploma' | 'Certificate' | 'Professional' | 'Vocational' | 'HND';
}

export interface RoadmapTemplate {
    id: string; // unique key
    category: string;
    title: string;
    keywords: string[];
    image: string;

    // 1. Career Overview
    overview: string;
    demandLevel: 'High' | 'Medium' | 'Low';

    // 2. Entry Requirements
    entryRequirements: {
        education: string;
        subjects?: string[];
        certification?: string;
        technicalSkills?: string[];
        note?: string; // For informal paths
    };

    // 3. Study & Training Pathways
    studyPathways: StudyPathway[];

    // 4. Skill Roadmap (90-Day)
    skillRoadmap: {
        month1: RoadmapSection;
        month2: RoadmapSection;
        month3: RoadmapSection;
    };

    // 5. Job & Opportunity Mapping
    careerPath: {
        entryTitles: string[];
        employers: string[]; // Specific SL context
        workspace: string; // "Field", "Office", "Remote", etc.
    };

    // 6. Salary Reality
    salary: {
        entry: string;
        experienced: string;
        note: string;
    };

    // 7. Mentorship Direction
    mentorship: {
        type: string;
        source: string;
    };

    // 8. Next 3 Clear Actions
    immediateActions: [string, string, string];
}

export const CAREER_ROADMAPS: RoadmapTemplate[] = [
    // ==========================================
    // TECHNOLOGY
    // ==========================================
    {
        id: 'software-developer',
        category: 'Technology',
        title: 'Software Developer',
        keywords: ['programmer', 'coder', 'web developer', 'app developer', 'frontend', 'backend', 'fullstack'],
        image: '/images/sections/careers/technology.png',
        overview: 'Software developers build applications, websites, and systems for businesses, NGOs, and government agencies in Sierra Leone. It is a high-growth field centered in Freetown but with remote possibilities.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'BSc Computer Science or Strong Portfolio',
            subjects: ['Mathematics', 'English', 'Physics/ICT'],
            technicalSkills: ['HTML/CSS', 'JavaScript', 'Python'],
            note: 'Self-taught developers with strong portfolios are frequently hired by local tech firms.'
        },
        studyPathways: [
            { institution: 'Fourah Bay College', program: 'BSc Computer Science', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'IPAM', program: 'BSc Information Systems', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'BlueCrest College', program: 'Software Engineering', duration: '3-4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Online / Self-Paced', program: 'FreeCodeCamp / Coursera', duration: '6-12 Months', location: 'Remote', type: 'Certificate' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Web Foundations',
                skills: ['HTML5', 'CSS3', 'Basic JavaScript', 'Git/GitHub'],
                activities: ['Build a personal CV website', 'Complete FreeCodeCamp Responsive Web Design', 'Create a GitHub account and push code']
            },
            month2: {
                focus: 'Frontend Logic',
                skills: ['Advanced JavaScript', 'DOM Manipulation', 'Basic React.js', 'API consumption'],
                activities: ['Build a To-Do List app', 'Fetch data from a public API', 'Join a local WhatsApp tech group']
            },
            month3: {
                focus: 'Backend & Portfolio',
                skills: ['Node.js basics', 'Database basics (SQL/NoSQL)', 'Deployment (Vercel/Netlify)'],
                activities: ['Build a full project (e.g., small inventory system)', 'Deploy project online', 'Apply for 3 internships']
            }
        },
        careerPath: {
            entryTitles: ['Junior Developer', 'IT Intern', 'Web Design Assistant', 'Frontend Developer'],
            employers: ['iDT Labs', 'Sierratel', 'Africell', 'NGOs (Tech Support)', 'Local Banks'],
            workspace: 'Office-based in Freetown, often with flexible remote options.'
        },
        salary: {
            entry: 'SLE 3,500 - 6,000',
            experienced: 'SLE 8,000 - 15,000+',
            note: 'Remote work for foreign clients can significantly increase income (USD).'
        },
        mentorship: {
            type: 'Senior Developer or Tech Lead',
            source: 'Connect with seniors at local tech meetups or via LinkedIn (filter for Freetown).'
        },
        immediateActions: [
            'Create a GitHub account today.',
            'Start the "Responsive Web Design" course on FreeCodeCamp.',
            'Join the "Sierra Leone Developers" community on social media.'
        ]
    },
    {
        id: 'data-analyst',
        category: 'Technology',
        title: 'Data Analyst',
        keywords: ['data', 'analysis', 'statistics', 'excel', 'sql', 'reporting'],
        image: '/images/sections/careers/technology.png',
        overview: 'Data analysts interpret complex data to help organizations make better decisions. In Sierra Leone, NGOs and Banks are the primary employers, using data for M&E (Monitoring and Evaluation) and financial reporting.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'Degree in Economics, Statistics, Math, or Computer Science',
            subjects: ['Mathematics', 'Economics', 'English'],
            technicalSkills: ['Advanced Excel', 'SQL', 'PowerBI/Tableau'],
            certification: 'Google Data Analytics (Optional but recommended)'
        },
        studyPathways: [
            { institution: 'Fourah Bay College', program: 'BSc Economics / Statistics', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'IPAM', program: 'BSc Information Systems', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Njala University', program: 'BSc Statistics', duration: '4 Years', location: 'Mokonde/Bo', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Excel Mastery',
                skills: ['Pivot Tables', 'VLOOKUP/XLOOKUP', 'Data Cleaning', 'Data Visualization basics'],
                activities: ['Clean a sample messy dataset', 'Create a dashboard in Excel', 'Take a free Excel proficiency test']
            },
            month2: {
                focus: 'SQL & Database',
                skills: ['SQL Queries (SELECT, JOIN)', 'Database Theory', 'Basic Statistical Analysis'],
                activities: ['Install MySQL or PostgreSQL', 'Practice querying sample databases', 'Analyze a public SL dataset (e.g., Census)']
            },
            month3: {
                focus: 'Visualization & Storytelling',
                skills: ['PowerBI or Tableau', 'Presentation Skills', 'Report Writing'],
                activities: ['Build a visual report of your analysis', 'Write a one-page summary of findings', 'Update LinkedIn with "Data Analysis" projects']
            }
        },
        careerPath: {
            entryTitles: ['M&E Assistant', 'Data Enter Clerk', 'Junior Data Analyst', 'Operations Assistant'],
            employers: ['NGOs (World Vision, Care)', 'Orange/Africell', 'Banks (Rokel, EcoBank)', 'Statistics Sierra Leone'],
            workspace: 'Office-based, often involving field data collection oversight.'
        },
        salary: {
            entry: 'SLE 4,000 - 7,000',
            experienced: 'SLE 9,000 - 18,000',
            note: 'International NGOs often pay in USD or pegged rates.'
        },
        mentorship: {
            type: 'M&E Specialist or Senior Analyst',
            source: 'Look for "Monitoring and Evaluation" professionals in NGOs.'
        },
        immediateActions: [
            'Master Excel Pivot Tables this week.',
            'Download a sample dataset from HDX (Humanitarian Data Exchange) for Sierra Leone.',
            'Update your CV to highlight any reporting or analytical experience.'
        ]
    },
    {
        id: 'network-administrator',
        category: 'Technology',
        title: 'Network Administrator',
        keywords: ['networking', 'cisco', 'sysadmin', 'internet', 'router', 'switch', 'wifi'],
        image: '/images/sections/careers/technology.png',
        overview: 'Network Admins maintain the digital connectivity of organizations. They ensure internet access, server uptime, and data security. Critical for banks, ISPs, and large government offices.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'Degree/Diploma in IT or Computer Science',
            certification: 'CompTIA Network+ or CCNA (Highly Valued)',
            technicalSkills: ['IP Addressing', 'Cabling', 'Router Configuration']
        },
        studyPathways: [
            { institution: 'BlueCrest College', program: 'Network Engineering', duration: '3 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'IPAM', program: 'BSc Information Systems', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Professional Institutes', program: 'CCNA Training', duration: '3-6 Months', location: 'Freetown', type: 'Professional' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Networking Basics',
                skills: ['OSI Model', 'IP Addressing (IPv4/6)', 'Cabling Standards', 'Basic Troubleshooting'],
                activities: ['Configure a home router', 'Make a network cable (crimping)', 'Pass a Network+ practice quiz']
            },
            month2: {
                focus: 'Configuration',
                skills: ['Cisco iOS basics', 'Switch Configuration', 'VLANs', 'Wireless Setup'],
                activities: ['Use Packet Tracer to simulate a network', 'configure a small office network simulation', 'Learn subnetting']
            },
            month3: {
                focus: 'Server & Security',
                skills: ['Windows Server basics', 'Active Directory', 'Firewall basics', 'VPNs'],
                activities: ['Set up a local file server', 'Configure user permissions', 'Apply for IT Support/Jr Admin roles']
            }
        },
        careerPath: {
            entryTitles: ['IT Support Officer', 'Network Technician', 'Junior Network Admin', 'NOC Engineer'],
            employers: ['ISPs (Africell, Orange, QCell)', 'Banks', 'Mining Companies', 'Government Ministries'],
            workspace: 'Server rooms and office desks. Occasional travel to branches.'
        },
        salary: {
            entry: 'SLE 3,500 - 7,500',
            experienced: 'SLE 9,000 - 20,000',
            note: 'Certifications (CCNA/CCNP) directly impact salary potential.'
        },
        mentorship: {
            type: 'Senior Network Engineer',
            source: 'ISPs and Banks have the most experienced network teams.'
        },
        immediateActions: [
            'Download Cisco Packet Tracer.',
            'Learn to calculate Subnets perfectly.',
            'Visit a local computer institute to ask about CCNA exam costs.'
        ]
    },

    // ==========================================
    // HEALTHCARE
    // ==========================================
    {
        id: 'nurse',
        category: 'Healthcare',
        title: 'Nurse',
        keywords: ['nursing', 'health', 'hospital', 'patient', 'medical', 'srn', 'midwife'],
        image: '/images/sections/careers/healthcare.png',
        overview: 'Nurses are the backbone of Sierra Leone’s healthcare, providing direct patient care, medication administration, and health education in hospitals and community health centers (CHCs).',
        demandLevel: 'High',
        entryRequirements: {
            education: 'Diploma (SRN) or BSc Nursing',
            subjects: ['Biology', 'Chemistry', 'English', 'Mathematics'],
            certification: 'Nurses and Midwives Board License'
        },
        studyPathways: [
            { institution: 'COMAHS', program: 'BSc Nursing', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Njala University', program: 'BSc Nursing', duration: '4 Years', location: 'Bo/Njala', type: 'Degree' },
            { institution: 'Holy Spirit Hospital', program: 'Nursing Diploma', duration: '3 Years', location: 'Makeni', type: 'Diploma' },
            { institution: 'School of Midwifery', program: 'Midwifery', duration: '2 Years', location: 'Freetown/Makeni', type: 'Diploma' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Science Foundations',
                skills: ['Anatomy', 'Physiology', 'First Aid', 'Patient Hygiene'],
                activities: ['Review biology notes', 'Learn CPR basics', 'Volunteer at a local clinic']
            },
            month2: {
                focus: 'Clinical Skills',
                skills: ['Taking Vitals (BP, Temp)', 'Injections', 'Wound Dressing', 'Medical Charting'],
                activities: ['Practice taking blood pressure', 'Observe wound dressing procedures', 'Study common drug names']
            },
            month3: {
                focus: 'Specialty & Licensing',
                skills: ['Maternal Health', 'Pediatric Care', 'Public Health Protocols', 'Ethics'],
                activities: ['Prepare for entrance exams', 'Apply to nursing schools', 'Register for pre-med workshops']
            }
        },
        careerPath: {
            entryTitles: ['State Enrolled Community Health Nurse', 'Staff Nurse', 'Midwife'],
            employers: ['Government Hospitals (Connaught, PCM)', 'Private Clinics (Choithram)', 'NGOs (MSF, Partners in Health)'],
            workspace: 'Hospitals, Clinics, and rural Community Health Posts.'
        },
        salary: {
            entry: 'SLE 2,500 - 4,500',
            experienced: 'SLE 5,000 - 10,000',
            note: 'Private and NGO roles pay significantly higher than basic government scales.'
        },
        mentorship: {
            type: 'Matron or Senior Nursing Officer',
            source: 'Hospital nursing administration offices.'
        },
        immediateActions: [
            'Check WASSCE requirements for COMAHS/Njala.',
            'Visit the nearest government hospital to speak with a nurse.',
            'Brush up on Senior Secondary Biology.'
        ]
    },
    {
        id: 'medical-doctor',
        category: 'Healthcare',
        title: 'Medical Doctor',
        keywords: ['physician', 'surgeon', 'gp', 'medicine', 'hospital', 'doctor'],
        image: '/images/sections/careers/healthcare.png',
        overview: 'Medical Doctors diagnose and treat diseases. In Sierra Leone, they are leaders in the healthcare system, often managing entire units or rural districts. It requires rigorous training.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'MBChB (Bachelor of Medicine, Bachelor of Surgery)',
            subjects: ['Biology', 'Chemistry', 'Physics', 'English', 'Math (Excellent Grades Required)'],
            certification: 'Medical and Dental Council Registration'
        },
        studyPathways: [
            { institution: 'COMAHS', program: 'MBChB Medicine & Surgery', duration: '6 Years + 1 Yr Housemanship', location: 'Freetown', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Pre-Med Sciences',
                skills: ['Advanced Biology', 'Organic Chemistry', 'Physics', 'Critical Thinking'],
                activities: ['Study for COMAHS entrance exam', 'Shadow a doctor', 'Read "Where There Is No Doctor"']
            },
            month2: {
                focus: 'Clinical Exposure',
                skills: ['Medical Terminology', 'Patient Empathy', 'Hospital Workflow', 'Observation'],
                activities: ['Volunteer as a ward assistant', 'Learn to use a stethoscope', 'Interview a medical student']
            },
            month3: {
                focus: 'Academic Prep',
                skills: ['Study Habits', 'Time Management', 'Scientific Writing', 'Resilience'],
                activities: ['Submit COMAHS application', 'Join a study group', 'Save for textbooks']
            }
        },
        careerPath: {
            entryTitles: ['House Officer', 'Medical Officer'],
            employers: ['Ministry of Health', 'Connaught Hospital', 'Ola During Hospital', 'Private Hospitals'],
            workspace: 'Clinical settings, often high-stress and long hours.'
        },
        salary: {
            entry: 'SLE 6,000 - 10,000',
            experienced: 'SLE 15,000 - 30,000+',
            note: 'Specialists (Surgeons, Cardiologists) earn the highest brackets.'
        },
        mentorship: {
            type: 'Consultant or Senior Medical Officer',
            source: 'Teaching hospitals like Connaught.'
        },
        immediateActions: [
            'Get your WASSCE results verified.',
            'Purchase COMAHS application form immediately when out.',
            'Find a quiet place to study daily for the entrance exam.'
        ]
    },

    // ==========================================
    // ENGINEERING & MINING
    // ==========================================
    {
        id: 'mining-engineer',
        category: 'Engineering',
        title: 'Mining Engineer',
        keywords: ['mining', 'geology', 'extraction', 'rutile', 'bauxite', 'engineer'],
        image: '/images/sections/careers/mining.png',
        overview: 'Mining Engineers design and manage mines for safe and efficient mineral extraction. With SL\'s wealth in Rutile, Bauxite, Iron Ore, and Diamonds, this is a sector with heavy industrial demand.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'BSc Mining Engineering or Geology',
            subjects: ['Mathematics', 'Physics', 'Chemistry', 'Geography'],
            technicalSkills: ['AutoCAD', 'Geological Mapping', 'Safety Management']
        },
        studyPathways: [
            { institution: 'Fourah Bay College', program: 'BSc Mining Engineering', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Fourah Bay College', program: 'BSc Geology', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'University of Makeni', program: 'Computer Science (Tech in Mining)', duration: '4 Years', location: 'Makeni', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Geology & Math',
                skills: ['Calculus', 'Mineralogy', 'Physics mechanics', 'Map Reading'],
                activities: ['Review geography of SL mineral deposits', 'Brush up on advanced math', 'Visit the National Minerals Agency website']
            },
            month2: {
                focus: 'Engineering Tools',
                skills: ['AutoCAD Basics', 'Surveying', 'Safety Protocols (HSE)', 'Data logging'],
                activities: ['Learn basic AutoCAD commands', 'Read a mining impact report', 'Understand open-pit vs underground mining']
            },
            month3: {
                focus: 'Industry Readiness',
                skills: ['Project Management', 'Environmental standards', 'Technical Reporting'],
                activities: ['Apply for internship at Sierra Rutile or Leone Rock', 'Attend SLIE engineering workshops', 'Prepare CV with technical focus']
            }
        },
        careerPath: {
            entryTitles: ['Graduate Trainee Engineer', 'Geologist Assistant', 'Mine Surveyor', 'Safety Officer'],
            employers: ['Sierra Rutile', 'Leone Rock', 'Koidu Limited', 'National Minerals Agency'],
            workspace: 'Field sites (Moyamba, Port Loko, Kono) and Freetown HQs.'
        },
        salary: {
            entry: 'SLE 5,000 - 9,000',
            experienced: 'SLE 12,000 - 30,000+',
            note: 'Site-based roles often provide accommodation and allowances.'
        },
        mentorship: {
            type: 'Senior Mining Engineer',
            source: 'Sierra Leone Institution of Engineers (SLIE).'
        },
        immediateActions: [
            'Confirm FBC Engineering admission requirements.',
            'Read up on the latest mining regulations in Sierra Leone.',
            'Look for internship notices from Leone Rock.'
        ]
    },
    {
        id: 'civil-engineer',
        category: 'Engineering',
        title: 'Civil Engineer',
        keywords: ['construction', 'structural', 'roads', 'building', 'infrastructure', 'engineer'],
        image: '/images/sections/careers/mining.png',
        overview: 'Civil Engineers plan and supervise the construction of roads, bridges, and buildings. With ongoing infrastructure projects across Sierra Leone, this is a stable and respected career.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'BSc Civil Engineering',
            subjects: ['Mathematics', 'Physics', 'Further Math', 'English'],
            technicalSkills: ['AutoCAD', 'Structural Analysis', 'Project Management']
        },
        studyPathways: [
            { institution: 'Fourah Bay College', program: 'BSc Civil Engineering', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Njala University', program: 'BSc Agricultural Engineering', duration: '4 Years', location: 'Njala', type: 'Degree' },
            { institution: 'Freetown Polytechnic', program: 'Diploma in Civil Engineering', duration: '2-3 Years', location: 'Freetown', type: 'Diploma' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Math & Design',
                skills: ['Engineering Math', 'Technical Drawing', 'Physics', 'Materials Science'],
                activities: ['Practice technical sketching', 'Review physics (mechanics)', 'Visit a local construction site']
            },
            month2: {
                focus: 'Digital Tools',
                skills: ['AutoCAD', 'Excel for cost estimation', 'Surveying basics'],
                activities: ['Design a simple floor plan in AutoCAD', 'Learn about concrete mixing ratios', 'Study SL Road Authority standards']
            },
            month3: {
                focus: 'Site Management',
                skills: ['Project scheduling', 'Safety regulations', 'Team supervision'],
                activities: ['Understand Bill of Quantities (BOQ)', 'Apply for internships at construction firms', 'Register as student member of SLIE']
            }
        },
        careerPath: {
            entryTitles: ['Site Engineer', 'Civil Engineer Intern', 'Construction Supervisor'],
            employers: ['CSE', 'Pavi Fort', 'Ministry of Works', 'Private Construction Firms', 'NGOs (WASH projects)'],
            workspace: 'Construction sites and project offices.'
        },
        salary: {
            entry: 'SLE 4,000 - 8,000',
            experienced: 'SLE 10,000 - 25,000',
            note: 'Consultancy work pays very well for experienced engineers.'
        },
        mentorship: {
            type: 'Registered Professional Engineer',
            source: 'SLIE or senior site managers.'
        },
        immediateActions: [
            'Download a trial version of AutoCAD.',
            'Visit the SLIE office to ask about student membership.',
            'Identify 3 major road/building projects in your area.'
        ]
    },

    // ==========================================
    // BUSINESS & FINANCE
    // ==========================================
    {
        id: 'accountant',
        category: 'Finance',
        title: 'Accountant',
        keywords: ['accounting', 'finance', 'audit', 'tax', 'bookkeeping', 'cpa', 'acca'],
        image: '/images/sections/careers/finance.png',
        overview: 'Accountants manage financial records, ensure tax compliance, and help businesses run efficiently. In Sierra Leone, they are essential in Banks, NGOs, Government (NRA), and private firms.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'BSc Accounting or Applied Accounting',
            subjects: ['Mathematics', 'Economics', 'English', 'Business Management'],
            certification: 'ACCA or CAT (Highly Recommended)',
            technicalSkills: ['QuickBooks', 'Excel', 'Tally']
        },
        studyPathways: [
            { institution: 'IPAM', program: 'BSc Applied Accounting', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Fourah Bay College', program: 'BSc Accounting', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'University of Makeni', program: 'BSc Accounting/Finance', duration: '4 Years', location: 'Makeni', type: 'Degree' },
            { institution: 'Professional Institutes', program: 'ACCA / CAT', duration: 'Varies', location: 'Freetown', type: 'Professional' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Accounting Basics',
                skills: ['Debits/Credits', 'General Ledger', 'Excel Fomulas', 'Financial Statements'],
                activities: ['Review basic accounting principles', 'Setup a mock budget in Excel', 'Learn about NRA tax types (GST, PAYE)']
            },
            month2: {
                focus: 'Software Proficiency',
                skills: ['QuickBooks intro', 'Advanced Excel', 'Tax Filing'],
                activities: ['Take a free QuickBooks tutorial', 'Practice calculating PAYE for a mock salary', 'Learn to read a Balance Sheet']
            },
            month3: {
                focus: 'Professional Prep',
                skills: ['Auditing basics', 'Ethics', 'Reporting'],
                activities: ['Apply for internships at Audit Service SL or Banks', 'Register as a student with ACCA if possible', 'Update CV']
            }
        },
        careerPath: {
            entryTitles: ['Accounts Clerk', 'Finance Assistant', 'Audit Trainee', 'Bookkeeper'],
            employers: ['Banks (RCB, SLCB)', 'Audit Firms (KPMG, Baker Tilly)', 'National Revenue Authority', 'NGOs'],
            workspace: 'Office environment, deadline-driven.'
        },
        salary: {
            entry: 'SLE 3,000 - 6,000',
            experienced: 'SLE 8,000 - 20,000',
            note: 'Chartered Accountants (ACCA) earn significantly more.'
        },
        mentorship: {
            type: 'Chartered Accountant',
            source: 'Institute of Chartered Accountants of Sierra Leone (ICASL).'
        },
        immediateActions: [
            'Master Microsoft Excel (especially VLOOKUP).',
            'Read the specific IPAM admission requirements.',
            'Visit the ICASL website to understand certification.'
        ]
    },
    {
        id: 'marketing-manager',
        category: 'Business',
        title: 'Marketing Manager',
        keywords: ['marketing', 'sales', 'brand', 'advertising', 'digital', 'social media'],
        image: '/images/sections/careers/finance.png',
        overview: 'Marketing Managers drive growth by promoting products and services. In SL, this is shifting towards Digital Marketing, but traditional radio/print/billboard marketing remains huge.',
        demandLevel: 'Medium',
        entryRequirements: {
            education: 'Degree in Business Administration or Marketing',
            subjects: ['English', 'Business Management', 'Economics'],
            technicalSkills: ['Social Media Management', 'Copywriting', 'Design Basics']
        },
        studyPathways: [
            { institution: 'IPAM', program: 'BSc Business Administration (Marketing)', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Njala University', program: 'BSc Business Administration', duration: '4 Years', location: 'Bo/Njala', type: 'Degree' },
            { institution: 'UNIMAK', program: 'BSc Business Management', duration: '4 Years', location: 'Makeni', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Core Concepts',
                skills: ['4 Ps of Marketing', 'Consumer Behavior', 'English Writing'],
                activities: ['Read "Marketing Management" summaries', 'Analyze 3 local ads (Africell/Orange)', 'Start a professional LinkedIn profile']
            },
            month2: {
                focus: 'Digital & Content',
                skills: ['Social Media Strategy', 'Canva Basics', 'Content Writing'],
                activities: ['Create a mock campaign for a local product', 'Design a flyer in Canva', 'Learn Facebook Ad basics']
            },
            month3: {
                focus: 'Strategy & Sales',
                skills: ['Sales techniques', 'Campaign Planning', 'Analytics'],
                activities: ['Apply for marketing internships', 'Offer to manage a small business social page', 'Network at business events']
            }
        },
        careerPath: {
            entryTitles: ['Marketing Assistant', 'Sales Representative', 'Social Media Manager', 'Brand Ambassador'],
            employers: ['Teleoms (Africell/Orange)', 'Beverage Companies', 'Banks', 'Retail Stores'],
            workspace: 'Office and field (events, client visits).'
        },
        salary: {
            entry: 'SLE 3,000 - 7,000',
            experienced: 'SLE 8,000 - 18,000',
            note: 'Sales-based roles often include commissions.'
        },
        mentorship: {
            type: 'Marketing Director',
            source: 'LinkedIn (Connect with marketing heads in Freetown).'
        },
        immediateActions: [
            'Create a free Canva account and design a poster.',
            'Take the free "Google Digital Marketing" course.',
            'Follow top Sierra Leonean brands to see how they post.'
        ]
    },
    {
        id: 'hr-manager',
        category: 'Business',
        title: 'Human Resources Manager',
        keywords: ['hr', 'personnel', 'recruitment', 'training', 'staff', 'admin'],
        image: '/images/sections/careers/finance.png',
        overview: 'HR Managers handle recruitment, staff welfare, payroll, and training. They are the link between management and employees, essential for any mid-to-large organization.',
        demandLevel: 'Medium',
        entryRequirements: {
            education: 'Degree in HR Management, Public Admin, or Psychology',
            subjects: ['English', 'Government', 'History', 'Economics'],
            certification: 'HR Professional Cert'
        },
        studyPathways: [
            { institution: 'IPAM', program: 'BSc Public Sector Management', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Fourah Bay College', program: 'BA History/Sociology', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'UNIMAK', program: 'BSc Human Resource Management', duration: '4 Years', location: 'Makeni', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'HR Foundations',
                skills: ['Labor Laws of SL', 'Recruitment Cycle', 'Communication'],
                activities: ['Read the SL Employment Act', 'Practice writing job descriptions', 'Learn about workplace ethics']
            },
            month2: {
                focus: 'Admin & Systems',
                skills: ['Payroll basics', 'Record keeping', 'Interviewing'],
                activities: ['Create a mock employee database in Excel', 'Roleplay an interview', 'Learn about NASSIT deductions']
            },
            month3: {
                focus: 'Strategic HR',
                skills: ['Conflict Resolution', 'Performance Mgmt', 'Employee Relations'],
                activities: ['Apply for HR Assistant roles', 'Volunteer to help organize an event', 'Write a CV advice article']
            }
        },
        careerPath: {
            entryTitles: ['HR Assistant', 'Admin Officer', 'Recruitment Intern'],
            employers: ['Mining Companies', 'NGOs', 'Banks', 'Government Ministries'],
            workspace: 'Office-based, confidentiality is key.'
        },
        salary: {
            entry: 'SLE 3,000 - 6,000',
            experienced: 'SLE 8,000 - 18,000',
            note: 'Large multinationals pay HR Managers very well.'
        },
        mentorship: {
            type: 'HR Director',
            source: 'Join HR professional groups on WhatsApp/LinkedIn.'
        },
        immediateActions: [
            'Read up on NASSIT and PAYE calculations.',
            'Review the IPAM HR course syllabus.',
            'Clean up your own social media presence.'
        ]
    },
    {
        id: 'entrepreneur',
        category: 'Business',
        title: 'Entrepreneur',
        keywords: ['business', 'startup', 'innovation', 'founder', 'ceo', 'trade'],
        image: '/images/sections/careers/finance.png',
        overview: 'Entrepreneurs start and run their own businesses. In SL, this ranges from tech startups to agribusiness, retail, and services. It requires grit, risk-taking, and financial literacy.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'Open',
            note: 'Formal education helps, but hustle and market fit are king.',
            technicalSkills: ['Sales', 'Budgeting', 'Product Knowledge']
        },
        studyPathways: [
            { institution: 'IPAM', program: 'BSc Entrepreneurship', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Orange Corners', program: 'Incubation Program', duration: '6 Months', location: 'Freetown', type: 'Vocational' },
            { institution: 'Aurora Foundation', program: 'Business Training', duration: 'Short Courses', location: 'Freetown', type: 'Certificate' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Ideation & Market',
                skills: ['Market Research', 'Problem Solving', 'Customer Discovery'],
                activities: ['Identify a specific problem to solve', 'Interview 10 potential customers', 'Map out competitors']
            },
            month2: {
                focus: 'Model & Finance',
                skills: ['Business Model Canvas', 'Pricing', 'Costing'],
                activities: ['Draft a simple business plan', 'Calculate startup costs', 'Register business name (if ready)']
            },
            month3: {
                focus: 'Launch & Sales',
                skills: ['Sales', 'Pitching', 'Digital Marketing'],
                activities: ['Create an MVP', 'Make your first sale', 'Pitch to a mentor']
            }
        },
        careerPath: {
            entryTitles: ['Founder', 'Co-Founder', 'Managing Director'],
            employers: ['Self-Employed'],
            workspace: 'Anywhere.'
        },
        salary: {
            entry: 'Variable',
            experienced: 'Unlimited',
            note: 'High risk, high reward.'
        },
        mentorship: {
            type: 'Established Founder',
            source: 'Innovation hubs (Freetown Pitch Night).'
        },
        immediateActions: [
            'Write down 3 business ideas.',
            'Visit a market to check prices.',
            'Watch local pitch nights online.'
        ]
    },
    {
        id: 'project-manager',
        category: 'Business',
        title: 'Project Manager',
        keywords: ['project', 'pmp', 'coordinator', 'planning', 'management'],
        image: '/images/sections/careers/finance.png',
        overview: 'Project Managers ensure projects are completed on time, within budget, and to scope. Highly valued in NGOs and Construction.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'Degree in Management, Engineering, or Dev Studies',
            certification: 'PMP or Prince2',
            technicalSkills: ['MS Project', 'Excel']
        },
        studyPathways: [
            { institution: 'IPAM', program: 'BSc Project Management', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Njala', program: 'Masters in Project Management', duration: '2 Years', location: 'Freetown', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Methodologies',
                skills: ['Waterfall vs Agile', 'Project Lifecycle', 'Scope'],
                activities: ['Learn 5 phases of PM', 'Create a charter', 'Study PMP glossary']
            },
            month2: {
                focus: 'Tools',
                skills: ['Gantt Charts', 'Budgeting', 'Risk Mgmt'],
                activities: ['Build a timeline in Excel', 'Create a budget', 'Identify risks']
            },
            month3: {
                focus: 'Execution',
                skills: ['Stakeholder Comm', 'Leadership', 'Monitoring'],
                activities: ['Lead a community project', 'Apply for Assistant roles', 'Update CV']
            }
        },
        careerPath: {
            entryTitles: ['Project Officer', 'Project Assistant'],
            employers: ['NGOs', 'Construction Firms', 'Tech Companies'],
            workspace: 'Office and Field.'
        },
        salary: {
            entry: 'SLE 4,500 - 8,000',
            experienced: 'SLE 12,000 - 25,000',
            note: 'PMP cert commands high value.'
        },
        mentorship: {
            type: 'Senior PM',
            source: 'NGOs.'
        },
        immediateActions: [
            'Learn Gantt Charts.',
            'Audit Google PM course.',
            'Check NGO job ads.'
        ]
    },

    // ==========================================
    // EDUCATION
    // ==========================================
    {
        id: 'teacher',
        category: 'Education',
        title: 'Teacher',
        keywords: ['teacher', 'educator', 'school', 'lecturer', 'education'],
        image: '/images/sections/careers/education.png',
        overview: 'Teachers educate the future of Sierra Leone. From primary to senior secondary, there is a constant demand for qualified, passionate teachers.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'TC, HTC, or B.Ed',
            subjects: ['English', 'Math', 'Teaching Subject'],
            certification: 'Teaching Service Commission (TSC) Registration'
        },
        studyPathways: [
            { institution: 'Milton Margai Technical University', program: 'B.Ed / HTC', duration: '3-4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Fourah Bay College', program: 'B.Ed', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Freetown Teachers College', program: 'TC / HTC', duration: '3 Years', location: 'Freetown', type: 'Diploma' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Pedagogy',
                skills: ['Lesson Planning', 'Child Psych', 'Classroom Mgmt'],
                activities: ['Study the National Curriculum', 'Observe a class', 'Draft a lesson plan']
            },
            month2: {
                focus: 'Delivery',
                skills: ['Public Speaking', 'Engagement', 'Assessment'],
                activities: ['Practice teaching a topic', 'Learn to create exams', 'Volunteer to tutor']
            },
            month3: {
                focus: 'Professionalism',
                skills: ['Ethics', 'TSC Standards', 'Record Keeping'],
                activities: ['Register with TSC', 'Apply to schools', 'Join SL Teachers Union']
            }
        },
        careerPath: {
            entryTitles: ['Assistant Teacher', 'Subject Teacher', 'Primary Teacher'],
            employers: ['Government Schools', 'Private Schools', 'International Schools'],
            workspace: 'Classroom.'
        },
        salary: {
            entry: 'SLE 2,000 - 4,500',
            experienced: 'SLE 5,000 - 10,000',
            note: 'Private/International schools pay higher.'
        },
        mentorship: {
            type: 'Senior Teacher / Principal',
            source: 'School Heads.'
        },
        immediateActions: [
            'Visit the Teaching Service Commission.',
            'Get the syllabus for your subject.',
            'Volunteer at a nearby school.'
        ]
    },

    // ==========================================
    // SKILLED TRADES
    // ==========================================
    {
        id: 'electrician',
        category: 'Skilled Trade',
        title: 'Electrician',
        keywords: ['electrical', 'wiring', 'power', 'technician', 'solar'],
        image: '/images/sections/careers/mining.png',
        overview: 'Electricians install and maintain electrical systems. With the rise of solar energy and construction in SL, this is a lucrative trade.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'Diploma/Certificate in Electrical Engineering',
            technicalSkills: ['Wiring', 'Safety', 'Solar Installation'],
            note: 'Apprenticeships are a common entry route.'
        },
        studyPathways: [
            { institution: 'Freetown Polytechnic', program: 'Electrical Installation', duration: '2 Years', location: 'Freetown', type: 'Diploma' },
            { institution: 'Eastern Technical University', program: 'Electrical Engineering', duration: '2-3 Years', location: 'Kenema', type: 'Diploma' },
            { institution: 'Government Technical Institute', program: 'Electrical Dept', duration: '2 Years', location: 'Kissy', type: 'Certificate' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Safety & Basics',
                skills: ['Electrical Safety', 'Tools usage', 'Circuits'],
                activities: ['Get a toolkit', 'Learn color codes', 'Observe a master electrician']
            },
            month2: {
                focus: 'Installation',
                skills: ['House Wiring', 'Solar Panels', 'Trobleshoot'],
                activities: ['Wire a test board', 'Learn solar battery setup', 'Fix small appliances']
            },
            month3: {
                focus: 'Work',
                skills: ['Costing', 'Client Mgmt', 'Advanced Install'],
                activities: ['Take small jobs', 'Work as an apprentice', 'Market yourself']
            }
        },
        careerPath: {
            entryTitles: ['Apprentice Electrician', 'Site Electrician', 'Solar Technician'],
            employers: ['EDSA', 'Construction Firms', 'Solar Companies', 'Self-Employed'],
            workspace: 'Field / Sites.'
        },
        salary: {
            entry: 'SLE 2,500 - 5,000',
            experienced: 'SLE 6,000 - 15,000',
            note: 'Self-employed electricians can earn daily.'
        },
        mentorship: {
            type: 'Master Electrician',
            source: 'Local workshops.'
        },
        immediateActions: [
            'Enrol in a Technical Institute.',
            'Buy a basic multimeter.',
            'Find a workshop to apprentice at.'
        ]
    },
    {
        id: 'auto-mechanic',
        category: 'Skilled Trade',
        title: 'Auto Mechanic',
        keywords: ['mechanic', 'car', 'repair', 'engine', 'vehicle', 'automotive'],
        image: '/images/sections/careers/mining.png',
        overview: 'Mechanics repair and maintain vehicles. Essential in a country with rough roads and many reliable Toyotas and Mercedes.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'Technical Certificate or Apprenticeship',
            technicalSkills: ['Engine Repair', 'Brake Systems', 'Diagnostics'],
            note: 'Experience is more valued than degrees.'
        },
        studyPathways: [
            { institution: 'Freetown Polytechnic', program: 'Automotive Engineering', duration: '2 Years', location: 'Freetown', type: 'Diploma' },
            { institution: 'GTIm Kissy', program: 'Motor Mechanics', duration: '2 Years', location: 'Freetown', type: 'Certificate' },
            { institution: 'Local Garages', program: 'Apprenticeship', duration: '2-4 Years', location: 'Nationwide', type: 'Vocational' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Tools & Safety',
                skills: ['Workshop Safety', 'Tool Identification', 'Oil Changes'],
                activities: ['Clean parts', 'Watch and learn', 'Learn tool names']
            },
            month2: {
                focus: 'Systems',
                skills: ['Brakes', 'Suspension', 'Basic Engine'],
                activities: ['Change brake pads', 'Assist in engine service', 'Learn about filters']
            },
            month3: {
                focus: 'Diagnostics',
                skills: ['Troubleshooting', 'Electrical', 'Client Comm'],
                activities: ['Diagnose engine noise', 'Perform full service', 'Manage a client job']
            }
        },
        careerPath: {
            entryTitles: ['Apprentice', 'Junior Mechanic', 'Fitter'],
            employers: ['Garages', 'Mining Transport Depts', 'NGO Fleets', 'Toyota/Mercedes Dealerships'],
            workspace: 'Garage.'
        },
        salary: {
            entry: 'SLE 2,000 - 5,000',
            experienced: 'SLE 7,000 - 15,000',
            note: 'Fleet mechanics in mines earn well.'
        },
        mentorship: {
            type: 'Head Mechanic',
            source: 'Major garages.'
        },
        immediateActions: [
            'Visit the Kissy Road garages.',
            'Apply to GTI.',
            'Get a pair of overalls.'
        ]
    },

    // ==========================================
    // MEDIA & CREATIVE
    // ==========================================
    {
        id: 'graphic-designer',
        category: 'Media',
        title: 'Graphic Designer',
        keywords: ['design', 'creative', 'logo', 'brand', 'art', 'photoshop', 'illustrator'],
        image: '/images/sections/careers/technology.png',
        overview: 'Graphic Designers create visual concepts for brands, advertisers, and NGOs. With the rise of digital media in SL, good designers are in high demand.',
        demandLevel: 'Medium',
        entryRequirements: {
            education: 'Diploma in Creative Arts or Strong Portfolio',
            technicalSkills: ['Photoshop', 'Illustrator', 'Canva'],
            note: 'Your portfolio is more important than your degree.'
        },
        studyPathways: [
            { institution: 'Limkokwing University', program: 'Graphic Design', duration: '3 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Milton Margai Technical University', program: 'Fine Arts', duration: '3 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Online', program: 'Udemy / YouTube', duration: 'Self-Paced', location: 'Remote', type: 'Vocational' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Design Principles',
                skills: ['Typography', 'Color Theory', 'Canva Mastery'],
                activities: ['Learn the 4 rules of design', 'Recreate 5 famous logos', 'Design a flyer for a friend']
            },
            month2: {
                focus: 'Pro Tools',
                skills: ['Adobe Photoshop', 'Photo Editing', 'Social Media Graphics'],
                activities: ['Learn masking in Photoshop', 'Edit 5 photos professionally', 'Create a mock brand identity']
            },
            month3: {
                focus: 'Portfolio',
                skills: ['Client Communication', 'Print Design', 'Branding'],
                activities: ['Build a Behance portfolio', 'Visit a printing press to understand print', 'Reach out to 5 local businesses']
            }
        },
        careerPath: {
            entryTitles: ['Junior Designer', 'Creative Intern', 'Social Media Content Creator'],
            employers: ['Advertising Agencies (Creativ)', 'Print Houses', 'NGO Comms Depts', 'Freelance'],
            workspace: 'Studio / Home / Print Shop.'
        },
        salary: {
            entry: 'SLE 2,500 - 5,000',
            experienced: 'SLE 6,000 - 12,000',
            note: 'Freelancers can earn per project.'
        },
        mentorship: {
            type: 'Senior Art Director',
            source: 'Creative Agencies.'
        },
        immediateActions: [
            'Master Canva today.',
            'Download a trial of Photoshop.',
            'Create a Behance account.'
        ]
    },
    {
        id: 'journalist',
        category: 'Media',
        title: 'Journalist',
        keywords: ['news', 'reporter', 'media', 'broadcast', 'radio', 'writer'],
        image: '/images/sections/careers/technology.png',
        overview: 'Journalists report on news, politics, and social issues. In Sierra Leone, Radio is king (90% reach), followed by TV and Newspapers.',
        demandLevel: 'Medium',
        entryRequirements: {
            education: 'BA Mass Communication or Journalism',
            subjects: ['English', 'Government', 'Literature'],
            technicalSkills: ['Writing', 'Interviewing', 'Audio Editing']
        },
        studyPathways: [
            { institution: 'Fourah Bay College', program: 'BA Mass Communication', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Liccsal Business College', program: 'Journalism', duration: '2 Years', location: 'Freetown', type: 'Diploma' },
            { institution: 'University of Makeni', program: 'Mass Communication', duration: '4 Years', location: 'Makeni', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Reporting Basics',
                skills: ['News Writing', 'Ethics (IMC Code)', 'Research'],
                activities: ['Write a 500-word news story', 'Read the IMC Code of Practice', 'Listen to "Good Morning Salone" critically']
            },
            month2: {
                focus: 'Multimedia',
                skills: ['Mobile Journalism (MoJo)', 'Audio Recording', 'Interviewing'],
                activities: ['Record an interview on your phone', 'Edit a short audio clip', 'Start a blog']
            },
            month3: {
                focus: 'Field Work',
                skills: ['Investigative Techs', 'Networking', 'Pitching'],
                activities: ['Attend a press conference', 'Pitch a story to a local paper', 'Join a student media group']
            }
        },
        careerPath: {
            entryTitles: ['Reporter', 'News Assistant', 'Presenter', 'Radio Host'],
            employers: ['Radio Democracy 98.1', 'AYV Media', 'SLBC', 'Awoko Newspaper'],
            workspace: 'Newsroom and Field.'
        },
        salary: {
            entry: 'SLE 2,000 - 5,000',
            experienced: 'SLE 6,000 - 15,000',
            note: 'Top presenters become influencers.'
        },
        mentorship: {
            type: 'Senior Editor',
            source: 'SLAJ (Sierra Leone Association of Journalists).'
        },
        immediateActions: [
            'Start a blog or Twitter thread on a local issue.',
            'Read 3 different newspapers today.',
            'Visit the SLAJ HQs.'
        ]
    },

    // ==========================================
    // AGRICULTURE
    // ==========================================
    {
        id: 'agricultural-officer',
        category: 'Agriculture',
        title: 'Agricultural Officer',
        keywords: ['farming', 'crops', 'extension', 'food', 'soil', 'agronomist'],
        image: '/images/sections/careers/agriculture.png',
        overview: 'Agricultural Officers work to improve farming practices, yield, and food security. They bridge the gap between research and farmers.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'BSc Agriculture or Diploma in General Agriculture',
            subjects: ['Biology', 'Agricultural Science', 'Chemistry'],
            technicalSkills: ['Crop Management', 'Soil Science', 'Extension Methods']
        },
        studyPathways: [
            { institution: 'Njala University', program: 'BSc Agriculture (General)', duration: '4 Years', location: 'Njala/Mokonde', type: 'Degree' },
            { institution: 'Njala University', program: 'BSc Agribusiness', duration: '4 Years', location: 'Njala', type: 'Degree' },
            { institution: 'Eastern Technical University', program: 'Agriculture', duration: '2-3 Years', location: 'Bunumbu', type: 'Diploma' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Fundamentals',
                skills: ['Soil Types', 'Crop Cycle', 'Pest Control Basics'],
                activities: ['Analyze soil samples', 'Study the SL seasonal calendar', 'Visit a local farm']
            },
            month2: {
                focus: 'Extension',
                skills: ['Communication', 'Demonstration', 'Data Collection'],
                activities: ['Learn to use KoboCollect', 'Practice explaining techniques to farmers', 'Attend a Ministry field day']
            },
            month3: {
                focus: 'Specialization',
                skills: ['Agribusiness', 'Post-Harvest tech', 'Project Mgmt'],
                activities: ['Write a crop production plan', 'Apply for NGO Agric roles', 'Volunteer with an extension worker']
            }
        },
        careerPath: {
            entryTitles: ['Extension Worker', 'Field Officer', 'Farm Supervisor'],
            employers: ['Ministry of Agriculture', 'FAO', 'WFP', 'Large Farms (Socfin)'],
            workspace: 'Rural Field Stations.'
        },
        salary: {
            entry: 'SLE 3,000 - 6,000',
            experienced: 'SLE 7,000 - 15,000',
            note: 'NGO roles pay best.'
        },
        mentorship: {
            type: 'Senior Agronomist',
            source: 'Ministry of Agric District Offices.'
        },
        immediateActions: [
            'Check Njala admission requirements.',
            'Volunteer at a community garden.',
            'Learn about the "Feed Salone" initiative.'
        ]
    },

    // ==========================================
    // SERVICE & HOSPITALITY
    // ==========================================
    {
        id: 'chef',
        category: 'Hospitality',
        title: 'Chef',
        keywords: ['cook', 'food', 'kitchen', 'restaurant', 'hotel', 'culinary'],
        image: '/images/sections/careers/finance.png',
        overview: 'Chefs prepare food in hotels, restaurants, and for catering services. With tourism growing, skilled culinary professionals are needed.',
        demandLevel: 'Medium',
        entryRequirements: {
            education: 'Certificate/Diploma in Catering',
            technicalSkills: ['Cooking', 'Hygiene', 'Menu Planning'],
            note: 'Practice and taste are key.'
        },
        studyPathways: [
            { institution: 'Milton Margai Technical University', program: 'Hotel Management & Catering', duration: '2-3 Years', location: 'Freetown (Brookfields)', type: 'Diploma' },
            { institution: 'Vocational Institutes', program: 'Catering Certificate', duration: '1 Year', location: 'Nationwide', type: 'Vocational' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Basics & Hygiene',
                skills: ['Knife Skills', 'Food Safety', 'Prep Work'],
                activities: ['Learn safe chopping', 'Get a Food Handler certificate', 'Master 5 basic sauces']
            },
            month2: {
                focus: 'Cooking Techs',
                skills: ['Baking', 'Grilling', 'Local & Intl Cuisine'],
                activities: ['Perfect Jollof and Cassava Leaf', 'Learn 3 continental dishes', 'Work in a fast kitchen']
            },
            month3: {
                focus: 'Management',
                skills: ['Costing', 'Inventory', 'Plating'],
                activities: ['Design a menu with prices', 'Cook a full 3-course meal', 'Apply to hotels']
            }
        },
        careerPath: {
            entryTitles: ['Commis Chef', 'Cook', 'Kitchen Assistant'],
            employers: ['Hotels (Radisson, Country Lodge)', 'Restaurants', 'Mining Catering'],
            workspace: 'Hot Kitchens.'
        },
        salary: {
            entry: 'SLE 2,000 - 5,000',
            experienced: 'SLE 6,000 - 15,000',
            note: 'Executive Chefs in top hotels earn significantly more.'
        },
        mentorship: {
            type: 'Head Chef',
            source: 'Top Hotel Kitchens.'
        },
        immediateActions: [
            'Practice cooking every day.',
            'Visit Milton Margai Brookfields campus.',
            'Watch YouTube videos on "Mise en place".'
        ]
    },

    // ==========================================
    // LOGISTICS
    // ==========================================
    {
        id: 'supply-chain-coordinator',
        category: 'Supply Chain',
        title: 'Supply Chain Coordinator',
        keywords: ['logistics', 'procurement', 'shipping', 'warehouse', 'transport'],
        image: '/images/sections/careers/finance.png',
        overview: 'Supply Chain Coordinators manage the flow of goods. Critical for NGOs bringing in aid, and Mining companies exporting minerals.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'Degree in Logistics, Business, or Procurement',
            subjects: ['Math', 'Business', 'Economics'],
            technicalSkills: ['Inventory Management', 'Excel', 'Customs Procedure']
        },
        studyPathways: [
            { institution: 'IPAM', program: 'BSc Procurement & Logistics', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'UNIMAK', program: 'BSc Logistics', duration: '4 Years', location: 'Makeni', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Procurement Basics',
                skills: ['Sourcing', 'Quotation Analysis', 'Incoterms'],
                activities: ['Learn what FOB/CIF mean', 'Create a mock Purchase Order', 'Study SL Public Procurement Act']
            },
            month2: {
                focus: 'Logistics',
                skills: ['Warehousing', 'Transport Planning', 'Stock Taking'],
                activities: ['Visit the Queen Elizabeth II Quay (Port)', 'Learn inventory tracking in Excel', 'Study fleet management']
            },
            month3: {
                focus: 'Systems',
                skills: ['ERP System Concept', 'Reporting', 'Vendor Mgmt'],
                activities: ['Apply for Logistics Internships', 'Learn basics of SAP/Oracle (theory)', 'Optimize a delivery route']
            }
        },
        careerPath: {
            entryTitles: ['Logistics Officer', 'Procurement Assistant', 'Warehouse Supervisor'],
            employers: ['WFP', 'DHL', 'Bollore (AGL)', 'Mining Companies'],
            workspace: 'Office and Warehouse/Port.'
        },
        salary: {
            entry: 'SLE 3,500 - 7,000',
            experienced: 'SLE 10,000 - 25,000',
            note: 'One of the highest paying sectors in NGOs.'
        },
        mentorship: {
            type: 'Logistics Manager',
            source: 'Chartered Institute of Procurement & Supply (CIPS) members.'
        },
        immediateActions: [
            'Learn the Incoterms definitions.',
            'Visit the IPAM Logistics department.',
            'Read about the "Public Procurement Authority" of SL.'
        ]
    },

    // ==========================================
    // MORE TRADES
    // ==========================================
    {
        id: 'plumber',
        category: 'Skilled Trade',
        title: 'Plumber',
        keywords: ['pipe', 'water', 'construction', 'repair', 'sanitation'],
        image: '/images/sections/careers/mining.png',
        overview: 'Plumbers install water and sewage systems. Essential for public health and construction.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'Trade Certificate',
            technicalSkills: ['Pipe fitting', 'Welding basics', 'Blueprint reading'],
            note: 'Apprenticeship is standard.'
        },
        studyPathways: [
            { institution: 'Freetown Polytechnic', program: 'Plumbing', duration: '2 Years', location: 'Freetown', type: 'Diploma' },
            { institution: 'GTI', program: 'Plumbing & Pipe Fitting', duration: '2 Years', location: 'Nationwide', type: 'Certificate' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Tools & Materials',
                skills: ['Pipe types (PVC/Galvanized)', 'Cutting', 'Joining'],
                activities: ['Learn to use a pipe cutter', 'Glue PVC pipes', 'Identify fittings']
            },
            month2: {
                focus: 'Systems',
                skills: ['Water flow', 'Drainage', 'Faucets'],
                activities: ['Install a tap', 'Fix a leaking pipe', 'Understand gravity tanks']
            },
            month3: {
                focus: 'Complex Work',
                skills: ['Septic tanks', 'Pumps', 'Layout'],
                activities: ['Design a bathroom layout', 'Install a shower', 'Work on a site']
            }
        },
        careerPath: {
            entryTitles: ['Apprentice Plumber', 'Site Plumber'],
            employers: ['Construction Companies', 'Guma Valley Water', 'Self-Employed'],
            workspace: 'Construction Sites.'
        },
        salary: {
            entry: 'SLE 2,000 - 4,500',
            experienced: 'SLE 5,000 - 10,000',
            note: 'Contract based work is common.'
        },
        mentorship: {
            type: 'Master Plumber',
            source: 'Construction Sites.'
        },
        immediateActions: [
            'Get an apprenticeship.',
            'Learn how to fix a leaky tap.',
            'Apply to GTI.'
        ]
    },

    // ==========================================
    // MORE ENGINEERING & TRADES
    // ==========================================
    {
        id: 'mechanical-engineer',
        category: 'Engineering',
        title: 'Mechanical Engineer',
        keywords: ['mechanical', 'machines', 'engines', 'maintenance', 'engineer'],
        image: '/images/sections/careers/mining.png',
        overview: 'Mechanical engineers design, install, and maintain machinery. Vital for the mining sector, power plants, and manufacturing in SL.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'BSc Mechanical Engineering',
            subjects: ['Math', 'Physics', 'Tech Drawing'],
            technicalSkills: ['CAD', 'Thermodynamics', 'Maintenance']
        },
        studyPathways: [
            { institution: 'Fourah Bay College', program: 'BSc Mechanical Engineering', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Milton Margai', program: 'Mechanical Engineering', duration: '2-3 Years', location: 'Freetown', type: 'Diploma' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Mechanics',
                skills: ['Statics', 'Dynamics', 'Materials'],
                activities: ['Study Newton’s laws applied', 'Review engine cycles', 'Visit a machine shop']
            },
            month2: {
                focus: 'Design',
                skills: ['SolidWorks', 'AutoCAD', 'Sketching'],
                activities: ['Model a simple part in 3D', 'Learn about gears', 'Read a technical manual']
            },
            month3: {
                focus: 'Application',
                skills: ['Hydraulics', 'Pumps', 'Maintenance Planning'],
                activities: ['Apply for mining internships', 'Learn about generator maintenance', 'Join SLIE students']
            }
        },
        careerPath: {
            entryTitles: ['Graduate Engineer', 'Maintenance Supervisor', 'Plant Engineer'],
            employers: ['Sierra Rutile', 'Leone Rock', 'EDSA', 'Factories'],
            workspace: 'Plants and Offices.'
        },
        salary: {
            entry: 'SLE 4,500 - 8,500',
            experienced: 'SLE 10,000 - 25,000',
            note: 'Mining roles pay best.'
        },
        mentorship: {
            type: 'Senior Mechanical Engineer',
            source: 'SLIE.'
        },
        immediateActions: [
            'Master Physics mechanics.',
            'Learn AutoCAD 3D.',
            'Visit a factory or power plant.'
        ]
    },
    {
        id: 'electrical-engineer',
        category: 'Engineering',
        title: 'Electrical Engineer',
        keywords: ['electrical', 'power', 'grid', 'electronics', 'engineer'],
        image: '/images/sections/careers/mining.png',
        overview: 'Electrical Engineers handle high-voltage power systems and electronics. Critical for fixing SL’s energy crisis (EDSA, Solar).',
        demandLevel: 'High',
        entryRequirements: {
            education: 'BSc Electrical Engineering',
            subjects: ['Math', 'Physics', 'Further Math'],
            technicalSkills: ['Circuit Analysis', 'Power Systems', 'MATLAB']
        },
        studyPathways: [
            { institution: 'Fourah Bay College', program: 'BSc Electrical Engineering', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Eastern Technical', program: 'Electrical Engineering', duration: '3 Years', location: 'Kenema', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Circuits',
                skills: ['Ohms Law', 'Circuit Theory', 'Soldering'],
                activities: ['Build a simple circuit', 'Solve complex circuit problems', 'Learn safety standards']
            },
            month2: {
                focus: 'Power',
                skills: ['Transformers', 'Transmission', 'Renewables'],
                activities: ['Visit a substation (from outside)', 'Study solar PV systems', 'Learn wiring codes']
            },
            month3: {
                focus: 'Professional',
                skills: ['Project Design', 'Costing', 'Grid Mgmt'],
                activities: ['Design a solar home system', 'Apply to EDSA or Solar firms', 'Join IEEE student branch']
            }
        },
        careerPath: {
            entryTitles: ['Electrical Engineer', 'Grid Operator', 'Solar Project Engineer'],
            employers: ['EDSA', 'EGTC', 'Solar Companies (EasySolar)', 'Mining'],
            workspace: 'Office and Field.'
        },
        salary: {
            entry: 'SLE 4,500 - 9,000',
            experienced: 'SLE 12,000 - 25,000+',
            note: 'Specialized power engineers are rare and valued.'
        },
        mentorship: {
            type: 'Chartered Electrical Engineer',
            source: 'SLIE.'
        },
        immediateActions: [
            'Get strong in Calculus.',
            'Learn about Solar PV sizing.',
            'Visit the EDSA website.'
        ]
    },
    {
        id: 'welder',
        category: 'Skilled Trade',
        title: 'Welder',
        keywords: ['metal', 'fabrication', 'steel', 'construction', 'repair'],
        image: '/images/sections/careers/mining.png',
        overview: 'Welders join metal parts for construction, mining, and repairs. Skillful welders are essential for infrastructure.',
        demandLevel: 'Medium',
        entryRequirements: {
            education: 'Trade Certificate',
            technicalSkills: ['Arc Welding', 'Gas Welding', 'Safety'],
            note: 'Physical strength and steady hands required.'
        },
        studyPathways: [
            { institution: 'GTI', program: 'Welding & Fabrication', duration: '2 Years', location: 'Nationwide', type: 'Certificate' },
            { institution: 'Don Bosco Fambul', program: 'Welding', duration: '1-2 Years', location: 'Freetown', type: 'Vocational' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Safety & Arcs',
                skills: ['PPE usage', 'Striking an arc', 'Beads'],
                activities: ['Get a welding helmet', 'Practice running beads on scrap', 'Learn metal types']
            },
            month2: {
                focus: 'Joints',
                skills: ['Butt joints', 'Fillet welds', 'Vertical welding'],
                activities: ['Weld two plates together', 'Build a small frame', 'Test weld strength']
            },
            month3: {
                focus: 'Fabrication',
                skills: ['Blueprint reading', 'Cutting', 'Assembly'],
                activities: ['Build a gate or window protector', 'Apprentice at a shop', 'Learn gas cutting']
            }
        },
        careerPath: {
            entryTitles: ['Welder', 'Fabricator', 'Fitter'],
            employers: ['Metal Workshops', 'Construction', 'Mining Maintenance'],
            workspace: 'Workshop / Site.'
        },
        salary: {
            entry: 'SLE 2,000 - 5,000',
            experienced: 'SLE 6,000 - 15,000',
            note: 'Underwater or pipeline welders earn huge sums (rare in SL).'
        },
        mentorship: {
            type: 'Master Fabricator',
            source: 'Metal Workshops.'
        },
        immediateActions: [
            'Enroll in a vocational center.',
            'Get welding gloves.',
            'Watch YouTube videos on "Stick Welding".'
        ]
    },
    {
        id: 'carpenter',
        category: 'Skilled Trade',
        title: 'Carpenter',
        keywords: ['wood', 'furniture', 'roofing', 'construction', 'joinery'],
        image: '/images/sections/careers/mining.png',
        overview: 'Carpenters build structures and furniture from wood. Essential for roofing, furniture making, and formwork in construction.',
        demandLevel: 'Medium',
        entryRequirements: {
            education: 'Trade Certificate or Apprenticeship',
            technicalSkills: ['Woodworking', 'Roofing', 'Finishing'],
            note: 'Detail-oriented work.'
        },
        studyPathways: [
            { institution: 'Freetown Polytechnic', program: 'Carpentry & Joinery', duration: '2 Years', location: 'Freetown', type: 'Diploma' },
            { institution: 'GTI', program: 'Carpentry', duration: '2 Years', location: 'Nationwide', type: 'Certificate' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Tools & Wood',
                skills: ['Measuring', 'Sawing', 'Planing'],
                activities: ['Make a perfect square cut', 'Identify timber types', 'Sharpen a chisel']
            },
            month2: {
                focus: 'Joinery',
                skills: ['Joints (Mortise/Tenon)', 'Framing', 'Assembly'],
                activities: ['Build a stool', 'Make a door frame', 'Practice heavy framing']
            },
            month3: {
                focus: 'Finishing',
                skills: ['Sanding', 'Varnishing', 'Installation'],
                activities: ['Build a table', 'Apprentice on a roof job', 'Learn cost estimation']
            }
        },
        careerPath: {
            entryTitles: ['Carpenter', 'Joiner', 'Site Carpenter'],
            employers: ['Furniture Shops', 'Construction Sites', 'Self-Employed'],
            workspace: 'Workshop / Site.'
        },
        salary: {
            entry: 'SLE 2,000 - 4,500',
            experienced: 'SLE 5,000 - 10,000',
            note: 'High-end furniture makers earn well.'
        },
        mentorship: {
            type: 'Master Carpenter',
            source: 'Workshops.'
        },
        immediateActions: [
            'Buy a tape measure and hammer.',
            'Visit a furniture workshop.',
            'Learn to sketch designs.'
        ]
    },
    {
        id: 'construction-supervisor',
        category: 'Engineering',
        title: 'Construction Supervisor',
        keywords: ['site', 'foreman', 'building', 'management', 'safety'],
        image: '/images/sections/careers/mining.png',
        overview: 'Construction Supervisors manage work crews on building sites, ensuring safety, quality, and speed.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'HND/Diploma in Civil Engineering or Building Tech',
            technicalSkills: ['Site Management', 'Blueprint Reading', 'Team Leading']
        },
        studyPathways: [
            { institution: 'Freetown Polytechnic', program: 'Building & Civil Eng', duration: '2-3 Years', location: 'Freetown', type: 'HND' },
            { institution: 'Milton Margai', program: 'Building Technology', duration: '3 Years', location: 'Freetown', type: 'HND' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Plans & Safety',
                skills: ['Reading Drawings', 'Site Safety (HSE)', 'Materials'],
                activities: ['Study site plans', 'Learn OSHA basics', 'Identify construction materials']
            },
            month2: {
                focus: 'Supervision',
                skills: ['Labor Management', 'Daily Reporting', 'Quality Control'],
                activities: ['Shadow a foreman', 'Practice writing site reports', 'Inspect concrete mixing']
            },
            month3: {
                focus: 'Execution',
                skills: ['Scheduling', 'Problem Solving', 'Logistics'],
                activities: ['Manage a small team task', 'Track material usage', 'Apply for Site Agent roles']
            }
        },
        careerPath: {
            entryTitles: ['Site Foreman', 'Site Agent', 'Junior Supervisor'],
            employers: ['Construction Companies', 'Real Estate Developers'],
            workspace: 'Construction Site.'
        },
        salary: {
            entry: 'SLE 3,500 - 6,000',
            experienced: 'SLE 8,000 - 15,000',
            note: 'Critical role for project success.'
        },
        mentorship: {
            type: 'Site Engineer',
            source: 'Large Sites.'
        },
        immediateActions: [
            'Enroll in an HND program.',
            'Learn to read architectural drawings.',
            'Get first aid training.'
        ]
    },

    // ==========================================
    // TECH EXPANSION
    // ==========================================
    {
        id: 'it-support-specialist',
        category: 'Technology',
        title: 'IT Support Specialist',
        keywords: ['helpdesk', 'computer', 'repair', 'windows', 'network'],
        image: '/images/sections/careers/technology.png',
        overview: 'IT Support Specialists help staff with computer issues. Every office needs one.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'Diploma in IT',
            certification: 'CompTIA A+',
            technicalSkills: ['Windows', 'Hardware Repair', 'Office 365']
        },
        studyPathways: [
            { institution: 'IPAM', program: 'Short Course IT', duration: '6 Months', location: 'Freetown', type: 'Certificate' },
            { institution: 'BlueCrest', program: 'Hardware & Networking', duration: '1 Year', location: 'Freetown', type: 'Diploma' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Hardware',
                skills: ['PC Assembly', 'Troubleshooting', 'Printers'],
                activities: ['Take apart a PC', 'Fix a printer jam', 'Learn BIOS settings']
            },
            month2: {
                focus: 'Software',
                skills: ['Windows 10/11', 'Office Installation', 'Virus Removal'],
                activities: ['Format a laptop', 'Install drivers', 'Configure Outlook']
            },
            month3: {
                focus: 'Service',
                skills: ['Ticketing Systems', 'Remote Support', 'Customer Service'],
                activities: ['Use TeamViewer', 'Volunteer for IT help', 'Write a user guide']
            }
        },
        careerPath: {
            entryTitles: ['IT Assistant', 'Help Desk Officer'],
            employers: ['Banks', 'NGOs', 'Govt Offices'],
            workspace: 'Office.'
        },
        salary: {
            entry: 'SLE 2,500 - 5,000',
            experienced: 'SLE 6,000 - 12,000',
            note: 'Stepping stone to Network Admin.'
        },
        mentorship: {
            type: 'IT Manager',
            source: 'Any large office.'
        },
        immediateActions: [
            'Learn to format a computer.',
            'Study for CompTIA A+.',
            'Fix a friend’s laptop.'
        ]
    },
    {
        id: 'ux-ui-designer',
        category: 'Technology',
        title: 'UX/UI Designer',
        keywords: ['design', 'interface', 'user', 'web', 'app', 'sigma'],
        image: '/images/sections/careers/technology.png',
        overview: 'UX/UI Designers design how apps and websites look and feel. Growing demand as SL companies go digital.',
        demandLevel: 'Medium',
        entryRequirements: {
            education: 'Portfolio',
            technicalSkills: ['Figma', 'Prototyping', 'User Research'],
            note: 'Self-taught and portfolio driven.'
        },
        studyPathways: [
            { institution: 'Online', program: 'Google UX Design Cert', duration: '6 Months', location: 'Remote', type: 'Certificate' },
            { institution: 'Orange Corners', program: 'Digital Skills', duration: 'Short', location: 'Freetown', type: 'Certificate' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Principles',
                skills: ['Design Thinking', 'Wireframing', 'Figma Basics'],
                activities: ['Learn Figma interface', 'Sketch an app idea on paper', 'Study "Don\'t Make Me Think"']
            },
            month2: {
                focus: 'Visuals',
                skills: ['UI Kits', 'Typography', 'Prototyping'],
                activities: ['Redesign a popular app screen', 'Create a clickable prototype', 'Learn about grids']
            },
            month3: {
                focus: 'Portfolio',
                skills: ['Case Studies', 'User Testing', 'Handover'],
                activities: ['Build a 3-project portfolio', 'Test your design on a friend', 'Upload to Dribbble']
            }
        },
        careerPath: {
            entryTitles: ['Junior Product Designer', 'UI Designer'],
            employers: ['Tech Startups', 'Banks (Digital Teams)', 'Agencies'],
            workspace: 'Remote / Office.'
        },
        salary: {
            entry: 'SLE 3,000 - 7,000',
            experienced: 'SLE 10,000 - 20,000',
            note: 'Remote foreign jobs pay $$$.'
        },
        mentorship: {
            type: 'Senior Product Designer',
            source: 'Twitter/LinkedIn (Tech Community).'
        },
        immediateActions: [
            'Create a Figma account.',
            'Take the Google UX course.',
            'Redesign WhatsApp for fun'
        ]
    },
    {
        id: 'cybersecurity-analyst',
        category: 'Technology',
        title: 'Cybersecurity Analyst',
        keywords: ['security', 'hacker', 'defense', 'network', 'cyber'],
        image: '/images/sections/careers/technology.png',
        overview: 'Cybersecurity Analysts protect systems from attacks. Banks and Govt need them desperately.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'Degree in CS/IT',
            certification: 'Security+ or CEH',
            technicalSkills: ['Linux', 'Networking', 'Security Tools']
        },
        studyPathways: [
            { institution: 'IPAM', program: 'BSc Info Systems (Security modules)', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Online', program: 'CompTIA Security+', duration: '3-6 Months', location: 'Remote', type: 'Certificate' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Foundations',
                skills: ['Networking (Ports/Protocols)', 'Linux Basics', 'Threats'],
                activities: ['Install Kali Linux (VM)', 'Learn common ports', 'Read about phishing']
            },
            month2: {
                focus: 'Defense',
                skills: ['Firewalls', 'Antivirus Mgmt', 'Vulnerability Scan'],
                activities: ['Configure a firewall', 'Run a Nmap scan (on own network)', 'Learn SIEM basics']
            },
            month3: {
                focus: 'Analysis',
                skills: ['Incident Response', 'Reporting', 'Compliance'],
                activities: ['Simulate an attack defense', 'Write a security policy', 'Apply for SOC Analyst roles']
            }
        },
        careerPath: {
            entryTitles: ['SOC Analyst', 'IT Security Officer'],
            employers: ['Central Bank', 'Commercial Banks', 'Telecoms'],
            workspace: 'Secure Office.'
        },
        salary: {
            entry: 'SLE 5,000 - 9,000',
            experienced: 'SLE 15,000 - 30,000',
            note: 'Certification is key to high pay.'
        },
        mentorship: {
            type: 'CISO',
            source: 'Banks.'
        },
        immediateActions: [
            'Install Linux.',
            'Learn to use the terminal.',
            'Study the OSI model again.'
        ]
    },

    // ==========================================
    // HEALTHCARE EXPANSION
    // ==========================================
    {
        id: 'pharmacist',
        category: 'Healthcare',
        title: 'Pharmacist',
        keywords: ['pharmacy', 'drugs', 'medicine', 'health', 'chemical'],
        image: '/images/sections/careers/healthcare.png',
        overview: 'Pharmacists dispense medications and advise on their safe use. A critical role ensuring patient safety in hospitals and communities.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'BPharm (Bachelor of Pharmacy)',
            subjects: ['Chemistry', 'Biology', 'Math', 'Physics'],
            certification: 'Pharmacy Board Registration'
        },
        studyPathways: [
            { institution: 'COMAHS', program: 'Bachelor of Pharmacy', duration: '5 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Njala University', program: 'BSc Pharmacy Tech (check availability)', duration: '4 Years', location: 'Njala', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Chemistry',
                skills: ['Organic Chem', 'Drug Classes', 'Calculations'],
                activities: ['Memorize top 50 drugs', 'Review chemical bonding', 'Visit a pharmacy']
            },
            month2: {
                focus: 'Pharmacology',
                skills: ['Drug Interactions', 'Side Effects', 'Dosage'],
                activities: ['Study contraindications', 'Learn prescription abbreviations', 'Observe dispensing']
            },
            month3: {
                focus: 'Practice',
                skills: ['Patient Counseling', 'Ethics', 'Inventory'],
                activities: ['Roleplay advising a patient', 'Learn about narcotics control', 'Apply for internship']
            }
        },
        careerPath: {
            entryTitles: ['Intern Pharmacist', 'Pharmacy Technician'],
            employers: ['Hospitals', 'Community Pharmacies', 'National Medical Supplies Agency'],
            workspace: 'Pharmacy / Lab.'
        },
        salary: {
            entry: 'SLE 4,000 - 8,000',
            experienced: 'SLE 12,000 - 25,000',
            note: 'Running a private pharmacy is very profitable.'
        },
        mentorship: {
            type: 'Senior Pharmacist',
            source: 'Pharmaceutical Society of SL.'
        },
        immediateActions: [
            'Get high grades in Chemistry.',
            'Visit the COMAHS Faculty of Pharmacy.',
            'Read about the "Pharmacy Board of Sierra Leone".'
        ]
    },
    {
        id: 'lab-technician',
        category: 'Healthcare',
        title: 'Laboratory Technician',
        keywords: ['lab', 'blood', 'test', 'microscope', 'technician'],
        image: '/images/sections/careers/healthcare.png',
        overview: 'Lab Technicians perform tests on samples (blood, etc.) to diagnose diseases like Malaria and Typhoid.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'Diploma/Degree in Medical Lab Science',
            subjects: ['Biology', 'Chemistry', 'Math'],
            technicalSkills: ['Microscopy', 'Sample Handling', 'Safety']
        },
        studyPathways: [
            { institution: 'COMAHS', program: 'BSc Medical Lab Science', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Njala', program: 'BSc Lab Tech', duration: '4 Years', location: 'Njala', type: 'Degree' },
            { institution: 'Milton Margai', program: 'Lab Tech Diploma', duration: '3 Years', location: 'Freetown', type: 'Diploma' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Lab Safety',
                skills: ['Biosafety', 'Microscope use', 'Sterilization'],
                activities: ['Learn waste disposal codes', 'Practice focusing a microscope', 'Study pathogens']
            },
            month2: {
                focus: 'Diagnostics',
                skills: ['Malaria Microscopy', 'Widal Test', 'Urinalysis'],
                activities: ['Identify parasites on slides', 'Perform a rapid test', 'Record results accurately']
            },
            month3: {
                focus: 'Advanced',
                skills: ['Hematology', 'Quality Control', 'Phlebotomy (Blood draw)'],
                activities: ['Practice drawing blood (simulated)', 'Calibrate a machine', 'Intern at a clinic']
            }
        },
        careerPath: {
            entryTitles: ['Lab Assistant', 'Lab Technician'],
            employers: ['Government Labs', 'Private Clinics', 'Diagnostic Centers'],
            workspace: 'Laboratory.'
        },
        salary: {
            entry: 'SLE 3,000 - 5,500',
            experienced: 'SLE 7,000 - 15,000',
            note: 'Private diagnostic centers pay well.'
        },
        mentorship: {
            type: 'Chief Lab Scientist',
            source: 'Connaught Lab.'
        },
        immediateActions: [
            'Refresh Biology knowledge.',
            'Visit a hospital lab.',
            'Apply to COMAHS/Njala.'
        ]
    },
    {
        id: 'public-health-officer',
        category: 'Healthcare',
        title: 'Public Health Officer',
        keywords: ['health', 'community', 'disease', 'prevention', 'ngo'],
        image: '/images/sections/careers/healthcare.png',
        overview: 'Public Health Officers focus on preventing disease in communities through education, sanitation, and vaccination.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'BSc Public Health or Community Health',
            subjects: ['Biology', 'Health Science'],
            technicalSkills: ['Data Collection', 'Health Promotion']
        },
        studyPathways: [
            { institution: 'Njala University', program: 'BSc Public Health', duration: '4 Years', location: 'Njala/Bo', type: 'Degree' },
            { institution: 'UNIMAK', program: 'Public Health', duration: '4 Years', location: 'Makeni', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Concepts',
                skills: ['Epidemiology', 'Hygiene', 'Disease Cycles'],
                activities: ['Study Malaria prevention', 'Map community water points', 'Learn about WASH']
            },
            month2: {
                focus: 'Field',
                skills: ['Community Entry', 'Surveying', 'Education'],
                activities: ['Conduct a mock health talk', 'Design a hygiene poster', 'Interview a CHO']
            },
            month3: {
                focus: 'Programs',
                skills: ['Monitoring', 'Reporting', 'Vaccination logic'],
                activities: ['Plan a health campaign', 'Analyze clinic data', 'Volunteer with Red Cross']
            }
        },
        careerPath: {
            entryTitles: ['Community Health Officer (CHO)', 'Public Health Promoter', 'Monitor'],
            employers: ['Ministry of Health', 'NGOs (Save the Children)', 'WHO'],
            workspace: 'Field / Clinics.'
        },
        salary: {
            entry: 'SLE 3,500 - 7,000',
            experienced: 'SLE 8,000 - 18,000',
            note: 'NGOs drive high salaries here.'
        },
        mentorship: {
            type: 'District Medical Officer (DMO)',
            source: 'DHMT.'
        },
        immediateActions: [
            'Volunteer for a clean-up day.',
            'Read WHO reports on SL.',
            'Apply to Njala.'
        ]
    },

    // ==========================================
    // SOCIAL LAB
    // ==========================================
    {
        id: 'social-worker',
        category: 'NGO',
        title: 'Social Worker',
        keywords: ['social', 'community', 'welfare', 'child', 'protection'],
        image: '/images/sections/careers/finance.png',
        overview: 'Social Workers support vulnerable people—children, women, and the elderly. Key role in SL’s post-war recovery and development.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'Degree/Diploma in Social Work or Sociology',
            subjects: ['History', 'Government'],
            technicalSkills: ['Counseling', 'Case Management', 'Empathy']
        },
        studyPathways: [
            { institution: 'Fourah Bay College', program: 'BA Social Work', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Milton Margai', program: 'Sociology', duration: '4 Years', location: 'Freetown', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Rights',
                skills: ['Child Rights Act', 'Gender Laws', 'Ethics'],
                activities: ['Read the Child Rights Act 2007', 'Visit a Family Support Unit', 'Understand confidentiality']
            },
            month2: {
                focus: 'Casework',
                skills: ['Interviewing', 'Documentation', 'Assessment'],
                activities: ['Roleplay a client intake', 'Write a case report', 'Learn referral pathways']
            },
            month3: {
                focus: 'Action',
                skills: ['Counseling Basics', 'Advocacy', 'Crisis Intervention'],
                activities: ['Volunteer at an orphanage', 'Attend a community meeting', 'Shadow a Social Worker']
            }
        },
        careerPath: {
            entryTitles: ['Case Worker', 'Social Services Officer', 'Child Protection Officer'],
            employers: ['Ministry of Social Welfare', 'UNICEF', 'Street Child', 'Don Bosco'],
            workspace: 'Office and Field.'
        },
        salary: {
            entry: 'SLE 3,000 - 6,000',
            experienced: 'SLE 8,000 - 18,000',
            note: 'International NGOs pay well.'
        },
        mentorship: {
            type: 'Senior Social Worker',
            source: 'MSWGCA.'
        },
        immediateActions: [
            'Read the Child Rights Act.',
            'Visit the Ministry of Social Welfare.',
            'Volunteer.'
        ]
    },
    {
        id: 'lawyer',
        category: 'Legal',
        title: 'Lawyer',
        keywords: ['law', 'legal', 'barrister', 'court', 'justice'],
        image: '/images/sections/careers/finance.png',
        overview: 'Lawyers advise on law and represent clients in court. A highly respected and competitive profession in Sierra Leone.',
        demandLevel: 'Medium',
        entryRequirements: {
            education: 'LLB (Bachelor of Laws) + BL (Law School)',
            subjects: ['English', 'History', 'Government', 'Literature'],
            certification: 'Call to the Bar'
        },
        studyPathways: [
            { institution: 'Fourah Bay College', program: 'Bachelor of Laws (LLB)', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'University of Makeni', program: 'LLB', duration: '4 Years', location: 'Makeni', type: 'Degree' },
            { institution: 'SL Law School', program: 'Bar Professional Course', duration: '1 Year', location: 'Freetown', type: 'Professional' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Reading',
                skills: ['Legal English', 'Case Briefing', 'Constitution'],
                activities: ['Read the 1991 Constitution', 'Summarize a famous case', 'Visit a Magistrate Court']
            },
            month2: {
                focus: 'Reasoning',
                skills: ['Logic', 'Debate', 'Research'],
                activities: ['Write a legal argument', 'Join a debate club', 'Study Contract Law basics']
            },
            month3: {
                focus: 'Practice',
                skills: ['Drafting', 'Public Speaking', 'Ethics'],
                activities: ['Draft a simple affidavit', 'Moot court practice', 'Intern at a Chambers']
            }
        },
        careerPath: {
            entryTitles: ['Pupil Barrister', 'Legal Assistant'],
            employers: ['Private Chambers', 'Corporate Firms', 'Judiciary', 'NGOs (Human Rights)'],
            workspace: 'Office and Court.'
        },
        salary: {
            entry: 'SLE 3,000 - 6,000 (Pupilage)',
            experienced: 'SLE 15,000 - 50,000+',
            note: 'Top private lawyers earn very high fees.'
        },
        mentorship: {
            type: 'Senior Counsel',
            source: 'Law Chambers.'
        },
        immediateActions: [
            'Get excellent A-Levels in Arts.',
            'Visit the Law Courts building.',
            'Read a newspaper legal column.'
        ]
    },

    // ==========================================
    // FINANCE & ECON
    // ==========================================
    {
        id: 'banker',
        category: 'Finance',
        title: 'Banker',
        keywords: ['bank', 'cash', 'teller', 'manager', 'loans'],
        image: '/images/sections/careers/finance.png',
        overview: 'Bankers manage money for individuals and businesses. The banking sector in SL is stable and growing.',
        demandLevel: 'Medium',
        entryRequirements: {
            education: 'Degree in Banking, Finance, or Econ',
            subjects: ['Math', 'Economics', 'Business'],
            technicalSkills: ['Customer Service', 'Cash Handling']
        },
        studyPathways: [
            { institution: 'IPAM', program: 'BSc Banking & Finance', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Njala', program: 'BSc Economics', duration: '4 Years', location: 'Bo', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Money',
                skills: ['Counting', 'Currency Security', 'Banking Acts'],
                activities: ['Learn to count cash fast', 'Study SLCB regulations', 'Open a bank account']
            },
            month2: {
                focus: 'Operations',
                skills: ['Teller Software', 'KYC (Know Your Customer)', 'Compliance'],
                activities: ['Learn about money laundering checks', 'Practice data entry', 'Understand loan interest']
            },
            month3: {
                focus: 'Services',
                skills: ['Sales', 'Digital Banking', 'Relationship Mgmt'],
                activities: ['Promote a banking app', 'Apply for Graduate Trainee roles', 'Build network']
            }
        },
        careerPath: {
            entryTitles: ['Teller', 'Customer Service Officer', 'Sales Agent'],
            employers: ['Rokel Commercial Bank', 'Sierra Leone Commercial Bank', 'EcoBank', 'GTBank'],
            workspace: 'Bank Branch.'
        },
        salary: {
            entry: 'SLE 3,000 - 5,000',
            experienced: 'SLE 8,000 - 20,000',
            note: 'Bonuses available.'
        },
        mentorship: {
            type: 'Branch Manager',
            source: 'Banks.'
        },
        immediateActions: [
            'Study Math.',
            'Apply to IPAM.',
            'Dress professionally.'
        ]
    },
    {
        id: 'economist',
        category: 'Finance',
        title: 'Economist',
        keywords: ['economy', 'finance', 'policy', 'research', 'analysis'],
        image: '/images/sections/careers/finance.png',
        overview: 'Economists analyze data to understand trends and advise on policy. Vital for Government planning and Development.',
        demandLevel: 'Medium',
        entryRequirements: {
            education: 'BSc Economics',
            subjects: ['Economics', 'Math', 'Government'],
            technicalSkills: ['Statistics', 'Research', 'Excel']
        },
        studyPathways: [
            { institution: 'Fourah Bay College', program: 'BSc Economics', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Njala University', program: 'BSc Economics', duration: '4 Years', location: 'Bo', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Theory',
                skills: ['Micro/Macro', 'Supply & Demand', 'Inflation'],
                activities: ['Read Bank of Sierra Leone reports', 'Track the exchange rate', 'Study budget speech']
            },
            month2: {
                focus: 'Analysis',
                skills: ['Econometrics', 'STATA/SPSS', 'Data Viz'],
                activities: ['Download inflation data', 'Run a regression (basic)', 'Write a commentary']
            },
            month3: {
                focus: 'Policy',
                skills: ['Public Policy', 'Development Econ', 'Writing'],
                activities: ['Write a policy brief', 'Attend a seminar', 'Apply to Ministry of Finance']
            }
        },
        careerPath: {
            entryTitles: ['Assistant Economist', 'Research Assistant', 'Policy Analyst'],
            employers: ['Ministry of Finance', 'Bank of Sierra Leone', 'World Bank', 'UNDP'],
            workspace: 'Office.'
        },
        salary: {
            entry: 'SLE 4,000 - 7,000',
            experienced: 'SLE 12,000 - 30,000+',
            note: 'International orgs pay very high.'
        },
        mentorship: {
            type: 'Senior Economist',
            source: 'MoF / BSL.'
        },
        immediateActions: [
            'Read the National Budget.',
            'Master Excel.',
            'Follow economic news daily.'
        ]
    },

    // ==========================================
    // SCIENCE & ENV
    // ==========================================
    {
        id: 'environmentalist',
        category: 'Science',
        title: 'Environmentalist',
        keywords: ['nature', 'climate', 'forest', 'conservation', 'green'],
        image: '/images/sections/careers/agriculture.png',
        overview: 'Environmentalists work to protect Sierra Leone’s forests, coastlines, and wildlife. Crucial as climate change impacts the country.',
        demandLevel: 'Medium',
        entryRequirements: {
            education: 'Degree in Env Science, Geography, or Forestry',
            subjects: ['Geography', 'Biology', 'Chemistry'],
            technicalSkills: ['GIS', 'Conservation Methods', 'Reporting']
        },
        studyPathways: [
            { institution: 'Njala University', program: 'BSc Environmental Management', duration: '4 Years', location: 'Njala', type: 'Degree' },
            { institution: 'Fourah Bay College', program: 'BSc Geography', duration: '4 Years', location: 'Freetown', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Ecosystems',
                skills: ['SL Flora/Fauna', 'Climate Change', 'Pollution'],
                activities: ['Learn about the Gola Forest', 'Study the EPA Act', 'Identify 10 local tree species']
            },
            month2: {
                focus: 'Tools',
                skills: ['GIS (Mapping)', 'Water Testing', 'Impact Assessment'],
                activities: ['Use Google Earth to map a zone', 'Test well water quality', 'Read an EIA report']
            },
            month3: {
                focus: 'Conservation',
                skills: ['Community Engagement', 'Grant Writing', 'Advocacy'],
                activities: ['Volunteer with CSSL or Tacugama', 'Start a tree planting club', 'Draft a project proposal']
            }
        },
        careerPath: {
            entryTitles: ['Environmental Officer', 'Conservation Assistant', 'Ranger'],
            employers: ['EPA-SL', 'Conservation Society (CSSL)', 'Tacugama', 'Mining (Env Depts)'],
            workspace: 'Field and Office (EPA).'
        },
        salary: {
            entry: 'SLE 3,500 - 6,500',
            experienced: 'SLE 8,000 - 18,000',
            note: 'International conservation NGOs pay well.'
        },
        mentorship: {
            type: 'Conservationist',
            source: 'EPA or CSSL.'
        },
        immediateActions: [
            'Visit Tacugama Chimpanzee Sanctuary.',
            'Read the EPA mandate.',
            'Join the Fourah Bay College Env Club.'
        ]
    },
    {
        id: 'geologist',
        category: 'Science',
        title: 'Geologist',
        keywords: ['rocks', 'mining', 'earth', 'survey', 'mineral'],
        image: '/images/sections/careers/mining.png',
        overview: 'Geologists study the earth to find minerals and water. In SL, they are the first step in the mining process.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'BSc Geology',
            subjects: ['Geography', 'Chemistry', 'Physics', 'Math'],
            technicalSkills: ['Mapping', 'Sampling', 'GIS']
        },
        studyPathways: [
            { institution: 'Fourah Bay College', program: 'BSc Geology', duration: '4 Years', location: 'Freetown', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Rocks',
                skills: ['Mineral ID', 'Petrology', 'Field Safety'],
                activities: ['Identify granite vs laterite', 'Learn the Mohs hardness scale', 'Get field boots']
            },
            month2: {
                focus: 'Surveying',
                skills: ['Compass use', 'Mapping', 'GPS'],
                activities: ['Create a geological map of a small area', 'Learn dip and strike', 'Use a handheld GPS']
            },
            month3: {
                focus: 'Exploration',
                skills: ['Drilling methods', 'Core logging', 'Reporting'],
                activities: ['Visit a quarry', 'Learn to log drill core (theory)', 'Apply for internship at NMA']
            }
        },
        careerPath: {
            entryTitles: ['Exploration Geologist', 'Geology Assistant', 'Field Geologist'],
            employers: ['Mining Companies', 'National Minerals Agency', 'Water Drilling Firms'],
            workspace: 'Remote Field Sites.'
        },
        salary: {
            entry: 'SLE 5,000 - 9,000',
            experienced: 'SLE 12,000 - 30,000+',
            note: 'Field work comes with allowances.'
        },
        mentorship: {
            type: 'Senior Geologist',
            source: 'NMA / Mining Companies.'
        },
        immediateActions: [
            'Get a geology hammer.',
            'Visit the Geology Dept at FBC.',
            'Learn to read a topographic map.'
        ]
    },

    // ==========================================
    // TOURISM
    // ==========================================
    {
        id: 'hotel-manager',
        category: 'Hospitality',
        title: 'Hotel Manager',
        keywords: ['hotel', 'hospitality', 'manager', 'tourism', 'guest'],
        image: '/images/sections/careers/finance.png',
        overview: 'Hotel Managers run hotels, ensuring guests are happy and operations are profitable. Tourism is a priority sector for SL.',
        demandLevel: 'Medium',
        entryRequirements: {
            education: 'Degree/Diploma in Hotel Management',
            technicalSkills: ['Customer Service', 'Accounting', 'Leadership']
        },
        studyPathways: [
            { institution: 'Milton Margai Technical University', program: 'Tourism & Hospitality', duration: '4 Years', location: 'Freetown', type: 'Degree' },
            { institution: 'Limkokwing', program: 'Tourism Management', duration: '3 Years', location: 'Freetown', type: 'Degree' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Front Office',
                skills: ['Reservations', 'Check-in', 'Hospitality Software'],
                activities: ['Learn standard reception protocols', 'Roleplay guest complaints', 'Visit 3 top hotels']
            },
            month2: {
                focus: 'Housekeeping',
                skills: ['Standards', 'Inspection', 'Inventory'],
                activities: ['Learn how to inspect a room', 'Understand laundry cycles', 'Study hygiene standards']
            },
            month3: {
                focus: 'Management',
                skills: ['Staffing', 'Marketing', 'P&L'],
                activities: ['Create a hotel marketing plan', 'Interview a hotel GM', 'Apply for Front Desk lead']
            }
        },
        careerPath: {
            entryTitles: ['Front Desk Manager', 'Housekeeping Supervisor', 'Guest Relations Officer'],
            employers: ['Radisson Blu', 'The Place (Tokeh)', 'Country Lodge', 'Bintumani'],
            workspace: 'Hotel.'
        },
        salary: {
            entry: 'SLE 3,500 - 7,000',
            experienced: 'SLE 10,000 - 25,000',
            note: 'Benefits often include meals/transport.'
        },
        mentorship: {
            type: 'General Manager',
            source: 'Top Hotels.'
        },
        immediateActions: [
            'Visit Milton Margai Tourism School.',
            'Work on your spoken English.',
            'Get a summer job at a guest house.'
        ]
    },

    // ==========================================
    // MORE TRADES (VOCATIONAL)
    // ==========================================
    {
        id: 'hairdresser',
        category: 'Skilled Trade',
        title: 'Hairdresser / Barber',
        keywords: ['hair', 'beauty', 'salon', 'barber', 'cut'],
        image: '/images/sections/careers/finance.png',
        overview: 'Hairdressers and Barbers provide grooming services. It is a massive self-employment sector in Sierra Leone.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'Apprenticeship',
            technicalSkills: ['Cutting', 'Braiding', 'Customer Service'],
            note: 'Talent and speed matter most.'
        },
        studyPathways: [
            { institution: 'Vocational Centers', program: 'Cosmetology', duration: '1 Year', location: 'Nationwide', type: 'Vocational' },
            { institution: 'Local Salons', program: 'Apprenticeship', duration: '1-2 Years', location: 'Nationwide', type: 'Vocational' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Basics',
                skills: ['Tools Hygiene', 'Washing', 'Basic Cuts'],
                activities: ['Learn to sterilize clippers', 'Practice braiding on a doll', 'Observe a master barber']
            },
            month2: {
                focus: 'Styles',
                skills: ['Fading', 'Weaving', 'Coloring'],
                activities: ['Master the "low fade"', 'Learn 3 popular braid styles', 'Understand hair textures']
            },
            month3: {
                focus: 'Business',
                skills: ['Client Retention', 'Pricing', 'Shop Mgmt'],
                activities: ['Rent a chair', 'Build a WhatsApp client list', 'Manage daily cash flow']
            }
        },
        careerPath: {
            entryTitles: ['Apprentice', 'Junior Stylist'],
            employers: ['Salons', 'Barbershops', 'Self-Employed'],
            workspace: 'Shop / Salon.'
        },
        salary: {
            entry: 'SLE 1,500 - 4,000',
            experienced: 'SLE 5,000 - 15,000 (Owner)',
            note: 'Daily cash income is common.'
        },
        mentorship: {
            type: 'Shop Owner',
            source: 'Local Community.'
        },
        immediateActions: [
            'Find a mentor shop.',
            'Buy your own set of combs/clippers.',
            'Watch YouTube tutorials.'
        ]
    },
    {
        id: 'tailor',
        category: 'Skilled Trade',
        title: 'Tailor / Seamstress',
        keywords: ['fashion', 'clothes', 'sewing', 'design', 'fabric'],
        image: '/images/sections/careers/finance.png',
        overview: 'Tailors design and sew custom clothing (Ashobi, suits). Essential for SL culture and events.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'Apprenticeship',
            technicalSkills: ['Sewing Machine', 'Cutting', 'Measurements'],
            note: 'Creativity is key.'
        },
        studyPathways: [
            { institution: 'YMCA/YWCA', program: 'Tailoring', duration: '1-2 Years', location: 'Freetown', type: 'Vocational' },
            { institution: 'Local Tailor Shops', program: 'Apprenticeship', duration: '2-3 Years', location: 'Nationwide', type: 'Vocational' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Machine',
                skills: ['Pedaling', 'Threading', 'Straight Lines'],
                activities: ['Master the manual machine', 'Sew a straight seam', 'Practice hemming']
            },
            month2: {
                focus: 'Cutting',
                skills: ['Pattern drafting', 'Measurements', 'Fabric types'],
                activities: ['Cut a simple skirt/trouser', 'Learn to measure a client correctly', 'Identify cotton vs polyester']
            },
            month3: {
                focus: 'Creation',
                skills: ['Finishing', 'Embroidery', 'Fitting'],
                activities: ['Sew a full outfit', 'Learn to fix zippers', 'Start taking small jobs']
            }
        },
        careerPath: {
            entryTitles: ['Apprentice', 'Junior Tailor'],
            employers: ['Tailor Shops', 'Garment Factories', 'Self-Employed'],
            workspace: 'Workshop.'
        },
        salary: {
            entry: 'SLE 1,500 - 4,000',
            experienced: 'SLE 5,000 - 15,000+',
            note: 'Peak seasons (December/Eid) bring huge income.'
        },
        mentorship: {
            type: 'Master Tailor',
            source: 'Fashion Associations.'
        },
        immediateActions: [
            'Buy a tape measure.',
            'Find a shop to apprentice.',
            'Practice sketching designs.'
        ]
    },
    {
        id: 'driver',
        category: 'Service',
        title: 'Professional Driver',
        keywords: ['drive', 'transport', 'truck', 'taxi', 'logistics'],
        image: '/images/sections/careers/finance.png',
        overview: 'Professional drivers operate taxis, trucks, and company vehicles. Reliable drivers are always in demand by NGOs and Companies.',
        demandLevel: 'High',
        entryRequirements: {
            education: 'BECE (Preferred)',
            certification: 'Valid Driver’s License (Class B/C/D)',
            technicalSkills: ['Defensive Driving', 'Basic Mechanics']
        },
        studyPathways: [
            { institution: 'SL Road Safety Authority', program: 'Driving School', duration: '3 Months', location: 'Nationwide', type: 'Certificate' }
        ],
        skillRoadmap: {
            month1: {
                focus: 'Rules',
                skills: ['Highway Code', 'Signs', 'Safety'],
                activities: ['Study the SL Highway Code', 'Enroll in a driving school', 'Pass the theory test']
            },
            month2: {
                focus: 'Practice',
                skills: ['Control', 'Parking', 'City Driving'],
                activities: ['Get learner\s permit', 'Practice driving in traffic', 'Learn to change a tyre']
            },
            month3: {
                focus: 'Professional',
                skills: ['Routes', 'Log books', 'Maintenance checks'],
                activities: ['Get full license', 'Learn map of Freetown/Provinces', 'Apply to logistics firms']
            }
        },
        careerPath: {
            entryTitles: ['Company Driver', 'Truck Driver', 'Taxi Driver'],
            employers: ['NGOs', 'Mining', 'Transport Companies', 'Private Firms'],
            workspace: 'Vehicle.'
        },
        salary: {
            entry: 'SLE 2,500 - 4,500',
            experienced: 'SLE 5,000 - 9,000',
            note: 'Truck drivers earn more.'
        },
        mentorship: {
            type: 'Senior Driver',
            source: 'Transport Union.'
        },
        immediateActions: [
            'Get the Highway Code book.',
            'Register with a driving school.',
            'Learn basic car maintenance.'
        ]
    }
];

// Helper to get roadmap by slug/id (mapped from career title input)
export function getRoadmap(careerTitle: string): RoadmapTemplate | undefined {
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const target = normalize(careerTitle);

    return CAREER_ROADMAPS.find(r =>
        normalize(r.title) === target ||
        r.keywords.some(k => normalize(k) === target)
    );
}

// Fallback search
export function searchRoadmaps(query: string): RoadmapTemplate[] {
    const q = query.toLowerCase();
    return CAREER_ROADMAPS.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.keywords.some(k => k.toLowerCase().includes(q))
    );
}

