"use client"

import React, { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useProfile } from "@/lib/profile-context"
import { useRouter, usePathname } from "next/navigation"

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoadingAuth } = useAuth()
    const { profile, isProfileLoading } = useProfile()
    const router = useRouter()
    const pathname = usePathname()

    // We render children only when we are perfectly sure the route is valid.
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        // 1. Wait for ALL loading to finish.
        if (isLoadingAuth || isProfileLoading) {
            setIsAuthorized(false)
            return;
        }

        const isPublicRoute =
            pathname === '/' ||
            pathname === '/login' ||
            pathname === '/signup'

        // Central Route Resolution (resolveUserRoute logic)

        // 2. If no user -> kick from protected routes to login
        if (!user) {
            if (!isPublicRoute) {
                if (pathname !== '/login') router.replace('/login')
            } else {
                setIsAuthorized(true) // allowed to view public route as guest
            }
            return;
        }

        // 3. User exists, but no profile was found in DB
        if (user && !profile) {
            // In a perfect system the trigger creates it. If missing, maybe show error or let them sit on login
            console.error("Critical: User authenticated but profile row is missing!")
            if (pathname !== '/login') router.replace('/login')
            return;
        }

        // 4. User exists, profile exists. Enforce Onboarding vs Dashboard 
        if (user && profile) {
            const isComplete = profile.is_complete === true || profile.profile_completed === true // fallback safety

            if (!isComplete) {
                // Must complete onboarding
                if (pathname !== '/onboarding') {
                    router.replace('/onboarding')
                } else {
                    setIsAuthorized(true) // already on onboarding, safe to render
                }
            } else {
                // Profile IS complete. 
                // Don't let them hit public auth routes or onboarding anymore.
                if (isPublicRoute || pathname === '/onboarding') {
                    if (pathname !== '/dashboard') {
                        router.replace('/dashboard')
                    }
                } else {
                    setIsAuthorized(true) // They are on a valid protected route
                }
            }
        }
    }, [user, isLoadingAuth, profile, isProfileLoading, pathname, router])

    // Show persistent Loading State until resolution is 100% finished
    // Never flash the dashboard or onboarding before validation
    if (isLoadingAuth || isProfileLoading || !isAuthorized) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950/5 fixed inset-0 z-50">
                <div className="w-12 h-12 mb-4 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin shadow-lg" />
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest animate-pulse">
                    Authenticating Environment...
                </p>
            </div>
        )
    }

    return <>{children}</>
}
