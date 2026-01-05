import { NextResponse } from "next/server"
import { SIERRA_LEONE_CAREERS, INSTITUTIONS } from "@/lib/career-data"

export async function POST(req: Request) {
  try {
    const { skills, interests, education, location, career_goal } = await req.json()

    // Check if AI API key is available
    const hasAIKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY

    const systemPrompt = `You are the "CareerPilot Salone Decision Engine".
    Your task is to solve the 'Blind Choice' problem for Sierra Leonean youth.
    
    USER DATA:
    - Skills/Subjects: ${skills}
    - Interests: ${interests}
    - Education: ${education}
    - Location: ${location}
    - Goal: ${career_goal}

    KNOWLEDGE BASE (Sierra Leone):
    - Careers: ${JSON.stringify(SIERRA_LEONE_CAREERS)}
    - Institutions: ${JSON.stringify(INSTITUTIONS)}

    RULES:
    1. Match the user to EXACTLY 3 distinct career paths.
    2. Rank them by: Skill Fit, Education Feasibility (for someone with ${education}), and Local Demand.
    3. For EACH career, provide a clear LOGICAL chain: Career -> Specific Degree/Course -> Recommended Local Institution.
    4. Provide a 90-day task-based roadmap (Weeks 1, Month 1, Month 3).
    5. Be encouraging but honest about local market reality.
    
    RETURN ONLY JSON (no markdown):
    {
      "career_test_result": {
        "summary": "Deep analysis of why these paths fit the user.",
        "careers": [
          {
            "rank": 1,
            "career_name": "string",
            "why_it_fits": "detailed reason linking skills to demand",
            "demand_level": "High/Medium/Low",
            "entry_salary": "SLE amount/month",
            "required_skills": ["skill1", "skill2"],
            "recommended_universities": ["Institutional Choice 1 (e.g. IPAM for Accounting)"],
            "recommended_training": ["Practical workshops or online certs"],
            "job_roles": ["entry role 1", "entry role 2"],
            "skill_roadmap": {
              "1_week": ["action1", "action2"],
              "1_month": ["action1", "action2"],
              "3_months": ["action1", "action2"]
            }
          }
        ],
        "next_steps": ["step1", "step2"]
      }
    }`

    if (process.env.OPENAI_API_KEY) {
      const { generateText } = await import("ai")
      const { openai } = await import("@ai-sdk/openai")

      const { text } = await generateText({
        model: openai("gpt-4o-mini"),
        system: "Output only valid JSON. Be a professional career mentor for Sierra Leone.",
        prompt: systemPrompt,
      })

      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim()
      return NextResponse.json(JSON.parse(cleanJson))
    }

    // Fallback logic if AI fails (Improved fallback)
    return NextResponse.json({
      career_test_result: {
        summary: "I've matched your profile to top growth sectors in Salone. These paths align with your current education and local market demand.",
        careers: [
          {
            rank: 1,
            career_name: "Software Developer (Custom Match)",
            why_it_fits: "High demand in Freetown's growing tech ecosystem.",
            demand_level: "High",
            entry_salary: "SLE 3,500 - 6,000",
            required_skills: ["Computer Literacy", "Logic", "Problem Solving"],
            recommended_universities: ["FBC (Computer Science)", "IPAM (Info Systems)"],
            recommended_training: ["ALX Africa", "Orange Digital Center"],
            job_roles: ["Junior Dev", "IT Support"],
            skill_roadmap: {
              "1_week": ["Intro to HTML/CSS", "Mental math practice"],
              "1_month": ["First landing page", "Join TechSalone"],
              "3_months": ["Internship hunt", "Basic JavaScript"]
            }
          },
          // Add more fallback objects if needed...
        ],
        next_steps: ["Visit the CV Builder", "Talk to Career AI for more detail"]
      }
    })

  } catch (error: any) {
    console.error("Match careers error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
