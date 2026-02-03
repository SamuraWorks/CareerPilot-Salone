"use client"

import React from "react"
import { motion } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa"
import { cn } from "@/lib/utils"

export function WhatsAppFAB() {
    const whatsappUrl = "https://whatsapp.com/channel/0029VbCMtxy0LKZ52WwcjH0r"

    return (
        <div className="fixed bottom-6 left-6 z-[90]">
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl shadow-green-500/30 hover:bg-[#128C7E] transition-all hover:scale-105 active:scale-95 group"
                )}
            >
                <FaWhatsapp className="w-8 h-8" />

                {/* Tooltip */}
                <div className="absolute left-16 bg-white text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:block">
                    Chat on WhatsApp
                </div>

                {/* Status Indicator */}
                <div className="absolute top-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center border-2 border-[#25D366]">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
            </motion.a>
        </div>
    )
}
