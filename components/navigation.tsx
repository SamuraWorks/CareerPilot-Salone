"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, FileText } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export function Navigation() {
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

        {/* Standard Menu Button - Top Right */}
        <Button asChild variant="ghost" className="hover:bg-transparent hover:text-primary transition-colors p-2 md:pr-0">
          <Link href="/menu" className="flex items-center gap-3 group">
            <span className="text-base font-semibold text-muted-foreground group-hover:text-primary transition-colors hidden sm:inline-block">Menu</span>
            <div className="bg-muted group-hover:bg-primary/10 p-2.5 rounded-full transition-colors">
              <Menu className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        </Button>
      </div>
    </nav>
  )
}
