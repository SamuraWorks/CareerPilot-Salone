"use client"
export const dynamic = 'force-dynamic'

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAnalyticsData, AnalyticsData } from "@/lib/admin/analytics-queries"
import { User, UserCheck, UserX, TrendingUp, GraduationCap, Target, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'

const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#14b8a6']

export default function AnalyticsPage() {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadAnalytics()
    }, [])

    const loadAnalytics = async () => {
        setIsLoading(true)
        const data = await getAnalyticsData()
        setAnalytics(data)
        setIsLoading(false)
    }

    if (isLoading) {
        return (
            <div className="container py-10">
                <div className="flex items-center justify-center h-64">
                    <div className="text-muted-foreground">Loading analytics...</div>
                </div>
            </div>
        )
    }

    if (!analytics) {
        return (
            <div className="container py-10">
                <div className="text-center text-muted-foreground">Failed to load analytics</div>
            </div>
        )
    }

    const completionRate = analytics.totalUsers > 0
        ? Math.round((analytics.onboardedUsers / analytics.totalUsers) * 100)
        : 0

    return (
        <div className="w-full min-h-screen">
            <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8 pb-32">
                {/* Header */}
                <div>
                    <h1 className="text-4xl font-black tracking-tight">Analytics Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Real-time insights into user engagement and growth</p>
                </div>

                {/* Key Metrics */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="border-none shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <User className="h-5 w-5 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{analytics.totalUsers}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Registered accounts
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Onboarded</CardTitle>
                            <UserCheck className="h-5 w-5 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{analytics.onboardedUsers}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {completionRate}% completion rate
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Anonymous</CardTitle>
                            <UserX className="h-5 w-5 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{analytics.anonymousUsers}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Users without email
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row 1 */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* User Growth */}
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-blue-500" />
                                User Growth (Last 30 Days)
                            </CardTitle>
                            <CardDescription>Daily registration trends</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={analytics.userGrowth}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 12 }}
                                        tickFormatter={(value) => new Date(value).getDate().toString()}
                                    />
                                    <YAxis />
                                    <Tooltip
                                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#0ea5e9"
                                        strokeWidth={2}
                                        dot={{ fill: '#0ea5e9' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Education Levels */}
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-purple-500" />
                                Education Distribution
                            </CardTitle>
                            <CardDescription>User education levels</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={analytics.educationLevels}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ level, percent }) => `${level}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="count"
                                        nameKey="level"
                                    >
                                        {analytics.educationLevels.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row 2 */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* District Distribution */}
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-emerald-500" />
                                Geographic Distribution
                            </CardTitle>
                            <CardDescription>Users by district</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={analytics.districtDistribution.slice(0, 10)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="district"
                                        tick={{ fontSize: 11 }}
                                        angle={-45}
                                        textAnchor="end"
                                        height={100}
                                    />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#10b981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Top Career Goals */}
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-pink-500" />
                                Popular Career Goals
                            </CardTitle>
                            <CardDescription>Top 10 career aspirations</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={analytics.careerGoals} layout="horizontal">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis
                                        dataKey="goal"
                                        type="category"
                                        width={120}
                                        tick={{ fontSize: 11 }}
                                    />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#ec4899" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card className="border-none shadow-lg">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest user registrations and updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {analytics.recentActivity.slice(0, 10).map((user) => (
                                <div key={user.id || user.anon_id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                                            <User className="w-5 h-5 text-slate-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{user.full_name || "Guest User"}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {user.email || user.anon_id}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant={user.is_complete || user.profile_completed ? "default" : "secondary"}>
                                            {user.is_complete || user.profile_completed ? "Onboarded" : "Incomplete"}
                                        </Badge>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {user.updated_at ? new Date(user.updated_at).toLocaleDateString() : ""}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
