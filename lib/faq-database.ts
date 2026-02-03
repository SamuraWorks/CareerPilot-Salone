// Comprehensive FAQ Database for Career Pilot Salone
// Complete knowledge base covering ALL possible user questions

export interface FAQ {
    question: string;
    answer: string;
    keywords: string[];
    category: 'career' | 'app' | 'education' | 'salary' | 'scholarship' | 'general';
}

export const COMPREHENSIVE_FAQ: FAQ[] = [
    // ========== APP FUNCTIONALITY ==========
    {
        question: "What is Career Pilot Salone?",
        answer: `Career Pilot Salone is Sierra Leone's first AI-powered career guidance platform. We help students and job seekers:

• Discover suitable career paths through AI career guidance
• Get personalized 3-month career roadmaps
• Find universities and courses in Sierra Leone
• Access scholarship opportunities
• Connect with mentors
• Build professional CVs
• Get AI-powered career advice

Everything is tailored specifically for Sierra Leone's job market and educational system.`,
        keywords: ['what is', 'about', 'platform', 'career pilot', 'app'],
        category: 'app'
    },
    {
        question: "Do I need to create an account to use Career Pilot?",
        answer: `**No, you don't need to create an account immediately!**

You can use most features like the **AI Career Guidance** and **Roadmap Generator** completely anonymously. 

**How it works:**
• We save your progress to a secure, private "Anonymous Profile" on your device.
• You can chat with the AI, generate roadmaps, and explore careers without giving us your email.

**When to sign up:**
• Creating an account is optional but recommended if you want to sync your progress across different devices (e.g., phone and laptop) or if you want to save your CVs permanently in the cloud.`,
        keywords: ['account', 'sign up', 'login', 'register', 'anonymous', 'free'],
        category: 'app'
    },
    {
        question: "How do I generate a cover letter?",
        answer: `Our Cover Letter Generator creates personalized, job-specific cover letters:

**Steps:**
1. Go to the "Cover Letter" page from the menu
2. Enter the job title and company name
3. Paste or describe the job requirements
4. Click "Generate"
5. Get an AI-crafted cover letter that:
   - Matches your profile to the job
   - Uses professional language
   - Highlights relevant experience
   - Is ready to download as PDF

The generator takes about 30 seconds and creates tailored letters for each application!`,
        keywords: ['cover letter', 'application letter', 'job application', 'how to write'],
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
        keywords: ['roadmap', 'career plan', 'how to', 'generate', '3 month'],
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
        keywords: ['ai guidance', 'chat', 'ask questions', 'career counselor', 'how does it work'],
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
        keywords: ['scholarship', 'funding', 'financial aid', 'how to find', 'opportunities'],
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
        keywords: ['mentor', 'mentorship', 'connect', 'professional', 'guidance'],
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
        keywords: ['cv', 'resume', 'build cv', 'cv builder', 'create resume'],
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
        keywords: ['high demand', 'best careers', 'in demand', 'popular jobs', 'what careers'],
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
        keywords: ['software developer', 'programmer', 'coding', 'how to become', 'tech career'],
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
        keywords: ['nurse', 'nursing', 'healthcare', 'medical', 'how to become'],
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
        keywords: ['business degree', 'business careers', 'management', 'accounting', 'what can i do'],
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
        keywords: ['engineering', 'engineer', 'civil', 'electrical', 'mining', 'mechanical'],
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
        keywords: ['universities', 'colleges', 'schools', 'where to study', 'sierra leone universities'],
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
        keywords: ['admission', 'requirements', 'how to apply', 'university entrance', 'wassce'],
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
        keywords: ['online courses', 'online learning', 'free courses', 'study online', 'internet'],
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
        keywords: ['salary', 'pay', 'earn', 'income', 'how much', 'wages'],
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
        keywords: ['government job', 'civil service', 'public sector', 'government salary'],
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
        keywords: ['find job', 'job search', 'employment', 'where to find jobs', 'hiring'],
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
        keywords: ['skills', 'what skills', 'employers want', 'job requirements', 'qualifications'],
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
        keywords: ['teacher', 'teaching', 'education career', 'how to become teacher', 'lecturer'],
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
        keywords: ['accountant', 'accounting', 'finance', 'cpa', 'acca', 'how to become'],
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
        keywords: ['agriculture', 'farming', 'agribusiness', 'agricultural', 'crops'],
        category: 'career'
    },

    // ========== GENERAL GUIDANCE ==========
    {
        question: "I don't know what career to choose. What should I do?",
        answer: `**Finding Your Career Path - Step by Step:**

**1. Ask Our AI Career Mentor (5 minutes):**
• Visit the AI Mentor page
• Chat about your interests and skills
• Get personalized career recommendations
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
        keywords: ['don\'t know', 'confused', 'what career', 'help me choose', 'undecided'],
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
        keywords: ['change career', 'too late', 'career change', 'switch careers', 'new career'],
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
        keywords: ['degree', 'university degree', 'important', 'need degree', 'without degree'],
        category: 'general'
    }
];

// Intelligent question matching function
export function findBestAnswer(userQuestion: string): string {
    const lowerQuestion = userQuestion.toLowerCase();

    // Calculate match scores for each FAQ
    const scoredFAQs = COMPREHENSIVE_FAQ.map(faq => {
        let score = 0;

        // Check if question keywords appear in user question
        faq.keywords.forEach(keyword => {
            if (lowerQuestion.includes(keyword.toLowerCase())) {
                score += 10;
            }
        });

        // Check for word matches in the FAQ question itself
        const faqWords = faq.question.toLowerCase().split(' ');
        const userWords = lowerQuestion.split(' ');

        faqWords.forEach(word => {
            if (word.length > 3 && userWords.includes(word)) {
                score += 5;
            }
        });

        return { faq, score };
    });

    // Sort by score and get best match
    scoredFAQs.sort((a, b) => b.score - a.score);

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
🎯 **Our Platform**: How to use the cover letter generator, roadmap generator, CV builder, and more

Please ask a specific question, like:
• "How do I become a software developer?"
• "What are typical salaries in Sierra Leone?"
• "How do I generate a cover letter?"
• "What universities offer engineering programs?"

What would you like to know?`;
}

// Get FAQs by category
export function getFAQsByCategory(category: FAQ['category']): FAQ[] {
    return COMPREHENSIVE_FAQ.filter(faq => faq.category === category);
}

// Get all categories
export function getAllCategories(): FAQ['category'][] {
    return ['career', 'app', 'education', 'salary', 'scholarship', 'general'];
}
