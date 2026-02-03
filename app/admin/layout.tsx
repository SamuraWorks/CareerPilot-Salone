"use client"

import { ReactNode, useState } from "react"
import { AuthWrapper } from "@/components/admin/auth-wrapper"
import { AdminNav } from "@/components/admin/admin-nav"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

    return (
        <AuthWrapper>
            <div className="flex min-h-screen bg-slate-50">
                {/* Mobile Header - Only visible on small screens */}
                <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-4 z-20 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                            <LayoutDashboard className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold">Admin Panel</span>
                    </div>

                    <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64 border-r-0">
                            <AdminNav onNavClick={() => setIsMobileNavOpen(false)} />
                        </SheetContent>
                    </Sheet>
                </header>

                {/* Sidebar - Desktop Only */}
                <aside className="w-64 bg-white border-r hidden md:block fixed left-0 top-0 bottom-0 overflow-y-auto z-10">
                    <AdminNav />
                </aside>

                {/* Main Content - Offset by sidebar width on desktop, and header height on mobile */}
                <main className="min-h-screen md:ml-64 w-full pt-16 md:pt-0 overflow-x-hidden">
                    <div className="h-full w-full">
                        {children}
                    </div>
                </main>
            </div>
        </AuthWrapper>
    )
}
