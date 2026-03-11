"use client"

import { useState, useEffect } from "react"
import { Bell, ShieldCheck, ExternalLink, Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SIERRA_LEONE_OPPORTUNITIES, Opportunity } from "@/lib/sierra-leone-opportunities"
import { cn } from "@/lib/utils"

export function LegalUpdatesFeed() {
    const [updates, setUpdates] = useState<Opportunity[]>([])

    useEffect(() => {
        // Filter only legal/official government updates and sort by verification date
        const legalOnly = SIERRA_LEONE_OPPORTUNITIES.filter(o => o.sourceType === 'legal')
            .sort((a, b) => new Date(b.lastVerifiedAt || 0).getTime() - new Date(a.lastVerifiedAt || 0).getTime())
        
        setUpdates(legalOnly.slice(0, 5))
    }, [])

    return (
        <Card className="border-none shadow-lg bg-white overflow-hidden">
            <CardHeader className="pb-2 border-b border-slate-50 flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-[#0B1F3A] flex items-center gap-2">
                        <Bell className="w-4 h-4 text-primary animate-ring" />
                        Legal Intelligence Feed
                    </CardTitle>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">LATEST VERIFIED GOVT. ANNOUNCEMENTS</p>
                </div>
                <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-600 text-[8px] font-black px-2 py-0.5 uppercase tracking-widest">
                    Live
                </Badge>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-slate-50">
                    {updates.map((item, idx) => (
                        <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <Badge className={cn(
                                    "border-none font-bold text-[8px] uppercase tracking-wide px-2 py-0.5 rounded-full",
                                    item.type === 'job' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                                )}>
                                    {item.type}
                                </Badge>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                    {item.sourceAgency}
                                </span>
                            </div>
                            <h4 className="text-xs font-black text-[#0B1F3A] leading-tight mb-2 group-hover:text-primary transition-colors">
                                {item.title}
                            </h4>
                            <div className="flex items-center gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {item.location}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {item.deadline || "Active"}
                                </div>
                                <div className="flex items-center gap-1 ml-auto text-emerald-500">
                                    <ShieldCheck className="w-3 h-3" />
                                    Verified
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                    <button className="w-full py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2">
                        View Complete Legal Archive <ExternalLink className="w-3 h-3" />
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}
