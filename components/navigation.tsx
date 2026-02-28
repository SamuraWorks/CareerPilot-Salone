"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Compass,
  Map,
  FileText,
  Menu,
  X,
  Bell,
  Sparkles,
  GraduationCap,
  Users,
  LogOut,
  ChevronRight,
  Bot,
  BookOpen,
  User
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { useProfile } from "@/lib/profile-context"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FaWhatsapp } from "react-icons/fa"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, description: "Your central hub" },
  { label: "Cover Letter", href: "/cover-letter", icon: FileText, description: "Smart letter generator" },
  { label: "Universities", href: "/universities", icon: GraduationCap, description: "Salone academic paths" },
  { label: "Careers", href: "/careers", icon: Compass, description: "Browse all paths" },
  { label: "Opportunities", href: "/opportunities", icon: Sparkles, description: "Jobs & Scholarships" },
  { label: "Roadmaps", href: "/roadmap", icon: Map, description: "Step-by-step guides" },
  { label: "AI Mentor", href: "/guidance", icon: Bot, description: "Instant guidance", highlight: true },
  { label: "Mentorship", href: "/mentorship", icon: Users, description: "Connect with experts" },
  { label: "CV Builder", href: "/cv-builder", icon: FileText, description: "Create professional CVs" },
  { label: "Settings", href: "/settings", icon: Bot, description: "Preferences & Feedback" },
  { label: "WhatsApp", href: "https://whatsapp.com/channel/0029VbCMtxy0LKZ52WwcjH0r", icon: FaWhatsapp, description: "Instant support", color: "text-emerald-500" },
]

export function Navigation() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { profile } = useProfile()
  const [open, setOpen] = React.useState(false)

  // Hide navigation on admin pages
  if (pathname?.startsWith('/admin')) return null;

  // Determine page title based on pathname
  const getCurrentPageTitle = () => {
    if (!pathname) return "CareerPilot Salone";

    // Exact match
    let item = NAV_ITEMS.find(item => item.href === pathname);
    if (item) return item.label;

    // Partial match for dashboard sub-pages or dynamics
    if (pathname.startsWith('/dashboard')) return "Dashboard";
    if (pathname.startsWith('/careers/')) return "Career Details";
    if (pathname.startsWith('/scholarships')) return "Scholarships";
    if (pathname.startsWith('/jobs')) return "Jobs";

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
              >
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
              className="w-[85%] sm:w-[320px] p-0 border-r-0 shadow-2xl flex flex-col h-full bg-white transition-all duration-300 ease-in-out"
            >
              <SheetHeader className="p-6 border-b border-slate-50 bg-slate-50/50 shrink-0">
                <SheetTitle className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-100 shadow-sm overflow-hidden">
                    <Image src="/images/core/logo.png" alt="CareerPilot Logo" width={40} height={40} className="object-cover scale-125" />
                  </div>
                  <div className="hidden xs:block">
                    <span className="font-black text-[#0B1F3A] text-lg tracking-tight block leading-none">CareerPilot</span>
                    <span className="text-[10px] font-black text-[#1FA774] uppercase tracking-widest block">Salone</span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto py-2">
                <div className="flex flex-col">
                  {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href
                    // @ts-ignore
                    const isHighlight = item.highlight
                    // @ts-ignore
                    const customColor = item.color
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-6 py-3 transition-all hover:bg-slate-50 group border-l-4 border-transparent",
                          isActive ? "bg-blue-50/30 border-[#1FA774]" : "",
                          isHighlight ? "bg-emerald-50/50 border-emerald-500/30" : ""
                        )}
                      >
                        <div className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center transition-colors shadow-sm shrink-0",
                          isActive ? "bg-[#0B1F3A] text-white" : isHighlight ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-white text-slate-400 group-hover:text-[#1FA774] border border-slate-100",
                          customColor && !isActive && !isHighlight ? customColor : ""
                        )}>
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div className="flex-1">
                          <div className={cn(
                            "font-sans font-bold text-[13px] transition-colors",
                            isActive ? "text-[#0B1F3A]" : "text-[#0B1F3A]/80 group-hover:text-[#1FA774]",
                            isHighlight ? "text-emerald-700" : ""
                          )}>
                            {item.label} {isHighlight && <span className="ml-2 text-[9px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded-full uppercase tracking-wider">New</span>}
                          </div>
                          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wide truncate">
                            {item.description}
                          </div>
                        </div>
                        {(isActive || isHighlight) && <ChevronRight className={cn("h-4 w-4", isActive ? "text-[#1FA774]" : "text-emerald-500")} />}
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0 space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm mb-2">
                  <div className="h-12 w-12 rounded-xl bg-[#0B1F3A] p-0.5 shrink-0">
                    <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center overflow-hidden relative">
                      {profile?.avatar_url ? (
                        <Image src={profile.avatar_url} alt="User Avatar" fill className="object-cover" />
                      ) : (
                        <span className="text-sm font-black text-[#0B1F3A]">
                          {(profile?.full_name || "G").charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#0B1F3A] uppercase tracking-tight">{profile?.full_name || "Guest Scholar"}</div>
                    <div className="text-[10px] font-bold text-[#1FA774] uppercase tracking-widest">{profile?.location || "Sierra Leone"}</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Public ID</span>
                    <span className="text-xs font-black text-[#0B1F3A] font-mono">{profile?.id || "GUEST"}</span>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-[#1FA774] rounded-xl transition-all group bg-white border border-slate-200 shadow-sm"
                  >
                    <User className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="font-bold text-xs uppercase tracking-widest">Edit Profile</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo - Always visible */}
          <Link href="/" className="flex items-center gap-2 shrink-0 ml-2">
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-white flex items-center justify-center relative group">
              <Image
                src="/images/core/logo.png"
                alt="CareerPilot"
                width={44}
                height={44}
                className="object-cover scale-125 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="font-poppins font-black text-[#0B1F3A] text-lg tracking-tight hidden sm:block">
              CareerPilot <span className="text-[#1FA774]">Salone</span>
            </span>
          </Link>
        </div>

        {/* RIGHT: Notifications & Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* 
          <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-slate-50 text-slate-600 hover:text-[#1FA774] border border-slate-100 relative">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white" />
          </Button>
          */}

          <Link href={profile.is_complete ? "/profile" : "/onboarding"} className="flex items-center gap-3 pl-2 sm:border-l sm:border-slate-100">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[11px] font-black text-[#0B1F3A] uppercase tracking-tighter leading-none">
                {profile?.full_name || "My Career"}
              </span>
              <span className="text-[9px] font-bold text-[#1FA774] uppercase tracking-widest mt-1">
                {profile?.is_complete ? "Scholar" : "Start Here"}
              </span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-[#0B1F3A] p-0.5 shadow-sm active:scale-95 transition-all">
              <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center overflow-hidden relative">
                {profile?.avatar_url ? (
                  <Image src={profile.avatar_url} alt="User Avatar" fill className="object-cover" />
                ) : (
                  <span className="text-sm font-black text-[#0B1F3A]">
                    {(profile?.full_name || "M").charAt(0)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}
