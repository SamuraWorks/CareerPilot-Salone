"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { UserProfile } from "@/lib/types"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Search, ShieldAlert, User, WifiOff } from "lucide-react"
import { toast } from "sonner"
import { ExportButton } from "@/components/admin/export-button"
import { prepareUserDataForExport } from "@/lib/admin/export-utils"

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserProfile[]>([])
    const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        if (!searchTerm) {
            setFilteredUsers(users)
            return
        }

        const lower = searchTerm.toLowerCase()
        const filtered = users.filter(u =>
            (u.full_name?.toLowerCase().includes(lower)) ||
            (u.email?.toLowerCase().includes(lower)) ||
            (u.anon_id?.toLowerCase().includes(lower)) ||
            (u.career_goal?.toLowerCase().includes(lower)) ||
            (u.education_level?.toLowerCase().includes(lower))
        )
        setFilteredUsers(filtered)
    }, [searchTerm, users])

    const fetchUsers = async () => {
        try {
            setIsLoading(true)
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('updated_at', { ascending: false })

            if (error) throw error

            if (data) {
                setUsers(data as UserProfile[])
                setFilteredUsers(data as UserProfile[])
            }
        } catch (err) {
            console.error("Error fetching users:", err)
            toast.error("Failed to load users")
        } finally {
            setIsLoading(false)
        }
    }

    // Quick stats
    const totalUsers = users.length
    const onboardedUsers = users.filter(u => u.is_complete || u.profile_completed).length
    const anonymousUsers = users.filter(u => u.anon_id && !u.email).length

    return (
        <div className="w-full min-h-screen">
            <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8 pb-32">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight">User Management</h1>
                        <p className="text-muted-foreground mt-2">Track and manage all registered users</p>
                    </div>
                    <ExportButton
                        data={filteredUsers}
                        filename="users"
                        prepareData={prepareUserDataForExport}
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="border-none shadow-lg">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                                    <p className="text-3xl font-bold mt-2">{totalUsers}</p>
                                </div>
                                <User className="h-8 w-8 text-blue-500" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-4">
                                Across all platforms
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-lg">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Onboarded</p>
                                    <p className="text-3xl font-bold mt-2">{onboardedUsers}</p>
                                </div>
                                <ShieldAlert className="h-8 w-8 text-emerald-500" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-4">
                                {totalUsers > 0 ? Math.round((onboardedUsers / totalUsers) * 100) : 0}% completion rate
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-lg">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Anonymous</p>
                                    <p className="text-3xl font-bold mt-2">{anonymousUsers}</p>
                                </div>
                                <WifiOff className="h-8 w-8 text-orange-500" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-4">
                                Users without email
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-none shadow-lg">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, email, ID, education..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="max-w-sm"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Identity</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Education</TableHead>
                                    <TableHead>Career Goal</TableHead>
                                    <TableHead className="text-right">Last Active</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            Loading profiles...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredUsers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <TableRow key={user.id || user.anon_id}>
                                            <TableCell className="font-medium whitespace-normal">
                                                <div className="flex flex-col">
                                                    <span>{user.full_name || "Guest User"}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {user.email || user.anon_id || "No ID"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {user.is_complete || user.profile_completed ? (
                                                    <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">Onboarded</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Incomplete</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="whitespace-normal">{user.education_level || "-"}</TableCell>
                                            <TableCell className="whitespace-normal">{user.career_goal || "-"}</TableCell>
                                            <TableCell className="text-right">
                                                {user.updated_at ? (
                                                    <div className="flex flex-col items-end">
                                                        <span>{format(new Date(user.updated_at), "MMM d, yyyy")}</span>
                                                        <span className="text-xs text-muted-foreground">{format(new Date(user.updated_at), "h:mm a")}</span>
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
