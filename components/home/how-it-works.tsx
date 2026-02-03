"use client"

import { Search, Map, Users, ArrowRight } from "lucide-react"

export function HowItWorksSection() {
    const steps = [
        {
            icon: Search,
            title: "Discover Your Path",
            description: "Take the localized RIASEC assessment to match your personality with real opportunities in Sierra Leone.",
            color: "bg-blue-500"
        },
        {
            icon: Map,
            title: "Get the Roadmap",
            description: "Access step-by-step guides showing exactly which courses to take, skills to learn, and degrees to pursue.",
            color: "bg-emerald-500"
        },
        {
            icon: Users,
            title: "Connect & Grow",
            description: "Find mentors from your field and access verified job listings and scholarship opportunities.",
            color: "bg-cyan-500"
        }
    ]

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-[#0B1F3A] tracking-tight">
                        How It Works
                    </h2>
                    <p className="text-lg text-slate-600">
                        A simple, data-driven process to take you from uncertainty to employment.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10" />

                    {steps.map((step, i) => (
                        <div key={i} className="flex flex-col items-center text-center group">
                            <div className={`w-24 h-24 rounded-3xl ${step.color} shadow-xl shadow-slate-200 flex items-center justify-center mb-8 rotate-3 group-hover:rotate-6 transition-transform duration-300`}>
                                <step.icon className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0B1F3A] mb-3">{step.title}</h3>
                            <p className="text-slate-500 leading-relaxed max-w-xs">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
