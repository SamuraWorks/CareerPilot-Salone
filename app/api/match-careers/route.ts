import { NextResponse } from "next/server"

// Local fallback data for when AI is unavailable
const LOCAL_CAREER_MATCHES = {
  career_test_result: {
    summary: "Based on your profile, you show strong potential in practical, high-demand fields in Sierra Leone. Here are careers that match your interests and the local job market.",
    careers: [
      {
        rank: 1,
        career_name: "Software Developer",
        why_it_fits: "Your analytical skills and interest in technology make you a great fit for the growing tech sector in Freetown.",
        demand_level: "High",
        entry_salary: "SLE 3,000 - 5,000/month",
        required_skills: ["Basic Programming", "Problem Solving", "Computer Literacy"],
        recommended_universities: ["FBC (Computer Science)", "IPAM (Information Systems)", "Njala University"],
        recommended_training: ["freeCodeCamp", "ALX Africa", "Coursera"],
        job_roles: ["Junior Developer", "IT Support", "Web Developer Intern"],
        skill_roadmap: {
          "1_week": ["Complete HTML/CSS basics", "Set up development environment"],
          "1_month": ["Learn JavaScript fundamentals", "Build first website"],
          "3_months": ["Create portfolio projects", "Apply for internships in Freetown"]
        }
      },
      {
        rank: 2,
        career_name: "Accountant / Finance Officer",
        why_it_fits: "Your attention to detail and numerical skills align well with the banking and finance sector, which is stable in Sierra Leone.",
        demand_level: "High",
        entry_salary: "SLE 2,500 - 4,000/month",
        required_skills: ["Microsoft Excel", "Basic Accounting", "Attention to Detail"],
        recommended_universities: ["IPAM (Accounting)", "FBC (Economics)", "UNIMAK"],
        recommended_training: ["ACCA Foundation", "QuickBooks Training"],
        job_roles: ["Accounts Assistant", "Finance Clerk", "Bank Teller"],
        skill_roadmap: {
          "1_week": ["Master Excel formulas", "Review bookkeeping basics"],
          "1_month": ["Complete ACCA Introduction", "Practice with sample accounts"],
          "3_months": ["Apply to banks and NGOs", "Get professional certification"]
        }
      },
      {
        rank: 3,
        career_name: "Teacher / Educator",
        why_it_fits: "Your communication skills and patience make you well-suited for education, a sector with constant demand across Sierra Leone.",
        demand_level: "High",
        entry_salary: "SLE 1,500 - 3,000/month",
        required_skills: ["Communication", "Patience", "Subject Knowledge"],
        recommended_universities: ["Milton Margai (Education)", "Njala University", "Ernest Bai Koroma University"],
        recommended_training: ["Teacher Training College", "UNICEF Courses"],
        job_roles: ["Primary Teacher", "JSS Teacher", "Private Tutor"],
        skill_roadmap: {
          "1_week": ["Review teaching methodologies", "Observe experienced teachers"],
          "1_month": ["Complete lesson planning course", "Practice teaching sessions"],
          "3_months": ["Apply to schools", "Register with Teaching Service Commission"]
        }
      }
    ],
    next_steps: [
      "Pick your top career choice and research it further",
      "Enroll in a free online course this week",
      "Update your CV using our CV Builder",
      "Connect with a mentor in your chosen field"
    ]
  }
}

export async function POST(req: Request) {
  try {
    const { skills, interests, education, location, career_goal } = await req.json()

    // Check if AI API key is available
    const hasAIKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY

    if (hasAIKey) {
      try {
        // Dynamic import to avoid build errors if package is missing
        const { generateText } = await import("ai")
        const { google } = await import("@ai-sdk/google")

        const systemPrompt = `You are CareerPilot Salone AI for Sierra Leone youth.
Skills: ${skills || "General"}
Interests: ${interests || "Various"}
Education: ${education || "Secondary"}
Location: ${location || "Sierra Leone"}
Goal: ${career_goal || "Career growth"}

Return ONLY valid JSON with this exact structure:
{
  "career_test_result": {
    "summary": "encouraging summary",
    "careers": [
      {
        "rank": 1,
        "career_name": "name",
        "why_it_fits": "reason",
        "demand_level": "High/Medium/Low",
        "entry_salary": "amount",
        "required_skills": ["skill1", "skill2"],
        "recommended_universities": ["uni1", "uni2"],
        "recommended_training": ["training1"],
        "job_roles": ["role1", "role2"],
        "skill_roadmap": {
          "1_week": ["action1"],
          "1_month": ["action1"],
          "3_months": ["action1"]
        }
      }
    ],
    "next_steps": ["step1", "step2"]
  }
}
Recommend 3 careers relevant to Sierra Leone. No markdown, only JSON.`

        const { text } = await generateText({
          model: google("gemini-1.5-flash"),
          system: "Output only valid JSON. No markdown.",
          prompt: systemPrompt,
        })

        const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim()
        const data = JSON.parse(cleanJson)
        return NextResponse.json(data)

      } catch (aiError) {
        console.error("AI call failed, using fallback:", aiError)
        return NextResponse.json(LOCAL_CAREER_MATCHES)
      }
    }

    // No API key - use local fallback
    console.log("No AI key configured, using local career matches")
    return NextResponse.json(LOCAL_CAREER_MATCHES)

  } catch (error: any) {
    console.error("Match careers error:", error)
    // Always return valid data so the UI works
    return NextResponse.json(LOCAL_CAREER_MATCHES)
  }
}
