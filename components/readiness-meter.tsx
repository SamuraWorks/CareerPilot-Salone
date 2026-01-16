
"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, Lock, ArrowRight, Target, Trophy } from "lucide-react"
import { calculateReadiness, ReadinessReport } from "@/lib/readiness-engine"
import { UserProfile } from "@/lib/cv-logic-engine"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"

export function ReadinessMeter() {
    const { profile } = useAuth()
    const [report, setReport] = useState<ReadinessReport | null>(null)
    const [targetRole, setTargetRole] = useState("")

    useEffect(() => {
        if (profile) {
            const role = profile.careerGoal || "Professional"
            setTargetRole(role)

            const userProfile: UserProfile = {
                status: profile.status || 'student',
                yearsExperience: 2, // Would calculate from real data in full integration
                targetRole: role,
                skills: profile.hardSkills || [],
                projectCount: 1 // Default Assumption
            }

            const res = calculateReadiness(userProfile, role)
            setReport(res)
        }
    }, [profile])

    if (!report) return null

    const getStateColor = (score: number) => {
        if (score < 40) return "text-red-500"
        if (score < 70) return "text-amber-500"
        return "text-emerald-500"
    }

    const getStateBg = (score: number) => {
        if (score < 40) return "bg-red-500"
        if (score < 70) return "bg-amber-500"
        return "bg-emerald-500"
    }

    return (
        <Card className="p-6 border-none shadow-xl bg-white rounded-3xl relative overflow-hidden group">
            {/* Background Decoration */}
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 ${getStateBg(report.score)} -translate-y-1/2 translate-x-1/3`} />

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">

                {/* GAUGE SECTION */}
                <div className="flex-1 space-y-4 min-w-[300px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${getStateBg(report.score)} bg-opacity-10 flex items-center justify-center`}>
                                <Target className={`w-5 h-5 ${getStateColor(report.score)}`} />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Market Readiness</h3>
                                <p className="text-xs text-slate-500 font-medium">Target: {targetRole}</p>
                            </div>
                        </div>
                        <Badge variant="outline" className={`${getStateColor(report.score)} border-current bg-transparent font-bold px-3 py-1 uppercase`}>
                            {report.state} ({report.score}%)
                        </Badge>
                    </div>

                    <div className="space-y-2">
                        <Progress value={report.score} className="h-4 rounded-full bg-slate-100" />
                        <p className="text-xs text-slate-400 font-medium italic">
                            {report.score < 50 ? "⚠️ High Rejection Risk. Focus on Closing Gaps." : report.score < 80 ? "⚡ Good Match. Polish assets before applying." : "🚀 Prime Candidate. Apply aggressively."}
                        </p>
                    </div>
                </div>

                {/* ACTION / ROADMAP SECTION */}
                <div className="flex-1 w-full border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                    {report.score >= 70 ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-emerald-600">
                                <Trophy className="w-5 h-5" />
                                <span className="font-bold text-sm">You are Market Ready!</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Your profile strength unlocks the Application Engine. Generate targeted cover letters now.
                            </p>
                            <Link href="/cover-letter" className="inline-flex">
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-xs tracking-wide shadow-lg shadow-emerald-500/20">
                                    Launch Application Mode <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-amber-600">
                                <Lock className="w-4 h-4" />
                                <span className="font-bold text-xs uppercase tracking-wide">Gap Closing Required</span>
                            </div>
                            <ul className="space-y-2">
                                {report.roadmap.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-medium bg-slate-50 p-2 rounded-lg">
                                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-2">
                                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider text-center">Complete tasks to unlock tools</p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </Card>
    )
}
