"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import {
    ArrowLeft,
    FileText,
    Target,
    Sparkles,
    LogOut,
    User,
    Settings,
    HelpCircle,
    Briefcase,
    GraduationCap,
    Map
} from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export default function MenuPage() {
    const { user, logout } = useAuth()

    const menuItems = [
        {
            title: "Tools & Resources",
            items: [
                {
                    label: "CV Builder",
                    description: "Create a professional CV",
                    icon: FileText,
                    href: "/cv-builder",
                    color: "text-orange-500",
                    bgColor: "bg-orange-50"
                },
                {
                    label: "Career Test",
                    description: "Discover your ideal path",
                    icon: Target,
                    href: "/aptitude-test",
                    color: "text-blue-500",
                    bgColor: "bg-blue-50"
                },
                {
                    label: "AI Guidance",
                    description: "Get personalized advice",
                    icon: Sparkles,
                    href: "/guidance",
                    color: "text-amber-500",
                    bgColor: "bg-amber-50"
                },
                {
                    label: "Career Roadmap",
                    description: "Step-by-step career path",
                    icon: Map,
                    href: "/roadmap",
                    color: "text-indigo-500",
                    bgColor: "bg-indigo-50"
                },
                {
                    label: "WhatsApp Assistant",
                    description: "Chat with us on WhatsApp",
                    icon: FaWhatsapp,
                    href: "/whatsapp",
                    color: "text-green-500",
                    bgColor: "bg-green-50"
                },
            ]
        },
        {
            title: "Opportunities",
            items: [
                {
                    label: "Find Jobs",
                    description: "Browse local job listings",
                    icon: Briefcase,
                    href: "/jobs",
                    color: "text-emerald-500",
                    bgColor: "bg-emerald-50"
                },
                {
                    label: "Scholarships",
                    description: "Find educational funding",
                    icon: GraduationCap,
                    href: "/scholarships",
                    color: "text-purple-500",
                    bgColor: "bg-purple-50"
                },
                {
                    label: "Universities",
                    description: "Explore local institutions",
                    icon: GraduationCap,
                    href: "/universities",
                    color: "text-blue-500",
                    bgColor: "bg-blue-50"
                }
            ]
        },

        {
            title: "Account",
            items: [
                {
                    label: "My Profile",
                    description: "Manage your details",
                    icon: User,
                    href: "/profile",
                    color: "text-slate-500",
                    bgColor: "bg-slate-50"
                },
                {
                    label: "Settings",
                    description: "App preferences",
                    icon: Settings,
                    href: "/settings",
                    color: "text-slate-500",
                    bgColor: "bg-slate-50"
                },
                {
                    label: "Help & Support",
                    description: "Get assistance",
                    icon: HelpCircle,
                    href: "/support",
                    color: "text-slate-500",
                    bgColor: "bg-slate-50"
                }
            ]
        }
    ]

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto pb-12 space-y-8">
                <div className="bg-[#0B1F3A] rounded-[2.5rem] p-10 mb-10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all" />
                    <div className="relative z-10 space-y-2">
                        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#1FA774] hover:text-white transition-colors mb-4">
                            <ArrowLeft className="w-4 h-4" /> Go Back
                        </Link>
                        <h1 className="text-4xl font-black text-white tracking-tight">App <span className="text-[#F4C430]">Menu</span></h1>
                        <p className="text-slate-400 font-medium">Access all CareerPilot tools and ecosystem settings.</p>
                    </div>
                </div>

                {menuItems.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pl-1">
                            {section.title}
                        </h2>
                        <Card className="overflow-hidden border-slate-200">
                            <div className="divide-y divide-slate-100">
                                {section.items.map((item, itemIdx) => (
                                    <Link href={item.href} key={itemIdx}>
                                        <div className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                                            <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center`}>
                                                <item.icon className={`w-5 h-5 ${item.color}`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-semibold text-slate-900">{item.label}</div>
                                                <div className="text-xs text-muted-foreground">{item.description}</div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </Card>
                    </div>
                ))}

                <Button
                    variant="destructive"
                    className="w-full rounded-xl py-6 gap-2 mt-8 font-bold"
                    onClick={logout}
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </Button>

                <div className="text-center text-xs text-muted-foreground pt-4 pb-8">
                    CareerPilot Salone v1.0.0
                </div>
            </div>
        </DashboardLayout >
    )
}
