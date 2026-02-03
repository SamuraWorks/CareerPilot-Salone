"use client"

import React from "react"
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Bot, MessageCircle, Send, User, ArrowLeft, Briefcase, GraduationCap, Lightbulb, Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

// Comprehensive Sierra Leone career knowledge base
const careerDatabase = {
  technology: {
    title: "Software Developer / IT Professional",
    description: "Build websites, apps, and digital solutions for businesses in Sierra Leone and globally.",
    roadmap: [
      "Month 1-3: Learn programming basics (Python, JavaScript) via free online courses (freeCodeCamp, Coursera)",
      "Month 4-6: Build 2-3 portfolio projects (website, simple app)",
      "Month 7-9: Join DSTI training programs or get certifications",
      "Month 10-12: Apply for internships at tech companies in Freetown",
      "Year 2+: Junior Developer position, specialize in web/mobile/data"
    ],
    universities: [
      "Fourah Bay College (FBC) - Computer Science Department",
      "IPAM - Information Technology programs",
      "DSTI - Free government tech training programs",
      "Njala University - Computer Science",
      "Limkokwing University - IT programs"
    ],
    mentors: [
      "DSTI Alumni Network - Connect through their website",
      "Orange SL Digital Team - Apply for their internship programs",
      "iDT Labs Freetown - Join their coding community",
      "Innovation SL - Startup mentorship programs"
    ],
    salary: "Junior: Le 2,000-4,000/month | Senior: Le 6,000-15,000/month | Remote work can pay more",
    demand: "HIGH - Growing sector with opportunities in fintech, e-commerce, and government digitization"
  },
  healthcare: {
    title: "Healthcare Professional (Nursing/Medical)",
    description: "Provide medical care in hospitals, clinics, and community health centers across Sierra Leone.",
    roadmap: [
      "Year 1: Complete prerequisites (Biology, Chemistry at WASSCE level)",
      "Year 2-4: Study at COMAHS or School of Nursing",
      "Year 4-5: Clinical rotations at government hospitals",
      "Year 5: Register with Nurses and Midwives Board or Medical Council",
      "Year 5+: Work in hospitals, specialize, or join NGO health programs"
    ],
    universities: [
      "College of Medicine and Allied Health Sciences (COMAHS) - Freetown",
      "School of Nursing, Freetown - Government-sponsored",
      "Bo Government Hospital Nursing School",
      "Njala University - Public Health programs"
    ],
    mentors: [
      "Senior Nurses at Connaught Hospital",
      "Ministry of Health - Contact District Health Officers",
      "WHO Sierra Leone - Public health opportunities",
      "Partners in Health (PIH) - Training programs"
    ],
    salary: "Government Nurse: Le 1,500-3,000/month | Private/NGO: Le 3,000-8,000/month",
    demand: "VERY HIGH - Sierra Leone needs more healthcare workers. Job security is strong."
  },
  education: {
    title: "Teacher / Education Professional",
    description: "Shape the future by teaching in schools across Sierra Leone.",
    roadmap: [
      "Year 1-3: Complete Teachers Certificate (TC) or Higher Teachers Certificate (HTC)",
      "Year 3: Register with Teaching Service Commission (TSC)",
      "Year 3-5: Work as classroom teacher, build experience",
      "Year 5-8: Pursue B.Ed degree for advancement",
      "Year 8+: Senior Teacher, Head of Department, Principal"
    ],
    universities: [
      "Freetown Teachers College (FTC) - Primary education focus",
      "Milton Margai College of Education and Technology (MMCET)",
      "Eastern Polytechnic - Teacher training",
      "Njala University - Bachelor of Education",
      "University of Makeni - Education programs"
    ],
    mentors: [
      "Experienced Head Teachers in your district",
      "Education Officers at Ministry of Basic Education",
      "Teaching Service Commission (TSC) - Professional development",
      "NGO education coordinators (Save the Children, UNICEF)"
    ],
    salary: "Government Teacher: Le 800-2,500/month | Private School: Le 1,500-4,000/month | International School: Le 4,000-10,000/month",
    demand: "HIGH - Always needed, especially in rural areas. Good job security with government."
  },
  business: {
    title: "Entrepreneur / Business Owner",
    description: "Start and grow your own business to create wealth and employment in Sierra Leone.",
    roadmap: [
      "Month 1-2: Identify a specific business idea based on local market needs",
      "Month 3-4: Create simple business plan, research competitors",
      "Month 5: Register with OARG, get NRA tax number",
      "Month 6-12: Start small, test your product/service, build customers",
      "Year 2+: Grow gradually, reinvest profits, consider hiring"
    ],
    universities: [
      "IPAM - Business Administration and Management",
      "University of Makeni - Commerce and Business",
      "Limkokwing University - Entrepreneurship",
      "FBC - Economics Department"
    ],
    mentors: [
      "SMEDA (Small and Medium Enterprises Development Agency) - Free business advice",
      "Chamber of Commerce Freetown - Networking events",
      "Orange Corners Sierra Leone - Startup incubator",
      "UNDP Youth Entrepreneurship programs"
    ],
    salary: "Varies widely - Some businesses fail, successful ones can earn Le 5,000-50,000+/month",
    demand: "OPPORTUNITY - Sierra Leone needs more local businesses. Government supports youth entrepreneurship."
  },
  finance: {
    title: "Accountant / Finance Professional",
    description: "Manage financial records, audits, and banking operations.",
    roadmap: [
      "Year 1-4: Study Accounting or Finance at university",
      "Year 3-4: Start ACCA or AAT certification",
      "Year 4: Internship at bank or accounting firm",
      "Year 4-5: Entry-level accountant position",
      "Year 5+: Senior Accountant, Financial Analyst, Auditor, CFO track"
    ],
    universities: [
      "IPAM - Accounting and Finance (most respected for this field)",
      "FBC - Economics Department",
      "University of Makeni - Accounting",
      "Limkokwing University - Finance"
    ],
    mentors: [
      "Senior Accountants at commercial banks (Rokel, SLCB, Access Bank)",
      "KPMG Sierra Leone - Big 4 accounting firm",
      "Bank of Sierra Leone - Central bank opportunities",
      "SLICAS (SL Institute of Chartered Accountants)"
    ],
    salary: "Junior Accountant: Le 2,000-4,000/month | Senior/Certified: Le 5,000-15,000/month | Bank Manager: Le 10,000-25,000/month",
    demand: "HIGH - Banks, NGOs, government all need qualified accountants. ACCA certification significantly increases pay."
  },
  agriculture: {
    title: "Agricultural Professional / Agribusiness",
    description: "Work in farming, food production, or agricultural business - Sierra Leone's largest economic sector.",
    roadmap: [
      "Year 1-4: Study Agriculture at Njala University (best for this field)",
      "Year 4-5: Practical attachment at farm or agricultural project",
      "Year 5: Work with Ministry of Agriculture, NGOs, or start own farm",
      "Year 5+: Specialize in crops, livestock, agribusiness, or agricultural extension"
    ],
    universities: [
      "Njala University - School of Agriculture (Best in Sierra Leone)",
      "Eastern Polytechnic - Agricultural programs",
      "FBC - Geography and Environmental Science"
    ],
    mentors: [
      "Ministry of Agriculture Extension Officers in your district",
      "FAO (Food and Agriculture Organization) Sierra Leone",
      "World Food Programme (WFP) - Agricultural projects",
      "Successful commercial farmers in your area"
    ],
    salary: "Extension Officer: Le 1,500-3,000/month | Own Farm: Varies with success | Agribusiness Manager: Le 4,000-12,000/month",
    demand: "HIGH - Government prioritizing agriculture. Land available. Export opportunities exist for cocoa, coffee, cashews."
  },
  law: {
    title: "Lawyer / Legal Professional",
    description: "Practice law, provide legal advice, and work in the justice system.",
    roadmap: [
      "Year 1-4: Study Law at FBC Law Faculty (LLB degree)",
      "Year 5: Attend Sierra Leone Law School (mandatory)",
      "Year 6: Called to the Bar, become a Barrister and Solicitor",
      "Year 6-8: Work at law firm or legal department as junior lawyer",
      "Year 8+: Senior Associate, Partner, Judge track, or start own practice"
    ],
    universities: [
      "Fourah Bay College - Faculty of Law (only accredited law school)",
      "Sierra Leone Law School - Professional qualification (mandatory)"
    ],
    mentors: [
      "Sierra Leone Bar Association - Professional body",
      "Senior lawyers at established firms in Freetown",
      "Legal Aid Board - Pro bono experience",
      "Anti-Corruption Commission - Public sector law"
    ],
    salary: "Junior Lawyer: Le 3,000-6,000/month | Senior Lawyer: Le 8,000-20,000/month | Partner/Own Practice: Le 15,000-50,000+/month",
    demand: "MODERATE - Competitive field but needed. Corporate law and human rights law have good opportunities."
  }
}

