"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { useState } from "react"
import Image from "next/image"

export function Navigation() {
  const { user, logout, isAuthenticated } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden">
              <Image
                src="/logo.png"
                alt="CareerPilot Salone Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="font-bold text-xl text-foreground">CareerPilot Salone</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {isAuthenticated && (
              <>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
                <Link href="/universities" className="text-muted-foreground hover:text-foreground transition-colors">
                  Universities
                </Link>
                <Link href="/jobs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Jobs
                </Link>
                <Link href="/scholarships" className="text-muted-foreground hover:text-foreground transition-colors">
                  Scholarships
                </Link>
                <Link href="/mentorship" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mentorship
                </Link>
                <Link href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors">
                  Roadmap
                </Link>
                <Link href="/aptitude-test" className="text-muted-foreground hover:text-foreground transition-colors">
                  Career Test
                </Link>
                <Link
                  href="/whatsapp"
                  className="text-muted-foreground hover:text-[#25D366] transition-colors flex items-center gap-1"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  WhatsApp
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Button asChild variant="ghost" className="gap-2">
                  <Link href="/dashboard">
                    <User className="w-4 h-4" />
                    {user?.name}
                  </Link>
                </Button>
                <Button variant="outline" onClick={logout} className="gap-2 bg-transparent">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {isAuthenticated && (
                <>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                    Careers
                  </Link>
                  <Link href="/universities" className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                    Universities
                  </Link>
                  <Link href="/jobs" className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                    Jobs
                  </Link>
                  <Link href="/scholarships" className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                    Scholarships
                  </Link>
                  <Link href="/mentorship" className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                    Mentorship
                  </Link>
                  <Link href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                    Roadmap
                  </Link>
                  <Link href="/aptitude-test" className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                    Career Test
                  </Link>
                  <Link
                    href="/whatsapp"
                    className="text-muted-foreground hover:text-[#25D366] transition-colors px-2 py-1 flex items-center gap-2"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    WhatsApp Bot
                  </Link>
                </>
              )}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {isAuthenticated ? (
                  <>
                    <Button asChild variant="outline" className="w-full gap-2 bg-transparent">
                      <Link href="/dashboard">
                        <User className="w-4 h-4" />
                        {user?.name}
                      </Link>
                    </Button>
                    <Button variant="outline" onClick={logout} className="w-full gap-2 bg-transparent">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/signup">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
