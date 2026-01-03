"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Home,
  FileText,
  Compass,
  Brain,
  Briefcase,
  GraduationCap,
  User,
  Users,
  Info,
  HelpCircle,
  ChevronRight,
  Bell,
  Zap,
  Search
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const MENU_GROUPS = [
  {
    label: "CAREER",
    items: [
      { label: "Career Test", href: "/aptitude-test", icon: FileText },
      { label: "My Career Roadmap", href: "/roadmap", icon: Compass },
      { label: "Browse Careers", href: "/careers", icon: Search },
      { label: "AI Career Advisor", href: "#", icon: Brain, onClick: () => window.dispatchEvent(new CustomEvent('openCareerAdvisor')) },
      { label: "Career Mentors", href: "/mentorship", icon: Users },
    ]
  },
  {
    label: "OPPORTUNITIES",
    items: [
      { label: "Jobs", href: "/jobs", icon: Briefcase },
      { label: "Scholarships", href: "/scholarships", icon: GraduationCap },
      { label: "Training", href: "/opportunities", icon: Zap },
      { label: "Alerts", href: "#", icon: Bell },
    ]
  },
  {
    label: "EDUCATION & RESOURCES",
    items: [
      { label: "Learning Resources", href: "/universities", icon: GraduationCap },
    ]
  },
  {
    label: "ACCOUNT",
    items: [
      { label: "My Profile", href: "/profile", icon: User },
      { label: "About Us", href: "/about", icon: Info },
      { label: "Help & Support", href: "/help", icon: HelpCircle },
    ]
  }
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center group transition-all">
          <div className="relative w-auto h-12 md:h-14 flex items-center">
            <Image
              src="/logo.png"
              alt="CareerPilot Salone Logo"
              width={200}
              height={60}
              className="object-contain h-full w-auto group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </Link>


        {/* Right Side Hamburger & Actions */}
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full hover:bg-slate-100 transition-colors">
                <Menu className="w-7 h-7 text-slate-700" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px] p-0 flex flex-col bg-white border-l-0 shadow-2xl">
              <SheetHeader className="p-6 border-b bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-white">
                      <X className="w-5 h-5" />
                    </Button>
                  </SheetClose>
                </div>
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto pt-4">
                <div className="px-6 mb-8">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-4 py-3 px-4 rounded-2xl transition-all font-bold group",
                      pathname === "/" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <Home className={cn("w-5 h-5", pathname === "/" ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
                    Home
                  </Link>
                </div>

                {MENU_GROUPS.map((group, idx) => (
                  <div key={idx} className="px-6 mb-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-4">{group.label}</p>
                    <div className="space-y-2">
                      {group.items.map((item, itemIdx) => {
                        const isActive = pathname === item.href
                        const Icon = item.icon
                        return (
                          <Link
                            key={itemIdx}
                            href={item.href}
                            onClick={(e) => {
                              if (item.onClick) {
                                e.preventDefault()
                                item.onClick()
                              }
                              setIsOpen(false)
                            }}
                            className={cn(
                              "flex items-center justify-between w-full py-4 px-4 rounded-2xl transition-all group",
                              isActive ? "bg-primary/5 text-primary border border-primary/10" : "text-slate-600 hover:bg-slate-50"
                            )}
                          >
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "p-2.5 rounded-xl transition-colors",
                                isActive ? "bg-primary text-white" : "bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-slate-600 border border-transparent group-hover:border-slate-100"
                              )}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className="font-bold text-sm tracking-tight">{item.label}</span>
                            </div>
                            <ChevronRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", isActive ? "text-primary" : "text-slate-300")} />
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t bg-slate-50/50 mt-auto">
                <p className="text-center text-[10px] font-medium text-slate-400">CareerPilot Salone v1.0 • Built for Salone</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