// CV building guidance
const cvGuidance = `**How to Build a Strong CV for Sierra Leone Job Market:**

**1. Contact Information**
- Full name (as it appears on your ID)
- Phone number (active number)
- Professional email address
- Location (city/town)
- LinkedIn profile (if you have one)

**2. Professional Summary (3-4 lines)**
- Who you are professionally
- Your key strengths
- What you're looking for

**3. Education**
- Most recent qualification first
- Include institution name, degree, and year
- Add WASSCE results if you're a recent graduate
- Include relevant certifications

**4. Work Experience**
- Start with most recent job
- Include company name, your title, and dates
- Use action verbs: "Managed", "Developed", "Led", "Implemented"
- Quantify achievements: "Increased sales by 25%"
- Include internships and volunteer work

**5. Skills**
- Technical skills (computer software, languages)
- Soft skills (communication, teamwork, leadership)
- Languages: English, Krio, and any local languages

**Tips for Sierra Leone Context:**
- Keep CV to 2 pages maximum
- Use professional font (Arial, Calibri, Times New Roman)
- Include a passport photo (common in SL)
- Proofread carefully for spelling/grammar
- Tailor CV for each job application
- Include references (with permission)

**Use our CV Builder tool** to create a professional CV step by step!`

// Scholarship information
const scholarshipInfo = `**Scholarship Opportunities for Sierra Leoneans:**

**International Scholarships:**

1. **Chevening Scholarships (UK)**
   - Fully funded Masters in UK
   - Deadline: Usually November each year
   - Requires 2 years work experience
   - Website: chevening.org

2. **Fulbright Program (USA)**
   - Graduate studies in America
   - Covers tuition, living expenses, travel
   - Very competitive
   - Website: fulbright.state.gov

3. **DAAD Scholarships (Germany)**
   - Masters and PhD programs
   - Germany has no tuition fees
   - Website: daad.de

4. **Commonwealth Scholarships**
   - For Commonwealth citizens
   - Various UK universities
   - Website: cscuk.dfid.gov.uk

5. **African Leadership University**
   - Need-based scholarships available
   - Pan-African education
   - Website: alueducation.com

**Local Scholarships:**
- Government Scholarships through Ministry of Higher Education
- Rokel Commercial Bank Scholarship
- Orange Foundation Education Support
- Mining company scholarships (in mining districts)

**How to Improve Your Chances:**
1. Maintain excellent academic records
2. Get involved in community service
3. Develop leadership experience
4. Write compelling personal statements
5. Get strong recommendation letters
6. Apply early - don't wait for deadline
7. Apply to multiple scholarships

**Resources:**
- opportunitiesforafricans.com
- scholars4dev.com
- Ministry of Higher Education announcements`

