"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, Map, MessageSquare, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

const MOBILE_NAV_ITEMS = [
    { label: "Home", href: "/", icon: Home },
    { label: "Careers", href: "/careers", icon: Briefcase },
    { label: "Roadmap", href: "/roadmap", icon: Map },
    { label: "AI Chat", href: "/ai-guidance", icon: MessageSquare },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
]

export function MobileNav() {
    const pathname = usePathname()

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E5E7EB] safe-area-inset-bottom">
            <div className="grid grid-cols-5 h-[60px]">
                {MOBILE_NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 transition-colors",
                                isActive ? "text-[#1F7A4D]" : "text-gray-500"
                            )}
                        >
                            <Icon className={cn("w-5 h-5", isActive ? "text-[#1F7A4D]" : "text-gray-500")} />
                            <span className={cn(
                                "text-[10px] font-poppins font-medium",
                                isActive ? "text-[#1F7A4D]" : "text-gray-500"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
