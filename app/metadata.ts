import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Career Pilot Salone | Navigate Your Career Path in Sierra Leone",
    description: "Discover personalized career recommendations, build professional CVs, and follow structured roadmaps to achieve your career goals in Sierra Leone. Free AI-powered career guidance for Sierra Leoneans.",
    keywords: ["career guidance", "Sierra Leone jobs", "career planning", "CV builder", "job search", "Freetown careers", "Sierra Leone education", "career roadmap"],
    authors: [{ name: "Career Pilot Salone" }],
    creator: "Career Pilot Salone",
    publisher: "Career Pilot Salone",
    metadataBase: new URL('https://career-pilot-salone.vercel.app'),
    openGraph: {
        type: "website",
        locale: "en_SL",
        url: "https://career-pilot-salone.vercel.app",
        title: "Career Pilot Salone | Navigate Your Career Path in Sierra Leone",
        description: "Free AI-powered career guidance, CV builder, and job matching for Sierra Leoneans. Build your future with personalized career roadmaps.",
        siteName: "Career Pilot Salone",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Career Pilot Salone - Navigate Your Career Path",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Career Pilot Salone | Navigate Your Career Path in Sierra Leone",
        description: "Free AI-powered career guidance for Sierra Leoneans. Build professional CVs and follow personalized career roadmaps.",
        images: ["/og-image.jpg"],
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
    verification: {
        google: "your-google-verification-code",
    },
}
