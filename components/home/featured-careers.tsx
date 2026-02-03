"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Briefcase, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const FEATURED_CAREERS = [
    {
        title: "Software Developer",
        industry: "Technology",
        salary: "SLE 3,500 - 15,000+",
        growth: "High Demand",
        image: "/images/sections/careers/software-developer.png",
        href: "/careers/software-developer"
    },
    {
        title: "Agripreneur",
        industry: "Agriculture",
        salary: "SLE 2,500 - 15,000",
        growth: "Steady Growth",
        image: "/images/sections/careers/agripreneur.png",
        href: "/careers/agripreneur"
    },
    {
        title: "Mining Engineer",
        industry: "Mining",
        salary: "SLE 5,000 - 20,000",
        growth: "High Demand",
        image: "/images/sections/careers/mining-engineer.png",
        href: "/careers/mining-engineer"
    }
]

export function FeaturedCareersSection() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-[#0B1F3A] tracking-tight">
                            High-Growth Careers
                        </h2>
                        <p className="text-lg text-slate-600 max-w-xl">
                            Explore paths with real demand in Sierra Leone right now.
                        </p>
                    </div>
                    <Link href="/careers">
                        <Button variant="outline" className="rounded-full px-6 border-slate-200 hover:bg-[#0B1F3A] hover:text-white transition-colors">
                            View All 15+ Careers <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {FEATURED_CAREERS.map((career, i) => (
                        <Link href={career.href} key={i} className="group relative block h-[400px] overflow-hidden rounded-[2rem] shadow-lg">
                            <Image
                                src={career.image} // Note: Implementation plan should consider image existence, for now using placeholder names
                                alt={career.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/60 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full mb-3">
                                    <TrendingUp className="w-3 h-3 text-emerald-300" />
                                    <span className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest">{career.growth}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{career.title}</h3>
                                <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                                    <Briefcase className="w-4 h-4" />
                                    {career.industry}
                                </div>

                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                                    <div className="overflow-hidden">
                                        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                                            <span className="text-white text-xs font-bold uppercase tracking-wide">Avg. Entry:</span>
                                            <span className="text-emerald-400 font-bold">{career.salary}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

