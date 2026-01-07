"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  UserCircle,
  Search,
  Map,
  GraduationCap,
  Users,
  Briefcase,
  FileText,
  Bot,
  LifeBuoy,
  Menu,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, description: "Your career overview" },
  { label: "Let's Get to Know You", href: "/onboarding", icon: UserCircle, description: "Build your profile" },
  { label: "Explore Careers", href: "/careers", icon: Search, description: "Real jobs in Salone" },
  { label: "Career Roadmap", href: "/roadmap", icon: Map, description: "Your step-by-step path" },
  { label: "CV Builder", href: "/cv-builder", icon: FileText, description: "Create a professional CV" },
  { label: "Universities & Institutions", href: "/universities", icon: GraduationCap, description: "Verified local education" },
  { label: "Mentors", href: "/mentorship", icon: Users, description: "Learn from local leaders" },
  { label: "Opportunities", href: "/opportunities", icon: Briefcase, description: "Jobs & scholarships" },
  { label: "AI Career Guide", href: "/ai-guidance", icon: Bot, description: "Ask anything, anytime" },
  { label: "Support & Feedback", href: "/help", icon: LifeBuoy, description: "How can we help?" },
]

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E7EB] h-16 flex items-center px-4 md:px-8">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">

        {/* LEFT: Hamburger & Logo */}
        <div className="flex items-center gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hover:bg-slate-100 rounded-xl">
                <Menu className="h-6 w-6 text-[#1A1A1A]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 border-r-0 shadow-2xl">
              <SheetHeader className="p-6 border-b border-slate-50 bg-slate-50/50">
                <SheetTitle className="text-left">
                  <span className="text-gradient-salone font-poppins font-bold text-xl">
                    Main Menu
                  </span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col py-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-4 px-6 py-4 transition-all hover:bg-slate-50 group",
                        isActive ? "bg-slate-50 border-r-4 border-[#1F7A4D]" : ""
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm",
                        isActive ? "bg-[#1F7A4D] text-white" : "bg-white text-slate-400 group-hover:text-[#1F7A4D] border border-slate-100"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className={cn(
                          "font-poppins font-semibold text-sm",
                          isActive ? "text-[#1F7A4D]" : "text-slate-900"
                        )}>
                          {item.label}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          {item.description}
                        </div>
                      </div>
                      <ChevronRight className={cn(
                        "h-4 w-4 transition-transform group-hover:translate-x-1",
                        isActive ? "text-[#1F7A4D]" : "text-slate-300"
                      )} />
                    </Link>
                  )
                })}
              </div>

              <div className="mt-auto p-6 bg-slate-50 border-t border-slate-100">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">
                  CareerPilot Salone • Trust & Clarity
                </p>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.png"
              alt="CareerPilot"
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="font-poppins font-bold text-[#1A1A1A] text-base tracking-tight hidden sm:inline-block">
              CareerPilot Salone
            </span>
          </Link>
        </div>

        {/* RIGHT: Quick Dashboard/Profile */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="hidden md:block">
            <Button variant="ghost" className="font-poppins font-bold text-xs uppercase tracking-widest text-slate-600 hover:text-[#1F7A4D] hover:bg-slate-50 rounded-xl px-4">
              Dashboard
            </Button>
          </Link>
          <Link href="/profile">
            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-sm active:scale-95 group">
              <UserCircle className="h-6 w-6 text-slate-600 group-hover:text-[#1F7A4D] transition-colors" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}
