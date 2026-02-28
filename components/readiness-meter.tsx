
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, Lock, ArrowRight, Target, Trophy } from "lucide-react"
import { calculateReadiness, ReadinessReport } from "@/lib/readiness-engine"
import { UserProfile } from "@/lib/cv-logic-engine"
import { useAuth } from "@/lib/auth-context"
import { useProfile } from "@/lib/profile-context"
import Link from "next/link"

export function ReadinessMeter() {
    const { profile } = useProfile()
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
        <Card className="p-10 border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] bg-white rounded-[3rem] relative overflow-hidden group">
            {/* Background Decoration - Animated */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-20 ${getStateBg(report.score)} -translate-y-1/2 translate-x-1/3`}
            />

            <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start">

                {/* GAUGE SECTION */}
                <div className="flex-1 space-y-6 min-w-[300px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-2xl ${getStateBg(report.score)} bg-opacity-10 flex items-center justify-center shadow-inner`}>
                                <Target className={`w-7 h-7 ${getStateColor(report.score)}`} />
                            </div>
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-800 italic">Market readiness</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Vector: {targetRole}</p>
                            </div>
                        </div>
                        <Badge variant="outline" className={`${getStateColor(report.score)} border-current bg-transparent font-black px-4 py-1.5 uppercase tracking-widest text-[10px] rounded-full`}>
                            {report.state} ({report.score}%)
                        </Badge>
                    </div>

                    <div className="space-y-4">
                        <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 shadow-inner">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${report.score}%` }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className={`h-full rounded-full ${getStateBg(report.score)} shadow-[0_0_20px_rgba(0,0,0,0.1)]`}
                            />
                        </div>
                        <p className="text-xs text-slate-400 font-bold italic tracking-tight leading-relaxed">
                            {report.score < 50
                                ? "Critical: High Rejection Risk detected in current trajectory. Structural augmentation required."
                                : report.score < 80
                                    ? "Alert: Optimal baseline achieved. Refine high-value assets for market penetration."
                                    : "Status: Prime Candidate status confirmed. Deploy applications immediately."
                            }
                        </p>
                    </div>
                </div>

                {/* ACTION / ROADMAP SECTION */}
                <div className="flex-1 w-full border-t lg:border-t-0 lg:border-l border-slate-100/80 pt-10 lg:pt-2 lg:pl-12">
                    {report.score >= 70 ? (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-emerald-600">
                                <Trophy className="w-6 h-6" />
                                <span className="font-black text-sm uppercase tracking-widest italic">Verification Success</span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium leading-[1.6] italic">
                                Your profile authority unlocks the **Neural Application Engine**. You can now generate high-impact, tactical cover letters.
                            </p>
                            <Link href="/cover-letter" className="inline-flex w-full">
                                <Button className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-emerald-500/30 rounded-2xl group active:scale-95 transition-all">
                                    Launch Application Mode <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <div className="flex items-center gap-3 text-[#1E5EFF]">
                                <Lock className="w-5 h-5" />
                                <span className="font-black text-xs uppercase tracking-[0.3em] italic">Gap Closing Sequence Required</span>
                            </div>
                            <ul className="space-y-3">
                                {report.roadmap.map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        whileHover={{ x: 5 }}
                                        className="flex items-start gap-4 text-xs text-slate-600 font-bold bg-slate-50/50 p-4 rounded-2xl border border-transparent hover:border-[#1E5EFF]/10 hover:bg-white hover:shadow-xl transition-all group/item"
                                    >
                                        <AlertCircle className="w-4 h-4 text-[#1E5EFF] shrink-0 mt-0.5" />
                                        <span className="leading-relaxed italic tracking-tight">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                            <div className="pt-2">
                                <p className="text-[9px] text-slate-300 font-black uppercase tracking-[0.4em] text-center italic mt-4">Profile integrity verification in progress</p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </Card>
    )
}
