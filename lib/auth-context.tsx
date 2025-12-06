"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Pages that don't require authentication
const PUBLIC_ROUTES = ['/', '/login', '/signup', '/terms', '/privacy']

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check for persisted session
    const storedUser = localStorage.getItem('career_pilot_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse user session", e)
        localStorage.removeItem('career_pilot_user')
      }
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    // Route protection
    if (!loading && !user && !PUBLIC_ROUTES.includes(pathname)) {
      router.push('/login')
    }
  }, [user, loading, pathname, router])

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newUser = { email, name: email.split('@')[0] }
    setUser(newUser)
    localStorage.setItem('career_pilot_user', JSON.stringify(newUser))
    router.refresh()
  }

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newUser = { email, name }
    setUser(newUser)
    localStorage.setItem('career_pilot_user', JSON.stringify(newUser))
    router.refresh()
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('career_pilot_user')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user, loading }}>
      {!loading && (user || PUBLIC_ROUTES.includes(pathname)) ? children : null}
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
