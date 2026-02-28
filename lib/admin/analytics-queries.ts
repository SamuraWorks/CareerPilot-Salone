import { SupabaseClient } from "@supabase/supabase-js"
import { UserProfile } from "@/lib/types"

export interface AnalyticsData {
    totalUsers: number
    onboardedUsers: number
    anonymousUsers: number
    userGrowth: { date: string; count: number }[]
    districtDistribution: { district: string; count: number }[]
    careerGoals: { goal: string; count: number }[]
    educationLevels: { level: string; count: number }[]
    recentActivity: UserProfile[]
}

export async function getAnalyticsData(supabase: SupabaseClient): Promise<AnalyticsData> {
    try {
        // Fetch all users
        const { data: users, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error

        const profiles = (users || []) as UserProfile[]

        // Calculate metrics
        const totalUsers = profiles.length
        const onboardedUsers = profiles.filter(u => u.is_complete || u.profile_completed).length
        const anonymousUsers = profiles.filter(u => u.anon_id && !u.email).length

        // User growth (last 30 days)
        const userGrowth = calculateUserGrowth(profiles)

        // District distribution
        const districtDistribution = calculateDistribution(
            profiles,
            'district',
            'location'
        )

        // Career goals
        const careerGoals = calculateDistribution(profiles, 'career_goal')
            .slice(0, 10) // Top 10

        // Education levels
        const educationLevels = calculateDistribution(
            profiles,
            'education_level',
            'highest_education'
        )

        // Recent activity (last 20 users)
        const recentActivity = profiles.slice(0, 20)

        return {
            totalUsers,
            onboardedUsers,
            anonymousUsers,
            userGrowth,
            districtDistribution,
            careerGoals,
            educationLevels,
            recentActivity
        }
    } catch (error) {
        console.error('Error fetching analytics:', error)
        return {
            totalUsers: 0,
            onboardedUsers: 0,
            anonymousUsers: 0,
            userGrowth: [],
            districtDistribution: [],
            careerGoals: [],
            educationLevels: [],
            recentActivity: []
        }
    }
}

function calculateUserGrowth(users: UserProfile[]): { date: string; count: number }[] {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (29 - i))
        return date.toISOString().split('T')[0]
    })

    const growthMap = new Map<string, number>()
    last30Days.forEach(date => growthMap.set(date, 0))

    users.forEach(user => {
        if (user.created_at) {
            const date = new Date(user.created_at).toISOString().split('T')[0]
            if (growthMap.has(date)) {
                growthMap.set(date, (growthMap.get(date) || 0) + 1)
            }
        }
    })

    return Array.from(growthMap.entries()).map(([date, count]) => ({ date, count }))
}

function calculateDistribution(
    users: UserProfile[],
    primaryField: keyof UserProfile,
    fallbackField?: string
): any[] {
    const countMap = new Map<string, number>()

    users.forEach(user => {
        let value = user[primaryField] as string
        if (!value && fallbackField) {
            value = (user as any)[fallbackField] as string
        }
        if (value && typeof value === 'string') {
            countMap.set(value, (countMap.get(value) || 0) + 1)
        }
    })

    return Array.from(countMap.entries())
        .map(([key, count]) => {
            if (primaryField === 'district' || primaryField === 'location') {
                return { district: key, count }
            } else if (primaryField === 'career_goal') {
                return { goal: key, count }
            } else {
                return { level: key, count }
            }
        })
        .sort((a, b) => b.count - a.count)
}

export async function getFeedbackData(supabase: SupabaseClient) {
    try {
        const { data, error } = await supabase
            .from('feedback')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error fetching feedback:', error)
        return []
    }
}
