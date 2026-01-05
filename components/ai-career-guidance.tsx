"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Sparkles,
    Target,
    MapPin,
    GraduationCap,
    Compass,
    CheckCircle2,
    Lightbulb,
    ArrowRight,
    MessageSquare,
    Save,
    BookOpen,
    ShieldCheck
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AICareerGuidanceProps {
    userContext: {
        strengths: string[]
        interests: string[]
        location: string
        education: string
    }
    guidance: {
        careerPaths: Array<{
            title: string
            company?: string
        }>
        whyItFits: string[]
        nextSteps: string[]
        localOpportunities?: string[]
    }
    onFollowUp?: () => void
    onSave?: () => void
    onViewResources?: () => void
}

export function AICareerGuidance({
    userContext,
    guidance,
    onFollowUp,
    onSave,
    onViewResources
}: AICareerGuidanceProps) {
    return (
        <section className="mt-20 space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            {/* HEADER */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">AI Career Guidance</h2>
                </div>
                <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                    Get personalized career advice based on your skills, interests, and local opportunities.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT PANEL: User Context */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="p-8 rounded-[2.5rem] border-2 border-slate-50 bg-white shadow-xl space-y-8">
                        <div className="space-y-1">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Your Grounded Profile</h3>
                            <p className="text-xs text-slate-400 font-medium">This is what we're basing your guidance on.</p>
                        </div>

                        <div className="space-y-6">
                            {/* Strengths */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-slate-900">
                                    <Target className="w-4 h-4 text-orange-500" />
                                    <span className="text-xs font-black uppercase tracking-widest">Your Strengths</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {userContext.strengths.map((str, i) => (
                                        <Badge key={i} variant="outline" className="bg-orange-50/50 border-orange-100/50 text-orange-700 font-bold text-[10px] px-3 py-1">
                                            {str}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Interests */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-slate-900">
                                    <Compass className="w-4 h-4 text-emerald-500" />
                                    <span className="text-xs font-black uppercase tracking-widest">Your Interests</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {userContext.interests.map((int, i) => (
                                        <Badge key={i} variant="outline" className="bg-emerald-50/50 border-emerald-100/50 text-emerald-700 font-bold text-[10px] px-3 py-1">
                                            {int}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-900">
                                    <MapPin className="w-4 h-4 text-red-500" />
                                    <span className="text-xs font-black uppercase tracking-widest">Location</span>
                                </div>
                                <p className="text-sm font-bold text-slate-600 pl-6">{userContext.location}</p>
                            </div>

                            {/* Education */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-900">
                                    <GraduationCap className="w-4 h-4 text-blue-500" />
                                    <span className="text-xs font-black uppercase tracking-widest">Education</span>
                                </div>
                                <p className="text-sm font-bold text-slate-600 pl-6">{userContext.education}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* RIGHT PANEL: AI Guidance Output */}
                <div className="lg:col-span-8 space-y-8">
                    <Card className="p-10 rounded-[2.5rem] border-2 border-slate-50 bg-white shadow-2xl space-y-12">

                        {/* Recommended Career Paths */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Compass className="w-6 h-6 text-blue-600" />
                                <h4 className="text-xl font-black text-slate-900">Recommended Career Paths</h4>
                            </div>
                            <div className="grid gap-4">
                                {guidance.careerPaths.map((path, i) => (
                                    <div key={i} className="group flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
                                        <div className="space-y-1">
                                            <div className="font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase text-sm tracking-tight">{path.title}</div>
                                            {path.company && <div className="text-xs text-slate-400 font-medium">Potential in: {path.company}</div>}
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Why This Fits You */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Lightbulb className="w-6 h-6 text-yellow-500" />
                                <h4 className="text-xl font-black text-slate-900">Why This Fits You</h4>
                            </div>
                            <div className="space-y-4">
                                {guidance.whyItFits.map((reason, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-3 h-3 text-blue-600" />
                                        </div>
                                        <p className="text-slate-600 font-medium leading-relaxed">{reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next 3 Practical Steps */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <ArrowRight className="w-6 h-6 text-emerald-500" />
                                <h4 className="text-xl font-black text-slate-900">Next 3 Practical Steps</h4>
                            </div>
                            <div className="grid gap-4">
                                {guidance.nextSteps.map((step, i) => (
                                    <div key={i} className="flex items-center gap-5 p-6 rounded-2xl bg-emerald-50/30 border border-emerald-100/50">
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm font-black text-emerald-600">
                                            {i + 1}
                                        </div>
                                        <p className="text-slate-700 font-bold uppercase text-[11px] tracking-wide">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* INTERACTION BUTTONS */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                onClick={onFollowUp}
                                className="flex-1 h-14 rounded-2xl bg-slate-900 text-white font-black uppercase text-xs tracking-widest gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Ask Follow-up Question
                            </Button>
                            <Button
                                variant="outline"
                                onClick={onSave}
                                className="flex-1 h-14 rounded-2xl border-2 font-black uppercase text-xs tracking-widest gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Save Career Plan
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={onViewResources}
                                className="flex-1 h-14 rounded-2xl font-black uppercase text-xs tracking-widest gap-2 text-slate-400 hover:text-blue-600"
                            >
                                <BookOpen className="w-4 h-4" />
                                View Resources
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Trust & Ethics Indicator */}
            <div className="flex flex-col items-center justify-center gap-3 pt-10 border-t border-slate-100">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Human-AI Collaboration</span>
                </div>
                <p className="text-xs text-slate-400 font-medium italic text-center max-w-lg">
                    This guidance is generated by AI and designed to support — not replace — human decision-making.
                </p>
            </div>
        </section>
    )
}
