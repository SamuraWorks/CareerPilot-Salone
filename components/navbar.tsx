"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-white rounded-2xl overflow-hidden flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Image src="/images/core/logo.png" alt="CareerPilot Salone" width={40} height={40} className="object-contain" />
                    </div>
                    <div>
                        <span className="text-xl font-black text-[#0B1F3A] tracking-tighter block leading-none">CareerPilot</span>
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">Salone</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">How it Works</Link>
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/login" className="text-sm font-medium text-slate-800 hover:text-blue-600 transition-colors">Login</Link>
                    <Link href="/signup" className="px-5 py-2 rounded-lg bg-[#2EBA9B] hover:bg-[#259B81] text-white text-sm font-bold shadow-sm transition-all shadow-emerald-500/10">
                        Create Account
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-slate-900">
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 top-[60px] bg-white z-50 p-6 flex flex-col gap-8 animate-in slide-in-from-right">
                    <Link href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-slate-900">How it Works</Link>
                    <div className="h-px bg-slate-100" />
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-slate-900">Login</Link>
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 rounded-xl bg-[#2EBA9B] text-white text-center font-bold">
                        Create Account
                    </Link>
                </div>
            )}
        </nav>
    )
}
