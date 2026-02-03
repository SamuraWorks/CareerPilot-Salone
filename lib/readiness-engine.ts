
import { UserProfile } from "./cv-logic-engine";

export type ReadinessState = 'exploring' | 'preparing' | 'ready' | 'applying';

export interface ReadinessReport {
    score: number;
    state: ReadinessState;
    missingCriticals: string[];
    roadmap: string[];
}

/**
 * System 4: Career Readiness & Authority
 * Calculates a 0-100 score and assigns a state.
 */
export function calculateReadiness(profile: UserProfile, targetRole: string): ReadinessReport {
    let score = 0;
    const missingCriticals: string[] = [];
    const roadmap: string[] = [];

    // 1. Profile Completeness (Base 30%)
    if (profile.status) score += 10;
    if (profile.yearsExperience >= 0) score += 10;
    if (profile.skills.length >= 3) score += 10;
    else missingCriticals.push("Add at least 3 skills");

    // 2. Experience Match (30%)
    // Simple heuristic: Senior roles require >3 years, Mid requires >1
    const isSenior = targetRole.toLowerCase().includes('senior') || targetRole.toLowerCase().includes('lead') || targetRole.toLowerCase().includes('manager');
    const isMid = targetRole.toLowerCase().includes('mid') || targetRole.toLowerCase().includes('officer');

    if (isSenior) {
        if (profile.yearsExperience >= 5) score += 30;
        else if (profile.yearsExperience >= 3) score += 15;
        else {
            missingCriticals.push("Significant experience gap for Senior role");
            roadmap.push("Gain leadership experience in current role");
        }
    } else if (isMid) {
        if (profile.yearsExperience >= 2) score += 30;
        else if (profile.yearsExperience >= 1) score += 15;
        else roadmap.push("Complete 1 more year to reach Mid-level");
    } else {
        // Entry level / General
        score += 30;
    }

    // 3. Skill & Project Evidence (40%)
    if (profile.projectCount >= 2) {
        score += 40;
    } else if (profile.projectCount === 1) {
        score += 20;
        roadmap.push("Build 1 more complex project to demonstrate consistency");
    } else {
        missingCriticals.push("No Portfolio Projects found");
        roadmap.push("Build a capstone project relevant to " + targetRole);
    }

    // State Determination
    let state: ReadinessState = 'exploring';
    if (score < 40) state = 'exploring';
    else if (score < 70) state = 'preparing';
    else if (score < 90) state = 'ready';
    else state = 'applying';

    // The "Not Yet" Mechanism logic injects specific blockers
    if (state === 'preparing' && !roadmap.length) {
        roadmap.push("Network with 3 people in this field");
        roadmap.push("Optimize CV keywords for this role");
    }

    return { score, state, missingCriticals, roadmap };
}
