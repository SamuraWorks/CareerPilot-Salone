"use client"
export const dynamic = 'force-dynamic'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to analytics dashboard
        router.push('/admin/analytics')
    }, [router])

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-muted-foreground">Redirecting...</div>
        </div>
    )
}
