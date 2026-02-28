"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import { UserProfile, DEFAULT_PROFILE } from "@/lib/types"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

interface ProfileContextType {
    profile: UserProfile | null
    isProfileLoading: boolean
    updateProfile: (newData: Partial<UserProfile>) => Promise<void>
    completeOnboarding: (newProfileData: Partial<UserProfile>) => Promise<string>
    refreshProfile: () => Promise<void>
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
    const { user, isLoadingAuth } = useAuth()
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [isProfileLoading, setIsProfileLoading] = useState(true)
    const supabase = createClient()

    const fetchProfile = async (userId: string) => {
        setIsProfileLoading(true)
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (data) {
                setProfile(data as UserProfile)
            } else if (error) {
                console.error("Error fetching profile:", error)
                setProfile(null)
            }
        } catch (err) {
            console.error("Exception fetching profile:", err)
            setProfile(null)
        } finally {
            setIsProfileLoading(false)
        }
    }

    // Trigger profile fetch when auth state stabilizes
    useEffect(() => {
        if (isLoadingAuth) return; // Wait for auth to settle

        if (user) {
            // Fetch only if it's the first time or user changed
            if (!profile || profile.id !== user.id) {
                fetchProfile(user.id)
            } else {
                // we already have the profile for this user
                setIsProfileLoading(false)
            }
        } else {
            // Logged out
            setProfile(null)
            setIsProfileLoading(false)
        }
    }, [user, isLoadingAuth])

    const updateProfile = async (newData: Partial<UserProfile>) => {
        if (!user || !profile) return

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    ...newData,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id)

            if (error) throw error

            setProfile(prev => prev ? { ...prev, ...newData } : null)
            toast.success("Profile updated")
        } catch (err: any) {
            console.error("Profile update error:", err)
            toast.error("Failed to save profile changes")
            throw err
        }
    }

    const completeOnboarding = async (newProfileData: Partial<UserProfile>) => {
        if (!user) return ""

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    ...newProfileData,
                    is_complete: true,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id)

            if (error) throw error

            setProfile(prev => prev ? { ...prev, ...newProfileData, is_complete: true } : null)
            return user.id
        } catch (err) {
            console.error("Onboarding completion failed:", err)
            toast.error("Failed to complete onboarding")
            return ""
        }
    }

    const refreshProfile = async () => {
        if (user) await fetchProfile(user.id)
    }

    return (
        <ProfileContext.Provider value={{
            profile,
            isProfileLoading,
            updateProfile,
            completeOnboarding,
            refreshProfile
        }}>
            {children}
        </ProfileContext.Provider>
    )
}

export function useProfile() {
    const context = useContext(ProfileContext)
    if (context === undefined) {
        throw new Error("useProfile must be used within a ProfileProvider")
    }
    return context
}
