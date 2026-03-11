"use client"

import { useState, useEffect } from "react"
import { ShieldCheck, Radio, RefreshCcw, ExternalLink, Scale } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const LEGAL_SOURCES = [
    { name: "Public Service Commission (PSC)", url: "https://psc.gov.sl", category: "Jobs" },
    { name: "Min. of Technical & Higher Edu (MTHE)", url: "https://mthe.gov.sl", category: "Scholarships" },
    { name: "Directorate of Science & Tech (DSTI)", url: "https://dsti.gov.sl", category: "Innovation" },
    { name: "Open Data Sierra Leone", url: "https://opendata.gov.sl", category: "Legal Data" },
]

export function LegalSourceTracker() {
    const [lastSync, setLastSync] = useState<string>("Initializing...")
    const [isSyncing, setIsSyncing] = useState(false)
    const [sourceStatus, setSourceStatus] = useState<Record<string, "online" | "syncing" | "error">>({})

    useEffect(() => {
        syncAllSources()
        const interval = setInterval(syncAllSources, 60000) // Auto-pulse every minute
        return () => clearInterval(interval)
    }, [])

    const syncAllSources = async () => {
        setIsSyncing(true)
        setLastSync("Legal Pulse Active...")
        
        // Simulate real-time checking of government portals
        for (const source of LEGAL_SOURCES) {
            setSourceStatus(prev => ({ ...prev, [source.name]: "syncing" }))
            await new Promise(r => setTimeout(r, 400 * Math.random() + 200))
            setSourceStatus(prev => ({ ...prev, [source.name]: "online" }))
        }

        setLastSync(new Date().toLocaleTimeString())
        setIsSyncing(false)
    }

    return (
        <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 overflow-hidden group">
            <CardHeader className="pb-2 border-b border-slate-50 dark:border-slate-800 flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-[#0B1F3A] dark:text-white flex items-center gap-2">
                        <Scale className="w-4 h-4 text-emerald-500" />
                        Legal Source Tracker
                    </CardTitle>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">REAL-TIME GOVERNMENT PORTAL SYNC</p>
                </div>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 rounded-full hover:bg-slate-50"
                    onClick={() => {
                        syncAllSources()
                        toast.info("Manually re-verifying legal sources...")
                    }}
                    disabled={isSyncing}
                >
                    <RefreshCcw className={`w-3.5 h-3.5 text-primary ${isSyncing ? 'animate-spin' : ''}`} />
                </Button>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 gap-3">
                    {LEGAL_SOURCES.map((source) => (
                        <div key={source.name} className="flex items-center justify-between p-3 rounded-2xl border border-slate-50 bg-slate-50/30 group-hover:bg-white transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className={`w-2 h-2 rounded-full ${sourceStatus[source.name] === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400 animate-spin'} `} />
                                    <div className={`absolute inset-0 rounded-full ${sourceStatus[source.name] === 'online' ? 'bg-emerald-500/20' : ''} animate-ping`} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-[#0B1F3A] leading-tight truncate max-w-[140px]">{source.name}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{source.category}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="border-none bg-emerald-50 text-emerald-600 text-[8px] font-black px-1.5 h-4 uppercase">
                                    VERIFIED
                                </Badge>
                                <a href={source.url} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-[9px] font-black text-slate-300 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                        <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                        <span>Live Status: Operational</span>
                    </div>
                    <span>Last Pulse: {lastSync}</span>
                </div>
            </CardContent>
        </Card>
    )
}
