"use client"

import Image from "next/image"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
    return (
        <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
                        Building the Next Generation <br /> of Salone Leaders
                    </h2>
                    <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            text: "I didn't know whether to study IT or Business. CareerPilot showed me that 'Tech Entrepreneurship' was a real path and gave me a roadmap.",
                            author: "Mohamed K.",
                            role: "Student, FBC",
                            image: "/images/sections/scholars/scholar_1.png"
                        },
                        {
                            text: "The mentor connection is real. I actually spoke to a senior engineer at Orange who guided me on my final year project.",
                            author: "Fatmata S.",
                            role: "Graduate, UNIMAK",
                            image: "/images/sections/scholars/scholar_2.png"
                        },
                        {
                            text: "This is exactly what we needed. A tool that tells us the truth about the job market and helps us prepare.",
                            author: "Abdulai J.",
                            role: "Job Seeker, Freetown",
                            image: "/images/sections/scholars/scholar_3.png"
                        }
                    ].map((t, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl relative hover:bg-white/10 transition-colors">
                            <Quote className="absolute top-8 right-8 w-8 h-8 text-emerald-500/20" />
                            <p className="text-slate-300 italic mb-8 relative z-10">"{t.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border-2 border-emerald-500 p-0.5">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 relative">
                                        <Image
                                            src={t.image}
                                            alt={t.author}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{t.author}</h4>
                                    <p className="text-emerald-400 text-xs uppercase tracking-wider">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

