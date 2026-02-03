
"use client"

import { format } from "date-fns"
import { Trash2, Map, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Roadmap {
    id: string
    career: string
    title: string
    created_at: string
}

interface RoadmapHistoryProps {
    roadmaps: Roadmap[]
    isLoading: boolean
    onLoad: (roadmap: Roadmap) => void
    onDelete: (id: string) => void
}

export function RoadmapHistory({ roadmaps, isLoading, onLoad, onDelete }: RoadmapHistoryProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (roadmaps.length === 0) {
        return (
            <div className="text-center p-8 border rounded-lg border-dashed">
                <Map className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <h3 className="font-semibold mb-1">No Saved Roadmaps</h3>
                <p className="text-sm text-muted-foreground">Generated roadmaps will appear here.</p>
            </div>
        )
    }

    return (
        <Card className="p-4 border shadow-sm">
            <CardTitle className="mb-4 text-lg flex items-center gap-2 font-poppins text-slate-900">
                <Map className="w-5 h-5 text-primary" />
                Saved Roadmaps
            </CardTitle>

            <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                    {roadmaps.map((map) => (
                        <div
                            key={map.id}
                            className="group flex items-start justify-between gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 hover:shadow-sm transition-all relative overflow-hidden"
                        >
                            {/* Left accent border */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-colors" />

                            <div className="flex-1 min-w-0" role="button" onClick={() => onLoad(map)}>
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors font-poppins text-slate-800">
                                        {map.career}
                                    </h4>
                                    <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4 font-inter">
                                        {format(new Date(map.created_at), 'MMM d')}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground truncate line-clamp-2 font-inter">
                                    {map.title}
                                </p>
                            </div>

                            <div className="flex flex-col gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-primary hover:text-primary hover:bg-primary/10"
                                    onClick={() => onLoad(map)}
                                    title="Load Roadmap"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onDelete(map.id)
                                    }}
                                    title="Delete Roadmap"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </Card>
    )
}