// Job search guidance
const jobSearchInfo = `**How to Find Jobs in Sierra Leone:**

**Online Job Portals:**
- Sierra Leone Jobs (sierraleonejobs.com)
- LinkedIn Jobs (search Sierra Leone)
- Jobweb Sierra Leone
- NGO job boards (reliefweb.int)

**Government Jobs:**
- Public Service Commission announcements
- Ministry websites for sector-specific jobs
- District Council positions
- Teaching Service Commission (for teachers)

**NGO & International Organizations:**
- UN agencies: WFP, UNICEF, UNDP, WHO
- World Bank projects
- International NGOs: Save the Children, CARE, Plan International
- Check their websites regularly

**Private Sector:**
- Banks: Rokel, Access Bank, GT Bank, UBA
- Telecoms: Orange, Africell
- Mining companies: in Kono, Tonkolili, Bo
- Visit company offices directly

**Networking:**
- Attend career fairs in Freetown
- Join professional associations
- Connect with alumni from your school
- Use LinkedIn to connect with professionals
- Attend industry events and workshops

**Tips:**
1. Prepare a strong CV (use our CV Builder)
2. Write tailored cover letters
3. Follow up after applying
4. Practice interview skills
5. Be patient - job searching takes time
6. Consider internships to build experience
7. Start networking before you need a job`

