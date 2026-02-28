"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const { login, loginWithId } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [secretId, setSecretId] = useState("")
    const [loginMethod, setLoginMethod] = useState<"email" | "id">("email")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const validateForm = () => {
        if (loginMethod === "email") {
            if (!email) {
                setError("Email is required")
                return false
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                setError("Please enter a valid email address")
                return false
            }
            if (!password) {
                setError("Password is required")
                return false
            }
            if (password.length < 6) {
                setError("Password must be at least 6 characters")
                return false
            }
        } else {
            if (!secretId) {
                setError("Secret ID is required")
                return false
            }
            if (!secretId.startsWith("CP-")) {
                setError("Invalid Secret ID format (CP-XXXXXX)")
                return false
            }
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!validateForm()) return

        try {
            if (loginMethod === "email") {
                await login(email, password)
            } else {
                await loginWithId(secretId)
            }
            // login in auth-context already redirects to /dashboard
        } catch (err: any) {
            setError(err.message || "Invalid credentials. Please try again.")
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 pt-20">
            <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
                <div className="absolute inset-0 z-0 opacity-10 grayscale pointer-events-none">
                    <Image
                        src="/images/core/logo.png"
                        alt="Background Pattern"
                        width={400}
                        height={400}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                </div>

                <Card className="w-full max-w-md relative z-10 border-none shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] rounded-[2.5rem] bg-white overflow-hidden">
                    <CardHeader className="space-y-4 pt-10">
                        <div className="flex justify-center">
                            <Link href="/" className="inline-flex items-center gap-2">
                                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
                                    <Image src="/images/core/logo.png" alt="Logo" width={40} height={40} className="object-cover scale-125" />
                                </div>
                                <div className="text-left">
                                    <span className="font-black text-[#0B1F3A] text-xl tracking-tight block">CareerPilot</span>
                                    <span className="text-[10px] font-black text-[#1FA774] uppercase tracking-widest block">Salone</span>
                                </div>
                            </Link>
                        </div>
                        <div className="text-center">
                            <CardTitle className="text-3xl font-black text-[#0B1F3A]">Welcome Back!</CardTitle>
                            <CardDescription className="text-slate-500 font-medium">Continue your career journey in Salone.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-10 pt-4">
                        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
                            <button
                                type="button"
                                onClick={() => setLoginMethod("email")}
                                className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${loginMethod === "email" ? "bg-white text-[#0B1F3A] shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                            >
                                Email
                            </button>
                            <button
                                type="button"
                                onClick={() => setLoginMethod("id")}
                                className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${loginMethod === "id" ? "bg-white text-[#0B1F3A] shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                            >
                                Secret ID
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <Alert variant="destructive" className="rounded-2xl border-red-100 bg-red-50 py-3">
                                    <AlertDescription className="text-red-800 font-bold text-[11px] uppercase tracking-wide">{error}</AlertDescription>
                                </Alert>
                            )}

                            {loginMethod === "email" ? (
                                <>
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
                                                className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:ring-[#1FA774]/20 focus:border-[#1FA774] font-medium"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between ml-1">
                                            <Label htmlFor="password" title="Password" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</Label>
                                            <Link href="#" className="text-[9px] font-black text-[#1FA774] uppercase tracking-widest hover:underline">
                                                Forgot?
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                disabled={loading}
                                                className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:ring-[#1FA774]/20 focus:border-[#1FA774] font-medium"
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <Label htmlFor="secretId" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secret User ID</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            id="secretId"
                                            type="text"
                                            placeholder="CP-XXXXXX"
                                            value={secretId}
                                            onChange={(e) => setSecretId(e.target.value.toUpperCase())}
                                            disabled={loading}
                                            className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:ring-[#1FA774]/20 focus:border-[#1FA774] font-bold tracking-widest"
                                            required
                                        />
                                    </div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide leading-tight px-1 mt-2">
                                        Tip: Your Secret ID was sent to your email and WhatsApp during registration.
                                    </p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-14 rounded-2xl bg-[#0B1F3A] hover:bg-slate-800 text-white font-black uppercase tracking-widest shadow-lg shadow-blue-900/10 group transition-all"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                                        <span>Verifying...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <span>Login Securely</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">New to CareerPilot Salone?</p>
                            <Link href="/signup">
                                <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-200 hover:bg-slate-50 hover:border-[#1FA774] text-[#0B1F3A] font-black uppercase tracking-widest transition-all">
                                    Create Account
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
