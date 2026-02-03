import { UserProfile } from "@/components/home/profile-wizard"

export async function saveProfileData(profile: UserProfile) {
    try {
        if (typeof window === 'undefined') return { success: false, message: "Client-only operation" };

        // 1. Save to localStorage
        const profileWithFlag = { ...profile, is_complete: true }
        localStorage.setItem('career_pilot_profile', JSON.stringify(profileWithFlag))

        // 2. Generate CV data structure
        const cvData = {
            personalInfo: {
                fullName: profile.full_name,
                location: profile.location,
                profileImg: profile.avatar_url,
                email: "", // To be filled by user in CV builder
                phone: ""
            },
            education: [{
                level: profile.education,
                institution: profile.school,
                field: profile.field_of_study,
                year: profile.graduation_year
            }],
            skills: {
                technical: profile.technical_skills.split(',').map(s => s.trim()).filter(Boolean),
                soft: profile.soft_skills.split(',').map(s => s.trim()).filter(Boolean),
                languages: profile.languages.split(',').map(s => s.trim()).filter(Boolean)
            },
            experience: profile.experience ? [{
                description: profile.experience
            }] : [],
            internships: profile.internships ? [{
                description: profile.internships
            }] : [],
            careerGoal: profile.career_goal,
            targetIndustry: profile.target_industry
        }

        // Save CV data for pre-population
        localStorage.setItem('career_pilot_cv_data', JSON.stringify(cvData))

        // 3. Generate career recommendations metadata
        const careerMetadata = {
            stage: profile.stage,
            interest: profile.interest,
            education: profile.education,
            targetIndustry: profile.target_industry,
            careerGoal: profile.career_goal,
            location: profile.location,
            availability: profile.availability
        }

        // Save for AI career matching
        localStorage.setItem('career_pilot_metadata', JSON.stringify(careerMetadata))

        // 4. Mark profile as complete
        localStorage.setItem('career_pilot_profile_complete', 'true')

        return {
            success: true,
            message: "Profile saved successfully!"
        }
    } catch (error) {
        console.error("Error saving profile:", error)
        return {
            success: false,
            message: "Failed to save profile"
        }
    }
}