// Smart response function
function getSmartResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()

  // Greetings
  if (message.match(/^(hi|hello|kusheh|hey|good morning|good afternoon|good evening|help)$/i) || message.length < 10) {
    return `Kusheh! Welcome to CareerPilot Salone!

I am your AI career mentor, here to help Sierra Leonean youth find their path to success.

**I can help you with:**
- Discovering the right career for you
- Getting step-by-step roadmaps to your goals  
- Finding universities in Sierra Leone
- Connecting with mentors
- Building your CV
- Finding scholarships
- Job search strategies

**What would you like help with today?**

You can ask me things like:
- "What career is right for me?"
- "How do I become a nurse?"
- "Tell me about tech careers"
- "How do I build a CV?"
- "What scholarships are available?"`
  }

  // Career discovery
  if (message.includes("what career") || message.includes("which career") || message.includes("find career") || message.includes("choose career") || message.includes("career for me") || message.includes("help me find")) {
    return `**Let me help you find the right career!**

To give you the best advice, tell me:

1. **What subjects do you enjoy?** (Math, Science, English, Business, etc.)
2. **What activities interest you?** (Helping people, building things, teaching, leading, creating)
3. **What is your education level?** (WASSCE, some college, degree)

**Popular career paths in Sierra Leone:**

1. **Technology** - Software development, IT support (Growing demand!)
2. **Healthcare** - Nursing, Medicine, Public Health (Always needed)
3. **Education** - Teaching at all levels (Stable jobs)
4. **Business** - Entrepreneurship, Management (Create your own success)
5. **Finance** - Accounting, Banking (Good salaries)
6. **Agriculture** - Farming, Agribusiness (Biggest sector)
7. **Law** - Legal practice (Respected profession)

**Which of these interests you most?** Tell me and I'll give you the full roadmap, universities, and mentors.`
  }

  // Technology careers
  if (message.includes("tech") || message.includes("software") || message.includes("developer") || message.includes("programmer") || message.includes("computer") || message.includes("it career") || message.includes("coding")) {
    const career = careerDatabase.technology
    return `**${career.title}**

${career.description}

**Your Roadmap:**
${career.roadmap.map((step, i) => `${i + 1}. ${step}`).join('\n')}

**Where to Study in Sierra Leone:**
${career.universities.map(u => `- ${u}`).join('\n')}

**Find Mentors:**
${career.mentors.map(m => `- ${m}`).join('\n')}

**Salary Expectations:**
${career.salary}

**Job Demand:** ${career.demand}

**Would you like me to help you plan your first steps, or tell you about another career?**`
  }

  // Healthcare careers
  if (message.includes("nurse") || message.includes("doctor") || message.includes("medical") || message.includes("health") || message.includes("hospital") || message.includes("medicine")) {
    const career = careerDatabase.healthcare
    return `**${career.title}**

${career.description}

**Your Roadmap:**
${career.roadmap.map((step, i) => `${i + 1}. ${step}`).join('\n')}

**Where to Study in Sierra Leone:**
${career.universities.map(u => `- ${u}`).join('\n')}

**Find Mentors:**
${career.mentors.map(m => `- ${m}`).join('\n')}

**Salary Expectations:**
${career.salary}

**Job Demand:** ${career.demand}

**Ready to start your healthcare career? Ask me about the application process or other careers.**`
  }

  // Teaching careers
  if (message.includes("teach") || message.includes("education") || message.includes("school") || message.includes("lecturer") || message.includes("professor")) {
    const career = careerDatabase.education
    return `**${career.title}**

${career.description}

**Your Roadmap:**
${career.roadmap.map((step, i) => `${i + 1}. ${step}`).join('\n')}

**Where to Study in Sierra Leone:**
${career.universities.map(u => `- ${u}`).join('\n')}

**Find Mentors:**
${career.mentors.map(m => `- ${m}`).join('\n')}

**Salary Expectations:**
${career.salary}

**Job Demand:** ${career.demand}

**Teaching is a noble profession that shapes Sierra Leone's future. What else would you like to know?**`
  }

  // Business/Entrepreneurship
  if (message.includes("business") || message.includes("entrepreneur") || message.includes("start") || message.includes("own company") || message.includes("self employ")) {
    const career = careerDatabase.business
    return `**${career.title}**

${career.description}

**Your Roadmap:**
${career.roadmap.map((step, i) => `${i + 1}. ${step}`).join('\n')}

**Where to Study in Sierra Leone:**
${career.universities.map(u => `- ${u}`).join('\n')}

**Find Mentors:**
${career.mentors.map(m => `- ${m}`).join('\n')}

**Earnings Potential:**
${career.salary}

**Opportunity:** ${career.demand}

**Do you have a business idea? Tell me about it and I can give you specific advice.**`
  }

  // Finance/Accounting
  if (message.includes("account") || message.includes("finance") || message.includes("bank") || message.includes("audit") || message.includes("money")) {
    const career = careerDatabase.finance
    return `**${career.title}**

${career.description}

**Your Roadmap:**
${career.roadmap.map((step, i) => `${i + 1}. ${step}`).join('\n')}

**Where to Study in Sierra Leone:**
${career.universities.map(u => `- ${u}`).join('\n')}

**Find Mentors:**
${career.mentors.map(m => `- ${m}`).join('\n')}

**Salary Expectations:**
${career.salary}

**Job Demand:** ${career.demand}

**ACCA certification is highly recommended for this career. Would you like more details?**`
  }

  // Agriculture
  if (message.includes("farm") || message.includes("agricult") || message.includes("crop") || message.includes("livestock") || message.includes("food production")) {
    const career = careerDatabase.agriculture
    return `**${career.title}**

${career.description}

**Your Roadmap:**
${career.roadmap.map((step, i) => `${i + 1}. ${step}`).join('\n')}

**Where to Study in Sierra Leone:**
${career.universities.map(u => `- ${u}`).join('\n')}

**Find Mentors:**
${career.mentors.map(m => `- ${m}`).join('\n')}

**Earnings Potential:**
${career.salary}

**Opportunity:** ${career.demand}

**Agriculture is Sierra Leone's backbone. What specific area interests you - crops, livestock, or agribusiness?**`
  }

  // Law
  if (message.includes("law") || message.includes("lawyer") || message.includes("legal") || message.includes("barrister") || message.includes("solicitor") || message.includes("court")) {
    const career = careerDatabase.law
    return `**${career.title}**

${career.description}

**Your Roadmap:**
${career.roadmap.map((step, i) => `${i + 1}. ${step}`).join('\n')}

**Where to Study in Sierra Leone:**
${career.universities.map(u => `- ${u}`).join('\n')}

**Find Mentors:**
${career.mentors.map(m => `- ${m}`).join('\n')}

**Salary Expectations:**
${career.salary}

**Job Demand:** ${career.demand}

**Law requires dedication but can be very rewarding. Any specific questions about the path?**`
  }

  // CV help
  if (message.includes("cv") || message.includes("resume") || message.includes("curriculum vitae")) {
    return cvGuidance
  }

  // Scholarship
  if (message.includes("scholarship") || message.includes("funding") || message.includes("sponsor") || message.includes("study abroad") || message.includes("free education")) {
    return scholarshipInfo
  }

  // Job search
  if (message.includes("job") || message.includes("work") || message.includes("employ") || message.includes("vacancy") || message.includes("hiring") || message.includes("recruit")) {
    return jobSearchInfo
  }

  // University information
  if (message.includes("university") || message.includes("college") || message.includes("where to study") || message.includes("admission")) {
    return `**Universities in Sierra Leone:**

**Major Universities:**

1. **University of Sierra Leone (Fourah Bay College)**
   - Oldest university in West Africa
   - Programs: Law, Medicine, Engineering, Arts, Sciences
   - Location: Mount Aureol, Freetown

2. **Njala University**
   - Best for Agriculture and Sciences
   - Programs: Agriculture, Education, Environmental Sciences
   - Locations: Njala (Bo District) and Freetown campus

3. **IPAM (Institute of Public Administration)**
   - Best for Business and Management
   - Programs: Accounting, Business Admin, Public Admin
   - Location: Freetown

4. **Milton Margai College of Education (MMCET)**
   - Best for Teacher Training
   - Programs: Education, Technical Education
   - Location: Freetown

5. **University of Makeni**
   - Private university
   - Programs: Business, Education, IT
   - Location: Makeni

6. **Limkokwing University**
   - International university
   - Programs: Creative Technology, Business, IT
   - Location: Freetown

**Professional Training:**
- COMAHS - Medical and Health Sciences
- Sierra Leone Law School - Legal profession
- DSTI - Technology training (free!)

**What field are you interested in? I can recommend the best university for you.**`
  }

  // Internship guidance
  if (message.includes("internship") || message.includes("intern") || message.includes("attachment") || message.includes("industrial training")) {
    return `**How to Find Internships in Sierra Leone:**

**Where to Find Internships:**

1. **Banks & Financial Institutions**
   - Rokel Commercial Bank
   - Access Bank, GT Bank, UBA
   - Bank of Sierra Leone (Central Bank)
   - Apply directly or through university placement office

2. **NGOs & International Organizations**
   - UN agencies (UNDP, UNICEF, WFP, WHO)
   - World Bank Sierra Leone
   - Plan International, Save the Children
   - Apply on their websites

3. **Government Ministries**
   - Ministry of Finance
   - Ministry of Health
   - Ministry of Education
   - Contact HR departments directly

4. **Tech & Telecommunications**
   - Orange Sierra Leone
   - Africell
   - DSTI - Tech internship programs (free!)
   
5. **Private Companies**
   - Mining companies in Kono, Tonkolili
   - Hotels and tourism companies
   - Import/export businesses

**Tips for Getting Internships:**
- Start applying 3-6 months before you need it
- Prepare a strong CV and cover letter
- Use your university placement office
- Network - ask family, friends, alumni
- Be willing to start as a volunteer
- Follow up on your applications

**What field are you looking for an internship in?**`
  }

  // Interview preparation
  if (message.includes("interview") || message.includes("prepare") || message.includes("questions")) {
    return `**How to Prepare for Job Interviews in Sierra Leone:**

**Before the Interview:**
1. Research the company/organization
2. Review the job description carefully
3. Prepare your documents (CV, certificates, ID)
4. Plan your outfit (dress professionally)
5. Know the location and arrive 15 minutes early

**Common Interview Questions:**
- "Tell me about yourself"
- "Why do you want this job?"
- "What are your strengths and weaknesses?"
- "Where do you see yourself in 5 years?"
- "Why should we hire you?"
- "Tell me about a challenge you overcame"

**How to Answer Well:**
- Be confident but not arrogant
- Give specific examples from your experience
- Keep answers focused (1-2 minutes each)
- Ask thoughtful questions at the end
- Be honest about what you don't know

**Sierra Leone Specific Tips:**
- Greet everyone respectfully
- Dress conservatively and professionally
- Bring original certificates (they may verify)
- Be patient - interviews may not start on time
- Follow up with a thank you call/email

**After the Interview:**
- Send a thank you message
- Follow up if you don't hear back in 2 weeks
- Keep applying to other jobs while waiting

**What type of job are you preparing to interview for?**`
  }

  // Skills development
  if (message.includes("skill") || message.includes("learn") || message.includes("training") || message.includes("course") || message.includes("improve")) {
    return `**Skills to Develop for Career Success in Sierra Leone:**

**Most In-Demand Skills:**

1. **Digital/Computer Skills**
   - Microsoft Office (Word, Excel, PowerPoint)
   - Email and internet research
   - Social media management
   - Where to learn: DSTI (free), computer centers, YouTube

2. **Communication Skills**
   - Professional English (writing and speaking)
   - Report writing
   - Presentation skills
   - Where to learn: British Council, online courses

3. **Technical Skills (by field)**
   - IT: Programming, web design
   - Finance: QuickBooks, accounting software
   - Healthcare: Clinical skills, patient care
   - Where to learn: DSTI, professional courses

4. **Soft Skills**
   - Problem-solving
   - Teamwork
   - Time management
   - Leadership
   - Where to learn: Practice, volunteering, workshops

**Free Learning Resources:**
- DSTI programs (technology, free!)
- Coursera (many free courses)
- Khan Academy (free education)
- YouTube tutorials
- LinkedIn Learning (some free content)

**Certifications Worth Getting:**
- ACCA/AAT for accounting
- Project Management (PMP basics)
- Microsoft Office certification
- Digital marketing certification (Google)

**What specific skills do you want to develop?**`
  }

  // WASSCE and secondary education
  if (message.includes("wassce") || message.includes("secondary") || message.includes("high school") || message.includes("ssce") || message.includes("jss") || message.includes("sss")) {
    return `**After WASSCE - Your Career Options:**

**If You Have Good Results (Credits in core subjects):**

1. **University Education**
   - Apply to FBC, Njala, IPAM, University of Makeni
   - Admission usually requires 5 credits including English and Math
   - Start applications early (January-March)

2. **Professional Colleges**
   - COMAHS (Medicine/Nursing) - requires sciences
   - Law School (after LLB)
   - Teacher Training Colleges

3. **Technical/Vocational Training**
   - DSTI for technology (FREE)
   - Polytechnics for technical skills
   - Nursing schools

**If Your Results Need Improvement:**
- Retake WASSCE (focus on failed subjects)
- Take extra lessons while working
- Consider vocational training first

**Direct Career Paths Without University:**
- Entrepreneurship/Business
- Skilled trades (electrician, mechanic, tailor)
- Agriculture/Farming
- Sales and customer service
- Security services

**My Advice:**
Your WASSCE results don't define your future. Many successful Sierra Leoneans started without perfect grades. Focus on:
1. What you're good at
2. What you enjoy
3. What's in demand

**What subjects did you do well in? I can suggest specific paths.**`
  }

  // Salary and income questions
  if (message.includes("salary") || message.includes("pay") || message.includes("earn") || message.includes("income") || message.includes("money") || message.includes("how much")) {
    return `**Salary Guide for Jobs in Sierra Leone:**

**Entry Level Salaries (per month):**
- Government Teacher: Le 800 - 1,500
- Government Nurse: Le 1,200 - 2,000
- Bank Teller: Le 1,500 - 2,500
- NGO Field Officer: Le 2,000 - 4,000
- Junior Accountant: Le 1,500 - 3,000
- IT Support: Le 1,500 - 3,000

**Mid-Level Salaries (3-5 years experience):**
- Senior Teacher: Le 2,000 - 3,500
- Senior Nurse: Le 2,500 - 4,000
- Bank Officer: Le 3,000 - 5,000
- NGO Program Officer: Le 4,000 - 8,000
- Accountant: Le 3,500 - 6,000
- Software Developer: Le 4,000 - 8,000

**Senior Level Salaries (7+ years):**
- Principal/Head Teacher: Le 3,500 - 6,000
- Hospital Matron: Le 4,000 - 7,000
- Bank Manager: Le 8,000 - 15,000
- NGO Manager: Le 8,000 - 20,000
- Senior Accountant/CFO: Le 8,000 - 25,000
- IT Manager: Le 8,000 - 15,000

**Highest Paying Sectors:**
1. Mining companies
2. International NGOs
3. Banks (especially foreign banks)
4. Telecommunications
5. International organizations (UN)

**Tips to Increase Your Salary:**
- Get professional certifications
- Learn in-demand skills
- Build experience and track record
- Network and seek promotions
- Consider remote work for international companies

**What career are you interested in? I can give you more specific salary info.**`
  }

  // Networking
  if (message.includes("network") || message.includes("connect") || message.includes("contact") || message.includes("meet")) {
    return `**How to Network for Career Success in Sierra Leone:**

**Where to Network:**

1. **Professional Events**
   - Career fairs at universities
   - Chamber of Commerce events
   - Industry conferences and workshops
   - Graduation ceremonies

2. **Online Networking**
   - LinkedIn - create a professional profile
   - Professional WhatsApp groups
   - Facebook professional groups
   - Twitter/X for industry conversations

3. **Community Involvement**
   - Church/Mosque community activities
   - Alumni associations
   - Youth organizations
   - Volunteer with NGOs

4. **Professional Associations**
   - Sierra Leone Bar Association (lawyers)
   - SLICAS (accountants)
   - Nurses and Midwives Board
   - Teachers associations

**How to Network Effectively:**
1. Be genuine - people can tell if you're fake
2. Offer help before asking for help
3. Follow up after meeting someone
4. Keep your contacts organized
5. Stay in touch regularly (not just when you need something)

**Conversation Starters:**
- "What do you do for work?"
- "How did you get into this field?"
- "What advice would you give someone starting out?"

**Networking in Sierra Leone Culture:**
- Respect for elders is important
- Personal relationships matter more than cold approaches
- Introductions through mutual connections are powerful
- Follow up with gratitude

**What industry are you trying to network in?**`
  }

  // Motivation and career change
  if (message.includes("change career") || message.includes("switch") || message.includes("new career") || message.includes("start over") || message.includes("confused") || message.includes("don't know")) {
    return `**It's Okay to Not Know - Let's Figure It Out Together**

Many successful people didn't know their path at first. Here's how to find clarity:

**Step 1: Reflect on Yourself**
- What activities make you lose track of time?
- What do people often ask you for help with?
- What did you enjoy as a child?
- What problems do you want to solve?

**Step 2: Explore Your Options**
- Talk to people in different careers
- Try volunteering in different areas
- Take free online courses to test interests
- Shadow someone for a day if possible

**Step 3: Consider Practical Factors**
- What jobs are available in Sierra Leone?
- What can you afford to study?
- How long are you willing to train?
- Where do you want to live?

**Step 4: Start Small**
- You don't need to decide your whole life today
- Try something for 6 months
- It's okay to change direction
- Every experience teaches you something

**Questions to Ask Yourself:**
1. Do I prefer working with people, data, or things?
2. Do I want stability or excitement?
3. Do I want to help others or create things?
4. Do I want to work for myself or for others?

**Remember:**
- There is no "perfect" career
- You can always change later
- Start with what's available now
- Build skills that transfer to many careers

**Tell me a bit about yourself - what do you enjoy doing? What are you good at?**`
  }

  // Specific profession - Engineering
  if (message.includes("engineer") || message.includes("engineering")) {
    return `**Engineering Careers in Sierra Leone:**

**Types of Engineering:**

1. **Civil Engineering**
   - Road construction, buildings, bridges
   - High demand with infrastructure development
   - Work: Construction companies, government (SLRA)

2. **Electrical Engineering**
   - Power systems, electronics
   - Growing demand with electrification projects
   - Work: EDSA, power companies, telecommunications

3. **Mechanical Engineering**
   - Machines, vehicles, manufacturing
   - Work: Mining companies, manufacturing, transport

4. **Mining Engineering**
   - Mineral extraction and processing
   - Good salaries in mining districts
   - Work: Diamond and iron ore mines

**Where to Study:**
- Fourah Bay College - Engineering Faculty
- Njala University - Engineering programs
- Study abroad (Ghana, Nigeria, UK) for more options

**Career Roadmap:**
1. Year 1-4/5: Engineering degree
2. Year 5-6: Graduate trainee/internship
3. Year 6-8: Junior Engineer
4. Year 8+: Senior Engineer, Project Manager

**Salary Range:**
- Junior Engineer: Le 3,000 - 5,000/month
- Senior Engineer: Le 6,000 - 15,000/month
- Project Manager: Le 10,000 - 25,000/month

**Mining engineers often earn the highest salaries in Sierra Leone.**

**What type of engineering interests you most?**`
  }

  // Government jobs
  if (message.includes("government") || message.includes("civil service") || message.includes("public sector") || message.includes("ministry")) {
    return `**Government Jobs in Sierra Leone:**

**How to Get Government Jobs:**

1. **Public Service Commission**
   - Main recruitment body for civil service
   - Watch for announcements in newspapers and radio
   - Apply through official channels

2. **Direct Ministry Applications**
   - Each ministry has HR department
   - Submit CV and cover letter
   - Follow up respectfully

3. **Teaching Service Commission (TSC)**
   - For all government teaching positions
   - Must be registered with TSC
   - Regular recruitment exercises

**Popular Government Positions:**
- Teachers (Ministry of Education)
- Nurses (Ministry of Health)
- Administrative Officers (various ministries)
- Agricultural Extension Workers
- Police and Military
- Immigration Officers
- Customs Officers

**Requirements:**
- Sierra Leonean citizenship
- Relevant educational qualifications
- Clean criminal record
- Some positions require professional registration

**Pros of Government Jobs:**
- Job security (hard to be fired)
- Pension benefits
- Regular working hours
- Respect in community
- Training opportunities

**Cons of Government Jobs:**
- Lower salaries than private sector
- Slow promotion process
- Can be bureaucratic
- Salaries sometimes delayed

**Tips:**
- Network with people already in government
- Stay updated on recruitment announcements
- Prepare all documents in advance
- Be patient - the process takes time

**What government department interests you?**`
  }

  // Default response - more helpful
  return `I want to help you succeed in your career journey!

Based on your question about "${userMessage}", let me guide you better.

**I can provide detailed guidance on:**

**Careers:**
- Technology (software, IT)
- Healthcare (nursing, medicine)
- Education (teaching)
- Business (entrepreneurship)
- Finance (accounting, banking)
- Agriculture (farming, agribusiness)
- Law (legal profession)
- Engineering (civil, electrical, mining)
- Government jobs

**Career Support:**
- How to build a strong CV
- Finding scholarships
- Job search strategies
- Interview preparation
- Internship opportunities
- Skills development
- Networking tips
- Salary expectations

**Education:**
- Universities in Sierra Leone
- WASSCE and next steps
- Professional certifications

**Try asking specifically:**
- "How do I become a [profession]?"
- "What jobs are available in [field]?"
- "How do I prepare for interviews?"
- "What skills should I learn?"
- "How much do [profession] earn?"

**What specific question can I answer for you?**`
}

