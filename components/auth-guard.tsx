"use client"

import React, { useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter, usePathname } from "next/navigation"

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    const isPublicRoute =
        pathname === '/' ||
        pathname === '/login' ||
        pathname === '/signup'

    useEffect(() => {
        if (!isLoading && !user && !isPublicRoute) {
            router.push('/login')
        }
    }, [user, isLoading, pathname, router, isPublicRoute])

    // Show loading state for non-public routes while checking auth
    if (isLoading && !isPublicRoute) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
                <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            </div>
        )
    }

    return <>{children}</>
}
