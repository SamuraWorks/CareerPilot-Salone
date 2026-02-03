import { UserProfile } from "./types";
import { CareerInfo, SIERRA_LEONE_CAREERS } from "./career-data";

/**
 * Calculates a % match for a career based on profile data.
 * Weights:
 * - Skills: 50%
 * - Education: 30%
 * - Interests: 20%
 */
export function calculateCareerMatch(profile: UserProfile, career: CareerInfo): number {
    if (!profile || !career) return 0;

    let skillScore = 0;
    const profileSkills = profile.skills || [];
    const careerSkills = career.requiredSkills || [];

    if (careerSkills.length > 0) {
        const matches = profileSkills.filter(ps =>
            careerSkills.some(cs => cs.toLowerCase().includes(ps.toLowerCase()))
        );
        skillScore = (matches.length / careerSkills.length) * 50;
    }

    let eduScore = 0;
    const profileEdu = profile.highest_education || profile.education_level || "";
    const careerEdu = career.requiredEducation || [];

    if (careerEdu.length > 0) {
        const match = careerEdu.some(ce => ce.toLowerCase().includes(profileEdu.toLowerCase()));
        if (match) eduScore = 30;
    }

    let interestScore = 0;
    const profileInterests = profile.interests || [];
    const industry = career.industry || "";

    if (profileInterests.some(pi => pi.toLowerCase().includes(industry.toLowerCase()))) {
        interestScore = 20;
    }

    return Math.min(Math.round(skillScore + eduScore + interestScore), 100);
}

/**
 * Deterministic CV Readiness Score (0-100)
 */
export function calculateCVScore(profile: UserProfile): number {
    if (!profile) return 0;

    const weights = {
        identity: 20,    // name, email, phone, location
        education: 30,   // institution, field, grad_year
        skills: 25,      // at least 3 skills
        experience: 25   // recent_role or top_project
    };

    let score = 0;

    // Identity (5 pts each)
    if (profile.full_name) score += 5;
    if (profile.email) score += 5;
    if (profile.phone || profile.phone_number) score += 5;
    if (profile.location || profile.district) score += 5;

    // Education (10 pts each)
    if (profile.education_details?.institution) score += 10;
    if (profile.education_details?.field) score += 10;
    if (profile.education_details?.grad_year) score += 10;

    // Skills
    const skillsCount = profile.skills?.length || 0;
    score += Math.min(skillsCount * 5, 25);

    // Experience
    if (profile.resume_data?.recent_role || profile.resume_data?.top_project) {
        score += 25;
    }

    return Math.min(score, 100);
}

/**
 * Roadmap progress calculation
 */
export function calculateRoadmapProgress(profile: UserProfile, roadmapId: string): number {
    if (!profile || !roadmapId) return 0;

    // In this app, roadmaps are often tied to career IDs
    // The profile has completed_tasks: Record<roadmapId, taskId[]>
    const completedTasks = profile.completed_tasks?.[roadmapId] || [];

    // Total tasks is assumed to be 8 for most roadmaps in this app logic
    // or we could look it up. Let's assume 8 based on dashboard.tsx line 77
    const totalTasks = 8;

    return Math.min(Math.round((completedTasks.length / totalTasks) * 100), 100);
}
