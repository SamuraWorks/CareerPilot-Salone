"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { UserProfile, DEFAULT_PROFILE } from "@/lib/types"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"

interface AuthContextType {
  user: { id: string } | null
  profile: UserProfile
  isLoading: boolean
  login: (email: string, password?: string) => Promise<void>
  loginWithId: (secretId: string) => Promise<boolean>
  signup: (email: string, password: string, fullName: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (newData: Partial<UserProfile>) => Promise<void>
  refreshProfile: () => Promise<void>
  completeOnboarding: (newProfileData: UserProfile) => Promise<string>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: string } | null>(null)
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // 1. Identity Initialization (Frictionless)
  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;

    const initIdentity = async () => {
      let currentUserId = null;

      // START: Load cached profile first for instant UI response
      const cachedProfile = localStorage.getItem('career_pilot_profile')
      if (cachedProfile) {
        try {
          const parsed = JSON.parse(cachedProfile)
          if (parsed && typeof parsed === 'object') {
            setProfile(parsed)
          }
        } catch (e) {
          console.error("Failed to parse cached profile")
        }
      }

      // A. Check for real Supabase Session first
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          currentUserId = session.user.id
        }
      } catch (e) {
        console.error("Session check failed:", e)
      }

      // B. Check for persistent Anonymous ID
      if (!currentUserId) {
        const anonId = localStorage.getItem('career_pilot_anon_id')
        if (anonId) {
          currentUserId = anonId
        } else {
          // C. Generate NEW Anonymous ID
          const newAnonId = `pilot_${uuidv4().split('-')[0]}` // Cleaner prefix
          localStorage.setItem('career_pilot_anon_id', newAnonId)
          currentUserId = newAnonId
          setProfile(prev => ({ ...prev, anon_id: newAnonId }))
        }
      }

      // D. Set State & Fetch Full Profile
      if (currentUserId) {
        setUser({ id: currentUserId })
        await fetchProfile(currentUserId)
      }

      setIsLoading(false)

      // Listen for auth changes (e.g. if they eventually do a real login)
      const { data: { subscription: sub } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          setUser({ id: session.user.id })
          await fetchProfile(session.user.id)
        } else {
          // Only clear if they explicitly logged out? 
          // For now keep user if it's an anon sessions
        }
      })
      subscription = sub;
    }

    initIdentity()

    return () => {
      if (subscription) subscription.unsubscribe();
    }
  }, [])

  // 2. Fetch Profile from Supabase
  const fetchProfile = async (userId: string) => {
    try {
      // Check if userId is a UUID to avoid cast errors
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId);

      let query = supabase.from('profiles').select('*');

      if (isUUID) {
        query = query.eq('id', userId);
      } else {
        query = query.eq('anon_id', userId);
      }

      const { data, error } = await query.single();

      if (data) {
        setProfile(data as UserProfile)
        localStorage.setItem('career_pilot_profile', JSON.stringify(data))
      }
    } catch (err) {
      console.error("Exception fetching profile:", err)
    }
  }

  // 3. Auth Functions
  const signup = async (email: string, password: string, fullName: string) => {
    // This is now handled by the API call in the component, but we can standardise here if needed.
    // However, the component calls /api/register which does the heavy lifting.
    // We just need to ensure the session is set if the API doesn't auto-login (it usually doesn't for server-side create).

    // Attempt standard login after signup to establish session
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    } catch (e) {
      console.error("Auto-login failed:", e)
    }
  }

  const login = async (email: string, password?: string) => {
    try {
      if (!password) throw new Error("Password required")
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      toast.success("Welcome back! Entering your cockpit...")
      router.push('/dashboard') // Will be redirected by AuthGuard if profile incomplete
    } catch (err: any) {
      toast.error(err.message || "Login failed")
      throw err
    }
  }

  const loginWithId = async (secretId: string) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secretId })
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || "Invalid ID")

      // Manually set user state since we don't have a Supabase session for just Secret ID
      setUser({ id: data.user.id })
      setProfile(data.profile)
      localStorage.setItem('career_pilot_user_id', data.user.id)
      localStorage.setItem('career_pilot_profile', JSON.stringify(data.profile))

      toast.success("Identity verified! Redirecting...")
      router.push(data.profile.is_complete ? '/dashboard' : '/onboarding')
      return true
    } catch (err: any) {
      toast.error(err.message || "Login failed")
      return false
    }
  }

  // 4. Enhanced Profile Operations
  const updateProfile = async (newData: Partial<UserProfile>) => {
    const targetId = user?.id || profile.id || profile.anon_id;

    const isConfigured = supabase && !(supabase as any).__isMock;

    try {
      if (isConfigured) {
        const isAnon = targetId.startsWith('pilot_');
        const payload = {
          ...newData,
          updated_at: new Date().toISOString()
        };

        // Always use UPSERT to handle both new and existing users correctly
        const { error } = await supabase
          .from('profiles')
          .upsert(
            isAnon ? { ...payload, anon_id: targetId } : { ...payload, id: targetId },
            { onConflict: isAnon ? 'anon_id' : 'id' }
          );

        if (error) {
          console.error("Supabase sync failed:", error);
          // Don't throw, still update local state
        }
      } else {
        console.warn("Supabase not configured, saving locally only.");
      }

      const updatedProfile = { ...profile, ...newData }
      setProfile(updatedProfile)
      localStorage.setItem('career_pilot_profile', JSON.stringify(updatedProfile))
    } catch (err: any) {
      console.error("Profile update error:", err)
      toast.error("Failed to save some changes")
    }
  }

  const completeOnboarding = async (newProfileData: UserProfile) => {
    // FALLBACK: Use profile.id or the ID explicitly passed in newProfileData
    const targetId = user?.id || newProfileData.id || profile.id;

    if (!targetId) {
      console.error("Cannot complete onboarding: No User ID found");
      return "";
    }

    const isConfigured = supabase && !(supabase as any).__isMock;

    if (!isConfigured) {
      toast.error("Cloud sync is unavailable. Configuration missing.");
    }

    try {
      const finalProfile = {
        ...newProfileData,
        is_complete: true,
        profile_completed: true,
        updated_at: new Date().toISOString()
      }

      await updateProfile(finalProfile)
      localStorage.setItem('onboardingComplete', 'true') // Helper

      // Ensure we set the user state if it was missing
      if (!user) {
        setUser({ id: targetId });
      }

      return targetId
    } catch (err) {
      console.error("Onboarding sync failed:", err)
      return ""
    }
  }

  const logout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      await supabase.auth.signOut()
      localStorage.clear() // Clear all local state
      setUser(null)
      // DEFAULT_PROFILE needs to be imported, but we can just set minimal
      window.location.href = "/"
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
      loginWithId,
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
