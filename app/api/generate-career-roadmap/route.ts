import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

// Initialize Google AI
const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
});



// --- Flattened Types for TypeScript ---
interface RoadmapStep7 {
    day: number;
    task: string;
    icon: string;
    time_estimate: string;
    output: string;
}

interface RoadmapStep30 {
    week: number;
    skill_focus: string;
    practice_task: string;
    proof: string;
}

interface CoreSkill {
    skill: string;
    why_it_matters: string;
    where_used: string;
}

interface RoadmapResponse {
    career_name: string;
    career_image: string;
    description: string;
    entry_roles: string[];
    where_in_sl: string[];
    core_skills: CoreSkill[];
    supporting_skills: string[];
    first_7_days: RoadmapStep7[];
    first_30_days: RoadmapStep30[];
    mini_projects: string[];
    portfolio_ideas: string[];
    readiness_indicators: string[];
    ready_to_advance_when: string[];
    stuck_indicators: string[];
    fix_if_stuck: string[];
    jobs_this_prepares: string[];
    internships: string[];
    scholarships?: string[];
    employer_expectations: string;
    career_verdict: string;
    reality_check: string;
    your_next_step: string;
}

// --- Flattened Zod Schema ---
const roadmapSchema = z.object({
    // 1. Career Destination
    career_name: z.string(),
    career_image: z.string().describe("Path to a relevant career image from the grounding data"),
    description: z.string().describe("Plain language explanation, no jargon"),
    entry_roles: z.array(z.string()).describe("Specific job titles for beginners"),
    where_in_sl: z.array(z.string()).describe("Actual places/sectors in Sierra Leone where this exists"),

    // 2. Skill Breakdown
    core_skills: z.array(z.object({
        skill: z.string(),
        why_it_matters: z.string(),
        where_used: z.string().describe("Specific job context")
    })),
    supporting_skills: z.array(z.string()),

    // 3. Learning Plan
    first_7_days: z.array(z.object({
        day: z.number(),
        task: z.string().describe("One clear, specific action"),
        icon: z.string().describe("A relevant emoji icon for this task"),
        time_estimate: z.string(),
        output: z.string().describe("What they will have created/done")
    })),
    first_30_days: z.array(z.object({
        week: z.number(),
        skill_focus: z.string(),
        practice_task: z.string().describe("Hands-on activity"),
        proof: z.string().describe("Evidence of learning")
    })),
    mini_projects: z.array(z.string()),
    portfolio_ideas: z.array(z.string()),
    readiness_indicators: z.array(z.string()).describe("Signs you're ready for opportunities"),

    // 4. Progress Tracking
    ready_to_advance_when: z.array(z.string()).describe("Clear success criteria"),
    stuck_indicators: z.array(z.string()),
    fix_if_stuck: z.array(z.string()),

    // 5. Opportunity Alignment
    jobs_this_prepares: z.array(z.string()),
    internships: z.array(z.string()),
    scholarships: z.array(z.string()).optional(),
    employer_expectations: z.string(),

    // 6. Local Reality
    career_verdict: z.string().describe("A 2-sentence honest verdict on this career's future in Sierra Leone"),
    reality_check: z.string().describe("Honest challenges the user might face locally (e.g. equipment costs, electricity, internet)"),

    // Next Step Indicator
    your_next_step: z.string().describe("Clear, immediate action to take today")
});

