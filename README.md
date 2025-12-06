# CareerPilot Salone - AI Career Guidance Platform

A comprehensive career guidance web application designed specifically for youth and professionals in Sierra Leone. The platform helps users discover career paths, build professional CVs, access job opportunities, and follow structured learning roadmaps.

## 🚀 Features

### Core Features

- **AI Career Guidance Chatbot** - Interactive chat interface that asks guided questions and provides personalized career recommendations with actionable steps
- **Career Recommendations** - Browse and explore 50+ career paths with detailed information about roles, skills, salaries, and requirements
- **Job & Opportunity Matching** - Find jobs, internships, and training programs in Sierra Leone with application steps and requirements
- **CV Builder** - Create professional CVs with our form-based builder and real-time preview
- **Career Roadmap** - Follow 30-90 day learning paths with daily/weekly tasks and progress tracking
- **User Onboarding** - Comprehensive 4-step onboarding flow to collect user information
- **WhatsApp Integration Demo** - Preview of how the platform works on WhatsApp

### Additional Pages

- User Dashboard with progress stats and quick actions
- User Profile management
- About, FAQ, Help Center, Terms of Service, and Privacy Policy pages

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context API
- **Fonts**: Geist & Geist Mono

## 📁 Project Structure

\`\`\`
careerpilot-salone/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Landing page
│   ├── login/                    # Login page
│   ├── signup/                   # Signup page
│   ├── onboarding/               # User onboarding flow
│   ├── dashboard/                # User dashboard
│   ├── guidance/                 # AI chatbot interface
│   ├── careers/                  # Career recommendations
│   │   └── [id]/                 # Individual career details
│   ├── jobs/                     # Job matching page
│   ├── cv-builder/               # CV builder tool
│   ├── roadmap/                  # Career roadmap planner
│   ├── profile/                  # User profile
│   ├── whatsapp/                 # WhatsApp demo
│   ├── about/                    # About page
│   ├── faq/                      # FAQ page
│   ├── help/                     # Help center
│   ├── terms/                    # Terms of Service
│   ├── privacy/                  # Privacy Policy
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── navigation.tsx            # Main navigation bar
│   ├── footer.tsx                # Footer component
│   ├── dashboard-nav.tsx         # Dashboard sidebar nav
│   ├── dashboard-layout.tsx      # Dashboard layout wrapper
│   └── career-card.tsx           # Career card component
├── lib/                          # Utilities and data
│   ├── utils.ts                  # Utility functions
│   ├── auth-context.tsx          # Authentication context
│   └── sample-data.ts            # Sample career data
├── public/                       # Static assets
│   └── *.jpg, *.png              # Career images
└── README.md                     # This file
\`\`\`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Clone or download the project**

\`\`\`bash
# If using git
git clone <repository-url>
cd careerpilot-salone

# Or extract the downloaded ZIP file
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. **Run the development server**

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Features Walkthrough

### 1. Landing Page
- Hero section with clear value proposition
- Feature showcase with 6 main features
- Statistics section
- Call-to-action buttons

### 2. User Onboarding (`/onboarding`)
- 4-step guided flow
- Collects: Name, Age, Email, Location, Education, Skills, Interests, Work Experience
- Progress indicator
- Form validation
- Data stored in localStorage (ready for backend integration)

### 3. AI Career Guidance (`/guidance`)
- Interactive chat interface
- Guided questions about skills, interests, and education
- Quick reply buttons for common answers
- AI-powered career recommendations with:
  - Career title and description
  - Entry-level role
  - Actionable steps (courses, networking, projects)
  - "View Roadmap" action buttons
- Typing indicators for realistic chat experience

### 4. Career Recommendations (`/careers`)
- Grid view of career cards
- Search functionality
- Category filtering (Technology, Healthcare, Business, etc.)
- Each career shows:
  - Image, title, description
  - Salary range (in Leones)
  - Required skills
  - Education requirements
- Detailed career pages with roadmap preview

### 5. Job Matching (`/jobs`)
- Tabs for Jobs, Internships, and Training programs
- Search by title, company, or skills
- Each opportunity shows:
  - Company, location, salary/duration
  - Required skills and qualifications
  - Step-by-step application instructions
- Sample data includes local Sierra Leone organizations

### 6. CV Builder (`/cv-builder`)
- Multi-section form:
  - Personal Information
  - Education
  - Skills
  - Work Experience
- Real-time preview pane
- Add/remove education and work entries
- Professional formatting
- Export placeholder (ready for PDF generation)

### 7. Career Roadmap (`/roadmap`)
- 8-week learning plan with weekly milestones
- Daily tasks with:
  - Checkboxes for completion tracking
  - Descriptions and resources
  - Duration estimates
- Progress bar showing completion percentage
- Timeline visualization

### 8. WhatsApp Demo (`/whatsapp`)
- Realistic WhatsApp chat interface
- Sample conversation flow
- Interactive button responses
- Shows how career guidance works on WhatsApp
- Feature explanations and benefits

## 🎨 Design System

### Colors
- **Primary**: Blue (`#2563eb`) - Trustworthy, professional
- **Secondary**: Green (`#10b981`) - Success, growth
- **Accent**: Amber (`#f59e0b`) - Energy, action
- **Neutrals**: Grays, whites, blacks for backgrounds and text

