"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { UserPlus, Mail, Lock, User, Sparkles, ArrowRight, ShieldCheck, LogIn } from "lucide-react"
import { motion } from "framer-motion"

export default function SignupPage() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [generatedId, setGeneratedId] = useState("")
    const { signup, isLoading } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            // Updated context to return data or just handle internally
            // Since we want to show the ID here, we might need a way to get it from context or the fetch
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, fullName })
            })
            const data = await response.json()
            if (response.ok) {
                setGeneratedId(data.secretId)
                setIsSuccess(true)
                // We'll still call context signup to establish the local session
                await signup(email, password, fullName)
            } else {
                toast.error(data.error || "Signup failed")
            }
        } catch (err) {
            toast.error("An error occurred during signup.")
        }
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white rounded-[2.5rem] p-10 text-center shadow-2xl border border-slate-100"
                >
                    <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Account Created!</h2>
                    <p className="text-slate-500 mb-8 font-medium">Your account and profile have been secured.</p>

                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 border-2 border-dashed border-slate-200">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Your Secret Login ID</p>
                        <div className="text-4xl font-mono font-black text-[#0B1F3A] tracking-widest">
                            {generatedId}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-xs text-slate-400 font-bold uppercase leading-relaxed text-left bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <strong>Note:</strong> We've sent this to your email, but please screenshot or save it now for quick access!
                        </p>

                        <Button
                            onClick={() => window.location.href = "/onboarding"}
                            className="w-full h-14 bg-[#0B1F3A] hover:bg-slate-800 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all active:scale-95"
                        >
                            Complete My Profile
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[450px]"
            >
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
                            <Image src="/images/core/logo.png" alt="Logo" width={40} height={40} className="object-cover scale-125" />
                        </div>
                        <div className="text-left">
                            <span className="font-black text-[#0B1F3A] text-xl tracking-tight block">CareerPilot</span>
                            <span className="text-[10px] font-black text-[#1FA774] uppercase tracking-widest block">Salone</span>
                        </div>
                    </Link>
                    <h1 className="text-3xl font-black text-[#0B1F3A] mb-2">Create Account</h1>
                    <p className="text-slate-500 font-medium">Start your professional future today.</p>
                </div>

                <Card className="p-8 border-none shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] rounded-[2.5rem] bg-white">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    type="text"
                                    placeholder="e.g. Samuel Bangura"
                                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:ring-[#1FA774]/20 focus:border-[#1FA774] font-medium"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:ring-[#1FA774]/20 focus:border-[#1FA774] font-medium"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Set Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:ring-[#1FA774]/20 focus:border-[#1FA774] font-medium"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <div className="bg-emerald-50 border border-emerald-100/50 p-4 rounded-2xl flex items-start gap-3">
                            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-tight leading-normal">
                                After signup, you&apos;ll receive a unique <span className="underline">Secret ID</span> for quick access. Keep it safe!
                            </p>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl bg-[#0B1F3A] hover:bg-slate-800 text-white font-black uppercase tracking-widest shadow-lg shadow-blue-900/10 group transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <span>Create My Account</span>
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Already registered?</p>
                        <Link href="/login" className="text-xs font-black text-[#1FA774] uppercase tracking-widest hover:underline flex items-center justify-center gap-2">
                            <LogIn className="w-4 h-4" />
                            Sign in to your account
                        </Link>
                    </div>
                </Card>

                <div className="mt-8 text-center px-4">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                        By creating an account, you agree to our <Link href="/terms" className="text-[#0B1F3A] underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#0B1F3A] underline">Privacy Policy</Link>.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
