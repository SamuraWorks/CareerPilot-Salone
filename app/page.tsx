"use client"

import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { AIPreviewSection } from "@/components/home/ai-preview"
import { HowItWorksSection } from "@/components/home/how-it-works"
import { FeaturedCareersSection } from "@/components/home/featured-careers"
import { TestimonialsSection } from "@/components/home/testimonials"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white selection:bg-emerald-500/20 overflow-x-hidden pt-16">
      <HeroSection />
      <AIPreviewSection />
      <HowItWorksSection />
      <FeaturedCareersSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}


