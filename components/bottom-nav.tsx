"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, Briefcase, Map, User } from "lucide-react"

export function BottomNav() {
    const pathname = usePathname()

    const navItems = [
        {
            label: "Dashboard",
            icon: Home,
            href: "/dashboard",
            active: pathname === "/dashboard",
        },
        {
            label: "Career",
            icon: Compass,
            href: "/career",
            active: !!pathname?.startsWith("/career"),
        },
        {
            label: "Opportunities",
            icon: Briefcase,
            href: "/opportunities",
            active: !!(pathname?.startsWith("/opportunities") || pathname?.startsWith("/jobs") || pathname?.startsWith("/scholarships")),
        },
        {
            label: "Roadmap",
            icon: Map,
            href: "/roadmap",
            active: !!pathname?.startsWith("/roadmap"),
        },
        {
            label: "Profile",
            icon: User,
            href: "/profile",
            active: !!(pathname?.startsWith("/profile") || pathname?.startsWith("/settings")),
        },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 md:hidden pb-safe shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex justify-around items-center h-20 px-4">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex flex-col items-center justify-center w-full h-full group"
                    >
                        <div
                            className={`flex flex-col items-center justify-center transition-all duration-300 gap-1.5 ${item.active
                                ? "text-primary scale-110"
                                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                }`}
                        >
                            <div className={`p-2 rounded-2xl transition-colors ${item.active ? "bg-primary/10 shadow-sm" : ""}`}>
                                <item.icon className={`w-5 h-5 ${item.active ? "stroke-[2.5px]" : "stroke-[2px]"}`} />
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-widest ${item.active ? "opacity-100" : "opacity-60"}`}>
                                {item.label}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
