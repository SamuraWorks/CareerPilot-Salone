"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, Sparkles, Map, Menu, User } from "lucide-react"

export function BottomNav() {
    const pathname = usePathname()

    const navItems = [
        {
            label: "Home",
            icon: Home,
            href: "/dashboard",
            active: pathname === "/dashboard",
        },
        {
            label: "Jobs",
            icon: Briefcase,
            href: "/jobs",
            active: pathname.startsWith("/jobs"),
        },
        {
            label: "Ask AI",
            icon: Sparkles,
            href: "/guidance",
            active: pathname.startsWith("/guidance"),
            isPrimary: true,
        },
        {
            label: "Roadmap",
            icon: Map,
            href: "/roadmap",
            active: pathname.startsWith("/roadmap"),
        },
        {
            label: "Menu",
            icon: Menu,
            href: "/menu",
            active: pathname.startsWith("/menu") || pathname.startsWith("/cv-builder") || pathname.startsWith("/profile") || pathname.startsWith("/aptitude-test") || pathname.startsWith("/settings") || pathname.startsWith("/whatsapp"),
        },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden pb-safe">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${item.isPrimary ? "-mt-6" : ""
                            }`}
                    >
                        {item.isPrimary ? (
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/30 text-white">
                                <item.icon className="w-6 h-6" />
                            </div>
                        ) : (
                            <div
                                className={`flex flex-col items-center justify-center transition-colors ${item.active ? "text-primary" : "text-gray-400 hover:text-gray-600"
                                    }`}
                            >
                                <item.icon className={`w-6 h-6 ${item.active ? "fill-current/10" : ""}`} />
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    )
}
