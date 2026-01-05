"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

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

interface AuthContextType {
  user: User | null
  session: any | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<any>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(MOCK_USER)
  const [session, setSession] = useState<any | null>({ user: MOCK_USER, access_token: "mock-token" })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Permanent mock state
    setUser(MOCK_USER)
    setSession({ user: MOCK_USER, access_token: "mock-token" })
    setLoading(false)
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
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{
      user,
      session,
      login,
      signup,
      loginWithGoogle,
      logout,
      isAuthenticated: true,
      loading: false
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
