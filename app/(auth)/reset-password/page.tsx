"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Lock, ArrowRight, ShieldCheck } from "lucide-react"

export default function ResetPasswordPage() {
    const { updatePassword } = useAuth()
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.")
            return
        }

        setLoading(true)
        try {
            await updatePassword(password)
            setSuccess(true)
            setTimeout(() => {
                router.push('/login')
            }, 3000)
        } catch (err: any) {
            setError(err.message || "Failed to update password.")
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
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <Lock className="w-6 h-6" />
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-black text-[#0B1F3A]">New Password</CardTitle>
                        <CardDescription className="text-slate-500 font-medium">
                            Set a strong new password for your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-10 pt-4">
                        {success ? (
                            <div className="text-center space-y-6 slide-in">
                                <div className="flex justify-center">
                                    <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white animate-bounce shadow-xl shadow-emerald-200">
                                        <ShieldCheck className="w-8 h-8" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-black text-[#0B1F3A]">Password Updated!</h3>
                                    <p className="text-slate-500 text-sm font-medium">Redirecting you to login securely...</p>
                                </div>
                                <Loader2 className="w-6 h-6 animate-spin mx-auto text-emerald-500" />
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {error && (
                                    <Alert variant="destructive" className="rounded-2xl border-red-100 bg-red-50 py-3">
                                        <AlertDescription className="text-red-800 font-bold text-[11px] uppercase tracking-wide">{error}</AlertDescription>
                                    </Alert>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="password" title="New Password" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={loading}
                                            className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 font-medium"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" title="Confirm Password" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            disabled={loading}
                                            className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 font-medium"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-14 rounded-2xl bg-[#0B1F3A] hover:bg-slate-800 text-white font-black uppercase tracking-widest shadow-lg transition-all"
                                    disabled={loading || !password}
                                >
                                    {loading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            <span>Secure Update</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
