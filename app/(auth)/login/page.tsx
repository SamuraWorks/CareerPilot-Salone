"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { LogIn, Mail, Lock, Sparkles, ArrowRight, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [secretId, setSecretId] = useState("")
    const [loginMethod, setLoginMethod] = useState<"email" | "id">("email")
    const { login, loginWithId, isLoading } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (loginMethod === "email") {
            await login(email, password)
        } else {
            await loginWithId(secretId)
        }
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
                    <h1 className="text-3xl font-black text-[#0B1F3A] mb-2">Welcome Back!</h1>
                    <p className="text-slate-500 font-medium">Continue your career journey in Salone.</p>
                </div>

                <Card className="p-8 border-none shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] rounded-[2.5rem] bg-white">
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
                        <button
                            onClick={() => setLoginMethod("email")}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${loginMethod === "email" ? "bg-white text-[#0B1F3A] shadow-sm" : "text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            Email Login
                        </button>
                        <button
                            onClick={() => setLoginMethod("id")}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${loginMethod === "id" ? "bg-white text-[#0B1F3A] shadow-sm" : "text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            Secret ID
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {loginMethod === "email" ? (
                            <>
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
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                                        <Link href="#" className="text-[9px] font-black text-[#1FA774] uppercase tracking-widest hover:underline">Forgot?</Link>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:ring-[#1FA774]/20 focus:border-[#1FA774] font-medium"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secret User ID</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        type="text"
                                        placeholder="CP-XXXXXX"
                                        className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:ring-[#1FA774]/20 focus:border-[#1FA774] font-bold tracking-widest"
                                        value={secretId}
                                        onChange={(e) => setSecretId(e.target.value.toUpperCase())}
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
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
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
                            <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-200 hover:bg-slate-50 hover:border-[#1FA774] text-[#0B1F3A] font-black uppercase tracking-widest transition-all gap-2">
                                <Sparkles className="w-4 h-4 text-[#1FA774]" />
                                Create Account
                            </Button>
                        </Link>
                    </div>
                </Card>

                <div className="mt-8 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        © 2026 CareerPilot Salone • Secure Access
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
