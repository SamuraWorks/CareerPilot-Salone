// Comprehensive Roadmap Database for Career Pilot Salone
// Pre-built 3-month roadmaps for 30+ careers

export interface RoadmapTemplate {
    keywords: string[];
    title: string;
    overview: string;
    salaryRange: string;
    demand: 'High' | 'Medium' | 'Low';
    phases: {
        name: string;
        goal: string;
        steps: string[];
        resources: string[];
    }[];
}

export const CAREER_ROADMAPS: RoadmapTemplate[] = [
    // ========== TECHNOLOGY CAREERS ==========
    {
        keywords: ['software developer', 'programmer', 'coder', 'software engineer', 'web developer', 'app developer'],
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
        keywords: ['data analyst', 'data scientist', 'business analyst', 'data analysis'],
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
        keywords: ['it support', 'help desk', 'technical support', 'it technician', 'computer technician'],
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
        keywords: ['nurse', 'nursing', 'registered nurse', 'staff nurse'],
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
        keywords: ['doctor', 'medical doctor', 'physician', 'medicine', 'mbbs'],
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
        keywords: ['accountant', 'accounting', 'bookkeeper', 'finance', 'cpa', 'acca'],
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
        keywords: ['marketing', 'digital marketing', 'marketing manager', 'social media manager', 'brand manager'],
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
        keywords: ['civil engineer', 'civil engineering', 'construction engineer', 'structural engineer'],
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
        keywords: ['electrical engineer', 'electrical engineering', 'power engineer', 'electronics'],
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
        keywords: ['teacher', 'teaching', 'primary teacher', 'secondary teacher', 'educator'],
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
        keywords: ['graphic designer', 'graphic design', 'designer', 'visual designer', 'creative designer'],
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
        keywords: ['entrepreneur', 'business owner', 'start business', 'small business', 'startup'],
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
        keywords: ['project manager', 'program manager', 'project management', 'pmp'],
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
        keywords: ['lawyer', 'attorney', 'legal', 'law', 'barrister', 'solicitor'],
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
        keywords: ['journalist', 'reporter', 'media', 'news', 'broadcasting', 'journalism'],
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
        keywords: ['pharmacist', 'pharmacy', 'pharmaceutical', 'drug', 'medication'],
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
        keywords: ['human resources', 'hr', 'hr manager', 'recruitment', 'personnel'],
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

// Intelligent career matching function
export function findCareerRoadmap(careerInput: string): RoadmapTemplate | null {
    const lowerInput = careerInput.toLowerCase().trim();

    // Find exact or close match
    for (const roadmap of CAREER_ROADMAPS) {
        // Check if any keyword matches
        if (roadmap.keywords.some(keyword => lowerInput.includes(keyword) || keyword.includes(lowerInput))) {
            return roadmap;
        }
    }

    // No match found
    return null;
}

// Get all available career roadmaps
export function getAllCareerRoadmaps(): string[] {
    return CAREER_ROADMAPS.map(r => r.title);
}
