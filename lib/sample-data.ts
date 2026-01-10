export interface Career {
  id: string
  title: string
  description: string
  skills: string[]
  salary: string // Display format in Le (e.g., "Le 5,000,000 - 15,000,000")
  salaryUsd?: string // Display format in USD (e.g., "$225 - $680")
  salaryMinLe?: number // Minimum salary in Leones for charts
  salaryMaxLe?: number // Maximum salary in Leones for charts
  salaryMinUsd?: number // Minimum salary in USD for charts
  salaryMaxUsd?: number // Maximum salary in USD for charts
  demand: "High" | "Medium" | "Low"
  category: string
  imageUrl: string
}

export interface RoadmapTask {
  id: string
  title: string
  description: string
  duration: string
  completed: boolean
  week: number
}

export const sampleCareers: Career[] = [
  {
    id: "1",
    title: "Software Developer",
    description:
      "Design, develop, and maintain software applications and systems. Work with various programming languages and frameworks to solve complex problems.",
    skills: ["JavaScript", "Python", "React", "Node.js", "SQL"],
    salary: "Le 3M - 8M/month",
    demand: "High",
    category: "Technology",
    imageUrl: "/software-developer-coding.jpg",
  },
  {
    id: "2",
    title: "Digital Marketer",
    description:
      "Plan and execute digital marketing campaigns across social media, email, and web platforms to promote products and services.",
    skills: ["SEO", "Social Media", "Content Marketing", "Analytics", "Facebook Ads"],
    salary: "Le 2M - 5M/month",
    demand: "High",
    category: "Marketing",
    imageUrl: "/digital-marketing-social-media.png",
  },
  {
    id: "3",
    title: "Nurse",
    description:
      "Provide healthcare services, monitor patient conditions, administer medications, and support doctors in medical procedures.",
    skills: ["Patient Care", "Medical Knowledge", "Communication", "Emergency Response", "Record Keeping"],
    salary: "Le 1.5M - 4M/month",
    demand: "High",
    category: "Healthcare",
    imageUrl: "/nurse-healthcare-professional.jpg",
  },
  {
    id: "4",
    title: "Accountant",
    description:
      "Manage financial records, prepare reports, ensure compliance with regulations, and provide financial advice to organizations.",
    skills: ["Bookkeeping", "Financial Analysis", "Excel", "Tax Preparation", "Auditing"],
    salary: "Le 2M - 6M/month",
    demand: "Medium",
    category: "Finance",
    imageUrl: "/accountant-finance-professional.jpg",
  },
  {
    id: "5",
    title: "Secondary School Teacher",
    description:
      "Educate students in various subjects, develop curriculum, assess student progress, and create engaging learning environments.",
    skills: ["Curriculum Design", "Classroom Management", "Communication", "Subject Expertise", "Assessment"],
    salary: "Le 1M - 3M/month",
    demand: "Medium",
    category: "Education",
    imageUrl: "/teacher-classroom-education.jpg",
  },
  {
    id: "6",
    title: "Graphic Designer",
    description:
      "Create visual content for brands, including logos, marketing materials, social media graphics, and website designs.",
    skills: ["Adobe Photoshop", "Illustrator", "Figma", "Typography", "Branding"],
    salary: "Le 1.5M - 4M/month",
    demand: "Medium",
    category: "Creative",
    imageUrl: "/graphic-designer-creative-work.jpg",
  },
  {
    id: "7",
    title: "Primary School Teacher",
    description:
      "Teach foundational subjects to young children, create engaging lessons, foster social development, and build strong literacy and numeracy skills.",
    skills: ["Early Childhood Education", "Patience", "Creativity", "Basic Literacy & Numeracy", "Child Psychology"],
    salary: "Le 800K - 2.5M/month",
    demand: "High",
    category: "Education",
    imageUrl: "/primary-teacher-classroom.jpg",
  },
  {
    id: "8",
    title: "University Lecturer",
    description:
      "Conduct research, teach undergraduate and graduate courses, publish academic papers, and mentor students in specialized fields.",
    skills: ["Research", "Public Speaking", "Subject Mastery", "Academic Writing", "Mentorship"],
    salary: "Le 3M - 7M/month",
    demand: "Medium",
    category: "Education",
    imageUrl: "/university-lecturer-teaching.jpg",
  },
  {
    id: "9",
    title: "School Principal/Administrator",
    description:
      "Lead educational institutions, manage staff, develop policies, oversee budgets, and ensure quality education delivery.",
    skills: ["Leadership", "Strategic Planning", "Budget Management", "Policy Development", "Communication"],
    salary: "Le 2.5M - 6M/month",
    demand: "Medium",
    category: "Education",
    imageUrl: "/school-principal-office.jpg",
  },
  {
    id: "10",
    title: "Special Education Teacher",
    description:
      "Support students with learning disabilities, develop individualized education plans, and create inclusive learning environments.",
    skills: ["Special Education Methods", "Patience", "Adaptability", "IEP Development", "Behavioral Management"],
    salary: "Le 1.5M - 4M/month",
    demand: "High",
    category: "Education",
    imageUrl: "/special-education-teacher.jpg",
  },
  {
    id: "11",
    title: "Educational Technology Specialist",
    description:
      "Integrate technology into classrooms, train teachers on digital tools, manage learning management systems, and support online education.",
    skills: ["Educational Software", "Training", "LMS Management", "Technical Support", "Digital Literacy"],
    salary: "Le 2M - 5M/month",
    demand: "High",
    category: "Education",
    imageUrl: "/educational-technology-specialist.jpg",
  },
  {
    id: "12",
    title: "School Counselor",
    description:
      "Provide guidance on academic, career, and personal issues, support student mental health, and help students navigate challenges.",
    skills: ["Counseling", "Active Listening", "Empathy", "Career Guidance", "Conflict Resolution"],
    salary: "Le 1.5M - 4M/month",
    demand: "Medium",
    category: "Education",
    imageUrl: "/school-counselor-student.jpg",
  },
  {
    id: "13",
    title: "Curriculum Developer",
    description:
      "Design educational programs, create learning materials, align content with standards, and evaluate curriculum effectiveness.",
    skills: ["Instructional Design", "Content Creation", "Assessment Design", "Standards Alignment", "Research"],
    salary: "Le 2M - 5M/month",
    demand: "Medium",
    category: "Education",
    imageUrl: "/curriculum-developer-working.jpg",
  },
  {
    id: "14",
    title: "Adult Education Instructor",
    description:
      "Teach adult learners vocational skills, literacy, language, or professional development courses in community settings.",
    skills: ["Adult Learning Theory", "Flexibility", "Practical Skills Training", "Motivation", "Assessment"],
    salary: "Le 1M - 3M/month",
    demand: "Medium",
    category: "Education",
    imageUrl: "/adult-education-instructor.jpg",
  },
]

