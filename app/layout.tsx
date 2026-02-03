import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/lib/auth-context"
import { AuthGuard } from "@/components/auth-guard"

import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' })
// One simple font style enforced



export const metadata: Metadata = {
  title: {
    default: "CareerPilot Salone | Navigate Your Career Path in Sierra Leone",
    template: "%s | CareerPilot Salone"
  },
  description: "Discover personalized career recommendations, build professional CVs, and follow structured roadmaps to achieve your career goals in Sierra Leone. Free AI-powered career guidance for Sierra Leoneans.",
  keywords: ["career guidance", "Sierra Leone jobs", "career planning", "CV builder", "job search", "Freetown careers", "Sierra Leone education", "career roadmap", "mentorship", "scholarships"],
  authors: [{ name: "Career Pilot Salone" }],
  creator: "Career Pilot Salone",
  publisher: "Career Pilot Salone",
  metadataBase: new URL('https://careerpilot-salone.vercel.app'),
  openGraph: {
    type: "website",
    locale: "en_SL",
    url: "https://careerpilot-salone.vercel.app",
    title: "Career Pilot Salone | Navigate Your Career Path in Sierra Leone",
    description: "Free AI-powered career guidance, CV builder, and job matching for Sierra Leoneans. Build your future with personalized career roadmaps.",
    siteName: "Career Pilot Salone",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Pilot Salone | Navigate Your Career Path in Sierra Leone",
    description: "Free AI-powered career guidance for Sierra Leoneans. Build professional CVs and follow personalized career roadmaps.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: "/images/core/logo.png", type: "image/png" },
      { url: "/images/core/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/core/logo.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/images/core/logo.png",
    apple: "/images/core/logo.png",
  },
}


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FFFFFF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={`font-sans antialiased bg-white text-slate-900`}>
        <AuthProvider>
          <AuthGuard>
            <Navigation />
            {children}
          </AuthGuard>
          <Toaster richColors position="top-right" />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