export default function GuidancePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickActions = [
    { label: "Help me find a career", icon: Target },
    { label: "I want to be a teacher", icon: GraduationCap },
    { label: "Tech career options", icon: Briefcase },
    { label: "Start a business", icon: Lightbulb }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userInput = input.trim()

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userInput
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate brief typing delay for natural feel
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getSmartResponse(userInput)
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 500)
  }

  const handleQuickAction = (action: string) => {
    if (isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: action
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getSmartResponse(action)
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 container mx-auto px-2 sm:px-4 py-2 md:py-3 flex flex-col pt-16 md:pt-20 h-[calc(100dvh-64px)] overflow-hidden">
        <div className="flex flex-col max-w-5xl mx-auto gap-2 md:gap-3 flex-1 overflow-hidden h-full w-full">

          {/* Hero Header - Compact */}
          <section className="rounded-xl bg-card border p-3 shadow-sm shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/dashboard" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <div className="w-10 h-10 rounded-xl bg-primary/10 border flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-foreground">AI <span className="text-primary">Mentor</span></h1>
                  <p className="text-xs text-muted-foreground">Career coaching for Sierra Leone</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-secondary/10 rounded-full">
                <span className={cn("w-2 h-2 rounded-full", isTyping ? "bg-amber-500 animate-pulse" : "bg-secondary")} />
                <span className="text-xs font-medium text-secondary">{isTyping ? "Typing..." : "Online"}</span>
              </div>
            </div>
          </section>

          {/* Chat Container - Full Height */}
          <div className="bg-card border rounded-xl shadow-lg flex flex-col flex-1 overflow-hidden">

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-muted/30">

              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-foreground text-lg">Kusheh!</h3>
                    <p className="text-sm text-muted-foreground max-w-md">I am CareerPilot Salone, your AI career mentor. Ask me anything about jobs, education, CVs, or career paths in Sierra Leone!</p>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex w-full",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "flex max-w-[95%] sm:max-w-[90%] md:max-w-[80%] items-start gap-2 md:gap-3",
                    message.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}>
                    <div className={cn(
                      "w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-md mt-1",
                      message.role === 'user' ? "bg-primary" : "bg-foreground"
                    )}>
                      {message.role === 'user' ? <User className="w-4 h-4 md:w-5 md:h-5" /> : <Bot className="w-4 h-4 md:w-5 md:h-5" />}
                    </div>
                    <div
                      className={cn(
                        "px-4 md:px-5 py-3 md:py-4 text-sm leading-relaxed shadow-sm",
                        message.role === 'user'
                          ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
                          : "bg-card text-foreground rounded-2xl rounded-tl-sm border"
                      )}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex w-full justify-start">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-foreground flex items-center justify-center shrink-0 text-white shadow-md mt-1">
                      <Bot className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="bg-card rounded-2xl rounded-tl-sm px-5 py-4 border shadow-sm">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-5 bg-card border-t">
              {/* Quick Actions */}
              {messages.length === 0 && (
                <div className="flex gap-2 md:gap-3 mb-4 overflow-x-auto pb-2 px-1 no-scrollbar">
                  {quickActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickAction(action.label)}
                      disabled={isTyping}
                      className="whitespace-nowrap px-4 py-2 rounded-full bg-slate-100 hover:bg-emerald-50 text-[10px] md:text-xs font-bold text-[#0B1F3A] transition-all border border-slate-200 hover:border-emerald-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
                    >
                      <action.icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-600" />
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3 max-w-4xl mx-auto">
                <input
                  className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 outline-none text-sm md:text-base transition-all placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me about careers in Salone..."
                  autoComplete="off"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-xl w-12 h-12 md:w-14 md:h-14 shrink-0 bg-[#0B1F3A] hover:bg-emerald-600 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!input?.trim() || isTyping}
                >
                  <Send className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </Button>
              </form>
              <p className="text-center mt-3 text-xs text-muted-foreground">
                CareerPilot Salone - Your path to success
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