### Typography
- **Headings**: Geist (Sans-serif)
- **Body**: Geist (Sans-serif)
- **Code**: Geist Mono (Monospace)

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Collapsible navigation on mobile
- Optimized layouts for all screen sizes

## 🔌 Backend Integration Points

This is a **frontend-only prototype** with placeholder data. To connect to a backend, replace the following:

### 1. Authentication (`lib/auth-context.tsx`)
- Replace mock login/signup with actual API calls
- Implement JWT token storage
- Add session management

### 2. User Data
- Connect onboarding flow to user API
- Store profile data in database
- Implement user preferences

### 3. Career Data (`lib/sample-data.ts`)
- Replace sample careers with API endpoint
- Add search and filtering on backend
- Implement career recommendations algorithm

### 4. AI Chatbot (`app/guidance/page.tsx`)
- Connect to AI API (OpenAI, Anthropic, etc.)
- Implement conversation history storage
- Add career matching algorithm

### 5. Job Matching (`app/jobs/page.tsx`)
- Connect to job database/API
- Implement real-time job updates
- Add application tracking

### 6. CV Builder (`app/cv-builder/page.tsx`)
- Store CV data in database
- Implement PDF generation (using jsPDF or similar)
- Add template selection

### 7. Roadmap (`app/roadmap/page.tsx`)
- Store progress in database
- Implement personalized roadmap generation
- Add reminder/notification system

### 8. WhatsApp Bot
- Implement using WhatsApp Business API
- Set up webhook for message handling
- Connect to same backend as web app

## 📝 Sample Data

The project includes realistic sample data for:
- **6 Careers**: Software Developer, Digital Marketer, Nurse, Accountant, Teacher, Civil Engineer
- **5 Job Opportunities**: Mix of jobs, internships, and training programs
- **8-Week Roadmap**: Example learning path with daily tasks
- **User Profile**: Stored in localStorage after onboarding

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect Next.js and deploy
4. Your app will be live at `https://your-project.vercel.app`

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 🔧 Customization

### Adding New Careers
Edit `lib/sample-data.ts` and add to the `careers` array:

\`\`\`typescript
{
  id: "new-career",
  title: "Career Title",
  description: "Career description",
  category: "technology",
  salary: "Le 2,000,000 - 4,000,000/month",
  education: "Bachelor's Degree",
  skills: ["Skill 1", "Skill 2"],
  // ... more fields
}
\`\`\`

### Changing Theme Colors
Edit `app/globals.css` and modify the CSS variables:

\`\`\`css
:root {
  --primary: oklch(0.512 0.174 264.052); /* Your primary color */
  --secondary: oklch(0.702 0.174 164.196); /* Your secondary color */
  /* ... more colors */
}
\`\`\`

### Adding New Pages
1. Create a new folder in `app/`
2. Add a `page.tsx` file
3. Update navigation in `components/navigation.tsx` or `components/dashboard-nav.tsx`

## 📞 Support

For questions or issues, please contact the development team or visit the Help Center at `/help`.

## 📄 License

This project is proprietary to CareerPilot Salone.

---

**Built with ❤️ for Sierra Leone's Youth**
#   C a r e e r P i l o t - S a l o n e  
 