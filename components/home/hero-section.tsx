"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Target } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { useProfile } from "@/lib/profile-context"

export function HeroSection() {
    const { user } = useAuth()
  const { profile } = useProfile()
    return (
        <section className="relative min-h-[75vh] flex flex-col items-center justify-center py-16 overflow-hidden bg-gradient-to-br from-blue-600 to-emerald-400">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="max-w-3xl text-center lg:text-left space-y-8">
                        {/* Logo in Hero */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex justify-center lg:justify-start mb-4"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-2xl border border-white/20 p-2">
                                <Image src="/images/core/logo.png" alt="Logo" width={48} height={48} className="object-cover scale-110" />
                            </div>
                        </motion.div>

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full backdrop-blur-md"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                            <span className="text-white font-bold text-xs uppercase tracking-widest">
                                The #1 AI Career Engine for Salone 🇸🇱
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] sm:leading-none font-sans"
                        >
                            Navigate Your <br className="block" /> Career Path in <br className="hidden sm:block" />
                            <span className="inline-block bg-emerald-500 text-white px-3 sm:px-4 py-1 rounded-2xl decoration-clone mt-2 lg:mt-4">
                                Sierra Leone
                            </span>
                        </motion.h1>

                        {/* Subhead */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-base sm:text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            Discover personalized career recommendations, build professional CVs, and follow structured roadmaps to achieve your career goals.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-8"
                        >
                            <Link href={profile.is_complete ? "/dashboard" : "/onboarding"} className="w-full sm:w-auto">
                                <Button size="lg" className="h-14 px-8 rounded-full bg-white text-blue-600 hover:bg-slate-100 font-bold text-lg shadow-xl transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto gap-2">
                                    {profile.is_complete ? "Go to Dashboard" : "Start Now"}
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            {/* REMOVED: Login Button from Hero if it existed, optimizing for single primary action */}
                        </motion.div>

                        {/* Social Proof */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="pt-12 flex items-center justify-center lg:justify-start gap-2"
                        >
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-blue-500 bg-slate-200 overflow-hidden relative">
                                        <Image
                                            src={`/images/sections/scholars/scholar_${i}.png`}
                                            alt="Scholar"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs font-medium text-blue-100">
                                Trusted by <span className="text-white font-bold">12,000+</span> students
                            </p>
                        </motion.div>
                    </div>

                    {/* Hero Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                        className="hidden lg:block relative w-[45%] aspect-square"
                    >
                        <div className="absolute inset-0 bg-white/10 rounded-[3rem] rotate-6 blur-2xl" />
                        <div className="relative w-full h-full rounded-[4rem] overflow-hidden border-8 border-white/10 shadow-3xl bg-white/5 backdrop-blur-sm p-4">
                            <Image
                                src="/images/hero/hero.png"
                                alt="Career Navigator Instance"
                                fill
                                priority
                                className="object-contain p-4 drop-shadow-2xl"
                            />
                        </div>

                        {/* Floating elements for extra WOW factor */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 p-6 bg-white rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-4 z-20"
                        >
                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Match Accuracy</p>
                                <p className="text-lg font-black text-slate-900">98.4%</p>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-10 -left-10 p-6 bg-slate-900 rounded-3xl shadow-2xl border border-white/10 flex items-center gap-4 z-20"
                        >
                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Mentors Online</p>
                                <p className="text-lg font-black text-white">450+</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

