"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    LogOut,
    BarChart3,
    X,
    ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAdminAuth } from "./auth-wrapper"

const navItems = [
    {
        title: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users
    },
    {
        title: "Feedback",
        href: "/admin/feedback",
        icon: MessageSquare
    }
]

interface AdminNavProps {
    onNavClick?: () => void
}

export function AdminNav({ onNavClick }: AdminNavProps) {
    const pathname = usePathname()
    const { handleLogout } = useAdminAuth()

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                        <LayoutDashboard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">Admin Panel</h2>
                        <p className="text-xs text-muted-foreground">CareerPilot Salone</p>
                    </div>
                </div>
                {/* Close button for mobile sheet if needed - though Sheet normally handles this */}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavClick}
                            className={cn(
                                "group flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200",
                                isActive
                                    ? "bg-slate-900 text-white shadow-md"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-900")} />
                                <span>{item.title}</span>
                            </div>
                            {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t">
                <Button
                    variant="ghost"
                    onClick={() => {
                        if (onNavClick) onNavClick();
                        handleLogout();
                    }}
                    className="w-full justify-start text-slate-600 hover:text-red-600 hover:bg-red-50"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Lock Panel
                </Button>
            </div>
        </div>
    )
}
