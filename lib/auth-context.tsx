"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { UserProfile, DEFAULT_PROFILE } from "@/lib/types"
import { toast } from "sonner"

interface AuthContextType {
  user: any | null
  profile: UserProfile
  isLoading: boolean
  login: (email: string, password?: string) => Promise<void>
  loginWithId: (secretId: string) => Promise<void>
  signup: (email: string, password: string, fullName: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (newData: Partial<UserProfile>) => Promise<void>
  refreshProfile: () => Promise<void>
  completeOnboarding: (newProfileData: UserProfile) => Promise<string>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser(session.user)
          await fetchProfile(session.user.id)
        }
      } catch (e) {
        console.error("Auth initialization failed:", e)
      } finally {
        setIsLoading(false)
      }

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          await fetchProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(DEFAULT_PROFILE)
        }
        setIsLoading(false)
      })

      return () => {
        subscription.unsubscribe()
      }
    }

    initAuth()
  }, [])

  const fetchProfile = async (userId: string) => {
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
      }
    } catch (err) {
      console.error("Exception fetching profile:", err)
    }
  }

  const signup = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      if (error) throw error
      toast.success("Account created successfully!")
    } catch (err: any) {
      toast.error(err.message || "Signup failed")
      throw err
    }
  }

  const login = async (email: string, password?: string) => {
    try {
      if (!password) throw new Error("Password required")
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      toast.success("Welcome back!")
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.message || "Login failed")
      throw err
    }
  }

  const loginWithId = async (secretId: string) => {
    try {
      const response = await fetch('/api/auth/login-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secretId })
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.error || "Login failed")

      // Secret ID login doesn't have a real Supabase session in this implementation
      // So we set the user and profile manually to allow the UI to function
      setUser(data.user)
      setProfile(data.profile)

      toast.success("Welcome back!")
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.message || "Invalid Secret ID")
      throw err
    }
  }

  const updateProfile = async (newData: Partial<UserProfile>) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...newData,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error

      setProfile(prev => ({ ...prev, ...newData }))
      toast.success("Profile updated")
    } catch (err: any) {
      console.error("Profile update error:", err)
      toast.error("Failed to save profile changes")
      throw err
    }
  }

  const completeOnboarding = async (newProfileData: UserProfile) => {
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

      setProfile(prev => ({ ...prev, ...newProfileData, is_complete: true }))
      return user.id
    } catch (err) {
      console.error("Onboarding completion failed:", err)
      toast.error("Failed to complete onboarding")
      return ""
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(DEFAULT_PROFILE)
      router.push('/')
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id)
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isLoading,
      login,
      signup,
      logout,
      updateProfile,
      completeOnboarding,
      refreshProfile
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
