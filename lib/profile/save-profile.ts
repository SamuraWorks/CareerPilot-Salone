"use server"

import { UserProfile as WizardProfile } from "@/components/home/profile-wizard"
import { updateUserProfile } from "@/lib/db"

export async function saveProfileData(profile: WizardProfile, userId?: string) {
    try {
        if (!userId) {
            if (typeof window !== 'undefined') {
                const anonId = localStorage.getItem('career_pilot_anon_id');
                userId = anonId || undefined;
            }
        }

        if (!userId) throw new Error("No User ID available for saving profile");

        // 1. Map wizard profile to database profile
        const dbProfile = {
            full_name: profile.full_name,
            location: profile.location,
            avatar_url: profile.avatar_url,
            education_level: profile.education || (profile as any).education_level,
            career_goal: profile.career_goal,
            is_complete: true,
            // profile_completed: true, // REMOVED: Column does not exist

            // Store raw metadata for AI in resume_data
            resume_data: {
                impact_metric: profile.experience,
                leadership_action: profile.internships,
                professional_hook: profile.technical_skills,
                // Preserve wizard fields
                school: profile.school,
                field_of_study: profile.field_of_study,
                graduation_year: profile.graduation_year,
                technical_skills: profile.technical_skills,
                soft_skills: profile.soft_skills,
                languages: profile.languages
            },

            updated_at: new Date().toISOString()
        }

        // 2. Save to Supabase
        const { data, error } = await updateUserProfile(userId, dbProfile);
        if (error) throw error;

        // 3. Generate CV data structure (legacy/internal use)
        const cvData = {
            personalInfo: {
                fullName: profile.full_name,
                location: profile.location,
                profileImg: profile.avatar_url,
                email: "",
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

        if (typeof window !== 'undefined') {
            localStorage.setItem('career_pilot_cv_data', JSON.stringify(cvData));
            localStorage.setItem('career_pilot_profile_complete', 'true');
        }

        return {
            success: true,
            message: "Profile saved successfully to secure cloud!"
        }
    } catch (error) {
        console.error("Error saving profile:", error)
        return {
            success: false,
            message: "Failed to save profile to cloud. Please try again."
        }
    }
}
