"use client"

import { motion } from "framer-motion"
import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function AIPreviewSection() {
    const messages = [
        {
            role: "user",
            content: "I want to be a Software Engineer, but I'm worried about finding a job in Freetown.",
        },
        {
            role: "assistant",
            content: "That's a valid concern. The tech scene in Freetown is growing, but competitive. \n\n**Here's the Radical Reality:**\nYou need more than just a degree. Local employers like Africell and Orange look for **portfolios**. \n\nI recommend starting with the **Full Stack Web Dev** roadmap and building a project for a local SME.",
        },
    ]

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-widest">
                                CareerPilot Intelligence v6.0
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-[#0B1F3A] tracking-tight leading-tight">
                            Honest Advice. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                Radical Reality.
                            </span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Most career advice is generic. Ours is built on the ground truth of Sierra Leone's economy.
                            Our AI doesn't just cheerlead—it gives you the hard facts, the missing skills, and the
                            exact roadmap to bridge the gap.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 pt-4">
                            {[
                                { label: "Deterministic Matching", desc: "Based on RIASEC & Salone Job Data" },
                                { label: "Localized Context", desc: "Knows FBC, UNIMAK, & Local Employers" },
                                { label: "Gap Analysis", desc: "Identifies exactly what skills you lack" },
                                { label: "24/7 Availability", desc: "Guidance whenever you need it" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="w-1 h-full bg-blue-200 rounded-full" />
                                    <div>
                                        <h4 className="font-bold text-[#0B1F3A] text-sm">{item.label}</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Interface Preview */}
                    <div className="relative">
                        {/* Decorative Image */}
                        <div className="absolute -top-10 -right-10 w-[120%] h-[120%] opacity-20 pointer-events-none">
                            <img src="/images/sections/ai-chatbot-career-guidance.jpg" className="w-full h-full object-cover blur-3xl opacity-30" alt="AI Background" />
                        </div>

                        <div className="bg-white rounded-2xl shadow-2xl shadow-blue-900/10 border border-slate-100 overflow-hidden relative z-10 max-w-md mx-auto transform rotate-1 transition-transform hover:rotate-0 duration-500">
                            {/* Header */}
                            <div className="bg-[#0B1F3A] p-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">CareerPilot AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        <span className="text-xs text-slate-300">Online | Ready to help</span>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="p-6 space-y-6 bg-slate-50/50 min-h-[300px]">
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2 + 0.3 }}
                                        className={cn(
                                            "flex gap-3 max-w-[90%]",
                                            msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                            msg.role === "user" ? "bg-slate-200" : "bg-emerald-100"
                                        )}>
                                            {msg.role === "user" ? <User className="w-4 h-4 text-slate-600" /> : <Bot className="w-4 h-4 text-emerald-600" />}
                                        </div>
                                        <div className={cn(
                                            "p-3 rounded-2xl text-sm leading-relaxed",
                                            msg.role === "user"
                                                ? "bg-[#0B1F3A] text-white rounded-tr-none"
                                                : "bg-white border border-slate-100 shadow-sm text-slate-700 rounded-tl-none whitespace-pre-wrap"
                                        )}>
                                            {msg.content}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Input Fake */}
                            <div className="p-4 bg-white border-t border-slate-100">
                                <div className="h-10 bg-slate-100 rounded-full w-full flex items-center px-4 text-xs text-slate-400">
                                    Ask a question about your career...
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

