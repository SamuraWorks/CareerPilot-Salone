"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface AuthContextType {
  user: any | null
  isLoadingAuth: boolean
  login: (email: string, password?: string) => Promise<void>
  loginWithId: (secretId: string) => Promise<void>
  signup: (email: string, password: string, fullName: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (mounted && session?.user) {
          setUser(session.user)
        }
      } catch (e) {
        console.error("Auth initialization failed:", e)
      } finally {
        if (mounted) setIsLoadingAuth(false)
      }

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!mounted) return;

        if (session?.user) {
          setUser(session.user)
        } else {
          setUser(null)
        }
        setIsLoadingAuth(false)
      })

      return () => {
        mounted = false;
        subscription.unsubscribe()
      }
    }

    initAuth()
  }, [])

  const signup = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      if (error) throw error
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
      // Note: We deliberately DO NOT redirect here anymore.
      // The RouteGuard handles successful session creation automatically.
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

      setUser(data.user)
      // Note: We deliberately DO NOT push to dashboard here anymore. Let RouteGuard route it based on the profile.
    } catch (err: any) {
      toast.error(err.message || "Invalid Secret ID")
      throw err
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      // Wait to redirect until context propagates
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoadingAuth,
      login,
      signup,
      logout,
      loginWithId
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
