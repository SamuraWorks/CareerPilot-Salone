"use client"

import { useState, useEffect, ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { toast } from "sonner"

// Admin PIN from environment variable or secure default
const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "CareerPilot@2026!"

interface AuthWrapperProps {
    children: ReactNode
}

export function AuthWrapper({ children }: AuthWrapperProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [pinInput, setPinInput] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check session storage
        const sessionAuth = sessionStorage.getItem('admin_auth')
        if (sessionAuth === 'true') {
            setIsAuthenticated(true)
        }
        setIsLoading(false)
    }, [])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (pinInput === ADMIN_PIN) {
            setIsAuthenticated(true)
            sessionStorage.setItem('admin_auth', 'true')
            toast.success("Admin Access Granted")
        } else {
            toast.error("Invalid Access Code")
            setPinInput("")
        }
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        sessionStorage.removeItem('admin_auth')
        toast.info("Logged out")
    }

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <div className="flex h-screen items-center justify-center p-4 bg-slate-50">
                <Card className="w-full max-w-sm shadow-xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900">
                            <Lock className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl">Admin Access</CardTitle>
                        <CardDescription>Enter the access code to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    type="password"
                                    placeholder="Enter PIN"
                                    value={pinInput}
                                    onChange={(e) => setPinInput(e.target.value)}
                                    className="text-center text-lg tracking-widest h-14 rounded-xl"
                                    autoFocus
                                />
                            </div>
                            <Button type="submit" className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800">
                                Verify Identity
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return <>{children}</>
}

export function useAdminAuth() {
    const handleLogout = () => {
        sessionStorage.removeItem('admin_auth')
        window.location.href = '/admin'
    }

    return { handleLogout }
}
