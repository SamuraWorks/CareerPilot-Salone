"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    // Define public routes that don't need auth (if this component is used globally)
    // But strictly, we'll use this primarily for protected layouts.
    const isPublic = pathname === "/" || pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password"

    useEffect(() => {
        if (!loading && !user && !isPublic) {
            console.log("AuthGuard: No user found, redirecting to login...")
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
        }
    }, [user, loading, router, pathname, isPublic])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">Loading CareerPilot...</p>
                </div>
            </div>
        )
    }

    // If on a protected route and not authenticated, don't render children (prevents flash)
    if (!user && !isPublic) {
        return null
    }

    return <>{children}</>
}
