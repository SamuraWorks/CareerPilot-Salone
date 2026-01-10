"use client"

import { createContext, useContext, useEffect, useState, type ReactNode, useCallback } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

// Mock User for no-auth environment
const MOCK_USER = {
  id: "mock-user-id",
  email: "mentor@careerpilot.sl",
  name: "Salone Youth"
}

interface User {
  id: string
  email: string
  name: string
}

export interface UserProfile {
  fullName: string
  age: string
  location: string
  educationLevel: string
  subjects: string[]
  interests: string[]
  careerGoal: string
  whatsappNumber: string
  whatsappSubscribed: boolean
  preferredLanguage: string
}

const DEFAULT_PROFILE: UserProfile = {
  fullName: "",
  age: "",
  location: "",
  educationLevel: "",
  subjects: [],
  interests: [],
  careerGoal: "",
  whatsappNumber: "",
  whatsappSubscribed: false,
  preferredLanguage: "English"
}

interface AuthContextType {
  user: User | null
  profile: UserProfile
  session: any | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<any>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  updateProfile: (newData: Partial<UserProfile>) => void
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(MOCK_USER)
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE)
  const [session, setSession] = useState<any | null>({ user: MOCK_USER, access_token: "mock-token" })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Initial load
  useEffect(() => {
    const loadData = () => {
      try {
        const saved = localStorage.getItem("userOnboarding")
        if (saved) {
          const parsed = JSON.parse(saved)
          setProfile(prev => ({ ...prev, ...parsed }))
        }
      } catch (e) {
        console.error("Auth: Failed to load profile", e)
      } finally {
        setLoading(false)
      }
    }
    loadData()

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userOnboarding" && e.newValue) {
        setProfile(JSON.parse(e.newValue))
      }
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const updateProfile = useCallback((newData: Partial<UserProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...newData }
      localStorage.setItem("userOnboarding", JSON.stringify(updated))

      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new Event("profileUpdate"))

      return updated
    })

    // Also background save to Supabase if possible
    if (user) {
      const dbData = {
        id: user.id,
        full_name: newData.fullName || profile.fullName,
        age: newData.age ? parseInt(newData.age) : (profile.age ? parseInt(profile.age) : null),
        location: newData.location || profile.location,
        education_level: newData.educationLevel || profile.educationLevel,
        skills: newData.subjects || profile.subjects,
        interests: newData.interests || profile.interests,
        career_goal: newData.careerGoal || profile.careerGoal,
        whatsapp_number: newData.whatsappNumber || profile.whatsappNumber,
        whatsapp_subscribed: newData.whatsappSubscribed !== undefined ? newData.whatsappSubscribed : profile.whatsappSubscribed,
        preferred_language: newData.preferredLanguage || profile.preferredLanguage,
        updated_at: new Date().toISOString()
      }

      supabase.from('profiles').upsert(dbData).then(({ error }) => {
        if (error) console.warn("Background update error:", error.message)
      })
    }
  }, [user, profile])

  // Sync profile if event is fired
  useEffect(() => {
    const handleProfileUpdate = () => {
      const saved = localStorage.getItem("userOnboarding")
      if (saved) setProfile(JSON.parse(saved))
    }
    window.addEventListener("profileUpdate", handleProfileUpdate)
    return () => window.removeEventListener("profileUpdate", handleProfileUpdate)
  }, [])

  const login = async (email: string, password: string) => {
    setUser(MOCK_USER)
    router.push("/dashboard")
  }

  const signup = async (name: string, email: string, password: string) => {
    setUser(MOCK_USER)
    return { user: MOCK_USER }
  }

  const loginWithGoogle = async () => {
    setUser(MOCK_USER)
    router.push("/dashboard")
  }

  const logout = async () => {
    setUser(null)
    setProfile(DEFAULT_PROFILE)
    localStorage.removeItem("userOnboarding")
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      login,
      signup,
      loginWithGoogle,
      logout,
      updateProfile,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
