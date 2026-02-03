"use client"

import { useState } from "react"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, CheckCheck, ArrowRight } from "lucide-react"

interface WhatsAppMessage {
    id: number
    sender: "bot" | "user"
    content: string
    time: string
    buttons?: string[]
}

export default function WhatsAppPage() {
    const [messages] = useState<WhatsAppMessage[]>([
        {
            id: 1,
            sender: "bot",
            content:
                "👋 Welcome to *CareerPilot Salone*!\n\nI'm your AI career guide. I can help you with:\n\n1️⃣ Career Guidance\n2️⃣ Generate CV\n3️⃣ View Roadmap\n4️⃣ Find Jobs\n\nReply with a number to get started!",
            time: "10:30 AM",
        },
        {
            id: 2,
            sender: "user",
            content: "1",
            time: "10:31 AM",
        },
        {
            id: 3,
            sender: "bot",
            content:
                "Great! Let's discover your ideal career path. 🎯\n\nI'll ask you a few questions to understand your interests and skills better.\n\n*Question 1:* What subjects do you enjoy the most?",
            time: "10:31 AM",
            buttons: ["Math & Science", "Business", "Arts & Humanities", "Other"],
        },
        {
            id: 4,
            sender: "user",
            content: "Math & Science",
            time: "10:32 AM",
        },
        {
            id: 5,
            sender: "bot",
            content: "*Question 2:* What skills do you have?\n\nSelect all that apply:",
            time: "10:32 AM",
            buttons: ["Problem-solving", "Communication", "Technical Skills", "Leadership"],
        },
        {
            id: 6,
            sender: "user",
            content: "Problem-solving, Technical Skills",
            time: "10:33 AM",
        },
        {
            id: 7,
            sender: "bot",
            content:
                "Perfect! Based on your responses, here are *3 career paths* that match your profile:\n\n*1. Software Developer* 💻\nBuild apps and websites for businesses\n📍 Entry: Junior Developer\n💰 Salary: Le 3M-6M/month\n\n*2. Data Analyst* 📊\nAnalyze data to help businesses make decisions\n📍 Entry: Data Assistant\n💰 Salary: Le 2.5M-5M/month\n\n*3. Engineering Technician* ⚙️\nWork on technical projects and maintenance\n📍 Entry: Technician Trainee\n💰 Salary: Le 2M-4M/month\n\nReply with a number to see the roadmap for that career!",
            time: "10:33 AM",
        },
    ])

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 bg-gradient-to-br from-secondary/10 via-background to-primary/10 py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
                            <MessageCircle className="w-8 h-8 text-secondary-foreground" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-gradient-salone uppercase tracking-tight mb-4">WhatsApp Bot Integration</h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
                            Experience how CareerPilot Salone works on WhatsApp. Get career guidance, generate CVs, and track your
                            roadmap—all through simple chat messages.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* WhatsApp Chat Mockup */}
                        <div>
                            <Card className="overflow-hidden shadow-lg">
                                {/* WhatsApp Header */}
                                <div className="bg-secondary text-secondary-foreground p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-secondary-foreground/20 rounded-full flex items-center justify-center">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">CareerPilot Salone</h3>
                                        <p className="text-xs opacity-90">Online</p>
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div
                                    className="bg-[#e5ddd5] p-4 space-y-3 h-[600px] overflow-y-auto"
                                    style={{
                                        backgroundImage:
                                            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZTVkZGQ1Ij48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNkOWQyYzgiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')",
                                    }}
                                >
                                    {messages.map((msg) => (
                                        <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                            <div
                                                className={`max-w-[80%] rounded-lg p-3 ${msg.sender === "bot" ? "bg-white shadow-sm" : "bg-[#dcf8c6] shadow-sm ml-auto"
                                                    }`}
                                            >
                                                <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>

                                                {msg.buttons && (
                                                    <div className="mt-3 space-y-2">
                                                        {msg.buttons.map((button, idx) => (
                                                            <Button
                                                                key={idx}
                                                                variant="outline"
                                                                size="sm"
                                                                className="w-full bg-white hover:bg-gray-50 text-xs"
                                                            >
                                                                {button}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-end gap-1 mt-1">
                                                    <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                                                    {msg.sender === "user" && <CheckCheck className="w-3 h-3 text-blue-500" />}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Input Area */}
                                <div className="bg-[#f0f0f0] p-3 flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="flex-1 bg-white rounded-full px-4 py-2 text-sm outline-none"
                                        disabled
                                    />
                                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                                        <MessageCircle className="w-4 h-4 text-secondary-foreground" />
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Features */}
                        <div className="space-y-6">
                            <Card className="p-6">
                                <h2 className="text-2xl font-bold mb-4">WhatsApp Bot Features</h2>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-primary font-semibold">1</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Interactive Career Guidance</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Answer guided questions to receive personalized career recommendations
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-secondary font-semibold">2</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">CV Generation</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Build and receive your professional CV directly in WhatsApp
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-accent font-semibold">3</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Career Roadmap</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Get daily/weekly tasks and track your progress via messages
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-primary font-semibold">4</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Job Alerts</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Receive notifications about relevant job opportunities
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-secondary/5 border-secondary/20">
                                <Badge className="mb-3">Coming Soon</Badge>
                                <h3 className="font-semibold text-lg mb-2">Get Started with WhatsApp</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Our WhatsApp bot integration will be available soon. Join the waitlist to be notified when it
                                    launches!
                                </p>
                                <Button className="w-full gap-2">
                                    Join WhatsApp Waitlist
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Card>

                            <Card className="p-6">
                                <h3 className="font-semibold mb-3">Why Use WhatsApp?</h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex gap-2">
                                        <span className="text-secondary">✓</span>
                                        <span>No app download required</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-secondary">✓</span>
                                        <span>Works on any phone with WhatsApp</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-secondary">✓</span>
                                        <span>Get instant notifications and reminders</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-secondary">✓</span>
                                        <span>Simple conversational interface</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-secondary">✓</span>
                                        <span>Access career guidance anywhere, anytime</span>
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
