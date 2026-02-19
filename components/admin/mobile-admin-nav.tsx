"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AdminNav } from "@/components/admin/admin-nav"

export function MobileAdminNav() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

    return (
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
    )
}
