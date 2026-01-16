
"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { CoverLetterGenerator } from "@/components/cover-letter-generator"
import { Footer } from "@/components/footer"
import Image from "next/image"
<<<<<<< HEAD
=======
import { Sparkles, CheckCircle2 } from "lucide-react"
>>>>>>> 6431a66 (CareerPilot Salone: Full System Implementation (Squashed))

export default function CoverLetterPage() {
    return (
        <DashboardLayout>
<<<<<<< HEAD
            <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">

                {/* HERO SECTION */}
                <section className="relative rounded-3xl overflow-hidden bg-indigo-900 min-h-[300px] flex items-center shadow-lg group border-b-8 border-indigo-500">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/salone_digital_market.png"
                            alt="Cover Letter Office"
                            fill
                            className="object-cover brightness-25 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-indigo-900/80" />
                    </div>

                    <div className="relative z-20 w-full p-8 md:p-12 space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full backdrop-blur-md">
                            <span className="text-indigo-300 font-bold text-xs uppercase tracking-wide">System 3: Disposable Utility</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight font-sans capitalize">
                            Tactical <br /> <span className="text-indigo-400 brightness-110">Letter Engine</span>
                        </h1>
                        <p className="text-lg text-indigo-100 font-medium font-sans leading-relaxed border-l-4 border-indigo-500 pl-4">
                            Don't fall in love with a cover letter. Treat it like ammunition. Load the target, fire the letter, and move to the next opportunity.
                        </p>
                    </div>
                </section>

                <CoverLetterGenerator />

            </div>
            <Footer />
=======
            <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
                <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-block mb-4 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full">
                                <span className="text-indigo-700 font-bold text-xs uppercase tracking-widest">System 3: Disposable Utility</span>
                            </div>
                            <h1 className="text-5xl font-black mb-4 text-[#0B1F3A] tracking-tight">Tactical Letter Engine</h1>
                            <p className="text-lg text-slate-500 max-w-2xl mx-auto text-balance font-medium">
                                Don't fall in love with a cover letter. Treat it like ammunition. Load the target, fire the letter, and move to the next opportunity.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-2xl mx-auto">
                                <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                                    <div className="flex items-center justify-center gap-4 mb-3">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                                            <Sparkles className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <span className="text-4xl font-black text-[#0B1F3A]">AI</span>
                                    </div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Powered Synthesis</p>
                                </div>
                                <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-all">
                                    <div className="flex items-center justify-center gap-4 mb-3">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <span className="text-4xl font-black text-[#0B1F3A]">100%</span>
                                    </div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Disposable Logic</p>
                                </div>
                            </div>
                        </div>

                        <CoverLetterGenerator />
                    </div>
                </main>
                <Footer />
            </div>
>>>>>>> 6431a66 (CareerPilot Salone: Full System Implementation (Squashed))
        </DashboardLayout>
    )
}
