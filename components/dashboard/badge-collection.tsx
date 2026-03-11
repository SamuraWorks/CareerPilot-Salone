"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProfile } from "@/lib/profile-context"
import { Award, ShieldCheck, Zap, BookOpen, Star } from "lucide-react"

const BADGE_CONFIG: Record<string, { icon: any, color: string, label: string, desc: string }> = {
    'pioneer': { icon: Star, color: 'text-amber-500 bg-amber-50', label: 'Pioneer', desc: 'Early adopter of CareerPilot' },
    'cv-master': { icon: ShieldCheck, color: 'text-blue-500 bg-blue-50', label: 'CV Master', desc: 'Generated a professional CV' },
    'scholar': { icon: BookOpen, color: 'text-emerald-500 bg-emerald-50', label: 'Scholar', desc: 'Viewed 5+ scholarships' },
    'active-pilot': { icon: Zap, color: 'text-purple-500 bg-purple-50', label: 'Active Pilot', desc: '7-day streak' },
}

export function BadgeCollection() {
    const { profile } = useProfile()
    const userBadges = profile?.badges || []

    if (userBadges.length === 0) return (
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden opacity-60">
            <CardContent className="p-8 text-center">
                <Award className="w-12 h-12 text-slate-200 mx-auto mb-2" />
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No Badges Yet</p>
                <p className="text-[10px] text-slate-300 font-medium mt-1">Complete your profile to earn your first!</p>
            </CardContent>
        </Card>
    )

    return (
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 pb-2">
                <CardTitle className="text-sm font-black text-[#0B1F3A] uppercase tracking-widest flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-500" /> Continental Badges
                </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-4">
                <div className="flex flex-wrap gap-4">
                    {userBadges.map(badgeId => {
                        const config = BADGE_CONFIG[badgeId.toLowerCase()]
                        if (!config) return null
                        const Icon = config.icon

                        return (
                            <div key={badgeId} className="group relative">
                                <div className={`w-14 h-14 rounded-2xl ${config.color} flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-sm`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-[#0B1F3A] text-white p-2 rounded-xl text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center shadow-xl">
                                    <p className="uppercase tracking-widest text-[#1FA774] mb-1">{config.label}</p>
                                    {config.desc}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
