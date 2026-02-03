"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { ResearchQuestionnaire } from "@/components/dashboard/research-questionnaire"
import { Button } from "@/components/ui/button"
import {
    Settings as SettingsIcon,
    HelpCircle,
    BookOpen,
    LogOut,
    ShieldCheck,
    Zap,
    ChevronRight,
    MessageSquare
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
    const { profile, logout, isLoading } = useAuth()

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex h-[60vh] items-center justify-center">
                    <Zap className="w-8 h-8 animate-spin text-emerald-500" />
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-8 pb-20">
                {/* Header */}
                <div className="flex items-center gap-4 pt-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#0B1F3A] flex items-center justify-center text-white shadow-lg">
                        <SettingsIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[#0B1F3A] uppercase tracking-tight">Settings</h1>
                        <p className="text-slate-500 font-medium">Manage your profile and platform preferences</p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Questionnaire & Profile Status */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 1. Research & Preferences */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2 px-2">
                                <Zap className="w-5 h-5 text-emerald-500" />
                                <h2 className="text-xl font-bold text-[#0B1F3A]">Experience Tuning</h2>
                            </div>
                            <ResearchQuestionnaire forceVisible={true} />
                        </section>

                        {/* 2. Account Information */}
                        <Card className="rounded-[2rem] border-slate-100 shadow-xl overflow-hidden">
                            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                                    Identity & Security
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Public Pilot ID</p>
                                        <code className="text-sm font-mono font-bold text-[#0B1F3A] bg-slate-100 px-2 py-1 rounded">
                                            {profile.id || profile.anon_id}
                                        </code>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Session Type</p>
                                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 font-bold uppercase tracking-tight text-[10px]">
                                            {profile.id?.startsWith('pilot_') ? 'Anonymous Session' : 'Authenticated Profile'}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <Button
                                        variant="destructive"
                                        className="rounded-xl font-bold uppercase tracking-widest text-[10px] h-10 px-6 shadow-md"
                                        onClick={logout}
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        End Current Session
                                    </Button>
                                    <p className="text-[10px] text-slate-400 mt-2 italic">* Clearing your session will remove all local data and roadmaps unless backed up to an ID.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Quick Links & Resources */}
                    <div className="space-y-6">
                        <Card className="rounded-[2rem] border-slate-100 shadow-xl p-6 bg-[#0B1F3A] text-white overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 space-y-4">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="font-black text-lg uppercase tracking-tight">Resources Hub</h3>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed">Access tutorials, guides, and localized career data for Sierra Leone.</p>
                                </div>
                                <Link href="/resources" className="block">
                                    <Button className="w-full bg-white text-[#0B1F3A] hover:bg-emerald-500 hover:text-white rounded-xl font-black uppercase tracking-widest text-[10px] h-10 transition-all">
                                        Explore Library
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </Card>

                        <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Support & Feedback</h4>
                            <div className="space-y-2">
                                <Link href="/faq" className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <HelpCircle className="w-5 h-5 text-blue-500" />
                                        <span className="font-bold text-sm text-[#0B1F3A]">Platform FAQ</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                                </Link>

                                <Link href="https://whatsapp.com/channel/0029VbCMtxy0LKZ52WwcjH0r" className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare className="w-5 h-5 text-emerald-600" />
                                        <span className="font-bold text-sm text-[#0B1F3A]">WhatsApp Support</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                                </Link>
                            </div>
                        </div>

                        <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 text-center space-y-2">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">CareerPilot Salone v1.5.2</p>
                            <p className="text-[10px] text-slate-500 font-medium">Handcrafted with ❤️ in Freetown for the next generation of scholars.</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
