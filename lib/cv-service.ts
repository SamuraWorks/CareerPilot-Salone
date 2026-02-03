import { CVData } from '@/components/cv-templates';

// Define the UserProfile interface locally if not exported from components, 
// or import it if better refactored. For now, mirroring the one in ProfileSection 
// to ensure type safety without circular imports if ProfileSection isn't exporting it cleanly.
export interface UserProfile {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    location: string;
    stage: string;
    interest: string;
    education: string;
    school: string;
    fieldOfStudy: string;
    graduationYear: string;
    technicalSkills: string;
    softSkills: string;
    languages: string;
    experience: string;
    internships: string;
    careerGoal: string;
    targetIndustry: string;
    timeline: string;
    workEnvironment: string;
    availability: string;
}

export function autoFillCV(profile: UserProfile): CVData {
    // 1. Map Personal Info
    const personalInfo = {
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        title: profile.careerGoal || "Professional", // Fallback title
        summary: `Motivated ${profile.stage} with a strong interest in ${profile.interest}. Seeking opportunities in the ${profile.targetIndustry} sector. Committed to applying skills in ${profile.technicalSkills} to drive impact.`
    };

    // 2. Map Experience
    // The profile has a simple textarea for experience. We need to try to parse it or just dump it into a single entry if unstructured.
    // For better results, we treat the whole block as one entry if we can't parse it, 
    // or arguably we leave it empty if the user hasn't provided structured data. 
    // BUT the requirement is "Auto-fill... with provided data".

    const experience: any[] = [];
    if (profile.experience) {
        experience.push({
            id: 'exp-1',
            company: "Previous Experience",
            position: "Team Member/Role",
            startDate: "",
            endDate: "",
            current: false,
            description: profile.experience
        });
    }

    if (profile.internships) {
        experience.push({
            id: 'exp-2',
            company: "Internships & Volunteering",
            position: "Volunteer/Intern",
            startDate: "",
            endDate: "",
            current: false,
            description: profile.internships
        });
    }

    // 3. Map Education
    const education: any[] = [];
    if (profile.school) {
        education.push({
            id: 'edu-1',
            school: profile.school,
            degree: profile.education,
            field: profile.fieldOfStudy,
            startYear: "",
            endYear: profile.graduationYear
        });
    }

    // 4. Map Skills
    // Combine soft and technical skills
    const combinedSkills = [profile.technicalSkills, profile.softSkills]
        .filter(Boolean)
        .join(', ');

    return {
        personalInfo,
        experience,
        education,
        skills: combinedSkills,
        verifiedSkills: [], // No verification from just profile text
        profilePhoto: "", // No photo upload in profile intake yet
        projects: [],
        certifications: [],
        languages: profile.languages,
        references: []
    };
}
