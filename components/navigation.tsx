"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, Settings, LogOut, BookMarked } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MAIN_NAV_ITEMS = [
  { label: "Explore Careers", href: "/careers" },
  { label: "Roadmaps", href: "/roadmap" },
  { label: "AI Guidance", href: "/ai-guidance" },
  { label: "Opportunities", href: "/jobs" },
  { label: "Mentors", href: "/mentorship" },
  { label: "Rules", href: "/rules" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LEFT: Logo & Brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.png"
              alt="CareerPilot"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-poppins font-semibold text-[#1A1A1A] text-lg tracking-tight">
              CareerPilot Salone
            </span>
          </Link>

          {/* CENTER: Primary Navigation (Desktop Only) */}
          <div className="hidden md:flex items-center space-x-8">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "font-poppins font-medium text-sm transition-colors relative py-2",
                    isActive ? "text-[#1F7A4D]" : "text-[#1A1A1A] hover:text-[#0F0F0F]"
                  )}
                >
                  {item.label}
                  {/* Active Underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1F7A4D]" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* RIGHT: User Actions (Desktop Only) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-[#1A1A1A] hover:text-[#0F0F0F] hover:bg-gray-50 font-poppins font-medium">
                Dashboard
              </Button>
            </Link>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 hover:border-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1F7A4D] focus:ring-offset-2">
                  <User className="w-5 h-5 text-slate-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/roadmap" className="flex items-center cursor-pointer">
                    <BookMarked className="w-4 h-4 mr-2" />
                    Saved Roadmaps
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center cursor-pointer text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      </div>
    </nav>
  )
}
