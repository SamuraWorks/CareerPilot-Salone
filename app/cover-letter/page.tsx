
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
        </DashboardLayout>
    )
}
