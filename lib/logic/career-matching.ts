import { UserProfile } from "@/lib/types";
import { SIERRA_LEONE_CAREERS, CareerInfo } from "@/lib/career-data";

export interface MatchResult {
  career: CareerInfo;
  score: number;
  reasons: string[];
}

export function calculateCareerMatches(profile: UserProfile): CareerInfo[] {
  if (!profile) return [];

  const userSkills = (profile.hardSkills || []).map(s => s.toLowerCase());
  const userInterests = (profile.interests || []).map(i => i.toLowerCase());
  const userGoal = (profile.careerGoal || "").toLowerCase();
  
  // Scoring
  const scored = SIERRA_LEONE_CAREERS.map(career => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Direct Goal Match (Highest Weight)
    if (userGoal && (career.title.toLowerCase().includes(userGoal) || career.keywords.some(k => userGoal.includes(k)))) {
      score += 50;
      reasons.push("Matches your primary career goal");
    }

    // 2. Skill Overlaps
    const careerSkills = career.requiredSkills.map(s => s.toLowerCase());
    const matchedSkills = userSkills.filter(us => careerSkills.some(cs => cs.includes(us) || us.includes(cs)));
    
    if (matchedSkills.length > 0) {
      score += matchedSkills.length * 10;
      reasons.push(`Matches skills: ${matchedSkills.slice(0, 3).join(", ")}`);
    }

    // 3. Keywords/Interests (Broad Match)
    const keywordMatches = career.keywords.filter(k => 
      userInterests.some(ui => ui.includes(k)) || 
      userSkills.some(us => us.includes(k)) ||
      (profile.bio || "").toLowerCase().includes(k)
    );
    
    if (keywordMatches.length > 0) {
      score += keywordMatches.length * 5;
    }

    // 4. Education Level Fit (Bonus)
    // Simple heuristic: If career requires degree and user has one, boost.
    if (profile.educationLevel && (profile.educationLevel.includes("Degree") || profile.educationLevel.includes("Masters") || profile.educationLevel.includes("PhD"))) {
       if (career.requiredEducation.some(e => e.toLowerCase().includes("degree"))) {
         score += 5;
       }
    }

    return { career, score, reasons };
  });

  // Filter and Sort
  // Return top 3 matches with score > 0
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.career);
}
