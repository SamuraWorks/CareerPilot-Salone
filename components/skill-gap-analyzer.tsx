"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, AlertCircle, ArrowRight, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SkillGapAnalyzerProps {
    currentSkills: string[]
    targetCareer: {
        title: string
        requiredSkills: string[]
    }
}

export function SkillGapAnalyzer({ currentSkills, targetCareer }: SkillGapAnalyzerProps) {
    // Normalize strings for comparison
    const normalize = (s: string) => s.toLowerCase().trim()

    const hasSkill = (skill: string) =>
        currentSkills.some(s => normalize(s) === normalize(skill))

    const missingSkills = targetCareer.requiredSkills.filter(s => !hasSkill(s))
    const matchCount = targetCareer.requiredSkills.length - missingSkills.length
    const matchPercentage = Math.round((matchCount / targetCareer.requiredSkills.length) * 100)

    return (
        <Card className="p-6 border-slate-200">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-900">Skill Gap Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                        Match for <span className="font-semibold text-primary">{targetCareer.title}</span>
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black text-primary">{matchPercentage}%</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Match</div>
                </div>
            </div>

            <Progress value={matchPercentage} className="h-2 mb-8 bg-slate-100" />

            <div className="grid md:grid-cols-2 gap-8">
                {/* Skills You Have */}
                <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-green-700 uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" /> Skills You Have
                    </h4>
                    <div className="space-y-2">
                        {targetCareer.requiredSkills.filter(s => hasSkill(s)).map((skill, i) => (
                            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-green-50 border border-green-100 text-sm font-medium text-green-800">
                                <CheckCircle2 className="w-3.5 h-3.5 opacity-60" />
                                {skill}
                            </div>
                        ))}
                        {targetCareer.requiredSkills.filter(s => hasSkill(s)).length === 0 && (
                            <div className="text-sm text-muted-foreground italic p-2">No matching skills yet.</div>
                        )}
                    </div>
                </div>

                {/* Skills You Need */}
                <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-orange-700 uppercase tracking-wider">
                        <AlertCircle className="w-4 h-4" /> Skills To Learn
                    </h4>
                    <div className="space-y-2">
                        {missingSkills.map((skill, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-orange-50 border border-orange-100 text-sm font-medium text-orange-800">
                                <div className="flex items-center gap-2">
                                    <XCircle className="w-3.5 h-3.5 opacity-60" />
                                    {skill}
                                </div>
                                {/* Placeholder for future "Learn" link */}
                                {/* <Link href={`/learn?q=${skill}`}>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px] text-orange-700 hover:text-orange-900 hover:bg-orange-100/-50">
                    Learn <ArrowRight className="w-2 h-2 ml-1" />
                  </Button>
                </Link> */}
                            </div>
                        ))}
                        {missingSkills.length === 0 && (
                            <div className="text-sm text-muted-foreground italic p-2">You have all required skills! 🚀</div>
                        )}
                    </div>
                </div>
            </div>

            {missingSkills.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                    <Link href="/roadmap">
                        <Button className="font-bold gap-2">
                            View Learning Plan <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            )}
        </Card>
    )
}
