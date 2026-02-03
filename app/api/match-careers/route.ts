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

    RULES26:     1. Match the user to at least 3 distinct career paths (aim for 3-5).
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

    // Fallback logic if AI fails (Improved fallback with diverse paths)
    return NextResponse.json({
      career_test_result: {
        summary: "I've matched your profile to top growth sectors in Salone. These paths align with your current education and local market demand.",
        careers: [
          {
            rank: 1,
            career_name: "Software Developer",
            why_it_fits: "High demand in Freetown's growing tech ecosystem and aligns with digital literacy skills.",
            demand_level: "High",
            entry_salary: "SLE 3,500 - 6,000",
            required_skills: ["Logic", "Problem Solving", "Basic Coding"],
            recommended_universities: ["FBC (Computer Science)", "IPAM (Info Systems)"],
            recommended_training: ["ALX Africa", "Orange Digital Center"],
            job_roles: ["Junior Dev", "IT Support"],
            skill_roadmap: {
              "1_week": ["Intro to HTML/CSS", "Mental math practice"],
              "1_month": ["First landing page", "Join TechSalone"],
              "3_months": ["Internship hunt", "Basic JavaScript"]
            }
          },
          {
            rank: 2,
            career_name: "Data Analyst",
            why_it_fits: "Critical role for NGOs and banks in Sierra Leone for monitoring and evaluation.",
            demand_level: "High",
            entry_salary: "SLE 4,000 - 7,000",
            required_skills: ["Excel", "Statistics", "Attention to Detail"],
            recommended_universities: ["FBC (Statistics)", "IPAM (Accounting)"],
            recommended_training: ["Google Data Analytics Cert", "Local NGO Workshops"],
            job_roles: ["M&E Assistant", "Data Clerk"],
            skill_roadmap: {
              "1_week": ["Master Pivot Tables", "Watch intro to SQL"],
              "1_month": ["Create first dashboard", "Learn basic statistics"],
              "3_months": ["Apply for NGO internships", "Build portfolio report"]
            }
          },
          {
            rank: 3,
            career_name: "Agribusiness Entrepreneur",
            why_it_fits: "Massive potential in Sierra Leone's agricultural sector with a shift towards business models.",
            demand_level: "Medium",
            entry_salary: "Variable (High Potential)",
            required_skills: ["Sales", "Project Management", "Agri-knowledge"],
            recommended_universities: ["Njala University (Agriculture)", "UNIMAK"],
            recommended_training: ["Tony Elumelu Foundation", "Orange Corners"],
            job_roles: ["Farm Manager", "Agri-consultant"],
            skill_roadmap: {
              "1_week": ["Market research in local district", "Identify profitable crops"],
              "1_month": ["Draft simple business plan", "Visit successful farms"],
              "3_months": ["Apply for startup grants", "Launch first pilot"]
            }
          }
        ],
        next_steps: ["Visit the CV Builder", "Talk to Career AI for more detail", "Check the Resources tab for courses"]
      }
    })

  } catch (error: any) {
    console.error("Match careers error, ensuring fallback:", error);

    // Critical Fallback: Use Local AI to generate a valid response instead of failing
    try {
      // Import dynamically to avoid circular dependencies if any
      const { matchCareers } = await import("@/lib/local-ai");

      // Convert request components into a quiz-like structure for the local matcher
      const fallbackAnswers = [
        { question: "skills", answer: skills || "" },
        { question: "interests", answer: interests || "" },
        { question: "education", answer: education || "" },
        { question: "goal", answer: career_goal || "" }
      ];

      const localResult = await matchCareers(fallbackAnswers);

      // Reshape local result to match API contract
      const careerTestResult = {
        summary: localResult.summary,
        careers: localResult.recommendations.map((rec, index) => ({
          rank: index + 1,
          career_name: rec.title,
          why_it_fits: rec.whyFits,
          demand_level: rec.demand,
          entry_salary: rec.salaryRange || "Variable",
          required_skills: ["General Skills"], // Placeholder as local-ai might not return this granularly
          recommended_universities: [rec.institution || "Local University"],
          recommended_training: ["Online Courses", "Local Workshops"],
          job_roles: ["Entry Level Role"],
          skill_roadmap: {
            "1_week": rec.nextSteps.slice(0, 1),
            "1_month": rec.nextSteps.slice(1, 2),
            "3_months": rec.nextSteps.slice(2, 3)
          }
        })),
        next_steps: ["Explore these paths", "Update profile for better matches"]
      };

      return NextResponse.json({ career_test_result: careerTestResult });

    } catch (fallbackError) {
      console.error("Even fallback failed:", fallbackError);
      // Absolute last resort
      return NextResponse.json({
        career_test_result: {
          summary: "We encountered a system issue but here are general recommendations.",
          careers: [],
          next_steps: ["Please try again later"]
        }
      });
    }
  }
}
