"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, Map, MessageSquare, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

const MOBILE_NAV_ITEMS = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore", href: "/careers", icon: Briefcase },
    { label: "Roadmap", href: "/roadmap", icon: Map },
    { label: "AI Guide", href: "/ai-guidance", icon: MessageSquare },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
]

export function MobileNav() {
    const pathname = usePathname()

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-slate-100 pb-safe shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
            <div className="grid grid-cols-5 h-[64px]">
                {MOBILE_NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1.5 transition-all active:scale-90",
                                isActive ? "text-[#0B1F3A]" : "text-slate-400 hover:text-[#1FA774]"
                            )}
                        >
                            <div className={cn(
                                "p-1.5 rounded-lg transition-colors",
                                isActive ? "bg-[#1FA774]/10 text-[#1FA774]" : "bg-transparent text-slate-400"
                            )}>
                                <Icon className="w-4.5 h-4.5" />
                            </div>
                            <span className={cn(
                                "text-[9px] font-black uppercase tracking-widest",
                                isActive ? "text-[#0B1F3A]" : "text-slate-400"
                            )}>
                                {item.label === "AI Guide" ? "AI" : item.label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
