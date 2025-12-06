"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Compass, FileText, BookOpen, User, HelpCircle, MessageSquare, Briefcase } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "AI Career Guidance",
    href: "/guidance",
    icon: MessageSquare,
  },
  {
    title: "Career Recommendations",
    href: "/careers",
    icon: Compass,
  },
  {
    title: "Job Matching",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    title: "CV Builder",
    href: "/cv-builder",
    icon: FileText,
  },
  {
    title: "My Roadmap",
    href: "/roadmap",
    icon: BookOpen,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Help",
    href: "/help",
    icon: HelpCircle,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="w-5 h-5" />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
