"use client"

import { useEffect } from "react"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-background p-4 text-center">
            <div className="flex flex-col items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center border border-slate-100 shadow-sm overflow-hidden">
                    <NextImage src="/images/core/logo.png" alt="CareerPilot Logo" width={80} height={80} className="object-cover scale-125" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                    <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
            </div>

            <div className="max-w-md space-y-2">
                <h2 className="text-2xl font-black text-gradient-salone uppercase tracking-tight">Something went wrong!</h2>
                <p className="text-muted-foreground">
                    We encountered an unexpected error. Please try again or contact support if the problem persists.
                </p>

                {process.env.NODE_ENV === 'development' && (
                    <p className="text-xs text-red-500 bg-red-50 p-2 rounded border border-red-100 mt-2">
                        Error: {error.message || "Unknown error"}
                    </p>
                )}
            </div>

            <div className="flex gap-4">
                <Button onClick={() => window.location.href = '/'} variant="outline">
                    Go Home
                </Button>
                <Button onClick={() => reset()} className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                </Button>
            </div>
        </div>
    )
}
