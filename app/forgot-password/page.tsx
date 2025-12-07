"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!email) {
            setError("Email is required")
            return
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address")
            return
        }

        setLoading(true)
        try {
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            })

            if (resetError) throw resetError

            setEmailSent(true)
            toast.success("Password reset email sent!")
        } catch (err: any) {
            setError(err.message || "Failed to send reset email. Please try again.")
            toast.error("Failed to send reset email")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navigation />

            <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
                <Card className="w-full max-w-md shadow-xl border-border/40 rounded-2xl overflow-hidden bg-card">
                    <CardHeader className="space-y-4 text-center pb-8 pt-8">
                        {/* Logo */}
                        <div className="flex justify-center">
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-lg border-2 border-primary/20">
                                <Image
                                    src="/logo.png"
                                    alt="CareerPilot Salone"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold tracking-tight">Reset Your Password</CardTitle>
                            <CardDescription className="text-base text-muted-foreground">
                                {emailSent ? "Check your email" : "Enter your email to receive a reset link"}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="px-8 pb-8">
                        {emailSent ? (
                            <div className="space-y-6 text-center">
                                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        We've sent a password reset link to <span className="font-semibold text-foreground">{email}</span>
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Click the link in the email to reset your password.
                                    </p>
                                </div>
                                <div className="pt-4 space-y-3">
                                    <Link href="/login" className="block">
                                        <Button className="w-full gap-2">
                                            <ArrowLeft className="w-4 h-4" />
                                            Back to Login
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        className="w-full"
                                        onClick={() => setEmailSent(false)}
                                    >
                                        Try another email
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <Alert variant="destructive" className="animate-fade-in text-sm py-2">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={loading}
                                            className="pl-10 h-12 touch-target"
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 touch-target"
                                    disabled={loading || !email}
                                >
                                    {loading ? "Sending..." : "Send Reset Link"}
                                </Button>

                                <div className="text-center">
                                    <Link href="/login">
                                        <Button variant="ghost" className="gap-2 touch-target">
                                            <ArrowLeft className="w-4 h-4" />
                                            Back to Login
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    )
}
