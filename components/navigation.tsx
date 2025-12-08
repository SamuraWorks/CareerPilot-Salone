import { GlobalSearch } from "@/components/global-search"

// ... existing imports

export function Navigation() {
  // ... existing code

  return (
    // ... start of nav
    {/* Desktop Navigation */ }
    < div className = "hidden lg:flex items-center gap-6" >
      { isAuthenticated && (
        <>
          <Link href="/guidance" className="text-muted-foreground hover:text-foreground transition-colors">
            AI Guidance
          </Link>
          {/* ... other links */}
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
      )
}
          </div >

  {/* Search Bar */ }
  < div className = "hidden lg:block w-full max-w-sm mx-4" >
    <GlobalSearch />
          </div >

  {/* Auth Buttons */ }
  < div className = "hidden lg:flex items-center gap-4" >
    // ... existing code
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

{/* Mobile Menu Button */ }
<button className="lg:hidden p-2 touch-target" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
</button>
        </div >

  {/* Mobile Menu */ }
{
  mobileMenuOpen && (
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
  )
}
      </div >
    </nav >
  )
}
