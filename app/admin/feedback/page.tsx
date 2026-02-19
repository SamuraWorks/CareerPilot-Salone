"use client"
export const dynamic = 'force-dynamic'

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getFeedbackData } from "@/lib/admin/analytics-queries"
import { createClient } from "@/lib/supabase/client"
import { ExportButton } from "@/components/admin/export-button"
import { prepareFeedbackForExport } from "@/lib/admin/export-utils"
import { MessageSquare, Search, Mail, User, Calendar } from "lucide-react"
import { format } from "date-fns"

interface Feedback {
    id: string
    user_id?: string
    anon_id?: string
    name?: string
    email?: string
    message?: string
    feedback?: string
    type?: string
    status?: string
    created_at?: string
}

export default function FeedbackPage() {
    const [feedback, setFeedback] = useState<Feedback[]>([])
    const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const supabase = createClient()


    useEffect(() => {
        loadFeedback()
    }, [])

    useEffect(() => {
        filterFeedback()
    }, [searchTerm, statusFilter, feedback])

    const loadFeedback = async () => {
        setIsLoading(true)
        const data = await getFeedbackData(supabase)
        setFeedback(data)
        setFilteredFeedback(data)
        setIsLoading(false)
    }

    const filterFeedback = () => {
        let filtered = [...feedback]

        // Search filter
        if (searchTerm) {
            const lower = searchTerm.toLowerCase()
            filtered = filtered.filter(f =>
                (f.name?.toLowerCase().includes(lower)) ||
                (f.email?.toLowerCase().includes(lower)) ||
                (f.message?.toLowerCase().includes(lower)) ||
                (f.feedback?.toLowerCase().includes(lower))
            )
        }

        // Status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter(f => (f.status || "new").toLowerCase() === statusFilter)
        }

        setFilteredFeedback(filtered)
    }

    const totalFeedback = feedback.length
    const newFeedback = feedback.filter(f => !f.status || f.status === "new").length
    const resolvedFeedback = feedback.filter(f => f.status === "resolved").length

    return (
        <div className="w-full min-h-screen">
            <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8 pb-32">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight">Feedback Management</h1>
                        <p className="text-muted-foreground mt-2">Review and respond to user feedback</p>
                    </div>
                    <ExportButton
                        data={filteredFeedback}
                        filename="feedback"
                        prepareData={prepareFeedbackForExport}
                    />
                </div>

                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="border-none shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
                            <MessageSquare className="h-5 w-5 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalFeedback}</div>
                            <p className="text-xs text-muted-foreground mt-1">All submissions</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">New</CardTitle>
                            <Mail className="h-5 w-5 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{newFeedback}</div>
                            <p className="text-xs text-muted-foreground mt-1">Pending review</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                            <MessageSquare className="h-5 w-5 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{resolvedFeedback}</div>
                            <p className="text-xs text-muted-foreground mt-1">Completed</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="border-none shadow-lg">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search feedback..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={statusFilter === "all" ? "default" : "outline"}
                                    onClick={() => setStatusFilter("all")}
                                    size="sm"
                                >
                                    All
                                </Button>
                                <Button
                                    variant={statusFilter === "new" ? "default" : "outline"}
                                    onClick={() => setStatusFilter("new")}
                                    size="sm"
                                >
                                    New
                                </Button>
                                <Button
                                    variant={statusFilter === "resolved" ? "default" : "outline"}
                                    onClick={() => setStatusFilter("resolved")}
                                    size="sm"
                                >
                                    Resolved
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Feedback Table */}
                <Card className="border-none shadow-lg">
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Message</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            Loading feedback...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredFeedback.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No feedback found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredFeedback.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="whitespace-normal">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                        <span className="font-medium">{item.name || "Anonymous"}</span>
                                                    </div>
                                                    {item.email && (
                                                        <span className="text-xs text-muted-foreground ml-6">{item.email}</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-md whitespace-normal">
                                                <p className="line-clamp-3 text-sm">
                                                    {item.message || item.feedback || "No message"}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{item.type || "General"}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        (item.status || "new") === "resolved"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {item.status || "New"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {item.created_at ? (
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-sm">
                                                            {format(new Date(item.created_at), "MMM d, yyyy")}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {format(new Date(item.created_at), "h:mm a")}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    "-"
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
