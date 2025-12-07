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

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="/logo.png"
                alt="CareerPilot Salone Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="font-bold text-lg sm:text-xl text-foreground">CareerPilot Salone</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {isAuthenticated && (
              <>
                <Link href="/guidance" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Guidance
                </Link>
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
          <button className="lg:hidden p-2 touch-target" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-background">
            <div className="flex flex-col gap-3">
              {isAuthenticated && (
                <>
                  <Link href="/guidance" className="text-muted-foreground hover:text-foreground transition-colors px-2 py-2 rounded-md hover:bg-muted touch-target" onClick={closeMobileMenu}>
                    AI Guidance
                  </Link>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors px-2 py-2 rounded-md hover:bg-muted touch-target" onClick={closeMobileMenu}>
                    Careers
                  </Link>
                  <Link href="/universities" className="text-muted-foreground hover:text-foreground transition-colors px-2 py-2 rounded-md hover:bg-muted touch-target" onClick={closeMobileMenu}>
                    Universities
                  </Link>
                  <Link href="/jobs" className="text-muted-foreground hover:text-foreground transition-colors px-2 py-2 rounded-md hover:bg-muted touch-target" onClick={closeMobileMenu}>
                    Jobs
                  </Link>
                  <Link href="/scholarships" className="text-muted-foreground hover:text-foreground transition-colors px-2 py-2 rounded-md hover:bg-muted touch-target" onClick={closeMobileMenu}>
                    Scholarships
                  </Link>
                  <Link href="/mentorship" className="text-muted-foreground hover:text-foreground transition-colors px-2 py-2 rounded-md hover:bg-muted touch-target" onClick={closeMobileMenu}>
                    Mentorship
                  </Link>
                  <Link href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors px-2 py-2 rounded-md hover:bg-muted touch-target" onClick={closeMobileMenu}>
                    Roadmap
                  </Link>
                  <Link href="/aptitude-test" className="text-muted-foreground hover:text-foreground transition-colors px-2 py-2 rounded-md hover:bg-muted touch-target" onClick={closeMobileMenu}>
                    Career Test
                  </Link>
                  <Link
                    href="/whatsapp"
                    className="text-muted-foreground hover:text-[#25D366] transition-colors px-2 py-2 rounded-md hover:bg-muted flex items-center gap-2 touch-target"
                    onClick={closeMobileMenu}
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    WhatsApp Bot
                  </Link>
                </>
              )}
              <div className="flex flex-col gap-3 pt-3 border-t border-border mt-2">
                {isAuthenticated ? (
                  <>
                    <Button asChild variant="outline" className="w-full gap-2 bg-transparent touch-target justify-start" onClick={closeMobileMenu}>
                      <Link href="/dashboard">
                        <User className="w-4 h-4" />
                        {user?.name}
                      </Link>
                    </Button>
                    <Button variant="outline" onClick={() => { logout(); closeMobileMenu(); }} className="w-full gap-2 bg-transparent touch-target justify-start">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full bg-transparent touch-target" onClick={closeMobileMenu}>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="w-full touch-target" onClick={closeMobileMenu}>
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
