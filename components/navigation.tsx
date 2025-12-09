"use client"

import * as React from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { GlobalSearch } from "@/components/global-search"
import { User, LogOut, Menu, X } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export function Navigation() {
  const { user, logout, isAuthenticated } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <span className="font-bold text-xl">CareerPilot</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/guidance" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            AI Guidance
          </Link>
          <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Careers
          </Link>
          <Link href="/universities" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Universities
          </Link>
          <Link href="/jobs" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Jobs
          </Link>
          <Link href="/scholarships" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Scholarships
          </Link>
          <Link href="/mentorship" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Mentorship
          </Link>
          <Link href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Roadmap
          </Link>
          <Link href="/aptitude-test" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Career Test
          </Link>
          <Link
            href="https://wa.me/23275977351"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-[#25D366] transition-colors flex items-center gap-1 text-sm font-medium"
          >
            <FaWhatsapp className="w-5 h-5" />
            WhatsApp
          </Link>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:block w-full max-w-sm mx-4">
          <GlobalSearch />
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button asChild variant="ghost" className="gap-2">
                <Link href="/dashboard">
                  <User className="w-4 h-4" />
                  {user?.name || "User"}
                </Link>
              </Button>
              <Button variant="outline" onClick={() => logout()} className="gap-2 bg-transparent">
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
                <Link href="/careers">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 touch-target"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {
        mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-background px-4">
            <div className="flex flex-col gap-3">
              {/* Mobile Menu Links */}
              <div className="flex flex-col gap-1">
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
                  href="https://wa.me/23275977351"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#25D366] transition-colors px-2 py-2 rounded-md hover:bg-muted flex items-center gap-2 touch-target"
                  onClick={closeMobileMenu}
                >
                  <FaWhatsapp className="w-5 h-5" />
                  WhatsApp Bot
                </Link>
              </div>

              {/* Mobile Search */}
              <div className="py-2">
                <GlobalSearch />
              </div>

              <div className="flex flex-col gap-3 pt-3 border-t border-border mt-2">
                {isAuthenticated ? (
                  <>
                    <Button asChild variant="outline" className="w-full gap-2 bg-transparent touch-target justify-start" onClick={closeMobileMenu}>
                      <Link href="/dashboard">
                        <User className="w-4 h-4" />
                        {user?.name || "User"}
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
        )
      }
    </nav >
  )
}

