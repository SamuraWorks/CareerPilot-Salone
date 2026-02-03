"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { UserProfile } from "@/lib/types"
import { calculateCVScore, calculateRoadmapProgress, calculateCareerMatch } from "@/lib/progress-service"
import { SIERRA_LEONE_CAREERS } from "@/lib/career-data"
import {
    Target,
    TrendingUp,
    FileText,
    Clock,
    Award,
    Sparkles
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ProgressOverviewProps {
    profile: UserProfile
}

export function ProgressOverview({ profile }: ProgressOverviewProps) {
    // 1. Career Match % (Highest match among available careers)
    // For performance, we just check a few or the top industries
    const matches = SIERRA_LEONE_CAREERS.map(c => calculateCareerMatch(profile, c));
    const highestMatch = Math.max(...matches, 0);

    // 2. Roadmap progress
    const activeRoadmapId = profile.active_roadmap_id;
    const roadmapProgress = activeRoadmapId ? calculateRoadmapProgress(profile, activeRoadmapId) : 0;

    // 3. CV Readiness
    const cvScore = calculateCVScore(profile);

    // 4. Last updated
    const lastUpdate = profile.last_updated_at || profile.updated_at;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Career Match */}
            <Card className="hover:shadow-lg transition-all border border-slate-100 bg-white rounded-3xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Target className="w-12 h-12 text-blue-500" />
                </div>
                <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Target className="w-3 h-3 text-blue-500" /> Career Alignment
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end gap-2 mb-3">
                        <span className="text-4xl font-black text-slate-900">{highestMatch}%</span>
                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">
                            Optimal
                        </span>
                    </div>
                    <Progress value={highestMatch} className="h-2 bg-slate-50" indicatorClassName="bg-blue-500" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-3">
                        Based on skills & interests
                    </p>
                </CardContent>
            </Card>

            {/* Roadmap Progress */}
            <Card className="hover:shadow-lg transition-all border border-slate-100 bg-white rounded-3xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp className="w-12 h-12 text-emerald-500" />
                </div>
                <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <TrendingUp className="w-3 h-3 text-emerald-500" /> Journey Status
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end gap-2 mb-3">
                        <span className="text-4xl font-black text-slate-900">{roadmapProgress}%</span>
                    </div>
                    <Progress value={roadmapProgress} className="h-2 bg-slate-50" indicatorClassName="bg-emerald-500" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-3 flex items-center gap-1">
                        <Award className="w-3 h-3" /> {activeRoadmapId ? "Real-time task tracking" : "No active journey"}
                    </p>
                </CardContent>
            </Card>

            {/* CV Score */}
            <Card className="hover:shadow-lg transition-all border border-slate-100 bg-white rounded-3xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FileText className="w-12 h-12 text-purple-500" />
                </div>
                <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <FileText className="w-3 h-3 text-purple-500" /> AI CV Readiness
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end gap-2 mb-3">
                        <span className="text-4xl font-black text-slate-900">{cvScore}%</span>
                    </div>
                    <Progress value={cvScore} className="h-2 bg-slate-50" indicatorClassName="bg-purple-500" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-3">
                        Evidence completeness score
                    </p>
                </CardContent>
            </Card>

            {/* Last Update */}
            <Card className="hover:shadow-lg transition-all border border-slate-100 bg-white rounded-3xl overflow-hidden group">
                <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Clock className="w-3 h-3 text-orange-500" /> Sync Intelligence
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between h-[100px]">
                    <div>
                        <p className="text-xs font-bold text-slate-600">
                            {lastUpdate ? `Last Sync: ${formatDistanceToNow(new Date(lastUpdate), { addSuffix: true })}` : "Profile not yet synced"}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">Updates reflect instantly across all AI modules.</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-tighter">
                        <Sparkles className="w-3 h-3" /> Cloud-Safe Storage
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
