import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/lib/auth-context"
import { AuthGuard } from "@/components/auth-guard"
import { ChatWidget } from "@/components/ChatWidget"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: {
    default: "Career Pilot Salone | Navigate Your Career Path in Sierra Leone",
    template: "%s | Career Pilot Salone"
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
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <AuthGuard>
            {children}
            <ChatWidget />
          </AuthGuard>
          <Toaster richColors position="top-right" />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
