"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { CoverLetterGenerator } from "@/components/cover-letter-generator"
import { Footer } from "@/components/footer"
import Image from "next/image"


export default function CoverLetterPage() {
    return (
        <DashboardLayout>

            <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">

                {/* HERO SECTION */}
                <section className="relative rounded-3xl overflow-hidden min-h-[300px] flex items-center shadow-lg group border border-slate-100">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/sections/african_career_success.png"
                            alt="Cover Letter Office"
                            fill
                            priority
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    <div className="relative z-20 w-full p-8 md:p-12 space-y-4 max-w-2xl bg-black/20 backdrop-blur-[2px] rounded-r-[3rem] my-4 ml-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-indigo-100 rounded-full shadow-sm">
                            <span className="text-indigo-700 font-bold text-xs uppercase tracking-wide">System 3: Disposable Utility</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight font-sans capitalize drop-shadow-lg">
                            Tactical <br /> <span className="text-gradient-salone brightness-150">Letter Engine</span>
                        </h1>
                        <p className="text-lg text-white font-bold font-sans leading-relaxed border-l-4 border-white pl-4 bg-black/10 p-2 rounded-r-lg drop-shadow-md">
                            Don't fall in love with a cover letter. Treat it like ammunition. Load the target, fire the letter, and move to the next opportunity.
                        </p>
                    </div>
                </section>

                <CoverLetterGenerator />

            </div>
            <Footer />

        </DashboardLayout>
    )
}