export const sampleRoadmap: RoadmapTask[] = [
  {
    id: "1",
    title: "Set Clear Career Goals",
    description:
      "Identify your interests, strengths, and career aspirations. Research potential career paths and set SMART goals.",
    duration: "1 week",
    completed: false,
    week: 1,
  },
  {
    id: "2",
    title: "Build Foundational Academic Skills",
    description:
      "Strengthen core subjects like Mathematics, English, Science, and critical thinking skills essential for any career.",
    duration: "4 weeks",
    completed: false,
    week: 2,
  },
  {
    id: "3",
    title: "Develop Communication Skills",
    description:
      "Practice writing, public speaking, active listening, and professional communication in various contexts.",
    duration: "3 weeks",
    completed: false,
    week: 6,
  },
  {
    id: "4",
    title: "Learn Digital Literacy",
    description: "Master essential computer skills, Microsoft Office, email etiquette, and online research techniques.",
    duration: "2 weeks",
    completed: false,
    week: 9,
  },
  {
    id: "5",
    title: "Gain Industry-Specific Knowledge",
    description:
      "Study subjects and skills directly related to your chosen career field through courses, books, or online resources.",
    duration: "6 weeks",
    completed: false,
    week: 11,
  },
  {
    id: "6",
    title: "Develop Professional Soft Skills",
    description: "Build teamwork, leadership, time management, problem-solving, and emotional intelligence skills.",
    duration: "4 weeks",
    completed: false,
    week: 17,
  },
  {
    id: "7",
    title: "Get Practical Experience",
    description:
      "Seek internships, volunteer work, or part-time jobs in your field to apply knowledge and build experience.",
    duration: "8 weeks",
    completed: false,
    week: 21,
  },
  {
    id: "8",
    title: "Network and Build Connections",
    description:
      "Attend industry events, join professional groups, connect with mentors, and build a professional network.",
    duration: "3 weeks",
    completed: false,
    week: 29,
  },
  {
    id: "9",
    title: "Create Professional Documents",
    description: "Build a strong CV, cover letter, and portfolio showcasing your skills, experience, and achievements.",
    duration: "2 weeks",
    completed: false,
    week: 32,
  },
  {
    id: "10",
    title: "Continue Learning and Growing",
    description:
      "Stay updated with industry trends, pursue certifications, attend workshops, and commit to lifelong learning.",
    duration: "Ongoing",
    completed: false,
    week: 34,
  },
]
