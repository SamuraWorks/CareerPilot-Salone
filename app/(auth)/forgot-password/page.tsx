"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, ArrowRight, ChevronLeft } from "lucide-react"

export default function ForgotPasswordPage() {
    const { resetPassword } = useAuth()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            await resetPassword(email)
            setSuccess(true)
        } catch (err: any) {
            setError(err.message || "Failed to send reset email.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 pt-20">
            <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
                <Card className="w-full max-w-md relative z-10 border-none shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] rounded-[2.5rem] bg-white overflow-hidden">
                    <CardHeader className="space-y-4 pt-10 text-center">
                        <div className="flex justify-center mb-2">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                <Mail className="w-6 h-6" />
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-black text-[#0B1F3A]">Reset Password</CardTitle>
                        <CardDescription className="text-slate-500 font-medium">
                            Enter your email and we'll send you a link to get back into your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-10 pt-4">
                        {success ? (
                            <div className="text-center space-y-6 slide-in">
                                <Alert className="rounded-2xl border-emerald-100 bg-emerald-50 py-4">
                                    <AlertDescription className="text-emerald-800 font-bold text-xs uppercase tracking-wide">
                                        Check your inbox! We've sent a recovery link to {email}.
                                    </AlertDescription>
                                </Alert>
                                <Link href="/login" className="block">
                                    <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-200 font-black uppercase tracking-widest">
                                        Return to Login
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {error && (
                                    <Alert variant="destructive" className="rounded-2xl border-red-100 bg-red-50 py-3">
                                        <AlertDescription className="text-red-800 font-bold text-[11px] uppercase tracking-wide">{error}</AlertDescription>
                                    </Alert>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={loading}
                                            className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 font-medium"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-14 rounded-2xl bg-[#0B1F3A] hover:bg-slate-800 text-white font-black uppercase tracking-widest shadow-lg transition-all"
                                    disabled={loading || !email}
                                >
                                    {loading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            <span>Send Reset Link</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </Button>

                                <Link href="/login" className="flex items-center justify-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors mt-4">
                                    <ChevronLeft className="w-4 h-4" />
                                    Back to Login
                                </Link>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