export async function POST(req: Request) {
    const body = await req.json();
    const {
        career,
        educationLevel = "secondary",
        location = "Freetown",
        skillLevel = "beginner",
        userType = "student" // student | job_seeker | graduate
    } = body;

    if (!career || typeof career !== 'string' || career.trim().length === 0) {
        return new Response(JSON.stringify({
            error: 'Invalid input',
            message: 'Career field is required.'
        }), { status: 400 });
    }

    try {
        const systemPrompt = createRefinedSystemPrompt(educationLevel, location, skillLevel, userType);

        const { object } = await generateObject({
            model: google('gemini-2.0-flash-exp'),
            schema: roadmapSchema as any,
            system: systemPrompt,
            prompt: `Generate a personalized career roadmap for: ${career}

User Profile:
- Education Level: ${educationLevel}
- Location: ${location}
- Skill Level: ${skillLevel}
- User Type: ${userType}

Remember: 
1. Use relevant images from the career data provided.
2. Ensure every step has a clear, motivational emoji icon.
3. This person must finish knowing exactly what to do TODAY. No vague advice.`,
        });

        const roadmap = object as RoadmapResponse;

        return new Response(JSON.stringify(roadmap), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Roadmap generation error:', error);
        return new Response(JSON.stringify({
            error: 'generation_failed',
            message: 'Failed to generate roadmap. Please try again.'
        }), { status: 500 });
    }
}

function createRefinedSystemPrompt(educationLevel: string, location: string, skillLevel: string, userType: string): string {
    return `# CAREER ROADMAP SYSTEM — SIERRA LEONE CONTEXT

You are the Career Roadmap engine for CareerPilot Salone, a career guidance platform serving Sierra Leonean youth.

## YOUR MISSION
Create roadmaps that eliminate confusion and provide crystal-clear next steps. Every user must leave knowing:
"This is my career, this is my next step, this is what I should do today."

## CORE RULES (NON-NEGOTIABLE)

### 1. Precision Protocol (Answer Exactly What Is Asked)
- Answer ONLY what is requested for the career destination.
- Do not add preambles or post-scripts like "I hope this helps".
- If the user asks for a specific path, do not deviate into others unless requested.
- **Directness**: Avoid filler phrases. Start with the data immediately.

### 2. Personalization is Mandatory
You are currently helping a user with:
- Education: ${educationLevel}
- Location: ${location}
- Skill Level: ${skillLevel}
- Status: ${userType}

Adapt everything to their reality:
- If secondary school leaver → focus on foundations, vocational paths, clear alternatives
- If university student → focus on practical skills, internships, project building
- If graduate/job seeker → focus on job readiness, skill gaps, quick wins

### 2. Answer 4 Questions Always
Every step must answer:
1. What should I learn?
2. Why am I learning it?
3. How do I learn it?
4. What proves I'm ready to move on?

### 3. No Vague Language
NEVER use:
- "Learn more" (learn WHAT specifically?)
- "Explore" (explore HOW? explore WHERE?)
- "Improve skills" (improve WHICH skills? HOW?)
- "Research" without specific sources

ALWAYS use:
- Specific tasks ("Complete Excel tutorial on SUM, AVERAGE, VLOOKUP")
- Clear outputs ("Create a budget spreadsheet")
- Measurable proof ("Complete 3 practice exercises")

### 4. Action Over Theory
Every step must involve DOING something, not just reading.
Example:
❌ "Learn about data analysis"
✅ "Clean a sample sales dataset using Excel. Remove duplicates and calculate monthly totals."

## STRUCTURE REQUIREMENTS

### 1. Career Destination (Remove Doubt Immediately)
Provide:
- Career name
- Plain language description (no jargon)
- 3-5 entry-level role examples
- Specific sectors/places in Sierra Leone where this exists

Example:
"Data Analysts work in banks (Rokel, Ecobank), telecoms (Africell, Orange), NGOs, and government ministries."

### 2. Skill Breakdown (What They Must Master)
For each CORE skill:
- Name the skill
- Why it matters (real job context)
- Where it's used in actual work

For each TOOL:
- What it is
- Why this career uses it

### 3. Time-Based Learning Plan (THE HEART OF THE ROADMAP)

#### A. First 7 Days (Confidence Builder)
Create 7 daily tasks where:
- Each day = ONE clear task
- Time estimate: 1-2 hours max
- Clear output (something they create/complete)

Day 1 must be the EASIEST possible win to build confidence.

#### B. First 30 Days (Skill Foundation)
Create 4 weekly goals (Week 1-4) where each week has:
- One skill focus
- One practice task (hands-on)
- Clear proof method

#### C. First 90 Days (Career Readiness)
Include:
- 2-3 mini projects they can build
- Portfolio ideas suitable for Sierra Leone context
- Signs they're ready for internships/jobs

### 4. Proof & Progress Tracking
Define CLEARLY:
- When to move forward (specific criteria)
- Signs you're stuck
- What to do if stuck

### 5. Opportunity Alignment
Connect to REAL Sierra Leone opportunities:
- Jobs this prepares for
- Internship possibilities
- Scholarships (if applicable for this field)
- What employers actually expect

### 6. Local Reality (The Truth)
Be brutally honest but encouraging:
- **Career Verdict**: Is this field over-saturated? Is it the "next big thing" in Freetown?
- **Reality Check**: What will actually slow them down? (e.g., "You'll need a laptop with at least 8GB RAM," or "Expect to spend money on data bundles for online learning.")

## ADAPTATION RULES

### Resource Constraints
${skillLevel === 'beginner' ? '- Assume limited technical knowledge\n- Start with very basic concepts\n- Use free, accessible tools' : ''}

${location !== 'Freetown' ? '- Consider limited internet access\n- Recommend offline/low-data resources\n- Focus on practical, local applications' : ''}

### Learning Style Based on User Type
${userType === 'student' ? '- Balance with school commitments\n- Focus on foundational learning\n- Longer timeline acceptable' : ''}
${userType === 'job_seeker' ? '- Urgent, fast-track approach\n- Quick skill acquisition\n- Immediate job application focus' : ''}
${userType === 'graduate' ? '- Fill specific skill gaps\n- Professional-level expectations\n- Portfolio emphasis' : ''}

## AI BEHAVIOR RULES

1. **Never Overwhelm**
   - One step at a time
   - Clear, short instructions
   - Progressive complexity

2. **Always End With Next Step**
   - Last field MUST be: "Your next step is..."
   - Must be something they can do in the next 1-2 hours
   - Must be completely unambiguous

3. **Sierra Leone Context**
   - Use local examples (Fourah Bay College, IPAM, Milton Margai, etc.)
   - Reference local companies (Africell, Rokel Bank, etc.)
   - Consider local infrastructure realities
   - Use Krio terms where natural and helpful

## FAILURE CONDITIONS (AVOID AT ALL COSTS)
❌ Generic advice anyone could find on Google
❌ Same roadmap regardless of user's situation
❌ No clear outputs or proof points
❌ No connection to actual Sierra Leone opportunities
❌ Motivational text without action steps
❌ Long paragraphs of theory

## SUCCESS CONDITION (YOUR GOAL)
✅ User says: "I know my career. I know what skill I'm learning this week. I know why it matters. I know when I'm ready for opportunities."

## EXAMPLE OF EXCELLENT OUTPUT

For a beginner, secondary school graduate, wanting to become a Data Analyst:

First 7 Days - Day 1:
{
  "day": 1,
  "task": "Learn 3 Excel formulas: SUM, AVERAGE, COUNT",
  "time_estimate": "1 hour",
  "output": "Create a simple class grades table and calculate subject averages"
}

Week 1 (30-day plan):
{
  "week": 1,
  "skill_focus": "Excel basics for data organization",
  "practice_task": "Create a household budget spreadsheet tracking 1 week of expenses",
  "proof": "Save the file showing proper use of formulas and formatting"
}

Your next step: "Open Excel or Google Sheets. Create a new file. Title it 'Practice Budget'. Add columns for: Date, Item, Category, Amount. Enter 10 sample expenses."

Generate roadmaps following these rules strictly. Lives and futures depend on clarity.`;
}
