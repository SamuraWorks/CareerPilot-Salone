"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Search,
  Map,
  FileText,
  MessageCircle,
  Menu,
  X,
  Bell,
  Brain,
  Briefcase,
  Users,
  LogOut,
  ChevronRight,
  Bot
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, description: "Your central hub" },
  { label: "Career Match", href: "/aptitude-test", icon: Brain, description: "Discover your fit" },
  { label: "Roadmaps", href: "/roadmap", icon: Map, description: "Step-by-step guides" },
  { label: "Opportunities", href: "/opportunities", icon: Briefcase, description: "Jobs & Scholarships" },
  { label: "CV Builder", href: "/cv-builder", icon: FileText, description: "Create professional CVs" },
  { label: "Mentorship & Guidance", href: "/mentorship", icon: Users, description: "Connect with experts" },
  { label: "AI Career Guide", href: "/guidance", icon: Bot, description: "Instant advice" },
  { label: "WhatsApp Support", href: "/whatsapp-support", icon: MessageCircle, description: "Chat with us" },
]

export function Navigation() {
  const pathname = usePathname()
  const { profile, logout } = useAuth()
  const [open, setOpen] = React.useState(false)

  // Determine page title based on pathname
  const getCurrentPageTitle = () => {
    // Exact match
    let item = NAV_ITEMS.find(item => item.href === pathname);
    if (item) return item.label;

    // Partial match for dashboard sub-pages if any
    if (pathname.startsWith('/dashboard')) return "Dashboard";

    return "CareerPilot Salone";
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E7EB] h-16 flex items-center px-4 md:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center relative">

        {/* LEFT: Hamburger & Menu */}
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hover:bg-slate-100 rounded-xl transition-transform active:scale-95"
                onClick={() => setOpen(!open)}
              >
                {/* Icon switches state */}
                {open ? (
                  <X className="h-6 w-6 text-[#0B1F3A]" />
                ) : (
                  <Menu className="h-6 w-6 text-[#0B1F3A]" />
                )}
              </Button>
            </SheetTrigger>

            {/* Sidebar content */}
            <SheetContent
              side="left"
              className="w-full sm:w-[350px] p-0 border-r-0 shadow-2xl flex flex-col h-full bg-white transition-all duration-300 ease-in-out"
            >
              <SheetHeader className="p-6 border-b border-slate-50 bg-slate-50/50 shrink-0">
                <SheetTitle className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-100 shadow-sm p-1">
                    <Image src="/logo.png" alt="CP" width={32} height={32} className="object-contain" />
                  </div>
                  <div>
                    <span className="font-black text-[#0B1F3A] text-lg tracking-tight block leading-none">CareerPilot</span>
                    <span className="text-[10px] font-black text-[#1FA774] uppercase tracking-widest block">Salone</span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto py-4">
                <div className="flex flex-col">
                  {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-6 py-4 transition-all hover:bg-slate-50 group border-l-4 border-transparent",
                          isActive ? "bg-blue-50/30 border-[#1E5EFF]" : ""
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm shrink-0",
                          isActive ? "bg-[#1E5EFF] text-white" : "bg-white text-slate-400 group-hover:text-[#1E5EFF] border border-slate-100"
                        )}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className={cn(
                            "font-poppins font-semibold text-sm transition-colors",
                            isActive ? "text-[#1E5EFF]" : "text-[#0B1F3A] group-hover:text-[#1E5EFF]"
                          )}>
                            {item.label}
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium truncate">
                            {item.description}
                          </div>
                        </div>
                        {isActive && <ChevronRight className="h-4 w-4 text-[#1E5EFF]" />}
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
                {profile ? (
                  <button
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all group bg-white border border-slate-200 shadow-sm"
                  >
                    <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="font-medium text-sm">Sign Out</span>
                  </button>
                ) : (
                  <Link
                    href="/auth"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0B1F3A] text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-xl active:scale-95 transition-all"
                  >
                    Sign In / Register
                  </Link>
                )}

                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 text-center mt-6">
                  Build Your Future
                </p>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo - Always visible */}
          <Link href="/" className="flex items-center gap-2 shrink-0 ml-2">
            <Image
              src="/logo.png"
              alt="CareerPilot"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-poppins font-black text-[#0B1F3A] text-lg tracking-tight hidden xs:block">
              CareerPilot <span className="text-[#1FA774]">Salone</span>
            </span>
          </Link>
        </div>

        {/* CENTER (MOBILE): Hidden in favor of Logo */}
        {/* <div className="absolute left-1/2 -translate-x-1/2 sm:hidden flex flex-col items-center"> ... </div> */}

        {/* RIGHT: Notifications & Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-slate-50 text-slate-600 hover:text-[#1FA774] border border-slate-100 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </Button>

          {profile && (
            <Link href="/profile" className="flex items-center gap-3 pl-2 sm:border-l sm:border-slate-100">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[11px] font-black text-[#0B1F3A] uppercase tracking-tighter leading-none">
                  {profile.fullName || "Scholar"}
                </span>
                <span className="text-[9px] font-bold text-[#1FA774] uppercase tracking-widest mt-1">
                  {profile.location || "Sierra Leone"}
                </span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-[#1E5EFF] p-0.5 shadow-sm active:scale-95 transition-all">
                <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center overflow-hidden">
                  <span className="text-sm font-black text-[#0B1F3A]">
                    {(profile.fullName || "U").charAt(0)}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

