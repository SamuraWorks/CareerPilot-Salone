import { SIERRA_LEONE_CAREERS, CareerPath } from "./career-data"
import { UserProfile } from "./types"

export interface ScoredCareer extends CareerPath {
  match_score: number
  why_it_fits: string
  missing_skills: string[]
}

/**
 * Calculates career recommendations based on user profile.
 * "No Guessing" - purely based on Skill/Interest overlap.
 */
export function getRecommendations(profile: UserProfile): ScoredCareer[] {
  if (!profile || (!profile.skills?.length && !profile.interests?.length)) {
    return []
  }

  const userSkills = new Set((profile.skills || []).map(s => s.toLowerCase()))
  const userInterests = new Set((profile.interests || []).map(i => i.toLowerCase()))

  const scored = SIERRA_LEONE_CAREERS.map(career => {
    let score = 0
    let reasons: string[] = []
    let missing: string[] = []

    // 1. Title Match (High Weight)
    if (profile.career_goal && career.title.toLowerCase().includes(profile.career_goal.toLowerCase())) {
        score += 50
        reasons.push(`Direct match for your goal: "${profile.career_goal}"`)
    }

    // 2. Skill Overlap (Medium Weight)
    // We assume career data might NOT have explicit 'skills' array in this file version, 
    // so we infer from description or industry if needed, OR we add skills to career-data if missing.
    // For now, let's assume we check the 'industry' or 'title' against user skills/interests
    // In a real robust engine, we'd have a 'keywords' or 'required_skills' field on CareerPath.
    
    // Let's implement a Keyword Matcher on the text content of the career
    const careerText = `${career.title} ${career.description} ${career.industry}`.toLowerCase()
    
    // Check User Skills against Career Text
    userSkills.forEach(skill => {
        if (careerText.includes(skill)) {
            score += 15
            // Limit reasons length
            if (reasons.length < 3) reasons.push(`Matches skill: ${skill}`)
        }
    })

    // Check User Interests against Career Text
    userInterests.forEach(interest => {
        if (careerText.includes(interest)) {
            score += 10
            if (reasons.length < 3) reasons.push(`Aligns with interest: ${interest}`)
        }
    })

    return {
        ...career,
        match_score: Math.min(score, 100), // Cap at 100
        why_it_fits: reasons.length > 0 ? reasons.join(". ") : "General recommendation based on your profile.",
        missing_skills: missing // To be implemented with deeper data
    }
  })

  // Filter out low scores and sort
  return scored
    .filter(c => c.match_score > 0)
    .sort((a, b) => b.match_score - a.match_score)
    .slice(0, 3) // Top 3
}
